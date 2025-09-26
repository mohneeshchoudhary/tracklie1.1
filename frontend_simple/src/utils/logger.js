/**
 * Logger utility for debugging and error tracking
 * Provides structured logging with different levels and error reporting
 */

class Logger {
    constructor() {
        this.logs = [];
        this.maxLogs = 1000;
        this.isDebugMode = this.getDebugMode();
    }

    getDebugMode() {
        // Check for debug mode in localStorage or URL params
        return localStorage.getItem('tracklie_debug') === 'true' || 
               new URLSearchParams(window.location.search).has('debug');
    }

    log(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level,
            message,
            data,
            url: window.location.href,
            userAgent: navigator.userAgent
        };

        // Add to internal logs
        this.logs.push(logEntry);
        if (this.logs.length > this.maxLogs) {
            this.logs.shift();
        }

        // Console output
        const consoleMethod = this.getConsoleMethod(level);
        if (consoleMethod) {
            console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data || '');
        }

        // Send to external logging service in production
        if (this.shouldSendToExternalService(level)) {
            this.sendToExternalService(logEntry);
        }
    }

    getConsoleMethod(level) {
        const methods = {
            'error': 'error',
            'warn': 'warn',
            'info': 'info',
            'debug': 'log',
            'trace': 'log'
        };
        return methods[level] || 'log';
    }

    shouldSendToExternalService(level) {
        // Only send errors and warnings to external service
        return ['error', 'warn'].includes(level) && !this.isDebugMode;
    }

    async sendToExternalService(logEntry) {
        try {
            // In a real application, this would send to your logging service
            // For now, we'll just store in localStorage for debugging
            const errorLogs = JSON.parse(localStorage.getItem('tracklie_error_logs') || '[]');
            errorLogs.push(logEntry);
            
            // Keep only last 50 error logs
            if (errorLogs.length > 50) {
                errorLogs.splice(0, errorLogs.length - 50);
            }
            
            localStorage.setItem('tracklie_error_logs', JSON.stringify(errorLogs));
        } catch (error) {
            console.error('Failed to send log to external service:', error);
        }
    }

    // Convenience methods
    error(message, data = null) {
        this.log('error', message, data);
    }

    warn(message, data = null) {
        this.log('warn', message, data);
    }

    info(message, data = null) {
        this.log('info', message, data);
    }

    debug(message, data = null) {
        if (this.isDebugMode) {
            this.log('debug', message, data);
        }
    }

    trace(message, data = null) {
        if (this.isDebugMode) {
            this.log('trace', message, data);
        }
    }

    // Get all logs
    getLogs() {
        return [...this.logs];
    }

    // Get logs by level
    getLogsByLevel(level) {
        return this.logs.filter(log => log.level === level);
    }

    // Clear logs
    clearLogs() {
        this.logs = [];
    }

    // Export logs for debugging
    exportLogs() {
        const logs = this.getLogs();
        const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tracklie-logs-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Performance monitoring
    startTimer(label) {
        if (this.isDebugMode) {
            console.time(label);
        }
    }

    endTimer(label) {
        if (this.isDebugMode) {
            console.timeEnd(label);
        }
    }

    // Memory usage monitoring
    logMemoryUsage() {
        if (this.isDebugMode && performance.memory) {
            const memory = performance.memory;
            this.debug('Memory Usage', {
                used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
                total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
                limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
            });
        }
    }
}

// Create global logger instance
window.Logger = new Logger();

// Global error handler
window.addEventListener('error', (event) => {
    window.Logger.error('Uncaught Error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    window.Logger.error('Unhandled Promise Rejection', {
        reason: event.reason,
        promise: event.promise
    });
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Logger;
}
