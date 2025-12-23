/**
 * Exporter Module with Full Color GIF Support
 */

export class Exporter {
  async downloadImage(canvas, config) {
    const format = config.outputFormat === 'webp' ? 'image/webp' : 'image/png';
    const quality = config.outputQuality || 0.9;
    
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = config.outputWidth;
    outputCanvas.height = config.outputHeight;
    const ctx = outputCanvas.getContext('2d');
    ctx.drawImage(canvas, 0, 0, config.outputWidth, config.outputHeight);
    
    const blob = await new Promise(resolve => outputCanvas.toBlob(resolve, format, quality));
    const url = URL.createObjectURL(blob);
    const ext = config.outputFormat === 'webp' ? 'webp' : 'png';
    this.downloadUrl(url, `anqr-qrcode.${ext}`);
    URL.revokeObjectURL(url);
  }
  
  async downloadGif(frames, config) {
    const width = config.outputWidth;
    const height = config.outputHeight;
    const delay = config.animationSpeed;
    const loop = config.loopAnimation ? 0 : -1;
    
    const encoder = new ColorGifEncoder(width, height);
    encoder.setDelay(delay);
    encoder.setRepeat(loop);
    encoder.start();
    
    for (const frame of frames) {
      const scaled = document.createElement('canvas');
      scaled.width = width;
      scaled.height = height;
      const ctx = scaled.getContext('2d');
      ctx.drawImage(frame, 0, 0, width, height);
      
      const imageData = ctx.getImageData(0, 0, width, height);
      encoder.addFrame(imageData.data, width, height);
    }
    
    encoder.finish();
    
    const blob = new Blob([encoder.getBytes()], { type: 'image/gif' });
    const url = URL.createObjectURL(blob);
    this.downloadUrl(url, 'anqr-qrcode.gif');
    URL.revokeObjectURL(url);
  }
  
