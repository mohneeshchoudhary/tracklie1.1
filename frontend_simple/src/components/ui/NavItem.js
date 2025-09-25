/**
 * NavItem Component
 * Reusable navigation item with icon, text, and optional badge
 */
class NavItem {
  constructor(config) {
    this.config = {
      id: '',
      text: '',
      icon: '',
      href: '#',
      badge: null,
      active: false,
      onClick: null,
      ...config
    };
    
    this.element = null;
    this.init();
  }
  
  init() {
    this.createElement();
    this.attachEventListeners();
  }
  
  createElement() {
    this.element = document.createElement('a');
    this.element.className = this.getClassName();
    this.element.href = this.config.href;
    this.element.setAttribute('data-testid', `nav-item-${this.config.id}`);
    
    // Icon
    const icon = document.createElement('div');
    icon.className = `nav-item__icon nav-item__icon--${this.config.icon}`;
    
    // Text
    const text = document.createElement('span');
    text.className = 'nav-item__text';
    text.textContent = this.config.text;
    
    // Badge (if provided)
    const badge = this.config.badge ? this.createBadge() : null;
    
    // Assemble
    this.element.appendChild(icon);
    this.element.appendChild(text);
    if (badge) {
      this.element.appendChild(badge);
    }
  }
  
  createBadge() {
    const badge = document.createElement('span');
    badge.className = 'nav-item__badge';
    badge.textContent = this.config.badge;
    return badge;
  }
  
  getClassName() {
    const baseClass = 'nav-item';
    const activeClass = this.config.active ? 'nav-item--active' : '';
    return `${baseClass} ${activeClass}`.trim();
  }
  
  attachEventListeners() {
    if (this.config.onClick) {
      this.element.addEventListener('click', (e) => {
        e.preventDefault();
        this.config.onClick(this.config);
      });
    }
  }
  
  setActive(active) {
    this.config.active = active;
    this.element.className = this.getClassName();
  }
  
  updateBadge(badge) {
    this.config.badge = badge;
    const badgeElement = this.element.querySelector('.nav-item__badge');
    
    if (badge) {
      if (badgeElement) {
        badgeElement.textContent = badge;
        badgeElement.classList.remove('nav-item__badge--hidden');
      } else {
        this.element.appendChild(this.createBadge());
      }
    } else if (badgeElement) {
      badgeElement.classList.add('nav-item__badge--hidden');
    }
  }
  
  getElement() {
    return this.element;
  }
  
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavItem;
} else {
  window.NavItem = NavItem;
}
