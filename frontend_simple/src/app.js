/**
 * Tracklie CRM - Main Application
 * Stage 1: Project Layout + Navigation Shell
 */

// Application state
const AppState = {
  user: {
    name: 'Guest',
    role: null,
    avatar: 'G'
  },
  currentPage: 'dashboard',
  isInitialized: false,
  isAuthenticated: false
};

// Main application class
class TracklieApp {
  constructor() {
    this.mainLayout = null;
    this.init();
  }
  
  async init() {
    await this.initializeAuth();
    this.initializeApp();
    this.setupGlobalEventListeners();
    AppState.isInitialized = true;
  }

  async initializeAuth() {
    // Wait for auth context to be available
    while (!window.AuthContext) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Wait for auth initialization to complete
    while (window.AuthContext.isLoading) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Update app state with auth state
    const authState = window.AuthContext.getState();
    AppState.isAuthenticated = authState.isAuthenticated;
    AppState.user = authState.user || { name: 'Guest', role: null, avatar: 'G' };
    
    // Listen for auth state changes
    window.AuthContext.addListener((authState) => {
      AppState.isAuthenticated = authState.isAuthenticated;
      AppState.user = authState.user || { name: 'Guest', role: null, avatar: 'G' };
      
      // Update main layout if it exists
      if (this.mainLayout) {
        this.mainLayout.updateUserInfo(AppState.user);
      }
    });
  }
  
  initializeApp() {
    // Create main layout
    this.mainLayout = new MainLayout({
      user: AppState.user,
      onNavigate: this.handleNavigation.bind(this)
    });
    
    // Make mainLayout globally accessible for debugging and testing
    window.mainLayout = this.mainLayout;
    
    // Insert into DOM
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = '';
      appContainer.appendChild(this.mainLayout.getElement());
    }
    
    // Handle initial route
    this.handleInitialRoute();
  }
  
  handleInitialRoute() {
    const hash = window.location.hash.replace('#', '');
    const pageId = hash || 'dashboard';
    
    // Update app state
    AppState.currentPage = pageId;
    
    // Navigate to page
    this.mainLayout.navigateToPage(pageId);
  }
  
  handleNavigation(navItem) {
    console.log('Navigation:', navItem);
    
    // Update app state
    AppState.currentPage = navItem.id;
    
    // Add any global navigation logic here
    this.updatePageTitle(navItem.text);
  }
  
  updatePageTitle(title) {
    // Update document title
    document.title = `${title} - Tracklie CRM`;
  }
  
  setupGlobalEventListeners() {
    // Handle hash changes
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== AppState.currentPage) {
        AppState.currentPage = hash;
        this.mainLayout.navigateToPage(hash);
      }
    });
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
  }
  
  handleResize() {
    // Handle responsive adjustments if needed
    console.log('Window resized:', window.innerWidth, window.innerHeight);
  }
  
  handleKeyboardShortcuts(event) {
    // Global keyboard shortcuts
    if (event.ctrlKey || event.metaKey) {
      switch (event.key) {
        case '1':
          event.preventDefault();
          this.navigateToPage('dashboard');
          break;
        case '2':
          event.preventDefault();
          this.navigateToPage('leads');
          break;
        case '3':
          event.preventDefault();
          this.navigateToPage('followups');
          break;
        case '4':
          event.preventDefault();
          this.navigateToPage('payments');
          break;
        case '5':
          event.preventDefault();
          this.navigateToPage('reports');
          break;
      }
    }
  }
  
  navigateToPage(pageId) {
    if (this.mainLayout) {
      this.mainLayout.navigateToPage(pageId);
      AppState.currentPage = pageId;
    }
  }
  
  updateUserInfo(userInfo) {
    AppState.user = { ...AppState.user, ...userInfo };
    
    if (this.mainLayout) {
      this.mainLayout.updateUserInfo(userInfo);
    }
  }
  
  updateSidebarBadge(itemId, badge) {
    if (this.mainLayout) {
      this.mainLayout.updateSidebarBadge(itemId, badge);
    }
  }
  
  getState() {
    return { ...AppState };
  }
  
  destroy() {
    if (this.mainLayout) {
      this.mainLayout.destroy();
    }
    
    AppState.isInitialized = false;
  }
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Create global app instance
  window.tracklieApp = new TracklieApp();
  
  // Make app globally accessible for debugging
  console.log('Tracklie CRM initialized:', window.tracklieApp.getState());
});

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TracklieApp, AppState };
}
