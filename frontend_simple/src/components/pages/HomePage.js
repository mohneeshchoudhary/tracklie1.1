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
            <!-- Hero Section -->
            <div class="home-page__hero">
                <div class="home-page__hero-background">
                    <div class="home-page__hero-gradient"></div>
                    <div class="home-page__hero-particles"></div>
                </div>
                
                <!-- Navigation -->
                <nav class="home-page__nav">
                    <div class="home-page__nav-container">
                        <div class="home-page__logo">
                            <div class="home-page__logo-icon">🎯</div>
                            <span class="home-page__logo-text">Tracklie</span>
                        </div>
                        <div class="home-page__nav-actions">
                            <button class="home-page__nav-btn home-page__nav-btn--login" data-action="login">
                                Sign In
                            </button>
                        </div>
                    </div>
                </nav>

                <!-- Hero Content -->
                <div class="home-page__hero-content">
                    <div class="home-page__hero-badge">
                        <span class="home-page__badge-icon">✨</span>
                        <span class="home-page__badge-text">Next-Gen CRM Platform</span>
                    </div>
                    
                    <h1 class="home-page__hero-title">
                        Transform Your Sales Process with 
                        <span class="home-page__title-gradient">Intelligent CRM</span>
                    </h1>
                    
                    <p class="home-page__hero-subtitle">
                        Tracklie combines AI-powered lead management, automated follow-ups, and real-time analytics to help your sales team close more deals, faster than ever before.
                    </p>
                    
                    <div class="home-page__hero-actions">
                        <button class="home-page__cta-btn home-page__cta-btn--primary" data-action="dashboard">
                            <span>Start Free Trial</span>
                            <div class="home-page__cta-arrow">→</div>
                        </button>
                        <button class="home-page__cta-btn home-page__cta-btn--secondary" data-action="demo">
                            <div class="home-page__play-icon">
                                <div class="home-page__play-triangle"></div>
                            </div>
                            <span>Watch Demo</span>
                        </button>
                    </div>
                    
                    <div class="home-page__hero-stats">
                        <div class="home-page__stat">
                            <div class="home-page__stat-number">50K+</div>
                            <div class="home-page__stat-label">Leads Managed</div>
                        </div>
                        <div class="home-page__stat">
                            <div class="home-page__stat-number">35%</div>
                            <div class="home-page__stat-label">Conversion Boost</div>
                        </div>
                        <div class="home-page__stat">
                            <div class="home-page__stat-number">₹2.5Cr</div>
                            <div class="home-page__stat-label">Revenue Generated</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Features Section -->
            <section class="home-page__features">
                <div class="home-page__features-container">
                    <div class="home-page__features-header">
                        <h2 class="home-page__features-title">Why Choose Tracklie?</h2>
                        <p class="home-page__features-subtitle">Everything you need to supercharge your sales process</p>
                    </div>
                    
                    <div class="home-page__features-grid">
                        <div class="home-page__feature-card">
                            <div class="home-page__feature-icon">
                                <div class="home-page__feature-icon-bg">🤖</div>
                            </div>
                            <h3 class="home-page__feature-title">AI-Powered Insights</h3>
                            <p class="home-page__feature-description">
                                Get intelligent lead scoring, predictive analytics, and automated recommendations to focus on the most promising opportunities.
                            </p>
                        </div>
                        
                        <div class="home-page__feature-card">
                            <div class="home-page__feature-icon">
                                <div class="home-page__feature-icon-bg">⚡</div>
                            </div>
                            <h3 class="home-page__feature-title">Real-Time Automation</h3>
                            <p class="home-page__feature-description">
                                Automate follow-ups, task assignments, and notifications to ensure no opportunity falls through the cracks.
                            </p>
                        </div>
                        
                        <div class="home-page__feature-card">
                            <div class="home-page__feature-icon">
                                <div class="home-page__feature-icon-bg">📊</div>
                            </div>
                            <h3 class="home-page__feature-title">Advanced Analytics</h3>
                            <p class="home-page__feature-description">
                                Track performance with detailed reports, conversion funnels, and ROI analysis to optimize your sales strategy.
                            </p>
                        </div>
                        
                        <div class="home-page__feature-card">
                            <div class="home-page__feature-icon">
                                <div class="home-page__feature-icon-bg">🔒</div>
                            </div>
                            <h3 class="home-page__feature-title">Enterprise Security</h3>
                            <p class="home-page__feature-description">
                                Bank-grade security with role-based access control, data encryption, and compliance with industry standards.
                            </p>
                        </div>
                        
                        <div class="home-page__feature-card">
                            <div class="home-page__feature-icon">
                                <div class="home-page__feature-icon-bg">📱</div>
                            </div>
                            <h3 class="home-page__feature-title">Mobile-First Design</h3>
                            <p class="home-page__feature-description">
                                Access your CRM anywhere with our responsive design and native mobile apps for iOS and Android.
                            </p>
                        </div>
                        
                        <div class="home-page__feature-card">
                            <div class="home-page__feature-icon">
                                <div class="home-page__feature-icon-bg">🔗</div>
                            </div>
                            <h3 class="home-page__feature-title">Seamless Integrations</h3>
                            <p class="home-page__feature-description">
                                Connect with your favorite tools including email, calendar, payment gateways, and marketing platforms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Dashboard Preview Section -->
            <section class="home-page__preview">
                <div class="home-page__preview-container">
                    <div class="home-page__preview-header">
                        <h2 class="home-page__preview-title">See Tracklie in Action</h2>
                        <p class="home-page__preview-subtitle">Experience the power of our intuitive dashboard</p>
                    </div>
                    
                    <div class="home-page__dashboard-showcase">
                        <div class="home-page__dashboard-frame">
                            <div class="home-page__dashboard-header">
                                <div class="home-page__dashboard-title">Tracklie Dashboard</div>
                                <div class="home-page__window-controls">
                                    <div class="home-page__control home-page__control--red"></div>
                                    <div class="home-page__control home-page__control--yellow"></div>
                                    <div class="home-page__control home-page__control--green"></div>
                                </div>
                            </div>
                            
                            <div class="home-page__dashboard-content">
                                <div class="home-page__dashboard-sidebar">
                                    <div class="home-page__nav-item home-page__nav-item--active">
                                        <div class="home-page__nav-icon">📊</div>
                                        <span>Dashboard</span>
                                    </div>
                                    <div class="home-page__nav-item">
                                        <div class="home-page__nav-icon">👥</div>
                                        <span>Leads</span>
                                    </div>
                                    <div class="home-page__nav-item">
                                        <div class="home-page__nav-icon">📞</div>
                                        <span>Follow-ups</span>
                                    </div>
                                    <div class="home-page__nav-item">
                                        <div class="home-page__nav-icon">💰</div>
                                        <span>Payments</span>
                                    </div>
                                    <div class="home-page__nav-item">
                                        <div class="home-page__nav-icon">📈</div>
                                        <span>Analytics</span>
                                    </div>
                                </div>
                                
                                <div class="home-page__dashboard-main">
                                    <div class="home-page__metrics">
                                        <div class="home-page__metric-card">
                                            <div class="home-page__metric-value">1,247</div>
                                            <div class="home-page__metric-label">Total Leads</div>
                                            <div class="home-page__metric-trend">+12%</div>
                                        </div>
                                        <div class="home-page__metric-card">
                                            <div class="home-page__metric-value">23%</div>
                                            <div class="home-page__metric-label">Conversion Rate</div>
                                            <div class="home-page__metric-trend">+2.1%</div>
                                        </div>
                                        <div class="home-page__metric-card">
                                            <div class="home-page__metric-value">₹4.2L</div>
                                            <div class="home-page__metric-label">Revenue</div>
                                            <div class="home-page__metric-trend">+18%</div>
                                        </div>
                                    </div>
                                    
                                    <div class="home-page__chart-area">
                                        <div class="home-page__chart-bars">
                                            <div class="home-page__chart-bar" style="height: 60%"></div>
                                            <div class="home-page__chart-bar" style="height: 80%"></div>
                                            <div class="home-page__chart-bar" style="height: 45%"></div>
                                            <div class="home-page__chart-bar" style="height: 90%"></div>
                                            <div class="home-page__chart-bar" style="height: 70%"></div>
                                            <div class="home-page__chart-bar" style="height: 85%"></div>
                                        </div>
                                    </div>
                                    
                                    <div class="home-page__activity">
                                        <div class="home-page__activity-item">
                                            <div class="home-page__activity-icon">👤</div>
                                            <div class="home-page__activity-text">New lead from John Doe</div>
                                            <div class="home-page__activity-time">2m ago</div>
                                        </div>
                                        <div class="home-page__activity-item">
                                            <div class="home-page__activity-icon">💰</div>
                                            <div class="home-page__activity-text">Payment received ₹25,000</div>
                                            <div class="home-page__activity-time">5m ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- CTA Section -->
            <section class="home-page__cta">
                <div class="home-page__cta-container">
                    <div class="home-page__cta-content">
                        <h2 class="home-page__cta-title">Ready to Transform Your Sales?</h2>
                        <p class="home-page__cta-subtitle">Join thousands of sales teams already using Tracklie to close more deals</p>
                        <div class="home-page__cta-actions">
                            <button class="home-page__cta-btn home-page__cta-btn--primary" data-action="dashboard">
                                <span>Start Your Free Trial</span>
                                <div class="home-page__cta-arrow">→</div>
                            </button>
                            <button class="home-page__cta-btn home-page__cta-btn--secondary" data-action="demo">
                                <div class="home-page__play-icon">
                                    <div class="home-page__play-triangle"></div>
                                </div>
                                <span>Schedule Demo</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Footer -->
            <footer class="home-page__footer">
                <div class="home-page__footer-container">
                    <div class="home-page__footer-content">
                        <div class="home-page__footer-brand">
                            <div class="home-page__footer-logo">
                                <div class="home-page__footer-logo-icon">🎯</div>
                                <span class="home-page__footer-logo-text">Tracklie</span>
                            </div>
                            <p class="home-page__footer-description">
                                The intelligent CRM platform that transforms your sales process with AI-powered insights and automation.
                            </p>
                            <div class="home-page__footer-social">
                                <a href="#" class="home-page__social-link" aria-label="Twitter">
                                    <span class="home-page__social-icon">🐦</span>
                                </a>
                                <a href="#" class="home-page__social-link" aria-label="LinkedIn">
                                    <span class="home-page__social-icon">💼</span>
                                </a>
                                <a href="#" class="home-page__social-link" aria-label="GitHub">
                                    <span class="home-page__social-icon">🐙</span>
                                </a>
                            </div>
                        </div>
                        
                        <div class="home-page__footer-links">
                            <div class="home-page__footer-column">
                                <h4 class="home-page__footer-title">Product</h4>
                                <ul class="home-page__footer-list">
                                    <li><a href="#" class="home-page__footer-link">Features</a></li>
                                    <li><a href="#" class="home-page__footer-link">Pricing</a></li>
                                    <li><a href="#" class="home-page__footer-link">Integrations</a></li>
                                    <li><a href="#" class="home-page__footer-link">API</a></li>
                                </ul>
                            </div>
                            
                            <div class="home-page__footer-column">
                                <h4 class="home-page__footer-title">Company</h4>
                                <ul class="home-page__footer-list">
                                    <li><a href="#" class="home-page__footer-link">About</a></li>
                                    <li><a href="#" class="home-page__footer-link">Blog</a></li>
                                    <li><a href="#" class="home-page__footer-link">Careers</a></li>
                                    <li><a href="#" class="home-page__footer-link">Contact</a></li>
                                </ul>
                            </div>
                            
                            <div class="home-page__footer-column">
                                <h4 class="home-page__footer-title">Support</h4>
                                <ul class="home-page__footer-list">
                                    <li><a href="#" class="home-page__footer-link">Help Center</a></li>
                                    <li><a href="#" class="home-page__footer-link">Documentation</a></li>
                                    <li><a href="#" class="home-page__footer-link">Community</a></li>
                                    <li><a href="#" class="home-page__footer-link">Status</a></li>
                                </ul>
                            </div>
                            
                            <div class="home-page__footer-column">
                                <h4 class="home-page__footer-title">Legal</h4>
                                <ul class="home-page__footer-list">
                                    <li><a href="#" class="home-page__footer-link">Privacy Policy</a></li>
                                    <li><a href="#" class="home-page__footer-link">Terms of Service</a></li>
                                    <li><a href="#" class="home-page__footer-link">Cookie Policy</a></li>
                                    <li><a href="#" class="home-page__footer-link">GDPR</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div class="home-page__footer-bottom">
                        <div class="home-page__footer-copyright">
                            <p>&copy; 2024 Tracklie. All rights reserved.</p>
                        </div>
                        <div class="home-page__footer-badges">
                            <span class="home-page__footer-badge">🔒 SOC 2 Compliant</span>
                            <span class="home-page__footer-badge">🛡️ GDPR Ready</span>
                            <span class="home-page__footer-badge">⚡ 99.9% Uptime</span>
                        </div>
                    </div>
                </div>
            </footer>
        `;

        this.setupEventListeners();
    }

    setupEventListeners() {
        // CTA button clicks
        this.element.querySelectorAll('.home-page__cta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = btn.getAttribute('data-action');
                this.handleAction(action);
            });
        });
        
        // Navigation button clicks
        this.element.querySelectorAll('.home-page__nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.getAttribute('data-action');
                this.handleAction(action);
            });
        });

        // Setup lazy loading for images
        this.setupLazyLoading();
    }

    setupLazyLoading() {
        // Use Intersection Observer for lazy loading
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    }
                });
            });

            // Observe all images with data-src attribute
            this.element.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    handleAction(action) {
        switch (action) {
            case 'dashboard':
                window.location.hash = 'dashboard';
                break;
            case 'demo':
                if (window.AuthContext) {
                    window.AuthContext.showToast('Demo functionality coming soon!', 'info');
                }
                break;
            case 'login':
                if (window.AuthContext) {
                    window.AuthContext.showLoginModal();
                } else {
                    // Fallback: redirect to dashboard which will show login modal
                    window.location.hash = 'dashboard';
                }
                break;
            default:
                console.log('Unknown action:', action);
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
        // Remove all event listeners to prevent memory leaks
        if (this.element) {
            // Remove CTA button listeners
            this.element.querySelectorAll('.home-page__cta-btn').forEach(btn => {
                btn.replaceWith(btn.cloneNode(true));
            });
            
            // Remove navigation button listeners
            this.element.querySelectorAll('.home-page__nav-btn').forEach(btn => {
                btn.replaceWith(btn.cloneNode(true));
            });
            
            // Remove from DOM
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
    }
}

// Export for use
window.HomePage = HomePage;
