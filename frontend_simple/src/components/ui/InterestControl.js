/**
 * Interest Level Control Component for Stage 6
 * Dropdown for interest level (0-5) with color bars
 */
class InterestControl {
    constructor(config = {}) {
        this.config = {
            lead: config.lead || null,
            onInterestChange: config.onInterestChange || (() => {}),
            onStatusSource: config.onStatusSource || (() => {}),
            ...config
        };
        
        this.element = null;
        this.isChanging = false;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'interest-control';
        this.element.setAttribute('data-testid', 'interest-control');
        
        // Only show for interested statuses
        if (!this.isInterestedStatus(this.config.lead.status)) {
            this.element.style.display = 'none';
            return this.element;
        }
        
        // Create interest level display
        const display = this.createInterestDisplay();
        this.element.appendChild(display);
        
        // Add click-outside-to-close functionality
        this.addClickOutsideListener();
        
        return this.element;
    }

    isInterestedStatus(status) {
        return status && status.startsWith('Interested');
    }

    createInterestDisplay() {
        const container = document.createElement('div');
        container.className = 'interest-control__container';
        
        // Interest level display with color bars
        const display = document.createElement('div');
        display.className = 'interest-control__display';
        display.innerHTML = this.getInterestDisplay(this.config.lead.interest_level || 0);
        display.addEventListener('click', () => this.toggleDropdown());
        
        // Dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'interest-control__dropdown';
        dropdown.style.display = 'none';
        
        // Create options for 0-5
        for (let i = 0; i <= 5; i++) {
            const option = document.createElement('div');
            option.className = 'interest-control__option';
            option.innerHTML = this.getInterestDisplay(i);
            option.addEventListener('click', () => this.handleInterestChange(i));
            dropdown.appendChild(option);
        }
        
        container.appendChild(display);
        container.appendChild(dropdown);
        
        return container;
    }

    getInterestDisplay(level) {
        const colors = ['#FF4D4F', '#FF7A45', '#FFA940', '#FFC53D', '#73D13D', '#52C41A'];
        const labels = ['No Interest', 'Low', 'Some', 'Good', 'High', 'Very High'];
        
        const color = colors[level] || '#666';
        const label = labels[level] || level.toString();
        
        // Create color bars
        const bars = Array.from({ length: 5 }, (_, i) => {
            const opacity = i < level ? 1 : 0.3;
            return `<span class="interest-control__bar" style="background-color: ${color}; opacity: ${opacity}"></span>`;
        }).join('');
        
        return `
            <div class="interest-control__bars">${bars}</div>
            <span class="interest-control__label">${label}</span>
            <span class="interest-control__arrow">▼</span>
        `;
    }

    addClickOutsideListener() {
        // Add click outside listener to close dropdown
        document.addEventListener('click', (event) => {
            if (this.element && !this.element.contains(event.target)) {
                const dropdown = this.element.querySelector('.interest-control__dropdown');
                if (dropdown && dropdown.style.display !== 'none') {
                    dropdown.style.display = 'none';
                }
            }
        });
    }

    toggleDropdown() {
        if (this.isChanging) return;
        
        const dropdown = this.element.querySelector('.interest-control__dropdown');
        const isVisible = dropdown.style.display !== 'none';
        
        if (isVisible) {
            dropdown.style.display = 'none';
        } else {
            // Position the dropdown using fixed positioning
            const rect = this.element.getBoundingClientRect();
            dropdown.style.display = 'block';
            dropdown.style.top = (rect.bottom + window.scrollY + 4) + 'px';
            dropdown.style.left = rect.left + 'px';
            dropdown.style.right = 'auto';
        }
    }

    async handleInterestChange(newLevel) {
        if (this.isChanging) return;
        
        const currentLevel = this.config.lead.interest_level || 0;
        if (newLevel === currentLevel) {
            this.toggleDropdown();
            return;
        }
        
        this.isChanging = true;
        this.showLoading();
        
        try {
            // Show status source modal
            this.showStatusSourceModal(newLevel);
            
        } catch (error) {
            console.error('Error updating interest level:', error);
            this.showError('Failed to update interest level');
            this.isChanging = false;
            this.hideLoading();
            this.toggleDropdown();
        }
    }

    showStatusSourceModal(newLevel) {
        const modal = new window.StatusSourceModal({
            lead: this.config.lead,
            statusChange: `Interest Level ${newLevel}`,
            onSourceSelect: (data) => {
                this.handleStatusSourceSelect(data, newLevel);
            },
            onClose: () => {
                this.isChanging = false;
                this.hideLoading();
                this.toggleDropdown();
            }
        });
        
        document.body.appendChild(modal.render());
        modal.show();
    }

    async handleStatusSourceSelect(data, newLevel) {
        try {
            // Call API to update interest level
            await this.updateInterestLevel(newLevel);
            
            // Update local state
            this.config.lead.interest_level = newLevel;
            
            // Update display
            this.updateDisplay();
            
            // Notify parent
            this.config.onInterestChange(this.config.lead, newLevel);
            this.config.onStatusSource(this.config.lead, `Interest Level ${newLevel}`, data.source);
            
            this.showSuccess('Interest level updated successfully');
            
        } catch (error) {
            console.error('Error updating interest level:', error);
            this.showError('Failed to update interest level');
        } finally {
            this.isChanging = false;
            this.hideLoading();
            this.toggleDropdown();
        }
    }

    async updateInterestLevel(newLevel) {
        // For now, use mock API call
        // Later this will be replaced with real API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Mock API: Updating lead ${this.config.lead.id} interest level to ${newLevel}`);
                resolve();
            }, 500);
        });
    }

    updateDisplay() {
        const display = this.element.querySelector('.interest-control__display');
        display.innerHTML = this.getInterestDisplay(this.config.lead.interest_level || 0);
    }

    showLoading() {
        const display = this.element.querySelector('.interest-control__display');
        display.innerHTML = '<span class="interest-control__loading">Updating...</span>';
    }

    hideLoading() {
        this.updateDisplay();
    }

    showSuccess(message) {
        this.showToast(message, 'success');
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast--${type}`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('toast--show');
        }, 100);
        
        setTimeout(() => {
            toast.classList.remove('toast--show');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
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
window.InterestControl = InterestControl;
