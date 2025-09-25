/**
 * Login Modal Component
 * Displays login form in an overlay modal
 */
class LoginModal {
    constructor() {
        this.isVisible = false;
        this.onLoginSuccess = null;
        this.onClose = null;
        this.element = null;
        this.createModal();
    }

    createModal() {
        // Create modal container
        this.element = document.createElement('div');
        this.element.className = 'login-modal';
        this.element.innerHTML = `
            <div class="login-modal__overlay">
                <div class="login-modal__content">
                    <div class="login-modal__header">
                        <h2 class="login-modal__title">Login to Tracklie</h2>
                        <button class="login-modal__close" aria-label="Close login modal">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    
                    <form class="login-modal__form" id="loginForm">
                        <div class="login-modal__field">
                            <label for="email" class="login-modal__label">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                class="login-modal__input" 
                                placeholder="Enter your email"
                                required
                                autocomplete="email"
                            >
                            <div class="login-modal__error" id="emailError"></div>
                        </div>
                        
                        <div class="login-modal__field">
                            <label for="password" class="login-modal__label">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                class="login-modal__input" 
                                placeholder="Enter your password"
                                required
                                autocomplete="current-password"
                            >
                            <div class="login-modal__error" id="passwordError"></div>
                        </div>
                        
                        <div class="login-modal__actions">
                            <button type="submit" class="login-modal__submit" id="loginSubmit">
                                <span class="login-modal__submit-text">Login</span>
                                <div class="login-modal__spinner" style="display: none;">
                                    <div class="spinner"></div>
                                </div>
                            </button>
                        </div>
                        
                        <div class="login-modal__error login-modal__error--general" id="generalError"></div>
                    </form>
                    
                    <div class="login-modal__demo">
                        <h3>Demo Credentials:</h3>
                        <div class="login-modal__demo-credentials">
                            <div><strong>Admin:</strong> admin@tracklie.com / admin123</div>
                            <div><strong>Sales:</strong> sales@tracklie.com / sales123</div>
                            <div><strong>Recovery:</strong> recovery@tracklie.com / recovery123</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add event listeners
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Close button
        const closeBtn = this.element.querySelector('.login-modal__close');
        closeBtn.addEventListener('click', () => this.hide());

        // Overlay click to close
        const overlay = this.element.querySelector('.login-modal__overlay');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.hide();
            }
        });

        // Form submission
        const form = this.element.querySelector('#loginForm');
        form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const emailInput = this.element.querySelector('#email');
        const passwordInput = this.element.querySelector('#password');
        
        emailInput.addEventListener('blur', () => this.validateEmail());
        passwordInput.addEventListener('blur', () => this.validatePassword());

        // Clear errors on input
        emailInput.addEventListener('input', () => this.clearError('emailError'));
        passwordInput.addEventListener('input', () => this.clearError('passwordError'));
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const email = this.element.querySelector('#email').value.trim();
        const password = this.element.querySelector('#password').value;
        
        // Validate inputs
        if (!this.validateEmail() || !this.validatePassword()) {
            return;
        }

        // Show loading state
        this.setLoading(true);
        this.clearError('generalError');

        try {
            // Attempt login
            const result = await window.AuthService.login(email, password);
            
            // Show success message
            this.showSuccess('Login successful!');
            
            // Close modal after short delay
            setTimeout(() => {
                this.hide();
                if (this.onLoginSuccess) {
                    this.onLoginSuccess(result.user);
                }
            }, 1000);

        } catch (error) {
            this.showError('generalError', error.message || 'Login failed. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }

    validateEmail() {
        const email = this.element.querySelector('#email').value.trim();
        const emailError = this.element.querySelector('#emailError');
        
        if (!email) {
            this.showError('emailError', 'Email is required');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showError('emailError', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('emailError');
        return true;
    }

    validatePassword() {
        const password = this.element.querySelector('#password').value;
        const passwordError = this.element.querySelector('#passwordError');
        
        if (!password) {
            this.showError('passwordError', 'Password is required');
            return false;
        }
        
        if (password.length < 6) {
            this.showError('passwordError', 'Password must be at least 6 characters');
            return false;
        }
        
        this.clearError('passwordError');
        return true;
    }

    showError(elementId, message) {
        const errorElement = this.element.querySelector(`#${elementId}`);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    clearError(elementId) {
        const errorElement = this.element.querySelector(`#${elementId}`);
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }

    showSuccess(message) {
        const generalError = this.element.querySelector('#generalError');
        generalError.textContent = message;
        generalError.className = 'login-modal__error login-modal__error--success';
        generalError.style.display = 'block';
    }

    setLoading(loading) {
        const submitBtn = this.element.querySelector('#loginSubmit');
        const submitText = this.element.querySelector('.login-modal__submit-text');
        const spinner = this.element.querySelector('.login-modal__spinner');
        
        if (loading) {
            submitBtn.disabled = true;
            submitText.style.display = 'none';
            spinner.style.display = 'block';
        } else {
            submitBtn.disabled = false;
            submitText.style.display = 'block';
            spinner.style.display = 'none';
        }
    }

    show() {
        if (!this.isVisible) {
            document.body.appendChild(this.element);
            this.isVisible = true;
            
            // Focus on email input
            setTimeout(() => {
                this.element.querySelector('#email').focus();
            }, 100);
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        }
    }

    hide() {
        if (this.isVisible) {
            document.body.removeChild(this.element);
            this.isVisible = false;
            
            // Restore body scroll
            document.body.style.overflow = '';
            
            if (this.onClose) {
                this.onClose();
            }
        }
    }

    destroy() {
        if (this.isVisible) {
            this.hide();
        }
    }
}

// Export for use
window.LoginModal = LoginModal;
