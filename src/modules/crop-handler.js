/**
 * CropHandler - Manages a draggable/resizable square crop overlay
 * for selecting regions from non-square images
 */

export class CropHandler {
  constructor(container, onChange) {
    this.container = container;
    this.onChange = onChange;
    this.cropBox = null;
    this.isDragging = false;
    this.isResizing = false;
    this.resizeHandle = null;
    this.startX = 0;
    this.startY = 0;
    this.startLeft = 0;
    this.startTop = 0;
    this.startSize = 0;
    
    // Normalized crop region (0-1 values)
    this.cropRegion = { x: 0, y: 0, size: 1 };
    
    this.init();
  }

  init() {
    // Create crop overlay structure
    this.overlay = document.createElement('div');
    this.overlay.className = 'crop-overlay';
    this.overlay.style.display = 'none';
    
    this.cropBox = document.createElement('div');
    this.cropBox.className = 'crop-box';
    
    // Create resize handles for corners
    const handles = ['nw', 'ne', 'sw', 'se'];
    handles.forEach(pos => {
      const handle = document.createElement('div');
      handle.className = `crop-handle crop-handle-${pos}`;
      handle.dataset.handle = pos;
      this.cropBox.appendChild(handle);
    });
    
    this.overlay.appendChild(this.cropBox);
    this.container.appendChild(this.overlay);
    
    // Bind events
    this.bindEvents();
  }

  bindEvents() {
    // Mouse events for crop box dragging
    this.cropBox.addEventListener('mousedown', (e) => this.onMouseDown(e));
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('mouseup', () => this.onMouseUp());
    
    // Touch events for mobile
    this.cropBox.addEventListener('touchstart', (e) => this.onTouchStart(e));
    document.addEventListener('touchmove', (e) => this.onTouchMove(e));
    document.addEventListener('touchend', () => this.onMouseUp());
    
    // Handle resize
    this.cropBox.querySelectorAll('.crop-handle').forEach(handle => {
      handle.addEventListener('mousedown', (e) => this.onResizeStart(e));
      handle.addEventListener('touchstart', (e) => this.onResizeTouchStart(e));
    });
  }

  show(imageElement) {
    this.imageElement = imageElement;
    this.overlay.style.display = 'block';
    
    // Initialize crop box to cover maximum square area centered
    this.initializeCropBox();
  }

  hide() {
    this.overlay.style.display = 'none';
    this.imageElement = null;
  }

  initializeCropBox() {
    if (!this.imageElement) return;
    
    const containerRect = this.container.getBoundingClientRect();
    const imgRect = this.imageElement.getBoundingClientRect();
    
    // Calculate image position relative to container
    const imgLeft = imgRect.left - containerRect.left;
    const imgTop = imgRect.top - containerRect.top;
    const imgWidth = imgRect.width;
    const imgHeight = imgRect.height;
    
    // Maximum square size that fits in the image
    const maxSize = Math.min(imgWidth, imgHeight);
    
    // Center the square
    const left = imgLeft + (imgWidth - maxSize) / 2;
    const top = imgTop + (imgHeight - maxSize) / 2;
    
    this.setCropBoxPosition(left, top, maxSize);
    this.updateCropRegion();
  }

  setCropBoxPosition(left, top, size) {
    this.cropBox.style.left = `${left}px`;
    this.cropBox.style.top = `${top}px`;
    this.cropBox.style.width = `${size}px`;
    this.cropBox.style.height = `${size}px`;
  }

  onMouseDown(e) {
    if (e.target.classList.contains('crop-handle')) return;
    
    e.preventDefault();
    this.isDragging = true;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startLeft = this.cropBox.offsetLeft;
    this.startTop = this.cropBox.offsetTop;
    this.cropBox.classList.add('dragging');
  }

  onTouchStart(e) {
    if (e.target.classList.contains('crop-handle')) return;
    
    const touch = e.touches[0];
    this.isDragging = true;
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startLeft = this.cropBox.offsetLeft;
    this.startTop = this.cropBox.offsetTop;
    this.cropBox.classList.add('dragging');
  }

  onMouseMove(e) {
    if (this.isDragging) {
      this.handleDrag(e.clientX, e.clientY);
    } else if (this.isResizing) {
      this.handleResize(e.clientX, e.clientY);
    }
  }

  onTouchMove(e) {
    if (!this.isDragging && !this.isResizing) return;
    
    const touch = e.touches[0];
    if (this.isDragging) {
      this.handleDrag(touch.clientX, touch.clientY);
    } else if (this.isResizing) {
      this.handleResize(touch.clientX, touch.clientY);
    }
  }

  handleDrag(clientX, clientY) {
    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;
    
    let newLeft = this.startLeft + deltaX;
    let newTop = this.startTop + deltaY;
    
    // Constrain to image bounds
    const bounds = this.getImageBounds();
    const size = this.cropBox.offsetWidth;
    
    newLeft = Math.max(bounds.left, Math.min(newLeft, bounds.right - size));
    newTop = Math.max(bounds.top, Math.min(newTop, bounds.bottom - size));
    
    this.cropBox.style.left = `${newLeft}px`;
    this.cropBox.style.top = `${newTop}px`;
    
    this.updateCropRegion();
  }

