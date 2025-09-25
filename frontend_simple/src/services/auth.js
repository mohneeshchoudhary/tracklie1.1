/**
 * Authentication service for API communication
 */
class AuthService {
    constructor() {
        this.baseURL = 'http://localhost:8000';
        this.token = null;
        this.user = null;
    }

    /**
     * Login user with email and password
     */
    async login(email, password) {
        try {
            const response = await fetch(`${this.baseURL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Include cookies for HttpOnly tokens
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Login failed');
            }

            const data = await response.json();
            this.token = data.access_token;
            this.user = data.user;
            
            // Store user info in localStorage for quick access
            localStorage.setItem('user', JSON.stringify(data.user));
            
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
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
        try {
            const response = await fetch(`${this.baseURL}/auth/verify`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Token invalid');
            }

            const user = await response.json();
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        } catch (error) {
            console.error('Auth verification error:', error);
            this.token = null;
            this.user = null;
            localStorage.removeItem('user');
            throw error;
        }
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
}

// Export singleton instance
window.AuthService = new AuthService();
