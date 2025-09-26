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
    this.isRedirecting = false;
    this.init();
  }
  
  async init() {
    try {
      window.Logger?.info('Initializing Tracklie application');
      
      // Test backend connectivity
      await this.testBackendConnectivity();
      
      await this.initializeAuth();
      this.initializeApp();
      this.setupGlobalEventListeners();
      AppState.isInitialized = true;
      window.Logger?.info('Tracklie application initialized successfully');
    } catch (error) {
      window.Logger?.error('Failed to initialize application', { error: error.message });
      this.showErrorPage(error);
    }
  }

  async testBackendConnectivity() {
    try {
      window.Logger?.debug('Testing backend connectivity');
      const response = await fetch('http://localhost:8000/health', {
        method: 'GET',
        timeout: 5000
      });
      
      if (response.ok) {
        const data = await response.json();
        window.Logger?.info('Backend connectivity test successful', { status: data.status });
      } else {
        window.Logger?.warn('Backend responded with non-OK status', { status: response.status });
      }
    } catch (error) {
      window.Logger?.error('Backend connectivity test failed', { error: error.message });
      // Don't throw here, just log the error and continue
    }
  }

  async initializeAuth() {
    // Wait for auth context to be available
    while (!window.AuthContext) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Wait for auth initialization to complete
    try {
      await window.AuthContext.waitForInitialization();
    } catch (error) {
      console.warn('Auth initialization failed:', error);
      // Continue with unauthenticated state
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
                let pageId = hash || 'home';
                
                // If user is authenticated and no specific page requested, go to dashboard
                if (AppState.isAuthenticated && (!hash || hash === 'home')) {
                  pageId = 'dashboard';
                }
                
                // If user is not authenticated and trying to access dashboard, redirect to home
                if (!AppState.isAuthenticated && pageId === 'dashboard') {
                  pageId = 'home';
                  this.isRedirecting = true;
                  window.location.hash = pageId;
                  // Show login modal after redirect
                  setTimeout(() => {
                    if (window.AuthContext) {
                      window.AuthContext.showLoginModal();
                    }
                    this.isRedirecting = false;
                  }, 200);
                }
                
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
    
    // Track page view for analytics
    this.trackPageView(title);
  }

  trackPageView(pageName) {
    // Google Analytics 4 tracking
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
    
    // Custom analytics tracking
    if (window.analytics && window.analytics.track) {
      window.analytics.track('Page Viewed', {
        page: pageName,
        url: window.location.href,
        timestamp: new Date().toISOString()
      });
    }
    
    // Performance tracking
    this.trackPerformance(pageName);
    
    // Console log for debugging
    console.log(`Analytics: Page viewed - ${pageName}`);
  }

  trackPerformance(pageName) {
    // Track page load performance
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      // Track performance metrics
      if (window.analytics && window.analytics.track) {
        window.analytics.track('Page Performance', {
          page: pageName,
          loadTime: loadTime,
          domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
          firstPaint: this.getFirstPaint(),
          timestamp: new Date().toISOString()
        });
      }
    }
  }

  getFirstPaint() {
    // Get First Paint timing if available
    if (window.performance && window.performance.getEntriesByType) {
      const paintEntries = window.performance.getEntriesByType('paint');
      const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');
      return firstPaint ? firstPaint.startTime : null;
    }
    return null;
  }
  
  setupGlobalEventListeners() {
    // Handle hash changes with redirect protection and debouncing
    let hashChangeTimeout;
    window.addEventListener('hashchange', (event) => {
      // Debounce hash changes to prevent rapid navigation
      clearTimeout(hashChangeTimeout);
      hashChangeTimeout = setTimeout(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && hash !== AppState.currentPage) {
          // Prevent infinite redirect loops
          if (this.isRedirecting) {
            return;
          }
          
          AppState.currentPage = hash;
          this.mainLayout.navigateToPage(hash);
        }
      }, 100);
    });
    
    // Handle window resize
    window.addEventListener('resize', this.handleResize.bind(this));
    
    // Handle keyboard shortcuts
    document.addEventListener('keydown', this.handleKeyboardShortcuts.bind(this));
    
    // Handle online/offline status
    window.addEventListener('online', this.handleOnlineStatus.bind(this));
    window.addEventListener('offline', this.handleOfflineStatus.bind(this));
  }
  
  handleResize() {
    // Handle responsive adjustments if needed
    console.log('Window resized:', window.innerWidth, window.innerHeight);
  }

  handleOnlineStatus() {
    console.log('Application is online');
    // Show online notification
    if (window.AuthContext) {
      window.AuthContext.showToast('Connection restored', 'success');
    }
    
    // Retry any failed requests
    this.retryFailedRequests();
  }

  handleOfflineStatus() {
    console.log('Application is offline');
    // Show offline notification
    if (window.AuthContext) {
      window.AuthContext.showToast('You are offline. Some features may not work.', 'warning');
    }
  }

  retryFailedRequests() {
    // Retry any queued requests when back online
    if (window.AuthService && window.AuthService.retryQueue) {
      window.AuthService.retryQueue.forEach(request => {
        request.retry();
      });
      window.AuthService.retryQueue = [];
    }
  }

  showErrorPage(error) {
    const appContainer = document.getElementById('app');
    if (appContainer) {
      appContainer.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 20px;
          text-align: center;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          <h1 style="color: #e74c3c; margin-bottom: 20px;">Application Error</h1>
          <p style="color: #666; margin-bottom: 30px; max-width: 600px;">
            Something went wrong while loading the application. Please try refreshing the page.
          </p>
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; max-width: 600px;">
            <h3 style="color: #333; margin-bottom: 10px;">Error Details:</h3>
            <code style="color: #e74c3c; word-break: break-all;">${error.message}</code>
          </div>
          <button onclick="location.reload()" style="
            background: #007bff;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 6px;
            cursor: pointer;
            font-size: 16px;
          ">Refresh Page</button>
        </div>
      `;
    }
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
