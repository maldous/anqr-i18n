import generateDitheredMatrix from "../lib/dithered-qr/generate.ts";

export class QRGenerator {
  constructor() {
    this.qrcode = null;
    this.loadLibrary();
  }

  async loadLibrary() {
    if (window.qrcode) {
      this.qrcode = window.qrcode;
      return;
    }

    return new Promise((resolve) => {
      const check = () => {
        if (window.qrcode) {
          this.qrcode = window.qrcode;
          resolve();
        } else {
          setTimeout(check, 50);
        }
      };
      check();
    });
  }

  async generate(config, overlayCanvas = null) {
    if (!this.qrcode) {
      await this.loadLibrary();
    }

    // Auto-detect best version if set to 0
    let typeNumber = config.typeNumber;
    if (typeNumber === 0) {
      typeNumber = this.calculateOptimalVersion(
        config.content,
        config.errorCorrection,
      );
    }

    const qr = this.qrcode(typeNumber, config.errorCorrection);
    qr.addData(config.content);
    qr.make();

    const moduleCount = qr.getModuleCount();

    // For subpixel modes, use special 3x3 rendering
    // Dithered QR Codes (error diffusion) style rendering
    // Inspired by the idea of using error diffusion to compensate for fixed QR data modules.
    if (config.overlayMode === "dithered" && overlayCanvas) {
      return this.generateDitheredSubpixelQR(qr, config, overlayCanvas, moduleCount);
    }


    if (config.overlayMode === "subpixel" && overlayCanvas) {
      return this.generateSubpixelQR(
        qr,
        config,
        overlayCanvas,
        moduleCount,
        false,
      );
    }
    if (config.overlayMode === "subpixel-size" && overlayCanvas) {
      return this.generateSubpixelQR(
        qr,
        config,
        overlayCanvas,
        moduleCount,
        true,
      );
    }

    const moduleSize = config.moduleSize;
    const margin = config.margin;
    const size = moduleCount * moduleSize + margin * 2 * moduleSize;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Draw background
    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    // Get overlay image data if provided
    let overlayData = null;
    if (overlayCanvas) {
      overlayData = this.getOverlayData(
        overlayCanvas,
        moduleCount,
        config.colorMode || "color",
        config.invertImage || false,
      );
    }

    // For true dither mode, we modify which modules are on/off
    let ditherPattern = null;
    if (config.overlayMode === "dither" && overlayData) {
      ditherPattern = this.applyTrueDither(qr, overlayData, config, false);
    } else if (config.overlayMode === "extreme" && overlayData) {
      ditherPattern = this.applyTrueDither(qr, overlayData, config, true);
    }

    // Draw QR modules
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        // Use dithered pattern if available, otherwise use original QR
        const isDark = ditherPattern
          ? ditherPattern[row][col]
          : qr.isDark(row, col);
        const x = (col + margin) * moduleSize;
        const y = (row + margin) * moduleSize;

        const isFinder = this.isFinderPattern(row, col, moduleCount);
        const applyOverlay =
          overlayData && (!config.preserveFinders || !isFinder);

        let moduleColor = isDark ? config.fgColor : config.bgColor;
        let moduleSizeModifier = 1;
        let moduleOpacity = 1;
        let waveOffsetX = 0;
        let waveOffsetY = 0;
        let drawOutlineOnly = false;

        // For mosaic mode, we draw both dark and white cells
        let shouldDrawCell = isDark;

        if (applyOverlay) {
          const brightness = overlayData[row][col];

          switch (config.overlayMode) {
            case "halftone":
              if (isDark) {
                const intensity = config.overlayIntensity / 100;
                const minSize = 0.3;
                const maxSize = 1.0;
                moduleSizeModifier =
                  minSize +
                  (1 - brightness) * (maxSize - minSize) * intensity +
                  ((1 - intensity) * (maxSize - minSize)) / 2;
              }
              break;

            case "blend":
              if (isDark) {
                const blendColor = overlayData.colors?.[row]?.[col];
                if (blendColor) {
                  const blendAmount = config.overlayIntensity / 100;
                  moduleColor = this.blendColors(
                    config.fgColor,
                    blendColor,
                    blendAmount,
                  );
                }
              }
              break;

            case "brightness":
              if (isDark) {
                const threshold = (100 - config.overlayIntensity) / 100;
                if (brightness > threshold) {
                  moduleOpacity = 0;
                }
              }
              break;

            case "gapfill":
              // Fill white spaces with faded image colors
              if (isDark) {
                moduleColor = config.fgColor;
              } else {
                // Draw white spaces with faded image color
                const gapColor = overlayData.colors?.[row]?.[col];
                if (gapColor) {
                  const fadeAmount = (config.overlayIntensity / 100) * 0.4; // Max 40% opacity
                  moduleColor = this.blendColors(
                    config.bgColor,
                    gapColor,
                    fadeAmount,
                  );
                  shouldDrawCell = true;
                }
              }
              break;

            case "pixelate":
              // True pixelation - 3x3 blocks get same averaged color for chunky pixel look
              if (isDark) {
                const blockSize = 3;
                const blockRow = Math.floor(row / blockSize) * blockSize;
                const blockCol = Math.floor(col / blockSize) * blockSize;
                let avgR = 0,
                  avgG = 0,
                  avgB = 0,
                  pixCount = 0;
                for (
                  let br = 0;
                  br < blockSize && blockRow + br < moduleCount;
                  br++
                ) {
                  for (
                    let bc = 0;
                    bc < blockSize && blockCol + bc < moduleCount;
                    bc++
                  ) {
                    const c =
                      overlayData.colors?.[blockRow + br]?.[blockCol + bc];
                    if (c) {
                      const parsed = this.parseColor(c);
                      avgR += parsed.r;
                      avgG += parsed.g;
                      avgB += parsed.b;
                      pixCount++;
                    }
                  }
                }
                if (pixCount > 0) {
                  avgR = Math.round(avgR / pixCount);
                  avgG = Math.round(avgG / pixCount);
                  avgB = Math.round(avgB / pixCount);
                  const blockColor = `rgb(${avgR},${avgG},${avgB})`;
                  const pixBlendAmt = config.overlayIntensity / 100;
                  moduleColor = this.blendColors(
                    config.fgColor,
                    blockColor,
                    pixBlendAmt,
                  );
                }
              }
              break;

            case "duotone":
              if (isDark) {
                const fgParsed = this.parseColor(config.fgColor);
                if (brightness > 0.5) {
                  const lightR = Math.min(255, fgParsed.r + 80);
                  const lightG = Math.min(255, fgParsed.g + 80);
                  const lightB = Math.min(255, fgParsed.b + 80);
                  moduleColor = `rgb(${lightR},${lightG},${lightB})`;
                } else {
                  const darkR = Math.max(0, fgParsed.r - 40);
                  const darkG = Math.max(0, fgParsed.g - 40);
                  const darkB = Math.max(0, fgParsed.b - 40);
                  moduleColor = `rgb(${darkR},${darkG},${darkB})`;
                }
              }
              break;

            case "outline":
              if (isDark) {
                drawOutlineOnly = true;
                const outlineColor = overlayData.colors?.[row]?.[col];
                if (outlineColor) {
                  const outlineBlend = config.overlayIntensity / 100;
                  moduleColor = this.blendColors(
                    config.fgColor,
                    outlineColor,
                    outlineBlend,
                  );
                }
              }
              break;

            case "wave":
              if (isDark) {
                const waveAmt =
                  (1 - brightness) * (config.overlayIntensity / 100) * 3;
                waveOffsetX = Math.sin(row * 0.5) * waveAmt;
                waveOffsetY = Math.cos(col * 0.5) * waveAmt;
              }
              break;

            case "mosaic": {
              // Mosaic fills EVERY cell with image colors - reveals full image
              // Dark modules get actual color, white spaces get lighter version
              shouldDrawCell = true; // Draw all cells
              const mosaicColor = overlayData.colors?.[row]?.[col];
              if (mosaicColor) {
                const intensity = config.overlayIntensity / 100;
                if (isDark) {
                  // Dark cells get the actual image color (darkened slightly to maintain QR readability)
                  const parsed = this.parseColor(mosaicColor);
                  const darkFactor = 0.7;
                  moduleColor = `rgb(${Math.round(parsed.r * darkFactor)},${Math.round(parsed.g * darkFactor)},${Math.round(parsed.b * darkFactor)})`;
                } else {
                  // White cells get a lighter/brighter version of the image color
                  const parsed = this.parseColor(mosaicColor);
                  const lightFactor = 0.4 + (1 - intensity) * 0.4;
                  const lightR = Math.round(
                    255 - (255 - parsed.r) * lightFactor,
                  );
                  const lightG = Math.round(
                    255 - (255 - parsed.g) * lightFactor,
                  );
                  const lightB = Math.round(
                    255 - (255 - parsed.b) * lightFactor,
                  );
                  moduleColor = `rgb(${lightR},${lightG},${lightB})`;
                }
              }
              break;
            }
          }
        }

        if (shouldDrawCell && moduleOpacity > 0) {
          ctx.save();
          ctx.globalAlpha = moduleOpacity;
          ctx.fillStyle = moduleColor;

          const gap = config.moduleGap
            ? (moduleSize * config.moduleGap) / 100
            : 0;
          const adjustedSize = (moduleSize - gap) * moduleSizeModifier;
          const offset = (moduleSize - adjustedSize) / 2;

          const drawX = x + offset + waveOffsetX;
          const drawY = y + offset + waveOffsetY;

          if (drawOutlineOnly) {
            ctx.strokeStyle = moduleColor;
            ctx.lineWidth = 1;
            ctx.strokeRect(drawX, drawY, adjustedSize, adjustedSize);
          } else if (isFinder) {
            this.drawFinderModule(ctx, x, y, moduleSize, config.finderStyle);
          } else {
            this.drawModule(
              ctx,
              drawX,
              drawY,
              adjustedSize,
              config.moduleStyle,
            );
          }

          ctx.restore();
        }
      }
    }

    // Draw center logo if in center mode
    if (overlayCanvas && config.overlayMode === "center") {
      this.drawCenterLogo(ctx, overlayCanvas, size, config.logoSize);
    }

    return canvas;
  }

  calculateOptimalVersion(content, errorCorrection) {
    const capacities = {
      L: [
        17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520,
        586, 644, 718, 792, 858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528,
        1628, 1732, 1840, 1952, 2068, 2188, 2303, 2431, 2563, 2699, 2809, 2953,
      ],
      M: [
        14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412,
        450, 504, 560, 624, 666, 711, 779, 857, 911, 997, 1059, 1125, 1190,
        1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989, 2099, 2213, 2331,
      ],
      Q: [
        11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322,
        364, 394, 442, 482, 509, 565, 611, 661, 715, 751, 805, 868, 908, 982,
        1030, 1112, 1168, 1228, 1283, 1351, 1423, 1499, 1579, 1663,
      ],
      H: [
        7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250,
        280, 310, 338, 382, 403, 439, 461, 511, 535, 593, 625, 658, 698, 742,
        790, 842, 898, 958, 983, 1051, 1093, 1139, 1219, 1273,
      ],
    };

    const caps = capacities[errorCorrection] || capacities["Q"];
    const len = content.length;

    for (let v = 0; v < caps.length; v++) {
      if (caps[v] >= len) {
        return v + 1;
      }
    }

    return 40;
  }

  isFinderPattern(row, col, moduleCount) {
    if (row < 7 && col < 7) return true;
    if (row < 7 && col >= moduleCount - 7) return true;
    if (row >= moduleCount - 7 && col < 7) return true;
    return false;
  }

  /**
   * Check if a module is a structural element that cannot be modified
   */
  isStructuralModule(row, col, moduleCount, version) {
    // Finder patterns + separators
    if (row < 8 && col < 8) return true;
    if (row < 8 && col >= moduleCount - 8) return true;
    if (row >= moduleCount - 8 && col < 8) return true;
    // Timing patterns
    if (row === 6 || col === 6) return true;
    // Format information
    if (row === 8 && col < 9) return true;
    if (col === 8 && row < 9) return true;
    if (row === 8 && col >= moduleCount - 8) return true;
    if (col === 8 && row >= moduleCount - 8) return true;
    // Dark module
    if (row === moduleCount - 8 && col === 8) return true;
    // Version info (version 7+)
    if (version >= 7) {
      if (row >= moduleCount - 11 && row < moduleCount - 8 && col < 6)
        return true;
      if (col >= moduleCount - 11 && col < moduleCount - 8 && row < 6)
        return true;
    }
    // Alignment patterns (version 2+)
    if (version >= 2) {
      const positions = this.getAlignmentPositions(version, moduleCount);
      for (const pos of positions) {
        if (Math.abs(row - pos.row) <= 2 && Math.abs(col - pos.col) <= 2)
          return true;
      }
    }
    return false;
  }

  getAlignmentPositions(version, moduleCount) {
    if (version < 2) return [];
    const table = {
      2: [6, 18],
      3: [6, 22],
      4: [6, 26],
      5: [6, 30],
      6: [6, 34],
      7: [6, 22, 38],
      8: [6, 24, 42],
      9: [6, 26, 46],
      10: [6, 28, 50],
      11: [6, 30, 54],
      12: [6, 32, 58],
      13: [6, 34, 62],
      14: [6, 26, 46, 66],
      15: [6, 26, 48, 70],
      16: [6, 26, 50, 74],
      17: [6, 30, 54, 78],
      18: [6, 30, 56, 82],
      19: [6, 30, 58, 86],
      20: [6, 34, 62, 90],
      21: [6, 28, 50, 72, 94],
      22: [6, 26, 50, 74, 98],
      23: [6, 30, 54, 78, 102],
      24: [6, 28, 54, 80, 106],
      25: [6, 32, 58, 84, 110],
      26: [6, 30, 58, 86, 114],
      27: [6, 34, 62, 90, 118],
      28: [6, 26, 50, 74, 98, 122],
      29: [6, 30, 54, 78, 102, 126],
      30: [6, 26, 52, 78, 104, 130],
      31: [6, 30, 56, 82, 108, 134],
      32: [6, 34, 60, 86, 112, 138],
      33: [6, 30, 58, 86, 114, 142],
      34: [6, 34, 62, 90, 118, 146],
      35: [6, 30, 54, 78, 102, 126, 150],
      36: [6, 24, 50, 76, 102, 128, 154],
      37: [6, 28, 54, 80, 106, 132, 158],
      38: [6, 32, 58, 84, 110, 136, 162],
      39: [6, 26, 54, 82, 110, 138, 166],
      40: [6, 30, 58, 86, 114, 142, 170],
    };
    const coords = table[version] || [6];
    const positions = [];
    for (const r of coords) {
      for (const c of coords) {
        if (r < 8 && c < 8) continue;
        if (r < 8 && c > moduleCount - 9) continue;
        if (r > moduleCount - 9 && c < 8) continue;
        positions.push({ row: r, col: c });
      }
    }
    return positions;
  }

  applyTrueDither(qr, overlayData, config, extremeMode = false) {
    const moduleCount = qr.getModuleCount();
    const version = config.typeNumber || Math.ceil((moduleCount - 17) / 4);

    // Create modifiable pattern - start with original QR
    const modifiedPattern = [];

    for (let row = 0; row < moduleCount; row++) {
      modifiedPattern[row] = [];
      for (let col = 0; col < moduleCount; col++) {
        modifiedPattern[row][col] = qr.isDark(row, col);
      }
    }

    // In extreme mode, flip ALL non-finder modules to match image
    // In normal dither mode, respect error correction limits
    if (extremeMode) {
      // Extreme: flip everything except finder patterns
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          // Only protect finder patterns (corners)
          if (this.isFinderPattern(row, col, moduleCount)) continue;

          const brightness = overlayData[row]?.[col] ?? 0.5;
          const intensity = config.overlayIntensity / 100;

          // Desired state based on image
          const desiredDark = brightness < 0.5;

          // Apply with intensity blend
          if (intensity >= 1 || Math.random() < intensity) {
            modifiedPattern[row][col] = desiredDark;
          }
        }
      }
    } else {
      // Safe dither: respect error correction limits
      const ecCapacity = { L: 0.07, M: 0.15, Q: 0.25, H: 0.3 };
      const maxFlipRatio = ecCapacity[config.errorCorrection] || 0.25;
      const intensity = config.overlayIntensity / 100;

      let totalDataModules = 0;
      const flipCandidates = [];

      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (this.isStructuralModule(row, col, moduleCount, version)) continue;
          totalDataModules++;

          const currentState = qr.isDark(row, col);
          const brightness = overlayData[row]?.[col] ?? 0.5;
          const desiredState = brightness < 0.5;

          if (currentState !== desiredState) {
            flipCandidates.push({
              row,
              col,
              score: Math.abs(brightness - 0.5),
              desiredState,
            });
          }
        }
      }

      // Sort by visual importance and flip up to limit
      flipCandidates.sort((a, b) => b.score - a.score);
      const maxFlips = Math.floor(totalDataModules * maxFlipRatio * intensity);

      for (let i = 0; i < Math.min(flipCandidates.length, maxFlips); i++) {
        const c = flipCandidates[i];
        modifiedPattern[c.row][c.col] = c.desiredState;
      }
    }

    return modifiedPattern;
  }

  drawModule(ctx, x, y, size, style) {
    const padding = size * 0.05;
    const innerSize = size - padding * 2;

    switch (style) {
      case "rounded":
        this.roundRect(
          ctx,
          x + padding,
          y + padding,
          innerSize,
          innerSize,
          size * 0.3,
        );
        ctx.fill();
        break;

      case "dots":
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, innerSize / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "diamond":
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y + padding);
        ctx.lineTo(x + size - padding, y + size / 2);
        ctx.lineTo(x + size / 2, y + size - padding);
        ctx.lineTo(x + padding, y + size / 2);
        ctx.closePath();
        ctx.fill();
        break;

      case "connected":
        // Draw full rectangle with no gaps for connected look
        ctx.fillRect(x, y, size, size);
        break;

      case "square":
      default:
        ctx.fillRect(x + padding, y + padding, innerSize, innerSize);
        break;
    }
  }

  drawFinderModule(ctx, x, y, size, style) {
    switch (style) {
      case "rounded":
        this.roundRect(ctx, x, y, size, size, size * 0.2);
        ctx.fill();
        break;

      case "circle":
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "square":
      default:
        ctx.fillRect(x, y, size, size);
        break;
    }
  }

  roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  getOverlayData(overlayCanvas, moduleCount, colorMode = "color") {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = moduleCount;
    tempCanvas.height = moduleCount;
    const ctx = tempCanvas.getContext("2d");

    ctx.drawImage(overlayCanvas, 0, 0, moduleCount, moduleCount);

    const imageData = ctx.getImageData(0, 0, moduleCount, moduleCount);
    const data = imageData.data;

    const brightness = [];
    const colors = [];

    for (let row = 0; row < moduleCount; row++) {
      brightness[row] = [];
      colors[row] = [];

      for (let col = 0; col < moduleCount; col++) {
        const i = (row * moduleCount + col) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
        brightness[row][col] = gray / 255;

        if (colorMode === "bw") {
          const bw = gray > 127 ? 255 : 0;
          colors[row][col] = `rgb(${bw},${bw},${bw})`;
        } else if (colorMode === "grayscale") {
          colors[row][col] = `rgb(${gray},${gray},${gray})`;
        } else {
          colors[row][col] = `rgb(${r},${g},${b})`;
        }
      }
    }

    brightness.colors = colors;
    return brightness;
  }

  blendColors(color1, color2, amount = 0.5) {
    const c1 = this.parseColor(color1);
    const c2 = this.parseColor(color2);

    const r = Math.round(c1.r * (1 - amount) + c2.r * amount);
    const g = Math.round(c1.g * (1 - amount) + c2.g * amount);
    const b = Math.round(c1.b * (1 - amount) + c2.b * amount);

    return `rgb(${r},${g},${b})`;
  }

  parseColor(color) {
    if (color.startsWith("#")) {
      const hex = color.slice(1);
      return {
        r: parseInt(hex.substr(0, 2), 16),
        g: parseInt(hex.substr(2, 2), 16),
        b: parseInt(hex.substr(4, 2), 16),
      };
    }

    const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
      };
    }

    return { r: 0, g: 0, b: 0 };
  }

  drawCenterLogo(ctx, logoCanvas, canvasSize, logoSizePercent) {
    const logoSize = canvasSize * (logoSizePercent / 100);
    const x = (canvasSize - logoSize) / 2;
    const y = (canvasSize - logoSize) / 2;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(x - 4, y - 4, logoSize + 8, logoSize + 8);

    ctx.drawImage(logoCanvas, x, y, logoSize, logoSize);
  }

  /**
   * Generate a "dithered QR code" style render based on the TypeScript reference
   * implementation from https://codeberg.org/andrew-t/dithered-qr-codes.
   *
   * Notes:
   * - We render a 3x (subpixel) grid per QR module.
   * - Locked areas (finders, timing lines, alignments) are preserved.
   * - Free pixels are set from the image via error diffusion.
   */
  generateDitheredSubpixelQR(_qr, config, overlayCanvas) {
    const scale = 3;

    const dithered = generateDitheredMatrix({
      text: config.content,
      ecc: config.errorCorrection,
      version: config.typeNumber || 0,
      scale,
      overlayCanvas,
      overlayIntensity: config.overlayIntensity,
    });

    // Safety: if the QR library picked a different version than our current `qr`
    // instance, use the matrix size to drive rendering.
    const scaledCount = dithered.length;
    const derivedModuleCount = Math.round(scaledCount / scale);
    const marginPx = config.margin * config.moduleSize;
    const size = derivedModuleCount * config.moduleSize + marginPx * 2;
    const pixelSize = config.moduleSize / scale;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    ctx.fillStyle = config.fgColor;

    for (let y = 0; y < scaledCount; y++) {
      for (let x = 0; x < scaledCount; x++) {
        if (!dithered[y][x]) continue;
        const dx = marginPx + x * pixelSize;
        const dy = marginPx + y * pixelSize;
        ctx.fillRect(dx, dy, pixelSize, pixelSize);
      }
    }

    return canvas;
  }

  /**
   * Generate QR with qrmove-style 3x3 subpixel rendering
   * Each QR module becomes a 3x3 grid:
   * - CENTER pixel (1,1) = QR data (must stay correct for scanning)
   * - 8 SURROUNDING pixels = freely show overlay image
   * This allows ~89% of pixels to show the image while maintaining 100% scannability
   */
  generateSubpixelQR(
    qr,
    config,
    overlayCanvas,
    moduleCount,
    useHalftoneCenter = false,
  ) {
    const subpixelSize = 3; // Each module is 3x3 subpixels
    const margin = config.margin;
    const pixelSize = config.moduleSize / subpixelSize; // Size of each subpixel

    // Canvas dimensions: 3x modules + margins
    const canvasModules = moduleCount * subpixelSize;
    const marginPixels = margin * config.moduleSize;
    const size = canvasModules * pixelSize + marginPixels * 2;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Draw background
    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    // Get overlay data at 3x resolution to match subpixel grid
    const overlayData = this.getSubpixelOverlayData(
      overlayCanvas,
      moduleCount * subpixelSize,
      config.colorMode || "color",
    );
    // Also get per-module brightness for halftone center
    const moduleBrightness = this.getOverlayData(overlayCanvas, moduleCount);
    const intensity = config.overlayIntensity / 100;

    // Draw each QR module as a 3x3 subpixel grid
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        const isDark = qr.isDark(row, col);
        const isFinder = this.isFinderPattern(row, col, moduleCount);

        // Base position for this module's 3x3 grid
        const baseX = marginPixels + col * subpixelSize * pixelSize;
        const baseY = marginPixels + row * subpixelSize * pixelSize;

        // For finder patterns, draw solid 3x3 (no subpixel effect) for better scanning
        if (isFinder) {
          ctx.fillStyle = isDark ? config.fgColor : config.bgColor;
          ctx.fillRect(
            baseX,
            baseY,
            subpixelSize * pixelSize,
            subpixelSize * pixelSize,
          );
          continue;
        }

        // Draw 3x3 subpixel grid for this module
        for (let subRow = 0; subRow < subpixelSize; subRow++) {
          for (let subCol = 0; subCol < subpixelSize; subCol++) {
            const subX = baseX + subCol * pixelSize;
            const subY = baseY + subRow * pixelSize;

            // Get overlay data for this subpixel
            const overlayRow = row * subpixelSize + subRow;
            const overlayCol = col * subpixelSize + subCol;
            const overlayColor = overlayData.colors?.[overlayRow]?.[overlayCol];

            // CENTER pixel (1,1) - MUST show QR data for scannability
            if (subRow === 1 && subCol === 1) {
              if (useHalftoneCenter && isDark) {
                // Halftone center: vary size based on image brightness
                const brightness = moduleBrightness[row]?.[col] ?? 0.5;
                const minSize = 0.4;
                const maxSize = 1.0;
                const sizeRatio =
                  minSize + (1 - brightness) * (maxSize - minSize) * intensity;
                const centerSize = pixelSize * sizeRatio;
                const offset = (pixelSize - centerSize) / 2;

                // Draw background first
                ctx.fillStyle = config.bgColor;
                ctx.fillRect(subX, subY, pixelSize, pixelSize);
                // Then draw sized center
                ctx.fillStyle = config.fgColor;
                ctx.fillRect(
                  subX + offset,
                  subY + offset,
                  centerSize,
                  centerSize,
                );
              } else {
                ctx.fillStyle = isDark ? config.fgColor : config.bgColor;
                ctx.fillRect(subX, subY, pixelSize, pixelSize);
              }
            } else {
              // SURROUNDING 8 pixels - DIRECTLY show overlay image (no blending!)
              // These pixels are FREE - they don't affect QR scanning at all
              if (overlayColor && intensity > 0) {
                // At full intensity, show pure image color
                // At partial intensity, blend with neutral gray for visibility control
                if (intensity >= 1) {
                  ctx.fillStyle = overlayColor;
                } else {
                  ctx.fillStyle = this.blendColors(
                    "#808080",
                    overlayColor,
                    intensity,
                  );
                }
              } else {
                // No overlay - show based on QR pattern with reduced contrast
                ctx.fillStyle = isDark ? "#404040" : "#c0c0c0";
              }
              ctx.fillRect(subX, subY, pixelSize, pixelSize);
            }
          }
        }
      }
    }

    return canvas;
  }

  getSubpixelOverlayData(overlayCanvas, subpixelCount, colorMode = "color") {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = subpixelCount;
    tempCanvas.height = subpixelCount;
    const ctx = tempCanvas.getContext("2d");

    ctx.drawImage(overlayCanvas, 0, 0, subpixelCount, subpixelCount);

    const imageData = ctx.getImageData(0, 0, subpixelCount, subpixelCount);
    const data = imageData.data;

    const brightness = [];
    const colors = [];

    for (let row = 0; row < subpixelCount; row++) {
      brightness[row] = [];
      colors[row] = [];

      for (let col = 0; col < subpixelCount; col++) {
        const i = (row * subpixelCount + col) * 4;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        const gray = Math.round(r * 0.299 + g * 0.587 + b * 0.114);
        brightness[row][col] = gray / 255;

        if (colorMode === "bw") {
          const bw = gray > 127 ? 255 : 0;
          colors[row][col] = `rgb(${bw},${bw},${bw})`;
        } else if (colorMode === "grayscale") {
          colors[row][col] = `rgb(${gray},${gray},${gray})`;
        } else {
          colors[row][col] = `rgb(${r},${g},${b})`;
        }
      }
    }

    brightness.colors = colors;
    return brightness;
  }
}
