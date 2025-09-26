/**
 * LeadModal Component
 * Modal for creating and editing leads
 */

class LeadModal {
    constructor(config = {}) {
        this.config = {
            mode: 'create', // 'create' or 'edit'
            lead: null,
            onSave: null,
            onCancel: null,
            userRole: 'admin', // 'admin' or 'salesperson'
            ...config
        };
        
        this.element = null;
        this.isOpen = false;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'lead-modal';
        this.element.setAttribute('data-testid', 'lead-modal');
        
        const modalContent = document.createElement('div');
        modalContent.className = 'lead-modal__content';
        
        // Header
        const header = document.createElement('div');
        header.className = 'lead-modal__header';
        
        const title = document.createElement('h2');
        title.className = 'lead-modal__title';
        title.textContent = this.config.mode === 'create' ? 'Add New Lead' : 'Edit Lead';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'lead-modal__close';
        closeBtn.innerHTML = '×';
        closeBtn.addEventListener('click', () => this.close());
        
        header.appendChild(title);
        header.appendChild(closeBtn);
        
        // Form
        const form = document.createElement('form');
        form.className = 'lead-modal__form';
        form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Basic Information Section
        const basicSection = this.createSection('Basic Information', [
            { name: 'name', label: 'Full Name', type: 'text', required: true },
            { name: 'email', label: 'Email', type: 'email', required: false },
            { name: 'phone', label: 'Phone', type: 'tel', required: true },
            { name: 'company', label: 'Company', type: 'text', required: false }
        ]);
        
        // Lead Details Section
        const detailsSection = this.createSection('Lead Details', [
            { name: 'status', label: 'Status', type: 'select', required: true, options: [
                { value: 'new', label: 'New' },
                { value: 'in_progress', label: 'In Progress' },
                { value: 'interested', label: 'Interested' },
                { value: 'converted', label: 'Converted' },
                { value: 'dropped', label: 'Dropped' }
            ]},
            { name: 'source', label: 'Source', type: 'select', required: true, options: [
                { value: 'website', label: 'Website' },
                { value: 'referral', label: 'Referral' },
                { value: 'social_media', label: 'Social Media' },
                { value: 'cold_call', label: 'Cold Call' },
                { value: 'email_campaign', label: 'Email Campaign' },
                { value: 'trade_show', label: 'Trade Show' },
                { value: 'other', label: 'Other' }
            ]},
            { name: 'priority', label: 'Priority', type: 'select', required: true, options: [
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
            ]}
        ]);
        
        // Additional Information Section
        const additionalSection = this.createSection('Additional Information', [
            { name: 'notes', label: 'Notes', type: 'textarea', required: false },
            { name: 'address', label: 'Address', type: 'text', required: false },
            { name: 'city', label: 'City', type: 'text', required: false },
            { name: 'state', label: 'State', type: 'text', required: false },
            { name: 'zipCode', label: 'ZIP Code', type: 'text', required: false },
            { name: 'country', label: 'Country', type: 'text', required: false }
        ]);
        
        form.appendChild(basicSection);
        form.appendChild(detailsSection);
        form.appendChild(additionalSection);
        
        // Footer
        const footer = document.createElement('div');
        footer.className = 'lead-modal__footer';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'lead-modal__btn lead-modal__btn--secondary';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', () => this.close());
        
        const saveBtn = document.createElement('button');
        saveBtn.type = 'submit';
        saveBtn.className = 'lead-modal__btn lead-modal__btn--primary';
        saveBtn.textContent = this.config.mode === 'create' ? 'Create Lead' : 'Update Lead';
        
        footer.appendChild(cancelBtn);
        footer.appendChild(saveBtn);
        
        modalContent.appendChild(header);
        modalContent.appendChild(form);
        modalContent.appendChild(footer);
        
        this.element.appendChild(modalContent);
        
        // Set field permissions based on user role
        this.setFieldPermissions();
        
        // Populate form if editing
        if (this.config.mode === 'edit' && this.config.lead) {
            this.populateForm();
        }
        
        return this.element;
    }

    createSection(title, fields) {
        const section = document.createElement('div');
        section.className = 'lead-modal__section';
        
        const sectionTitle = document.createElement('h3');
        sectionTitle.className = 'lead-modal__section-title';
        sectionTitle.textContent = title;
        
        const fieldsContainer = document.createElement('div');
        fieldsContainer.className = 'lead-modal__fields';
        
        fields.forEach(field => {
            const fieldElement = this.createField(field);
            fieldsContainer.appendChild(fieldElement);
        });
        
        section.appendChild(sectionTitle);
        section.appendChild(fieldsContainer);
        
        return section;
    }

    createField(field) {
        const fieldContainer = document.createElement('div');
        fieldContainer.className = 'lead-modal__field';
        
        const label = document.createElement('label');
        label.className = 'lead-modal__label';
        label.textContent = field.label;
        if (field.required) {
            label.innerHTML += ' <span class="lead-modal__required">*</span>';
        }
        
        let input;
        
        if (field.type === 'select') {
            input = document.createElement('select');
            input.className = 'lead-modal__input lead-modal__select';
            input.name = field.name;
            input.required = field.required;
            
            // Add default option
            const defaultOption = document.createElement('option');
            defaultOption.value = '';
            defaultOption.textContent = `Select ${field.label}`;
            input.appendChild(defaultOption);
            
            // Add options
            field.options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.value;
                optionElement.textContent = option.label;
                input.appendChild(optionElement);
            });
        } else if (field.type === 'textarea') {
            input = document.createElement('textarea');
            input.className = 'lead-modal__input lead-modal__textarea';
            input.name = field.name;
            input.required = field.required;
            input.rows = 3;
        } else {
            input = document.createElement('input');
            input.type = field.type;
            input.className = 'lead-modal__input';
            input.name = field.name;
            input.required = field.required;
        }
        
        fieldContainer.appendChild(label);
        fieldContainer.appendChild(input);
        
        return fieldContainer;
    }

    setFieldPermissions() {
        // Salesperson can only update certain fields
        if (this.config.userRole === 'salesperson') {
            const restrictedFields = ['status', 'source', 'priority'];
            restrictedFields.forEach(fieldName => {
                const field = this.element.querySelector(`[name="${fieldName}"]`);
                if (field) {
                    field.disabled = true;
                    field.title = 'Only admins can modify this field';
                }
            });
        }
    }

    populateForm() {
        const lead = this.config.lead;
        Object.keys(lead).forEach(key => {
            const field = this.element.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = lead[key] || '';
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const leadData = {};
        
        for (let [key, value] of formData.entries()) {
            leadData[key] = value;
        }
        
        // Add ID if editing
        if (this.config.mode === 'edit' && this.config.lead) {
            leadData.id = this.config.lead.id;
        }
        
        // Add timestamps
        const now = new Date().toISOString();
        if (this.config.mode === 'create') {
            leadData.createdAt = now;
            leadData.lastUpdated = now;
        } else {
            leadData.lastUpdated = now;
        }
        
        // Call save callback
        if (this.config.onSave) {
            this.config.onSave(leadData);
        }
        
        this.close();
    }

    open() {
        if (!this.element) {
            this.createElement();
        }
        
        document.body.appendChild(this.element);
        this.isOpen = true;
        
        // Focus first input
        const firstInput = this.element.querySelector('input, select, textarea');
        if (firstInput) {
            firstInput.focus();
        }
    }

    close() {
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.isOpen = false;
        
        if (this.config.onCancel) {
            this.config.onCancel();
        }
    }

    destroy() {
        this.close();
        this.element = null;
    }
}

// Export for use in other components
window.LeadModal = LeadModal;