  async downloadSvg(canvas, config) {
    const dataUrl = canvas.toDataURL('image/png');
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
     width="${config.outputWidth}" height="${config.outputHeight}">
  <image width="${config.outputWidth}" height="${config.outputHeight}" xlink:href="${dataUrl}"/>
</svg>`;
    
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    this.downloadUrl(url, 'anqr-qrcode.svg');
    URL.revokeObjectURL(url);
  }
  
  downloadUrl(url, filename) {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}

/**
 * Full Color GIF Encoder with Median Cut Quantization
 */
class ColorGifEncoder {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.delay = 100;
    this.repeat = 0;
    this.output = [];
    this.globalPalette = null;
  }
  
  setDelay(delay) {
    this.delay = delay;
  }
  
  setRepeat(repeat) {
    this.repeat = repeat;
  }
  
  start() {
    this.output = [];
    // GIF89a header
    this.writeString('GIF89a');
    // Will write LSD after we know the global palette
    this.lsdPosition = this.output.length;
  }
  
  addFrame(pixels, width, height) {
    // Build color palette using median cut
    const palette = this.buildPalette(pixels, 256);
    const indexed = this.quantizePixels(pixels, palette);
    
    // Write LSD and global palette for first frame
    if (this.globalPalette === null) {
      this.globalPalette = palette;
      this.writeLSD(width, height);
      this.writePalette(palette);
      this.writeNetscapeExt();
    }
    
    // Graphic Control Extension
    this.output.push(0x21, 0xF9, 0x04);
    this.output.push(0x04); // Dispose: restore to background
    this.writeShort(Math.round(this.delay / 10));
    this.output.push(0x00, 0x00); // No transparent color
    
    // Image Descriptor
    this.output.push(0x2C);
    this.writeShort(0); // Left
    this.writeShort(0); // Top
    this.writeShort(width);
    this.writeShort(height);
    
    // Local color table flag + size
    this.output.push(0x87); // Local color table, 256 colors
    this.writePalette(palette);
    
    // LZW encode
    this.writeLZW(indexed, 8);
  }
  
  finish() {
    this.output.push(0x3B); // Trailer
  }
  
  getBytes() {
    return new Uint8Array(this.output);
  }
  
  writeLSD(width, height) {
    this.writeShort(width);
    this.writeShort(height);
    this.output.push(0xF7); // Global color table, 256 colors
    this.output.push(0x00); // Background index
    this.output.push(0x00); // Pixel aspect ratio
  }
  
  writePalette(palette) {
    for (let i = 0; i < 256; i++) {
      if (i < palette.length) {
        this.output.push(palette[i][0], palette[i][1], palette[i][2]);
      } else {
        this.output.push(0, 0, 0);
      }
    }
  }
  
  writeNetscapeExt() {
    if (this.repeat >= 0) {
      this.output.push(0x21, 0xFF, 0x0B);
      this.writeString('NETSCAPE2.0');
      this.output.push(0x03, 0x01);
      this.writeShort(this.repeat);
      this.output.push(0x00);
    }
  }
  
  writeString(str) {
    for (let i = 0; i < str.length; i++) {
      this.output.push(str.charCodeAt(i));
    }
  }
  
  writeShort(val) {
    this.output.push(val & 0xFF, (val >> 8) & 0xFF);
  }
  
  /**
   * Median Cut Color Quantization
   */
  buildPalette(pixels, maxColors) {
    // Collect unique colors (sample for performance)
    const colorMap = new Map();
    const step = Math.max(1, Math.floor(pixels.length / 4 / 10000));
    
    for (let i = 0; i < pixels.length; i += 4 * step) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const key = (r << 16) | (g << 8) | b;
      colorMap.set(key, (colorMap.get(key) || 0) + 1);
    }
    
    // Convert to array
    let colors = [];
    colorMap.forEach((count, key) => {
      colors.push({
        r: (key >> 16) & 0xFF,
        g: (key >> 8) & 0xFF,
        b: key & 0xFF,
        count
      });
    });
    
    // Median cut
    const buckets = [colors];
    
    while (buckets.length < maxColors && buckets.length > 0) {
      // Find bucket with most colors
      let maxBucket = 0;
      let maxLen = 0;
      for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length > maxLen) {
          maxLen = buckets[i].length;
          maxBucket = i;
        }
      }
      
      if (maxLen <= 1) break;
      
      const bucket = buckets.splice(maxBucket, 1)[0];
      
      // Find channel with most range
      let minR = 255, maxR = 0, minG = 255, maxG = 0, minB = 255, maxB = 0;
      for (const c of bucket) {
        minR = Math.min(minR, c.r); maxR = Math.max(maxR, c.r);
        minG = Math.min(minG, c.g); maxG = Math.max(maxG, c.g);
        minB = Math.min(minB, c.b); maxB = Math.max(maxB, c.b);
      }
      
      const rangeR = maxR - minR;
      const rangeG = maxG - minG;
      const rangeB = maxB - minB;
      
      let sortKey;
      if (rangeR >= rangeG && rangeR >= rangeB) {
        sortKey = 'r';
      } else if (rangeG >= rangeB) {
        sortKey = 'g';
      } else {
        sortKey = 'b';
      }
      
      bucket.sort((a, b) => a[sortKey] - b[sortKey]);
      
      const mid = Math.floor(bucket.length / 2);
      buckets.push(bucket.slice(0, mid));
      buckets.push(bucket.slice(mid));
    }
    
    // Average colors in each bucket
    const palette = [];
    for (const bucket of buckets) {
      if (bucket.length === 0) continue;
      
      let totalR = 0, totalG = 0, totalB = 0, totalCount = 0;
      for (const c of bucket) {
        totalR += c.r * c.count;
        totalG += c.g * c.count;
        totalB += c.b * c.count;
        totalCount += c.count;
      }
      
      palette.push([
        Math.round(totalR / totalCount),
        Math.round(totalG / totalCount),
        Math.round(totalB / totalCount)
      ]);
    }
    
    // Ensure we have 256 colors
    while (palette.length < 256) {
      palette.push([0, 0, 0]);
    }
    
    return palette;
  }
  
  /**
   * Map pixels to palette indices
   */
  quantizePixels(pixels, palette) {
    const indexed = new Uint8Array(pixels.length / 4);
    
    // Build spatial index for faster lookup
    const colorCache = new Map();
    
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const key = (r << 16) | (g << 8) | b;
      
      let idx = colorCache.get(key);
      if (idx === undefined) {
        idx = this.findClosestColor(r, g, b, palette);
        colorCache.set(key, idx);
      }
      
      indexed[i / 4] = idx;
    }
    
    return indexed;
  }
  
  findClosestColor(r, g, b, palette) {
    let minDist = Infinity;
    let minIdx = 0;
    
    for (let i = 0; i < palette.length; i++) {
      const pr = palette[i][0];
      const pg = palette[i][1];
      const pb = palette[i][2];
      
      // Weighted RGB distance
      const dr = r - pr;
      const dg = g - pg;
      const db = b - pb;
      const dist = dr * dr * 2 + dg * dg * 4 + db * db * 3;
      
      if (dist < minDist) {
        minDist = dist;
        minIdx = i;
      }
    }
    
    return minIdx;
  }
  
  /**
   * LZW Compression
   */
  writeLZW(indexed, minCodeSize) {
    this.output.push(minCodeSize);
    
    const clearCode = 1 << minCodeSize;
    const eoiCode = clearCode + 1;
    
    let codeSize = minCodeSize + 1;
    let nextCode = eoiCode + 1;
    const codeLimit = 4096;
    const codeTable = new Map();
    
    const buffer = [];
    let bitBuffer = 0;
    let bitCount = 0;
    
    const writeCode = (code) => {
      bitBuffer |= code << bitCount;
      bitCount += codeSize;
      while (bitCount >= 8) {
        buffer.push(bitBuffer & 0xFF);
        bitBuffer >>= 8;
        bitCount -= 8;
      }
    };
    
    const flushBuffer = () => {
      while (buffer.length >= 255) {
        const chunk = buffer.splice(0, 255);
        this.output.push(chunk.length);
        this.output.push(...chunk);
      }
    };
    
    // Initialize table
    for (let i = 0; i < clearCode; i++) {
      codeTable.set(String(i), i);
    }
    
    writeCode(clearCode);
    
    let indexBuffer = String(indexed[0]);
    
    for (let i = 1; i < indexed.length; i++) {
      const k = String(indexed[i]);
      const combined = indexBuffer + ',' + k;
      
      if (codeTable.has(combined)) {
        indexBuffer = combined;
      } else {
        writeCode(codeTable.get(indexBuffer));
        
        if (nextCode < codeLimit) {
          codeTable.set(combined, nextCode++);
          if (nextCode > (1 << codeSize) && codeSize < 12) {
            codeSize++;
          }
        } else {
          writeCode(clearCode);
          codeTable.clear();
          for (let j = 0; j < clearCode; j++) {
            codeTable.set(String(j), j);
          }
          nextCode = eoiCode + 1;
          codeSize = minCodeSize + 1;
        }
        
        indexBuffer = k;
      }
      
      if (buffer.length > 250) flushBuffer();
    }
    
    writeCode(codeTable.get(indexBuffer));
    writeCode(eoiCode);
    
    if (bitCount > 0) {
      buffer.push(bitBuffer & 0xFF);
    }
    
    flushBuffer();
    
    if (buffer.length > 0) {
      this.output.push(buffer.length);
      this.output.push(...buffer);
    }
    
    this.output.push(0); // Block terminator
  }
}
