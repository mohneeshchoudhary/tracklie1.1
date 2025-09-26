/**
 * Role-aware Sidebar Component
 * Main navigation sidebar with logo, role-based navigation items, and user info
 */
class Sidebar {
  constructor(config = {}) {
    this.config = {
      user: {
        name: 'Guest',
        role: null,
        avatar: 'G'
      },
      navigation: [], // Will be populated based on role
      onNavigate: null,
      ...config
    };
    
    this.element = null;
    this.navItems = [];
    this.currentActive = 'dashboard';
    this.init();
    this.setupAuthListener();
  }
  
  init() {
    this.updateNavigation(); // Initialize navigation based on role
    this.createElement();
    this.attachEventListeners();
    this.setActiveItem(this.currentActive);
  }

  setupAuthListener() {
    // Listen for auth state changes
    if (window.AuthContext) {
      // Set initial auth state
      const initialAuthState = {
        isAuthenticated: window.AuthContext.isAuthenticated,
        user: window.AuthContext.user
      };
      this.updateUserInfo(initialAuthState);
      
      // Listen for future changes
      window.AuthContext.addListener((authState) => {
        this.updateUserInfo(authState);
      });
    } else {
      // AuthContext not ready yet, wait for it
      setTimeout(() => this.setupAuthListener(), 100);
    }
  }

  updateUserInfo(authState) {
    console.log('Sidebar.updateUserInfo called with:', authState);
    
    // Update user info
    if (authState.isAuthenticated && authState.user) {
      this.config.user = {
        name: authState.user.name,
        role: authState.user.role,
        avatar: authState.user.name.charAt(0).toUpperCase()
      };
    } else {
      this.config.user = {
        name: 'Guest',
        role: null,
        avatar: 'G'
      };
    }

    console.log('Updated user config:', this.config.user);

    // Update navigation based on role
    this.updateNavigation();
    console.log('Updated navigation:', this.config.navigation);
    
    // Re-render the sidebar
    this.render();
  }

  updateNavigation() {
    if (this.config.user.role && window.RoleUtils) {
      // Get role-based navigation items
      const roleNavItems = window.RoleUtils.getNavigationItems(this.config.user.role);
      this.config.navigation = roleNavItems.map(item => ({
        id: item.id,
        text: item.label,
        icon: item.icon,
        href: item.path,
        badge: item.badge
      }));
    } else {
      // Default navigation for unauthenticated users (guest)
      this.config.navigation = [
        {
          id: 'home',
          text: 'Home',
          icon: 'home',
          href: '#home',
          badge: null
        },
        {
          id: 'dashboard',
          text: 'Dashboard',
          icon: 'dashboard',
          href: '#dashboard',
          badge: null
        }
      ];
    }
  }
  
  createElement() {
    this.element = document.createElement('aside');
    this.element.className = 'sidebar';
    this.element.setAttribute('data-testid', 'sidebar');
    
    this.render();
  }

  render() {
    // Clear existing content
    this.element.innerHTML = '';
    this.navItems = []; // Reset nav items array
    
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
    
    // Re-attach event listeners
    this.attachEventListeners();
    this.setActiveItem(this.currentActive);
  }
  
  createLogoSection() {
    const logoSection = document.createElement('div');
    logoSection.className = 'sidebar__logo';
    
    const logo = document.createElement('div');
    logo.className = 'sidebar__logo-icon';
    logo.innerHTML = '🎯';
    
    const logoText = document.createElement('div');
    logoText.className = 'sidebar__logo-text';
    logoText.innerHTML = '<span class="logo-primary">Track</span><span class="logo-secondary">lie</span>';
    
    logoSection.appendChild(logo);
    logoSection.appendChild(logoText);
    
    return logoSection;
  }
  
  createNavigationSection() {
    const navSection = document.createElement('nav');
    navSection.className = 'sidebar__nav';
    navSection.setAttribute('data-testid', 'sidebar-navigation');
    
    // Create navigation items based on role
    this.config.navigation.forEach(navItem => {
      const navElement = this.createNavItem(navItem);
      navSection.appendChild(navElement);
      this.navItems.push(navElement);
    });
    
    return navSection;
  }
  
  createNavItem(item) {
    const navItem = document.createElement('a');
    navItem.className = 'sidebar__nav-item';
    navItem.href = item.href;
    navItem.setAttribute('data-testid', `sidebar-${item.id}`);
    navItem.setAttribute('data-page', item.id);
    
    // Icon
    const icon = document.createElement('div');
    icon.className = `sidebar__nav-icon sidebar__nav-icon--${item.icon}`;
    
    // Text
    const text = document.createElement('span');
    text.className = 'sidebar__nav-text';
    text.textContent = item.text;
    
    // Badge (if present)
    let badge = null;
    if (item.badge) {
      badge = document.createElement('span');
      badge.className = 'sidebar__nav-badge';
      badge.textContent = item.badge;
    }
    
    // Assemble nav item
    navItem.appendChild(icon);
    navItem.appendChild(text);
    if (badge) {
      navItem.appendChild(badge);
    }
    
    return navItem;
  }
  
  createUserSection() {
    const userSection = document.createElement('div');
    userSection.className = 'sidebar__user';
    
    const userAvatar = document.createElement('div');
    userAvatar.className = 'sidebar__user-avatar';
    userAvatar.textContent = this.config.user.avatar;
    
    const userInfo = document.createElement('div');
    userInfo.className = 'sidebar__user-info';
    
    const userName = document.createElement('div');
    userName.className = 'sidebar__user-name';
    userName.textContent = this.config.user.name;
    
    const userRole = document.createElement('div');
    userRole.className = 'sidebar__user-role';
    if (this.config.user.role && window.RoleUtils) {
      userRole.textContent = window.RoleUtils.getRoleDisplayName(this.config.user.role);
    } else {
      userRole.textContent = 'Guest';
    }
    
    userInfo.appendChild(userName);
    userInfo.appendChild(userRole);
    
    userSection.appendChild(userAvatar);
    userSection.appendChild(userInfo);
    
    return userSection;
  }
  
  attachEventListeners() {
    // Navigation item clicks
    this.navItems.forEach(navItem => {
      navItem.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = navItem.getAttribute('data-page');
        this.setActiveItem(pageId);
        
        // Update URL hash
        window.location.hash = pageId;
        
        // Call navigation callback
        if (this.config.onNavigate) {
          this.config.onNavigate({
            id: pageId,
            text: navItem.querySelector('.sidebar__nav-text').textContent
          });
        }
      });
    });
  }
  
  setActiveItem(pageId) {
    this.currentActive = pageId;
    
    // Remove active class from all items
    this.navItems.forEach(item => {
      item.classList.remove('sidebar__nav-item--active');
    });
    
    // Add active class to current item
    const activeItem = this.navItems.find(item => 
      item.getAttribute('data-page') === pageId
    );
    
    if (activeItem) {
      activeItem.classList.add('sidebar__nav-item--active');
    }
  }
  
  
  updateSidebarBadge(itemId, badge) {
    const navItem = this.navItems.find(item => 
      item.getAttribute('data-page') === itemId
    );
    
    if (navItem) {
      let badgeElement = navItem.querySelector('.sidebar__nav-badge');
      
      if (badge) {
        if (!badgeElement) {
          badgeElement = document.createElement('span');
          badgeElement.className = 'sidebar__nav-badge';
          navItem.appendChild(badgeElement);
        }
        badgeElement.textContent = badge;
      } else if (badgeElement) {
        badgeElement.remove();
      }
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
  module.exports = Sidebar;
} else {
  window.Sidebar = Sidebar;
}