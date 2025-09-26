/**
 * Debug Panel for Development
 * Provides debugging tools and information in development mode
 */

class DebugPanel {
    constructor() {
        this.isVisible = false;
        this.panel = null;
        this.init();
    }

    init() {
        // Only show in debug mode
        if (!this.isDebugMode()) {
            return;
        }

        this.createPanel();
        this.setupKeyboardShortcuts();
        this.logSystemInfo();
    }

    isDebugMode() {
        return localStorage.getItem('tracklie_debug') === 'true' || 
               new URLSearchParams(window.location.search).has('debug');
    }

    createPanel() {
        this.panel = document.createElement('div');
        this.panel.id = 'debug-panel';
        this.panel.innerHTML = `
            <div class="debug-panel__header">
                <h3>Tracklie Debug Panel</h3>
                <button class="debug-panel__toggle" onclick="window.debugPanel.toggle()">Hide</button>
            </div>
            <div class="debug-panel__content">
                <div class="debug-panel__section">
                    <h4>System Info</h4>
                    <div id="system-info"></div>
                </div>
                <div class="debug-panel__section">
                    <h4>Auth State</h4>
                    <div id="auth-state"></div>
                </div>
                <div class="debug-panel__section">
                    <h4>Performance</h4>
                    <div id="performance-info"></div>
                </div>
                <div class="debug-panel__section">
                    <h4>Logs</h4>
                    <div class="debug-panel__logs" id="debug-logs"></div>
                    <button onclick="window.debugPanel.clearLogs()">Clear Logs</button>
                    <button onclick="window.debugPanel.exportLogs()">Export Logs</button>
                </div>
                <div class="debug-panel__section">
                    <h4>Actions</h4>
                    <button onclick="window.debugPanel.testAuth()">Test Auth</button>
                    <button onclick="window.debugPanel.testNavigation()">Test Navigation</button>
                    <button onclick="window.debugPanel.clearStorage()">Clear Storage</button>
                </div>
            </div>
        `;

        // Add styles
        this.addStyles();
        
        // Add to page
        document.body.appendChild(this.panel);
        
        // Update info periodically
        this.startInfoUpdates();
    }

    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #debug-panel {
                position: fixed;
                top: 10px;
                right: 10px;
                width: 400px;
                max-height: 80vh;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                border: 1px solid #333;
                border-radius: 8px;
                font-family: monospace;
                font-size: 12px;
                z-index: 10000;
                overflow-y: auto;
            }
            
            .debug-panel__header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background: #333;
                border-radius: 8px 8px 0 0;
            }
            
            .debug-panel__header h3 {
                margin: 0;
                font-size: 14px;
            }
            
            .debug-panel__toggle {
                background: #666;
                color: white;
                border: none;
                padding: 5px 10px;
                border-radius: 4px;
                cursor: pointer;
            }
            
            .debug-panel__content {
                padding: 10px;
            }
            
            .debug-panel__section {
                margin-bottom: 15px;
                padding-bottom: 10px;
                border-bottom: 1px solid #333;
            }
            
            .debug-panel__section h4 {
                margin: 0 0 8px 0;
                color: #4CAF50;
                font-size: 12px;
            }
            
            .debug-panel__logs {
                max-height: 200px;
                overflow-y: auto;
                background: #111;
                padding: 8px;
                border-radius: 4px;
                margin-bottom: 8px;
            }
            
            .debug-panel__logs .log-entry {
                margin-bottom: 4px;
                padding: 2px 4px;
                border-radius: 2px;
            }
            
            .debug-panel__logs .log-entry.error {
                background: rgba(244, 67, 54, 0.2);
                color: #f44336;
            }
            
            .debug-panel__logs .log-entry.warn {
                background: rgba(255, 152, 0, 0.2);
                color: #ff9800;
            }
            
            .debug-panel__logs .log-entry.info {
                background: rgba(33, 150, 243, 0.2);
                color: #2196f3;
            }
            
            .debug-panel__logs .log-entry.debug {
                background: rgba(76, 175, 80, 0.2);
                color: #4caf50;
            }
            
            button {
                background: #4CAF50;
                color: white;
                border: none;
                padding: 4px 8px;
                border-radius: 4px;
                cursor: pointer;
                margin-right: 5px;
                margin-bottom: 5px;
                font-size: 11px;
            }
            
            button:hover {
                background: #45a049;
            }
        `;
        document.head.appendChild(style);
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+D to toggle debug panel
            if (e.ctrlKey && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    toggle() {
        this.isVisible = !this.isVisible;
        this.panel.style.display = this.isVisible ? 'block' : 'none';
    }

    startInfoUpdates() {
        // Update info every 2 seconds
        setInterval(() => {
            this.updateSystemInfo();
            this.updateAuthState();
            this.updatePerformanceInfo();
            this.updateLogs();
        }, 2000);
    }

    updateSystemInfo() {
        const systemInfo = document.getElementById('system-info');
        if (!systemInfo) return;

        const info = {
            'User Agent': navigator.userAgent,
            'URL': window.location.href,
            'Online': navigator.onLine ? 'Yes' : 'No',
            'Viewport': `${window.innerWidth}x${window.innerHeight}`,
            'Memory': performance.memory ? 
                `${Math.round(performance.memory.usedJSHeapSize / 1048576)}MB` : 'N/A'
        };

        systemInfo.innerHTML = Object.entries(info)
            .map(([key, value]) => `<div><strong>${key}:</strong> ${value}</div>`)
            .join('');
    }

    updateAuthState() {
        const authState = document.getElementById('auth-state');
        if (!authState) return;

        const state = window.AuthContext ? window.AuthContext.getState() : null;
        if (state) {
            authState.innerHTML = `
                <div><strong>Authenticated:</strong> ${state.isAuthenticated ? 'Yes' : 'No'}</div>
                <div><strong>Loading:</strong> ${state.isLoading ? 'Yes' : 'No'}</div>
                <div><strong>User:</strong> ${state.user ? JSON.stringify(state.user, null, 2) : 'None'}</div>
            `;
        } else {
            authState.innerHTML = '<div>AuthContext not available</div>';
        }
    }

    updatePerformanceInfo() {
        const perfInfo = document.getElementById('performance-info');
        if (!perfInfo) return;

        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReady = timing.domContentLoadedEventEnd - timing.navigationStart;

        perfInfo.innerHTML = `
            <div><strong>Load Time:</strong> ${loadTime}ms</div>
            <div><strong>DOM Ready:</strong> ${domReady}ms</div>
            <div><strong>Current Page:</strong> ${window.AppState?.currentPage || 'Unknown'}</div>
        `;
    }

    updateLogs() {
        const logsContainer = document.getElementById('debug-logs');
        if (!logsContainer || !window.Logger) return;

        const logs = window.Logger.getLogs().slice(-20); // Show last 20 logs
        logsContainer.innerHTML = logs.map(log => `
            <div class="log-entry ${log.level}">
                <span class="log-time">${new Date(log.timestamp).toLocaleTimeString()}</span>
                <span class="log-level">[${log.level.toUpperCase()}]</span>
                <span class="log-message">${log.message}</span>
            </div>
        `).join('');
    }

    logSystemInfo() {
        window.Logger?.info('Debug panel initialized', {
            userAgent: navigator.userAgent,
            url: window.location.href,
            timestamp: new Date().toISOString()
        });
    }

    // Debug actions
    testAuth() {
        window.Logger?.info('Testing authentication');
        if (window.AuthContext) {
            window.AuthContext.showLoginModal();
        }
    }

    testNavigation() {
        window.Logger?.info('Testing navigation');
        const pages = ['home', 'dashboard', 'leads', 'analytics'];
        const randomPage = pages[Math.floor(Math.random() * pages.length)];
        window.location.hash = randomPage;
    }

    clearStorage() {
        window.Logger?.info('Clearing localStorage');
        localStorage.clear();
        location.reload();
    }

    clearLogs() {
        window.Logger?.clearLogs();
    }

    exportLogs() {
        window.Logger?.exportLogs();
    }
}

// Initialize debug panel
if (typeof window !== 'undefined') {
    window.debugPanel = new DebugPanel();
}
