import { createRequire as ___nfyCreateRequire } from 'node:module';
import { dirname as ___nfyPathDirname } from 'node:path';
import { fileURLToPath as ___nfyFileURLToPath } from 'node:url';

const __filename = ___nfyFileURLToPath(import.meta.url);
const __dirname = ___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
const _require = ___nfyCreateRequire(import.meta.url);

// netlify/functions/qr.ts
import { createCanvas, loadImage } from '@napi-rs/canvas';
import gifenc from 'gifenc';
import { decompressFrames, parseGIF } from 'gifuct-js';

// vendor/lib/qrcode-generator/qrcode.mjs
var qrcode = (typeNumber, errorCorrectionLevel) => {
  const PAD0 = 236;
  const PAD1 = 17;
  let _typeNumber = typeNumber;
  const _errorCorrectionLevel = QRErrorCorrectionLevel[errorCorrectionLevel];
  let _modules = null;
  let _moduleCount = 0;
  let _dataCache = null;
  const _dataList = [];
  const _this = {};
  const makeImpl = (test, maskPattern) => {
    _moduleCount = _typeNumber * 4 + 17;
    _modules = ((moduleCount) => {
      const modules = new Array(moduleCount);
      for (let row = 0; row < moduleCount; row += 1) {
        modules[row] = new Array(moduleCount);
        for (let col = 0; col < moduleCount; col += 1) {
          modules[row][col] = null;
        }
      }
      return modules;
    })(_moduleCount);
    setupPositionProbePattern(0, 0);
    setupPositionProbePattern(_moduleCount - 7, 0);
    setupPositionProbePattern(0, _moduleCount - 7);
    setupPositionAdjustPattern();
    setupTimingPattern();
    setupTypeInfo(test, maskPattern);
    if (_typeNumber >= 7) {
      setupTypeNumber(test);
    }
    if (_dataCache == null) {
      _dataCache = createData(_typeNumber, _errorCorrectionLevel, _dataList);
    }
    mapData(_dataCache, maskPattern);
  };
  const setupPositionProbePattern = (row, col) => {
    for (let r = -1; r <= 7; r += 1) {
      if (row + r <= -1 || _moduleCount <= row + r) continue;
      for (let c = -1; c <= 7; c += 1) {
        if (col + c <= -1 || _moduleCount <= col + c) continue;
        if (
          (0 <= r && r <= 6 && (c === 0 || c === 6)) ||
          (0 <= c && c <= 6 && (r === 0 || r === 6)) ||
          (2 <= r && r <= 4 && 2 <= c && c <= 4)
        ) {
          _modules[row + r][col + c] = true;
        } else {
          _modules[row + r][col + c] = false;
        }
      }
    }
  };
  const getBestMaskPattern = () => {
    let minLostPoint = 0;
    let pattern = 0;
    for (let i = 0; i < 8; i += 1) {
      makeImpl(true, i);
      const lostPoint = QRUtil.getLostPoint(_this);
      if (i === 0 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        pattern = i;
      }
    }
    return pattern;
  };
  const setupTimingPattern = () => {
    for (let r = 8; r < _moduleCount - 8; r += 1) {
      if (_modules[r][6] != null) {
        continue;
      }
      _modules[r][6] = r % 2 === 0;
    }
    for (let c = 8; c < _moduleCount - 8; c += 1) {
      if (_modules[6][c] != null) {
        continue;
      }
      _modules[6][c] = c % 2 === 0;
    }
  };
  const setupPositionAdjustPattern = () => {
    const pos = QRUtil.getPatternPosition(_typeNumber);
    for (let i = 0; i < pos.length; i += 1) {
      for (let j = 0; j < pos.length; j += 1) {
        const row = pos[i];
        const col = pos[j];
        if (_modules[row][col] != null) {
          continue;
        }
        for (let r = -2; r <= 2; r += 1) {
          for (let c = -2; c <= 2; c += 1) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || (r === 0 && c === 0)) {
              _modules[row + r][col + c] = true;
            } else {
              _modules[row + r][col + c] = false;
            }
          }
        }
      }
    }
  };
  const setupTypeNumber = (test) => {
    const bits = QRUtil.getBCHTypeNumber(_typeNumber);
    for (let i = 0; i < 18; i += 1) {
      const mod = !test && ((bits >> i) & 1) === 1;
      _modules[Math.floor(i / 3)][(i % 3) + _moduleCount - 8 - 3] = mod;
    }
    for (let i = 0; i < 18; i += 1) {
      const mod = !test && ((bits >> i) & 1) === 1;
      _modules[(i % 3) + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
    }
  };
  const setupTypeInfo = (test, maskPattern) => {
    const data = (_errorCorrectionLevel << 3) | maskPattern;
    const bits = QRUtil.getBCHTypeInfo(data);
    for (let i = 0; i < 15; i += 1) {
      const mod = !test && ((bits >> i) & 1) === 1;
      if (i < 6) {
        _modules[i][8] = mod;
      } else if (i < 8) {
        _modules[i + 1][8] = mod;
      } else {
        _modules[_moduleCount - 15 + i][8] = mod;
      }
    }
    for (let i = 0; i < 15; i += 1) {
      const mod = !test && ((bits >> i) & 1) === 1;
      if (i < 8) {
        _modules[8][_moduleCount - i - 1] = mod;
      } else if (i < 9) {
        _modules[8][15 - i - 1 + 1] = mod;
      } else {
        _modules[8][15 - i - 1] = mod;
      }
    }
    _modules[_moduleCount - 8][8] = !test;
  };
  const mapData = (data, maskPattern) => {
    let inc = -1;
    let row = _moduleCount - 1;
    let bitIndex = 7;
    let byteIndex = 0;
    const maskFunc = QRUtil.getMaskFunction(maskPattern);
    for (let col = _moduleCount - 1; col > 0; col -= 2) {
      if (col === 6) col -= 1;
      while (true) {
        for (let c = 0; c < 2; c += 1) {
          if (_modules[row][col - c] == null) {
            let dark = false;
            if (byteIndex < data.length) {
              dark = ((data[byteIndex] >>> bitIndex) & 1) === 1;
            }
            const mask = maskFunc(row, col - c);
            if (mask) {
              dark = !dark;
            }
            _modules[row][col - c] = dark;
            bitIndex -= 1;
            if (bitIndex === -1) {
              byteIndex += 1;
              bitIndex = 7;
            }
          }
        }
        row += inc;
        if (row < 0 || _moduleCount <= row) {
          row -= inc;
          inc = -inc;
          break;
        }
      }
    }
  };
  const createBytes = (buffer, rsBlocks) => {
    let offset = 0;
    let maxDcCount = 0;
    let maxEcCount = 0;
    const dcdata = new Array(rsBlocks.length);
    const ecdata = new Array(rsBlocks.length);
    for (let r = 0; r < rsBlocks.length; r += 1) {
      const dcCount = rsBlocks[r].dataCount;
      const ecCount = rsBlocks[r].totalCount - dcCount;
      maxDcCount = Math.max(maxDcCount, dcCount);
      maxEcCount = Math.max(maxEcCount, ecCount);
      dcdata[r] = new Array(dcCount);
      for (let i = 0; i < dcdata[r].length; i += 1) {
        dcdata[r][i] = 255 & buffer.getBuffer()[i + offset];
      }
      offset += dcCount;
      const rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
      const rawPoly = qrPolynomial(dcdata[r], rsPoly.getLength() - 1);
      const modPoly = rawPoly.mod(rsPoly);
      ecdata[r] = new Array(rsPoly.getLength() - 1);
      for (let i = 0; i < ecdata[r].length; i += 1) {
        const modIndex = i + modPoly.getLength() - ecdata[r].length;
        ecdata[r][i] = modIndex >= 0 ? modPoly.getAt(modIndex) : 0;
      }
    }
    let totalCodeCount = 0;
    for (let i = 0; i < rsBlocks.length; i += 1) {
      totalCodeCount += rsBlocks[i].totalCount;
    }
    const data = new Array(totalCodeCount);
    let index = 0;
    for (let i = 0; i < maxDcCount; i += 1) {
      for (let r = 0; r < rsBlocks.length; r += 1) {
        if (i < dcdata[r].length) {
          data[index] = dcdata[r][i];
          index += 1;
        }
      }
    }
    for (let i = 0; i < maxEcCount; i += 1) {
      for (let r = 0; r < rsBlocks.length; r += 1) {
        if (i < ecdata[r].length) {
          data[index] = ecdata[r][i];
          index += 1;
        }
      }
    }
    return data;
  };
  const createData = (typeNumber2, errorCorrectionLevel2, dataList) => {
    const rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, errorCorrectionLevel2);
    const buffer = qrBitBuffer();
    for (let i = 0; i < dataList.length; i += 1) {
      const data = dataList[i];
      buffer.put(data.getMode(), 4);
      buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
      data.write(buffer);
    }
    let totalDataCount = 0;
    for (let i = 0; i < rsBlocks.length; i += 1) {
      totalDataCount += rsBlocks[i].dataCount;
    }
    if (buffer.getLengthInBits() > totalDataCount * 8) {
      throw `code length overflow. (${buffer.getLengthInBits()}>${totalDataCount * 8})`;
    }
    if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
      buffer.put(0, 4);
    }
    while (buffer.getLengthInBits() % 8 !== 0) {
      buffer.putBit(false);
    }
    while (true) {
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(PAD0, 8);
      if (buffer.getLengthInBits() >= totalDataCount * 8) {
        break;
      }
      buffer.put(PAD1, 8);
    }
    return createBytes(buffer, rsBlocks);
  };
  _this.addData = (data, mode) => {
    mode = mode || 'Byte';
    let newData = null;
    switch (mode) {
      case 'Numeric':
        newData = qrNumber(data);
        break;
      case 'Alphanumeric':
        newData = qrAlphaNum(data);
        break;
      case 'Byte':
        newData = qr8BitByte(data);
        break;
      case 'Kanji':
        newData = qrKanji(data);
        break;
      default:
        throw `mode:${mode}`;
    }
    _dataList.push(newData);
    _dataCache = null;
  };
  _this.isDark = (row, col) => {
    if (row < 0 || _moduleCount <= row || col < 0 || _moduleCount <= col) {
      throw `${row},${col}`;
    }
    return _modules[row][col];
  };
  _this.getModuleCount = () => _moduleCount;
  _this.make = () => {
    if (_typeNumber < 1) {
      let typeNumber2 = 1;
      for (; typeNumber2 < 40; typeNumber2++) {
        const rsBlocks = QRRSBlock.getRSBlocks(typeNumber2, _errorCorrectionLevel);
        const buffer = qrBitBuffer();
        for (let i = 0; i < _dataList.length; i++) {
          const data = _dataList[i];
          buffer.put(data.getMode(), 4);
          buffer.put(data.getLength(), QRUtil.getLengthInBits(data.getMode(), typeNumber2));
          data.write(buffer);
        }
        let totalDataCount = 0;
        for (let i = 0; i < rsBlocks.length; i++) {
          totalDataCount += rsBlocks[i].dataCount;
        }
        if (buffer.getLengthInBits() <= totalDataCount * 8) {
          break;
        }
      }
      _typeNumber = typeNumber2;
    }
    makeImpl(false, getBestMaskPattern());
  };
  _this.createTableTag = (cellSize, margin) => {
    cellSize = cellSize || 2;
    margin = typeof margin === 'undefined' ? cellSize * 4 : margin;
    let qrHtml = '';
    qrHtml += '<table style="';
    qrHtml += ' border-width: 0px; border-style: none;';
    qrHtml += ' border-collapse: collapse;';
    qrHtml += ` padding: 0px; margin: ${margin}px;`;
    qrHtml += '">';
    qrHtml += '<tbody>';
    for (let r = 0; r < _this.getModuleCount(); r += 1) {
      qrHtml += '<tr>';
      for (let c = 0; c < _this.getModuleCount(); c += 1) {
        qrHtml += '<td style="';
        qrHtml += ' border-width: 0px; border-style: none;';
        qrHtml += ' border-collapse: collapse;';
        qrHtml += ' padding: 0px; margin: 0px;';
        qrHtml += ` width: ${cellSize}px;`;
        qrHtml += ` height: ${cellSize}px;`;
        qrHtml += ' background-color: ';
        qrHtml += _this.isDark(r, c) ? '#000000' : '#ffffff';
        qrHtml += ';';
        qrHtml += '"/>';
      }
      qrHtml += '</tr>';
    }
    qrHtml += '</tbody>';
    qrHtml += '</table>';
    return qrHtml;
  };
  _this.createSvgTag = function (cellSize, margin, alt, title) {
    let opts = {};
    if (typeof arguments[0] === 'object') {
      opts = arguments[0];
      cellSize = opts.cellSize;
      margin = opts.margin;
      alt = opts.alt;
      title = opts.title;
    }
    cellSize = cellSize || 2;
    margin = typeof margin === 'undefined' ? cellSize * 4 : margin;
    alt = typeof alt === 'string' ? { text: alt } : alt || {};
    alt.text = alt.text || null;
    alt.id = alt.text ? alt.id || 'qrcode-description' : null;
    title = typeof title === 'string' ? { text: title } : title || {};
    title.text = title.text || null;
    title.id = title.text ? title.id || 'qrcode-title' : null;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    let c,
      mc,
      r,
      mr,
      qrSvg = '',
      rect;
    rect = `l${cellSize},0 0,${cellSize} -${cellSize},0 0,-${cellSize}z `;
    qrSvg += '<svg version="1.1" xmlns="http://www.w3.org/2000/svg"';
    qrSvg += !opts.scalable ? ` width="${size}px" height="${size}px"` : '';
    qrSvg += ` viewBox="0 0 ${size} ${size}" `;
    qrSvg += ' preserveAspectRatio="xMinYMin meet"';
    qrSvg +=
      title.text || alt.text
        ? ` role="img" aria-labelledby="${escapeXml([title.id, alt.id].join(' ').trim())}"`
        : '';
    qrSvg += '>';
    qrSvg += title.text
      ? `<title id="${escapeXml(title.id)}">${escapeXml(title.text)}</title>`
      : '';
    qrSvg += alt.text
      ? `<description id="${escapeXml(alt.id)}">${escapeXml(alt.text)}</description>`
      : '';
    qrSvg += '<rect width="100%" height="100%" fill="white" cx="0" cy="0"/>';
    qrSvg += '<path d="';
    for (r = 0; r < _this.getModuleCount(); r += 1) {
      mr = r * cellSize + margin;
      for (c = 0; c < _this.getModuleCount(); c += 1) {
        if (_this.isDark(r, c)) {
          mc = c * cellSize + margin;
          qrSvg += `M${mc},${mr}${rect}`;
        }
      }
    }
    qrSvg += '" stroke="transparent" fill="black"/>';
    qrSvg += '</svg>';
    return qrSvg;
  };
  _this.createDataURL = (cellSize, margin) => {
    cellSize = cellSize || 2;
    margin = typeof margin === 'undefined' ? cellSize * 4 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    return createDataURL(size, size, (x, y) => {
      if (min <= x && x < max && min <= y && y < max) {
        const c = Math.floor((x - min) / cellSize);
        const r = Math.floor((y - min) / cellSize);
        return _this.isDark(r, c) ? 0 : 1;
      } else {
        return 1;
      }
    });
  };
  _this.createImgTag = (cellSize, margin, alt) => {
    cellSize = cellSize || 2;
    margin = typeof margin === 'undefined' ? cellSize * 4 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    let img = '';
    img += '<img';
    img += ' src="';
    img += _this.createDataURL(cellSize, margin);
    img += '"';
    img += ' width="';
    img += size;
    img += '"';
    img += ' height="';
    img += size;
    img += '"';
    if (alt) {
      img += ' alt="';
      img += escapeXml(alt);
      img += '"';
    }
    img += '/>';
    return img;
  };
  const escapeXml = (s) => {
    let escaped = '';
    for (let i = 0; i < s.length; i += 1) {
      const c = s.charAt(i);
      switch (c) {
        case '<':
          escaped += '&lt;';
          break;
        case '>':
          escaped += '&gt;';
          break;
        case '&':
          escaped += '&amp;';
          break;
        case '"':
          escaped += '&quot;';
          break;
        default:
          escaped += c;
          break;
      }
    }
    return escaped;
  };
  const _createHalfASCII = (margin) => {
    const cellSize = 1;
    margin = typeof margin === 'undefined' ? cellSize * 2 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    let y, x, r1, r2, p;
    const blocks = {
      '\u2588\u2588': '\u2588',
      '\u2588 ': '\u2580',
      ' \u2588': '\u2584',
      '  ': ' ',
    };
    const blocksLastLineNoMargin = {
      '\u2588\u2588': '\u2580',
      '\u2588 ': '\u2580',
      ' \u2588': ' ',
      '  ': ' ',
    };
    let ascii = '';
    for (y = 0; y < size; y += 2) {
      r1 = Math.floor((y - min) / cellSize);
      r2 = Math.floor((y + 1 - min) / cellSize);
      for (x = 0; x < size; x += 1) {
        p = '\u2588';
        if (
          min <= x &&
          x < max &&
          min <= y &&
          y < max &&
          _this.isDark(r1, Math.floor((x - min) / cellSize))
        ) {
          p = ' ';
        }
        if (
          min <= x &&
          x < max &&
          min <= y + 1 &&
          y + 1 < max &&
          _this.isDark(r2, Math.floor((x - min) / cellSize))
        ) {
          p += ' ';
        } else {
          p += '\u2588';
        }
        ascii += margin < 1 && y + 1 >= max ? blocksLastLineNoMargin[p] : blocks[p];
      }
      ascii += '\n';
    }
    if (size % 2 && margin > 0) {
      return ascii.substring(0, ascii.length - size - 1) + Array(size + 1).join('\u2580');
    }
    return ascii.substring(0, ascii.length - 1);
  };
  _this.createASCII = (cellSize, margin) => {
    cellSize = cellSize || 1;
    if (cellSize < 2) {
      return _createHalfASCII(margin);
    }
    cellSize -= 1;
    margin = typeof margin === 'undefined' ? cellSize * 2 : margin;
    const size = _this.getModuleCount() * cellSize + margin * 2;
    const min = margin;
    const max = size - margin;
    let y, x, r, p;
    const white = Array(cellSize + 1).join('\u2588\u2588');
    const black = Array(cellSize + 1).join('  ');
    let ascii = '';
    let line = '';
    for (y = 0; y < size; y += 1) {
      r = Math.floor((y - min) / cellSize);
      line = '';
      for (x = 0; x < size; x += 1) {
        p = 1;
        if (
          min <= x &&
          x < max &&
          min <= y &&
          y < max &&
          _this.isDark(r, Math.floor((x - min) / cellSize))
        ) {
          p = 0;
        }
        line += p ? white : black;
      }
      for (r = 0; r < cellSize; r += 1) {
        ascii += `${line}\n`;
      }
    }
    return ascii.substring(0, ascii.length - 1);
  };
  _this.renderTo2dContext = (context, cellSize) => {
    cellSize = cellSize || 2;
    const length = _this.getModuleCount();
    for (let row = 0; row < length; row++) {
      for (let col = 0; col < length; col++) {
        context.fillStyle = _this.isDark(row, col) ? 'black' : 'white';
        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  };
  return _this;
};
qrcode.stringToBytes = (s) => {
  const bytes = [];
  for (let i = 0; i < s.length; i += 1) {
    const c = s.charCodeAt(i);
    bytes.push(c & 255);
  }
  return bytes;
};
qrcode.createStringToBytes = (unicodeData, numChars) => {
  const unicodeMap = (() => {
    const bin = base64DecodeInputStream(unicodeData);
    const read = () => {
      const b = bin.read();
      if (b === -1) throw 'eof';
      return b;
    };
    let count = 0;
    const unicodeMap2 = {};
    while (true) {
      const b0 = bin.read();
      if (b0 === -1) break;
      const b1 = read();
      const b2 = read();
      const b3 = read();
      const k = String.fromCharCode((b0 << 8) | b1);
      const v = (b2 << 8) | b3;
      unicodeMap2[k] = v;
      count += 1;
    }
    if (count !== numChars) {
      throw `${count} != ${numChars}`;
    }
    return unicodeMap2;
  })();
  const unknownChar = '?'.charCodeAt(0);
  return (s) => {
    const bytes = [];
    for (let i = 0; i < s.length; i += 1) {
      const c = s.charCodeAt(i);
      if (c < 128) {
        bytes.push(c);
      } else {
        const b = unicodeMap[s.charAt(i)];
        if (typeof b === 'number') {
          if ((b & 255) === b) {
            bytes.push(b);
          } else {
            bytes.push(b >>> 8);
            bytes.push(b & 255);
          }
        } else {
          bytes.push(unknownChar);
        }
      }
    }
    return bytes;
  };
};
var QRMode = {
  MODE_NUMBER: 1 << 0,
  MODE_ALPHA_NUM: 1 << 1,
  MODE_8BIT_BYTE: 1 << 2,
  MODE_KANJI: 1 << 3,
};
var QRErrorCorrectionLevel = {
  L: 1,
  M: 0,
  Q: 3,
  H: 2,
};
var QRMaskPattern = {
  PATTERN000: 0,
  PATTERN001: 1,
  PATTERN010: 2,
  PATTERN011: 3,
  PATTERN100: 4,
  PATTERN101: 5,
  PATTERN110: 6,
  PATTERN111: 7,
};
var QRUtil = (() => {
  const PATTERN_POSITION_TABLE = [
    [],
    [6, 18],
    [6, 22],
    [6, 26],
    [6, 30],
    [6, 34],
    [6, 22, 38],
    [6, 24, 42],
    [6, 26, 46],
    [6, 28, 50],
    [6, 30, 54],
    [6, 32, 58],
    [6, 34, 62],
    [6, 26, 46, 66],
    [6, 26, 48, 70],
    [6, 26, 50, 74],
    [6, 30, 54, 78],
    [6, 30, 56, 82],
    [6, 30, 58, 86],
    [6, 34, 62, 90],
    [6, 28, 50, 72, 94],
    [6, 26, 50, 74, 98],
    [6, 30, 54, 78, 102],
    [6, 28, 54, 80, 106],
    [6, 32, 58, 84, 110],
    [6, 30, 58, 86, 114],
    [6, 34, 62, 90, 118],
    [6, 26, 50, 74, 98, 122],
    [6, 30, 54, 78, 102, 126],
    [6, 26, 52, 78, 104, 130],
    [6, 30, 56, 82, 108, 134],
    [6, 34, 60, 86, 112, 138],
    [6, 30, 58, 86, 114, 142],
    [6, 34, 62, 90, 118, 146],
    [6, 30, 54, 78, 102, 126, 150],
    [6, 24, 50, 76, 102, 128, 154],
    [6, 28, 54, 80, 106, 132, 158],
    [6, 32, 58, 84, 110, 136, 162],
    [6, 26, 54, 82, 110, 138, 166],
    [6, 30, 58, 86, 114, 142, 170],
  ];
  const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
  const G18 =
    (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
  const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
  const _this = {};
  const getBCHDigit = (data) => {
    let digit = 0;
    while (data !== 0) {
      digit += 1;
      data >>>= 1;
    }
    return digit;
  };
  _this.getBCHTypeInfo = (data) => {
    let d = data << 10;
    while (getBCHDigit(d) - getBCHDigit(G15) >= 0) {
      d ^= G15 << (getBCHDigit(d) - getBCHDigit(G15));
    }
    return ((data << 10) | d) ^ G15_MASK;
  };
  _this.getBCHTypeNumber = (data) => {
    let d = data << 12;
    while (getBCHDigit(d) - getBCHDigit(G18) >= 0) {
      d ^= G18 << (getBCHDigit(d) - getBCHDigit(G18));
    }
    return (data << 12) | d;
  };
  _this.getPatternPosition = (typeNumber) => PATTERN_POSITION_TABLE[typeNumber - 1];
  _this.getMaskFunction = (maskPattern) => {
    switch (maskPattern) {
      case QRMaskPattern.PATTERN000:
        return (i, j) => (i + j) % 2 === 0;
      case QRMaskPattern.PATTERN001:
        return (i, _j) => i % 2 === 0;
      case QRMaskPattern.PATTERN010:
        return (_i, j) => j % 3 === 0;
      case QRMaskPattern.PATTERN011:
        return (i, j) => (i + j) % 3 === 0;
      case QRMaskPattern.PATTERN100:
        return (i, j) => (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
      case QRMaskPattern.PATTERN101:
        return (i, j) => ((i * j) % 2) + ((i * j) % 3) === 0;
      case QRMaskPattern.PATTERN110:
        return (i, j) => (((i * j) % 2) + ((i * j) % 3)) % 2 === 0;
      case QRMaskPattern.PATTERN111:
        return (i, j) => (((i * j) % 3) + ((i + j) % 2)) % 2 === 0;
      default:
        throw `bad maskPattern:${maskPattern}`;
    }
  };
  _this.getErrorCorrectPolynomial = (errorCorrectLength) => {
    let a = qrPolynomial([1], 0);
    for (let i = 0; i < errorCorrectLength; i += 1) {
      a = a.multiply(qrPolynomial([1, QRMath.gexp(i)], 0));
    }
    return a;
  };
  _this.getLengthInBits = (mode, type) => {
    if (1 <= type && type < 10) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 10;
        case QRMode.MODE_ALPHA_NUM:
          return 9;
        case QRMode.MODE_8BIT_BYTE:
          return 8;
        case QRMode.MODE_KANJI:
          return 8;
        default:
          throw `mode:${mode}`;
      }
    } else if (type < 27) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 12;
        case QRMode.MODE_ALPHA_NUM:
          return 11;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 10;
        default:
          throw `mode:${mode}`;
      }
    } else if (type < 41) {
      switch (mode) {
        case QRMode.MODE_NUMBER:
          return 14;
        case QRMode.MODE_ALPHA_NUM:
          return 13;
        case QRMode.MODE_8BIT_BYTE:
          return 16;
        case QRMode.MODE_KANJI:
          return 12;
        default:
          throw `mode:${mode}`;
      }
    } else {
      throw `type:${type}`;
    }
  };
  _this.getLostPoint = (qrcode2) => {
    const moduleCount = qrcode2.getModuleCount();
    let lostPoint = 0;
    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount; col += 1) {
        let sameCount = 0;
        const dark = qrcode2.isDark(row, col);
        for (let r = -1; r <= 1; r += 1) {
          if (row + r < 0 || moduleCount <= row + r) {
            continue;
          }
          for (let c = -1; c <= 1; c += 1) {
            if (col + c < 0 || moduleCount <= col + c) {
              continue;
            }
            if (r === 0 && c === 0) {
              continue;
            }
            if (dark === qrcode2.isDark(row + r, col + c)) {
              sameCount += 1;
            }
          }
        }
        if (sameCount > 5) {
          lostPoint += 3 + sameCount - 5;
        }
      }
    }
    for (let row = 0; row < moduleCount - 1; row += 1) {
      for (let col = 0; col < moduleCount - 1; col += 1) {
        let count = 0;
        if (qrcode2.isDark(row, col)) count += 1;
        if (qrcode2.isDark(row + 1, col)) count += 1;
        if (qrcode2.isDark(row, col + 1)) count += 1;
        if (qrcode2.isDark(row + 1, col + 1)) count += 1;
        if (count === 0 || count === 4) {
          lostPoint += 3;
        }
      }
    }
    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount - 6; col += 1) {
        if (
          qrcode2.isDark(row, col) &&
          !qrcode2.isDark(row, col + 1) &&
          qrcode2.isDark(row, col + 2) &&
          qrcode2.isDark(row, col + 3) &&
          qrcode2.isDark(row, col + 4) &&
          !qrcode2.isDark(row, col + 5) &&
          qrcode2.isDark(row, col + 6)
        ) {
          lostPoint += 40;
        }
      }
    }
    for (let col = 0; col < moduleCount; col += 1) {
      for (let row = 0; row < moduleCount - 6; row += 1) {
        if (
          qrcode2.isDark(row, col) &&
          !qrcode2.isDark(row + 1, col) &&
          qrcode2.isDark(row + 2, col) &&
          qrcode2.isDark(row + 3, col) &&
          qrcode2.isDark(row + 4, col) &&
          !qrcode2.isDark(row + 5, col) &&
          qrcode2.isDark(row + 6, col)
        ) {
          lostPoint += 40;
        }
      }
    }
    let darkCount = 0;
    for (let col = 0; col < moduleCount; col += 1) {
      for (let row = 0; row < moduleCount; row += 1) {
        if (qrcode2.isDark(row, col)) {
          darkCount += 1;
        }
      }
    }
    const ratio = Math.abs((100 * darkCount) / moduleCount / moduleCount - 50) / 5;
    lostPoint += ratio * 10;
    return lostPoint;
  };
  return _this;
})();
var QRMath = (() => {
  const EXP_TABLE = new Array(256);
  const LOG_TABLE = new Array(256);
  for (let i = 0; i < 8; i += 1) {
    EXP_TABLE[i] = 1 << i;
  }
  for (let i = 8; i < 256; i += 1) {
    EXP_TABLE[i] = EXP_TABLE[i - 4] ^ EXP_TABLE[i - 5] ^ EXP_TABLE[i - 6] ^ EXP_TABLE[i - 8];
  }
  for (let i = 0; i < 255; i += 1) {
    LOG_TABLE[EXP_TABLE[i]] = i;
  }
  const _this = {};
  _this.glog = (n) => {
    if (n < 1) {
      throw `glog(${n})`;
    }
    return LOG_TABLE[n];
  };
  _this.gexp = (n) => {
    while (n < 0) {
      n += 255;
    }
    while (n >= 256) {
      n -= 255;
    }
    return EXP_TABLE[n];
  };
  return _this;
})();
var qrPolynomial = (num, shift) => {
  if (typeof num.length === 'undefined') {
    throw `${num.length}/${shift}`;
  }
  const _num = (() => {
    let offset = 0;
    while (offset < num.length && num[offset] === 0) {
      offset += 1;
    }
    const _num2 = new Array(num.length - offset + shift);
    for (let i = 0; i < num.length - offset; i += 1) {
      _num2[i] = num[i + offset];
    }
    return _num2;
  })();
  const _this = {};
  _this.getAt = (index) => _num[index];
  _this.getLength = () => _num.length;
  _this.multiply = (e) => {
    const num2 = new Array(_this.getLength() + e.getLength() - 1);
    for (let i = 0; i < _this.getLength(); i += 1) {
      for (let j = 0; j < e.getLength(); j += 1) {
        num2[i + j] ^= QRMath.gexp(QRMath.glog(_this.getAt(i)) + QRMath.glog(e.getAt(j)));
      }
    }
    return qrPolynomial(num2, 0);
  };
  _this.mod = (e) => {
    if (_this.getLength() - e.getLength() < 0) {
      return _this;
    }
    const ratio = QRMath.glog(_this.getAt(0)) - QRMath.glog(e.getAt(0));
    const num2 = new Array(_this.getLength());
    for (let i = 0; i < _this.getLength(); i += 1) {
      num2[i] = _this.getAt(i);
    }
    for (let i = 0; i < e.getLength(); i += 1) {
      num2[i] ^= QRMath.gexp(QRMath.glog(e.getAt(i)) + ratio);
    }
    return qrPolynomial(num2, 0).mod(e);
  };
  return _this;
};
var QRRSBlock = (() => {
  const RS_BLOCK_TABLE = [
    // L
    // M
    // Q
    // H
    // 1
    [1, 26, 19],
    [1, 26, 16],
    [1, 26, 13],
    [1, 26, 9],
    // 2
    [1, 44, 34],
    [1, 44, 28],
    [1, 44, 22],
    [1, 44, 16],
    // 3
    [1, 70, 55],
    [1, 70, 44],
    [2, 35, 17],
    [2, 35, 13],
    // 4
    [1, 100, 80],
    [2, 50, 32],
    [2, 50, 24],
    [4, 25, 9],
    // 5
    [1, 134, 108],
    [2, 67, 43],
    [2, 33, 15, 2, 34, 16],
    [2, 33, 11, 2, 34, 12],
    // 6
    [2, 86, 68],
    [4, 43, 27],
    [4, 43, 19],
    [4, 43, 15],
    // 7
    [2, 98, 78],
    [4, 49, 31],
    [2, 32, 14, 4, 33, 15],
    [4, 39, 13, 1, 40, 14],
    // 8
    [2, 121, 97],
    [2, 60, 38, 2, 61, 39],
    [4, 40, 18, 2, 41, 19],
    [4, 40, 14, 2, 41, 15],
    // 9
    [2, 146, 116],
    [3, 58, 36, 2, 59, 37],
    [4, 36, 16, 4, 37, 17],
    [4, 36, 12, 4, 37, 13],
    // 10
    [2, 86, 68, 2, 87, 69],
    [4, 69, 43, 1, 70, 44],
    [6, 43, 19, 2, 44, 20],
    [6, 43, 15, 2, 44, 16],
    // 11
    [4, 101, 81],
    [1, 80, 50, 4, 81, 51],
    [4, 50, 22, 4, 51, 23],
    [3, 36, 12, 8, 37, 13],
    // 12
    [2, 116, 92, 2, 117, 93],
    [6, 58, 36, 2, 59, 37],
    [4, 46, 20, 6, 47, 21],
    [7, 42, 14, 4, 43, 15],
    // 13
    [4, 133, 107],
    [8, 59, 37, 1, 60, 38],
    [8, 44, 20, 4, 45, 21],
    [12, 33, 11, 4, 34, 12],
    // 14
    [3, 145, 115, 1, 146, 116],
    [4, 64, 40, 5, 65, 41],
    [11, 36, 16, 5, 37, 17],
    [11, 36, 12, 5, 37, 13],
    // 15
    [5, 109, 87, 1, 110, 88],
    [5, 65, 41, 5, 66, 42],
    [5, 54, 24, 7, 55, 25],
    [11, 36, 12, 7, 37, 13],
    // 16
    [5, 122, 98, 1, 123, 99],
    [7, 73, 45, 3, 74, 46],
    [15, 43, 19, 2, 44, 20],
    [3, 45, 15, 13, 46, 16],
    // 17
    [1, 135, 107, 5, 136, 108],
    [10, 74, 46, 1, 75, 47],
    [1, 50, 22, 15, 51, 23],
    [2, 42, 14, 17, 43, 15],
    // 18
    [5, 150, 120, 1, 151, 121],
    [9, 69, 43, 4, 70, 44],
    [17, 50, 22, 1, 51, 23],
    [2, 42, 14, 19, 43, 15],
    // 19
    [3, 141, 113, 4, 142, 114],
    [3, 70, 44, 11, 71, 45],
    [17, 47, 21, 4, 48, 22],
    [9, 39, 13, 16, 40, 14],
    // 20
    [3, 135, 107, 5, 136, 108],
    [3, 67, 41, 13, 68, 42],
    [15, 54, 24, 5, 55, 25],
    [15, 43, 15, 10, 44, 16],
    // 21
    [4, 144, 116, 4, 145, 117],
    [17, 68, 42],
    [17, 50, 22, 6, 51, 23],
    [19, 46, 16, 6, 47, 17],
    // 22
    [2, 139, 111, 7, 140, 112],
    [17, 74, 46],
    [7, 54, 24, 16, 55, 25],
    [34, 37, 13],
    // 23
    [4, 151, 121, 5, 152, 122],
    [4, 75, 47, 14, 76, 48],
    [11, 54, 24, 14, 55, 25],
    [16, 45, 15, 14, 46, 16],
    // 24
    [6, 147, 117, 4, 148, 118],
    [6, 73, 45, 14, 74, 46],
    [11, 54, 24, 16, 55, 25],
    [30, 46, 16, 2, 47, 17],
    // 25
    [8, 132, 106, 4, 133, 107],
    [8, 75, 47, 13, 76, 48],
    [7, 54, 24, 22, 55, 25],
    [22, 45, 15, 13, 46, 16],
    // 26
    [10, 142, 114, 2, 143, 115],
    [19, 74, 46, 4, 75, 47],
    [28, 50, 22, 6, 51, 23],
    [33, 46, 16, 4, 47, 17],
    // 27
    [8, 152, 122, 4, 153, 123],
    [22, 73, 45, 3, 74, 46],
    [8, 53, 23, 26, 54, 24],
    [12, 45, 15, 28, 46, 16],
    // 28
    [3, 147, 117, 10, 148, 118],
    [3, 73, 45, 23, 74, 46],
    [4, 54, 24, 31, 55, 25],
    [11, 45, 15, 31, 46, 16],
    // 29
    [7, 146, 116, 7, 147, 117],
    [21, 73, 45, 7, 74, 46],
    [1, 53, 23, 37, 54, 24],
    [19, 45, 15, 26, 46, 16],
    // 30
    [5, 145, 115, 10, 146, 116],
    [19, 75, 47, 10, 76, 48],
    [15, 54, 24, 25, 55, 25],
    [23, 45, 15, 25, 46, 16],
    // 31
    [13, 145, 115, 3, 146, 116],
    [2, 74, 46, 29, 75, 47],
    [42, 54, 24, 1, 55, 25],
    [23, 45, 15, 28, 46, 16],
    // 32
    [17, 145, 115],
    [10, 74, 46, 23, 75, 47],
    [10, 54, 24, 35, 55, 25],
    [19, 45, 15, 35, 46, 16],
    // 33
    [17, 145, 115, 1, 146, 116],
    [14, 74, 46, 21, 75, 47],
    [29, 54, 24, 19, 55, 25],
    [11, 45, 15, 46, 46, 16],
    // 34
    [13, 145, 115, 6, 146, 116],
    [14, 74, 46, 23, 75, 47],
    [44, 54, 24, 7, 55, 25],
    [59, 46, 16, 1, 47, 17],
    // 35
    [12, 151, 121, 7, 152, 122],
    [12, 75, 47, 26, 76, 48],
    [39, 54, 24, 14, 55, 25],
    [22, 45, 15, 41, 46, 16],
    // 36
    [6, 151, 121, 14, 152, 122],
    [6, 75, 47, 34, 76, 48],
    [46, 54, 24, 10, 55, 25],
    [2, 45, 15, 64, 46, 16],
    // 37
    [17, 152, 122, 4, 153, 123],
    [29, 74, 46, 14, 75, 47],
    [49, 54, 24, 10, 55, 25],
    [24, 45, 15, 46, 46, 16],
    // 38
    [4, 152, 122, 18, 153, 123],
    [13, 74, 46, 32, 75, 47],
    [48, 54, 24, 14, 55, 25],
    [42, 45, 15, 32, 46, 16],
    // 39
    [20, 147, 117, 4, 148, 118],
    [40, 75, 47, 7, 76, 48],
    [43, 54, 24, 22, 55, 25],
    [10, 45, 15, 67, 46, 16],
    // 40
    [19, 148, 118, 6, 149, 119],
    [18, 75, 47, 31, 76, 48],
    [34, 54, 24, 34, 55, 25],
    [20, 45, 15, 61, 46, 16],
  ];
  const qrRSBlock = (totalCount, dataCount) => {
    const _this2 = {};
    _this2.totalCount = totalCount;
    _this2.dataCount = dataCount;
    return _this2;
  };
  const _this = {};
  const getRsBlockTable = (typeNumber, errorCorrectionLevel) => {
    switch (errorCorrectionLevel) {
      case QRErrorCorrectionLevel.L:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
      case QRErrorCorrectionLevel.M:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
      case QRErrorCorrectionLevel.Q:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
      case QRErrorCorrectionLevel.H:
        return RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
      default:
        return void 0;
    }
  };
  _this.getRSBlocks = (typeNumber, errorCorrectionLevel) => {
    const rsBlock = getRsBlockTable(typeNumber, errorCorrectionLevel);
    if (typeof rsBlock === 'undefined') {
      throw `bad rs block @ typeNumber:${typeNumber}/errorCorrectionLevel:${errorCorrectionLevel}`;
    }
    const length = rsBlock.length / 3;
    const list = [];
    for (let i = 0; i < length; i += 1) {
      const count = rsBlock[i * 3 + 0];
      const totalCount = rsBlock[i * 3 + 1];
      const dataCount = rsBlock[i * 3 + 2];
      for (let j = 0; j < count; j += 1) {
        list.push(qrRSBlock(totalCount, dataCount));
      }
    }
    return list;
  };
  return _this;
})();
var qrBitBuffer = () => {
  const _buffer = [];
  let _length = 0;
  const _this = {};
  _this.getBuffer = () => _buffer;
  _this.getAt = (index) => {
    const bufIndex = Math.floor(index / 8);
    return ((_buffer[bufIndex] >>> (7 - (index % 8))) & 1) === 1;
  };
  _this.put = (num, length) => {
    for (let i = 0; i < length; i += 1) {
      _this.putBit(((num >>> (length - i - 1)) & 1) === 1);
    }
  };
  _this.getLengthInBits = () => _length;
  _this.putBit = (bit) => {
    const bufIndex = Math.floor(_length / 8);
    if (_buffer.length <= bufIndex) {
      _buffer.push(0);
    }
    if (bit) {
      _buffer[bufIndex] |= 128 >>> (_length % 8);
    }
    _length += 1;
  };
  return _this;
};
var qrNumber = (data) => {
  const _mode = QRMode.MODE_NUMBER;
  const _data = data;
  const _this = {};
  _this.getMode = () => _mode;
  _this.getLength = (_buffer) => _data.length;
  _this.write = (buffer) => {
    const data2 = _data;
    let i = 0;
    while (i + 2 < data2.length) {
      buffer.put(strToNum(data2.substring(i, i + 3)), 10);
      i += 3;
    }
    if (i < data2.length) {
      if (data2.length - i === 1) {
        buffer.put(strToNum(data2.substring(i, i + 1)), 4);
      } else if (data2.length - i === 2) {
        buffer.put(strToNum(data2.substring(i, i + 2)), 7);
      }
    }
  };
  const strToNum = (s) => {
    let num = 0;
    for (let i = 0; i < s.length; i += 1) {
      num = num * 10 + chatToNum(s.charAt(i));
    }
    return num;
  };
  const chatToNum = (c) => {
    if ('0' <= c && c <= '9') {
      return c.charCodeAt(0) - '0'.charCodeAt(0);
    }
    throw `illegal char :${c}`;
  };
  return _this;
};
var qrAlphaNum = (data) => {
  const _mode = QRMode.MODE_ALPHA_NUM;
  const _data = data;
  const _this = {};
  _this.getMode = () => _mode;
  _this.getLength = (_buffer) => _data.length;
  _this.write = (buffer) => {
    const s = _data;
    let i = 0;
    while (i + 1 < s.length) {
      buffer.put(getCode(s.charAt(i)) * 45 + getCode(s.charAt(i + 1)), 11);
      i += 2;
    }
    if (i < s.length) {
      buffer.put(getCode(s.charAt(i)), 6);
    }
  };
  const getCode = (c) => {
    if ('0' <= c && c <= '9') {
      return c.charCodeAt(0) - '0'.charCodeAt(0);
    } else if ('A' <= c && c <= 'Z') {
      return c.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
    } else {
      switch (c) {
        case ' ':
          return 36;
        case '$':
          return 37;
        case '%':
          return 38;
        case '*':
          return 39;
        case '+':
          return 40;
        case '-':
          return 41;
        case '.':
          return 42;
        case '/':
          return 43;
        case ':':
          return 44;
        default:
          throw `illegal char :${c}`;
      }
    }
  };
  return _this;
};
var qr8BitByte = (data) => {
  const _mode = QRMode.MODE_8BIT_BYTE;
  const _data = data;
  const _bytes = qrcode.stringToBytes(data);
  const _this = {};
  _this.getMode = () => _mode;
  _this.getLength = (_buffer) => _bytes.length;
  _this.write = (buffer) => {
    for (let i = 0; i < _bytes.length; i += 1) {
      buffer.put(_bytes[i], 8);
    }
  };
  return _this;
};
var qrKanji = (data) => {
  const _mode = QRMode.MODE_KANJI;
  const _data = data;
  const stringToBytes2 = qrcode.stringToBytes;
  !((c, code) => {
    const test = stringToBytes2(c);
    if (test.length !== 2 || ((test[0] << 8) | test[1]) !== code) {
      throw 'sjis not supported.';
    }
  })('\u53CB', 38726);
  const _bytes = stringToBytes2(data);
  const _this = {};
  _this.getMode = () => _mode;
  _this.getLength = (_buffer) => ~~(_bytes.length / 2);
  _this.write = (buffer) => {
    const data2 = _bytes;
    let i = 0;
    while (i + 1 < data2.length) {
      let c = ((255 & data2[i]) << 8) | (255 & data2[i + 1]);
      if (33088 <= c && c <= 40956) {
        c -= 33088;
      } else if (57408 <= c && c <= 60351) {
        c -= 49472;
      } else {
        throw `illegal char at ${i + 1}/${c}`;
      }
      c = ((c >>> 8) & 255) * 192 + (c & 255);
      buffer.put(c, 13);
      i += 2;
    }
    if (i < data2.length) {
      throw `illegal char at ${i + 1}`;
    }
  };
  return _this;
};
var byteArrayOutputStream = () => {
  const _bytes = [];
  const _this = {};
  _this.writeByte = (b) => {
    _bytes.push(b & 255);
  };
  _this.writeShort = (i) => {
    _this.writeByte(i);
    _this.writeByte(i >>> 8);
  };
  _this.writeBytes = (b, off, len) => {
    off = off || 0;
    len = len || b.length;
    for (let i = 0; i < len; i += 1) {
      _this.writeByte(b[i + off]);
    }
  };
  _this.writeString = (s) => {
    for (let i = 0; i < s.length; i += 1) {
      _this.writeByte(s.charCodeAt(i));
    }
  };
  _this.toByteArray = () => _bytes;
  _this.toString = () => {
    let s = '';
    s += '[';
    for (let i = 0; i < _bytes.length; i += 1) {
      if (i > 0) {
        s += ',';
      }
      s += _bytes[i];
    }
    s += ']';
    return s;
  };
  return _this;
};
var base64EncodeOutputStream = () => {
  let _buffer = 0;
  let _buflen = 0;
  let _length = 0;
  let _base64 = '';
  const _this = {};
  const writeEncoded = (b) => {
    _base64 += String.fromCharCode(encode(b & 63));
  };
  const encode = (n) => {
    if (n < 0) {
      throw `n:${n}`;
    } else if (n < 26) {
      return 65 + n;
    } else if (n < 52) {
      return 97 + (n - 26);
    } else if (n < 62) {
      return 48 + (n - 52);
    } else if (n === 62) {
      return 43;
    } else if (n === 63) {
      return 47;
    } else {
      throw `n:${n}`;
    }
  };
  _this.writeByte = (n) => {
    _buffer = (_buffer << 8) | (n & 255);
    _buflen += 8;
    _length += 1;
    while (_buflen >= 6) {
      writeEncoded(_buffer >>> (_buflen - 6));
      _buflen -= 6;
    }
  };
  _this.flush = () => {
    if (_buflen > 0) {
      writeEncoded(_buffer << (6 - _buflen));
      _buffer = 0;
      _buflen = 0;
    }
    if (_length % 3 !== 0) {
      const padlen = 3 - (_length % 3);
      for (let i = 0; i < padlen; i += 1) {
        _base64 += '=';
      }
    }
  };
  _this.toString = () => _base64;
  return _this;
};
var base64DecodeInputStream = (str) => {
  const _str = str;
  let _pos = 0;
  let _buffer = 0;
  let _buflen = 0;
  const _this = {};
  _this.read = () => {
    while (_buflen < 8) {
      if (_pos >= _str.length) {
        if (_buflen === 0) {
          return -1;
        }
        throw `unexpected end of file./${_buflen}`;
      }
      const c = _str.charAt(_pos);
      _pos += 1;
      if (c === '=') {
        _buflen = 0;
        return -1;
      } else if (c.match(/^\s$/)) {
        continue;
      }
      _buffer = (_buffer << 6) | decode(c.charCodeAt(0));
      _buflen += 6;
    }
    const n = (_buffer >>> (_buflen - 8)) & 255;
    _buflen -= 8;
    return n;
  };
  const decode = (c) => {
    if (65 <= c && c <= 90) {
      return c - 65;
    } else if (97 <= c && c <= 122) {
      return c - 97 + 26;
    } else if (48 <= c && c <= 57) {
      return c - 48 + 52;
    } else if (c === 43) {
      return 62;
    } else if (c === 47) {
      return 63;
    } else {
      throw `c:${c}`;
    }
  };
  return _this;
};
var gifImage = (width, height) => {
  const _width = width;
  const _height = height;
  const _data = new Array(width * height);
  const _this = {};
  _this.setPixel = (x, y, pixel) => {
    _data[y * _width + x] = pixel;
  };
  _this.write = (out) => {
    out.writeString('GIF87a');
    out.writeShort(_width);
    out.writeShort(_height);
    out.writeByte(128);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(0);
    out.writeByte(255);
    out.writeByte(255);
    out.writeByte(255);
    out.writeString(',');
    out.writeShort(0);
    out.writeShort(0);
    out.writeShort(_width);
    out.writeShort(_height);
    out.writeByte(0);
    const lzwMinCodeSize = 2;
    const raster = getLZWRaster(lzwMinCodeSize);
    out.writeByte(lzwMinCodeSize);
    let offset = 0;
    while (raster.length - offset > 255) {
      out.writeByte(255);
      out.writeBytes(raster, offset, 255);
      offset += 255;
    }
    out.writeByte(raster.length - offset);
    out.writeBytes(raster, offset, raster.length - offset);
    out.writeByte(0);
    out.writeString(';');
  };
  const bitOutputStream = (out) => {
    const _out = out;
    let _bitLength = 0;
    let _bitBuffer = 0;
    const _this2 = {};
    _this2.write = (data, length) => {
      if (data >>> length !== 0) {
        throw 'length over';
      }
      while (_bitLength + length >= 8) {
        _out.writeByte(255 & ((data << _bitLength) | _bitBuffer));
        length -= 8 - _bitLength;
        data >>>= 8 - _bitLength;
        _bitBuffer = 0;
        _bitLength = 0;
      }
      _bitBuffer = (data << _bitLength) | _bitBuffer;
      _bitLength = _bitLength + length;
    };
    _this2.flush = () => {
      if (_bitLength > 0) {
        _out.writeByte(_bitBuffer);
      }
    };
    return _this2;
  };
  const getLZWRaster = (lzwMinCodeSize) => {
    const clearCode = 1 << lzwMinCodeSize;
    const endCode = (1 << lzwMinCodeSize) + 1;
    let bitLength = lzwMinCodeSize + 1;
    const table = lzwTable();
    for (let i = 0; i < clearCode; i += 1) {
      table.add(String.fromCharCode(i));
    }
    table.add(String.fromCharCode(clearCode));
    table.add(String.fromCharCode(endCode));
    const byteOut = byteArrayOutputStream();
    const bitOut = bitOutputStream(byteOut);
    bitOut.write(clearCode, bitLength);
    let dataIndex = 0;
    let s = String.fromCharCode(_data[dataIndex]);
    dataIndex += 1;
    while (dataIndex < _data.length) {
      const c = String.fromCharCode(_data[dataIndex]);
      dataIndex += 1;
      if (table.contains(s + c)) {
        s = s + c;
      } else {
        bitOut.write(table.indexOf(s), bitLength);
        if (table.size() < 4095) {
          if (table.size() === 1 << bitLength) {
            bitLength += 1;
          }
          table.add(s + c);
        }
        s = c;
      }
    }
    bitOut.write(table.indexOf(s), bitLength);
    bitOut.write(endCode, bitLength);
    bitOut.flush();
    return byteOut.toByteArray();
  };
  const lzwTable = () => {
    const _map = {};
    let _size = 0;
    const _this2 = {};
    _this2.add = (key) => {
      if (_this2.contains(key)) {
        throw `dup key:${key}`;
      }
      _map[key] = _size;
      _size += 1;
    };
    _this2.size = () => _size;
    _this2.indexOf = (key) => _map[key];
    _this2.contains = (key) => typeof _map[key] !== 'undefined';
    return _this2;
  };
  return _this;
};
var createDataURL = (width, height, getPixel) => {
  const gif = gifImage(width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      gif.setPixel(x, y, getPixel(x, y));
    }
  }
  const b = byteArrayOutputStream();
  gif.write(b);
  const base64 = base64EncodeOutputStream();
  const bytes = b.toByteArray();
  for (let i = 0; i < bytes.length; i += 1) {
    base64.writeByte(bytes[i]);
  }
  base64.flush();
  return `data:image/gif;base64,${base64}`;
};
var qrcode_default = qrcode;
var _stringToBytes = qrcode.stringToBytes;

// src/modules/blue-noise-dither.ts
var ECC_MAP = {
  L: 'L',
  M: 'M',
  Q: 'Q',
  H: 'H',
  low: 'L',
  medium: 'M',
  quartile: 'Q',
  high: 'H',
};
var ALIGNMENT_POSITIONS = [
  null,
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
];
var BLUE_NOISE_TILE_SIZE = 64;
var BLUE_NOISE_64 = generateBlueNoiseTile();
function generateBlueNoiseTile() {
  const size = BLUE_NOISE_TILE_SIZE;
  const tile = new Array(size * size);
  const phi = 1.618033988749895;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const ign = (52.9829189 * ((0.06711056 * x + 583715e-8 * y) % 1)) % 1;
      const offset = (x * phi + y * phi * phi) % 1;
      tile[y * size + x] = (ign + offset * 0.5) % 1;
    }
  }
  return tile;
}
function sampleBlueNoise(x, y) {
  const size = BLUE_NOISE_TILE_SIZE;
  const tx = ((x % size) + size) % size;
  const ty = ((y % size) + size) % size;
  return BLUE_NOISE_64[ty * size + tx];
}
function isLocked(moduleCount, x, y, scale) {
  const l = moduleCount / scale;
  const sx = Math.floor(x / scale);
  const sy = Math.floor(y / scale);
  if (sx < 0 || sy < 0 || sx >= l || sy >= l) return true;
  if (sx < 7 && sy < 7) return true;
  if (sx < 7 && sy > l - 8) return true;
  if (sx > l - 8 && sy < 7) return true;
  if (sx === 6 || sy === 6) return true;
  const version = (l - 17) / 4;
  const positions = ALIGNMENT_POSITIONS[version];
  if (positions && positions.length > 0) {
    for (const px of positions) {
      for (const py of positions) {
        if (px < 8 && py < 8) continue;
        if (px < 8 && py > l - 9) continue;
        if (px > l - 9 && py < 8) continue;
        if (Math.abs(sx - px) <= 2 && Math.abs(sy - py) <= 2) {
          return true;
        }
      }
    }
  }
  return false;
}
function isData(x, y, scale) {
  const m = Math.floor(scale / 2);
  const xs = x % scale;
  const ys = y % scale;
  if (xs === m && ys === m) return true;
  if (scale % 2 === 1) return false;
  if (xs === m && ys === m - 1) return true;
  if (xs === m - 1 && ys === m) return true;
  if (xs === m - 1 && ys === m - 1) return true;
  return false;
}
function loadImageDataRGB(canvas, size) {
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
function rgbToGray(r, g, b) {
  return r * 0.299 + g * 0.587 + b * 0.114;
}
function convertToGrayscale(imageData) {
  for (let y = 0; y < imageData.length; y++) {
    for (let x = 0; x < imageData[y].length; x++) {
      const { r, g, b } = imageData[y][x];
      const gray = rgbToGray(r, g, b);
      imageData[y][x] = { r: gray, g: gray, b: gray };
    }
  }
}
function blueNoiseDitherFreePoints(imageData, moduleCount, scale, colorMode) {
  const size = imageData.length;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (isLocked(moduleCount, x, y, scale)) continue;
      if (isData(x, y, scale)) continue;
      const pixel = imageData[y][x];
      const threshold = sampleBlueNoise(x, y);
      if (colorMode === 'bw') {
        const gray = rgbToGray(pixel.r, pixel.g, pixel.b);
        const newVal = gray > threshold ? 1 : 0;
        imageData[y][x] = { r: newVal, g: newVal, b: newVal };
      } else if (colorMode === 'grayscale') {
        const gray = rgbToGray(pixel.r, pixel.g, pixel.b);
        const levels = 4;
        const scaled = gray * (levels - 1);
        const low = Math.floor(scaled);
        const high = Math.min(low + 1, levels - 1);
        const frac = scaled - low;
        const newVal = (frac > threshold ? high : low) / (levels - 1);
        imageData[y][x] = { r: newVal, g: newVal, b: newVal };
      } else {
        const quantizeChannel = (val, noiseOffset) => {
          const t = (threshold + noiseOffset) % 1;
          const scaled = val * (levels - 1);
          const low = Math.floor(scaled);
          const high = Math.min(low + 1, levels - 1);
          const frac = scaled - low;
          return (frac > t ? high : low) / (levels - 1);
        };
        const levels = 4;
        imageData[y][x] = {
          r: quantizeChannel(pixel.r, 0),
          g: quantizeChannel(pixel.g, 0.33),
          b: quantizeChannel(pixel.b, 0.67),
        };
      }
    }
  }
}
function generateBlueNoiseDithered(options) {
  const {
    text,
    ecc,
    version = 0,
    scale,
    overlayCanvas,
    overlayIntensity = 50,
    colorMode = 'color',
  } = options;
  const eccLevel = ECC_MAP[ecc] || 'Q';
  const typeNumber = version || 0;
  const qr = qrcode_default(typeNumber, eccLevel);
  qr.addData(text);
  qr.make();
  const moduleCount = qr.getModuleCount();
  const scaledSize = moduleCount * scale;
  const matrix = [];
  const colors = [];
  for (let y = 0; y < scaledSize; y++) {
    const matrixRow = [];
    const colorRow = [];
    for (let x = 0; x < scaledSize; x++) {
      const qrX = Math.floor(x / scale);
      const qrY = Math.floor(y / scale);
      const isDark = qr.isDark(qrY, qrX);
      matrixRow.push(isDark);
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 });
    }
    matrix.push(matrixRow);
    colors.push(colorRow);
  }
  if (!overlayCanvas) {
    return { matrix, colors };
  }
  const imageData = loadImageDataRGB(overlayCanvas, scaledSize);
  const intensity = overlayIntensity / 100;
  if (colorMode === 'grayscale' || colorMode === 'bw') {
    convertToGrayscale(imageData);
  }
  blueNoiseDitherFreePoints(imageData, scaledSize, scale, colorMode);
  for (let y = 0; y < scaledSize; y++) {
    for (let x = 0; x < scaledSize; x++) {
      if (isLocked(scaledSize, x, y, scale)) continue;
      if (isData(x, y, scale)) continue;
      const pixel = imageData[y][x];
      const brightness = rgbToGray(pixel.r, pixel.g, pixel.b);
      const useImage = sampleBlueNoise(x + 17, y + 31) < intensity;
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

// src/modules/qr-core.ts
var ALIGNMENT_POSITIONS2 = [
  null,
  [],
  [6, 18],
  [6, 22],
  [6, 26],
  [6, 30],
  [6, 34],
  [6, 22, 38],
  [6, 24, 42],
  [6, 26, 46],
  [6, 28, 50],
  [6, 30, 54],
  [6, 32, 58],
  [6, 34, 62],
  [6, 26, 46, 66],
  [6, 26, 48, 70],
  [6, 26, 50, 74],
  [6, 30, 54, 78],
  [6, 30, 56, 82],
  [6, 30, 58, 86],
  [6, 34, 62, 90],
  [6, 28, 50, 72, 94],
  [6, 26, 50, 74, 98],
  [6, 30, 54, 78, 102],
  [6, 28, 54, 80, 106],
  [6, 32, 58, 84, 110],
  [6, 30, 58, 86, 114],
  [6, 34, 62, 90, 118],
  [6, 26, 50, 74, 98, 122],
  [6, 30, 54, 78, 102, 126],
  [6, 26, 52, 78, 104, 130],
  [6, 30, 56, 82, 108, 134],
  [6, 34, 60, 86, 112, 138],
  [6, 30, 58, 86, 114, 142],
  [6, 34, 62, 90, 118, 146],
  [6, 30, 54, 78, 102, 126, 150],
  [6, 24, 50, 76, 102, 128, 154],
  [6, 28, 54, 80, 106, 132, 158],
  [6, 32, 58, 84, 110, 136, 162],
  [6, 26, 54, 82, 110, 138, 166],
  [6, 30, 58, 86, 114, 142, 170],
];
var ECC_CAPACITIES = {
  L: [
    17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792, 858,
    929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628, 1732, 1840, 1952, 2068, 2188, 2303, 2431,
    2563, 2699, 2809, 2953,
  ],
  M: [
    14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624, 666,
    711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809, 1911, 1989,
    2099, 2213, 2331,
  ],
  Q: [
    11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482,
    509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423,
    1499, 1579, 1663,
  ],
  H: [
    7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382, 403,
    439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139, 1219,
    1273,
  ],
};
function calculateOptimalVersion(content, ecc) {
  const caps = ECC_CAPACITIES[ecc];
  const len = content.length;
  for (let v = 0; v < caps.length; v++) {
    if (caps[v] >= len) {
      return v + 1;
    }
  }
  return 40;
}
function getVersionFromModuleCount(moduleCount) {
  return (moduleCount - 17) / 4;
}
function getAlignmentPositions(version) {
  if (version < 2 || version > 40) return [];
  return ALIGNMENT_POSITIONS2[version] || [];
}
function isLocked2(moduleCount, x, y, scale = 1) {
  const l = moduleCount / scale;
  const sx = Math.floor(x / scale);
  const sy = Math.floor(y / scale);
  if (sx < 0 || sy < 0 || sx >= l || sy >= l) return true;
  if (sx < 7 && sy < 7) return true;
  if (sx < 7 && sy > l - 8) return true;
  if (sx > l - 8 && sy < 7) return true;
  if (sx === 6 || sy === 6) return true;
  const version = getVersionFromModuleCount(l);
  const positions = getAlignmentPositions(version);
  if (positions.length > 0) {
    for (const px of positions) {
      for (const py of positions) {
        if (px < 8 && py < 8) continue;
        if (px < 8 && py > l - 9) continue;
        if (px > l - 9 && py < 8) continue;
        if (Math.abs(sx - px) <= 2 && Math.abs(sy - py) <= 2) {
          return true;
        }
      }
    }
  }
  return false;
}
function isData2(x, y, scale) {
  const m = Math.floor(scale / 2);
  const xs = x % scale;
  const ys = y % scale;
  if (xs === m && ys === m) return true;
  if (scale % 2 === 1) return false;
  if (xs === m && ys === m - 1) return true;
  if (xs === m - 1 && ys === m) return true;
  if (xs === m - 1 && ys === m - 1) return true;
  return false;
}
function generateQR(options) {
  const { text, ecc, version = 0, scale = 1 } = options;
  let typeNumber = version;
  if (typeNumber === 0) {
    typeNumber = calculateOptimalVersion(text, ecc);
  }
  const qr = qrcode_default(typeNumber, ecc);
  qr.addData(text);
  qr.make();
  const moduleCount = qr.getModuleCount();
  const scaledSize = moduleCount * scale;
  const matrix = [];
  for (let y = 0; y < scaledSize; y++) {
    const row = [];
    for (let x = 0; x < scaledSize; x++) {
      const qrX = Math.floor(x / scale);
      const qrY = Math.floor(y / scale);
      row.push(qr.isDark(qrY, qrX));
    }
    matrix.push(row);
  }
  return {
    matrix,
    moduleCount: scaledSize,
    version: typeNumber,
  };
}

// src/modules/color-utils.ts
function parseHex(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  return {
    r: parseInt(hex.substr(0, 2), 16),
    g: parseInt(hex.substr(2, 2), 16),
    b: parseInt(hex.substr(4, 2), 16),
  };
}
function parseHexAlpha(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }
  const rgb = parseHex(hex.substr(0, 6));
  const a = hex.length >= 8 ? parseInt(hex.substr(6, 2), 16) / 255 : 1;
  return { ...rgb, a };
}
function parseRgbString(str) {
  const match = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10),
      a: match[4] !== void 0 ? parseFloat(match[4]) : 1,
    };
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}
function parseHslString(str) {
  const match = str.match(/hsla?\((\d+),\s*([\d.]+)%?,\s*([\d.]+)%?(?:,\s*([\d.]+))?\)/);
  if (match) {
    return {
      h: parseInt(match[1], 10),
      s: parseFloat(match[2]),
      l: parseFloat(match[3]),
      a: match[4] !== void 0 ? parseFloat(match[4]) : 1,
    };
  }
  return { h: 0, s: 0, l: 0, a: 1 };
}
function parseColor(color) {
  color = color.trim().toLowerCase();
  if (color.startsWith('#')) {
    return parseHexAlpha(color);
  }
  if (color.startsWith('rgb')) {
    return parseRgbString(color);
  }
  if (color.startsWith('hsl')) {
    const hsl = parseHslString(color);
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    return { ...rgb, a: hsl.a };
  }
  const namedColors = {
    black: '#000000',
    white: '#ffffff',
    red: '#ff0000',
    green: '#00ff00',
    blue: '#0000ff',
    yellow: '#ffff00',
    cyan: '#00ffff',
    magenta: '#ff00ff',
    gray: '#808080',
    grey: '#808080',
    transparent: '#00000000',
  };
  if (namedColors[color]) {
    return parseHexAlpha(namedColors[color]);
  }
  return { r: 0, g: 0, b: 0, a: 1 };
}
function rgbToHex(r, g, b) {
  const toHex = (n) => Math.round(n).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function rgbaToString(r, g, b, a) {
  return `rgba(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)}, ${a})`;
}
function hslToRgb(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p2, q2, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
      if (t < 1 / 2) return q2;
      if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
      return p2;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}
function blendColors(color1, color2, ratio) {
  const c1 = parseColor(color1);
  const c2 = parseColor(color2);
  const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
  const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
  const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
  const a = c1.a + (c2.a - c1.a) * ratio;
  if (a < 1) {
    return rgbaToString(r, g, b, a);
  }
  return rgbToHex(r, g, b);
}

// src/modules/dither-algorithms.ts
var BAYER_2 = [
  [0, 2],
  [3, 1],
];
var BAYER_4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
var BAYER_8 = [
  [0, 32, 8, 40, 2, 34, 10, 42],
  [48, 16, 56, 24, 50, 18, 58, 26],
  [12, 44, 4, 36, 14, 46, 6, 38],
  [60, 28, 52, 20, 62, 30, 54, 22],
  [3, 35, 11, 43, 1, 33, 9, 41],
  [51, 19, 59, 27, 49, 17, 57, 25],
  [15, 47, 7, 39, 13, 45, 5, 37],
  [63, 31, 55, 23, 61, 29, 53, 21],
];
var CLUSTERED_DOT = [
  [24, 10, 12, 26, 35, 47, 49, 37],
  [8, 0, 2, 14, 45, 59, 61, 51],
  [22, 6, 4, 16, 43, 57, 63, 53],
  [30, 20, 18, 28, 33, 41, 55, 39],
  [34, 46, 48, 36, 25, 11, 13, 27],
  [44, 58, 60, 50, 9, 1, 3, 15],
  [42, 56, 62, 52, 23, 7, 5, 17],
  [32, 40, 54, 38, 31, 21, 19, 29],
];
var VOID_CLUSTER = [
  [13, 9, 5, 12, 18, 22, 26, 19],
  [6, 1, 0, 8, 25, 30, 31, 23],
  [10, 2, 3, 4, 21, 29, 28, 27],
  [14, 7, 11, 15, 17, 24, 20, 16],
  [18, 22, 26, 19, 13, 9, 5, 12],
  [25, 30, 31, 23, 6, 1, 0, 8],
  [21, 29, 28, 27, 10, 2, 3, 4],
  [17, 24, 20, 16, 14, 7, 11, 15],
];
var DIFFUSION_KERNELS = {
  floyd_steinberg: {
    matrix: [
      [0, 0, 7],
      [3, 5, 1],
    ],
    divisor: 16,
    offset: 1,
  },
  jarvis_judice_ninke: {
    matrix: [
      [0, 0, 0, 7, 5],
      [3, 5, 7, 5, 3],
      [1, 3, 5, 3, 1],
    ],
    divisor: 48,
    offset: 2,
  },
  stucki: {
    matrix: [
      [0, 0, 0, 8, 4],
      [2, 4, 8, 4, 2],
      [1, 2, 4, 2, 1],
    ],
    divisor: 42,
    offset: 2,
  },
  burkes: {
    matrix: [
      [0, 0, 0, 8, 4],
      [2, 4, 8, 4, 2],
    ],
    divisor: 32,
    offset: 2,
  },
  sierra: {
    matrix: [
      [0, 0, 0, 5, 3],
      [2, 4, 5, 4, 2],
      [0, 2, 3, 2, 0],
    ],
    divisor: 32,
    offset: 2,
  },
  sierra_2: {
    matrix: [
      [0, 0, 0, 4, 3],
      [1, 2, 3, 2, 1],
    ],
    divisor: 16,
    offset: 2,
  },
  sierra_lite: {
    matrix: [
      [0, 0, 2],
      [1, 1, 0],
    ],
    divisor: 4,
    offset: 1,
  },
  atkinson: {
    matrix: [
      [0, 0, 1, 1],
      [1, 1, 1, 0],
      [0, 1, 0, 0],
    ],
    divisor: 8,
    offset: 1,
  },
};
function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}
function rgbToGray2(r, g, b) {
  return r * 0.299 + g * 0.587 + b * 0.114;
}
function createRNG(seed) {
  let state = seed || Date.now();
  return () => {
    state = (state * 1103515245 + 12345) & 2147483647;
    return state / 2147483647;
  };
}
function generateBlueNoiseTile2(size, seed) {
  const tile = new Array(size * size);
  const phi = 1.618033988749895;
  const rng = createRNG(seed);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const ign = (52.9829189 * ((0.06711056 * x + 583715e-8 * y) % 1)) % 1;
      const offset = ((x * phi + y * phi * phi) % 1) + rng() * 0.1;
      tile[y * size + x] = (ign + offset * 0.5) % 1;
    }
  }
  return tile;
}
function sampleBlueNoise2(x, y, tile, tileSize) {
  const tx = ((x % tileSize) + tileSize) % tileSize;
  const ty = ((y % tileSize) + tileSize) % tileSize;
  return tile[ty * tileSize + tx];
}
function orderedDither(imageData, width, height, matrix, levels = 2, strength = 100) {
  const matrixSize = matrix.length;
  const maxVal = matrixSize * matrixSize;
  const strengthFactor = strength / 100;
  const resultMatrix = [];
  const resultColors = [];
  for (let y = 0; y < height; y++) {
    const matrixRow = [];
    const colorRow = [];
    for (let x = 0; x < width; x++) {
      const mx = x % matrixSize;
      const my = y % matrixSize;
      const threshold = (matrix[my][mx] + 0.5) / maxVal;
      const idx = x * 3;
      const r = imageData[y][idx];
      const g = imageData[y][idx + 1];
      const b = imageData[y][idx + 2];
      const gray = rgbToGray2(r, g, b);
      const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor;
      const isDark = gray < adjustedThreshold;
      matrixRow.push(isDark);
      const step = 1 / (levels - 1);
      const newR = Math.round(r / step) * step;
      const newG = Math.round(g / step) * step;
      const newB = Math.round(b / step) * step;
      colorRow.push({
        r: Math.round(clamp01(newR) * 255),
        g: Math.round(clamp01(newG) * 255),
        b: Math.round(clamp01(newB) * 255),
      });
    }
    resultMatrix.push(matrixRow);
    resultColors.push(colorRow);
  }
  return { matrix: resultMatrix, colors: resultColors };
}
function bayerDither(imageData, width, height, size = 4, levels = 2, strength = 100) {
  const matrix = size === 2 ? BAYER_2 : size === 4 ? BAYER_4 : BAYER_8;
  return orderedDither(imageData, width, height, matrix, levels, strength);
}
function errorDiffusion(
  imageData,
  width,
  height,
  kernelName = 'floyd_steinberg',
  serpentine = true,
  levels = 2,
  strength = 100,
  colorMode = 'bw'
) {
  const kernel = DIFFUSION_KERNELS[kernelName];
  const strengthFactor = strength / 100;
  const step = 1 / (levels - 1);
  const pixels = [];
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const idx = x * 3;
      row.push({
        r: imageData[y][idx],
        g: imageData[y][idx + 1],
        b: imageData[y][idx + 2],
      });
    }
    pixels.push(row);
  }
  const resultMatrix = [];
  const resultColors = [];
  for (let y = 0; y < height; y++) {
    resultMatrix.push(new Array(width).fill(false));
    resultColors.push(new Array(width).fill({ r: 255, g: 255, b: 255 }));
  }
  for (let y = 0; y < height; y++) {
    const leftToRight = serpentine ? y % 2 === 0 : true;
    const startX = leftToRight ? 0 : width - 1;
    const endX = leftToRight ? width : -1;
    const deltaX = leftToRight ? 1 : -1;
    for (let x = startX; x !== endX; x += deltaX) {
      const pixel = pixels[y][x];
      if (colorMode === 'bw') {
        const gray = rgbToGray2(pixel.r, pixel.g, pixel.b);
        const newVal = gray > 0.5 ? 1 : 0;
        const error = (gray - newVal) * strengthFactor;
        resultMatrix[y][x] = newVal === 0;
        resultColors[y][x] = {
          r: newVal * 255,
          g: newVal * 255,
          b: newVal * 255,
        };
        distributeError(pixels, x, y, width, height, error, error, error, kernel, leftToRight);
      } else if (colorMode === 'grayscale') {
        const gray = rgbToGray2(pixel.r, pixel.g, pixel.b);
        const newVal = Math.round(gray / step) * step;
        const error = (gray - newVal) * strengthFactor;
        resultMatrix[y][x] = newVal < 0.5;
        const grayByte = Math.round(clamp01(newVal) * 255);
        resultColors[y][x] = { r: grayByte, g: grayByte, b: grayByte };
        distributeError(pixels, x, y, width, height, error, error, error, kernel, leftToRight);
      } else {
        const newR = Math.round(pixel.r / step) * step;
        const newG = Math.round(pixel.g / step) * step;
        const newB = Math.round(pixel.b / step) * step;
        const errorR = (pixel.r - newR) * strengthFactor;
        const errorG = (pixel.g - newG) * strengthFactor;
        const errorB = (pixel.b - newB) * strengthFactor;
        const brightness = rgbToGray2(newR, newG, newB);
        resultMatrix[y][x] = brightness < 0.5;
        resultColors[y][x] = {
          r: Math.round(clamp01(newR) * 255),
          g: Math.round(clamp01(newG) * 255),
          b: Math.round(clamp01(newB) * 255),
        };
        distributeError(pixels, x, y, width, height, errorR, errorG, errorB, kernel, leftToRight);
      }
    }
  }
  return { matrix: resultMatrix, colors: resultColors };
}
function distributeError(pixels, x, y, width, height, errorR, errorG, errorB, kernel, leftToRight) {
  for (let ky = 0; ky < kernel.matrix.length; ky++) {
    for (let kx = 0; kx < kernel.matrix[ky].length; kx++) {
      const weight = kernel.matrix[ky][kx];
      if (weight === 0) continue;
      let offsetX = kx - kernel.offset;
      if (!leftToRight) offsetX = -offsetX;
      const nx = x + offsetX;
      const ny = y + ky;
      if (nx >= 0 && nx < width && ny < height) {
        const factor = weight / kernel.divisor;
        pixels[ny][nx].r += errorR * factor;
        pixels[ny][nx].g += errorG * factor;
        pixels[ny][nx].b += errorB * factor;
      }
    }
  }
}
function blueNoiseDither(
  imageData,
  width,
  height,
  tileSize = 64,
  seed = 0,
  levels = 2,
  strength = 100,
  colorMode = 'bw'
) {
  const tile = generateBlueNoiseTile2(tileSize, seed);
  const strengthFactor = strength / 100;
  const _step = 1 / (levels - 1);
  const resultMatrix = [];
  const resultColors = [];
  for (let y = 0; y < height; y++) {
    const matrixRow = [];
    const colorRow = [];
    for (let x = 0; x < width; x++) {
      const threshold = sampleBlueNoise2(x, y, tile, tileSize);
      const idx = x * 3;
      const r = imageData[y][idx];
      const g = imageData[y][idx + 1];
      const b = imageData[y][idx + 2];
      if (colorMode === 'bw') {
        const gray = rgbToGray2(r, g, b);
        const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor;
        const isDark = gray < adjustedThreshold;
        matrixRow.push(isDark);
        colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 });
      } else if (colorMode === 'grayscale') {
        const gray = rgbToGray2(r, g, b);
        const scaled = gray * (levels - 1);
        const low = Math.floor(scaled);
        const high = Math.min(low + 1, levels - 1);
        const frac = scaled - low;
        const t = 0.5 + (threshold - 0.5) * strengthFactor;
        const newVal = (frac > t ? high : low) / (levels - 1);
        matrixRow.push(newVal < 0.5);
        const grayByte = Math.round(newVal * 255);
        colorRow.push({ r: grayByte, g: grayByte, b: grayByte });
      } else {
        const quantize2 = (val, noiseOffset) => {
          const t = (threshold + noiseOffset) % 1;
          const adjustedT = 0.5 + (t - 0.5) * strengthFactor;
          const scaled = val * (levels - 1);
          const low = Math.floor(scaled);
          const high = Math.min(low + 1, levels - 1);
          const frac = scaled - low;
          return (frac > adjustedT ? high : low) / (levels - 1);
        };
        const newR = quantize2(r, 0);
        const newG = quantize2(g, 0.33);
        const newB = quantize2(b, 0.67);
        const brightness = rgbToGray2(newR, newG, newB);
        matrixRow.push(brightness < 0.5);
        colorRow.push({
          r: Math.round(newR * 255),
          g: Math.round(newG * 255),
          b: Math.round(newB * 255),
        });
      }
    }
    resultMatrix.push(matrixRow);
    resultColors.push(colorRow);
  }
  return { matrix: resultMatrix, colors: resultColors };
}
function whiteNoiseDither(imageData, width, height, seed = 0, strength = 100, _colorMode = 'bw') {
  const rng = createRNG(seed);
  const strengthFactor = strength / 100;
  const resultMatrix = [];
  const resultColors = [];
  for (let y = 0; y < height; y++) {
    const matrixRow = [];
    const colorRow = [];
    for (let x = 0; x < width; x++) {
      const threshold = rng();
      const idx = x * 3;
      const r = imageData[y][idx];
      const g = imageData[y][idx + 1];
      const b = imageData[y][idx + 2];
      const gray = rgbToGray2(r, g, b);
      const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor;
      const isDark = gray < adjustedThreshold;
      matrixRow.push(isDark);
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 });
    }
    resultMatrix.push(matrixRow);
    resultColors.push(colorRow);
  }
  return { matrix: resultMatrix, colors: resultColors };
}
function gaussianNoiseDither(
  imageData,
  width,
  height,
  seed = 0,
  strength = 100,
  _colorMode = 'bw'
) {
  const rng = createRNG(seed);
  const strengthFactor = strength / 100;
  const gaussianRandom = () => {
    const u1 = rng() || 1e-4;
    const u2 = rng();
    return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2) * 0.2 + 0.5;
  };
  const resultMatrix = [];
  const resultColors = [];
  for (let y = 0; y < height; y++) {
    const matrixRow = [];
    const colorRow = [];
    for (let x = 0; x < width; x++) {
      const threshold = clamp01(gaussianRandom());
      const idx = x * 3;
      const r = imageData[y][idx];
      const g = imageData[y][idx + 1];
      const b = imageData[y][idx + 2];
      const gray = rgbToGray2(r, g, b);
      const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor;
      const isDark = gray < adjustedThreshold;
      matrixRow.push(isDark);
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 });
    }
    resultMatrix.push(matrixRow);
    resultColors.push(colorRow);
  }
  return { matrix: resultMatrix, colors: resultColors };
}
function triangularNoiseDither(
  imageData,
  width,
  height,
  seed = 0,
  strength = 100,
  _colorMode = 'bw'
) {
  const rng = createRNG(seed);
  const strengthFactor = strength / 100;
  const triangularRandom = () => {
    return (rng() + rng()) / 2;
  };
  const resultMatrix = [];
  const resultColors = [];
  for (let y = 0; y < height; y++) {
    const matrixRow = [];
    const colorRow = [];
    for (let x = 0; x < width; x++) {
      const threshold = triangularRandom();
      const idx = x * 3;
      const r = imageData[y][idx];
      const g = imageData[y][idx + 1];
      const b = imageData[y][idx + 2];
      const gray = rgbToGray2(r, g, b);
      const adjustedThreshold = 0.5 + (threshold - 0.5) * strengthFactor;
      const isDark = gray < adjustedThreshold;
      matrixRow.push(isDark);
      colorRow.push(isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 });
    }
    resultMatrix.push(matrixRow);
    resultColors.push(colorRow);
  }
  return { matrix: resultMatrix, colors: resultColors };
}
function imageDataToFloat(imageData) {
  const { data, width, height } = imageData;
  const result = [];
  for (let y = 0; y < height; y++) {
    const row = new Float32Array(width * 3);
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const dstIdx = x * 3;
      row[dstIdx] = data[srcIdx] / 255;
      row[dstIdx + 1] = data[srcIdx + 1] / 255;
      row[dstIdx + 2] = data[srcIdx + 2] / 255;
    }
    result.push(row);
  }
  return result;
}
function applyDither(imageData, options) {
  const floatData = imageDataToFloat(imageData);
  const { width, height } = imageData;
  switch (options.kind) {
    case 'ordered_bayer':
      return bayerDither(
        floatData,
        width,
        height,
        options.orderedMatrix === 'bayer2' ? 2 : options.orderedMatrix === 'bayer8' ? 8 : 4,
        options.levels,
        options.strength
      );
    case 'ordered_clustered':
      return orderedDither(
        floatData,
        width,
        height,
        CLUSTERED_DOT,
        options.levels,
        options.strength
      );
    case 'ordered_void_cluster':
      return orderedDither(
        floatData,
        width,
        height,
        VOID_CLUSTER,
        options.levels,
        options.strength
      );
    case 'blue_noise':
    case 'blue_noise_threshold':
      return blueNoiseDither(
        floatData,
        width,
        height,
        options.blueNoiseTileSize,
        options.blueNoiseSeed,
        options.levels,
        options.strength,
        options.colorMode
      );
    case 'white_noise':
      return whiteNoiseDither(
        floatData,
        width,
        height,
        options.blueNoiseSeed,
        options.strength,
        options.colorMode
      );
    case 'gaussian_noise':
      return gaussianNoiseDither(
        floatData,
        width,
        height,
        options.blueNoiseSeed,
        options.strength,
        options.colorMode
      );
    case 'triangular_noise':
      return triangularNoiseDither(
        floatData,
        width,
        height,
        options.blueNoiseSeed,
        options.strength,
        options.colorMode
      );
    default:
      return errorDiffusion(
        floatData,
        width,
        height,
        options.diffusionKernel,
        options.serpentine,
        options.levels,
        options.strength,
        options.colorMode
      );
  }
}

// src/modules/qr-generator.js
function getContrastRatio(color1, color2) {
  const getLuminance = (color) => {
    const parsed = parseColor(color);
    const [r, g, b] = [parsed.r, parsed.g, parsed.b].map((c) => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}
var defaultBrowserCanvasFactory = {
  createCanvas: (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    return Promise.resolve(canvas);
  },
  loadImage: (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (_e) => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  },
};
var QRGenerator = class {
  /**
   * Create a QR generator instance
   * @param {CanvasFactory} [canvasFactory] - Optional canvas factory for non-browser environments
   */
  constructor(canvasFactory = null) {
    this.qrcode = qrcode_default;
    this._canvasFactory = canvasFactory || defaultBrowserCanvasFactory;
  }
  /**
   * Create a canvas using the configured factory
   * @param {number} width
   * @param {number} height
   * @returns {Promise<HTMLCanvasElement|object>}
   */
  async _createCanvas(width, height) {
    return this._canvasFactory.createCanvas(width, height);
  }
  async loadLibrary() {
    return Promise.resolve();
  }
  async generate(config, overlayCanvas = null) {
    if (!this.qrcode) {
      await this.loadLibrary();
    }
    let typeNumber = config.typeNumber;
    if (typeNumber === 0) {
      typeNumber = this.calculateOptimalVersion(config.content, config.errorCorrection);
    }
    let processedOverlayCanvas = overlayCanvas;
    if (overlayCanvas && this._hasPreprocessingOptions(config)) {
      processedOverlayCanvas = await this._preprocessOverlay(overlayCanvas, config);
    }
    if (config.overlayMode === 'dithered' && processedOverlayCanvas) {
      return await this.generateDitheredSubpixelQR(
        null,
        { ...config, typeNumber },
        processedOverlayCanvas
      );
    }
    if (config.overlayMode === 'blue-noise' && processedOverlayCanvas) {
      return await this.generateBlueNoiseQR({ ...config, typeNumber }, processedOverlayCanvas);
    }
    const qr = this.qrcode(typeNumber, config.errorCorrection);
    qr.addData(config.content);
    qr.make();
    const moduleCount = qr.getModuleCount();
    if (config.overlayMode === 'dithered' && overlayCanvas) {
      return await this.generateDitheredSubpixelQR(qr, config, overlayCanvas, moduleCount);
    }
    if (config.overlayMode === 'subpixel' && processedOverlayCanvas) {
      return await this.generateSubpixelQR(qr, config, processedOverlayCanvas, moduleCount, false);
    }
    if (config.overlayMode === 'subpixel-size' && processedOverlayCanvas) {
      return await this.generateSubpixelQR(qr, config, processedOverlayCanvas, moduleCount, true);
    }
    const moduleSize = config.moduleSize;
    const margin = config.margin;
    const frameExtra =
      config.frameStyle && config.frameStyle !== 'none' && config.frameText ? moduleSize * 4 : 0;
    const size = moduleCount * moduleSize + margin * 2 * moduleSize + frameExtra;
    const canvas = await this._createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }
    let overlayData = null;
    if (processedOverlayCanvas) {
      overlayData = await this._getOverlayData(
        processedOverlayCanvas,
        moduleCount,
        config.colorMode || 'color',
        config.invertImage
      );
    }
    let effectiveIntensity = config.overlayIntensity ?? 100;
    if (config.maxOverlayIntensityByEcc) {
      const eccLimits = config.maxOverlayIntensityByEcc;
      const eccLimit = eccLimits[config.errorCorrection];
      if (eccLimit !== void 0 && eccLimit < effectiveIntensity) {
        effectiveIntensity = eccLimit;
      }
    }
    const eccIntensityKey = `maxOverlayIntensity${config.errorCorrection}`;
    if (config[eccIntensityKey] !== void 0 && config[eccIntensityKey] < effectiveIntensity) {
      effectiveIntensity = config[eccIntensityKey];
    }
    const effectiveConfig = { ...config, overlayIntensity: effectiveIntensity };
    let ditherPattern = null;
    let advancedDitherResult = null;
    if ((config.overlayMode === 'dither' || config.overlayMode === 'extreme') && overlayData) {
      const useAdvancedDither =
        config.ditherKind &&
        config.ditherKind !== 'true_dither' &&
        config.ditherKind !== 'error_diffusion';
      if (useAdvancedDither && overlayCanvas) {
        try {
          advancedDitherResult = await this.applyAdvancedDither(
            overlayCanvas,
            moduleCount,
            effectiveConfig
          );
          ditherPattern = advancedDitherResult.matrix;
        } catch (e) {
          console.warn('Advanced dithering failed, falling back to true dither:', e);
          ditherPattern = this.applyTrueDither(
            qr,
            overlayData,
            effectiveConfig,
            config.overlayMode === 'extreme'
          );
        }
      } else {
        ditherPattern = this.applyTrueDither(
          qr,
          overlayData,
          effectiveConfig,
          config.overlayMode === 'extreme'
        );
      }
    }
    const version = config.typeNumber || Math.ceil((moduleCount - 17) / 4);
    const gradientFill = this.createGradientFill(ctx, config, size);
    const useGradient = config.gradient && config.gradient.type !== 'none';
    const cornerRadius = config.cornerRadius || 0;
    const dotRotation = config.dotRotationDeg || 0;
    const alignmentStyle = config.alignmentStyle || 'match_finder';
    const timingStyle = config.timingStyle || 'match_module';
    const drawnFinderPatterns = /* @__PURE__ */ new Set();
    const drawnAlignmentPatterns = /* @__PURE__ */ new Set();
    const finderPositions = [
      { row: 0, col: 0 },
      // Top-left
      { row: 0, col: moduleCount - 7 },
      // Top-right
      { row: moduleCount - 7, col: 0 },
      // Bottom-left
    ];
    for (const pos of finderPositions) {
      const x = (pos.col + margin) * moduleSize;
      const y = (pos.row + margin) * moduleSize;
      this.drawFinderPatternComplete(ctx, x, y, moduleSize, config);
      for (let r = pos.row; r < pos.row + 7; r++) {
        for (let c = pos.col; c < pos.col + 7; c++) {
          drawnFinderPatterns.add(`${r},${c}`);
        }
      }
    }
    if (version >= 2) {
      const alignPositions = this.getAlignmentPositions(version, moduleCount);
      for (const pos of alignPositions) {
        const centerX = (pos.col + margin) * moduleSize + moduleSize / 2;
        const centerY = (pos.row + margin) * moduleSize + moduleSize / 2;
        this.drawAlignmentPattern(ctx, centerX, centerY, moduleSize, alignmentStyle, config);
        for (let r = pos.row - 2; r <= pos.row + 2; r++) {
          for (let c = pos.col - 2; c <= pos.col + 2; c++) {
            drawnAlignmentPatterns.add(`${r},${c}`);
          }
        }
      }
    }
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (drawnFinderPatterns.has(`${row},${col}`)) continue;
        if (drawnAlignmentPatterns.has(`${row},${col}`)) continue;
        const isDark = ditherPattern ? ditherPattern[row][col] : qr.isDark(row, col);
        const x = (col + margin) * moduleSize;
        const y = (row + margin) * moduleSize;
        const isFinder = this.isFinderPattern(row, col, moduleCount);
        const isTiming = this.isTimingPattern(row, col, moduleCount);
        const isFormatInfo = this.isFormatInfo(row, col, moduleCount);
        const isVersionInfo = this.isVersionInfo(row, col, moduleCount, version);
        const isInAlignmentSet = drawnAlignmentPatterns.has(`${row},${col}`);
        const protectFormat = config.protectFormatInfo;
        const protectVersion = config.protectVersionInfo;
        const applyOverlay =
          overlayData &&
          !(config.preserveFinders && isFinder) &&
          !(config.preserveTiming && isTiming) &&
          !(config.preserveAlignment && isInAlignmentSet) &&
          !(protectFormat && isFormatInfo) &&
          !(protectVersion && isVersionInfo);
        let moduleColor = isDark ? config.fgColor : config.bgColor;
        let moduleSizeModifier = 1;
        let moduleOpacity = 1;
        let waveOffsetX = 0;
        let waveOffsetY = 0;
        let drawOutlineOnly = false;
        let useHalftoneRendering = false;
        let halftoneBrightness = 0.5;
        let shouldDrawCell = isDark;
        if (applyOverlay) {
          const brightness = overlayData[row][col];
          switch (config.overlayMode) {
            case 'halftone':
              if (isDark) {
                if (config.halftoneCell || config.halftoneDotShape || config.brightnessCurve) {
                  useHalftoneRendering = true;
                  halftoneBrightness = brightness;
                } else {
                  const intensity = effectiveIntensity / 100;
                  const minSize = 0.3;
                  const maxSize = 1;
                  moduleSizeModifier =
                    minSize +
                    (1 - brightness) * (maxSize - minSize) * intensity +
                    ((1 - intensity) * (maxSize - minSize)) / 2;
                }
              }
              break;
            case 'blend':
              if (isDark) {
                const blendColor = overlayData.colors?.[row]?.[col];
                if (blendColor) {
                  const blendAmount = effectiveIntensity / 100;
                  moduleColor = blendColors(config.fgColor, blendColor, blendAmount);
                }
              }
              break;
            case 'brightness':
              if (isDark) {
                const threshold = (100 - effectiveIntensity) / 100;
                if (brightness > threshold) {
                  moduleOpacity = 0;
                }
              }
              break;
            case 'gapfill':
              if (isDark) {
                moduleColor = config.fgColor;
              } else {
                const gapColor = overlayData.colors?.[row]?.[col];
                if (gapColor) {
                  const fadeAmount = (config.overlayIntensity / 100) * 0.4;
                  moduleColor = blendColors(config.bgColor, gapColor, fadeAmount);
                  shouldDrawCell = true;
                }
              }
              break;
            case 'pixelate':
              if (isDark) {
                const blockSize = 3;
                const blockRow = Math.floor(row / blockSize) * blockSize;
                const blockCol = Math.floor(col / blockSize) * blockSize;
                let avgR = 0,
                  avgG = 0,
                  avgB = 0,
                  pixCount = 0;
                for (let br = 0; br < blockSize && blockRow + br < moduleCount; br++) {
                  for (let bc = 0; bc < blockSize && blockCol + bc < moduleCount; bc++) {
                    const c = overlayData.colors?.[blockRow + br]?.[blockCol + bc];
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
                  moduleColor = blendColors(config.fgColor, blockColor, pixBlendAmt);
                }
              }
              break;
            case 'duotone':
              if (isDark) {
                const duotoneArr = config.duotoneColors || [];
                const shadowColor = duotoneArr[0] || config.fgColor;
                const highlightColor = duotoneArr[1] || null;
                const intensity = config.overlayIntensity / 100;
                if (brightness > 0.5) {
                  if (highlightColor) {
                    moduleColor = blendColors(
                      config.fgColor,
                      highlightColor,
                      intensity * (brightness - 0.5) * 2
                    );
                  } else {
                    const fgParsed = parseColor(config.fgColor);
                    const lightR = Math.min(255, fgParsed.r + 80);
                    const lightG = Math.min(255, fgParsed.g + 80);
                    const lightB = Math.min(255, fgParsed.b + 80);
                    moduleColor = `rgb(${lightR},${lightG},${lightB})`;
                  }
                } else {
                  moduleColor = blendColors(
                    config.fgColor,
                    shadowColor,
                    intensity * (0.5 - brightness) * 2
                  );
                }
              }
              break;
            case 'outline':
              if (isDark) {
                drawOutlineOnly = true;
                const outlineColor = overlayData.colors?.[row]?.[col];
                if (outlineColor) {
                  const outlineBlend = config.overlayIntensity / 100;
                  moduleColor = blendColors(config.fgColor, outlineColor, outlineBlend);
                }
              }
              break;
            case 'wave':
              if (isDark) {
                const waveAmt = (1 - brightness) * (config.overlayIntensity / 100) * 3;
                waveOffsetX = Math.sin(row * 0.5) * waveAmt;
                waveOffsetY = Math.cos(col * 0.5) * waveAmt;
              }
              break;
            case 'mosaic': {
              shouldDrawCell = true;
              const mosaicColor = overlayData.colors?.[row]?.[col];
              if (mosaicColor) {
                const intensity = effectiveIntensity / 100;
                if (isDark) {
                  const parsed = parseColor(mosaicColor);
                  const darkFactor = 0.7;
                  moduleColor = `rgb(${Math.round(parsed.r * darkFactor)},${Math.round(parsed.g * darkFactor)},${Math.round(parsed.b * darkFactor)})`;
                } else {
                  const parsed = parseColor(mosaicColor);
                  const lightFactor = 0.4 + (1 - intensity) * 0.4;
                  const lightR = Math.round(255 - (255 - parsed.r) * lightFactor);
                  const lightG = Math.round(255 - (255 - parsed.g) * lightFactor);
                  const lightB = Math.round(255 - (255 - parsed.b) * lightFactor);
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
          let finalModuleColor = moduleColor;
          if (
            isDark &&
            config.perModuleColorMode &&
            config.perModuleColorMode !== 'solid' &&
            overlayData
          ) {
            finalModuleColor = this._applyPerModuleColor(
              config.perModuleColorMode,
              moduleColor,
              overlayData,
              row,
              col,
              moduleCount,
              config
            );
          }
          const paletteBrightness = overlayData?.[row]?.[col] ?? 0.5;
          if (isDark && config.palette && config.palette.length > 0) {
            finalModuleColor = this._applyPaletteColor(
              row,
              col,
              moduleCount,
              paletteBrightness,
              config.palette,
              config
            );
          }
          if (isDark && config.contrastGuard && config.minContrastRatio) {
            finalModuleColor = this._ensureContrast(
              finalModuleColor,
              config.bgColor,
              config.minContrastRatio
            );
          }
          if (isDark && useGradient) {
            ctx.fillStyle = gradientFill;
          } else {
            ctx.fillStyle = finalModuleColor;
          }
          let gap = config.moduleGap ? (moduleSize * config.moduleGap) / 100 : 0;
          const gapMode = config.gapMode || 'none';
          let strokeWidth = 0;
          if (gapMode === 'inset') {
            gap = Math.max(gap, moduleSize * 0.1);
          } else if (gapMode === 'stroke') {
            strokeWidth = Math.max(1, moduleSize * 0.15);
            gap = strokeWidth;
          } else if (gapMode === 'negative_space') {
            gap = Math.max(gap, moduleSize * 0.2);
          }
          const adjustedSize = (moduleSize - gap) * moduleSizeModifier;
          const offset = (moduleSize - adjustedSize) / 2;
          let drawX = x + offset + waveOffsetX;
          let drawY = y + offset + waveOffsetY;
          const pixelSnap = config.pixelSnap || 'floor';
          if (pixelSnap === 'floor') {
            drawX = Math.floor(drawX);
            drawY = Math.floor(drawY);
          } else if (pixelSnap === 'round') {
            drawX = Math.round(drawX);
            drawY = Math.round(drawY);
          } else if (pixelSnap === 'ceil') {
            drawX = Math.ceil(drawX);
            drawY = Math.ceil(drawY);
          }
          if (drawOutlineOnly || (gapMode === 'stroke' && isDark)) {
            ctx.strokeStyle = finalModuleColor;
            ctx.lineWidth = strokeWidth || 1;
            ctx.strokeRect(
              drawX + ctx.lineWidth / 2,
              drawY + ctx.lineWidth / 2,
              adjustedSize - ctx.lineWidth,
              adjustedSize - ctx.lineWidth
            );
          } else if (useHalftoneRendering && isDark) {
            this._drawHalftoneModule(ctx, drawX, drawY, adjustedSize, halftoneBrightness, config);
          } else if (isTiming) {
            this.drawTimingModule(ctx, drawX, drawY, adjustedSize, timingStyle, config);
          } else {
            this.drawModule(ctx, drawX, drawY, adjustedSize, config.moduleStyle, {
              cornerRadius,
              rotation: dotRotation,
            });
          }
          ctx.restore();
        }
      }
    }
    if (processedOverlayCanvas && config.overlayMode === 'center') {
      this.drawCenterLogo(ctx, processedOverlayCanvas, size, config.logoSize);
    }
    this.drawFrame(ctx, size, moduleSize, margin, config);
    return canvas;
  }
  calculateOptimalVersion(content, errorCorrection) {
    const capacities = {
      L: [
        17, 32, 53, 78, 106, 134, 154, 192, 230, 271, 321, 367, 425, 458, 520, 586, 644, 718, 792,
        858, 929, 1003, 1091, 1171, 1273, 1367, 1465, 1528, 1628, 1732, 1840, 1952, 2068, 2188,
        2303, 2431, 2563, 2699, 2809, 2953,
      ],
      M: [
        14, 26, 42, 62, 84, 106, 122, 152, 180, 213, 251, 287, 331, 362, 412, 450, 504, 560, 624,
        666, 711, 779, 857, 911, 997, 1059, 1125, 1190, 1264, 1370, 1452, 1538, 1628, 1722, 1809,
        1911, 1989, 2099, 2213, 2331,
      ],
      Q: [
        11, 20, 32, 46, 60, 74, 86, 108, 130, 151, 177, 203, 241, 258, 292, 322, 364, 394, 442, 482,
        509, 565, 611, 661, 715, 751, 805, 868, 908, 982, 1030, 1112, 1168, 1228, 1283, 1351, 1423,
        1499, 1579, 1663,
      ],
      H: [
        7, 14, 24, 34, 44, 58, 64, 84, 98, 119, 137, 155, 177, 194, 220, 250, 280, 310, 338, 382,
        403, 439, 461, 511, 535, 593, 625, 658, 698, 742, 790, 842, 898, 958, 983, 1051, 1093, 1139,
        1219, 1273,
      ],
    };
    const caps = capacities[errorCorrection] || capacities.Q;
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
    if (row === 6 && col >= 8 && col < moduleCount - 8) return true;
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
   * Check if a module is part of format information area
   */
  isFormatInfo(row, col, moduleCount) {
    if (row === 8 && (col <= 8 || col >= moduleCount - 8)) return true;
    if (col === 8 && (row <= 8 || row >= moduleCount - 7)) return true;
    return false;
  }
  /**
   * Check if a module is part of version information area (version 7+)
   */
  isVersionInfo(row, col, moduleCount, version) {
    if (version < 7) return false;
    if (row >= moduleCount - 11 && row <= moduleCount - 9 && col <= 5) return true;
    if (col >= moduleCount - 11 && col <= moduleCount - 9 && row <= 5) return true;
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
    if (row < 8 && col < 8) return true;
    if (row < 8 && col >= moduleCount - 8) return true;
    if (row >= moduleCount - 8 && col < 8) return true;
    if (row === 6 || col === 6) return true;
    if (row === 8 && col < 9) return true;
    if (col === 8 && row < 9) return true;
    if (row === 8 && col >= moduleCount - 8) return true;
    if (col === 8 && row >= moduleCount - 8) return true;
    if (row === moduleCount - 8 && col === 8) return true;
    if (version >= 7) {
      if (row >= moduleCount - 11 && row < moduleCount - 8 && col < 6) return true;
      if (col >= moduleCount - 11 && col < moduleCount - 8 && row < 6) return true;
    }
    if (version >= 2) {
      const positions = this.getAlignmentPositions(version, moduleCount);
      for (const pos of positions) {
        if (Math.abs(row - pos.row) <= 2 && Math.abs(col - pos.col) <= 2) return true;
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
    const eccAware = config.eccAwareEnabled === true;
    let totalModifiedCount = 0;
    const modifiedPattern = [];
    for (let row = 0; row < moduleCount; row++) {
      modifiedPattern[row] = [];
      for (let col = 0; col < moduleCount; col++) {
        modifiedPattern[row][col] = qr.isDark(row, col);
      }
    }
    let totalDataModules = 0;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (!this.isStructuralModule(row, col, moduleCount, version)) {
          totalDataModules++;
        }
      }
    }
    if (extremeMode) {
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (this.isFinderPattern(row, col, moduleCount)) continue;
          const brightness = overlayData[row]?.[col] ?? 0.5;
          const intensity = config.overlayIntensity / 100;
          const desiredDark = brightness < 0.5;
          if (eccAware && desiredDark !== modifiedPattern[row][col]) {
            if (
              !this._isEccSafeToModify(
                row,
                col,
                moduleCount,
                version,
                config,
                totalModifiedCount,
                totalDataModules
              )
            ) {
              continue;
            }
            totalModifiedCount++;
          }
          if (intensity >= 1 || Math.random() < intensity) {
            modifiedPattern[row][col] = desiredDark;
          }
        }
      }
    } else {
      const ecCapacity = { L: 0.07, M: 0.15, Q: 0.25, H: 0.3 };
      const maxFlipRatio = ecCapacity[config.errorCorrection] || 0.25;
      const intensity = config.overlayIntensity / 100;
      let totalDataModules2 = 0;
      const flipCandidates = [];
      for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
          if (this.isStructuralModule(row, col, moduleCount, version)) continue;
          totalDataModules2++;
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
      flipCandidates.sort((a, b) => b.score - a.score);
      const maxFlips = Math.floor(totalDataModules2 * maxFlipRatio * intensity);
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
    const radiusPercent = cornerRadius / 100;
    const maxRadius = innerSize / 2;
    const actualRadius = maxRadius * radiusPercent;
    ctx.save();
    if (rotation !== 0) {
      const centerX = x + size / 2;
      const centerY = y + size / 2;
      ctx.translate(centerX, centerY);
      ctx.rotate((rotation * Math.PI) / 180);
      ctx.translate(-centerX, -centerY);
    }
    switch (style) {
      case 'rounded': {
        const roundedRadius = actualRadius > 0 ? actualRadius : size * 0.3;
        this.roundRect(ctx, x + padding, y + padding, innerSize, innerSize, roundedRadius);
        ctx.fill();
        break;
      }
      case 'dots':
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, innerSize / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y + padding);
        ctx.lineTo(x + size - padding, y + size / 2);
        ctx.lineTo(x + size / 2, y + size - padding);
        ctx.lineTo(x + padding, y + size / 2);
        ctx.closePath();
        ctx.fill();
        break;
      case 'connected':
        if (actualRadius > 0) {
          this.roundRect(ctx, x, y, size, size, actualRadius);
          ctx.fill();
        } else {
          ctx.fillRect(x, y, size, size);
        }
        break;
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
      case 'rounded': {
        const roundedRadius = actualRadius > 0 ? actualRadius : size * 0.2;
        this.roundRect(ctx, x, y, size, size, roundedRadius);
        ctx.fill();
        break;
      }
      case 'circle':
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, size / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
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
    const outerSize = 7 * moduleSize * scale;
    const middleSize = 5 * moduleSize * scale;
    const innerSize = 3 * moduleSize * scale;
    const outerOffset = (7 * moduleSize - outerSize) / 2;
    const x = centerX + outerOffset;
    const y = centerY + outerOffset;
    ctx.fillStyle = config.fgColor;
    this.drawFinderModule(ctx, x, y, outerSize, outerStyle, cornerRadius);
    ctx.fillStyle = config.bgColor;
    const middleOffset = (outerSize - middleSize) / 2;
    this.drawFinderModule(
      ctx,
      x + middleOffset,
      y + middleOffset,
      middleSize,
      outerStyle,
      cornerRadius
    );
    ctx.fillStyle = config.fgColor;
    const innerOffset = (outerSize - innerSize) / 2;
    this.drawFinderModule(
      ctx,
      x + innerOffset,
      y + innerOffset,
      innerSize,
      innerStyle,
      cornerRadius
    );
  }
  /**
   * Draw an alignment pattern with specified style
   */
  drawAlignmentPattern(ctx, centerX, centerY, moduleSize, style, config) {
    const cornerRadius = config.cornerRadius || 0;
    const outerSize = 5 * moduleSize;
    const middleSize = 3 * moduleSize;
    const innerSize = 1 * moduleSize;
    const x = centerX - outerSize / 2;
    const y = centerY - outerSize / 2;
    const effectiveStyle = style === 'match_finder' ? config.finderStyle || 'square' : style;
    ctx.fillStyle = config.fgColor;
    this.drawFinderModule(ctx, x, y, outerSize, effectiveStyle, cornerRadius);
    ctx.fillStyle = config.bgColor;
    const middleX = centerX - middleSize / 2;
    const middleY = centerY - middleSize / 2;
    this.drawFinderModule(ctx, middleX, middleY, middleSize, effectiveStyle, cornerRadius);
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
    const effectiveStyle = style === 'match_module' ? config.moduleStyle || 'square' : style;
    switch (effectiveStyle) {
      case 'solid':
        ctx.fillRect(x, y, size, size);
        break;
      case 'dashed': {
        const dashSize = size * 0.7;
        const offset = (size - dashSize) / 2;
        ctx.fillRect(x + offset, y + offset, dashSize, dashSize);
        break;
      }
      default:
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
        const angleRad = (angle * Math.PI) / 180;
        const x1 = size / 2 - (Math.cos(angleRad) * size) / 2;
        const y1 = size / 2 - (Math.sin(angleRad) * size) / 2;
        const x2 = size / 2 + (Math.cos(angleRad) * size) / 2;
        const y2 = size / 2 + (Math.sin(angleRad) * size) / 2;
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
        const cx = size * (centerX || 0.5);
        const cy = size * (centerY || 0.5);
        gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, size * 0.7);
        break;
      }
      default:
        return config.fgColor;
    }
    if (stops && stops.length > 0) {
      stops.forEach((stop) => {
        gradient.addColorStop(stop.pos, stop.color);
      });
    } else {
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
        ctx.quadraticCurveTo(
          tagX + tagWidth,
          tagY + tagHeight,
          tagX + tagWidth - moduleSize,
          tagY + tagHeight
        );
        ctx.lineTo(tagX + moduleSize, tagY + tagHeight);
        ctx.quadraticCurveTo(tagX, tagY + tagHeight, tagX, tagY + tagHeight - moduleSize);
        ctx.lineTo(tagX, tagY + moduleSize);
        ctx.quadraticCurveTo(tagX, tagY, tagX + moduleSize, tagY);
        ctx.closePath();
        ctx.stroke();
        break;
      }
    }
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
  /**
   * Get overlay data - async version using canvas factory
   * @private
   */
  async _getOverlayData(overlayCanvas, moduleCount, colorMode = 'color', _invertImage = false) {
    const tempCanvas = await this._createCanvas(moduleCount, moduleCount);
    const ctx = tempCanvas.getContext('2d');
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
        if (colorMode === 'bw') {
          const bw = gray > 127 ? 255 : 0;
          colors[row][col] = `rgb(${bw},${bw},${bw})`;
        } else if (colorMode === 'grayscale') {
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
    ctx.fillStyle = '#ffffff';
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
  async generateDitheredSubpixelQR(_qr, config, overlayCanvas) {
    const scale = 3;
    const qrResult = generateQR({
      text: config.content,
      ecc: config.errorCorrection,
      version: config.typeNumber || 0,
      scale,
    });
    const { matrix: baseMatrix, moduleCount: scaledSize } = qrResult;
    const ditheredResult = await this._applyDitherToMatrix(
      baseMatrix,
      scaledSize,
      scale,
      overlayCanvas,
      config.overlayIntensity,
      config.colorMode || 'color'
    );
    const { matrix: dithered, colors } = ditheredResult;
    const scaledCount = dithered.length;
    const _derivedModuleCount = Math.round(scaledCount / scale);
    const marginModules = Math.max(5, config.margin);
    const subPixelSize = Math.max(1, Math.round(config.moduleSize / scale));
    const effectiveModuleSize = subPixelSize * scale;
    const marginPx = marginModules * effectiveModuleSize;
    const size = scaledCount * subPixelSize + marginPx * 2;
    const pixelSize = subPixelSize;
    const canvas = await this._createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }
    const useColorRendering = overlayCanvas && config.colorMode !== 'bw';
    for (let y = 0; y < scaledCount; y++) {
      for (let x = 0; x < scaledCount; x++) {
        const isDark = dithered[y][x];
        const color = colors[y][x];
        if (!(isDark || useColorRendering)) continue;
        const dx = marginPx + x * pixelSize;
        const dy = marginPx + y * pixelSize;
        if (useColorRendering) {
          ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
          ctx.fillRect(dx, dy, pixelSize, pixelSize);
        } else {
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
  async generateBlueNoiseQR(config, overlayCanvas) {
    const scale = 3;
    const blueNoiseResult = generateBlueNoiseDithered({
      text: config.content,
      ecc: config.errorCorrection,
      version: config.typeNumber || 0,
      scale,
      overlayCanvas,
      overlayIntensity: config.overlayIntensity,
      colorMode: config.colorMode || 'color',
    });
    const { matrix: dithered, colors } = blueNoiseResult;
    const scaledCount = dithered.length;
    const marginModules = Math.max(5, config.margin);
    const subPixelSize = Math.max(1, Math.round(config.moduleSize / scale));
    const effectiveModuleSize = subPixelSize * scale;
    const marginPx = marginModules * effectiveModuleSize;
    const size = scaledCount * subPixelSize + marginPx * 2;
    const pixelSize = subPixelSize;
    const canvas = await this._createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }
    const useColorRendering = overlayCanvas && config.colorMode !== 'bw';
    for (let y = 0; y < scaledCount; y++) {
      for (let x = 0; x < scaledCount; x++) {
        const isDark = dithered[y][x];
        const color = colors[y][x];
        if (!(isDark || useColorRendering)) continue;
        const dx = marginPx + x * pixelSize;
        const dy = marginPx + y * pixelSize;
        if (useColorRendering) {
          ctx.fillStyle = `rgb(${color.r},${color.g},${color.b})`;
          ctx.fillRect(dx, dy, pixelSize, pixelSize);
        } else {
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
  async generateSubpixelQR(qr, config, overlayCanvas, moduleCount, useHalftoneCenter = false) {
    const gridSizeStr = config.subpixelGridSize || '3x3';
    const subpixelSize = parseInt(gridSizeStr.charAt(0), 10) || 3;
    const margin = config.margin;
    const pixelSize = config.moduleSize / subpixelSize;
    const canvasModules = moduleCount * subpixelSize;
    const marginPixels = margin * config.moduleSize;
    const size = canvasModules * pixelSize + marginPixels * 2;
    const canvas = await this._createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    if (!config.transparentBg) {
      ctx.fillStyle = config.bgColor;
      ctx.fillRect(0, 0, size, size);
    }
    const overlayData = await this._getSubpixelOverlayData(
      overlayCanvas,
      moduleCount * subpixelSize,
      config.colorMode || 'color'
    );
    const moduleBrightness = await this._getOverlayData(overlayCanvas, moduleCount);
    const intensity = config.overlayIntensity / 100;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        const isDark = qr.isDark(row, col);
        const isFinder = this.isFinderPattern(row, col, moduleCount);
        const baseX = marginPixels + col * subpixelSize * pixelSize;
        const baseY = marginPixels + row * subpixelSize * pixelSize;
        if (isFinder) {
          ctx.fillStyle = isDark ? config.fgColor : config.bgColor;
          ctx.fillRect(baseX, baseY, subpixelSize * pixelSize, subpixelSize * pixelSize);
          continue;
        }
        for (let subRow = 0; subRow < subpixelSize; subRow++) {
          for (let subCol = 0; subCol < subpixelSize; subCol++) {
            const subX = baseX + subCol * pixelSize;
            const subY = baseY + subRow * pixelSize;
            const overlayRow = row * subpixelSize + subRow;
            const overlayCol = col * subpixelSize + subCol;
            const overlayColor = overlayData.colors?.[overlayRow]?.[overlayCol];
            if (subRow === 1 && subCol === 1) {
              if (useHalftoneCenter && isDark) {
                const brightness = moduleBrightness[row]?.[col] ?? 0.5;
                const minSize = 0.4;
                const maxSize = 1;
                const sizeRatio = minSize + (1 - brightness) * (maxSize - minSize) * intensity;
                const centerSize = pixelSize * sizeRatio;
                const offset = (pixelSize - centerSize) / 2;
                ctx.fillStyle = config.bgColor;
                ctx.fillRect(subX, subY, pixelSize, pixelSize);
                ctx.fillStyle = config.fgColor;
                ctx.fillRect(subX + offset, subY + offset, centerSize, centerSize);
              } else {
                ctx.fillStyle = isDark ? config.fgColor : config.bgColor;
                ctx.fillRect(subX, subY, pixelSize, pixelSize);
              }
            } else {
              if (overlayColor && intensity > 0) {
                if (intensity >= 1) {
                  ctx.fillStyle = overlayColor;
                } else {
                  ctx.fillStyle = blendColors('#808080', overlayColor, intensity);
                }
              } else {
                ctx.fillStyle = isDark ? '#404040' : '#c0c0c0';
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
   * Supports serpentine scanning for better quality
   */
  /**
   * Apply dithering to QR matrix - async version using canvas factory
   * @private
   */
  async _applyDitherToMatrix(
    baseMatrix,
    scaledSize,
    scale,
    overlayCanvas,
    overlayIntensity,
    colorMode,
    serpentine = false
  ) {
    const matrix = baseMatrix.map((row) => [...row]);
    const colors = baseMatrix.map((row) =>
      row.map((isDark) => (isDark ? { r: 0, g: 0, b: 0 } : { r: 255, g: 255, b: 255 }))
    );
    if (!overlayCanvas) {
      return { matrix, colors };
    }
    const imageData = await this._loadImageDataRGB(overlayCanvas, scaledSize);
    const intensity = overlayIntensity / 100;
    if (colorMode === 'grayscale' || colorMode === 'bw') {
      for (let y = 0; y < scaledSize; y++) {
        for (let x = 0; x < scaledSize; x++) {
          const { r, g, b } = imageData[y][x];
          const gray = r * 0.299 + g * 0.587 + b * 0.114;
          imageData[y][x] = { r: gray, g: gray, b: gray };
        }
      }
    }
    for (let y = 0; y < scaledSize; y++) {
      const leftToRight = !serpentine || y % 2 === 0;
      const xStart = leftToRight ? 0 : scaledSize - 1;
      const xEnd = leftToRight ? scaledSize : -1;
      const xStep = leftToRight ? 1 : -1;
      for (let x = xStart; x !== xEnd; x += xStep) {
        if (isLocked2(scaledSize, x, y, scale)) continue;
        if (isData2(x, y, scale)) continue;
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
          this.distributeError(
            imageData,
            x,
            y,
            scaledSize,
            scale,
            error,
            error,
            error,
            leftToRight
          );
        } else {
          const levels = 4;
          const newR = Math.round(pixel.r * (levels - 1)) / (levels - 1);
          const newG = Math.round(pixel.g * (levels - 1)) / (levels - 1);
          const newB = Math.round(pixel.b * (levels - 1)) / (levels - 1);
          const errorR = pixel.r - newR;
          const errorG = pixel.g - newG;
          const errorB = pixel.b - newB;
          imageData[y][x] = { r: newR, g: newG, b: newB };
          this.distributeError(
            imageData,
            x,
            y,
            scaledSize,
            scale,
            errorR,
            errorG,
            errorB,
            leftToRight
          );
        }
      }
    }
    for (let y = 0; y < scaledSize; y++) {
      for (let x = 0; x < scaledSize; x++) {
        if (isLocked2(scaledSize, x, y, scale)) continue;
        if (isData2(x, y, scale)) continue;
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
   * @private
   */
  async _loadImageDataRGB(canvas, size) {
    const tempCanvas = await this._createCanvas(size, size);
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
   * Supports serpentine scanning with leftToRight parameter
   */
  distributeError(imageData, x, y, size, scale, errorR, errorG, errorB, leftToRight = true) {
    const canChange = (px, py) => {
      if (px < 0 || py < 0 || px >= size || py >= size) return false;
      return !(isLocked2(size, px, py, scale) || isData2(px, py, scale));
    };
    const nextX = leftToRight ? x + 1 : x - 1;
    const prevX = leftToRight ? x - 1 : x + 1;
    const a = canChange(nextX, y);
    const b = canChange(prevX, y + 1);
    const c = canChange(x, y + 1);
    const d = canChange(nextX, y + 1);
    const total = (a ? 7 : 0) + (b ? 3 : 0) + (c ? 5 : 0) + (d ? 1 : 0);
    if (total === 0) return;
    if (a) {
      imageData[y][nextX].r += (errorR * 7) / total;
      imageData[y][nextX].g += (errorG * 7) / total;
      imageData[y][nextX].b += (errorB * 7) / total;
    }
    if (b) {
      imageData[y + 1][prevX].r += (errorR * 3) / total;
      imageData[y + 1][prevX].g += (errorG * 3) / total;
      imageData[y + 1][prevX].b += (errorB * 3) / total;
    }
    if (c) {
      imageData[y + 1][x].r += (errorR * 5) / total;
      imageData[y + 1][x].g += (errorG * 5) / total;
      imageData[y + 1][x].b += (errorB * 5) / total;
    }
    if (d) {
      imageData[y + 1][nextX].r += errorR / total;
      imageData[y + 1][nextX].g += errorG / total;
      imageData[y + 1][nextX].b += errorB / total;
    }
  }
  /**
   * Get subpixel overlay data - async version using canvas factory
   * @private
   */
  async _getSubpixelOverlayData(overlayCanvas, subpixelCount, colorMode = 'color') {
    const tempCanvas = await this._createCanvas(subpixelCount, subpixelCount);
    const ctx = tempCanvas.getContext('2d');
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
        if (colorMode === 'bw') {
          const bw = gray > 127 ? 255 : 0;
          colors[row][col] = `rgb(${bw},${bw},${bw})`;
        } else if (colorMode === 'grayscale') {
          colors[row][col] = `rgb(${gray},${gray},${gray})`;
        } else {
          colors[row][col] = `rgb(${r},${g},${b})`;
        }
      }
    }
    brightness.colors = colors;
    return brightness;
  }
  /**
   * Check if any preprocessing options are set
   * @private
   */
  _hasPreprocessingOptions(config) {
    return (
      (config.overlayBrightness && config.overlayBrightness !== 0) ||
      (config.overlayContrast && config.overlayContrast !== 0) ||
      (config.overlayGamma && config.overlayGamma !== 1) ||
      (config.overlaySaturation && config.overlaySaturation !== 0) ||
      (config.overlayHueRotate && config.overlayHueRotate !== 0) ||
      config.invertImage ||
      (config.overlayBlur && config.overlayBlur > 0) ||
      (config.overlaySharpen && config.overlaySharpen > 0) ||
      (config.overlayPosterize && config.overlayPosterize > 0) ||
      (config.overlayEdgeDetect && config.overlayEdgeDetect !== 'off') ||
      (config.overlayThreshold !== void 0 && config.overlayThreshold !== 128) ||
      config.overlayFlipX ||
      config.overlayFlipY ||
      (config.overlayRotate && config.overlayRotate !== 0)
    );
  }
  /**
   * Preprocess overlay canvas with filters and transforms
   * @private
   */
  async _preprocessOverlay(overlayCanvas, config) {
    const width = overlayCanvas.width;
    const height = overlayCanvas.height;
    const processedCanvas = await this._createCanvas(width, height);
    const ctx = processedCanvas.getContext('2d');
    ctx.save();
    if (config.overlayRotate && config.overlayRotate !== 0) {
      ctx.translate(width / 2, height / 2);
      ctx.rotate((config.overlayRotate * Math.PI) / 180);
      ctx.translate(-width / 2, -height / 2);
    }
    if (config.overlayFlipX || config.overlayFlipY) {
      ctx.translate(config.overlayFlipX ? width : 0, config.overlayFlipY ? height : 0);
      ctx.scale(config.overlayFlipX ? -1 : 1, config.overlayFlipY ? -1 : 1);
    }
    ctx.drawImage(overlayCanvas, 0, 0);
    ctx.restore();
    const imageData = ctx.getImageData(0, 0, width, height);
    const filterOptions = {
      brightness: config.overlayBrightness || 0,
      contrast: config.overlayContrast || 0,
      gamma: config.overlayGamma || 1,
      saturation: config.overlaySaturation || 0,
      hueRotate: config.overlayHueRotate || 0,
      invert: config.invertImage,
      blur: config.overlayBlur || 0,
      sharpen: config.overlaySharpen || 0,
      posterize: config.overlayPosterize || 0,
      edgeDetect: config.overlayEdgeDetect || 'off',
    };
    if (
      config.overlayThreshold !== void 0 &&
      config.overlayThreshold !== 128 &&
      filterOptions.edgeDetect === 'off'
    ) {
      filterOptions.threshold = config.overlayThreshold;
    }
    this._applyFiltersManual(imageData, filterOptions);
    ctx.putImageData(imageData, 0, 0);
    return processedCanvas;
  }
  /**
   * Manual filter application - self-contained implementation
   * @private
   */
  _applyFiltersManual(imageData, options) {
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];
      if (options.brightness && options.brightness !== 0) {
        const factor = options.brightness * 2.55;
        r = Math.max(0, Math.min(255, r + factor));
        g = Math.max(0, Math.min(255, g + factor));
        b = Math.max(0, Math.min(255, b + factor));
      }
      if (options.contrast && options.contrast !== 0) {
        const factor = (259 * (options.contrast + 255)) / (255 * (259 - options.contrast));
        r = Math.max(0, Math.min(255, factor * (r - 128) + 128));
        g = Math.max(0, Math.min(255, factor * (g - 128) + 128));
        b = Math.max(0, Math.min(255, factor * (b - 128) + 128));
      }
      if (options.gamma && options.gamma !== 1) {
        const gammaCorrection = 1 / options.gamma;
        r = 255 * (r / 255) ** gammaCorrection;
        g = 255 * (g / 255) ** gammaCorrection;
        b = 255 * (b / 255) ** gammaCorrection;
      }
      if (options.saturation && options.saturation !== 0) {
        const gray = r * 0.299 + g * 0.587 + b * 0.114;
        const factor = (options.saturation + 100) / 100;
        r = Math.max(0, Math.min(255, gray + factor * (r - gray)));
        g = Math.max(0, Math.min(255, gray + factor * (g - gray)));
        b = Math.max(0, Math.min(255, gray + factor * (b - gray)));
      }
      if (options.hueRotate && options.hueRotate !== 0) {
        const angle = (options.hueRotate * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const newR =
          r * (0.213 + cos * 0.787 - sin * 0.213) +
          g * (0.715 - cos * 0.715 - sin * 0.715) +
          b * (0.072 - cos * 0.072 + sin * 0.928);
        const newG =
          r * (0.213 - cos * 0.213 + sin * 0.143) +
          g * (0.715 + cos * 0.285 + sin * 0.14) +
          b * (0.072 - cos * 0.072 - sin * 0.283);
        const newB =
          r * (0.213 - cos * 0.213 - sin * 0.787) +
          g * (0.715 - cos * 0.715 + sin * 0.715) +
          b * (0.072 + cos * 0.928 + sin * 0.072);
        r = Math.max(0, Math.min(255, newR));
        g = Math.max(0, Math.min(255, newG));
        b = Math.max(0, Math.min(255, newB));
      }
      if (options.posterize && options.posterize > 0) {
        const levels = options.posterize;
        const step = 255 / (levels - 1);
        r = Math.round(Math.round(r / step) * step);
        g = Math.round(Math.round(g / step) * step);
        b = Math.round(Math.round(b / step) * step);
      }
      if (options.invert) {
        r = 255 - r;
        g = 255 - g;
        b = 255 - b;
      }
      data[i] = Math.round(r);
      data[i + 1] = Math.round(g);
      data[i + 2] = Math.round(b);
    }
    if (options.blur && options.blur > 0) {
      this._applyBoxBlur(imageData, Math.min(options.blur, 5));
    }
    if (options.sharpen && options.sharpen > 0) {
      this._applySharpen(imageData, options.sharpen / 100);
    }
    if (options.edgeDetect === 'sobel') {
      this._applySobelEdge(imageData);
    }
  }
  /**
   * Apply box blur
   * @private
   */
  _applyBoxBlur(imageData, radius) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const copy = new Uint8ClampedArray(data);
    const size = radius * 2 + 1;
    const divisor = size * size;
    for (let y = radius; y < height - radius; y++) {
      for (let x = radius; x < width - radius; x++) {
        let r = 0,
          g = 0,
          b = 0;
        for (let ky = -radius; ky <= radius; ky++) {
          for (let kx = -radius; kx <= radius; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4;
            r += copy[idx];
            g += copy[idx + 1];
            b += copy[idx + 2];
          }
        }
        const outIdx = (y * width + x) * 4;
        data[outIdx] = Math.round(r / divisor);
        data[outIdx + 1] = Math.round(g / divisor);
        data[outIdx + 2] = Math.round(b / divisor);
      }
    }
  }
  /**
   * Apply sharpen filter
   * @private
   */
  _applySharpen(imageData, amount) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const copy = new Uint8ClampedArray(data);
    const kernel = [0, -amount, 0, -amount, 1 + 4 * amount, -amount, 0, -amount, 0];
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let r = 0,
          g = 0,
          b = 0;
        let ki = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const idx = ((y + ky) * width + (x + kx)) * 4;
            const k = kernel[ki++];
            r += copy[idx] * k;
            g += copy[idx + 1] * k;
            b += copy[idx + 2] * k;
          }
        }
        const outIdx = (y * width + x) * 4;
        data[outIdx] = Math.max(0, Math.min(255, Math.round(r)));
        data[outIdx + 1] = Math.max(0, Math.min(255, Math.round(g)));
        data[outIdx + 2] = Math.max(0, Math.min(255, Math.round(b)));
      }
    }
  }
  /**
   * Apply Sobel edge detection
   * @private
   */
  _applySobelEdge(imageData) {
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;
    const gray = new Float32Array(width * height);
    for (let i = 0; i < width * height; i++) {
      const idx = i * 4;
      gray[i] = data[idx] * 0.299 + data[idx + 1] * 0.587 + data[idx + 2] * 0.114;
    }
    const sobelX = [-1, 0, 1, -2, 0, 2, -1, 0, 1];
    const sobelY = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        let gx = 0,
          gy = 0;
        let ki = 0;
        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            const grayIdx = (y + ky) * width + (x + kx);
            gx += gray[grayIdx] * sobelX[ki];
            gy += gray[grayIdx] * sobelY[ki];
            ki++;
          }
        }
        const magnitude = Math.min(255, Math.sqrt(gx * gx + gy * gy));
        const outIdx = (y * width + x) * 4;
        data[outIdx] = magnitude;
        data[outIdx + 1] = magnitude;
        data[outIdx + 2] = magnitude;
      }
    }
  }
  /**
   * Apply per-module color mode
   * @private
   */
  _applyPerModuleColor(mode, baseColor, overlayData, row, col, moduleCount, config) {
    const brightness = overlayData[row]?.[col] ?? 0.5;
    const overlayColor = overlayData.colors?.[row]?.[col];
    const intensity = (config.overlayIntensity || 100) / 100;
    switch (mode) {
      case 'by_brightness': {
        const parsed = parseColor(baseColor);
        const factor = 0.5 + brightness * 0.5;
        return `rgb(${Math.round(parsed.r * factor)},${Math.round(parsed.g * factor)},${Math.round(parsed.b * factor)})`;
      }
      case 'by_position': {
        const parsed = parseColor(baseColor);
        const xFactor = col / moduleCount;
        const yFactor = row / moduleCount;
        const r = Math.round(parsed.r * (0.5 + xFactor * 0.5));
        const g = Math.round(parsed.g * (0.5 + yFactor * 0.5));
        const b = Math.round(parsed.b * (0.5 + (1 - xFactor) * 0.5));
        return `rgb(${r},${g},${b})`;
      }
      case 'by_overlay': {
        if (overlayColor) {
          return blendColors(baseColor, overlayColor, intensity);
        }
        return baseColor;
      }
      case 'by_cluster': {
        const blockSize = 3;
        const blockRow = Math.floor(row / blockSize);
        const blockCol = Math.floor(col / blockSize);
        const seed = blockRow * 100 + blockCol;
        const hueShift = (seed * 37) % 360;
        const parsed = parseColor(baseColor);
        const angle = (hueShift * Math.PI) / 180;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const r = Math.max(
          0,
          Math.min(
            255,
            parsed.r * (0.213 + cos * 0.787 - sin * 0.213) +
              parsed.g * (0.715 - cos * 0.715 - sin * 0.715) +
              parsed.b * (0.072 - cos * 0.072 + sin * 0.928)
          )
        );
        const g = Math.max(
          0,
          Math.min(
            255,
            parsed.r * (0.213 - cos * 0.213 + sin * 0.143) +
              parsed.g * (0.715 + cos * 0.285 + sin * 0.14) +
              parsed.b * (0.072 - cos * 0.072 - sin * 0.283)
          )
        );
        const b = Math.max(
          0,
          Math.min(
            255,
            parsed.r * (0.213 - cos * 0.213 - sin * 0.787) +
              parsed.g * (0.715 - cos * 0.715 + sin * 0.715) +
              parsed.b * (0.072 + cos * 0.928 + sin * 0.072)
          )
        );
        return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
      }
      default:
        return baseColor;
    }
  }
  /**
   * Ensure module color has sufficient contrast with background
   * @private
   */
  _ensureContrast(moduleColor, bgColor, minRatio) {
    try {
      const ratio = getContrastRatio(moduleColor, bgColor);
      if (ratio >= minRatio) {
        return moduleColor;
      }
      const parsed = parseColor(moduleColor);
      let factor = 0.9;
      let newColor = moduleColor;
      for (let i = 0; i < 10; i++) {
        const r = Math.round(parsed.r * factor);
        const g = Math.round(parsed.g * factor);
        const b = Math.round(parsed.b * factor);
        newColor = `rgb(${r},${g},${b})`;
        const newRatio = getContrastRatio(newColor, bgColor);
        if (newRatio >= minRatio) {
          return newColor;
        }
        factor *= 0.85;
      }
      return '#000000';
    } catch (_e) {
      return moduleColor;
    }
  }
  /**
   * Apply advanced dithering using dither-algorithms module
   * Supports all dithering types: ordered, error diffusion, blue noise, etc.
   */
  async applyAdvancedDither(overlayCanvas, moduleCount, config) {
    const tempCanvas = await this._createCanvas(moduleCount, moduleCount);
    const ctx = tempCanvas.getContext('2d');
    ctx.drawImage(overlayCanvas, 0, 0, moduleCount, moduleCount);
    const imageData = ctx.getImageData(0, 0, moduleCount, moduleCount);
    const ditherOptions = {
      kind: config.ditherKind || 'error_diffusion',
      strength: config.ditherStrength ?? 100,
      serpentine: config.serpentine !== false,
      diffusionKernel: config.diffusionKernel || 'floyd_steinberg',
      orderedMatrix: config.orderedMatrix || 'bayer4',
      colorMode: config.colorMode || 'bw',
      levels: 2,
      blueNoiseSeed: config.blueNoiseSeed || 0,
      blueNoiseTileSize: config.blueNoiseTileSize || 64,
    };
    const result = applyDither(imageData, ditherOptions);
    return result;
  }
  /**
   * Apply palette color to a module based on position/brightness
   * @private
   */
  _applyPaletteColor(row, col, moduleCount, brightness, palette, config) {
    if (!palette || palette.length === 0) return config.fgColor;
    const paletteMode = config.paletteMode || 'position';
    switch (paletteMode) {
      case 'brightness': {
        const idx = Math.floor((1 - brightness) * (palette.length - 0.01));
        return palette[Math.max(0, Math.min(palette.length - 1, idx))];
      }
      case 'diagonal': {
        const diag = (row + col) / (moduleCount * 2);
        const idx = Math.floor(diag * palette.length) % palette.length;
        return palette[idx];
      }
      case 'radial': {
        const cx = moduleCount / 2;
        const cy = moduleCount / 2;
        const dist = Math.sqrt((row - cy) ** 2 + (col - cx) ** 2);
        const maxDist = Math.sqrt(cx ** 2 + cy ** 2);
        const idx = Math.floor((dist / maxDist) * palette.length) % palette.length;
        return palette[idx];
      }
      case 'random': {
        const hash = ((row * 31 + col) * 17) % palette.length;
        return palette[hash];
      }
      case 'row': {
        const idx = Math.floor((row / moduleCount) * palette.length) % palette.length;
        return palette[idx];
      }
      case 'column': {
        const idx = Math.floor((col / moduleCount) * palette.length) % palette.length;
        return palette[idx];
      }
      default: {
        const linearPos = row * moduleCount + col;
        const idx = linearPos % palette.length;
        return palette[idx];
      }
    }
  }
  /**
   * Apply halftone rendering to a module
   * @private
   */
  _drawHalftoneModule(ctx, x, y, size, brightness, config) {
    const _htCell = config.halftoneCell || 'per_module';
    const htDot = config.halftoneDotShape || 'circle';
    const htCurve = config.brightnessCurve || 'linear';
    let adjustedBrightness = brightness;
    switch (htCurve) {
      case 's-curve':
        adjustedBrightness = brightness * brightness * (3 - 2 * brightness);
        break;
      case 'gamma':
        adjustedBrightness = brightness ** 2.2;
        break;
      default:
        break;
    }
    const minSize = 0.2;
    const maxSize = 1;
    const dotSizeRatio = minSize + (1 - adjustedBrightness) * (maxSize - minSize);
    const dotSize = size * dotSizeRatio;
    const offset = (size - dotSize) / 2;
    const centerX = x + size / 2;
    const centerY = y + size / 2;
    switch (htDot) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(centerX, centerY, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
        break;
      case 'square':
        ctx.fillRect(x + offset, y + offset, dotSize, dotSize);
        break;
      case 'line': {
        const lineWidth = dotSize * 0.8;
        ctx.fillRect(x, y + (size - lineWidth) / 2, size, lineWidth);
        break;
      }
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(centerX, y + offset);
        ctx.lineTo(x + size - offset, centerY);
        ctx.lineTo(centerX, y + size - offset);
        ctx.lineTo(x + offset, centerY);
        ctx.closePath();
        ctx.fill();
        break;
      default:
        ctx.beginPath();
        ctx.arc(centerX, centerY, dotSize / 2, 0, Math.PI * 2);
        ctx.fill();
    }
  }
  /**
   * Calculate ECC-aware weight for a module position
   * Higher weight = more important to preserve
   * @private
   */
  _getEccWeight(row, col, moduleCount, _version, weightMap) {
    switch (weightMap) {
      case 'distance_to_finders': {
        const distTL = Math.sqrt(row * row + col * col);
        const distTR = Math.sqrt(row * row + (moduleCount - 1 - col) ** 2);
        const distBL = Math.sqrt((moduleCount - 1 - row) ** 2 + col * col);
        const minDist = Math.min(distTL, distTR, distBL);
        const maxDist = (Math.sqrt(2) * moduleCount) / 2;
        return 1 - minDist / maxDist;
      }
      case 'block_heatmap': {
        const centerRow = moduleCount / 2;
        const centerCol = moduleCount / 2;
        const distToCenter = Math.sqrt((row - centerRow) ** 2 + (col - centerCol) ** 2);
        const maxDist = (Math.sqrt(2) * moduleCount) / 2;
        return distToCenter / maxDist;
      }
      case 'empirical_scan_heatmap': {
        const scanProgress = (row + col) / (2 * moduleCount);
        return 1 - scanProgress * 0.5;
      }
      default:
        return 0.5;
    }
  }
  /**
   * Check if modifying a module is safe given ECC-aware constraints
   * @private
   */
  _isEccSafeToModify(row, col, moduleCount, version, config, modifiedCount, totalDataModules) {
    if (!config.eccAwareEnabled) return true;
    const riskBudget = (config.eccAwareRiskBudget || 50) / 100;
    const eccCapacity = { L: 0.07, M: 0.15, Q: 0.25, H: 0.3 };
    const maxRisk = eccCapacity[config.errorCorrection] || 0.25;
    const allowedModifications = Math.floor(totalDataModules * maxRisk * riskBudget);
    if (modifiedCount >= allowedModifications) return false;
    const weight = this._getEccWeight(
      row,
      col,
      moduleCount,
      version,
      config.eccAwareWeightMap || 'distance_to_finders'
    );
    return Math.random() > weight * 0.5;
  }
};

// netlify/functions/qr.ts
var { GIFEncoder, quantize, applyPalette } = gifenc;
var nodeCanvasFactory = {
  createCanvas: async (width, height) => {
    return createCanvas(width, height);
  },
  loadImage: async (src) => {
    return loadImage(src);
  },
};
function createTextWatermark(text, fontSize = 14, fontFamily = 'sans-serif', color = '#000000') {
  const measureCanvas = createCanvas(1, 1);
  const measureCtx = measureCanvas.getContext('2d');
  measureCtx.font = `${fontSize}px ${fontFamily}`;
  const metrics = measureCtx.measureText(text);
  const textHeight = fontSize * 1.2;
  const canvas = createCanvas(Math.ceil(metrics.width) + 10, Math.ceil(textHeight) + 10);
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.fillStyle = color;
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 5, canvas.height / 2);
  return canvas;
}
function getWatermarkPositions(
  position,
  canvasWidth,
  canvasHeight,
  watermarkWidth,
  watermarkHeight,
  margin = 10
) {
  const positions = [];
  switch (position) {
    case 'center':
      positions.push({
        x: (canvasWidth - watermarkWidth) / 2,
        y: (canvasHeight - watermarkHeight) / 2,
      });
      break;
    case 'corners':
      positions.push(
        { x: margin, y: margin },
        { x: canvasWidth - watermarkWidth - margin, y: margin },
        { x: margin, y: canvasHeight - watermarkHeight - margin },
        { x: canvasWidth - watermarkWidth - margin, y: canvasHeight - watermarkHeight - margin }
      );
      break;
    case 'edges':
      positions.push(
        { x: (canvasWidth - watermarkWidth) / 2, y: margin },
        { x: (canvasWidth - watermarkWidth) / 2, y: canvasHeight - watermarkHeight - margin },
        { x: margin, y: (canvasHeight - watermarkHeight) / 2 },
        { x: canvasWidth - watermarkWidth - margin, y: (canvasHeight - watermarkHeight) / 2 }
      );
      break;
    case 'quiet_zone':
      positions.push({ x: margin / 2, y: canvasHeight - watermarkHeight - margin / 2 });
      break;
    default:
      positions.push({
        x: (canvasWidth - watermarkWidth) / 2,
        y: (canvasHeight - watermarkHeight) / 2,
      });
  }
  return positions;
}
function applyBlendMode(ctx, blend) {
  switch (blend) {
    case 'multiply':
      ctx.globalCompositeOperation = 'multiply';
      break;
    case 'screen':
      ctx.globalCompositeOperation = 'screen';
      break;
    case 'overlay':
      ctx.globalCompositeOperation = 'overlay';
      break;
    default:
      ctx.globalCompositeOperation = 'source-over';
      break;
  }
}
function applyWatermarkServer(source, options) {
  if (!options.enabled || (options.kind === 'text' && !options.text)) {
    return source;
  }
  const result = createCanvas(source.width, source.height);
  const ctx = result.getContext('2d');
  if (options.position === 'behind') {
    drawWatermarkLayerServer(ctx, options, source.width, source.height);
    ctx.drawImage(source, 0, 0);
  } else {
    ctx.drawImage(source, 0, 0);
    drawWatermarkLayerServer(ctx, options, source.width, source.height);
  }
  return result;
}
function drawWatermarkLayerServer(ctx, options, canvasWidth, canvasHeight) {
  let watermarkCanvas = null;
  if (options.kind === 'text' && options.text) {
    watermarkCanvas = createTextWatermark(options.text, 14, 'sans-serif', '#000000');
  } else if ((options.kind === 'image' || options.kind === 'pattern') && options.imageCanvas) {
    watermarkCanvas = options.imageCanvas;
  }
  if (!watermarkCanvas) return;
  ctx.save();
  applyBlendMode(ctx, options.blend);
  ctx.globalAlpha = options.opacity / 100;
  const positions = getWatermarkPositions(
    options.position,
    canvasWidth,
    canvasHeight,
    watermarkCanvas.width,
    watermarkCanvas.height,
    10
  );
  for (const pos of positions) {
    ctx.drawImage(watermarkCanvas, pos.x, pos.y);
  }
  ctx.restore();
}
function calculateCrc32(data) {
  let crc = 4294967295;
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 3988292384 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  for (let i = 0; i < data.length; i++) {
    crc = table[(crc ^ data[i]) & 255] ^ (crc >>> 8);
  }
  return (crc ^ 4294967295) >>> 0;
}
function createPngTextChunk(keyword, text) {
  const keywordBytes = new TextEncoder().encode(keyword);
  const textBytes = new TextEncoder().encode(text);
  const chunkData = new Uint8Array(keywordBytes.length + 1 + textBytes.length);
  chunkData.set(keywordBytes, 0);
  chunkData.set([0], keywordBytes.length);
  chunkData.set(textBytes, keywordBytes.length + 1);
  const chunkType = new TextEncoder().encode('tEXt');
  const chunk = new Uint8Array(4 + 4 + chunkData.length + 4);
  const dataView = new DataView(chunk.buffer);
  dataView.setUint32(0, chunkData.length, false);
  chunk.set(chunkType, 4);
  chunk.set(chunkData, 8);
  const crcData = new Uint8Array(4 + chunkData.length);
  crcData.set(chunkType, 0);
  crcData.set(chunkData, 4);
  const crc = calculateCrc32(crcData);
  dataView.setUint32(8 + chunkData.length, crc, false);
  return chunk;
}
function createPngPhysChunk(dpi) {
  const pixelsPerMeter = Math.round(dpi / 0.0254);
  const chunkData = new Uint8Array(9);
  const chunkDataView = new DataView(chunkData.buffer);
  chunkDataView.setUint32(0, pixelsPerMeter, false);
  chunkDataView.setUint32(4, pixelsPerMeter, false);
  chunkData[8] = 1;
  const chunkType = new TextEncoder().encode('pHYs');
  const chunk = new Uint8Array(4 + 4 + 9 + 4);
  const chunkView = new DataView(chunk.buffer);
  chunkView.setUint32(0, 9, false);
  chunk.set(chunkType, 4);
  chunk.set(chunkData, 8);
  const crcData = new Uint8Array(4 + 9);
  crcData.set(chunkType, 0);
  crcData.set(chunkData, 4);
  const crc = calculateCrc32(crcData);
  chunkView.setUint32(17, crc, false);
  return chunk;
}
function embedPngMetadataAndDpi(pngBuffer, metadata, dpi) {
  const data = new Uint8Array(pngBuffer);
  const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];
  for (let i = 0; i < 8; i++) {
    if (data[i] !== pngSignature[i]) {
      return pngBuffer;
    }
  }
  const chunks = [];
  if (dpi && dpi > 0 && dpi !== 72) {
    chunks.push(createPngPhysChunk(dpi));
  }
  if (metadata) {
    const keywordMap = {
      title: 'Title',
      author: 'Author',
      description: 'Description',
      copyright: 'Copyright',
      creationTime: 'Creation Time',
      software: 'Software',
    };
    for (const [key, value] of Object.entries(metadata)) {
      if (value && typeof value === 'string') {
        const keyword = keywordMap[key] || key;
        chunks.push(createPngTextChunk(keyword, value));
      }
    }
  }
  if (chunks.length === 0) {
    return pngBuffer;
  }
  const ihdrEnd = 33;
  const totalChunksSize = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const newPng = new Uint8Array(data.length + totalChunksSize);
  newPng.set(data.slice(0, ihdrEnd), 0);
  let offset = ihdrEnd;
  for (const chunk of chunks) {
    newPng.set(chunk, offset);
    offset += chunk.length;
  }
  newPng.set(data.slice(ihdrEnd), offset);
  return Buffer.from(newPng);
}
function encodeGif(canvas, colors = 256) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');
  const imageData = ctx.getImageData(0, 0, width, height);
  const { data } = imageData;
  const gif = GIFEncoder();
  const palette = quantize(data, Math.min(256, Math.max(2, colors)));
  const index = applyPalette(data, palette);
  gif.writeFrame(index, width, height, {
    palette,
    delay: 100,
    repeat: 0,
  });
  gif.finish();
  return Buffer.from(gif.bytes());
}
function encodeAnimatedGif(frames, frameDelayMs = 100, colors = 256) {
  if (frames.length === 0) {
    throw new Error('No frames to encode');
  }
  const width = frames[0].width;
  const height = frames[0].height;
  const gif = GIFEncoder();
  const paletteSize = Math.min(256, Math.max(2, colors));
  const delayCentiseconds = Math.max(1, Math.round(frameDelayMs / 10));
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const ctx = frame.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;
    const palette = quantize(data, paletteSize);
    const index = applyPalette(data, palette);
    const frameOptions = {
      palette,
      delay: delayCentiseconds,
    };
    if (i === 0) {
      frameOptions.repeat = 0;
    }
    gif.writeFrame(index, width, height, frameOptions);
  }
  gif.finish();
  return Buffer.from(gif.bytes());
}
function applyEasing(progress, easing) {
  switch (easing) {
    case 'ease_in':
      return progress * progress;
    case 'ease_out':
      return 1 - (1 - progress) * (1 - progress);
    case 'ease_in_out':
      return progress < 0.5 ? 2 * progress * progress : 1 - (-2 * progress + 2) ** 2 / 2;
    case 'bounce':
      if (progress < 0.5) {
        return 8 * progress * progress * progress * progress;
      } else {
        return 1 - (-2 * progress + 2) ** 4 / 2;
      }
    default:
      return progress;
  }
}
function generatePatternFramesServer(
  sourceCanvas,
  pattern,
  frameCount = 24,
  seed = 0,
  easing = 'linear'
) {
  if (pattern === 'none') {
    return [sourceCanvas];
  }
  const frames = [];
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;
  const sourceCtx = sourceCanvas.getContext('2d');
  const sourceData = sourceCtx.getImageData(0, 0, width, height);
  for (let i = 0; i < frameCount; i++) {
    const linearProgress = i / frameCount;
    const progress = applyEasing(linearProgress, easing);
    const frame = createCanvas(width, height);
    const ctx = frame.getContext('2d');
    const frameData = ctx.createImageData(width, height);
    frameData.data.set(sourceData.data);
    switch (pattern) {
      case 'pulse':
        applyPulsePatternServer(frameData, progress, seed);
        break;
      case 'wave':
        applyWavePatternServer(frameData, progress, width, height, seed);
        break;
      case 'scanline':
        applyScanlinePatternServer(frameData, progress, width, height, seed);
        break;
      case 'shimmer':
        applyShimmerPatternServer(frameData, progress, width, height, seed);
        break;
      case 'drift':
        applyDriftPatternServer(frameData, progress, width, height, seed);
        break;
      case 'color_cycle':
        applyColorCyclePatternServer(frameData, progress, seed);
        break;
    }
    ctx.putImageData(frameData, 0, 0);
    frames.push(frame);
  }
  return frames;
}
function applyPulsePatternServer(imageData, progress, seed) {
  const data = imageData.data;
  const intensity = 0.15 + 0.1 * Math.sin(seed * 0.1);
  const factor = 1 + Math.sin(progress * Math.PI * 2) * intensity;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.min(255, data[i] * factor);
    data[i + 1] = Math.min(255, data[i + 1] * factor);
    data[i + 2] = Math.min(255, data[i + 2] * factor);
  }
}
function applyWavePatternServer(imageData, progress, width, height, seed) {
  const data = imageData.data;
  const waveFrequency = 3 + (seed % 5);
  const waveAmplitude = 0.2;
  for (let y = 0; y < height; y++) {
    const waveOffset =
      Math.sin((y / height) * waveFrequency * Math.PI * 2 + progress * Math.PI * 2) * waveAmplitude;
    const factor = 1 + waveOffset;
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      data[i] = Math.min(255, Math.max(0, data[i] * factor));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * factor));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * factor));
    }
  }
}
function applyScanlinePatternServer(imageData, progress, width, height, seed) {
  const data = imageData.data;
  const lineWidth = Math.max(2, height * 0.05);
  const lineY = progress * (height + lineWidth * 2) - lineWidth;
  const horizontal = seed % 2 === 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const pos = horizontal ? y : x;
      const linePos = horizontal ? lineY : progress * (width + lineWidth * 2) - lineWidth;
      const distance = Math.abs(pos - linePos);
      if (distance < lineWidth) {
        const brightness = 1 + (1 - distance / lineWidth) * 0.5;
        data[i] = Math.min(255, data[i] * brightness);
        data[i + 1] = Math.min(255, data[i + 1] * brightness);
        data[i + 2] = Math.min(255, data[i + 2] * brightness);
      }
    }
  }
}
function seededRandomServer(seed) {
  let s = seed;
  return () => {
    s = Math.sin(s * 9999) * 1e4;
    return s - Math.floor(s);
  };
}
function applyShimmerPatternServer(imageData, progress, width, height, seed) {
  const data = imageData.data;
  const random = seededRandomServer(seed + Math.floor(progress * 1e3));
  const spotCount = Math.floor(width * height * 1e-3);
  for (let s = 0; s < spotCount; s++) {
    const x = Math.floor(random() * width);
    const y = Math.floor(random() * height);
    const i = (y * width + x) * 4;
    const brightness = 1.3 + random() * 0.4;
    data[i] = Math.min(255, data[i] * brightness);
    data[i + 1] = Math.min(255, data[i + 1] * brightness);
    data[i + 2] = Math.min(255, data[i + 2] * brightness);
  }
}
function applyDriftPatternServer(imageData, progress, width, height, seed) {
  const data = imageData.data;
  const scale = 0.02 + (seed % 10) * 5e-3;
  const timeOffset = progress * Math.PI * 2;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const drift = Math.sin(x * scale + timeOffset) * Math.cos(y * scale + timeOffset) * 0.15;
      const factor = 1 + drift;
      data[i] = Math.min(255, Math.max(0, data[i] * factor));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] * factor));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] * factor));
    }
  }
}
function applyColorCyclePatternServer(imageData, progress, seed) {
  const data = imageData.data;
  const hueShift = (progress * 360 + seed) % 360;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const [h, s, l] = rgbToHslServer(r, g, b);
    const newH = (h + hueShift) % 360;
    const [newR, newG, newB] = hslToRgbServer(newH, s, l);
    data[i] = newR;
    data[i + 1] = newG;
    data[i + 2] = newB;
  }
}
function rgbToHslServer(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
        break;
      case g:
        h = ((b - r) / d + 2) * 60;
        break;
      case b:
        h = ((r - g) / d + 4) * 60;
        break;
    }
  }
  return [h, s * 100, l * 100];
}
function hslToRgbServer(h, s, l) {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;
  if (h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }
  return [Math.round((r + m) * 255), Math.round((g + m) * 255), Math.round((b + m) * 255)];
}
function isGifBuffer(buffer) {
  const view = new DataView(buffer);
  if (view.byteLength < 6) return false;
  const sig = String.fromCharCode(view.getUint8(0), view.getUint8(1), view.getUint8(2));
  return sig === 'GIF';
}
function parseGifFramesServer(arrayBuffer) {
  const gif = parseGIF(arrayBuffer);
  const frames = decompressFrames(gif, true);
  if (frames.length === 0) {
    throw new Error('No frames found in GIF');
  }
  const { width, height } = gif.lsd;
  const compositeCanvas = createCanvas(width, height);
  const compositeCtx = compositeCanvas.getContext('2d');
  const animationFrames = [];
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const { dims, patch, disposalType, delay } = frame;
    const imageData = compositeCtx.createImageData(dims.width, dims.height);
    imageData.data.set(new Uint8ClampedArray(patch));
    const patchCanvas = createCanvas(dims.width, dims.height);
    const patchCtx = patchCanvas.getContext('2d');
    patchCtx.putImageData(imageData, 0, 0);
    compositeCtx.drawImage(patchCanvas, dims.left, dims.top);
    const outputCanvas = createCanvas(width, height);
    const outputCtx = outputCanvas.getContext('2d');
    outputCtx.drawImage(compositeCanvas, 0, 0);
    animationFrames.push({
      canvas: outputCanvas,
      delay: delay * 10,
      // GIF delay is in centiseconds, convert to ms
      disposalType,
    });
    if (disposalType === 2) {
      compositeCtx.clearRect(dims.left, dims.top, dims.width, dims.height);
    }
  }
  return animationFrames;
}
function encodeAnimatedGifWithDelays(frames, colors = 256) {
  if (frames.length === 0) {
    throw new Error('No frames to encode');
  }
  const width = frames[0].canvas.width;
  const height = frames[0].canvas.height;
  const gif = GIFEncoder();
  const paletteSize = Math.min(256, Math.max(2, colors));
  for (let i = 0; i < frames.length; i++) {
    const frame = frames[i];
    const ctx = frame.canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, width, height);
    const { data } = imageData;
    const palette = quantize(data, paletteSize);
    const index = applyPalette(data, palette);
    const delayCentiseconds = Math.max(1, Math.round(frame.delay / 10));
    const frameOptions = {
      palette,
      delay: delayCentiseconds,
    };
    if (i === 0) {
      frameOptions.repeat = 0;
    }
    gif.writeFrame(index, width, height, frameOptions);
  }
  gif.finish();
  return Buffer.from(gif.bytes());
}
function parseGradientStops(stopsParam) {
  const parts = stopsParam.split(',');
  const stops = [];
  for (let i = 0; i < parts.length - 1; i += 2) {
    const color = `#${parts[i]}`;
    const pos = parseFloat(parts[i + 1]);
    if (!Number.isNaN(pos)) {
      stops.push({ color, pos });
    }
  }
  return stops.length > 0
    ? stops
    : [
        { color: '#000000', pos: 0 },
        { color: '#000000', pos: 1 },
      ];
}
async function fetchImageWithBuffer(url) {
  try {
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
      if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
        console.error(`Invalid URL protocol: ${parsedUrl.protocol}`);
        return null;
      }
    } catch {
      console.error(`Invalid URL format: ${url}`);
      return null;
    }
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ANQR-QR-Generator/1.0',
      },
    });
    if (!response.ok) {
      console.error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      return null;
    }
    const contentType = response.headers.get('Content-Type') || '';
    const validImageTypes = [
      'image/png',
      'image/jpeg',
      'image/gif',
      'image/webp',
      'image/svg+xml',
      'image/bmp',
    ];
    const isImage = validImageTypes.some((type) => contentType.toLowerCase().startsWith(type));
    if (!isImage && contentType && !contentType.startsWith('application/octet-stream')) {
      console.error(`Invalid Content-Type for image: ${contentType}`);
      return null;
    }
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    let isAnimatedGif = false;
    if (isGifBuffer(arrayBuffer)) {
      try {
        const gif = parseGIF(arrayBuffer);
        const frames = decompressFrames(gif, true);
        isAnimatedGif = frames.length > 1;
      } catch (e) {
        console.warn('Failed to parse GIF for frame detection:', e);
      }
    }
    const img = await loadImage(buffer);
    if (!(img.width && img.height) || img.width <= 0 || img.height <= 0) {
      console.error(`Invalid image dimensions: ${img.width}x${img.height}`);
      return null;
    }
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    return {
      canvas,
      arrayBuffer,
      isAnimatedGif,
    };
  } catch (error) {
    console.error('Error fetching overlay image:', error);
    return null;
  }
}
async function fetchImageAsCanvas(url) {
  const result = await fetchImageWithBuffer(url);
  return result?.canvas ?? null;
}
var qr_default = async (request) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  const data = params.get('data');
  if (!data) {
    return new Response('Missing required "data" parameter', { status: 400 });
  }
  const sizeParam = parseInt(params.get('size') || '400', 10);
  const widthParam = params.get('w') ? parseInt(params.get('w'), 10) : null;
  const heightParam = params.get('h') ? parseInt(params.get('h'), 10) : null;
  const outputWidth = Math.min(2e3, Math.max(50, widthParam ?? sizeParam));
  const outputHeight = Math.min(2e3, Math.max(50, heightParam ?? sizeParam));
  const size = Math.max(outputWidth, outputHeight);
  const fg = params.get('fg') || '000000';
  const bg = params.get('bg') || 'ffffff';
  const ec = params.get('ec')?.toUpperCase() || 'H';
  const margin = Math.min(20, Math.max(0, parseInt(params.get('margin') || '4', 10)));
  const transparent = params.get('transparent') === '1';
  const encodingMode = params.get('enc') || 'auto';
  const version = params.get('v') ? parseInt(params.get('v'), 10) : 0;
  const borderModulesExtra = Math.min(10, Math.max(0, parseInt(params.get('border') || '0', 10)));
  const crispEdges = params.get('crisp') !== '0';
  const pixelSnap = params.get('snap') || 'floor';
  const perModuleColorMode = params.get('modColor') || 'solid';
  const contrastGuard = params.get('cGuard') === '1';
  const minContrastRatio = parseFloat(params.get('minContrast') || '4.5');
  const moduleStyle = params.get('style') || 'square';
  const finderStyle = params.get('finder') || 'square';
  const eyeOuterStyle = params.get('eyeOuter') || finderStyle;
  const eyeInnerStyle = params.get('eyeInner') || finderStyle;
  const eyeScale = Math.min(150, Math.max(50, parseInt(params.get('eyeScale') || '100', 10)));
  const cornerRadius = Math.min(100, Math.max(0, parseInt(params.get('radius') || '0', 10)));
  const moduleGap = Math.min(50, Math.max(0, parseInt(params.get('gap') || '0', 10)));
  const gapMode = params.get('gapMode') || 'none';
  const dotRotationDeg = parseInt(params.get('dotRot') || '0', 10);
  const frameStyle = params.get('frame') || 'none';
  const frameText = params.get('frameText') ? decodeURIComponent(params.get('frameText')) : '';
  const gradientType = params.get('grad') || 'none';
  const gradientAngle = parseInt(params.get('gradAngle') || '0', 10);
  const gradientStopsParam = params.get('gradStops');
  const gradientStops = gradientStopsParam ? parseGradientStops(gradientStopsParam) : void 0;
  const alignmentStyle = params.get('align') || 'match_finder';
  const timingStyle = params.get('timing') || 'match_module';
  const preserveFinders = params.get('keepFinders') !== '0';
  const preserveTiming = params.get('keepTiming') === '1';
  const preserveAlignment = params.get('keepAlign') === '1';
  const protectFormatInfo = params.get('protectFmt') === '1';
  const protectVersionInfo = params.get('protectVer') === '1';
  const eccAwareEnabled = params.get('eccAware') === '1';
  const eccAwareRiskBudget = Math.min(
    100,
    Math.max(0, parseInt(params.get('eccRisk') || '50', 10))
  );
  const eccAwareWeightMap = params.get('eccMap') || 'distance_to_finders';
  const overlayUrl = params.get('img');
  const overlayMode = params.get('mode') || void 0;
  const overlayIntensity = Math.min(
    100,
    Math.max(0, parseInt(params.get('intensity') || '100', 10))
  );
  const colorMode = params.get('colorMode') || 'color';
  const logoSize = Math.min(50, Math.max(5, parseInt(params.get('logoSize') || '25', 10)));
  const overlayBrightness = Math.min(
    100,
    Math.max(-100, parseInt(params.get('brightness') || '0', 10))
  );
  const overlayContrast = Math.min(
    100,
    Math.max(-100, parseInt(params.get('contrast') || '0', 10))
  );
  const overlayGamma = Math.max(0.1, Math.min(3, parseFloat(params.get('gamma') || '1')));
  const overlaySaturation = Math.min(
    100,
    Math.max(-100, parseInt(params.get('saturation') || '0', 10))
  );
  const overlayHueRotate = parseInt(params.get('hue') || '0', 10);
  const overlayInvert = params.get('invert') === '1';
  const overlayBlur = Math.max(0, parseInt(params.get('blur') || '0', 10));
  const overlaySharpen = Math.max(0, parseInt(params.get('sharpen') || '0', 10));
  const overlayPosterize = Math.max(0, parseInt(params.get('posterize') || '0', 10));
  const overlayThreshold = Math.min(
    255,
    Math.max(0, parseInt(params.get('threshold') || '128', 10))
  );
  const overlayEdgeDetect = params.get('edge') || 'off';
  const overlayFit = params.get('fit') || 'cover';
  const overlayRotate = parseInt(params.get('rot') || '0', 10);
  const overlayFlipX = params.get('flipX') === '1';
  const overlayFlipY = params.get('flipY') === '1';
  const ditherKind = params.get('ditherKind') || 'error_diffusion';
  const diffusionKernel = params.get('diffusionKernel') || 'floyd_steinberg';
  const ditherStrength = Math.min(
    100,
    Math.max(0, parseInt(params.get('ditherStrength') || '50', 10))
  );
  const ditherSerpentine = params.get('serpentine') === '1';
  const orderedMatrix = params.get('matrix') || 'bayer4';
  const blueNoiseTileSize = parseInt(params.get('bnTile') || '64', 10);
  const blueNoiseSeed = parseInt(params.get('bnSeed') || '0', 10);
  const colorDither = params.get('colorDither') || 'none';
  const subpixelGridSize = params.get('spGrid') || '3x3';
  const subpixelCenterRule = params.get('spCenter') || 'strict';
  const subpixelNeutralColor = params.get('spNeutral') ? `#${params.get('spNeutral')}` : '#808080';
  const subpixelFinderOverride = params.get('spFinder') || 'solid';
  const halftoneCell = params.get('htCell') || 'per_module';
  const halftoneDotShape = params.get('htDot') || 'circle';
  const brightnessCurve = params.get('htCurve') || 'linear';
  const duotoneColor1 = params.get('duo1') ? `#${params.get('duo1')}` : '#000000';
  const duotoneColor2 = params.get('duo2') ? `#${params.get('duo2')}` : '#ffffff';
  const paletteParam = params.get('palette');
  const palette = paletteParam
    ? decodeURIComponent(paletteParam)
        .split(',')
        .map((c) => (c.startsWith('#') ? c : `#${c}`))
    : void 0;
  const paletteMode = params.get('paletteMode') || 'position';
  const maxOverlayIntensityL = parseInt(
    params.get('maxIntL') || params.get('maxOverlayIntensityL') || '100',
    10
  );
  const maxOverlayIntensityM = parseInt(
    params.get('maxIntM') || params.get('maxOverlayIntensityM') || '100',
    10
  );
  const maxOverlayIntensityQ = parseInt(
    params.get('maxIntQ') || params.get('maxOverlayIntensityQ') || '100',
    10
  );
  const maxOverlayIntensityH = parseInt(
    params.get('maxIntH') || params.get('maxOverlayIntensityH') || '100',
    10
  );
  const outputFormat = params.get('format') || 'png';
  const _outputQuality = Math.max(0, Math.min(1, parseFloat(params.get('quality') || '0.9')));
  const outputDpi = Math.max(1, Math.min(1200, parseInt(params.get('dpi') || '72', 10)));
  const watermarkEnabled = params.get('wmEn') === '1';
  const watermarkKind = params.get('wmKind') || 'text';
  const watermarkText = params.get('wmText') ? decodeURIComponent(params.get('wmText')) : '';
  const watermarkImageUrl = params.get('wmImg') || void 0;
  const watermarkPosition = params.get('wmPos') || 'center';
  const watermarkOpacity = Math.min(
    100,
    Math.max(0, parseInt(params.get('wmOpacity') || '50', 10))
  );
  const watermarkBlend = params.get('wmBlend') || 'normal';
  const animationPattern = params.get('animPattern') || 'none';
  const animationFramesRaw = parseInt(params.get('animFrames') || '24', 10);
  const animationFrames = Math.min(
    60,
    Math.max(1, Number.isNaN(animationFramesRaw) ? 24 : animationFramesRaw)
  );
  const animationSpeedRaw = parseInt(params.get('animSpeed') || '100', 10);
  const animationSpeed = Math.min(
    1e3,
    Math.max(10, Number.isNaN(animationSpeedRaw) ? 100 : animationSpeedRaw)
  );
  const animationSeed = parseInt(params.get('animSeed') || '0', 10);
  const animationEasing = params.get('easing') || 'linear';
  const webpQuality = Math.min(100, Math.max(0, parseInt(params.get('webpQ') || '90', 10)));
  const gifColors = Math.min(256, Math.max(2, parseInt(params.get('gifColors') || '256', 10)));
  const metaTitle = params.get('metaTitle') ? decodeURIComponent(params.get('metaTitle')) : void 0;
  const metaAuthor = params.get('metaAuthor')
    ? decodeURIComponent(params.get('metaAuthor'))
    : void 0;
  const metaCopyright = params.get('metaCopy')
    ? decodeURIComponent(params.get('metaCopy'))
    : void 0;
  const metaDescription = params.get('metaDesc')
    ? decodeURIComponent(params.get('metaDesc'))
    : void 0;
  if (!['L', 'M', 'Q', 'H'].includes(ec)) {
    return new Response('Invalid "ec" parameter. Use L, M, Q, or H', { status: 400 });
  }
  const validModuleStyles = ['square', 'rounded', 'dots', 'diamond', 'connected'];
  if (!validModuleStyles.includes(moduleStyle)) {
    return new Response(`Invalid "style" parameter. Use one of: ${validModuleStyles.join(', ')}`, {
      status: 400,
    });
  }
  try {
    const qrGenerator = new QRGenerator(nodeCanvasFactory);
    const estimatedVersion = qrGenerator.calculateOptimalVersion(decodeURIComponent(data), ec);
    const estimatedModuleCount = estimatedVersion * 4 + 17;
    const moduleSize = Math.max(
      1,
      Math.floor((size - margin * 2) / (estimatedModuleCount + margin * 2))
    );
    const config = {
      content: decodeURIComponent(data),
      typeNumber: version,
      // 0 = auto-detect
      errorCorrection: ec,
      encodingMode,
      moduleSize,
      margin: margin + borderModulesExtra,
      crispEdges,
      pixelSnap,
      fgColor: `#${fg}`,
      bgColor: `#${bg}`,
      transparentBg: transparent,
      moduleStyle,
      finderStyle,
      alignmentStyle,
      timingStyle,
      eyeOuterStyle,
      eyeInnerStyle,
      eyeScale,
      cornerRadius,
      moduleGap,
      gapMode,
      dotRotationDeg,
      frameStyle,
      frameText,
      perModuleColorMode,
      contrastGuard,
      minContrastRatio,
      overlayMode,
      overlayIntensity,
      colorMode,
      logoSize,
      preserveFinders,
      preserveTiming,
      preserveAlignment,
      protectFormatInfo,
      protectVersionInfo,
      eccAwareEnabled,
      eccAwareRiskBudget,
      eccAwareWeightMap,
      overlayBrightness,
      overlayContrast,
      overlayGamma,
      overlaySaturation,
      overlayHueRotate,
      invertImage: overlayInvert,
      overlayBlur,
      overlaySharpen,
      overlayPosterize,
      overlayThreshold,
      overlayEdgeDetect,
      overlayFit,
      overlayRotate,
      overlayFlipX,
      overlayFlipY,
      // Dither options
      ditherKind,
      diffusionKernel,
      ditherStrength,
      ditherSerpentine,
      orderedMatrix,
      blueNoiseTileSize,
      blueNoiseSeed,
      colorDither,
      // Subpixel options
      subpixelGridSize,
      subpixelCenterRule,
      subpixelNeutralColor,
      subpixelFinderOverride,
      // Halftone options
      halftoneCell,
      halftoneDotShape,
      brightnessCurve,
      duotoneColors: [duotoneColor1, duotoneColor2],
      // Palette
      palette,
      paletteMode,
      gradient:
        gradientType !== 'none'
          ? {
              type: gradientType,
              angle: gradientAngle,
              stops: gradientStops,
            }
          : void 0,
      // Per-ECC intensity limits
      maxOverlayIntensityByEcc: {
        L: maxOverlayIntensityL,
        M: maxOverlayIntensityM,
        Q: maxOverlayIntensityQ,
        H: maxOverlayIntensityH,
      },
    };
    let overlayCanvas = null;
    let overlayFrames = [];
    let hasAnimatedOverlay = false;
    if (overlayUrl && overlayMode) {
      const fetchedImage = await fetchImageWithBuffer(overlayUrl);
      if (fetchedImage) {
        overlayCanvas = fetchedImage.canvas;
        if (fetchedImage.isAnimatedGif && outputFormat === 'gif') {
          hasAnimatedOverlay = true;
          overlayFrames = parseGifFramesServer(fetchedImage.arrayBuffer);
        }
      }
    }
    let canvas = await qrGenerator.generate(config, overlayCanvas);
    let watermarkImageCanvas = null;
    if (
      watermarkEnabled &&
      (watermarkKind === 'image' || watermarkKind === 'pattern') &&
      watermarkImageUrl
    ) {
      watermarkImageCanvas = await fetchImageAsCanvas(watermarkImageUrl);
    }
    if (watermarkEnabled) {
      canvas = applyWatermarkServer(canvas, {
        enabled: watermarkEnabled,
        kind: watermarkKind,
        text: watermarkText,
        imageCanvas: watermarkImageCanvas,
        position: watermarkPosition,
        opacity: watermarkOpacity,
        blend: watermarkBlend,
      });
    }
    let outputCanvas = canvas;
    if (canvas.width !== outputWidth || canvas.height !== outputHeight) {
      outputCanvas = createCanvas(outputWidth, outputHeight);
      const ctx = outputCanvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, outputWidth, outputHeight);
    }
    const metadata =
      metaTitle || metaAuthor || metaCopyright || metaDescription
        ? {
            title: metaTitle,
            author: metaAuthor,
            copyright: metaCopyright,
            description: metaDescription,
            creationTime: /* @__PURE__ */ new Date().toISOString(),
            software: 'ANQR - anqr.link',
          }
        : void 0;
    let animationFrameCanvases = [];
    const animatedOverlayFrames = [];
    if (outputFormat === 'gif') {
      if (hasAnimatedOverlay && overlayFrames.length > 1) {
        for (const overlayFrame of overlayFrames) {
          const frameCanvas = await qrGenerator.generate(config, overlayFrame.canvas);
          let scaledFrame = frameCanvas;
          if (frameCanvas.width !== outputWidth || frameCanvas.height !== outputHeight) {
            scaledFrame = createCanvas(outputWidth, outputHeight);
            const ctx = scaledFrame.getContext('2d');
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(frameCanvas, 0, 0, outputWidth, outputHeight);
          }
          if (watermarkEnabled) {
            scaledFrame = applyWatermarkServer(scaledFrame, {
              enabled: watermarkEnabled,
              kind: watermarkKind,
              text: watermarkText,
              imageCanvas: watermarkImageCanvas,
              position: watermarkPosition,
              opacity: watermarkOpacity,
              blend: watermarkBlend,
            });
          }
          animatedOverlayFrames.push({
            canvas: scaledFrame,
            delay: overlayFrame.delay,
            disposalType: overlayFrame.disposalType,
          });
        }
      } else if (animationPattern !== 'none') {
        animationFrameCanvases = generatePatternFramesServer(
          outputCanvas,
          animationPattern,
          animationFrames,
          animationSeed,
          animationEasing
        );
      }
    }
    let outputBuffer;
    let contentType;
    switch (outputFormat) {
      case 'gif':
        if (animatedOverlayFrames.length > 1) {
          outputBuffer = encodeAnimatedGifWithDelays(animatedOverlayFrames, gifColors);
        } else if (animationFrameCanvases.length > 1) {
          outputBuffer = encodeAnimatedGif(animationFrameCanvases, animationSpeed, gifColors);
        } else {
          outputBuffer = encodeGif(outputCanvas, gifColors);
        }
        contentType = 'image/gif';
        break;
      case 'webp':
        outputBuffer = outputCanvas.toBuffer('image/webp', webpQuality);
        contentType = 'image/webp';
        break;
      default:
        outputBuffer = outputCanvas.toBuffer('image/png');
        if (metadata || outputDpi !== 72) {
          outputBuffer = embedPngMetadataAndDpi(outputBuffer, metadata, outputDpi);
        }
        contentType = 'image/png';
        break;
    }
    return new Response(new Uint8Array(outputBuffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('QR generation error:', error);
    return new Response(`Error generating QR code: ${message}`, { status: 500 });
  }
};
export { qr_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvcXIudHMiLCAidmVuZG9yL2xpYi9xcmNvZGUtZ2VuZXJhdG9yL3FyY29kZS5tanMiLCAic3JjL21vZHVsZXMvYmx1ZS1ub2lzZS1kaXRoZXIudHMiLCAic3JjL21vZHVsZXMvcXItY29yZS50cyIsICJzcmMvbW9kdWxlcy9jb2xvci11dGlscy50cyIsICJzcmMvbW9kdWxlcy9kaXRoZXItYWxnb3JpdGhtcy50cyIsICJzcmMvbW9kdWxlcy9xci1nZW5lcmF0b3IuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qKlxuICogTmV0bGlmeSBGdW5jdGlvbjogUVIgQ29kZSBJbWFnZSBHZW5lcmF0b3JcbiAqIFxuICogR2VuZXJhdGVzIFFSIGNvZGUgaW1hZ2VzIHNlcnZlci1zaWRlIGZvciBlbWJlZGRpbmcgdmlhIDxpbWc+IHRhZ3MuXG4gKiBVc2VzIHRoZSBzYW1lIFFSR2VuZXJhdG9yIGFzIHRoZSBtYWluIGFwcCB3aXRoIGEgTm9kZS5qcyBjYW52YXMgZmFjdG9yeS5cbiAqIFN1cHBvcnRzIFBORywgV2ViUCwgR0lGIG91dHB1dCB3aXRoIHdhdGVybWFya3MgYW5kIG1ldGFkYXRhIGVtYmVkZGluZy5cbiAqIFxuICogVXNhZ2U6IEdFVCAvYXBpL3FyP2RhdGE9aHR0cHM6Ly9leGFtcGxlLmNvbSZzaXplPTIwMCZmZz0wMDAwMDAmYmc9ZmZmZmZmXG4gKiBcbiAqIFBhcmFtZXRlcnM6XG4gKiAtIGRhdGE6IFRoZSBjb250ZW50IHRvIGVuY29kZSAocmVxdWlyZWQpXG4gKiAtIHNpemU6IEltYWdlIHNpemUgaW4gcGl4ZWxzIChkZWZhdWx0OiA0MDAsIG1heDogMjAwMCkgLSB1c2VkIGlmIHcvaCBub3Qgc3BlY2lmaWVkXG4gKiAtIHc6IE91dHB1dCB3aWR0aCBpbiBwaXhlbHMgKG92ZXJyaWRlcyBzaXplKVxuICogLSBoOiBPdXRwdXQgaGVpZ2h0IGluIHBpeGVscyAob3ZlcnJpZGVzIHNpemUpXG4gKiAtIGZvcm1hdDogT3V0cHV0IGZvcm1hdCAtIHBuZy93ZWJwL2dpZiAoZGVmYXVsdDogcG5nKVxuICogLSBxdWFsaXR5OiBPdXRwdXQgcXVhbGl0eSAwLTEgZm9yIHdlYnAgKGRlZmF1bHQ6IDAuOSlcbiAqIC0gZmc6IEZvcmVncm91bmQgY29sb3IgaGV4IHdpdGhvdXQgIyAoZGVmYXVsdDogMDAwMDAwKVxuICogLSBiZzogQmFja2dyb3VuZCBjb2xvciBoZXggd2l0aG91dCAjIChkZWZhdWx0OiBmZmZmZmYpXG4gKiAtIGVjOiBFcnJvciBjb3JyZWN0aW9uIGxldmVsIEwvTS9RL0ggKGRlZmF1bHQ6IEgpXG4gKiAtIHY6IFFSIHZlcnNpb24gMS00MCAoZGVmYXVsdDogMCA9IGF1dG8pXG4gKiAtIGVuYzogRW5jb2RpbmcgbW9kZSAtIGF1dG8vbnVtZXJpYy9hbHBoYW51bWVyaWMvYnl0ZS9rYW5qaSAoZGVmYXVsdDogYXV0bylcbiAqIC0gbWFyZ2luOiBRdWlldCB6b25lIG1vZHVsZXMgKGRlZmF1bHQ6IDQpXG4gKiAtIGJvcmRlcjogRXh0cmEgYm9yZGVyIG1vZHVsZXMgKGRlZmF1bHQ6IDApXG4gKiAtIGNyaXNwOiBDcmlzcCBlZGdlcyAwLzEgKGRlZmF1bHQ6IDEpXG4gKiAtIHNuYXA6IFBpeGVsIHNuYXAgLSBmbG9vci9yb3VuZC9jZWlsIChkZWZhdWx0OiBmbG9vcilcbiAqIC0gc3R5bGU6IE1vZHVsZSBzdHlsZSAtIHNxdWFyZS9yb3VuZGVkL2RvdHMvZGlhbW9uZC9jb25uZWN0ZWQgKGRlZmF1bHQ6IHNxdWFyZSlcbiAqIC0gZmluZGVyOiBGaW5kZXIgc3R5bGUgLSBzcXVhcmUvcm91bmRlZC9jaXJjbGUgKGRlZmF1bHQ6IHNxdWFyZSlcbiAqIC0gYWxpZ246IEFsaWdubWVudCBwYXR0ZXJuIHN0eWxlIC0gbWF0Y2hfZmluZGVyL3NxdWFyZS9yb3VuZGVkL2NpcmNsZSAoZGVmYXVsdDogbWF0Y2hfZmluZGVyKVxuICogLSB0aW1pbmc6IFRpbWluZyBwYXR0ZXJuIHN0eWxlIC0gbWF0Y2hfbW9kdWxlL3NvbGlkL2Rhc2hlZCAoZGVmYXVsdDogbWF0Y2hfbW9kdWxlKVxuICogLSBleWVPdXRlcjogRXllIG91dGVyIHN0eWxlIC0gc3F1YXJlL3JvdW5kZWQvY2lyY2xlXG4gKiAtIGV5ZUlubmVyOiBFeWUgaW5uZXIgc3R5bGUgLSBzcXVhcmUvcm91bmRlZC9jaXJjbGUgIFxuICogLSBleWVTY2FsZTogRXllIHNjYWxlIHBlcmNlbnRhZ2UgKGRlZmF1bHQ6IDEwMClcbiAqIC0gcmFkaXVzOiBDb3JuZXIgcmFkaXVzIHBlcmNlbnRhZ2UgMC0xMDAgKGRlZmF1bHQ6IDApXG4gKiAtIGdhcDogTW9kdWxlIGdhcCBwZXJjZW50YWdlIChkZWZhdWx0OiAwKVxuICogLSBnYXBNb2RlOiBHYXAgbW9kZSAtIG5vbmUvaW5zZXQvc3Ryb2tlL25lZ2F0aXZlX3NwYWNlXG4gKiAtIGZyYW1lOiBGcmFtZSBzdHlsZSAtIG5vbmUvcm91bmRlZF9mcmFtZS9zdGlja2VyL3RhZ1xuICogLSBmcmFtZVRleHQ6IFRleHQgdG8gc2hvdyBpbiBmcmFtZVxuICogLSBncmFkOiBHcmFkaWVudCB0eXBlIC0gbm9uZS9saW5lYXIvcmFkaWFsL2NvbmljXG4gKiAtIGdyYWRBbmdsZTogR3JhZGllbnQgYW5nbGUgZm9yIGxpbmVhciAoZGVmYXVsdDogMClcbiAqIC0gZ3JhZFN0b3BzOiBHcmFkaWVudCBzdG9wcyBhcyBjb2xvcjEscG9zMSxjb2xvcjIscG9zMiwuLi4gKGUuZy4gZmYwMDAwLDAsMDAwMGZmLDEpXG4gKiAtIG1vZENvbG9yOiBQZXItbW9kdWxlIGNvbG9yIG1vZGUgLSBzb2xpZC9ieV9icmlnaHRuZXNzL2J5X3Bvc2l0aW9uL2J5X292ZXJsYXkvYnlfY2x1c3RlclxuICogLSBjR3VhcmQ6IENvbnRyYXN0IGd1YXJkIDAvMSAoZGVmYXVsdDogMClcbiAqIC0gbWluQ29udHJhc3Q6IE1pbmltdW0gY29udHJhc3QgcmF0aW8gKGRlZmF1bHQ6IDQuNSlcbiAqIC0gaW1nOiBVUkwgdG8gb3ZlcmxheSBpbWFnZSAoZmV0Y2hlZCBzZXJ2ZXItc2lkZSlcbiAqIC0gbW9kZTogT3ZlcmxheSBtb2RlIC0gY2VudGVyL2hhbGZ0b25lL2JsZW5kL2JyaWdodG5lc3MvbW9zYWljL2RpdGhlcmVkL2JsdWUtbm9pc2Uvc3VicGl4ZWxcbiAqIC0gaW50ZW5zaXR5OiBPdmVybGF5IGludGVuc2l0eSAwLTEwMCAoZGVmYXVsdDogMTAwKVxuICogLSBjb2xvck1vZGU6IE92ZXJsYXkgY29sb3IgbW9kZSAtIGNvbG9yL2dyYXlzY2FsZS9id1xuICogLSB0cmFuc3BhcmVudDogU2V0IHRvIDEgZm9yIHRyYW5zcGFyZW50IGJhY2tncm91bmRcbiAqIC0ga2VlcEZpbmRlcnM6IFByZXNlcnZlIGZpbmRlciBwYXR0ZXJucyAoZGVmYXVsdDogMSlcbiAqIC0ga2VlcFRpbWluZzogUHJlc2VydmUgdGltaW5nIHBhdHRlcm5zIChkZWZhdWx0OiAwKVxuICogLSBrZWVwQWxpZ246IFByZXNlcnZlIGFsaWdubWVudCBwYXR0ZXJucyAoZGVmYXVsdDogMClcbiAqIC0gcHJvdGVjdEZtdDogUHJvdGVjdCBmb3JtYXQgaW5mbyAoZGVmYXVsdDogMClcbiAqIC0gcHJvdGVjdFZlcjogUHJvdGVjdCB2ZXJzaW9uIGluZm8gKGRlZmF1bHQ6IDApXG4gKiAtIGVjY0F3YXJlOiBFQ0MtYXdhcmUgbW9kZSAoZGVmYXVsdDogMClcbiAqIC0gZWNjUmlzazogRUNDIHJpc2sgYnVkZ2V0IDAtMTAwIChkZWZhdWx0OiA1MClcbiAqIC0gZWNjTWFwOiBFQ0Mgd2VpZ2h0IG1hcCAtIGRpc3RhbmNlX3RvX2ZpbmRlcnMvYmxvY2tfaGVhdG1hcC9lbXBpcmljYWxfc2Nhbl9oZWF0bWFwXG4gKiAtIGJyaWdodG5lc3M6IE92ZXJsYXkgYnJpZ2h0bmVzcyBhZGp1c3RtZW50IC0xMDAgdG8gMTAwIChkZWZhdWx0OiAwKVxuICogLSBjb250cmFzdDogT3ZlcmxheSBjb250cmFzdCBhZGp1c3RtZW50IC0xMDAgdG8gMTAwIChkZWZhdWx0OiAwKVxuICogLSBnYW1tYTogT3ZlcmxheSBnYW1tYSAwLjEgdG8gMyAoZGVmYXVsdDogMSlcbiAqIC0gc2F0dXJhdGlvbjogT3ZlcmxheSBzYXR1cmF0aW9uIC0xMDAgdG8gMTAwIChkZWZhdWx0OiAwKVxuICogLSBodWU6IE92ZXJsYXkgaHVlIHJvdGF0aW9uIGluIGRlZ3JlZXMgKGRlZmF1bHQ6IDApXG4gKiAtIGludmVydDogSW52ZXJ0IG92ZXJsYXkgY29sb3JzIChkZWZhdWx0OiAwKVxuICogLSBibHVyOiBPdmVybGF5IGJsdXIgaW4gcGl4ZWxzIChkZWZhdWx0OiAwKVxuICogLSBzaGFycGVuOiBPdmVybGF5IHNoYXJwZW4gMC0xMDAgKGRlZmF1bHQ6IDApXG4gKiAtIHBvc3Rlcml6ZTogT3ZlcmxheSBwb3N0ZXJpemUgbGV2ZWxzIChkZWZhdWx0OiAwKVxuICogLSB0aHJlc2hvbGQ6IE92ZXJsYXkgdGhyZXNob2xkIDAtMjU1IChkZWZhdWx0OiAxMjgpXG4gKiAtIGVkZ2U6IEVkZ2UgZGV0ZWN0aW9uIC0gb2ZmL3NvYmVsL2Nhbm55IChkZWZhdWx0OiBvZmYpXG4gKiAtIGZpdDogT3ZlcmxheSBmaXQgbW9kZSAtIGNvdmVyL2NvbnRhaW4vc3RyZXRjaCAoZGVmYXVsdDogY292ZXIpXG4gKiAtIHJvdDogT3ZlcmxheSByb3RhdGlvbiBpbiBkZWdyZWVzIChkZWZhdWx0OiAwKVxuICogLSBmbGlwWDogRmxpcCBvdmVybGF5IGhvcml6b250YWxseSAoZGVmYXVsdDogMClcbiAqIC0gZmxpcFk6IEZsaXAgb3ZlcmxheSB2ZXJ0aWNhbGx5IChkZWZhdWx0OiAwKVxuICogLSBkaXRoZXJLaW5kOiBEaXRoZXIgYWxnb3JpdGhtIChkZWZhdWx0OiBlcnJvcl9kaWZmdXNpb24pXG4gKiAtIGRpZmZ1c2lvbktlcm5lbDogRGlmZnVzaW9uIGtlcm5lbCAtIGZsb3lkX3N0ZWluYmVyZy9qYXJ2aXNfanVkaWNlX25pbmtlL3N0dWNraS9ldGNcbiAqIC0gZGl0aGVyU3RyZW5ndGg6IERpdGhlciBzdHJlbmd0aCAwLTEwMCAoZGVmYXVsdDogNTApXG4gKiAtIHNlcnBlbnRpbmU6IFNlcnBlbnRpbmUgZGl0aGVyaW5nIDAvMSAoZGVmYXVsdDogMClcbiAqIC0gbWF0cml4OiBPcmRlcmVkIGRpdGhlciBtYXRyaXggLSBiYXllcjIvYmF5ZXI0L2JheWVyOC9ldGNcbiAqIC0gYm5UaWxlOiBCbHVlIG5vaXNlIHRpbGUgc2l6ZSAoZGVmYXVsdDogNjQpXG4gKiAtIGJuU2VlZDogQmx1ZSBub2lzZSBzZWVkIChkZWZhdWx0OiAwKVxuICogLSBjb2xvckRpdGhlcjogQ29sb3IgZGl0aGVyIC0gbm9uZS9wZXJfY2hhbm5lbC9wZXJjZXB0dWFsXG4gKiAtIHNwR3JpZDogU3VicGl4ZWwgZ3JpZCBzaXplIC0gMngyLzN4My80eDRcbiAqIC0gc3BDZW50ZXI6IFN1YnBpeGVsIGNlbnRlciBydWxlIC0gc3RyaWN0L2hhbGZ0b25lX2NlbnRlclxuICogLSBzcE5ldXRyYWw6IFN1YnBpeGVsIG5ldXRyYWwgY29sb3IgaGV4IChkZWZhdWx0OiA4MDgwODApXG4gKiAtIHNwRmluZGVyOiBTdWJwaXhlbCBmaW5kZXIgb3ZlcnJpZGUgLSBzb2xpZC9zdHlsaXplZFxuICogLSBodENlbGw6IEhhbGZ0b25lIGNlbGwgLSBwZXJfbW9kdWxlL25cdTAwRDduXG4gKiAtIGh0RG90OiBIYWxmdG9uZSBkb3Qgc2hhcGUgLSBjaXJjbGUvc3F1YXJlL2xpbmVcbiAqIC0gaHRDdXJ2ZTogQnJpZ2h0bmVzcyBjdXJ2ZSAtIGxpbmVhci9zLWN1cnZlL2dhbW1hXG4gKiAtIGR1bzE6IER1b3RvbmUgY29sb3IgMSBoZXggKGRlZmF1bHQ6IDAwMDAwMClcbiAqIC0gZHVvMjogRHVvdG9uZSBjb2xvciAyIGhleCAoZGVmYXVsdDogZmZmZmZmKVxuICogLSB3bUVuOiBXYXRlcm1hcmsgZW5hYmxlZCAwLzEgKGRlZmF1bHQ6IDApXG4gKiAtIHdtS2luZDogV2F0ZXJtYXJrIGtpbmQgLSB0ZXh0L2ltYWdlL3BhdHRlcm4gKGRlZmF1bHQ6IHRleHQpXG4gKiAtIHdtVGV4dDogV2F0ZXJtYXJrIHRleHQgKFVSTCBlbmNvZGVkKVxuICogLSB3bVBvczogV2F0ZXJtYXJrIHBvc2l0aW9uIC0gY2VudGVyL2Nvcm5lcnMvZWRnZXMvYmVoaW5kL3F1aWV0X3pvbmUgKGRlZmF1bHQ6IGNlbnRlcilcbiAqIC0gd21PcGFjaXR5OiBXYXRlcm1hcmsgb3BhY2l0eSAwLTEwMCAoZGVmYXVsdDogNTApXG4gKiAtIHdtQmxlbmQ6IFdhdGVybWFyayBibGVuZCAtIG5vcm1hbC9tdWx0aXBseS9zY3JlZW4vb3ZlcmxheSAoZGVmYXVsdDogbm9ybWFsKVxuICogLSB3bUltZzogVVJMIHRvIHdhdGVybWFyayBpbWFnZSAoZm9yIGltYWdlL3BhdHRlcm4gd2F0ZXJtYXJrIHR5cGVzKVxuICogLSBhbmltUGF0dGVybjogQW5pbWF0aW9uIHBhdHRlcm4gZm9yIEdJRiAtIG5vbmUvcHVsc2Uvd2F2ZS9zY2FubGluZS9zaGltbWVyL2RyaWZ0L2NvbG9yX2N5Y2xlXG4gKiAtIGFuaW1GcmFtZXM6IE51bWJlciBvZiBhbmltYXRpb24gZnJhbWVzIDEtNjAgKGRlZmF1bHQ6IDI0KVxuICogLSBhbmltU3BlZWQ6IEFuaW1hdGlvbiBmcmFtZSBkZWxheSBpbiBtcyAxMC0xMDAwIChkZWZhdWx0OiAxMDApXG4gKiAtIGFuaW1TZWVkOiBBbmltYXRpb24gcmFuZG9tIHNlZWQgKGRlZmF1bHQ6IDApXG4gKiAtIGVhc2luZzogQW5pbWF0aW9uIGVhc2luZyBmdW5jdGlvbiAtIGxpbmVhci9lYXNlX2luL2Vhc2Vfb3V0L2Vhc2VfaW5fb3V0L2JvdW5jZSAoZGVmYXVsdDogbGluZWFyKVxuICogLSB3ZWJwUTogV2ViUCBxdWFsaXR5IDAtMTAwIChkZWZhdWx0OiA5MClcbiAqIC0gZ2lmQ29sb3JzOiBHSUYgcGFsZXR0ZSBzaXplIDItMjU2IChkZWZhdWx0OiAyNTYpXG4gKiAtIG1ldGFUaXRsZTogUE5HIG1ldGFkYXRhIHRpdGxlXG4gKiAtIG1ldGFBdXRob3I6IFBORyBtZXRhZGF0YSBhdXRob3JcbiAqIC0gbWV0YUNvcHk6IFBORyBtZXRhZGF0YSBjb3B5cmlnaHRcbiAqIC0gbWV0YURlc2M6IFBORyBtZXRhZGF0YSBkZXNjcmlwdGlvblxuICogLSBkcGk6IE91dHB1dCBEUEkgZm9yIFBORyAoZGVmYXVsdDogNzIpXG4gKi9cblxuaW1wb3J0IHsgY3JlYXRlQ2FudmFzLCBsb2FkSW1hZ2UsIHR5cGUgQ2FudmFzLCB0eXBlIFNLUlNDb250ZXh0MkQgfSBmcm9tICdAbmFwaS1ycy9jYW52YXMnXG5pbXBvcnQgZ2lmZW5jIGZyb20gJ2dpZmVuYydcbmNvbnN0IHsgR0lGRW5jb2RlciwgcXVhbnRpemUsIGFwcGx5UGFsZXR0ZSB9ID0gZ2lmZW5jXG5pbXBvcnQgeyBwYXJzZUdJRiwgZGVjb21wcmVzc0ZyYW1lcyB9IGZyb20gJ2dpZnVjdC1qcydcbi8vIEB0cy1pZ25vcmUgLSBKUyBtb2R1bGVcbmltcG9ydCB7IFFSR2VuZXJhdG9yIH0gZnJvbSBcIi4uLy4uL3NyYy9tb2R1bGVzL3FyLWdlbmVyYXRvci5qc1wiXG5cbnR5cGUgRUNDTGV2ZWwgPSAnTCcgfCAnTScgfCAnUScgfCAnSCdcbnR5cGUgT3V0cHV0Rm9ybWF0ID0gJ3BuZycgfCAnd2VicCcgfCAnZ2lmJ1xudHlwZSBXYXRlcm1hcmtLaW5kID0gJ3RleHQnIHwgJ2ltYWdlJyB8ICdwYXR0ZXJuJ1xudHlwZSBXYXRlcm1hcmtQb3NpdGlvbiA9ICdjZW50ZXInIHwgJ2Nvcm5lcnMnIHwgJ2VkZ2VzJyB8ICdiZWhpbmQnIHwgJ3F1aWV0X3pvbmUnXG50eXBlIFdhdGVybWFya0JsZW5kID0gJ25vcm1hbCcgfCAnbXVsdGlwbHknIHwgJ3NjcmVlbicgfCAnb3ZlcmxheSdcblxuLyoqXG4gKiBOb2RlLmpzIGNhbnZhcyBmYWN0b3J5IHVzaW5nIEBuYXBpLXJzL2NhbnZhc1xuICovXG5jb25zdCBub2RlQ2FudmFzRmFjdG9yeSA9IHtcbiAgY3JlYXRlQ2FudmFzOiBhc3luYyAod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpXG4gIH0sXG4gIGxvYWRJbWFnZTogYXN5bmMgKHNyYzogc3RyaW5nKSA9PiB7XG4gICAgcmV0dXJuIGxvYWRJbWFnZShzcmMpXG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFdBVEVSTUFSSyBGVU5DVElPTlMgKHNlcnZlci1zaWRlIGFkYXB0YXRpb24pXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIENyZWF0ZSBhIHRleHQgd2F0ZXJtYXJrIGNhbnZhcyAoc2VydmVyLXNpZGUpXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVRleHRXYXRlcm1hcmsoXG4gIHRleHQ6IHN0cmluZyxcbiAgZm9udFNpemU6IG51bWJlciA9IDE0LFxuICBmb250RmFtaWx5OiBzdHJpbmcgPSAnc2Fucy1zZXJpZicsXG4gIGNvbG9yOiBzdHJpbmcgPSAnIzAwMDAwMCdcbik6IENhbnZhcyB7XG4gIC8vIEZpcnN0IG1lYXN1cmUgdGhlIHRleHRcbiAgY29uc3QgbWVhc3VyZUNhbnZhcyA9IGNyZWF0ZUNhbnZhcygxLCAxKVxuICBjb25zdCBtZWFzdXJlQ3R4ID0gbWVhc3VyZUNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gIG1lYXN1cmVDdHguZm9udCA9IGAke2ZvbnRTaXplfXB4ICR7Zm9udEZhbWlseX1gXG4gIGNvbnN0IG1ldHJpY3MgPSBtZWFzdXJlQ3R4Lm1lYXN1cmVUZXh0KHRleHQpXG4gIGNvbnN0IHRleHRIZWlnaHQgPSBmb250U2l6ZSAqIDEuMlxuXG4gIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyhNYXRoLmNlaWwobWV0cmljcy53aWR0aCkgKyAxMCwgTWF0aC5jZWlsKHRleHRIZWlnaHQpICsgMTApXG4gIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG5cbiAgY3R4LmZvbnQgPSBgJHtmb250U2l6ZX1weCAke2ZvbnRGYW1pbHl9YFxuICBjdHguZmlsbFN0eWxlID0gY29sb3JcbiAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnXG4gIGN0eC5maWxsVGV4dCh0ZXh0LCA1LCBjYW52YXMuaGVpZ2h0IC8gMilcblxuICByZXR1cm4gY2FudmFzXG59XG5cbi8qKlxuICogR2V0IHdhdGVybWFyayBwb3NpdGlvbnMgYmFzZWQgb24gcG9zaXRpb24gdHlwZVxuICovXG5mdW5jdGlvbiBnZXRXYXRlcm1hcmtQb3NpdGlvbnMoXG4gIHBvc2l0aW9uOiBXYXRlcm1hcmtQb3NpdGlvbixcbiAgY2FudmFzV2lkdGg6IG51bWJlcixcbiAgY2FudmFzSGVpZ2h0OiBudW1iZXIsXG4gIHdhdGVybWFya1dpZHRoOiBudW1iZXIsXG4gIHdhdGVybWFya0hlaWdodDogbnVtYmVyLFxuICBtYXJnaW46IG51bWJlciA9IDEwXG4pOiBBcnJheTx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+IHtcbiAgY29uc3QgcG9zaXRpb25zOiBBcnJheTx7IHg6IG51bWJlcjsgeTogbnVtYmVyIH0+ID0gW11cblxuICBzd2l0Y2ggKHBvc2l0aW9uKSB7XG4gICAgY2FzZSAnY2VudGVyJzpcbiAgICAgIHBvc2l0aW9ucy5wdXNoKHtcbiAgICAgICAgeDogKGNhbnZhc1dpZHRoIC0gd2F0ZXJtYXJrV2lkdGgpIC8gMixcbiAgICAgICAgeTogKGNhbnZhc0hlaWdodCAtIHdhdGVybWFya0hlaWdodCkgLyAyLFxuICAgICAgfSlcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdjb3JuZXJzJzpcbiAgICAgIHBvc2l0aW9ucy5wdXNoKFxuICAgICAgICB7IHg6IG1hcmdpbiwgeTogbWFyZ2luIH0sXG4gICAgICAgIHsgeDogY2FudmFzV2lkdGggLSB3YXRlcm1hcmtXaWR0aCAtIG1hcmdpbiwgeTogbWFyZ2luIH0sXG4gICAgICAgIHsgeDogbWFyZ2luLCB5OiBjYW52YXNIZWlnaHQgLSB3YXRlcm1hcmtIZWlnaHQgLSBtYXJnaW4gfSxcbiAgICAgICAgeyB4OiBjYW52YXNXaWR0aCAtIHdhdGVybWFya1dpZHRoIC0gbWFyZ2luLCB5OiBjYW52YXNIZWlnaHQgLSB3YXRlcm1hcmtIZWlnaHQgLSBtYXJnaW4gfVxuICAgICAgKVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ2VkZ2VzJzpcbiAgICAgIHBvc2l0aW9ucy5wdXNoKFxuICAgICAgICB7IHg6IChjYW52YXNXaWR0aCAtIHdhdGVybWFya1dpZHRoKSAvIDIsIHk6IG1hcmdpbiB9LFxuICAgICAgICB7IHg6IChjYW52YXNXaWR0aCAtIHdhdGVybWFya1dpZHRoKSAvIDIsIHk6IGNhbnZhc0hlaWdodCAtIHdhdGVybWFya0hlaWdodCAtIG1hcmdpbiB9LFxuICAgICAgICB7IHg6IG1hcmdpbiwgeTogKGNhbnZhc0hlaWdodCAtIHdhdGVybWFya0hlaWdodCkgLyAyIH0sXG4gICAgICAgIHsgeDogY2FudmFzV2lkdGggLSB3YXRlcm1hcmtXaWR0aCAtIG1hcmdpbiwgeTogKGNhbnZhc0hlaWdodCAtIHdhdGVybWFya0hlaWdodCkgLyAyIH1cbiAgICAgIClcbiAgICAgIGJyZWFrXG5cbiAgICBjYXNlICdxdWlldF96b25lJzpcbiAgICAgIHBvc2l0aW9ucy5wdXNoKFxuICAgICAgICB7IHg6IG1hcmdpbiAvIDIsIHk6IGNhbnZhc0hlaWdodCAtIHdhdGVybWFya0hlaWdodCAtIG1hcmdpbiAvIDIgfVxuICAgICAgKVxuICAgICAgYnJlYWtcblxuICAgIGNhc2UgJ2JlaGluZCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIHBvc2l0aW9ucy5wdXNoKHtcbiAgICAgICAgeDogKGNhbnZhc1dpZHRoIC0gd2F0ZXJtYXJrV2lkdGgpIC8gMixcbiAgICAgICAgeTogKGNhbnZhc0hlaWdodCAtIHdhdGVybWFya0hlaWdodCkgLyAyLFxuICAgICAgfSlcbiAgfVxuXG4gIHJldHVybiBwb3NpdGlvbnNcbn1cblxuLyoqXG4gKiBBcHBseSBibGVuZCBtb2RlIHRvIGNvbnRleHRcbiAqL1xuZnVuY3Rpb24gYXBwbHlCbGVuZE1vZGUoY3R4OiBTS1JTQ29udGV4dDJELCBibGVuZDogV2F0ZXJtYXJrQmxlbmQpOiB2b2lkIHtcbiAgc3dpdGNoIChibGVuZCkge1xuICAgIGNhc2UgJ211bHRpcGx5JzpcbiAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnbXVsdGlwbHknXG4gICAgICBicmVha1xuICAgIGNhc2UgJ3NjcmVlbic6XG4gICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ3NjcmVlbidcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnb3ZlcmxheSc6XG4gICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ292ZXJsYXknXG4gICAgICBicmVha1xuICAgIGNhc2UgJ25vcm1hbCc6XG4gICAgZGVmYXVsdDpcbiAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnc291cmNlLW92ZXInXG4gICAgICBicmVha1xuICB9XG59XG5cbmludGVyZmFjZSBXYXRlcm1hcmtPcHRpb25zIHtcbiAgZW5hYmxlZDogYm9vbGVhblxuICBraW5kOiBXYXRlcm1hcmtLaW5kXG4gIHRleHQ6IHN0cmluZ1xuICBpbWFnZUNhbnZhcz86IENhbnZhcyB8IG51bGxcbiAgcG9zaXRpb246IFdhdGVybWFya1Bvc2l0aW9uXG4gIG9wYWNpdHk6IG51bWJlclxuICBibGVuZDogV2F0ZXJtYXJrQmxlbmRcbn1cblxuLyoqXG4gKiBBcHBseSB3YXRlcm1hcmsgdG8gYSBjYW52YXMgKHNlcnZlci1zaWRlKVxuICovXG5mdW5jdGlvbiBhcHBseVdhdGVybWFya1NlcnZlcihcbiAgc291cmNlOiBDYW52YXMsXG4gIG9wdGlvbnM6IFdhdGVybWFya09wdGlvbnNcbik6IENhbnZhcyB7XG4gIGlmICghb3B0aW9ucy5lbmFibGVkIHx8IChvcHRpb25zLmtpbmQgPT09ICd0ZXh0JyAmJiAhb3B0aW9ucy50ZXh0KSkge1xuICAgIHJldHVybiBzb3VyY2VcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdCA9IGNyZWF0ZUNhbnZhcyhzb3VyY2Uud2lkdGgsIHNvdXJjZS5oZWlnaHQpXG4gIGNvbnN0IGN0eCA9IHJlc3VsdC5nZXRDb250ZXh0KCcyZCcpXG5cbiAgLy8gRm9yICdiZWhpbmQnIHBvc2l0aW9uLCBkcmF3IHdhdGVybWFyayBmaXJzdFxuICBpZiAob3B0aW9ucy5wb3NpdGlvbiA9PT0gJ2JlaGluZCcpIHtcbiAgICBkcmF3V2F0ZXJtYXJrTGF5ZXJTZXJ2ZXIoY3R4LCBvcHRpb25zLCBzb3VyY2Uud2lkdGgsIHNvdXJjZS5oZWlnaHQpXG4gICAgY3R4LmRyYXdJbWFnZShzb3VyY2UsIDAsIDApXG4gIH0gZWxzZSB7XG4gICAgY3R4LmRyYXdJbWFnZShzb3VyY2UsIDAsIDApXG4gICAgZHJhd1dhdGVybWFya0xheWVyU2VydmVyKGN0eCwgb3B0aW9ucywgc291cmNlLndpZHRoLCBzb3VyY2UuaGVpZ2h0KVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIERyYXcgd2F0ZXJtYXJrIGxheWVyIChzZXJ2ZXItc2lkZSlcbiAqL1xuZnVuY3Rpb24gZHJhd1dhdGVybWFya0xheWVyU2VydmVyKFxuICBjdHg6IFNLUlNDb250ZXh0MkQsXG4gIG9wdGlvbnM6IFdhdGVybWFya09wdGlvbnMsXG4gIGNhbnZhc1dpZHRoOiBudW1iZXIsXG4gIGNhbnZhc0hlaWdodDogbnVtYmVyXG4pOiB2b2lkIHtcbiAgbGV0IHdhdGVybWFya0NhbnZhczogQ2FudmFzIHwgbnVsbCA9IG51bGxcblxuICBpZiAob3B0aW9ucy5raW5kID09PSAndGV4dCcgJiYgb3B0aW9ucy50ZXh0KSB7XG4gICAgd2F0ZXJtYXJrQ2FudmFzID0gY3JlYXRlVGV4dFdhdGVybWFyayhvcHRpb25zLnRleHQsIDE0LCAnc2Fucy1zZXJpZicsICcjMDAwMDAwJylcbiAgfSBlbHNlIGlmICgob3B0aW9ucy5raW5kID09PSAnaW1hZ2UnIHx8IG9wdGlvbnMua2luZCA9PT0gJ3BhdHRlcm4nKSAmJiBvcHRpb25zLmltYWdlQ2FudmFzKSB7XG4gICAgd2F0ZXJtYXJrQ2FudmFzID0gb3B0aW9ucy5pbWFnZUNhbnZhc1xuICB9XG5cbiAgaWYgKCF3YXRlcm1hcmtDYW52YXMpIHJldHVyblxuXG4gIGN0eC5zYXZlKClcbiAgYXBwbHlCbGVuZE1vZGUoY3R4LCBvcHRpb25zLmJsZW5kKVxuICBjdHguZ2xvYmFsQWxwaGEgPSBvcHRpb25zLm9wYWNpdHkgLyAxMDBcblxuICBjb25zdCBwb3NpdGlvbnMgPSBnZXRXYXRlcm1hcmtQb3NpdGlvbnMoXG4gICAgb3B0aW9ucy5wb3NpdGlvbixcbiAgICBjYW52YXNXaWR0aCxcbiAgICBjYW52YXNIZWlnaHQsXG4gICAgd2F0ZXJtYXJrQ2FudmFzLndpZHRoLFxuICAgIHdhdGVybWFya0NhbnZhcy5oZWlnaHQsXG4gICAgMTBcbiAgKVxuXG4gIGZvciAoY29uc3QgcG9zIG9mIHBvc2l0aW9ucykge1xuICAgIGN0eC5kcmF3SW1hZ2Uod2F0ZXJtYXJrQ2FudmFzLCBwb3MueCwgcG9zLnkpXG4gIH1cblxuICBjdHgucmVzdG9yZSgpXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBQTkcgTUVUQURBVEEgRU1CRURESU5HXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5pbnRlcmZhY2UgUG5nTWV0YWRhdGEge1xuICB0aXRsZT86IHN0cmluZ1xuICBhdXRob3I/OiBzdHJpbmdcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmdcbiAgY29weXJpZ2h0Pzogc3RyaW5nXG4gIGNyZWF0aW9uVGltZT86IHN0cmluZ1xuICBzb2Z0d2FyZT86IHN0cmluZ1xufVxuXG4vKipcbiAqIENSQzMyIGNhbGN1bGF0aW9uIGZvciBQTkcgY2h1bmtzXG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZUNyYzMyKGRhdGE6IFVpbnQ4QXJyYXkpOiBudW1iZXIge1xuICBsZXQgY3JjID0gMHhGRkZGRkZGRlxuICBcbiAgY29uc3QgdGFibGU6IG51bWJlcltdID0gW11cbiAgZm9yIChsZXQgbiA9IDA7IG4gPCAyNTY7IG4rKykge1xuICAgIGxldCBjID0gblxuICAgIGZvciAobGV0IGsgPSAwOyBrIDwgODsgaysrKSB7XG4gICAgICBjID0gKGMgJiAxKSA/ICgweEVEQjg4MzIwIF4gKGMgPj4+IDEpKSA6IChjID4+PiAxKVxuICAgIH1cbiAgICB0YWJsZVtuXSA9IGNcbiAgfVxuICBcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgY3JjID0gdGFibGVbKGNyYyBeIGRhdGFbaV0pICYgMHhGRl0gXiAoY3JjID4+PiA4KVxuICB9XG4gIFxuICByZXR1cm4gKGNyYyBeIDB4RkZGRkZGRkYpID4+PiAwXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgUE5HIHRFWHQgY2h1bmsgZm9yIG1ldGFkYXRhXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBuZ1RleHRDaHVuayhrZXl3b3JkOiBzdHJpbmcsIHRleHQ6IHN0cmluZyk6IFVpbnQ4QXJyYXkge1xuICBjb25zdCBrZXl3b3JkQnl0ZXMgPSBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoa2V5d29yZClcbiAgY29uc3QgdGV4dEJ5dGVzID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKHRleHQpXG4gIFxuICBjb25zdCBjaHVua0RhdGEgPSBuZXcgVWludDhBcnJheShrZXl3b3JkQnl0ZXMubGVuZ3RoICsgMSArIHRleHRCeXRlcy5sZW5ndGgpXG4gIGNodW5rRGF0YS5zZXQoa2V5d29yZEJ5dGVzLCAwKVxuICBjaHVua0RhdGEuc2V0KFswXSwga2V5d29yZEJ5dGVzLmxlbmd0aClcbiAgY2h1bmtEYXRhLnNldCh0ZXh0Qnl0ZXMsIGtleXdvcmRCeXRlcy5sZW5ndGggKyAxKVxuICBcbiAgY29uc3QgY2h1bmtUeXBlID0gbmV3IFRleHRFbmNvZGVyKCkuZW5jb2RlKCd0RVh0JylcbiAgY29uc3QgY2h1bmsgPSBuZXcgVWludDhBcnJheSg0ICsgNCArIGNodW5rRGF0YS5sZW5ndGggKyA0KVxuICBcbiAgY29uc3QgZGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoY2h1bmsuYnVmZmVyKVxuICBkYXRhVmlldy5zZXRVaW50MzIoMCwgY2h1bmtEYXRhLmxlbmd0aCwgZmFsc2UpXG4gIGNodW5rLnNldChjaHVua1R5cGUsIDQpXG4gIGNodW5rLnNldChjaHVua0RhdGEsIDgpXG4gIFxuICBjb25zdCBjcmNEYXRhID0gbmV3IFVpbnQ4QXJyYXkoNCArIGNodW5rRGF0YS5sZW5ndGgpXG4gIGNyY0RhdGEuc2V0KGNodW5rVHlwZSwgMClcbiAgY3JjRGF0YS5zZXQoY2h1bmtEYXRhLCA0KVxuICBjb25zdCBjcmMgPSBjYWxjdWxhdGVDcmMzMihjcmNEYXRhKVxuICBkYXRhVmlldy5zZXRVaW50MzIoOCArIGNodW5rRGF0YS5sZW5ndGgsIGNyYywgZmFsc2UpXG4gIFxuICByZXR1cm4gY2h1bmtcbn1cblxuLyoqXG4gKiBDcmVhdGUgUE5HIHBIWXMgY2h1bmsgZm9yIERQSVxuICovXG5mdW5jdGlvbiBjcmVhdGVQbmdQaHlzQ2h1bmsoZHBpOiBudW1iZXIpOiBVaW50OEFycmF5IHtcbiAgY29uc3QgcGl4ZWxzUGVyTWV0ZXIgPSBNYXRoLnJvdW5kKGRwaSAvIDAuMDI1NClcbiAgXG4gIGNvbnN0IGNodW5rRGF0YSA9IG5ldyBVaW50OEFycmF5KDkpXG4gIGNvbnN0IGNodW5rRGF0YVZpZXcgPSBuZXcgRGF0YVZpZXcoY2h1bmtEYXRhLmJ1ZmZlcilcbiAgY2h1bmtEYXRhVmlldy5zZXRVaW50MzIoMCwgcGl4ZWxzUGVyTWV0ZXIsIGZhbHNlKVxuICBjaHVua0RhdGFWaWV3LnNldFVpbnQzMig0LCBwaXhlbHNQZXJNZXRlciwgZmFsc2UpXG4gIGNodW5rRGF0YVs4XSA9IDFcbiAgXG4gIGNvbnN0IGNodW5rVHlwZSA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZSgncEhZcycpXG4gIGNvbnN0IGNodW5rID0gbmV3IFVpbnQ4QXJyYXkoNCArIDQgKyA5ICsgNClcbiAgY29uc3QgY2h1bmtWaWV3ID0gbmV3IERhdGFWaWV3KGNodW5rLmJ1ZmZlcilcbiAgXG4gIGNodW5rVmlldy5zZXRVaW50MzIoMCwgOSwgZmFsc2UpXG4gIGNodW5rLnNldChjaHVua1R5cGUsIDQpXG4gIGNodW5rLnNldChjaHVua0RhdGEsIDgpXG4gIFxuICBjb25zdCBjcmNEYXRhID0gbmV3IFVpbnQ4QXJyYXkoNCArIDkpXG4gIGNyY0RhdGEuc2V0KGNodW5rVHlwZSwgMClcbiAgY3JjRGF0YS5zZXQoY2h1bmtEYXRhLCA0KVxuICBjb25zdCBjcmMgPSBjYWxjdWxhdGVDcmMzMihjcmNEYXRhKVxuICBjaHVua1ZpZXcuc2V0VWludDMyKDE3LCBjcmMsIGZhbHNlKVxuICBcbiAgcmV0dXJuIGNodW5rXG59XG5cbi8qKlxuICogRW1iZWQgbWV0YWRhdGEgYW5kIERQSSBpbnRvIFBORyBidWZmZXJcbiAqL1xuZnVuY3Rpb24gZW1iZWRQbmdNZXRhZGF0YUFuZERwaShwbmdCdWZmZXI6IEJ1ZmZlciwgbWV0YWRhdGE/OiBQbmdNZXRhZGF0YSwgZHBpPzogbnVtYmVyKTogQnVmZmVyIHtcbiAgY29uc3QgZGF0YSA9IG5ldyBVaW50OEFycmF5KHBuZ0J1ZmZlcilcbiAgXG4gIC8vIFZlcmlmeSBQTkcgc2lnbmF0dXJlXG4gIGNvbnN0IHBuZ1NpZ25hdHVyZSA9IFsxMzcsIDgwLCA3OCwgNzEsIDEzLCAxMCwgMjYsIDEwXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgIGlmIChkYXRhW2ldICE9PSBwbmdTaWduYXR1cmVbaV0pIHtcbiAgICAgIHJldHVybiBwbmdCdWZmZXJcbiAgICB9XG4gIH1cbiAgXG4gIGNvbnN0IGNodW5rczogVWludDhBcnJheVtdID0gW11cbiAgXG4gIC8vIEFkZCBEUEkgY2h1bmsgYWZ0ZXIgSUhEUiAocG9zaXRpb24gMzMpXG4gIGlmIChkcGkgJiYgZHBpID4gMCAmJiBkcGkgIT09IDcyKSB7XG4gICAgY2h1bmtzLnB1c2goY3JlYXRlUG5nUGh5c0NodW5rKGRwaSkpXG4gIH1cbiAgXG4gIC8vIEFkZCBtZXRhZGF0YSBjaHVua3NcbiAgaWYgKG1ldGFkYXRhKSB7XG4gICAgY29uc3Qga2V5d29yZE1hcDogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAgIHRpdGxlOiAnVGl0bGUnLFxuICAgICAgYXV0aG9yOiAnQXV0aG9yJyxcbiAgICAgIGRlc2NyaXB0aW9uOiAnRGVzY3JpcHRpb24nLFxuICAgICAgY29weXJpZ2h0OiAnQ29weXJpZ2h0JyxcbiAgICAgIGNyZWF0aW9uVGltZTogJ0NyZWF0aW9uIFRpbWUnLFxuICAgICAgc29mdHdhcmU6ICdTb2Z0d2FyZSdcbiAgICB9XG4gICAgXG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMobWV0YWRhdGEpKSB7XG4gICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb25zdCBrZXl3b3JkID0ga2V5d29yZE1hcFtrZXldIHx8IGtleVxuICAgICAgICBjaHVua3MucHVzaChjcmVhdGVQbmdUZXh0Q2h1bmsoa2V5d29yZCwgdmFsdWUpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgaWYgKGNodW5rcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gcG5nQnVmZmVyXG4gIH1cbiAgXG4gIC8vIEluc2VydCBjaHVua3MgYWZ0ZXIgSUhEUiAoYXQgcG9zaXRpb24gMzMpXG4gIGNvbnN0IGloZHJFbmQgPSAzM1xuICBjb25zdCB0b3RhbENodW5rc1NpemUgPSBjaHVua3MucmVkdWNlKChzdW0sIGNodW5rKSA9PiBzdW0gKyBjaHVuay5sZW5ndGgsIDApXG4gIFxuICBjb25zdCBuZXdQbmcgPSBuZXcgVWludDhBcnJheShkYXRhLmxlbmd0aCArIHRvdGFsQ2h1bmtzU2l6ZSlcbiAgbmV3UG5nLnNldChkYXRhLnNsaWNlKDAsIGloZHJFbmQpLCAwKVxuICBcbiAgbGV0IG9mZnNldCA9IGloZHJFbmRcbiAgZm9yIChjb25zdCBjaHVuayBvZiBjaHVua3MpIHtcbiAgICBuZXdQbmcuc2V0KGNodW5rLCBvZmZzZXQpXG4gICAgb2Zmc2V0ICs9IGNodW5rLmxlbmd0aFxuICB9XG4gIFxuICBuZXdQbmcuc2V0KGRhdGEuc2xpY2UoaWhkckVuZCksIG9mZnNldClcbiAgXG4gIHJldHVybiBCdWZmZXIuZnJvbShuZXdQbmcpXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBHSUYgRU5DT0RJTkdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogRW5jb2RlIGNhbnZhcyBhcyBHSUYgKHNpbmdsZSBmcmFtZSlcbiAqL1xuZnVuY3Rpb24gZW5jb2RlR2lmKGNhbnZhczogQ2FudmFzLCBjb2xvcnM6IG51bWJlciA9IDI1Nik6IEJ1ZmZlciB7XG4gIGNvbnN0IHdpZHRoID0gY2FudmFzLndpZHRoXG4gIGNvbnN0IGhlaWdodCA9IGNhbnZhcy5oZWlnaHRcbiAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgY29uc3QgaW1hZ2VEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuICBjb25zdCB7IGRhdGEgfSA9IGltYWdlRGF0YVxuICBcbiAgY29uc3QgZ2lmID0gR0lGRW5jb2RlcigpXG4gIGNvbnN0IHBhbGV0dGUgPSBxdWFudGl6ZShkYXRhLCBNYXRoLm1pbigyNTYsIE1hdGgubWF4KDIsIGNvbG9ycykpKVxuICBjb25zdCBpbmRleCA9IGFwcGx5UGFsZXR0ZShkYXRhLCBwYWxldHRlKVxuICBcbiAgZ2lmLndyaXRlRnJhbWUoaW5kZXgsIHdpZHRoLCBoZWlnaHQsIHtcbiAgICBwYWxldHRlLFxuICAgIGRlbGF5OiAxMDAsXG4gICAgcmVwZWF0OiAwLFxuICB9KVxuICBcbiAgZ2lmLmZpbmlzaCgpXG4gIHJldHVybiBCdWZmZXIuZnJvbShnaWYuYnl0ZXMoKSlcbn1cblxuLyoqXG4gKiBFbmNvZGUgbXVsdGlwbGUgY2FudmFzZXMgYXMgYW5pbWF0ZWQgR0lGXG4gKiBAcGFyYW0gZnJhbWVzIEFycmF5IG9mIGNhbnZhcyBmcmFtZXNcbiAqIEBwYXJhbSBmcmFtZURlbGF5TXMgRnJhbWUgZGVsYXkgaW4gbWlsbGlzZWNvbmRzXG4gKiBAcGFyYW0gY29sb3JzIFBhbGV0dGUgc2l6ZSAyLTI1NlxuICovXG5mdW5jdGlvbiBlbmNvZGVBbmltYXRlZEdpZihmcmFtZXM6IENhbnZhc1tdLCBmcmFtZURlbGF5TXM6IG51bWJlciA9IDEwMCwgY29sb3JzOiBudW1iZXIgPSAyNTYpOiBCdWZmZXIge1xuICBpZiAoZnJhbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gZnJhbWVzIHRvIGVuY29kZScpXG4gIH1cbiAgXG4gIGNvbnN0IHdpZHRoID0gZnJhbWVzWzBdLndpZHRoXG4gIGNvbnN0IGhlaWdodCA9IGZyYW1lc1swXS5oZWlnaHRcbiAgY29uc3QgZ2lmID0gR0lGRW5jb2RlcigpXG4gIGNvbnN0IHBhbGV0dGVTaXplID0gTWF0aC5taW4oMjU2LCBNYXRoLm1heCgyLCBjb2xvcnMpKVxuICBcbiAgLy8gQ29udmVydCBtaWxsaXNlY29uZHMgdG8gY2VudGlzZWNvbmRzIChnaWZlbmMgdXNlcyAxLzEwMHRoIHNlY29uZHMpXG4gIGNvbnN0IGRlbGF5Q2VudGlzZWNvbmRzID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChmcmFtZURlbGF5TXMgLyAxMCkpXG4gIFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZyYW1lID0gZnJhbWVzW2ldXG4gICAgY29uc3QgY3R4ID0gZnJhbWUuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodClcbiAgICBjb25zdCB7IGRhdGEgfSA9IGltYWdlRGF0YVxuICAgIFxuICAgIGNvbnN0IHBhbGV0dGUgPSBxdWFudGl6ZShkYXRhLCBwYWxldHRlU2l6ZSlcbiAgICBjb25zdCBpbmRleCA9IGFwcGx5UGFsZXR0ZShkYXRhLCBwYWxldHRlKVxuICAgIFxuICAgIC8vIE9ubHkgc2V0IHJlcGVhdCBvbiBmaXJzdCBmcmFtZVxuICAgIGNvbnN0IGZyYW1lT3B0aW9uczogUmVjb3JkPHN0cmluZywgdW5rbm93bj4gPSB7XG4gICAgICBwYWxldHRlLFxuICAgICAgZGVsYXk6IGRlbGF5Q2VudGlzZWNvbmRzLFxuICAgIH1cbiAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgZnJhbWVPcHRpb25zLnJlcGVhdCA9IDAgLy8gMCA9IGxvb3AgZm9yZXZlclxuICAgIH1cbiAgICBcbiAgICBnaWYud3JpdGVGcmFtZShpbmRleCwgd2lkdGgsIGhlaWdodCwgZnJhbWVPcHRpb25zKVxuICB9XG4gIFxuICBnaWYuZmluaXNoKClcbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKGdpZi5ieXRlcygpKVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQU5JTUFUSU9OIFBBVFRFUk5TIChzZXJ2ZXItc2lkZSlcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbnR5cGUgQW5pbWF0aW9uUGF0dGVybiA9ICdub25lJyB8ICdwdWxzZScgfCAnd2F2ZScgfCAnc2NhbmxpbmUnIHwgJ3NoaW1tZXInIHwgJ2RyaWZ0JyB8ICdjb2xvcl9jeWNsZSdcbnR5cGUgQW5pbWF0aW9uRWFzaW5nID0gJ2xpbmVhcicgfCAnZWFzZV9pbicgfCAnZWFzZV9vdXQnIHwgJ2Vhc2VfaW5fb3V0JyB8ICdib3VuY2UnXG5cbi8qKlxuICogQXBwbHkgZWFzaW5nIGZ1bmN0aW9uIHRvIHByb2dyZXNzIHZhbHVlICgwLTEpXG4gKi9cbmZ1bmN0aW9uIGFwcGx5RWFzaW5nKHByb2dyZXNzOiBudW1iZXIsIGVhc2luZzogQW5pbWF0aW9uRWFzaW5nKTogbnVtYmVyIHtcbiAgc3dpdGNoIChlYXNpbmcpIHtcbiAgICBjYXNlICdlYXNlX2luJzpcbiAgICAgIHJldHVybiBwcm9ncmVzcyAqIHByb2dyZXNzXG4gICAgY2FzZSAnZWFzZV9vdXQnOlxuICAgICAgcmV0dXJuIDEgLSAoMSAtIHByb2dyZXNzKSAqICgxIC0gcHJvZ3Jlc3MpXG4gICAgY2FzZSAnZWFzZV9pbl9vdXQnOlxuICAgICAgcmV0dXJuIHByb2dyZXNzIDwgMC41XG4gICAgICAgID8gMiAqIHByb2dyZXNzICogcHJvZ3Jlc3NcbiAgICAgICAgOiAxIC0gTWF0aC5wb3coLTIgKiBwcm9ncmVzcyArIDIsIDIpIC8gMlxuICAgIGNhc2UgJ2JvdW5jZSc6XG4gICAgICBpZiAocHJvZ3Jlc3MgPCAwLjUpIHtcbiAgICAgICAgcmV0dXJuIDggKiBwcm9ncmVzcyAqIHByb2dyZXNzICogcHJvZ3Jlc3MgKiBwcm9ncmVzc1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDEgLSBNYXRoLnBvdygtMiAqIHByb2dyZXNzICsgMiwgNCkgLyAyXG4gICAgICB9XG4gICAgY2FzZSAnbGluZWFyJzpcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHByb2dyZXNzXG4gIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhbmltYXRpb24gZnJhbWVzIHVzaW5nIGEgcGF0dGVybiBlZmZlY3RcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVQYXR0ZXJuRnJhbWVzU2VydmVyKFxuICBzb3VyY2VDYW52YXM6IENhbnZhcyxcbiAgcGF0dGVybjogQW5pbWF0aW9uUGF0dGVybixcbiAgZnJhbWVDb3VudDogbnVtYmVyID0gMjQsXG4gIHNlZWQ6IG51bWJlciA9IDAsXG4gIGVhc2luZzogQW5pbWF0aW9uRWFzaW5nID0gJ2xpbmVhcidcbik6IENhbnZhc1tdIHtcbiAgaWYgKHBhdHRlcm4gPT09ICdub25lJykge1xuICAgIHJldHVybiBbc291cmNlQ2FudmFzXVxuICB9XG5cbiAgY29uc3QgZnJhbWVzOiBDYW52YXNbXSA9IFtdXG4gIGNvbnN0IHdpZHRoID0gc291cmNlQ2FudmFzLndpZHRoXG4gIGNvbnN0IGhlaWdodCA9IHNvdXJjZUNhbnZhcy5oZWlnaHRcblxuICBjb25zdCBzb3VyY2VDdHggPSBzb3VyY2VDYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICBjb25zdCBzb3VyY2VEYXRhID0gc291cmNlQ3R4LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZnJhbWVDb3VudDsgaSsrKSB7XG4gICAgY29uc3QgbGluZWFyUHJvZ3Jlc3MgPSBpIC8gZnJhbWVDb3VudFxuICAgIGNvbnN0IHByb2dyZXNzID0gYXBwbHlFYXNpbmcobGluZWFyUHJvZ3Jlc3MsIGVhc2luZylcbiAgICBjb25zdCBmcmFtZSA9IGNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KVxuICAgIGNvbnN0IGN0eCA9IGZyYW1lLmdldENvbnRleHQoJzJkJylcblxuICAgIGNvbnN0IGZyYW1lRGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodClcbiAgICBmcmFtZURhdGEuZGF0YS5zZXQoc291cmNlRGF0YS5kYXRhKVxuXG4gICAgc3dpdGNoIChwYXR0ZXJuKSB7XG4gICAgICBjYXNlICdwdWxzZSc6XG4gICAgICAgIGFwcGx5UHVsc2VQYXR0ZXJuU2VydmVyKGZyYW1lRGF0YSwgcHJvZ3Jlc3MsIHNlZWQpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlICd3YXZlJzpcbiAgICAgICAgYXBwbHlXYXZlUGF0dGVyblNlcnZlcihmcmFtZURhdGEsIHByb2dyZXNzLCB3aWR0aCwgaGVpZ2h0LCBzZWVkKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc2NhbmxpbmUnOlxuICAgICAgICBhcHBseVNjYW5saW5lUGF0dGVyblNlcnZlcihmcmFtZURhdGEsIHByb2dyZXNzLCB3aWR0aCwgaGVpZ2h0LCBzZWVkKVxuICAgICAgICBicmVha1xuICAgICAgY2FzZSAnc2hpbW1lcic6XG4gICAgICAgIGFwcGx5U2hpbW1lclBhdHRlcm5TZXJ2ZXIoZnJhbWVEYXRhLCBwcm9ncmVzcywgd2lkdGgsIGhlaWdodCwgc2VlZClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2RyaWZ0JzpcbiAgICAgICAgYXBwbHlEcmlmdFBhdHRlcm5TZXJ2ZXIoZnJhbWVEYXRhLCBwcm9ncmVzcywgd2lkdGgsIGhlaWdodCwgc2VlZClcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgJ2NvbG9yX2N5Y2xlJzpcbiAgICAgICAgYXBwbHlDb2xvckN5Y2xlUGF0dGVyblNlcnZlcihmcmFtZURhdGEsIHByb2dyZXNzLCBzZWVkKVxuICAgICAgICBicmVha1xuICAgIH1cblxuICAgIGN0eC5wdXRJbWFnZURhdGEoZnJhbWVEYXRhLCAwLCAwKVxuICAgIGZyYW1lcy5wdXNoKGZyYW1lKVxuICB9XG5cbiAgcmV0dXJuIGZyYW1lc1xufVxuXG5mdW5jdGlvbiBhcHBseVB1bHNlUGF0dGVyblNlcnZlcihpbWFnZURhdGE6IEltYWdlRGF0YSwgcHJvZ3Jlc3M6IG51bWJlciwgc2VlZDogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IGRhdGEgPSBpbWFnZURhdGEuZGF0YVxuICBjb25zdCBpbnRlbnNpdHkgPSAwLjE1ICsgMC4xICogTWF0aC5zaW4oc2VlZCAqIDAuMSlcbiAgY29uc3QgZmFjdG9yID0gMSArIE1hdGguc2luKHByb2dyZXNzICogTWF0aC5QSSAqIDIpICogaW50ZW5zaXR5XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgZGF0YVtpXSA9IE1hdGgubWluKDI1NSwgZGF0YVtpXSAqIGZhY3RvcilcbiAgICBkYXRhW2kgKyAxXSA9IE1hdGgubWluKDI1NSwgZGF0YVtpICsgMV0gKiBmYWN0b3IpXG4gICAgZGF0YVtpICsgMl0gPSBNYXRoLm1pbigyNTUsIGRhdGFbaSArIDJdICogZmFjdG9yKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5V2F2ZVBhdHRlcm5TZXJ2ZXIoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHByb2dyZXNzOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBzZWVkOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhXG4gIGNvbnN0IHdhdmVGcmVxdWVuY3kgPSAzICsgKHNlZWQgJSA1KVxuICBjb25zdCB3YXZlQW1wbGl0dWRlID0gMC4yXG5cbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgIGNvbnN0IHdhdmVPZmZzZXQgPSBNYXRoLnNpbigoeSAvIGhlaWdodCkgKiB3YXZlRnJlcXVlbmN5ICogTWF0aC5QSSAqIDIgKyBwcm9ncmVzcyAqIE1hdGguUEkgKiAyKSAqIHdhdmVBbXBsaXR1ZGVcbiAgICBjb25zdCBmYWN0b3IgPSAxICsgd2F2ZU9mZnNldFxuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICBjb25zdCBpID0gKHkgKiB3aWR0aCArIHgpICogNFxuICAgICAgZGF0YVtpXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgZGF0YVtpXSAqIGZhY3RvcikpXG4gICAgICBkYXRhW2kgKyAxXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgZGF0YVtpICsgMV0gKiBmYWN0b3IpKVxuICAgICAgZGF0YVtpICsgMl0gPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIGRhdGFbaSArIDJdICogZmFjdG9yKSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlTY2FubGluZVBhdHRlcm5TZXJ2ZXIoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHByb2dyZXNzOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBzZWVkOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhXG4gIGNvbnN0IGxpbmVXaWR0aCA9IE1hdGgubWF4KDIsIGhlaWdodCAqIDAuMDUpXG4gIGNvbnN0IGxpbmVZID0gcHJvZ3Jlc3MgKiAoaGVpZ2h0ICsgbGluZVdpZHRoICogMikgLSBsaW5lV2lkdGhcbiAgY29uc3QgaG9yaXpvbnRhbCA9IHNlZWQgJSAyID09PSAwXG5cbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgY29uc3QgaSA9ICh5ICogd2lkdGggKyB4KSAqIDRcbiAgICAgIGNvbnN0IHBvcyA9IGhvcml6b250YWwgPyB5IDogeFxuICAgICAgY29uc3QgbGluZVBvcyA9IGhvcml6b250YWwgPyBsaW5lWSA6IHByb2dyZXNzICogKHdpZHRoICsgbGluZVdpZHRoICogMikgLSBsaW5lV2lkdGhcbiAgICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMocG9zIC0gbGluZVBvcylcbiAgICAgIFxuICAgICAgaWYgKGRpc3RhbmNlIDwgbGluZVdpZHRoKSB7XG4gICAgICAgIGNvbnN0IGJyaWdodG5lc3MgPSAxICsgKDEgLSBkaXN0YW5jZSAvIGxpbmVXaWR0aCkgKiAwLjVcbiAgICAgICAgZGF0YVtpXSA9IE1hdGgubWluKDI1NSwgZGF0YVtpXSAqIGJyaWdodG5lc3MpXG4gICAgICAgIGRhdGFbaSArIDFdID0gTWF0aC5taW4oMjU1LCBkYXRhW2kgKyAxXSAqIGJyaWdodG5lc3MpXG4gICAgICAgIGRhdGFbaSArIDJdID0gTWF0aC5taW4oMjU1LCBkYXRhW2kgKyAyXSAqIGJyaWdodG5lc3MpXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHNlZWRlZFJhbmRvbVNlcnZlcihzZWVkOiBudW1iZXIpOiAoKSA9PiBudW1iZXIge1xuICBsZXQgcyA9IHNlZWRcbiAgcmV0dXJuICgpID0+IHtcbiAgICBzID0gTWF0aC5zaW4ocyAqIDk5OTkpICogMTAwMDBcbiAgICByZXR1cm4gcyAtIE1hdGguZmxvb3IocylcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVNoaW1tZXJQYXR0ZXJuU2VydmVyKGltYWdlRGF0YTogSW1hZ2VEYXRhLCBwcm9ncmVzczogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgc2VlZDogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IGRhdGEgPSBpbWFnZURhdGEuZGF0YVxuICBjb25zdCByYW5kb20gPSBzZWVkZWRSYW5kb21TZXJ2ZXIoc2VlZCArIE1hdGguZmxvb3IocHJvZ3Jlc3MgKiAxMDAwKSlcbiAgY29uc3Qgc3BvdENvdW50ID0gTWF0aC5mbG9vcih3aWR0aCAqIGhlaWdodCAqIDAuMDAxKVxuICBcbiAgZm9yIChsZXQgcyA9IDA7IHMgPCBzcG90Q291bnQ7IHMrKykge1xuICAgIGNvbnN0IHggPSBNYXRoLmZsb29yKHJhbmRvbSgpICogd2lkdGgpXG4gICAgY29uc3QgeSA9IE1hdGguZmxvb3IocmFuZG9tKCkgKiBoZWlnaHQpXG4gICAgY29uc3QgaSA9ICh5ICogd2lkdGggKyB4KSAqIDRcbiAgICBcbiAgICBjb25zdCBicmlnaHRuZXNzID0gMS4zICsgcmFuZG9tKCkgKiAwLjRcbiAgICBkYXRhW2ldID0gTWF0aC5taW4oMjU1LCBkYXRhW2ldICogYnJpZ2h0bmVzcylcbiAgICBkYXRhW2kgKyAxXSA9IE1hdGgubWluKDI1NSwgZGF0YVtpICsgMV0gKiBicmlnaHRuZXNzKVxuICAgIGRhdGFbaSArIDJdID0gTWF0aC5taW4oMjU1LCBkYXRhW2kgKyAyXSAqIGJyaWdodG5lc3MpXG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlEcmlmdFBhdHRlcm5TZXJ2ZXIoaW1hZ2VEYXRhOiBJbWFnZURhdGEsIHByb2dyZXNzOiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBzZWVkOiBudW1iZXIpOiB2b2lkIHtcbiAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhXG4gIGNvbnN0IHNjYWxlID0gMC4wMiArIChzZWVkICUgMTApICogMC4wMDVcbiAgY29uc3QgdGltZU9mZnNldCA9IHByb2dyZXNzICogTWF0aC5QSSAqIDJcbiAgXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgIGNvbnN0IGkgPSAoeSAqIHdpZHRoICsgeCkgKiA0XG4gICAgICBjb25zdCBkcmlmdCA9IE1hdGguc2luKHggKiBzY2FsZSArIHRpbWVPZmZzZXQpICogTWF0aC5jb3MoeSAqIHNjYWxlICsgdGltZU9mZnNldCkgKiAwLjE1XG4gICAgICBjb25zdCBmYWN0b3IgPSAxICsgZHJpZnRcbiAgICAgIFxuICAgICAgZGF0YVtpXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgZGF0YVtpXSAqIGZhY3RvcikpXG4gICAgICBkYXRhW2kgKyAxXSA9IE1hdGgubWluKDI1NSwgTWF0aC5tYXgoMCwgZGF0YVtpICsgMV0gKiBmYWN0b3IpKVxuICAgICAgZGF0YVtpICsgMl0gPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIGRhdGFbaSArIDJdICogZmFjdG9yKSlcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlDb2xvckN5Y2xlUGF0dGVyblNlcnZlcihpbWFnZURhdGE6IEltYWdlRGF0YSwgcHJvZ3Jlc3M6IG51bWJlciwgc2VlZDogbnVtYmVyKTogdm9pZCB7XG4gIGNvbnN0IGRhdGEgPSBpbWFnZURhdGEuZGF0YVxuICBjb25zdCBodWVTaGlmdCA9IChwcm9ncmVzcyAqIDM2MCArIHNlZWQpICUgMzYwXG4gIFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICBjb25zdCByID0gZGF0YVtpXVxuICAgIGNvbnN0IGcgPSBkYXRhW2kgKyAxXVxuICAgIGNvbnN0IGIgPSBkYXRhW2kgKyAyXVxuICAgIFxuICAgIGNvbnN0IFtoLCBzLCBsXSA9IHJnYlRvSHNsU2VydmVyKHIsIGcsIGIpXG4gICAgY29uc3QgbmV3SCA9IChoICsgaHVlU2hpZnQpICUgMzYwXG4gICAgY29uc3QgW25ld1IsIG5ld0csIG5ld0JdID0gaHNsVG9SZ2JTZXJ2ZXIobmV3SCwgcywgbClcbiAgICBcbiAgICBkYXRhW2ldID0gbmV3UlxuICAgIGRhdGFbaSArIDFdID0gbmV3R1xuICAgIGRhdGFbaSArIDJdID0gbmV3QlxuICB9XG59XG5cbmZ1bmN0aW9uIHJnYlRvSHNsU2VydmVyKHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl0ge1xuICByIC89IDI1NVxuICBnIC89IDI1NVxuICBiIC89IDI1NVxuICBcbiAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYilcbiAgY29uc3QgbWluID0gTWF0aC5taW4ociwgZywgYilcbiAgbGV0IGggPSAwXG4gIGxldCBzID0gMFxuICBjb25zdCBsID0gKG1heCArIG1pbikgLyAyXG4gIFxuICBpZiAobWF4ICE9PSBtaW4pIHtcbiAgICBjb25zdCBkID0gbWF4IC0gbWluXG4gICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pXG4gICAgXG4gICAgc3dpdGNoIChtYXgpIHtcbiAgICAgIGNhc2UgcjpcbiAgICAgICAgaCA9ICgoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKSkgKiA2MFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBnOlxuICAgICAgICBoID0gKChiIC0gcikgLyBkICsgMikgKiA2MFxuICAgICAgICBicmVha1xuICAgICAgY2FzZSBiOlxuICAgICAgICBoID0gKChyIC0gZykgLyBkICsgNCkgKiA2MFxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIFtoLCBzICogMTAwLCBsICogMTAwXVxufVxuXG5mdW5jdGlvbiBoc2xUb1JnYlNlcnZlcihoOiBudW1iZXIsIHM6IG51bWJlciwgbDogbnVtYmVyKTogW251bWJlciwgbnVtYmVyLCBudW1iZXJdIHtcbiAgcyAvPSAxMDBcbiAgbCAvPSAxMDBcbiAgXG4gIGNvbnN0IGMgPSAoMSAtIE1hdGguYWJzKDIgKiBsIC0gMSkpICogc1xuICBjb25zdCB4ID0gYyAqICgxIC0gTWF0aC5hYnMoKChoIC8gNjApICUgMikgLSAxKSlcbiAgY29uc3QgbSA9IGwgLSBjIC8gMlxuICBcbiAgbGV0IHIgPSAwLCBnID0gMCwgYiA9IDBcbiAgXG4gIGlmIChoIDwgNjApIHtcbiAgICByID0gYzsgZyA9IHg7IGIgPSAwXG4gIH0gZWxzZSBpZiAoaCA8IDEyMCkge1xuICAgIHIgPSB4OyBnID0gYzsgYiA9IDBcbiAgfSBlbHNlIGlmIChoIDwgMTgwKSB7XG4gICAgciA9IDA7IGcgPSBjOyBiID0geFxuICB9IGVsc2UgaWYgKGggPCAyNDApIHtcbiAgICByID0gMDsgZyA9IHg7IGIgPSBjXG4gIH0gZWxzZSBpZiAoaCA8IDMwMCkge1xuICAgIHIgPSB4OyBnID0gMDsgYiA9IGNcbiAgfSBlbHNlIHtcbiAgICByID0gYzsgZyA9IDA7IGIgPSB4XG4gIH1cbiAgXG4gIHJldHVybiBbXG4gICAgTWF0aC5yb3VuZCgociArIG0pICogMjU1KSxcbiAgICBNYXRoLnJvdW5kKChnICsgbSkgKiAyNTUpLFxuICAgIE1hdGgucm91bmQoKGIgKyBtKSAqIDI1NSlcbiAgXVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gR0lGIEZSQU1FIFBBUlNJTkcgKHNlcnZlci1zaWRlKVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuaW50ZXJmYWNlIFNlcnZlckFuaW1hdGlvbkZyYW1lIHtcbiAgY2FudmFzOiBDYW52YXNcbiAgZGVsYXk6IG51bWJlciAvLyBtaWxsaXNlY29uZHNcbiAgZGlzcG9zYWxUeXBlOiBudW1iZXJcbn1cblxuLyoqXG4gKiBEZXRlY3QgaWYgYW4gQXJyYXlCdWZmZXIgY29udGFpbnMgYSBHSUZcbiAqL1xuZnVuY3Rpb24gaXNHaWZCdWZmZXIoYnVmZmVyOiBBcnJheUJ1ZmZlcik6IGJvb2xlYW4ge1xuICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGJ1ZmZlcilcbiAgaWYgKHZpZXcuYnl0ZUxlbmd0aCA8IDYpIHJldHVybiBmYWxzZVxuICBjb25zdCBzaWcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXcuZ2V0VWludDgoMCksIHZpZXcuZ2V0VWludDgoMSksIHZpZXcuZ2V0VWludDgoMikpXG4gIHJldHVybiBzaWcgPT09ICdHSUYnXG59XG5cbi8qKlxuICogUGFyc2UgYSBHSUYgZmlsZSBhbmQgZXh0cmFjdCBmcmFtZXMgYXMgQ2FudmFzIGVsZW1lbnRzIChzZXJ2ZXItc2lkZSlcbiAqIEFkYXB0ZWQgZnJvbSBzcmMvbW9kdWxlcy9hbmltYXRpb24udHMgZm9yIE5vZGUuanNcbiAqL1xuZnVuY3Rpb24gcGFyc2VHaWZGcmFtZXNTZXJ2ZXIoYXJyYXlCdWZmZXI6IEFycmF5QnVmZmVyKTogU2VydmVyQW5pbWF0aW9uRnJhbWVbXSB7XG4gIGNvbnN0IGdpZiA9IHBhcnNlR0lGKGFycmF5QnVmZmVyKVxuICBjb25zdCBmcmFtZXMgPSBkZWNvbXByZXNzRnJhbWVzKGdpZiwgdHJ1ZSlcblxuICBpZiAoZnJhbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gZnJhbWVzIGZvdW5kIGluIEdJRicpXG4gIH1cblxuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGdpZi5sc2RcblxuICAvLyBDcmVhdGUgYSBwZXJzaXN0ZW50IGNhbnZhcyBmb3IgY29tcG9zaXRpbmcgZnJhbWVzXG4gIGNvbnN0IGNvbXBvc2l0ZUNhbnZhcyA9IGNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KVxuICBjb25zdCBjb21wb3NpdGVDdHggPSBjb21wb3NpdGVDYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gIGNvbnN0IGFuaW1hdGlvbkZyYW1lczogU2VydmVyQW5pbWF0aW9uRnJhbWVbXSA9IFtdXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBmcmFtZSA9IGZyYW1lc1tpXVxuICAgIGNvbnN0IHsgZGltcywgcGF0Y2gsIGRpc3Bvc2FsVHlwZSwgZGVsYXkgfSA9IGZyYW1lXG5cbiAgICAvLyBDcmVhdGUgSW1hZ2VEYXRhIGZyb20gcGF0Y2hcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjb21wb3NpdGVDdHguY3JlYXRlSW1hZ2VEYXRhKGRpbXMud2lkdGgsIGRpbXMuaGVpZ2h0KVxuICAgIGltYWdlRGF0YS5kYXRhLnNldChuZXcgVWludDhDbGFtcGVkQXJyYXkocGF0Y2gpKVxuXG4gICAgLy8gQ3JlYXRlIHRlbXBvcmFyeSBjYW52YXMgZm9yIHRoaXMgZnJhbWUncyBwYXRjaFxuICAgIGNvbnN0IHBhdGNoQ2FudmFzID0gY3JlYXRlQ2FudmFzKGRpbXMud2lkdGgsIGRpbXMuaGVpZ2h0KVxuICAgIGNvbnN0IHBhdGNoQ3R4ID0gcGF0Y2hDYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIHBhdGNoQ3R4LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApXG5cbiAgICAvLyBEcmF3IHBhdGNoIG9udG8gY29tcG9zaXRlIGNhbnZhc1xuICAgIGNvbXBvc2l0ZUN0eC5kcmF3SW1hZ2UocGF0Y2hDYW52YXMsIGRpbXMubGVmdCwgZGltcy50b3ApXG5cbiAgICAvLyBDcmVhdGUgb3V0cHV0IGNhbnZhcyBmb3IgdGhpcyBmcmFtZVxuICAgIGNvbnN0IG91dHB1dENhbnZhcyA9IGNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KVxuICAgIGNvbnN0IG91dHB1dEN0eCA9IG91dHB1dENhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgb3V0cHV0Q3R4LmRyYXdJbWFnZShjb21wb3NpdGVDYW52YXMsIDAsIDApXG5cbiAgICBhbmltYXRpb25GcmFtZXMucHVzaCh7XG4gICAgICBjYW52YXM6IG91dHB1dENhbnZhcyxcbiAgICAgIGRlbGF5OiBkZWxheSAqIDEwLCAvLyBHSUYgZGVsYXkgaXMgaW4gY2VudGlzZWNvbmRzLCBjb252ZXJ0IHRvIG1zXG4gICAgICBkaXNwb3NhbFR5cGUsXG4gICAgfSlcblxuICAgIC8vIEhhbmRsZSBkaXNwb3NhbFxuICAgIGlmIChkaXNwb3NhbFR5cGUgPT09IDIpIHtcbiAgICAgIC8vIFJlc3RvcmUgdG8gYmFja2dyb3VuZFxuICAgICAgY29tcG9zaXRlQ3R4LmNsZWFyUmVjdChkaW1zLmxlZnQsIGRpbXMudG9wLCBkaW1zLndpZHRoLCBkaW1zLmhlaWdodClcbiAgICB9XG4gICAgLy8gZGlzcG9zYWxUeXBlIDAsIDEsIG9yIDM6IGxlYXZlIGZyYW1lIGluIHBsYWNlXG4gIH1cblxuICByZXR1cm4gYW5pbWF0aW9uRnJhbWVzXG59XG5cbi8qKlxuICogRW5jb2RlIG11bHRpcGxlIGNhbnZhc2VzIGFzIGFuaW1hdGVkIEdJRiB3aXRoIHBlci1mcmFtZSBkZWxheXNcbiAqL1xuZnVuY3Rpb24gZW5jb2RlQW5pbWF0ZWRHaWZXaXRoRGVsYXlzKGZyYW1lczogU2VydmVyQW5pbWF0aW9uRnJhbWVbXSwgY29sb3JzOiBudW1iZXIgPSAyNTYpOiBCdWZmZXIge1xuICBpZiAoZnJhbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gZnJhbWVzIHRvIGVuY29kZScpXG4gIH1cbiAgXG4gIGNvbnN0IHdpZHRoID0gZnJhbWVzWzBdLmNhbnZhcy53aWR0aFxuICBjb25zdCBoZWlnaHQgPSBmcmFtZXNbMF0uY2FudmFzLmhlaWdodFxuICBjb25zdCBnaWYgPSBHSUZFbmNvZGVyKClcbiAgY29uc3QgcGFsZXR0ZVNpemUgPSBNYXRoLm1pbigyNTYsIE1hdGgubWF4KDIsIGNvbG9ycykpXG4gIFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZyYW1lcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGZyYW1lID0gZnJhbWVzW2ldXG4gICAgY29uc3QgY3R4ID0gZnJhbWUuY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpXG4gICAgY29uc3QgeyBkYXRhIH0gPSBpbWFnZURhdGFcbiAgICBcbiAgICBjb25zdCBwYWxldHRlID0gcXVhbnRpemUoZGF0YSwgcGFsZXR0ZVNpemUpXG4gICAgY29uc3QgaW5kZXggPSBhcHBseVBhbGV0dGUoZGF0YSwgcGFsZXR0ZSlcbiAgICBcbiAgICAvLyBDb252ZXJ0IG1pbGxpc2Vjb25kcyB0byBjZW50aXNlY29uZHNcbiAgICBjb25zdCBkZWxheUNlbnRpc2Vjb25kcyA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQoZnJhbWUuZGVsYXkgLyAxMCkpXG4gICAgXG4gICAgY29uc3QgZnJhbWVPcHRpb25zOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPiA9IHtcbiAgICAgIHBhbGV0dGUsXG4gICAgICBkZWxheTogZGVsYXlDZW50aXNlY29uZHMsXG4gICAgfVxuICAgIGlmIChpID09PSAwKSB7XG4gICAgICBmcmFtZU9wdGlvbnMucmVwZWF0ID0gMCAvLyAwID0gbG9vcCBmb3JldmVyXG4gICAgfVxuICAgIFxuICAgIGdpZi53cml0ZUZyYW1lKGluZGV4LCB3aWR0aCwgaGVpZ2h0LCBmcmFtZU9wdGlvbnMpXG4gIH1cbiAgXG4gIGdpZi5maW5pc2goKVxuICByZXR1cm4gQnVmZmVyLmZyb20oZ2lmLmJ5dGVzKCkpXG59XG5cbi8qKlxuICogUGFyc2UgZ3JhZGllbnQgc3RvcHMgZnJvbSBVUkwgcGFyYW1ldGVyXG4gKiBGb3JtYXQ6IGNvbG9yMSxwb3MxLGNvbG9yMixwb3MyLC4uLlxuICogRXhhbXBsZTogZmYwMDAwLDAsMDBmZjAwLDAuNSwwMDAwZmYsMVxuICovXG5mdW5jdGlvbiBwYXJzZUdyYWRpZW50U3RvcHMoc3RvcHNQYXJhbTogc3RyaW5nKTogQXJyYXk8eyBwb3M6IG51bWJlcjsgY29sb3I6IHN0cmluZyB9PiB7XG4gIGNvbnN0IHBhcnRzID0gc3RvcHNQYXJhbS5zcGxpdCgnLCcpXG4gIGNvbnN0IHN0b3BzOiBBcnJheTx7IHBvczogbnVtYmVyOyBjb2xvcjogc3RyaW5nIH0+ID0gW11cbiAgXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoIC0gMTsgaSArPSAyKSB7XG4gICAgY29uc3QgY29sb3IgPSBgIyR7cGFydHNbaV19YFxuICAgIGNvbnN0IHBvcyA9IHBhcnNlRmxvYXQocGFydHNbaSArIDFdKVxuICAgIGlmICghaXNOYU4ocG9zKSkge1xuICAgICAgc3RvcHMucHVzaCh7IGNvbG9yLCBwb3MgfSlcbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBzdG9wcy5sZW5ndGggPiAwID8gc3RvcHMgOiBbeyBjb2xvcjogJyMwMDAwMDAnLCBwb3M6IDAgfSwgeyBjb2xvcjogJyMwMDAwMDAnLCBwb3M6IDEgfV1cbn1cblxuaW50ZXJmYWNlIEZldGNoZWRJbWFnZSB7XG4gIGNhbnZhczogQ2FudmFzXG4gIGFycmF5QnVmZmVyOiBBcnJheUJ1ZmZlclxuICBpc0FuaW1hdGVkR2lmOiBib29sZWFuXG59XG5cbi8qKlxuICogRmV0Y2ggYW4gaW1hZ2UgZnJvbSBVUkwgYW5kIGxvYWQgaXQgaW50byBhIGNhbnZhc1xuICogQWxzbyByZXR1cm5zIHRoZSByYXcgYXJyYXkgYnVmZmVyIHRvIGRldGVjdCBhbmltYXRlZCBHSUZzXG4gKi9cbmFzeW5jIGZ1bmN0aW9uIGZldGNoSW1hZ2VXaXRoQnVmZmVyKHVybDogc3RyaW5nKTogUHJvbWlzZTxGZXRjaGVkSW1hZ2UgfCBudWxsPiB7XG4gIHRyeSB7XG4gICAgLy8gVmFsaWRhdGUgVVJMIGZvcm1hdFxuICAgIGxldCBwYXJzZWRVcmw6IFVSTFxuICAgIHRyeSB7XG4gICAgICBwYXJzZWRVcmwgPSBuZXcgVVJMKHVybClcbiAgICAgIGlmICghWydodHRwOicsICdodHRwczonXS5pbmNsdWRlcyhwYXJzZWRVcmwucHJvdG9jb2wpKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYEludmFsaWQgVVJMIHByb3RvY29sOiAke3BhcnNlZFVybC5wcm90b2NvbH1gKVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgICAgfVxuICAgIH0gY2F0Y2gge1xuICAgICAgY29uc29sZS5lcnJvcihgSW52YWxpZCBVUkwgZm9ybWF0OiAke3VybH1gKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnVXNlci1BZ2VudCc6ICdBTlFSLVFSLUdlbmVyYXRvci8xLjAnLFxuICAgICAgfSxcbiAgICB9KVxuICAgIFxuICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYEZhaWxlZCB0byBmZXRjaCBpbWFnZTogJHtyZXNwb25zZS5zdGF0dXN9ICR7cmVzcG9uc2Uuc3RhdHVzVGV4dH1gKVxuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgXG4gICAgLy8gQ2hlY2sgQ29udGVudC1UeXBlIGhlYWRlciBmb3IgaW1hZ2UgdHlwZXNcbiAgICBjb25zdCBjb250ZW50VHlwZSA9IHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSB8fCAnJ1xuICAgIGNvbnN0IHZhbGlkSW1hZ2VUeXBlcyA9IFsnaW1hZ2UvcG5nJywgJ2ltYWdlL2pwZWcnLCAnaW1hZ2UvZ2lmJywgJ2ltYWdlL3dlYnAnLCAnaW1hZ2Uvc3ZnK3htbCcsICdpbWFnZS9ibXAnXVxuICAgIGNvbnN0IGlzSW1hZ2UgPSB2YWxpZEltYWdlVHlwZXMuc29tZSh0eXBlID0+IGNvbnRlbnRUeXBlLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCh0eXBlKSlcbiAgICBpZiAoIWlzSW1hZ2UgJiYgY29udGVudFR5cGUgJiYgIWNvbnRlbnRUeXBlLnN0YXJ0c1dpdGgoJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScpKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIENvbnRlbnQtVHlwZSBmb3IgaW1hZ2U6ICR7Y29udGVudFR5cGV9YClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGFycmF5QnVmZmVyID0gYXdhaXQgcmVzcG9uc2UuYXJyYXlCdWZmZXIoKVxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyKVxuICAgIFxuICAgIC8vIENoZWNrIGlmIGl0J3MgYSBHSUYgd2l0aCBtdWx0aXBsZSBmcmFtZXNcbiAgICBsZXQgaXNBbmltYXRlZEdpZiA9IGZhbHNlXG4gICAgaWYgKGlzR2lmQnVmZmVyKGFycmF5QnVmZmVyKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZ2lmID0gcGFyc2VHSUYoYXJyYXlCdWZmZXIpXG4gICAgICAgIGNvbnN0IGZyYW1lcyA9IGRlY29tcHJlc3NGcmFtZXMoZ2lmLCB0cnVlKVxuICAgICAgICBpc0FuaW1hdGVkR2lmID0gZnJhbWVzLmxlbmd0aCA+IDFcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdGYWlsZWQgdG8gcGFyc2UgR0lGIGZvciBmcmFtZSBkZXRlY3Rpb246JywgZSlcbiAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgaW1nID0gYXdhaXQgbG9hZEltYWdlKGJ1ZmZlcilcbiAgICBcbiAgICAvLyBWYWxpZGF0ZSBpbWFnZSBkaW1lbnNpb25zXG4gICAgaWYgKCFpbWcud2lkdGggfHwgIWltZy5oZWlnaHQgfHwgaW1nLndpZHRoIDw9IDAgfHwgaW1nLmhlaWdodCA8PSAwKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBJbnZhbGlkIGltYWdlIGRpbWVuc2lvbnM6ICR7aW1nLndpZHRofXgke2ltZy5oZWlnaHR9YClcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyhpbWcud2lkdGgsIGltZy5oZWlnaHQpXG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMClcbiAgICBcbiAgICByZXR1cm4ge1xuICAgICAgY2FudmFzLFxuICAgICAgYXJyYXlCdWZmZXIsXG4gICAgICBpc0FuaW1hdGVkR2lmLFxuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdFcnJvciBmZXRjaGluZyBvdmVybGF5IGltYWdlOicsIGVycm9yKVxuICAgIHJldHVybiBudWxsXG4gIH1cbn1cblxuLyoqXG4gKiBGZXRjaCBhbiBpbWFnZSBmcm9tIFVSTCBhbmQgbG9hZCBpdCBpbnRvIGEgY2FudmFzIChsZWdhY3kgd3JhcHBlcilcbiAqL1xuYXN5bmMgZnVuY3Rpb24gZmV0Y2hJbWFnZUFzQ2FudmFzKHVybDogc3RyaW5nKTogUHJvbWlzZTxSZXR1cm5UeXBlPHR5cGVvZiBjcmVhdGVDYW52YXM+IHwgbnVsbD4ge1xuICBjb25zdCByZXN1bHQgPSBhd2FpdCBmZXRjaEltYWdlV2l0aEJ1ZmZlcih1cmwpXG4gIHJldHVybiByZXN1bHQ/LmNhbnZhcyA/PyBudWxsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXF1ZXN0OiBSZXF1ZXN0KSA9PiB7XG4gIGNvbnN0IHVybCA9IG5ldyBVUkwocmVxdWVzdC51cmwpXG4gIGNvbnN0IHBhcmFtcyA9IHVybC5zZWFyY2hQYXJhbXNcbiAgXG4gIC8vIEdldCByZXF1aXJlZCBwYXJhbWV0ZXJcbiAgY29uc3QgZGF0YSA9IHBhcmFtcy5nZXQoJ2RhdGEnKVxuICBpZiAoIWRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdNaXNzaW5nIHJlcXVpcmVkIFwiZGF0YVwiIHBhcmFtZXRlcicsIHsgc3RhdHVzOiA0MDAgfSlcbiAgfVxuICBcbiAgLy8gUGFyc2UgYWxsIHBhcmFtZXRlcnMgd2l0aCBkZWZhdWx0c1xuICBjb25zdCBzaXplUGFyYW0gPSBwYXJzZUludChwYXJhbXMuZ2V0KCdzaXplJykgfHwgJzQwMCcsIDEwKVxuICBjb25zdCB3aWR0aFBhcmFtID0gcGFyYW1zLmdldCgndycpID8gcGFyc2VJbnQocGFyYW1zLmdldCgndycpISwgMTApIDogbnVsbFxuICBjb25zdCBoZWlnaHRQYXJhbSA9IHBhcmFtcy5nZXQoJ2gnKSA/IHBhcnNlSW50KHBhcmFtcy5nZXQoJ2gnKSEsIDEwKSA6IG51bGxcbiAgXG4gIC8vIFVzZSB3L2ggaWYgcHJvdmlkZWQsIG90aGVyd2lzZSBmYWxsIGJhY2sgdG8gc2l6ZVxuICBjb25zdCBvdXRwdXRXaWR0aCA9IE1hdGgubWluKDIwMDAsIE1hdGgubWF4KDUwLCB3aWR0aFBhcmFtID8/IHNpemVQYXJhbSkpXG4gIGNvbnN0IG91dHB1dEhlaWdodCA9IE1hdGgubWluKDIwMDAsIE1hdGgubWF4KDUwLCBoZWlnaHRQYXJhbSA/PyBzaXplUGFyYW0pKVxuICAvLyBGb3IgUVIgZ2VuZXJhdGlvbiwgdXNlIHRoZSBsYXJnZXIgZGltZW5zaW9uIHRvIGVuc3VyZSBxdWFsaXR5XG4gIGNvbnN0IHNpemUgPSBNYXRoLm1heChvdXRwdXRXaWR0aCwgb3V0cHV0SGVpZ2h0KVxuICBjb25zdCBmZyA9IHBhcmFtcy5nZXQoJ2ZnJykgfHwgJzAwMDAwMCdcbiAgY29uc3QgYmcgPSBwYXJhbXMuZ2V0KCdiZycpIHx8ICdmZmZmZmYnXG4gIGNvbnN0IGVjID0gKHBhcmFtcy5nZXQoJ2VjJyk/LnRvVXBwZXJDYXNlKCkgfHwgJ0gnKSBhcyBFQ0NMZXZlbFxuICBjb25zdCBtYXJnaW4gPSBNYXRoLm1pbigyMCwgTWF0aC5tYXgoMCwgcGFyc2VJbnQocGFyYW1zLmdldCgnbWFyZ2luJykgfHwgJzQnLCAxMCkpKVxuICBjb25zdCB0cmFuc3BhcmVudCA9IHBhcmFtcy5nZXQoJ3RyYW5zcGFyZW50JykgPT09ICcxJ1xuICBjb25zdCBlbmNvZGluZ01vZGUgPSBwYXJhbXMuZ2V0KCdlbmMnKSB8fCAnYXV0bydcbiAgY29uc3QgdmVyc2lvbiA9IHBhcmFtcy5nZXQoJ3YnKSA/IHBhcnNlSW50KHBhcmFtcy5nZXQoJ3YnKSEsIDEwKSA6IDBcbiAgY29uc3QgYm9yZGVyTW9kdWxlc0V4dHJhID0gTWF0aC5taW4oMTAsIE1hdGgubWF4KDAsIHBhcnNlSW50KHBhcmFtcy5nZXQoJ2JvcmRlcicpIHx8ICcwJywgMTApKSlcbiAgY29uc3QgY3Jpc3BFZGdlcyA9IHBhcmFtcy5nZXQoJ2NyaXNwJykgIT09ICcwJ1xuICBjb25zdCBwaXhlbFNuYXAgPSBwYXJhbXMuZ2V0KCdzbmFwJykgfHwgJ2Zsb29yJ1xuICBjb25zdCBwZXJNb2R1bGVDb2xvck1vZGUgPSBwYXJhbXMuZ2V0KCdtb2RDb2xvcicpIHx8ICdzb2xpZCdcbiAgY29uc3QgY29udHJhc3RHdWFyZCA9IHBhcmFtcy5nZXQoJ2NHdWFyZCcpID09PSAnMSdcbiAgY29uc3QgbWluQ29udHJhc3RSYXRpbyA9IHBhcnNlRmxvYXQocGFyYW1zLmdldCgnbWluQ29udHJhc3QnKSB8fCAnNC41JylcbiAgXG4gIC8vIE1vZHVsZSBzdHlsaW5nXG4gIGNvbnN0IG1vZHVsZVN0eWxlID0gcGFyYW1zLmdldCgnc3R5bGUnKSB8fCAnc3F1YXJlJ1xuICBjb25zdCBmaW5kZXJTdHlsZSA9IHBhcmFtcy5nZXQoJ2ZpbmRlcicpIHx8ICdzcXVhcmUnXG4gIGNvbnN0IGV5ZU91dGVyU3R5bGUgPSBwYXJhbXMuZ2V0KCdleWVPdXRlcicpIHx8IGZpbmRlclN0eWxlXG4gIGNvbnN0IGV5ZUlubmVyU3R5bGUgPSBwYXJhbXMuZ2V0KCdleWVJbm5lcicpIHx8IGZpbmRlclN0eWxlXG4gIGNvbnN0IGV5ZVNjYWxlID0gTWF0aC5taW4oMTUwLCBNYXRoLm1heCg1MCwgcGFyc2VJbnQocGFyYW1zLmdldCgnZXllU2NhbGUnKSB8fCAnMTAwJywgMTApKSlcbiAgY29uc3QgY29ybmVyUmFkaXVzID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCgwLCBwYXJzZUludChwYXJhbXMuZ2V0KCdyYWRpdXMnKSB8fCAnMCcsIDEwKSkpXG4gIGNvbnN0IG1vZHVsZUdhcCA9IE1hdGgubWluKDUwLCBNYXRoLm1heCgwLCBwYXJzZUludChwYXJhbXMuZ2V0KCdnYXAnKSB8fCAnMCcsIDEwKSkpXG4gIGNvbnN0IGdhcE1vZGUgPSBwYXJhbXMuZ2V0KCdnYXBNb2RlJykgfHwgJ25vbmUnXG4gIGNvbnN0IGRvdFJvdGF0aW9uRGVnID0gcGFyc2VJbnQocGFyYW1zLmdldCgnZG90Um90JykgfHwgJzAnLCAxMClcbiAgXG4gIC8vIEZyYW1lXG4gIGNvbnN0IGZyYW1lU3R5bGUgPSBwYXJhbXMuZ2V0KCdmcmFtZScpIHx8ICdub25lJ1xuICBjb25zdCBmcmFtZVRleHQgPSBwYXJhbXMuZ2V0KCdmcmFtZVRleHQnKSA/IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbXMuZ2V0KCdmcmFtZVRleHQnKSEpIDogJydcbiAgXG4gIC8vIEdyYWRpZW50XG4gIGNvbnN0IGdyYWRpZW50VHlwZSA9IHBhcmFtcy5nZXQoJ2dyYWQnKSB8fCAnbm9uZSdcbiAgY29uc3QgZ3JhZGllbnRBbmdsZSA9IHBhcnNlSW50KHBhcmFtcy5nZXQoJ2dyYWRBbmdsZScpIHx8ICcwJywgMTApXG4gIGNvbnN0IGdyYWRpZW50U3RvcHNQYXJhbSA9IHBhcmFtcy5nZXQoJ2dyYWRTdG9wcycpXG4gIGNvbnN0IGdyYWRpZW50U3RvcHMgPSBncmFkaWVudFN0b3BzUGFyYW0gPyBwYXJzZUdyYWRpZW50U3RvcHMoZ3JhZGllbnRTdG9wc1BhcmFtKSA6IHVuZGVmaW5lZFxuICBcbiAgLy8gQWRkaXRpb25hbCBzdHlsaW5nXG4gIGNvbnN0IGFsaWdubWVudFN0eWxlID0gcGFyYW1zLmdldCgnYWxpZ24nKSB8fCAnbWF0Y2hfZmluZGVyJ1xuICBjb25zdCB0aW1pbmdTdHlsZSA9IHBhcmFtcy5nZXQoJ3RpbWluZycpIHx8ICdtYXRjaF9tb2R1bGUnXG4gIFxuICAvLyBQcm90ZWN0aW9uIHNldHRpbmdzXG4gIGNvbnN0IHByZXNlcnZlRmluZGVycyA9IHBhcmFtcy5nZXQoJ2tlZXBGaW5kZXJzJykgIT09ICcwJ1xuICBjb25zdCBwcmVzZXJ2ZVRpbWluZyA9IHBhcmFtcy5nZXQoJ2tlZXBUaW1pbmcnKSA9PT0gJzEnXG4gIGNvbnN0IHByZXNlcnZlQWxpZ25tZW50ID0gcGFyYW1zLmdldCgna2VlcEFsaWduJykgPT09ICcxJ1xuICBjb25zdCBwcm90ZWN0Rm9ybWF0SW5mbyA9IHBhcmFtcy5nZXQoJ3Byb3RlY3RGbXQnKSA9PT0gJzEnXG4gIGNvbnN0IHByb3RlY3RWZXJzaW9uSW5mbyA9IHBhcmFtcy5nZXQoJ3Byb3RlY3RWZXInKSA9PT0gJzEnXG4gIGNvbnN0IGVjY0F3YXJlRW5hYmxlZCA9IHBhcmFtcy5nZXQoJ2VjY0F3YXJlJykgPT09ICcxJ1xuICBjb25zdCBlY2NBd2FyZVJpc2tCdWRnZXQgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KDAsIHBhcnNlSW50KHBhcmFtcy5nZXQoJ2VjY1Jpc2snKSB8fCAnNTAnLCAxMCkpKVxuICBjb25zdCBlY2NBd2FyZVdlaWdodE1hcCA9IHBhcmFtcy5nZXQoJ2VjY01hcCcpIHx8ICdkaXN0YW5jZV90b19maW5kZXJzJ1xuICBcbiAgLy8gT3ZlcmxheVxuICBjb25zdCBvdmVybGF5VXJsID0gcGFyYW1zLmdldCgnaW1nJylcbiAgY29uc3Qgb3ZlcmxheU1vZGUgPSBwYXJhbXMuZ2V0KCdtb2RlJykgfHwgdW5kZWZpbmVkXG4gIGNvbnN0IG92ZXJsYXlJbnRlbnNpdHkgPSBNYXRoLm1pbigxMDAsIE1hdGgubWF4KDAsIHBhcnNlSW50KHBhcmFtcy5nZXQoJ2ludGVuc2l0eScpIHx8ICcxMDAnLCAxMCkpKVxuICBjb25zdCBjb2xvck1vZGUgPSBwYXJhbXMuZ2V0KCdjb2xvck1vZGUnKSB8fCAnY29sb3InXG4gIGNvbnN0IGxvZ29TaXplID0gTWF0aC5taW4oNTAsIE1hdGgubWF4KDUsIHBhcnNlSW50KHBhcmFtcy5nZXQoJ2xvZ29TaXplJykgfHwgJzI1JywgMTApKSlcbiAgXG4gIC8vIE92ZXJsYXkgcHJlcHJvY2Vzc2luZ1xuICBjb25zdCBvdmVybGF5QnJpZ2h0bmVzcyA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoLTEwMCwgcGFyc2VJbnQocGFyYW1zLmdldCgnYnJpZ2h0bmVzcycpIHx8ICcwJywgMTApKSlcbiAgY29uc3Qgb3ZlcmxheUNvbnRyYXN0ID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCgtMTAwLCBwYXJzZUludChwYXJhbXMuZ2V0KCdjb250cmFzdCcpIHx8ICcwJywgMTApKSlcbiAgY29uc3Qgb3ZlcmxheUdhbW1hID0gTWF0aC5tYXgoMC4xLCBNYXRoLm1pbigzLCBwYXJzZUZsb2F0KHBhcmFtcy5nZXQoJ2dhbW1hJykgfHwgJzEnKSkpXG4gIGNvbnN0IG92ZXJsYXlTYXR1cmF0aW9uID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCgtMTAwLCBwYXJzZUludChwYXJhbXMuZ2V0KCdzYXR1cmF0aW9uJykgfHwgJzAnLCAxMCkpKVxuICBjb25zdCBvdmVybGF5SHVlUm90YXRlID0gcGFyc2VJbnQocGFyYW1zLmdldCgnaHVlJykgfHwgJzAnLCAxMClcbiAgY29uc3Qgb3ZlcmxheUludmVydCA9IHBhcmFtcy5nZXQoJ2ludmVydCcpID09PSAnMSdcbiAgY29uc3Qgb3ZlcmxheUJsdXIgPSBNYXRoLm1heCgwLCBwYXJzZUludChwYXJhbXMuZ2V0KCdibHVyJykgfHwgJzAnLCAxMCkpXG4gIGNvbnN0IG92ZXJsYXlTaGFycGVuID0gTWF0aC5tYXgoMCwgcGFyc2VJbnQocGFyYW1zLmdldCgnc2hhcnBlbicpIHx8ICcwJywgMTApKVxuICBjb25zdCBvdmVybGF5UG9zdGVyaXplID0gTWF0aC5tYXgoMCwgcGFyc2VJbnQocGFyYW1zLmdldCgncG9zdGVyaXplJykgfHwgJzAnLCAxMCkpXG4gIGNvbnN0IG92ZXJsYXlUaHJlc2hvbGQgPSBNYXRoLm1pbigyNTUsIE1hdGgubWF4KDAsIHBhcnNlSW50KHBhcmFtcy5nZXQoJ3RocmVzaG9sZCcpIHx8ICcxMjgnLCAxMCkpKVxuICBjb25zdCBvdmVybGF5RWRnZURldGVjdCA9IHBhcmFtcy5nZXQoJ2VkZ2UnKSB8fCAnb2ZmJ1xuICBjb25zdCBvdmVybGF5Rml0ID0gcGFyYW1zLmdldCgnZml0JykgfHwgJ2NvdmVyJ1xuICBjb25zdCBvdmVybGF5Um90YXRlID0gcGFyc2VJbnQocGFyYW1zLmdldCgncm90JykgfHwgJzAnLCAxMClcbiAgY29uc3Qgb3ZlcmxheUZsaXBYID0gcGFyYW1zLmdldCgnZmxpcFgnKSA9PT0gJzEnXG4gIGNvbnN0IG92ZXJsYXlGbGlwWSA9IHBhcmFtcy5nZXQoJ2ZsaXBZJykgPT09ICcxJ1xuICBcbiAgLy8gRGl0aGVyaW5nIG9wdGlvbnNcbiAgY29uc3QgZGl0aGVyS2luZCA9IHBhcmFtcy5nZXQoJ2RpdGhlcktpbmQnKSB8fCAnZXJyb3JfZGlmZnVzaW9uJ1xuICBjb25zdCBkaWZmdXNpb25LZXJuZWwgPSBwYXJhbXMuZ2V0KCdkaWZmdXNpb25LZXJuZWwnKSB8fCAnZmxveWRfc3RlaW5iZXJnJ1xuICBjb25zdCBkaXRoZXJTdHJlbmd0aCA9IE1hdGgubWluKDEwMCwgTWF0aC5tYXgoMCwgcGFyc2VJbnQocGFyYW1zLmdldCgnZGl0aGVyU3RyZW5ndGgnKSB8fCAnNTAnLCAxMCkpKVxuICBjb25zdCBkaXRoZXJTZXJwZW50aW5lID0gcGFyYW1zLmdldCgnc2VycGVudGluZScpID09PSAnMSdcbiAgY29uc3Qgb3JkZXJlZE1hdHJpeCA9IHBhcmFtcy5nZXQoJ21hdHJpeCcpIHx8ICdiYXllcjQnXG4gIGNvbnN0IGJsdWVOb2lzZVRpbGVTaXplID0gcGFyc2VJbnQocGFyYW1zLmdldCgnYm5UaWxlJykgfHwgJzY0JywgMTApXG4gIGNvbnN0IGJsdWVOb2lzZVNlZWQgPSBwYXJzZUludChwYXJhbXMuZ2V0KCdiblNlZWQnKSB8fCAnMCcsIDEwKVxuICBjb25zdCBjb2xvckRpdGhlciA9IHBhcmFtcy5nZXQoJ2NvbG9yRGl0aGVyJykgfHwgJ25vbmUnXG4gIFxuICAvLyBTdWJwaXhlbCBvcHRpb25zXG4gIGNvbnN0IHN1YnBpeGVsR3JpZFNpemUgPSBwYXJhbXMuZ2V0KCdzcEdyaWQnKSB8fCAnM3gzJ1xuICBjb25zdCBzdWJwaXhlbENlbnRlclJ1bGUgPSBwYXJhbXMuZ2V0KCdzcENlbnRlcicpIHx8ICdzdHJpY3QnXG4gIGNvbnN0IHN1YnBpeGVsTmV1dHJhbENvbG9yID0gcGFyYW1zLmdldCgnc3BOZXV0cmFsJykgPyBgIyR7cGFyYW1zLmdldCgnc3BOZXV0cmFsJyl9YCA6ICcjODA4MDgwJ1xuICBjb25zdCBzdWJwaXhlbEZpbmRlck92ZXJyaWRlID0gcGFyYW1zLmdldCgnc3BGaW5kZXInKSB8fCAnc29saWQnXG4gIFxuICAvLyBIYWxmdG9uZSBvcHRpb25zXG4gIGNvbnN0IGhhbGZ0b25lQ2VsbCA9IHBhcmFtcy5nZXQoJ2h0Q2VsbCcpIHx8ICdwZXJfbW9kdWxlJ1xuICBjb25zdCBoYWxmdG9uZURvdFNoYXBlID0gcGFyYW1zLmdldCgnaHREb3QnKSB8fCAnY2lyY2xlJ1xuICBjb25zdCBicmlnaHRuZXNzQ3VydmUgPSBwYXJhbXMuZ2V0KCdodEN1cnZlJykgfHwgJ2xpbmVhcidcbiAgY29uc3QgZHVvdG9uZUNvbG9yMSA9IHBhcmFtcy5nZXQoJ2R1bzEnKSA/IGAjJHtwYXJhbXMuZ2V0KCdkdW8xJyl9YCA6ICcjMDAwMDAwJ1xuICBjb25zdCBkdW90b25lQ29sb3IyID0gcGFyYW1zLmdldCgnZHVvMicpID8gYCMke3BhcmFtcy5nZXQoJ2R1bzInKX1gIDogJyNmZmZmZmYnXG4gIFxuICAvLyBSZW5kZXIgcGFsZXR0ZVxuICBjb25zdCBwYWxldHRlUGFyYW0gPSBwYXJhbXMuZ2V0KCdwYWxldHRlJylcbiAgY29uc3QgcGFsZXR0ZSA9IHBhbGV0dGVQYXJhbSA/IGRlY29kZVVSSUNvbXBvbmVudChwYWxldHRlUGFyYW0pLnNwbGl0KCcsJykubWFwKGMgPT4gYy5zdGFydHNXaXRoKCcjJykgPyBjIDogYCMke2N9YCkgOiB1bmRlZmluZWRcbiAgY29uc3QgcGFsZXR0ZU1vZGUgPSBwYXJhbXMuZ2V0KCdwYWxldHRlTW9kZScpIHx8ICdwb3NpdGlvbidcbiAgXG4gIC8vIFNhZmV0eSBwZXItRUNDIGxpbWl0cyAoc3VwcG9ydCBib3RoIHNob3J0IGFuZCBsb25nIHBhcmFtIG5hbWVzKVxuICBjb25zdCBtYXhPdmVybGF5SW50ZW5zaXR5TCA9IHBhcnNlSW50KHBhcmFtcy5nZXQoJ21heEludEwnKSB8fCBwYXJhbXMuZ2V0KCdtYXhPdmVybGF5SW50ZW5zaXR5TCcpIHx8ICcxMDAnLCAxMClcbiAgY29uc3QgbWF4T3ZlcmxheUludGVuc2l0eU0gPSBwYXJzZUludChwYXJhbXMuZ2V0KCdtYXhJbnRNJykgfHwgcGFyYW1zLmdldCgnbWF4T3ZlcmxheUludGVuc2l0eU0nKSB8fCAnMTAwJywgMTApXG4gIGNvbnN0IG1heE92ZXJsYXlJbnRlbnNpdHlRID0gcGFyc2VJbnQocGFyYW1zLmdldCgnbWF4SW50UScpIHx8IHBhcmFtcy5nZXQoJ21heE92ZXJsYXlJbnRlbnNpdHlRJykgfHwgJzEwMCcsIDEwKVxuICBjb25zdCBtYXhPdmVybGF5SW50ZW5zaXR5SCA9IHBhcnNlSW50KHBhcmFtcy5nZXQoJ21heEludEgnKSB8fCBwYXJhbXMuZ2V0KCdtYXhPdmVybGF5SW50ZW5zaXR5SCcpIHx8ICcxMDAnLCAxMClcbiAgXG4gIC8vIE91dHB1dCBmb3JtYXRcbiAgY29uc3Qgb3V0cHV0Rm9ybWF0ID0gKHBhcmFtcy5nZXQoJ2Zvcm1hdCcpIHx8ICdwbmcnKSBhcyBPdXRwdXRGb3JtYXRcbiAgY29uc3Qgb3V0cHV0UXVhbGl0eSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHBhcnNlRmxvYXQocGFyYW1zLmdldCgncXVhbGl0eScpIHx8ICcwLjknKSkpXG4gIGNvbnN0IG91dHB1dERwaSA9IE1hdGgubWF4KDEsIE1hdGgubWluKDEyMDAsIHBhcnNlSW50KHBhcmFtcy5nZXQoJ2RwaScpIHx8ICc3MicsIDEwKSkpXG4gIFxuICAvLyBXYXRlcm1hcmtcbiAgY29uc3Qgd2F0ZXJtYXJrRW5hYmxlZCA9IHBhcmFtcy5nZXQoJ3dtRW4nKSA9PT0gJzEnXG4gIGNvbnN0IHdhdGVybWFya0tpbmQgPSAocGFyYW1zLmdldCgnd21LaW5kJykgfHwgJ3RleHQnKSBhcyBXYXRlcm1hcmtLaW5kXG4gIGNvbnN0IHdhdGVybWFya1RleHQgPSBwYXJhbXMuZ2V0KCd3bVRleHQnKSA/IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbXMuZ2V0KCd3bVRleHQnKSEpIDogJydcbiAgY29uc3Qgd2F0ZXJtYXJrSW1hZ2VVcmwgPSBwYXJhbXMuZ2V0KCd3bUltZycpIHx8IHVuZGVmaW5lZFxuICBjb25zdCB3YXRlcm1hcmtQb3NpdGlvbiA9IChwYXJhbXMuZ2V0KCd3bVBvcycpIHx8ICdjZW50ZXInKSBhcyBXYXRlcm1hcmtQb3NpdGlvblxuICBjb25zdCB3YXRlcm1hcmtPcGFjaXR5ID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCgwLCBwYXJzZUludChwYXJhbXMuZ2V0KCd3bU9wYWNpdHknKSB8fCAnNTAnLCAxMCkpKVxuICBjb25zdCB3YXRlcm1hcmtCbGVuZCA9IChwYXJhbXMuZ2V0KCd3bUJsZW5kJykgfHwgJ25vcm1hbCcpIGFzIFdhdGVybWFya0JsZW5kXG4gIFxuICAvLyBBbmltYXRpb24gKGZvciBhbmltYXRlZCBHSUYgb3V0cHV0KVxuICBjb25zdCBhbmltYXRpb25QYXR0ZXJuID0gKHBhcmFtcy5nZXQoJ2FuaW1QYXR0ZXJuJykgfHwgJ25vbmUnKSBhcyBBbmltYXRpb25QYXR0ZXJuXG4gIC8vIEVuc3VyZSBmcmFtZSBjb3VudCBpcyBhdCBsZWFzdCAxIHRvIHByZXZlbnQgZW1wdHkgYW5pbWF0aW9uIGxvb3BzXG4gIGNvbnN0IGFuaW1hdGlvbkZyYW1lc1JhdyA9IHBhcnNlSW50KHBhcmFtcy5nZXQoJ2FuaW1GcmFtZXMnKSB8fCAnMjQnLCAxMClcbiAgY29uc3QgYW5pbWF0aW9uRnJhbWVzID0gTWF0aC5taW4oNjAsIE1hdGgubWF4KDEsIGlzTmFOKGFuaW1hdGlvbkZyYW1lc1JhdykgPyAyNCA6IGFuaW1hdGlvbkZyYW1lc1JhdykpXG4gIC8vIEVuc3VyZSBzcGVlZCBpcyB2YWxpZCB0byBwcmV2ZW50IGRpdmlzaW9uIGlzc3Vlc1xuICBjb25zdCBhbmltYXRpb25TcGVlZFJhdyA9IHBhcnNlSW50KHBhcmFtcy5nZXQoJ2FuaW1TcGVlZCcpIHx8ICcxMDAnLCAxMClcbiAgY29uc3QgYW5pbWF0aW9uU3BlZWQgPSBNYXRoLm1pbigxMDAwLCBNYXRoLm1heCgxMCwgaXNOYU4oYW5pbWF0aW9uU3BlZWRSYXcpID8gMTAwIDogYW5pbWF0aW9uU3BlZWRSYXcpKVxuICBjb25zdCBhbmltYXRpb25TZWVkID0gcGFyc2VJbnQocGFyYW1zLmdldCgnYW5pbVNlZWQnKSB8fCAnMCcsIDEwKVxuICBjb25zdCBhbmltYXRpb25FYXNpbmcgPSBwYXJhbXMuZ2V0KCdlYXNpbmcnKSB8fCAnbGluZWFyJ1xuICBcbiAgLy8gRm9ybWF0LXNwZWNpZmljIHF1YWxpdHkgcGFyYW1zXG4gIGNvbnN0IHdlYnBRdWFsaXR5ID0gTWF0aC5taW4oMTAwLCBNYXRoLm1heCgwLCBwYXJzZUludChwYXJhbXMuZ2V0KCd3ZWJwUScpIHx8ICc5MCcsIDEwKSkpXG4gIGNvbnN0IGdpZkNvbG9ycyA9IE1hdGgubWluKDI1NiwgTWF0aC5tYXgoMiwgcGFyc2VJbnQocGFyYW1zLmdldCgnZ2lmQ29sb3JzJykgfHwgJzI1NicsIDEwKSkpXG4gIFxuICAvLyBNZXRhZGF0YVxuICBjb25zdCBtZXRhVGl0bGUgPSBwYXJhbXMuZ2V0KCdtZXRhVGl0bGUnKSA/IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbXMuZ2V0KCdtZXRhVGl0bGUnKSEpIDogdW5kZWZpbmVkXG4gIGNvbnN0IG1ldGFBdXRob3IgPSBwYXJhbXMuZ2V0KCdtZXRhQXV0aG9yJykgPyBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLmdldCgnbWV0YUF1dGhvcicpISkgOiB1bmRlZmluZWRcbiAgY29uc3QgbWV0YUNvcHlyaWdodCA9IHBhcmFtcy5nZXQoJ21ldGFDb3B5JykgPyBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLmdldCgnbWV0YUNvcHknKSEpIDogdW5kZWZpbmVkXG4gIGNvbnN0IG1ldGFEZXNjcmlwdGlvbiA9IHBhcmFtcy5nZXQoJ21ldGFEZXNjJykgPyBkZWNvZGVVUklDb21wb25lbnQocGFyYW1zLmdldCgnbWV0YURlc2MnKSEpIDogdW5kZWZpbmVkXG4gIFxuICAvLyBWYWxpZGF0ZSBFQ0MgbGV2ZWxcbiAgaWYgKCFbJ0wnLCAnTScsICdRJywgJ0gnXS5pbmNsdWRlcyhlYykpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKCdJbnZhbGlkIFwiZWNcIiBwYXJhbWV0ZXIuIFVzZSBMLCBNLCBRLCBvciBIJywgeyBzdGF0dXM6IDQwMCB9KVxuICB9XG4gIFxuICAvLyBWYWxpZGF0ZSBtb2R1bGUgc3R5bGVcbiAgY29uc3QgdmFsaWRNb2R1bGVTdHlsZXMgPSBbJ3NxdWFyZScsICdyb3VuZGVkJywgJ2RvdHMnLCAnZGlhbW9uZCcsICdjb25uZWN0ZWQnXVxuICBpZiAoIXZhbGlkTW9kdWxlU3R5bGVzLmluY2x1ZGVzKG1vZHVsZVN0eWxlKSkge1xuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoYEludmFsaWQgXCJzdHlsZVwiIHBhcmFtZXRlci4gVXNlIG9uZSBvZjogJHt2YWxpZE1vZHVsZVN0eWxlcy5qb2luKCcsICcpfWAsIHsgc3RhdHVzOiA0MDAgfSlcbiAgfVxuICBcbiAgdHJ5IHtcbiAgICAvLyBDcmVhdGUgUVJHZW5lcmF0b3Igd2l0aCBOb2RlLmpzIGNhbnZhcyBmYWN0b3J5XG4gICAgY29uc3QgcXJHZW5lcmF0b3IgPSBuZXcgUVJHZW5lcmF0b3Iobm9kZUNhbnZhc0ZhY3RvcnkpXG4gICAgXG4gICAgLy8gQ2FsY3VsYXRlIG1vZHVsZSBzaXplIGJhc2VkIG9uIGRlc2lyZWQgb3V0cHV0IHNpemVcbiAgICAvLyBFc3RpbWF0ZSBtb2R1bGUgY291bnQgZmlyc3QgKGRlcGVuZHMgb24gY29udGVudCBsZW5ndGggYW5kIEVDQylcbiAgICBjb25zdCBlc3RpbWF0ZWRWZXJzaW9uID0gcXJHZW5lcmF0b3IuY2FsY3VsYXRlT3B0aW1hbFZlcnNpb24oZGVjb2RlVVJJQ29tcG9uZW50KGRhdGEpLCBlYylcbiAgICBjb25zdCBlc3RpbWF0ZWRNb2R1bGVDb3VudCA9IGVzdGltYXRlZFZlcnNpb24gKiA0ICsgMTdcbiAgICBjb25zdCBtb2R1bGVTaXplID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcigoc2l6ZSAtIG1hcmdpbiAqIDIpIC8gKGVzdGltYXRlZE1vZHVsZUNvdW50ICsgbWFyZ2luICogMikpKVxuICAgIFxuICAgIC8vIEJ1aWxkIGNvbmZpZyAoc2FtZSBzdHJ1Y3R1cmUgYXMgY2xpZW50LXNpZGUpXG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgY29udGVudDogZGVjb2RlVVJJQ29tcG9uZW50KGRhdGEpLFxuICAgICAgdHlwZU51bWJlcjogdmVyc2lvbiwgLy8gMCA9IGF1dG8tZGV0ZWN0XG4gICAgICBlcnJvckNvcnJlY3Rpb246IGVjLFxuICAgICAgZW5jb2RpbmdNb2RlLFxuICAgICAgbW9kdWxlU2l6ZSxcbiAgICAgIG1hcmdpbjogbWFyZ2luICsgYm9yZGVyTW9kdWxlc0V4dHJhLFxuICAgICAgY3Jpc3BFZGdlcyxcbiAgICAgIHBpeGVsU25hcCxcbiAgICAgIGZnQ29sb3I6IGAjJHtmZ31gLFxuICAgICAgYmdDb2xvcjogYCMke2JnfWAsXG4gICAgICB0cmFuc3BhcmVudEJnOiB0cmFuc3BhcmVudCxcbiAgICAgIG1vZHVsZVN0eWxlLFxuICAgICAgZmluZGVyU3R5bGUsXG4gICAgICBhbGlnbm1lbnRTdHlsZSxcbiAgICAgIHRpbWluZ1N0eWxlLFxuICAgICAgZXllT3V0ZXJTdHlsZSxcbiAgICAgIGV5ZUlubmVyU3R5bGUsXG4gICAgICBleWVTY2FsZSxcbiAgICAgIGNvcm5lclJhZGl1cyxcbiAgICAgIG1vZHVsZUdhcCxcbiAgICAgIGdhcE1vZGUsXG4gICAgICBkb3RSb3RhdGlvbkRlZyxcbiAgICAgIGZyYW1lU3R5bGUsXG4gICAgICBmcmFtZVRleHQsXG4gICAgICBwZXJNb2R1bGVDb2xvck1vZGUsXG4gICAgICBjb250cmFzdEd1YXJkLFxuICAgICAgbWluQ29udHJhc3RSYXRpbyxcbiAgICAgIG92ZXJsYXlNb2RlLFxuICAgICAgb3ZlcmxheUludGVuc2l0eSxcbiAgICAgIGNvbG9yTW9kZSxcbiAgICAgIGxvZ29TaXplLFxuICAgICAgcHJlc2VydmVGaW5kZXJzLFxuICAgICAgcHJlc2VydmVUaW1pbmcsXG4gICAgICBwcmVzZXJ2ZUFsaWdubWVudCxcbiAgICAgIHByb3RlY3RGb3JtYXRJbmZvLFxuICAgICAgcHJvdGVjdFZlcnNpb25JbmZvLFxuICAgICAgZWNjQXdhcmVFbmFibGVkLFxuICAgICAgZWNjQXdhcmVSaXNrQnVkZ2V0LFxuICAgICAgZWNjQXdhcmVXZWlnaHRNYXAsXG4gICAgICBvdmVybGF5QnJpZ2h0bmVzcyxcbiAgICAgIG92ZXJsYXlDb250cmFzdCxcbiAgICAgIG92ZXJsYXlHYW1tYSxcbiAgICAgIG92ZXJsYXlTYXR1cmF0aW9uLFxuICAgICAgb3ZlcmxheUh1ZVJvdGF0ZSxcbiAgICAgIGludmVydEltYWdlOiBvdmVybGF5SW52ZXJ0LFxuICAgICAgb3ZlcmxheUJsdXIsXG4gICAgICBvdmVybGF5U2hhcnBlbixcbiAgICAgIG92ZXJsYXlQb3N0ZXJpemUsXG4gICAgICBvdmVybGF5VGhyZXNob2xkLFxuICAgICAgb3ZlcmxheUVkZ2VEZXRlY3QsXG4gICAgICBvdmVybGF5Rml0LFxuICAgICAgb3ZlcmxheVJvdGF0ZSxcbiAgICAgIG92ZXJsYXlGbGlwWCxcbiAgICAgIG92ZXJsYXlGbGlwWSxcbiAgICAgIC8vIERpdGhlciBvcHRpb25zXG4gICAgICBkaXRoZXJLaW5kLFxuICAgICAgZGlmZnVzaW9uS2VybmVsLFxuICAgICAgZGl0aGVyU3RyZW5ndGgsXG4gICAgICBkaXRoZXJTZXJwZW50aW5lLFxuICAgICAgb3JkZXJlZE1hdHJpeCxcbiAgICAgIGJsdWVOb2lzZVRpbGVTaXplLFxuICAgICAgYmx1ZU5vaXNlU2VlZCxcbiAgICAgIGNvbG9yRGl0aGVyLFxuICAgICAgLy8gU3VicGl4ZWwgb3B0aW9uc1xuICAgICAgc3VicGl4ZWxHcmlkU2l6ZSxcbiAgICAgIHN1YnBpeGVsQ2VudGVyUnVsZSxcbiAgICAgIHN1YnBpeGVsTmV1dHJhbENvbG9yLFxuICAgICAgc3VicGl4ZWxGaW5kZXJPdmVycmlkZSxcbiAgICAgIC8vIEhhbGZ0b25lIG9wdGlvbnNcbiAgICAgIGhhbGZ0b25lQ2VsbCxcbiAgICAgIGhhbGZ0b25lRG90U2hhcGUsXG4gICAgICBicmlnaHRuZXNzQ3VydmUsXG4gICAgICBkdW90b25lQ29sb3JzOiBbZHVvdG9uZUNvbG9yMSwgZHVvdG9uZUNvbG9yMl0sXG4gICAgICAvLyBQYWxldHRlXG4gICAgICBwYWxldHRlLFxuICAgICAgcGFsZXR0ZU1vZGUsXG4gICAgICBncmFkaWVudDogZ3JhZGllbnRUeXBlICE9PSAnbm9uZScgPyB7XG4gICAgICAgIHR5cGU6IGdyYWRpZW50VHlwZSxcbiAgICAgICAgYW5nbGU6IGdyYWRpZW50QW5nbGUsXG4gICAgICAgIHN0b3BzOiBncmFkaWVudFN0b3BzLFxuICAgICAgfSA6IHVuZGVmaW5lZCxcbiAgICAgIC8vIFBlci1FQ0MgaW50ZW5zaXR5IGxpbWl0c1xuICAgICAgbWF4T3ZlcmxheUludGVuc2l0eUJ5RWNjOiB7XG4gICAgICAgIEw6IG1heE92ZXJsYXlJbnRlbnNpdHlMLFxuICAgICAgICBNOiBtYXhPdmVybGF5SW50ZW5zaXR5TSxcbiAgICAgICAgUTogbWF4T3ZlcmxheUludGVuc2l0eVEsXG4gICAgICAgIEg6IG1heE92ZXJsYXlJbnRlbnNpdHlILFxuICAgICAgfSxcbiAgICB9XG4gICAgXG4gICAgLy8gTG9hZCBvdmVybGF5IGltYWdlIGlmIFVSTCBwcm92aWRlZFxuICAgIGxldCBvdmVybGF5Q2FudmFzOiBDYW52YXMgfCBudWxsID0gbnVsbFxuICAgIGxldCBvdmVybGF5RnJhbWVzOiBTZXJ2ZXJBbmltYXRpb25GcmFtZVtdID0gW11cbiAgICBsZXQgaGFzQW5pbWF0ZWRPdmVybGF5ID0gZmFsc2VcbiAgICBcbiAgICBpZiAob3ZlcmxheVVybCAmJiBvdmVybGF5TW9kZSkge1xuICAgICAgY29uc3QgZmV0Y2hlZEltYWdlID0gYXdhaXQgZmV0Y2hJbWFnZVdpdGhCdWZmZXIob3ZlcmxheVVybClcbiAgICAgIGlmIChmZXRjaGVkSW1hZ2UpIHtcbiAgICAgICAgb3ZlcmxheUNhbnZhcyA9IGZldGNoZWRJbWFnZS5jYW52YXNcbiAgICAgICAgXG4gICAgICAgIC8vIENoZWNrIGlmIGl0J3MgYW4gYW5pbWF0ZWQgR0lGIGFuZCB3ZSdyZSBvdXRwdXR0aW5nIEdJRiBmb3JtYXRcbiAgICAgICAgaWYgKGZldGNoZWRJbWFnZS5pc0FuaW1hdGVkR2lmICYmIG91dHB1dEZvcm1hdCA9PT0gJ2dpZicpIHtcbiAgICAgICAgICBoYXNBbmltYXRlZE92ZXJsYXkgPSB0cnVlXG4gICAgICAgICAgb3ZlcmxheUZyYW1lcyA9IHBhcnNlR2lmRnJhbWVzU2VydmVyKGZldGNoZWRJbWFnZS5hcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBHZW5lcmF0ZSBRUiBjb2RlIHVzaW5nIHRoZSBzYW1lIG1ldGhvZCBhcyBjbGllbnQtc2lkZVxuICAgIGxldCBjYW52YXMgPSBhd2FpdCBxckdlbmVyYXRvci5nZW5lcmF0ZShjb25maWcsIG92ZXJsYXlDYW52YXMpXG4gICAgXG4gICAgLy8gTG9hZCB3YXRlcm1hcmsgaW1hZ2UgaWYgVVJMIHByb3ZpZGVkXG4gICAgbGV0IHdhdGVybWFya0ltYWdlQ2FudmFzOiBDYW52YXMgfCBudWxsID0gbnVsbFxuICAgIGlmICh3YXRlcm1hcmtFbmFibGVkICYmICh3YXRlcm1hcmtLaW5kID09PSAnaW1hZ2UnIHx8IHdhdGVybWFya0tpbmQgPT09ICdwYXR0ZXJuJykgJiYgd2F0ZXJtYXJrSW1hZ2VVcmwpIHtcbiAgICAgIHdhdGVybWFya0ltYWdlQ2FudmFzID0gYXdhaXQgZmV0Y2hJbWFnZUFzQ2FudmFzKHdhdGVybWFya0ltYWdlVXJsKVxuICAgIH1cbiAgICBcbiAgICAvLyBBcHBseSB3YXRlcm1hcmsgaWYgZW5hYmxlZFxuICAgIGlmICh3YXRlcm1hcmtFbmFibGVkKSB7XG4gICAgICBjYW52YXMgPSBhcHBseVdhdGVybWFya1NlcnZlcihjYW52YXMsIHtcbiAgICAgICAgZW5hYmxlZDogd2F0ZXJtYXJrRW5hYmxlZCxcbiAgICAgICAga2luZDogd2F0ZXJtYXJrS2luZCxcbiAgICAgICAgdGV4dDogd2F0ZXJtYXJrVGV4dCxcbiAgICAgICAgaW1hZ2VDYW52YXM6IHdhdGVybWFya0ltYWdlQ2FudmFzLFxuICAgICAgICBwb3NpdGlvbjogd2F0ZXJtYXJrUG9zaXRpb24sXG4gICAgICAgIG9wYWNpdHk6IHdhdGVybWFya09wYWNpdHksXG4gICAgICAgIGJsZW5kOiB3YXRlcm1hcmtCbGVuZCxcbiAgICAgIH0pXG4gICAgfVxuICAgIFxuICAgIC8vIFNjYWxlIHRvIHJlcXVlc3RlZCBvdXRwdXQgZGltZW5zaW9uc1xuICAgIGxldCBvdXRwdXRDYW52YXMgPSBjYW52YXNcbiAgICBpZiAoY2FudmFzLndpZHRoICE9PSBvdXRwdXRXaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBvdXRwdXRIZWlnaHQpIHtcbiAgICAgIG91dHB1dENhbnZhcyA9IGNyZWF0ZUNhbnZhcyhvdXRwdXRXaWR0aCwgb3V0cHV0SGVpZ2h0KVxuICAgICAgY29uc3QgY3R4ID0gb3V0cHV0Q2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZVxuICAgICAgY3R4LmRyYXdJbWFnZShjYW52YXMsIDAsIDAsIG91dHB1dFdpZHRoLCBvdXRwdXRIZWlnaHQpXG4gICAgfVxuICAgIFxuICAgIC8vIEJ1aWxkIG1ldGFkYXRhIG9iamVjdFxuICAgIGNvbnN0IG1ldGFkYXRhOiBQbmdNZXRhZGF0YSB8IHVuZGVmaW5lZCA9IChtZXRhVGl0bGUgfHwgbWV0YUF1dGhvciB8fCBtZXRhQ29weXJpZ2h0IHx8IG1ldGFEZXNjcmlwdGlvbikgPyB7XG4gICAgICB0aXRsZTogbWV0YVRpdGxlLFxuICAgICAgYXV0aG9yOiBtZXRhQXV0aG9yLFxuICAgICAgY29weXJpZ2h0OiBtZXRhQ29weXJpZ2h0LFxuICAgICAgZGVzY3JpcHRpb246IG1ldGFEZXNjcmlwdGlvbixcbiAgICAgIGNyZWF0aW9uVGltZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgc29mdHdhcmU6ICdBTlFSIC0gYW5xci5saW5rJyxcbiAgICB9IDogdW5kZWZpbmVkXG4gICAgXG4gICAgLy8gR2VuZXJhdGUgYW5pbWF0aW9uIGZyYW1lcyBiYXNlZCBvbiBzb3VyY2VcbiAgICBsZXQgYW5pbWF0aW9uRnJhbWVDYW52YXNlczogQ2FudmFzW10gPSBbXVxuICAgIGxldCBhbmltYXRlZE92ZXJsYXlGcmFtZXM6IFNlcnZlckFuaW1hdGlvbkZyYW1lW10gPSBbXVxuICAgIFxuICAgIGlmIChvdXRwdXRGb3JtYXQgPT09ICdnaWYnKSB7XG4gICAgICBpZiAoaGFzQW5pbWF0ZWRPdmVybGF5ICYmIG92ZXJsYXlGcmFtZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAvLyBBbmltYXRlZCBHSUYgb3ZlcmxheSAtIGdlbmVyYXRlIGEgUVIgZnJhbWUgZm9yIGVhY2ggb3ZlcmxheSBmcmFtZVxuICAgICAgICBmb3IgKGNvbnN0IG92ZXJsYXlGcmFtZSBvZiBvdmVybGF5RnJhbWVzKSB7XG4gICAgICAgICAgY29uc3QgZnJhbWVDYW52YXMgPSBhd2FpdCBxckdlbmVyYXRvci5nZW5lcmF0ZShjb25maWcsIG92ZXJsYXlGcmFtZS5jYW52YXMpXG4gICAgICAgICAgXG4gICAgICAgICAgLy8gU2NhbGUgdG8gb3V0cHV0IHNpemUgaWYgbmVlZGVkXG4gICAgICAgICAgbGV0IHNjYWxlZEZyYW1lID0gZnJhbWVDYW52YXNcbiAgICAgICAgICBpZiAoZnJhbWVDYW52YXMud2lkdGggIT09IG91dHB1dFdpZHRoIHx8IGZyYW1lQ2FudmFzLmhlaWdodCAhPT0gb3V0cHV0SGVpZ2h0KSB7XG4gICAgICAgICAgICBzY2FsZWRGcmFtZSA9IGNyZWF0ZUNhbnZhcyhvdXRwdXRXaWR0aCwgb3V0cHV0SGVpZ2h0KVxuICAgICAgICAgICAgY29uc3QgY3R4ID0gc2NhbGVkRnJhbWUuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICAgICAgY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGZyYW1lQ2FudmFzLCAwLCAwLCBvdXRwdXRXaWR0aCwgb3V0cHV0SGVpZ2h0KVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAvLyBBcHBseSB3YXRlcm1hcmsgaWYgZW5hYmxlZFxuICAgICAgICAgIGlmICh3YXRlcm1hcmtFbmFibGVkKSB7XG4gICAgICAgICAgICBzY2FsZWRGcmFtZSA9IGFwcGx5V2F0ZXJtYXJrU2VydmVyKHNjYWxlZEZyYW1lLCB7XG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHdhdGVybWFya0VuYWJsZWQsXG4gICAgICAgICAgICAgIGtpbmQ6IHdhdGVybWFya0tpbmQsXG4gICAgICAgICAgICAgIHRleHQ6IHdhdGVybWFya1RleHQsXG4gICAgICAgICAgICAgIGltYWdlQ2FudmFzOiB3YXRlcm1hcmtJbWFnZUNhbnZhcyxcbiAgICAgICAgICAgICAgcG9zaXRpb246IHdhdGVybWFya1Bvc2l0aW9uLFxuICAgICAgICAgICAgICBvcGFjaXR5OiB3YXRlcm1hcmtPcGFjaXR5LFxuICAgICAgICAgICAgICBibGVuZDogd2F0ZXJtYXJrQmxlbmQsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBhbmltYXRlZE92ZXJsYXlGcmFtZXMucHVzaCh7XG4gICAgICAgICAgICBjYW52YXM6IHNjYWxlZEZyYW1lLFxuICAgICAgICAgICAgZGVsYXk6IG92ZXJsYXlGcmFtZS5kZWxheSxcbiAgICAgICAgICAgIGRpc3Bvc2FsVHlwZTogb3ZlcmxheUZyYW1lLmRpc3Bvc2FsVHlwZSxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvblBhdHRlcm4gIT09ICdub25lJykge1xuICAgICAgICAvLyBQYXR0ZXJuLWJhc2VkIGFuaW1hdGlvblxuICAgICAgICBhbmltYXRpb25GcmFtZUNhbnZhc2VzID0gZ2VuZXJhdGVQYXR0ZXJuRnJhbWVzU2VydmVyKFxuICAgICAgICAgIG91dHB1dENhbnZhcyxcbiAgICAgICAgICBhbmltYXRpb25QYXR0ZXJuLFxuICAgICAgICAgIGFuaW1hdGlvbkZyYW1lcyxcbiAgICAgICAgICBhbmltYXRpb25TZWVkLFxuICAgICAgICAgIGFuaW1hdGlvbkVhc2luZyBhcyBBbmltYXRpb25FYXNpbmdcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBFbmNvZGUgYmFzZWQgb24gZm9ybWF0XG4gICAgbGV0IG91dHB1dEJ1ZmZlcjogQnVmZmVyXG4gICAgbGV0IGNvbnRlbnRUeXBlOiBzdHJpbmdcbiAgICBcbiAgICBzd2l0Y2ggKG91dHB1dEZvcm1hdCkge1xuICAgICAgY2FzZSAnZ2lmJzpcbiAgICAgICAgaWYgKGFuaW1hdGVkT3ZlcmxheUZyYW1lcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgLy8gQW5pbWF0ZWQgR0lGIGZyb20gb3ZlcmxheSBmcmFtZXMgKHByZXNlcnZlcyBvcmlnaW5hbCBmcmFtZSBkZWxheXMpXG4gICAgICAgICAgb3V0cHV0QnVmZmVyID0gZW5jb2RlQW5pbWF0ZWRHaWZXaXRoRGVsYXlzKGFuaW1hdGVkT3ZlcmxheUZyYW1lcywgZ2lmQ29sb3JzKVxuICAgICAgICB9IGVsc2UgaWYgKGFuaW1hdGlvbkZyYW1lQ2FudmFzZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIC8vIEFuaW1hdGVkIEdJRiB3aXRoIHBhdHRlcm5cbiAgICAgICAgICBvdXRwdXRCdWZmZXIgPSBlbmNvZGVBbmltYXRlZEdpZihhbmltYXRpb25GcmFtZUNhbnZhc2VzLCBhbmltYXRpb25TcGVlZCwgZ2lmQ29sb3JzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNpbmdsZSBmcmFtZSBHSUZcbiAgICAgICAgICBvdXRwdXRCdWZmZXIgPSBlbmNvZGVHaWYob3V0cHV0Q2FudmFzLCBnaWZDb2xvcnMpXG4gICAgICAgIH1cbiAgICAgICAgY29udGVudFR5cGUgPSAnaW1hZ2UvZ2lmJ1xuICAgICAgICBicmVha1xuICAgICAgICBcbiAgICAgIGNhc2UgJ3dlYnAnOlxuICAgICAgICBvdXRwdXRCdWZmZXIgPSBvdXRwdXRDYW52YXMudG9CdWZmZXIoJ2ltYWdlL3dlYnAnLCB3ZWJwUXVhbGl0eSlcbiAgICAgICAgY29udGVudFR5cGUgPSAnaW1hZ2Uvd2VicCdcbiAgICAgICAgYnJlYWtcbiAgICAgICAgXG4gICAgICBjYXNlICdwbmcnOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgb3V0cHV0QnVmZmVyID0gb3V0cHV0Q2FudmFzLnRvQnVmZmVyKCdpbWFnZS9wbmcnKVxuICAgICAgICAvLyBFbWJlZCBtZXRhZGF0YSBhbmQgRFBJIGludG8gUE5HXG4gICAgICAgIGlmIChtZXRhZGF0YSB8fCBvdXRwdXREcGkgIT09IDcyKSB7XG4gICAgICAgICAgb3V0cHV0QnVmZmVyID0gZW1iZWRQbmdNZXRhZGF0YUFuZERwaShvdXRwdXRCdWZmZXIsIG1ldGFkYXRhLCBvdXRwdXREcGkpXG4gICAgICAgIH1cbiAgICAgICAgY29udGVudFR5cGUgPSAnaW1hZ2UvcG5nJ1xuICAgICAgICBicmVha1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG5ldyBVaW50OEFycmF5KG91dHB1dEJ1ZmZlciksIHtcbiAgICAgIHN0YXR1czogMjAwLFxuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1UeXBlJzogY29udGVudFR5cGUsXG4gICAgICAgICdDYWNoZS1Db250cm9sJzogJ3B1YmxpYywgbWF4LWFnZT0zMTUzNjAwMCwgaW1tdXRhYmxlJyxcbiAgICAgICAgJ0FjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbic6ICcqJyxcbiAgICAgIH0sXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnVW5rbm93biBlcnJvcidcbiAgICBjb25zb2xlLmVycm9yKCdRUiBnZW5lcmF0aW9uIGVycm9yOicsIGVycm9yKVxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UoYEVycm9yIGdlbmVyYXRpbmcgUVIgY29kZTogJHttZXNzYWdlfWAsIHsgc3RhdHVzOiA1MDAgfSlcbiAgfVxufVxuIiwgIi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vL1xuLy8gUVIgQ29kZSBHZW5lcmF0b3IgZm9yIEphdmFTY3JpcHRcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgS2F6dWhpa28gQXJhc2Vcbi8vXG4vLyBVUkw6IGh0dHA6Ly93d3cuZC1wcm9qZWN0LmNvbS9cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6XG4vLyAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbi8vXG4vLyBUaGUgd29yZCAnUVIgQ29kZScgaXMgcmVnaXN0ZXJlZCB0cmFkZW1hcmsgb2Zcbi8vIERFTlNPIFdBVkUgSU5DT1JQT1JBVEVEXG4vLyAgaHR0cDovL3d3dy5kZW5zby13YXZlLmNvbS9xcmNvZGUvZmFxcGF0ZW50LWUuaHRtbFxuLy9cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBxcmNvZGVcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8qKlxuICogcXJjb2RlXG4gKiBAcGFyYW0gdHlwZU51bWJlciAxIHRvIDQwXG4gKiBAcGFyYW0gZXJyb3JDb3JyZWN0aW9uTGV2ZWwgJ0wnLCdNJywnUScsJ0gnXG4gKi9cbmV4cG9ydCBjb25zdCBxcmNvZGUgPSBmdW5jdGlvbih0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3Rpb25MZXZlbCkge1xuXG4gIGNvbnN0IFBBRDAgPSAweEVDO1xuICBjb25zdCBQQUQxID0gMHgxMTtcblxuICBsZXQgX3R5cGVOdW1iZXIgPSB0eXBlTnVtYmVyO1xuICBjb25zdCBfZXJyb3JDb3JyZWN0aW9uTGV2ZWwgPSBRUkVycm9yQ29ycmVjdGlvbkxldmVsW2Vycm9yQ29ycmVjdGlvbkxldmVsXTtcbiAgbGV0IF9tb2R1bGVzID0gbnVsbDtcbiAgbGV0IF9tb2R1bGVDb3VudCA9IDA7XG4gIGxldCBfZGF0YUNhY2hlID0gbnVsbDtcbiAgY29uc3QgX2RhdGFMaXN0ID0gW107XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBjb25zdCBtYWtlSW1wbCA9IGZ1bmN0aW9uKHRlc3QsIG1hc2tQYXR0ZXJuKSB7XG5cbiAgICBfbW9kdWxlQ291bnQgPSBfdHlwZU51bWJlciAqIDQgKyAxNztcbiAgICBfbW9kdWxlcyA9IGZ1bmN0aW9uKG1vZHVsZUNvdW50KSB7XG4gICAgICBjb25zdCBtb2R1bGVzID0gbmV3IEFycmF5KG1vZHVsZUNvdW50KTtcbiAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3cgKz0gMSkge1xuICAgICAgICBtb2R1bGVzW3Jvd10gPSBuZXcgQXJyYXkobW9kdWxlQ291bnQpO1xuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sICs9IDEpIHtcbiAgICAgICAgICBtb2R1bGVzW3Jvd11bY29sXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtb2R1bGVzO1xuICAgIH0oX21vZHVsZUNvdW50KTtcblxuICAgIHNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oMCwgMCk7XG4gICAgc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybihfbW9kdWxlQ291bnQgLSA3LCAwKTtcbiAgICBzZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuKDAsIF9tb2R1bGVDb3VudCAtIDcpO1xuICAgIHNldHVwUG9zaXRpb25BZGp1c3RQYXR0ZXJuKCk7XG4gICAgc2V0dXBUaW1pbmdQYXR0ZXJuKCk7XG4gICAgc2V0dXBUeXBlSW5mbyh0ZXN0LCBtYXNrUGF0dGVybik7XG5cbiAgICBpZiAoX3R5cGVOdW1iZXIgPj0gNykge1xuICAgICAgc2V0dXBUeXBlTnVtYmVyKHRlc3QpO1xuICAgIH1cblxuICAgIGlmIChfZGF0YUNhY2hlID09IG51bGwpIHtcbiAgICAgIF9kYXRhQ2FjaGUgPSBjcmVhdGVEYXRhKF90eXBlTnVtYmVyLCBfZXJyb3JDb3JyZWN0aW9uTGV2ZWwsIF9kYXRhTGlzdCk7XG4gICAgfVxuXG4gICAgbWFwRGF0YShfZGF0YUNhY2hlLCBtYXNrUGF0dGVybik7XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybiA9IGZ1bmN0aW9uKHJvdywgY29sKSB7XG5cbiAgICBmb3IgKGxldCByID0gLTE7IHIgPD0gNzsgciArPSAxKSB7XG5cbiAgICAgIGlmIChyb3cgKyByIDw9IC0xIHx8IF9tb2R1bGVDb3VudCA8PSByb3cgKyByKSBjb250aW51ZTtcblxuICAgICAgZm9yIChsZXQgYyA9IC0xOyBjIDw9IDc7IGMgKz0gMSkge1xuXG4gICAgICAgIGlmIChjb2wgKyBjIDw9IC0xIHx8IF9tb2R1bGVDb3VudCA8PSBjb2wgKyBjKSBjb250aW51ZTtcblxuICAgICAgICBpZiAoICgwIDw9IHIgJiYgciA8PSA2ICYmIChjID09IDAgfHwgYyA9PSA2KSApXG4gICAgICAgICAgICB8fCAoMCA8PSBjICYmIGMgPD0gNiAmJiAociA9PSAwIHx8IHIgPT0gNikgKVxuICAgICAgICAgICAgfHwgKDIgPD0gciAmJiByIDw9IDQgJiYgMiA8PSBjICYmIGMgPD0gNCkgKSB7XG4gICAgICAgICAgX21vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIF9tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0QmVzdE1hc2tQYXR0ZXJuID0gZnVuY3Rpb24oKSB7XG5cbiAgICBsZXQgbWluTG9zdFBvaW50ID0gMDtcbiAgICBsZXQgcGF0dGVybiA9IDA7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMSkge1xuXG4gICAgICBtYWtlSW1wbCh0cnVlLCBpKTtcblxuICAgICAgY29uc3QgbG9zdFBvaW50ID0gUVJVdGlsLmdldExvc3RQb2ludChfdGhpcyk7XG5cbiAgICAgIGlmIChpID09IDAgfHwgbWluTG9zdFBvaW50ID4gbG9zdFBvaW50KSB7XG4gICAgICAgIG1pbkxvc3RQb2ludCA9IGxvc3RQb2ludDtcbiAgICAgICAgcGF0dGVybiA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdHRlcm47XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBUaW1pbmdQYXR0ZXJuID0gZnVuY3Rpb24oKSB7XG5cbiAgICBmb3IgKGxldCByID0gODsgciA8IF9tb2R1bGVDb3VudCAtIDg7IHIgKz0gMSkge1xuICAgICAgaWYgKF9tb2R1bGVzW3JdWzZdICE9IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBfbW9kdWxlc1tyXVs2XSA9IChyICUgMiA9PSAwKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBjID0gODsgYyA8IF9tb2R1bGVDb3VudCAtIDg7IGMgKz0gMSkge1xuICAgICAgaWYgKF9tb2R1bGVzWzZdW2NdICE9IG51bGwpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBfbW9kdWxlc1s2XVtjXSA9IChjICUgMiA9PSAwKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBQb3NpdGlvbkFkanVzdFBhdHRlcm4gPSBmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IHBvcyA9IFFSVXRpbC5nZXRQYXR0ZXJuUG9zaXRpb24oX3R5cGVOdW1iZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyBpICs9IDEpIHtcblxuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwb3MubGVuZ3RoOyBqICs9IDEpIHtcblxuICAgICAgICBjb25zdCByb3cgPSBwb3NbaV07XG4gICAgICAgIGNvbnN0IGNvbCA9IHBvc1tqXTtcblxuICAgICAgICBpZiAoX21vZHVsZXNbcm93XVtjb2xdICE9IG51bGwpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHIgPSAtMjsgciA8PSAyOyByICs9IDEpIHtcblxuICAgICAgICAgIGZvciAobGV0IGMgPSAtMjsgYyA8PSAyOyBjICs9IDEpIHtcblxuICAgICAgICAgICAgaWYgKHIgPT0gLTIgfHwgciA9PSAyIHx8IGMgPT0gLTIgfHwgYyA9PSAyXG4gICAgICAgICAgICAgICAgfHwgKHIgPT0gMCAmJiBjID09IDApICkge1xuICAgICAgICAgICAgICBfbW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBfbW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBjb25zdCBzZXR1cFR5cGVOdW1iZXIgPSBmdW5jdGlvbih0ZXN0KSB7XG5cbiAgICBjb25zdCBiaXRzID0gUVJVdGlsLmdldEJDSFR5cGVOdW1iZXIoX3R5cGVOdW1iZXIpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxODsgaSArPSAxKSB7XG4gICAgICBjb25zdCBtb2QgPSAoIXRlc3QgJiYgKCAoYml0cyA+PiBpKSAmIDEpID09IDEpO1xuICAgICAgX21vZHVsZXNbTWF0aC5mbG9vcihpIC8gMyldW2kgJSAzICsgX21vZHVsZUNvdW50IC0gOCAtIDNdID0gbW9kO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgbW9kID0gKCF0ZXN0ICYmICggKGJpdHMgPj4gaSkgJiAxKSA9PSAxKTtcbiAgICAgIF9tb2R1bGVzW2kgJSAzICsgX21vZHVsZUNvdW50IC0gOCAtIDNdW01hdGguZmxvb3IoaSAvIDMpXSA9IG1vZDtcbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc2V0dXBUeXBlSW5mbyA9IGZ1bmN0aW9uKHRlc3QsIG1hc2tQYXR0ZXJuKSB7XG5cbiAgICBjb25zdCBkYXRhID0gKF9lcnJvckNvcnJlY3Rpb25MZXZlbCA8PCAzKSB8IG1hc2tQYXR0ZXJuO1xuICAgIGNvbnN0IGJpdHMgPSBRUlV0aWwuZ2V0QkNIVHlwZUluZm8oZGF0YSk7XG5cbiAgICAvLyB2ZXJ0aWNhbFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkgKz0gMSkge1xuXG4gICAgICBjb25zdCBtb2QgPSAoIXRlc3QgJiYgKCAoYml0cyA+PiBpKSAmIDEpID09IDEpO1xuXG4gICAgICBpZiAoaSA8IDYpIHtcbiAgICAgICAgX21vZHVsZXNbaV1bOF0gPSBtb2Q7XG4gICAgICB9IGVsc2UgaWYgKGkgPCA4KSB7XG4gICAgICAgIF9tb2R1bGVzW2kgKyAxXVs4XSA9IG1vZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF9tb2R1bGVzW19tb2R1bGVDb3VudCAtIDE1ICsgaV1bOF0gPSBtb2Q7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaG9yaXpvbnRhbFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTU7IGkgKz0gMSkge1xuXG4gICAgICBjb25zdCBtb2QgPSAoIXRlc3QgJiYgKCAoYml0cyA+PiBpKSAmIDEpID09IDEpO1xuXG4gICAgICBpZiAoaSA8IDgpIHtcbiAgICAgICAgX21vZHVsZXNbOF1bX21vZHVsZUNvdW50IC0gaSAtIDFdID0gbW9kO1xuICAgICAgfSBlbHNlIGlmIChpIDwgOSkge1xuICAgICAgICBfbW9kdWxlc1s4XVsxNSAtIGkgLSAxICsgMV0gPSBtb2Q7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfbW9kdWxlc1s4XVsxNSAtIGkgLSAxXSA9IG1vZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaXhlZCBtb2R1bGVcbiAgICBfbW9kdWxlc1tfbW9kdWxlQ291bnQgLSA4XVs4XSA9ICghdGVzdCk7XG4gIH07XG5cbiAgY29uc3QgbWFwRGF0YSA9IGZ1bmN0aW9uKGRhdGEsIG1hc2tQYXR0ZXJuKSB7XG5cbiAgICBsZXQgaW5jID0gLTE7XG4gICAgbGV0IHJvdyA9IF9tb2R1bGVDb3VudCAtIDE7XG4gICAgbGV0IGJpdEluZGV4ID0gNztcbiAgICBsZXQgYnl0ZUluZGV4ID0gMDtcbiAgICBjb25zdCBtYXNrRnVuYyA9IFFSVXRpbC5nZXRNYXNrRnVuY3Rpb24obWFza1BhdHRlcm4pO1xuXG4gICAgZm9yIChsZXQgY29sID0gX21vZHVsZUNvdW50IC0gMTsgY29sID4gMDsgY29sIC09IDIpIHtcblxuICAgICAgaWYgKGNvbCA9PSA2KSBjb2wgLT0gMTtcblxuICAgICAgd2hpbGUgKHRydWUpIHtcblxuICAgICAgICBmb3IgKGxldCBjID0gMDsgYyA8IDI7IGMgKz0gMSkge1xuXG4gICAgICAgICAgaWYgKF9tb2R1bGVzW3Jvd11bY29sIC0gY10gPT0gbnVsbCkge1xuXG4gICAgICAgICAgICBsZXQgZGFyayA9IGZhbHNlO1xuXG4gICAgICAgICAgICBpZiAoYnl0ZUluZGV4IDwgZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgZGFyayA9ICggKCAoZGF0YVtieXRlSW5kZXhdID4+PiBiaXRJbmRleCkgJiAxKSA9PSAxKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgbWFzayA9IG1hc2tGdW5jKHJvdywgY29sIC0gYyk7XG5cbiAgICAgICAgICAgIGlmIChtYXNrKSB7XG4gICAgICAgICAgICAgIGRhcmsgPSAhZGFyaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgX21vZHVsZXNbcm93XVtjb2wgLSBjXSA9IGRhcms7XG4gICAgICAgICAgICBiaXRJbmRleCAtPSAxO1xuXG4gICAgICAgICAgICBpZiAoYml0SW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgYnl0ZUluZGV4ICs9IDE7XG4gICAgICAgICAgICAgIGJpdEluZGV4ID0gNztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByb3cgKz0gaW5jO1xuXG4gICAgICAgIGlmIChyb3cgPCAwIHx8IF9tb2R1bGVDb3VudCA8PSByb3cpIHtcbiAgICAgICAgICByb3cgLT0gaW5jO1xuICAgICAgICAgIGluYyA9IC1pbmM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY3JlYXRlQnl0ZXMgPSBmdW5jdGlvbihidWZmZXIsIHJzQmxvY2tzKSB7XG5cbiAgICBsZXQgb2Zmc2V0ID0gMDtcblxuICAgIGxldCBtYXhEY0NvdW50ID0gMDtcbiAgICBsZXQgbWF4RWNDb3VudCA9IDA7XG5cbiAgICBjb25zdCBkY2RhdGEgPSBuZXcgQXJyYXkocnNCbG9ja3MubGVuZ3RoKTtcbiAgICBjb25zdCBlY2RhdGEgPSBuZXcgQXJyYXkocnNCbG9ja3MubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByICs9IDEpIHtcblxuICAgICAgY29uc3QgZGNDb3VudCA9IHJzQmxvY2tzW3JdLmRhdGFDb3VudDtcbiAgICAgIGNvbnN0IGVjQ291bnQgPSByc0Jsb2Nrc1tyXS50b3RhbENvdW50IC0gZGNDb3VudDtcblxuICAgICAgbWF4RGNDb3VudCA9IE1hdGgubWF4KG1heERjQ291bnQsIGRjQ291bnQpO1xuICAgICAgbWF4RWNDb3VudCA9IE1hdGgubWF4KG1heEVjQ291bnQsIGVjQ291bnQpO1xuXG4gICAgICBkY2RhdGFbcl0gPSBuZXcgQXJyYXkoZGNDb3VudCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGNkYXRhW3JdLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGRjZGF0YVtyXVtpXSA9IDB4ZmYgJiBidWZmZXIuZ2V0QnVmZmVyKClbaSArIG9mZnNldF07XG4gICAgICB9XG4gICAgICBvZmZzZXQgKz0gZGNDb3VudDtcblxuICAgICAgY29uc3QgcnNQb2x5ID0gUVJVdGlsLmdldEVycm9yQ29ycmVjdFBvbHlub21pYWwoZWNDb3VudCk7XG4gICAgICBjb25zdCByYXdQb2x5ID0gcXJQb2x5bm9taWFsKGRjZGF0YVtyXSwgcnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG5cbiAgICAgIGNvbnN0IG1vZFBvbHkgPSByYXdQb2x5Lm1vZChyc1BvbHkpO1xuICAgICAgZWNkYXRhW3JdID0gbmV3IEFycmF5KHJzUG9seS5nZXRMZW5ndGgoKSAtIDEpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlY2RhdGFbcl0ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgbW9kSW5kZXggPSBpICsgbW9kUG9seS5nZXRMZW5ndGgoKSAtIGVjZGF0YVtyXS5sZW5ndGg7XG4gICAgICAgIGVjZGF0YVtyXVtpXSA9IChtb2RJbmRleCA+PSAwKT8gbW9kUG9seS5nZXRBdChtb2RJbmRleCkgOiAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0b3RhbENvZGVDb3VudCA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByc0Jsb2Nrcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdG90YWxDb2RlQ291bnQgKz0gcnNCbG9ja3NbaV0udG90YWxDb3VudDtcbiAgICB9XG5cbiAgICBjb25zdCBkYXRhID0gbmV3IEFycmF5KHRvdGFsQ29kZUNvdW50KTtcbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhEY0NvdW50OyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByICs9IDEpIHtcbiAgICAgICAgaWYgKGkgPCBkY2RhdGFbcl0ubGVuZ3RoKSB7XG4gICAgICAgICAgZGF0YVtpbmRleF0gPSBkY2RhdGFbcl1baV07XG4gICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4RWNDb3VudDsgaSArPSAxKSB7XG4gICAgICBmb3IgKGxldCByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgciArPSAxKSB7XG4gICAgICAgIGlmIChpIDwgZWNkYXRhW3JdLmxlbmd0aCkge1xuICAgICAgICAgIGRhdGFbaW5kZXhdID0gZWNkYXRhW3JdW2ldO1xuICAgICAgICAgIGluZGV4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfTtcblxuICBjb25zdCBjcmVhdGVEYXRhID0gZnVuY3Rpb24odHlwZU51bWJlciwgZXJyb3JDb3JyZWN0aW9uTGV2ZWwsIGRhdGFMaXN0KSB7XG5cbiAgICBjb25zdCByc0Jsb2NrcyA9IFFSUlNCbG9jay5nZXRSU0Jsb2Nrcyh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3Rpb25MZXZlbCk7XG5cbiAgICBjb25zdCBidWZmZXIgPSBxckJpdEJ1ZmZlcigpO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhTGlzdC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgZGF0YSA9IGRhdGFMaXN0W2ldO1xuICAgICAgYnVmZmVyLnB1dChkYXRhLmdldE1vZGUoKSwgNCk7XG4gICAgICBidWZmZXIucHV0KGRhdGEuZ2V0TGVuZ3RoKCksIFFSVXRpbC5nZXRMZW5ndGhJbkJpdHMoZGF0YS5nZXRNb2RlKCksIHR5cGVOdW1iZXIpICk7XG4gICAgICBkYXRhLndyaXRlKGJ1ZmZlcik7XG4gICAgfVxuXG4gICAgLy8gY2FsYyBudW0gbWF4IGRhdGEuXG4gICAgbGV0IHRvdGFsRGF0YUNvdW50ID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB0b3RhbERhdGFDb3VudCArPSByc0Jsb2Nrc1tpXS5kYXRhQ291bnQ7XG4gICAgfVxuXG4gICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA+IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgdGhyb3cgJ2NvZGUgbGVuZ3RoIG92ZXJmbG93LiAoJ1xuICAgICAgICArIGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKVxuICAgICAgICArICc+J1xuICAgICAgICArIHRvdGFsRGF0YUNvdW50ICogOFxuICAgICAgICArICcpJztcbiAgICB9XG5cbiAgICAvLyBlbmQgY29kZVxuICAgIGlmIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgKyA0IDw9IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgYnVmZmVyLnB1dCgwLCA0KTtcbiAgICB9XG5cbiAgICAvLyBwYWRkaW5nXG4gICAgd2hpbGUgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSAlIDggIT0gMCkge1xuICAgICAgYnVmZmVyLnB1dEJpdChmYWxzZSk7XG4gICAgfVxuXG4gICAgLy8gcGFkZGluZ1xuICAgIHdoaWxlICh0cnVlKSB7XG5cbiAgICAgIGlmIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgPj0gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgYnVmZmVyLnB1dChQQUQwLCA4KTtcblxuICAgICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA+PSB0b3RhbERhdGFDb3VudCAqIDgpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBidWZmZXIucHV0KFBBRDEsIDgpO1xuICAgIH1cblxuICAgIHJldHVybiBjcmVhdGVCeXRlcyhidWZmZXIsIHJzQmxvY2tzKTtcbiAgfTtcblxuICBfdGhpcy5hZGREYXRhID0gZnVuY3Rpb24oZGF0YSwgbW9kZSkge1xuXG4gICAgbW9kZSA9IG1vZGUgfHwgJ0J5dGUnO1xuXG4gICAgbGV0IG5ld0RhdGEgPSBudWxsO1xuXG4gICAgc3dpdGNoKG1vZGUpIHtcbiAgICBjYXNlICdOdW1lcmljJyA6XG4gICAgICBuZXdEYXRhID0gcXJOdW1iZXIoZGF0YSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdBbHBoYW51bWVyaWMnIDpcbiAgICAgIG5ld0RhdGEgPSBxckFscGhhTnVtKGRhdGEpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQnl0ZScgOlxuICAgICAgbmV3RGF0YSA9IHFyOEJpdEJ5dGUoZGF0YSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdLYW5qaScgOlxuICAgICAgbmV3RGF0YSA9IHFyS2FuamkoZGF0YSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0IDpcbiAgICAgIHRocm93ICdtb2RlOicgKyBtb2RlO1xuICAgIH1cblxuICAgIF9kYXRhTGlzdC5wdXNoKG5ld0RhdGEpO1xuICAgIF9kYXRhQ2FjaGUgPSBudWxsO1xuICB9O1xuXG4gIF90aGlzLmlzRGFyayA9IGZ1bmN0aW9uKHJvdywgY29sKSB7XG4gICAgaWYgKHJvdyA8IDAgfHwgX21vZHVsZUNvdW50IDw9IHJvdyB8fCBjb2wgPCAwIHx8IF9tb2R1bGVDb3VudCA8PSBjb2wpIHtcbiAgICAgIHRocm93IHJvdyArICcsJyArIGNvbDtcbiAgICB9XG4gICAgcmV0dXJuIF9tb2R1bGVzW3Jvd11bY29sXTtcbiAgfTtcblxuICBfdGhpcy5nZXRNb2R1bGVDb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfbW9kdWxlQ291bnQ7XG4gIH07XG5cbiAgX3RoaXMubWFrZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChfdHlwZU51bWJlciA8IDEpIHtcbiAgICAgIGxldCB0eXBlTnVtYmVyID0gMTtcblxuICAgICAgZm9yICg7IHR5cGVOdW1iZXIgPCA0MDsgdHlwZU51bWJlcisrKSB7XG4gICAgICAgIGNvbnN0IHJzQmxvY2tzID0gUVJSU0Jsb2NrLmdldFJTQmxvY2tzKHR5cGVOdW1iZXIsIF9lcnJvckNvcnJlY3Rpb25MZXZlbCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlciA9IHFyQml0QnVmZmVyKCk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfZGF0YUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gX2RhdGFMaXN0W2ldO1xuICAgICAgICAgIGJ1ZmZlci5wdXQoZGF0YS5nZXRNb2RlKCksIDQpO1xuICAgICAgICAgIGJ1ZmZlci5wdXQoZGF0YS5nZXRMZW5ndGgoKSwgUVJVdGlsLmdldExlbmd0aEluQml0cyhkYXRhLmdldE1vZGUoKSwgdHlwZU51bWJlcikgKTtcbiAgICAgICAgICBkYXRhLndyaXRlKGJ1ZmZlcik7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdG90YWxEYXRhQ291bnQgPSAwO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdG90YWxEYXRhQ291bnQgKz0gcnNCbG9ja3NbaV0uZGF0YUNvdW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA8PSB0b3RhbERhdGFDb3VudCAqIDgpIHtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBfdHlwZU51bWJlciA9IHR5cGVOdW1iZXI7XG4gICAgfVxuXG4gICAgbWFrZUltcGwoZmFsc2UsIGdldEJlc3RNYXNrUGF0dGVybigpICk7XG4gIH07XG5cbiAgX3RoaXMuY3JlYXRlVGFibGVUYWcgPSBmdW5jdGlvbihjZWxsU2l6ZSwgbWFyZ2luKSB7XG5cbiAgICBjZWxsU2l6ZSA9IGNlbGxTaXplIHx8IDI7XG4gICAgbWFyZ2luID0gKHR5cGVvZiBtYXJnaW4gPT0gJ3VuZGVmaW5lZCcpPyBjZWxsU2l6ZSAqIDQgOiBtYXJnaW47XG5cbiAgICBsZXQgcXJIdG1sID0gJyc7XG5cbiAgICBxckh0bWwgKz0gJzx0YWJsZSBzdHlsZT1cIic7XG4gICAgcXJIdG1sICs9ICcgYm9yZGVyLXdpZHRoOiAwcHg7IGJvcmRlci1zdHlsZTogbm9uZTsnO1xuICAgIHFySHRtbCArPSAnIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7JztcbiAgICBxckh0bWwgKz0gJyBwYWRkaW5nOiAwcHg7IG1hcmdpbjogJyArIG1hcmdpbiArICdweDsnO1xuICAgIHFySHRtbCArPSAnXCI+JztcbiAgICBxckh0bWwgKz0gJzx0Ym9keT4nO1xuXG4gICAgZm9yIChsZXQgciA9IDA7IHIgPCBfdGhpcy5nZXRNb2R1bGVDb3VudCgpOyByICs9IDEpIHtcblxuICAgICAgcXJIdG1sICs9ICc8dHI+JztcblxuICAgICAgZm9yIChsZXQgYyA9IDA7IGMgPCBfdGhpcy5nZXRNb2R1bGVDb3VudCgpOyBjICs9IDEpIHtcbiAgICAgICAgcXJIdG1sICs9ICc8dGQgc3R5bGU9XCInO1xuICAgICAgICBxckh0bWwgKz0gJyBib3JkZXItd2lkdGg6IDBweDsgYm9yZGVyLXN0eWxlOiBub25lOyc7XG4gICAgICAgIHFySHRtbCArPSAnIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7JztcbiAgICAgICAgcXJIdG1sICs9ICcgcGFkZGluZzogMHB4OyBtYXJnaW46IDBweDsnO1xuICAgICAgICBxckh0bWwgKz0gJyB3aWR0aDogJyArIGNlbGxTaXplICsgJ3B4Oyc7XG4gICAgICAgIHFySHRtbCArPSAnIGhlaWdodDogJyArIGNlbGxTaXplICsgJ3B4Oyc7XG4gICAgICAgIHFySHRtbCArPSAnIGJhY2tncm91bmQtY29sb3I6ICc7XG4gICAgICAgIHFySHRtbCArPSBfdGhpcy5pc0RhcmsociwgYyk/ICcjMDAwMDAwJyA6ICcjZmZmZmZmJztcbiAgICAgICAgcXJIdG1sICs9ICc7JztcbiAgICAgICAgcXJIdG1sICs9ICdcIi8+JztcbiAgICAgIH1cblxuICAgICAgcXJIdG1sICs9ICc8L3RyPic7XG4gICAgfVxuXG4gICAgcXJIdG1sICs9ICc8L3Rib2R5Pic7XG4gICAgcXJIdG1sICs9ICc8L3RhYmxlPic7XG5cbiAgICByZXR1cm4gcXJIdG1sO1xuICB9O1xuXG4gIF90aGlzLmNyZWF0ZVN2Z1RhZyA9IGZ1bmN0aW9uKGNlbGxTaXplLCBtYXJnaW4sIGFsdCwgdGl0bGUpIHtcblxuICAgIGxldCBvcHRzID0ge307XG4gICAgaWYgKHR5cGVvZiBhcmd1bWVudHNbMF0gPT0gJ29iamVjdCcpIHtcbiAgICAgIC8vIENhbGxlZCBieSBvcHRpb25zLlxuICAgICAgb3B0cyA9IGFyZ3VtZW50c1swXTtcbiAgICAgIC8vIG92ZXJ3cml0ZSBjZWxsU2l6ZSBhbmQgbWFyZ2luLlxuICAgICAgY2VsbFNpemUgPSBvcHRzLmNlbGxTaXplO1xuICAgICAgbWFyZ2luID0gb3B0cy5tYXJnaW47XG4gICAgICBhbHQgPSBvcHRzLmFsdDtcbiAgICAgIHRpdGxlID0gb3B0cy50aXRsZTtcbiAgICB9XG5cbiAgICBjZWxsU2l6ZSA9IGNlbGxTaXplIHx8IDI7XG4gICAgbWFyZ2luID0gKHR5cGVvZiBtYXJnaW4gPT0gJ3VuZGVmaW5lZCcpPyBjZWxsU2l6ZSAqIDQgOiBtYXJnaW47XG5cbiAgICAvLyBDb21wb3NlIGFsdCBwcm9wZXJ0eSBzdXJyb2dhdGVcbiAgICBhbHQgPSAodHlwZW9mIGFsdCA9PT0gJ3N0cmluZycpID8ge3RleHQ6IGFsdH0gOiBhbHQgfHwge307XG4gICAgYWx0LnRleHQgPSBhbHQudGV4dCB8fCBudWxsO1xuICAgIGFsdC5pZCA9IChhbHQudGV4dCkgPyBhbHQuaWQgfHwgJ3FyY29kZS1kZXNjcmlwdGlvbicgOiBudWxsO1xuXG4gICAgLy8gQ29tcG9zZSB0aXRsZSBwcm9wZXJ0eSBzdXJyb2dhdGVcbiAgICB0aXRsZSA9ICh0eXBlb2YgdGl0bGUgPT09ICdzdHJpbmcnKSA/IHt0ZXh0OiB0aXRsZX0gOiB0aXRsZSB8fCB7fTtcbiAgICB0aXRsZS50ZXh0ID0gdGl0bGUudGV4dCB8fCBudWxsO1xuICAgIHRpdGxlLmlkID0gKHRpdGxlLnRleHQpID8gdGl0bGUuaWQgfHwgJ3FyY29kZS10aXRsZScgOiBudWxsO1xuXG4gICAgY29uc3Qgc2l6ZSA9IF90aGlzLmdldE1vZHVsZUNvdW50KCkgKiBjZWxsU2l6ZSArIG1hcmdpbiAqIDI7XG4gICAgbGV0IGMsIG1jLCByLCBtciwgcXJTdmc9JycsIHJlY3Q7XG5cbiAgICByZWN0ID0gJ2wnICsgY2VsbFNpemUgKyAnLDAgMCwnICsgY2VsbFNpemUgK1xuICAgICAgJyAtJyArIGNlbGxTaXplICsgJywwIDAsLScgKyBjZWxsU2l6ZSArICd6ICc7XG5cbiAgICBxclN2ZyArPSAnPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiJztcbiAgICBxclN2ZyArPSAhb3B0cy5zY2FsYWJsZSA/ICcgd2lkdGg9XCInICsgc2l6ZSArICdweFwiIGhlaWdodD1cIicgKyBzaXplICsgJ3B4XCInIDogJyc7XG4gICAgcXJTdmcgKz0gJyB2aWV3Qm94PVwiMCAwICcgKyBzaXplICsgJyAnICsgc2l6ZSArICdcIiAnO1xuICAgIHFyU3ZnICs9ICcgcHJlc2VydmVBc3BlY3RSYXRpbz1cInhNaW5ZTWluIG1lZXRcIic7XG4gICAgcXJTdmcgKz0gKHRpdGxlLnRleHQgfHwgYWx0LnRleHQpID8gJyByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbGxlZGJ5PVwiJyArXG4gICAgICAgIGVzY2FwZVhtbChbdGl0bGUuaWQsIGFsdC5pZF0uam9pbignICcpLnRyaW0oKSApICsgJ1wiJyA6ICcnO1xuICAgIHFyU3ZnICs9ICc+JztcbiAgICBxclN2ZyArPSAodGl0bGUudGV4dCkgPyAnPHRpdGxlIGlkPVwiJyArIGVzY2FwZVhtbCh0aXRsZS5pZCkgKyAnXCI+JyArXG4gICAgICAgIGVzY2FwZVhtbCh0aXRsZS50ZXh0KSArICc8L3RpdGxlPicgOiAnJztcbiAgICBxclN2ZyArPSAoYWx0LnRleHQpID8gJzxkZXNjcmlwdGlvbiBpZD1cIicgKyBlc2NhcGVYbWwoYWx0LmlkKSArICdcIj4nICtcbiAgICAgICAgZXNjYXBlWG1sKGFsdC50ZXh0KSArICc8L2Rlc2NyaXB0aW9uPicgOiAnJztcbiAgICBxclN2ZyArPSAnPHJlY3Qgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIGZpbGw9XCJ3aGl0ZVwiIGN4PVwiMFwiIGN5PVwiMFwiLz4nO1xuICAgIHFyU3ZnICs9ICc8cGF0aCBkPVwiJztcblxuICAgIGZvciAociA9IDA7IHIgPCBfdGhpcy5nZXRNb2R1bGVDb3VudCgpOyByICs9IDEpIHtcbiAgICAgIG1yID0gciAqIGNlbGxTaXplICsgbWFyZ2luO1xuICAgICAgZm9yIChjID0gMDsgYyA8IF90aGlzLmdldE1vZHVsZUNvdW50KCk7IGMgKz0gMSkge1xuICAgICAgICBpZiAoX3RoaXMuaXNEYXJrKHIsIGMpICkge1xuICAgICAgICAgIG1jID0gYypjZWxsU2l6ZSttYXJnaW47XG4gICAgICAgICAgcXJTdmcgKz0gJ00nICsgbWMgKyAnLCcgKyBtciArIHJlY3Q7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBxclN2ZyArPSAnXCIgc3Ryb2tlPVwidHJhbnNwYXJlbnRcIiBmaWxsPVwiYmxhY2tcIi8+JztcbiAgICBxclN2ZyArPSAnPC9zdmc+JztcblxuICAgIHJldHVybiBxclN2ZztcbiAgfTtcblxuICBfdGhpcy5jcmVhdGVEYXRhVVJMID0gZnVuY3Rpb24oY2VsbFNpemUsIG1hcmdpbikge1xuXG4gICAgY2VsbFNpemUgPSBjZWxsU2l6ZSB8fCAyO1xuICAgIG1hcmdpbiA9ICh0eXBlb2YgbWFyZ2luID09ICd1bmRlZmluZWQnKT8gY2VsbFNpemUgKiA0IDogbWFyZ2luO1xuXG4gICAgY29uc3Qgc2l6ZSA9IF90aGlzLmdldE1vZHVsZUNvdW50KCkgKiBjZWxsU2l6ZSArIG1hcmdpbiAqIDI7XG4gICAgY29uc3QgbWluID0gbWFyZ2luO1xuICAgIGNvbnN0IG1heCA9IHNpemUgLSBtYXJnaW47XG5cbiAgICByZXR1cm4gY3JlYXRlRGF0YVVSTChzaXplLCBzaXplLCBmdW5jdGlvbih4LCB5KSB7XG4gICAgICBpZiAobWluIDw9IHggJiYgeCA8IG1heCAmJiBtaW4gPD0geSAmJiB5IDwgbWF4KSB7XG4gICAgICAgIGNvbnN0IGMgPSBNYXRoLmZsb29yKCAoeCAtIG1pbikgLyBjZWxsU2l6ZSk7XG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLmZsb29yKCAoeSAtIG1pbikgLyBjZWxsU2l6ZSk7XG4gICAgICAgIHJldHVybiBfdGhpcy5pc0RhcmsociwgYyk/IDAgOiAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgICB9XG4gICAgfSApO1xuICB9O1xuXG4gIF90aGlzLmNyZWF0ZUltZ1RhZyA9IGZ1bmN0aW9uKGNlbGxTaXplLCBtYXJnaW4sIGFsdCkge1xuXG4gICAgY2VsbFNpemUgPSBjZWxsU2l6ZSB8fCAyO1xuICAgIG1hcmdpbiA9ICh0eXBlb2YgbWFyZ2luID09ICd1bmRlZmluZWQnKT8gY2VsbFNpemUgKiA0IDogbWFyZ2luO1xuXG4gICAgY29uc3Qgc2l6ZSA9IF90aGlzLmdldE1vZHVsZUNvdW50KCkgKiBjZWxsU2l6ZSArIG1hcmdpbiAqIDI7XG5cbiAgICBsZXQgaW1nID0gJyc7XG4gICAgaW1nICs9ICc8aW1nJztcbiAgICBpbWcgKz0gJ1xcdTAwMjBzcmM9XCInO1xuICAgIGltZyArPSBfdGhpcy5jcmVhdGVEYXRhVVJMKGNlbGxTaXplLCBtYXJnaW4pO1xuICAgIGltZyArPSAnXCInO1xuICAgIGltZyArPSAnXFx1MDAyMHdpZHRoPVwiJztcbiAgICBpbWcgKz0gc2l6ZTtcbiAgICBpbWcgKz0gJ1wiJztcbiAgICBpbWcgKz0gJ1xcdTAwMjBoZWlnaHQ9XCInO1xuICAgIGltZyArPSBzaXplO1xuICAgIGltZyArPSAnXCInO1xuICAgIGlmIChhbHQpIHtcbiAgICAgIGltZyArPSAnXFx1MDAyMGFsdD1cIic7XG4gICAgICBpbWcgKz0gZXNjYXBlWG1sKGFsdCk7XG4gICAgICBpbWcgKz0gJ1wiJztcbiAgICB9XG4gICAgaW1nICs9ICcvPic7XG5cbiAgICByZXR1cm4gaW1nO1xuICB9O1xuXG4gIGNvbnN0IGVzY2FwZVhtbCA9IGZ1bmN0aW9uKHMpIHtcbiAgICBsZXQgZXNjYXBlZCA9ICcnO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgYyA9IHMuY2hhckF0KGkpO1xuICAgICAgc3dpdGNoKGMpIHtcbiAgICAgIGNhc2UgJzwnOiBlc2NhcGVkICs9ICcmbHQ7JzsgYnJlYWs7XG4gICAgICBjYXNlICc+JzogZXNjYXBlZCArPSAnJmd0Oyc7IGJyZWFrO1xuICAgICAgY2FzZSAnJic6IGVzY2FwZWQgKz0gJyZhbXA7JzsgYnJlYWs7XG4gICAgICBjYXNlICdcIic6IGVzY2FwZWQgKz0gJyZxdW90Oyc7IGJyZWFrO1xuICAgICAgZGVmYXVsdCA6IGVzY2FwZWQgKz0gYzsgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlc2NhcGVkO1xuICB9O1xuXG4gIGNvbnN0IF9jcmVhdGVIYWxmQVNDSUkgPSBmdW5jdGlvbihtYXJnaW4pIHtcbiAgICBjb25zdCBjZWxsU2l6ZSA9IDE7XG4gICAgbWFyZ2luID0gKHR5cGVvZiBtYXJnaW4gPT0gJ3VuZGVmaW5lZCcpPyBjZWxsU2l6ZSAqIDIgOiBtYXJnaW47XG5cbiAgICBjb25zdCBzaXplID0gX3RoaXMuZ2V0TW9kdWxlQ291bnQoKSAqIGNlbGxTaXplICsgbWFyZ2luICogMjtcbiAgICBjb25zdCBtaW4gPSBtYXJnaW47XG4gICAgY29uc3QgbWF4ID0gc2l6ZSAtIG1hcmdpbjtcblxuICAgIGxldCB5LCB4LCByMSwgcjIsIHA7XG5cbiAgICBjb25zdCBibG9ja3MgPSB7XG4gICAgICAnXHUyNTg4XHUyNTg4JzogJ1x1MjU4OCcsXG4gICAgICAnXHUyNTg4ICc6ICdcdTI1ODAnLFxuICAgICAgJyBcdTI1ODgnOiAnXHUyNTg0JyxcbiAgICAgICcgICc6ICcgJ1xuICAgIH07XG5cbiAgICBjb25zdCBibG9ja3NMYXN0TGluZU5vTWFyZ2luID0ge1xuICAgICAgJ1x1MjU4OFx1MjU4OCc6ICdcdTI1ODAnLFxuICAgICAgJ1x1MjU4OCAnOiAnXHUyNTgwJyxcbiAgICAgICcgXHUyNTg4JzogJyAnLFxuICAgICAgJyAgJzogJyAnXG4gICAgfTtcblxuICAgIGxldCBhc2NpaSA9ICcnO1xuICAgIGZvciAoeSA9IDA7IHkgPCBzaXplOyB5ICs9IDIpIHtcbiAgICAgIHIxID0gTWF0aC5mbG9vcigoeSAtIG1pbikgLyBjZWxsU2l6ZSk7XG4gICAgICByMiA9IE1hdGguZmxvb3IoKHkgKyAxIC0gbWluKSAvIGNlbGxTaXplKTtcbiAgICAgIGZvciAoeCA9IDA7IHggPCBzaXplOyB4ICs9IDEpIHtcbiAgICAgICAgcCA9ICdcdTI1ODgnO1xuXG4gICAgICAgIGlmIChtaW4gPD0geCAmJiB4IDwgbWF4ICYmIG1pbiA8PSB5ICYmIHkgPCBtYXggJiYgX3RoaXMuaXNEYXJrKHIxLCBNYXRoLmZsb29yKCh4IC0gbWluKSAvIGNlbGxTaXplKSkpIHtcbiAgICAgICAgICBwID0gJyAnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1pbiA8PSB4ICYmIHggPCBtYXggJiYgbWluIDw9IHkrMSAmJiB5KzEgPCBtYXggJiYgX3RoaXMuaXNEYXJrKHIyLCBNYXRoLmZsb29yKCh4IC0gbWluKSAvIGNlbGxTaXplKSkpIHtcbiAgICAgICAgICBwICs9ICcgJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBwICs9ICdcdTI1ODgnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gT3V0cHV0IDIgY2hhcmFjdGVycyBwZXIgcGl4ZWwsIHRvIGNyZWF0ZSBmdWxsIHNxdWFyZS4gMSBjaGFyYWN0ZXIgcGVyIHBpeGVscyBnaXZlcyBvbmx5IGhhbGYgd2lkdGggb2Ygc3F1YXJlLlxuICAgICAgICBhc2NpaSArPSAobWFyZ2luIDwgMSAmJiB5KzEgPj0gbWF4KSA/IGJsb2Nrc0xhc3RMaW5lTm9NYXJnaW5bcF0gOiBibG9ja3NbcF07XG4gICAgICB9XG5cbiAgICAgIGFzY2lpICs9ICdcXG4nO1xuICAgIH1cblxuICAgIGlmIChzaXplICUgMiAmJiBtYXJnaW4gPiAwKSB7XG4gICAgICByZXR1cm4gYXNjaWkuc3Vic3RyaW5nKDAsIGFzY2lpLmxlbmd0aCAtIHNpemUgLSAxKSArIEFycmF5KHNpemUrMSkuam9pbignXHUyNTgwJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzY2lpLnN1YnN0cmluZygwLCBhc2NpaS5sZW5ndGgtMSk7XG4gIH07XG5cbiAgX3RoaXMuY3JlYXRlQVNDSUkgPSBmdW5jdGlvbihjZWxsU2l6ZSwgbWFyZ2luKSB7XG4gICAgY2VsbFNpemUgPSBjZWxsU2l6ZSB8fCAxO1xuXG4gICAgaWYgKGNlbGxTaXplIDwgMikge1xuICAgICAgcmV0dXJuIF9jcmVhdGVIYWxmQVNDSUkobWFyZ2luKTtcbiAgICB9XG5cbiAgICBjZWxsU2l6ZSAtPSAxO1xuICAgIG1hcmdpbiA9ICh0eXBlb2YgbWFyZ2luID09ICd1bmRlZmluZWQnKT8gY2VsbFNpemUgKiAyIDogbWFyZ2luO1xuXG4gICAgY29uc3Qgc2l6ZSA9IF90aGlzLmdldE1vZHVsZUNvdW50KCkgKiBjZWxsU2l6ZSArIG1hcmdpbiAqIDI7XG4gICAgY29uc3QgbWluID0gbWFyZ2luO1xuICAgIGNvbnN0IG1heCA9IHNpemUgLSBtYXJnaW47XG5cbiAgICBsZXQgeSwgeCwgciwgcDtcblxuICAgIGNvbnN0IHdoaXRlID0gQXJyYXkoY2VsbFNpemUrMSkuam9pbignXHUyNTg4XHUyNTg4Jyk7XG4gICAgY29uc3QgYmxhY2sgPSBBcnJheShjZWxsU2l6ZSsxKS5qb2luKCcgICcpO1xuXG4gICAgbGV0IGFzY2lpID0gJyc7XG4gICAgbGV0IGxpbmUgPSAnJztcbiAgICBmb3IgKHkgPSAwOyB5IDwgc2l6ZTsgeSArPSAxKSB7XG4gICAgICByID0gTWF0aC5mbG9vciggKHkgLSBtaW4pIC8gY2VsbFNpemUpO1xuICAgICAgbGluZSA9ICcnO1xuICAgICAgZm9yICh4ID0gMDsgeCA8IHNpemU7IHggKz0gMSkge1xuICAgICAgICBwID0gMTtcblxuICAgICAgICBpZiAobWluIDw9IHggJiYgeCA8IG1heCAmJiBtaW4gPD0geSAmJiB5IDwgbWF4ICYmIF90aGlzLmlzRGFyayhyLCBNYXRoLmZsb29yKCh4IC0gbWluKSAvIGNlbGxTaXplKSkpIHtcbiAgICAgICAgICBwID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE91dHB1dCAyIGNoYXJhY3RlcnMgcGVyIHBpeGVsLCB0byBjcmVhdGUgZnVsbCBzcXVhcmUuIDEgY2hhcmFjdGVyIHBlciBwaXhlbHMgZ2l2ZXMgb25seSBoYWxmIHdpZHRoIG9mIHNxdWFyZS5cbiAgICAgICAgbGluZSArPSBwID8gd2hpdGUgOiBibGFjaztcbiAgICAgIH1cblxuICAgICAgZm9yIChyID0gMDsgciA8IGNlbGxTaXplOyByICs9IDEpIHtcbiAgICAgICAgYXNjaWkgKz0gbGluZSArICdcXG4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBhc2NpaS5zdWJzdHJpbmcoMCwgYXNjaWkubGVuZ3RoLTEpO1xuICB9O1xuXG4gIF90aGlzLnJlbmRlclRvMmRDb250ZXh0ID0gZnVuY3Rpb24oY29udGV4dCwgY2VsbFNpemUpIHtcbiAgICBjZWxsU2l6ZSA9IGNlbGxTaXplIHx8IDI7XG4gICAgY29uc3QgbGVuZ3RoID0gX3RoaXMuZ2V0TW9kdWxlQ291bnQoKTtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBsZW5ndGg7IHJvdysrKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBsZW5ndGg7IGNvbCsrKSB7XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gX3RoaXMuaXNEYXJrKHJvdywgY29sKSA/ICdibGFjaycgOiAnd2hpdGUnO1xuICAgICAgICBjb250ZXh0LmZpbGxSZWN0KGNvbCAqIGNlbGxTaXplLCByb3cgKiBjZWxsU2l6ZSwgY2VsbFNpemUsIGNlbGxTaXplKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gX3RoaXM7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gcXJjb2RlLnN0cmluZ1RvQnl0ZXNcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnFyY29kZS5zdHJpbmdUb0J5dGVzID0gZnVuY3Rpb24ocykge1xuICBjb25zdCBieXRlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBjID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIGJ5dGVzLnB1c2goYyAmIDB4ZmYpO1xuICB9XG4gIHJldHVybiBieXRlcztcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBxcmNvZGUuY3JlYXRlU3RyaW5nVG9CeXRlc1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBAcGFyYW0gdW5pY29kZURhdGEgYmFzZTY0IHN0cmluZyBvZiBieXRlIGFycmF5LlxuICogWzE2Yml0IFVuaWNvZGVdLFsxNmJpdCBCeXRlc10sIC4uLlxuICogQHBhcmFtIG51bUNoYXJzXG4gKi9cbnFyY29kZS5jcmVhdGVTdHJpbmdUb0J5dGVzID0gZnVuY3Rpb24odW5pY29kZURhdGEsIG51bUNoYXJzKSB7XG5cbiAgLy8gY3JlYXRlIGNvbnZlcnNpb24gbWFwLlxuXG4gIGNvbnN0IHVuaWNvZGVNYXAgPSBmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IGJpbiA9IGJhc2U2NERlY29kZUlucHV0U3RyZWFtKHVuaWNvZGVEYXRhKTtcbiAgICBjb25zdCByZWFkID0gZnVuY3Rpb24oKSB7XG4gICAgICBjb25zdCBiID0gYmluLnJlYWQoKTtcbiAgICAgIGlmIChiID09IC0xKSB0aHJvdyAnZW9mJztcbiAgICAgIHJldHVybiBiO1xuICAgIH07XG5cbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGNvbnN0IHVuaWNvZGVNYXAgPSB7fTtcbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgY29uc3QgYjAgPSBiaW4ucmVhZCgpO1xuICAgICAgaWYgKGIwID09IC0xKSBicmVhaztcbiAgICAgIGNvbnN0IGIxID0gcmVhZCgpO1xuICAgICAgY29uc3QgYjIgPSByZWFkKCk7XG4gICAgICBjb25zdCBiMyA9IHJlYWQoKTtcbiAgICAgIGNvbnN0IGsgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCAoYjAgPDwgOCkgfCBiMSk7XG4gICAgICBjb25zdCB2ID0gKGIyIDw8IDgpIHwgYjM7XG4gICAgICB1bmljb2RlTWFwW2tdID0gdjtcbiAgICAgIGNvdW50ICs9IDE7XG4gICAgfVxuICAgIGlmIChjb3VudCAhPSBudW1DaGFycykge1xuICAgICAgdGhyb3cgY291bnQgKyAnICE9ICcgKyBudW1DaGFycztcbiAgICB9XG5cbiAgICByZXR1cm4gdW5pY29kZU1hcDtcbiAgfSgpO1xuXG4gIGNvbnN0IHVua25vd25DaGFyID0gJz8nLmNoYXJDb2RlQXQoMCk7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHMpIHtcbiAgICBjb25zdCBieXRlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3QgYyA9IHMuY2hhckNvZGVBdChpKTtcbiAgICAgIGlmIChjIDwgMTI4KSB7XG4gICAgICAgIGJ5dGVzLnB1c2goYyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBiID0gdW5pY29kZU1hcFtzLmNoYXJBdChpKV07XG4gICAgICAgIGlmICh0eXBlb2YgYiA9PSAnbnVtYmVyJykge1xuICAgICAgICAgIGlmICggKGIgJiAweGZmKSA9PSBiKSB7XG4gICAgICAgICAgICAvLyAxYnl0ZVxuICAgICAgICAgICAgYnl0ZXMucHVzaChiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gMmJ5dGVzXG4gICAgICAgICAgICBieXRlcy5wdXNoKGIgPj4+IDgpO1xuICAgICAgICAgICAgYnl0ZXMucHVzaChiICYgMHhmZik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ5dGVzLnB1c2godW5rbm93bkNoYXIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBieXRlcztcbiAgfTtcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBRUk1vZGVcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IFFSTW9kZSA9IHtcbiAgTU9ERV9OVU1CRVIgOiAgICAxIDw8IDAsXG4gIE1PREVfQUxQSEFfTlVNIDogMSA8PCAxLFxuICBNT0RFXzhCSVRfQllURSA6IDEgPDwgMixcbiAgTU9ERV9LQU5KSSA6ICAgICAxIDw8IDNcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBRUkVycm9yQ29ycmVjdGlvbkxldmVsXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBRUkVycm9yQ29ycmVjdGlvbkxldmVsID0ge1xuICBMIDogMSxcbiAgTSA6IDAsXG4gIFEgOiAzLFxuICBIIDogMlxufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFFSTWFza1BhdHRlcm5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IFFSTWFza1BhdHRlcm4gPSB7XG4gIFBBVFRFUk4wMDAgOiAwLFxuICBQQVRURVJOMDAxIDogMSxcbiAgUEFUVEVSTjAxMCA6IDIsXG4gIFBBVFRFUk4wMTEgOiAzLFxuICBQQVRURVJOMTAwIDogNCxcbiAgUEFUVEVSTjEwMSA6IDUsXG4gIFBBVFRFUk4xMTAgOiA2LFxuICBQQVRURVJOMTExIDogN1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFFSVXRpbFxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgUVJVdGlsID0gZnVuY3Rpb24oKSB7XG5cbiAgY29uc3QgUEFUVEVSTl9QT1NJVElPTl9UQUJMRSA9IFtcbiAgICBbXSxcbiAgICBbNiwgMThdLFxuICAgIFs2LCAyMl0sXG4gICAgWzYsIDI2XSxcbiAgICBbNiwgMzBdLFxuICAgIFs2LCAzNF0sXG4gICAgWzYsIDIyLCAzOF0sXG4gICAgWzYsIDI0LCA0Ml0sXG4gICAgWzYsIDI2LCA0Nl0sXG4gICAgWzYsIDI4LCA1MF0sXG4gICAgWzYsIDMwLCA1NF0sXG4gICAgWzYsIDMyLCA1OF0sXG4gICAgWzYsIDM0LCA2Ml0sXG4gICAgWzYsIDI2LCA0NiwgNjZdLFxuICAgIFs2LCAyNiwgNDgsIDcwXSxcbiAgICBbNiwgMjYsIDUwLCA3NF0sXG4gICAgWzYsIDMwLCA1NCwgNzhdLFxuICAgIFs2LCAzMCwgNTYsIDgyXSxcbiAgICBbNiwgMzAsIDU4LCA4Nl0sXG4gICAgWzYsIDM0LCA2MiwgOTBdLFxuICAgIFs2LCAyOCwgNTAsIDcyLCA5NF0sXG4gICAgWzYsIDI2LCA1MCwgNzQsIDk4XSxcbiAgICBbNiwgMzAsIDU0LCA3OCwgMTAyXSxcbiAgICBbNiwgMjgsIDU0LCA4MCwgMTA2XSxcbiAgICBbNiwgMzIsIDU4LCA4NCwgMTEwXSxcbiAgICBbNiwgMzAsIDU4LCA4NiwgMTE0XSxcbiAgICBbNiwgMzQsIDYyLCA5MCwgMTE4XSxcbiAgICBbNiwgMjYsIDUwLCA3NCwgOTgsIDEyMl0sXG4gICAgWzYsIDMwLCA1NCwgNzgsIDEwMiwgMTI2XSxcbiAgICBbNiwgMjYsIDUyLCA3OCwgMTA0LCAxMzBdLFxuICAgIFs2LCAzMCwgNTYsIDgyLCAxMDgsIDEzNF0sXG4gICAgWzYsIDM0LCA2MCwgODYsIDExMiwgMTM4XSxcbiAgICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDJdLFxuICAgIFs2LCAzNCwgNjIsIDkwLCAxMTgsIDE0Nl0sXG4gICAgWzYsIDMwLCA1NCwgNzgsIDEwMiwgMTI2LCAxNTBdLFxuICAgIFs2LCAyNCwgNTAsIDc2LCAxMDIsIDEyOCwgMTU0XSxcbiAgICBbNiwgMjgsIDU0LCA4MCwgMTA2LCAxMzIsIDE1OF0sXG4gICAgWzYsIDMyLCA1OCwgODQsIDExMCwgMTM2LCAxNjJdLFxuICAgIFs2LCAyNiwgNTQsIDgyLCAxMTAsIDEzOCwgMTY2XSxcbiAgICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDIsIDE3MF1cbiAgXTtcbiAgY29uc3QgRzE1ID0gKDEgPDwgMTApIHwgKDEgPDwgOCkgfCAoMSA8PCA1KSB8ICgxIDw8IDQpIHwgKDEgPDwgMikgfCAoMSA8PCAxKSB8ICgxIDw8IDApO1xuICBjb25zdCBHMTggPSAoMSA8PCAxMikgfCAoMSA8PCAxMSkgfCAoMSA8PCAxMCkgfCAoMSA8PCA5KSB8ICgxIDw8IDgpIHwgKDEgPDwgNSkgfCAoMSA8PCAyKSB8ICgxIDw8IDApO1xuICBjb25zdCBHMTVfTUFTSyA9ICgxIDw8IDE0KSB8ICgxIDw8IDEyKSB8ICgxIDw8IDEwKSB8ICgxIDw8IDQpIHwgKDEgPDwgMSk7XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBjb25zdCBnZXRCQ0hEaWdpdCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBsZXQgZGlnaXQgPSAwO1xuICAgIHdoaWxlIChkYXRhICE9IDApIHtcbiAgICAgIGRpZ2l0ICs9IDE7XG4gICAgICBkYXRhID4+Pj0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGRpZ2l0O1xuICB9O1xuXG4gIF90aGlzLmdldEJDSFR5cGVJbmZvID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBkID0gZGF0YSA8PCAxMDtcbiAgICB3aGlsZSAoZ2V0QkNIRGlnaXQoZCkgLSBnZXRCQ0hEaWdpdChHMTUpID49IDApIHtcbiAgICAgIGQgXj0gKEcxNSA8PCAoZ2V0QkNIRGlnaXQoZCkgLSBnZXRCQ0hEaWdpdChHMTUpICkgKTtcbiAgICB9XG4gICAgcmV0dXJuICggKGRhdGEgPDwgMTApIHwgZCkgXiBHMTVfTUFTSztcbiAgfTtcblxuICBfdGhpcy5nZXRCQ0hUeXBlTnVtYmVyID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGxldCBkID0gZGF0YSA8PCAxMjtcbiAgICB3aGlsZSAoZ2V0QkNIRGlnaXQoZCkgLSBnZXRCQ0hEaWdpdChHMTgpID49IDApIHtcbiAgICAgIGQgXj0gKEcxOCA8PCAoZ2V0QkNIRGlnaXQoZCkgLSBnZXRCQ0hEaWdpdChHMTgpICkgKTtcbiAgICB9XG4gICAgcmV0dXJuIChkYXRhIDw8IDEyKSB8IGQ7XG4gIH07XG5cbiAgX3RoaXMuZ2V0UGF0dGVyblBvc2l0aW9uID0gZnVuY3Rpb24odHlwZU51bWJlcikge1xuICAgIHJldHVybiBQQVRURVJOX1BPU0lUSU9OX1RBQkxFW3R5cGVOdW1iZXIgLSAxXTtcbiAgfTtcblxuICBfdGhpcy5nZXRNYXNrRnVuY3Rpb24gPSBmdW5jdGlvbihtYXNrUGF0dGVybikge1xuXG4gICAgc3dpdGNoIChtYXNrUGF0dGVybikge1xuXG4gICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMDAgOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuIChpICsgaikgJSAyID09IDA7IH07XG4gICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMDEgOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuIGkgJSAyID09IDA7IH07XG4gICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMTAgOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuIGogJSAzID09IDA7IH07XG4gICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMTEgOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuIChpICsgaikgJSAzID09IDA7IH07XG4gICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMDAgOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuIChNYXRoLmZsb29yKGkgLyAyKSArIE1hdGguZmxvb3IoaiAvIDMpICkgJSAyID09IDA7IH07XG4gICAgY2FzZSBRUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMDEgOlxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGksIGopIHsgcmV0dXJuIChpICogaikgJSAyICsgKGkgKiBqKSAlIDMgPT0gMDsgfTtcbiAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjExMCA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24oaSwgaikgeyByZXR1cm4gKCAoaSAqIGopICUgMiArIChpICogaikgJSAzKSAlIDIgPT0gMDsgfTtcbiAgICBjYXNlIFFSTWFza1BhdHRlcm4uUEFUVEVSTjExMSA6XG4gICAgICByZXR1cm4gZnVuY3Rpb24oaSwgaikgeyByZXR1cm4gKCAoaSAqIGopICUgMyArIChpICsgaikgJSAyKSAlIDIgPT0gMDsgfTtcblxuICAgIGRlZmF1bHQgOlxuICAgICAgdGhyb3cgJ2JhZCBtYXNrUGF0dGVybjonICsgbWFza1BhdHRlcm47XG4gICAgfVxuICB9O1xuXG4gIF90aGlzLmdldEVycm9yQ29ycmVjdFBvbHlub21pYWwgPSBmdW5jdGlvbihlcnJvckNvcnJlY3RMZW5ndGgpIHtcbiAgICBsZXQgYSA9IHFyUG9seW5vbWlhbChbMV0sIDApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZXJyb3JDb3JyZWN0TGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGEgPSBhLm11bHRpcGx5KHFyUG9seW5vbWlhbChbMSwgUVJNYXRoLmdleHAoaSldLCAwKSApO1xuICAgIH1cbiAgICByZXR1cm4gYTtcbiAgfTtcblxuICBfdGhpcy5nZXRMZW5ndGhJbkJpdHMgPSBmdW5jdGlvbihtb2RlLCB0eXBlKSB7XG5cbiAgICBpZiAoMSA8PSB0eXBlICYmIHR5cGUgPCAxMCkge1xuXG4gICAgICAvLyAxIC0gOVxuXG4gICAgICBzd2l0Y2gobW9kZSkge1xuICAgICAgY2FzZSBRUk1vZGUuTU9ERV9OVU1CRVIgICAgOiByZXR1cm4gMTA7XG4gICAgICBjYXNlIFFSTW9kZS5NT0RFX0FMUEhBX05VTSA6IHJldHVybiA5O1xuICAgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEUgOiByZXR1cm4gODtcbiAgICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkkgICAgIDogcmV0dXJuIDg7XG4gICAgICBkZWZhdWx0IDpcbiAgICAgICAgdGhyb3cgJ21vZGU6JyArIG1vZGU7XG4gICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKHR5cGUgPCAyNykge1xuXG4gICAgICAvLyAxMCAtIDI2XG5cbiAgICAgIHN3aXRjaChtb2RlKSB7XG4gICAgICBjYXNlIFFSTW9kZS5NT0RFX05VTUJFUiAgICA6IHJldHVybiAxMjtcbiAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNIDogcmV0dXJuIDExO1xuICAgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEUgOiByZXR1cm4gMTY7XG4gICAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJICAgICA6IHJldHVybiAxMDtcbiAgICAgIGRlZmF1bHQgOlxuICAgICAgICB0aHJvdyAnbW9kZTonICsgbW9kZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAodHlwZSA8IDQxKSB7XG5cbiAgICAgIC8vIDI3IC0gNDBcblxuICAgICAgc3dpdGNoKG1vZGUpIHtcbiAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSICAgIDogcmV0dXJuIDE0O1xuICAgICAgY2FzZSBRUk1vZGUuTU9ERV9BTFBIQV9OVU0gOiByZXR1cm4gMTM7XG4gICAgICBjYXNlIFFSTW9kZS5NT0RFXzhCSVRfQllURSA6IHJldHVybiAxNjtcbiAgICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkkgICAgIDogcmV0dXJuIDEyO1xuICAgICAgZGVmYXVsdCA6XG4gICAgICAgIHRocm93ICdtb2RlOicgKyBtb2RlO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93ICd0eXBlOicgKyB0eXBlO1xuICAgIH1cbiAgfTtcblxuICBfdGhpcy5nZXRMb3N0UG9pbnQgPSBmdW5jdGlvbihxcmNvZGUpIHtcblxuICAgIGNvbnN0IG1vZHVsZUNvdW50ID0gcXJjb2RlLmdldE1vZHVsZUNvdW50KCk7XG5cbiAgICBsZXQgbG9zdFBvaW50ID0gMDtcblxuICAgIC8vIExFVkVMMVxuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sICs9IDEpIHtcblxuICAgICAgICBsZXQgc2FtZUNvdW50ID0gMDtcbiAgICAgICAgY29uc3QgZGFyayA9IHFyY29kZS5pc0Rhcmsocm93LCBjb2wpO1xuXG4gICAgICAgIGZvciAobGV0IHIgPSAtMTsgciA8PSAxOyByICs9IDEpIHtcblxuICAgICAgICAgIGlmIChyb3cgKyByIDwgMCB8fCBtb2R1bGVDb3VudCA8PSByb3cgKyByKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmb3IgKGxldCBjID0gLTE7IGMgPD0gMTsgYyArPSAxKSB7XG5cbiAgICAgICAgICAgIGlmIChjb2wgKyBjIDwgMCB8fCBtb2R1bGVDb3VudCA8PSBjb2wgKyBjKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAociA9PSAwICYmIGMgPT0gMCkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRhcmsgPT0gcXJjb2RlLmlzRGFyayhyb3cgKyByLCBjb2wgKyBjKSApIHtcbiAgICAgICAgICAgICAgc2FtZUNvdW50ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNhbWVDb3VudCA+IDUpIHtcbiAgICAgICAgICBsb3N0UG9pbnQgKz0gKDMgKyBzYW1lQ291bnQgLSA1KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBMRVZFTDJcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50IC0gMTsgcm93ICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50IC0gMTsgY29sICs9IDEpIHtcbiAgICAgICAgbGV0IGNvdW50ID0gMDtcbiAgICAgICAgaWYgKHFyY29kZS5pc0Rhcmsocm93LCBjb2wpICkgY291bnQgKz0gMTtcbiAgICAgICAgaWYgKHFyY29kZS5pc0Rhcmsocm93ICsgMSwgY29sKSApIGNvdW50ICs9IDE7XG4gICAgICAgIGlmIChxcmNvZGUuaXNEYXJrKHJvdywgY29sICsgMSkgKSBjb3VudCArPSAxO1xuICAgICAgICBpZiAocXJjb2RlLmlzRGFyayhyb3cgKyAxLCBjb2wgKyAxKSApIGNvdW50ICs9IDE7XG4gICAgICAgIGlmIChjb3VudCA9PSAwIHx8IGNvdW50ID09IDQpIHtcbiAgICAgICAgICBsb3N0UG9pbnQgKz0gMztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExFVkVMM1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdyArPSAxKSB7XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudCAtIDY7IGNvbCArPSAxKSB7XG4gICAgICAgIGlmIChxcmNvZGUuaXNEYXJrKHJvdywgY29sKVxuICAgICAgICAgICAgJiYgIXFyY29kZS5pc0Rhcmsocm93LCBjb2wgKyAxKVxuICAgICAgICAgICAgJiYgIHFyY29kZS5pc0Rhcmsocm93LCBjb2wgKyAyKVxuICAgICAgICAgICAgJiYgIHFyY29kZS5pc0Rhcmsocm93LCBjb2wgKyAzKVxuICAgICAgICAgICAgJiYgIHFyY29kZS5pc0Rhcmsocm93LCBjb2wgKyA0KVxuICAgICAgICAgICAgJiYgIXFyY29kZS5pc0Rhcmsocm93LCBjb2wgKyA1KVxuICAgICAgICAgICAgJiYgIHFyY29kZS5pc0Rhcmsocm93LCBjb2wgKyA2KSApIHtcbiAgICAgICAgICBsb3N0UG9pbnQgKz0gNDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sICs9IDEpIHtcbiAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50IC0gNjsgcm93ICs9IDEpIHtcbiAgICAgICAgaWYgKHFyY29kZS5pc0Rhcmsocm93LCBjb2wpXG4gICAgICAgICAgICAmJiAhcXJjb2RlLmlzRGFyayhyb3cgKyAxLCBjb2wpXG4gICAgICAgICAgICAmJiAgcXJjb2RlLmlzRGFyayhyb3cgKyAyLCBjb2wpXG4gICAgICAgICAgICAmJiAgcXJjb2RlLmlzRGFyayhyb3cgKyAzLCBjb2wpXG4gICAgICAgICAgICAmJiAgcXJjb2RlLmlzRGFyayhyb3cgKyA0LCBjb2wpXG4gICAgICAgICAgICAmJiAhcXJjb2RlLmlzRGFyayhyb3cgKyA1LCBjb2wpXG4gICAgICAgICAgICAmJiAgcXJjb2RlLmlzRGFyayhyb3cgKyA2LCBjb2wpICkge1xuICAgICAgICAgIGxvc3RQb2ludCArPSA0MDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIExFVkVMNFxuXG4gICAgbGV0IGRhcmtDb3VudCA9IDA7XG5cbiAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sICs9IDEpIHtcbiAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3cgKz0gMSkge1xuICAgICAgICBpZiAocXJjb2RlLmlzRGFyayhyb3csIGNvbCkgKSB7XG4gICAgICAgICAgZGFya0NvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCByYXRpbyA9IE1hdGguYWJzKDEwMCAqIGRhcmtDb3VudCAvIG1vZHVsZUNvdW50IC8gbW9kdWxlQ291bnQgLSA1MCkgLyA1O1xuICAgIGxvc3RQb2ludCArPSByYXRpbyAqIDEwO1xuXG4gICAgcmV0dXJuIGxvc3RQb2ludDtcbiAgfTtcblxuICByZXR1cm4gX3RoaXM7XG59KCk7XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBRUk1hdGhcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IFFSTWF0aCA9IGZ1bmN0aW9uKCkge1xuXG4gIGNvbnN0IEVYUF9UQUJMRSA9IG5ldyBBcnJheSgyNTYpO1xuICBjb25zdCBMT0dfVEFCTEUgPSBuZXcgQXJyYXkoMjU2KTtcblxuICAvLyBpbml0aWFsaXplIHRhYmxlc1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDg7IGkgKz0gMSkge1xuICAgIEVYUF9UQUJMRVtpXSA9IDEgPDwgaTtcbiAgfVxuICBmb3IgKGxldCBpID0gODsgaSA8IDI1NjsgaSArPSAxKSB7XG4gICAgRVhQX1RBQkxFW2ldID0gRVhQX1RBQkxFW2kgLSA0XVxuICAgICAgXiBFWFBfVEFCTEVbaSAtIDVdXG4gICAgICBeIEVYUF9UQUJMRVtpIC0gNl1cbiAgICAgIF4gRVhQX1RBQkxFW2kgLSA4XTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDI1NTsgaSArPSAxKSB7XG4gICAgTE9HX1RBQkxFW0VYUF9UQUJMRVtpXSBdID0gaTtcbiAgfVxuXG4gIGNvbnN0IF90aGlzID0ge307XG5cbiAgX3RoaXMuZ2xvZyA9IGZ1bmN0aW9uKG4pIHtcblxuICAgIGlmIChuIDwgMSkge1xuICAgICAgdGhyb3cgJ2dsb2coJyArIG4gKyAnKSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIExPR19UQUJMRVtuXTtcbiAgfTtcblxuICBfdGhpcy5nZXhwID0gZnVuY3Rpb24obikge1xuXG4gICAgd2hpbGUgKG4gPCAwKSB7XG4gICAgICBuICs9IDI1NTtcbiAgICB9XG5cbiAgICB3aGlsZSAobiA+PSAyNTYpIHtcbiAgICAgIG4gLT0gMjU1O1xuICAgIH1cblxuICAgIHJldHVybiBFWFBfVEFCTEVbbl07XG4gIH07XG5cbiAgcmV0dXJuIF90aGlzO1xufSgpO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gcXJQb2x5bm9taWFsXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBxclBvbHlub21pYWwgPSBmdW5jdGlvbihudW0sIHNoaWZ0KSB7XG5cbiAgaWYgKHR5cGVvZiBudW0ubGVuZ3RoID09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgbnVtLmxlbmd0aCArICcvJyArIHNoaWZ0O1xuICB9XG5cbiAgY29uc3QgX251bSA9IGZ1bmN0aW9uKCkge1xuICAgIGxldCBvZmZzZXQgPSAwO1xuICAgIHdoaWxlIChvZmZzZXQgPCBudW0ubGVuZ3RoICYmIG51bVtvZmZzZXRdID09IDApIHtcbiAgICAgIG9mZnNldCArPSAxO1xuICAgIH1cbiAgICBjb25zdCBfbnVtID0gbmV3IEFycmF5KG51bS5sZW5ndGggLSBvZmZzZXQgKyBzaGlmdCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW0ubGVuZ3RoIC0gb2Zmc2V0OyBpICs9IDEpIHtcbiAgICAgIF9udW1baV0gPSBudW1baSArIG9mZnNldF07XG4gICAgfVxuICAgIHJldHVybiBfbnVtO1xuICB9KCk7XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBfdGhpcy5nZXRBdCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIF9udW1baW5kZXhdO1xuICB9O1xuXG4gIF90aGlzLmdldExlbmd0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfbnVtLmxlbmd0aDtcbiAgfTtcblxuICBfdGhpcy5tdWx0aXBseSA9IGZ1bmN0aW9uKGUpIHtcblxuICAgIGNvbnN0IG51bSA9IG5ldyBBcnJheShfdGhpcy5nZXRMZW5ndGgoKSArIGUuZ2V0TGVuZ3RoKCkgLSAxKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3RoaXMuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBlLmdldExlbmd0aCgpOyBqICs9IDEpIHtcbiAgICAgICAgbnVtW2kgKyBqXSBePSBRUk1hdGguZ2V4cChRUk1hdGguZ2xvZyhfdGhpcy5nZXRBdChpKSApICsgUVJNYXRoLmdsb2coZS5nZXRBdChqKSApICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHFyUG9seW5vbWlhbChudW0sIDApO1xuICB9O1xuXG4gIF90aGlzLm1vZCA9IGZ1bmN0aW9uKGUpIHtcblxuICAgIGlmIChfdGhpcy5nZXRMZW5ndGgoKSAtIGUuZ2V0TGVuZ3RoKCkgPCAwKSB7XG4gICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuXG4gICAgY29uc3QgcmF0aW8gPSBRUk1hdGguZ2xvZyhfdGhpcy5nZXRBdCgwKSApIC0gUVJNYXRoLmdsb2coZS5nZXRBdCgwKSApO1xuXG4gICAgY29uc3QgbnVtID0gbmV3IEFycmF5KF90aGlzLmdldExlbmd0aCgpICk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfdGhpcy5nZXRMZW5ndGgoKTsgaSArPSAxKSB7XG4gICAgICBudW1baV0gPSBfdGhpcy5nZXRBdChpKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGUuZ2V0TGVuZ3RoKCk7IGkgKz0gMSkge1xuICAgICAgbnVtW2ldIF49IFFSTWF0aC5nZXhwKFFSTWF0aC5nbG9nKGUuZ2V0QXQoaSkgKSArIHJhdGlvKTtcbiAgICB9XG5cbiAgICAvLyByZWN1cnNpdmUgY2FsbFxuICAgIHJldHVybiBxclBvbHlub21pYWwobnVtLCAwKS5tb2QoZSk7XG4gIH07XG5cbiAgcmV0dXJuIF90aGlzO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFFSUlNCbG9ja1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgUVJSU0Jsb2NrID0gZnVuY3Rpb24oKSB7XG5cbiAgY29uc3QgUlNfQkxPQ0tfVEFCTEUgPSBbXG5cbiAgICAvLyBMXG4gICAgLy8gTVxuICAgIC8vIFFcbiAgICAvLyBIXG5cbiAgICAvLyAxXG4gICAgWzEsIDI2LCAxOV0sXG4gICAgWzEsIDI2LCAxNl0sXG4gICAgWzEsIDI2LCAxM10sXG4gICAgWzEsIDI2LCA5XSxcblxuICAgIC8vIDJcbiAgICBbMSwgNDQsIDM0XSxcbiAgICBbMSwgNDQsIDI4XSxcbiAgICBbMSwgNDQsIDIyXSxcbiAgICBbMSwgNDQsIDE2XSxcblxuICAgIC8vIDNcbiAgICBbMSwgNzAsIDU1XSxcbiAgICBbMSwgNzAsIDQ0XSxcbiAgICBbMiwgMzUsIDE3XSxcbiAgICBbMiwgMzUsIDEzXSxcblxuICAgIC8vIDRcbiAgICBbMSwgMTAwLCA4MF0sXG4gICAgWzIsIDUwLCAzMl0sXG4gICAgWzIsIDUwLCAyNF0sXG4gICAgWzQsIDI1LCA5XSxcblxuICAgIC8vIDVcbiAgICBbMSwgMTM0LCAxMDhdLFxuICAgIFsyLCA2NywgNDNdLFxuICAgIFsyLCAzMywgMTUsIDIsIDM0LCAxNl0sXG4gICAgWzIsIDMzLCAxMSwgMiwgMzQsIDEyXSxcblxuICAgIC8vIDZcbiAgICBbMiwgODYsIDY4XSxcbiAgICBbNCwgNDMsIDI3XSxcbiAgICBbNCwgNDMsIDE5XSxcbiAgICBbNCwgNDMsIDE1XSxcblxuICAgIC8vIDdcbiAgICBbMiwgOTgsIDc4XSxcbiAgICBbNCwgNDksIDMxXSxcbiAgICBbMiwgMzIsIDE0LCA0LCAzMywgMTVdLFxuICAgIFs0LCAzOSwgMTMsIDEsIDQwLCAxNF0sXG5cbiAgICAvLyA4XG4gICAgWzIsIDEyMSwgOTddLFxuICAgIFsyLCA2MCwgMzgsIDIsIDYxLCAzOV0sXG4gICAgWzQsIDQwLCAxOCwgMiwgNDEsIDE5XSxcbiAgICBbNCwgNDAsIDE0LCAyLCA0MSwgMTVdLFxuXG4gICAgLy8gOVxuICAgIFsyLCAxNDYsIDExNl0sXG4gICAgWzMsIDU4LCAzNiwgMiwgNTksIDM3XSxcbiAgICBbNCwgMzYsIDE2LCA0LCAzNywgMTddLFxuICAgIFs0LCAzNiwgMTIsIDQsIDM3LCAxM10sXG5cbiAgICAvLyAxMFxuICAgIFsyLCA4NiwgNjgsIDIsIDg3LCA2OV0sXG4gICAgWzQsIDY5LCA0MywgMSwgNzAsIDQ0XSxcbiAgICBbNiwgNDMsIDE5LCAyLCA0NCwgMjBdLFxuICAgIFs2LCA0MywgMTUsIDIsIDQ0LCAxNl0sXG5cbiAgICAvLyAxMVxuICAgIFs0LCAxMDEsIDgxXSxcbiAgICBbMSwgODAsIDUwLCA0LCA4MSwgNTFdLFxuICAgIFs0LCA1MCwgMjIsIDQsIDUxLCAyM10sXG4gICAgWzMsIDM2LCAxMiwgOCwgMzcsIDEzXSxcblxuICAgIC8vIDEyXG4gICAgWzIsIDExNiwgOTIsIDIsIDExNywgOTNdLFxuICAgIFs2LCA1OCwgMzYsIDIsIDU5LCAzN10sXG4gICAgWzQsIDQ2LCAyMCwgNiwgNDcsIDIxXSxcbiAgICBbNywgNDIsIDE0LCA0LCA0MywgMTVdLFxuXG4gICAgLy8gMTNcbiAgICBbNCwgMTMzLCAxMDddLFxuICAgIFs4LCA1OSwgMzcsIDEsIDYwLCAzOF0sXG4gICAgWzgsIDQ0LCAyMCwgNCwgNDUsIDIxXSxcbiAgICBbMTIsIDMzLCAxMSwgNCwgMzQsIDEyXSxcblxuICAgIC8vIDE0XG4gICAgWzMsIDE0NSwgMTE1LCAxLCAxNDYsIDExNl0sXG4gICAgWzQsIDY0LCA0MCwgNSwgNjUsIDQxXSxcbiAgICBbMTEsIDM2LCAxNiwgNSwgMzcsIDE3XSxcbiAgICBbMTEsIDM2LCAxMiwgNSwgMzcsIDEzXSxcblxuICAgIC8vIDE1XG4gICAgWzUsIDEwOSwgODcsIDEsIDExMCwgODhdLFxuICAgIFs1LCA2NSwgNDEsIDUsIDY2LCA0Ml0sXG4gICAgWzUsIDU0LCAyNCwgNywgNTUsIDI1XSxcbiAgICBbMTEsIDM2LCAxMiwgNywgMzcsIDEzXSxcblxuICAgIC8vIDE2XG4gICAgWzUsIDEyMiwgOTgsIDEsIDEyMywgOTldLFxuICAgIFs3LCA3MywgNDUsIDMsIDc0LCA0Nl0sXG4gICAgWzE1LCA0MywgMTksIDIsIDQ0LCAyMF0sXG4gICAgWzMsIDQ1LCAxNSwgMTMsIDQ2LCAxNl0sXG5cbiAgICAvLyAxN1xuICAgIFsxLCAxMzUsIDEwNywgNSwgMTM2LCAxMDhdLFxuICAgIFsxMCwgNzQsIDQ2LCAxLCA3NSwgNDddLFxuICAgIFsxLCA1MCwgMjIsIDE1LCA1MSwgMjNdLFxuICAgIFsyLCA0MiwgMTQsIDE3LCA0MywgMTVdLFxuXG4gICAgLy8gMThcbiAgICBbNSwgMTUwLCAxMjAsIDEsIDE1MSwgMTIxXSxcbiAgICBbOSwgNjksIDQzLCA0LCA3MCwgNDRdLFxuICAgIFsxNywgNTAsIDIyLCAxLCA1MSwgMjNdLFxuICAgIFsyLCA0MiwgMTQsIDE5LCA0MywgMTVdLFxuXG4gICAgLy8gMTlcbiAgICBbMywgMTQxLCAxMTMsIDQsIDE0MiwgMTE0XSxcbiAgICBbMywgNzAsIDQ0LCAxMSwgNzEsIDQ1XSxcbiAgICBbMTcsIDQ3LCAyMSwgNCwgNDgsIDIyXSxcbiAgICBbOSwgMzksIDEzLCAxNiwgNDAsIDE0XSxcblxuICAgIC8vIDIwXG4gICAgWzMsIDEzNSwgMTA3LCA1LCAxMzYsIDEwOF0sXG4gICAgWzMsIDY3LCA0MSwgMTMsIDY4LCA0Ml0sXG4gICAgWzE1LCA1NCwgMjQsIDUsIDU1LCAyNV0sXG4gICAgWzE1LCA0MywgMTUsIDEwLCA0NCwgMTZdLFxuXG4gICAgLy8gMjFcbiAgICBbNCwgMTQ0LCAxMTYsIDQsIDE0NSwgMTE3XSxcbiAgICBbMTcsIDY4LCA0Ml0sXG4gICAgWzE3LCA1MCwgMjIsIDYsIDUxLCAyM10sXG4gICAgWzE5LCA0NiwgMTYsIDYsIDQ3LCAxN10sXG5cbiAgICAvLyAyMlxuICAgIFsyLCAxMzksIDExMSwgNywgMTQwLCAxMTJdLFxuICAgIFsxNywgNzQsIDQ2XSxcbiAgICBbNywgNTQsIDI0LCAxNiwgNTUsIDI1XSxcbiAgICBbMzQsIDM3LCAxM10sXG5cbiAgICAvLyAyM1xuICAgIFs0LCAxNTEsIDEyMSwgNSwgMTUyLCAxMjJdLFxuICAgIFs0LCA3NSwgNDcsIDE0LCA3NiwgNDhdLFxuICAgIFsxMSwgNTQsIDI0LCAxNCwgNTUsIDI1XSxcbiAgICBbMTYsIDQ1LCAxNSwgMTQsIDQ2LCAxNl0sXG5cbiAgICAvLyAyNFxuICAgIFs2LCAxNDcsIDExNywgNCwgMTQ4LCAxMThdLFxuICAgIFs2LCA3MywgNDUsIDE0LCA3NCwgNDZdLFxuICAgIFsxMSwgNTQsIDI0LCAxNiwgNTUsIDI1XSxcbiAgICBbMzAsIDQ2LCAxNiwgMiwgNDcsIDE3XSxcblxuICAgIC8vIDI1XG4gICAgWzgsIDEzMiwgMTA2LCA0LCAxMzMsIDEwN10sXG4gICAgWzgsIDc1LCA0NywgMTMsIDc2LCA0OF0sXG4gICAgWzcsIDU0LCAyNCwgMjIsIDU1LCAyNV0sXG4gICAgWzIyLCA0NSwgMTUsIDEzLCA0NiwgMTZdLFxuXG4gICAgLy8gMjZcbiAgICBbMTAsIDE0MiwgMTE0LCAyLCAxNDMsIDExNV0sXG4gICAgWzE5LCA3NCwgNDYsIDQsIDc1LCA0N10sXG4gICAgWzI4LCA1MCwgMjIsIDYsIDUxLCAyM10sXG4gICAgWzMzLCA0NiwgMTYsIDQsIDQ3LCAxN10sXG5cbiAgICAvLyAyN1xuICAgIFs4LCAxNTIsIDEyMiwgNCwgMTUzLCAxMjNdLFxuICAgIFsyMiwgNzMsIDQ1LCAzLCA3NCwgNDZdLFxuICAgIFs4LCA1MywgMjMsIDI2LCA1NCwgMjRdLFxuICAgIFsxMiwgNDUsIDE1LCAyOCwgNDYsIDE2XSxcblxuICAgIC8vIDI4XG4gICAgWzMsIDE0NywgMTE3LCAxMCwgMTQ4LCAxMThdLFxuICAgIFszLCA3MywgNDUsIDIzLCA3NCwgNDZdLFxuICAgIFs0LCA1NCwgMjQsIDMxLCA1NSwgMjVdLFxuICAgIFsxMSwgNDUsIDE1LCAzMSwgNDYsIDE2XSxcblxuICAgIC8vIDI5XG4gICAgWzcsIDE0NiwgMTE2LCA3LCAxNDcsIDExN10sXG4gICAgWzIxLCA3MywgNDUsIDcsIDc0LCA0Nl0sXG4gICAgWzEsIDUzLCAyMywgMzcsIDU0LCAyNF0sXG4gICAgWzE5LCA0NSwgMTUsIDI2LCA0NiwgMTZdLFxuXG4gICAgLy8gMzBcbiAgICBbNSwgMTQ1LCAxMTUsIDEwLCAxNDYsIDExNl0sXG4gICAgWzE5LCA3NSwgNDcsIDEwLCA3NiwgNDhdLFxuICAgIFsxNSwgNTQsIDI0LCAyNSwgNTUsIDI1XSxcbiAgICBbMjMsIDQ1LCAxNSwgMjUsIDQ2LCAxNl0sXG5cbiAgICAvLyAzMVxuICAgIFsxMywgMTQ1LCAxMTUsIDMsIDE0NiwgMTE2XSxcbiAgICBbMiwgNzQsIDQ2LCAyOSwgNzUsIDQ3XSxcbiAgICBbNDIsIDU0LCAyNCwgMSwgNTUsIDI1XSxcbiAgICBbMjMsIDQ1LCAxNSwgMjgsIDQ2LCAxNl0sXG5cbiAgICAvLyAzMlxuICAgIFsxNywgMTQ1LCAxMTVdLFxuICAgIFsxMCwgNzQsIDQ2LCAyMywgNzUsIDQ3XSxcbiAgICBbMTAsIDU0LCAyNCwgMzUsIDU1LCAyNV0sXG4gICAgWzE5LCA0NSwgMTUsIDM1LCA0NiwgMTZdLFxuXG4gICAgLy8gMzNcbiAgICBbMTcsIDE0NSwgMTE1LCAxLCAxNDYsIDExNl0sXG4gICAgWzE0LCA3NCwgNDYsIDIxLCA3NSwgNDddLFxuICAgIFsyOSwgNTQsIDI0LCAxOSwgNTUsIDI1XSxcbiAgICBbMTEsIDQ1LCAxNSwgNDYsIDQ2LCAxNl0sXG5cbiAgICAvLyAzNFxuICAgIFsxMywgMTQ1LCAxMTUsIDYsIDE0NiwgMTE2XSxcbiAgICBbMTQsIDc0LCA0NiwgMjMsIDc1LCA0N10sXG4gICAgWzQ0LCA1NCwgMjQsIDcsIDU1LCAyNV0sXG4gICAgWzU5LCA0NiwgMTYsIDEsIDQ3LCAxN10sXG5cbiAgICAvLyAzNVxuICAgIFsxMiwgMTUxLCAxMjEsIDcsIDE1MiwgMTIyXSxcbiAgICBbMTIsIDc1LCA0NywgMjYsIDc2LCA0OF0sXG4gICAgWzM5LCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxuICAgIFsyMiwgNDUsIDE1LCA0MSwgNDYsIDE2XSxcblxuICAgIC8vIDM2XG4gICAgWzYsIDE1MSwgMTIxLCAxNCwgMTUyLCAxMjJdLFxuICAgIFs2LCA3NSwgNDcsIDM0LCA3NiwgNDhdLFxuICAgIFs0NiwgNTQsIDI0LCAxMCwgNTUsIDI1XSxcbiAgICBbMiwgNDUsIDE1LCA2NCwgNDYsIDE2XSxcblxuICAgIC8vIDM3XG4gICAgWzE3LCAxNTIsIDEyMiwgNCwgMTUzLCAxMjNdLFxuICAgIFsyOSwgNzQsIDQ2LCAxNCwgNzUsIDQ3XSxcbiAgICBbNDksIDU0LCAyNCwgMTAsIDU1LCAyNV0sXG4gICAgWzI0LCA0NSwgMTUsIDQ2LCA0NiwgMTZdLFxuXG4gICAgLy8gMzhcbiAgICBbNCwgMTUyLCAxMjIsIDE4LCAxNTMsIDEyM10sXG4gICAgWzEzLCA3NCwgNDYsIDMyLCA3NSwgNDddLFxuICAgIFs0OCwgNTQsIDI0LCAxNCwgNTUsIDI1XSxcbiAgICBbNDIsIDQ1LCAxNSwgMzIsIDQ2LCAxNl0sXG5cbiAgICAvLyAzOVxuICAgIFsyMCwgMTQ3LCAxMTcsIDQsIDE0OCwgMTE4XSxcbiAgICBbNDAsIDc1LCA0NywgNywgNzYsIDQ4XSxcbiAgICBbNDMsIDU0LCAyNCwgMjIsIDU1LCAyNV0sXG4gICAgWzEwLCA0NSwgMTUsIDY3LCA0NiwgMTZdLFxuXG4gICAgLy8gNDBcbiAgICBbMTksIDE0OCwgMTE4LCA2LCAxNDksIDExOV0sXG4gICAgWzE4LCA3NSwgNDcsIDMxLCA3NiwgNDhdLFxuICAgIFszNCwgNTQsIDI0LCAzNCwgNTUsIDI1XSxcbiAgICBbMjAsIDQ1LCAxNSwgNjEsIDQ2LCAxNl1cbiAgXTtcblxuICBjb25zdCBxclJTQmxvY2sgPSBmdW5jdGlvbih0b3RhbENvdW50LCBkYXRhQ291bnQpIHtcbiAgICBjb25zdCBfdGhpcyA9IHt9O1xuICAgIF90aGlzLnRvdGFsQ291bnQgPSB0b3RhbENvdW50O1xuICAgIF90aGlzLmRhdGFDb3VudCA9IGRhdGFDb3VudDtcbiAgICByZXR1cm4gX3RoaXM7XG4gIH07XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBjb25zdCBnZXRSc0Jsb2NrVGFibGUgPSBmdW5jdGlvbih0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3Rpb25MZXZlbCkge1xuXG4gICAgc3dpdGNoKGVycm9yQ29ycmVjdGlvbkxldmVsKSB7XG4gICAgY2FzZSBRUkVycm9yQ29ycmVjdGlvbkxldmVsLkwgOlxuICAgICAgcmV0dXJuIFJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMF07XG4gICAgY2FzZSBRUkVycm9yQ29ycmVjdGlvbkxldmVsLk0gOlxuICAgICAgcmV0dXJuIFJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMV07XG4gICAgY2FzZSBRUkVycm9yQ29ycmVjdGlvbkxldmVsLlEgOlxuICAgICAgcmV0dXJuIFJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMl07XG4gICAgY2FzZSBRUkVycm9yQ29ycmVjdGlvbkxldmVsLkggOlxuICAgICAgcmV0dXJuIFJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgM107XG4gICAgZGVmYXVsdCA6XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgfTtcblxuICBfdGhpcy5nZXRSU0Jsb2NrcyA9IGZ1bmN0aW9uKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdGlvbkxldmVsKSB7XG5cbiAgICBjb25zdCByc0Jsb2NrID0gZ2V0UnNCbG9ja1RhYmxlKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdGlvbkxldmVsKTtcblxuICAgIGlmICh0eXBlb2YgcnNCbG9jayA9PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgJ2JhZCBycyBibG9jayBAIHR5cGVOdW1iZXI6JyArIHR5cGVOdW1iZXIgK1xuICAgICAgICAgICcvZXJyb3JDb3JyZWN0aW9uTGV2ZWw6JyArIGVycm9yQ29ycmVjdGlvbkxldmVsO1xuICAgIH1cblxuICAgIGNvbnN0IGxlbmd0aCA9IHJzQmxvY2subGVuZ3RoIC8gMztcblxuICAgIGNvbnN0IGxpc3QgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcblxuICAgICAgY29uc3QgY291bnQgPSByc0Jsb2NrW2kgKiAzICsgMF07XG4gICAgICBjb25zdCB0b3RhbENvdW50ID0gcnNCbG9ja1tpICogMyArIDFdO1xuICAgICAgY29uc3QgZGF0YUNvdW50ID0gcnNCbG9ja1tpICogMyArIDJdO1xuXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvdW50OyBqICs9IDEpIHtcbiAgICAgICAgbGlzdC5wdXNoKHFyUlNCbG9jayh0b3RhbENvdW50LCBkYXRhQ291bnQpICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxpc3Q7XG4gIH07XG5cbiAgcmV0dXJuIF90aGlzO1xufSgpO1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gcXJCaXRCdWZmZXJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IHFyQml0QnVmZmVyID0gZnVuY3Rpb24oKSB7XG5cbiAgY29uc3QgX2J1ZmZlciA9IFtdO1xuICBsZXQgX2xlbmd0aCA9IDA7XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBfdGhpcy5nZXRCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gX2J1ZmZlcjtcbiAgfTtcblxuICBfdGhpcy5nZXRBdCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgY29uc3QgYnVmSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gOCk7XG4gICAgcmV0dXJuICggKF9idWZmZXJbYnVmSW5kZXhdID4+PiAoNyAtIGluZGV4ICUgOCkgKSAmIDEpID09IDE7XG4gIH07XG5cbiAgX3RoaXMucHV0ID0gZnVuY3Rpb24obnVtLCBsZW5ndGgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBfdGhpcy5wdXRCaXQoICggKG51bSA+Pj4gKGxlbmd0aCAtIGkgLSAxKSApICYgMSkgPT0gMSk7XG4gICAgfVxuICB9O1xuXG4gIF90aGlzLmdldExlbmd0aEluQml0cyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBfbGVuZ3RoO1xuICB9O1xuXG4gIF90aGlzLnB1dEJpdCA9IGZ1bmN0aW9uKGJpdCkge1xuXG4gICAgY29uc3QgYnVmSW5kZXggPSBNYXRoLmZsb29yKF9sZW5ndGggLyA4KTtcbiAgICBpZiAoX2J1ZmZlci5sZW5ndGggPD0gYnVmSW5kZXgpIHtcbiAgICAgIF9idWZmZXIucHVzaCgwKTtcbiAgICB9XG5cbiAgICBpZiAoYml0KSB7XG4gICAgICBfYnVmZmVyW2J1ZkluZGV4XSB8PSAoMHg4MCA+Pj4gKF9sZW5ndGggJSA4KSApO1xuICAgIH1cblxuICAgIF9sZW5ndGggKz0gMTtcbiAgfTtcblxuICByZXR1cm4gX3RoaXM7XG59O1xuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gcXJOdW1iZXJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IHFyTnVtYmVyID0gZnVuY3Rpb24oZGF0YSkge1xuXG4gIGNvbnN0IF9tb2RlID0gUVJNb2RlLk1PREVfTlVNQkVSO1xuICBjb25zdCBfZGF0YSA9IGRhdGE7XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBfdGhpcy5nZXRNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF9tb2RlO1xuICB9O1xuXG4gIF90aGlzLmdldExlbmd0aCA9IGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgIHJldHVybiBfZGF0YS5sZW5ndGg7XG4gIH07XG5cbiAgX3RoaXMud3JpdGUgPSBmdW5jdGlvbihidWZmZXIpIHtcblxuICAgIGNvbnN0IGRhdGEgPSBfZGF0YTtcblxuICAgIGxldCBpID0gMDtcblxuICAgIHdoaWxlIChpICsgMiA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICBidWZmZXIucHV0KHN0clRvTnVtKGRhdGEuc3Vic3RyaW5nKGksIGkgKyAzKSApLCAxMCk7XG4gICAgICBpICs9IDM7XG4gICAgfVxuXG4gICAgaWYgKGkgPCBkYXRhLmxlbmd0aCkge1xuICAgICAgaWYgKGRhdGEubGVuZ3RoIC0gaSA9PSAxKSB7XG4gICAgICAgIGJ1ZmZlci5wdXQoc3RyVG9OdW0oZGF0YS5zdWJzdHJpbmcoaSwgaSArIDEpICksIDQpO1xuICAgICAgfSBlbHNlIGlmIChkYXRhLmxlbmd0aCAtIGkgPT0gMikge1xuICAgICAgICBidWZmZXIucHV0KHN0clRvTnVtKGRhdGEuc3Vic3RyaW5nKGksIGkgKyAyKSApLCA3KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgY29uc3Qgc3RyVG9OdW0gPSBmdW5jdGlvbihzKSB7XG4gICAgbGV0IG51bSA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBudW0gPSBudW0gKiAxMCArIGNoYXRUb051bShzLmNoYXJBdChpKSApO1xuICAgIH1cbiAgICByZXR1cm4gbnVtO1xuICB9O1xuXG4gIGNvbnN0IGNoYXRUb051bSA9IGZ1bmN0aW9uKGMpIHtcbiAgICBpZiAoJzAnIDw9IGMgJiYgYyA8PSAnOScpIHtcbiAgICAgIHJldHVybiBjLmNoYXJDb2RlQXQoMCkgLSAnMCcuY2hhckNvZGVBdCgwKTtcbiAgICB9XG4gICAgdGhyb3cgJ2lsbGVnYWwgY2hhciA6JyArIGM7XG4gIH07XG5cbiAgcmV0dXJuIF90aGlzO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHFyQWxwaGFOdW1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IHFyQWxwaGFOdW0gPSBmdW5jdGlvbihkYXRhKSB7XG5cbiAgY29uc3QgX21vZGUgPSBRUk1vZGUuTU9ERV9BTFBIQV9OVU07XG4gIGNvbnN0IF9kYXRhID0gZGF0YTtcblxuICBjb25zdCBfdGhpcyA9IHt9O1xuXG4gIF90aGlzLmdldE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gX21vZGU7XG4gIH07XG5cbiAgX3RoaXMuZ2V0TGVuZ3RoID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgcmV0dXJuIF9kYXRhLmxlbmd0aDtcbiAgfTtcblxuICBfdGhpcy53cml0ZSA9IGZ1bmN0aW9uKGJ1ZmZlcikge1xuXG4gICAgY29uc3QgcyA9IF9kYXRhO1xuXG4gICAgbGV0IGkgPSAwO1xuXG4gICAgd2hpbGUgKGkgKyAxIDwgcy5sZW5ndGgpIHtcbiAgICAgIGJ1ZmZlci5wdXQoXG4gICAgICAgIGdldENvZGUocy5jaGFyQXQoaSkgKSAqIDQ1ICtcbiAgICAgICAgZ2V0Q29kZShzLmNoYXJBdChpICsgMSkgKSwgMTEpO1xuICAgICAgaSArPSAyO1xuICAgIH1cblxuICAgIGlmIChpIDwgcy5sZW5ndGgpIHtcbiAgICAgIGJ1ZmZlci5wdXQoZ2V0Q29kZShzLmNoYXJBdChpKSApLCA2KTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgZ2V0Q29kZSA9IGZ1bmN0aW9uKGMpIHtcblxuICAgIGlmICgnMCcgPD0gYyAmJiBjIDw9ICc5Jykge1xuICAgICAgcmV0dXJuIGMuY2hhckNvZGVBdCgwKSAtICcwJy5jaGFyQ29kZUF0KDApO1xuICAgIH0gZWxzZSBpZiAoJ0EnIDw9IGMgJiYgYyA8PSAnWicpIHtcbiAgICAgIHJldHVybiBjLmNoYXJDb2RlQXQoMCkgLSAnQScuY2hhckNvZGVBdCgwKSArIDEwO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgIGNhc2UgJ1xcdTAwMjAnIDogcmV0dXJuIDM2O1xuICAgICAgY2FzZSAnJCcgOiByZXR1cm4gMzc7XG4gICAgICBjYXNlICclJyA6IHJldHVybiAzODtcbiAgICAgIGNhc2UgJyonIDogcmV0dXJuIDM5O1xuICAgICAgY2FzZSAnKycgOiByZXR1cm4gNDA7XG4gICAgICBjYXNlICctJyA6IHJldHVybiA0MTtcbiAgICAgIGNhc2UgJy4nIDogcmV0dXJuIDQyO1xuICAgICAgY2FzZSAnLycgOiByZXR1cm4gNDM7XG4gICAgICBjYXNlICc6JyA6IHJldHVybiA0NDtcbiAgICAgIGRlZmF1bHQgOlxuICAgICAgICB0aHJvdyAnaWxsZWdhbCBjaGFyIDonICsgYztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIF90aGlzO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHFyOEJpdEJ5dGVcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IHFyOEJpdEJ5dGUgPSBmdW5jdGlvbihkYXRhKSB7XG5cbiAgY29uc3QgX21vZGUgPSBRUk1vZGUuTU9ERV84QklUX0JZVEU7XG4gIGNvbnN0IF9kYXRhID0gZGF0YTtcbiAgY29uc3QgX2J5dGVzID0gcXJjb2RlLnN0cmluZ1RvQnl0ZXMoZGF0YSk7XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBfdGhpcy5nZXRNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF9tb2RlO1xuICB9O1xuXG4gIF90aGlzLmdldExlbmd0aCA9IGZ1bmN0aW9uKGJ1ZmZlcikge1xuICAgIHJldHVybiBfYnl0ZXMubGVuZ3RoO1xuICB9O1xuXG4gIF90aGlzLndyaXRlID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBfYnl0ZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGJ1ZmZlci5wdXQoX2J5dGVzW2ldLCA4KTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIF90aGlzO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIHFyS2Fuamlcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IHFyS2FuamkgPSBmdW5jdGlvbihkYXRhKSB7XG5cbiAgY29uc3QgX21vZGUgPSBRUk1vZGUuTU9ERV9LQU5KSTtcbiAgY29uc3QgX2RhdGEgPSBkYXRhO1xuXG4gIGNvbnN0IHN0cmluZ1RvQnl0ZXMgPSBxcmNvZGUuc3RyaW5nVG9CeXRlcztcbiAgIWZ1bmN0aW9uKGMsIGNvZGUpIHtcbiAgICAvLyBzZWxmIHRlc3QgZm9yIHNqaXMgc3VwcG9ydC5cbiAgICBjb25zdCB0ZXN0ID0gc3RyaW5nVG9CeXRlcyhjKTtcbiAgICBpZiAodGVzdC5sZW5ndGggIT0gMiB8fCAoICh0ZXN0WzBdIDw8IDgpIHwgdGVzdFsxXSkgIT0gY29kZSkge1xuICAgICAgdGhyb3cgJ3NqaXMgbm90IHN1cHBvcnRlZC4nO1xuICAgIH1cbiAgfSgnXFx1NTNjYicsIDB4OTc0Nik7XG5cbiAgY29uc3QgX2J5dGVzID0gc3RyaW5nVG9CeXRlcyhkYXRhKTtcblxuICBjb25zdCBfdGhpcyA9IHt9O1xuXG4gIF90aGlzLmdldE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gX21vZGU7XG4gIH07XG5cbiAgX3RoaXMuZ2V0TGVuZ3RoID0gZnVuY3Rpb24oYnVmZmVyKSB7XG4gICAgcmV0dXJuIH5+KF9ieXRlcy5sZW5ndGggLyAyKTtcbiAgfTtcblxuICBfdGhpcy53cml0ZSA9IGZ1bmN0aW9uKGJ1ZmZlcikge1xuXG4gICAgY29uc3QgZGF0YSA9IF9ieXRlcztcblxuICAgIGxldCBpID0gMDtcblxuICAgIHdoaWxlIChpICsgMSA8IGRhdGEubGVuZ3RoKSB7XG5cbiAgICAgIGxldCBjID0gKCAoMHhmZiAmIGRhdGFbaV0pIDw8IDgpIHwgKDB4ZmYgJiBkYXRhW2kgKyAxXSk7XG5cbiAgICAgIGlmICgweDgxNDAgPD0gYyAmJiBjIDw9IDB4OUZGQykge1xuICAgICAgICBjIC09IDB4ODE0MDtcbiAgICAgIH0gZWxzZSBpZiAoMHhFMDQwIDw9IGMgJiYgYyA8PSAweEVCQkYpIHtcbiAgICAgICAgYyAtPSAweEMxNDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyAnaWxsZWdhbCBjaGFyIGF0ICcgKyAoaSArIDEpICsgJy8nICsgYztcbiAgICAgIH1cblxuICAgICAgYyA9ICggKGMgPj4+IDgpICYgMHhmZikgKiAweEMwICsgKGMgJiAweGZmKTtcblxuICAgICAgYnVmZmVyLnB1dChjLCAxMyk7XG5cbiAgICAgIGkgKz0gMjtcbiAgICB9XG5cbiAgICBpZiAoaSA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICB0aHJvdyAnaWxsZWdhbCBjaGFyIGF0ICcgKyAoaSArIDEpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gX3RoaXM7XG59O1xuXG4vLz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gR0lGIFN1cHBvcnQgZXRjLlxuLy9cblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGJ5dGVBcnJheU91dHB1dFN0cmVhbVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgYnl0ZUFycmF5T3V0cHV0U3RyZWFtID0gZnVuY3Rpb24oKSB7XG5cbiAgY29uc3QgX2J5dGVzID0gW107XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBfdGhpcy53cml0ZUJ5dGUgPSBmdW5jdGlvbihiKSB7XG4gICAgX2J5dGVzLnB1c2goYiAmIDB4ZmYpO1xuICB9O1xuXG4gIF90aGlzLndyaXRlU2hvcnQgPSBmdW5jdGlvbihpKSB7XG4gICAgX3RoaXMud3JpdGVCeXRlKGkpO1xuICAgIF90aGlzLndyaXRlQnl0ZShpID4+PiA4KTtcbiAgfTtcblxuICBfdGhpcy53cml0ZUJ5dGVzID0gZnVuY3Rpb24oYiwgb2ZmLCBsZW4pIHtcbiAgICBvZmYgPSBvZmYgfHwgMDtcbiAgICBsZW4gPSBsZW4gfHwgYi5sZW5ndGg7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkgKz0gMSkge1xuICAgICAgX3RoaXMud3JpdGVCeXRlKGJbaSArIG9mZl0pO1xuICAgIH1cbiAgfTtcblxuICBfdGhpcy53cml0ZVN0cmluZyA9IGZ1bmN0aW9uKHMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIF90aGlzLndyaXRlQnl0ZShzLmNoYXJDb2RlQXQoaSkgKTtcbiAgICB9XG4gIH07XG5cbiAgX3RoaXMudG9CeXRlQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gX2J5dGVzO1xuICB9O1xuXG4gIF90aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IHMgPSAnJztcbiAgICBzICs9ICdbJztcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IF9ieXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKGkgPiAwKSB7XG4gICAgICAgIHMgKz0gJywnO1xuICAgICAgfVxuICAgICAgcyArPSBfYnl0ZXNbaV07XG4gICAgfVxuICAgIHMgKz0gJ10nO1xuICAgIHJldHVybiBzO1xuICB9O1xuXG4gIHJldHVybiBfdGhpcztcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBiYXNlNjRFbmNvZGVPdXRwdXRTdHJlYW1cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmNvbnN0IGJhc2U2NEVuY29kZU91dHB1dFN0cmVhbSA9IGZ1bmN0aW9uKCkge1xuXG4gIGxldCBfYnVmZmVyID0gMDtcbiAgbGV0IF9idWZsZW4gPSAwO1xuICBsZXQgX2xlbmd0aCA9IDA7XG4gIGxldCBfYmFzZTY0ID0gJyc7XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBjb25zdCB3cml0ZUVuY29kZWQgPSBmdW5jdGlvbihiKSB7XG4gICAgX2Jhc2U2NCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGVuY29kZShiICYgMHgzZikgKTtcbiAgfTtcblxuICBjb25zdCBlbmNvZGUgPSBmdW5jdGlvbihuKSB7XG4gICAgaWYgKG4gPCAwKSB7XG4gICAgICB0aHJvdyAnbjonICsgbjtcbiAgICB9IGVsc2UgaWYgKG4gPCAyNikge1xuICAgICAgcmV0dXJuIDB4NDEgKyBuO1xuICAgIH0gZWxzZSBpZiAobiA8IDUyKSB7XG4gICAgICByZXR1cm4gMHg2MSArIChuIC0gMjYpO1xuICAgIH0gZWxzZSBpZiAobiA8IDYyKSB7XG4gICAgICByZXR1cm4gMHgzMCArIChuIC0gNTIpO1xuICAgIH0gZWxzZSBpZiAobiA9PSA2Mikge1xuICAgICAgcmV0dXJuIDB4MmI7XG4gICAgfSBlbHNlIGlmIChuID09IDYzKSB7XG4gICAgICByZXR1cm4gMHgyZjtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgJ246JyArIG47XG4gICAgfVxuICB9O1xuXG4gIF90aGlzLndyaXRlQnl0ZSA9IGZ1bmN0aW9uKG4pIHtcblxuICAgIF9idWZmZXIgPSAoX2J1ZmZlciA8PCA4KSB8IChuICYgMHhmZik7XG4gICAgX2J1ZmxlbiArPSA4O1xuICAgIF9sZW5ndGggKz0gMTtcblxuICAgIHdoaWxlIChfYnVmbGVuID49IDYpIHtcbiAgICAgIHdyaXRlRW5jb2RlZChfYnVmZmVyID4+PiAoX2J1ZmxlbiAtIDYpICk7XG4gICAgICBfYnVmbGVuIC09IDY7XG4gICAgfVxuICB9O1xuXG4gIF90aGlzLmZsdXNoID0gZnVuY3Rpb24oKSB7XG5cbiAgICBpZiAoX2J1ZmxlbiA+IDApIHtcbiAgICAgIHdyaXRlRW5jb2RlZChfYnVmZmVyIDw8ICg2IC0gX2J1ZmxlbikgKTtcbiAgICAgIF9idWZmZXIgPSAwO1xuICAgICAgX2J1ZmxlbiA9IDA7XG4gICAgfVxuXG4gICAgaWYgKF9sZW5ndGggJSAzICE9IDApIHtcbiAgICAgIC8vIHBhZGRpbmdcbiAgICAgIGNvbnN0IHBhZGxlbiA9IDMgLSBfbGVuZ3RoICUgMztcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFkbGVuOyBpICs9IDEpIHtcbiAgICAgICAgX2Jhc2U2NCArPSAnPSc7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIF90aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIF9iYXNlNjQ7XG4gIH07XG5cbiAgcmV0dXJuIF90aGlzO1xufTtcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIGJhc2U2NERlY29kZUlucHV0U3RyZWFtXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBiYXNlNjREZWNvZGVJbnB1dFN0cmVhbSA9IGZ1bmN0aW9uKHN0cikge1xuXG4gIGNvbnN0IF9zdHIgPSBzdHI7XG4gIGxldCBfcG9zID0gMDtcbiAgbGV0IF9idWZmZXIgPSAwO1xuICBsZXQgX2J1ZmxlbiA9IDA7XG5cbiAgY29uc3QgX3RoaXMgPSB7fTtcblxuICBfdGhpcy5yZWFkID0gZnVuY3Rpb24oKSB7XG5cbiAgICB3aGlsZSAoX2J1ZmxlbiA8IDgpIHtcblxuICAgICAgaWYgKF9wb3MgPj0gX3N0ci5sZW5ndGgpIHtcbiAgICAgICAgaWYgKF9idWZsZW4gPT0gMCkge1xuICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyAndW5leHBlY3RlZCBlbmQgb2YgZmlsZS4vJyArIF9idWZsZW47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGMgPSBfc3RyLmNoYXJBdChfcG9zKTtcbiAgICAgIF9wb3MgKz0gMTtcblxuICAgICAgaWYgKGMgPT0gJz0nKSB7XG4gICAgICAgIF9idWZsZW4gPSAwO1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgICB9IGVsc2UgaWYgKGMubWF0Y2goL15cXHMkLykgKSB7XG4gICAgICAgIC8vIGlnbm9yZSBpZiB3aGl0ZXNwYWNlLlxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgX2J1ZmZlciA9IChfYnVmZmVyIDw8IDYpIHwgZGVjb2RlKGMuY2hhckNvZGVBdCgwKSApO1xuICAgICAgX2J1ZmxlbiArPSA2O1xuICAgIH1cblxuICAgIGNvbnN0IG4gPSAoX2J1ZmZlciA+Pj4gKF9idWZsZW4gLSA4KSApICYgMHhmZjtcbiAgICBfYnVmbGVuIC09IDg7XG4gICAgcmV0dXJuIG47XG4gIH07XG5cbiAgY29uc3QgZGVjb2RlID0gZnVuY3Rpb24oYykge1xuICAgIGlmICgweDQxIDw9IGMgJiYgYyA8PSAweDVhKSB7XG4gICAgICByZXR1cm4gYyAtIDB4NDE7XG4gICAgfSBlbHNlIGlmICgweDYxIDw9IGMgJiYgYyA8PSAweDdhKSB7XG4gICAgICByZXR1cm4gYyAtIDB4NjEgKyAyNjtcbiAgICB9IGVsc2UgaWYgKDB4MzAgPD0gYyAmJiBjIDw9IDB4MzkpIHtcbiAgICAgIHJldHVybiBjIC0gMHgzMCArIDUyO1xuICAgIH0gZWxzZSBpZiAoYyA9PSAweDJiKSB7XG4gICAgICByZXR1cm4gNjI7XG4gICAgfSBlbHNlIGlmIChjID09IDB4MmYpIHtcbiAgICAgIHJldHVybiA2MztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgJ2M6JyArIGM7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBfdGhpcztcbn07XG5cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBnaWZJbWFnZSAoQi9XKVxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuY29uc3QgZ2lmSW1hZ2UgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KSB7XG5cbiAgY29uc3QgX3dpZHRoID0gd2lkdGg7XG4gIGNvbnN0IF9oZWlnaHQgPSBoZWlnaHQ7XG4gIGNvbnN0IF9kYXRhID0gbmV3IEFycmF5KHdpZHRoICogaGVpZ2h0KTtcblxuICBjb25zdCBfdGhpcyA9IHt9O1xuXG4gIF90aGlzLnNldFBpeGVsID0gZnVuY3Rpb24oeCwgeSwgcGl4ZWwpIHtcbiAgICBfZGF0YVt5ICogX3dpZHRoICsgeF0gPSBwaXhlbDtcbiAgfTtcblxuICBfdGhpcy53cml0ZSA9IGZ1bmN0aW9uKG91dCkge1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHSUYgU2lnbmF0dXJlXG5cbiAgICBvdXQud3JpdGVTdHJpbmcoJ0dJRjg3YScpO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTY3JlZW4gRGVzY3JpcHRvclxuXG4gICAgb3V0LndyaXRlU2hvcnQoX3dpZHRoKTtcbiAgICBvdXQud3JpdGVTaG9ydChfaGVpZ2h0KTtcblxuICAgIG91dC53cml0ZUJ5dGUoMHg4MCk7IC8vIDJiaXRcbiAgICBvdXQud3JpdGVCeXRlKDApO1xuICAgIG91dC53cml0ZUJ5dGUoMCk7XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEdsb2JhbCBDb2xvciBNYXBcblxuICAgIC8vIGJsYWNrXG4gICAgb3V0LndyaXRlQnl0ZSgweDAwKTtcbiAgICBvdXQud3JpdGVCeXRlKDB4MDApO1xuICAgIG91dC53cml0ZUJ5dGUoMHgwMCk7XG5cbiAgICAvLyB3aGl0ZVxuICAgIG91dC53cml0ZUJ5dGUoMHhmZik7XG4gICAgb3V0LndyaXRlQnl0ZSgweGZmKTtcbiAgICBvdXQud3JpdGVCeXRlKDB4ZmYpO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBJbWFnZSBEZXNjcmlwdG9yXG5cbiAgICBvdXQud3JpdGVTdHJpbmcoJywnKTtcbiAgICBvdXQud3JpdGVTaG9ydCgwKTtcbiAgICBvdXQud3JpdGVTaG9ydCgwKTtcbiAgICBvdXQud3JpdGVTaG9ydChfd2lkdGgpO1xuICAgIG91dC53cml0ZVNob3J0KF9oZWlnaHQpO1xuICAgIG91dC53cml0ZUJ5dGUoMCk7XG5cbiAgICAvLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIExvY2FsIENvbG9yIE1hcFxuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBSYXN0ZXIgRGF0YVxuXG4gICAgY29uc3QgbHp3TWluQ29kZVNpemUgPSAyO1xuICAgIGNvbnN0IHJhc3RlciA9IGdldExaV1Jhc3RlcihsendNaW5Db2RlU2l6ZSk7XG5cbiAgICBvdXQud3JpdGVCeXRlKGx6d01pbkNvZGVTaXplKTtcblxuICAgIGxldCBvZmZzZXQgPSAwO1xuXG4gICAgd2hpbGUgKHJhc3Rlci5sZW5ndGggLSBvZmZzZXQgPiAyNTUpIHtcbiAgICAgIG91dC53cml0ZUJ5dGUoMjU1KTtcbiAgICAgIG91dC53cml0ZUJ5dGVzKHJhc3Rlciwgb2Zmc2V0LCAyNTUpO1xuICAgICAgb2Zmc2V0ICs9IDI1NTtcbiAgICB9XG5cbiAgICBvdXQud3JpdGVCeXRlKHJhc3Rlci5sZW5ndGggLSBvZmZzZXQpO1xuICAgIG91dC53cml0ZUJ5dGVzKHJhc3Rlciwgb2Zmc2V0LCByYXN0ZXIubGVuZ3RoIC0gb2Zmc2V0KTtcbiAgICBvdXQud3JpdGVCeXRlKDB4MDApO1xuXG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBHSUYgVGVybWluYXRvclxuICAgIG91dC53cml0ZVN0cmluZygnOycpO1xuICB9O1xuXG4gIGNvbnN0IGJpdE91dHB1dFN0cmVhbSA9IGZ1bmN0aW9uKG91dCkge1xuXG4gICAgY29uc3QgX291dCA9IG91dDtcbiAgICBsZXQgX2JpdExlbmd0aCA9IDA7XG4gICAgbGV0IF9iaXRCdWZmZXIgPSAwO1xuXG4gICAgY29uc3QgX3RoaXMgPSB7fTtcblxuICAgIF90aGlzLndyaXRlID0gZnVuY3Rpb24oZGF0YSwgbGVuZ3RoKSB7XG5cbiAgICAgIGlmICggKGRhdGEgPj4+IGxlbmd0aCkgIT0gMCkge1xuICAgICAgICB0aHJvdyAnbGVuZ3RoIG92ZXInO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAoX2JpdExlbmd0aCArIGxlbmd0aCA+PSA4KSB7XG4gICAgICAgIF9vdXQud3JpdGVCeXRlKDB4ZmYgJiAoIChkYXRhIDw8IF9iaXRMZW5ndGgpIHwgX2JpdEJ1ZmZlcikgKTtcbiAgICAgICAgbGVuZ3RoIC09ICg4IC0gX2JpdExlbmd0aCk7XG4gICAgICAgIGRhdGEgPj4+PSAoOCAtIF9iaXRMZW5ndGgpO1xuICAgICAgICBfYml0QnVmZmVyID0gMDtcbiAgICAgICAgX2JpdExlbmd0aCA9IDA7XG4gICAgICB9XG5cbiAgICAgIF9iaXRCdWZmZXIgPSAoZGF0YSA8PCBfYml0TGVuZ3RoKSB8IF9iaXRCdWZmZXI7XG4gICAgICBfYml0TGVuZ3RoID0gX2JpdExlbmd0aCArIGxlbmd0aDtcbiAgICB9O1xuXG4gICAgX3RoaXMuZmx1c2ggPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChfYml0TGVuZ3RoID4gMCkge1xuICAgICAgICBfb3V0LndyaXRlQnl0ZShfYml0QnVmZmVyKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgcmV0dXJuIF90aGlzO1xuICB9O1xuXG4gIGNvbnN0IGdldExaV1Jhc3RlciA9IGZ1bmN0aW9uKGx6d01pbkNvZGVTaXplKSB7XG5cbiAgICBjb25zdCBjbGVhckNvZGUgPSAxIDw8IGx6d01pbkNvZGVTaXplO1xuICAgIGNvbnN0IGVuZENvZGUgPSAoMSA8PCBsendNaW5Db2RlU2l6ZSkgKyAxO1xuICAgIGxldCBiaXRMZW5ndGggPSBsendNaW5Db2RlU2l6ZSArIDE7XG5cbiAgICAvLyBTZXR1cCBMWldUYWJsZVxuICAgIGNvbnN0IHRhYmxlID0gbHp3VGFibGUoKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xlYXJDb2RlOyBpICs9IDEpIHtcbiAgICAgIHRhYmxlLmFkZChTdHJpbmcuZnJvbUNoYXJDb2RlKGkpICk7XG4gICAgfVxuICAgIHRhYmxlLmFkZChTdHJpbmcuZnJvbUNoYXJDb2RlKGNsZWFyQ29kZSkgKTtcbiAgICB0YWJsZS5hZGQoU3RyaW5nLmZyb21DaGFyQ29kZShlbmRDb2RlKSApO1xuXG4gICAgY29uc3QgYnl0ZU91dCA9IGJ5dGVBcnJheU91dHB1dFN0cmVhbSgpO1xuICAgIGNvbnN0IGJpdE91dCA9IGJpdE91dHB1dFN0cmVhbShieXRlT3V0KTtcblxuICAgIC8vIGNsZWFyIGNvZGVcbiAgICBiaXRPdXQud3JpdGUoY2xlYXJDb2RlLCBiaXRMZW5ndGgpO1xuXG4gICAgbGV0IGRhdGFJbmRleCA9IDA7XG5cbiAgICBsZXQgcyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoX2RhdGFbZGF0YUluZGV4XSk7XG4gICAgZGF0YUluZGV4ICs9IDE7XG5cbiAgICB3aGlsZSAoZGF0YUluZGV4IDwgX2RhdGEubGVuZ3RoKSB7XG5cbiAgICAgIGNvbnN0IGMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKF9kYXRhW2RhdGFJbmRleF0pO1xuICAgICAgZGF0YUluZGV4ICs9IDE7XG5cbiAgICAgIGlmICh0YWJsZS5jb250YWlucyhzICsgYykgKSB7XG5cbiAgICAgICAgcyA9IHMgKyBjO1xuXG4gICAgICB9IGVsc2Uge1xuXG4gICAgICAgIGJpdE91dC53cml0ZSh0YWJsZS5pbmRleE9mKHMpLCBiaXRMZW5ndGgpO1xuXG4gICAgICAgIGlmICh0YWJsZS5zaXplKCkgPCAweGZmZikge1xuXG4gICAgICAgICAgaWYgKHRhYmxlLnNpemUoKSA9PSAoMSA8PCBiaXRMZW5ndGgpICkge1xuICAgICAgICAgICAgYml0TGVuZ3RoICs9IDE7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGFibGUuYWRkKHMgKyBjKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHMgPSBjO1xuICAgICAgfVxuICAgIH1cblxuICAgIGJpdE91dC53cml0ZSh0YWJsZS5pbmRleE9mKHMpLCBiaXRMZW5ndGgpO1xuXG4gICAgLy8gZW5kIGNvZGVcbiAgICBiaXRPdXQud3JpdGUoZW5kQ29kZSwgYml0TGVuZ3RoKTtcblxuICAgIGJpdE91dC5mbHVzaCgpO1xuXG4gICAgcmV0dXJuIGJ5dGVPdXQudG9CeXRlQXJyYXkoKTtcbiAgfTtcblxuICBjb25zdCBsendUYWJsZSA9IGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgX21hcCA9IHt9O1xuICAgIGxldCBfc2l6ZSA9IDA7XG5cbiAgICBjb25zdCBfdGhpcyA9IHt9O1xuXG4gICAgX3RoaXMuYWRkID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICBpZiAoX3RoaXMuY29udGFpbnMoa2V5KSApIHtcbiAgICAgICAgdGhyb3cgJ2R1cCBrZXk6JyArIGtleTtcbiAgICAgIH1cbiAgICAgIF9tYXBba2V5XSA9IF9zaXplO1xuICAgICAgX3NpemUgKz0gMTtcbiAgICB9O1xuXG4gICAgX3RoaXMuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF9zaXplO1xuICAgIH07XG5cbiAgICBfdGhpcy5pbmRleE9mID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICByZXR1cm4gX21hcFtrZXldO1xuICAgIH07XG5cbiAgICBfdGhpcy5jb250YWlucyA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIHR5cGVvZiBfbWFwW2tleV0gIT0gJ3VuZGVmaW5lZCc7XG4gICAgfTtcblxuICAgIHJldHVybiBfdGhpcztcbiAgfTtcblxuICByZXR1cm4gX3RoaXM7XG59O1xuXG5jb25zdCBjcmVhdGVEYXRhVVJMID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCwgZ2V0UGl4ZWwpIHtcbiAgY29uc3QgZ2lmID0gZ2lmSW1hZ2Uod2lkdGgsIGhlaWdodCk7XG4gIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5ICs9IDEpIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4ICs9IDEpIHtcbiAgICAgIGdpZi5zZXRQaXhlbCh4LCB5LCBnZXRQaXhlbCh4LCB5KSApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGIgPSBieXRlQXJyYXlPdXRwdXRTdHJlYW0oKTtcbiAgZ2lmLndyaXRlKGIpO1xuXG4gIGNvbnN0IGJhc2U2NCA9IGJhc2U2NEVuY29kZU91dHB1dFN0cmVhbSgpO1xuICBjb25zdCBieXRlcyA9IGIudG9CeXRlQXJyYXkoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGJhc2U2NC53cml0ZUJ5dGUoYnl0ZXNbaV0pO1xuICB9XG4gIGJhc2U2NC5mbHVzaCgpO1xuXG4gIHJldHVybiAnZGF0YTppbWFnZS9naWY7YmFzZTY0LCcgKyBiYXNlNjQ7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBxcmNvZGU7XG5cbmV4cG9ydCBjb25zdCBzdHJpbmdUb0J5dGVzID0gcXJjb2RlLnN0cmluZ1RvQnl0ZXM7XG4iLCAiLyoqXG4gKiBCbHVlIE5vaXNlIERpdGhlcmluZyBNb2R1bGUgZm9yIFFSIENvZGVzXG4gKlxuICogVXNlcyBibHVlIG5vaXNlIHRocmVzaG9sZGluZyBpbnN0ZWFkIG9mIEZsb3lkLVN0ZWluYmVyZyBlcnJvciBkaWZmdXNpb24uXG4gKiBGb2xsb3dzIHRoZSBzYW1lIHN0cnVjdHVyZSBhcyBnZW5lcmF0ZS50cyB0byBwcmVzZXJ2ZSBRUiBzY2FubmFiaWxpdHk6XG4gKiAtIERhdGEgcG9pbnRzIChjZW50ZXIgb2YgZWFjaCBtb2R1bGUpIE1VU1QgcHJlc2VydmUgUVIgdmFsdWVzXG4gKiAtIE9ubHkgXCJmcmVlIHBvaW50c1wiIChub24tbG9ja2VkLCBub24tZGF0YSkgY2FuIGJlIGRpdGhlcmVkXG4gKiAtIEJsdWUgbm9pc2UgcHJvdmlkZXMgYmV0dGVyIHZpc3VhbCBxdWFsaXR5IHRoYW4gb3JkZXJlZCBkaXRoZXJpbmdcbiAqL1xuXG5pbXBvcnQgcXJjb2RlIGZyb20gXCIuLi8uLi92ZW5kb3IvbGliL3FyY29kZS1nZW5lcmF0b3IvcXJjb2RlLm1qc1wiO1xuXG4vLyBFcnJvciBjb3JyZWN0aW9uIGxldmVsIG1hcHBpbmdcbmNvbnN0IEVDQ19NQVA6IFJlY29yZDxzdHJpbmcsIFwiTFwiIHwgXCJNXCIgfCBcIlFcIiB8IFwiSFwiPiA9IHtcbiAgTDogXCJMXCIsXG4gIE06IFwiTVwiLFxuICBROiBcIlFcIixcbiAgSDogXCJIXCIsXG4gIGxvdzogXCJMXCIsXG4gIG1lZGl1bTogXCJNXCIsXG4gIHF1YXJ0aWxlOiBcIlFcIixcbiAgaGlnaDogXCJIXCIsXG59O1xuXG4vLyBBbGlnbm1lbnQgcGF0dGVybiBwb3NpdGlvbnMgYnkgdmVyc2lvblxuY29uc3QgQUxJR05NRU5UX1BPU0lUSU9OUzogKG51bWJlcltdIHwgbnVsbClbXSA9IFtcbiAgbnVsbCxcbiAgW10sXG4gIFs2LCAxOF0sXG4gIFs2LCAyMl0sXG4gIFs2LCAyNl0sXG4gIFs2LCAzMF0sXG4gIFs2LCAzNF0sXG4gIFs2LCAyMiwgMzhdLFxuICBbNiwgMjQsIDQyXSxcbiAgWzYsIDI2LCA0Nl0sXG4gIFs2LCAyOCwgNTBdLFxuICBbNiwgMzAsIDU0XSxcbiAgWzYsIDMyLCA1OF0sXG4gIFs2LCAzNCwgNjJdLFxuICBbNiwgMjYsIDQ2LCA2Nl0sXG4gIFs2LCAyNiwgNDgsIDcwXSxcbiAgWzYsIDI2LCA1MCwgNzRdLFxuICBbNiwgMzAsIDU0LCA3OF0sXG4gIFs2LCAzMCwgNTYsIDgyXSxcbiAgWzYsIDMwLCA1OCwgODZdLFxuICBbNiwgMzQsIDYyLCA5MF0sXG4gIFs2LCAyOCwgNTAsIDcyLCA5NF0sXG4gIFs2LCAyNiwgNTAsIDc0LCA5OF0sXG4gIFs2LCAzMCwgNTQsIDc4LCAxMDJdLFxuICBbNiwgMjgsIDU0LCA4MCwgMTA2XSxcbiAgWzYsIDMyLCA1OCwgODQsIDExMF0sXG4gIFs2LCAzMCwgNTgsIDg2LCAxMTRdLFxuICBbNiwgMzQsIDYyLCA5MCwgMTE4XSxcbiAgWzYsIDI2LCA1MCwgNzQsIDk4LCAxMjJdLFxuICBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjZdLFxuICBbNiwgMjYsIDUyLCA3OCwgMTA0LCAxMzBdLFxuICBbNiwgMzAsIDU2LCA4MiwgMTA4LCAxMzRdLFxuICBbNiwgMzQsIDYwLCA4NiwgMTEyLCAxMzhdLFxuICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDJdLFxuICBbNiwgMzQsIDYyLCA5MCwgMTE4LCAxNDZdLFxuICBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjYsIDE1MF0sXG4gIFs2LCAyNCwgNTAsIDc2LCAxMDIsIDEyOCwgMTU0XSxcbiAgWzYsIDI4LCA1NCwgODAsIDEwNiwgMTMyLCAxNThdLFxuICBbNiwgMzIsIDU4LCA4NCwgMTEwLCAxMzYsIDE2Ml0sXG4gIFs2LCAyNiwgNTQsIDgyLCAxMTAsIDEzOCwgMTY2XSxcbiAgWzYsIDMwLCA1OCwgODYsIDExNCwgMTQyLCAxNzBdLFxuXTtcblxuLy8gUHJlLWNvbXB1dGVkIDY0eDY0IGJsdWUgbm9pc2UgdGlsZSAobm9ybWFsaXplZCAwLTEpXG4vLyBHZW5lcmF0ZWQgdXNpbmcgaW50ZXJsZWF2ZWQgZ3JhZGllbnQgbm9pc2UgZm9yIGdvb2Qgc3BlY3RyYWwgcHJvcGVydGllc1xuY29uc3QgQkxVRV9OT0lTRV9USUxFX1NJWkUgPSA2NDtcbmNvbnN0IEJMVUVfTk9JU0VfNjQ6IG51bWJlcltdID0gZ2VuZXJhdGVCbHVlTm9pc2VUaWxlKCk7XG5cbmV4cG9ydCB0eXBlIENvbG9yTW9kZSA9IFwiY29sb3JcIiB8IFwiZ3JheXNjYWxlXCIgfCBcImJ3XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmx1ZU5vaXNlT3B0aW9ucyB7XG4gIHRleHQ6IHN0cmluZztcbiAgZWNjOiBzdHJpbmc7XG4gIHZlcnNpb24/OiBudW1iZXI7XG4gIHNjYWxlOiBudW1iZXI7XG4gIG92ZXJsYXlDYW52YXM/OiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgb3ZlcmxheUludGVuc2l0eT86IG51bWJlcjtcbiAgY29sb3JNb2RlPzogQ29sb3JNb2RlO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJHQiB7XG4gIHI6IG51bWJlcjtcbiAgZzogbnVtYmVyO1xuICBiOiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQmx1ZU5vaXNlUmVzdWx0IHtcbiAgbWF0cml4OiBib29sZWFuW11bXTtcbiAgY29sb3JzOiBSR0JbXVtdO1xufVxuXG4vKipcbiAqIEdlbmVyYXRlIGEgcHNldWRvLWJsdWUtbm9pc2UgdGlsZSB1c2luZyBpbnRlcmxlYXZlZCBncmFkaWVudCBub2lzZVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZUJsdWVOb2lzZVRpbGUoKTogbnVtYmVyW10ge1xuICBjb25zdCBzaXplID0gQkxVRV9OT0lTRV9USUxFX1NJWkU7XG4gIGNvbnN0IHRpbGU6IG51bWJlcltdID0gbmV3IEFycmF5KHNpemUgKiBzaXplKTtcblxuICBjb25zdCBwaGkgPSAxLjYxODAzMzk4ODc0OTg5NTsgLy8gR29sZGVuIHJhdGlvXG5cbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBzaXplOyB5KyspIHtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgICAgLy8gSW50ZXJsZWF2ZWQgZ3JhZGllbnQgbm9pc2UgZm9ybXVsYVxuICAgICAgY29uc3QgaWduID0gKDUyLjk4MjkxODkgKiAoKDAuMDY3MTEwNTYgKiB4ICsgMC4wMDU4MzcxNSAqIHkpICUgMSkpICUgMTtcbiAgICAgIC8vIEFkZCBnb2xkZW4gcmF0aW8gYmFzZWQgb2Zmc2V0IGZvciBiZXR0ZXIgZGlzdHJpYnV0aW9uXG4gICAgICBjb25zdCBvZmZzZXQgPSAoeCAqIHBoaSArIHkgKiBwaGkgKiBwaGkpICUgMTtcbiAgICAgIC8vIENvbWJpbmUgYW5kIG5vcm1hbGl6ZVxuICAgICAgdGlsZVt5ICogc2l6ZSArIHhdID0gKGlnbiArIG9mZnNldCAqIDAuNSkgJSAxO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aWxlO1xufVxuXG4vKipcbiAqIFNhbXBsZSB0aGUgYmx1ZSBub2lzZSB0aWxlIGF0IHBvc2l0aW9uICh4LCB5KVxuICovXG5mdW5jdGlvbiBzYW1wbGVCbHVlTm9pc2UoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBzaXplID0gQkxVRV9OT0lTRV9USUxFX1NJWkU7XG4gIGNvbnN0IHR4ID0gKCh4ICUgc2l6ZSkgKyBzaXplKSAlIHNpemU7XG4gIGNvbnN0IHR5ID0gKCh5ICUgc2l6ZSkgKyBzaXplKSAlIHNpemU7XG4gIHJldHVybiBCTFVFX05PSVNFXzY0W3R5ICogc2l6ZSArIHR4XTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHBvc2l0aW9uIGlzIGEgbG9ja2VkIHN0cnVjdHVyYWwgZWxlbWVudCAoZmluZGVyIHBhdHRlcm5zLCB0aW1pbmcsIGFsaWdubWVudClcbiAqIENvcGllZCBmcm9tIGdlbmVyYXRlLnRzIHRvIGVuc3VyZSBpZGVudGljYWwgYmVoYXZpb3JcbiAqL1xuZnVuY3Rpb24gaXNMb2NrZWQoXG4gIG1vZHVsZUNvdW50OiBudW1iZXIsXG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxuICBzY2FsZTogbnVtYmVyLFxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGwgPSBtb2R1bGVDb3VudCAvIHNjYWxlO1xuICBjb25zdCBzeCA9IE1hdGguZmxvb3IoeCAvIHNjYWxlKTtcbiAgY29uc3Qgc3kgPSBNYXRoLmZsb29yKHkgLyBzY2FsZSk7XG5cbiAgLy8gT3V0IG9mIGJvdW5kc1xuICBpZiAoc3ggPCAwIHx8IHN5IDwgMCB8fCBzeCA+PSBsIHx8IHN5ID49IGwpIHJldHVybiB0cnVlO1xuXG4gIC8vIEZpbmRlciBwYXR0ZXJucyAodG9wLWxlZnQsIHRvcC1yaWdodCwgYm90dG9tLWxlZnQpXG4gIGlmIChzeCA8IDcgJiYgc3kgPCA3KSByZXR1cm4gdHJ1ZTtcbiAgaWYgKHN4IDwgNyAmJiBzeSA+IGwgLSA4KSByZXR1cm4gdHJ1ZTtcbiAgaWYgKHN4ID4gbCAtIDggJiYgc3kgPCA3KSByZXR1cm4gdHJ1ZTtcblxuICAvLyBUaW1pbmcgcGF0dGVybnNcbiAgaWYgKHN4ID09PSA2IHx8IHN5ID09PSA2KSByZXR1cm4gdHJ1ZTtcblxuICAvLyBBbGlnbm1lbnQgcGF0dGVybnNcbiAgY29uc3QgdmVyc2lvbiA9IChsIC0gMTcpIC8gNDtcbiAgY29uc3QgcG9zaXRpb25zID0gQUxJR05NRU5UX1BPU0lUSU9OU1t2ZXJzaW9uXTtcbiAgaWYgKHBvc2l0aW9ucyAmJiBwb3NpdGlvbnMubGVuZ3RoID4gMCkge1xuICAgIGZvciAoY29uc3QgcHggb2YgcG9zaXRpb25zKSB7XG4gICAgICBmb3IgKGNvbnN0IHB5IG9mIHBvc2l0aW9ucykge1xuICAgICAgICAvLyBTa2lwIGFsaWdubWVudCBwYXR0ZXJucyB0aGF0IG92ZXJsYXAgd2l0aCBmaW5kZXIgcGF0dGVybnNcbiAgICAgICAgaWYgKHB4IDwgOCAmJiBweSA8IDgpIGNvbnRpbnVlO1xuICAgICAgICBpZiAocHggPCA4ICYmIHB5ID4gbCAtIDkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAocHggPiBsIC0gOSAmJiBweSA8IDgpIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhzeCAtIHB4KSA8PSAyICYmIE1hdGguYWJzKHN5IC0gcHkpIDw9IDIpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHBvc2l0aW9uIGlzIGEgZGF0YSBwb2ludCAoY2VudGVyIG9mIHNjYWxlZCBtb2R1bGUpXG4gKiBDb3BpZWQgZnJvbSBnZW5lcmF0ZS50cyB0byBlbnN1cmUgaWRlbnRpY2FsIGJlaGF2aW9yXG4gKi9cbmZ1bmN0aW9uIGlzRGF0YSh4OiBudW1iZXIsIHk6IG51bWJlciwgc2NhbGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICBjb25zdCBtID0gTWF0aC5mbG9vcihzY2FsZSAvIDIpO1xuICBjb25zdCB4cyA9IHggJSBzY2FsZTtcbiAgY29uc3QgeXMgPSB5ICUgc2NhbGU7XG5cbiAgaWYgKHhzID09PSBtICYmIHlzID09PSBtKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKHNjYWxlICUgMiA9PT0gMSkgcmV0dXJuIGZhbHNlO1xuXG4gIC8vIEZvciBldmVuIHNjYWxlcywgZGF0YSBvY2N1cGllcyAyeDIgY2VudGVyXG4gIGlmICh4cyA9PT0gbSAmJiB5cyA9PT0gbSAtIDEpIHJldHVybiB0cnVlO1xuICBpZiAoeHMgPT09IG0gLSAxICYmIHlzID09PSBtKSByZXR1cm4gdHJ1ZTtcbiAgaWYgKHhzID09PSBtIC0gMSAmJiB5cyA9PT0gbSAtIDEpIHJldHVybiB0cnVlO1xuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBMb2FkIGltYWdlIGRhdGEgZnJvbSBjYW52YXMgYXMgUkdCIHZhbHVlcyAoMC0xIHJhbmdlKVxuICovXG5mdW5jdGlvbiBsb2FkSW1hZ2VEYXRhUkdCKFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBzaXplOiBudW1iZXIsXG4pOiB7IHI6IG51bWJlcjsgZzogbnVtYmVyOyBiOiBudW1iZXIgfVtdW10ge1xuICBjb25zdCB0ZW1wQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgdGVtcENhbnZhcy53aWR0aCA9IHNpemU7XG4gIHRlbXBDYW52YXMuaGVpZ2h0ID0gc2l6ZTtcbiAgY29uc3QgY3R4ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikhO1xuXG4gIGN0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwLCBzaXplLCBzaXplKTtcbiAgY29uc3QgaW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgc2l6ZSwgc2l6ZSk7XG5cbiAgY29uc3Qgb3V0cHV0OiB7IHI6IG51bWJlcjsgZzogbnVtYmVyOyBiOiBudW1iZXIgfVtdW10gPSBbXTtcbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBzaXplOyB5KyspIHtcbiAgICBjb25zdCByb3c6IHsgcjogbnVtYmVyOyBnOiBudW1iZXI7IGI6IG51bWJlciB9W10gPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNpemU7IHgrKykge1xuICAgICAgY29uc3QgaSA9ICh5ICogc2l6ZSArIHgpICogNDtcbiAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgcjogaW1nRGF0YS5kYXRhW2ldIC8gMjU1LFxuICAgICAgICBnOiBpbWdEYXRhLmRhdGFbaSArIDFdIC8gMjU1LFxuICAgICAgICBiOiBpbWdEYXRhLmRhdGFbaSArIDJdIC8gMjU1LFxuICAgICAgfSk7XG4gICAgfVxuICAgIG91dHB1dC5wdXNoKHJvdyk7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0O1xufVxuXG4vKipcbiAqIENvbnZlcnQgUkdCIHRvIGdyYXlzY2FsZSB1c2luZyBsdW1pbmFuY2UgZm9ybXVsYVxuICovXG5mdW5jdGlvbiByZ2JUb0dyYXkocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiByICogMC4yOTkgKyBnICogMC41ODcgKyBiICogMC4xMTQ7XG59XG5cbi8qKlxuICogQ29udmVydCBSR0IgaW1hZ2UgZGF0YSB0byBncmF5c2NhbGVcbiAqL1xuZnVuY3Rpb24gY29udmVydFRvR3JheXNjYWxlKFxuICBpbWFnZURhdGE6IHsgcjogbnVtYmVyOyBnOiBudW1iZXI7IGI6IG51bWJlciB9W11bXSxcbik6IHZvaWQge1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IGltYWdlRGF0YS5sZW5ndGg7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgaW1hZ2VEYXRhW3ldLmxlbmd0aDsgeCsrKSB7XG4gICAgICBjb25zdCB7IHIsIGcsIGIgfSA9IGltYWdlRGF0YVt5XVt4XTtcbiAgICAgIGNvbnN0IGdyYXkgPSByZ2JUb0dyYXkociwgZywgYik7XG4gICAgICBpbWFnZURhdGFbeV1beF0gPSB7IHI6IGdyYXksIGc6IGdyYXksIGI6IGdyYXkgfTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBBcHBseSBibHVlIG5vaXNlIGRpdGhlcmluZyB0byBmcmVlIHBvaW50c1xuICogVXNlcyBibHVlIG5vaXNlIHRocmVzaG9sZCBpbnN0ZWFkIG9mIEZsb3lkLVN0ZWluYmVyZyBlcnJvciBkaWZmdXNpb25cbiAqL1xuZnVuY3Rpb24gYmx1ZU5vaXNlRGl0aGVyRnJlZVBvaW50cyhcbiAgaW1hZ2VEYXRhOiB7IHI6IG51bWJlcjsgZzogbnVtYmVyOyBiOiBudW1iZXIgfVtdW10sXG4gIG1vZHVsZUNvdW50OiBudW1iZXIsXG4gIHNjYWxlOiBudW1iZXIsXG4gIGNvbG9yTW9kZTogQ29sb3JNb2RlLFxuKTogdm9pZCB7XG4gIGNvbnN0IHNpemUgPSBpbWFnZURhdGEubGVuZ3RoO1xuXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgc2l6ZTsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzaXplOyB4KyspIHtcbiAgICAgIC8vIE9ubHkgcHJvY2VzcyBmcmVlIHBvaW50cyAobm90IGxvY2tlZCwgbm90IGRhdGEpXG4gICAgICBpZiAoaXNMb2NrZWQobW9kdWxlQ291bnQsIHgsIHksIHNjYWxlKSkgY29udGludWU7XG4gICAgICBpZiAoaXNEYXRhKHgsIHksIHNjYWxlKSkgY29udGludWU7XG5cbiAgICAgIGNvbnN0IHBpeGVsID0gaW1hZ2VEYXRhW3ldW3hdO1xuICAgICAgY29uc3QgdGhyZXNob2xkID0gc2FtcGxlQmx1ZU5vaXNlKHgsIHkpO1xuXG4gICAgICBpZiAoY29sb3JNb2RlID09PSBcImJ3XCIpIHtcbiAgICAgICAgLy8gQmxhY2sgJiB3aGl0ZTogcXVhbnRpemUgdG8gMCBvciAxIHVzaW5nIGJsdWUgbm9pc2UgdGhyZXNob2xkXG4gICAgICAgIGNvbnN0IGdyYXkgPSByZ2JUb0dyYXkocGl4ZWwuciwgcGl4ZWwuZywgcGl4ZWwuYik7XG4gICAgICAgIGNvbnN0IG5ld1ZhbCA9IGdyYXkgPiB0aHJlc2hvbGQgPyAxIDogMDtcbiAgICAgICAgaW1hZ2VEYXRhW3ldW3hdID0geyByOiBuZXdWYWwsIGc6IG5ld1ZhbCwgYjogbmV3VmFsIH07XG4gICAgICB9IGVsc2UgaWYgKGNvbG9yTW9kZSA9PT0gXCJncmF5c2NhbGVcIikge1xuICAgICAgICAvLyBHcmF5c2NhbGU6IHF1YW50aXplIHVzaW5nIGJsdWUgbm9pc2UgZm9yIGVhY2ggbGV2ZWwgZGVjaXNpb25cbiAgICAgICAgY29uc3QgZ3JheSA9IHJnYlRvR3JheShwaXhlbC5yLCBwaXhlbC5nLCBwaXhlbC5iKTtcbiAgICAgICAgLy8gNCBsZXZlbHM6IDAsIDAuMzMsIDAuNjcsIDFcbiAgICAgICAgY29uc3QgbGV2ZWxzID0gNDtcbiAgICAgICAgY29uc3Qgc2NhbGVkID0gZ3JheSAqIChsZXZlbHMgLSAxKTtcbiAgICAgICAgY29uc3QgbG93ID0gTWF0aC5mbG9vcihzY2FsZWQpO1xuICAgICAgICBjb25zdCBoaWdoID0gTWF0aC5taW4obG93ICsgMSwgbGV2ZWxzIC0gMSk7XG4gICAgICAgIGNvbnN0IGZyYWMgPSBzY2FsZWQgLSBsb3c7XG4gICAgICAgIC8vIFVzZSBibHVlIG5vaXNlIHRvIGRlY2lkZSBiZXR3ZWVuIGxvdyBhbmQgaGlnaCBsZXZlbFxuICAgICAgICBjb25zdCBuZXdWYWwgPSAoZnJhYyA+IHRocmVzaG9sZCA/IGhpZ2ggOiBsb3cpIC8gKGxldmVscyAtIDEpO1xuICAgICAgICBpbWFnZURhdGFbeV1beF0gPSB7IHI6IG5ld1ZhbCwgZzogbmV3VmFsLCBiOiBuZXdWYWwgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENvbG9yIG1vZGU6IHF1YW50aXplIGVhY2ggY2hhbm5lbCB1c2luZyBibHVlIG5vaXNlXG4gICAgICAgIGNvbnN0IGxldmVscyA9IDQ7XG5cbiAgICAgICAgZnVuY3Rpb24gcXVhbnRpemVDaGFubmVsKHZhbDogbnVtYmVyLCBub2lzZU9mZnNldDogbnVtYmVyKTogbnVtYmVyIHtcbiAgICAgICAgICBjb25zdCB0ID0gKHRocmVzaG9sZCArIG5vaXNlT2Zmc2V0KSAlIDE7XG4gICAgICAgICAgY29uc3Qgc2NhbGVkID0gdmFsICogKGxldmVscyAtIDEpO1xuICAgICAgICAgIGNvbnN0IGxvdyA9IE1hdGguZmxvb3Ioc2NhbGVkKTtcbiAgICAgICAgICBjb25zdCBoaWdoID0gTWF0aC5taW4obG93ICsgMSwgbGV2ZWxzIC0gMSk7XG4gICAgICAgICAgY29uc3QgZnJhYyA9IHNjYWxlZCAtIGxvdztcbiAgICAgICAgICByZXR1cm4gKGZyYWMgPiB0ID8gaGlnaCA6IGxvdykgLyAobGV2ZWxzIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVc2UgZGlmZmVyZW50IG5vaXNlIG9mZnNldHMgZm9yIFIsIEcsIEIgdG8gYXZvaWQgY29sb3IgYmFuZGluZ1xuICAgICAgICBpbWFnZURhdGFbeV1beF0gPSB7XG4gICAgICAgICAgcjogcXVhbnRpemVDaGFubmVsKHBpeGVsLnIsIDApLFxuICAgICAgICAgIGc6IHF1YW50aXplQ2hhbm5lbChwaXhlbC5nLCAwLjMzKSxcbiAgICAgICAgICBiOiBxdWFudGl6ZUNoYW5uZWwocGl4ZWwuYiwgMC42NyksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2VuZXJhdGUgYSBibHVlLW5vaXNlIGRpdGhlcmVkIFFSIGNvZGUgbWF0cml4XG4gKlxuICogQHBhcmFtIG9wdGlvbnMgLSBHZW5lcmF0aW9uIG9wdGlvbnNcbiAqIEByZXR1cm5zIE9iamVjdCBjb250YWluaW5nIGJvb2xlYW4gbWF0cml4IGFuZCBSR0IgY29sb3IgZGF0YSBmb3IgZWFjaCBwaXhlbFxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVCbHVlTm9pc2VEaXRoZXJlZChcbiAgb3B0aW9uczogQmx1ZU5vaXNlT3B0aW9ucyxcbik6IEJsdWVOb2lzZVJlc3VsdCB7XG4gIGNvbnN0IHtcbiAgICB0ZXh0LFxuICAgIGVjYyxcbiAgICB2ZXJzaW9uID0gMCxcbiAgICBzY2FsZSxcbiAgICBvdmVybGF5Q2FudmFzLFxuICAgIG92ZXJsYXlJbnRlbnNpdHkgPSA1MCxcbiAgICBjb2xvck1vZGUgPSBcImNvbG9yXCIsXG4gIH0gPSBvcHRpb25zO1xuXG4gIC8vIE1hcCBlcnJvciBjb3JyZWN0aW9uIGxldmVsXG4gIGNvbnN0IGVjY0xldmVsID0gRUNDX01BUFtlY2NdIHx8IFwiUVwiO1xuXG4gIC8vIEdlbmVyYXRlIGJhc2UgUVIgY29kZSB1c2luZyB2ZW5kb3IgbGlicmFyeVxuICBjb25zdCB0eXBlTnVtYmVyID0gdmVyc2lvbiB8fCAwO1xuICBjb25zdCBxciA9IHFyY29kZSh0eXBlTnVtYmVyLCBlY2NMZXZlbCk7XG4gIHFyLmFkZERhdGEodGV4dCk7XG4gIHFyLm1ha2UoKTtcblxuICBjb25zdCBtb2R1bGVDb3VudCA9IHFyLmdldE1vZHVsZUNvdW50KCk7XG4gIGNvbnN0IHNjYWxlZFNpemUgPSBtb2R1bGVDb3VudCAqIHNjYWxlO1xuXG4gIC8vIENyZWF0ZSBzY2FsZWQgUVIgbWF0cml4IGFuZCBpbml0aWFsaXplIGNvbG9yc1xuICBjb25zdCBtYXRyaXg6IGJvb2xlYW5bXVtdID0gW107XG4gIGNvbnN0IGNvbG9yczogUkdCW11bXSA9IFtdO1xuXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgc2NhbGVkU2l6ZTsgeSsrKSB7XG4gICAgY29uc3QgbWF0cml4Um93OiBib29sZWFuW10gPSBbXTtcbiAgICBjb25zdCBjb2xvclJvdzogUkdCW10gPSBbXTtcbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNjYWxlZFNpemU7IHgrKykge1xuICAgICAgY29uc3QgcXJYID0gTWF0aC5mbG9vcih4IC8gc2NhbGUpO1xuICAgICAgY29uc3QgcXJZID0gTWF0aC5mbG9vcih5IC8gc2NhbGUpO1xuICAgICAgY29uc3QgaXNEYXJrID0gcXIuaXNEYXJrKHFyWSwgcXJYKTtcbiAgICAgIG1hdHJpeFJvdy5wdXNoKGlzRGFyayk7XG4gICAgICAvLyBEZWZhdWx0IGNvbG9yOiBibGFjayBmb3IgZGFyaywgd2hpdGUgZm9yIGxpZ2h0XG4gICAgICBjb2xvclJvdy5wdXNoKGlzRGFyayA/IHsgcjogMCwgZzogMCwgYjogMCB9IDogeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0pO1xuICAgIH1cbiAgICBtYXRyaXgucHVzaChtYXRyaXhSb3cpO1xuICAgIGNvbG9ycy5wdXNoKGNvbG9yUm93KTtcbiAgfVxuXG4gIC8vIElmIG5vIG92ZXJsYXksIHJldHVybiB0aGUgc2NhbGVkIFFSIHdpdGggZGVmYXVsdCBjb2xvcnNcbiAgaWYgKCFvdmVybGF5Q2FudmFzKSB7XG4gICAgcmV0dXJuIHsgbWF0cml4LCBjb2xvcnMgfTtcbiAgfVxuXG4gIC8vIExvYWQgYW5kIHByb2Nlc3Mgb3ZlcmxheSBpbWFnZSBhcyBSR0JcbiAgY29uc3QgaW1hZ2VEYXRhID0gbG9hZEltYWdlRGF0YVJHQihvdmVybGF5Q2FudmFzLCBzY2FsZWRTaXplKTtcbiAgY29uc3QgaW50ZW5zaXR5ID0gb3ZlcmxheUludGVuc2l0eSAvIDEwMDtcblxuICAvLyBDb252ZXJ0IHRvIGdyYXlzY2FsZSBmaXJzdCBpZiBuZWVkZWRcbiAgaWYgKGNvbG9yTW9kZSA9PT0gXCJncmF5c2NhbGVcIiB8fCBjb2xvck1vZGUgPT09IFwiYndcIikge1xuICAgIGNvbnZlcnRUb0dyYXlzY2FsZShpbWFnZURhdGEpO1xuICB9XG5cbiAgLy8gQXBwbHkgYmx1ZSBub2lzZSBkaXRoZXJpbmcgdG8gZnJlZSBwb2ludHNcbiAgYmx1ZU5vaXNlRGl0aGVyRnJlZVBvaW50cyhpbWFnZURhdGEsIHNjYWxlZFNpemUsIHNjYWxlLCBjb2xvck1vZGUpO1xuXG4gIC8vIE1lcmdlIGltYWdlIGRhdGEgd2l0aCBRUiBtYXRyaXggZm9yIGZyZWUgcG9pbnRzXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgc2NhbGVkU2l6ZTsgeSsrKSB7XG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCBzY2FsZWRTaXplOyB4KyspIHtcbiAgICAgIC8vIFNraXAgbG9ja2VkIGFyZWFzIChmaW5kZXIgcGF0dGVybnMsIHRpbWluZywgYWxpZ25tZW50KVxuICAgICAgaWYgKGlzTG9ja2VkKHNjYWxlZFNpemUsIHgsIHksIHNjYWxlKSkgY29udGludWU7XG5cbiAgICAgIC8vIFNraXAgZGF0YSBwb2ludHMgKG11c3QgcHJlc2VydmUgUVIgZGF0YSlcbiAgICAgIGlmIChpc0RhdGEoeCwgeSwgc2NhbGUpKSBjb250aW51ZTtcblxuICAgICAgLy8gRnJlZSBwb2ludDogdXNlIGRpdGhlcmVkIGltYWdlIGRhdGEgYmFzZWQgb24gaW50ZW5zaXR5XG4gICAgICBjb25zdCBwaXhlbCA9IGltYWdlRGF0YVt5XVt4XTtcbiAgICAgIGNvbnN0IGJyaWdodG5lc3MgPSByZ2JUb0dyYXkocGl4ZWwuciwgcGl4ZWwuZywgcGl4ZWwuYik7XG4gICAgICAvLyBVc2UgYmx1ZSBub2lzZSBmb3IgaW50ZW5zaXR5IGJsZW5kaW5nIGRlY2lzaW9uIChjb25zaXN0ZW50IHdpdGggdGhlIGRpdGhlcmluZyBhcHByb2FjaClcbiAgICAgIGNvbnN0IHVzZUltYWdlID0gc2FtcGxlQmx1ZU5vaXNlKHggKyAxNywgeSArIDMxKSA8IGludGVuc2l0eTtcblxuICAgICAgaWYgKHVzZUltYWdlKSB7XG4gICAgICAgIC8vIEZvciB0aGUgYm9vbGVhbiBtYXRyaXg6IGRhcmsgaWYgYnJpZ2h0bmVzcyA8IDAuNVxuICAgICAgICBtYXRyaXhbeV1beF0gPSBicmlnaHRuZXNzIDwgMC41O1xuXG4gICAgICAgIC8vIEZvciB0aGUgY29sb3IgbWF0cml4OiB1c2UgdGhlIGRpdGhlcmVkIFJHQiB2YWx1ZXMgKGNvbnZlcnQgZnJvbSAwLTEgdG8gMC0yNTUpXG4gICAgICAgIGNvbG9yc1t5XVt4XSA9IHtcbiAgICAgICAgICByOiBNYXRoLnJvdW5kKE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHBpeGVsLnIpKSAqIDI1NSksXG4gICAgICAgICAgZzogTWF0aC5yb3VuZChNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBwaXhlbC5nKSkgKiAyNTUpLFxuICAgICAgICAgIGI6IE1hdGgucm91bmQoTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgcGl4ZWwuYikpICogMjU1KSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBtYXRyaXgsIGNvbG9ycyB9O1xufVxuXG4vLyBFeHBvcnQgdHlwZXMgZm9yIGV4dGVybmFsIHVzZVxuZXhwb3J0IHR5cGUgeyBCbHVlTm9pc2VPcHRpb25zIGFzIEdlbmVyYXRlT3B0aW9ucyB9O1xuIiwgIi8qKlxuICogUVIgQ29yZSBNb2R1bGVcbiAqIFByb3ZpZGVzIFFSIGNvZGUgZ2VuZXJhdGlvbiwgZW5jb2RpbmcsIGFuZCBzdHJ1Y3R1cmFsIGVsZW1lbnQgZGV0ZWN0aW9uXG4gKiBXcmFwcyB2ZW5kb3IvbGliL3FyY29kZS1nZW5lcmF0b3Igd2l0aCBUeXBlU2NyaXB0IHR5cGVzXG4gKi9cblxuaW1wb3J0IHFyY29kZSBmcm9tICcuLi8uLi92ZW5kb3IvbGliL3FyY29kZS1nZW5lcmF0b3IvcXJjb2RlLm1qcydcblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIFRZUEVTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5leHBvcnQgdHlwZSBFQ0NMZXZlbCA9ICdMJyB8ICdNJyB8ICdRJyB8ICdIJ1xuZXhwb3J0IHR5cGUgTWFza1BhdHRlcm4gPSAnYXV0bycgfCAwIHwgMSB8IDIgfCAzIHwgNCB8IDUgfCA2IHwgN1xuZXhwb3J0IHR5cGUgRW5jb2RpbmdNb2RlID0gJ2F1dG8nIHwgJ051bWVyaWMnIHwgJ0FscGhhbnVtZXJpYycgfCAnQnl0ZScgfCAnS2FuamknXG5cbmV4cG9ydCBpbnRlcmZhY2UgUVJPcHRpb25zIHtcbiAgdGV4dDogc3RyaW5nXG4gIGVjYzogRUNDTGV2ZWxcbiAgdmVyc2lvbj86IG51bWJlciAvLyAwID0gYXV0bywgMS00MFxuICBtYXNrPzogTWFza1BhdHRlcm5cbiAgc2NhbGU/OiBudW1iZXIgLy8gc3VicGl4ZWwgc2NhbGUgKGUuZy4sIDMgZm9yIDN4MyBwZXIgbW9kdWxlKVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFFSTWF0cml4IHtcbiAgbWF0cml4OiBib29sZWFuW11bXVxuICBtb2R1bGVDb3VudDogbnVtYmVyXG4gIHZlcnNpb246IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFFSSW5zdGFuY2Uge1xuICBpc0Rhcms6IChyb3c6IG51bWJlciwgY29sOiBudW1iZXIpID0+IGJvb2xlYW5cbiAgZ2V0TW9kdWxlQ291bnQ6ICgpID0+IG51bWJlclxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQUxJR05NRU5UIFBBVFRFUk4gUE9TSVRJT05TXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG5jb25zdCBBTElHTk1FTlRfUE9TSVRJT05TOiAobnVtYmVyW10gfCBudWxsKVtdID0gW1xuICBudWxsLFxuICBbXSxcbiAgWzYsIDE4XSxcbiAgWzYsIDIyXSxcbiAgWzYsIDI2XSxcbiAgWzYsIDMwXSxcbiAgWzYsIDM0XSxcbiAgWzYsIDIyLCAzOF0sXG4gIFs2LCAyNCwgNDJdLFxuICBbNiwgMjYsIDQ2XSxcbiAgWzYsIDI4LCA1MF0sXG4gIFs2LCAzMCwgNTRdLFxuICBbNiwgMzIsIDU4XSxcbiAgWzYsIDM0LCA2Ml0sXG4gIFs2LCAyNiwgNDYsIDY2XSxcbiAgWzYsIDI2LCA0OCwgNzBdLFxuICBbNiwgMjYsIDUwLCA3NF0sXG4gIFs2LCAzMCwgNTQsIDc4XSxcbiAgWzYsIDMwLCA1NiwgODJdLFxuICBbNiwgMzAsIDU4LCA4Nl0sXG4gIFs2LCAzNCwgNjIsIDkwXSxcbiAgWzYsIDI4LCA1MCwgNzIsIDk0XSxcbiAgWzYsIDI2LCA1MCwgNzQsIDk4XSxcbiAgWzYsIDMwLCA1NCwgNzgsIDEwMl0sXG4gIFs2LCAyOCwgNTQsIDgwLCAxMDZdLFxuICBbNiwgMzIsIDU4LCA4NCwgMTEwXSxcbiAgWzYsIDMwLCA1OCwgODYsIDExNF0sXG4gIFs2LCAzNCwgNjIsIDkwLCAxMThdLFxuICBbNiwgMjYsIDUwLCA3NCwgOTgsIDEyMl0sXG4gIFs2LCAzMCwgNTQsIDc4LCAxMDIsIDEyNl0sXG4gIFs2LCAyNiwgNTIsIDc4LCAxMDQsIDEzMF0sXG4gIFs2LCAzMCwgNTYsIDgyLCAxMDgsIDEzNF0sXG4gIFs2LCAzNCwgNjAsIDg2LCAxMTIsIDEzOF0sXG4gIFs2LCAzMCwgNTgsIDg2LCAxMTQsIDE0Ml0sXG4gIFs2LCAzNCwgNjIsIDkwLCAxMTgsIDE0Nl0sXG4gIFs2LCAzMCwgNTQsIDc4LCAxMDIsIDEyNiwgMTUwXSxcbiAgWzYsIDI0LCA1MCwgNzYsIDEwMiwgMTI4LCAxNTRdLFxuICBbNiwgMjgsIDU0LCA4MCwgMTA2LCAxMzIsIDE1OF0sXG4gIFs2LCAzMiwgNTgsIDg0LCAxMTAsIDEzNiwgMTYyXSxcbiAgWzYsIDI2LCA1NCwgODIsIDExMCwgMTM4LCAxNjZdLFxuICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDIsIDE3MF0sXG5dXG5cbi8vIEVDQyBjYXBhY2l0eSAoYnl0ZXMpIHBlciB2ZXJzaW9uXG5jb25zdCBFQ0NfQ0FQQUNJVElFUzogUmVjb3JkPEVDQ0xldmVsLCBudW1iZXJbXT4gPSB7XG4gIEw6IFsxNywgMzIsIDUzLCA3OCwgMTA2LCAxMzQsIDE1NCwgMTkyLCAyMzAsIDI3MSwgMzIxLCAzNjcsIDQyNSwgNDU4LCA1MjAsIDU4NiwgNjQ0LCA3MTgsIDc5MiwgODU4LCA5MjksIDEwMDMsIDEwOTEsIDExNzEsIDEyNzMsIDEzNjcsIDE0NjUsIDE1MjgsIDE2MjgsIDE3MzIsIDE4NDAsIDE5NTIsIDIwNjgsIDIxODgsIDIzMDMsIDI0MzEsIDI1NjMsIDI2OTksIDI4MDksIDI5NTNdLFxuICBNOiBbMTQsIDI2LCA0MiwgNjIsIDg0LCAxMDYsIDEyMiwgMTUyLCAxODAsIDIxMywgMjUxLCAyODcsIDMzMSwgMzYyLCA0MTIsIDQ1MCwgNTA0LCA1NjAsIDYyNCwgNjY2LCA3MTEsIDc3OSwgODU3LCA5MTEsIDk5NywgMTA1OSwgMTEyNSwgMTE5MCwgMTI2NCwgMTM3MCwgMTQ1MiwgMTUzOCwgMTYyOCwgMTcyMiwgMTgwOSwgMTkxMSwgMTk4OSwgMjA5OSwgMjIxMywgMjMzMV0sXG4gIFE6IFsxMSwgMjAsIDMyLCA0NiwgNjAsIDc0LCA4NiwgMTA4LCAxMzAsIDE1MSwgMTc3LCAyMDMsIDI0MSwgMjU4LCAyOTIsIDMyMiwgMzY0LCAzOTQsIDQ0MiwgNDgyLCA1MDksIDU2NSwgNjExLCA2NjEsIDcxNSwgNzUxLCA4MDUsIDg2OCwgOTA4LCA5ODIsIDEwMzAsIDExMTIsIDExNjgsIDEyMjgsIDEyODMsIDEzNTEsIDE0MjMsIDE0OTksIDE1NzksIDE2NjNdLFxuICBIOiBbNywgMTQsIDI0LCAzNCwgNDQsIDU4LCA2NCwgODQsIDk4LCAxMTksIDEzNywgMTU1LCAxNzcsIDE5NCwgMjIwLCAyNTAsIDI4MCwgMzEwLCAzMzgsIDM4MiwgNDAzLCA0MzksIDQ2MSwgNTExLCA1MzUsIDU5MywgNjI1LCA2NTgsIDY5OCwgNzQyLCA3OTAsIDg0MiwgODk4LCA5NTgsIDk4MywgMTA1MSwgMTA5MywgMTEzOSwgMTIxOSwgMTI3M10sXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBWRVJTSU9OIENBTENVTEFUSU9OXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIENhbGN1bGF0ZSBvcHRpbWFsIFFSIHZlcnNpb24gZm9yIGdpdmVuIGNvbnRlbnQgYW5kIEVDQyBsZXZlbFxuICovXG5leHBvcnQgZnVuY3Rpb24gY2FsY3VsYXRlT3B0aW1hbFZlcnNpb24oY29udGVudDogc3RyaW5nLCBlY2M6IEVDQ0xldmVsKTogbnVtYmVyIHtcbiAgY29uc3QgY2FwcyA9IEVDQ19DQVBBQ0lUSUVTW2VjY11cbiAgY29uc3QgbGVuID0gY29udGVudC5sZW5ndGhcblxuICBmb3IgKGxldCB2ID0gMDsgdiA8IGNhcHMubGVuZ3RoOyB2KyspIHtcbiAgICBpZiAoY2Fwc1t2XSA+PSBsZW4pIHtcbiAgICAgIHJldHVybiB2ICsgMVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiA0MFxufVxuXG4vKipcbiAqIEdldCBRUiB2ZXJzaW9uIGZyb20gbW9kdWxlIGNvdW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRWZXJzaW9uRnJvbU1vZHVsZUNvdW50KG1vZHVsZUNvdW50OiBudW1iZXIpOiBudW1iZXIge1xuICByZXR1cm4gKG1vZHVsZUNvdW50IC0gMTcpIC8gNFxufVxuXG4vKipcbiAqIEdldCBtb2R1bGUgY291bnQgZm9yIGEgUVIgdmVyc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TW9kdWxlQ291bnRGb3JWZXJzaW9uKHZlcnNpb246IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiB2ZXJzaW9uICogNCArIDE3XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBTVFJVQ1RVUkFMIEVMRU1FTlQgREVURUNUSU9OXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEdldCBhbGlnbm1lbnQgcGF0dGVybiBwb3NpdGlvbnMgZm9yIGEgUVIgdmVyc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWxpZ25tZW50UG9zaXRpb25zKHZlcnNpb246IG51bWJlcik6IG51bWJlcltdIHtcbiAgaWYgKHZlcnNpb24gPCAyIHx8IHZlcnNpb24gPiA0MCkgcmV0dXJuIFtdXG4gIHJldHVybiBBTElHTk1FTlRfUE9TSVRJT05TW3ZlcnNpb25dIHx8IFtdXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBwb3NpdGlvbiBpcyBhIGZpbmRlciBwYXR0ZXJuICg3eDcgY29ybmVyIHBhdHRlcm5zKVxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNGaW5kZXJQYXR0ZXJuKHJvdzogbnVtYmVyLCBjb2w6IG51bWJlciwgbW9kdWxlQ291bnQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAvLyBUb3AtbGVmdFxuICBpZiAocm93IDwgNyAmJiBjb2wgPCA3KSByZXR1cm4gdHJ1ZVxuICAvLyBUb3AtcmlnaHRcbiAgaWYgKHJvdyA8IDcgJiYgY29sID49IG1vZHVsZUNvdW50IC0gNykgcmV0dXJuIHRydWVcbiAgLy8gQm90dG9tLWxlZnRcbiAgaWYgKHJvdyA+PSBtb2R1bGVDb3VudCAtIDcgJiYgY29sIDwgNykgcmV0dXJuIHRydWVcbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBwb3NpdGlvbiBpcyBhIHRpbWluZyBwYXR0ZXJuIChyb3cvY29sIDYpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1RpbWluZ1BhdHRlcm4ocm93OiBudW1iZXIsIGNvbDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiByb3cgPT09IDYgfHwgY29sID09PSA2XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYSBwb3NpdGlvbiBpcyBhbiBhbGlnbm1lbnQgcGF0dGVyblxuICovXG5leHBvcnQgZnVuY3Rpb24gaXNBbGlnbm1lbnRQYXR0ZXJuKFxuICByb3c6IG51bWJlcixcbiAgY29sOiBudW1iZXIsXG4gIG1vZHVsZUNvdW50OiBudW1iZXJcbik6IGJvb2xlYW4ge1xuICBjb25zdCB2ZXJzaW9uID0gZ2V0VmVyc2lvbkZyb21Nb2R1bGVDb3VudChtb2R1bGVDb3VudClcbiAgY29uc3QgcG9zaXRpb25zID0gZ2V0QWxpZ25tZW50UG9zaXRpb25zKHZlcnNpb24pXG4gIFxuICBpZiAocG9zaXRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIGZhbHNlXG5cbiAgZm9yIChjb25zdCBweCBvZiBwb3NpdGlvbnMpIHtcbiAgICBmb3IgKGNvbnN0IHB5IG9mIHBvc2l0aW9ucykge1xuICAgICAgLy8gU2tpcCBhbGlnbm1lbnQgcGF0dGVybnMgdGhhdCBvdmVybGFwIHdpdGggZmluZGVyIHBhdHRlcm5zXG4gICAgICBpZiAocHggPCA4ICYmIHB5IDwgOCkgY29udGludWVcbiAgICAgIGlmIChweCA8IDggJiYgcHkgPiBtb2R1bGVDb3VudCAtIDkpIGNvbnRpbnVlXG4gICAgICBpZiAocHggPiBtb2R1bGVDb3VudCAtIDkgJiYgcHkgPCA4KSBjb250aW51ZVxuXG4gICAgICBpZiAoTWF0aC5hYnMocm93IC0gcHkpIDw9IDIgJiYgTWF0aC5hYnMoY29sIC0gcHgpIDw9IDIpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIHBvc2l0aW9uIGlzIGEgbG9ja2VkIHN0cnVjdHVyYWwgZWxlbWVudFxuICogKGZpbmRlciBwYXR0ZXJucywgdGltaW5nLCBhbGlnbm1lbnQgLSBjYW5ub3QgYmUgbW9kaWZpZWQpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0xvY2tlZChcbiAgbW9kdWxlQ291bnQ6IG51bWJlcixcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG4gIHNjYWxlOiBudW1iZXIgPSAxXG4pOiBib29sZWFuIHtcbiAgY29uc3QgbCA9IG1vZHVsZUNvdW50IC8gc2NhbGVcbiAgY29uc3Qgc3ggPSBNYXRoLmZsb29yKHggLyBzY2FsZSlcbiAgY29uc3Qgc3kgPSBNYXRoLmZsb29yKHkgLyBzY2FsZSlcblxuICAvLyBPdXQgb2YgYm91bmRzXG4gIGlmIChzeCA8IDAgfHwgc3kgPCAwIHx8IHN4ID49IGwgfHwgc3kgPj0gbCkgcmV0dXJuIHRydWVcblxuICAvLyBGaW5kZXIgcGF0dGVybnMgKHRvcC1sZWZ0LCB0b3AtcmlnaHQsIGJvdHRvbS1sZWZ0KVxuICBpZiAoc3ggPCA3ICYmIHN5IDwgNykgcmV0dXJuIHRydWVcbiAgaWYgKHN4IDwgNyAmJiBzeSA+IGwgLSA4KSByZXR1cm4gdHJ1ZVxuICBpZiAoc3ggPiBsIC0gOCAmJiBzeSA8IDcpIHJldHVybiB0cnVlXG5cbiAgLy8gVGltaW5nIHBhdHRlcm5zXG4gIGlmIChzeCA9PT0gNiB8fCBzeSA9PT0gNikgcmV0dXJuIHRydWVcblxuICAvLyBBbGlnbm1lbnQgcGF0dGVybnNcbiAgY29uc3QgdmVyc2lvbiA9IGdldFZlcnNpb25Gcm9tTW9kdWxlQ291bnQobClcbiAgY29uc3QgcG9zaXRpb25zID0gZ2V0QWxpZ25tZW50UG9zaXRpb25zKHZlcnNpb24pXG4gIFxuICBpZiAocG9zaXRpb25zLmxlbmd0aCA+IDApIHtcbiAgICBmb3IgKGNvbnN0IHB4IG9mIHBvc2l0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBweSBvZiBwb3NpdGlvbnMpIHtcbiAgICAgICAgLy8gU2tpcCBhbGlnbm1lbnQgcGF0dGVybnMgdGhhdCBvdmVybGFwIHdpdGggZmluZGVyIHBhdHRlcm5zXG4gICAgICAgIGlmIChweCA8IDggJiYgcHkgPCA4KSBjb250aW51ZVxuICAgICAgICBpZiAocHggPCA4ICYmIHB5ID4gbCAtIDkpIGNvbnRpbnVlXG4gICAgICAgIGlmIChweCA+IGwgLSA5ICYmIHB5IDwgOCkgY29udGludWVcblxuICAgICAgICBpZiAoTWF0aC5hYnMoc3ggLSBweCkgPD0gMiAmJiBNYXRoLmFicyhzeSAtIHB5KSA8PSAyKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIENoZWNrIGlmIGEgcG9zaXRpb24gaXMgYSBkYXRhIHBvaW50IChjZW50ZXIgb2Ygc2NhbGVkIG1vZHVsZSlcbiAqIERhdGEgcG9pbnRzIG11c3QgcHJlc2VydmUgUVIgdmFsdWVzIGZvciBzY2FubmFiaWxpdHlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzRGF0YSh4OiBudW1iZXIsIHk6IG51bWJlciwgc2NhbGU6IG51bWJlcik6IGJvb2xlYW4ge1xuICBjb25zdCBtID0gTWF0aC5mbG9vcihzY2FsZSAvIDIpXG4gIGNvbnN0IHhzID0geCAlIHNjYWxlXG4gIGNvbnN0IHlzID0geSAlIHNjYWxlXG5cbiAgaWYgKHhzID09PSBtICYmIHlzID09PSBtKSByZXR1cm4gdHJ1ZVxuICBpZiAoc2NhbGUgJSAyID09PSAxKSByZXR1cm4gZmFsc2VcblxuICAvLyBGb3IgZXZlbiBzY2FsZXMsIGRhdGEgb2NjdXBpZXMgMngyIGNlbnRlclxuICBpZiAoeHMgPT09IG0gJiYgeXMgPT09IG0gLSAxKSByZXR1cm4gdHJ1ZVxuICBpZiAoeHMgPT09IG0gLSAxICYmIHlzID09PSBtKSByZXR1cm4gdHJ1ZVxuICBpZiAoeHMgPT09IG0gLSAxICYmIHlzID09PSBtIC0gMSkgcmV0dXJuIHRydWVcblxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBhIG1vZHVsZSBpcyBhIHN0cnVjdHVyYWwgZWxlbWVudCB0aGF0IGNhbm5vdCBiZSBtb2RpZmllZFxuICogTW9yZSBjb21wcmVoZW5zaXZlIHRoYW4gaXNMb2NrZWQgLSBpbmNsdWRlcyBmb3JtYXQvdmVyc2lvbiBpbmZvXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cnVjdHVyYWxNb2R1bGUoXG4gIHJvdzogbnVtYmVyLFxuICBjb2w6IG51bWJlcixcbiAgbW9kdWxlQ291bnQ6IG51bWJlcixcbiAgdmVyc2lvbjogbnVtYmVyXG4pOiBib29sZWFuIHtcbiAgLy8gRmluZGVyIHBhdHRlcm5zICsgc2VwYXJhdG9yc1xuICBpZiAocm93IDwgOCAmJiBjb2wgPCA4KSByZXR1cm4gdHJ1ZVxuICBpZiAocm93IDwgOCAmJiBjb2wgPj0gbW9kdWxlQ291bnQgLSA4KSByZXR1cm4gdHJ1ZVxuICBpZiAocm93ID49IG1vZHVsZUNvdW50IC0gOCAmJiBjb2wgPCA4KSByZXR1cm4gdHJ1ZVxuICBcbiAgLy8gVGltaW5nIHBhdHRlcm5zXG4gIGlmIChyb3cgPT09IDYgfHwgY29sID09PSA2KSByZXR1cm4gdHJ1ZVxuICBcbiAgLy8gRm9ybWF0IGluZm9ybWF0aW9uXG4gIGlmIChyb3cgPT09IDggJiYgY29sIDwgOSkgcmV0dXJuIHRydWVcbiAgaWYgKGNvbCA9PT0gOCAmJiByb3cgPCA5KSByZXR1cm4gdHJ1ZVxuICBpZiAocm93ID09PSA4ICYmIGNvbCA+PSBtb2R1bGVDb3VudCAtIDgpIHJldHVybiB0cnVlXG4gIGlmIChjb2wgPT09IDggJiYgcm93ID49IG1vZHVsZUNvdW50IC0gOCkgcmV0dXJuIHRydWVcbiAgXG4gIC8vIERhcmsgbW9kdWxlXG4gIGlmIChyb3cgPT09IG1vZHVsZUNvdW50IC0gOCAmJiBjb2wgPT09IDgpIHJldHVybiB0cnVlXG4gIFxuICAvLyBWZXJzaW9uIGluZm8gKHZlcnNpb24gNyspXG4gIGlmICh2ZXJzaW9uID49IDcpIHtcbiAgICBpZiAocm93ID49IG1vZHVsZUNvdW50IC0gMTEgJiYgcm93IDwgbW9kdWxlQ291bnQgLSA4ICYmIGNvbCA8IDYpIHJldHVybiB0cnVlXG4gICAgaWYgKGNvbCA+PSBtb2R1bGVDb3VudCAtIDExICYmIGNvbCA8IG1vZHVsZUNvdW50IC0gOCAmJiByb3cgPCA2KSByZXR1cm4gdHJ1ZVxuICB9XG4gIFxuICAvLyBBbGlnbm1lbnQgcGF0dGVybnMgKHZlcnNpb24gMispXG4gIGlmICh2ZXJzaW9uID49IDIpIHtcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBnZXRBbGlnbm1lbnRQb3NpdGlvbnModmVyc2lvbilcbiAgICBmb3IgKGNvbnN0IHB4IG9mIHBvc2l0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBweSBvZiBwb3NpdGlvbnMpIHtcbiAgICAgICAgaWYgKHB4IDwgOCAmJiBweSA8IDgpIGNvbnRpbnVlXG4gICAgICAgIGlmIChweCA8IDggJiYgcHkgPiBtb2R1bGVDb3VudCAtIDkpIGNvbnRpbnVlXG4gICAgICAgIGlmIChweCA+IG1vZHVsZUNvdW50IC0gOSAmJiBweSA8IDgpIGNvbnRpbnVlXG4gICAgICAgIGlmIChNYXRoLmFicyhyb3cgLSBweSkgPD0gMiAmJiBNYXRoLmFicyhjb2wgLSBweCkgPD0gMikgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIHJldHVybiBmYWxzZVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gUVIgR0VORVJBVElPTlxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIFFSIGNvZGUgbWF0cml4XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVFSKG9wdGlvbnM6IFFST3B0aW9ucyk6IFFSTWF0cml4IHtcbiAgY29uc3QgeyB0ZXh0LCBlY2MsIHZlcnNpb24gPSAwLCBzY2FsZSA9IDEgfSA9IG9wdGlvbnNcblxuICAvLyBBdXRvLWRldGVjdCB2ZXJzaW9uIGlmIG5vdCBzcGVjaWZpZWRcbiAgbGV0IHR5cGVOdW1iZXIgPSB2ZXJzaW9uXG4gIGlmICh0eXBlTnVtYmVyID09PSAwKSB7XG4gICAgdHlwZU51bWJlciA9IGNhbGN1bGF0ZU9wdGltYWxWZXJzaW9uKHRleHQsIGVjYylcbiAgfVxuXG4gIC8vIEdlbmVyYXRlIFFSIHVzaW5nIHZlbmRvciBsaWJyYXJ5XG4gIGNvbnN0IHFyID0gcXJjb2RlKHR5cGVOdW1iZXIsIGVjYylcbiAgcXIuYWRkRGF0YSh0ZXh0KVxuICBxci5tYWtlKClcblxuICBjb25zdCBtb2R1bGVDb3VudCA9IHFyLmdldE1vZHVsZUNvdW50KClcbiAgY29uc3Qgc2NhbGVkU2l6ZSA9IG1vZHVsZUNvdW50ICogc2NhbGVcblxuICAvLyBDcmVhdGUgbWF0cml4XG4gIGNvbnN0IG1hdHJpeDogYm9vbGVhbltdW10gPSBbXVxuICBmb3IgKGxldCB5ID0gMDsgeSA8IHNjYWxlZFNpemU7IHkrKykge1xuICAgIGNvbnN0IHJvdzogYm9vbGVhbltdID0gW11cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNjYWxlZFNpemU7IHgrKykge1xuICAgICAgY29uc3QgcXJYID0gTWF0aC5mbG9vcih4IC8gc2NhbGUpXG4gICAgICBjb25zdCBxclkgPSBNYXRoLmZsb29yKHkgLyBzY2FsZSlcbiAgICAgIHJvdy5wdXNoKHFyLmlzRGFyayhxclksIHFyWCkpXG4gICAgfVxuICAgIG1hdHJpeC5wdXNoKHJvdylcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbWF0cml4LFxuICAgIG1vZHVsZUNvdW50OiBzY2FsZWRTaXplLFxuICAgIHZlcnNpb246IHR5cGVOdW1iZXIsXG4gIH1cbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIHJhdyBRUiBpbnN0YW5jZSBmb3IgZGlyZWN0IGFjY2Vzc1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUVJJbnN0YW5jZShcbiAgdGV4dDogc3RyaW5nLFxuICBlY2M6IEVDQ0xldmVsLFxuICB2ZXJzaW9uOiBudW1iZXIgPSAwXG4pOiBRUkluc3RhbmNlIHtcbiAgbGV0IHR5cGVOdW1iZXIgPSB2ZXJzaW9uXG4gIGlmICh0eXBlTnVtYmVyID09PSAwKSB7XG4gICAgdHlwZU51bWJlciA9IGNhbGN1bGF0ZU9wdGltYWxWZXJzaW9uKHRleHQsIGVjYylcbiAgfVxuXG4gIGNvbnN0IHFyID0gcXJjb2RlKHR5cGVOdW1iZXIsIGVjYylcbiAgcXIuYWRkRGF0YSh0ZXh0KVxuICBxci5tYWtlKClcblxuICByZXR1cm4gcXJcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEVYUE9SVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGNvbnN0IFFSQ29yZSA9IHtcbiAgLy8gR2VuZXJhdGlvblxuICBnZW5lcmF0ZVFSLFxuICBjcmVhdGVRUkluc3RhbmNlLFxuICBcbiAgLy8gVmVyc2lvblxuICBjYWxjdWxhdGVPcHRpbWFsVmVyc2lvbixcbiAgZ2V0VmVyc2lvbkZyb21Nb2R1bGVDb3VudCxcbiAgZ2V0TW9kdWxlQ291bnRGb3JWZXJzaW9uLFxuICBcbiAgLy8gU3RydWN0dXJhbCBkZXRlY3Rpb25cbiAgZ2V0QWxpZ25tZW50UG9zaXRpb25zLFxuICBpc0ZpbmRlclBhdHRlcm4sXG4gIGlzVGltaW5nUGF0dGVybixcbiAgaXNBbGlnbm1lbnRQYXR0ZXJuLFxuICBpc0xvY2tlZCxcbiAgaXNEYXRhLFxuICBpc1N0cnVjdHVyYWxNb2R1bGUsXG4gIFxuICAvLyBDb25zdGFudHNcbiAgQUxJR05NRU5UX1BPU0lUSU9OUyxcbiAgRUNDX0NBUEFDSVRJRVMsXG59XG5cbmV4cG9ydCBkZWZhdWx0IFFSQ29yZVxuIiwgIi8qKlxuICogQ29sb3IgVXRpbGl0aWVzIE1vZHVsZVxuICogUHJvdmlkZXMgY29sb3IgcGFyc2luZywgYmxlbmRpbmcsIGdyYWRpZW50cywgYW5kIGNvbnRyYXN0IGNoZWNraW5nXG4gKi9cblxuaW1wb3J0IHR5cGUgeyBHcmFkaWVudFR5cGUsIEdyYWRpZW50U3RvcCB9IGZyb20gJy4uL3N0b3JlL3FyLXN0b3JlJ1xuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVFlQRVNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBpbnRlcmZhY2UgUkdCIHtcbiAgcjogbnVtYmVyXG4gIGc6IG51bWJlclxuICBiOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSR0JBIGV4dGVuZHMgUkdCIHtcbiAgYTogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgSFNMIHtcbiAgaDogbnVtYmVyXG4gIHM6IG51bWJlclxuICBsOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBIU0xBIGV4dGVuZHMgSFNMIHtcbiAgYTogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JhZGllbnRDb25maWcge1xuICB0eXBlOiBHcmFkaWVudFR5cGVcbiAgc3RvcHM6IEdyYWRpZW50U3RvcFtdXG4gIGFuZ2xlPzogbnVtYmVyICAgICAgLy8gRm9yIGxpbmVhciBncmFkaWVudCAoZGVncmVlcylcbiAgY2VudGVyWD86IG51bWJlciAgICAvLyBGb3IgcmFkaWFsL2NvbmljICgwLTEpXG4gIGNlbnRlclk/OiBudW1iZXIgICAgLy8gRm9yIHJhZGlhbC9jb25pYyAoMC0xKVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ09MT1IgUEFSU0lOR1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqIFBhcnNlIGhleCBjb2xvciBzdHJpbmcgdG8gUkdCICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VIZXgoaGV4OiBzdHJpbmcpOiBSR0Ige1xuICBoZXggPSBoZXgucmVwbGFjZSgnIycsICcnKVxuICBcbiAgaWYgKGhleC5sZW5ndGggPT09IDMpIHtcbiAgICBoZXggPSBoZXhbMF0gKyBoZXhbMF0gKyBoZXhbMV0gKyBoZXhbMV0gKyBoZXhbMl0gKyBoZXhbMl1cbiAgfVxuICBcbiAgcmV0dXJuIHtcbiAgICByOiBwYXJzZUludChoZXguc3Vic3RyKDAsIDIpLCAxNiksXG4gICAgZzogcGFyc2VJbnQoaGV4LnN1YnN0cigyLCAyKSwgMTYpLFxuICAgIGI6IHBhcnNlSW50KGhleC5zdWJzdHIoNCwgMiksIDE2KSxcbiAgfVxufVxuXG4vKiogUGFyc2UgaGV4IGNvbG9yIHN0cmluZyB3aXRoIGFscGhhIHRvIFJHQkEgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhleEFscGhhKGhleDogc3RyaW5nKTogUkdCQSB7XG4gIGhleCA9IGhleC5yZXBsYWNlKCcjJywgJycpXG4gIFxuICBpZiAoaGV4Lmxlbmd0aCA9PT0gNCkge1xuICAgIGhleCA9IGhleFswXSArIGhleFswXSArIGhleFsxXSArIGhleFsxXSArIGhleFsyXSArIGhleFsyXSArIGhleFszXSArIGhleFszXVxuICB9XG4gIFxuICBjb25zdCByZ2IgPSBwYXJzZUhleChoZXguc3Vic3RyKDAsIDYpKVxuICBjb25zdCBhID0gaGV4Lmxlbmd0aCA+PSA4ID8gcGFyc2VJbnQoaGV4LnN1YnN0cig2LCAyKSwgMTYpIC8gMjU1IDogMVxuICBcbiAgcmV0dXJuIHsgLi4ucmdiLCBhIH1cbn1cblxuLyoqIFBhcnNlIHJnYigpIG9yIHJnYmEoKSBzdHJpbmcgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJnYlN0cmluZyhzdHI6IHN0cmluZyk6IFJHQkEge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvcmdiYT9cXCgoXFxkKyksXFxzKihcXGQrKSxcXHMqKFxcZCspKD86LFxccyooW1xcZC5dKykpP1xcKS8pXG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiB7XG4gICAgICByOiBwYXJzZUludChtYXRjaFsxXSksXG4gICAgICBnOiBwYXJzZUludChtYXRjaFsyXSksXG4gICAgICBiOiBwYXJzZUludChtYXRjaFszXSksXG4gICAgICBhOiBtYXRjaFs0XSAhPT0gdW5kZWZpbmVkID8gcGFyc2VGbG9hdChtYXRjaFs0XSkgOiAxLFxuICAgIH1cbiAgfVxuICByZXR1cm4geyByOiAwLCBnOiAwLCBiOiAwLCBhOiAxIH1cbn1cblxuLyoqIFBhcnNlIGhzbCgpIG9yIGhzbGEoKSBzdHJpbmcgKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhzbFN0cmluZyhzdHI6IHN0cmluZyk6IEhTTEEge1xuICBjb25zdCBtYXRjaCA9IHN0ci5tYXRjaCgvaHNsYT9cXCgoXFxkKyksXFxzKihbXFxkLl0rKSU/LFxccyooW1xcZC5dKyklPyg/OixcXHMqKFtcXGQuXSspKT9cXCkvKVxuICBpZiAobWF0Y2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaDogcGFyc2VJbnQobWF0Y2hbMV0pLFxuICAgICAgczogcGFyc2VGbG9hdChtYXRjaFsyXSksXG4gICAgICBsOiBwYXJzZUZsb2F0KG1hdGNoWzNdKSxcbiAgICAgIGE6IG1hdGNoWzRdICE9PSB1bmRlZmluZWQgPyBwYXJzZUZsb2F0KG1hdGNoWzRdKSA6IDEsXG4gICAgfVxuICB9XG4gIHJldHVybiB7IGg6IDAsIHM6IDAsIGw6IDAsIGE6IDEgfVxufVxuXG4vKiogUGFyc2UgYW55IGNvbG9yIHN0cmluZyB0byBSR0JBICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDb2xvcihjb2xvcjogc3RyaW5nKTogUkdCQSB7XG4gIGNvbG9yID0gY29sb3IudHJpbSgpLnRvTG93ZXJDYXNlKClcbiAgXG4gIGlmIChjb2xvci5zdGFydHNXaXRoKCcjJykpIHtcbiAgICByZXR1cm4gcGFyc2VIZXhBbHBoYShjb2xvcilcbiAgfVxuICBcbiAgaWYgKGNvbG9yLnN0YXJ0c1dpdGgoJ3JnYicpKSB7XG4gICAgcmV0dXJuIHBhcnNlUmdiU3RyaW5nKGNvbG9yKVxuICB9XG4gIFxuICBpZiAoY29sb3Iuc3RhcnRzV2l0aCgnaHNsJykpIHtcbiAgICBjb25zdCBoc2wgPSBwYXJzZUhzbFN0cmluZyhjb2xvcilcbiAgICBjb25zdCByZ2IgPSBoc2xUb1JnYihoc2wuaCwgaHNsLnMsIGhzbC5sKVxuICAgIHJldHVybiB7IC4uLnJnYiwgYTogaHNsLmEgfVxuICB9XG4gIFxuICAvLyBOYW1lZCBjb2xvcnMgKGJhc2ljIHNldClcbiAgY29uc3QgbmFtZWRDb2xvcnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgYmxhY2s6ICcjMDAwMDAwJyxcbiAgICB3aGl0ZTogJyNmZmZmZmYnLFxuICAgIHJlZDogJyNmZjAwMDAnLFxuICAgIGdyZWVuOiAnIzAwZmYwMCcsXG4gICAgYmx1ZTogJyMwMDAwZmYnLFxuICAgIHllbGxvdzogJyNmZmZmMDAnLFxuICAgIGN5YW46ICcjMDBmZmZmJyxcbiAgICBtYWdlbnRhOiAnI2ZmMDBmZicsXG4gICAgZ3JheTogJyM4MDgwODAnLFxuICAgIGdyZXk6ICcjODA4MDgwJyxcbiAgICB0cmFuc3BhcmVudDogJyMwMDAwMDAwMCcsXG4gIH1cbiAgXG4gIGlmIChuYW1lZENvbG9yc1tjb2xvcl0pIHtcbiAgICByZXR1cm4gcGFyc2VIZXhBbHBoYShuYW1lZENvbG9yc1tjb2xvcl0pXG4gIH1cbiAgXG4gIHJldHVybiB7IHI6IDAsIGc6IDAsIGI6IDAsIGE6IDEgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ09MT1IgQ09OVkVSU0lPTlxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqIENvbnZlcnQgUkdCIHRvIGhleCBzdHJpbmcgKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0hleChyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgdG9IZXggPSAobjogbnVtYmVyKSA9PiBNYXRoLnJvdW5kKG4pLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpXG4gIHJldHVybiBgIyR7dG9IZXgocil9JHt0b0hleChnKX0ke3RvSGV4KGIpfWBcbn1cblxuLyoqIENvbnZlcnQgUkdCQSB0byBoZXggc3RyaW5nIHdpdGggYWxwaGEgKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JhVG9IZXgocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYTogbnVtYmVyKTogc3RyaW5nIHtcbiAgY29uc3QgdG9IZXggPSAobjogbnVtYmVyKSA9PiBNYXRoLnJvdW5kKG4pLnRvU3RyaW5nKDE2KS5wYWRTdGFydCgyLCAnMCcpXG4gIHJldHVybiBgIyR7dG9IZXgocil9JHt0b0hleChnKX0ke3RvSGV4KGIpfSR7dG9IZXgoYSAqIDI1NSl9YFxufVxuXG4vKiogQ29udmVydCBSR0IgdG8gcmdiKCkgc3RyaW5nICovXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9TdHJpbmcocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgcmdiKCR7TWF0aC5yb3VuZChyKX0sICR7TWF0aC5yb3VuZChnKX0sICR7TWF0aC5yb3VuZChiKX0pYFxufVxuXG4vKiogQ29udmVydCBSR0JBIHRvIHJnYmEoKSBzdHJpbmcgKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JhVG9TdHJpbmcocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlciwgYTogbnVtYmVyKTogc3RyaW5nIHtcbiAgcmV0dXJuIGByZ2JhKCR7TWF0aC5yb3VuZChyKX0sICR7TWF0aC5yb3VuZChnKX0sICR7TWF0aC5yb3VuZChiKX0sICR7YX0pYFxufVxuXG4vKiogQ29udmVydCBSR0IgdG8gSFNMICovXG5leHBvcnQgZnVuY3Rpb24gcmdiVG9Ic2wocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IEhTTCB7XG4gIHIgLz0gMjU1XG4gIGcgLz0gMjU1XG4gIGIgLz0gMjU1XG5cbiAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYilcbiAgY29uc3QgbWluID0gTWF0aC5taW4ociwgZywgYilcbiAgY29uc3QgbCA9IChtYXggKyBtaW4pIC8gMlxuICBsZXQgaCA9IDBcbiAgbGV0IHMgPSAwXG5cbiAgaWYgKG1heCAhPT0gbWluKSB7XG4gICAgY29uc3QgZCA9IG1heCAtIG1pblxuICAgIHMgPSBsID4gMC41ID8gZCAvICgyIC0gbWF4IC0gbWluKSA6IGQgLyAobWF4ICsgbWluKVxuXG4gICAgc3dpdGNoIChtYXgpIHtcbiAgICAgIGNhc2UgcjpcbiAgICAgICAgaCA9ICgoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKSkgLyA2XG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIGc6XG4gICAgICAgIGggPSAoKGIgLSByKSAvIGQgKyAyKSAvIDZcbiAgICAgICAgYnJlYWtcbiAgICAgIGNhc2UgYjpcbiAgICAgICAgaCA9ICgociAtIGcpIC8gZCArIDQpIC8gNlxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGg6IGggKiAzNjAsIHM6IHMgKiAxMDAsIGw6IGwgKiAxMDAgfVxufVxuXG4vKiogQ29udmVydCBIU0wgdG8gUkdCICovXG5leHBvcnQgZnVuY3Rpb24gaHNsVG9SZ2IoaDogbnVtYmVyLCBzOiBudW1iZXIsIGw6IG51bWJlcik6IFJHQiB7XG4gIGggLz0gMzYwXG4gIHMgLz0gMTAwXG4gIGwgLz0gMTAwXG5cbiAgbGV0IHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXJcblxuICBpZiAocyA9PT0gMCkge1xuICAgIHIgPSBnID0gYiA9IGxcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBodWUycmdiID0gKHA6IG51bWJlciwgcTogbnVtYmVyLCB0OiBudW1iZXIpID0+IHtcbiAgICAgIGlmICh0IDwgMCkgdCArPSAxXG4gICAgICBpZiAodCA+IDEpIHQgLT0gMVxuICAgICAgaWYgKHQgPCAxIC8gNikgcmV0dXJuIHAgKyAocSAtIHApICogNiAqIHRcbiAgICAgIGlmICh0IDwgMSAvIDIpIHJldHVybiBxXG4gICAgICBpZiAodCA8IDIgLyAzKSByZXR1cm4gcCArIChxIC0gcCkgKiAoMiAvIDMgLSB0KSAqIDZcbiAgICAgIHJldHVybiBwXG4gICAgfVxuXG4gICAgY29uc3QgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHNcbiAgICBjb25zdCBwID0gMiAqIGwgLSBxXG5cbiAgICByID0gaHVlMnJnYihwLCBxLCBoICsgMSAvIDMpXG4gICAgZyA9IGh1ZTJyZ2IocCwgcSwgaClcbiAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHI6IE1hdGgucm91bmQociAqIDI1NSksXG4gICAgZzogTWF0aC5yb3VuZChnICogMjU1KSxcbiAgICBiOiBNYXRoLnJvdW5kKGIgKiAyNTUpLFxuICB9XG59XG5cbi8qKiBDb252ZXJ0IFJHQiB0byBncmF5c2NhbGUgKGx1bWluYW5jZSkgKi9cbmV4cG9ydCBmdW5jdGlvbiByZ2JUb0dyYXkocjogbnVtYmVyLCBnOiBudW1iZXIsIGI6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiByICogMC4yOTkgKyBnICogMC41ODcgKyBiICogMC4xMTRcbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIENPTE9SIEJMRU5ESU5HXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKiogQmxlbmQgdHdvIGNvbG9ycyB3aXRoIGdpdmVuIHJhdGlvICgwID0gY29sb3IxLCAxID0gY29sb3IyKSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJsZW5kQ29sb3JzKGNvbG9yMTogc3RyaW5nLCBjb2xvcjI6IHN0cmluZywgcmF0aW86IG51bWJlcik6IHN0cmluZyB7XG4gIGNvbnN0IGMxID0gcGFyc2VDb2xvcihjb2xvcjEpXG4gIGNvbnN0IGMyID0gcGFyc2VDb2xvcihjb2xvcjIpXG4gIFxuICBjb25zdCByID0gTWF0aC5yb3VuZChjMS5yICsgKGMyLnIgLSBjMS5yKSAqIHJhdGlvKVxuICBjb25zdCBnID0gTWF0aC5yb3VuZChjMS5nICsgKGMyLmcgLSBjMS5nKSAqIHJhdGlvKVxuICBjb25zdCBiID0gTWF0aC5yb3VuZChjMS5iICsgKGMyLmIgLSBjMS5iKSAqIHJhdGlvKVxuICBjb25zdCBhID0gYzEuYSArIChjMi5hIC0gYzEuYSkgKiByYXRpb1xuICBcbiAgaWYgKGEgPCAxKSB7XG4gICAgcmV0dXJuIHJnYmFUb1N0cmluZyhyLCBnLCBiLCBhKVxuICB9XG4gIHJldHVybiByZ2JUb0hleChyLCBnLCBiKVxufVxuXG4vKiogQmxlbmQgUkdCIHZhbHVlcyB3aXRoIHJhdGlvICovXG5leHBvcnQgZnVuY3Rpb24gYmxlbmRSZ2IoYzE6IFJHQiwgYzI6IFJHQiwgcmF0aW86IG51bWJlcik6IFJHQiB7XG4gIHJldHVybiB7XG4gICAgcjogTWF0aC5yb3VuZChjMS5yICsgKGMyLnIgLSBjMS5yKSAqIHJhdGlvKSxcbiAgICBnOiBNYXRoLnJvdW5kKGMxLmcgKyAoYzIuZyAtIGMxLmcpICogcmF0aW8pLFxuICAgIGI6IE1hdGgucm91bmQoYzEuYiArIChjMi5iIC0gYzEuYikgKiByYXRpbyksXG4gIH1cbn1cblxuLyoqIEFwcGx5IGFscGhhIG92ZXIgYmxlbmRpbmcgKGMxIG92ZXIgYzIpICovXG5leHBvcnQgZnVuY3Rpb24gYWxwaGFCbGVuZChjMTogUkdCQSwgYzI6IFJHQkEpOiBSR0JBIHtcbiAgY29uc3QgYSA9IGMxLmEgKyBjMi5hICogKDEgLSBjMS5hKVxuICBpZiAoYSA9PT0gMCkgcmV0dXJuIHsgcjogMCwgZzogMCwgYjogMCwgYTogMCB9XG4gIFxuICByZXR1cm4ge1xuICAgIHI6IE1hdGgucm91bmQoKGMxLnIgKiBjMS5hICsgYzIuciAqIGMyLmEgKiAoMSAtIGMxLmEpKSAvIGEpLFxuICAgIGc6IE1hdGgucm91bmQoKGMxLmcgKiBjMS5hICsgYzIuZyAqIGMyLmEgKiAoMSAtIGMxLmEpKSAvIGEpLFxuICAgIGI6IE1hdGgucm91bmQoKGMxLmIgKiBjMS5hICsgYzIuYiAqIGMyLmEgKiAoMSAtIGMxLmEpKSAvIGEpLFxuICAgIGEsXG4gIH1cbn1cblxuLyoqIE11bHRpcGx5IGJsZW5kIG1vZGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBtdWx0aXBseUJsZW5kKGMxOiBSR0IsIGMyOiBSR0IpOiBSR0Ige1xuICByZXR1cm4ge1xuICAgIHI6IE1hdGgucm91bmQoKGMxLnIgKiBjMi5yKSAvIDI1NSksXG4gICAgZzogTWF0aC5yb3VuZCgoYzEuZyAqIGMyLmcpIC8gMjU1KSxcbiAgICBiOiBNYXRoLnJvdW5kKChjMS5iICogYzIuYikgLyAyNTUpLFxuICB9XG59XG5cbi8qKiBTY3JlZW4gYmxlbmQgbW9kZSAqL1xuZXhwb3J0IGZ1bmN0aW9uIHNjcmVlbkJsZW5kKGMxOiBSR0IsIGMyOiBSR0IpOiBSR0Ige1xuICByZXR1cm4ge1xuICAgIHI6IE1hdGgucm91bmQoMjU1IC0gKCgyNTUgLSBjMS5yKSAqICgyNTUgLSBjMi5yKSkgLyAyNTUpLFxuICAgIGc6IE1hdGgucm91bmQoMjU1IC0gKCgyNTUgLSBjMS5nKSAqICgyNTUgLSBjMi5nKSkgLyAyNTUpLFxuICAgIGI6IE1hdGgucm91bmQoMjU1IC0gKCgyNTUgLSBjMS5iKSAqICgyNTUgLSBjMi5iKSkgLyAyNTUpLFxuICB9XG59XG5cbi8qKiBPdmVybGF5IGJsZW5kIG1vZGUgKi9cbmV4cG9ydCBmdW5jdGlvbiBvdmVybGF5QmxlbmQoYzE6IFJHQiwgYzI6IFJHQik6IFJHQiB7XG4gIGNvbnN0IG92ZXJsYXkgPSAoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IHtcbiAgICBpZiAoYSA8IDEyOCkge1xuICAgICAgcmV0dXJuICgyICogYSAqIGIpIC8gMjU1XG4gICAgfVxuICAgIHJldHVybiAyNTUgLSAoMiAqICgyNTUgLSBhKSAqICgyNTUgLSBiKSkgLyAyNTVcbiAgfVxuICBcbiAgcmV0dXJuIHtcbiAgICByOiBNYXRoLnJvdW5kKG92ZXJsYXkoYzEuciwgYzIucikpLFxuICAgIGc6IE1hdGgucm91bmQob3ZlcmxheShjMS5nLCBjMi5nKSksXG4gICAgYjogTWF0aC5yb3VuZChvdmVybGF5KGMxLmIsIGMyLmIpKSxcbiAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gR1JBRElFTlRTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKiogR2V0IGNvbG9yIGF0IHBvc2l0aW9uIGluIGdyYWRpZW50ICgwLTEpICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JhZGllbnRDb2xvcihzdG9wczogR3JhZGllbnRTdG9wW10sIHBvc2l0aW9uOiBudW1iZXIpOiBSR0Ige1xuICBpZiAoc3RvcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHsgcjogMCwgZzogMCwgYjogMCB9XG4gIH1cbiAgXG4gIGlmIChzdG9wcy5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gcGFyc2VDb2xvcihzdG9wc1swXS5jb2xvcilcbiAgfVxuICBcbiAgLy8gU29ydCBzdG9wcyBieSBwb3NpdGlvblxuICBjb25zdCBzb3J0ZWQgPSBbLi4uc3RvcHNdLnNvcnQoKGEsIGIpID0+IGEucG9zIC0gYi5wb3MpXG4gIFxuICAvLyBGaW5kIHN1cnJvdW5kaW5nIHN0b3BzXG4gIGxldCBzdGFydCA9IHNvcnRlZFswXVxuICBsZXQgZW5kID0gc29ydGVkW3NvcnRlZC5sZW5ndGggLSAxXVxuICBcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzb3J0ZWQubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgaWYgKHBvc2l0aW9uID49IHNvcnRlZFtpXS5wb3MgJiYgcG9zaXRpb24gPD0gc29ydGVkW2kgKyAxXS5wb3MpIHtcbiAgICAgIHN0YXJ0ID0gc29ydGVkW2ldXG4gICAgICBlbmQgPSBzb3J0ZWRbaSArIDFdXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICBcbiAgLy8gSGFuZGxlIGVkZ2UgY2FzZXNcbiAgaWYgKHBvc2l0aW9uIDw9IHN0YXJ0LnBvcykge1xuICAgIHJldHVybiBwYXJzZUNvbG9yKHN0YXJ0LmNvbG9yKVxuICB9XG4gIGlmIChwb3NpdGlvbiA+PSBlbmQucG9zKSB7XG4gICAgcmV0dXJuIHBhcnNlQ29sb3IoZW5kLmNvbG9yKVxuICB9XG4gIFxuICAvLyBJbnRlcnBvbGF0ZSBiZXR3ZWVuIHN0b3BzXG4gIGNvbnN0IHJhdGlvID0gKHBvc2l0aW9uIC0gc3RhcnQucG9zKSAvIChlbmQucG9zIC0gc3RhcnQucG9zKVxuICBjb25zdCBjMSA9IHBhcnNlQ29sb3Ioc3RhcnQuY29sb3IpXG4gIGNvbnN0IGMyID0gcGFyc2VDb2xvcihlbmQuY29sb3IpXG4gIFxuICByZXR1cm4gYmxlbmRSZ2IoYzEsIGMyLCByYXRpbylcbn1cblxuLyoqIENyZWF0ZSBDU1MgZ3JhZGllbnQgc3RyaW5nICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ3NzR3JhZGllbnQoY29uZmlnOiBHcmFkaWVudENvbmZpZyk6IHN0cmluZyB7XG4gIGlmIChjb25maWcudHlwZSA9PT0gJ25vbmUnIHx8IGNvbmZpZy5zdG9wcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gJ25vbmUnXG4gIH1cbiAgXG4gIGNvbnN0IHN0b3BTdHIgPSBjb25maWcuc3RvcHNcbiAgICAubWFwKChzKSA9PiBgJHtzLmNvbG9yfSAke3MucG9zICogMTAwfSVgKVxuICAgIC5qb2luKCcsICcpXG4gIFxuICBzd2l0Y2ggKGNvbmZpZy50eXBlKSB7XG4gICAgY2FzZSAnbGluZWFyJzpcbiAgICAgIHJldHVybiBgbGluZWFyLWdyYWRpZW50KCR7Y29uZmlnLmFuZ2xlIHx8IDB9ZGVnLCAke3N0b3BTdHJ9KWBcbiAgICBjYXNlICdyYWRpYWwnOlxuICAgICAgY29uc3QgY3ggPSAoY29uZmlnLmNlbnRlclggPz8gMC41KSAqIDEwMFxuICAgICAgY29uc3QgY3kgPSAoY29uZmlnLmNlbnRlclkgPz8gMC41KSAqIDEwMFxuICAgICAgcmV0dXJuIGByYWRpYWwtZ3JhZGllbnQoY2lyY2xlIGF0ICR7Y3h9JSAke2N5fSUsICR7c3RvcFN0cn0pYFxuICAgIGNhc2UgJ2NvbmljJzpcbiAgICAgIGNvbnN0IGNjeCA9IChjb25maWcuY2VudGVyWCA/PyAwLjUpICogMTAwXG4gICAgICBjb25zdCBjY3kgPSAoY29uZmlnLmNlbnRlclkgPz8gMC41KSAqIDEwMFxuICAgICAgcmV0dXJuIGBjb25pYy1ncmFkaWVudChmcm9tICR7Y29uZmlnLmFuZ2xlIHx8IDB9ZGVnIGF0ICR7Y2N4fSUgJHtjY3l9JSwgJHtzdG9wU3RyfSlgXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiAnbm9uZSdcbiAgfVxufVxuXG4vKiogQXBwbHkgZ3JhZGllbnQgdG8gYSAyRCBwb3NpdGlvbiAoZm9yIG1vZHVsZSBjb2xvcmluZykgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHcmFkaWVudENvbG9yQXQoXG4gIGNvbmZpZzogR3JhZGllbnRDb25maWcsXG4gIHg6IG51bWJlcixcbiAgeTogbnVtYmVyLFxuICB3aWR0aDogbnVtYmVyLFxuICBoZWlnaHQ6IG51bWJlclxuKTogUkdCIHtcbiAgaWYgKGNvbmZpZy50eXBlID09PSAnbm9uZScgfHwgY29uZmlnLnN0b3BzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7IHI6IDAsIGc6IDAsIGI6IDAgfVxuICB9XG4gIFxuICBsZXQgcG9zaXRpb246IG51bWJlclxuICBcbiAgc3dpdGNoIChjb25maWcudHlwZSkge1xuICAgIGNhc2UgJ2xpbmVhcic6IHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gKChjb25maWcuYW5nbGUgfHwgMCkgKiBNYXRoLlBJKSAvIDE4MFxuICAgICAgY29uc3QgbnggPSB4IC8gd2lkdGggLSAwLjVcbiAgICAgIGNvbnN0IG55ID0geSAvIGhlaWdodCAtIDAuNVxuICAgICAgcG9zaXRpb24gPSAwLjUgKyBueCAqIE1hdGguY29zKGFuZ2xlKSArIG55ICogTWF0aC5zaW4oYW5nbGUpXG4gICAgICBicmVha1xuICAgIH1cbiAgICBjYXNlICdyYWRpYWwnOiB7XG4gICAgICBjb25zdCBjeCA9IGNvbmZpZy5jZW50ZXJYID8/IDAuNVxuICAgICAgY29uc3QgY3kgPSBjb25maWcuY2VudGVyWSA/PyAwLjVcbiAgICAgIGNvbnN0IGR4ID0geCAvIHdpZHRoIC0gY3hcbiAgICAgIGNvbnN0IGR5ID0geSAvIGhlaWdodCAtIGN5XG4gICAgICBwb3NpdGlvbiA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSkgKiAyXG4gICAgICBicmVha1xuICAgIH1cbiAgICBjYXNlICdjb25pYyc6IHtcbiAgICAgIGNvbnN0IGN4ID0gY29uZmlnLmNlbnRlclggPz8gMC41XG4gICAgICBjb25zdCBjeSA9IGNvbmZpZy5jZW50ZXJZID8/IDAuNVxuICAgICAgY29uc3QgZHggPSB4IC8gd2lkdGggLSBjeFxuICAgICAgY29uc3QgZHkgPSB5IC8gaGVpZ2h0IC0gY3lcbiAgICAgIGNvbnN0IGJhc2VBbmdsZSA9ICgoY29uZmlnLmFuZ2xlIHx8IDApICogTWF0aC5QSSkgLyAxODBcbiAgICAgIGNvbnN0IGFuZ2xlID0gTWF0aC5hdGFuMihkeSwgZHgpIC0gYmFzZUFuZ2xlXG4gICAgICBwb3NpdGlvbiA9IChhbmdsZSAvICgyICogTWF0aC5QSSkgKyAwLjUpICUgMVxuICAgICAgYnJlYWtcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHBvc2l0aW9uID0gMFxuICB9XG4gIFxuICByZXR1cm4gZ2V0R3JhZGllbnRDb2xvcihjb25maWcuc3RvcHMsIE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHBvc2l0aW9uKSkpXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBDT05UUkFTVCAmIEFDQ0VTU0lCSUxJVFlcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBDYWxjdWxhdGUgcmVsYXRpdmUgbHVtaW5hbmNlIGZvciBXQ0FHIGNvbnRyYXN0ICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UmVsYXRpdmVMdW1pbmFuY2UoY29sb3I6IFJHQiB8IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IGMgPSB0eXBlb2YgY29sb3IgPT09ICdzdHJpbmcnID8gcGFyc2VDb2xvcihjb2xvcikgOiBjb2xvclxuICBcbiAgY29uc3QgcnNSR0IgPSBjLnIgLyAyNTVcbiAgY29uc3QgZ3NSR0IgPSBjLmcgLyAyNTVcbiAgY29uc3QgYnNSR0IgPSBjLmIgLyAyNTVcbiAgXG4gIGNvbnN0IHIgPSByc1JHQiA8PSAwLjAzOTI4ID8gcnNSR0IgLyAxMi45MiA6IE1hdGgucG93KChyc1JHQiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gIGNvbnN0IGcgPSBnc1JHQiA8PSAwLjAzOTI4ID8gZ3NSR0IgLyAxMi45MiA6IE1hdGgucG93KChnc1JHQiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gIGNvbnN0IGIgPSBic1JHQiA8PSAwLjAzOTI4ID8gYnNSR0IgLyAxMi45MiA6IE1hdGgucG93KChic1JHQiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpXG4gIFxuICByZXR1cm4gMC4yMTI2ICogciArIDAuNzE1MiAqIGcgKyAwLjA3MjIgKiBiXG59XG5cbi8qKiBDYWxjdWxhdGUgV0NBRyBjb250cmFzdCByYXRpbyBiZXR3ZWVuIHR3byBjb2xvcnMgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250cmFzdFJhdGlvKGNvbG9yMTogUkdCIHwgc3RyaW5nLCBjb2xvcjI6IFJHQiB8IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IGwxID0gZ2V0UmVsYXRpdmVMdW1pbmFuY2UoY29sb3IxKVxuICBjb25zdCBsMiA9IGdldFJlbGF0aXZlTHVtaW5hbmNlKGNvbG9yMilcbiAgXG4gIGNvbnN0IGxpZ2h0ZXIgPSBNYXRoLm1heChsMSwgbDIpXG4gIGNvbnN0IGRhcmtlciA9IE1hdGgubWluKGwxLCBsMilcbiAgXG4gIHJldHVybiAobGlnaHRlciArIDAuMDUpIC8gKGRhcmtlciArIDAuMDUpXG59XG5cbi8qKiBDaGVjayBpZiBjb250cmFzdCBtZWV0cyBXQ0FHIEFBIHJlcXVpcmVtZW50ICg0LjU6MSBmb3Igbm9ybWFsIHRleHQpICovXG5leHBvcnQgZnVuY3Rpb24gbWVldHNDb250cmFzdEFBKFxuICBjb2xvcjE6IFJHQiB8IHN0cmluZyxcbiAgY29sb3IyOiBSR0IgfCBzdHJpbmcsXG4gIGxhcmdlVGV4dDogYm9vbGVhbiA9IGZhbHNlXG4pOiBib29sZWFuIHtcbiAgY29uc3QgcmF0aW8gPSBnZXRDb250cmFzdFJhdGlvKGNvbG9yMSwgY29sb3IyKVxuICByZXR1cm4gbGFyZ2VUZXh0ID8gcmF0aW8gPj0gMyA6IHJhdGlvID49IDQuNVxufVxuXG4vKiogQ2hlY2sgaWYgY29udHJhc3QgbWVldHMgV0NBRyBBQUEgcmVxdWlyZW1lbnQgKDc6MSBmb3Igbm9ybWFsIHRleHQpICovXG5leHBvcnQgZnVuY3Rpb24gbWVldHNDb250cmFzdEFBQShcbiAgY29sb3IxOiBSR0IgfCBzdHJpbmcsXG4gIGNvbG9yMjogUkdCIHwgc3RyaW5nLFxuICBsYXJnZVRleHQ6IGJvb2xlYW4gPSBmYWxzZVxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHJhdGlvID0gZ2V0Q29udHJhc3RSYXRpbyhjb2xvcjEsIGNvbG9yMilcbiAgcmV0dXJuIGxhcmdlVGV4dCA/IHJhdGlvID49IDQuNSA6IHJhdGlvID49IDdcbn1cblxuLyoqIEFkanVzdCBjb2xvciB0byBtZWV0IG1pbmltdW0gY29udHJhc3QgcmF0aW8gKi9cbmV4cG9ydCBmdW5jdGlvbiBhZGp1c3RGb3JDb250cmFzdChcbiAgZm9yZWdyb3VuZDogc3RyaW5nLFxuICBiYWNrZ3JvdW5kOiBzdHJpbmcsXG4gIG1pblJhdGlvOiBudW1iZXIgPSA0LjVcbik6IHN0cmluZyB7XG4gIGNvbnN0IGZnID0gcGFyc2VDb2xvcihmb3JlZ3JvdW5kKVxuICBjb25zdCBiZyA9IHBhcnNlQ29sb3IoYmFja2dyb3VuZClcbiAgXG4gIGxldCBjdXJyZW50UmF0aW8gPSBnZXRDb250cmFzdFJhdGlvKGZnLCBiZylcbiAgXG4gIGlmIChjdXJyZW50UmF0aW8gPj0gbWluUmF0aW8pIHtcbiAgICByZXR1cm4gZm9yZWdyb3VuZFxuICB9XG4gIFxuICAvLyBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIGxpZ2h0ZW4gb3IgZGFya2VuXG4gIGNvbnN0IGZnTHVtID0gZ2V0UmVsYXRpdmVMdW1pbmFuY2UoZmcpXG4gIGNvbnN0IGJnTHVtID0gZ2V0UmVsYXRpdmVMdW1pbmFuY2UoYmcpXG4gIGNvbnN0IHNob3VsZERhcmtlbiA9IGZnTHVtID4gYmdMdW1cbiAgXG4gIC8vIEl0ZXJhdGl2ZWx5IGFkanVzdFxuICBsZXQgYWRqdXN0ZWQgPSB7IC4uLmZnIH1cbiAgbGV0IHN0ZXAgPSA1XG4gIFxuICB3aGlsZSAoY3VycmVudFJhdGlvIDwgbWluUmF0aW8gJiYgc3RlcCA+IDApIHtcbiAgICBpZiAoc2hvdWxkRGFya2VuKSB7XG4gICAgICBhZGp1c3RlZC5yID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWQuciAtIHN0ZXApXG4gICAgICBhZGp1c3RlZC5nID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWQuZyAtIHN0ZXApXG4gICAgICBhZGp1c3RlZC5iID0gTWF0aC5tYXgoMCwgYWRqdXN0ZWQuYiAtIHN0ZXApXG4gICAgfSBlbHNlIHtcbiAgICAgIGFkanVzdGVkLnIgPSBNYXRoLm1pbigyNTUsIGFkanVzdGVkLnIgKyBzdGVwKVxuICAgICAgYWRqdXN0ZWQuZyA9IE1hdGgubWluKDI1NSwgYWRqdXN0ZWQuZyArIHN0ZXApXG4gICAgICBhZGp1c3RlZC5iID0gTWF0aC5taW4oMjU1LCBhZGp1c3RlZC5iICsgc3RlcClcbiAgICB9XG4gICAgXG4gICAgY3VycmVudFJhdGlvID0gZ2V0Q29udHJhc3RSYXRpbyhhZGp1c3RlZCwgYmcpXG4gICAgXG4gICAgLy8gUmVkdWNlIHN0ZXAgaWYgd2UndmUgaGl0IHRoZSBsaW1pdHNcbiAgICBpZiAoXG4gICAgICAoc2hvdWxkRGFya2VuICYmIGFkanVzdGVkLnIgPT09IDAgJiYgYWRqdXN0ZWQuZyA9PT0gMCAmJiBhZGp1c3RlZC5iID09PSAwKSB8fFxuICAgICAgKCFzaG91bGREYXJrZW4gJiYgYWRqdXN0ZWQuciA9PT0gMjU1ICYmIGFkanVzdGVkLmcgPT09IDI1NSAmJiBhZGp1c3RlZC5iID09PSAyNTUpXG4gICAgKSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICBcbiAgcmV0dXJuIHJnYlRvSGV4KGFkanVzdGVkLnIsIGFkanVzdGVkLmcsIGFkanVzdGVkLmIpXG59XG5cbi8qKiBDaGVjayBpZiBhIGNvbG9yIGlzIGNvbnNpZGVyZWQgXCJkYXJrXCIgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0RhcmsoY29sb3I6IFJHQiB8IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBjID0gdHlwZW9mIGNvbG9yID09PSAnc3RyaW5nJyA/IHBhcnNlQ29sb3IoY29sb3IpIDogY29sb3JcbiAgY29uc3QgZ3JheSA9IHJnYlRvR3JheShjLnIsIGMuZywgYy5iKVxuICByZXR1cm4gZ3JheSA8IDEyOFxufVxuXG4vKiogR2V0IGJlc3QgdGV4dCBjb2xvciAoYmxhY2sgb3Igd2hpdGUpIGZvciBnaXZlbiBiYWNrZ3JvdW5kICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0VGV4dENvbG9yKGJhY2tncm91bmRDb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgYmcgPSBwYXJzZUNvbG9yKGJhY2tncm91bmRDb2xvcilcbiAgY29uc3QgbHVtaW5hbmNlID0gZ2V0UmVsYXRpdmVMdW1pbmFuY2UoYmcpXG4gIHJldHVybiBsdW1pbmFuY2UgPiAwLjE3OSA/ICcjMDAwMDAwJyA6ICcjZmZmZmZmJ1xufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQ09MT1IgUEFMRVRURSBVVElMSVRJRVNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBHZW5lcmF0ZSBjb21wbGVtZW50YXJ5IGNvbG9yICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29tcGxlbWVudGFyeShjb2xvcjogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgcmdiID0gcGFyc2VDb2xvcihjb2xvcilcbiAgY29uc3QgaHNsID0gcmdiVG9Ic2wocmdiLnIsIHJnYi5nLCByZ2IuYilcbiAgaHNsLmggPSAoaHNsLmggKyAxODApICUgMzYwXG4gIGNvbnN0IHJlc3VsdCA9IGhzbFRvUmdiKGhzbC5oLCBoc2wucywgaHNsLmwpXG4gIHJldHVybiByZ2JUb0hleChyZXN1bHQuciwgcmVzdWx0LmcsIHJlc3VsdC5iKVxufVxuXG4vKiogR2VuZXJhdGUgYW5hbG9nb3VzIGNvbG9ycyAoMzBcdTAwQjAgYXBhcnQpICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0QW5hbG9nb3VzKGNvbG9yOiBzdHJpbmcpOiBbc3RyaW5nLCBzdHJpbmddIHtcbiAgY29uc3QgcmdiID0gcGFyc2VDb2xvcihjb2xvcilcbiAgY29uc3QgaHNsID0gcmdiVG9Ic2wocmdiLnIsIHJnYi5nLCByZ2IuYilcbiAgXG4gIGNvbnN0IGhzbDEgPSB7IC4uLmhzbCwgaDogKGhzbC5oICsgMzApICUgMzYwIH1cbiAgY29uc3QgaHNsMiA9IHsgLi4uaHNsLCBoOiAoaHNsLmggLSAzMCArIDM2MCkgJSAzNjAgfVxuICBcbiAgY29uc3QgcmdiMSA9IGhzbFRvUmdiKGhzbDEuaCwgaHNsMS5zLCBoc2wxLmwpXG4gIGNvbnN0IHJnYjIgPSBoc2xUb1JnYihoc2wyLmgsIGhzbDIucywgaHNsMi5sKVxuICBcbiAgcmV0dXJuIFtcbiAgICByZ2JUb0hleChyZ2IxLnIsIHJnYjEuZywgcmdiMS5iKSxcbiAgICByZ2JUb0hleChyZ2IyLnIsIHJnYjIuZywgcmdiMi5iKSxcbiAgXVxufVxuXG4vKiogR2VuZXJhdGUgdHJpYWRpYyBjb2xvcnMgKDEyMFx1MDBCMCBhcGFydCkgKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUcmlhZGljKGNvbG9yOiBzdHJpbmcpOiBbc3RyaW5nLCBzdHJpbmddIHtcbiAgY29uc3QgcmdiID0gcGFyc2VDb2xvcihjb2xvcilcbiAgY29uc3QgaHNsID0gcmdiVG9Ic2wocmdiLnIsIHJnYi5nLCByZ2IuYilcbiAgXG4gIGNvbnN0IGhzbDEgPSB7IC4uLmhzbCwgaDogKGhzbC5oICsgMTIwKSAlIDM2MCB9XG4gIGNvbnN0IGhzbDIgPSB7IC4uLmhzbCwgaDogKGhzbC5oICsgMjQwKSAlIDM2MCB9XG4gIFxuICBjb25zdCByZ2IxID0gaHNsVG9SZ2IoaHNsMS5oLCBoc2wxLnMsIGhzbDEubClcbiAgY29uc3QgcmdiMiA9IGhzbFRvUmdiKGhzbDIuaCwgaHNsMi5zLCBoc2wyLmwpXG4gIFxuICByZXR1cm4gW1xuICAgIHJnYlRvSGV4KHJnYjEuciwgcmdiMS5nLCByZ2IxLmIpLFxuICAgIHJnYlRvSGV4KHJnYjIuciwgcmdiMi5nLCByZ2IyLmIpLFxuICBdXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBFWFBPUlRcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbmV4cG9ydCBjb25zdCBDb2xvclV0aWxzID0ge1xuICAvLyBQYXJzaW5nXG4gIHBhcnNlSGV4LFxuICBwYXJzZUhleEFscGhhLFxuICBwYXJzZVJnYlN0cmluZyxcbiAgcGFyc2VIc2xTdHJpbmcsXG4gIHBhcnNlQ29sb3IsXG4gIFxuICAvLyBDb252ZXJzaW9uXG4gIHJnYlRvSGV4LFxuICByZ2JhVG9IZXgsXG4gIHJnYlRvU3RyaW5nLFxuICByZ2JhVG9TdHJpbmcsXG4gIHJnYlRvSHNsLFxuICBoc2xUb1JnYixcbiAgcmdiVG9HcmF5LFxuICBcbiAgLy8gQmxlbmRpbmdcbiAgYmxlbmRDb2xvcnMsXG4gIGJsZW5kUmdiLFxuICBhbHBoYUJsZW5kLFxuICBtdWx0aXBseUJsZW5kLFxuICBzY3JlZW5CbGVuZCxcbiAgb3ZlcmxheUJsZW5kLFxuICBcbiAgLy8gR3JhZGllbnRzXG4gIGdldEdyYWRpZW50Q29sb3IsXG4gIGNyZWF0ZUNzc0dyYWRpZW50LFxuICBnZXRHcmFkaWVudENvbG9yQXQsXG4gIFxuICAvLyBDb250cmFzdFxuICBnZXRSZWxhdGl2ZUx1bWluYW5jZSxcbiAgZ2V0Q29udHJhc3RSYXRpbyxcbiAgbWVldHNDb250cmFzdEFBLFxuICBtZWV0c0NvbnRyYXN0QUFBLFxuICBhZGp1c3RGb3JDb250cmFzdCxcbiAgaXNEYXJrLFxuICBnZXRUZXh0Q29sb3IsXG4gIFxuICAvLyBQYWxldHRlXG4gIGdldENvbXBsZW1lbnRhcnksXG4gIGdldEFuYWxvZ291cyxcbiAgZ2V0VHJpYWRpYyxcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sb3JVdGlsc1xuIiwgIi8qKlxuICogRGl0aGVyaW5nIEFsZ29yaXRobXMgTW9kdWxlXG4gKiBDb21wcmVoZW5zaXZlIGltcGxlbWVudGF0aW9uIG9mIGFsbCBkaXRoZXJpbmcgYWxnb3JpdGhtc1xuICogU3VwcG9ydHMgZXJyb3IgZGlmZnVzaW9uLCBvcmRlcmVkIGRpdGhlcmluZywgYW5kIG5vaXNlLWJhc2VkIG1ldGhvZHNcbiAqL1xuXG5pbXBvcnQgdHlwZSB7IERpdGhlcktpbmQsIERpZmZ1c2lvbktlcm5lbCwgT3JkZXJlZE1hdHJpeCwgQ29sb3JNb2RlIH0gZnJvbSAnLi4vc3RvcmUvcXItc3RvcmUnXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBUWVBFU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGludGVyZmFjZSBSR0Ige1xuICByOiBudW1iZXJcbiAgZzogbnVtYmVyXG4gIGI6IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpdGhlck9wdGlvbnMge1xuICBraW5kOiBEaXRoZXJLaW5kXG4gIHN0cmVuZ3RoOiBudW1iZXIgICAgICAgICAgIC8vIDAtMTAwXG4gIHNlcnBlbnRpbmU6IGJvb2xlYW5cbiAgZGlmZnVzaW9uS2VybmVsOiBEaWZmdXNpb25LZXJuZWxcbiAgb3JkZXJlZE1hdHJpeDogT3JkZXJlZE1hdHJpeFxuICBjb2xvck1vZGU6IENvbG9yTW9kZVxuICBsZXZlbHM6IG51bWJlciAgICAgICAgICAgICAvLyBPdXRwdXQgY29sb3IgbGV2ZWxzICgyIGZvciBCJlcsIG1vcmUgZm9yIGdyYXlzY2FsZSlcbiAgYmx1ZU5vaXNlU2VlZDogbnVtYmVyXG4gIGJsdWVOb2lzZVRpbGVTaXplOiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXRoZXJSZXN1bHQge1xuICBtYXRyaXg6IGJvb2xlYW5bXVtdXG4gIGNvbG9yczogUkdCW11bXVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gT1JERVJFRCBESVRIRVJJTkcgTUFUUklDRVNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBCYXllciAyeDIgbWF0cml4ICovXG5jb25zdCBCQVlFUl8yID0gW1xuICBbMCwgMl0sXG4gIFszLCAxXSxcbl1cblxuLyoqIEJheWVyIDR4NCBtYXRyaXggKi9cbmNvbnN0IEJBWUVSXzQgPSBbXG4gIFswLCA4LCAyLCAxMF0sXG4gIFsxMiwgNCwgMTQsIDZdLFxuICBbMywgMTEsIDEsIDldLFxuICBbMTUsIDcsIDEzLCA1XSxcbl1cblxuLyoqIEJheWVyIDh4OCBtYXRyaXggKi9cbmNvbnN0IEJBWUVSXzggPSBbXG4gIFswLCAzMiwgOCwgNDAsIDIsIDM0LCAxMCwgNDJdLFxuICBbNDgsIDE2LCA1NiwgMjQsIDUwLCAxOCwgNTgsIDI2XSxcbiAgWzEyLCA0NCwgNCwgMzYsIDE0LCA0NiwgNiwgMzhdLFxuICBbNjAsIDI4LCA1MiwgMjAsIDYyLCAzMCwgNTQsIDIyXSxcbiAgWzMsIDM1LCAxMSwgNDMsIDEsIDMzLCA5LCA0MV0sXG4gIFs1MSwgMTksIDU5LCAyNywgNDksIDE3LCA1NywgMjVdLFxuICBbMTUsIDQ3LCA3LCAzOSwgMTMsIDQ1LCA1LCAzN10sXG4gIFs2MywgMzEsIDU1LCAyMywgNjEsIDI5LCA1MywgMjFdLFxuXVxuXG4vKiogQ2x1c3RlcmVkLWRvdCBtYXRyaXggKGhhbGZ0b25lLWxpa2UpICovXG5jb25zdCBDTFVTVEVSRURfRE9UID0gW1xuICBbMjQsIDEwLCAxMiwgMjYsIDM1LCA0NywgNDksIDM3XSxcbiAgWzgsIDAsIDIsIDE0LCA0NSwgNTksIDYxLCA1MV0sXG4gIFsyMiwgNiwgNCwgMTYsIDQzLCA1NywgNjMsIDUzXSxcbiAgWzMwLCAyMCwgMTgsIDI4LCAzMywgNDEsIDU1LCAzOV0sXG4gIFszNCwgNDYsIDQ4LCAzNiwgMjUsIDExLCAxMywgMjddLFxuICBbNDQsIDU4LCA2MCwgNTAsIDksIDEsIDMsIDE1XSxcbiAgWzQyLCA1NiwgNjIsIDUyLCAyMywgNywgNSwgMTddLFxuICBbMzIsIDQwLCA1NCwgMzgsIDMxLCAyMSwgMTksIDI5XSxcbl1cblxuLyoqIFZvaWQgYW5kIGNsdXN0ZXIgbWF0cml4ICg4eDgpICovXG5jb25zdCBWT0lEX0NMVVNURVIgPSBbXG4gIFsxMywgOSwgNSwgMTIsIDE4LCAyMiwgMjYsIDE5XSxcbiAgWzYsIDEsIDAsIDgsIDI1LCAzMCwgMzEsIDIzXSxcbiAgWzEwLCAyLCAzLCA0LCAyMSwgMjksIDI4LCAyN10sXG4gIFsxNCwgNywgMTEsIDE1LCAxNywgMjQsIDIwLCAxNl0sXG4gIFsxOCwgMjIsIDI2LCAxOSwgMTMsIDksIDUsIDEyXSxcbiAgWzI1LCAzMCwgMzEsIDIzLCA2LCAxLCAwLCA4XSxcbiAgWzIxLCAyOSwgMjgsIDI3LCAxMCwgMiwgMywgNF0sXG4gIFsxNywgMjQsIDIwLCAxNiwgMTQsIDcsIDExLCAxNV0sXG5dXG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBFUlJPUiBESUZGVVNJT04gS0VSTkVMU1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuaW50ZXJmYWNlIERpZmZ1c2lvbktlcm5lbERlZiB7XG4gIG1hdHJpeDogbnVtYmVyW11bXVxuICBkaXZpc29yOiBudW1iZXJcbiAgb2Zmc2V0OiBudW1iZXJcbn1cblxuY29uc3QgRElGRlVTSU9OX0tFUk5FTFM6IFJlY29yZDxEaWZmdXNpb25LZXJuZWwsIERpZmZ1c2lvbktlcm5lbERlZj4gPSB7XG4gIGZsb3lkX3N0ZWluYmVyZzoge1xuICAgIG1hdHJpeDogW1xuICAgICAgWzAsIDAsIDddLFxuICAgICAgWzMsIDUsIDFdLFxuICAgIF0sXG4gICAgZGl2aXNvcjogMTYsXG4gICAgb2Zmc2V0OiAxLFxuICB9LFxuICBqYXJ2aXNfanVkaWNlX25pbmtlOiB7XG4gICAgbWF0cml4OiBbXG4gICAgICBbMCwgMCwgMCwgNywgNV0sXG4gICAgICBbMywgNSwgNywgNSwgM10sXG4gICAgICBbMSwgMywgNSwgMywgMV0sXG4gICAgXSxcbiAgICBkaXZpc29yOiA0OCxcbiAgICBvZmZzZXQ6IDIsXG4gIH0sXG4gIHN0dWNraToge1xuICAgIG1hdHJpeDogW1xuICAgICAgWzAsIDAsIDAsIDgsIDRdLFxuICAgICAgWzIsIDQsIDgsIDQsIDJdLFxuICAgICAgWzEsIDIsIDQsIDIsIDFdLFxuICAgIF0sXG4gICAgZGl2aXNvcjogNDIsXG4gICAgb2Zmc2V0OiAyLFxuICB9LFxuICBidXJrZXM6IHtcbiAgICBtYXRyaXg6IFtcbiAgICAgIFswLCAwLCAwLCA4LCA0XSxcbiAgICAgIFsyLCA0LCA4LCA0LCAyXSxcbiAgICBdLFxuICAgIGRpdmlzb3I6IDMyLFxuICAgIG9mZnNldDogMixcbiAgfSxcbiAgc2llcnJhOiB7XG4gICAgbWF0cml4OiBbXG4gICAgICBbMCwgMCwgMCwgNSwgM10sXG4gICAgICBbMiwgNCwgNSwgNCwgMl0sXG4gICAgICBbMCwgMiwgMywgMiwgMF0sXG4gICAgXSxcbiAgICBkaXZpc29yOiAzMixcbiAgICBvZmZzZXQ6IDIsXG4gIH0sXG4gIHNpZXJyYV8yOiB7XG4gICAgbWF0cml4OiBbXG4gICAgICBbMCwgMCwgMCwgNCwgM10sXG4gICAgICBbMSwgMiwgMywgMiwgMV0sXG4gICAgXSxcbiAgICBkaXZpc29yOiAxNixcbiAgICBvZmZzZXQ6IDIsXG4gIH0sXG4gIHNpZXJyYV9saXRlOiB7XG4gICAgbWF0cml4OiBbXG4gICAgICBbMCwgMCwgMl0sXG4gICAgICBbMSwgMSwgMF0sXG4gICAgXSxcbiAgICBkaXZpc29yOiA0LFxuICAgIG9mZnNldDogMSxcbiAgfSxcbiAgYXRraW5zb246IHtcbiAgICBtYXRyaXg6IFtcbiAgICAgIFswLCAwLCAxLCAxXSxcbiAgICAgIFsxLCAxLCAxLCAwXSxcbiAgICAgIFswLCAxLCAwLCAwXSxcbiAgICBdLFxuICAgIGRpdmlzb3I6IDgsXG4gICAgb2Zmc2V0OiAxLFxuICB9LFxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gVVRJTElUWSBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBDbGFtcCB2YWx1ZSB0byAwLTEgcmFuZ2UgKi9cbmZ1bmN0aW9uIGNsYW1wMDEodmFsdWU6IG51bWJlcik6IG51bWJlciB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2YWx1ZSkpXG59XG5cbi8qKiBDb252ZXJ0IFJHQiB0byBncmF5c2NhbGUgKDAtMSkgKi9cbmZ1bmN0aW9uIHJnYlRvR3JheShyOiBudW1iZXIsIGc6IG51bWJlciwgYjogbnVtYmVyKTogbnVtYmVyIHtcbiAgcmV0dXJuIHIgKiAwLjI5OSArIGcgKiAwLjU4NyArIGIgKiAwLjExNFxufVxuXG4vKiogQ3JlYXRlIHNlZWRlZCByYW5kb20gbnVtYmVyIGdlbmVyYXRvciAqL1xuZnVuY3Rpb24gY3JlYXRlUk5HKHNlZWQ6IG51bWJlcik6ICgpID0+IG51bWJlciB7XG4gIGxldCBzdGF0ZSA9IHNlZWQgfHwgRGF0ZS5ub3coKVxuICByZXR1cm4gKCkgPT4ge1xuICAgIHN0YXRlID0gKHN0YXRlICogMTEwMzUxNTI0NSArIDEyMzQ1KSAmIDB4N2ZmZmZmZmZcbiAgICByZXR1cm4gc3RhdGUgLyAweDdmZmZmZmZmXG4gIH1cbn1cblxuLyoqIEdldCBvcmRlcmVkIGRpdGhlcmluZyBtYXRyaXggYnkgbmFtZSAqL1xuZnVuY3Rpb24gZ2V0T3JkZXJlZE1hdHJpeChuYW1lOiBPcmRlcmVkTWF0cml4KTogbnVtYmVyW11bXSB7XG4gIHN3aXRjaCAobmFtZSkge1xuICAgIGNhc2UgJ2JheWVyMic6XG4gICAgICByZXR1cm4gQkFZRVJfMlxuICAgIGNhc2UgJ2JheWVyNCc6XG4gICAgICByZXR1cm4gQkFZRVJfNFxuICAgIGNhc2UgJ2JheWVyOCc6XG4gICAgICByZXR1cm4gQkFZRVJfOFxuICAgIGNhc2UgJ2NsdXN0ZXJlZF9kb3QnOlxuICAgICAgcmV0dXJuIENMVVNURVJFRF9ET1RcbiAgICBjYXNlICd2b2lkX2NsdXN0ZXInOlxuICAgICAgcmV0dXJuIFZPSURfQ0xVU1RFUlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gQkFZRVJfNFxuICB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBCTFVFIE5PSVNFIEdFTkVSQVRJT05cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBHZW5lcmF0ZSBibHVlIG5vaXNlIHRpbGUgdXNpbmcgaW50ZXJsZWF2ZWQgZ3JhZGllbnQgbm9pc2UgKi9cbmZ1bmN0aW9uIGdlbmVyYXRlQmx1ZU5vaXNlVGlsZShzaXplOiBudW1iZXIsIHNlZWQ6IG51bWJlcik6IG51bWJlcltdIHtcbiAgY29uc3QgdGlsZTogbnVtYmVyW10gPSBuZXcgQXJyYXkoc2l6ZSAqIHNpemUpXG4gIGNvbnN0IHBoaSA9IDEuNjE4MDMzOTg4NzQ5ODk1IC8vIEdvbGRlbiByYXRpb1xuICBjb25zdCBybmcgPSBjcmVhdGVSTkcoc2VlZClcblxuICBmb3IgKGxldCB5ID0gMDsgeSA8IHNpemU7IHkrKykge1xuICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XG4gICAgICAvLyBJbnRlcmxlYXZlZCBncmFkaWVudCBub2lzZSBmb3JtdWxhXG4gICAgICBjb25zdCBpZ24gPSAoNTIuOTgyOTE4OSAqICgoMC4wNjcxMTA1NiAqIHggKyAwLjAwNTgzNzE1ICogeSkgJSAxKSkgJSAxXG4gICAgICAvLyBBZGQgZ29sZGVuIHJhdGlvIGJhc2VkIG9mZnNldCBmb3IgYmV0dGVyIGRpc3RyaWJ1dGlvblxuICAgICAgY29uc3Qgb2Zmc2V0ID0gKCh4ICogcGhpICsgeSAqIHBoaSAqIHBoaSkgJSAxKSArIHJuZygpICogMC4xXG4gICAgICAvLyBDb21iaW5lIGFuZCBub3JtYWxpemVcbiAgICAgIHRpbGVbeSAqIHNpemUgKyB4XSA9IChpZ24gKyBvZmZzZXQgKiAwLjUpICUgMVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aWxlXG59XG5cbi8qKiBTYW1wbGUgYmx1ZSBub2lzZSBhdCBwb3NpdGlvbiAqL1xuZnVuY3Rpb24gc2FtcGxlQmx1ZU5vaXNlKFxuICB4OiBudW1iZXIsXG4gIHk6IG51bWJlcixcbiAgdGlsZTogbnVtYmVyW10sXG4gIHRpbGVTaXplOiBudW1iZXJcbik6IG51bWJlciB7XG4gIGNvbnN0IHR4ID0gKCh4ICUgdGlsZVNpemUpICsgdGlsZVNpemUpICUgdGlsZVNpemVcbiAgY29uc3QgdHkgPSAoKHkgJSB0aWxlU2l6ZSkgKyB0aWxlU2l6ZSkgJSB0aWxlU2l6ZVxuICByZXR1cm4gdGlsZVt0eSAqIHRpbGVTaXplICsgdHhdXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBPUkRFUkVEIERJVEhFUklOR1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqIEFwcGx5IG9yZGVyZWQgKHRocmVzaG9sZCkgZGl0aGVyaW5nICovXG5leHBvcnQgZnVuY3Rpb24gb3JkZXJlZERpdGhlcihcbiAgaW1hZ2VEYXRhOiBGbG9hdDMyQXJyYXlbXSwgLy8gQXJyYXkgb2Ygcm93cywgZWFjaCBjb250YWluaW5nIFJHQiB2YWx1ZXMgMC0xXG4gIHdpZHRoOiBudW1iZXIsXG4gIGhlaWdodDogbnVtYmVyLFxuICBtYXRyaXg6IG51bWJlcltdW10sXG4gIGxldmVsczogbnVtYmVyID0gMixcbiAgc3RyZW5ndGg6IG51bWJlciA9IDEwMFxuKTogRGl0aGVyUmVzdWx0IHtcbiAgY29uc3QgbWF0cml4U2l6ZSA9IG1hdHJpeC5sZW5ndGhcbiAgY29uc3QgbWF4VmFsID0gbWF0cml4U2l6ZSAqIG1hdHJpeFNpemVcbiAgY29uc3Qgc3RyZW5ndGhGYWN0b3IgPSBzdHJlbmd0aCAvIDEwMFxuXG4gIGNvbnN0IHJlc3VsdE1hdHJpeDogYm9vbGVhbltdW10gPSBbXVxuICBjb25zdCByZXN1bHRDb2xvcnM6IFJHQltdW10gPSBbXVxuXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICBjb25zdCBtYXRyaXhSb3c6IGJvb2xlYW5bXSA9IFtdXG4gICAgY29uc3QgY29sb3JSb3c6IFJHQltdID0gW11cblxuICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgY29uc3QgbXggPSB4ICUgbWF0cml4U2l6ZVxuICAgICAgY29uc3QgbXkgPSB5ICUgbWF0cml4U2l6ZVxuICAgICAgY29uc3QgdGhyZXNob2xkID0gKG1hdHJpeFtteV1bbXhdICsgMC41KSAvIG1heFZhbFxuXG4gICAgICBjb25zdCBpZHggPSB4ICogM1xuICAgICAgY29uc3QgciA9IGltYWdlRGF0YVt5XVtpZHhdXG4gICAgICBjb25zdCBnID0gaW1hZ2VEYXRhW3ldW2lkeCArIDFdXG4gICAgICBjb25zdCBiID0gaW1hZ2VEYXRhW3ldW2lkeCArIDJdXG4gICAgICBjb25zdCBncmF5ID0gcmdiVG9HcmF5KHIsIGcsIGIpXG5cbiAgICAgIC8vIEFwcGx5IHRocmVzaG9sZCB3aXRoIHN0cmVuZ3RoIGJsZW5kaW5nXG4gICAgICBjb25zdCBhZGp1c3RlZFRocmVzaG9sZCA9IDAuNSArICh0aHJlc2hvbGQgLSAwLjUpICogc3RyZW5ndGhGYWN0b3JcbiAgICAgIGNvbnN0IGlzRGFyayA9IGdyYXkgPCBhZGp1c3RlZFRocmVzaG9sZFxuXG4gICAgICBtYXRyaXhSb3cucHVzaChpc0RhcmspXG5cbiAgICAgIC8vIFF1YW50aXplIGNvbG9yXG4gICAgICBjb25zdCBzdGVwID0gMSAvIChsZXZlbHMgLSAxKVxuICAgICAgY29uc3QgbmV3UiA9IE1hdGgucm91bmQociAvIHN0ZXApICogc3RlcFxuICAgICAgY29uc3QgbmV3RyA9IE1hdGgucm91bmQoZyAvIHN0ZXApICogc3RlcFxuICAgICAgY29uc3QgbmV3QiA9IE1hdGgucm91bmQoYiAvIHN0ZXApICogc3RlcFxuXG4gICAgICBjb2xvclJvdy5wdXNoKHtcbiAgICAgICAgcjogTWF0aC5yb3VuZChjbGFtcDAxKG5ld1IpICogMjU1KSxcbiAgICAgICAgZzogTWF0aC5yb3VuZChjbGFtcDAxKG5ld0cpICogMjU1KSxcbiAgICAgICAgYjogTWF0aC5yb3VuZChjbGFtcDAxKG5ld0IpICogMjU1KSxcbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmVzdWx0TWF0cml4LnB1c2gobWF0cml4Um93KVxuICAgIHJlc3VsdENvbG9ycy5wdXNoKGNvbG9yUm93KVxuICB9XG5cbiAgcmV0dXJuIHsgbWF0cml4OiByZXN1bHRNYXRyaXgsIGNvbG9yczogcmVzdWx0Q29sb3JzIH1cbn1cblxuLyoqIEFwcGx5IEJheWVyIG9yZGVyZWQgZGl0aGVyaW5nICovXG5leHBvcnQgZnVuY3Rpb24gYmF5ZXJEaXRoZXIoXG4gIGltYWdlRGF0YTogRmxvYXQzMkFycmF5W10sXG4gIHdpZHRoOiBudW1iZXIsXG4gIGhlaWdodDogbnVtYmVyLFxuICBzaXplOiAyIHwgNCB8IDggPSA0LFxuICBsZXZlbHM6IG51bWJlciA9IDIsXG4gIHN0cmVuZ3RoOiBudW1iZXIgPSAxMDBcbik6IERpdGhlclJlc3VsdCB7XG4gIGNvbnN0IG1hdHJpeCA9XG4gICAgc2l6ZSA9PT0gMiA/IEJBWUVSXzIgOiBzaXplID09PSA0ID8gQkFZRVJfNCA6IEJBWUVSXzhcbiAgcmV0dXJuIG9yZGVyZWREaXRoZXIoaW1hZ2VEYXRhLCB3aWR0aCwgaGVpZ2h0LCBtYXRyaXgsIGxldmVscywgc3RyZW5ndGgpXG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBFUlJPUiBESUZGVVNJT04gRElUSEVSSU5HXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKiogQXBwbHkgZXJyb3IgZGlmZnVzaW9uIGRpdGhlcmluZyAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVycm9yRGlmZnVzaW9uKFxuICBpbWFnZURhdGE6IEZsb2F0MzJBcnJheVtdLCAvLyBBcnJheSBvZiByb3dzLCBlYWNoIGNvbnRhaW5pbmcgUkdCIHZhbHVlcyAwLTFcbiAgd2lkdGg6IG51bWJlcixcbiAgaGVpZ2h0OiBudW1iZXIsXG4gIGtlcm5lbE5hbWU6IERpZmZ1c2lvbktlcm5lbCA9ICdmbG95ZF9zdGVpbmJlcmcnLFxuICBzZXJwZW50aW5lOiBib29sZWFuID0gdHJ1ZSxcbiAgbGV2ZWxzOiBudW1iZXIgPSAyLFxuICBzdHJlbmd0aDogbnVtYmVyID0gMTAwLFxuICBjb2xvck1vZGU6IENvbG9yTW9kZSA9ICdidydcbik6IERpdGhlclJlc3VsdCB7XG4gIGNvbnN0IGtlcm5lbCA9IERJRkZVU0lPTl9LRVJORUxTW2tlcm5lbE5hbWVdXG4gIGNvbnN0IHN0cmVuZ3RoRmFjdG9yID0gc3RyZW5ndGggLyAxMDBcbiAgY29uc3Qgc3RlcCA9IDEgLyAobGV2ZWxzIC0gMSlcblxuICAvLyBNYWtlIGEgY29weSBvZiBpbWFnZSBkYXRhIGFzIGZsb2F0aW5nIHBvaW50IGZvciBlcnJvciBhY2N1bXVsYXRpb25cbiAgY29uc3QgcGl4ZWxzOiB7IHI6IG51bWJlcjsgZzogbnVtYmVyOyBiOiBudW1iZXIgfVtdW10gPSBbXVxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgY29uc3Qgcm93OiB7IHI6IG51bWJlcjsgZzogbnVtYmVyOyBiOiBudW1iZXIgfVtdID0gW11cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgIGNvbnN0IGlkeCA9IHggKiAzXG4gICAgICByb3cucHVzaCh7XG4gICAgICAgIHI6IGltYWdlRGF0YVt5XVtpZHhdLFxuICAgICAgICBnOiBpbWFnZURhdGFbeV1baWR4ICsgMV0sXG4gICAgICAgIGI6IGltYWdlRGF0YVt5XVtpZHggKyAyXSxcbiAgICAgIH0pXG4gICAgfVxuICAgIHBpeGVscy5wdXNoKHJvdylcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdE1hdHJpeDogYm9vbGVhbltdW10gPSBbXVxuICBjb25zdCByZXN1bHRDb2xvcnM6IFJHQltdW10gPSBbXVxuXG4gIC8vIEluaXRpYWxpemUgcmVzdWx0IGFycmF5c1xuICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgcmVzdWx0TWF0cml4LnB1c2gobmV3IEFycmF5KHdpZHRoKS5maWxsKGZhbHNlKSlcbiAgICByZXN1bHRDb2xvcnMucHVzaChuZXcgQXJyYXkod2lkdGgpLmZpbGwoeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0pKVxuICB9XG5cbiAgLy8gUHJvY2VzcyBlYWNoIHBpeGVsXG4gIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICBjb25zdCBsZWZ0VG9SaWdodCA9IHNlcnBlbnRpbmUgPyB5ICUgMiA9PT0gMCA6IHRydWVcbiAgICBjb25zdCBzdGFydFggPSBsZWZ0VG9SaWdodCA/IDAgOiB3aWR0aCAtIDFcbiAgICBjb25zdCBlbmRYID0gbGVmdFRvUmlnaHQgPyB3aWR0aCA6IC0xXG4gICAgY29uc3QgZGVsdGFYID0gbGVmdFRvUmlnaHQgPyAxIDogLTFcblxuICAgIGZvciAobGV0IHggPSBzdGFydFg7IHggIT09IGVuZFg7IHggKz0gZGVsdGFYKSB7XG4gICAgICBjb25zdCBwaXhlbCA9IHBpeGVsc1t5XVt4XVxuXG4gICAgICBpZiAoY29sb3JNb2RlID09PSAnYncnKSB7XG4gICAgICAgIC8vIEJsYWNrICYgd2hpdGVcbiAgICAgICAgY29uc3QgZ3JheSA9IHJnYlRvR3JheShwaXhlbC5yLCBwaXhlbC5nLCBwaXhlbC5iKVxuICAgICAgICBjb25zdCBuZXdWYWwgPSBncmF5ID4gMC41ID8gMSA6IDBcbiAgICAgICAgY29uc3QgZXJyb3IgPSAoZ3JheSAtIG5ld1ZhbCkgKiBzdHJlbmd0aEZhY3RvclxuXG4gICAgICAgIHJlc3VsdE1hdHJpeFt5XVt4XSA9IG5ld1ZhbCA9PT0gMFxuICAgICAgICByZXN1bHRDb2xvcnNbeV1beF0gPSB7XG4gICAgICAgICAgcjogbmV3VmFsICogMjU1LFxuICAgICAgICAgIGc6IG5ld1ZhbCAqIDI1NSxcbiAgICAgICAgICBiOiBuZXdWYWwgKiAyNTUsXG4gICAgICAgIH1cblxuICAgICAgICAvLyBEaXN0cmlidXRlIGVycm9yXG4gICAgICAgIGRpc3RyaWJ1dGVFcnJvcihwaXhlbHMsIHgsIHksIHdpZHRoLCBoZWlnaHQsIGVycm9yLCBlcnJvciwgZXJyb3IsIGtlcm5lbCwgbGVmdFRvUmlnaHQpXG4gICAgICB9IGVsc2UgaWYgKGNvbG9yTW9kZSA9PT0gJ2dyYXlzY2FsZScpIHtcbiAgICAgICAgLy8gR3JheXNjYWxlIHdpdGggbXVsdGlwbGUgbGV2ZWxzXG4gICAgICAgIGNvbnN0IGdyYXkgPSByZ2JUb0dyYXkocGl4ZWwuciwgcGl4ZWwuZywgcGl4ZWwuYilcbiAgICAgICAgY29uc3QgbmV3VmFsID0gTWF0aC5yb3VuZChncmF5IC8gc3RlcCkgKiBzdGVwXG4gICAgICAgIGNvbnN0IGVycm9yID0gKGdyYXkgLSBuZXdWYWwpICogc3RyZW5ndGhGYWN0b3JcblxuICAgICAgICByZXN1bHRNYXRyaXhbeV1beF0gPSBuZXdWYWwgPCAwLjVcbiAgICAgICAgY29uc3QgZ3JheUJ5dGUgPSBNYXRoLnJvdW5kKGNsYW1wMDEobmV3VmFsKSAqIDI1NSlcbiAgICAgICAgcmVzdWx0Q29sb3JzW3ldW3hdID0geyByOiBncmF5Qnl0ZSwgZzogZ3JheUJ5dGUsIGI6IGdyYXlCeXRlIH1cblxuICAgICAgICBkaXN0cmlidXRlRXJyb3IocGl4ZWxzLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBlcnJvciwgZXJyb3IsIGVycm9yLCBrZXJuZWwsIGxlZnRUb1JpZ2h0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ29sb3IgbW9kZSAtIHByb2Nlc3MgZWFjaCBjaGFubmVsXG4gICAgICAgIGNvbnN0IG5ld1IgPSBNYXRoLnJvdW5kKHBpeGVsLnIgLyBzdGVwKSAqIHN0ZXBcbiAgICAgICAgY29uc3QgbmV3RyA9IE1hdGgucm91bmQocGl4ZWwuZyAvIHN0ZXApICogc3RlcFxuICAgICAgICBjb25zdCBuZXdCID0gTWF0aC5yb3VuZChwaXhlbC5iIC8gc3RlcCkgKiBzdGVwXG5cbiAgICAgICAgY29uc3QgZXJyb3JSID0gKHBpeGVsLnIgLSBuZXdSKSAqIHN0cmVuZ3RoRmFjdG9yXG4gICAgICAgIGNvbnN0IGVycm9yRyA9IChwaXhlbC5nIC0gbmV3RykgKiBzdHJlbmd0aEZhY3RvclxuICAgICAgICBjb25zdCBlcnJvckIgPSAocGl4ZWwuYiAtIG5ld0IpICogc3RyZW5ndGhGYWN0b3JcblxuICAgICAgICBjb25zdCBicmlnaHRuZXNzID0gcmdiVG9HcmF5KG5ld1IsIG5ld0csIG5ld0IpXG4gICAgICAgIHJlc3VsdE1hdHJpeFt5XVt4XSA9IGJyaWdodG5lc3MgPCAwLjVcblxuICAgICAgICByZXN1bHRDb2xvcnNbeV1beF0gPSB7XG4gICAgICAgICAgcjogTWF0aC5yb3VuZChjbGFtcDAxKG5ld1IpICogMjU1KSxcbiAgICAgICAgICBnOiBNYXRoLnJvdW5kKGNsYW1wMDEobmV3RykgKiAyNTUpLFxuICAgICAgICAgIGI6IE1hdGgucm91bmQoY2xhbXAwMShuZXdCKSAqIDI1NSksXG4gICAgICAgIH1cblxuICAgICAgICBkaXN0cmlidXRlRXJyb3IocGl4ZWxzLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBlcnJvclIsIGVycm9yRywgZXJyb3JCLCBrZXJuZWwsIGxlZnRUb1JpZ2h0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IG1hdHJpeDogcmVzdWx0TWF0cml4LCBjb2xvcnM6IHJlc3VsdENvbG9ycyB9XG59XG5cbi8qKiBEaXN0cmlidXRlIGVycm9yIHRvIG5laWdoYm9yaW5nIHBpeGVscyAqL1xuZnVuY3Rpb24gZGlzdHJpYnV0ZUVycm9yKFxuICBwaXhlbHM6IHsgcjogbnVtYmVyOyBnOiBudW1iZXI7IGI6IG51bWJlciB9W11bXSxcbiAgeDogbnVtYmVyLFxuICB5OiBudW1iZXIsXG4gIHdpZHRoOiBudW1iZXIsXG4gIGhlaWdodDogbnVtYmVyLFxuICBlcnJvclI6IG51bWJlcixcbiAgZXJyb3JHOiBudW1iZXIsXG4gIGVycm9yQjogbnVtYmVyLFxuICBrZXJuZWw6IERpZmZ1c2lvbktlcm5lbERlZixcbiAgbGVmdFRvUmlnaHQ6IGJvb2xlYW5cbik6IHZvaWQge1xuICBmb3IgKGxldCBreSA9IDA7IGt5IDwga2VybmVsLm1hdHJpeC5sZW5ndGg7IGt5KyspIHtcbiAgICBmb3IgKGxldCBreCA9IDA7IGt4IDwga2VybmVsLm1hdHJpeFtreV0ubGVuZ3RoOyBreCsrKSB7XG4gICAgICBjb25zdCB3ZWlnaHQgPSBrZXJuZWwubWF0cml4W2t5XVtreF1cbiAgICAgIGlmICh3ZWlnaHQgPT09IDApIGNvbnRpbnVlXG5cbiAgICAgIGxldCBvZmZzZXRYID0ga3ggLSBrZXJuZWwub2Zmc2V0XG4gICAgICBpZiAoIWxlZnRUb1JpZ2h0KSBvZmZzZXRYID0gLW9mZnNldFhcblxuICAgICAgY29uc3QgbnggPSB4ICsgb2Zmc2V0WFxuICAgICAgY29uc3QgbnkgPSB5ICsga3lcblxuICAgICAgaWYgKG54ID49IDAgJiYgbnggPCB3aWR0aCAmJiBueSA8IGhlaWdodCkge1xuICAgICAgICBjb25zdCBmYWN0b3IgPSB3ZWlnaHQgLyBrZXJuZWwuZGl2aXNvclxuICAgICAgICBwaXhlbHNbbnldW254XS5yICs9IGVycm9yUiAqIGZhY3RvclxuICAgICAgICBwaXhlbHNbbnldW254XS5nICs9IGVycm9yRyAqIGZhY3RvclxuICAgICAgICBwaXhlbHNbbnldW254XS5iICs9IGVycm9yQiAqIGZhY3RvclxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gQkxVRSBOT0lTRSBESVRIRVJJTkdcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBBcHBseSBibHVlIG5vaXNlIHRocmVzaG9sZCBkaXRoZXJpbmcgKi9cbmV4cG9ydCBmdW5jdGlvbiBibHVlTm9pc2VEaXRoZXIoXG4gIGltYWdlRGF0YTogRmxvYXQzMkFycmF5W10sXG4gIHdpZHRoOiBudW1iZXIsXG4gIGhlaWdodDogbnVtYmVyLFxuICB0aWxlU2l6ZTogbnVtYmVyID0gNjQsXG4gIHNlZWQ6IG51bWJlciA9IDAsXG4gIGxldmVsczogbnVtYmVyID0gMixcbiAgc3RyZW5ndGg6IG51bWJlciA9IDEwMCxcbiAgY29sb3JNb2RlOiBDb2xvck1vZGUgPSAnYncnXG4pOiBEaXRoZXJSZXN1bHQge1xuICBjb25zdCB0aWxlID0gZ2VuZXJhdGVCbHVlTm9pc2VUaWxlKHRpbGVTaXplLCBzZWVkKVxuICBjb25zdCBzdHJlbmd0aEZhY3RvciA9IHN0cmVuZ3RoIC8gMTAwXG4gIGNvbnN0IHN0ZXAgPSAxIC8gKGxldmVscyAtIDEpXG5cbiAgY29uc3QgcmVzdWx0TWF0cml4OiBib29sZWFuW11bXSA9IFtdXG4gIGNvbnN0IHJlc3VsdENvbG9yczogUkdCW11bXSA9IFtdXG5cbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgIGNvbnN0IG1hdHJpeFJvdzogYm9vbGVhbltdID0gW11cbiAgICBjb25zdCBjb2xvclJvdzogUkdCW10gPSBbXVxuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICBjb25zdCB0aHJlc2hvbGQgPSBzYW1wbGVCbHVlTm9pc2UoeCwgeSwgdGlsZSwgdGlsZVNpemUpXG4gICAgICBjb25zdCBpZHggPSB4ICogM1xuICAgICAgY29uc3QgciA9IGltYWdlRGF0YVt5XVtpZHhdXG4gICAgICBjb25zdCBnID0gaW1hZ2VEYXRhW3ldW2lkeCArIDFdXG4gICAgICBjb25zdCBiID0gaW1hZ2VEYXRhW3ldW2lkeCArIDJdXG5cbiAgICAgIGlmIChjb2xvck1vZGUgPT09ICdidycpIHtcbiAgICAgICAgY29uc3QgZ3JheSA9IHJnYlRvR3JheShyLCBnLCBiKVxuICAgICAgICBjb25zdCBhZGp1c3RlZFRocmVzaG9sZCA9IDAuNSArICh0aHJlc2hvbGQgLSAwLjUpICogc3RyZW5ndGhGYWN0b3JcbiAgICAgICAgY29uc3QgaXNEYXJrID0gZ3JheSA8IGFkanVzdGVkVGhyZXNob2xkXG5cbiAgICAgICAgbWF0cml4Um93LnB1c2goaXNEYXJrKVxuICAgICAgICBjb2xvclJvdy5wdXNoKGlzRGFyayA/IHsgcjogMCwgZzogMCwgYjogMCB9IDogeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH0pXG4gICAgICB9IGVsc2UgaWYgKGNvbG9yTW9kZSA9PT0gJ2dyYXlzY2FsZScpIHtcbiAgICAgICAgY29uc3QgZ3JheSA9IHJnYlRvR3JheShyLCBnLCBiKVxuICAgICAgICBjb25zdCBzY2FsZWQgPSBncmF5ICogKGxldmVscyAtIDEpXG4gICAgICAgIGNvbnN0IGxvdyA9IE1hdGguZmxvb3Ioc2NhbGVkKVxuICAgICAgICBjb25zdCBoaWdoID0gTWF0aC5taW4obG93ICsgMSwgbGV2ZWxzIC0gMSlcbiAgICAgICAgY29uc3QgZnJhYyA9IHNjYWxlZCAtIGxvd1xuICAgICAgICBjb25zdCB0ID0gMC41ICsgKHRocmVzaG9sZCAtIDAuNSkgKiBzdHJlbmd0aEZhY3RvclxuICAgICAgICBjb25zdCBuZXdWYWwgPSAoZnJhYyA+IHQgPyBoaWdoIDogbG93KSAvIChsZXZlbHMgLSAxKVxuXG4gICAgICAgIG1hdHJpeFJvdy5wdXNoKG5ld1ZhbCA8IDAuNSlcbiAgICAgICAgY29uc3QgZ3JheUJ5dGUgPSBNYXRoLnJvdW5kKG5ld1ZhbCAqIDI1NSlcbiAgICAgICAgY29sb3JSb3cucHVzaCh7IHI6IGdyYXlCeXRlLCBnOiBncmF5Qnl0ZSwgYjogZ3JheUJ5dGUgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENvbG9yIG1vZGVcbiAgICAgICAgY29uc3QgcXVhbnRpemUgPSAodmFsOiBudW1iZXIsIG5vaXNlT2Zmc2V0OiBudW1iZXIpOiBudW1iZXIgPT4ge1xuICAgICAgICAgIGNvbnN0IHQgPSAoKHRocmVzaG9sZCArIG5vaXNlT2Zmc2V0KSAlIDEpXG4gICAgICAgICAgY29uc3QgYWRqdXN0ZWRUID0gMC41ICsgKHQgLSAwLjUpICogc3RyZW5ndGhGYWN0b3JcbiAgICAgICAgICBjb25zdCBzY2FsZWQgPSB2YWwgKiAobGV2ZWxzIC0gMSlcbiAgICAgICAgICBjb25zdCBsb3cgPSBNYXRoLmZsb29yKHNjYWxlZClcbiAgICAgICAgICBjb25zdCBoaWdoID0gTWF0aC5taW4obG93ICsgMSwgbGV2ZWxzIC0gMSlcbiAgICAgICAgICBjb25zdCBmcmFjID0gc2NhbGVkIC0gbG93XG4gICAgICAgICAgcmV0dXJuIChmcmFjID4gYWRqdXN0ZWRUID8gaGlnaCA6IGxvdykgLyAobGV2ZWxzIC0gMSlcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5ld1IgPSBxdWFudGl6ZShyLCAwKVxuICAgICAgICBjb25zdCBuZXdHID0gcXVhbnRpemUoZywgMC4zMylcbiAgICAgICAgY29uc3QgbmV3QiA9IHF1YW50aXplKGIsIDAuNjcpXG4gICAgICAgIGNvbnN0IGJyaWdodG5lc3MgPSByZ2JUb0dyYXkobmV3UiwgbmV3RywgbmV3QilcblxuICAgICAgICBtYXRyaXhSb3cucHVzaChicmlnaHRuZXNzIDwgMC41KVxuICAgICAgICBjb2xvclJvdy5wdXNoKHtcbiAgICAgICAgICByOiBNYXRoLnJvdW5kKG5ld1IgKiAyNTUpLFxuICAgICAgICAgIGc6IE1hdGgucm91bmQobmV3RyAqIDI1NSksXG4gICAgICAgICAgYjogTWF0aC5yb3VuZChuZXdCICogMjU1KSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXN1bHRNYXRyaXgucHVzaChtYXRyaXhSb3cpXG4gICAgcmVzdWx0Q29sb3JzLnB1c2goY29sb3JSb3cpXG4gIH1cblxuICByZXR1cm4geyBtYXRyaXg6IHJlc3VsdE1hdHJpeCwgY29sb3JzOiByZXN1bHRDb2xvcnMgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTk9JU0UtQkFTRUQgRElUSEVSSU5HXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKiogQXBwbHkgd2hpdGUgbm9pc2UgZGl0aGVyaW5nICovXG5leHBvcnQgZnVuY3Rpb24gd2hpdGVOb2lzZURpdGhlcihcbiAgaW1hZ2VEYXRhOiBGbG9hdDMyQXJyYXlbXSxcbiAgd2lkdGg6IG51bWJlcixcbiAgaGVpZ2h0OiBudW1iZXIsXG4gIHNlZWQ6IG51bWJlciA9IDAsXG4gIHN0cmVuZ3RoOiBudW1iZXIgPSAxMDAsXG4gIGNvbG9yTW9kZTogQ29sb3JNb2RlID0gJ2J3J1xuKTogRGl0aGVyUmVzdWx0IHtcbiAgY29uc3Qgcm5nID0gY3JlYXRlUk5HKHNlZWQpXG4gIGNvbnN0IHN0cmVuZ3RoRmFjdG9yID0gc3RyZW5ndGggLyAxMDBcblxuICBjb25zdCByZXN1bHRNYXRyaXg6IGJvb2xlYW5bXVtdID0gW11cbiAgY29uc3QgcmVzdWx0Q29sb3JzOiBSR0JbXVtdID0gW11cblxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgY29uc3QgbWF0cml4Um93OiBib29sZWFuW10gPSBbXVxuICAgIGNvbnN0IGNvbG9yUm93OiBSR0JbXSA9IFtdXG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgIGNvbnN0IHRocmVzaG9sZCA9IHJuZygpXG4gICAgICBjb25zdCBpZHggPSB4ICogM1xuICAgICAgY29uc3QgciA9IGltYWdlRGF0YVt5XVtpZHhdXG4gICAgICBjb25zdCBnID0gaW1hZ2VEYXRhW3ldW2lkeCArIDFdXG4gICAgICBjb25zdCBiID0gaW1hZ2VEYXRhW3ldW2lkeCArIDJdXG4gICAgICBjb25zdCBncmF5ID0gcmdiVG9HcmF5KHIsIGcsIGIpXG5cbiAgICAgIGNvbnN0IGFkanVzdGVkVGhyZXNob2xkID0gMC41ICsgKHRocmVzaG9sZCAtIDAuNSkgKiBzdHJlbmd0aEZhY3RvclxuICAgICAgY29uc3QgaXNEYXJrID0gZ3JheSA8IGFkanVzdGVkVGhyZXNob2xkXG5cbiAgICAgIG1hdHJpeFJvdy5wdXNoKGlzRGFyaylcbiAgICAgIGNvbG9yUm93LnB1c2goaXNEYXJrID8geyByOiAwLCBnOiAwLCBiOiAwIH0gOiB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUgfSlcbiAgICB9XG5cbiAgICByZXN1bHRNYXRyaXgucHVzaChtYXRyaXhSb3cpXG4gICAgcmVzdWx0Q29sb3JzLnB1c2goY29sb3JSb3cpXG4gIH1cblxuICByZXR1cm4geyBtYXRyaXg6IHJlc3VsdE1hdHJpeCwgY29sb3JzOiByZXN1bHRDb2xvcnMgfVxufVxuXG4vKiogQXBwbHkgR2F1c3NpYW4gbm9pc2UgZGl0aGVyaW5nICovXG5leHBvcnQgZnVuY3Rpb24gZ2F1c3NpYW5Ob2lzZURpdGhlcihcbiAgaW1hZ2VEYXRhOiBGbG9hdDMyQXJyYXlbXSxcbiAgd2lkdGg6IG51bWJlcixcbiAgaGVpZ2h0OiBudW1iZXIsXG4gIHNlZWQ6IG51bWJlciA9IDAsXG4gIHN0cmVuZ3RoOiBudW1iZXIgPSAxMDAsXG4gIGNvbG9yTW9kZTogQ29sb3JNb2RlID0gJ2J3J1xuKTogRGl0aGVyUmVzdWx0IHtcbiAgY29uc3Qgcm5nID0gY3JlYXRlUk5HKHNlZWQpXG4gIGNvbnN0IHN0cmVuZ3RoRmFjdG9yID0gc3RyZW5ndGggLyAxMDBcblxuICAvLyBCb3gtTXVsbGVyIHRyYW5zZm9ybSBmb3IgR2F1c3NpYW4gZGlzdHJpYnV0aW9uXG4gIGNvbnN0IGdhdXNzaWFuUmFuZG9tID0gKCk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgdTEgPSBybmcoKSB8fCAwLjAwMDFcbiAgICBjb25zdCB1MiA9IHJuZygpXG4gICAgcmV0dXJuIE1hdGguc3FydCgtMiAqIE1hdGgubG9nKHUxKSkgKiBNYXRoLmNvcygyICogTWF0aC5QSSAqIHUyKSAqIDAuMiArIDAuNVxuICB9XG5cbiAgY29uc3QgcmVzdWx0TWF0cml4OiBib29sZWFuW11bXSA9IFtdXG4gIGNvbnN0IHJlc3VsdENvbG9yczogUkdCW11bXSA9IFtdXG5cbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgIGNvbnN0IG1hdHJpeFJvdzogYm9vbGVhbltdID0gW11cbiAgICBjb25zdCBjb2xvclJvdzogUkdCW10gPSBbXVxuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICBjb25zdCB0aHJlc2hvbGQgPSBjbGFtcDAxKGdhdXNzaWFuUmFuZG9tKCkpXG4gICAgICBjb25zdCBpZHggPSB4ICogM1xuICAgICAgY29uc3QgciA9IGltYWdlRGF0YVt5XVtpZHhdXG4gICAgICBjb25zdCBnID0gaW1hZ2VEYXRhW3ldW2lkeCArIDFdXG4gICAgICBjb25zdCBiID0gaW1hZ2VEYXRhW3ldW2lkeCArIDJdXG4gICAgICBjb25zdCBncmF5ID0gcmdiVG9HcmF5KHIsIGcsIGIpXG5cbiAgICAgIGNvbnN0IGFkanVzdGVkVGhyZXNob2xkID0gMC41ICsgKHRocmVzaG9sZCAtIDAuNSkgKiBzdHJlbmd0aEZhY3RvclxuICAgICAgY29uc3QgaXNEYXJrID0gZ3JheSA8IGFkanVzdGVkVGhyZXNob2xkXG5cbiAgICAgIG1hdHJpeFJvdy5wdXNoKGlzRGFyaylcbiAgICAgIGNvbG9yUm93LnB1c2goaXNEYXJrID8geyByOiAwLCBnOiAwLCBiOiAwIH0gOiB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUgfSlcbiAgICB9XG5cbiAgICByZXN1bHRNYXRyaXgucHVzaChtYXRyaXhSb3cpXG4gICAgcmVzdWx0Q29sb3JzLnB1c2goY29sb3JSb3cpXG4gIH1cblxuICByZXR1cm4geyBtYXRyaXg6IHJlc3VsdE1hdHJpeCwgY29sb3JzOiByZXN1bHRDb2xvcnMgfVxufVxuXG4vKiogQXBwbHkgdHJpYW5ndWxhciBub2lzZSBkaXRoZXJpbmcgKFRQREYpICovXG5leHBvcnQgZnVuY3Rpb24gdHJpYW5ndWxhck5vaXNlRGl0aGVyKFxuICBpbWFnZURhdGE6IEZsb2F0MzJBcnJheVtdLFxuICB3aWR0aDogbnVtYmVyLFxuICBoZWlnaHQ6IG51bWJlcixcbiAgc2VlZDogbnVtYmVyID0gMCxcbiAgc3RyZW5ndGg6IG51bWJlciA9IDEwMCxcbiAgY29sb3JNb2RlOiBDb2xvck1vZGUgPSAnYncnXG4pOiBEaXRoZXJSZXN1bHQge1xuICBjb25zdCBybmcgPSBjcmVhdGVSTkcoc2VlZClcbiAgY29uc3Qgc3RyZW5ndGhGYWN0b3IgPSBzdHJlbmd0aCAvIDEwMFxuXG4gIC8vIFRyaWFuZ3VsYXIgZGlzdHJpYnV0aW9uIChzdW0gb2YgdHdvIHVuaWZvcm0pXG4gIGNvbnN0IHRyaWFuZ3VsYXJSYW5kb20gPSAoKTogbnVtYmVyID0+IHtcbiAgICByZXR1cm4gKHJuZygpICsgcm5nKCkpIC8gMlxuICB9XG5cbiAgY29uc3QgcmVzdWx0TWF0cml4OiBib29sZWFuW11bXSA9IFtdXG4gIGNvbnN0IHJlc3VsdENvbG9yczogUkdCW11bXSA9IFtdXG5cbiAgZm9yIChsZXQgeSA9IDA7IHkgPCBoZWlnaHQ7IHkrKykge1xuICAgIGNvbnN0IG1hdHJpeFJvdzogYm9vbGVhbltdID0gW11cbiAgICBjb25zdCBjb2xvclJvdzogUkdCW10gPSBbXVxuXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICBjb25zdCB0aHJlc2hvbGQgPSB0cmlhbmd1bGFyUmFuZG9tKClcbiAgICAgIGNvbnN0IGlkeCA9IHggKiAzXG4gICAgICBjb25zdCByID0gaW1hZ2VEYXRhW3ldW2lkeF1cbiAgICAgIGNvbnN0IGcgPSBpbWFnZURhdGFbeV1baWR4ICsgMV1cbiAgICAgIGNvbnN0IGIgPSBpbWFnZURhdGFbeV1baWR4ICsgMl1cbiAgICAgIGNvbnN0IGdyYXkgPSByZ2JUb0dyYXkociwgZywgYilcblxuICAgICAgY29uc3QgYWRqdXN0ZWRUaHJlc2hvbGQgPSAwLjUgKyAodGhyZXNob2xkIC0gMC41KSAqIHN0cmVuZ3RoRmFjdG9yXG4gICAgICBjb25zdCBpc0RhcmsgPSBncmF5IDwgYWRqdXN0ZWRUaHJlc2hvbGRcblxuICAgICAgbWF0cml4Um93LnB1c2goaXNEYXJrKVxuICAgICAgY29sb3JSb3cucHVzaChpc0RhcmsgPyB7IHI6IDAsIGc6IDAsIGI6IDAgfSA6IHsgcjogMjU1LCBnOiAyNTUsIGI6IDI1NSB9KVxuICAgIH1cblxuICAgIHJlc3VsdE1hdHJpeC5wdXNoKG1hdHJpeFJvdylcbiAgICByZXN1bHRDb2xvcnMucHVzaChjb2xvclJvdylcbiAgfVxuXG4gIHJldHVybiB7IG1hdHJpeDogcmVzdWx0TWF0cml4LCBjb2xvcnM6IHJlc3VsdENvbG9ycyB9XG59XG5cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4vLyBURU1QT1JBTCBESVRIRVJJTkcgKEZPUiBBTklNQVRJT04pXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKiogQXBwbHkgdGVtcG9yYWwgYmx1ZSBub2lzZSBkaXRoZXJpbmcgZm9yIGFuaW1hdGlvbiBmcmFtZXMgKi9cbmV4cG9ydCBmdW5jdGlvbiB0ZW1wb3JhbEJsdWVOb2lzZURpdGhlcihcbiAgaW1hZ2VEYXRhOiBGbG9hdDMyQXJyYXlbXSxcbiAgd2lkdGg6IG51bWJlcixcbiAgaGVpZ2h0OiBudW1iZXIsXG4gIGZyYW1lSW5kZXg6IG51bWJlcixcbiAgdGlsZVNpemU6IG51bWJlciA9IDY0LFxuICBzZWVkOiBudW1iZXIgPSAwLFxuICBjb2xvck1vZGU6IENvbG9yTW9kZSA9ICdidydcbik6IERpdGhlclJlc3VsdCB7XG4gIGNvbnN0IHRpbGUgPSBnZW5lcmF0ZUJsdWVOb2lzZVRpbGUodGlsZVNpemUsIHNlZWQpXG4gIC8vIFVzZSBmcmFtZSBpbmRleCB0byBvZmZzZXQgaW50byBub2lzZSB0ZXh0dXJlIGZvciB0ZW1wb3JhbCB2YXJpYXRpb25cbiAgY29uc3Qgb2Zmc2V0ID0gKGZyYW1lSW5kZXggKiAxNykgJSAodGlsZVNpemUgKiB0aWxlU2l6ZSlcblxuICBjb25zdCByZXN1bHRNYXRyaXg6IGJvb2xlYW5bXVtdID0gW11cbiAgY29uc3QgcmVzdWx0Q29sb3JzOiBSR0JbXVtdID0gW11cblxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgY29uc3QgbWF0cml4Um93OiBib29sZWFuW10gPSBbXVxuICAgIGNvbnN0IGNvbG9yUm93OiBSR0JbXSA9IFtdXG5cbiAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgIGNvbnN0IGlkeCA9IHggKiAzXG4gICAgICBjb25zdCByID0gaW1hZ2VEYXRhW3ldW2lkeF1cbiAgICAgIGNvbnN0IGcgPSBpbWFnZURhdGFbeV1baWR4ICsgMV1cbiAgICAgIGNvbnN0IGIgPSBpbWFnZURhdGFbeV1baWR4ICsgMl1cbiAgICAgIGNvbnN0IGdyYXkgPSByZ2JUb0dyYXkociwgZywgYilcblxuICAgICAgY29uc3QgbnggPSB4ICUgdGlsZVNpemVcbiAgICAgIGNvbnN0IG55ID0geSAlIHRpbGVTaXplXG4gICAgICBjb25zdCBub2lzZUlkeCA9IChueSAqIHRpbGVTaXplICsgbnggKyBvZmZzZXQpICUgKHRpbGVTaXplICogdGlsZVNpemUpXG4gICAgICBjb25zdCB0aHJlc2hvbGQgPSB0aWxlW25vaXNlSWR4XVxuXG4gICAgICBjb25zdCBpc0RhcmsgPSBncmF5IDwgdGhyZXNob2xkXG5cbiAgICAgIG1hdHJpeFJvdy5wdXNoKGlzRGFyaylcbiAgICAgIGNvbG9yUm93LnB1c2goaXNEYXJrID8geyByOiAwLCBnOiAwLCBiOiAwIH0gOiB7IHI6IDI1NSwgZzogMjU1LCBiOiAyNTUgfSlcbiAgICB9XG5cbiAgICByZXN1bHRNYXRyaXgucHVzaChtYXRyaXhSb3cpXG4gICAgcmVzdWx0Q29sb3JzLnB1c2goY29sb3JSb3cpXG4gIH1cblxuICByZXR1cm4geyBtYXRyaXg6IHJlc3VsdE1hdHJpeCwgY29sb3JzOiByZXN1bHRDb2xvcnMgfVxufVxuXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuLy8gTUFJTiBESVRIRVIgRlVOQ1RJT05cbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKiBDb252ZXJ0IEltYWdlRGF0YSB0byBmbG9hdCBhcnJheSBmb3JtYXQgKi9cbmV4cG9ydCBmdW5jdGlvbiBpbWFnZURhdGFUb0Zsb2F0KGltYWdlRGF0YTogSW1hZ2VEYXRhKTogRmxvYXQzMkFycmF5W10ge1xuICBjb25zdCB7IGRhdGEsIHdpZHRoLCBoZWlnaHQgfSA9IGltYWdlRGF0YVxuICBjb25zdCByZXN1bHQ6IEZsb2F0MzJBcnJheVtdID0gW11cblxuICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgY29uc3Qgcm93ID0gbmV3IEZsb2F0MzJBcnJheSh3aWR0aCAqIDMpXG4gICAgZm9yIChsZXQgeCA9IDA7IHggPCB3aWR0aDsgeCsrKSB7XG4gICAgICBjb25zdCBzcmNJZHggPSAoeSAqIHdpZHRoICsgeCkgKiA0XG4gICAgICBjb25zdCBkc3RJZHggPSB4ICogM1xuICAgICAgcm93W2RzdElkeF0gPSBkYXRhW3NyY0lkeF0gLyAyNTVcbiAgICAgIHJvd1tkc3RJZHggKyAxXSA9IGRhdGFbc3JjSWR4ICsgMV0gLyAyNTVcbiAgICAgIHJvd1tkc3RJZHggKyAyXSA9IGRhdGFbc3JjSWR4ICsgMl0gLyAyNTVcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gocm93KVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKiogQXBwbHkgZGl0aGVyaW5nIGJhc2VkIG9uIGtpbmQgKi9cbmV4cG9ydCBmdW5jdGlvbiBhcHBseURpdGhlcihcbiAgaW1hZ2VEYXRhOiBJbWFnZURhdGEsXG4gIG9wdGlvbnM6IERpdGhlck9wdGlvbnNcbik6IERpdGhlclJlc3VsdCB7XG4gIGNvbnN0IGZsb2F0RGF0YSA9IGltYWdlRGF0YVRvRmxvYXQoaW1hZ2VEYXRhKVxuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGltYWdlRGF0YVxuXG4gIHN3aXRjaCAob3B0aW9ucy5raW5kKSB7XG4gICAgY2FzZSAnb3JkZXJlZF9iYXllcic6XG4gICAgICByZXR1cm4gYmF5ZXJEaXRoZXIoXG4gICAgICAgIGZsb2F0RGF0YSxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgb3B0aW9ucy5vcmRlcmVkTWF0cml4ID09PSAnYmF5ZXIyJyA/IDIgOlxuICAgICAgICBvcHRpb25zLm9yZGVyZWRNYXRyaXggPT09ICdiYXllcjgnID8gOCA6IDQsXG4gICAgICAgIG9wdGlvbnMubGV2ZWxzLFxuICAgICAgICBvcHRpb25zLnN0cmVuZ3RoXG4gICAgICApXG5cbiAgICBjYXNlICdvcmRlcmVkX2NsdXN0ZXJlZCc6XG4gICAgICByZXR1cm4gb3JkZXJlZERpdGhlcihcbiAgICAgICAgZmxvYXREYXRhLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBDTFVTVEVSRURfRE9ULFxuICAgICAgICBvcHRpb25zLmxldmVscyxcbiAgICAgICAgb3B0aW9ucy5zdHJlbmd0aFxuICAgICAgKVxuXG4gICAgY2FzZSAnb3JkZXJlZF92b2lkX2NsdXN0ZXInOlxuICAgICAgcmV0dXJuIG9yZGVyZWREaXRoZXIoXG4gICAgICAgIGZsb2F0RGF0YSxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgVk9JRF9DTFVTVEVSLFxuICAgICAgICBvcHRpb25zLmxldmVscyxcbiAgICAgICAgb3B0aW9ucy5zdHJlbmd0aFxuICAgICAgKVxuXG4gICAgY2FzZSAnYmx1ZV9ub2lzZSc6XG4gICAgY2FzZSAnYmx1ZV9ub2lzZV90aHJlc2hvbGQnOlxuICAgICAgcmV0dXJuIGJsdWVOb2lzZURpdGhlcihcbiAgICAgICAgZmxvYXREYXRhLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBvcHRpb25zLmJsdWVOb2lzZVRpbGVTaXplLFxuICAgICAgICBvcHRpb25zLmJsdWVOb2lzZVNlZWQsXG4gICAgICAgIG9wdGlvbnMubGV2ZWxzLFxuICAgICAgICBvcHRpb25zLnN0cmVuZ3RoLFxuICAgICAgICBvcHRpb25zLmNvbG9yTW9kZVxuICAgICAgKVxuXG4gICAgY2FzZSAnd2hpdGVfbm9pc2UnOlxuICAgICAgcmV0dXJuIHdoaXRlTm9pc2VEaXRoZXIoXG4gICAgICAgIGZsb2F0RGF0YSxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgb3B0aW9ucy5ibHVlTm9pc2VTZWVkLFxuICAgICAgICBvcHRpb25zLnN0cmVuZ3RoLFxuICAgICAgICBvcHRpb25zLmNvbG9yTW9kZVxuICAgICAgKVxuXG4gICAgY2FzZSAnZ2F1c3NpYW5fbm9pc2UnOlxuICAgICAgcmV0dXJuIGdhdXNzaWFuTm9pc2VEaXRoZXIoXG4gICAgICAgIGZsb2F0RGF0YSxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgb3B0aW9ucy5ibHVlTm9pc2VTZWVkLFxuICAgICAgICBvcHRpb25zLnN0cmVuZ3RoLFxuICAgICAgICBvcHRpb25zLmNvbG9yTW9kZVxuICAgICAgKVxuXG4gICAgY2FzZSAndHJpYW5ndWxhcl9ub2lzZSc6XG4gICAgICByZXR1cm4gdHJpYW5ndWxhck5vaXNlRGl0aGVyKFxuICAgICAgICBmbG9hdERhdGEsXG4gICAgICAgIHdpZHRoLFxuICAgICAgICBoZWlnaHQsXG4gICAgICAgIG9wdGlvbnMuYmx1ZU5vaXNlU2VlZCxcbiAgICAgICAgb3B0aW9ucy5zdHJlbmd0aCxcbiAgICAgICAgb3B0aW9ucy5jb2xvck1vZGVcbiAgICAgIClcblxuICAgIGNhc2UgJ2Vycm9yX2RpZmZ1c2lvbic6XG4gICAgY2FzZSAndHJ1ZV9kaXRoZXInOlxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZXJyb3JEaWZmdXNpb24oXG4gICAgICAgIGZsb2F0RGF0YSxcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgb3B0aW9ucy5kaWZmdXNpb25LZXJuZWwsXG4gICAgICAgIG9wdGlvbnMuc2VycGVudGluZSxcbiAgICAgICAgb3B0aW9ucy5sZXZlbHMsXG4gICAgICAgIG9wdGlvbnMuc3RyZW5ndGgsXG4gICAgICAgIG9wdGlvbnMuY29sb3JNb2RlXG4gICAgICApXG4gIH1cbn1cblxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbi8vIEVYUE9SVFxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuZXhwb3J0IGNvbnN0IERpdGhlckFsZ29yaXRobXMgPSB7XG4gIC8vIE9yZGVyZWQgZGl0aGVyaW5nXG4gIG9yZGVyZWREaXRoZXIsXG4gIGJheWVyRGl0aGVyLFxuXG4gIC8vIEVycm9yIGRpZmZ1c2lvblxuICBlcnJvckRpZmZ1c2lvbixcblxuICAvLyBCbHVlIG5vaXNlXG4gIGJsdWVOb2lzZURpdGhlcixcbiAgdGVtcG9yYWxCbHVlTm9pc2VEaXRoZXIsXG5cbiAgLy8gUmFuZG9tIG5vaXNlXG4gIHdoaXRlTm9pc2VEaXRoZXIsXG4gIGdhdXNzaWFuTm9pc2VEaXRoZXIsXG4gIHRyaWFuZ3VsYXJOb2lzZURpdGhlcixcblxuICAvLyBNYWluIGZ1bmN0aW9uXG4gIGFwcGx5RGl0aGVyLFxuICBpbWFnZURhdGFUb0Zsb2F0LFxuXG4gIC8vIE1hdHJpY2VzXG4gIEJBWUVSXzIsXG4gIEJBWUVSXzQsXG4gIEJBWUVSXzgsXG4gIENMVVNURVJFRF9ET1QsXG4gIFZPSURfQ0xVU1RFUixcblxuICAvLyBLZXJuZWxzXG4gIERJRkZVU0lPTl9LRVJORUxTLFxufVxuXG5leHBvcnQgZGVmYXVsdCBEaXRoZXJBbGdvcml0aG1zXG4iLCAiaW1wb3J0IHFyY29kZSBmcm9tIFwiLi4vLi4vdmVuZG9yL2xpYi9xcmNvZGUtZ2VuZXJhdG9yL3FyY29kZS5tanNcIjtcblxuaW1wb3J0IHsgZ2VuZXJhdGVCbHVlTm9pc2VEaXRoZXJlZCB9IGZyb20gXCIuL2JsdWUtbm9pc2UtZGl0aGVyLnRzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZVFSLCBpc0xvY2tlZCwgaXNEYXRhLCBjYWxjdWxhdGVPcHRpbWFsVmVyc2lvbiB9IGZyb20gXCIuL3FyLWNvcmUudHNcIjtcbmltcG9ydCB7IGJsZW5kQ29sb3JzLCBwYXJzZUNvbG9yIH0gZnJvbSBcIi4vY29sb3ItdXRpbHMudHNcIjtcbmltcG9ydCB7IGFwcGx5RGl0aGVyIH0gZnJvbSBcIi4vZGl0aGVyLWFsZ29yaXRobXMudHNcIjtcblxuLyoqXG4gKiBDYWxjdWxhdGUgY29udHJhc3QgcmF0aW8gYmV0d2VlbiB0d28gY29sb3JzIChXQ0FHIGZvcm11bGEpXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sb3IxIC0gRmlyc3QgY29sb3IgKGhleCBvciByZ2IpXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sb3IyIC0gU2Vjb25kIGNvbG9yIChoZXggb3IgcmdiKVxuICogQHJldHVybnMge251bWJlcn0gQ29udHJhc3QgcmF0aW8gKDEgdG8gMjEpXG4gKi9cbmZ1bmN0aW9uIGdldENvbnRyYXN0UmF0aW8oY29sb3IxLCBjb2xvcjIpIHtcbiAgY29uc3QgZ2V0THVtaW5hbmNlID0gKGNvbG9yKSA9PiB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VDb2xvcihjb2xvcik7XG4gICAgY29uc3QgW3IsIGcsIGJdID0gW3BhcnNlZC5yLCBwYXJzZWQuZywgcGFyc2VkLmJdLm1hcChjID0+IHtcbiAgICAgIGMgPSBjIC8gMjU1O1xuICAgICAgcmV0dXJuIGMgPD0gMC4wMzkyOCA/IGMgLyAxMi45MiA6IE1hdGgucG93KChjICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIDAuMjEyNiAqIHIgKyAwLjcxNTIgKiBnICsgMC4wNzIyICogYjtcbiAgfTtcbiAgY29uc3QgbDEgPSBnZXRMdW1pbmFuY2UoY29sb3IxKTtcbiAgY29uc3QgbDIgPSBnZXRMdW1pbmFuY2UoY29sb3IyKTtcbiAgY29uc3QgbGlnaHRlciA9IE1hdGgubWF4KGwxLCBsMik7XG4gIGNvbnN0IGRhcmtlciA9IE1hdGgubWluKGwxLCBsMik7XG4gIHJldHVybiAobGlnaHRlciArIDAuMDUpIC8gKGRhcmtlciArIDAuMDUpO1xufVxuXG5cbi8qKlxuICogQ2FudmFzIGZhY3RvcnkgaW50ZXJmYWNlIGZvciBlbnZpcm9ubWVudC1hZ25vc3RpYyBjYW52YXMgY3JlYXRpb24uXG4gKiBBbGxvd3MgUVJHZW5lcmF0b3IgdG8gd29yayBpbiBib3RoIGJyb3dzZXIgYW5kIE5vZGUuanMgKE5ldGxpZnkgZnVuY3Rpb25zKS5cbiAqIFxuICogQHR5cGVkZWYge09iamVjdH0gQ2FudmFzRmFjdG9yeVxuICogQHByb3BlcnR5IHtmdW5jdGlvbihudW1iZXIsIG51bWJlcik6IFByb21pc2U8SFRNTENhbnZhc0VsZW1lbnR8b2JqZWN0Pn0gY3JlYXRlQ2FudmFzIC0gQ3JlYXRlcyBhIGNhbnZhcyB3aXRoIGdpdmVuIHdpZHRoL2hlaWdodFxuICogQHByb3BlcnR5IHtmdW5jdGlvbihzdHJpbmcpOiBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnR8b2JqZWN0Pn0gW2xvYWRJbWFnZV0gLSBPcHRpb25hbDogbG9hZHMgYW4gaW1hZ2UgZnJvbSBVUkwvYnVmZmVyXG4gKi9cblxuLyoqXG4gKiBEZWZhdWx0IGJyb3dzZXIgY2FudmFzIGZhY3RvcnkgLSB1c2VzIERPTSBBUElzXG4gKiBFeHBvcnRlZCBmb3IgcmVmZXJlbmNlL2V4dGVuc2lvbiBieSBjdXN0b20gZmFjdG9yaWVzXG4gKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0QnJvd3NlckNhbnZhc0ZhY3RvcnkgPSB7XG4gIGNyZWF0ZUNhbnZhczogKHdpZHRoLCBoZWlnaHQpID0+IHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSB3aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2FudmFzKTtcbiAgfSxcbiAgbG9hZEltYWdlOiAoc3JjKSA9PiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLmNyb3NzT3JpZ2luID0gJ2Fub255bW91cyc7XG4gICAgICBpbWcub25sb2FkID0gKCkgPT4gcmVzb2x2ZShpbWcpO1xuICAgICAgaW1nLm9uZXJyb3IgPSAoZSkgPT4gcmVqZWN0KG5ldyBFcnJvcihgRmFpbGVkIHRvIGxvYWQgaW1hZ2U6ICR7c3JjfWApKTtcbiAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgfSk7XG4gIH1cbn07XG5cbmV4cG9ydCBjbGFzcyBRUkdlbmVyYXRvciB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBRUiBnZW5lcmF0b3IgaW5zdGFuY2VcbiAgICogQHBhcmFtIHtDYW52YXNGYWN0b3J5fSBbY2FudmFzRmFjdG9yeV0gLSBPcHRpb25hbCBjYW52YXMgZmFjdG9yeSBmb3Igbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzXG4gICAqL1xuICBjb25zdHJ1Y3RvcihjYW52YXNGYWN0b3J5ID0gbnVsbCkge1xuICAgIHRoaXMucXJjb2RlID0gcXJjb2RlO1xuICAgIHRoaXMuX2NhbnZhc0ZhY3RvcnkgPSBjYW52YXNGYWN0b3J5IHx8IGRlZmF1bHRCcm93c2VyQ2FudmFzRmFjdG9yeTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjYW52YXMgdXNpbmcgdGhlIGNvbmZpZ3VyZWQgZmFjdG9yeVxuICAgKiBAcGFyYW0ge251bWJlcn0gd2lkdGhcbiAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxIVE1MQ2FudmFzRWxlbWVudHxvYmplY3Q+fVxuICAgKi9cbiAgYXN5bmMgX2NyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbnZhc0ZhY3RvcnkuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuICB9XG5cbiAgYXN5bmMgbG9hZExpYnJhcnkoKSB7XG4gICAgLy8gTGlicmFyeSBpcyBpbXBvcnRlZCBzeW5jaHJvbm91c2x5IHZpYSBFUyBtb2R1bGVcbiAgICAvLyBUaGlzIG1ldGhvZCBpcyBrZXB0IGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuXG4gIGFzeW5jIGdlbmVyYXRlKGNvbmZpZywgb3ZlcmxheUNhbnZhcyA9IG51bGwpIHtcbiAgICBpZiAoIXRoaXMucXJjb2RlKSB7XG4gICAgICBhd2FpdCB0aGlzLmxvYWRMaWJyYXJ5KCk7XG4gICAgfVxuXG4gICAgLy8gQXV0by1kZXRlY3QgYmVzdCB2ZXJzaW9uIGlmIHNldCB0byAwXG4gICAgbGV0IHR5cGVOdW1iZXIgPSBjb25maWcudHlwZU51bWJlcjtcbiAgICBpZiAodHlwZU51bWJlciA9PT0gMCkge1xuICAgICAgdHlwZU51bWJlciA9IHRoaXMuY2FsY3VsYXRlT3B0aW1hbFZlcnNpb24oXG4gICAgICAgIGNvbmZpZy5jb250ZW50LFxuICAgICAgICBjb25maWcuZXJyb3JDb3JyZWN0aW9uLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBBcHBseSBvdmVybGF5IHByZXByb2Nlc3NpbmcgaWYgd2UgaGF2ZSBhbiBvdmVybGF5XG4gICAgbGV0IHByb2Nlc3NlZE92ZXJsYXlDYW52YXMgPSBvdmVybGF5Q2FudmFzO1xuICAgIGlmIChvdmVybGF5Q2FudmFzICYmIHRoaXMuX2hhc1ByZXByb2Nlc3NpbmdPcHRpb25zKGNvbmZpZykpIHtcbiAgICAgIHByb2Nlc3NlZE92ZXJsYXlDYW52YXMgPSBhd2FpdCB0aGlzLl9wcmVwcm9jZXNzT3ZlcmxheShvdmVybGF5Q2FudmFzLCBjb25maWcpO1xuICAgIH1cblxuICAgIC8vIERpdGhlcmVkIG1vZGUgdXNlcyB0aGUgYHFyYCBlbmNvZGVyIGRpcmVjdGx5IChhbmQgaGFzIGl0cyBvd25cbiAgICAvLyBvdmVyZmxvdyBoYW5kbGluZykuIFNraXAgcXJjb2RlLWdlbmVyYXRvciBlbnRpcmVseSB0byBhdm9pZFxuICAgIC8vIGBjb2RlIGxlbmd0aCBvdmVyZmxvd2Agd2hlbiBhIG1hbnVhbCB2ZXJzaW9uIGlzIHRvbyBzbWFsbC5cbiAgICBpZiAoY29uZmlnLm92ZXJsYXlNb2RlID09PSBcImRpdGhlcmVkXCIgJiYgcHJvY2Vzc2VkT3ZlcmxheUNhbnZhcykge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2VuZXJhdGVEaXRoZXJlZFN1YnBpeGVsUVIoXG4gICAgICAgIG51bGwsXG4gICAgICAgIHsgLi4uY29uZmlnLCB0eXBlTnVtYmVyIH0sXG4gICAgICAgIHByb2Nlc3NlZE92ZXJsYXlDYW52YXMsXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIEJsdWUtbm9pc2UgbW9kZSBnZW5lcmF0ZXMgYW5pbWF0ZWQgZnJhbWVzIHdpdGggdGVtcG9yYWwgZGl0aGVyaW5nXG4gICAgaWYgKGNvbmZpZy5vdmVybGF5TW9kZSA9PT0gXCJibHVlLW5vaXNlXCIgJiYgcHJvY2Vzc2VkT3ZlcmxheUNhbnZhcykge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2VuZXJhdGVCbHVlTm9pc2VRUih7IC4uLmNvbmZpZywgdHlwZU51bWJlciB9LCBwcm9jZXNzZWRPdmVybGF5Q2FudmFzKTtcbiAgICB9XG5cbiAgICBjb25zdCBxciA9IHRoaXMucXJjb2RlKHR5cGVOdW1iZXIsIGNvbmZpZy5lcnJvckNvcnJlY3Rpb24pO1xuICAgIHFyLmFkZERhdGEoY29uZmlnLmNvbnRlbnQpO1xuICAgIHFyLm1ha2UoKTtcblxuICAgIGNvbnN0IG1vZHVsZUNvdW50ID0gcXIuZ2V0TW9kdWxlQ291bnQoKTtcblxuICAgIC8vIEZvciBzdWJwaXhlbCBtb2RlcywgdXNlIHNwZWNpYWwgM3gzIHJlbmRlcmluZ1xuICAgIC8vIERpdGhlcmVkIFFSIENvZGVzIChlcnJvciBkaWZmdXNpb24pIHN0eWxlIHJlbmRlcmluZ1xuICAgIC8vIEluc3BpcmVkIGJ5IHRoZSBpZGVhIG9mIHVzaW5nIGVycm9yIGRpZmZ1c2lvbiB0byBjb21wZW5zYXRlIGZvciBmaXhlZCBRUiBkYXRhIG1vZHVsZXMuXG4gICAgaWYgKGNvbmZpZy5vdmVybGF5TW9kZSA9PT0gXCJkaXRoZXJlZFwiICYmIG92ZXJsYXlDYW52YXMpIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdlbmVyYXRlRGl0aGVyZWRTdWJwaXhlbFFSKFxuICAgICAgICBxcixcbiAgICAgICAgY29uZmlnLFxuICAgICAgICBvdmVybGF5Q2FudmFzLFxuICAgICAgICBtb2R1bGVDb3VudCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5vdmVybGF5TW9kZSA9PT0gXCJzdWJwaXhlbFwiICYmIHByb2Nlc3NlZE92ZXJsYXlDYW52YXMpIHtcbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdlbmVyYXRlU3VicGl4ZWxRUihcbiAgICAgICAgcXIsXG4gICAgICAgIGNvbmZpZyxcbiAgICAgICAgcHJvY2Vzc2VkT3ZlcmxheUNhbnZhcyxcbiAgICAgICAgbW9kdWxlQ291bnQsXG4gICAgICAgIGZhbHNlLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGNvbmZpZy5vdmVybGF5TW9kZSA9PT0gXCJzdWJwaXhlbC1zaXplXCIgJiYgcHJvY2Vzc2VkT3ZlcmxheUNhbnZhcykge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2VuZXJhdGVTdWJwaXhlbFFSKFxuICAgICAgICBxcixcbiAgICAgICAgY29uZmlnLFxuICAgICAgICBwcm9jZXNzZWRPdmVybGF5Q2FudmFzLFxuICAgICAgICBtb2R1bGVDb3VudCxcbiAgICAgICAgdHJ1ZSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgbW9kdWxlU2l6ZSA9IGNvbmZpZy5tb2R1bGVTaXplO1xuICAgIGNvbnN0IG1hcmdpbiA9IGNvbmZpZy5tYXJnaW47XG4gICAgY29uc3QgZnJhbWVFeHRyYSA9IChjb25maWcuZnJhbWVTdHlsZSAmJiBjb25maWcuZnJhbWVTdHlsZSAhPT0gJ25vbmUnICYmIGNvbmZpZy5mcmFtZVRleHQpID8gbW9kdWxlU2l6ZSAqIDQgOiAwO1xuICAgIGNvbnN0IHNpemUgPSBtb2R1bGVDb3VudCAqIG1vZHVsZVNpemUgKyBtYXJnaW4gKiAyICogbW9kdWxlU2l6ZSArIGZyYW1lRXh0cmE7XG5cbiAgICBjb25zdCBjYW52YXMgPSBhd2FpdCB0aGlzLl9jcmVhdGVDYW52YXMoc2l6ZSwgc2l6ZSk7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEtlZXAgZWRnZXMgY3Jpc3AgKGNyaXRpY2FsIGZvciBRUiBzY2FubmluZylcbiAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAvLyBEcmF3IGJhY2tncm91bmRcbiAgICBpZiAoIWNvbmZpZy50cmFuc3BhcmVudEJnKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmJnQ29sb3I7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gR2V0IG92ZXJsYXkgaW1hZ2UgZGF0YSBpZiBwcm92aWRlZFxuICAgIGxldCBvdmVybGF5RGF0YSA9IG51bGw7XG4gICAgaWYgKHByb2Nlc3NlZE92ZXJsYXlDYW52YXMpIHtcbiAgICAgIG92ZXJsYXlEYXRhID0gYXdhaXQgdGhpcy5fZ2V0T3ZlcmxheURhdGEoXG4gICAgICAgIHByb2Nlc3NlZE92ZXJsYXlDYW52YXMsXG4gICAgICAgIG1vZHVsZUNvdW50LFxuICAgICAgICBjb25maWcuY29sb3JNb2RlIHx8IFwiY29sb3JcIixcbiAgICAgICAgY29uZmlnLmludmVydEltYWdlIHx8IGZhbHNlLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBBcHBseSBwZXItRUNDIGludGVuc2l0eSBsaW1pdHMgaWYgY29uZmlndXJlZCAtIHVzZWQgZm9yIEFMTCBvdmVybGF5IG1vZGVzXG4gICAgbGV0IGVmZmVjdGl2ZUludGVuc2l0eSA9IGNvbmZpZy5vdmVybGF5SW50ZW5zaXR5ID8/IDEwMDtcbiAgICBpZiAoY29uZmlnLm1heE92ZXJsYXlJbnRlbnNpdHlCeUVjYykge1xuICAgICAgY29uc3QgZWNjTGltaXRzID0gY29uZmlnLm1heE92ZXJsYXlJbnRlbnNpdHlCeUVjYztcbiAgICAgIGNvbnN0IGVjY0xpbWl0ID0gZWNjTGltaXRzW2NvbmZpZy5lcnJvckNvcnJlY3Rpb25dO1xuICAgICAgaWYgKGVjY0xpbWl0ICE9PSB1bmRlZmluZWQgJiYgZWNjTGltaXQgPCBlZmZlY3RpdmVJbnRlbnNpdHkpIHtcbiAgICAgICAgZWZmZWN0aXZlSW50ZW5zaXR5ID0gZWNjTGltaXQ7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIEFsc28gY2hlY2sgaW5kaXZpZHVhbCBwZXItRUNDIHBhcmFtcyAobWF4T3ZlcmxheUludGVuc2l0eUwsIG1heE92ZXJsYXlJbnRlbnNpdHlNLCBldGMuKVxuICAgIGNvbnN0IGVjY0ludGVuc2l0eUtleSA9IGBtYXhPdmVybGF5SW50ZW5zaXR5JHtjb25maWcuZXJyb3JDb3JyZWN0aW9ufWA7XG4gICAgaWYgKGNvbmZpZ1tlY2NJbnRlbnNpdHlLZXldICE9PSB1bmRlZmluZWQgJiYgY29uZmlnW2VjY0ludGVuc2l0eUtleV0gPCBlZmZlY3RpdmVJbnRlbnNpdHkpIHtcbiAgICAgIGVmZmVjdGl2ZUludGVuc2l0eSA9IGNvbmZpZ1tlY2NJbnRlbnNpdHlLZXldO1xuICAgIH1cbiAgICAvLyBDcmVhdGUgYSBtb2RpZmllZCBjb25maWcgd2l0aCBlZmZlY3RpdmUgaW50ZW5zaXR5IGZvciBhbGwgcHJvY2Vzc2luZ1xuICAgIGNvbnN0IGVmZmVjdGl2ZUNvbmZpZyA9IHsgLi4uY29uZmlnLCBvdmVybGF5SW50ZW5zaXR5OiBlZmZlY3RpdmVJbnRlbnNpdHkgfTtcblxuICAgIC8vIEZvciB0cnVlIGRpdGhlciBtb2RlLCB3ZSBtb2RpZnkgd2hpY2ggbW9kdWxlcyBhcmUgb24vb2ZmXG4gICAgbGV0IGRpdGhlclBhdHRlcm4gPSBudWxsO1xuICAgIGxldCBhZHZhbmNlZERpdGhlclJlc3VsdCA9IG51bGw7XG4gICAgXG4gICAgaWYgKChjb25maWcub3ZlcmxheU1vZGUgPT09IFwiZGl0aGVyXCIgfHwgY29uZmlnLm92ZXJsYXlNb2RlID09PSBcImV4dHJlbWVcIikgJiYgb3ZlcmxheURhdGEpIHtcbiAgICAgIC8vIENoZWNrIGlmIGFkdmFuY2VkIGRpdGhlcmluZyBwYXJhbXMgYXJlIHNwZWNpZmllZFxuICAgICAgY29uc3QgdXNlQWR2YW5jZWREaXRoZXIgPSBjb25maWcuZGl0aGVyS2luZCAmJiBcbiAgICAgICAgY29uZmlnLmRpdGhlcktpbmQgIT09ICd0cnVlX2RpdGhlcicgJiYgXG4gICAgICAgIGNvbmZpZy5kaXRoZXJLaW5kICE9PSAnZXJyb3JfZGlmZnVzaW9uJztcbiAgICAgIFxuICAgICAgaWYgKHVzZUFkdmFuY2VkRGl0aGVyICYmIG92ZXJsYXlDYW52YXMpIHtcbiAgICAgICAgLy8gVXNlIGFkdmFuY2VkIGRpdGhlcmluZyBmcm9tIGRpdGhlci1hbGdvcml0aG1zIG1vZHVsZVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGFkdmFuY2VkRGl0aGVyUmVzdWx0ID0gYXdhaXQgdGhpcy5hcHBseUFkdmFuY2VkRGl0aGVyKG92ZXJsYXlDYW52YXMsIG1vZHVsZUNvdW50LCBlZmZlY3RpdmVDb25maWcpO1xuICAgICAgICAgIGRpdGhlclBhdHRlcm4gPSBhZHZhbmNlZERpdGhlclJlc3VsdC5tYXRyaXg7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oJ0FkdmFuY2VkIGRpdGhlcmluZyBmYWlsZWQsIGZhbGxpbmcgYmFjayB0byB0cnVlIGRpdGhlcjonLCBlKTtcbiAgICAgICAgICBkaXRoZXJQYXR0ZXJuID0gdGhpcy5hcHBseVRydWVEaXRoZXIocXIsIG92ZXJsYXlEYXRhLCBlZmZlY3RpdmVDb25maWcsIGNvbmZpZy5vdmVybGF5TW9kZSA9PT0gXCJleHRyZW1lXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBVc2UgYnVpbHQtaW4gdHJ1ZSBkaXRoZXIgd2l0aCBjb25maWd1cmVkIGRpZmZ1c2lvbiBrZXJuZWwgYW5kIHNlcnBlbnRpbmVcbiAgICAgICAgZGl0aGVyUGF0dGVybiA9IHRoaXMuYXBwbHlUcnVlRGl0aGVyKHFyLCBvdmVybGF5RGF0YSwgZWZmZWN0aXZlQ29uZmlnLCBjb25maWcub3ZlcmxheU1vZGUgPT09IFwiZXh0cmVtZVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZXQgdmVyc2lvbiBmb3IgYWxpZ25tZW50IHBhdHRlcm4gZGV0ZWN0aW9uXG4gICAgY29uc3QgdmVyc2lvbiA9IGNvbmZpZy50eXBlTnVtYmVyIHx8IE1hdGguY2VpbCgobW9kdWxlQ291bnQgLSAxNykgLyA0KTtcbiAgICBcbiAgICAvLyBDcmVhdGUgZ3JhZGllbnQgZmlsbCBpZiBjb25maWd1cmVkXG4gICAgY29uc3QgZ3JhZGllbnRGaWxsID0gdGhpcy5jcmVhdGVHcmFkaWVudEZpbGwoY3R4LCBjb25maWcsIHNpemUpO1xuICAgIGNvbnN0IHVzZUdyYWRpZW50ID0gY29uZmlnLmdyYWRpZW50ICYmIGNvbmZpZy5ncmFkaWVudC50eXBlICE9PSAnbm9uZSc7XG4gICAgXG4gICAgLy8gUmVuZGVyIG9wdGlvbnNcbiAgICBjb25zdCBjb3JuZXJSYWRpdXMgPSBjb25maWcuY29ybmVyUmFkaXVzIHx8IDA7XG4gICAgY29uc3QgZG90Um90YXRpb24gPSBjb25maWcuZG90Um90YXRpb25EZWcgfHwgMDtcbiAgICBjb25zdCBhbGlnbm1lbnRTdHlsZSA9IGNvbmZpZy5hbGlnbm1lbnRTdHlsZSB8fCAnbWF0Y2hfZmluZGVyJztcbiAgICBjb25zdCB0aW1pbmdTdHlsZSA9IGNvbmZpZy50aW1pbmdTdHlsZSB8fCAnbWF0Y2hfbW9kdWxlJztcblxuICAgIC8vIFRyYWNrIGRyYXduIGZpbmRlciBwYXR0ZXJucyB0byBhdm9pZCBkb3VibGUtZHJhd2luZ1xuICAgIGNvbnN0IGRyYXduRmluZGVyUGF0dGVybnMgPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgZHJhd25BbGlnbm1lbnRQYXR0ZXJucyA9IG5ldyBTZXQoKTtcblxuICAgIC8vIERyYXcgY29tcGxldGUgZmluZGVyIHBhdHRlcm5zIGZpcnN0IChleWVzKVxuICAgIGNvbnN0IGZpbmRlclBvc2l0aW9ucyA9IFtcbiAgICAgIHsgcm93OiAwLCBjb2w6IDAgfSwgLy8gVG9wLWxlZnRcbiAgICAgIHsgcm93OiAwLCBjb2w6IG1vZHVsZUNvdW50IC0gNyB9LCAvLyBUb3AtcmlnaHRcbiAgICAgIHsgcm93OiBtb2R1bGVDb3VudCAtIDcsIGNvbDogMCB9LCAvLyBCb3R0b20tbGVmdFxuICAgIF07XG4gICAgXG4gICAgZm9yIChjb25zdCBwb3Mgb2YgZmluZGVyUG9zaXRpb25zKSB7XG4gICAgICBjb25zdCB4ID0gKHBvcy5jb2wgKyBtYXJnaW4pICogbW9kdWxlU2l6ZTtcbiAgICAgIGNvbnN0IHkgPSAocG9zLnJvdyArIG1hcmdpbikgKiBtb2R1bGVTaXplO1xuICAgICAgdGhpcy5kcmF3RmluZGVyUGF0dGVybkNvbXBsZXRlKGN0eCwgeCwgeSwgbW9kdWxlU2l6ZSwgY29uZmlnKTtcbiAgICAgIFxuICAgICAgLy8gTWFyayBhbGwgbW9kdWxlcyBpbiB0aGlzIGZpbmRlciBwYXR0ZXJuIGFzIGRyYXduXG4gICAgICBmb3IgKGxldCByID0gcG9zLnJvdzsgciA8IHBvcy5yb3cgKyA3OyByKyspIHtcbiAgICAgICAgZm9yIChsZXQgYyA9IHBvcy5jb2w7IGMgPCBwb3MuY29sICsgNzsgYysrKSB7XG4gICAgICAgICAgZHJhd25GaW5kZXJQYXR0ZXJucy5hZGQoYCR7cn0sJHtjfWApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRHJhdyBhbGlnbm1lbnQgcGF0dGVybnMgKGZvciB2ZXJzaW9uIDIrKVxuICAgIGlmICh2ZXJzaW9uID49IDIpIHtcbiAgICAgIGNvbnN0IGFsaWduUG9zaXRpb25zID0gdGhpcy5nZXRBbGlnbm1lbnRQb3NpdGlvbnModmVyc2lvbiwgbW9kdWxlQ291bnQpO1xuICAgICAgZm9yIChjb25zdCBwb3Mgb2YgYWxpZ25Qb3NpdGlvbnMpIHtcbiAgICAgICAgY29uc3QgY2VudGVyWCA9IChwb3MuY29sICsgbWFyZ2luKSAqIG1vZHVsZVNpemUgKyBtb2R1bGVTaXplIC8gMjtcbiAgICAgICAgY29uc3QgY2VudGVyWSA9IChwb3Mucm93ICsgbWFyZ2luKSAqIG1vZHVsZVNpemUgKyBtb2R1bGVTaXplIC8gMjtcbiAgICAgICAgdGhpcy5kcmF3QWxpZ25tZW50UGF0dGVybihjdHgsIGNlbnRlclgsIGNlbnRlclksIG1vZHVsZVNpemUsIGFsaWdubWVudFN0eWxlLCBjb25maWcpO1xuICAgICAgICBcbiAgICAgICAgLy8gTWFyayBhbGwgbW9kdWxlcyBpbiB0aGlzIGFsaWdubWVudCBwYXR0ZXJuIGFzIGRyYXduXG4gICAgICAgIGZvciAobGV0IHIgPSBwb3Mucm93IC0gMjsgciA8PSBwb3Mucm93ICsgMjsgcisrKSB7XG4gICAgICAgICAgZm9yIChsZXQgYyA9IHBvcy5jb2wgLSAyOyBjIDw9IHBvcy5jb2wgKyAyOyBjKyspIHtcbiAgICAgICAgICAgIGRyYXduQWxpZ25tZW50UGF0dGVybnMuYWRkKGAke3J9LCR7Y31gKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEcmF3IFFSIG1vZHVsZXNcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50OyBjb2wrKykge1xuICAgICAgICAvLyBTa2lwIGlmIHRoaXMgbW9kdWxlIGlzIHBhcnQgb2YgYSBmaW5kZXIgcGF0dGVybiAoYWxyZWFkeSBkcmF3bilcbiAgICAgICAgaWYgKGRyYXduRmluZGVyUGF0dGVybnMuaGFzKGAke3Jvd30sJHtjb2x9YCkpIGNvbnRpbnVlO1xuICAgICAgICBcbiAgICAgICAgLy8gU2tpcCBpZiB0aGlzIG1vZHVsZSBpcyBwYXJ0IG9mIGFuIGFsaWdubWVudCBwYXR0ZXJuIChhbHJlYWR5IGRyYXduKVxuICAgICAgICBpZiAoZHJhd25BbGlnbm1lbnRQYXR0ZXJucy5oYXMoYCR7cm93fSwke2NvbH1gKSkgY29udGludWU7XG4gICAgICAgIFxuICAgICAgICAvLyBVc2UgZGl0aGVyZWQgcGF0dGVybiBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSB1c2Ugb3JpZ2luYWwgUVJcbiAgICAgICAgY29uc3QgaXNEYXJrID0gZGl0aGVyUGF0dGVyblxuICAgICAgICAgID8gZGl0aGVyUGF0dGVybltyb3ddW2NvbF1cbiAgICAgICAgICA6IHFyLmlzRGFyayhyb3csIGNvbCk7XG4gICAgICAgIGNvbnN0IHggPSAoY29sICsgbWFyZ2luKSAqIG1vZHVsZVNpemU7XG4gICAgICAgIGNvbnN0IHkgPSAocm93ICsgbWFyZ2luKSAqIG1vZHVsZVNpemU7XG5cbiAgICAgICAgY29uc3QgaXNGaW5kZXIgPSB0aGlzLmlzRmluZGVyUGF0dGVybihyb3csIGNvbCwgbW9kdWxlQ291bnQpO1xuICAgICAgICBjb25zdCBpc1RpbWluZyA9IHRoaXMuaXNUaW1pbmdQYXR0ZXJuKHJvdywgY29sLCBtb2R1bGVDb3VudCk7XG4gICAgICAgIGNvbnN0IGlzRm9ybWF0SW5mbyA9IHRoaXMuaXNGb3JtYXRJbmZvKHJvdywgY29sLCBtb2R1bGVDb3VudCk7XG4gICAgICAgIGNvbnN0IGlzVmVyc2lvbkluZm8gPSB0aGlzLmlzVmVyc2lvbkluZm8ocm93LCBjb2wsIG1vZHVsZUNvdW50LCB2ZXJzaW9uKTtcbiAgICAgICAgLy8gTm90ZTogYWxpZ25tZW50IHBhdHRlcm4gbW9kdWxlcyBhcmUgYWxyZWFkeSBza2lwcGVkIHZpYSBkcmF3bkFsaWdubWVudFBhdHRlcm5zIHNldFxuICAgICAgICBjb25zdCBpc0luQWxpZ25tZW50U2V0ID0gZHJhd25BbGlnbm1lbnRQYXR0ZXJucy5oYXMoYCR7cm93fSwke2NvbH1gKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFByb3RlY3Rpb24gc2V0dGluZ3NcbiAgICAgICAgY29uc3QgcHJvdGVjdEZvcm1hdCA9IGNvbmZpZy5wcm90ZWN0Rm9ybWF0SW5mbyB8fCBmYWxzZTtcbiAgICAgICAgY29uc3QgcHJvdGVjdFZlcnNpb24gPSBjb25maWcucHJvdGVjdFZlcnNpb25JbmZvIHx8IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYXBwbHlPdmVybGF5ID1cbiAgICAgICAgICBvdmVybGF5RGF0YSAmJiBcbiAgICAgICAgICAoIWNvbmZpZy5wcmVzZXJ2ZUZpbmRlcnMgfHwgIWlzRmluZGVyKSAmJiBcbiAgICAgICAgICAoIWNvbmZpZy5wcmVzZXJ2ZVRpbWluZyB8fCAhaXNUaW1pbmcpICYmXG4gICAgICAgICAgKCFjb25maWcucHJlc2VydmVBbGlnbm1lbnQgfHwgIWlzSW5BbGlnbm1lbnRTZXQpICYmXG4gICAgICAgICAgKCFwcm90ZWN0Rm9ybWF0IHx8ICFpc0Zvcm1hdEluZm8pICYmXG4gICAgICAgICAgKCFwcm90ZWN0VmVyc2lvbiB8fCAhaXNWZXJzaW9uSW5mbyk7XG5cbiAgICAgICAgbGV0IG1vZHVsZUNvbG9yID0gaXNEYXJrID8gY29uZmlnLmZnQ29sb3IgOiBjb25maWcuYmdDb2xvcjtcbiAgICAgICAgbGV0IG1vZHVsZVNpemVNb2RpZmllciA9IDE7XG4gICAgICAgIGxldCBtb2R1bGVPcGFjaXR5ID0gMTtcbiAgICAgICAgbGV0IHdhdmVPZmZzZXRYID0gMDtcbiAgICAgICAgbGV0IHdhdmVPZmZzZXRZID0gMDtcbiAgICAgICAgbGV0IGRyYXdPdXRsaW5lT25seSA9IGZhbHNlO1xuICAgICAgICBsZXQgdXNlSGFsZnRvbmVSZW5kZXJpbmcgPSBmYWxzZTtcbiAgICAgICAgbGV0IGhhbGZ0b25lQnJpZ2h0bmVzcyA9IDAuNTtcblxuICAgICAgICAvLyBGb3IgbW9zYWljIG1vZGUsIHdlIGRyYXcgYm90aCBkYXJrIGFuZCB3aGl0ZSBjZWxsc1xuICAgICAgICBsZXQgc2hvdWxkRHJhd0NlbGwgPSBpc0Rhcms7XG5cbiAgICAgICAgaWYgKGFwcGx5T3ZlcmxheSkge1xuICAgICAgICAgIGNvbnN0IGJyaWdodG5lc3MgPSBvdmVybGF5RGF0YVtyb3ddW2NvbF07XG5cbiAgICAgICAgICBzd2l0Y2ggKGNvbmZpZy5vdmVybGF5TW9kZSkge1xuICAgICAgICAgICAgY2FzZSBcImhhbGZ0b25lXCI6XG4gICAgICAgICAgICAgIGlmIChpc0RhcmspIHtcbiAgICAgICAgICAgICAgICAvLyBVc2UgaGFsZnRvbmUgcGFyYW1zIGlmIGF2YWlsYWJsZVxuICAgICAgICAgICAgICAgIGlmIChjb25maWcuaGFsZnRvbmVDZWxsIHx8IGNvbmZpZy5oYWxmdG9uZURvdFNoYXBlIHx8IGNvbmZpZy5icmlnaHRuZXNzQ3VydmUpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFN0b3JlIGJyaWdodG5lc3MgZm9yIGhhbGZ0b25lIHJlbmRlcmluZyAtIHdpbGwgYmUgaGFuZGxlZCBzcGVjaWFsbHkgYmVsb3dcbiAgICAgICAgICAgICAgICAgIHVzZUhhbGZ0b25lUmVuZGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGhhbGZ0b25lQnJpZ2h0bmVzcyA9IGJyaWdodG5lc3M7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIExlZ2FjeSBoYWxmdG9uZSBiZWhhdmlvclxuICAgICAgICAgICAgICAgICAgY29uc3QgaW50ZW5zaXR5ID0gZWZmZWN0aXZlSW50ZW5zaXR5IC8gMTAwO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbWluU2l6ZSA9IDAuMztcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG1heFNpemUgPSAxLjA7XG4gICAgICAgICAgICAgICAgICBtb2R1bGVTaXplTW9kaWZpZXIgPVxuICAgICAgICAgICAgICAgICAgICBtaW5TaXplICtcbiAgICAgICAgICAgICAgICAgICAgKDEgLSBicmlnaHRuZXNzKSAqIChtYXhTaXplIC0gbWluU2l6ZSkgKiBpbnRlbnNpdHkgK1xuICAgICAgICAgICAgICAgICAgICAoKDEgLSBpbnRlbnNpdHkpICogKG1heFNpemUgLSBtaW5TaXplKSkgLyAyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcImJsZW5kXCI6XG4gICAgICAgICAgICAgIGlmIChpc0RhcmspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBibGVuZENvbG9yID0gb3ZlcmxheURhdGEuY29sb3JzPy5bcm93XT8uW2NvbF07XG4gICAgICAgICAgICAgICAgaWYgKGJsZW5kQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGJsZW5kQW1vdW50ID0gZWZmZWN0aXZlSW50ZW5zaXR5IC8gMTAwO1xuICAgICAgICAgICAgICAgICAgbW9kdWxlQ29sb3IgPSBibGVuZENvbG9ycyhcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmZnQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGJsZW5kQW1vdW50LFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJicmlnaHRuZXNzXCI6XG4gICAgICAgICAgICAgIGlmIChpc0RhcmspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0aHJlc2hvbGQgPSAoMTAwIC0gZWZmZWN0aXZlSW50ZW5zaXR5KSAvIDEwMDtcbiAgICAgICAgICAgICAgICBpZiAoYnJpZ2h0bmVzcyA+IHRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgICAgbW9kdWxlT3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwiZ2FwZmlsbFwiOlxuICAgICAgICAgICAgICAvLyBGaWxsIHdoaXRlIHNwYWNlcyB3aXRoIGZhZGVkIGltYWdlIGNvbG9yc1xuICAgICAgICAgICAgICBpZiAoaXNEYXJrKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlQ29sb3IgPSBjb25maWcuZmdDb2xvcjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBEcmF3IHdoaXRlIHNwYWNlcyB3aXRoIGZhZGVkIGltYWdlIGNvbG9yXG4gICAgICAgICAgICAgICAgY29uc3QgZ2FwQ29sb3IgPSBvdmVybGF5RGF0YS5jb2xvcnM/Lltyb3ddPy5bY29sXTtcbiAgICAgICAgICAgICAgICBpZiAoZ2FwQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZhZGVBbW91bnQgPSAoY29uZmlnLm92ZXJsYXlJbnRlbnNpdHkgLyAxMDApICogMC40OyAvLyBNYXggNDAlIG9wYWNpdHlcbiAgICAgICAgICAgICAgICAgIG1vZHVsZUNvbG9yID0gYmxlbmRDb2xvcnMoXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5iZ0NvbG9yLFxuICAgICAgICAgICAgICAgICAgICBnYXBDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgZmFkZUFtb3VudCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBzaG91bGREcmF3Q2VsbCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwicGl4ZWxhdGVcIjpcbiAgICAgICAgICAgICAgLy8gVHJ1ZSBwaXhlbGF0aW9uIC0gM3gzIGJsb2NrcyBnZXQgc2FtZSBhdmVyYWdlZCBjb2xvciBmb3IgY2h1bmt5IHBpeGVsIGxvb2tcbiAgICAgICAgICAgICAgaWYgKGlzRGFyaykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrU2l6ZSA9IDM7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tSb3cgPSBNYXRoLmZsb29yKHJvdyAvIGJsb2NrU2l6ZSkgKiBibG9ja1NpemU7XG4gICAgICAgICAgICAgICAgY29uc3QgYmxvY2tDb2wgPSBNYXRoLmZsb29yKGNvbCAvIGJsb2NrU2l6ZSkgKiBibG9ja1NpemU7XG4gICAgICAgICAgICAgICAgbGV0IGF2Z1IgPSAwLFxuICAgICAgICAgICAgICAgICAgYXZnRyA9IDAsXG4gICAgICAgICAgICAgICAgICBhdmdCID0gMCxcbiAgICAgICAgICAgICAgICAgIHBpeENvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKFxuICAgICAgICAgICAgICAgICAgbGV0IGJyID0gMDtcbiAgICAgICAgICAgICAgICAgIGJyIDwgYmxvY2tTaXplICYmIGJsb2NrUm93ICsgYnIgPCBtb2R1bGVDb3VudDtcbiAgICAgICAgICAgICAgICAgIGJyKytcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGZvciAoXG4gICAgICAgICAgICAgICAgICAgIGxldCBiYyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGJjIDwgYmxvY2tTaXplICYmIGJsb2NrQ29sICsgYmMgPCBtb2R1bGVDb3VudDtcbiAgICAgICAgICAgICAgICAgICAgYmMrK1xuICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGMgPVxuICAgICAgICAgICAgICAgICAgICAgIG92ZXJsYXlEYXRhLmNvbG9ycz8uW2Jsb2NrUm93ICsgYnJdPy5bYmxvY2tDb2wgKyBiY107XG4gICAgICAgICAgICAgICAgICAgIGlmIChjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VDb2xvcihjKTtcbiAgICAgICAgICAgICAgICAgICAgICBhdmdSICs9IHBhcnNlZC5yO1xuICAgICAgICAgICAgICAgICAgICAgIGF2Z0cgKz0gcGFyc2VkLmc7XG4gICAgICAgICAgICAgICAgICAgICAgYXZnQiArPSBwYXJzZWQuYjtcbiAgICAgICAgICAgICAgICAgICAgICBwaXhDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwaXhDb3VudCA+IDApIHtcbiAgICAgICAgICAgICAgICAgIGF2Z1IgPSBNYXRoLnJvdW5kKGF2Z1IgLyBwaXhDb3VudCk7XG4gICAgICAgICAgICAgICAgICBhdmdHID0gTWF0aC5yb3VuZChhdmdHIC8gcGl4Q291bnQpO1xuICAgICAgICAgICAgICAgICAgYXZnQiA9IE1hdGgucm91bmQoYXZnQiAvIHBpeENvdW50KTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGJsb2NrQ29sb3IgPSBgcmdiKCR7YXZnUn0sJHthdmdHfSwke2F2Z0J9KWA7XG4gICAgICAgICAgICAgICAgICBjb25zdCBwaXhCbGVuZEFtdCA9IGNvbmZpZy5vdmVybGF5SW50ZW5zaXR5IC8gMTAwO1xuICAgICAgICAgICAgICAgICAgbW9kdWxlQ29sb3IgPSBibGVuZENvbG9ycyhcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnLmZnQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIHBpeEJsZW5kQW10LFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJkdW90b25lXCI6XG4gICAgICAgICAgICAgIGlmIChpc0RhcmspIHtcbiAgICAgICAgICAgICAgICAvLyBkdW90b25lQ29sb3JzIGlzIGFuIGFycmF5IFtzaGFkb3dDb2xvciwgaGlnaGxpZ2h0Q29sb3JdIGZyb20gdGhlIHN0b3JlXG4gICAgICAgICAgICAgICAgY29uc3QgZHVvdG9uZUFyciA9IGNvbmZpZy5kdW90b25lQ29sb3JzIHx8IFtdO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoYWRvd0NvbG9yID0gZHVvdG9uZUFyclswXSB8fCBjb25maWcuZmdDb2xvcjtcbiAgICAgICAgICAgICAgICBjb25zdCBoaWdobGlnaHRDb2xvciA9IGR1b3RvbmVBcnJbMV0gfHwgbnVsbDtcbiAgICAgICAgICAgICAgICBjb25zdCBpbnRlbnNpdHkgPSBjb25maWcub3ZlcmxheUludGVuc2l0eSAvIDEwMDtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoYnJpZ2h0bmVzcyA+IDAuNSkge1xuICAgICAgICAgICAgICAgICAgLy8gQnJpZ2h0IGFyZWFzIGdldCBoaWdobGlnaHQgY29sb3JcbiAgICAgICAgICAgICAgICAgIGlmIChoaWdobGlnaHRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVDb2xvciA9IGJsZW5kQ29sb3JzKGNvbmZpZy5mZ0NvbG9yLCBoaWdobGlnaHRDb2xvciwgaW50ZW5zaXR5ICogKGJyaWdodG5lc3MgLSAwLjUpICogMik7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjazogbGlnaHRlbiB0aGUgZm9yZWdyb3VuZCBjb2xvclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmZ1BhcnNlZCA9IHBhcnNlQ29sb3IoY29uZmlnLmZnQ29sb3IpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsaWdodFIgPSBNYXRoLm1pbigyNTUsIGZnUGFyc2VkLnIgKyA4MCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxpZ2h0RyA9IE1hdGgubWluKDI1NSwgZmdQYXJzZWQuZyArIDgwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbGlnaHRCID0gTWF0aC5taW4oMjU1LCBmZ1BhcnNlZC5iICsgODApO1xuICAgICAgICAgICAgICAgICAgICBtb2R1bGVDb2xvciA9IGByZ2IoJHtsaWdodFJ9LCR7bGlnaHRHfSwke2xpZ2h0Qn0pYDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgLy8gRGFyayBhcmVhcyBnZXQgc2hhZG93IGNvbG9yXG4gICAgICAgICAgICAgICAgICBtb2R1bGVDb2xvciA9IGJsZW5kQ29sb3JzKGNvbmZpZy5mZ0NvbG9yLCBzaGFkb3dDb2xvciwgaW50ZW5zaXR5ICogKDAuNSAtIGJyaWdodG5lc3MpICogMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwib3V0bGluZVwiOlxuICAgICAgICAgICAgICBpZiAoaXNEYXJrKSB7XG4gICAgICAgICAgICAgICAgZHJhd091dGxpbmVPbmx5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjb25zdCBvdXRsaW5lQ29sb3IgPSBvdmVybGF5RGF0YS5jb2xvcnM/Lltyb3ddPy5bY29sXTtcbiAgICAgICAgICAgICAgICBpZiAob3V0bGluZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBvdXRsaW5lQmxlbmQgPSBjb25maWcub3ZlcmxheUludGVuc2l0eSAvIDEwMDtcbiAgICAgICAgICAgICAgICAgIG1vZHVsZUNvbG9yID0gYmxlbmRDb2xvcnMoXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZy5mZ0NvbG9yLFxuICAgICAgICAgICAgICAgICAgICBvdXRsaW5lQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgIG91dGxpbmVCbGVuZCxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwid2F2ZVwiOlxuICAgICAgICAgICAgICBpZiAoaXNEYXJrKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgd2F2ZUFtdCA9XG4gICAgICAgICAgICAgICAgICAoMSAtIGJyaWdodG5lc3MpICogKGNvbmZpZy5vdmVybGF5SW50ZW5zaXR5IC8gMTAwKSAqIDM7XG4gICAgICAgICAgICAgICAgd2F2ZU9mZnNldFggPSBNYXRoLnNpbihyb3cgKiAwLjUpICogd2F2ZUFtdDtcbiAgICAgICAgICAgICAgICB3YXZlT2Zmc2V0WSA9IE1hdGguY29zKGNvbCAqIDAuNSkgKiB3YXZlQW10O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwibW9zYWljXCI6IHtcbiAgICAgICAgICAgICAgLy8gTW9zYWljIGZpbGxzIEVWRVJZIGNlbGwgd2l0aCBpbWFnZSBjb2xvcnMgLSByZXZlYWxzIGZ1bGwgaW1hZ2VcbiAgICAgICAgICAgICAgLy8gRGFyayBtb2R1bGVzIGdldCBhY3R1YWwgY29sb3IsIHdoaXRlIHNwYWNlcyBnZXQgbGlnaHRlciB2ZXJzaW9uXG4gICAgICAgICAgICAgIHNob3VsZERyYXdDZWxsID0gdHJ1ZTsgLy8gRHJhdyBhbGwgY2VsbHNcbiAgICAgICAgICAgICAgY29uc3QgbW9zYWljQ29sb3IgPSBvdmVybGF5RGF0YS5jb2xvcnM/Lltyb3ddPy5bY29sXTtcbiAgICAgICAgICAgICAgaWYgKG1vc2FpY0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaW50ZW5zaXR5ID0gZWZmZWN0aXZlSW50ZW5zaXR5IC8gMTAwO1xuICAgICAgICAgICAgICAgIGlmIChpc0RhcmspIHtcbiAgICAgICAgICAgICAgICAgIC8vIERhcmsgY2VsbHMgZ2V0IHRoZSBhY3R1YWwgaW1hZ2UgY29sb3IgKGRhcmtlbmVkIHNsaWdodGx5IHRvIG1haW50YWluIFFSIHJlYWRhYmlsaXR5KVxuICAgICAgICAgICAgICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VDb2xvcihtb3NhaWNDb2xvcik7XG4gICAgICAgICAgICAgICAgICBjb25zdCBkYXJrRmFjdG9yID0gMC43O1xuICAgICAgICAgICAgICAgICAgbW9kdWxlQ29sb3IgPSBgcmdiKCR7TWF0aC5yb3VuZChwYXJzZWQuciAqIGRhcmtGYWN0b3IpfSwke01hdGgucm91bmQocGFyc2VkLmcgKiBkYXJrRmFjdG9yKX0sJHtNYXRoLnJvdW5kKHBhcnNlZC5iICogZGFya0ZhY3Rvcil9KWA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIFdoaXRlIGNlbGxzIGdldCBhIGxpZ2h0ZXIvYnJpZ2h0ZXIgdmVyc2lvbiBvZiB0aGUgaW1hZ2UgY29sb3JcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlQ29sb3IobW9zYWljQ29sb3IpO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbGlnaHRGYWN0b3IgPSAwLjQgKyAoMSAtIGludGVuc2l0eSkgKiAwLjQ7XG4gICAgICAgICAgICAgICAgICBjb25zdCBsaWdodFIgPSBNYXRoLnJvdW5kKFxuICAgICAgICAgICAgICAgICAgICAyNTUgLSAoMjU1IC0gcGFyc2VkLnIpICogbGlnaHRGYWN0b3IsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgY29uc3QgbGlnaHRHID0gTWF0aC5yb3VuZChcbiAgICAgICAgICAgICAgICAgICAgMjU1IC0gKDI1NSAtIHBhcnNlZC5nKSAqIGxpZ2h0RmFjdG9yLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGxpZ2h0QiA9IE1hdGgucm91bmQoXG4gICAgICAgICAgICAgICAgICAgIDI1NSAtICgyNTUgLSBwYXJzZWQuYikgKiBsaWdodEZhY3RvcixcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBtb2R1bGVDb2xvciA9IGByZ2IoJHtsaWdodFJ9LCR7bGlnaHRHfSwke2xpZ2h0Qn0pYDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNob3VsZERyYXdDZWxsICYmIG1vZHVsZU9wYWNpdHkgPiAwKSB7XG4gICAgICAgICAgY3R4LnNhdmUoKTtcbiAgICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBtb2R1bGVPcGFjaXR5O1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIEFwcGx5IHBlci1tb2R1bGUgY29sb3IgbW9kZVxuICAgICAgICAgIGxldCBmaW5hbE1vZHVsZUNvbG9yID0gbW9kdWxlQ29sb3I7XG4gICAgICAgICAgaWYgKGlzRGFyayAmJiBjb25maWcucGVyTW9kdWxlQ29sb3JNb2RlICYmIGNvbmZpZy5wZXJNb2R1bGVDb2xvck1vZGUgIT09ICdzb2xpZCcgJiYgb3ZlcmxheURhdGEpIHtcbiAgICAgICAgICAgIGZpbmFsTW9kdWxlQ29sb3IgPSB0aGlzLl9hcHBseVBlck1vZHVsZUNvbG9yKFxuICAgICAgICAgICAgICBjb25maWcucGVyTW9kdWxlQ29sb3JNb2RlLFxuICAgICAgICAgICAgICBtb2R1bGVDb2xvcixcbiAgICAgICAgICAgICAgb3ZlcmxheURhdGEsXG4gICAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBtb2R1bGVDb3VudCxcbiAgICAgICAgICAgICAgY29uZmlnXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAvLyBBcHBseSBwYWxldHRlIGNvbG9yaW5nIGlmIHBhbGV0dGUgaXMgcHJvdmlkZWRcbiAgICAgICAgICBjb25zdCBwYWxldHRlQnJpZ2h0bmVzcyA9IG92ZXJsYXlEYXRhPy5bcm93XT8uW2NvbF0gPz8gMC41O1xuICAgICAgICAgIGlmIChpc0RhcmsgJiYgY29uZmlnLnBhbGV0dGUgJiYgY29uZmlnLnBhbGV0dGUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZmluYWxNb2R1bGVDb2xvciA9IHRoaXMuX2FwcGx5UGFsZXR0ZUNvbG9yKHJvdywgY29sLCBtb2R1bGVDb3VudCwgcGFsZXR0ZUJyaWdodG5lc3MsIGNvbmZpZy5wYWxldHRlLCBjb25maWcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICAvLyBBcHBseSBjb250cmFzdCBndWFyZCBpZiBlbmFibGVkXG4gICAgICAgICAgaWYgKGlzRGFyayAmJiBjb25maWcuY29udHJhc3RHdWFyZCAmJiBjb25maWcubWluQ29udHJhc3RSYXRpbykge1xuICAgICAgICAgICAgZmluYWxNb2R1bGVDb2xvciA9IHRoaXMuX2Vuc3VyZUNvbnRyYXN0KFxuICAgICAgICAgICAgICBmaW5hbE1vZHVsZUNvbG9yLFxuICAgICAgICAgICAgICBjb25maWcuYmdDb2xvcixcbiAgICAgICAgICAgICAgY29uZmlnLm1pbkNvbnRyYXN0UmF0aW9cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIFxuICAgICAgICAgIC8vIFVzZSBncmFkaWVudCBmb3IgZGFyayBtb2R1bGVzIGlmIGNvbmZpZ3VyZWQsIG90aGVyd2lzZSB1c2UgbW9kdWxlIGNvbG9yXG4gICAgICAgICAgaWYgKGlzRGFyayAmJiB1c2VHcmFkaWVudCkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50RmlsbDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpbmFsTW9kdWxlQ29sb3I7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGV0IGdhcCA9IGNvbmZpZy5tb2R1bGVHYXBcbiAgICAgICAgICAgID8gKG1vZHVsZVNpemUgKiBjb25maWcubW9kdWxlR2FwKSAvIDEwMFxuICAgICAgICAgICAgOiAwO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIEFwcGx5IGdhcCBtb2RlXG4gICAgICAgICAgY29uc3QgZ2FwTW9kZSA9IGNvbmZpZy5nYXBNb2RlIHx8ICdub25lJztcbiAgICAgICAgICBsZXQgc3Ryb2tlV2lkdGggPSAwO1xuICAgICAgICAgIGlmIChnYXBNb2RlID09PSAnaW5zZXQnKSB7XG4gICAgICAgICAgICAvLyBJbnNldCBtb2RlOiBnYXAgaXMgYXBwbGllZCBhcyBpbnNldFxuICAgICAgICAgICAgZ2FwID0gTWF0aC5tYXgoZ2FwLCBtb2R1bGVTaXplICogMC4xKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGdhcE1vZGUgPT09ICdzdHJva2UnKSB7XG4gICAgICAgICAgICAvLyBTdHJva2UgbW9kZTogZHJhdyBvdXRsaW5lIGluc3RlYWQgb2YgZmlsbFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGggPSBNYXRoLm1heCgxLCBtb2R1bGVTaXplICogMC4xNSk7XG4gICAgICAgICAgICBnYXAgPSBzdHJva2VXaWR0aDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGdhcE1vZGUgPT09ICduZWdhdGl2ZV9zcGFjZScpIHtcbiAgICAgICAgICAgIC8vIE5lZ2F0aXZlIHNwYWNlOiBsYXJnZXIgZ2FwcyBmb3IgYXJ0aXN0aWMgZWZmZWN0XG4gICAgICAgICAgICBnYXAgPSBNYXRoLm1heChnYXAsIG1vZHVsZVNpemUgKiAwLjIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBhZGp1c3RlZFNpemUgPSAobW9kdWxlU2l6ZSAtIGdhcCkgKiBtb2R1bGVTaXplTW9kaWZpZXI7XG4gICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gKG1vZHVsZVNpemUgLSBhZGp1c3RlZFNpemUpIC8gMjtcblxuICAgICAgICAgIGxldCBkcmF3WCA9IHggKyBvZmZzZXQgKyB3YXZlT2Zmc2V0WDtcbiAgICAgICAgICBsZXQgZHJhd1kgPSB5ICsgb2Zmc2V0ICsgd2F2ZU9mZnNldFk7XG4gICAgICAgICAgXG4gICAgICAgICAgLy8gQXBwbHkgcGl4ZWwgc25hcCBpZiBjb25maWd1cmVkXG4gICAgICAgICAgY29uc3QgcGl4ZWxTbmFwID0gY29uZmlnLnBpeGVsU25hcCB8fCAnZmxvb3InO1xuICAgICAgICAgIGlmIChwaXhlbFNuYXAgPT09ICdmbG9vcicpIHtcbiAgICAgICAgICAgIGRyYXdYID0gTWF0aC5mbG9vcihkcmF3WCk7XG4gICAgICAgICAgICBkcmF3WSA9IE1hdGguZmxvb3IoZHJhd1kpO1xuICAgICAgICAgIH0gZWxzZSBpZiAocGl4ZWxTbmFwID09PSAncm91bmQnKSB7XG4gICAgICAgICAgICBkcmF3WCA9IE1hdGgucm91bmQoZHJhd1gpO1xuICAgICAgICAgICAgZHJhd1kgPSBNYXRoLnJvdW5kKGRyYXdZKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBpeGVsU25hcCA9PT0gJ2NlaWwnKSB7XG4gICAgICAgICAgICBkcmF3WCA9IE1hdGguY2VpbChkcmF3WCk7XG4gICAgICAgICAgICBkcmF3WSA9IE1hdGguY2VpbChkcmF3WSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGRyYXdPdXRsaW5lT25seSB8fCAoZ2FwTW9kZSA9PT0gJ3N0cm9rZScgJiYgaXNEYXJrKSkge1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gZmluYWxNb2R1bGVDb2xvcjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdHJva2VXaWR0aCB8fCAxO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoZHJhd1ggKyBjdHgubGluZVdpZHRoLzIsIGRyYXdZICsgY3R4LmxpbmVXaWR0aC8yLCBhZGp1c3RlZFNpemUgLSBjdHgubGluZVdpZHRoLCBhZGp1c3RlZFNpemUgLSBjdHgubGluZVdpZHRoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHVzZUhhbGZ0b25lUmVuZGVyaW5nICYmIGlzRGFyaykge1xuICAgICAgICAgICAgLy8gVXNlIGFkdmFuY2VkIGhhbGZ0b25lIHJlbmRlcmluZyB3aXRoIGh0RG90L2h0Q3VydmUgcGFyYW1zXG4gICAgICAgICAgICB0aGlzLl9kcmF3SGFsZnRvbmVNb2R1bGUoY3R4LCBkcmF3WCwgZHJhd1ksIGFkanVzdGVkU2l6ZSwgaGFsZnRvbmVCcmlnaHRuZXNzLCBjb25maWcpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoaXNUaW1pbmcpIHtcbiAgICAgICAgICAgIC8vIERyYXcgdGltaW5nIHBhdHRlcm4gbW9kdWxlIHdpdGggdGltaW5nIHN0eWxlXG4gICAgICAgICAgICB0aGlzLmRyYXdUaW1pbmdNb2R1bGUoY3R4LCBkcmF3WCwgZHJhd1ksIGFkanVzdGVkU2l6ZSwgdGltaW5nU3R5bGUsIGNvbmZpZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHJhd01vZHVsZShcbiAgICAgICAgICAgICAgY3R4LFxuICAgICAgICAgICAgICBkcmF3WCxcbiAgICAgICAgICAgICAgZHJhd1ksXG4gICAgICAgICAgICAgIGFkanVzdGVkU2l6ZSxcbiAgICAgICAgICAgICAgY29uZmlnLm1vZHVsZVN0eWxlLFxuICAgICAgICAgICAgICB7IGNvcm5lclJhZGl1cywgcm90YXRpb246IGRvdFJvdGF0aW9uIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERyYXcgY2VudGVyIGxvZ28gaWYgaW4gY2VudGVyIG1vZGVcbiAgICBpZiAocHJvY2Vzc2VkT3ZlcmxheUNhbnZhcyAmJiBjb25maWcub3ZlcmxheU1vZGUgPT09IFwiY2VudGVyXCIpIHtcbiAgICAgIHRoaXMuZHJhd0NlbnRlckxvZ28oY3R4LCBwcm9jZXNzZWRPdmVybGF5Q2FudmFzLCBzaXplLCBjb25maWcubG9nb1NpemUpO1xuICAgIH1cblxuICAgIC8vIERyYXcgZnJhbWUgaWYgY29uZmlndXJlZFxuICAgIHRoaXMuZHJhd0ZyYW1lKGN0eCwgc2l6ZSwgbW9kdWxlU2l6ZSwgbWFyZ2luLCBjb25maWcpO1xuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxuXG4gIGNhbGN1bGF0ZU9wdGltYWxWZXJzaW9uKGNvbnRlbnQsIGVycm9yQ29ycmVjdGlvbikge1xuICAgIGNvbnN0IGNhcGFjaXRpZXMgPSB7XG4gICAgICBMOiBbXG4gICAgICAgIDE3LCAzMiwgNTMsIDc4LCAxMDYsIDEzNCwgMTU0LCAxOTIsIDIzMCwgMjcxLCAzMjEsIDM2NywgNDI1LCA0NTgsIDUyMCxcbiAgICAgICAgNTg2LCA2NDQsIDcxOCwgNzkyLCA4NTgsIDkyOSwgMTAwMywgMTA5MSwgMTE3MSwgMTI3MywgMTM2NywgMTQ2NSwgMTUyOCxcbiAgICAgICAgMTYyOCwgMTczMiwgMTg0MCwgMTk1MiwgMjA2OCwgMjE4OCwgMjMwMywgMjQzMSwgMjU2MywgMjY5OSwgMjgwOSwgMjk1MyxcbiAgICAgIF0sXG4gICAgICBNOiBbXG4gICAgICAgIDE0LCAyNiwgNDIsIDYyLCA4NCwgMTA2LCAxMjIsIDE1MiwgMTgwLCAyMTMsIDI1MSwgMjg3LCAzMzEsIDM2MiwgNDEyLFxuICAgICAgICA0NTAsIDUwNCwgNTYwLCA2MjQsIDY2NiwgNzExLCA3NzksIDg1NywgOTExLCA5OTcsIDEwNTksIDExMjUsIDExOTAsXG4gICAgICAgIDEyNjQsIDEzNzAsIDE0NTIsIDE1MzgsIDE2MjgsIDE3MjIsIDE4MDksIDE5MTEsIDE5ODksIDIwOTksIDIyMTMsIDIzMzEsXG4gICAgICBdLFxuICAgICAgUTogW1xuICAgICAgICAxMSwgMjAsIDMyLCA0NiwgNjAsIDc0LCA4NiwgMTA4LCAxMzAsIDE1MSwgMTc3LCAyMDMsIDI0MSwgMjU4LCAyOTIsIDMyMixcbiAgICAgICAgMzY0LCAzOTQsIDQ0MiwgNDgyLCA1MDksIDU2NSwgNjExLCA2NjEsIDcxNSwgNzUxLCA4MDUsIDg2OCwgOTA4LCA5ODIsXG4gICAgICAgIDEwMzAsIDExMTIsIDExNjgsIDEyMjgsIDEyODMsIDEzNTEsIDE0MjMsIDE0OTksIDE1NzksIDE2NjMsXG4gICAgICBdLFxuICAgICAgSDogW1xuICAgICAgICA3LCAxNCwgMjQsIDM0LCA0NCwgNTgsIDY0LCA4NCwgOTgsIDExOSwgMTM3LCAxNTUsIDE3NywgMTk0LCAyMjAsIDI1MCxcbiAgICAgICAgMjgwLCAzMTAsIDMzOCwgMzgyLCA0MDMsIDQzOSwgNDYxLCA1MTEsIDUzNSwgNTkzLCA2MjUsIDY1OCwgNjk4LCA3NDIsXG4gICAgICAgIDc5MCwgODQyLCA4OTgsIDk1OCwgOTgzLCAxMDUxLCAxMDkzLCAxMTM5LCAxMjE5LCAxMjczLFxuICAgICAgXSxcbiAgICB9O1xuXG4gICAgY29uc3QgY2FwcyA9IGNhcGFjaXRpZXNbZXJyb3JDb3JyZWN0aW9uXSB8fCBjYXBhY2l0aWVzW1wiUVwiXTtcbiAgICBjb25zdCBsZW4gPSBjb250ZW50Lmxlbmd0aDtcblxuICAgIGZvciAobGV0IHYgPSAwOyB2IDwgY2Fwcy5sZW5ndGg7IHYrKykge1xuICAgICAgaWYgKGNhcHNbdl0gPj0gbGVuKSB7XG4gICAgICAgIHJldHVybiB2ICsgMTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gNDA7XG4gIH1cblxuICBpc0ZpbmRlclBhdHRlcm4ocm93LCBjb2wsIG1vZHVsZUNvdW50KSB7XG4gICAgaWYgKHJvdyA8IDcgJiYgY29sIDwgNykgcmV0dXJuIHRydWU7XG4gICAgaWYgKHJvdyA8IDcgJiYgY29sID49IG1vZHVsZUNvdW50IC0gNykgcmV0dXJuIHRydWU7XG4gICAgaWYgKHJvdyA+PSBtb2R1bGVDb3VudCAtIDcgJiYgY29sIDwgNykgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgbW9kdWxlIGlzIHBhcnQgb2YgYSB0aW1pbmcgcGF0dGVyblxuICAgKi9cbiAgaXNUaW1pbmdQYXR0ZXJuKHJvdywgY29sLCBtb2R1bGVDb3VudCkge1xuICAgIC8vIEhvcml6b250YWwgdGltaW5nIHBhdHRlcm4gKHJvdyA2LCBiZXR3ZWVuIGZpbmRlcnMpXG4gICAgaWYgKHJvdyA9PT0gNiAmJiBjb2wgPj0gOCAmJiBjb2wgPCBtb2R1bGVDb3VudCAtIDgpIHJldHVybiB0cnVlO1xuICAgIC8vIFZlcnRpY2FsIHRpbWluZyBwYXR0ZXJuIChjb2wgNiwgYmV0d2VlbiBmaW5kZXJzKVxuICAgIGlmIChjb2wgPT09IDYgJiYgcm93ID49IDggJiYgcm93IDwgbW9kdWxlQ291bnQgLSA4KSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBtb2R1bGUgaXMgcGFydCBvZiBhbiBhbGlnbm1lbnQgcGF0dGVyblxuICAgKi9cbiAgaXNBbGlnbm1lbnRQYXR0ZXJuKHJvdywgY29sLCBtb2R1bGVDb3VudCwgdmVyc2lvbikge1xuICAgIGlmICh2ZXJzaW9uIDwgMikgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IHRoaXMuZ2V0QWxpZ25tZW50UG9zaXRpb25zKHZlcnNpb24sIG1vZHVsZUNvdW50KTtcbiAgICBmb3IgKGNvbnN0IHBvcyBvZiBwb3NpdGlvbnMpIHtcbiAgICAgIGlmIChNYXRoLmFicyhyb3cgLSBwb3Mucm93KSA8PSAyICYmIE1hdGguYWJzKGNvbCAtIHBvcy5jb2wpIDw9IDIpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhIG1vZHVsZSBpcyBwYXJ0IG9mIGZvcm1hdCBpbmZvcm1hdGlvbiBhcmVhXG4gICAqL1xuICBpc0Zvcm1hdEluZm8ocm93LCBjb2wsIG1vZHVsZUNvdW50KSB7XG4gICAgLy8gRm9ybWF0IGluZm8gaXMgYXJvdW5kIGZpbmRlciBwYXR0ZXJuc1xuICAgIC8vIEhvcml6b250YWw6IHJvdyA4LCBjb2xzIDAtOCBhbmQgbW9kdWxlQ291bnQtOCB0byBtb2R1bGVDb3VudC0xXG4gICAgLy8gVmVydGljYWw6IGNvbCA4LCByb3dzIDAtOCBhbmQgbW9kdWxlQ291bnQtNyB0byBtb2R1bGVDb3VudC0xXG4gICAgaWYgKHJvdyA9PT0gOCAmJiAoY29sIDw9IDggfHwgY29sID49IG1vZHVsZUNvdW50IC0gOCkpIHJldHVybiB0cnVlO1xuICAgIGlmIChjb2wgPT09IDggJiYgKHJvdyA8PSA4IHx8IHJvdyA+PSBtb2R1bGVDb3VudCAtIDcpKSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBtb2R1bGUgaXMgcGFydCBvZiB2ZXJzaW9uIGluZm9ybWF0aW9uIGFyZWEgKHZlcnNpb24gNyspXG4gICAqL1xuICBpc1ZlcnNpb25JbmZvKHJvdywgY29sLCBtb2R1bGVDb3VudCwgdmVyc2lvbikge1xuICAgIGlmICh2ZXJzaW9uIDwgNykgcmV0dXJuIGZhbHNlO1xuICAgIC8vIFZlcnNpb24gaW5mbyBpcyBpbiB0d28gNngzIGJsb2Nrc1xuICAgIC8vIEJvdHRvbS1sZWZ0OiByb3dzIG1vZHVsZUNvdW50LTExIHRvIG1vZHVsZUNvdW50LTksIGNvbHMgMC01XG4gICAgLy8gVG9wLXJpZ2h0OiByb3dzIDAtNSwgY29scyBtb2R1bGVDb3VudC0xMSB0byBtb2R1bGVDb3VudC05XG4gICAgaWYgKHJvdyA+PSBtb2R1bGVDb3VudCAtIDExICYmIHJvdyA8PSBtb2R1bGVDb3VudCAtIDkgJiYgY29sIDw9IDUpIHJldHVybiB0cnVlO1xuICAgIGlmIChjb2wgPj0gbW9kdWxlQ291bnQgLSAxMSAmJiBjb2wgPD0gbW9kdWxlQ291bnQgLSA5ICYmIHJvdyA8PSA1KSByZXR1cm4gdHJ1ZTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjZW50ZXIgcG9zaXRpb24gb2YgYW4gYWxpZ25tZW50IHBhdHRlcm4gaWYgdGhpcyBtb2R1bGUgaXMgcGFydCBvZiBvbmVcbiAgICovXG4gIGdldEFsaWdubWVudENlbnRlcihyb3csIGNvbCwgbW9kdWxlQ291bnQsIHZlcnNpb24pIHtcbiAgICBpZiAodmVyc2lvbiA8IDIpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IHBvc2l0aW9ucyA9IHRoaXMuZ2V0QWxpZ25tZW50UG9zaXRpb25zKHZlcnNpb24sIG1vZHVsZUNvdW50KTtcbiAgICBmb3IgKGNvbnN0IHBvcyBvZiBwb3NpdGlvbnMpIHtcbiAgICAgIGlmIChNYXRoLmFicyhyb3cgLSBwb3Mucm93KSA8PSAyICYmIE1hdGguYWJzKGNvbCAtIHBvcy5jb2wpIDw9IDIpIHtcbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBtb2R1bGUgaXMgYSBzdHJ1Y3R1cmFsIGVsZW1lbnQgdGhhdCBjYW5ub3QgYmUgbW9kaWZpZWRcbiAgICovXG4gIGlzU3RydWN0dXJhbE1vZHVsZShyb3csIGNvbCwgbW9kdWxlQ291bnQsIHZlcnNpb24pIHtcbiAgICAvLyBGaW5kZXIgcGF0dGVybnMgKyBzZXBhcmF0b3JzXG4gICAgaWYgKHJvdyA8IDggJiYgY29sIDwgOCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHJvdyA8IDggJiYgY29sID49IG1vZHVsZUNvdW50IC0gOCkgcmV0dXJuIHRydWU7XG4gICAgaWYgKHJvdyA+PSBtb2R1bGVDb3VudCAtIDggJiYgY29sIDwgOCkgcmV0dXJuIHRydWU7XG4gICAgLy8gVGltaW5nIHBhdHRlcm5zXG4gICAgaWYgKHJvdyA9PT0gNiB8fCBjb2wgPT09IDYpIHJldHVybiB0cnVlO1xuICAgIC8vIEZvcm1hdCBpbmZvcm1hdGlvblxuICAgIGlmIChyb3cgPT09IDggJiYgY29sIDwgOSkgcmV0dXJuIHRydWU7XG4gICAgaWYgKGNvbCA9PT0gOCAmJiByb3cgPCA5KSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAocm93ID09PSA4ICYmIGNvbCA+PSBtb2R1bGVDb3VudCAtIDgpIHJldHVybiB0cnVlO1xuICAgIGlmIChjb2wgPT09IDggJiYgcm93ID49IG1vZHVsZUNvdW50IC0gOCkgcmV0dXJuIHRydWU7XG4gICAgLy8gRGFyayBtb2R1bGVcbiAgICBpZiAocm93ID09PSBtb2R1bGVDb3VudCAtIDggJiYgY29sID09PSA4KSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBWZXJzaW9uIGluZm8gKHZlcnNpb24gNyspXG4gICAgaWYgKHZlcnNpb24gPj0gNykge1xuICAgICAgaWYgKHJvdyA+PSBtb2R1bGVDb3VudCAtIDExICYmIHJvdyA8IG1vZHVsZUNvdW50IC0gOCAmJiBjb2wgPCA2KVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChjb2wgPj0gbW9kdWxlQ291bnQgLSAxMSAmJiBjb2wgPCBtb2R1bGVDb3VudCAtIDggJiYgcm93IDwgNilcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIEFsaWdubWVudCBwYXR0ZXJucyAodmVyc2lvbiAyKylcbiAgICBpZiAodmVyc2lvbiA+PSAyKSB7XG4gICAgICBjb25zdCBwb3NpdGlvbnMgPSB0aGlzLmdldEFsaWdubWVudFBvc2l0aW9ucyh2ZXJzaW9uLCBtb2R1bGVDb3VudCk7XG4gICAgICBmb3IgKGNvbnN0IHBvcyBvZiBwb3NpdGlvbnMpIHtcbiAgICAgICAgaWYgKE1hdGguYWJzKHJvdyAtIHBvcy5yb3cpIDw9IDIgJiYgTWF0aC5hYnMoY29sIC0gcG9zLmNvbCkgPD0gMilcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZ2V0QWxpZ25tZW50UG9zaXRpb25zKHZlcnNpb24sIG1vZHVsZUNvdW50KSB7XG4gICAgaWYgKHZlcnNpb24gPCAyKSByZXR1cm4gW107XG4gICAgY29uc3QgdGFibGUgPSB7XG4gICAgICAyOiBbNiwgMThdLFxuICAgICAgMzogWzYsIDIyXSxcbiAgICAgIDQ6IFs2LCAyNl0sXG4gICAgICA1OiBbNiwgMzBdLFxuICAgICAgNjogWzYsIDM0XSxcbiAgICAgIDc6IFs2LCAyMiwgMzhdLFxuICAgICAgODogWzYsIDI0LCA0Ml0sXG4gICAgICA5OiBbNiwgMjYsIDQ2XSxcbiAgICAgIDEwOiBbNiwgMjgsIDUwXSxcbiAgICAgIDExOiBbNiwgMzAsIDU0XSxcbiAgICAgIDEyOiBbNiwgMzIsIDU4XSxcbiAgICAgIDEzOiBbNiwgMzQsIDYyXSxcbiAgICAgIDE0OiBbNiwgMjYsIDQ2LCA2Nl0sXG4gICAgICAxNTogWzYsIDI2LCA0OCwgNzBdLFxuICAgICAgMTY6IFs2LCAyNiwgNTAsIDc0XSxcbiAgICAgIDE3OiBbNiwgMzAsIDU0LCA3OF0sXG4gICAgICAxODogWzYsIDMwLCA1NiwgODJdLFxuICAgICAgMTk6IFs2LCAzMCwgNTgsIDg2XSxcbiAgICAgIDIwOiBbNiwgMzQsIDYyLCA5MF0sXG4gICAgICAyMTogWzYsIDI4LCA1MCwgNzIsIDk0XSxcbiAgICAgIDIyOiBbNiwgMjYsIDUwLCA3NCwgOThdLFxuICAgICAgMjM6IFs2LCAzMCwgNTQsIDc4LCAxMDJdLFxuICAgICAgMjQ6IFs2LCAyOCwgNTQsIDgwLCAxMDZdLFxuICAgICAgMjU6IFs2LCAzMiwgNTgsIDg0LCAxMTBdLFxuICAgICAgMjY6IFs2LCAzMCwgNTgsIDg2LCAxMTRdLFxuICAgICAgMjc6IFs2LCAzNCwgNjIsIDkwLCAxMThdLFxuICAgICAgMjg6IFs2LCAyNiwgNTAsIDc0LCA5OCwgMTIyXSxcbiAgICAgIDI5OiBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjZdLFxuICAgICAgMzA6IFs2LCAyNiwgNTIsIDc4LCAxMDQsIDEzMF0sXG4gICAgICAzMTogWzYsIDMwLCA1NiwgODIsIDEwOCwgMTM0XSxcbiAgICAgIDMyOiBbNiwgMzQsIDYwLCA4NiwgMTEyLCAxMzhdLFxuICAgICAgMzM6IFs2LCAzMCwgNTgsIDg2LCAxMTQsIDE0Ml0sXG4gICAgICAzNDogWzYsIDM0LCA2MiwgOTAsIDExOCwgMTQ2XSxcbiAgICAgIDM1OiBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjYsIDE1MF0sXG4gICAgICAzNjogWzYsIDI0LCA1MCwgNzYsIDEwMiwgMTI4LCAxNTRdLFxuICAgICAgMzc6IFs2LCAyOCwgNTQsIDgwLCAxMDYsIDEzMiwgMTU4XSxcbiAgICAgIDM4OiBbNiwgMzIsIDU4LCA4NCwgMTEwLCAxMzYsIDE2Ml0sXG4gICAgICAzOTogWzYsIDI2LCA1NCwgODIsIDExMCwgMTM4LCAxNjZdLFxuICAgICAgNDA6IFs2LCAzMCwgNTgsIDg2LCAxMTQsIDE0MiwgMTcwXSxcbiAgICB9O1xuICAgIGNvbnN0IGNvb3JkcyA9IHRhYmxlW3ZlcnNpb25dIHx8IFs2XTtcbiAgICBjb25zdCBwb3NpdGlvbnMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHIgb2YgY29vcmRzKSB7XG4gICAgICBmb3IgKGNvbnN0IGMgb2YgY29vcmRzKSB7XG4gICAgICAgIGlmIChyIDwgOCAmJiBjIDwgOCkgY29udGludWU7XG4gICAgICAgIGlmIChyIDwgOCAmJiBjID4gbW9kdWxlQ291bnQgLSA5KSBjb250aW51ZTtcbiAgICAgICAgaWYgKHIgPiBtb2R1bGVDb3VudCAtIDkgJiYgYyA8IDgpIGNvbnRpbnVlO1xuICAgICAgICBwb3NpdGlvbnMucHVzaCh7IHJvdzogciwgY29sOiBjIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcG9zaXRpb25zO1xuICB9XG5cbiAgYXBwbHlUcnVlRGl0aGVyKHFyLCBvdmVybGF5RGF0YSwgY29uZmlnLCBleHRyZW1lTW9kZSA9IGZhbHNlKSB7XG4gICAgY29uc3QgbW9kdWxlQ291bnQgPSBxci5nZXRNb2R1bGVDb3VudCgpO1xuICAgIGNvbnN0IHZlcnNpb24gPSBjb25maWcudHlwZU51bWJlciB8fCBNYXRoLmNlaWwoKG1vZHVsZUNvdW50IC0gMTcpIC8gNCk7XG4gICAgXG4gICAgLy8gRUNDLWF3YXJlIG1vZGUgdHJhY2tpbmdcbiAgICBjb25zdCBlY2NBd2FyZSA9IGNvbmZpZy5lY2NBd2FyZUVuYWJsZWQgPT09IHRydWU7XG4gICAgbGV0IHRvdGFsTW9kaWZpZWRDb3VudCA9IDA7XG5cbiAgICAvLyBDcmVhdGUgbW9kaWZpYWJsZSBwYXR0ZXJuIC0gc3RhcnQgd2l0aCBvcmlnaW5hbCBRUlxuICAgIGNvbnN0IG1vZGlmaWVkUGF0dGVybiA9IFtdO1xuXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdysrKSB7XG4gICAgICBtb2RpZmllZFBhdHRlcm5bcm93XSA9IFtdO1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgIG1vZGlmaWVkUGF0dGVybltyb3ddW2NvbF0gPSBxci5pc0Rhcmsocm93LCBjb2wpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvdW50IHRvdGFsIGRhdGEgbW9kdWxlcyBmb3IgRUNDIGJ1ZGdldCBjYWxjdWxhdGlvblxuICAgIGxldCB0b3RhbERhdGFNb2R1bGVzID0gMDtcbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50OyBjb2wrKykge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdHJ1Y3R1cmFsTW9kdWxlKHJvdywgY29sLCBtb2R1bGVDb3VudCwgdmVyc2lvbikpIHtcbiAgICAgICAgICB0b3RhbERhdGFNb2R1bGVzKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbiBleHRyZW1lIG1vZGUsIGZsaXAgQUxMIG5vbi1maW5kZXIgbW9kdWxlcyB0byBtYXRjaCBpbWFnZVxuICAgIC8vIEluIG5vcm1hbCBkaXRoZXIgbW9kZSwgcmVzcGVjdCBlcnJvciBjb3JyZWN0aW9uIGxpbWl0c1xuICAgIGlmIChleHRyZW1lTW9kZSkge1xuICAgICAgLy8gRXh0cmVtZTogZmxpcCBldmVyeXRoaW5nIGV4Y2VwdCBmaW5kZXIgcGF0dGVybnNcbiAgICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sKyspIHtcbiAgICAgICAgICAvLyBPbmx5IHByb3RlY3QgZmluZGVyIHBhdHRlcm5zIChjb3JuZXJzKVxuICAgICAgICAgIGlmICh0aGlzLmlzRmluZGVyUGF0dGVybihyb3csIGNvbCwgbW9kdWxlQ291bnQpKSBjb250aW51ZTtcblxuICAgICAgICAgIGNvbnN0IGJyaWdodG5lc3MgPSBvdmVybGF5RGF0YVtyb3ddPy5bY29sXSA/PyAwLjU7XG4gICAgICAgICAgY29uc3QgaW50ZW5zaXR5ID0gY29uZmlnLm92ZXJsYXlJbnRlbnNpdHkgLyAxMDA7XG5cbiAgICAgICAgICAvLyBEZXNpcmVkIHN0YXRlIGJhc2VkIG9uIGltYWdlXG4gICAgICAgICAgY29uc3QgZGVzaXJlZERhcmsgPSBicmlnaHRuZXNzIDwgMC41O1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIEVDQy1hd2FyZSBjaGVja1xuICAgICAgICAgIGlmIChlY2NBd2FyZSAmJiBkZXNpcmVkRGFyayAhPT0gbW9kaWZpZWRQYXR0ZXJuW3Jvd11bY29sXSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9pc0VjY1NhZmVUb01vZGlmeShyb3csIGNvbCwgbW9kdWxlQ291bnQsIHZlcnNpb24sIGNvbmZpZywgdG90YWxNb2RpZmllZENvdW50LCB0b3RhbERhdGFNb2R1bGVzKSkge1xuICAgICAgICAgICAgICBjb250aW51ZTsgLy8gU2tpcCB0aGlzIG1vZGlmaWNhdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG90YWxNb2RpZmllZENvdW50Kys7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQXBwbHkgd2l0aCBpbnRlbnNpdHkgYmxlbmRcbiAgICAgICAgICBpZiAoaW50ZW5zaXR5ID49IDEgfHwgTWF0aC5yYW5kb20oKSA8IGludGVuc2l0eSkge1xuICAgICAgICAgICAgbW9kaWZpZWRQYXR0ZXJuW3Jvd11bY29sXSA9IGRlc2lyZWREYXJrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTYWZlIGRpdGhlcjogcmVzcGVjdCBlcnJvciBjb3JyZWN0aW9uIGxpbWl0c1xuICAgICAgY29uc3QgZWNDYXBhY2l0eSA9IHsgTDogMC4wNywgTTogMC4xNSwgUTogMC4yNSwgSDogMC4zIH07XG4gICAgICBjb25zdCBtYXhGbGlwUmF0aW8gPSBlY0NhcGFjaXR5W2NvbmZpZy5lcnJvckNvcnJlY3Rpb25dIHx8IDAuMjU7XG4gICAgICBjb25zdCBpbnRlbnNpdHkgPSBjb25maWcub3ZlcmxheUludGVuc2l0eSAvIDEwMDtcblxuICAgICAgbGV0IHRvdGFsRGF0YU1vZHVsZXMgPSAwO1xuICAgICAgY29uc3QgZmxpcENhbmRpZGF0ZXMgPSBbXTtcblxuICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdysrKSB7XG4gICAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50OyBjb2wrKykge1xuICAgICAgICAgIGlmICh0aGlzLmlzU3RydWN0dXJhbE1vZHVsZShyb3csIGNvbCwgbW9kdWxlQ291bnQsIHZlcnNpb24pKSBjb250aW51ZTtcbiAgICAgICAgICB0b3RhbERhdGFNb2R1bGVzKys7XG5cbiAgICAgICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSBxci5pc0Rhcmsocm93LCBjb2wpO1xuICAgICAgICAgIGNvbnN0IGJyaWdodG5lc3MgPSBvdmVybGF5RGF0YVtyb3ddPy5bY29sXSA/PyAwLjU7XG4gICAgICAgICAgY29uc3QgZGVzaXJlZFN0YXRlID0gYnJpZ2h0bmVzcyA8IDAuNTtcblxuICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUgIT09IGRlc2lyZWRTdGF0ZSkge1xuICAgICAgICAgICAgZmxpcENhbmRpZGF0ZXMucHVzaCh7XG4gICAgICAgICAgICAgIHJvdyxcbiAgICAgICAgICAgICAgY29sLFxuICAgICAgICAgICAgICBzY29yZTogTWF0aC5hYnMoYnJpZ2h0bmVzcyAtIDAuNSksXG4gICAgICAgICAgICAgIGRlc2lyZWRTdGF0ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTb3J0IGJ5IHZpc3VhbCBpbXBvcnRhbmNlIGFuZCBmbGlwIHVwIHRvIGxpbWl0XG4gICAgICBmbGlwQ2FuZGlkYXRlcy5zb3J0KChhLCBiKSA9PiBiLnNjb3JlIC0gYS5zY29yZSk7XG4gICAgICBjb25zdCBtYXhGbGlwcyA9IE1hdGguZmxvb3IodG90YWxEYXRhTW9kdWxlcyAqIG1heEZsaXBSYXRpbyAqIGludGVuc2l0eSk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgTWF0aC5taW4oZmxpcENhbmRpZGF0ZXMubGVuZ3RoLCBtYXhGbGlwcyk7IGkrKykge1xuICAgICAgICBjb25zdCBjID0gZmxpcENhbmRpZGF0ZXNbaV07XG4gICAgICAgIG1vZGlmaWVkUGF0dGVybltjLnJvd11bYy5jb2xdID0gYy5kZXNpcmVkU3RhdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZGlmaWVkUGF0dGVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGEgc2luZ2xlIG1vZHVsZSB3aXRoIHN1cHBvcnQgZm9yIHN0eWxlLCBjb3JuZXIgcmFkaXVzLCBhbmQgcm90YXRpb25cbiAgICovXG4gIGRyYXdNb2R1bGUoY3R4LCB4LCB5LCBzaXplLCBzdHlsZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgeyBjb3JuZXJSYWRpdXMgPSAwLCByb3RhdGlvbiA9IDAgfSA9IG9wdGlvbnM7XG4gICAgY29uc3QgcGFkZGluZyA9IHNpemUgKiAwLjA1O1xuICAgIGNvbnN0IGlubmVyU2l6ZSA9IHNpemUgLSBwYWRkaW5nICogMjtcbiAgICBcbiAgICAvLyBDYWxjdWxhdGUgY29ybmVyIHJhZGl1cyBiYXNlZCBvbiBwZXJjZW50YWdlXG4gICAgY29uc3QgcmFkaXVzUGVyY2VudCA9IGNvcm5lclJhZGl1cyAvIDEwMDtcbiAgICBjb25zdCBtYXhSYWRpdXMgPSBpbm5lclNpemUgLyAyO1xuICAgIGNvbnN0IGFjdHVhbFJhZGl1cyA9IG1heFJhZGl1cyAqIHJhZGl1c1BlcmNlbnQ7XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIFxuICAgIC8vIEFwcGx5IHJvdGF0aW9uIGFyb3VuZCBjZW50ZXIgaWYgc3BlY2lmaWVkXG4gICAgaWYgKHJvdGF0aW9uICE9PSAwKSB7XG4gICAgICBjb25zdCBjZW50ZXJYID0geCArIHNpemUgLyAyO1xuICAgICAgY29uc3QgY2VudGVyWSA9IHkgKyBzaXplIC8gMjtcbiAgICAgIGN0eC50cmFuc2xhdGUoY2VudGVyWCwgY2VudGVyWSk7XG4gICAgICBjdHgucm90YXRlKChyb3RhdGlvbiAqIE1hdGguUEkpIC8gMTgwKTtcbiAgICAgIGN0eC50cmFuc2xhdGUoLWNlbnRlclgsIC1jZW50ZXJZKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlIFwicm91bmRlZFwiOlxuICAgICAgICAvLyBVc2UgY29ybmVyUmFkaXVzIGlmIHNwZWNpZmllZCwgb3RoZXJ3aXNlIGRlZmF1bHQgcm91bmRlZFxuICAgICAgICBjb25zdCByb3VuZGVkUmFkaXVzID0gYWN0dWFsUmFkaXVzID4gMCA/IGFjdHVhbFJhZGl1cyA6IHNpemUgKiAwLjM7XG4gICAgICAgIHRoaXMucm91bmRSZWN0KFxuICAgICAgICAgIGN0eCxcbiAgICAgICAgICB4ICsgcGFkZGluZyxcbiAgICAgICAgICB5ICsgcGFkZGluZyxcbiAgICAgICAgICBpbm5lclNpemUsXG4gICAgICAgICAgaW5uZXJTaXplLFxuICAgICAgICAgIHJvdW5kZWRSYWRpdXMsXG4gICAgICAgICk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiZG90c1wiOlxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5hcmMoeCArIHNpemUgLyAyLCB5ICsgc2l6ZSAvIDIsIGlubmVyU2l6ZSAvIDIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJkaWFtb25kXCI6XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyh4ICsgc2l6ZSAvIDIsIHkgKyBwYWRkaW5nKTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgc2l6ZSAtIHBhZGRpbmcsIHkgKyBzaXplIC8gMik7XG4gICAgICAgIGN0eC5saW5lVG8oeCArIHNpemUgLyAyLCB5ICsgc2l6ZSAtIHBhZGRpbmcpO1xuICAgICAgICBjdHgubGluZVRvKHggKyBwYWRkaW5nLCB5ICsgc2l6ZSAvIDIpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiY29ubmVjdGVkXCI6XG4gICAgICAgIC8vIERyYXcgZnVsbCByZWN0YW5nbGUgd2l0aCBubyBnYXBzIGZvciBjb25uZWN0ZWQgbG9va1xuICAgICAgICBpZiAoYWN0dWFsUmFkaXVzID4gMCkge1xuICAgICAgICAgIHRoaXMucm91bmRSZWN0KGN0eCwgeCwgeSwgc2l6ZSwgc2l6ZSwgYWN0dWFsUmFkaXVzKTtcbiAgICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCBzaXplLCBzaXplKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcInNxdWFyZVwiOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGFjdHVhbFJhZGl1cyA+IDApIHtcbiAgICAgICAgICB0aGlzLnJvdW5kUmVjdChjdHgsIHggKyBwYWRkaW5nLCB5ICsgcGFkZGluZywgaW5uZXJTaXplLCBpbm5lclNpemUsIGFjdHVhbFJhZGl1cyk7XG4gICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdHguZmlsbFJlY3QoeCArIHBhZGRpbmcsIHkgKyBwYWRkaW5nLCBpbm5lclNpemUsIGlubmVyU2l6ZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhIHNpbmdsZSBmaW5kZXIgcGF0dGVybiBtb2R1bGVcbiAgICovXG4gIGRyYXdGaW5kZXJNb2R1bGUoY3R4LCB4LCB5LCBzaXplLCBzdHlsZSwgY29ybmVyUmFkaXVzID0gMCkge1xuICAgIGNvbnN0IHJhZGl1c1BlcmNlbnQgPSBjb3JuZXJSYWRpdXMgLyAxMDA7XG4gICAgY29uc3QgbWF4UmFkaXVzID0gc2l6ZSAvIDI7XG4gICAgY29uc3QgYWN0dWFsUmFkaXVzID0gbWF4UmFkaXVzICogcmFkaXVzUGVyY2VudDtcbiAgICBcbiAgICBzd2l0Y2ggKHN0eWxlKSB7XG4gICAgICBjYXNlIFwicm91bmRlZFwiOlxuICAgICAgICBjb25zdCByb3VuZGVkUmFkaXVzID0gYWN0dWFsUmFkaXVzID4gMCA/IGFjdHVhbFJhZGl1cyA6IHNpemUgKiAwLjI7XG4gICAgICAgIHRoaXMucm91bmRSZWN0KGN0eCwgeCwgeSwgc2l6ZSwgc2l6ZSwgcm91bmRlZFJhZGl1cyk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwiY2lyY2xlXCI6XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyh4ICsgc2l6ZSAvIDIsIHkgKyBzaXplIC8gMiwgc2l6ZSAvIDIsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJzcXVhcmVcIjpcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChhY3R1YWxSYWRpdXMgPiAwKSB7XG4gICAgICAgICAgdGhpcy5yb3VuZFJlY3QoY3R4LCB4LCB5LCBzaXplLCBzaXplLCBhY3R1YWxSYWRpdXMpO1xuICAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHNpemUsIHNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGEgY29tcGxldGUgZmluZGVyIHBhdHRlcm4gKGV5ZSkgd2l0aCBvdXRlciBhbmQgaW5uZXIgc3R5bGVzXG4gICAqL1xuICBkcmF3RmluZGVyUGF0dGVybkNvbXBsZXRlKGN0eCwgY2VudGVyWCwgY2VudGVyWSwgbW9kdWxlU2l6ZSwgY29uZmlnKSB7XG4gICAgY29uc3Qgb3V0ZXJTdHlsZSA9IGNvbmZpZy5leWVPdXRlclN0eWxlIHx8IGNvbmZpZy5maW5kZXJTdHlsZSB8fCAnc3F1YXJlJztcbiAgICBjb25zdCBpbm5lclN0eWxlID0gY29uZmlnLmV5ZUlubmVyU3R5bGUgfHwgY29uZmlnLmZpbmRlclN0eWxlIHx8ICdzcXVhcmUnO1xuICAgIGNvbnN0IHNjYWxlID0gKGNvbmZpZy5leWVTY2FsZSB8fCAxMDApIC8gMTAwO1xuICAgIGNvbnN0IGNvcm5lclJhZGl1cyA9IGNvbmZpZy5jb3JuZXJSYWRpdXMgfHwgMDtcbiAgICBcbiAgICAvLyBGaW5kZXIgcGF0dGVybiBpcyA3eDcgbW9kdWxlc1xuICAgIC8vIE91dGVyOiA3eDcsIE1pZGRsZSAod2hpdGUpOiA1eDUsIElubmVyOiAzeDNcbiAgICBjb25zdCBvdXRlclNpemUgPSA3ICogbW9kdWxlU2l6ZSAqIHNjYWxlO1xuICAgIGNvbnN0IG1pZGRsZVNpemUgPSA1ICogbW9kdWxlU2l6ZSAqIHNjYWxlO1xuICAgIGNvbnN0IGlubmVyU2l6ZSA9IDMgKiBtb2R1bGVTaXplICogc2NhbGU7XG4gICAgXG4gICAgY29uc3Qgb3V0ZXJPZmZzZXQgPSAoNyAqIG1vZHVsZVNpemUgLSBvdXRlclNpemUpIC8gMjtcbiAgICBjb25zdCB4ID0gY2VudGVyWCArIG91dGVyT2Zmc2V0O1xuICAgIGNvbnN0IHkgPSBjZW50ZXJZICsgb3V0ZXJPZmZzZXQ7XG4gICAgXG4gICAgLy8gRHJhdyBvdXRlciAoZGFyaylcbiAgICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmZnQ29sb3I7XG4gICAgdGhpcy5kcmF3RmluZGVyTW9kdWxlKGN0eCwgeCwgeSwgb3V0ZXJTaXplLCBvdXRlclN0eWxlLCBjb3JuZXJSYWRpdXMpO1xuICAgIFxuICAgIC8vIERyYXcgbWlkZGxlIChsaWdodC9iYWNrZ3JvdW5kKVxuICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuYmdDb2xvcjtcbiAgICBjb25zdCBtaWRkbGVPZmZzZXQgPSAob3V0ZXJTaXplIC0gbWlkZGxlU2l6ZSkgLyAyO1xuICAgIHRoaXMuZHJhd0ZpbmRlck1vZHVsZShjdHgsIHggKyBtaWRkbGVPZmZzZXQsIHkgKyBtaWRkbGVPZmZzZXQsIG1pZGRsZVNpemUsIG91dGVyU3R5bGUsIGNvcm5lclJhZGl1cyk7XG4gICAgXG4gICAgLy8gRHJhdyBpbm5lciAoZGFyaylcbiAgICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmZnQ29sb3I7XG4gICAgY29uc3QgaW5uZXJPZmZzZXQgPSAob3V0ZXJTaXplIC0gaW5uZXJTaXplKSAvIDI7XG4gICAgdGhpcy5kcmF3RmluZGVyTW9kdWxlKGN0eCwgeCArIGlubmVyT2Zmc2V0LCB5ICsgaW5uZXJPZmZzZXQsIGlubmVyU2l6ZSwgaW5uZXJTdHlsZSwgY29ybmVyUmFkaXVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IGFuIGFsaWdubWVudCBwYXR0ZXJuIHdpdGggc3BlY2lmaWVkIHN0eWxlXG4gICAqL1xuICBkcmF3QWxpZ25tZW50UGF0dGVybihjdHgsIGNlbnRlclgsIGNlbnRlclksIG1vZHVsZVNpemUsIHN0eWxlLCBjb25maWcpIHtcbiAgICBjb25zdCBjb3JuZXJSYWRpdXMgPSBjb25maWcuY29ybmVyUmFkaXVzIHx8IDA7XG4gICAgXG4gICAgLy8gQWxpZ25tZW50IHBhdHRlcm4gaXMgNXg1IG1vZHVsZXNcbiAgICAvLyBPdXRlcjogNXg1LCBNaWRkbGUgKHdoaXRlKTogM3gzLCBJbm5lcjogMXgxXG4gICAgY29uc3Qgb3V0ZXJTaXplID0gNSAqIG1vZHVsZVNpemU7XG4gICAgY29uc3QgbWlkZGxlU2l6ZSA9IDMgKiBtb2R1bGVTaXplO1xuICAgIGNvbnN0IGlubmVyU2l6ZSA9IDEgKiBtb2R1bGVTaXplO1xuICAgIFxuICAgIGNvbnN0IHggPSBjZW50ZXJYIC0gb3V0ZXJTaXplIC8gMjtcbiAgICBjb25zdCB5ID0gY2VudGVyWSAtIG91dGVyU2l6ZSAvIDI7XG4gICAgXG4gICAgLy8gVXNlIHRoZSBzcGVjaWZpZWQgc3R5bGUgb3IgbWF0Y2ggZmluZGVyIHN0eWxlXG4gICAgY29uc3QgZWZmZWN0aXZlU3R5bGUgPSBzdHlsZSA9PT0gJ21hdGNoX2ZpbmRlcicgPyAoY29uZmlnLmZpbmRlclN0eWxlIHx8ICdzcXVhcmUnKSA6IHN0eWxlO1xuICAgIFxuICAgIC8vIERyYXcgb3V0ZXIgKGRhcmspXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5mZ0NvbG9yO1xuICAgIHRoaXMuZHJhd0ZpbmRlck1vZHVsZShjdHgsIHgsIHksIG91dGVyU2l6ZSwgZWZmZWN0aXZlU3R5bGUsIGNvcm5lclJhZGl1cyk7XG4gICAgXG4gICAgLy8gRHJhdyBtaWRkbGUgKGxpZ2h0L2JhY2tncm91bmQpXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5iZ0NvbG9yO1xuICAgIGNvbnN0IG1pZGRsZVggPSBjZW50ZXJYIC0gbWlkZGxlU2l6ZSAvIDI7XG4gICAgY29uc3QgbWlkZGxlWSA9IGNlbnRlclkgLSBtaWRkbGVTaXplIC8gMjtcbiAgICB0aGlzLmRyYXdGaW5kZXJNb2R1bGUoY3R4LCBtaWRkbGVYLCBtaWRkbGVZLCBtaWRkbGVTaXplLCBlZmZlY3RpdmVTdHlsZSwgY29ybmVyUmFkaXVzKTtcbiAgICBcbiAgICAvLyBEcmF3IGlubmVyIChkYXJrKVxuICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuZmdDb2xvcjtcbiAgICBjb25zdCBpbm5lclggPSBjZW50ZXJYIC0gaW5uZXJTaXplIC8gMjtcbiAgICBjb25zdCBpbm5lclkgPSBjZW50ZXJZIC0gaW5uZXJTaXplIC8gMjtcbiAgICB0aGlzLmRyYXdGaW5kZXJNb2R1bGUoY3R4LCBpbm5lclgsIGlubmVyWSwgaW5uZXJTaXplLCBlZmZlY3RpdmVTdHlsZSwgY29ybmVyUmFkaXVzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEcmF3IHRpbWluZyBwYXR0ZXJuIHdpdGggc3BlY2lmaWVkIHN0eWxlXG4gICAqL1xuICBkcmF3VGltaW5nTW9kdWxlKGN0eCwgeCwgeSwgc2l6ZSwgc3R5bGUsIGNvbmZpZykge1xuICAgIGNvbnN0IGNvcm5lclJhZGl1cyA9IGNvbmZpZy5jb3JuZXJSYWRpdXMgfHwgMDtcbiAgICBcbiAgICAvLyBVc2UgdGhlIHNwZWNpZmllZCBzdHlsZSBvciBtYXRjaCBtb2R1bGUgc3R5bGVcbiAgICBjb25zdCBlZmZlY3RpdmVTdHlsZSA9IHN0eWxlID09PSAnbWF0Y2hfbW9kdWxlJyA/IChjb25maWcubW9kdWxlU3R5bGUgfHwgJ3NxdWFyZScpIDogc3R5bGU7XG4gICAgXG4gICAgc3dpdGNoIChlZmZlY3RpdmVTdHlsZSkge1xuICAgICAgY2FzZSAnc29saWQnOlxuICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgc2l6ZSwgc2l6ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGFzaGVkJzpcbiAgICAgICAgLy8gRHJhdyBhIHNtYWxsZXIgY2VudGVyZWQgcmVjdGFuZ2xlIGZvciBkYXNoZWQgbG9va1xuICAgICAgICBjb25zdCBkYXNoU2l6ZSA9IHNpemUgKiAwLjc7XG4gICAgICAgIGNvbnN0IG9mZnNldCA9IChzaXplIC0gZGFzaFNpemUpIC8gMjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KHggKyBvZmZzZXQsIHkgKyBvZmZzZXQsIGRhc2hTaXplLCBkYXNoU2l6ZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gVXNlIHJlZ3VsYXIgbW9kdWxlIGRyYXdpbmdcbiAgICAgICAgdGhpcy5kcmF3TW9kdWxlKGN0eCwgeCwgeSwgc2l6ZSwgZWZmZWN0aXZlU3R5bGUsIHsgY29ybmVyUmFkaXVzIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBncmFkaWVudCBmaWxsIHN0eWxlIGJhc2VkIG9uIGNvbmZpZ1xuICAgKi9cbiAgY3JlYXRlR3JhZGllbnRGaWxsKGN0eCwgY29uZmlnLCBzaXplKSB7XG4gICAgaWYgKCFjb25maWcuZ3JhZGllbnQgfHwgY29uZmlnLmdyYWRpZW50LnR5cGUgPT09ICdub25lJykge1xuICAgICAgcmV0dXJuIGNvbmZpZy5mZ0NvbG9yO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCB7IHR5cGUsIHN0b3BzLCBjZW50ZXJYID0gMC41LCBjZW50ZXJZID0gMC41IH0gPSBjb25maWcuZ3JhZGllbnQ7XG4gICAgY29uc3QgYW5nbGUgPSBjb25maWcuZ3JhZGllbnQuYW5nbGUgfHwgMDtcbiAgICBsZXQgZ3JhZGllbnQ7XG4gICAgXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICBjYXNlICdsaW5lYXInOiB7XG4gICAgICAgIC8vIENvbnZlcnQgYW5nbGUgdG8gc3RhcnQvZW5kIHBvaW50c1xuICAgICAgICBjb25zdCBhbmdsZVJhZCA9IChhbmdsZSAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgICBjb25zdCB4MSA9IHNpemUgLyAyIC0gTWF0aC5jb3MoYW5nbGVSYWQpICogc2l6ZSAvIDI7XG4gICAgICAgIGNvbnN0IHkxID0gc2l6ZSAvIDIgLSBNYXRoLnNpbihhbmdsZVJhZCkgKiBzaXplIC8gMjtcbiAgICAgICAgY29uc3QgeDIgPSBzaXplIC8gMiArIE1hdGguY29zKGFuZ2xlUmFkKSAqIHNpemUgLyAyO1xuICAgICAgICBjb25zdCB5MiA9IHNpemUgLyAyICsgTWF0aC5zaW4oYW5nbGVSYWQpICogc2l6ZSAvIDI7XG4gICAgICAgIGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHgxLCB5MSwgeDIsIHkyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdyYWRpYWwnOiB7XG4gICAgICAgIGNvbnN0IGN4ID0gc2l6ZSAqIChjZW50ZXJYIHx8IDAuNSk7XG4gICAgICAgIGNvbnN0IGN5ID0gc2l6ZSAqIChjZW50ZXJZIHx8IDAuNSk7XG4gICAgICAgIGNvbnN0IHJhZGl1cyA9IHNpemUgKiAwLjc7XG4gICAgICAgIGdyYWRpZW50ID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGN4LCBjeSwgMCwgY3gsIGN5LCByYWRpdXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2NvbmljJzoge1xuICAgICAgICAvLyBDYW52YXMgZG9lc24ndCBoYXZlIG5hdGl2ZSBjb25pYyBncmFkaWVudCwgc2ltdWxhdGUgd2l0aCByYWRpYWxcbiAgICAgICAgY29uc3QgY3ggPSBzaXplICogKGNlbnRlclggfHwgMC41KTtcbiAgICAgICAgY29uc3QgY3kgPSBzaXplICogKGNlbnRlclkgfHwgMC41KTtcbiAgICAgICAgZ3JhZGllbnQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoY3gsIGN5LCAwLCBjeCwgY3ksIHNpemUgKiAwLjcpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBjb25maWcuZmdDb2xvcjtcbiAgICB9XG4gICAgXG4gICAgLy8gQWRkIGNvbG9yIHN0b3BzXG4gICAgaWYgKHN0b3BzICYmIHN0b3BzLmxlbmd0aCA+IDApIHtcbiAgICAgIHN0b3BzLmZvckVhY2goc3RvcCA9PiB7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcChzdG9wLnBvcywgc3RvcC5jb2xvcik7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRGVmYXVsdCBncmFkaWVudCBmcm9tIGZnQ29sb3IgdG8gYSBsaWdodGVyIHZlcnNpb25cbiAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBjb25maWcuZmdDb2xvcik7XG4gICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgY29uZmlnLmJnQ29sb3IpO1xuICAgIH1cbiAgICBcbiAgICByZXR1cm4gZ3JhZGllbnQ7XG4gIH1cblxuICAvKipcbiAgICogRHJhdyBhIGRlY29yYXRpdmUgZnJhbWUgYXJvdW5kIHRoZSBRUiBjb2RlXG4gICAqL1xuICBkcmF3RnJhbWUoY3R4LCBzaXplLCBtb2R1bGVTaXplLCBtYXJnaW4sIGNvbmZpZykge1xuICAgIGNvbnN0IGZyYW1lU3R5bGUgPSBjb25maWcuZnJhbWVTdHlsZTtcbiAgICBpZiAoIWZyYW1lU3R5bGUgfHwgZnJhbWVTdHlsZSA9PT0gJ25vbmUnKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgZnJhbWVUZXh0ID0gY29uZmlnLmZyYW1lVGV4dCB8fCAnJztcbiAgICBjb25zdCBxclNpemUgPSBzaXplIC0gbWFyZ2luICogMiAqIG1vZHVsZVNpemUgLSAoZnJhbWVUZXh0ID8gbW9kdWxlU2l6ZSAqIDQgOiAwKTtcbiAgICBjb25zdCBxclN0YXJ0ID0gbWFyZ2luICogbW9kdWxlU2l6ZTtcbiAgICBcbiAgICBjdHguc2F2ZSgpO1xuICAgIFxuICAgIHN3aXRjaCAoZnJhbWVTdHlsZSkge1xuICAgICAgY2FzZSAncm91bmRlZF9mcmFtZSc6IHtcbiAgICAgICAgLy8gRHJhdyByb3VuZGVkIHJlY3RhbmdsZSBmcmFtZSBhcm91bmQgUVJcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29uZmlnLmZnQ29sb3I7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBtb2R1bGVTaXplICogMC41O1xuICAgICAgICBjb25zdCBmcmFtZU1hcmdpbiA9IG1vZHVsZVNpemU7XG4gICAgICAgIHRoaXMucm91bmRSZWN0KFxuICAgICAgICAgIGN0eCxcbiAgICAgICAgICBxclN0YXJ0IC0gZnJhbWVNYXJnaW4sXG4gICAgICAgICAgcXJTdGFydCAtIGZyYW1lTWFyZ2luLFxuICAgICAgICAgIHFyU2l6ZSArIGZyYW1lTWFyZ2luICogMixcbiAgICAgICAgICBxclNpemUgKyBmcmFtZU1hcmdpbiAqIDIgKyAoZnJhbWVUZXh0ID8gbW9kdWxlU2l6ZSAqIDMgOiAwKSxcbiAgICAgICAgICBtb2R1bGVTaXplICogMlxuICAgICAgICApO1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjYXNlICdzdGlja2VyJzoge1xuICAgICAgICAvLyBEcmF3IHN0aWNrZXItc3R5bGUgYmFja2dyb3VuZCB3aXRoIHNoYWRvd1xuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSAncmdiYSgwLDAsMCwwLjIpJztcbiAgICAgICAgY3R4LnNoYWRvd0JsdXIgPSBtb2R1bGVTaXplICogMjtcbiAgICAgICAgY3R4LnNoYWRvd09mZnNldFggPSBtb2R1bGVTaXplICogMC41O1xuICAgICAgICBjdHguc2hhZG93T2Zmc2V0WSA9IG1vZHVsZVNpemUgKiAwLjU7XG4gICAgICAgIFxuICAgICAgICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmJnQ29sb3I7XG4gICAgICAgIGNvbnN0IHN0aWNrZXJQYWRkaW5nID0gbW9kdWxlU2l6ZSAqIDEuNTtcbiAgICAgICAgdGhpcy5yb3VuZFJlY3QoXG4gICAgICAgICAgY3R4LFxuICAgICAgICAgIHFyU3RhcnQgLSBzdGlja2VyUGFkZGluZyxcbiAgICAgICAgICBxclN0YXJ0IC0gc3RpY2tlclBhZGRpbmcsXG4gICAgICAgICAgcXJTaXplICsgc3RpY2tlclBhZGRpbmcgKiAyLFxuICAgICAgICAgIHFyU2l6ZSArIHN0aWNrZXJQYWRkaW5nICogMiArIChmcmFtZVRleHQgPyBtb2R1bGVTaXplICogNCA6IDApLFxuICAgICAgICAgIG1vZHVsZVNpemUgKiAzXG4gICAgICAgICk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGN0eC5zaGFkb3dDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgXG4gICAgICBjYXNlICd0YWcnOiB7XG4gICAgICAgIC8vIERyYXcgdGFnLXN0eWxlIGZyYW1lIHdpdGggcG9pbnRlZCBlbmRcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5mZ0NvbG9yO1xuICAgICAgICBjb25zdCB0YWdQYWRkaW5nID0gbW9kdWxlU2l6ZTtcbiAgICAgICAgY29uc3QgdGFnV2lkdGggPSBxclNpemUgKyB0YWdQYWRkaW5nICogMjtcbiAgICAgICAgY29uc3QgdGFnSGVpZ2h0ID0gcXJTaXplICsgdGFnUGFkZGluZyAqIDIgKyAoZnJhbWVUZXh0ID8gbW9kdWxlU2l6ZSAqIDQgOiAwKTtcbiAgICAgICAgY29uc3QgdGFnWCA9IHFyU3RhcnQgLSB0YWdQYWRkaW5nO1xuICAgICAgICBjb25zdCB0YWdZID0gcXJTdGFydCAtIHRhZ1BhZGRpbmc7XG4gICAgICAgIFxuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5tb3ZlVG8odGFnWCArIG1vZHVsZVNpemUsIHRhZ1kpO1xuICAgICAgICBjdHgubGluZVRvKHRhZ1ggKyB0YWdXaWR0aCAtIG1vZHVsZVNpemUsIHRhZ1kpO1xuICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyh0YWdYICsgdGFnV2lkdGgsIHRhZ1ksIHRhZ1ggKyB0YWdXaWR0aCwgdGFnWSArIG1vZHVsZVNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHRhZ1ggKyB0YWdXaWR0aCwgdGFnWSArIHRhZ0hlaWdodCAtIG1vZHVsZVNpemUpO1xuICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyh0YWdYICsgdGFnV2lkdGgsIHRhZ1kgKyB0YWdIZWlnaHQsIHRhZ1ggKyB0YWdXaWR0aCAtIG1vZHVsZVNpemUsIHRhZ1kgKyB0YWdIZWlnaHQpO1xuICAgICAgICBjdHgubGluZVRvKHRhZ1ggKyBtb2R1bGVTaXplLCB0YWdZICsgdGFnSGVpZ2h0KTtcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8odGFnWCwgdGFnWSArIHRhZ0hlaWdodCwgdGFnWCwgdGFnWSArIHRhZ0hlaWdodCAtIG1vZHVsZVNpemUpO1xuICAgICAgICBjdHgubGluZVRvKHRhZ1gsIHRhZ1kgKyBtb2R1bGVTaXplKTtcbiAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8odGFnWCwgdGFnWSwgdGFnWCArIG1vZHVsZVNpemUsIHRhZ1kpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIERyYXcgZnJhbWUgdGV4dCBpZiBwcm92aWRlZFxuICAgIGlmIChmcmFtZVRleHQpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuZmdDb2xvcjtcbiAgICAgIGN0eC5mb250ID0gYGJvbGQgJHttb2R1bGVTaXplICogMn1weCBBcmlhbCwgc2Fucy1zZXJpZmA7XG4gICAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICBjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG4gICAgICBjb25zdCB0ZXh0WSA9IHFyU3RhcnQgKyBxclNpemUgKyBtb2R1bGVTaXplICogMS41O1xuICAgICAgY3R4LmZpbGxUZXh0KGZyYW1lVGV4dCwgc2l6ZSAvIDIsIHRleHRZKTtcbiAgICB9XG4gICAgXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIHJvdW5kUmVjdChjdHgsIHgsIHksIHdpZHRoLCBoZWlnaHQsIHJhZGl1cykge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHggKyByYWRpdXMsIHkpO1xuICAgIGN0eC5saW5lVG8oeCArIHdpZHRoIC0gcmFkaXVzLCB5KTtcbiAgICBjdHgucXVhZHJhdGljQ3VydmVUbyh4ICsgd2lkdGgsIHksIHggKyB3aWR0aCwgeSArIHJhZGl1cyk7XG4gICAgY3R4LmxpbmVUbyh4ICsgd2lkdGgsIHkgKyBoZWlnaHQgLSByYWRpdXMpO1xuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHggKyB3aWR0aCwgeSArIGhlaWdodCwgeCArIHdpZHRoIC0gcmFkaXVzLCB5ICsgaGVpZ2h0KTtcbiAgICBjdHgubGluZVRvKHggKyByYWRpdXMsIHkgKyBoZWlnaHQpO1xuICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHgsIHkgKyBoZWlnaHQsIHgsIHkgKyBoZWlnaHQgLSByYWRpdXMpO1xuICAgIGN0eC5saW5lVG8oeCwgeSArIHJhZGl1cyk7XG4gICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeCwgeSwgeCArIHJhZGl1cywgeSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBvdmVybGF5IGRhdGEgLSBhc3luYyB2ZXJzaW9uIHVzaW5nIGNhbnZhcyBmYWN0b3J5XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfZ2V0T3ZlcmxheURhdGEob3ZlcmxheUNhbnZhcywgbW9kdWxlQ291bnQsIGNvbG9yTW9kZSA9IFwiY29sb3JcIiwgaW52ZXJ0SW1hZ2UgPSBmYWxzZSkge1xuICAgIGNvbnN0IHRlbXBDYW52YXMgPSBhd2FpdCB0aGlzLl9jcmVhdGVDYW52YXMobW9kdWxlQ291bnQsIG1vZHVsZUNvdW50KTtcbiAgICBjb25zdCBjdHggPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5kcmF3SW1hZ2Uob3ZlcmxheUNhbnZhcywgMCwgMCwgbW9kdWxlQ291bnQsIG1vZHVsZUNvdW50KTtcblxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgbW9kdWxlQ291bnQsIG1vZHVsZUNvdW50KTtcbiAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG5cbiAgICBjb25zdCBicmlnaHRuZXNzID0gW107XG4gICAgY29uc3QgY29sb3JzID0gW107XG5cbiAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcbiAgICAgIGJyaWdodG5lc3Nbcm93XSA9IFtdO1xuICAgICAgY29sb3JzW3Jvd10gPSBbXTtcblxuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgIGNvbnN0IGkgPSAocm93ICogbW9kdWxlQ291bnQgKyBjb2wpICogNDtcbiAgICAgICAgY29uc3QgciA9IGRhdGFbaV07XG4gICAgICAgIGNvbnN0IGcgPSBkYXRhW2kgKyAxXTtcbiAgICAgICAgY29uc3QgYiA9IGRhdGFbaSArIDJdO1xuXG4gICAgICAgIGNvbnN0IGdyYXkgPSBNYXRoLnJvdW5kKHIgKiAwLjI5OSArIGcgKiAwLjU4NyArIGIgKiAwLjExNCk7XG4gICAgICAgIGJyaWdodG5lc3Nbcm93XVtjb2xdID0gZ3JheSAvIDI1NTtcblxuICAgICAgICBpZiAoY29sb3JNb2RlID09PSBcImJ3XCIpIHtcbiAgICAgICAgICBjb25zdCBidyA9IGdyYXkgPiAxMjcgPyAyNTUgOiAwO1xuICAgICAgICAgIGNvbG9yc1tyb3ddW2NvbF0gPSBgcmdiKCR7Ynd9LCR7Ynd9LCR7Ynd9KWA7XG4gICAgICAgIH0gZWxzZSBpZiAoY29sb3JNb2RlID09PSBcImdyYXlzY2FsZVwiKSB7XG4gICAgICAgICAgY29sb3JzW3Jvd11bY29sXSA9IGByZ2IoJHtncmF5fSwke2dyYXl9LCR7Z3JheX0pYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2xvcnNbcm93XVtjb2xdID0gYHJnYigke3J9LCR7Z30sJHtifSlgO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYnJpZ2h0bmVzcy5jb2xvcnMgPSBjb2xvcnM7XG4gICAgcmV0dXJuIGJyaWdodG5lc3M7XG4gIH1cblxuICAvLyBibGVuZENvbG9ycyBhbmQgcGFyc2VDb2xvciBhcmUgbm93IGltcG9ydGVkIGZyb20gLi9jb2xvci11dGlscy50c1xuXG4gIGRyYXdDZW50ZXJMb2dvKGN0eCwgbG9nb0NhbnZhcywgY2FudmFzU2l6ZSwgbG9nb1NpemVQZXJjZW50KSB7XG4gICAgY29uc3QgbG9nb1NpemUgPSBjYW52YXNTaXplICogKGxvZ29TaXplUGVyY2VudCAvIDEwMCk7XG4gICAgY29uc3QgeCA9IChjYW52YXNTaXplIC0gbG9nb1NpemUpIC8gMjtcbiAgICBjb25zdCB5ID0gKGNhbnZhc1NpemUgLSBsb2dvU2l6ZSkgLyAyO1xuXG4gICAgY3R4LmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xuICAgIGN0eC5maWxsUmVjdCh4IC0gNCwgeSAtIDQsIGxvZ29TaXplICsgOCwgbG9nb1NpemUgKyA4KTtcblxuICAgIGN0eC5kcmF3SW1hZ2UobG9nb0NhbnZhcywgeCwgeSwgbG9nb1NpemUsIGxvZ29TaXplKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZSBhIFwiZGl0aGVyZWQgUVIgY29kZVwiIHN0eWxlIHJlbmRlciBiYXNlZCBvbiB0aGUgVHlwZVNjcmlwdCByZWZlcmVuY2VcbiAgICogaW1wbGVtZW50YXRpb24gZnJvbSBodHRwczovL2NvZGViZXJnLm9yZy9hbmRyZXctdC9kaXRoZXJlZC1xci1jb2Rlcy5cbiAgICpcbiAgICogTm90ZXM6XG4gICAqIC0gV2UgcmVuZGVyIGEgM3ggKHN1YnBpeGVsKSBncmlkIHBlciBRUiBtb2R1bGUuXG4gICAqIC0gTG9ja2VkIGFyZWFzIChmaW5kZXJzLCB0aW1pbmcgbGluZXMsIGFsaWdubWVudHMpIGFyZSBwcmVzZXJ2ZWQuXG4gICAqIC0gRnJlZSBwaXhlbHMgYXJlIHNldCBmcm9tIHRoZSBpbWFnZSB2aWEgZXJyb3IgZGlmZnVzaW9uLlxuICAgKiAtIFN1cHBvcnRzIGNvbG9yLCBncmF5c2NhbGUsIGFuZCBCJlcgbW9kZXMgZm9yIGhpZ2hlciBmaWRlbGl0eS5cbiAgICovXG4gIGFzeW5jIGdlbmVyYXRlRGl0aGVyZWRTdWJwaXhlbFFSKF9xciwgY29uZmlnLCBvdmVybGF5Q2FudmFzKSB7XG4gICAgY29uc3Qgc2NhbGUgPSAzO1xuXG4gICAgLy8gR2VuZXJhdGUgUVIgbWF0cml4IHVzaW5nIHFyLWNvcmVcbiAgICBjb25zdCBxclJlc3VsdCA9IGdlbmVyYXRlUVIoe1xuICAgICAgdGV4dDogY29uZmlnLmNvbnRlbnQsXG4gICAgICBlY2M6IGNvbmZpZy5lcnJvckNvcnJlY3Rpb24sXG4gICAgICB2ZXJzaW9uOiBjb25maWcudHlwZU51bWJlciB8fCAwLFxuICAgICAgc2NhbGUsXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IG1hdHJpeDogYmFzZU1hdHJpeCwgbW9kdWxlQ291bnQ6IHNjYWxlZFNpemUgfSA9IHFyUmVzdWx0O1xuICAgIFxuICAgIC8vIEFwcGx5IGRpdGhlcmluZyB3aXRoIG92ZXJsYXlcbiAgICBjb25zdCBkaXRoZXJlZFJlc3VsdCA9IGF3YWl0IHRoaXMuX2FwcGx5RGl0aGVyVG9NYXRyaXgoXG4gICAgICBiYXNlTWF0cml4LFxuICAgICAgc2NhbGVkU2l6ZSxcbiAgICAgIHNjYWxlLFxuICAgICAgb3ZlcmxheUNhbnZhcyxcbiAgICAgIGNvbmZpZy5vdmVybGF5SW50ZW5zaXR5LFxuICAgICAgY29uZmlnLmNvbG9yTW9kZSB8fCBcImNvbG9yXCJcbiAgICApO1xuXG4gICAgY29uc3QgeyBtYXRyaXg6IGRpdGhlcmVkLCBjb2xvcnMgfSA9IGRpdGhlcmVkUmVzdWx0O1xuXG4gICAgLy8gU2FmZXR5OiBpZiB0aGUgUVIgbGlicmFyeSBwaWNrZWQgYSBkaWZmZXJlbnQgdmVyc2lvbiB0aGFuIG91ciBjdXJyZW50IGBxcmBcbiAgICAvLyBpbnN0YW5jZSwgdXNlIHRoZSBtYXRyaXggc2l6ZSB0byBkcml2ZSByZW5kZXJpbmcuXG4gICAgY29uc3Qgc2NhbGVkQ291bnQgPSBkaXRoZXJlZC5sZW5ndGg7XG4gICAgY29uc3QgZGVyaXZlZE1vZHVsZUNvdW50ID0gTWF0aC5yb3VuZChzY2FsZWRDb3VudCAvIHNjYWxlKTtcbiAgICBjb25zdCBtYXJnaW5Nb2R1bGVzID0gTWF0aC5tYXgoNSwgY29uZmlnLm1hcmdpbik7XG4gICAgLy8gRm9yIHNjYW5uYWJpbGl0eToga2VlcCBhbiBpbnRlZ2VyIHN1YnBpeGVsIHNpemUgKGF2b2lkIGZyYWN0aW9uYWwgY2FudmFzIGNvb3JkcylcbiAgICAvLyBhbmQgZW5zdXJlIGEgZnVsbCBxdWlldCB6b25lICg+PSA0IG1vZHVsZXM7IHdlIHVzZSA1IGhlcmUsIG1hdGNoaW5nIHRoZSByZWZlcmVuY2UpLlxuICAgIGNvbnN0IHN1YlBpeGVsU2l6ZSA9IE1hdGgubWF4KDEsIE1hdGgucm91bmQoY29uZmlnLm1vZHVsZVNpemUgLyBzY2FsZSkpO1xuICAgIGNvbnN0IGVmZmVjdGl2ZU1vZHVsZVNpemUgPSBzdWJQaXhlbFNpemUgKiBzY2FsZTtcbiAgICBjb25zdCBtYXJnaW5QeCA9IG1hcmdpbk1vZHVsZXMgKiBlZmZlY3RpdmVNb2R1bGVTaXplO1xuICAgIGNvbnN0IHNpemUgPSBzY2FsZWRDb3VudCAqIHN1YlBpeGVsU2l6ZSArIG1hcmdpblB4ICogMjtcbiAgICBjb25zdCBwaXhlbFNpemUgPSBzdWJQaXhlbFNpemU7XG5cbiAgICBjb25zdCBjYW52YXMgPSBhd2FpdCB0aGlzLl9jcmVhdGVDYW52YXMoc2l6ZSwgc2l6ZSk7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEtlZXAgZWRnZXMgY3Jpc3AgKGNyaXRpY2FsIGZvciBRUiBzY2FubmluZylcbiAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICBpZiAoIWNvbmZpZy50cmFuc3BhcmVudEJnKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmJnQ29sb3I7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIGlmIHdlIHNob3VsZCB1c2UgY29sb3IgcmVuZGVyaW5nXG4gICAgY29uc3QgdXNlQ29sb3JSZW5kZXJpbmcgPSBvdmVybGF5Q2FudmFzICYmIGNvbmZpZy5jb2xvck1vZGUgIT09IFwiYndcIjtcblxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc2NhbGVkQ291bnQ7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBzY2FsZWRDb3VudDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGlzRGFyayA9IGRpdGhlcmVkW3ldW3hdO1xuICAgICAgICBjb25zdCBjb2xvciA9IGNvbG9yc1t5XVt4XTtcblxuICAgICAgICAvLyBTa2lwIHdoaXRlL2xpZ2h0IHBpeGVscyBpbiB0aGUgYmFja2dyb3VuZCAodGhleSdyZSBhbHJlYWR5IHRoZSBiZyBjb2xvcilcbiAgICAgICAgLy8gdW5sZXNzIHdlJ3JlIGRvaW5nIGNvbG9yIHJlbmRlcmluZyB3aXRoIG5vbi1ibGFjay93aGl0ZSBjb2xvcnNcbiAgICAgICAgaWYgKCFpc0RhcmsgJiYgIXVzZUNvbG9yUmVuZGVyaW5nKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBkeCA9IG1hcmdpblB4ICsgeCAqIHBpeGVsU2l6ZTtcbiAgICAgICAgY29uc3QgZHkgPSBtYXJnaW5QeCArIHkgKiBwaXhlbFNpemU7XG5cbiAgICAgICAgaWYgKHVzZUNvbG9yUmVuZGVyaW5nKSB7XG4gICAgICAgICAgLy8gVXNlIHRoZSBhY3R1YWwgY29sb3IgZnJvbSB0aGUgZGl0aGVyZWQgcmVzdWx0XG4gICAgICAgICAgLy8gRm9yIGRhcmsgcGl4ZWxzOiB1c2UgdGhlIGNvbG9yICh3aGljaCBtYXkgYmUgYSBkYXJrIHNoYWRlKVxuICAgICAgICAgIC8vIEZvciBsaWdodCBwaXhlbHM6IHVzZSB0aGUgY29sb3IgKHdoaWNoIG1heSBiZSBhIGxpZ2h0IHNoYWRlKVxuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBgcmdiKCR7Y29sb3Iucn0sJHtjb2xvci5nfSwke2NvbG9yLmJ9KWA7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KGR4LCBkeSwgcGl4ZWxTaXplLCBwaXhlbFNpemUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEImVyBtb2RlIG9yIG5vIG92ZXJsYXk6IHVzZSBzaW1wbGUgZm9yZWdyb3VuZCBjb2xvclxuICAgICAgICAgIGlmIChpc0RhcmspIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuZmdDb2xvcjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChkeCwgZHksIHBpeGVsU2l6ZSwgcGl4ZWxTaXplKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FudmFzO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlIFFSIHdpdGggYmx1ZS1ub2lzZSBkaXRoZXJpbmdcbiAgICogUmV0dXJucyBhIHNpbmdsZSBjYW52YXMgKGNvbnNpc3RlbnQgd2l0aCBvdGhlciBibGVuZCBtb2RlcylcbiAgICpcbiAgICogRmVhdHVyZXM6XG4gICAqIC0gQmx1ZS1ub2lzZSBkaXRoZXJpbmcgZm9yIGhpZ2gtcXVhbGl0eSBpbWFnZSByZXByZXNlbnRhdGlvblxuICAgKiAtIERhdGEgcG9pbnRzIHByZXNlcnZlZCBmb3IgUVIgc2Nhbm5hYmlsaXR5IChzYW1lIGFwcHJvYWNoIGFzIGVycm9yIGRpZmZ1c2lvbilcbiAgICogLSBPbmx5IGZyZWUgcG9pbnRzIGFyZSBkaXRoZXJlZCB1c2luZyBibHVlIG5vaXNlIHRocmVzaG9sZFxuICAgKiAtIEludGVuc2l0eSBzbGlkZXIgY29udHJvbHMgYmxlbmQgYmV0d2VlbiBRUiBhbmQgaW1hZ2VcbiAgICovXG4gIGFzeW5jIGdlbmVyYXRlQmx1ZU5vaXNlUVIoY29uZmlnLCBvdmVybGF5Q2FudmFzKSB7XG4gICAgY29uc3Qgc2NhbGUgPSAzO1xuXG4gICAgLy8gVXNlIHRoZSBuZXcgZ2VuZXJhdGVCbHVlTm9pc2VEaXRoZXJlZCBmdW5jdGlvbiB0aGF0IGZvbGxvd3NcbiAgICAvLyB0aGUgc2FtZSBwYXR0ZXJuIGFzIGdlbmVyYXRlRGl0aGVyZWRNYXRyaXggKHByZXNlcnZlcyBRUiBkYXRhIHBvaW50cylcbiAgICBjb25zdCBibHVlTm9pc2VSZXN1bHQgPSBnZW5lcmF0ZUJsdWVOb2lzZURpdGhlcmVkKHtcbiAgICAgIHRleHQ6IGNvbmZpZy5jb250ZW50LFxuICAgICAgZWNjOiBjb25maWcuZXJyb3JDb3JyZWN0aW9uLFxuICAgICAgdmVyc2lvbjogY29uZmlnLnR5cGVOdW1iZXIgfHwgMCxcbiAgICAgIHNjYWxlLFxuICAgICAgb3ZlcmxheUNhbnZhcyxcbiAgICAgIG92ZXJsYXlJbnRlbnNpdHk6IGNvbmZpZy5vdmVybGF5SW50ZW5zaXR5LFxuICAgICAgY29sb3JNb2RlOiBjb25maWcuY29sb3JNb2RlIHx8IFwiY29sb3JcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgbWF0cml4OiBkaXRoZXJlZCwgY29sb3JzIH0gPSBibHVlTm9pc2VSZXN1bHQ7XG5cbiAgICBjb25zdCBzY2FsZWRDb3VudCA9IGRpdGhlcmVkLmxlbmd0aDtcbiAgICBjb25zdCBtYXJnaW5Nb2R1bGVzID0gTWF0aC5tYXgoNSwgY29uZmlnLm1hcmdpbik7XG4gICAgY29uc3Qgc3ViUGl4ZWxTaXplID0gTWF0aC5tYXgoMSwgTWF0aC5yb3VuZChjb25maWcubW9kdWxlU2l6ZSAvIHNjYWxlKSk7XG4gICAgY29uc3QgZWZmZWN0aXZlTW9kdWxlU2l6ZSA9IHN1YlBpeGVsU2l6ZSAqIHNjYWxlO1xuICAgIGNvbnN0IG1hcmdpblB4ID0gbWFyZ2luTW9kdWxlcyAqIGVmZmVjdGl2ZU1vZHVsZVNpemU7XG4gICAgY29uc3Qgc2l6ZSA9IHNjYWxlZENvdW50ICogc3ViUGl4ZWxTaXplICsgbWFyZ2luUHggKiAyO1xuICAgIGNvbnN0IHBpeGVsU2l6ZSA9IHN1YlBpeGVsU2l6ZTtcblxuICAgIC8vIFJlbmRlciB0byBhIHNpbmdsZSBjYW52YXNcbiAgICBjb25zdCBjYW52YXMgPSBhd2FpdCB0aGlzLl9jcmVhdGVDYW52YXMoc2l6ZSwgc2l6ZSk7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgIGlmICghY29uZmlnLnRyYW5zcGFyZW50QmcpIHtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuYmdDb2xvcjtcbiAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBzaXplLCBzaXplKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VDb2xvclJlbmRlcmluZyA9IG92ZXJsYXlDYW52YXMgJiYgY29uZmlnLmNvbG9yTW9kZSAhPT0gXCJid1wiO1xuXG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzY2FsZWRDb3VudDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNjYWxlZENvdW50OyB4KyspIHtcbiAgICAgICAgY29uc3QgaXNEYXJrID0gZGl0aGVyZWRbeV1beF07XG4gICAgICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW3ldW3hdO1xuXG4gICAgICAgIC8vIFNraXAgd2hpdGUvbGlnaHQgcGl4ZWxzIHVubGVzcyBkb2luZyBjb2xvciByZW5kZXJpbmdcbiAgICAgICAgaWYgKCFpc0RhcmsgJiYgIXVzZUNvbG9yUmVuZGVyaW5nKSBjb250aW51ZTtcblxuICAgICAgICBjb25zdCBkeCA9IG1hcmdpblB4ICsgeCAqIHBpeGVsU2l6ZTtcbiAgICAgICAgY29uc3QgZHkgPSBtYXJnaW5QeCArIHkgKiBwaXhlbFNpemU7XG5cbiAgICAgICAgaWYgKHVzZUNvbG9yUmVuZGVyaW5nKSB7XG4gICAgICAgICAgLy8gVXNlIHRoZSBhY3R1YWwgY29sb3IgZnJvbSB0aGUgZGl0aGVyZWQgcmVzdWx0XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGByZ2IoJHtjb2xvci5yfSwke2NvbG9yLmd9LCR7Y29sb3IuYn0pYDtcbiAgICAgICAgICBjdHguZmlsbFJlY3QoZHgsIGR5LCBwaXhlbFNpemUsIHBpeGVsU2l6ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQiZXIG1vZGUgb3Igbm8gb3ZlcmxheTogdXNlIHNpbXBsZSBmb3JlZ3JvdW5kIGNvbG9yXG4gICAgICAgICAgaWYgKGlzRGFyaykge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5mZ0NvbG9yO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGR4LCBkeSwgcGl4ZWxTaXplLCBwaXhlbFNpemUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYW52YXM7XG4gIH1cblxuICAvKipcbiAgICogR2VuZXJhdGUgUVIgd2l0aCBxcm1vdmUtc3R5bGUgM3gzIHN1YnBpeGVsIHJlbmRlcmluZ1xuICAgKiBFYWNoIFFSIG1vZHVsZSBiZWNvbWVzIGEgM3gzIGdyaWQ6XG4gICAqIC0gQ0VOVEVSIHBpeGVsICgxLDEpID0gUVIgZGF0YSAobXVzdCBzdGF5IGNvcnJlY3QgZm9yIHNjYW5uaW5nKVxuICAgKiAtIDggU1VSUk9VTkRJTkcgcGl4ZWxzID0gZnJlZWx5IHNob3cgb3ZlcmxheSBpbWFnZVxuICAgKiBUaGlzIGFsbG93cyB+ODklIG9mIHBpeGVscyB0byBzaG93IHRoZSBpbWFnZSB3aGlsZSBtYWludGFpbmluZyAxMDAlIHNjYW5uYWJpbGl0eVxuICAgKi9cbiAgYXN5bmMgZ2VuZXJhdGVTdWJwaXhlbFFSKFxuICAgIHFyLFxuICAgIGNvbmZpZyxcbiAgICBvdmVybGF5Q2FudmFzLFxuICAgIG1vZHVsZUNvdW50LFxuICAgIHVzZUhhbGZ0b25lQ2VudGVyID0gZmFsc2UsXG4gICkge1xuICAgIC8vIEdldCBzdWJwaXhlbCBncmlkIHNpemUgZnJvbSBjb25maWcgKDJ4MiwgM3gzLCBvciA0eDQpXG4gICAgY29uc3QgZ3JpZFNpemVTdHIgPSBjb25maWcuc3VicGl4ZWxHcmlkU2l6ZSB8fCAnM3gzJztcbiAgICBjb25zdCBzdWJwaXhlbFNpemUgPSBwYXJzZUludChncmlkU2l6ZVN0ci5jaGFyQXQoMCkpIHx8IDM7IC8vIEVhY2ggbW9kdWxlIGlzIE54TiBzdWJwaXhlbHNcbiAgICBjb25zdCBtYXJnaW4gPSBjb25maWcubWFyZ2luO1xuICAgIGNvbnN0IHBpeGVsU2l6ZSA9IGNvbmZpZy5tb2R1bGVTaXplIC8gc3VicGl4ZWxTaXplOyAvLyBTaXplIG9mIGVhY2ggc3VicGl4ZWxcblxuICAgIC8vIENhbnZhcyBkaW1lbnNpb25zOiAzeCBtb2R1bGVzICsgbWFyZ2luc1xuICAgIGNvbnN0IGNhbnZhc01vZHVsZXMgPSBtb2R1bGVDb3VudCAqIHN1YnBpeGVsU2l6ZTtcbiAgICBjb25zdCBtYXJnaW5QaXhlbHMgPSBtYXJnaW4gKiBjb25maWcubW9kdWxlU2l6ZTtcbiAgICBjb25zdCBzaXplID0gY2FudmFzTW9kdWxlcyAqIHBpeGVsU2l6ZSArIG1hcmdpblBpeGVscyAqIDI7XG5cbiAgICBjb25zdCBjYW52YXMgPSBhd2FpdCB0aGlzLl9jcmVhdGVDYW52YXMoc2l6ZSwgc2l6ZSk7XG4gICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIC8vIEtlZXAgZWRnZXMgY3Jpc3AgKGNyaXRpY2FsIGZvciBRUiBzY2FubmluZylcbiAgICBjdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAvLyBEcmF3IGJhY2tncm91bmRcbiAgICBpZiAoIWNvbmZpZy50cmFuc3BhcmVudEJnKSB7XG4gICAgICBjdHguZmlsbFN0eWxlID0gY29uZmlnLmJnQ29sb3I7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7XG4gICAgfVxuXG4gICAgLy8gR2V0IG92ZXJsYXkgZGF0YSBhdCAzeCByZXNvbHV0aW9uIHRvIG1hdGNoIHN1YnBpeGVsIGdyaWRcbiAgICBjb25zdCBvdmVybGF5RGF0YSA9IGF3YWl0IHRoaXMuX2dldFN1YnBpeGVsT3ZlcmxheURhdGEoXG4gICAgICBvdmVybGF5Q2FudmFzLFxuICAgICAgbW9kdWxlQ291bnQgKiBzdWJwaXhlbFNpemUsXG4gICAgICBjb25maWcuY29sb3JNb2RlIHx8IFwiY29sb3JcIixcbiAgICApO1xuICAgIC8vIEFsc28gZ2V0IHBlci1tb2R1bGUgYnJpZ2h0bmVzcyBmb3IgaGFsZnRvbmUgY2VudGVyXG4gICAgY29uc3QgbW9kdWxlQnJpZ2h0bmVzcyA9IGF3YWl0IHRoaXMuX2dldE92ZXJsYXlEYXRhKG92ZXJsYXlDYW52YXMsIG1vZHVsZUNvdW50KTtcbiAgICBjb25zdCBpbnRlbnNpdHkgPSBjb25maWcub3ZlcmxheUludGVuc2l0eSAvIDEwMDtcblxuICAgIC8vIERyYXcgZWFjaCBRUiBtb2R1bGUgYXMgYSAzeDMgc3VicGl4ZWwgZ3JpZFxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgZm9yIChsZXQgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgIGNvbnN0IGlzRGFyayA9IHFyLmlzRGFyayhyb3csIGNvbCk7XG4gICAgICAgIGNvbnN0IGlzRmluZGVyID0gdGhpcy5pc0ZpbmRlclBhdHRlcm4ocm93LCBjb2wsIG1vZHVsZUNvdW50KTtcblxuICAgICAgICAvLyBCYXNlIHBvc2l0aW9uIGZvciB0aGlzIG1vZHVsZSdzIDN4MyBncmlkXG4gICAgICAgIGNvbnN0IGJhc2VYID0gbWFyZ2luUGl4ZWxzICsgY29sICogc3VicGl4ZWxTaXplICogcGl4ZWxTaXplO1xuICAgICAgICBjb25zdCBiYXNlWSA9IG1hcmdpblBpeGVscyArIHJvdyAqIHN1YnBpeGVsU2l6ZSAqIHBpeGVsU2l6ZTtcblxuICAgICAgICAvLyBGb3IgZmluZGVyIHBhdHRlcm5zLCBkcmF3IHNvbGlkIDN4MyAobm8gc3VicGl4ZWwgZWZmZWN0KSBmb3IgYmV0dGVyIHNjYW5uaW5nXG4gICAgICAgIGlmIChpc0ZpbmRlcikge1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBpc0RhcmsgPyBjb25maWcuZmdDb2xvciA6IGNvbmZpZy5iZ0NvbG9yO1xuICAgICAgICAgIGN0eC5maWxsUmVjdChcbiAgICAgICAgICAgIGJhc2VYLFxuICAgICAgICAgICAgYmFzZVksXG4gICAgICAgICAgICBzdWJwaXhlbFNpemUgKiBwaXhlbFNpemUsXG4gICAgICAgICAgICBzdWJwaXhlbFNpemUgKiBwaXhlbFNpemUsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERyYXcgM3gzIHN1YnBpeGVsIGdyaWQgZm9yIHRoaXMgbW9kdWxlXG4gICAgICAgIGZvciAobGV0IHN1YlJvdyA9IDA7IHN1YlJvdyA8IHN1YnBpeGVsU2l6ZTsgc3ViUm93KyspIHtcbiAgICAgICAgICBmb3IgKGxldCBzdWJDb2wgPSAwOyBzdWJDb2wgPCBzdWJwaXhlbFNpemU7IHN1YkNvbCsrKSB7XG4gICAgICAgICAgICBjb25zdCBzdWJYID0gYmFzZVggKyBzdWJDb2wgKiBwaXhlbFNpemU7XG4gICAgICAgICAgICBjb25zdCBzdWJZID0gYmFzZVkgKyBzdWJSb3cgKiBwaXhlbFNpemU7XG5cbiAgICAgICAgICAgIC8vIEdldCBvdmVybGF5IGRhdGEgZm9yIHRoaXMgc3VicGl4ZWxcbiAgICAgICAgICAgIGNvbnN0IG92ZXJsYXlSb3cgPSByb3cgKiBzdWJwaXhlbFNpemUgKyBzdWJSb3c7XG4gICAgICAgICAgICBjb25zdCBvdmVybGF5Q29sID0gY29sICogc3VicGl4ZWxTaXplICsgc3ViQ29sO1xuICAgICAgICAgICAgY29uc3Qgb3ZlcmxheUNvbG9yID0gb3ZlcmxheURhdGEuY29sb3JzPy5bb3ZlcmxheVJvd10/LltvdmVybGF5Q29sXTtcblxuICAgICAgICAgICAgLy8gQ0VOVEVSIHBpeGVsICgxLDEpIC0gTVVTVCBzaG93IFFSIGRhdGEgZm9yIHNjYW5uYWJpbGl0eVxuICAgICAgICAgICAgaWYgKHN1YlJvdyA9PT0gMSAmJiBzdWJDb2wgPT09IDEpIHtcbiAgICAgICAgICAgICAgaWYgKHVzZUhhbGZ0b25lQ2VudGVyICYmIGlzRGFyaykge1xuICAgICAgICAgICAgICAgIC8vIEhhbGZ0b25lIGNlbnRlcjogdmFyeSBzaXplIGJhc2VkIG9uIGltYWdlIGJyaWdodG5lc3NcbiAgICAgICAgICAgICAgICBjb25zdCBicmlnaHRuZXNzID0gbW9kdWxlQnJpZ2h0bmVzc1tyb3ddPy5bY29sXSA/PyAwLjU7XG4gICAgICAgICAgICAgICAgY29uc3QgbWluU2l6ZSA9IDAuNDtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhTaXplID0gMS4wO1xuICAgICAgICAgICAgICAgIGNvbnN0IHNpemVSYXRpbyA9XG4gICAgICAgICAgICAgICAgICBtaW5TaXplICsgKDEgLSBicmlnaHRuZXNzKSAqIChtYXhTaXplIC0gbWluU2l6ZSkgKiBpbnRlbnNpdHk7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VudGVyU2l6ZSA9IHBpeGVsU2l6ZSAqIHNpemVSYXRpbztcbiAgICAgICAgICAgICAgICBjb25zdCBvZmZzZXQgPSAocGl4ZWxTaXplIC0gY2VudGVyU2l6ZSkgLyAyO1xuXG4gICAgICAgICAgICAgICAgLy8gRHJhdyBiYWNrZ3JvdW5kIGZpcnN0XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGNvbmZpZy5iZ0NvbG9yO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdChzdWJYLCBzdWJZLCBwaXhlbFNpemUsIHBpeGVsU2l6ZSk7XG4gICAgICAgICAgICAgICAgLy8gVGhlbiBkcmF3IHNpemVkIGNlbnRlclxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjb25maWcuZmdDb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoXG4gICAgICAgICAgICAgICAgICBzdWJYICsgb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgc3ViWSArIG9mZnNldCxcbiAgICAgICAgICAgICAgICAgIGNlbnRlclNpemUsXG4gICAgICAgICAgICAgICAgICBjZW50ZXJTaXplLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGlzRGFyayA/IGNvbmZpZy5mZ0NvbG9yIDogY29uZmlnLmJnQ29sb3I7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHN1YlgsIHN1YlksIHBpeGVsU2l6ZSwgcGl4ZWxTaXplKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gU1VSUk9VTkRJTkcgOCBwaXhlbHMgLSBESVJFQ1RMWSBzaG93IG92ZXJsYXkgaW1hZ2UgKG5vIGJsZW5kaW5nISlcbiAgICAgICAgICAgICAgLy8gVGhlc2UgcGl4ZWxzIGFyZSBGUkVFIC0gdGhleSBkb24ndCBhZmZlY3QgUVIgc2Nhbm5pbmcgYXQgYWxsXG4gICAgICAgICAgICAgIGlmIChvdmVybGF5Q29sb3IgJiYgaW50ZW5zaXR5ID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIEF0IGZ1bGwgaW50ZW5zaXR5LCBzaG93IHB1cmUgaW1hZ2UgY29sb3JcbiAgICAgICAgICAgICAgICAvLyBBdCBwYXJ0aWFsIGludGVuc2l0eSwgYmxlbmQgd2l0aCBuZXV0cmFsIGdyYXkgZm9yIHZpc2liaWxpdHkgY29udHJvbFxuICAgICAgICAgICAgICAgIGlmIChpbnRlbnNpdHkgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IG92ZXJsYXlDb2xvcjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGJsZW5kQ29sb3JzKFxuICAgICAgICAgICAgICAgICAgICBcIiM4MDgwODBcIixcbiAgICAgICAgICAgICAgICAgICAgb3ZlcmxheUNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBpbnRlbnNpdHksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBObyBvdmVybGF5IC0gc2hvdyBiYXNlZCBvbiBRUiBwYXR0ZXJuIHdpdGggcmVkdWNlZCBjb250cmFzdFxuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBpc0RhcmsgPyBcIiM0MDQwNDBcIiA6IFwiI2MwYzBjMFwiO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGN0eC5maWxsUmVjdChzdWJYLCBzdWJZLCBwaXhlbFNpemUsIHBpeGVsU2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSBkaXRoZXJpbmcgdG8gYSBRUiBtYXRyaXggd2l0aCBvdmVybGF5IGltYWdlXG4gICAqIFVzZXMgRmxveWQtU3RlaW5iZXJnIGVycm9yIGRpZmZ1c2lvbiBmb3IgZnJlZSBwb2ludHNcbiAgICogU3VwcG9ydHMgc2VycGVudGluZSBzY2FubmluZyBmb3IgYmV0dGVyIHF1YWxpdHlcbiAgICovXG4gIC8qKlxuICAgKiBBcHBseSBkaXRoZXJpbmcgdG8gUVIgbWF0cml4IC0gYXN5bmMgdmVyc2lvbiB1c2luZyBjYW52YXMgZmFjdG9yeVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgX2FwcGx5RGl0aGVyVG9NYXRyaXgoYmFzZU1hdHJpeCwgc2NhbGVkU2l6ZSwgc2NhbGUsIG92ZXJsYXlDYW52YXMsIG92ZXJsYXlJbnRlbnNpdHksIGNvbG9yTW9kZSwgc2VycGVudGluZSA9IGZhbHNlKSB7XG4gICAgLy8gSW5pdGlhbGl6ZSBvdXRwdXRcbiAgICBjb25zdCBtYXRyaXggPSBiYXNlTWF0cml4Lm1hcChyb3cgPT4gWy4uLnJvd10pO1xuICAgIGNvbnN0IGNvbG9ycyA9IGJhc2VNYXRyaXgubWFwKHJvdyA9PiByb3cubWFwKGlzRGFyayA9PiBcbiAgICAgIGlzRGFyayA/IHsgcjogMCwgZzogMCwgYjogMCB9IDogeyByOiAyNTUsIGc6IDI1NSwgYjogMjU1IH1cbiAgICApKTtcblxuICAgIGlmICghb3ZlcmxheUNhbnZhcykge1xuICAgICAgcmV0dXJuIHsgbWF0cml4LCBjb2xvcnMgfTtcbiAgICB9XG5cbiAgICAvLyBMb2FkIG92ZXJsYXkgaW1hZ2UgZGF0YVxuICAgIGNvbnN0IGltYWdlRGF0YSA9IGF3YWl0IHRoaXMuX2xvYWRJbWFnZURhdGFSR0Iob3ZlcmxheUNhbnZhcywgc2NhbGVkU2l6ZSk7XG4gICAgY29uc3QgaW50ZW5zaXR5ID0gb3ZlcmxheUludGVuc2l0eSAvIDEwMDtcblxuICAgIC8vIENvbnZlcnQgdG8gZ3JheXNjYWxlIGlmIG5lZWRlZFxuICAgIGlmIChjb2xvck1vZGUgPT09ICdncmF5c2NhbGUnIHx8IGNvbG9yTW9kZSA9PT0gJ2J3Jykge1xuICAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCBzY2FsZWRTaXplOyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCBzY2FsZWRTaXplOyB4KyspIHtcbiAgICAgICAgICBjb25zdCB7IHIsIGcsIGIgfSA9IGltYWdlRGF0YVt5XVt4XTtcbiAgICAgICAgICBjb25zdCBncmF5ID0gciAqIDAuMjk5ICsgZyAqIDAuNTg3ICsgYiAqIDAuMTE0O1xuICAgICAgICAgIGltYWdlRGF0YVt5XVt4XSA9IHsgcjogZ3JheSwgZzogZ3JheSwgYjogZ3JheSB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQXBwbHkgRmxveWQtU3RlaW5iZXJnIGVycm9yIGRpZmZ1c2lvbiB0byBmcmVlIHBvaW50c1xuICAgIC8vIFdpdGggb3B0aW9uYWwgc2VycGVudGluZSBzY2FubmluZyAoYWx0ZXJuYXRpbmcgcm93IGRpcmVjdGlvbilcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHNjYWxlZFNpemU7IHkrKykge1xuICAgICAgY29uc3QgbGVmdFRvUmlnaHQgPSAhc2VycGVudGluZSB8fCAoeSAlIDIgPT09IDApO1xuICAgICAgY29uc3QgeFN0YXJ0ID0gbGVmdFRvUmlnaHQgPyAwIDogc2NhbGVkU2l6ZSAtIDE7XG4gICAgICBjb25zdCB4RW5kID0gbGVmdFRvUmlnaHQgPyBzY2FsZWRTaXplIDogLTE7XG4gICAgICBjb25zdCB4U3RlcCA9IGxlZnRUb1JpZ2h0ID8gMSA6IC0xO1xuICAgICAgXG4gICAgICBmb3IgKGxldCB4ID0geFN0YXJ0OyB4ICE9PSB4RW5kOyB4ICs9IHhTdGVwKSB7XG4gICAgICAgIC8vIFNraXAgbG9ja2VkIGFyZWFzIGFuZCBkYXRhIHBvaW50c1xuICAgICAgICBpZiAoaXNMb2NrZWQoc2NhbGVkU2l6ZSwgeCwgeSwgc2NhbGUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGlzRGF0YSh4LCB5LCBzY2FsZSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHBpeGVsID0gaW1hZ2VEYXRhW3ldW3hdO1xuICAgICAgICBcbiAgICAgICAgaWYgKGNvbG9yTW9kZSA9PT0gJ2J3Jykge1xuICAgICAgICAgIGNvbnN0IGdyYXkgPSBwaXhlbC5yICogMC4yOTkgKyBwaXhlbC5nICogMC41ODcgKyBwaXhlbC5iICogMC4xMTQ7XG4gICAgICAgICAgY29uc3QgbmV3VmFsID0gZ3JheSA+IDAuNSA/IDEgOiAwO1xuICAgICAgICAgIGNvbnN0IGVycm9yID0gZ3JheSAtIG5ld1ZhbDtcbiAgICAgICAgICBcbiAgICAgICAgICBpbWFnZURhdGFbeV1beF0gPSB7IHI6IG5ld1ZhbCwgZzogbmV3VmFsLCBiOiBuZXdWYWwgfTtcbiAgICAgICAgICB0aGlzLmRpc3RyaWJ1dGVFcnJvcihpbWFnZURhdGEsIHgsIHksIHNjYWxlZFNpemUsIHNjYWxlLCBlcnJvciwgZXJyb3IsIGVycm9yKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb2xvck1vZGUgPT09ICdncmF5c2NhbGUnKSB7XG4gICAgICAgICAgY29uc3QgZ3JheSA9IHBpeGVsLnI7XG4gICAgICAgICAgY29uc3QgbGV2ZWxzID0gNDtcbiAgICAgICAgICBjb25zdCBuZXdWYWwgPSBNYXRoLnJvdW5kKGdyYXkgKiAobGV2ZWxzIC0gMSkpIC8gKGxldmVscyAtIDEpO1xuICAgICAgICAgIGNvbnN0IGVycm9yID0gZ3JheSAtIG5ld1ZhbDtcbiAgICAgICAgICBcbiAgICAgICAgICBpbWFnZURhdGFbeV1beF0gPSB7IHI6IG5ld1ZhbCwgZzogbmV3VmFsLCBiOiBuZXdWYWwgfTtcbiAgICAgICAgICB0aGlzLmRpc3RyaWJ1dGVFcnJvcihpbWFnZURhdGEsIHgsIHksIHNjYWxlZFNpemUsIHNjYWxlLCBlcnJvciwgZXJyb3IsIGVycm9yLCBsZWZ0VG9SaWdodCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgbGV2ZWxzID0gNDtcbiAgICAgICAgICBjb25zdCBuZXdSID0gTWF0aC5yb3VuZChwaXhlbC5yICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTtcbiAgICAgICAgICBjb25zdCBuZXdHID0gTWF0aC5yb3VuZChwaXhlbC5nICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTtcbiAgICAgICAgICBjb25zdCBuZXdCID0gTWF0aC5yb3VuZChwaXhlbC5iICogKGxldmVscyAtIDEpKSAvIChsZXZlbHMgLSAxKTtcbiAgICAgICAgICBcbiAgICAgICAgICBjb25zdCBlcnJvclIgPSBwaXhlbC5yIC0gbmV3UjtcbiAgICAgICAgICBjb25zdCBlcnJvckcgPSBwaXhlbC5nIC0gbmV3RztcbiAgICAgICAgICBjb25zdCBlcnJvckIgPSBwaXhlbC5iIC0gbmV3QjtcbiAgICAgICAgICBcbiAgICAgICAgICBpbWFnZURhdGFbeV1beF0gPSB7IHI6IG5ld1IsIGc6IG5ld0csIGI6IG5ld0IgfTtcbiAgICAgICAgICB0aGlzLmRpc3RyaWJ1dGVFcnJvcihpbWFnZURhdGEsIHgsIHksIHNjYWxlZFNpemUsIHNjYWxlLCBlcnJvclIsIGVycm9yRywgZXJyb3JCLCBsZWZ0VG9SaWdodCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNZXJnZSBkaXRoZXJlZCBpbWFnZSB3aXRoIFFSIG1hdHJpeFxuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc2NhbGVkU2l6ZTsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHNjYWxlZFNpemU7IHgrKykge1xuICAgICAgICBpZiAoaXNMb2NrZWQoc2NhbGVkU2l6ZSwgeCwgeSwgc2NhbGUpKSBjb250aW51ZTtcbiAgICAgICAgaWYgKGlzRGF0YSh4LCB5LCBzY2FsZSkpIGNvbnRpbnVlO1xuXG4gICAgICAgIGNvbnN0IHBpeGVsID0gaW1hZ2VEYXRhW3ldW3hdO1xuICAgICAgICBjb25zdCBicmlnaHRuZXNzID0gcGl4ZWwuciAqIDAuMjk5ICsgcGl4ZWwuZyAqIDAuNTg3ICsgcGl4ZWwuYiAqIDAuMTE0O1xuICAgICAgICBjb25zdCB1c2VJbWFnZSA9IE1hdGgucmFuZG9tKCkgPCBpbnRlbnNpdHk7XG5cbiAgICAgICAgaWYgKHVzZUltYWdlKSB7XG4gICAgICAgICAgbWF0cml4W3ldW3hdID0gYnJpZ2h0bmVzcyA8IDAuNTtcbiAgICAgICAgICBjb2xvcnNbeV1beF0gPSB7XG4gICAgICAgICAgICByOiBNYXRoLnJvdW5kKE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHBpeGVsLnIpKSAqIDI1NSksXG4gICAgICAgICAgICBnOiBNYXRoLnJvdW5kKE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHBpeGVsLmcpKSAqIDI1NSksXG4gICAgICAgICAgICBiOiBNYXRoLnJvdW5kKE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHBpeGVsLmIpKSAqIDI1NSksXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7IG1hdHJpeCwgY29sb3JzIH07XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBpbWFnZSBkYXRhIGZyb20gY2FudmFzIGFzIFJHQiB2YWx1ZXMgKDAtMSByYW5nZSlcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGFzeW5jIF9sb2FkSW1hZ2VEYXRhUkdCKGNhbnZhcywgc2l6ZSkge1xuICAgIGNvbnN0IHRlbXBDYW52YXMgPSBhd2FpdCB0aGlzLl9jcmVhdGVDYW52YXMoc2l6ZSwgc2l6ZSk7XG4gICAgY29uc3QgY3R4ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2UoY2FudmFzLCAwLCAwLCBzaXplLCBzaXplKTtcbiAgICBjb25zdCBpbWdEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBzaXplLCBzaXplKTtcblxuICAgIGNvbnN0IG91dHB1dCA9IFtdO1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgc2l6ZTsgeSsrKSB7XG4gICAgICBjb25zdCByb3cgPSBbXTtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgc2l6ZTsgeCsrKSB7XG4gICAgICAgIGNvbnN0IGkgPSAoeSAqIHNpemUgKyB4KSAqIDQ7XG4gICAgICAgIHJvdy5wdXNoKHtcbiAgICAgICAgICByOiBpbWdEYXRhLmRhdGFbaV0gLyAyNTUsXG4gICAgICAgICAgZzogaW1nRGF0YS5kYXRhW2kgKyAxXSAvIDI1NSxcbiAgICAgICAgICBiOiBpbWdEYXRhLmRhdGFbaSArIDJdIC8gMjU1LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIG91dHB1dC5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cblxuICAvKipcbiAgICogRGlzdHJpYnV0ZSBlcnJvciB0byBuZWlnaGJvcmluZyBwaXhlbHMgKEZsb3lkLVN0ZWluYmVyZylcbiAgICogU3VwcG9ydHMgc2VycGVudGluZSBzY2FubmluZyB3aXRoIGxlZnRUb1JpZ2h0IHBhcmFtZXRlclxuICAgKi9cbiAgZGlzdHJpYnV0ZUVycm9yKGltYWdlRGF0YSwgeCwgeSwgc2l6ZSwgc2NhbGUsIGVycm9yUiwgZXJyb3JHLCBlcnJvckIsIGxlZnRUb1JpZ2h0ID0gdHJ1ZSkge1xuICAgIGNvbnN0IGNhbkNoYW5nZSA9IChweCwgcHkpID0+IHtcbiAgICAgIGlmIChweCA8IDAgfHwgcHkgPCAwIHx8IHB4ID49IHNpemUgfHwgcHkgPj0gc2l6ZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgcmV0dXJuICFpc0xvY2tlZChzaXplLCBweCwgcHksIHNjYWxlKSAmJiAhaXNEYXRhKHB4LCBweSwgc2NhbGUpO1xuICAgIH07XG5cbiAgICAvLyBBZGp1c3QgZGlyZWN0aW9uIGJhc2VkIG9uIHNjYW4gZGlyZWN0aW9uXG4gICAgY29uc3QgbmV4dFggPSBsZWZ0VG9SaWdodCA/IHggKyAxIDogeCAtIDE7XG4gICAgY29uc3QgcHJldlggPSBsZWZ0VG9SaWdodCA/IHggLSAxIDogeCArIDE7XG4gICAgXG4gICAgY29uc3QgYSA9IGNhbkNoYW5nZShuZXh0WCwgeSk7XG4gICAgY29uc3QgYiA9IGNhbkNoYW5nZShwcmV2WCwgeSArIDEpO1xuICAgIGNvbnN0IGMgPSBjYW5DaGFuZ2UoeCwgeSArIDEpO1xuICAgIGNvbnN0IGQgPSBjYW5DaGFuZ2UobmV4dFgsIHkgKyAxKTtcblxuICAgIGNvbnN0IHRvdGFsID0gKGEgPyA3IDogMCkgKyAoYiA/IDMgOiAwKSArIChjID8gNSA6IDApICsgKGQgPyAxIDogMCk7XG4gICAgaWYgKHRvdGFsID09PSAwKSByZXR1cm47XG5cbiAgICBpZiAoYSkge1xuICAgICAgaW1hZ2VEYXRhW3ldW25leHRYXS5yICs9IChlcnJvclIgKiA3KSAvIHRvdGFsO1xuICAgICAgaW1hZ2VEYXRhW3ldW25leHRYXS5nICs9IChlcnJvckcgKiA3KSAvIHRvdGFsO1xuICAgICAgaW1hZ2VEYXRhW3ldW25leHRYXS5iICs9IChlcnJvckIgKiA3KSAvIHRvdGFsO1xuICAgIH1cbiAgICBpZiAoYikge1xuICAgICAgaW1hZ2VEYXRhW3kgKyAxXVtwcmV2WF0uciArPSAoZXJyb3JSICogMykgLyB0b3RhbDtcbiAgICAgIGltYWdlRGF0YVt5ICsgMV1bcHJldlhdLmcgKz0gKGVycm9yRyAqIDMpIC8gdG90YWw7XG4gICAgICBpbWFnZURhdGFbeSArIDFdW3ByZXZYXS5iICs9IChlcnJvckIgKiAzKSAvIHRvdGFsO1xuICAgIH1cbiAgICBpZiAoYykge1xuICAgICAgaW1hZ2VEYXRhW3kgKyAxXVt4XS5yICs9IChlcnJvclIgKiA1KSAvIHRvdGFsO1xuICAgICAgaW1hZ2VEYXRhW3kgKyAxXVt4XS5nICs9IChlcnJvckcgKiA1KSAvIHRvdGFsO1xuICAgICAgaW1hZ2VEYXRhW3kgKyAxXVt4XS5iICs9IChlcnJvckIgKiA1KSAvIHRvdGFsO1xuICAgIH1cbiAgICBpZiAoZCkge1xuICAgICAgaW1hZ2VEYXRhW3kgKyAxXVtuZXh0WF0uciArPSBlcnJvclIgLyB0b3RhbDtcbiAgICAgIGltYWdlRGF0YVt5ICsgMV1bbmV4dFhdLmcgKz0gZXJyb3JHIC8gdG90YWw7XG4gICAgICBpbWFnZURhdGFbeSArIDFdW25leHRYXS5iICs9IGVycm9yQiAvIHRvdGFsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgc3VicGl4ZWwgb3ZlcmxheSBkYXRhIC0gYXN5bmMgdmVyc2lvbiB1c2luZyBjYW52YXMgZmFjdG9yeVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYXN5bmMgX2dldFN1YnBpeGVsT3ZlcmxheURhdGEob3ZlcmxheUNhbnZhcywgc3VicGl4ZWxDb3VudCwgY29sb3JNb2RlID0gXCJjb2xvclwiKSB7XG4gICAgY29uc3QgdGVtcENhbnZhcyA9IGF3YWl0IHRoaXMuX2NyZWF0ZUNhbnZhcyhzdWJwaXhlbENvdW50LCBzdWJwaXhlbENvdW50KTtcbiAgICBjb25zdCBjdHggPSB0ZW1wQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgIGN0eC5kcmF3SW1hZ2Uob3ZlcmxheUNhbnZhcywgMCwgMCwgc3VicGl4ZWxDb3VudCwgc3VicGl4ZWxDb3VudCk7XG5cbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHN1YnBpeGVsQ291bnQsIHN1YnBpeGVsQ291bnQpO1xuICAgIGNvbnN0IGRhdGEgPSBpbWFnZURhdGEuZGF0YTtcblxuICAgIGNvbnN0IGJyaWdodG5lc3MgPSBbXTtcbiAgICBjb25zdCBjb2xvcnMgPSBbXTtcblxuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8IHN1YnBpeGVsQ291bnQ7IHJvdysrKSB7XG4gICAgICBicmlnaHRuZXNzW3Jvd10gPSBbXTtcbiAgICAgIGNvbG9yc1tyb3ddID0gW107XG5cbiAgICAgIGZvciAobGV0IGNvbCA9IDA7IGNvbCA8IHN1YnBpeGVsQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgIGNvbnN0IGkgPSAocm93ICogc3VicGl4ZWxDb3VudCArIGNvbCkgKiA0O1xuICAgICAgICBjb25zdCByID0gZGF0YVtpXTtcbiAgICAgICAgY29uc3QgZyA9IGRhdGFbaSArIDFdO1xuICAgICAgICBjb25zdCBiID0gZGF0YVtpICsgMl07XG5cbiAgICAgICAgY29uc3QgZ3JheSA9IE1hdGgucm91bmQociAqIDAuMjk5ICsgZyAqIDAuNTg3ICsgYiAqIDAuMTE0KTtcbiAgICAgICAgYnJpZ2h0bmVzc1tyb3ddW2NvbF0gPSBncmF5IC8gMjU1O1xuXG4gICAgICAgIGlmIChjb2xvck1vZGUgPT09IFwiYndcIikge1xuICAgICAgICAgIGNvbnN0IGJ3ID0gZ3JheSA+IDEyNyA/IDI1NSA6IDA7XG4gICAgICAgICAgY29sb3JzW3Jvd11bY29sXSA9IGByZ2IoJHtid30sJHtid30sJHtid30pYDtcbiAgICAgICAgfSBlbHNlIGlmIChjb2xvck1vZGUgPT09IFwiZ3JheXNjYWxlXCIpIHtcbiAgICAgICAgICBjb2xvcnNbcm93XVtjb2xdID0gYHJnYigke2dyYXl9LCR7Z3JheX0sJHtncmF5fSlgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbG9yc1tyb3ddW2NvbF0gPSBgcmdiKCR7cn0sJHtnfSwke2J9KWA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBicmlnaHRuZXNzLmNvbG9ycyA9IGNvbG9ycztcbiAgICByZXR1cm4gYnJpZ2h0bmVzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBhbnkgcHJlcHJvY2Vzc2luZyBvcHRpb25zIGFyZSBzZXRcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9oYXNQcmVwcm9jZXNzaW5nT3B0aW9ucyhjb25maWcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGNvbmZpZy5vdmVybGF5QnJpZ2h0bmVzcyAmJiBjb25maWcub3ZlcmxheUJyaWdodG5lc3MgIT09IDApIHx8XG4gICAgICAoY29uZmlnLm92ZXJsYXlDb250cmFzdCAmJiBjb25maWcub3ZlcmxheUNvbnRyYXN0ICE9PSAwKSB8fFxuICAgICAgKGNvbmZpZy5vdmVybGF5R2FtbWEgJiYgY29uZmlnLm92ZXJsYXlHYW1tYSAhPT0gMSkgfHxcbiAgICAgIChjb25maWcub3ZlcmxheVNhdHVyYXRpb24gJiYgY29uZmlnLm92ZXJsYXlTYXR1cmF0aW9uICE9PSAwKSB8fFxuICAgICAgKGNvbmZpZy5vdmVybGF5SHVlUm90YXRlICYmIGNvbmZpZy5vdmVybGF5SHVlUm90YXRlICE9PSAwKSB8fFxuICAgICAgY29uZmlnLmludmVydEltYWdlIHx8XG4gICAgICAoY29uZmlnLm92ZXJsYXlCbHVyICYmIGNvbmZpZy5vdmVybGF5Qmx1ciA+IDApIHx8XG4gICAgICAoY29uZmlnLm92ZXJsYXlTaGFycGVuICYmIGNvbmZpZy5vdmVybGF5U2hhcnBlbiA+IDApIHx8XG4gICAgICAoY29uZmlnLm92ZXJsYXlQb3N0ZXJpemUgJiYgY29uZmlnLm92ZXJsYXlQb3N0ZXJpemUgPiAwKSB8fFxuICAgICAgKGNvbmZpZy5vdmVybGF5RWRnZURldGVjdCAmJiBjb25maWcub3ZlcmxheUVkZ2VEZXRlY3QgIT09ICdvZmYnKSB8fFxuICAgICAgKGNvbmZpZy5vdmVybGF5VGhyZXNob2xkICE9PSB1bmRlZmluZWQgJiYgY29uZmlnLm92ZXJsYXlUaHJlc2hvbGQgIT09IDEyOCkgfHxcbiAgICAgIGNvbmZpZy5vdmVybGF5RmxpcFggfHxcbiAgICAgIGNvbmZpZy5vdmVybGF5RmxpcFkgfHxcbiAgICAgIChjb25maWcub3ZlcmxheVJvdGF0ZSAmJiBjb25maWcub3ZlcmxheVJvdGF0ZSAhPT0gMClcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIFByZXByb2Nlc3Mgb3ZlcmxheSBjYW52YXMgd2l0aCBmaWx0ZXJzIGFuZCB0cmFuc2Zvcm1zXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBhc3luYyBfcHJlcHJvY2Vzc092ZXJsYXkob3ZlcmxheUNhbnZhcywgY29uZmlnKSB7XG4gICAgY29uc3Qgd2lkdGggPSBvdmVybGF5Q2FudmFzLndpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IG92ZXJsYXlDYW52YXMuaGVpZ2h0O1xuICAgIFxuICAgIC8vIENyZWF0ZSBhIG5ldyBjYW52YXMgZm9yIHByb2Nlc3NpbmdcbiAgICBjb25zdCBwcm9jZXNzZWRDYW52YXMgPSBhd2FpdCB0aGlzLl9jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XG4gICAgY29uc3QgY3R4ID0gcHJvY2Vzc2VkQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgXG4gICAgLy8gQXBwbHkgZ2VvbWV0cmljIHRyYW5zZm9ybXMgZmlyc3RcbiAgICBjdHguc2F2ZSgpO1xuICAgIFxuICAgIC8vIEhhbmRsZSByb3RhdGlvblxuICAgIGlmIChjb25maWcub3ZlcmxheVJvdGF0ZSAmJiBjb25maWcub3ZlcmxheVJvdGF0ZSAhPT0gMCkge1xuICAgICAgY3R4LnRyYW5zbGF0ZSh3aWR0aCAvIDIsIGhlaWdodCAvIDIpO1xuICAgICAgY3R4LnJvdGF0ZSgoY29uZmlnLm92ZXJsYXlSb3RhdGUgKiBNYXRoLlBJKSAvIDE4MCk7XG4gICAgICBjdHgudHJhbnNsYXRlKC13aWR0aCAvIDIsIC1oZWlnaHQgLyAyKTtcbiAgICB9XG4gICAgXG4gICAgLy8gSGFuZGxlIGZsaXBzXG4gICAgaWYgKGNvbmZpZy5vdmVybGF5RmxpcFggfHwgY29uZmlnLm92ZXJsYXlGbGlwWSkge1xuICAgICAgY3R4LnRyYW5zbGF0ZShcbiAgICAgICAgY29uZmlnLm92ZXJsYXlGbGlwWCA/IHdpZHRoIDogMCxcbiAgICAgICAgY29uZmlnLm92ZXJsYXlGbGlwWSA/IGhlaWdodCA6IDBcbiAgICAgICk7XG4gICAgICBjdHguc2NhbGUoXG4gICAgICAgIGNvbmZpZy5vdmVybGF5RmxpcFggPyAtMSA6IDEsXG4gICAgICAgIGNvbmZpZy5vdmVybGF5RmxpcFkgPyAtMSA6IDFcbiAgICAgICk7XG4gICAgfVxuICAgIFxuICAgIGN0eC5kcmF3SW1hZ2Uob3ZlcmxheUNhbnZhcywgMCwgMCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgICBcbiAgICAvLyBHZXQgaW1hZ2UgZGF0YSBmb3IgZmlsdGVyIHByb2Nlc3NpbmdcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgIFxuICAgIC8vIEJ1aWxkIGZpbHRlciBvcHRpb25zXG4gICAgY29uc3QgZmlsdGVyT3B0aW9ucyA9IHtcbiAgICAgIGJyaWdodG5lc3M6IGNvbmZpZy5vdmVybGF5QnJpZ2h0bmVzcyB8fCAwLFxuICAgICAgY29udHJhc3Q6IGNvbmZpZy5vdmVybGF5Q29udHJhc3QgfHwgMCxcbiAgICAgIGdhbW1hOiBjb25maWcub3ZlcmxheUdhbW1hIHx8IDEsXG4gICAgICBzYXR1cmF0aW9uOiBjb25maWcub3ZlcmxheVNhdHVyYXRpb24gfHwgMCxcbiAgICAgIGh1ZVJvdGF0ZTogY29uZmlnLm92ZXJsYXlIdWVSb3RhdGUgfHwgMCxcbiAgICAgIGludmVydDogY29uZmlnLmludmVydEltYWdlIHx8IGZhbHNlLFxuICAgICAgYmx1cjogY29uZmlnLm92ZXJsYXlCbHVyIHx8IDAsXG4gICAgICBzaGFycGVuOiBjb25maWcub3ZlcmxheVNoYXJwZW4gfHwgMCxcbiAgICAgIHBvc3Rlcml6ZTogY29uZmlnLm92ZXJsYXlQb3N0ZXJpemUgfHwgMCxcbiAgICAgIGVkZ2VEZXRlY3Q6IGNvbmZpZy5vdmVybGF5RWRnZURldGVjdCB8fCAnb2ZmJyxcbiAgICB9O1xuICAgIFxuICAgIC8vIE9ubHkgYXBwbHkgdGhyZXNob2xkIGlmIGV4cGxpY2l0bHkgc2V0IGFuZCBlZGdlIGRldGVjdGlvbiBpcyBvZmZcbiAgICBpZiAoY29uZmlnLm92ZXJsYXlUaHJlc2hvbGQgIT09IHVuZGVmaW5lZCAmJiBcbiAgICAgICAgY29uZmlnLm92ZXJsYXlUaHJlc2hvbGQgIT09IDEyOCAmJiBcbiAgICAgICAgZmlsdGVyT3B0aW9ucy5lZGdlRGV0ZWN0ID09PSAnb2ZmJykge1xuICAgICAgZmlsdGVyT3B0aW9ucy50aHJlc2hvbGQgPSBjb25maWcub3ZlcmxheVRocmVzaG9sZDtcbiAgICB9XG4gICAgXG4gICAgLy8gQXBwbHkgZmlsdGVycyBtYW51YWxseSAoc2VsZi1jb250YWluZWQgaW1wbGVtZW50YXRpb24pXG4gICAgdGhpcy5fYXBwbHlGaWx0ZXJzTWFudWFsKGltYWdlRGF0YSwgZmlsdGVyT3B0aW9ucyk7XG4gICAgXG4gICAgLy8gUHV0IHByb2Nlc3NlZCBpbWFnZSBkYXRhIGJhY2tcbiAgICBjdHgucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgXG4gICAgcmV0dXJuIHByb2Nlc3NlZENhbnZhcztcbiAgfVxuXG4gIC8qKlxuICAgKiBNYW51YWwgZmlsdGVyIGFwcGxpY2F0aW9uIC0gc2VsZi1jb250YWluZWQgaW1wbGVtZW50YXRpb25cbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hcHBseUZpbHRlcnNNYW51YWwoaW1hZ2VEYXRhLCBvcHRpb25zKSB7XG4gICAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhO1xuICAgIFxuICAgIC8vIEZpcnN0IHBhc3M6IHBlci1waXhlbCBhZGp1c3RtZW50c1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgbGV0IHIgPSBkYXRhW2ldO1xuICAgICAgbGV0IGcgPSBkYXRhW2kgKyAxXTtcbiAgICAgIGxldCBiID0gZGF0YVtpICsgMl07XG4gICAgICBcbiAgICAgIC8vIEJyaWdodG5lc3NcbiAgICAgIGlmIChvcHRpb25zLmJyaWdodG5lc3MgJiYgb3B0aW9ucy5icmlnaHRuZXNzICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IGZhY3RvciA9IG9wdGlvbnMuYnJpZ2h0bmVzcyAqIDIuNTU7XG4gICAgICAgIHIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIHIgKyBmYWN0b3IpKTtcbiAgICAgICAgZyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZyArIGZhY3RvcikpO1xuICAgICAgICBiID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBiICsgZmFjdG9yKSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIENvbnRyYXN0XG4gICAgICBpZiAob3B0aW9ucy5jb250cmFzdCAmJiBvcHRpb25zLmNvbnRyYXN0ICE9PSAwKSB7XG4gICAgICAgIGNvbnN0IGZhY3RvciA9ICgyNTkgKiAob3B0aW9ucy5jb250cmFzdCArIDI1NSkpIC8gKDI1NSAqICgyNTkgLSBvcHRpb25zLmNvbnRyYXN0KSk7XG4gICAgICAgIHIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIGZhY3RvciAqIChyIC0gMTI4KSArIDEyOCkpO1xuICAgICAgICBnID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBmYWN0b3IgKiAoZyAtIDEyOCkgKyAxMjgpKTtcbiAgICAgICAgYiA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZmFjdG9yICogKGIgLSAxMjgpICsgMTI4KSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIEdhbW1hXG4gICAgICBpZiAob3B0aW9ucy5nYW1tYSAmJiBvcHRpb25zLmdhbW1hICE9PSAxKSB7XG4gICAgICAgIGNvbnN0IGdhbW1hQ29ycmVjdGlvbiA9IDEgLyBvcHRpb25zLmdhbW1hO1xuICAgICAgICByID0gMjU1ICogTWF0aC5wb3cociAvIDI1NSwgZ2FtbWFDb3JyZWN0aW9uKTtcbiAgICAgICAgZyA9IDI1NSAqIE1hdGgucG93KGcgLyAyNTUsIGdhbW1hQ29ycmVjdGlvbik7XG4gICAgICAgIGIgPSAyNTUgKiBNYXRoLnBvdyhiIC8gMjU1LCBnYW1tYUNvcnJlY3Rpb24pO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBTYXR1cmF0aW9uXG4gICAgICBpZiAob3B0aW9ucy5zYXR1cmF0aW9uICYmIG9wdGlvbnMuc2F0dXJhdGlvbiAhPT0gMCkge1xuICAgICAgICBjb25zdCBncmF5ID0gciAqIDAuMjk5ICsgZyAqIDAuNTg3ICsgYiAqIDAuMTE0O1xuICAgICAgICBjb25zdCBmYWN0b3IgPSAob3B0aW9ucy5zYXR1cmF0aW9uICsgMTAwKSAvIDEwMDtcbiAgICAgICAgciA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZ3JheSArIGZhY3RvciAqIChyIC0gZ3JheSkpKTtcbiAgICAgICAgZyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZ3JheSArIGZhY3RvciAqIChnIC0gZ3JheSkpKTtcbiAgICAgICAgYiA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZ3JheSArIGZhY3RvciAqIChiIC0gZ3JheSkpKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gSHVlIHJvdGF0aW9uXG4gICAgICBpZiAob3B0aW9ucy5odWVSb3RhdGUgJiYgb3B0aW9ucy5odWVSb3RhdGUgIT09IDApIHtcbiAgICAgICAgY29uc3QgYW5nbGUgPSAob3B0aW9ucy5odWVSb3RhdGUgKiBNYXRoLlBJKSAvIDE4MDtcbiAgICAgICAgY29uc3QgY29zID0gTWF0aC5jb3MoYW5nbGUpO1xuICAgICAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgICAgIGNvbnN0IG5ld1IgPSByICogKDAuMjEzICsgY29zICogMC43ODcgLSBzaW4gKiAwLjIxMykgKyBcbiAgICAgICAgICAgICAgICAgICAgIGcgKiAoMC43MTUgLSBjb3MgKiAwLjcxNSAtIHNpbiAqIDAuNzE1KSArIFxuICAgICAgICAgICAgICAgICAgICAgYiAqICgwLjA3MiAtIGNvcyAqIDAuMDcyICsgc2luICogMC45MjgpO1xuICAgICAgICBjb25zdCBuZXdHID0gciAqICgwLjIxMyAtIGNvcyAqIDAuMjEzICsgc2luICogMC4xNDMpICsgXG4gICAgICAgICAgICAgICAgICAgICBnICogKDAuNzE1ICsgY29zICogMC4yODUgKyBzaW4gKiAwLjE0KSArIFxuICAgICAgICAgICAgICAgICAgICAgYiAqICgwLjA3MiAtIGNvcyAqIDAuMDcyIC0gc2luICogMC4yODMpO1xuICAgICAgICBjb25zdCBuZXdCID0gciAqICgwLjIxMyAtIGNvcyAqIDAuMjEzIC0gc2luICogMC43ODcpICsgXG4gICAgICAgICAgICAgICAgICAgICBnICogKDAuNzE1IC0gY29zICogMC43MTUgKyBzaW4gKiAwLjcxNSkgKyBcbiAgICAgICAgICAgICAgICAgICAgIGIgKiAoMC4wNzIgKyBjb3MgKiAwLjkyOCArIHNpbiAqIDAuMDcyKTtcbiAgICAgICAgciA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgbmV3UikpO1xuICAgICAgICBnID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBuZXdHKSk7XG4gICAgICAgIGIgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIG5ld0IpKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gUG9zdGVyaXplXG4gICAgICBpZiAob3B0aW9ucy5wb3N0ZXJpemUgJiYgb3B0aW9ucy5wb3N0ZXJpemUgPiAwKSB7XG4gICAgICAgIGNvbnN0IGxldmVscyA9IG9wdGlvbnMucG9zdGVyaXplO1xuICAgICAgICBjb25zdCBzdGVwID0gMjU1IC8gKGxldmVscyAtIDEpO1xuICAgICAgICByID0gTWF0aC5yb3VuZChNYXRoLnJvdW5kKHIgLyBzdGVwKSAqIHN0ZXApO1xuICAgICAgICBnID0gTWF0aC5yb3VuZChNYXRoLnJvdW5kKGcgLyBzdGVwKSAqIHN0ZXApO1xuICAgICAgICBiID0gTWF0aC5yb3VuZChNYXRoLnJvdW5kKGIgLyBzdGVwKSAqIHN0ZXApO1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyBJbnZlcnRcbiAgICAgIGlmIChvcHRpb25zLmludmVydCkge1xuICAgICAgICByID0gMjU1IC0gcjtcbiAgICAgICAgZyA9IDI1NSAtIGc7XG4gICAgICAgIGIgPSAyNTUgLSBiO1xuICAgICAgfVxuICAgICAgXG4gICAgICBkYXRhW2ldID0gTWF0aC5yb3VuZChyKTtcbiAgICAgIGRhdGFbaSArIDFdID0gTWF0aC5yb3VuZChnKTtcbiAgICAgIGRhdGFbaSArIDJdID0gTWF0aC5yb3VuZChiKTtcbiAgICB9XG4gICAgXG4gICAgLy8gU2Vjb25kIHBhc3M6IGNvbnZvbHV0aW9uIGZpbHRlcnMgKGJsdXIsIHNoYXJwZW4pXG4gICAgaWYgKG9wdGlvbnMuYmx1ciAmJiBvcHRpb25zLmJsdXIgPiAwKSB7XG4gICAgICB0aGlzLl9hcHBseUJveEJsdXIoaW1hZ2VEYXRhLCBNYXRoLm1pbihvcHRpb25zLmJsdXIsIDUpKTtcbiAgICB9XG4gICAgXG4gICAgaWYgKG9wdGlvbnMuc2hhcnBlbiAmJiBvcHRpb25zLnNoYXJwZW4gPiAwKSB7XG4gICAgICB0aGlzLl9hcHBseVNoYXJwZW4oaW1hZ2VEYXRhLCBvcHRpb25zLnNoYXJwZW4gLyAxMDApO1xuICAgIH1cbiAgICBcbiAgICAvLyBFZGdlIGRldGVjdGlvblxuICAgIGlmIChvcHRpb25zLmVkZ2VEZXRlY3QgPT09ICdzb2JlbCcpIHtcbiAgICAgIHRoaXMuX2FwcGx5U29iZWxFZGdlKGltYWdlRGF0YSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGJveCBibHVyXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYXBwbHlCb3hCbHVyKGltYWdlRGF0YSwgcmFkaXVzKSB7XG4gICAgY29uc3QgZGF0YSA9IGltYWdlRGF0YS5kYXRhO1xuICAgIGNvbnN0IHdpZHRoID0gaW1hZ2VEYXRhLndpZHRoO1xuICAgIGNvbnN0IGhlaWdodCA9IGltYWdlRGF0YS5oZWlnaHQ7XG4gICAgY29uc3QgY29weSA9IG5ldyBVaW50OENsYW1wZWRBcnJheShkYXRhKTtcbiAgICBjb25zdCBzaXplID0gcmFkaXVzICogMiArIDE7XG4gICAgY29uc3QgZGl2aXNvciA9IHNpemUgKiBzaXplO1xuICAgIFxuICAgIGZvciAobGV0IHkgPSByYWRpdXM7IHkgPCBoZWlnaHQgLSByYWRpdXM7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IHJhZGl1czsgeCA8IHdpZHRoIC0gcmFkaXVzOyB4KyspIHtcbiAgICAgICAgbGV0IHIgPSAwLCBnID0gMCwgYiA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBreSA9IC1yYWRpdXM7IGt5IDw9IHJhZGl1czsga3krKykge1xuICAgICAgICAgIGZvciAobGV0IGt4ID0gLXJhZGl1czsga3ggPD0gcmFkaXVzOyBreCsrKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSAoKHkgKyBreSkgKiB3aWR0aCArICh4ICsga3gpKSAqIDQ7XG4gICAgICAgICAgICByICs9IGNvcHlbaWR4XTtcbiAgICAgICAgICAgIGcgKz0gY29weVtpZHggKyAxXTtcbiAgICAgICAgICAgIGIgKz0gY29weVtpZHggKyAyXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNvbnN0IG91dElkeCA9ICh5ICogd2lkdGggKyB4KSAqIDQ7XG4gICAgICAgIGRhdGFbb3V0SWR4XSA9IE1hdGgucm91bmQociAvIGRpdmlzb3IpO1xuICAgICAgICBkYXRhW291dElkeCArIDFdID0gTWF0aC5yb3VuZChnIC8gZGl2aXNvcik7XG4gICAgICAgIGRhdGFbb3V0SWR4ICsgMl0gPSBNYXRoLnJvdW5kKGIgLyBkaXZpc29yKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgc2hhcnBlbiBmaWx0ZXJcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9hcHBseVNoYXJwZW4oaW1hZ2VEYXRhLCBhbW91bnQpIHtcbiAgICBjb25zdCBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG4gICAgY29uc3Qgd2lkdGggPSBpbWFnZURhdGEud2lkdGg7XG4gICAgY29uc3QgaGVpZ2h0ID0gaW1hZ2VEYXRhLmhlaWdodDtcbiAgICBjb25zdCBjb3B5ID0gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGRhdGEpO1xuICAgIFxuICAgIC8vIFNoYXJwZW4ga2VybmVsOiBjZW50ZXIgPSAxICsgNCphbW91bnQsIG5laWdoYm9ycyA9IC1hbW91bnRcbiAgICBjb25zdCBrZXJuZWwgPSBbXG4gICAgICAwLCAtYW1vdW50LCAwLFxuICAgICAgLWFtb3VudCwgMSArIDQgKiBhbW91bnQsIC1hbW91bnQsXG4gICAgICAwLCAtYW1vdW50LCAwLFxuICAgIF07XG4gICAgXG4gICAgZm9yIChsZXQgeSA9IDE7IHkgPCBoZWlnaHQgLSAxOyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAxOyB4IDwgd2lkdGggLSAxOyB4KyspIHtcbiAgICAgICAgbGV0IHIgPSAwLCBnID0gMCwgYiA9IDA7XG4gICAgICAgIGxldCBraSA9IDA7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBreSA9IC0xOyBreSA8PSAxOyBreSsrKSB7XG4gICAgICAgICAgZm9yIChsZXQga3ggPSAtMTsga3ggPD0gMTsga3grKykge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gKCh5ICsga3kpICogd2lkdGggKyAoeCArIGt4KSkgKiA0O1xuICAgICAgICAgICAgY29uc3QgayA9IGtlcm5lbFtraSsrXTtcbiAgICAgICAgICAgIHIgKz0gY29weVtpZHhdICogaztcbiAgICAgICAgICAgIGcgKz0gY29weVtpZHggKyAxXSAqIGs7XG4gICAgICAgICAgICBiICs9IGNvcHlbaWR4ICsgMl0gKiBrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgY29uc3Qgb3V0SWR4ID0gKHkgKiB3aWR0aCArIHgpICogNDtcbiAgICAgICAgZGF0YVtvdXRJZHhdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHIpKSk7XG4gICAgICAgIGRhdGFbb3V0SWR4ICsgMV0gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQoZykpKTtcbiAgICAgICAgZGF0YVtvdXRJZHggKyAyXSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZChiKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSBTb2JlbCBlZGdlIGRldGVjdGlvblxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FwcGx5U29iZWxFZGdlKGltYWdlRGF0YSkge1xuICAgIGNvbnN0IGRhdGEgPSBpbWFnZURhdGEuZGF0YTtcbiAgICBjb25zdCB3aWR0aCA9IGltYWdlRGF0YS53aWR0aDtcbiAgICBjb25zdCBoZWlnaHQgPSBpbWFnZURhdGEuaGVpZ2h0O1xuICAgIFxuICAgIC8vIENvbnZlcnQgdG8gZ3JheXNjYWxlIGZpcnN0XG4gICAgY29uc3QgZ3JheSA9IG5ldyBGbG9hdDMyQXJyYXkod2lkdGggKiBoZWlnaHQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd2lkdGggKiBoZWlnaHQ7IGkrKykge1xuICAgICAgY29uc3QgaWR4ID0gaSAqIDQ7XG4gICAgICBncmF5W2ldID0gZGF0YVtpZHhdICogMC4yOTkgKyBkYXRhW2lkeCArIDFdICogMC41ODcgKyBkYXRhW2lkeCArIDJdICogMC4xMTQ7XG4gICAgfVxuICAgIFxuICAgIC8vIFNvYmVsIGtlcm5lbHNcbiAgICBjb25zdCBzb2JlbFggPSBbLTEsIDAsIDEsIC0yLCAwLCAyLCAtMSwgMCwgMV07XG4gICAgY29uc3Qgc29iZWxZID0gWy0xLCAtMiwgLTEsIDAsIDAsIDAsIDEsIDIsIDFdO1xuICAgIFxuICAgIGZvciAobGV0IHkgPSAxOyB5IDwgaGVpZ2h0IC0gMTsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMTsgeCA8IHdpZHRoIC0gMTsgeCsrKSB7XG4gICAgICAgIGxldCBneCA9IDAsIGd5ID0gMDtcbiAgICAgICAgbGV0IGtpID0gMDtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGt5ID0gLTE7IGt5IDw9IDE7IGt5KyspIHtcbiAgICAgICAgICBmb3IgKGxldCBreCA9IC0xOyBreCA8PSAxOyBreCsrKSB7XG4gICAgICAgICAgICBjb25zdCBncmF5SWR4ID0gKHkgKyBreSkgKiB3aWR0aCArICh4ICsga3gpO1xuICAgICAgICAgICAgZ3ggKz0gZ3JheVtncmF5SWR4XSAqIHNvYmVsWFtraV07XG4gICAgICAgICAgICBneSArPSBncmF5W2dyYXlJZHhdICogc29iZWxZW2tpXTtcbiAgICAgICAgICAgIGtpKys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtYWduaXR1ZGUgPSBNYXRoLm1pbigyNTUsIE1hdGguc3FydChneCAqIGd4ICsgZ3kgKiBneSkpO1xuICAgICAgICBjb25zdCBvdXRJZHggPSAoeSAqIHdpZHRoICsgeCkgKiA0O1xuICAgICAgICBkYXRhW291dElkeF0gPSBtYWduaXR1ZGU7XG4gICAgICAgIGRhdGFbb3V0SWR4ICsgMV0gPSBtYWduaXR1ZGU7XG4gICAgICAgIGRhdGFbb3V0SWR4ICsgMl0gPSBtYWduaXR1ZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IHBlci1tb2R1bGUgY29sb3IgbW9kZVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2FwcGx5UGVyTW9kdWxlQ29sb3IobW9kZSwgYmFzZUNvbG9yLCBvdmVybGF5RGF0YSwgcm93LCBjb2wsIG1vZHVsZUNvdW50LCBjb25maWcpIHtcbiAgICBjb25zdCBicmlnaHRuZXNzID0gb3ZlcmxheURhdGFbcm93XT8uW2NvbF0gPz8gMC41O1xuICAgIGNvbnN0IG92ZXJsYXlDb2xvciA9IG92ZXJsYXlEYXRhLmNvbG9ycz8uW3Jvd10/Lltjb2xdO1xuICAgIGNvbnN0IGludGVuc2l0eSA9IChjb25maWcub3ZlcmxheUludGVuc2l0eSB8fCAxMDApIC8gMTAwO1xuICAgIFxuICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgY2FzZSAnYnlfYnJpZ2h0bmVzcyc6IHtcbiAgICAgICAgLy8gVmFyeSBtb2R1bGUgY29sb3IgYmFzZWQgb24gaW1hZ2UgYnJpZ2h0bmVzc1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUNvbG9yKGJhc2VDb2xvcik7XG4gICAgICAgIGNvbnN0IGZhY3RvciA9IDAuNSArIGJyaWdodG5lc3MgKiAwLjU7IC8vIDAuNSB0byAxLjBcbiAgICAgICAgcmV0dXJuIGByZ2IoJHtNYXRoLnJvdW5kKHBhcnNlZC5yICogZmFjdG9yKX0sJHtNYXRoLnJvdW5kKHBhcnNlZC5nICogZmFjdG9yKX0sJHtNYXRoLnJvdW5kKHBhcnNlZC5iICogZmFjdG9yKX0pYDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY2FzZSAnYnlfcG9zaXRpb24nOiB7XG4gICAgICAgIC8vIENvbG9yIHZhcmllcyBiYXNlZCBvbiBwb3NpdGlvbiBpbiBRUiBjb2RlXG4gICAgICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlQ29sb3IoYmFzZUNvbG9yKTtcbiAgICAgICAgY29uc3QgeEZhY3RvciA9IGNvbCAvIG1vZHVsZUNvdW50O1xuICAgICAgICBjb25zdCB5RmFjdG9yID0gcm93IC8gbW9kdWxlQ291bnQ7XG4gICAgICAgIGNvbnN0IHIgPSBNYXRoLnJvdW5kKHBhcnNlZC5yICogKDAuNSArIHhGYWN0b3IgKiAwLjUpKTtcbiAgICAgICAgY29uc3QgZyA9IE1hdGgucm91bmQocGFyc2VkLmcgKiAoMC41ICsgeUZhY3RvciAqIDAuNSkpO1xuICAgICAgICBjb25zdCBiID0gTWF0aC5yb3VuZChwYXJzZWQuYiAqICgwLjUgKyAoMSAtIHhGYWN0b3IpICogMC41KSk7XG4gICAgICAgIHJldHVybiBgcmdiKCR7cn0sJHtnfSwke2J9KWA7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNhc2UgJ2J5X292ZXJsYXknOiB7XG4gICAgICAgIC8vIFVzZSBvdmVybGF5IGltYWdlIGNvbG9yIGRpcmVjdGx5XG4gICAgICAgIGlmIChvdmVybGF5Q29sb3IpIHtcbiAgICAgICAgICByZXR1cm4gYmxlbmRDb2xvcnMoYmFzZUNvbG9yLCBvdmVybGF5Q29sb3IsIGludGVuc2l0eSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJhc2VDb2xvcjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY2FzZSAnYnlfY2x1c3Rlcic6IHtcbiAgICAgICAgLy8gR3JvdXAgbmVhcmJ5IG1vZHVsZXMgd2l0aCBzaW1pbGFyIGNvbG9yc1xuICAgICAgICBjb25zdCBibG9ja1NpemUgPSAzO1xuICAgICAgICBjb25zdCBibG9ja1JvdyA9IE1hdGguZmxvb3Iocm93IC8gYmxvY2tTaXplKTtcbiAgICAgICAgY29uc3QgYmxvY2tDb2wgPSBNYXRoLmZsb29yKGNvbCAvIGJsb2NrU2l6ZSk7XG4gICAgICAgIGNvbnN0IHNlZWQgPSBibG9ja1JvdyAqIDEwMCArIGJsb2NrQ29sO1xuICAgICAgICBjb25zdCBodWVTaGlmdCA9IChzZWVkICogMzcpICUgMzYwO1xuICAgICAgICBjb25zdCBwYXJzZWQgPSBwYXJzZUNvbG9yKGJhc2VDb2xvcik7XG4gICAgICAgIC8vIFNpbXBsZSBodWUgcm90YXRpb24gYXBwcm94aW1hdGlvblxuICAgICAgICBjb25zdCBhbmdsZSA9IChodWVTaGlmdCAqIE1hdGguUEkpIC8gMTgwO1xuICAgICAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gICAgICAgIGNvbnN0IHNpbiA9IE1hdGguc2luKGFuZ2xlKTtcbiAgICAgICAgY29uc3QgciA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcGFyc2VkLnIgKiAoMC4yMTMgKyBjb3MgKiAwLjc4NyAtIHNpbiAqIDAuMjEzKSArIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmcgKiAoMC43MTUgLSBjb3MgKiAwLjcxNSAtIHNpbiAqIDAuNzE1KSArIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmIgKiAoMC4wNzIgLSBjb3MgKiAwLjA3MiArIHNpbiAqIDAuOTI4KSkpO1xuICAgICAgICBjb25zdCBnID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBwYXJzZWQuciAqICgwLjIxMyAtIGNvcyAqIDAuMjEzICsgc2luICogMC4xNDMpICsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWQuZyAqICgwLjcxNSArIGNvcyAqIDAuMjg1ICsgc2luICogMC4xNCkgKyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZC5iICogKDAuMDcyIC0gY29zICogMC4wNzIgLSBzaW4gKiAwLjI4MykpKTtcbiAgICAgICAgY29uc3QgYiA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcGFyc2VkLnIgKiAoMC4yMTMgLSBjb3MgKiAwLjIxMyAtIHNpbiAqIDAuNzg3KSArIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmcgKiAoMC43MTUgLSBjb3MgKiAwLjcxNSArIHNpbiAqIDAuNzE1KSArIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkLmIgKiAoMC4wNzIgKyBjb3MgKiAwLjkyOCArIHNpbiAqIDAuMDcyKSkpO1xuICAgICAgICByZXR1cm4gYHJnYigke01hdGgucm91bmQocil9LCR7TWF0aC5yb3VuZChnKX0sJHtNYXRoLnJvdW5kKGIpfSlgO1xuICAgICAgfVxuICAgICAgXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gYmFzZUNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBFbnN1cmUgbW9kdWxlIGNvbG9yIGhhcyBzdWZmaWNpZW50IGNvbnRyYXN0IHdpdGggYmFja2dyb3VuZFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgX2Vuc3VyZUNvbnRyYXN0KG1vZHVsZUNvbG9yLCBiZ0NvbG9yLCBtaW5SYXRpbykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByYXRpbyA9IGdldENvbnRyYXN0UmF0aW8obW9kdWxlQ29sb3IsIGJnQ29sb3IpO1xuICAgICAgaWYgKHJhdGlvID49IG1pblJhdGlvKSB7XG4gICAgICAgIHJldHVybiBtb2R1bGVDb2xvcjtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gRGFya2VuIHRoZSBtb2R1bGUgY29sb3IgdG8gaW1wcm92ZSBjb250cmFzdFxuICAgICAgY29uc3QgcGFyc2VkID0gcGFyc2VDb2xvcihtb2R1bGVDb2xvcik7XG4gICAgICBsZXQgZmFjdG9yID0gMC45O1xuICAgICAgbGV0IG5ld0NvbG9yID0gbW9kdWxlQ29sb3I7XG4gICAgICBcbiAgICAgIC8vIEl0ZXJhdGl2ZWx5IGRhcmtlbiB1bnRpbCB3ZSBtZWV0IGNvbnRyYXN0IHJhdGlvXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgY29uc3QgciA9IE1hdGgucm91bmQocGFyc2VkLnIgKiBmYWN0b3IpO1xuICAgICAgICBjb25zdCBnID0gTWF0aC5yb3VuZChwYXJzZWQuZyAqIGZhY3Rvcik7XG4gICAgICAgIGNvbnN0IGIgPSBNYXRoLnJvdW5kKHBhcnNlZC5iICogZmFjdG9yKTtcbiAgICAgICAgbmV3Q29sb3IgPSBgcmdiKCR7cn0sJHtnfSwke2J9KWA7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBuZXdSYXRpbyA9IGdldENvbnRyYXN0UmF0aW8obmV3Q29sb3IsIGJnQ29sb3IpO1xuICAgICAgICBpZiAobmV3UmF0aW8gPj0gbWluUmF0aW8pIHtcbiAgICAgICAgICByZXR1cm4gbmV3Q29sb3I7XG4gICAgICAgIH1cbiAgICAgICAgZmFjdG9yICo9IDAuODU7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIElmIHN0aWxsIG5vdCBlbm91Z2ggY29udHJhc3QsIHJldHVybiBibGFja1xuICAgICAgcmV0dXJuICcjMDAwMDAwJztcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbW9kdWxlQ29sb3I7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEFwcGx5IGFkdmFuY2VkIGRpdGhlcmluZyB1c2luZyBkaXRoZXItYWxnb3JpdGhtcyBtb2R1bGVcbiAgICogU3VwcG9ydHMgYWxsIGRpdGhlcmluZyB0eXBlczogb3JkZXJlZCwgZXJyb3IgZGlmZnVzaW9uLCBibHVlIG5vaXNlLCBldGMuXG4gICAqL1xuICBhc3luYyBhcHBseUFkdmFuY2VkRGl0aGVyKG92ZXJsYXlDYW52YXMsIG1vZHVsZUNvdW50LCBjb25maWcpIHtcbiAgICAvLyBHZXQgb3ZlcmxheSBhcyBJbWFnZURhdGEgYXQgbW9kdWxlIHJlc29sdXRpb24gdXNpbmcgY2FudmFzIGZhY3RvcnlcbiAgICBjb25zdCB0ZW1wQ2FudmFzID0gYXdhaXQgdGhpcy5fY3JlYXRlQ2FudmFzKG1vZHVsZUNvdW50LCBtb2R1bGVDb3VudCk7XG4gICAgY29uc3QgY3R4ID0gdGVtcENhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5kcmF3SW1hZ2Uob3ZlcmxheUNhbnZhcywgMCwgMCwgbW9kdWxlQ291bnQsIG1vZHVsZUNvdW50KTtcbiAgICBjb25zdCBpbWFnZURhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIG1vZHVsZUNvdW50LCBtb2R1bGVDb3VudCk7XG4gICAgXG4gICAgLy8gQnVpbGQgZGl0aGVyIG9wdGlvbnMgZnJvbSBjb25maWdcbiAgICBjb25zdCBkaXRoZXJPcHRpb25zID0ge1xuICAgICAga2luZDogY29uZmlnLmRpdGhlcktpbmQgfHwgJ2Vycm9yX2RpZmZ1c2lvbicsXG4gICAgICBzdHJlbmd0aDogY29uZmlnLmRpdGhlclN0cmVuZ3RoID8/IDEwMCxcbiAgICAgIHNlcnBlbnRpbmU6IGNvbmZpZy5zZXJwZW50aW5lICE9PSBmYWxzZSxcbiAgICAgIGRpZmZ1c2lvbktlcm5lbDogY29uZmlnLmRpZmZ1c2lvbktlcm5lbCB8fCAnZmxveWRfc3RlaW5iZXJnJyxcbiAgICAgIG9yZGVyZWRNYXRyaXg6IGNvbmZpZy5vcmRlcmVkTWF0cml4IHx8ICdiYXllcjQnLFxuICAgICAgY29sb3JNb2RlOiBjb25maWcuY29sb3JNb2RlIHx8ICdidycsXG4gICAgICBsZXZlbHM6IDIsXG4gICAgICBibHVlTm9pc2VTZWVkOiBjb25maWcuYmx1ZU5vaXNlU2VlZCB8fCAwLFxuICAgICAgYmx1ZU5vaXNlVGlsZVNpemU6IGNvbmZpZy5ibHVlTm9pc2VUaWxlU2l6ZSB8fCA2NCxcbiAgICB9O1xuICAgIFxuICAgIC8vIEFwcGx5IGRpdGhlcmluZyBhbGdvcml0aG1cbiAgICBjb25zdCByZXN1bHQgPSBhcHBseURpdGhlcihpbWFnZURhdGEsIGRpdGhlck9wdGlvbnMpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQXBwbHkgcGFsZXR0ZSBjb2xvciB0byBhIG1vZHVsZSBiYXNlZCBvbiBwb3NpdGlvbi9icmlnaHRuZXNzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfYXBwbHlQYWxldHRlQ29sb3Iocm93LCBjb2wsIG1vZHVsZUNvdW50LCBicmlnaHRuZXNzLCBwYWxldHRlLCBjb25maWcpIHtcbiAgICBpZiAoIXBhbGV0dGUgfHwgcGFsZXR0ZS5sZW5ndGggPT09IDApIHJldHVybiBjb25maWcuZmdDb2xvcjtcbiAgICBcbiAgICBjb25zdCBwYWxldHRlTW9kZSA9IGNvbmZpZy5wYWxldHRlTW9kZSB8fCAncG9zaXRpb24nO1xuICAgIFxuICAgIHN3aXRjaCAocGFsZXR0ZU1vZGUpIHtcbiAgICAgIGNhc2UgJ2JyaWdodG5lc3MnOiB7XG4gICAgICAgIC8vIE1hcCBicmlnaHRuZXNzIHRvIHBhbGV0dGUgaW5kZXhcbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcigoMSAtIGJyaWdodG5lc3MpICogKHBhbGV0dGUubGVuZ3RoIC0gMC4wMSkpO1xuICAgICAgICByZXR1cm4gcGFsZXR0ZVtNYXRoLm1heCgwLCBNYXRoLm1pbihwYWxldHRlLmxlbmd0aCAtIDEsIGlkeCkpXTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ2RpYWdvbmFsJzoge1xuICAgICAgICAvLyBDb2xvciBiYXNlZCBvbiBkaWFnb25hbCBwb3NpdGlvblxuICAgICAgICBjb25zdCBkaWFnID0gKHJvdyArIGNvbCkgLyAobW9kdWxlQ291bnQgKiAyKTtcbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcihkaWFnICogcGFsZXR0ZS5sZW5ndGgpICUgcGFsZXR0ZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBwYWxldHRlW2lkeF07XG4gICAgICB9XG4gICAgICBjYXNlICdyYWRpYWwnOiB7XG4gICAgICAgIC8vIENvbG9yIGJhc2VkIG9uIGRpc3RhbmNlIGZyb20gY2VudGVyXG4gICAgICAgIGNvbnN0IGN4ID0gbW9kdWxlQ291bnQgLyAyO1xuICAgICAgICBjb25zdCBjeSA9IG1vZHVsZUNvdW50IC8gMjtcbiAgICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydCgocm93IC0gY3kpICoqIDIgKyAoY29sIC0gY3gpICoqIDIpO1xuICAgICAgICBjb25zdCBtYXhEaXN0ID0gTWF0aC5zcXJ0KGN4ICoqIDIgKyBjeSAqKiAyKTtcbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcigoZGlzdCAvIG1heERpc3QpICogcGFsZXR0ZS5sZW5ndGgpICUgcGFsZXR0ZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBwYWxldHRlW2lkeF07XG4gICAgICB9XG4gICAgICBjYXNlICdyYW5kb20nOiB7XG4gICAgICAgIC8vIERldGVybWluaXN0aWMgcmFuZG9tIGJhc2VkIG9uIHBvc2l0aW9uXG4gICAgICAgIGNvbnN0IGhhc2ggPSAoKHJvdyAqIDMxICsgY29sKSAqIDE3KSAlIHBhbGV0dGUubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcGFsZXR0ZVtoYXNoXTtcbiAgICAgIH1cbiAgICAgIGNhc2UgJ3Jvdyc6IHtcbiAgICAgICAgLy8gQ29sb3IgYnkgcm93XG4gICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IoKHJvdyAvIG1vZHVsZUNvdW50KSAqIHBhbGV0dGUubGVuZ3RoKSAlIHBhbGV0dGUubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcGFsZXR0ZVtpZHhdO1xuICAgICAgfVxuICAgICAgY2FzZSAnY29sdW1uJzoge1xuICAgICAgICAvLyBDb2xvciBieSBjb2x1bW5cbiAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcigoY29sIC8gbW9kdWxlQ291bnQpICogcGFsZXR0ZS5sZW5ndGgpICUgcGFsZXR0ZS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBwYWxldHRlW2lkeF07XG4gICAgICB9XG4gICAgICBjYXNlICdwb3NpdGlvbic6XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIC8vIEN5Y2xlIHRocm91Z2ggcGFsZXR0ZSBiYXNlZCBvbiBsaW5lYXIgcG9zaXRpb25cbiAgICAgICAgY29uc3QgbGluZWFyUG9zID0gcm93ICogbW9kdWxlQ291bnQgKyBjb2w7XG4gICAgICAgIGNvbnN0IGlkeCA9IGxpbmVhclBvcyAlIHBhbGV0dGUubGVuZ3RoO1xuICAgICAgICByZXR1cm4gcGFsZXR0ZVtpZHhdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBseSBoYWxmdG9uZSByZW5kZXJpbmcgdG8gYSBtb2R1bGVcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9kcmF3SGFsZnRvbmVNb2R1bGUoY3R4LCB4LCB5LCBzaXplLCBicmlnaHRuZXNzLCBjb25maWcpIHtcbiAgICBjb25zdCBodENlbGwgPSBjb25maWcuaGFsZnRvbmVDZWxsIHx8ICdwZXJfbW9kdWxlJztcbiAgICBjb25zdCBodERvdCA9IGNvbmZpZy5oYWxmdG9uZURvdFNoYXBlIHx8ICdjaXJjbGUnO1xuICAgIGNvbnN0IGh0Q3VydmUgPSBjb25maWcuYnJpZ2h0bmVzc0N1cnZlIHx8ICdsaW5lYXInO1xuICAgIFxuICAgIC8vIEFwcGx5IGJyaWdodG5lc3MgY3VydmVcbiAgICBsZXQgYWRqdXN0ZWRCcmlnaHRuZXNzID0gYnJpZ2h0bmVzcztcbiAgICBzd2l0Y2ggKGh0Q3VydmUpIHtcbiAgICAgIGNhc2UgJ3MtY3VydmUnOlxuICAgICAgICBhZGp1c3RlZEJyaWdodG5lc3MgPSBicmlnaHRuZXNzICogYnJpZ2h0bmVzcyAqICgzIC0gMiAqIGJyaWdodG5lc3MpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2dhbW1hJzpcbiAgICAgICAgYWRqdXN0ZWRCcmlnaHRuZXNzID0gTWF0aC5wb3coYnJpZ2h0bmVzcywgMi4yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OiAvLyBsaW5lYXJcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIC8vIENhbGN1bGF0ZSBkb3Qgc2l6ZSBiYXNlZCBvbiBicmlnaHRuZXNzIChkYXJrZXIgPSBsYXJnZXIgZG90KVxuICAgIGNvbnN0IG1pblNpemUgPSAwLjI7XG4gICAgY29uc3QgbWF4U2l6ZSA9IDEuMDtcbiAgICBjb25zdCBkb3RTaXplUmF0aW8gPSBtaW5TaXplICsgKDEgLSBhZGp1c3RlZEJyaWdodG5lc3MpICogKG1heFNpemUgLSBtaW5TaXplKTtcbiAgICBjb25zdCBkb3RTaXplID0gc2l6ZSAqIGRvdFNpemVSYXRpbztcbiAgICBjb25zdCBvZmZzZXQgPSAoc2l6ZSAtIGRvdFNpemUpIC8gMjtcbiAgICBcbiAgICBjb25zdCBjZW50ZXJYID0geCArIHNpemUgLyAyO1xuICAgIGNvbnN0IGNlbnRlclkgPSB5ICsgc2l6ZSAvIDI7XG4gICAgXG4gICAgc3dpdGNoIChodERvdCkge1xuICAgICAgY2FzZSAnY2lyY2xlJzpcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguYXJjKGNlbnRlclgsIGNlbnRlclksIGRvdFNpemUgLyAyLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgIGNhc2UgJ3NxdWFyZSc6XG4gICAgICAgIGN0eC5maWxsUmVjdCh4ICsgb2Zmc2V0LCB5ICsgb2Zmc2V0LCBkb3RTaXplLCBkb3RTaXplKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgY2FzZSAnbGluZSc6IHtcbiAgICAgICAgLy8gRHJhdyBhIGxpbmUgdGhhdCB2YXJpZXMgaW4gdGhpY2tuZXNzXG4gICAgICAgIGNvbnN0IGxpbmVXaWR0aCA9IGRvdFNpemUgKiAwLjg7XG4gICAgICAgIGN0eC5maWxsUmVjdCh4LCB5ICsgKHNpemUgLSBsaW5lV2lkdGgpIC8gMiwgc2l6ZSwgbGluZVdpZHRoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICAgIFxuICAgICAgY2FzZSAnZGlhbW9uZCc6XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4Lm1vdmVUbyhjZW50ZXJYLCB5ICsgb2Zmc2V0KTtcbiAgICAgICAgY3R4LmxpbmVUbyh4ICsgc2l6ZSAtIG9mZnNldCwgY2VudGVyWSk7XG4gICAgICAgIGN0eC5saW5lVG8oY2VudGVyWCwgeSArIHNpemUgLSBvZmZzZXQpO1xuICAgICAgICBjdHgubGluZVRvKHggKyBvZmZzZXQsIGNlbnRlclkpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LmFyYyhjZW50ZXJYLCBjZW50ZXJZLCBkb3RTaXplIC8gMiwgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgRUNDLWF3YXJlIHdlaWdodCBmb3IgYSBtb2R1bGUgcG9zaXRpb25cbiAgICogSGlnaGVyIHdlaWdodCA9IG1vcmUgaW1wb3J0YW50IHRvIHByZXNlcnZlXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfZ2V0RWNjV2VpZ2h0KHJvdywgY29sLCBtb2R1bGVDb3VudCwgdmVyc2lvbiwgd2VpZ2h0TWFwKSB7XG4gICAgc3dpdGNoICh3ZWlnaHRNYXApIHtcbiAgICAgIGNhc2UgJ2Rpc3RhbmNlX3RvX2ZpbmRlcnMnOiB7XG4gICAgICAgIC8vIENsb3NlciB0byBmaW5kZXJzID0gbW9yZSBpbXBvcnRhbnRcbiAgICAgICAgY29uc3QgZGlzdFRMID0gTWF0aC5zcXJ0KHJvdyAqIHJvdyArIGNvbCAqIGNvbCk7XG4gICAgICAgIGNvbnN0IGRpc3RUUiA9IE1hdGguc3FydChyb3cgKiByb3cgKyBNYXRoLnBvdyhtb2R1bGVDb3VudCAtIDEgLSBjb2wsIDIpKTtcbiAgICAgICAgY29uc3QgZGlzdEJMID0gTWF0aC5zcXJ0KE1hdGgucG93KG1vZHVsZUNvdW50IC0gMSAtIHJvdywgMikgKyBjb2wgKiBjb2wpO1xuICAgICAgICBjb25zdCBtaW5EaXN0ID0gTWF0aC5taW4oZGlzdFRMLCBkaXN0VFIsIGRpc3RCTCk7XG4gICAgICAgIGNvbnN0IG1heERpc3QgPSBNYXRoLnNxcnQoMikgKiBtb2R1bGVDb3VudCAvIDI7XG4gICAgICAgIHJldHVybiAxIC0gKG1pbkRpc3QgLyBtYXhEaXN0KTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgY2FzZSAnYmxvY2tfaGVhdG1hcCc6IHtcbiAgICAgICAgLy8gQ2VudGVyIGJsb2NrcyBhcmUgbGVzcyBjcml0aWNhbCB0aGFuIGVkZ2UgYmxvY2tzXG4gICAgICAgIGNvbnN0IGNlbnRlclJvdyA9IG1vZHVsZUNvdW50IC8gMjtcbiAgICAgICAgY29uc3QgY2VudGVyQ29sID0gbW9kdWxlQ291bnQgLyAyO1xuICAgICAgICBjb25zdCBkaXN0VG9DZW50ZXIgPSBNYXRoLnNxcnQoXG4gICAgICAgICAgTWF0aC5wb3cocm93IC0gY2VudGVyUm93LCAyKSArIE1hdGgucG93KGNvbCAtIGNlbnRlckNvbCwgMilcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbWF4RGlzdCA9IE1hdGguc3FydCgyKSAqIG1vZHVsZUNvdW50IC8gMjtcbiAgICAgICAgcmV0dXJuIGRpc3RUb0NlbnRlciAvIG1heERpc3Q7XG4gICAgICB9XG4gICAgICBcbiAgICAgIGNhc2UgJ2VtcGlyaWNhbF9zY2FuX2hlYXRtYXAnOiB7XG4gICAgICAgIC8vIFNpbXVsYXRlIHR5cGljYWwgc2Nhbm5lciBwYXR0ZXJucyAtIHRvcC1sZWZ0IHRvIGJvdHRvbS1yaWdodCBwcmlvcml0eVxuICAgICAgICBjb25zdCBzY2FuUHJvZ3Jlc3MgPSAocm93ICsgY29sKSAvICgyICogbW9kdWxlQ291bnQpO1xuICAgICAgICAvLyBFYXJsaWVyIGluIHNjYW4gPSBtb3JlIGltcG9ydGFudFxuICAgICAgICByZXR1cm4gMSAtIHNjYW5Qcm9ncmVzcyAqIDAuNTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIDAuNTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2sgaWYgbW9kaWZ5aW5nIGEgbW9kdWxlIGlzIHNhZmUgZ2l2ZW4gRUNDLWF3YXJlIGNvbnN0cmFpbnRzXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfaXNFY2NTYWZlVG9Nb2RpZnkocm93LCBjb2wsIG1vZHVsZUNvdW50LCB2ZXJzaW9uLCBjb25maWcsIG1vZGlmaWVkQ291bnQsIHRvdGFsRGF0YU1vZHVsZXMpIHtcbiAgICBpZiAoIWNvbmZpZy5lY2NBd2FyZUVuYWJsZWQpIHJldHVybiB0cnVlO1xuICAgIFxuICAgIGNvbnN0IHJpc2tCdWRnZXQgPSAoY29uZmlnLmVjY0F3YXJlUmlza0J1ZGdldCB8fCA1MCkgLyAxMDA7XG4gICAgY29uc3QgZWNjQ2FwYWNpdHkgPSB7IEw6IDAuMDcsIE06IDAuMTUsIFE6IDAuMjUsIEg6IDAuMyB9O1xuICAgIGNvbnN0IG1heFJpc2sgPSBlY2NDYXBhY2l0eVtjb25maWcuZXJyb3JDb3JyZWN0aW9uXSB8fCAwLjI1O1xuICAgIGNvbnN0IGFsbG93ZWRNb2RpZmljYXRpb25zID0gTWF0aC5mbG9vcih0b3RhbERhdGFNb2R1bGVzICogbWF4UmlzayAqIHJpc2tCdWRnZXQpO1xuICAgIFxuICAgIGlmIChtb2RpZmllZENvdW50ID49IGFsbG93ZWRNb2RpZmljYXRpb25zKSByZXR1cm4gZmFsc2U7XG4gICAgXG4gICAgY29uc3Qgd2VpZ2h0ID0gdGhpcy5fZ2V0RWNjV2VpZ2h0KHJvdywgY29sLCBtb2R1bGVDb3VudCwgdmVyc2lvbiwgY29uZmlnLmVjY0F3YXJlV2VpZ2h0TWFwIHx8ICdkaXN0YW5jZV90b19maW5kZXJzJyk7XG4gICAgXG4gICAgLy8gSGlnaGVyIHdlaWdodCBtb2R1bGVzIGFyZSBsZXNzIGxpa2VseSB0byBiZSBtb2RpZmllZFxuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpID4gd2VpZ2h0ICogMC41O1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBNkdBLFNBQVMsY0FBYyxpQkFBa0Q7QUFDekUsT0FBTyxZQUFZO0FBRW5CLFNBQVMsVUFBVSx3QkFBd0I7OztBQ3RGcEMsSUFBTSxTQUFTLFNBQVMsWUFBWSxzQkFBc0I7QUFFL0QsUUFBTSxPQUFPO0FBQ2IsUUFBTSxPQUFPO0FBRWIsTUFBSSxjQUFjO0FBQ2xCLFFBQU0sd0JBQXdCLHVCQUF1QixvQkFBb0I7QUFDekUsTUFBSSxXQUFXO0FBQ2YsTUFBSSxlQUFlO0FBQ25CLE1BQUksYUFBYTtBQUNqQixRQUFNLFlBQVksQ0FBQztBQUVuQixRQUFNLFFBQVEsQ0FBQztBQUVmLFFBQU0sV0FBVyxTQUFTLE1BQU0sYUFBYTtBQUUzQyxtQkFBZSxjQUFjLElBQUk7QUFDakMsZ0JBQVcsU0FBUyxhQUFhO0FBQy9CLFlBQU0sVUFBVSxJQUFJLE1BQU0sV0FBVztBQUNyQyxlQUFTLE1BQU0sR0FBRyxNQUFNLGFBQWEsT0FBTyxHQUFHO0FBQzdDLGdCQUFRLEdBQUcsSUFBSSxJQUFJLE1BQU0sV0FBVztBQUNwQyxpQkFBUyxNQUFNLEdBQUcsTUFBTSxhQUFhLE9BQU8sR0FBRztBQUM3QyxrQkFBUSxHQUFHLEVBQUUsR0FBRyxJQUFJO0FBQUEsUUFDdEI7QUFBQSxNQUNGO0FBQ0EsYUFBTztBQUFBLElBQ1QsR0FBRSxZQUFZO0FBRWQsOEJBQTBCLEdBQUcsQ0FBQztBQUM5Qiw4QkFBMEIsZUFBZSxHQUFHLENBQUM7QUFDN0MsOEJBQTBCLEdBQUcsZUFBZSxDQUFDO0FBQzdDLCtCQUEyQjtBQUMzQix1QkFBbUI7QUFDbkIsa0JBQWMsTUFBTSxXQUFXO0FBRS9CLFFBQUksZUFBZSxHQUFHO0FBQ3BCLHNCQUFnQixJQUFJO0FBQUEsSUFDdEI7QUFFQSxRQUFJLGNBQWMsTUFBTTtBQUN0QixtQkFBYSxXQUFXLGFBQWEsdUJBQXVCLFNBQVM7QUFBQSxJQUN2RTtBQUVBLFlBQVEsWUFBWSxXQUFXO0FBQUEsRUFDakM7QUFFQSxRQUFNLDRCQUE0QixTQUFTLEtBQUssS0FBSztBQUVuRCxhQUFTLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBRS9CLFVBQUksTUFBTSxLQUFLLE1BQU0sZ0JBQWdCLE1BQU0sRUFBRztBQUU5QyxlQUFTLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBRS9CLFlBQUksTUFBTSxLQUFLLE1BQU0sZ0JBQWdCLE1BQU0sRUFBRztBQUU5QyxZQUFNLEtBQUssS0FBSyxLQUFLLE1BQU0sS0FBSyxLQUFLLEtBQUssTUFDbEMsS0FBSyxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQUssS0FBSyxNQUNwQyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEdBQUs7QUFDOUMsbUJBQVMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUk7QUFBQSxRQUMvQixPQUFPO0FBQ0wsbUJBQVMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUk7QUFBQSxRQUMvQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0scUJBQXFCLFdBQVc7QUFFcEMsUUFBSSxlQUFlO0FBQ25CLFFBQUksVUFBVTtBQUVkLGFBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUc7QUFFN0IsZUFBUyxNQUFNLENBQUM7QUFFaEIsWUFBTSxZQUFZLE9BQU8sYUFBYSxLQUFLO0FBRTNDLFVBQUksS0FBSyxLQUFLLGVBQWUsV0FBVztBQUN0Qyx1QkFBZTtBQUNmLGtCQUFVO0FBQUEsTUFDWjtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0scUJBQXFCLFdBQVc7QUFFcEMsYUFBUyxJQUFJLEdBQUcsSUFBSSxlQUFlLEdBQUcsS0FBSyxHQUFHO0FBQzVDLFVBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLE1BQU07QUFDMUI7QUFBQSxNQUNGO0FBQ0EsZUFBUyxDQUFDLEVBQUUsQ0FBQyxJQUFLLElBQUksS0FBSztBQUFBLElBQzdCO0FBRUEsYUFBUyxJQUFJLEdBQUcsSUFBSSxlQUFlLEdBQUcsS0FBSyxHQUFHO0FBQzVDLFVBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxLQUFLLE1BQU07QUFDMUI7QUFBQSxNQUNGO0FBQ0EsZUFBUyxDQUFDLEVBQUUsQ0FBQyxJQUFLLElBQUksS0FBSztBQUFBLElBQzdCO0FBQUEsRUFDRjtBQUVBLFFBQU0sNkJBQTZCLFdBQVc7QUFFNUMsVUFBTSxNQUFNLE9BQU8sbUJBQW1CLFdBQVc7QUFFakQsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsS0FBSyxHQUFHO0FBRXRDLGVBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxRQUFRLEtBQUssR0FBRztBQUV0QyxjQUFNLE1BQU0sSUFBSSxDQUFDO0FBQ2pCLGNBQU0sTUFBTSxJQUFJLENBQUM7QUFFakIsWUFBSSxTQUFTLEdBQUcsRUFBRSxHQUFHLEtBQUssTUFBTTtBQUM5QjtBQUFBLFFBQ0Y7QUFFQSxpQkFBUyxJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRztBQUUvQixtQkFBUyxJQUFJLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRztBQUUvQixnQkFBSSxLQUFLLE1BQU0sS0FBSyxLQUFLLEtBQUssTUFBTSxLQUFLLEtBQ2pDLEtBQUssS0FBSyxLQUFLLEdBQUs7QUFDMUIsdUJBQVMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUk7QUFBQSxZQUMvQixPQUFPO0FBQ0wsdUJBQVMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUk7QUFBQSxZQUMvQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxrQkFBa0IsU0FBUyxNQUFNO0FBRXJDLFVBQU0sT0FBTyxPQUFPLGlCQUFpQixXQUFXO0FBRWhELGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUc7QUFDOUIsWUFBTSxNQUFPLENBQUMsU0FBVyxRQUFRLElBQUssTUFBTTtBQUM1QyxlQUFTLEtBQUssTUFBTSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksSUFBSSxlQUFlLElBQUksQ0FBQyxJQUFJO0FBQUEsSUFDOUQ7QUFFQSxhQUFTLElBQUksR0FBRyxJQUFJLElBQUksS0FBSyxHQUFHO0FBQzlCLFlBQU0sTUFBTyxDQUFDLFNBQVcsUUFBUSxJQUFLLE1BQU07QUFDNUMsZUFBUyxJQUFJLElBQUksZUFBZSxJQUFJLENBQUMsRUFBRSxLQUFLLE1BQU0sSUFBSSxDQUFDLENBQUMsSUFBSTtBQUFBLElBQzlEO0FBQUEsRUFDRjtBQUVBLFFBQU0sZ0JBQWdCLFNBQVMsTUFBTSxhQUFhO0FBRWhELFVBQU0sT0FBUSx5QkFBeUIsSUFBSztBQUM1QyxVQUFNLE9BQU8sT0FBTyxlQUFlLElBQUk7QUFHdkMsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLEtBQUssR0FBRztBQUU5QixZQUFNLE1BQU8sQ0FBQyxTQUFXLFFBQVEsSUFBSyxNQUFNO0FBRTVDLFVBQUksSUFBSSxHQUFHO0FBQ1QsaUJBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSTtBQUFBLE1BQ25CLFdBQVcsSUFBSSxHQUFHO0FBQ2hCLGlCQUFTLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSTtBQUFBLE1BQ3ZCLE9BQU87QUFDTCxpQkFBUyxlQUFlLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSTtBQUFBLE1BQ3ZDO0FBQUEsSUFDRjtBQUdBLGFBQVMsSUFBSSxHQUFHLElBQUksSUFBSSxLQUFLLEdBQUc7QUFFOUIsWUFBTSxNQUFPLENBQUMsU0FBVyxRQUFRLElBQUssTUFBTTtBQUU1QyxVQUFJLElBQUksR0FBRztBQUNULGlCQUFTLENBQUMsRUFBRSxlQUFlLElBQUksQ0FBQyxJQUFJO0FBQUEsTUFDdEMsV0FBVyxJQUFJLEdBQUc7QUFDaEIsaUJBQVMsQ0FBQyxFQUFFLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSTtBQUFBLE1BQ2hDLE9BQU87QUFDTCxpQkFBUyxDQUFDLEVBQUUsS0FBSyxJQUFJLENBQUMsSUFBSTtBQUFBLE1BQzVCO0FBQUEsSUFDRjtBQUdBLGFBQVMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxJQUFLLENBQUM7QUFBQSxFQUNwQztBQUVBLFFBQU0sVUFBVSxTQUFTLE1BQU0sYUFBYTtBQUUxQyxRQUFJLE1BQU07QUFDVixRQUFJLE1BQU0sZUFBZTtBQUN6QixRQUFJLFdBQVc7QUFDZixRQUFJLFlBQVk7QUFDaEIsVUFBTSxXQUFXLE9BQU8sZ0JBQWdCLFdBQVc7QUFFbkQsYUFBUyxNQUFNLGVBQWUsR0FBRyxNQUFNLEdBQUcsT0FBTyxHQUFHO0FBRWxELFVBQUksT0FBTyxFQUFHLFFBQU87QUFFckIsYUFBTyxNQUFNO0FBRVgsaUJBQVMsSUFBSSxHQUFHLElBQUksR0FBRyxLQUFLLEdBQUc7QUFFN0IsY0FBSSxTQUFTLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxNQUFNO0FBRWxDLGdCQUFJLE9BQU87QUFFWCxnQkFBSSxZQUFZLEtBQUssUUFBUTtBQUMzQixzQkFBWSxLQUFLLFNBQVMsTUFBTSxXQUFZLE1BQU07QUFBQSxZQUNwRDtBQUVBLGtCQUFNLE9BQU8sU0FBUyxLQUFLLE1BQU0sQ0FBQztBQUVsQyxnQkFBSSxNQUFNO0FBQ1IscUJBQU8sQ0FBQztBQUFBLFlBQ1Y7QUFFQSxxQkFBUyxHQUFHLEVBQUUsTUFBTSxDQUFDLElBQUk7QUFDekIsd0JBQVk7QUFFWixnQkFBSSxZQUFZLElBQUk7QUFDbEIsMkJBQWE7QUFDYix5QkFBVztBQUFBLFlBQ2I7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUVBLGVBQU87QUFFUCxZQUFJLE1BQU0sS0FBSyxnQkFBZ0IsS0FBSztBQUNsQyxpQkFBTztBQUNQLGdCQUFNLENBQUM7QUFDUDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLGNBQWMsU0FBUyxRQUFRLFVBQVU7QUFFN0MsUUFBSSxTQUFTO0FBRWIsUUFBSSxhQUFhO0FBQ2pCLFFBQUksYUFBYTtBQUVqQixVQUFNLFNBQVMsSUFBSSxNQUFNLFNBQVMsTUFBTTtBQUN4QyxVQUFNLFNBQVMsSUFBSSxNQUFNLFNBQVMsTUFBTTtBQUV4QyxhQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFLLEdBQUc7QUFFM0MsWUFBTSxVQUFVLFNBQVMsQ0FBQyxFQUFFO0FBQzVCLFlBQU0sVUFBVSxTQUFTLENBQUMsRUFBRSxhQUFhO0FBRXpDLG1CQUFhLEtBQUssSUFBSSxZQUFZLE9BQU87QUFDekMsbUJBQWEsS0FBSyxJQUFJLFlBQVksT0FBTztBQUV6QyxhQUFPLENBQUMsSUFBSSxJQUFJLE1BQU0sT0FBTztBQUU3QixlQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFFLFFBQVEsS0FBSyxHQUFHO0FBQzVDLGVBQU8sQ0FBQyxFQUFFLENBQUMsSUFBSSxNQUFPLE9BQU8sVUFBVSxFQUFFLElBQUksTUFBTTtBQUFBLE1BQ3JEO0FBQ0EsZ0JBQVU7QUFFVixZQUFNLFNBQVMsT0FBTywwQkFBMEIsT0FBTztBQUN2RCxZQUFNLFVBQVUsYUFBYSxPQUFPLENBQUMsR0FBRyxPQUFPLFVBQVUsSUFBSSxDQUFDO0FBRTlELFlBQU0sVUFBVSxRQUFRLElBQUksTUFBTTtBQUNsQyxhQUFPLENBQUMsSUFBSSxJQUFJLE1BQU0sT0FBTyxVQUFVLElBQUksQ0FBQztBQUM1QyxlQUFTLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxFQUFFLFFBQVEsS0FBSyxHQUFHO0FBQzVDLGNBQU0sV0FBVyxJQUFJLFFBQVEsVUFBVSxJQUFJLE9BQU8sQ0FBQyxFQUFFO0FBQ3JELGVBQU8sQ0FBQyxFQUFFLENBQUMsSUFBSyxZQUFZLElBQUksUUFBUSxNQUFNLFFBQVEsSUFBSTtBQUFBLE1BQzVEO0FBQUEsSUFDRjtBQUVBLFFBQUksaUJBQWlCO0FBQ3JCLGFBQVMsSUFBSSxHQUFHLElBQUksU0FBUyxRQUFRLEtBQUssR0FBRztBQUMzQyx3QkFBa0IsU0FBUyxDQUFDLEVBQUU7QUFBQSxJQUNoQztBQUVBLFVBQU0sT0FBTyxJQUFJLE1BQU0sY0FBYztBQUNyQyxRQUFJLFFBQVE7QUFFWixhQUFTLElBQUksR0FBRyxJQUFJLFlBQVksS0FBSyxHQUFHO0FBQ3RDLGVBQVMsSUFBSSxHQUFHLElBQUksU0FBUyxRQUFRLEtBQUssR0FBRztBQUMzQyxZQUFJLElBQUksT0FBTyxDQUFDLEVBQUUsUUFBUTtBQUN4QixlQUFLLEtBQUssSUFBSSxPQUFPLENBQUMsRUFBRSxDQUFDO0FBQ3pCLG1CQUFTO0FBQUEsUUFDWDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsYUFBUyxJQUFJLEdBQUcsSUFBSSxZQUFZLEtBQUssR0FBRztBQUN0QyxlQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFLLEdBQUc7QUFDM0MsWUFBSSxJQUFJLE9BQU8sQ0FBQyxFQUFFLFFBQVE7QUFDeEIsZUFBSyxLQUFLLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FBQztBQUN6QixtQkFBUztBQUFBLFFBQ1g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxhQUFhLFNBQVNBLGFBQVlDLHVCQUFzQixVQUFVO0FBRXRFLFVBQU0sV0FBVyxVQUFVLFlBQVlELGFBQVlDLHFCQUFvQjtBQUV2RSxVQUFNLFNBQVMsWUFBWTtBQUUzQixhQUFTLElBQUksR0FBRyxJQUFJLFNBQVMsUUFBUSxLQUFLLEdBQUc7QUFDM0MsWUFBTSxPQUFPLFNBQVMsQ0FBQztBQUN2QixhQUFPLElBQUksS0FBSyxRQUFRLEdBQUcsQ0FBQztBQUM1QixhQUFPLElBQUksS0FBSyxVQUFVLEdBQUcsT0FBTyxnQkFBZ0IsS0FBSyxRQUFRLEdBQUdELFdBQVUsQ0FBRTtBQUNoRixXQUFLLE1BQU0sTUFBTTtBQUFBLElBQ25CO0FBR0EsUUFBSSxpQkFBaUI7QUFDckIsYUFBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLFFBQVEsS0FBSyxHQUFHO0FBQzNDLHdCQUFrQixTQUFTLENBQUMsRUFBRTtBQUFBLElBQ2hDO0FBRUEsUUFBSSxPQUFPLGdCQUFnQixJQUFJLGlCQUFpQixHQUFHO0FBQ2pELFlBQU0sNEJBQ0YsT0FBTyxnQkFBZ0IsSUFDdkIsTUFDQSxpQkFBaUIsSUFDakI7QUFBQSxJQUNOO0FBR0EsUUFBSSxPQUFPLGdCQUFnQixJQUFJLEtBQUssaUJBQWlCLEdBQUc7QUFDdEQsYUFBTyxJQUFJLEdBQUcsQ0FBQztBQUFBLElBQ2pCO0FBR0EsV0FBTyxPQUFPLGdCQUFnQixJQUFJLEtBQUssR0FBRztBQUN4QyxhQUFPLE9BQU8sS0FBSztBQUFBLElBQ3JCO0FBR0EsV0FBTyxNQUFNO0FBRVgsVUFBSSxPQUFPLGdCQUFnQixLQUFLLGlCQUFpQixHQUFHO0FBQ2xEO0FBQUEsTUFDRjtBQUNBLGFBQU8sSUFBSSxNQUFNLENBQUM7QUFFbEIsVUFBSSxPQUFPLGdCQUFnQixLQUFLLGlCQUFpQixHQUFHO0FBQ2xEO0FBQUEsTUFDRjtBQUNBLGFBQU8sSUFBSSxNQUFNLENBQUM7QUFBQSxJQUNwQjtBQUVBLFdBQU8sWUFBWSxRQUFRLFFBQVE7QUFBQSxFQUNyQztBQUVBLFFBQU0sVUFBVSxTQUFTLE1BQU0sTUFBTTtBQUVuQyxXQUFPLFFBQVE7QUFFZixRQUFJLFVBQVU7QUFFZCxZQUFPLE1BQU07QUFBQSxNQUNiLEtBQUs7QUFDSCxrQkFBVSxTQUFTLElBQUk7QUFDdkI7QUFBQSxNQUNGLEtBQUs7QUFDSCxrQkFBVSxXQUFXLElBQUk7QUFDekI7QUFBQSxNQUNGLEtBQUs7QUFDSCxrQkFBVSxXQUFXLElBQUk7QUFDekI7QUFBQSxNQUNGLEtBQUs7QUFDSCxrQkFBVSxRQUFRLElBQUk7QUFDdEI7QUFBQSxNQUNGO0FBQ0UsY0FBTSxVQUFVO0FBQUEsSUFDbEI7QUFFQSxjQUFVLEtBQUssT0FBTztBQUN0QixpQkFBYTtBQUFBLEVBQ2Y7QUFFQSxRQUFNLFNBQVMsU0FBUyxLQUFLLEtBQUs7QUFDaEMsUUFBSSxNQUFNLEtBQUssZ0JBQWdCLE9BQU8sTUFBTSxLQUFLLGdCQUFnQixLQUFLO0FBQ3BFLFlBQU0sTUFBTSxNQUFNO0FBQUEsSUFDcEI7QUFDQSxXQUFPLFNBQVMsR0FBRyxFQUFFLEdBQUc7QUFBQSxFQUMxQjtBQUVBLFFBQU0saUJBQWlCLFdBQVc7QUFDaEMsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLE9BQU8sV0FBVztBQUN0QixRQUFJLGNBQWMsR0FBRztBQUNuQixVQUFJQSxjQUFhO0FBRWpCLGFBQU9BLGNBQWEsSUFBSUEsZUFBYztBQUNwQyxjQUFNLFdBQVcsVUFBVSxZQUFZQSxhQUFZLHFCQUFxQjtBQUN4RSxjQUFNLFNBQVMsWUFBWTtBQUUzQixpQkFBUyxJQUFJLEdBQUcsSUFBSSxVQUFVLFFBQVEsS0FBSztBQUN6QyxnQkFBTSxPQUFPLFVBQVUsQ0FBQztBQUN4QixpQkFBTyxJQUFJLEtBQUssUUFBUSxHQUFHLENBQUM7QUFDNUIsaUJBQU8sSUFBSSxLQUFLLFVBQVUsR0FBRyxPQUFPLGdCQUFnQixLQUFLLFFBQVEsR0FBR0EsV0FBVSxDQUFFO0FBQ2hGLGVBQUssTUFBTSxNQUFNO0FBQUEsUUFDbkI7QUFFQSxZQUFJLGlCQUFpQjtBQUNyQixpQkFBUyxJQUFJLEdBQUcsSUFBSSxTQUFTLFFBQVEsS0FBSztBQUN4Qyw0QkFBa0IsU0FBUyxDQUFDLEVBQUU7QUFBQSxRQUNoQztBQUVBLFlBQUksT0FBTyxnQkFBZ0IsS0FBSyxpQkFBaUIsR0FBRztBQUNsRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsb0JBQWNBO0FBQUEsSUFDaEI7QUFFQSxhQUFTLE9BQU8sbUJBQW1CLENBQUU7QUFBQSxFQUN2QztBQUVBLFFBQU0saUJBQWlCLFNBQVMsVUFBVSxRQUFRO0FBRWhELGVBQVcsWUFBWTtBQUN2QixhQUFVLE9BQU8sVUFBVSxjQUFjLFdBQVcsSUFBSTtBQUV4RCxRQUFJLFNBQVM7QUFFYixjQUFVO0FBQ1YsY0FBVTtBQUNWLGNBQVU7QUFDVixjQUFVLDRCQUE0QixTQUFTO0FBQy9DLGNBQVU7QUFDVixjQUFVO0FBRVYsYUFBUyxJQUFJLEdBQUcsSUFBSSxNQUFNLGVBQWUsR0FBRyxLQUFLLEdBQUc7QUFFbEQsZ0JBQVU7QUFFVixlQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sZUFBZSxHQUFHLEtBQUssR0FBRztBQUNsRCxrQkFBVTtBQUNWLGtCQUFVO0FBQ1Ysa0JBQVU7QUFDVixrQkFBVTtBQUNWLGtCQUFVLGFBQWEsV0FBVztBQUNsQyxrQkFBVSxjQUFjLFdBQVc7QUFDbkMsa0JBQVU7QUFDVixrQkFBVSxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUcsWUFBWTtBQUMxQyxrQkFBVTtBQUNWLGtCQUFVO0FBQUEsTUFDWjtBQUVBLGdCQUFVO0FBQUEsSUFDWjtBQUVBLGNBQVU7QUFDVixjQUFVO0FBRVYsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGVBQWUsU0FBUyxVQUFVLFFBQVEsS0FBSyxPQUFPO0FBRTFELFFBQUksT0FBTyxDQUFDO0FBQ1osUUFBSSxPQUFPLFVBQVUsQ0FBQyxLQUFLLFVBQVU7QUFFbkMsYUFBTyxVQUFVLENBQUM7QUFFbEIsaUJBQVcsS0FBSztBQUNoQixlQUFTLEtBQUs7QUFDZCxZQUFNLEtBQUs7QUFDWCxjQUFRLEtBQUs7QUFBQSxJQUNmO0FBRUEsZUFBVyxZQUFZO0FBQ3ZCLGFBQVUsT0FBTyxVQUFVLGNBQWMsV0FBVyxJQUFJO0FBR3hELFVBQU8sT0FBTyxRQUFRLFdBQVksRUFBQyxNQUFNLElBQUcsSUFBSSxPQUFPLENBQUM7QUFDeEQsUUFBSSxPQUFPLElBQUksUUFBUTtBQUN2QixRQUFJLEtBQU0sSUFBSSxPQUFRLElBQUksTUFBTSx1QkFBdUI7QUFHdkQsWUFBUyxPQUFPLFVBQVUsV0FBWSxFQUFDLE1BQU0sTUFBSyxJQUFJLFNBQVMsQ0FBQztBQUNoRSxVQUFNLE9BQU8sTUFBTSxRQUFRO0FBQzNCLFVBQU0sS0FBTSxNQUFNLE9BQVEsTUFBTSxNQUFNLGlCQUFpQjtBQUV2RCxVQUFNLE9BQU8sTUFBTSxlQUFlLElBQUksV0FBVyxTQUFTO0FBQzFELFFBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxRQUFNLElBQUk7QUFFNUIsV0FBTyxNQUFNLFdBQVcsVUFBVSxXQUNoQyxPQUFPLFdBQVcsV0FBVyxXQUFXO0FBRTFDLGFBQVM7QUFDVCxhQUFTLENBQUMsS0FBSyxXQUFXLGFBQWEsT0FBTyxpQkFBaUIsT0FBTyxRQUFRO0FBQzlFLGFBQVMsbUJBQW1CLE9BQU8sTUFBTSxPQUFPO0FBQ2hELGFBQVM7QUFDVCxhQUFVLE1BQU0sUUFBUSxJQUFJLE9BQVEsa0NBQ2hDLFVBQVUsQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUUsS0FBSyxDQUFFLElBQUksTUFBTTtBQUM1RCxhQUFTO0FBQ1QsYUFBVSxNQUFNLE9BQVEsZ0JBQWdCLFVBQVUsTUFBTSxFQUFFLElBQUksT0FDMUQsVUFBVSxNQUFNLElBQUksSUFBSSxhQUFhO0FBQ3pDLGFBQVUsSUFBSSxPQUFRLHNCQUFzQixVQUFVLElBQUksRUFBRSxJQUFJLE9BQzVELFVBQVUsSUFBSSxJQUFJLElBQUksbUJBQW1CO0FBQzdDLGFBQVM7QUFDVCxhQUFTO0FBRVQsU0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLGVBQWUsR0FBRyxLQUFLLEdBQUc7QUFDOUMsV0FBSyxJQUFJLFdBQVc7QUFDcEIsV0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLGVBQWUsR0FBRyxLQUFLLEdBQUc7QUFDOUMsWUFBSSxNQUFNLE9BQU8sR0FBRyxDQUFDLEdBQUk7QUFDdkIsZUFBSyxJQUFFLFdBQVM7QUFDaEIsbUJBQVMsTUFBTSxLQUFLLE1BQU0sS0FBSztBQUFBLFFBQ2pDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxhQUFTO0FBQ1QsYUFBUztBQUVULFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxnQkFBZ0IsU0FBUyxVQUFVLFFBQVE7QUFFL0MsZUFBVyxZQUFZO0FBQ3ZCLGFBQVUsT0FBTyxVQUFVLGNBQWMsV0FBVyxJQUFJO0FBRXhELFVBQU0sT0FBTyxNQUFNLGVBQWUsSUFBSSxXQUFXLFNBQVM7QUFDMUQsVUFBTSxNQUFNO0FBQ1osVUFBTSxNQUFNLE9BQU87QUFFbkIsV0FBTyxjQUFjLE1BQU0sTUFBTSxTQUFTLEdBQUcsR0FBRztBQUM5QyxVQUFJLE9BQU8sS0FBSyxJQUFJLE9BQU8sT0FBTyxLQUFLLElBQUksS0FBSztBQUM5QyxjQUFNLElBQUksS0FBSyxPQUFRLElBQUksT0FBTyxRQUFRO0FBQzFDLGNBQU0sSUFBSSxLQUFLLE9BQVEsSUFBSSxPQUFPLFFBQVE7QUFDMUMsZUFBTyxNQUFNLE9BQU8sR0FBRyxDQUFDLElBQUcsSUFBSTtBQUFBLE1BQ2pDLE9BQU87QUFDTCxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBRTtBQUFBLEVBQ0o7QUFFQSxRQUFNLGVBQWUsU0FBUyxVQUFVLFFBQVEsS0FBSztBQUVuRCxlQUFXLFlBQVk7QUFDdkIsYUFBVSxPQUFPLFVBQVUsY0FBYyxXQUFXLElBQUk7QUFFeEQsVUFBTSxPQUFPLE1BQU0sZUFBZSxJQUFJLFdBQVcsU0FBUztBQUUxRCxRQUFJLE1BQU07QUFDVixXQUFPO0FBQ1AsV0FBTztBQUNQLFdBQU8sTUFBTSxjQUFjLFVBQVUsTUFBTTtBQUMzQyxXQUFPO0FBQ1AsV0FBTztBQUNQLFdBQU87QUFDUCxXQUFPO0FBQ1AsV0FBTztBQUNQLFdBQU87QUFDUCxXQUFPO0FBQ1AsUUFBSSxLQUFLO0FBQ1AsYUFBTztBQUNQLGFBQU8sVUFBVSxHQUFHO0FBQ3BCLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUVQLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxZQUFZLFNBQVMsR0FBRztBQUM1QixRQUFJLFVBQVU7QUFDZCxhQUFTLElBQUksR0FBRyxJQUFJLEVBQUUsUUFBUSxLQUFLLEdBQUc7QUFDcEMsWUFBTSxJQUFJLEVBQUUsT0FBTyxDQUFDO0FBQ3BCLGNBQU8sR0FBRztBQUFBLFFBQ1YsS0FBSztBQUFLLHFCQUFXO0FBQVE7QUFBQSxRQUM3QixLQUFLO0FBQUsscUJBQVc7QUFBUTtBQUFBLFFBQzdCLEtBQUs7QUFBSyxxQkFBVztBQUFTO0FBQUEsUUFDOUIsS0FBSztBQUFLLHFCQUFXO0FBQVU7QUFBQSxRQUMvQjtBQUFVLHFCQUFXO0FBQUc7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sbUJBQW1CLFNBQVMsUUFBUTtBQUN4QyxVQUFNLFdBQVc7QUFDakIsYUFBVSxPQUFPLFVBQVUsY0FBYyxXQUFXLElBQUk7QUFFeEQsVUFBTSxPQUFPLE1BQU0sZUFBZSxJQUFJLFdBQVcsU0FBUztBQUMxRCxVQUFNLE1BQU07QUFDWixVQUFNLE1BQU0sT0FBTztBQUVuQixRQUFJLEdBQUcsR0FBRyxJQUFJLElBQUk7QUFFbEIsVUFBTSxTQUFTO0FBQUEsTUFDYixnQkFBTTtBQUFBLE1BQ04sV0FBTTtBQUFBLE1BQ04sV0FBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFFQSxVQUFNLHlCQUF5QjtBQUFBLE1BQzdCLGdCQUFNO0FBQUEsTUFDTixXQUFNO0FBQUEsTUFDTixXQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUVBLFFBQUksUUFBUTtBQUNaLFNBQUssSUFBSSxHQUFHLElBQUksTUFBTSxLQUFLLEdBQUc7QUFDNUIsV0FBSyxLQUFLLE9BQU8sSUFBSSxPQUFPLFFBQVE7QUFDcEMsV0FBSyxLQUFLLE9BQU8sSUFBSSxJQUFJLE9BQU8sUUFBUTtBQUN4QyxXQUFLLElBQUksR0FBRyxJQUFJLE1BQU0sS0FBSyxHQUFHO0FBQzVCLFlBQUk7QUFFSixZQUFJLE9BQU8sS0FBSyxJQUFJLE9BQU8sT0FBTyxLQUFLLElBQUksT0FBTyxNQUFNLE9BQU8sSUFBSSxLQUFLLE9BQU8sSUFBSSxPQUFPLFFBQVEsQ0FBQyxHQUFHO0FBQ3BHLGNBQUk7QUFBQSxRQUNOO0FBRUEsWUFBSSxPQUFPLEtBQUssSUFBSSxPQUFPLE9BQU8sSUFBRSxLQUFLLElBQUUsSUFBSSxPQUFPLE1BQU0sT0FBTyxJQUFJLEtBQUssT0FBTyxJQUFJLE9BQU8sUUFBUSxDQUFDLEdBQUc7QUFDeEcsZUFBSztBQUFBLFFBQ1AsT0FDSztBQUNILGVBQUs7QUFBQSxRQUNQO0FBR0EsaUJBQVUsU0FBUyxLQUFLLElBQUUsS0FBSyxNQUFPLHVCQUF1QixDQUFDLElBQUksT0FBTyxDQUFDO0FBQUEsTUFDNUU7QUFFQSxlQUFTO0FBQUEsSUFDWDtBQUVBLFFBQUksT0FBTyxLQUFLLFNBQVMsR0FBRztBQUMxQixhQUFPLE1BQU0sVUFBVSxHQUFHLE1BQU0sU0FBUyxPQUFPLENBQUMsSUFBSSxNQUFNLE9BQUssQ0FBQyxFQUFFLEtBQUssUUFBRztBQUFBLElBQzdFO0FBRUEsV0FBTyxNQUFNLFVBQVUsR0FBRyxNQUFNLFNBQU8sQ0FBQztBQUFBLEVBQzFDO0FBRUEsUUFBTSxjQUFjLFNBQVMsVUFBVSxRQUFRO0FBQzdDLGVBQVcsWUFBWTtBQUV2QixRQUFJLFdBQVcsR0FBRztBQUNoQixhQUFPLGlCQUFpQixNQUFNO0FBQUEsSUFDaEM7QUFFQSxnQkFBWTtBQUNaLGFBQVUsT0FBTyxVQUFVLGNBQWMsV0FBVyxJQUFJO0FBRXhELFVBQU0sT0FBTyxNQUFNLGVBQWUsSUFBSSxXQUFXLFNBQVM7QUFDMUQsVUFBTSxNQUFNO0FBQ1osVUFBTSxNQUFNLE9BQU87QUFFbkIsUUFBSSxHQUFHLEdBQUcsR0FBRztBQUViLFVBQU0sUUFBUSxNQUFNLFdBQVMsQ0FBQyxFQUFFLEtBQUssY0FBSTtBQUN6QyxVQUFNLFFBQVEsTUFBTSxXQUFTLENBQUMsRUFBRSxLQUFLLElBQUk7QUFFekMsUUFBSSxRQUFRO0FBQ1osUUFBSSxPQUFPO0FBQ1gsU0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEtBQUssR0FBRztBQUM1QixVQUFJLEtBQUssT0FBUSxJQUFJLE9BQU8sUUFBUTtBQUNwQyxhQUFPO0FBQ1AsV0FBSyxJQUFJLEdBQUcsSUFBSSxNQUFNLEtBQUssR0FBRztBQUM1QixZQUFJO0FBRUosWUFBSSxPQUFPLEtBQUssSUFBSSxPQUFPLE9BQU8sS0FBSyxJQUFJLE9BQU8sTUFBTSxPQUFPLEdBQUcsS0FBSyxPQUFPLElBQUksT0FBTyxRQUFRLENBQUMsR0FBRztBQUNuRyxjQUFJO0FBQUEsUUFDTjtBQUdBLGdCQUFRLElBQUksUUFBUTtBQUFBLE1BQ3RCO0FBRUEsV0FBSyxJQUFJLEdBQUcsSUFBSSxVQUFVLEtBQUssR0FBRztBQUNoQyxpQkFBUyxPQUFPO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBRUEsV0FBTyxNQUFNLFVBQVUsR0FBRyxNQUFNLFNBQU8sQ0FBQztBQUFBLEVBQzFDO0FBRUEsUUFBTSxvQkFBb0IsU0FBUyxTQUFTLFVBQVU7QUFDcEQsZUFBVyxZQUFZO0FBQ3ZCLFVBQU0sU0FBUyxNQUFNLGVBQWU7QUFDcEMsYUFBUyxNQUFNLEdBQUcsTUFBTSxRQUFRLE9BQU87QUFDckMsZUFBUyxNQUFNLEdBQUcsTUFBTSxRQUFRLE9BQU87QUFDckMsZ0JBQVEsWUFBWSxNQUFNLE9BQU8sS0FBSyxHQUFHLElBQUksVUFBVTtBQUN2RCxnQkFBUSxTQUFTLE1BQU0sVUFBVSxNQUFNLFVBQVUsVUFBVSxRQUFRO0FBQUEsTUFDckU7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQU1BLE9BQU8sZ0JBQWdCLFNBQVMsR0FBRztBQUNqQyxRQUFNLFFBQVEsQ0FBQztBQUNmLFdBQVMsSUFBSSxHQUFHLElBQUksRUFBRSxRQUFRLEtBQUssR0FBRztBQUNwQyxVQUFNLElBQUksRUFBRSxXQUFXLENBQUM7QUFDeEIsVUFBTSxLQUFLLElBQUksR0FBSTtBQUFBLEVBQ3JCO0FBQ0EsU0FBTztBQUNUO0FBV0EsT0FBTyxzQkFBc0IsU0FBUyxhQUFhLFVBQVU7QUFJM0QsUUFBTSxjQUFhLFdBQVc7QUFFNUIsVUFBTSxNQUFNLHdCQUF3QixXQUFXO0FBQy9DLFVBQU0sT0FBTyxXQUFXO0FBQ3RCLFlBQU0sSUFBSSxJQUFJLEtBQUs7QUFDbkIsVUFBSSxLQUFLLEdBQUksT0FBTTtBQUNuQixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksUUFBUTtBQUNaLFVBQU1FLGNBQWEsQ0FBQztBQUNwQixXQUFPLE1BQU07QUFDWCxZQUFNLEtBQUssSUFBSSxLQUFLO0FBQ3BCLFVBQUksTUFBTSxHQUFJO0FBQ2QsWUFBTSxLQUFLLEtBQUs7QUFDaEIsWUFBTSxLQUFLLEtBQUs7QUFDaEIsWUFBTSxLQUFLLEtBQUs7QUFDaEIsWUFBTSxJQUFJLE9BQU8sYUFBZSxNQUFNLElBQUssRUFBRTtBQUM3QyxZQUFNLElBQUssTUFBTSxJQUFLO0FBQ3RCLE1BQUFBLFlBQVcsQ0FBQyxJQUFJO0FBQ2hCLGVBQVM7QUFBQSxJQUNYO0FBQ0EsUUFBSSxTQUFTLFVBQVU7QUFDckIsWUFBTSxRQUFRLFNBQVM7QUFBQSxJQUN6QjtBQUVBLFdBQU9BO0FBQUEsRUFDVCxHQUFFO0FBRUYsUUFBTSxjQUFjLElBQUksV0FBVyxDQUFDO0FBRXBDLFNBQU8sU0FBUyxHQUFHO0FBQ2pCLFVBQU0sUUFBUSxDQUFDO0FBQ2YsYUFBUyxJQUFJLEdBQUcsSUFBSSxFQUFFLFFBQVEsS0FBSyxHQUFHO0FBQ3BDLFlBQU0sSUFBSSxFQUFFLFdBQVcsQ0FBQztBQUN4QixVQUFJLElBQUksS0FBSztBQUNYLGNBQU0sS0FBSyxDQUFDO0FBQUEsTUFDZCxPQUFPO0FBQ0wsY0FBTSxJQUFJLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNoQyxZQUFJLE9BQU8sS0FBSyxVQUFVO0FBQ3hCLGVBQU0sSUFBSSxRQUFTLEdBQUc7QUFFcEIsa0JBQU0sS0FBSyxDQUFDO0FBQUEsVUFDZCxPQUFPO0FBRUwsa0JBQU0sS0FBSyxNQUFNLENBQUM7QUFDbEIsa0JBQU0sS0FBSyxJQUFJLEdBQUk7QUFBQSxVQUNyQjtBQUFBLFFBQ0YsT0FBTztBQUNMLGdCQUFNLEtBQUssV0FBVztBQUFBLFFBQ3hCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBTUEsSUFBTSxTQUFTO0FBQUEsRUFDYixhQUFpQixLQUFLO0FBQUEsRUFDdEIsZ0JBQWlCLEtBQUs7QUFBQSxFQUN0QixnQkFBaUIsS0FBSztBQUFBLEVBQ3RCLFlBQWlCLEtBQUs7QUFDeEI7QUFNQSxJQUFNLHlCQUF5QjtBQUFBLEVBQzdCLEdBQUk7QUFBQSxFQUNKLEdBQUk7QUFBQSxFQUNKLEdBQUk7QUFBQSxFQUNKLEdBQUk7QUFDTjtBQU1BLElBQU0sZ0JBQWdCO0FBQUEsRUFDcEIsWUFBYTtBQUFBLEVBQ2IsWUFBYTtBQUFBLEVBQ2IsWUFBYTtBQUFBLEVBQ2IsWUFBYTtBQUFBLEVBQ2IsWUFBYTtBQUFBLEVBQ2IsWUFBYTtBQUFBLEVBQ2IsWUFBYTtBQUFBLEVBQ2IsWUFBYTtBQUNmO0FBTUEsSUFBTSxVQUFTLFdBQVc7QUFFeEIsUUFBTSx5QkFBeUI7QUFBQSxJQUM3QixDQUFDO0FBQUEsSUFDRCxDQUFDLEdBQUcsRUFBRTtBQUFBLElBQ04sQ0FBQyxHQUFHLEVBQUU7QUFBQSxJQUNOLENBQUMsR0FBRyxFQUFFO0FBQUEsSUFDTixDQUFDLEdBQUcsRUFBRTtBQUFBLElBQ04sQ0FBQyxHQUFHLEVBQUU7QUFBQSxJQUNOLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLElBQ2QsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDZCxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUNkLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLElBQ2QsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDZCxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUNkLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLElBQ2QsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUNsQixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ2xCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHO0FBQUEsSUFDbkIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUc7QUFBQSxJQUNuQixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztBQUFBLElBQ25CLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHO0FBQUEsSUFDbkIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUc7QUFBQSxJQUNuQixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHO0FBQUEsSUFDdkIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRztBQUFBLElBQ3hCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUN4QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDeEIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRztBQUFBLElBQ3hCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUN4QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDeEIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQUEsSUFDN0IsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQUEsSUFDN0IsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQUEsSUFDN0IsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQUEsSUFDN0IsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQUEsSUFDN0IsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQUEsRUFDL0I7QUFDQSxRQUFNLE1BQU8sS0FBSyxLQUFPLEtBQUssSUFBTSxLQUFLLElBQU0sS0FBSyxJQUFNLEtBQUssSUFBTSxLQUFLLElBQU0sS0FBSztBQUNyRixRQUFNLE1BQU8sS0FBSyxLQUFPLEtBQUssS0FBTyxLQUFLLEtBQU8sS0FBSyxJQUFNLEtBQUssSUFBTSxLQUFLLElBQU0sS0FBSyxJQUFNLEtBQUs7QUFDbEcsUUFBTSxXQUFZLEtBQUssS0FBTyxLQUFLLEtBQU8sS0FBSyxLQUFPLEtBQUssSUFBTSxLQUFLO0FBRXRFLFFBQU0sUUFBUSxDQUFDO0FBRWYsUUFBTSxjQUFjLFNBQVMsTUFBTTtBQUNqQyxRQUFJLFFBQVE7QUFDWixXQUFPLFFBQVEsR0FBRztBQUNoQixlQUFTO0FBQ1QsZ0JBQVU7QUFBQSxJQUNaO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGlCQUFpQixTQUFTLE1BQU07QUFDcEMsUUFBSSxJQUFJLFFBQVE7QUFDaEIsV0FBTyxZQUFZLENBQUMsSUFBSSxZQUFZLEdBQUcsS0FBSyxHQUFHO0FBQzdDLFdBQU0sT0FBUSxZQUFZLENBQUMsSUFBSSxZQUFZLEdBQUc7QUFBQSxJQUNoRDtBQUNBLFlBQVUsUUFBUSxLQUFNLEtBQUs7QUFBQSxFQUMvQjtBQUVBLFFBQU0sbUJBQW1CLFNBQVMsTUFBTTtBQUN0QyxRQUFJLElBQUksUUFBUTtBQUNoQixXQUFPLFlBQVksQ0FBQyxJQUFJLFlBQVksR0FBRyxLQUFLLEdBQUc7QUFDN0MsV0FBTSxPQUFRLFlBQVksQ0FBQyxJQUFJLFlBQVksR0FBRztBQUFBLElBQ2hEO0FBQ0EsV0FBUSxRQUFRLEtBQU07QUFBQSxFQUN4QjtBQUVBLFFBQU0scUJBQXFCLFNBQVMsWUFBWTtBQUM5QyxXQUFPLHVCQUF1QixhQUFhLENBQUM7QUFBQSxFQUM5QztBQUVBLFFBQU0sa0JBQWtCLFNBQVMsYUFBYTtBQUU1QyxZQUFRLGFBQWE7QUFBQSxNQUVyQixLQUFLLGNBQWM7QUFDakIsZUFBTyxTQUFTLEdBQUcsR0FBRztBQUFFLGtCQUFRLElBQUksS0FBSyxLQUFLO0FBQUEsUUFBRztBQUFBLE1BQ25ELEtBQUssY0FBYztBQUNqQixlQUFPLFNBQVMsR0FBRyxHQUFHO0FBQUUsaUJBQU8sSUFBSSxLQUFLO0FBQUEsUUFBRztBQUFBLE1BQzdDLEtBQUssY0FBYztBQUNqQixlQUFPLFNBQVMsR0FBRyxHQUFHO0FBQUUsaUJBQU8sSUFBSSxLQUFLO0FBQUEsUUFBRztBQUFBLE1BQzdDLEtBQUssY0FBYztBQUNqQixlQUFPLFNBQVMsR0FBRyxHQUFHO0FBQUUsa0JBQVEsSUFBSSxLQUFLLEtBQUs7QUFBQSxRQUFHO0FBQUEsTUFDbkQsS0FBSyxjQUFjO0FBQ2pCLGVBQU8sU0FBUyxHQUFHLEdBQUc7QUFBRSxrQkFBUSxLQUFLLE1BQU0sSUFBSSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksQ0FBQyxLQUFNLEtBQUs7QUFBQSxRQUFHO0FBQUEsTUFDcEYsS0FBSyxjQUFjO0FBQ2pCLGVBQU8sU0FBUyxHQUFHLEdBQUc7QUFBRSxpQkFBUSxJQUFJLElBQUssSUFBSyxJQUFJLElBQUssS0FBSztBQUFBLFFBQUc7QUFBQSxNQUNqRSxLQUFLLGNBQWM7QUFDakIsZUFBTyxTQUFTLEdBQUcsR0FBRztBQUFFLGtCQUFVLElBQUksSUFBSyxJQUFLLElBQUksSUFBSyxLQUFLLEtBQUs7QUFBQSxRQUFHO0FBQUEsTUFDeEUsS0FBSyxjQUFjO0FBQ2pCLGVBQU8sU0FBUyxHQUFHLEdBQUc7QUFBRSxrQkFBVSxJQUFJLElBQUssS0FBSyxJQUFJLEtBQUssS0FBSyxLQUFLO0FBQUEsUUFBRztBQUFBLE1BRXhFO0FBQ0UsY0FBTSxxQkFBcUI7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLDRCQUE0QixTQUFTLG9CQUFvQjtBQUM3RCxRQUFJLElBQUksYUFBYSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQzNCLGFBQVMsSUFBSSxHQUFHLElBQUksb0JBQW9CLEtBQUssR0FBRztBQUM5QyxVQUFJLEVBQUUsU0FBUyxhQUFhLENBQUMsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFFO0FBQUEsSUFDdEQ7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sa0JBQWtCLFNBQVMsTUFBTSxNQUFNO0FBRTNDLFFBQUksS0FBSyxRQUFRLE9BQU8sSUFBSTtBQUkxQixjQUFPLE1BQU07QUFBQSxRQUNiLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDO0FBQ0UsZ0JBQU0sVUFBVTtBQUFBLE1BQ2xCO0FBQUEsSUFFRixXQUFXLE9BQU8sSUFBSTtBQUlwQixjQUFPLE1BQU07QUFBQSxRQUNiLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDO0FBQ0UsZ0JBQU0sVUFBVTtBQUFBLE1BQ2xCO0FBQUEsSUFFRixXQUFXLE9BQU8sSUFBSTtBQUlwQixjQUFPLE1BQU07QUFBQSxRQUNiLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDLEtBQUssT0FBTztBQUFpQixpQkFBTztBQUFBLFFBQ3BDO0FBQ0UsZ0JBQU0sVUFBVTtBQUFBLE1BQ2xCO0FBQUEsSUFFRixPQUFPO0FBQ0wsWUFBTSxVQUFVO0FBQUEsSUFDbEI7QUFBQSxFQUNGO0FBRUEsUUFBTSxlQUFlLFNBQVNDLFNBQVE7QUFFcEMsVUFBTSxjQUFjQSxRQUFPLGVBQWU7QUFFMUMsUUFBSSxZQUFZO0FBSWhCLGFBQVMsTUFBTSxHQUFHLE1BQU0sYUFBYSxPQUFPLEdBQUc7QUFDN0MsZUFBUyxNQUFNLEdBQUcsTUFBTSxhQUFhLE9BQU8sR0FBRztBQUU3QyxZQUFJLFlBQVk7QUFDaEIsY0FBTSxPQUFPQSxRQUFPLE9BQU8sS0FBSyxHQUFHO0FBRW5DLGlCQUFTLElBQUksSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBRS9CLGNBQUksTUFBTSxJQUFJLEtBQUssZUFBZSxNQUFNLEdBQUc7QUFDekM7QUFBQSxVQUNGO0FBRUEsbUJBQVMsSUFBSSxJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFFL0IsZ0JBQUksTUFBTSxJQUFJLEtBQUssZUFBZSxNQUFNLEdBQUc7QUFDekM7QUFBQSxZQUNGO0FBRUEsZ0JBQUksS0FBSyxLQUFLLEtBQUssR0FBRztBQUNwQjtBQUFBLFlBQ0Y7QUFFQSxnQkFBSSxRQUFRQSxRQUFPLE9BQU8sTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFJO0FBQzVDLDJCQUFhO0FBQUEsWUFDZjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsWUFBSSxZQUFZLEdBQUc7QUFDakIsdUJBQWMsSUFBSSxZQUFZO0FBQUEsUUFDaEM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFDO0FBSUQsYUFBUyxNQUFNLEdBQUcsTUFBTSxjQUFjLEdBQUcsT0FBTyxHQUFHO0FBQ2pELGVBQVMsTUFBTSxHQUFHLE1BQU0sY0FBYyxHQUFHLE9BQU8sR0FBRztBQUNqRCxZQUFJLFFBQVE7QUFDWixZQUFJQSxRQUFPLE9BQU8sS0FBSyxHQUFHLEVBQUksVUFBUztBQUN2QyxZQUFJQSxRQUFPLE9BQU8sTUFBTSxHQUFHLEdBQUcsRUFBSSxVQUFTO0FBQzNDLFlBQUlBLFFBQU8sT0FBTyxLQUFLLE1BQU0sQ0FBQyxFQUFJLFVBQVM7QUFDM0MsWUFBSUEsUUFBTyxPQUFPLE1BQU0sR0FBRyxNQUFNLENBQUMsRUFBSSxVQUFTO0FBQy9DLFlBQUksU0FBUyxLQUFLLFNBQVMsR0FBRztBQUM1Qix1QkFBYTtBQUFBLFFBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUlBLGFBQVMsTUFBTSxHQUFHLE1BQU0sYUFBYSxPQUFPLEdBQUc7QUFDN0MsZUFBUyxNQUFNLEdBQUcsTUFBTSxjQUFjLEdBQUcsT0FBTyxHQUFHO0FBQ2pELFlBQUlBLFFBQU8sT0FBTyxLQUFLLEdBQUcsS0FDbkIsQ0FBQ0EsUUFBTyxPQUFPLEtBQUssTUFBTSxDQUFDLEtBQzFCQSxRQUFPLE9BQU8sS0FBSyxNQUFNLENBQUMsS0FDMUJBLFFBQU8sT0FBTyxLQUFLLE1BQU0sQ0FBQyxLQUMxQkEsUUFBTyxPQUFPLEtBQUssTUFBTSxDQUFDLEtBQzNCLENBQUNBLFFBQU8sT0FBTyxLQUFLLE1BQU0sQ0FBQyxLQUMxQkEsUUFBTyxPQUFPLEtBQUssTUFBTSxDQUFDLEdBQUk7QUFDcEMsdUJBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxhQUFTLE1BQU0sR0FBRyxNQUFNLGFBQWEsT0FBTyxHQUFHO0FBQzdDLGVBQVMsTUFBTSxHQUFHLE1BQU0sY0FBYyxHQUFHLE9BQU8sR0FBRztBQUNqRCxZQUFJQSxRQUFPLE9BQU8sS0FBSyxHQUFHLEtBQ25CLENBQUNBLFFBQU8sT0FBTyxNQUFNLEdBQUcsR0FBRyxLQUMxQkEsUUFBTyxPQUFPLE1BQU0sR0FBRyxHQUFHLEtBQzFCQSxRQUFPLE9BQU8sTUFBTSxHQUFHLEdBQUcsS0FDMUJBLFFBQU8sT0FBTyxNQUFNLEdBQUcsR0FBRyxLQUMzQixDQUFDQSxRQUFPLE9BQU8sTUFBTSxHQUFHLEdBQUcsS0FDMUJBLFFBQU8sT0FBTyxNQUFNLEdBQUcsR0FBRyxHQUFJO0FBQ3BDLHVCQUFhO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBSUEsUUFBSSxZQUFZO0FBRWhCLGFBQVMsTUFBTSxHQUFHLE1BQU0sYUFBYSxPQUFPLEdBQUc7QUFDN0MsZUFBUyxNQUFNLEdBQUcsTUFBTSxhQUFhLE9BQU8sR0FBRztBQUM3QyxZQUFJQSxRQUFPLE9BQU8sS0FBSyxHQUFHLEdBQUk7QUFDNUIsdUJBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFFBQVEsS0FBSyxJQUFJLE1BQU0sWUFBWSxjQUFjLGNBQWMsRUFBRSxJQUFJO0FBQzNFLGlCQUFhLFFBQVE7QUFFckIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPO0FBQ1QsR0FBRTtBQU1GLElBQU0sVUFBUyxXQUFXO0FBRXhCLFFBQU0sWUFBWSxJQUFJLE1BQU0sR0FBRztBQUMvQixRQUFNLFlBQVksSUFBSSxNQUFNLEdBQUc7QUFHL0IsV0FBUyxJQUFJLEdBQUcsSUFBSSxHQUFHLEtBQUssR0FBRztBQUM3QixjQUFVLENBQUMsSUFBSSxLQUFLO0FBQUEsRUFDdEI7QUFDQSxXQUFTLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQy9CLGNBQVUsQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQzFCLFVBQVUsSUFBSSxDQUFDLElBQ2YsVUFBVSxJQUFJLENBQUMsSUFDZixVQUFVLElBQUksQ0FBQztBQUFBLEVBQ3JCO0FBQ0EsV0FBUyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUssR0FBRztBQUMvQixjQUFVLFVBQVUsQ0FBQyxDQUFFLElBQUk7QUFBQSxFQUM3QjtBQUVBLFFBQU0sUUFBUSxDQUFDO0FBRWYsUUFBTSxPQUFPLFNBQVMsR0FBRztBQUV2QixRQUFJLElBQUksR0FBRztBQUNULFlBQU0sVUFBVSxJQUFJO0FBQUEsSUFDdEI7QUFFQSxXQUFPLFVBQVUsQ0FBQztBQUFBLEVBQ3BCO0FBRUEsUUFBTSxPQUFPLFNBQVMsR0FBRztBQUV2QixXQUFPLElBQUksR0FBRztBQUNaLFdBQUs7QUFBQSxJQUNQO0FBRUEsV0FBTyxLQUFLLEtBQUs7QUFDZixXQUFLO0FBQUEsSUFDUDtBQUVBLFdBQU8sVUFBVSxDQUFDO0FBQUEsRUFDcEI7QUFFQSxTQUFPO0FBQ1QsR0FBRTtBQU1GLElBQU0sZUFBZSxTQUFTLEtBQUssT0FBTztBQUV4QyxNQUFJLE9BQU8sSUFBSSxVQUFVLGFBQWE7QUFDcEMsVUFBTSxJQUFJLFNBQVMsTUFBTTtBQUFBLEVBQzNCO0FBRUEsUUFBTSxRQUFPLFdBQVc7QUFDdEIsUUFBSSxTQUFTO0FBQ2IsV0FBTyxTQUFTLElBQUksVUFBVSxJQUFJLE1BQU0sS0FBSyxHQUFHO0FBQzlDLGdCQUFVO0FBQUEsSUFDWjtBQUNBLFVBQU1DLFFBQU8sSUFBSSxNQUFNLElBQUksU0FBUyxTQUFTLEtBQUs7QUFDbEQsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLFNBQVMsUUFBUSxLQUFLLEdBQUc7QUFDL0MsTUFBQUEsTUFBSyxDQUFDLElBQUksSUFBSSxJQUFJLE1BQU07QUFBQSxJQUMxQjtBQUNBLFdBQU9BO0FBQUEsRUFDVCxHQUFFO0FBRUYsUUFBTSxRQUFRLENBQUM7QUFFZixRQUFNLFFBQVEsU0FBUyxPQUFPO0FBQzVCLFdBQU8sS0FBSyxLQUFLO0FBQUEsRUFDbkI7QUFFQSxRQUFNLFlBQVksV0FBVztBQUMzQixXQUFPLEtBQUs7QUFBQSxFQUNkO0FBRUEsUUFBTSxXQUFXLFNBQVMsR0FBRztBQUUzQixVQUFNQyxPQUFNLElBQUksTUFBTSxNQUFNLFVBQVUsSUFBSSxFQUFFLFVBQVUsSUFBSSxDQUFDO0FBRTNELGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxVQUFVLEdBQUcsS0FBSyxHQUFHO0FBQzdDLGVBQVMsSUFBSSxHQUFHLElBQUksRUFBRSxVQUFVLEdBQUcsS0FBSyxHQUFHO0FBQ3pDLFFBQUFBLEtBQUksSUFBSSxDQUFDLEtBQUssT0FBTyxLQUFLLE9BQU8sS0FBSyxNQUFNLE1BQU0sQ0FBQyxDQUFFLElBQUksT0FBTyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUUsQ0FBRTtBQUFBLE1BQ3BGO0FBQUEsSUFDRjtBQUVBLFdBQU8sYUFBYUEsTUFBSyxDQUFDO0FBQUEsRUFDNUI7QUFFQSxRQUFNLE1BQU0sU0FBUyxHQUFHO0FBRXRCLFFBQUksTUFBTSxVQUFVLElBQUksRUFBRSxVQUFVLElBQUksR0FBRztBQUN6QyxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sUUFBUSxPQUFPLEtBQUssTUFBTSxNQUFNLENBQUMsQ0FBRSxJQUFJLE9BQU8sS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFFO0FBRXBFLFVBQU1BLE9BQU0sSUFBSSxNQUFNLE1BQU0sVUFBVSxDQUFFO0FBQ3hDLGFBQVMsSUFBSSxHQUFHLElBQUksTUFBTSxVQUFVLEdBQUcsS0FBSyxHQUFHO0FBQzdDLE1BQUFBLEtBQUksQ0FBQyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBQUEsSUFDeEI7QUFFQSxhQUFTLElBQUksR0FBRyxJQUFJLEVBQUUsVUFBVSxHQUFHLEtBQUssR0FBRztBQUN6QyxNQUFBQSxLQUFJLENBQUMsS0FBSyxPQUFPLEtBQUssT0FBTyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUUsSUFBSSxLQUFLO0FBQUEsSUFDeEQ7QUFHQSxXQUFPLGFBQWFBLE1BQUssQ0FBQyxFQUFFLElBQUksQ0FBQztBQUFBLEVBQ25DO0FBRUEsU0FBTztBQUNUO0FBTUEsSUFBTSxhQUFZLFdBQVc7QUFFM0IsUUFBTSxpQkFBaUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFRckIsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ1YsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ1YsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ1YsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUFBO0FBQUEsSUFHVCxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUdWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNWLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR1YsQ0FBQyxHQUFHLEtBQUssRUFBRTtBQUFBLElBQ1gsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ1YsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ1YsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUFBO0FBQUEsSUFHVCxDQUFDLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDWixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDVixDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDckIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBO0FBQUEsSUFHckIsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ1YsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ1YsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLElBQ1YsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBO0FBQUEsSUFHVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDVixDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDckIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBO0FBQUEsSUFHckIsQ0FBQyxHQUFHLEtBQUssRUFBRTtBQUFBLElBQ1gsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3JCLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNyQixDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUdyQixDQUFDLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDWixDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDckIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3JCLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3JCLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNyQixDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDckIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3JCLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3JCLENBQUMsR0FBRyxLQUFLLEVBQUU7QUFBQSxJQUNYLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNyQixDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDckIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBO0FBQUEsSUFHckIsQ0FBQyxHQUFHLEtBQUssSUFBSSxHQUFHLEtBQUssRUFBRTtBQUFBLElBQ3ZCLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNyQixDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDckIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBO0FBQUEsSUFHckIsQ0FBQyxHQUFHLEtBQUssR0FBRztBQUFBLElBQ1osQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3JCLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNyQixDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3JCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxJQUFJLEdBQUcsS0FBSyxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3JCLENBQUMsR0FBRyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUNyQixDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxJQUFJLEdBQUcsS0FBSyxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3JCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxHQUFHLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3JCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd2QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxJQUFJLElBQUksRUFBRTtBQUFBLElBQ1gsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3RCLENBQUMsR0FBRyxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFBQSxJQUN6QixDQUFDLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDWCxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdEIsQ0FBQyxJQUFJLElBQUksRUFBRTtBQUFBO0FBQUEsSUFHWCxDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN2QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd2QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN2QixDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd2QixDQUFDLElBQUksS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDMUIsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd0QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd2QixDQUFDLEdBQUcsS0FBSyxLQUFLLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDMUIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd2QixDQUFDLEdBQUcsS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDekIsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd2QixDQUFDLEdBQUcsS0FBSyxLQUFLLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDMUIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3ZCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxJQUN2QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd2QixDQUFDLElBQUksS0FBSyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQUEsSUFDMUIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQSxJQUN0QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUE7QUFBQSxJQUd2QixDQUFDLElBQUksS0FBSyxHQUFHO0FBQUEsSUFDYixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3ZCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3ZCLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFBQSxJQUMxQixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3ZCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3ZCLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFBQSxJQUMxQixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxJQUFJLElBQUksSUFBSSxHQUFHLElBQUksRUFBRTtBQUFBLElBQ3RCLENBQUMsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3RCLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFBQSxJQUMxQixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3ZCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3ZCLENBQUMsR0FBRyxLQUFLLEtBQUssSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUMxQixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdEIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3ZCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3RCLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFBQSxJQUMxQixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3ZCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3ZCLENBQUMsR0FBRyxLQUFLLEtBQUssSUFBSSxLQUFLLEdBQUc7QUFBQSxJQUMxQixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3ZCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3ZCLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFBQSxJQUMxQixDQUFDLElBQUksSUFBSSxJQUFJLEdBQUcsSUFBSSxFQUFFO0FBQUEsSUFDdEIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLElBQ3ZCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQTtBQUFBLElBR3ZCLENBQUMsSUFBSSxLQUFLLEtBQUssR0FBRyxLQUFLLEdBQUc7QUFBQSxJQUMxQixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsSUFDdkIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFB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RUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsRUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsRUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsRUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsRUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsRUFDVixDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsRUFDVixDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUNkLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLEVBQ2QsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDZCxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUNkLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLEVBQ2QsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDZCxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUNkLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDbEIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUNsQixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztBQUFBLEVBQ25CLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHO0FBQUEsRUFDbkIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUc7QUFBQSxFQUNuQixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztBQUFBLEVBQ25CLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHO0FBQUEsRUFDbkIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksR0FBRztBQUFBLEVBQ3ZCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUc7QUFBQSxFQUN4QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHO0FBQUEsRUFDeEIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRztBQUFBLEVBQ3hC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LENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLEVBQ2QsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDZCxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUNkLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDbEIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUNsQixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztBQUFBLEVBQ25CLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHO0FBQUEsRUFDbkIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUc7QUFBQSxFQUNuQixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztBQUFBLEVBQ25CLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHO0FBQUEsRUFDbkIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksR0FBRztBQUFBLEVBQ3ZCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUc7QUFBQSxFQUN4QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHO0FBQUEsRUFDeEIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRztBQUFBLEVBQ3hCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUc7QUFBQSxFQUN4QixDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHO0FBQUEsRUFDeEIsQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEtBQUssR0FBRztBQUFBLEVBQ3hCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRztBQUFBLEVBQzdCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRztBQUFBLEVBQzdCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRztBQUFBLEVBQzdCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRztBQUFBLEVBQzdCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRztBQUFBLEVBQzdCLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssR0FBRztBQUMvQjtBQUdBLElBQU0saUJBQTZDO0FBQUEsRUFDakQsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLElBQUk7QUFBQSxFQUN6TixHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sSUFBSTtBQUFBLEVBQ3BOLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxNQUFNLE1BQU0sTUFBTSxJQUFJO0FBQUEsRUFDN00sR0FBRyxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FB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SSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUNqQztBQUdBLElBQU0sZ0JBQWdCO0FBQUEsRUFDcEIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUMvQixDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLEVBQzVCLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDN0IsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUMvQixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLEVBQy9CLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxFQUFFO0FBQUEsRUFDNUIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7QUFBQSxFQUM3QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtBQUNqQztBQUdBLElBQU0sZUFBZTtBQUFBLEVBQ25CLENBQUMsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDN0IsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxFQUMzQixDQUFDLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxJQUFJLElBQUksRUFBRTtBQUFBLEVBQzVCLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsRUFDOUIsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEVBQUU7QUFBQSxFQUM3QixDQUFDLElBQUksSUFBSSxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUFBLEVBQzNCLENBQUMsSUFBSSxJQUFJLElBQUksSUFBSSxJQUFJ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QUFBQSxRQUNEO0FBQUEsUUFBSTtBQUFBLFFBQUk7QUFBQSxRQUFJO0FBQUEsUUFBSTtBQUFBLFFBQUk7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUNqRTtBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQzlEO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxNQUNwRTtBQUFBLE1BQ0EsR0FBRztBQUFBLFFBQ0Q7QUFBQSxRQUFJO0FBQUEsUUFBSTtBQUFBLFFBQUk7QUFBQSxRQUFJO0FBQUEsUUFBSTtBQUFBLFFBQUk7QUFBQSxRQUFJO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUNwRTtBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUFLO0FBQUEsUUFBSztBQUFBLFFBQUs7QUFBQSxRQUNqRTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLFFBQU07QUFBQSxRQUFNO0FBQUEsUUFBTTtBQUFBLE1BQ3hEO0FBQUEsTUFDQSxHQUFHO0FBQUEsUUFDRDtBQUFBLFFBQUc7QUFBQSxRQUFJO0FBQUEsUUFBSTtBQUFB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LEdBQUcsRUFBRTtBQUFBLE1BQ1QsR0FBRyxDQUFDLEdBQUcsRUFBRTtBQUFBLE1BQ1QsR0FBRyxDQUFDLEdBQUcsRUFBRTtBQUFBLE1BQ1QsR0FBRyxDQUFDLEdBQUcsRUFBRTtBQUFBLE1BQ1QsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsTUFDYixHQUFHLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxNQUNiLEdBQUcsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLE1BQ2IsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsTUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFBQSxNQUNkLElBQUksQ0FBQyxHQUFHLElBQUksRUFBRTtBQUFBLE1BQ2QsSUFBSSxDQUFDLEdBQUcsSUFBSSxFQUFFO0FBQUEsTUFDZCxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLE1BQ2xCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO0FBQUEsTUFDbEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFBQSxNQUNsQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLE1BQ2xCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFO0FBQUEsTUFDbEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLEVBQUU7QUFBQSxNQUNsQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRTtBQUFBLE1BQ2xCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEVBQUU7QUFBQSxNQUN0QixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxFQUFFO0FBQUEsTUFDdEIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRztBQUFBLE1BQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUc7QUFBQSxNQUN2QixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHO0FBQUEsTUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElB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LEVBQ0gsU0FBUyxPQUFPO0FBQ2QsVUFBTSxVQUFVLGlCQUFpQixRQUFRLE1BQU0sVUFBVTtBQUN6RCxZQUFRLE1BQU0sd0JBQXdCLEtBQUs7QUFDM0MsV0FBTyxJQUFJLFNBQVMsNkJBQTZCLE9BQU8sSUFBSSxFQUFFLFFBQVEsSUFBSSxDQUFDO0FBQUEsRUFDN0U7QUFDRjsiLAogICJuYW1lcyI6IFsidHlwZU51bWJlciIsICJlcnJvckNvcnJlY3Rpb25MZXZlbCIsICJ1bmljb2RlTWFwIiwgInFyY29kZSIsICJfbnVtIiwgIm51bSIsICJfdGhpcyIsICJkYXRhIiwgInN0cmluZ1RvQnl0ZXMiLCAiQUxJR05NRU5UX1BPU0lUSU9OUyIsICJBTElHTk1FTlRfUE9TSVRJT05TIiwgImlzTG9ja2VkIiwgImlzRGF0YSIsICJwIiwgInEiLCAicmdiVG9HcmF5IiwgImdlbmVyYXRlQmx1ZU5vaXNlVGlsZSIsICJzYW1wbGVCbHVlTm9pc2UiLCAicmdiVG9HcmF5IiwgInF1YW50aXplIiwgInRvdGFsRGF0YU1vZHVsZXMiLCAiaXNMb2NrZWQiLCAiaXNEYXRhIl0KfQo=
