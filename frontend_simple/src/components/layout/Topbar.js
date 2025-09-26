/**
 * Topbar Component
 * Top header bar with page title, welcome message, and action buttons
 */
class Topbar {
  constructor(config = {}) {
    this.config = {
      user: {
        name: 'Guest',
        role: null
      },
      pageTitle: 'Dashboard',
      welcomeMessage: 'Welcome! Please login to access features.',
      actions: [
        {
          id: 'checkin',
          text: 'Check In',
          icon: 'checkin',
          variant: 'danger',
          onClick: this.handleCheckIn.bind(this),
          requiresAuth: true
        },
        {
          id: 'addlead',
          text: 'Add Lead',
          icon: 'add',
          variant: 'primary',
          onClick: this.handleAddLead.bind(this),
          requiresAuth: true
        },
        {
          id: 'logout',
          text: 'Logout',
          icon: 'logout',
          variant: 'secondary',
          onClick: this.handleLogout.bind(this),
          requiresAuth: true
        },
        {
          id: 'login',
          text: 'Login',
          icon: 'login',
          variant: 'primary',
          onClick: this.handleLogin.bind(this),
          requiresAuth: false
        }
      ],
      ...config
    };
    
    this.element = null;
    this.init();
    this.setupAuthListener();
  }
  
  init() {
    this.createElement();
    this.attachEventListeners();
  }
  
  createElement() {
    this.element = document.createElement('header');
    this.element.className = 'topbar';
    this.element.setAttribute('data-testid', 'topbar');
    
    // Left section - Title and welcome
    const leftSection = this.createLeftSection();
    
    // Right section - Action buttons
    const rightSection = this.createRightSection();
    
    this.element.appendChild(leftSection);
    this.element.appendChild(rightSection);
  }
  
  createLeftSection() {
    const leftSection = document.createElement('div');
    leftSection.className = 'topbar__left';
    
    const title = document.createElement('h1');
    title.className = 'topbar__title';
    title.textContent = this.config.pageTitle;
    title.setAttribute('data-testid', 'page-title');
    
    const welcome = document.createElement('p');
    welcome.className = 'topbar__welcome';
    welcome.textContent = this.config.welcomeMessage;
    
    leftSection.appendChild(title);
    leftSection.appendChild(welcome);
    
    return leftSection;
  }
  
  createRightSection() {
    const rightSection = document.createElement('div');
    rightSection.className = 'topbar__actions';
    
    this.config.actions.forEach(action => {
      const button = this.createActionButton(action);
      rightSection.appendChild(button);
    });
    
    return rightSection;
  }
  
  createActionButton(action) {
    const button = document.createElement('button');
    button.className = `topbar__button topbar__button--${action.variant}`;
    button.setAttribute('data-testid', `action-${action.id}`);
    
    const icon = document.createElement('div');
    icon.className = `topbar__button-icon topbar__button-icon--${action.icon}`;
    
    const text = document.createElement('span');
    text.className = 'topbar__button-text';
    text.textContent = action.text;
    
    button.appendChild(icon);
    button.appendChild(text);
    
    // Add click handler
    button.addEventListener('click', action.onClick);
    
    return button;
  }
  
  handleCheckIn() {
    // Placeholder for check-in functionality
    alert('Check-in functionality coming in Stage 13 (Attendance Module)');
  }
  
  handleAddLead() {
    // Check authentication before allowing add lead
    if (!window.AuthContext.requireAuth()) {
      return;
    }
    window.AuthContext.showToast('Add Lead functionality coming in Stage 3 (Lead Management)', 'info');
  }
  
  handleLogin() {
    // Show login modal
    window.AuthContext.showLoginModal();
  }

  handleLogout() {
    // Logout functionality
    window.AuthContext.logout();
    window.AuthContext.showToast('Logged out successfully', 'success');
  }
  
  updatePageTitle(title) {
    this.config.pageTitle = title;
    const titleElement = this.element.querySelector('.topbar__title');
    if (titleElement) {
      titleElement.textContent = title;
    }
  }
  
  updateWelcomeMessage(message) {
    this.config.welcomeMessage = message;
    const welcomeElement = this.element.querySelector('.topbar__welcome');
    if (welcomeElement) {
      welcomeElement.textContent = message;
    }
  }
  
  setupAuthListener() {
    // Listen for auth state changes
    if (window.AuthContext) {
      // Set initial auth state
      const initialAuthState = window.AuthContext.getState();
      this.updateAuthState(initialAuthState);
      
      // Listen for future changes
      window.AuthContext.addListener((authState) => {
        this.updateAuthState(authState);
      });
    } else {
      // AuthContext not ready yet, wait for it
      setTimeout(() => this.setupAuthListener(), 100);
    }
  }

  updateAuthState(authState) {
    // Update user info
    if (authState.isAuthenticated && authState.user) {
      this.config.user = authState.user;
      this.config.welcomeMessage = `Welcome back, ${authState.user.name}! Here's what's happening today.`;
    } else {
      this.config.user = { name: 'Guest', role: null };
      this.config.welcomeMessage = 'Welcome! Please login to access features.';
    }

    // Update welcome message
    this.updateWelcomeMessage(this.config.welcomeMessage);

    // Update action buttons visibility
    this.updateActionButtons(authState.isAuthenticated);
  }

  updateActionButtons(isAuthenticated) {
    const actionsContainer = this.element.querySelector('.topbar__actions');
    if (!actionsContainer) return;

    // Clear existing buttons
    actionsContainer.innerHTML = '';

    // Add appropriate buttons based on auth state
    this.config.actions.forEach(action => {
      const shouldShow = isAuthenticated ? action.requiresAuth : !action.requiresAuth;
      if (shouldShow) {
        const button = this.createActionButton(action);
        actionsContainer.appendChild(button);
      }
    });
  }

  attachEventListeners() {
    // Listen for page changes to update title
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      const pageTitle = this.getPageTitleFromHash(hash);
      this.updatePageTitle(pageTitle);
    });
  }
  
  getPageTitleFromHash(hash) {
    const titleMap = {
      'home': 'Home',
      'dashboard': 'Dashboard',
      'leads': 'Leads',
      'followups': 'Follow-ups',
      'payments': 'Payments',
      'reports': 'Reports'
    };
    
    return titleMap[hash] || 'Home';
  }
  
  updateUserInfo(userInfo) {
    console.log('Topbar: updateUserInfo called with:', userInfo);
    
    // Update user config
    this.config.user = { ...this.config.user, ...userInfo };
    
    // Update welcome message
    if (userInfo && userInfo.name && userInfo.role) {
      this.config.welcomeMessage = `Welcome back, ${userInfo.name}!`;
    } else {
      this.config.welcomeMessage = 'Welcome! Please login to access features.';
    }
    
    // Update the welcome message in the DOM
    const welcomeElement = this.element.querySelector('.topbar__welcome');
    if (welcomeElement) {
      welcomeElement.textContent = this.config.welcomeMessage;
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
  module.exports = Topbar;
} else {
  window.Topbar = Topbar;
}
