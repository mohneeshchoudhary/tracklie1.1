/**
 * Action Buttons Component for Stage 6
 * CNP, Convert, Drop buttons for lead actions
 */
class ActionButtons {
    constructor(config = {}) {
        this.config = {
            lead: config.lead || null,
            onCNP: config.onCNP || (() => {}),
            onConvert: config.onConvert || (() => {}),
            onDrop: config.onDrop || (() => {}),
            ...config
        };
        
        this.element = null;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'action-buttons';
        this.element.setAttribute('data-testid', 'action-buttons');
        
        // Create action buttons
        const buttons = this.createActionButtons();
        this.element.appendChild(buttons);
        
        return this.element;
    }

    createActionButtons() {
        const container = document.createElement('div');
        container.className = 'action-buttons__container';
        
        // CNP Button
        const cnpBtn = this.createCNPButton();
        container.appendChild(cnpBtn);
        
        // Convert Button (only for qualified leads)
        if (this.config.lead.status === 'Qualified') {
            const convertBtn = this.createConvertButton();
            container.appendChild(convertBtn);
        }
        
        // Drop Button
        const dropBtn = this.createDropButton();
        container.appendChild(dropBtn);
        
        return container;
    }

    createCNPButton() {
        const button = document.createElement('button');
        button.className = 'action-buttons__btn action-buttons__btn--cnp';
        button.innerHTML = '📞 CNP';
        button.setAttribute('data-testid', 'cnp-btn');
        button.addEventListener('click', () => this.handleCNP());
        return button;
    }

    createConvertButton() {
        const button = document.createElement('button');
        button.className = 'action-buttons__btn action-buttons__btn--convert';
        button.innerHTML = '✅ Convert';
        button.setAttribute('data-testid', 'convert-btn');
        button.addEventListener('click', () => this.handleConvert());
        return button;
    }

    createDropButton() {
        const button = document.createElement('button');
        button.className = 'action-buttons__btn action-buttons__btn--drop';
        button.innerHTML = '❌ Drop';
        button.setAttribute('data-testid', 'drop-btn');
        button.addEventListener('click', () => this.handleDrop());
        return button;
    }

    async handleCNP() {
        const reason = prompt('Reason for CNP (Could Not Pick):');
        if (reason === null) return; // User cancelled
        
        try {
            // Update lead status to CNP
            this.config.lead.status = 'CNP';
            this.config.lead.cnp_count = (this.config.lead.cnp_count || 0) + 1;
            this.config.lead.last_cnp_at = new Date().toISOString();
            
            // Notify parent
            this.config.onCNP(this.config.lead, reason);
            
            this.showSuccess('Lead marked as CNP');
            
        } catch (error) {
            console.error('Error marking as CNP:', error);
            this.showError('Failed to mark as CNP');
        }
    }

    async handleConvert() {
        // Show convert modal
        const convertModal = this.createConvertModal();
        document.body.appendChild(convertModal);
        
        // Show modal
        setTimeout(() => {
            convertModal.classList.add('modal--show');
        }, 100);
    }

