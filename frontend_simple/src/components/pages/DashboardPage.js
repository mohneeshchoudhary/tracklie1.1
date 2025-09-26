/**
 * Role-aware Dashboard Page Component
 * Displays different content based on user role
 */
class DashboardPage {
    constructor() {
        this.element = null;
        this.userRole = null;
        this.userName = null;
        this.createDashboard();
    }

    createDashboard() {
        this.element = document.createElement('div');
        this.element.className = 'dashboard-page';
        this.element.setAttribute('data-testid', 'dashboard-page');
        
        // Initialize with loading state
        this.element.innerHTML = `
            <div class="dashboard-loading">
                <div class="loading-spinner"></div>
                <p>Loading dashboard...</p>
            </div>
        `;
    }

    updateUserInfo(user) {
        this.userRole = user ? user.role : null;
        this.userName = user ? user.name : 'Guest';
        this.renderDashboard();
    }

    renderDashboard() {
        if (!this.userRole) {
            this.element.innerHTML = `
                <div class="dashboard-error">
                    <h2>Access Denied</h2>
                    <p>Please login to access the dashboard.</p>
                </div>
            `;
            return;
        }

        const roleDisplayName = window.RoleUtils ? window.RoleUtils.getRoleDisplayName(this.userRole) : this.userRole;
        const roleDescription = window.RoleUtils ? window.RoleUtils.getRoleDescription(this.userRole) : 'User';
        const widgets = window.RoleUtils ? window.RoleUtils.getDashboardWidgets(this.userRole) : [];

        this.element.innerHTML = `
            <div class="dashboard-header">
                <div class="dashboard-title">
                    <h1 data-testid="dashboard-role-title">${roleDisplayName} Dashboard</h1>
                    <p class="dashboard-subtitle">${roleDescription}</p>
                </div>
                <div class="dashboard-welcome">
                    <p>Welcome back, <strong>${this.userName}</strong>!</p>
                    <span class="dashboard-role-badge">${roleDisplayName}</span>
                </div>
            </div>

            <div class="dashboard-content">
                <div class="dashboard-widgets" data-testid="dashboard-widgets">
                    ${this.renderWidgets(widgets)}
                </div>
                
                <div class="dashboard-actions">
                    ${this.renderQuickActions()}
                </div>
            </div>
        `;
    }

    renderWidgets(widgets) {
        if (!widgets || widgets.length === 0) {
            return `
                <div class="dashboard-empty">
                    <h3>No widgets available</h3>
                    <p>Contact your administrator to configure dashboard widgets.</p>
                </div>
            `;
        }

        return widgets.map(widget => `
            <div class="dashboard-widget dashboard-widget--${widget.color}" data-testid="widget-${widget.id}">
                <div class="widget-header">
                    <h3 class="widget-title">${widget.title}</h3>
                    <div class="widget-trend widget-trend--${this.getTrendType(widget.trend)}">
                        ${this.getTrendIcon(widget.trend)} ${widget.trend}
                    </div>
                </div>
                <div class="widget-content">
                    <div class="widget-value">${widget.value}</div>
                </div>
            </div>
        `).join('');
    }

    renderQuickActions() {
        const allowedPages = window.RoleUtils ? window.RoleUtils.getAllowedPages(this.userRole) : [];
        
        const quickActions = {
            [window.PAGES?.LEADS]: { label: 'View Leads', icon: '👥', path: '#leads' },
            [window.PAGES?.FOLLOWUPS]: { label: 'Follow-ups', icon: '📞', path: '#followups' },
            [window.PAGES?.PAYMENTS]: { label: 'Payments', icon: '💰', path: '#payments' },
            [window.PAGES?.REPORTS]: { label: 'Reports', icon: '📊', path: '#reports' }
        };

        const availableActions = Object.entries(quickActions)
            .filter(([page]) => allowedPages.includes(page))
            .slice(0, 4); // Limit to 4 quick actions

        if (availableActions.length === 0) {
            return '';
        }

        return `
            <div class="quick-actions">
                <h3>Quick Actions</h3>
                <div class="quick-actions-grid">
                    ${availableActions.map(([page, action]) => `
                        <button class="quick-action-btn" data-page="${page}" data-testid="quick-action-${page}">
                            <span class="quick-action-icon">${action.icon}</span>
                            <span class="quick-action-label">${action.label}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    getTrendType(trend) {
        if (trend.includes('+') || trend === 'Positive' || trend === 'stable') {
            return 'positive';
        } else if (trend.includes('-')) {
            return 'negative';
        }
        return 'neutral';
    }

    getTrendIcon(trend) {
        if (trend.includes('+') || trend === 'Positive') {
            return '📈';
        } else if (trend.includes('-')) {
            return '📉';
        } else if (trend === 'stable') {
            return '➡️';
        }
        return '📊';
    }

    setupEventListeners() {
        // Quick action buttons
        const quickActionBtns = this.element.querySelectorAll('.quick-action-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const page = e.currentTarget.getAttribute('data-page');
                if (page) {
                    window.location.hash = page;
                }
            });
        });
    }

    render() {
        // Setup event listeners after rendering
        setTimeout(() => {
            this.setupEventListeners();
        }, 100);
        
        return this.element;
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
window.DashboardPage = DashboardPage;
