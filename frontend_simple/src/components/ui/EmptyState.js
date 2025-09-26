/**
 * EmptyState Component
 * Placeholder message when no data is available
 */

class EmptyState {
    constructor(config = {}) {
        this.config = {
            title: config.title || 'No leads found',
            message: config.message || 'There are no leads matching your current filters.',
            icon: config.icon || '📋',
            actionText: config.actionText || 'Add Lead',
            onAction: config.onAction || (() => {}),
            showAction: config.showAction !== false,
            ...config
        };
        
        this.element = null;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'empty-state';
        this.element.setAttribute('data-testid', 'no-leads-found');
        
        // Icon
        const icon = document.createElement('div');
        icon.className = 'empty-state__icon';
        icon.textContent = this.config.icon;
        
        // Title
        const title = document.createElement('h3');
        title.className = 'empty-state__title';
        title.textContent = this.config.title;
        
        // Message
        const message = document.createElement('p');
        message.className = 'empty-state__message';
        message.textContent = this.config.message;
        
        // Action button
        if (this.config.showAction) {
            const actionBtn = document.createElement('button');
            actionBtn.className = 'empty-state__action';
            actionBtn.textContent = this.config.actionText;
            actionBtn.setAttribute('data-testid', 'empty-state-action');
            
            actionBtn.addEventListener('click', () => {
                this.config.onAction();
            });
            
            this.element.appendChild(actionBtn);
        }
        
        // Assemble
        this.element.appendChild(icon);
        this.element.appendChild(title);
        this.element.appendChild(message);
        
        return this.element;
    }

    updateContent(title, message, icon) {
        this.config.title = title || this.config.title;
        this.config.message = message || this.config.message;
        this.config.icon = icon || this.config.icon;
        
        if (this.element) {
            const titleEl = this.element.querySelector('.empty-state__title');
            const messageEl = this.element.querySelector('.empty-state__message');
            const iconEl = this.element.querySelector('.empty-state__icon');
            
            if (titleEl) titleEl.textContent = this.config.title;
            if (messageEl) messageEl.textContent = this.config.message;
            if (iconEl) iconEl.textContent = this.config.icon;
        }
    }

    render() {
        if (!this.element) {
            this.createElement();
        }
        return this.element;
    }

    destroy() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Export for use in other components
window.EmptyState = EmptyState;
