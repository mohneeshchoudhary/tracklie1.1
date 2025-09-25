/**
 * Sidebar Component
 * Main navigation sidebar with logo, navigation items, and user info
 */
class Sidebar {
  constructor(config = {}) {
    this.config = {
      user: {
        name: 'Admin User',
        role: 'ADMIN',
        avatar: 'A'
      },
      navigation: [
        {
          id: 'dashboard',
          text: 'Dashboard',
          icon: 'dashboard',
          href: '#dashboard',
          badge: null
        },
        {
          id: 'leads',
          text: 'Leads',
          icon: 'leads',
          href: '#leads',
          badge: 12
        },
        {
          id: 'followups',
          text: 'Follow-ups',
          icon: 'followups',
          href: '#followups',
          badge: 5
        },
        {
          id: 'payments',
          text: 'Payments',
          icon: 'payments',
          href: '#payments',
          badge: null
        },
        {
          id: 'reports',
          text: 'Reports',
          icon: 'reports',
          href: '#reports',
          badge: null
        }
      ],
      onNavigate: null,
      ...config
    };
    
    this.element = null;
    this.navItems = [];
    this.currentActive = 'dashboard';
    this.init();
  }
  
  init() {
    this.createElement();
    this.attachEventListeners();
    this.setActiveItem(this.currentActive);
  }
  
  createElement() {
    this.element = document.createElement('aside');
    this.element.className = 'sidebar';
    this.element.setAttribute('data-testid', 'sidebar');
    
    // Logo section
    const logoSection = this.createLogoSection();
    
    // Navigation sections
    const navSection = this.createNavigationSection();
    
    // User info section
    const userSection = this.createUserSection();
    
    // Assemble sidebar
    this.element.appendChild(logoSection);
    this.element.appendChild(navSection);
    this.element.appendChild(userSection);
  }
  
  createLogoSection() {
    const logoSection = document.createElement('div');
    logoSection.className = 'sidebar__logo';
    
    const logoIcon = document.createElement('div');
    logoIcon.className = 'sidebar__logo-icon';
    
    const logoText = document.createElement('span');
    logoText.className = 'sidebar__logo-text';
    logoText.textContent = 'Tracklie';
    
    logoSection.appendChild(logoIcon);
    logoSection.appendChild(logoText);
    
    return logoSection;
  }
  
  createNavigationSection() {
    const navSection = document.createElement('div');
    navSection.className = 'sidebar__nav';
    
    // Main section
    const mainSection = this.createNavSection('MAIN', this.config.navigation);
    navSection.appendChild(mainSection);
    
    return navSection;
  }
  
  createNavSection(title, items) {
    const section = document.createElement('div');
    section.className = 'sidebar__nav-section';
    
    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'sidebar__nav-title';
    sectionTitle.textContent = title;
    
    const navList = document.createElement('div');
    navList.className = 'sidebar__nav-list';
    
    // Create nav items
    items.forEach(itemConfig => {
      const navItem = new NavItem({
        ...itemConfig,
        onClick: this.handleNavClick.bind(this)
      });
      
      this.navItems.push(navItem);
      navList.appendChild(navItem.getElement());
    });
    
    section.appendChild(sectionTitle);
    section.appendChild(navList);
    
    return section;
  }
  
  createUserSection() {
    const userSection = document.createElement('div');
    userSection.className = 'sidebar__user';
    
    const userInfo = document.createElement('div');
    userInfo.className = 'sidebar__user-info';
    
    const avatar = document.createElement('div');
    avatar.className = 'sidebar__user-avatar';
    avatar.textContent = this.config.user.avatar;
    
    const userDetails = document.createElement('div');
    userDetails.className = 'sidebar__user-details';
    
    const userName = document.createElement('div');
    userName.className = 'sidebar__user-name';
    userName.textContent = this.config.user.name;
    
    const userRole = document.createElement('span');
    userRole.className = 'sidebar__user-role';
    userRole.textContent = this.config.user.role;
    
    userDetails.appendChild(userName);
    userDetails.appendChild(userRole);
    
    userInfo.appendChild(avatar);
    userInfo.appendChild(userDetails);
    
    userSection.appendChild(userInfo);
    
    return userSection;
  }
  
  handleNavClick(itemConfig) {
    // Update active state
    this.setActiveItem(itemConfig.id);
    
    // Trigger navigation callback
    if (this.config.onNavigate) {
      this.config.onNavigate(itemConfig);
    }
    
    // Update URL hash
    window.location.hash = itemConfig.href.replace('#', '');
  }
  
  setActiveItem(itemId) {
    this.currentActive = itemId;
    
    // Update all nav items
    this.navItems.forEach(navItem => {
      const isActive = navItem.config.id === itemId;
      navItem.setActive(isActive);
    });
  }
  
  updateBadge(itemId, badge) {
    const navItem = this.navItems.find(item => item.config.id === itemId);
    if (navItem) {
      navItem.updateBadge(badge);
    }
  }
  
  attachEventListeners() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== this.currentActive) {
        this.setActiveItem(hash);
      }
    });
  }
  
  getElement() {
    return this.element;
  }
  
  destroy() {
    this.navItems.forEach(navItem => navItem.destroy());
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Sidebar;
} else {
  window.Sidebar = Sidebar;
}
