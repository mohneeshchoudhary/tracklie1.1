/**
 * StatusSourceModal Component
 * Modal for asking how user got to know about status change
 */

class StatusSourceModal {
    constructor(config = {}) {
        this.config = {
            lead: config.lead || null,
            statusChange: config.statusChange || null,
            onSourceSelect: config.onSourceSelect || (() => {}),
            onClose: config.onClose || (() => {}),
            ...config
        };
        
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'modal status-source-modal';
        this.element.setAttribute('data-testid', 'status-source-modal');
        
        const overlay = document.createElement('div');
        overlay.className = 'modal__overlay';
        
        const content = document.createElement('div');
        content.className = 'modal__content';
        
        // Header
        const header = this.createHeader();
        content.appendChild(header);
        
        // Body
        const body = this.createBody();
        content.appendChild(body);
        
        // Footer
        const footer = this.createFooter();
        content.appendChild(footer);
        
        overlay.appendChild(content);
        this.element.appendChild(overlay);
        
        // Add event listeners
        this.addEventListeners();
        
        return this.element;
    }

    createHeader() {
        const header = document.createElement('div');
        header.className = 'modal__header';
        
        const title = document.createElement('h3');
        title.textContent = 'Status Change Source';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal__close';
        closeBtn.innerHTML = '×';
        closeBtn.setAttribute('data-action', 'close');
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        return header;
    }

    createBody() {
        const body = document.createElement('div');
        body.className = 'modal__body';
        body.setAttribute('data-testid', 'status-source-body');
        
        const message = document.createElement('div');
        message.className = 'status-source__message';
        message.innerHTML = `
            <p>You changed the status of <strong>${this.config.lead?.name}</strong> to <strong>${this.config.statusChange}</strong>.</p>
            <p>How did you get to know about this status change?</p>
        `;
        
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = 'Source:';
        label.setAttribute('for', 'status-source');
        
        const select = document.createElement('select');
        select.id = 'status-source';
        select.className = 'status-source__select';
        select.setAttribute('data-testid', 'status-source-select');
        select.required = true;
        
        const sources = [
            'Called',
            'WhatsApp',
            'Other'
        ];
        
        sources.forEach(source => {
            const option = document.createElement('option');
            option.value = source;
            option.textContent = source;
            select.appendChild(option);
        });
        
        formGroup.appendChild(label);
        formGroup.appendChild(select);
        
        body.appendChild(message);
        body.appendChild(formGroup);
        
        return body;
    }

    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'modal__footer';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn--secondary';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.setAttribute('data-action', 'cancel');
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn--primary';
        submitBtn.textContent = 'Submit';
        submitBtn.setAttribute('data-action', 'submit');
        submitBtn.setAttribute('data-testid', 'status-source-submit');
        
        footer.appendChild(cancelBtn);
        footer.appendChild(submitBtn);
        
        return footer;
    }

    addEventListeners() {
        // Close button
        const closeBtn = this.element.querySelector('[data-action="close"]');
        closeBtn.addEventListener('click', () => this.close());
        
        // Cancel button
        const cancelBtn = this.element.querySelector('[data-action="cancel"]');
        cancelBtn.addEventListener('click', () => this.close());
        
        // Submit button
        const submitBtn = this.element.querySelector('[data-action="submit"]');
        submitBtn.addEventListener('click', () => this.handleSubmit());
        
        // Overlay click to close
        const overlay = this.element.querySelector('.modal__overlay');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });
    }

    handleSubmit() {
        const source = this.element.querySelector('#status-source').value;
        
        if (!source) {
            alert('Please select a source');
            return;
        }
        
        this.config.onSourceSelect({
            lead: this.config.lead,
            statusChange: this.config.statusChange,
            source: source
        });
        
        this.close();
    }

    close() {
        this.config.onClose();
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }

    show() {
        this.element.classList.add('modal--show');
    }
}

// Export for use in other components
window.StatusSourceModal = StatusSourceModal;
