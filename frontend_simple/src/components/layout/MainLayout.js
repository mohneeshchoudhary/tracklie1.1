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
    this.dashboardPage = null;
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
    // Create home page
    if (window.HomePage) {
      this.homePage = new window.HomePage();
    } else {
      console.error('HomePage not available');
      this.homePage = null;
    }
    
    // Create dashboard page
    if (window.DashboardPage) {
      this.dashboardPage = new window.DashboardPage();
    } else {
      console.error('DashboardPage not available');
      this.dashboardPage = null;
    }
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
    
    // Create new page based on type
    if (pageId === 'home' || pageId === '') {
      // Use home page
      this.currentPage = this.homePage;
    } else if (pageId === 'dashboard') {
      // Use role-aware dashboard
      this.currentPage = this.dashboardPage;
    } else {
      // Use placeholder for other pages
      const pageConfig = PAGE_CONFIGS[pageId] || PAGE_CONFIGS.dashboard;
      this.currentPage = new PagePlaceholder(pageConfig);
    }
    
    // Ensure currentPage exists before proceeding
    if (!this.currentPage) {
      console.error('Failed to create page for:', pageId);
      return;
    }
    
    // Insert into page container
    const pageContainer = this.element.querySelector('.main-layout__page');
    pageContainer.innerHTML = '';
    pageContainer.appendChild(this.currentPage.getElement());
    
    // Update URL hash
    window.location.hash = pageId;
  }
  
  handleInitialRoute() {
    const hash = window.location.hash.replace('#', '');
    const pageId = hash || 'home';
    this.navigateToPage(pageId);
    this.sidebar.setActiveItem(pageId);
    this.topbar.updatePageTitle(this.getPageTitle(pageId));
  }
  
  attachEventListeners() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== this.currentPage?.config?.pageId) {
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
  
  getPageTitle(pageId) {
    const titleMap = {
      'home': 'Home',
      'dashboard': 'Dashboard',
      'leads': 'Leads',
      'followups': 'Follow-ups',
      'payments': 'Payments',
      'reports': 'Reports'
    };
    
    return titleMap[pageId] || 'Home';
  }

  getPageTitleFromHash(hash) {
    return this.getPageTitle(hash);
  }
  
  updateUserInfo(userInfo) {
    this.config.user = { ...this.config.user, ...userInfo };
    
    // Update sidebar user info
    if (this.sidebar) {
      this.sidebar.updateUserInfo(userInfo);
    }
    
    // Update home page if it's the current page
    if (this.homePage && this.currentPage === this.homePage) {
      this.homePage.updateUserInfo(userInfo);
    }
    
    // Update dashboard if it's the current page
    if (this.dashboardPage && this.currentPage === this.dashboardPage) {
      this.dashboardPage.updateUserInfo(userInfo);
    }
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
