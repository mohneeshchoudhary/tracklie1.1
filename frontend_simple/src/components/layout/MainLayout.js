/**
 * MainLayout Component
 * Main application layout with sidebar, topbar, and content area
 */
class MainLayout {
  constructor(config = {}) {
    this.config = {
      user: {
        name: 'Admin User',
        role: 'ADMIN',
        avatar: 'A'
      },
      onNavigate: null,
      ...config
    };
    
    this.element = null;
    this.sidebar = null;
    this.topbar = null;
    this.contentArea = null;
    this.currentPage = null;
    this.init();
  }
  
  init() {
    this.createElement();
    this.initializeComponents();
    this.attachEventListeners();
    this.handleInitialRoute();
  }
  
  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'main-layout';
    this.element.setAttribute('data-testid', 'main-layout');
    
    // Create sidebar
    this.sidebar = new Sidebar({
      user: this.config.user,
      onNavigate: this.handleNavigation.bind(this)
    });
    
    // Create topbar
    this.topbar = new Topbar({
      user: this.config.user
    });
    
    // Create content area
    this.contentArea = document.createElement('main');
    this.contentArea.className = 'main-layout__content';
    
    // Create topbar container
    const topbarContainer = document.createElement('div');
    topbarContainer.className = 'main-layout__topbar';
    topbarContainer.appendChild(this.topbar.getElement());
    
    // Create page container
    const pageContainer = document.createElement('div');
    pageContainer.className = 'main-layout__page';
    pageContainer.setAttribute('data-testid', 'page-container');
    
    this.contentArea.appendChild(topbarContainer);
    this.contentArea.appendChild(pageContainer);
    
    // Assemble main layout
    this.element.appendChild(this.sidebar.getElement());
    this.element.appendChild(this.contentArea);
  }
  
  initializeComponents() {
    // Components are already initialized in createElement
  }
  
  handleNavigation(navItem) {
    const pageId = navItem.id;
    this.navigateToPage(pageId);
    
    // Trigger external navigation callback
    if (this.config.onNavigate) {
      this.config.onNavigate(navItem);
    }
  }
  
  navigateToPage(pageId) {
    // Destroy current page
    if (this.currentPage) {
      this.currentPage.destroy();
    }
    
    // Create new page
    const pageConfig = PAGE_CONFIGS[pageId] || PAGE_CONFIGS.dashboard;
    this.currentPage = new PagePlaceholder(pageConfig);
    
    // Insert into page container
    const pageContainer = this.element.querySelector('.main-layout__page');
    pageContainer.innerHTML = '';
    pageContainer.appendChild(this.currentPage.getElement());
    
    // Update URL hash
    window.location.hash = pageId;
  }
  
  handleInitialRoute() {
    const hash = window.location.hash.replace('#', '');
    const pageId = hash || 'dashboard';
    this.navigateToPage(pageId);
  }
  
  attachEventListeners() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== this.currentPage?.config.pageId) {
        this.navigateToPage(hash);
      }
    });
    
    // Listen for page title updates
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      const pageTitle = this.getPageTitleFromHash(hash);
      this.topbar.updatePageTitle(pageTitle);
    });
  }
  
  getPageTitleFromHash(hash) {
    const titleMap = {
      'dashboard': 'Dashboard',
      'leads': 'Leads',
      'followups': 'Follow-ups',
      'payments': 'Payments',
      'reports': 'Reports'
    };
    
    return titleMap[hash] || 'Dashboard';
  }
  
  updateUserInfo(userInfo) {
    this.config.user = { ...this.config.user, ...userInfo };
    
    // Update sidebar user info
    const userName = this.sidebar.getElement().querySelector('.sidebar__user-name');
    const userRole = this.sidebar.getElement().querySelector('.sidebar__user-role');
    const userAvatar = this.sidebar.getElement().querySelector('.sidebar__user-avatar');
    
    if (userName) userName.textContent = userInfo.name || this.config.user.name;
    if (userRole) userRole.textContent = userInfo.role || this.config.user.role;
    if (userAvatar) userAvatar.textContent = userInfo.avatar || this.config.user.avatar;
  }
  
  updateSidebarBadge(itemId, badge) {
    this.sidebar.updateBadge(itemId, badge);
  }
  
  getElement() {
    return this.element;
  }
  
  destroy() {
    if (this.currentPage) {
      this.currentPage.destroy();
    }
    
    if (this.sidebar) {
      this.sidebar.destroy();
    }
    
    if (this.topbar) {
      this.topbar.destroy();
    }
    
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MainLayout;
} else {
  window.MainLayout = MainLayout;
}
