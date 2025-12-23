/**
 * Fixed blob module drawing function
 * Replace the drawBlobModule method in qr-generator.js with this implementation
 */

// This function draws blob-style modules that properly connect to adjacent modules
// with smooth rounded corners where there are no neighbors
function drawBlobModule(ctx, x, y, size, qr, row, col, moduleCount, gap = 0) {
  const hasTop = row > 0 && qr.isDark(row - 1, col);
  const hasBottom = row < moduleCount - 1 && qr.isDark(row + 1, col);
  const hasLeft = col > 0 && qr.isDark(row, col - 1);
  const hasRight = col < moduleCount - 1 && qr.isDark(row, col + 1);
  
  // Apply gap to the overall size
  const g = size * gap * 0.5;
  const effectiveSize = size - g * 2;
  const ex = x + g;
  const ey = y + g;
  
  // Corner radius for smooth blob shape - only applies where no neighbor
  const r = effectiveSize * 0.35;
  
  ctx.beginPath();
  
  // Start from top-left, going clockwise
  // Top-left corner - square if connected both ways, rounded otherwise
  if (hasTop && hasLeft) {
    ctx.moveTo(ex, ey);
  } else if (hasTop) {
    ctx.moveTo(ex, ey);
  } else if (hasLeft) {
    ctx.moveTo(ex, ey + r);
    ctx.lineTo(ex, ey);
  } else {
    ctx.moveTo(ex + r, ey);
  }
  
  // Top edge to top-right
  if (hasTop && hasRight) {
    ctx.lineTo(ex + effectiveSize, ey);
  } else if (hasTop) {
    ctx.lineTo(ex + effectiveSize - r, ey);
    ctx.quadraticCurveTo(ex + effectiveSize, ey, ex + effectiveSize, ey + r);
  } else if (hasRight) {
    ctx.lineTo(ex + effectiveSize, ey);
  } else {
    ctx.lineTo(ex + effectiveSize - r, ey);
    ctx.quadraticCurveTo(ex + effectiveSize, ey, ex + effectiveSize, ey + r);
  }
  
  // Right edge to bottom-right
  if (hasBottom && hasRight) {
    ctx.lineTo(ex + effectiveSize, ey + effectiveSize);
  } else if (hasRight) {
    ctx.lineTo(ex + effectiveSize, ey + effectiveSize - r);
    ctx.quadraticCurveTo(ex + effectiveSize, ey + effectiveSize, ex + effectiveSize - r, ey + effectiveSize);
  } else if (hasBottom) {
    ctx.lineTo(ex + effectiveSize, ey + effectiveSize);
  } else {
    ctx.lineTo(ex + effectiveSize, ey + effectiveSize - r);
    ctx.quadraticCurveTo(ex + effectiveSize, ey + effectiveSize, ex + effectiveSize - r, ey + effectiveSize);
  }
  
  // Bottom edge to bottom-left
  if (hasBottom && hasLeft) {
    ctx.lineTo(ex, ey + effectiveSize);
  } else if (hasBottom) {
    ctx.lineTo(ex + r, ey + effectiveSize);
    ctx.quadraticCurveTo(ex, ey + effectiveSize, ex, ey + effectiveSize - r);
  } else if (hasLeft) {
    ctx.lineTo(ex, ey + effectiveSize);
  } else {
    ctx.lineTo(ex + r, ey + effectiveSize);
    ctx.quadraticCurveTo(ex, ey + effectiveSize, ex, ey + effectiveSize - r);
  }
  
  // Left edge back to top-left
  if (hasTop && hasLeft) {
    ctx.lineTo(ex, ey);
  } else if (hasLeft) {
    ctx.lineTo(ex, ey + r);
    ctx.quadraticCurveTo(ex, ey, ex + r, ey);
  } else if (hasTop) {
    ctx.lineTo(ex, ey);
  } else {
    ctx.lineTo(ex, ey + r);
    ctx.quadraticCurveTo(ex, ey, ex + r, ey);
  }
  
  ctx.closePath();
  ctx.fill();
}

export { drawBlobModule };
