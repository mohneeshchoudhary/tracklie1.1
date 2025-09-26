/**
 * Status Control Component for Stage 6
 * Inline status dropdown with confirmation
 */
class StatusControl {
    constructor(config = {}) {
        this.config = {
            lead: config.lead || null,
            onStatusChange: config.onStatusChange || (() => {}),
            onStatusSource: config.onStatusSource || (() => {}),
            ...config
        };
        
        this.element = null;
        this.isChanging = false;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'status-control';
        this.element.setAttribute('data-testid', 'status-control');
        
        // Create status dropdown
        const dropdown = this.createStatusDropdown();
        this.element.appendChild(dropdown);
        
        // Add click-outside-to-close functionality
        this.addClickOutsideListener();
        
        return this.element;
    }

    createStatusDropdown() {
        const container = document.createElement('div');
        container.className = 'status-control__container';
        
        // Current status display
        const currentStatus = document.createElement('div');
        currentStatus.className = 'status-control__current';
        currentStatus.innerHTML = this.getStatusDisplay(this.config.lead.status);
        
        // Only add click handler if status has options
        const statusConfig = this.getStatusConfig(this.config.lead.status);
        if (statusConfig.hasOptions) {
            currentStatus.style.cursor = 'pointer';
            currentStatus.addEventListener('click', () => this.toggleDropdown());
        } else {
            currentStatus.style.cursor = 'default';
        }
        
        // Dropdown menu
        const dropdown = document.createElement('div');
        dropdown.className = 'status-control__dropdown';
        dropdown.style.display = 'none';
        
        const statusOptions = this.getStatusOptions();
        statusOptions.forEach(option => {
            const item = document.createElement('div');
            item.className = 'status-control__option';
            item.innerHTML = this.getStatusDisplay(option.value);
            item.addEventListener('click', () => this.handleStatusChange(option.value));
            dropdown.appendChild(item);
        });
        
        container.appendChild(currentStatus);
        container.appendChild(dropdown);
        
        return container;
    }

    getStatusOptions() {
        return [
            { value: 'New', label: 'New' },
            { value: 'In Progress', label: 'In Progress' },
            { value: 'CNP', label: 'CNP' },
            { value: 'Interested-1', label: 'Interested-1' },
            { value: 'Interested-2', label: 'Interested-2' },
            { value: 'Interested-3', label: 'Interested-3' },
            { value: 'Interested-4', label: 'Interested-4' },
            { value: 'Interested-5', label: 'Interested-5' },
            { value: 'Qualified', label: 'Qualified' },
            { value: 'Converted', label: 'Converted' },
            { value: 'Lost', label: 'Lost' },
            { value: 'Dropped', label: 'Dropped' }
        ];
    }

    getStatusConfig(status) {
        const statusConfig = {
            'New': { color: '#0000FF', text: 'New', hasOptions: true },
            'In Progress': { color: '#FFD700', text: 'In Progress', hasOptions: true },
            'CNP': { color: '#808080', text: 'CNP', hasOptions: true },
            'Interested-1': { color: '#28C76F', text: 'Interested-1', hasOptions: true },
            'Interested-2': { color: '#28C76F', text: 'Interested-2', hasOptions: true },
            'Interested-3': { color: '#28C76F', text: 'Interested-3', hasOptions: true },
            'Interested-4': { color: '#28C76F', text: 'Interested-4', hasOptions: true },
            'Interested-5': { color: '#28C76F', text: 'Interested-5', hasOptions: true },
            'Qualified': { color: '#1E90FF', text: 'Qualified', hasOptions: true },
            'Converted': { color: '#006400', text: 'Converted', hasOptions: false },
            'Lost': { color: '#FF4D4F', text: 'Lost', hasOptions: false },
            'Dropped': { color: '#FF4D4F', text: 'Dropped', hasOptions: false }
        };
        
        return statusConfig[status] || { color: '#666', text: status, hasOptions: true };
    }

    getStatusDisplay(status) {
        const config = this.getStatusConfig(status);
        
        return `
            <span class="status-control__badge" style="background-color: ${config.color}">
                ${config.text}
            </span>
            ${config.hasOptions ? '<span class="status-control__arrow">▼</span>' : ''}
        `;
    }

    addClickOutsideListener() {
        // Add click outside listener to close dropdown
        document.addEventListener('click', (event) => {
            if (this.element && !this.element.contains(event.target)) {
                const dropdown = this.element.querySelector('.status-control__dropdown');
                if (dropdown && dropdown.style.display !== 'none') {
                    dropdown.style.display = 'none';
                }
            }
        });
    }

    toggleDropdown() {
        if (this.isChanging) return;
        
        const dropdown = this.element.querySelector('.status-control__dropdown');
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

    async handleStatusChange(newStatus) {
        if (this.isChanging) return;
        
        const currentStatus = this.config.lead.status;
        if (newStatus === currentStatus) {
            this.toggleDropdown();
            return;
        }
        
        // Show confirmation
        const confirmed = confirm(`Change status from "${currentStatus}" to "${newStatus}"?`);
        if (!confirmed) {
            this.toggleDropdown();
            return;
        }
        
        this.isChanging = true;
        this.showLoading();
        
        try {
            // Show status source modal
            this.showStatusSourceModal(newStatus);
            
        } catch (error) {
            console.error('Error updating status:', error);
            this.showError('Failed to update status');
            this.isChanging = false;
            this.hideLoading();
            this.toggleDropdown();
        }
    }

    showStatusSourceModal(newStatus) {
        const modal = new window.StatusSourceModal({
            lead: this.config.lead,
            statusChange: newStatus,
            onSourceSelect: (data) => {
                this.handleStatusSourceSelect(data);
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

    async handleStatusSourceSelect(data) {
        try {
            // Call API to update status
            await this.updateStatus(data.statusChange);
            
            // Update local state
            this.config.lead.status = data.statusChange;
            
            // Update display
            this.updateDisplay();
            
            // Notify parent
            this.config.onStatusChange(this.config.lead, data.statusChange);
            this.config.onStatusSource(this.config.lead, data.statusChange, data.source);
            
            this.showSuccess('Status updated successfully');
            
        } catch (error) {
            console.error('Error updating status:', error);
            this.showError('Failed to update status');
        } finally {
            this.isChanging = false;
            this.hideLoading();
            this.toggleDropdown();
        }
    }

    async updateStatus(newStatus) {
        // For now, use mock API call
        // Later this will be replaced with real API call
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(`Mock API: Updating lead ${this.config.lead.id} status to ${newStatus}`);
                resolve();
            }, 500);
        });
    }

    updateDisplay() {
        const currentStatus = this.element.querySelector('.status-control__current');
        currentStatus.innerHTML = this.getStatusDisplay(this.config.lead.status);
    }

    showLoading() {
        const currentStatus = this.element.querySelector('.status-control__current');
        currentStatus.innerHTML = '<span class="status-control__loading">Updating...</span>';
    }

    hideLoading() {
        this.updateDisplay();
    }

    showSuccess(message) {
        // Show success toast
        this.showToast(message, 'success');
    }

    showError(message) {
        // Show error toast
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
window.StatusControl = StatusControl;
