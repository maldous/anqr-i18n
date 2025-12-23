/**
 * Toast Notification Module
 * Shows temporary notifications to the user
 */

export class Toast {
  constructor() {
    this.container = null;
  }
  
  getContainer() {
    if (!this.container) {
      this.container = document.getElementById('toastContainer');
    }
    return this.container;
  }
  
  /**
   * Show a toast notification
   * @param {string} message - The message to display
   * @param {string} type - 'success', 'error', or 'info'
   * @param {number} duration - How long to show the toast (ms)
   */
  show(message, type = 'info', duration = 2000) {
    const container = this.getContainer();
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Auto-remove after duration
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }
  
  /**
   * Show a success toast
   */
  success(message, duration) {
    this.show(message, 'success', duration);
  }
  
  /**
   * Show an error toast
   */
  error(message, duration) {
    this.show(message, 'error', duration);
  }
  
  /**
   * Show an info toast
   */
  info(message, duration) {
    this.show(message, 'info', duration);
  }
}