    createConvertModal() {
        const modal = document.createElement('div');
        modal.className = 'modal convert-modal';
        
        modal.innerHTML = `
            <div class="modal__overlay">
                <div class="modal__content">
                    <div class="modal__header">
                        <h3>Convert Lead to Customer</h3>
                        <button class="modal__close" data-action="close">×</button>
                    </div>
                    <div class="modal__body">
                        <form id="convertForm">
                            <div class="form-group">
                                <label for="product">Product/Service *</label>
                                <input type="text" id="product" name="product" required 
                                       placeholder="Enter product or service name">
                            </div>
                            <div class="form-group">
                                <label for="payment">Payment Amount (₹) *</label>
                                <input type="number" id="payment" name="payment" required 
                                       placeholder="Enter payment amount" min="0">
                            </div>
                            <div class="form-group">
                                <label for="notes">Notes</label>
                                <textarea id="notes" name="notes" 
                                          placeholder="Additional conversion notes"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal__footer">
                        <button type="button" class="btn btn--secondary" data-action="close">Cancel</button>
                        <button type="button" class="btn btn--primary" data-action="convert">Convert</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'close') {
                this.closeModal(modal);
            } else if (e.target.dataset.action === 'convert') {
                this.submitConvert(modal);
            }
        });
        
        return modal;
    }

    async submitConvert(modal) {
        const form = modal.querySelector('#convertForm');
        const formData = new FormData(form);
        
        const product = formData.get('product');
        const payment = formData.get('payment');
        const notes = formData.get('notes');
        
        if (!product || !payment) {
            alert('Please fill in all required fields');
            return;
        }
        
        try {
            // Update lead status to Converted
            this.config.lead.status = 'Converted';
            this.config.lead.product_purchased = product;
            this.config.lead.payment_amount = parseInt(payment);
            this.config.lead.converted_at = new Date().toISOString();
            
            // Notify parent
            this.config.onConvert(this.config.lead, { product, payment, notes });
            
            this.closeModal(modal);
            this.showSuccess('Lead converted successfully');
            
        } catch (error) {
            console.error('Error converting lead:', error);
            this.showError('Failed to convert lead');
        }
    }

    async handleDrop() {
        // Show drop modal
        const dropModal = this.createDropModal();
        document.body.appendChild(dropModal);
        
        // Show modal
        setTimeout(() => {
            dropModal.classList.add('modal--show');
        }, 100);
    }

    createDropModal() {
        const modal = document.createElement('div');
        modal.className = 'modal drop-modal';
        
        const dropReasons = [
            'Financial - Budget constraints',
            'Not Interested - No need for service',
            'Joined Competitor - Using competitor service',
            'Timing - Not ready now, maybe later',
            'Technical - Technical issues',
            'Communication - Poor communication',
            'Price - Too expensive',
            'Quality - Service quality concerns',
            'Location - Geographic constraints',
            'Other - Other reasons'
        ];
        
        modal.innerHTML = `
            <div class="modal__overlay">
                <div class="modal__content">
                    <div class="modal__header">
                        <h3>Drop Lead</h3>
                        <button class="modal__close" data-action="close">×</button>
                    </div>
                    <div class="modal__body">
                        <form id="dropForm">
                            <div class="form-group">
                                <label for="reason">Drop Reason *</label>
                                <select id="reason" name="reason" required>
                                    <option value="">Select a reason</option>
                                    ${dropReasons.map(reason => `<option value="${reason}">${reason}</option>`).join('')}
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="notes">Additional Notes</label>
                                <textarea id="notes" name="notes" 
                                          placeholder="Additional drop notes"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal__footer">
                        <button type="button" class="btn btn--secondary" data-action="close">Cancel</button>
                        <button type="button" class="btn btn--danger" data-action="drop">Drop Lead</button>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners
        modal.addEventListener('click', (e) => {
            if (e.target.dataset.action === 'close') {
                this.closeModal(modal);
            } else if (e.target.dataset.action === 'drop') {
                this.submitDrop(modal);
            }
        });
        
        return modal;
    }

    async submitDrop(modal) {
        const form = modal.querySelector('#dropForm');
        const formData = new FormData(form);
        
        const reason = formData.get('reason');
        const notes = formData.get('notes');
        
        if (!reason) {
            alert('Please select a drop reason');
            return;
        }
        
        try {
            // Update lead status to Dropped
            this.config.lead.status = 'Dropped';
            this.config.lead.drop_reason = reason;
            this.config.lead.dropped_at = new Date().toISOString();
            
            // Notify parent
            this.config.onDrop(this.config.lead, { reason, notes });
            
            this.closeModal(modal);
            this.showSuccess('Lead dropped successfully');
            
        } catch (error) {
            console.error('Error dropping lead:', error);
            this.showError('Failed to drop lead');
        }
    }

    closeModal(modal) {
        modal.classList.remove('modal--show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
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
window.ActionButtons = ActionButtons;
