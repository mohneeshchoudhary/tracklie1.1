/**
 * StatusBadge Component
 * Color-coded status pills for lead statuses
 */

class StatusBadge {
    constructor(config = {}) {
        this.config = {
            type: config.type || 'new',
            label: config.label || 'New',
            size: config.size || 'medium', // small, medium, large
            ...config
        };
        
        this.element = null;
    }

    createElement() {
        this.element = document.createElement('span');
        this.element.className = `status-badge status-badge--${this.config.type} status-badge--${this.config.size}`;
        this.element.setAttribute('data-testid', 'status-badge');
        this.element.textContent = this.config.label;
        
        return this.element;
    }

    render() {
        if (!this.element) {
            this.createElement();
        }
        return this.element;
    }

    updateStatus(type, label) {
        this.config.type = type;
        this.config.label = label;
        
        if (this.element) {
            // Remove old type class
            this.element.className = this.element.className.replace(/status-badge--\w+/g, '');
            // Add new classes
            this.element.className = `status-badge status-badge--${type} status-badge--${this.config.size}`;
            this.element.textContent = label;
        }
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Export for use in other components
window.StatusBadge = StatusBadge;
