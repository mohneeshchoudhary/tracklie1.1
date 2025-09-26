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
    
    // Create sidebar container
    const sidebarContainer = document.createElement('aside');
    sidebarContainer.className = 'main-layout__sidebar';
    sidebarContainer.appendChild(this.sidebar.getElement());
    
    // Assemble main layout
    this.element.appendChild(sidebarContainer);
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
      // Initialize dashboard with current user info
      this.dashboardPage.updateUserInfo(this.config.user);
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

  getPageInstance(pageId) {
    if (pageId === 'home' || pageId === '') {
      return this.homePage;
    } else if (pageId === 'dashboard') {
      return this.dashboardPage;
    } else {
      // Lazy load page components
      return this.lazyLoadPage(pageId);
    }
  }

  lazyLoadPage(pageId) {
    // Check if page is already cached
    if (this.pageCache && this.pageCache[pageId]) {
      return this.pageCache[pageId];
    }

    const pageConfig = PAGE_CONFIGS[pageId] || PAGE_CONFIGS.dashboard;
    const pageInstance = new PagePlaceholder(pageConfig);
    
    // Cache the page instance
    if (!this.pageCache) {
      this.pageCache = {};
    }
    this.pageCache[pageId] = pageInstance;
    
    return pageInstance;
  }
  
              navigateToPage(pageId) {
                // Check if user is authenticated and trying to access home page
                if (this.config.user.role && (pageId === 'home' || pageId === '')) {
                  // Redirect authenticated users to dashboard
                  pageId = 'dashboard';
                  window.location.hash = pageId;
                }
                
                // Check if unauthenticated user is trying to access dashboard
                if (!this.config.user.role && pageId === 'dashboard') {
                  // Redirect unauthenticated users to home page
                  pageId = 'home';
                  // Use replaceState to avoid adding to browser history
                  window.history.replaceState(null, null, '#home');
                  // Show login modal after redirect
                  setTimeout(() => {
                    if (window.AuthContext) {
                      window.AuthContext.showLoginModal();
                    }
                  }, 100);
                }
                
                // Show/hide sidebar based on page
                this.toggleSidebar(pageId);
                
                // Destroy current page if it's different from the new one
                if (this.currentPage && this.currentPage !== this.getPageInstance(pageId)) {
                  this.currentPage.destroy();
                }
                
                // Create new page based on type
                this.currentPage = this.getPageInstance(pageId);
                
                // Ensure currentPage exists before proceeding
                if (!this.currentPage) {
                  console.error('Failed to create page for:', pageId);
                  return;
                }
                
                // If this is the dashboard page, make sure it has the current user info
                if (pageId === 'dashboard' && this.currentPage.updateUserInfo) {
                  console.log('Updating dashboard with current user info:', this.config.user);
                  this.currentPage.updateUserInfo(this.config.user);
                }
                
                // Insert into page container
                const pageContainer = this.element.querySelector('.main-layout__page');
                pageContainer.innerHTML = '';
                pageContainer.appendChild(this.currentPage.getElement());
                
                // Update URL hash
                window.location.hash = pageId;
              }
  
              toggleSidebar(pageId) {
                if (pageId === 'home' || pageId === '') {
                  // Hide sidebar and topbar for home page (full-screen marketing)
                  this.sidebar.getElement().style.display = 'none';
                  this.contentArea.style.marginLeft = '0';
                  this.contentArea.style.paddingTop = '0';
                  // Hide the topbar container
                  const topbarContainer = this.element.querySelector('.main-layout__topbar');
                  if (topbarContainer) {
                    topbarContainer.style.display = 'none';
                  }
                } else {
                  // Show sidebar and topbar for other pages
                  this.sidebar.getElement().style.display = 'block';
                  this.contentArea.style.marginLeft = '';
                  this.contentArea.style.paddingTop = '';
                  // Show the topbar container
                  const topbarContainer = this.element.querySelector('.main-layout__topbar');
                  if (topbarContainer) {
                    topbarContainer.style.display = 'block';
                  }
                }
              }
              
              handleInitialRoute() {
                const hash = window.location.hash.replace('#', '');
                let pageId = hash || 'home';
                
                // If user is authenticated and no specific page requested, go to dashboard
                if (this.config.user.role && (!hash || hash === 'home')) {
                  pageId = 'dashboard';
                }
                
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
    console.log('MainLayout: updateUserInfo called with:', userInfo);
    this.config.user = { ...this.config.user, ...userInfo };
    console.log('MainLayout: Updated config.user to:', this.config.user);
    
    // Update sidebar user info
    if (this.sidebar) {
      console.log('MainLayout: Updating sidebar with user info:', userInfo);
      this.sidebar.updateUserInfo(userInfo);
    }
    
    // Update home page if it's the current page
    if (this.homePage && this.currentPage === this.homePage) {
      this.homePage.updateUserInfo(userInfo);
    }
    
    // Update dashboard if it's the current page
    if (this.dashboardPage && this.currentPage === this.dashboardPage) {
      console.log('MainLayout: Updating dashboard page with user info');
      this.dashboardPage.updateUserInfo(userInfo);
    }
    
    // Also update the dashboard page instance directly if it exists
    if (this.dashboardPage) {
      console.log('MainLayout: Also updating dashboard page instance directly');
      this.dashboardPage.updateUserInfo(userInfo);
    }
    
    // Force refresh all components to ensure consistency
    setTimeout(() => {
      if (this.sidebar) {
        this.sidebar.forceRefresh();
      }
      if (this.topbar) {
        this.topbar.updateUserInfo(userInfo);
      }
    }, 50);
  }
  
  updateSidebarBadge(itemId, badge) {
    this.sidebar.updateBadge(itemId, badge);
  }

  // Handle sidebar collapsed state
  onSidebarToggle() {
    const isCollapsed = this.sidebar.isCollapsed();
    console.log('MainLayout: Sidebar toggled, isCollapsed:', isCollapsed);
    
    if (isCollapsed) {
      this.element.classList.add('main-layout--sidebar-collapsed');
    } else {
      this.element.classList.remove('main-layout--sidebar-collapsed');
    }
  }
  
  getElement() {
    return this.element;
  }
  
  destroy() {
    // Clean up current page
    if (this.currentPage && this.currentPage.destroy) {
      this.currentPage.destroy();
    }
    
    // Clean up components
    if (this.sidebar && this.sidebar.destroy) {
      this.sidebar.destroy();
    }
    
    if (this.topbar && this.topbar.destroy) {
      this.topbar.destroy();
    }
    
    // Clean up page instances
    if (this.homePage && this.homePage.destroy) {
      this.homePage.destroy();
    }
    
    if (this.dashboardPage && this.dashboardPage.destroy) {
      this.dashboardPage.destroy();
    }
    
    // Remove from DOM
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
