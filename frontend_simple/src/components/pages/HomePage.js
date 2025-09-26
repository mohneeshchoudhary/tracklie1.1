/**
 * HomePage Component
 * Main landing page for the Tracklie CRM application
 */
class HomePage {
    constructor(config = {}) {
        this.config = {
            user: {
                name: 'Guest',
                role: null,
                avatar: 'G'
            },
            ...config
        };
        this.element = null;
        this.init();
    }

    init() {
        this.createElement();
        this.render();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'home-page';
        this.element.setAttribute('data-testid', 'home-page');
    }

    render() {
        const userRole = this.config.user.role;
        const roleDisplayName = window.RoleUtils ? window.RoleUtils.getRoleDisplayName(userRole) : (userRole || 'Guest');
        
        this.element.innerHTML = `
            <div class="home-page__hero">
                <div class="home-page__hero-content">
                    <h1 class="home-page__title">
                        Welcome to <span class="home-page__title-brand">Tracklie CRM</span>
                    </h1>
                    <p class="home-page__subtitle">
                        Advanced Customer Relationship Management System
                    </p>
                    <div class="home-page__user-info">
                        <div class="home-page__user-avatar">${this.config.user.avatar}</div>
                        <div class="home-page__user-details">
                            <div class="home-page__user-name">${this.config.user.name}</div>
                            <div class="home-page__user-role">${roleDisplayName}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="home-page__features">
                <div class="home-page__features-grid">
                    <div class="home-page__feature-card">
                        <div class="home-page__feature-icon">📊</div>
                        <h3 class="home-page__feature-title">Dashboard</h3>
                        <p class="home-page__feature-description">
                            Get insights into your business performance with role-based analytics
                        </p>
                    </div>
                    
                    <div class="home-page__feature-card">
                        <div class="home-page__feature-icon">👥</div>
                        <h3 class="home-page__feature-title">Lead Management</h3>
                        <p class="home-page__feature-description">
                            Track and manage your leads with smart distribution and follow-up systems
                        </p>
                    </div>
                    
                    <div class="home-page__feature-card">
                        <div class="home-page__feature-icon">💰</div>
                        <h3 class="home-page__feature-title">Payment Tracking</h3>
                        <p class="home-page__feature-description">
                            Monitor payments, recoveries, and financial performance
                        </p>
                    </div>
                    
                    <div class="home-page__feature-card">
                        <div class="home-page__feature-icon">📈</div>
                        <h3 class="home-page__feature-title">Reports & Analytics</h3>
                        <p class="home-page__feature-description">
                            Generate comprehensive reports and analyze business trends
                        </p>
                    </div>
                </div>
            </div>

            <div class="home-page__actions">
                <button class="home-page__action-btn home-page__action-btn--primary" data-action="dashboard">
                    Go to Dashboard
                </button>
                <button class="home-page__action-btn home-page__action-btn--secondary" data-action="leads">
                    Manage Leads
                </button>
            </div>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // Action button clicks
        this.element.querySelectorAll('.home-page__action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleAction(action);
            });
        });
    }

    handleAction(action) {
        // Navigate to the appropriate page
        window.location.hash = action;
        
        // Trigger navigation event
        if (window.mainLayout && window.mainLayout.navigateToPage) {
            window.mainLayout.navigateToPage(action);
        }
    }

    updateUserInfo(userInfo) {
        this.config.user = { ...this.config.user, ...userInfo };
        this.render(); // Re-render with new user info
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

// Export for use
window.HomePage = HomePage;
