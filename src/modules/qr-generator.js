import qrcode from "../../vendor/lib/qrcode-generator/qrcode.mjs";

import { generateBlueNoiseDithered } from "./blue-noise-dither.ts";
import { generateQR, isLocked, isData, calculateOptimalVersion } from "./qr-core.ts";
import { blendColors, parseColor } from "./color-utils.ts";

export class QRGenerator {
  constructor() {
    this.qrcode = qrcode;
  }

  async loadLibrary() {
    // Library is imported synchronously via ES module
    // This method is kept for backwards compatibility
    return Promise.resolve();
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

    // Dithered mode uses the `qr` encoder directly (and has its own
    // overflow handling). Skip qrcode-generator entirely to avoid
    // `code length overflow` when a manual version is too small.
    if (config.overlayMode === "dithered" && overlayCanvas) {
      return this.generateDitheredSubpixelQR(
        null,
        { ...config, typeNumber },
        overlayCanvas,
      );
    }

    // Blue-noise mode generates animated frames with temporal dithering
    if (config.overlayMode === "blue-noise" && overlayCanvas) {
      return this.generateBlueNoiseQR({ ...config, typeNumber }, overlayCanvas);
    }

    const qr = this.qrcode(typeNumber, config.errorCorrection);
    qr.addData(config.content);
    qr.make();

    const moduleCount = qr.getModuleCount();

    // For subpixel modes, use special 3x3 rendering
    // Dithered QR Codes (error diffusion) style rendering
    // Inspired by the idea of using error diffusion to compensate for fixed QR data modules.
    if (config.overlayMode === "dithered" && overlayCanvas) {
      return this.generateDitheredSubpixelQR(
        qr,
        config,
        overlayCanvas,
        moduleCount,
      );
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
    const frameExtra = (config.frameStyle && config.frameStyle !== 'none' && config.frameText) ? moduleSize * 4 : 0;
    const size = moduleCount * moduleSize + margin * 2 * moduleSize + frameExtra;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Keep edges crisp (critical for QR scanning)
    ctx.imageSmoothingEnabled = false;

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

    // Get version for alignment pattern detection
    const version = config.typeNumber || Math.ceil((moduleCount - 17) / 4);
    
    // Create gradient fill if configured
    const gradientFill = this.createGradientFill(ctx, config, size);
    const useGradient = config.gradient && config.gradient.type !== 'none';
    
    // Render options
    const cornerRadius = config.cornerRadius || 0;
    const dotRotation = config.dotRotationDeg || 0;
    const alignmentStyle = config.alignmentStyle || 'match_finder';
    const timingStyle = config.timingStyle || 'match_module';

    // Track drawn finder patterns to avoid double-drawing
    const drawnFinderPatterns = new Set();
    const drawnAlignmentPatterns = new Set();

    // Draw complete finder patterns first (eyes)
    const finderPositions = [
      { row: 0, col: 0 }, // Top-left
      { row: 0, col: moduleCount - 7 }, // Top-right
      { row: moduleCount - 7, col: 0 }, // Bottom-left
    ];
    
    for (const pos of finderPositions) {
      const x = (pos.col + margin) * moduleSize;
      const y = (pos.row + margin) * moduleSize;
      this.drawFinderPatternComplete(ctx, x, y, moduleSize, config);
      
      // Mark all modules in this finder pattern as drawn
      for (let r = pos.row; r < pos.row + 7; r++) {
        for (let c = pos.col; c < pos.col + 7; c++) {
          drawnFinderPatterns.add(`${r},${c}`);
        }
      }
    }

    // Draw alignment patterns (for version 2+)
    if (version >= 2) {
      const alignPositions = this.getAlignmentPositions(version, moduleCount);
      for (const pos of alignPositions) {
        const centerX = (pos.col + margin) * moduleSize + moduleSize / 2;
        const centerY = (pos.row + margin) * moduleSize + moduleSize / 2;
        this.drawAlignmentPattern(ctx, centerX, centerY, moduleSize, alignmentStyle, config);
        
        // Mark all modules in this alignment pattern as drawn
        for (let r = pos.row - 2; r <= pos.row + 2; r++) {
          for (let c = pos.col - 2; c <= pos.col + 2; c++) {
            drawnAlignmentPatterns.add(`${r},${c}`);
          }
        }
      }
    }

    // Draw QR modules
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        // Skip if this module is part of a finder pattern (already drawn)
        if (drawnFinderPatterns.has(`${row},${col}`)) continue;
        
        // Skip if this module is part of an alignment pattern (already drawn)
        if (drawnAlignmentPatterns.has(`${row},${col}`)) continue;
        
        // Use dithered pattern if available, otherwise use original QR
        const isDark = ditherPattern
          ? ditherPattern[row][col]
          : qr.isDark(row, col);
        const x = (col + margin) * moduleSize;
        const y = (row + margin) * moduleSize;

        const isFinder = this.isFinderPattern(row, col, moduleCount);
        const isTiming = this.isTimingPattern(row, col, moduleCount);
        const applyOverlay =
          overlayData && (!config.preserveFinders || !isFinder) && 
          (!config.preserveTiming || !isTiming);

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
                  moduleColor = blendColors(
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
                  moduleColor = blendColors(
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
                      const parsed = parseColor(c);
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
                  moduleColor = blendColors(
                    config.fgColor,
                    blockColor,
                    pixBlendAmt,
                  );
                }
              }
              break;

            case "duotone":
              if (isDark) {
                const fgParsed = parseColor(config.fgColor);
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
                  moduleColor = blendColors(
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
                  const parsed = parseColor(mosaicColor);
                  const darkFactor = 0.7;
                  moduleColor = `rgb(${Math.round(parsed.r * darkFactor)},${Math.round(parsed.g * darkFactor)},${Math.round(parsed.b * darkFactor)})`;
                } else {
                  // White cells get a lighter/brighter version of the image color
                  const parsed = parseColor(mosaicColor);
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
          
          // Use gradient for dark modules if configured, otherwise use module color
          if (isDark && useGradient) {
            ctx.fillStyle = gradientFill;
          } else {
            ctx.fillStyle = moduleColor;
          }

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
          } else if (isTiming) {
            // Draw timing pattern module with timing style
            this.drawTimingModule(ctx, drawX, drawY, adjustedSize, timingStyle, config);
          } else {
            this.drawModule(
              ctx,
              drawX,
              drawY,
              adjustedSize,
              config.moduleStyle,
              { cornerRadius, rotation: dotRotation }
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

    // Draw frame if configured
    this.drawFrame(ctx, size, moduleSize, margin, config);

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
   * Check if a module is part of a timing pattern
   */
  isTimingPattern(row, col, moduleCount) {
    // Horizontal timing pattern (row 6, between finders)
    if (row === 6 && col >= 8 && col < moduleCount - 8) return true;
    // Vertical timing pattern (col 6, between finders)
    if (col === 6 && row >= 8 && row < moduleCount - 8) return true;
    return false;
  }

  /**
   * Check if a module is part of an alignment pattern
   */
  isAlignmentPattern(row, col, moduleCount, version) {
    if (version < 2) return false;
    const positions = this.getAlignmentPositions(version, moduleCount);
    for (const pos of positions) {
      if (Math.abs(row - pos.row) <= 2 && Math.abs(col - pos.col) <= 2) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get the center position of an alignment pattern if this module is part of one
   */
  getAlignmentCenter(row, col, moduleCount, version) {
    if (version < 2) return null;
    const positions = this.getAlignmentPositions(version, moduleCount);
    for (const pos of positions) {
      if (Math.abs(row - pos.row) <= 2 && Math.abs(col - pos.col) <= 2) {
        return pos;
      }
    }
    return null;
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

  /**
   * Draw a single module with support for style, corner radius, and rotation
   */
  drawModule(ctx, x, y, size, style, options = {}) {
    const { cornerRadius = 0, rotation = 0 } = options;
    const padding = size * 0.05;
    const innerSize = size - padding * 2;
    
    // Calculate corner radius based on percentage
    const radiusPercent = cornerRadius / 100;
    const maxRadius = innerSize / 2;
    const actualRadius = maxRadius * radiusPercent;

    ctx.save();
    
    // Apply rotation around center if specified
    if (rotation !== 0) {
      const centerX = x + size / 2;
      const centerY = y + size / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-centerX, -centerY);
    }

    switch (style) {
      case "rounded":
        // Use cornerRadius if specified, otherwise default rounded
        const roundedRadius = actualRadius > 0 ? actualRadius : size * 0.3;
        this.roundRect(
          ctx,
          x + padding,
          y + padding,
          innerSize,
          innerSize,
          roundedRadius,
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
        if (actualRadius > 0) {
          this.roundRect(ctx, x, y, size, size, actualRadius);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, size, size);
        }
        break;

      case "square":
      default:
        if (actualRadius > 0) {
          this.roundRect(ctx, x + padding, y + padding, innerSize, innerSize, actualRadius);
          ctx.fill();
        } else {
          ctx.fillRect(x + padding, y + padding, innerSize, innerSize);
        }
        break;
    }
    
    ctx.restore();
  }

  /**
   * Draw a single finder pattern module
   */
  drawFinderModule(ctx, x, y, size, style, cornerRadius = 0) {
    const radiusPercent = cornerRadius / 100;
    const maxRadius = size / 2;
    const actualRadius = maxRadius * radiusPercent;
    
    switch (style) {
      case "rounded":
        const roundedRadius = actualRadius > 0 ? actualRadius : size * 0.2;
        this.roundRect(ctx, x, y, size, size, roundedRadius);
        ctx.fill();
        break;

      case "circle":
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;

      case "square":
      default:
        if (actualRadius > 0) {
          this.roundRect(ctx, x, y, size, size, actualRadius);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, size, size);
        }
        break;
    }
  }

  /**
   * Draw a complete finder pattern (eye) with outer and inner styles
   */
  drawFinderPatternComplete(ctx, centerX, centerY, moduleSize, config) {
    const outerStyle = config.eyeOuterStyle || config.finderStyle || 'square';
    const innerStyle = config.eyeInnerStyle || config.finderStyle || 'square';
    const scale = (config.eyeScale || 100) / 100;
    const cornerRadius = config.cornerRadius || 0;
    
    // Finder pattern is 7x7 modules
    // Outer: 7x7, Middle (white): 5x5, Inner: 3x3
    const outerSize = 7 * moduleSize * scale;
    const middleSize = 5 * moduleSize * scale;
    const innerSize = 3 * moduleSize * scale;
    
    const outerOffset = (7 * moduleSize - outerSize) / 2;
    const x = centerX + outerOffset;
    const y = centerY + outerOffset;
    
    // Draw outer (dark)
    ctx.fillStyle = config.fgColor;
    this.drawFinderModule(ctx, x, y, outerSize, outerStyle, cornerRadius);
    
    // Draw middle (light/background)
    ctx.fillStyle = config.bgColor;
    const middleOffset = (outerSize - middleSize) / 2;
    this.drawFinderModule(ctx, x + middleOffset, y + middleOffset, middleSize, outerStyle, cornerRadius);
    
    // Draw inner (dark)
    ctx.fillStyle = config.fgColor;
    const innerOffset = (outerSize - innerSize) / 2;
    this.drawFinderModule(ctx, x + innerOffset, y + innerOffset, innerSize, innerStyle, cornerRadius);
  }

  /**
   * Draw an alignment pattern with specified style
   */
  drawAlignmentPattern(ctx, centerX, centerY, moduleSize, style, config) {
    const cornerRadius = config.cornerRadius || 0;
    
    // Alignment pattern is 5x5 modules
    // Outer: 5x5, Middle (white): 3x3, Inner: 1x1
    const outerSize = 5 * moduleSize;
    const middleSize = 3 * moduleSize;
    const innerSize = 1 * moduleSize;
    
    const x = centerX - outerSize / 2;
    const y = centerY - outerSize / 2;
    
    // Use the specified style or match finder style
    const effectiveStyle = style === 'match_finder' ? (config.finderStyle || 'square') : style;
    
    // Draw outer (dark)
    ctx.fillStyle = config.fgColor;
    this.drawFinderModule(ctx, x, y, outerSize, effectiveStyle, cornerRadius);
    
    // Draw middle (light/background)
    ctx.fillStyle = config.bgColor;
    const middleX = centerX - middleSize / 2;
    const middleY = centerY - middleSize / 2;
    this.drawFinderModule(ctx, middleX, middleY, middleSize, effectiveStyle, cornerRadius);
    
    // Draw inner (dark)
    ctx.fillStyle = config.fgColor;
    const innerX = centerX - innerSize / 2;
    const innerY = centerY - innerSize / 2;
    this.drawFinderModule(ctx, innerX, innerY, innerSize, effectiveStyle, cornerRadius);
  }

  /**
   * Draw timing pattern with specified style
   */
  drawTimingModule(ctx, x, y, size, style, config) {
    const cornerRadius = config.cornerRadius || 0;
    
    // Use the specified style or match module style
    const effectiveStyle = style === 'match_module' ? (config.moduleStyle || 'square') : style;
    
    switch (effectiveStyle) {
      case 'solid':
        ctx.fillRect(x, y, size, size);
        break;
      case 'dashed':
        // Draw a smaller centered rectangle for dashed look
        const dashSize = size * 0.7;
        const offset = (size - dashSize) / 2;
        ctx.fillRect(x + offset, y + offset, dashSize, dashSize);
        break;
      default:
        // Use regular module drawing
        this.drawModule(ctx, x, y, size, effectiveStyle, { cornerRadius });
    }
  }

  /**
   * Create a gradient fill style based on config
   */
  createGradientFill(ctx, config, size) {
    if (!config.gradient || config.gradient.type === 'none') {
      return config.fgColor;
    }
    
    const { type, stops, centerX = 0.5, centerY = 0.5 } = config.gradient;
    const angle = config.gradient.angle || 0;
    let gradient;
    
    switch (type) {
      case 'linear': {
        // Convert angle to start/end points
        const angleRad = (angle * Math.PI) / 180;
        const x1 = size / 2 - Math.cos(angleRad) * size / 2;
        const y1 = size / 2 - Math.sin(angleRad) * size / 2;
        const x2 = size / 2 + Math.cos(angleRad) * size / 2;
        const y2 = size / 2 + Math.sin(angleRad) * size / 2;
        gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        break;
      }
      case 'radial': {
        const cx = size * (centerX || 0.5);
        const cy = size * (centerY || 0.5);
        const radius = size * 0.7;
        gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        break;
      }
      case 'conic': {
        // Canvas doesn't have native conic gradient, simulate with radial
        const cx = size * (centerX || 0.5);
        const cy = size * (centerY || 0.5);
        gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.7);
        break;
      }
      default:
        return config.fgColor;
    }
    
    // Add color stops
    if (stops && stops.length > 0) {
      stops.forEach(stop => {
        gradient.addColorStop(stop.pos, stop.color);
      });
    } else {
      // Default gradient from fgColor to a lighter version
      gradient.addColorStop(0, config.fgColor);
      gradient.addColorStop(1, config.bgColor);
    }
    
    return gradient;
  }

  /**
   * Draw a decorative frame around the QR code
   */
  drawFrame(ctx, size, moduleSize, margin, config) {
    const frameStyle = config.frameStyle;
    if (!frameStyle || frameStyle === 'none') return;
    
    const frameText = config.frameText || '';
    const qrSize = size - margin * 2 * moduleSize - (frameText ? moduleSize * 4 : 0);
    const qrStart = margin * moduleSize;
    
    ctx.save();
    
    switch (frameStyle) {
      case 'rounded_frame': {
        // Draw rounded rectangle frame around QR
        ctx.strokeStyle = config.fgColor;
        ctx.lineWidth = moduleSize * 0.5;
        const frameMargin = moduleSize;
        this.roundRect(
          ctx,
          qrStart - frameMargin,
          qrStart - frameMargin,
          qrSize + frameMargin * 2,
          qrSize + frameMargin * 2 + (frameText ? moduleSize * 3 : 0),
          moduleSize * 2
        );
        ctx.stroke();
        break;
      }
      
      case 'sticker': {
        // Draw sticker-style background with shadow
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = moduleSize * 2;
        ctx.shadowOffsetX = moduleSize * 0.5;
        ctx.shadowOffsetY = moduleSize * 0.5;
        
        ctx.fillStyle = config.bgColor;
        const stickerPadding = moduleSize * 1.5;
        this.roundRect(
          ctx,
          qrStart - stickerPadding,
          qrStart - stickerPadding,
          qrSize + stickerPadding * 2,
          qrSize + stickerPadding * 2 + (frameText ? moduleSize * 4 : 0),
          moduleSize * 3
        );
        ctx.fill();
        ctx.shadowColor = 'transparent';
        break;
      }
      
      case 'tag': {
        // Draw tag-style frame with pointed end
        ctx.fillStyle = config.fgColor;
        const tagPadding = moduleSize;
        const tagWidth = qrSize + tagPadding * 2;
        const tagHeight = qrSize + tagPadding * 2 + (frameText ? moduleSize * 4 : 0);
        const tagX = qrStart - tagPadding;
        const tagY = qrStart - tagPadding;
        
        ctx.beginPath();
        ctx.moveTo(tagX + moduleSize, tagY);
        ctx.lineTo(tagX + tagWidth - moduleSize, tagY);
        ctx.quadraticCurveTo(tagX + tagWidth, tagY, tagX + tagWidth, tagY + moduleSize);
        ctx.lineTo(tagX + tagWidth, tagY + tagHeight - moduleSize);
        ctx.quadraticCurveTo(tagX + tagWidth, tagY + tagHeight, tagX + tagWidth - moduleSize, tagY + tagHeight);
        ctx.lineTo(tagX + moduleSize, tagY + tagHeight);
        ctx.quadraticCurveTo(tagX, tagY + tagHeight, tagX, tagY + tagHeight - moduleSize);
        ctx.lineTo(tagX, tagY + moduleSize);
        ctx.quadraticCurveTo(tagX, tagY, tagX + moduleSize, tagY);
        ctx.closePath();
        ctx.stroke();
        break;
      }
    }
    
    // Draw frame text if provided
    if (frameText) {
      ctx.fillStyle = config.fgColor;
      ctx.font = `bold ${moduleSize * 2}px Arial, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      const textY = qrStart + qrSize + moduleSize * 1.5;
      ctx.fillText(frameText, size / 2, textY);
    }
    
    ctx.restore();
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

  // blendColors and parseColor are now imported from ./color-utils.ts

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
   * - Supports color, grayscale, and B&W modes for higher fidelity.
   */
  generateDitheredSubpixelQR(_qr, config, overlayCanvas) {
    const scale = 3;

    // Generate QR matrix using qr-core
    const qrResult = generateQR({
      text: config.content,
      ecc: config.errorCorrection,
      version: config.typeNumber || 0,
      scale,
    });

    const { matrix: baseMatrix, moduleCount: scaledSize } = qrResult;
    
    // Apply dithering with overlay
    const ditheredResult = this.applyDitherToMatrix(
      baseMatrix,
      scaledSize,
      scale,
      overlayCanvas,
      config.overlayIntensity,
      config.colorMode || "color"
    );

    const { matrix: dithered, colors } = ditheredResult;

    // Safety: if the QR library picked a different version than our current `qr`
    // instance, use the matrix size to drive rendering.
    const scaledCount = dithered.length;
    const derivedModuleCount = Math.round(scaledCount / scale);
    const marginModules = Math.max(5, config.margin);
    // For scannability: keep an integer subpixel size (avoid fractional canvas coords)
    // and ensure a full quiet zone (>= 4 modules; we use 5 here, matching the reference).
    const subPixelSize = Math.max(1, Math.round(config.moduleSize / scale));
    const effectiveModuleSize = subPixelSize * scale;
    const marginPx = marginModules * effectiveModuleSize;
    const size = scaledCount * subPixelSize + marginPx * 2;
    const pixelSize = subPixelSize;

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    // Keep edges crisp (critical for QR scanning)
    ctx.imageSmoothingEnabled = false;

    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    // Determine if we should use color rendering
    const useColorRendering = overlayCanvas && config.colorMode !== "bw";

    for (let y = 0; y < scaledCount; y++) {
      for (let x = 0; x < scaledCount; x++) {
        const isDark = dithered[y][x];
        const color = colors[y][x];

        // Skip white/light pixels in the background (they're already the bg color)
        // unless we're doing color rendering with non-black/white colors
        if (!isDark && !useColorRendering) continue;

        const dx = marginPx + x * pixelSize;
        const dy = marginPx + y * pixelSize;

        if (useColorRendering) {
          // Use the actual color from the dithered result
          // For dark pixels: use the color (which may be a dark shade)
          // For light pixels: use the color (which may be a light shade)
          ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
          ctx.fillRect(dx, dy, pixelSize, pixelSize);
        } else {
          // B&W mode or no overlay: use simple foreground color
          if (isDark) {
            ctx.fillStyle = config.fgColor;
            ctx.fillRect(dx, dy, pixelSize, pixelSize);
          }
        }
      }
    }

    return canvas;
  }

  /**
   * Generate QR with blue-noise dithering
   * Returns a single canvas (consistent with other blend modes)
   *
   * Features:
   * - Blue-noise dithering for high-quality image representation
   * - Data points preserved for QR scannability (same approach as error diffusion)
   * - Only free points are dithered using blue noise threshold
   * - Intensity slider controls blend between QR and image
   */
  generateBlueNoiseQR(config, overlayCanvas) {
    const scale = 3;

    // Use the new generateBlueNoiseDithered function that follows
    // the same pattern as generateDitheredMatrix (preserves QR data points)
    const blueNoiseResult = generateBlueNoiseDithered({
      text: config.content,
      ecc: config.errorCorrection,
      version: config.typeNumber || 0,
      scale,
      overlayCanvas,
      overlayIntensity: config.overlayIntensity,
      colorMode: config.colorMode || "color",
    });

    const { matrix: dithered, colors } = blueNoiseResult;

    const scaledCount = dithered.length;
    const marginModules = Math.max(5, config.margin);
    const subPixelSize = Math.max(1, Math.round(config.moduleSize / scale));
    const effectiveModuleSize = subPixelSize * scale;
    const marginPx = marginModules * effectiveModuleSize;
    const size = scaledCount * subPixelSize + marginPx * 2;
    const pixelSize = subPixelSize;

    // Render to a single canvas
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;

    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }

    const useColorRendering = overlayCanvas && config.colorMode !== "bw";

    for (let y = 0; y < scaledCount; y++) {
      for (let x = 0; x < scaledCount; x++) {
        const isDark = dithered[y][x];
        const color = colors[y][x];

        // Skip white/light pixels unless doing color rendering
        if (!isDark && !useColorRendering) continue;

        const dx = marginPx + x * pixelSize;
        const dy = marginPx + y * pixelSize;

        if (useColorRendering) {
          // Use the actual color from the dithered result
          ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
          ctx.fillRect(dx, dy, pixelSize, pixelSize);
        } else {
          // B&W mode or no overlay: use simple foreground color
          if (isDark) {
            ctx.fillStyle = config.fgColor;
            ctx.fillRect(dx, dy, pixelSize, pixelSize);
          }
        }
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

    // Keep edges crisp (critical for QR scanning)
    ctx.imageSmoothingEnabled = false;

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
                  ctx.fillStyle = blendColors(
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

  /**
   * Apply dithering to a QR matrix with overlay image
   * Uses Floyd-Steinberg error diffusion for free points
   */
  applyDitherToMatrix(baseMatrix, scaledSize, scale, overlayCanvas, overlayIntensity, colorMode) {
    // Initialize output
    const matrix = baseMatrix.map(row => [...row]);
    const colors = baseMatrix.map(row => row.map(isDark => 
      isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }
    ));

    if (!overlayCanvas) {
      return { matrix, colors };
    }

    // Load overlay image data
    const imageData = this.loadImageDataRGB(overlayCanvas, scaledSize);
    const intensity = overlayIntensity / 100;

    // Convert to grayscale if needed
    if (colorMode === 'grayscale' || colorMode === 'bw') {
      for (let y = 0; y < scaledSize; y++) {
        for (let x = 0; x < scaledSize; x++) {
          const { r, g, b } = imageData[y][x];
          const gray = r * 0.299 + g * 0.587 + b * 0.114;
          imageData[y][x] = { r: gray, g: gray, b: gray };
        }
      }
    }

    // Apply Floyd-Steinberg error diffusion to free points
    for (let y = 0; y < scaledSize; y++) {
      for (let x = 0; x < scaledSize; x++) {
        // Skip locked areas and data points
        if (isLocked(scaledSize, x, y, scale)) continue;
        if (isData(x, y, scale)) continue;

        const pixel = imageData[y][x];
        
        if (colorMode === 'bw') {
          const gray = pixel.r * 0.299 + pixel.g * 0.587 + pixel.b * 0.114;
          const newVal = gray > 0.5 ? 1 : 0;
          const error = gray - newVal;
          
          imageData[y][x] = { r: newVal, g: newVal, b: newVal };
          this.distributeError(imageData, x, y, scaledSize, scale, error, error, error);
        } else if (colorMode === 'grayscale') {
          const gray = pixel.r;
          const levels = 4;
          const newVal = Math.round(gray * (levels - 1)) / (levels - 1);
          const error = gray - newVal;
          
          imageData[y][x] = { r: newVal, g: newVal, b: newVal };
          this.distributeError(imageData, x, y, scaledSize, scale, error, error, error);
        } else {
          const levels = 4;
          const newR = Math.round(pixel.r * (levels - 1)) / (levels - 1);
          const newG = Math.round(pixel.g * (levels - 1)) / (levels - 1);
          const newB = Math.round(pixel.b * (levels - 1)) / (levels - 1);
          
          const errorR = pixel.r - newR;
          const errorG = pixel.g - newG;
          const errorB = pixel.b - newB;
          
          imageData[y][x] = { r: newR, g: newG, b: newB };
          this.distributeError(imageData, x, y, scaledSize, scale, errorR, errorG, errorB);
        }
      }
    }

    // Merge dithered image with QR matrix
    for (let y = 0; y < scaledSize; y++) {
      for (let x = 0; x < scaledSize; x++) {
        if (isLocked(scaledSize, x, y, scale)) continue;
        if (isData(x, y, scale)) continue;

        const pixel = imageData[y][x];
        const brightness = pixel.r * 0.299 + pixel.g * 0.587 + pixel.b * 0.114;
        const useImage = Math.random() < intensity;

        if (useImage) {
          matrix[y][x] = brightness < 0.5;
          colors[y][x] = {
            r: Math.round(Math.max(0, Math.min(1, pixel.r)) * 255),
            g: Math.round(Math.max(0, Math.min(1, pixel.g)) * 255),
            b: Math.round(Math.max(0, Math.min(1, pixel.b)) * 255),
          };
        }
      }
    }

    return { matrix, colors };
  }

  /**
   * Load image data from canvas as RGB values (0-1 range)
   */
  loadImageDataRGB(canvas, size) {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = size;
    tempCanvas.height = size;
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, size, size);
    const imgData = ctx.getImageData(0, 0, size, size);

    const output = [];
    for (let y = 0; y < size; y++) {
      const row = [];
      for (let x = 0; x < size; x++) {
        const i = (y * size + x) * 4;
        row.push({
          r: imgData.data[i] / 255,
          g: imgData.data[i + 1] / 255,
          b: imgData.data[i + 2] / 255,
        });
      }
      output.push(row);
    }
    return output;
  }

  /**
   * Distribute error to neighboring pixels (Floyd-Steinberg)
   */
  distributeError(imageData, x, y, size, scale, errorR, errorG, errorB) {
    const canChange = (px, py) => {
      if (px < 0 || py < 0 || px >= size || py >= size) return false;
      return !isLocked(size, px, py, scale) && !isData(px, py, scale);
    };

    const a = canChange(x + 1, y);
    const b = canChange(x - 1, y + 1);
    const c = canChange(x, y + 1);
    const d = canChange(x + 1, y + 1);

    const total = (a ? 7 : 0) + (b ? 3 : 0) + (c ? 5 : 0) + (d ? 1 : 0);
    if (total === 0) return;

    if (a) {
      imageData[y][x + 1].r += (errorR * 7) / total;
      imageData[y][x + 1].g += (errorG * 7) / total;
      imageData[y][x + 1].b += (errorB * 7) / total;
    }
    if (b) {
      imageData[y + 1][x - 1].r += (errorR * 3) / total;
      imageData[y + 1][x - 1].g += (errorG * 3) / total;
      imageData[y + 1][x - 1].b += (errorB * 3) / total;
    }
    if (c) {
      imageData[y + 1][x].r += (errorR * 5) / total;
      imageData[y + 1][x].g += (errorG * 5) / total;
      imageData[y + 1][x].b += (errorB * 5) / total;
    }
    if (d) {
      imageData[y + 1][x + 1].r += errorR / total;
      imageData[y + 1][x + 1].g += errorG / total;
      imageData[y + 1][x + 1].b += errorB / total;
    }
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
