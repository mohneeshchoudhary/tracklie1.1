/**
 * Authentication Context
 * Manages global authentication state and provides auth methods
 */
class AuthContext {
    constructor() {
        this.user = null;
        this.isAuthenticated = false;
        this.isLoading = true;
        this.listeners = [];
        this.loginModal = null;
        this.initializationPromise = null;
        this.isInitialized = false;
        
        // Initialize auth state
        this.initializationPromise = this.initializeAuth();
    }

    /**
     * Initialize authentication state
     */
    async initializeAuth() {
        try {
            window.Logger?.debug('Initializing authentication');
            
            // Check if user is stored in localStorage
            const storedUser = window.AuthService.getStoredUser();
            
            if (storedUser) {
                window.Logger?.debug('Found stored user, verifying token');
                
                // Verify token is still valid with timeout
                try {
                    const user = await Promise.race([
                        window.AuthService.verifyAuth(),
                        new Promise((_, reject) => 
                            setTimeout(() => reject(new Error('Auth verification timeout')), 5000)
                        )
                    ]);
                    this.setUser(user);
                    window.Logger?.info('User authentication verified successfully');
                } catch (error) {
                    window.Logger?.warn('Auth verification failed', { error: error.message });
                    // Token is invalid, clear stored data
                    this.clearAuth();
                }
            } else {
                window.Logger?.debug('No stored user found');
                this.clearAuth();
            }
        } catch (error) {
            window.Logger?.error('Auth initialization error', { error: error.message });
            this.clearAuth();
        } finally {
            this.setLoading(false);
            this.isInitialized = true;
            window.Logger?.debug('Auth initialization completed');
        }
    }

    /**
     * Set user and update auth state
     */
    setUser(user) {
        this.user = user;
        this.isAuthenticated = true;
        this.notifyListeners();
    }

    /**
     * Clear authentication state
     */
    clearAuth() {
        this.user = null;
        this.isAuthenticated = false;
        this.notifyListeners();
    }

    /**
     * Set loading state
     */
    setLoading(loading) {
        this.isLoading = loading;
        this.notifyListeners();
    }

    /**
     * Wait for initialization to complete
     */
    async waitForInitialization() {
        if (this.initializationPromise) {
            await this.initializationPromise;
        }
        return this.isInitialized;
    }

    /**
     * Show login modal
     */
    showLoginModal() {
        if (!this.loginModal) {
            this.loginModal = new window.LoginModal();
            this.loginModal.onLoginSuccess = (user) => {
                this.setUser(user);
                this.hideLoginModal();
                
                // Update the main layout with new user info
                if (window.mainLayout) {
                    window.mainLayout.updateUserInfo(user);
                }
                
                // Force dashboard to update with new user info
                setTimeout(() => {
                    if (window.mainLayout && window.mainLayout.dashboardPage) {
                        console.log('Force updating dashboard with user:', user);
                        window.mainLayout.dashboardPage.updateUserInfo(user);
                    }
                    
                    // Force sidebar to update with new user info
                    if (window.mainLayout && window.mainLayout.sidebar) {
                        console.log('Force updating sidebar with user:', user);
                        window.mainLayout.sidebar.updateUserInfo(user);
                        // Also force refresh the sidebar
                        window.mainLayout.sidebar.forceRefresh();
                    }
                }, 100);
                
                // Redirect to dashboard after successful login
                window.location.hash = 'dashboard';
            };
            this.loginModal.onClose = () => {
                this.hideLoginModal();
            };
        }
        
        this.loginModal.show();
    }

    /**
     * Hide login modal
     */
    hideLoginModal() {
        if (this.loginModal) {
            this.loginModal.hide();
        }
    }

    /**
     * Login user
     */
    async login(email, password) {
        try {
            const result = await window.AuthService.login(email, password);
            this.setUser(result.user);
            return result;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            await window.AuthService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.clearAuth();
        }
    }

    /**
     * Check if user has specific role
     */
    hasRole(role) {
        return this.isAuthenticated && this.user && this.user.role === role;
    }

    /**
     * Check if user has any of the specified roles
     */
    hasAnyRole(roles) {
        return this.isAuthenticated && this.user && roles.includes(this.user.role);
    }

    /**
     * Check if user has permission (role-based)
     */
    hasPermission(permission) {
        if (!this.isAuthenticated || !this.user) {
            return false;
        }

        const rolePermissions = {
            'SUPER_ADMIN': ['*'], // All permissions
            'ADMIN': ['*'], // All permissions
            'MANAGER': ['view_leads', 'edit_leads', 'view_payments', 'view_reports'],
            'TEAM_LEAD': ['view_leads', 'edit_leads', 'view_payments'],
            'SALESPERSON': ['view_leads', 'edit_leads'],
            'RECOVERY_AGENT': ['view_payments', 'edit_payments'],
            'FINANCE_MANAGER': ['view_payments', 'edit_payments', 'view_reports'],
            'ANALYST': ['view_reports']
        };

        const userPermissions = rolePermissions[this.user.role] || [];
        return userPermissions.includes('*') || userPermissions.includes(permission);
    }

    /**
     * Require authentication - show login modal if not authenticated
     */
    requireAuth() {
        if (!this.isAuthenticated) {
            this.showLoginModal();
            return false;
        }
        return true;
    }

    /**
     * Require specific role - show access denied if not authorized
     */
    requireRole(role) {
        if (!this.requireAuth()) {
            return false;
        }
        
        if (!this.hasRole(role)) {
            this.showAccessDenied();
            return false;
        }
        
        return true;
    }

    /**
     * Require permission - show access denied if not authorized
     */
    requirePermission(permission) {
        if (!this.requireAuth()) {
            return false;
        }
        
        if (!this.hasPermission(permission)) {
            this.showAccessDenied();
            return false;
        }
        
        return true;
    }

    /**
     * Show access denied message
     */
    showAccessDenied() {
        // Create and show access denied toast
        this.showToast('Access denied. You do not have permission to access this feature.', 'error');
    }

    /**
     * Show toast notification
     */
    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.innerHTML = `
            <div class="toast__content">
                <div class="toast__message">${message}</div>
                <button class="toast__close" aria-label="Close notification">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;

        // Add to page
        document.body.appendChild(toast);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);

        // Close button functionality
        const closeBtn = toast.querySelector('.toast__close');
        closeBtn.addEventListener('click', () => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        });
    }

    /**
     * Add listener for auth state changes
     */
    addListener(callback) {
        this.listeners.push(callback);
        
        // Return unsubscribe function
        return () => {
            const index = this.listeners.indexOf(callback);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }

    /**
     * Notify all listeners of auth state changes
     */
    notifyListeners() {
        this.listeners.forEach(callback => {
            try {
                callback({
                    user: this.user,
                    isAuthenticated: this.isAuthenticated,
                    isLoading: this.isLoading
                });
            } catch (error) {
                console.error('Auth listener error:', error);
            }
        });
    }

    /**
     * Get current auth state
     */
    getState() {
        return {
            user: this.user,
            isAuthenticated: this.isAuthenticated,
            isLoading: this.isLoading
        };
    }
}

// Create global auth context instance
window.AuthContext = new AuthContext();
