// Form submission handler for contact form
const CONTACT_EMAIL = 'itsshahamar@duck.com';

class FormHandler {
  constructor() {
    this.form = document.querySelector('.contact-form');
    if (this.form) {
      this.init();
    }
  }
  
  init() {
    // Check if user returned from FormSubmit
    this.checkSubmissionStatus();
    
    // Add client-side validation before form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }
  
  checkSubmissionStatus() {
    // Check URL for submission status
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('submitted') === 'true') {
      this.showNotification('Thank you! Your message has been sent successfully. We will get back to you soon.', 'success');
      // Clean up URL
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }
  
  handleSubmit(e) {
    const formData = new FormData(this.form);
    
    // Validate form before submission
    if (!this.validateForm(formData)) {
      e.preventDefault();
      return false;
    }
    
    // Show loading state (FormSubmit will handle actual submission)
    const submitButton = this.form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');
    
    // Form will submit normally to FormSubmit.co
    return true;
  }
  
  validateForm(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    if (!name || name.trim().length < 2) {
      this.showNotification('Please enter your name (at least 2 characters)', 'error');
      return false;
    }
    
    if (!email || !this.isValidEmail(email)) {
      this.showNotification('Please enter a valid email address', 'error');
      return false;
    }
    
    if (!message || message.trim().length < 10) {
      this.showNotification('Please enter a message (at least 10 characters)', 'error');
      return false;
    }
    
    return true;
  }
  
  isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  showNotification(message, type) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `form-notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-icon">${type === 'success' ? '✓' : '✕'}</span>
        <span class="notification-message">${message}</span>
      </div>
    `;
    
    // Insert before form
    this.form.parentNode.insertBefore(notification, this.form);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
}

// Initialize form handler when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new FormHandler());
} else {
  new FormHandler();
}