  onResizeStart(e) {
    e.preventDefault();
    e.stopPropagation();
    
    this.isResizing = true;
    this.resizeHandle = e.target.dataset.handle;
    this.startX = e.clientX;
    this.startY = e.clientY;
    this.startLeft = this.cropBox.offsetLeft;
    this.startTop = this.cropBox.offsetTop;
    this.startSize = this.cropBox.offsetWidth;
    this.cropBox.classList.add('resizing');
  }

  onResizeTouchStart(e) {
    e.stopPropagation();
    
    const touch = e.touches[0];
    this.isResizing = true;
    this.resizeHandle = e.target.dataset.handle;
    this.startX = touch.clientX;
    this.startY = touch.clientY;
    this.startLeft = this.cropBox.offsetLeft;
    this.startTop = this.cropBox.offsetTop;
    this.startSize = this.cropBox.offsetWidth;
    this.cropBox.classList.add('resizing');
  }

  handleResize(clientX, clientY) {
    const bounds = this.getImageBounds();
    const deltaX = clientX - this.startX;
    const deltaY = clientY - this.startY;
    
    let newSize, newLeft, newTop;
    const minSize = 50;
    
    // Calculate new size based on which handle is being dragged
    switch (this.resizeHandle) {
      case 'se':
        newSize = Math.max(minSize, this.startSize + Math.max(deltaX, deltaY));
        newLeft = this.startLeft;
        newTop = this.startTop;
        break;
      case 'sw':
        newSize = Math.max(minSize, this.startSize + Math.max(-deltaX, deltaY));
        newLeft = this.startLeft + this.startSize - newSize;
        newTop = this.startTop;
        break;
      case 'ne':
        newSize = Math.max(minSize, this.startSize + Math.max(deltaX, -deltaY));
        newLeft = this.startLeft;
        newTop = this.startTop + this.startSize - newSize;
        break;
      case 'nw':
        newSize = Math.max(minSize, this.startSize + Math.max(-deltaX, -deltaY));
        newLeft = this.startLeft + this.startSize - newSize;
        newTop = this.startTop + this.startSize - newSize;
        break;
    }
    
    // Constrain to image bounds
    const maxSize = Math.min(
      bounds.right - newLeft,
      bounds.bottom - newTop,
      newLeft - bounds.left + newSize,
      newTop - bounds.top + newSize
    );
    
    if (newSize > maxSize) {
      newSize = maxSize;
    }
    
    // Ensure within bounds
    if (newLeft < bounds.left) {
      newSize -= (bounds.left - newLeft);
      newLeft = bounds.left;
    }
    if (newTop < bounds.top) {
      newSize -= (bounds.top - newTop);
      newTop = bounds.top;
    }
    if (newLeft + newSize > bounds.right) {
      newSize = bounds.right - newLeft;
    }
    if (newTop + newSize > bounds.bottom) {
      newSize = bounds.bottom - newTop;
    }
    
    this.setCropBoxPosition(newLeft, newTop, newSize);
    this.updateCropRegion();
  }

  onMouseUp() {
    if (this.isDragging || this.isResizing) {
      this.isDragging = false;
      this.isResizing = false;
      this.resizeHandle = null;
      this.cropBox.classList.remove('dragging', 'resizing');
      
      // Fire change callback
      if (this.onChange) {
        this.onChange(this.cropRegion);
      }
    }
  }

  getImageBounds() {
    if (!this.imageElement) {
      return { left: 0, top: 0, right: 0, bottom: 0 };
    }
    
    const containerRect = this.container.getBoundingClientRect();
    const imgRect = this.imageElement.getBoundingClientRect();
    
    return {
      left: imgRect.left - containerRect.left,
      top: imgRect.top - containerRect.top,
      right: imgRect.right - containerRect.left,
      bottom: imgRect.bottom - containerRect.top,
      width: imgRect.width,
      height: imgRect.height
    };
  }

  updateCropRegion() {
    const bounds = this.getImageBounds();
    if (bounds.width === 0 || bounds.height === 0) return;
    
    const boxLeft = this.cropBox.offsetLeft;
    const boxTop = this.cropBox.offsetTop;
    const boxSize = this.cropBox.offsetWidth;
    
    // Normalize to 0-1 range relative to image
    this.cropRegion = {
      x: (boxLeft - bounds.left) / bounds.width,
      y: (boxTop - bounds.top) / bounds.height,
      size: boxSize / Math.min(bounds.width, bounds.height)
    };
  }

  getCropRegion() {
    return this.cropRegion;
  }

  // Reset crop to full image
  reset() {
    this.initializeCropBox();
    if (this.onChange) {
      this.onChange(this.cropRegion);
    }
  }

  destroy() {
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }
}
