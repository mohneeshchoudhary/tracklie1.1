/**
 * Authentication service for API communication
 */
class AuthService {
    constructor() {
        this.baseURL = 'http://localhost:8000';
        this.token = null;
        this.user = null;
        this.isBackendAvailable = null; // null = unknown, true = available, false = unavailable
    }

    /**
     * Login user with email and password
     */
    async login(email, password) {
        try {
            // Check backend availability first
            if (this.isBackendAvailable === false) {
                throw new Error('Backend server is not available. Please check if the server is running.');
            }
            
            // Validate inputs
            if (!this.isValidEmail(email)) {
                throw new Error('Invalid email format');
            }
            
            if (!this.isValidPassword(password)) {
                throw new Error('Invalid password format');
            }

            const requestBody = { 
                email: this.sanitizeInput(email), 
                password: password // Password will be hashed on server
            };

            console.log('Attempting login to:', `${this.baseURL}/auth/login`);
            console.log('Request body:', { email: requestBody.email, password: '[HIDDEN]' });

            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest', // CSRF protection
                },
                credentials: 'include', // Include cookies for HttpOnly tokens
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();
            this.token = data.access_token;
            this.user = data.user;
            
            // Store user info in localStorage for quick access (sanitized)
            localStorage.setItem('user', JSON.stringify(this.sanitizeUserData(data.user)));
            
            // Mark backend as available on successful login
            this.isBackendAvailable = true;
            return data;
        } catch (error) {
            console.error('Login error:', error);
            
            // Handle different types of errors
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                this.isBackendAvailable = false;
                // For demo purposes, try mock login
                return this.mockLogin(email, password);
            } else if (error.name === 'AbortError') {
                this.isBackendAvailable = false;
                // For demo purposes, try mock login
                return this.mockLogin(email, password);
            } else {
                throw error;
            }
        }
    }

    /**
     * Mock login for demo purposes when backend is not available
     */
    async mockLogin(email, password) {
        console.log('Using mock login for demo purposes');
        
        // Mock user data based on email
        const mockUsers = {
            'admin@tracklie.com': {
                id: 1,
                email: 'admin@tracklie.com',
                name: 'Admin User',
                role: 'admin',
                permissions: ['read', 'write', 'delete', 'manage_users']
            },
            'sales@tracklie.com': {
                id: 2,
                email: 'sales@tracklie.com',
                name: 'Sales Person',
                role: 'salesperson',
                permissions: ['read', 'write']
            },
            'recovery@tracklie.com': {
                id: 3,
                email: 'recovery@tracklie.com',
                name: 'Recovery Agent',
                role: 'recovery_agent',
                permissions: ['read', 'write']
            }
        };
        
        // Check if email exists in mock users
        if (mockUsers[email] && password === 'admin123') {
            const user = mockUsers[email];
            this.user = user;
            
            // Store user info in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            
            console.log('Mock login successful for:', email);
            return {
                access_token: 'mock_token_' + Date.now(),
                user: user
            };
        } else {
            throw new Error('Invalid email or password');
        }
    }

    /**
     * Logout user
     */
    async logout() {
        try {
            await fetch(`${this.baseURL}/auth/logout`, {
                method: 'POST',
                credentials: 'include'
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            this.token = null;
            this.user = null;
            localStorage.removeItem('user');
        }
    }

    /**
     * Get current user info
     */
    async getCurrentUser() {
        try {
            const response = await fetch(`${this.baseURL}/auth/me`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Not authenticated');
            }

            const user = await response.json();
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            console.error('Get current user error:', error);
            this.token = null;
            this.user = null;
            localStorage.removeItem('user');
            throw error;
        }
    }

    /**
     * Verify if user is authenticated
     */
    async verifyAuth() {
        return this.retryRequest(async () => {
            const response = await fetch(`${this.baseURL}/auth/verify`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            if (!response.ok) {
                throw new Error('Token invalid');
            }

            const user = await response.json();
            this.user = user;
            localStorage.setItem('user', JSON.stringify(this.sanitizeUserData(user)));
            return user;
        });
    }

    /**
     * Check if user is logged in (from localStorage)
     */
    isLoggedIn() {
        const user = localStorage.getItem('user');
        return user !== null;
    }

    /**
     * Get stored user info
     */
    getStoredUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    /**
     * Refresh authentication token
     */
    async refreshToken() {
        try {
            const response = await fetch(`${this.baseURL}/auth/refresh`, {
                method: 'POST',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            const data = await response.json();
            this.token = data.access_token;
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
            return data;
        } catch (error) {
            console.error('Token refresh error:', error);
            this.clearAuth();
            throw error;
        }
    }

    /**
     * Clear authentication data
     */
    clearAuth() {
        this.token = null;
        this.user = null;
        localStorage.removeItem('user');
    }

    /**
     * Validate email format
     */
    isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email) && email.length <= 254;
    }

    /**
     * Validate password format
     */
    isValidPassword(password) {
        return password && password.length >= 6 && password.length <= 128;
    }

    /**
     * Sanitize input to prevent XSS
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') return input;
        
        return input
            .replace(/[<>\"'&]/g, '') // Remove HTML/XML characters
            .replace(/javascript:/gi, '') // Remove javascript: protocol
            .replace(/on\w+=/gi, '') // Remove event handlers
            .trim();
    }

    /**
     * Sanitize user data before storing
     */
    sanitizeUserData(user) {
        if (!user || typeof user !== 'object') return user;
        
        const sanitized = {};
        for (const [key, value] of Object.entries(user)) {
            if (typeof value === 'string') {
                sanitized[key] = this.sanitizeInput(value);
            } else {
                sanitized[key] = value;
            }
        }
        return sanitized;
    }

    /**
     * Retry request with exponential backoff
     */
    async retryRequest(requestFn, maxRetries = 3, baseDelay = 1000) {
        let lastError;
        
        for (let attempt = 0; attempt <= maxRetries; attempt++) {
            try {
                return await requestFn();
            } catch (error) {
                lastError = error;
                
                // Don't retry on authentication errors
                if (error.message.includes('Token invalid') || error.message.includes('Unauthorized')) {
                    throw error;
                }
                
                // Don't retry on the last attempt
                if (attempt === maxRetries) {
                    break;
                }
                
                // Calculate delay with exponential backoff
                const delay = baseDelay * Math.pow(2, attempt);
                await new Promise(resolve => setTimeout(resolve, delay));
                
                console.warn(`Request failed, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
            }
        }
        
        throw lastError;
    }

    /**
     * Check if backend is available
     */
    async checkBackendHealth() {
        try {
            const response = await fetch(`${this.baseURL}/health`, {
                method: 'GET',
                timeout: 5000
            });
            return response.ok;
        } catch (error) {
            console.warn('Backend health check failed:', error);
            return false;
        }
    }
}

// Export singleton instance
window.AuthService = new AuthService();
