/**
 * CallModal Component
 * Modal for handling call outcomes (CNP/Picked)
 */

class CallModal {
    constructor(config = {}) {
        this.config = {
            lead: config.lead || null,
            onCallOutcome: config.onCallOutcome || (() => {}),
            onClose: config.onClose || (() => {}),
            ...config
        };
        
        this.element = null;
        this.currentStep = 'outcome'; // 'outcome', 'cnp-reason', 'picked-status', 'interest', 'next-action'
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'modal call-modal';
        this.element.setAttribute('data-testid', 'call-modal');
        
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
        title.textContent = `Call Lead: ${this.config.lead?.name || 'Unknown'}`;
        
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
        body.setAttribute('data-testid', 'call-modal-body');
        
        // Step 1: Call Outcome
        const outcomeStep = this.createOutcomeStep();
        body.appendChild(outcomeStep);
        
        return body;
    }

    createOutcomeStep() {
        const step = document.createElement('div');
        step.className = 'call-modal__step call-modal__step--outcome';
        step.setAttribute('data-step', 'outcome');
        
        const title = document.createElement('h4');
        title.textContent = 'Call Outcome';
        title.className = 'call-modal__step-title';
        
        const options = document.createElement('div');
        options.className = 'call-modal__options';
        
        // CNP Option
        const cnpOption = document.createElement('button');
        cnpOption.className = 'call-modal__option call-modal__option--cnp';
        cnpOption.setAttribute('data-outcome', 'cnp');
        cnpOption.innerHTML = `
            <div class="call-modal__option-icon">📞❌</div>
            <div class="call-modal__option-text">
                <strong>Could Not Pick (CNP)</strong>
                <span>Call not answered or unsuccessful</span>
            </div>
        `;
        
        // Picked Option
        const pickedOption = document.createElement('button');
        pickedOption.className = 'call-modal__option call-modal__option--picked';
        pickedOption.setAttribute('data-outcome', 'picked');
        pickedOption.innerHTML = `
            <div class="call-modal__option-icon">📞✅</div>
            <div class="call-modal__option-text">
                <strong>Picked</strong>
                <span>Successfully connected with lead</span>
            </div>
        `;
        
        options.appendChild(cnpOption);
        options.appendChild(pickedOption);
        
        step.appendChild(title);
        step.appendChild(options);
        
        return step;
    }

    createCNPReasonStep() {
        const step = document.createElement('div');
        step.className = 'call-modal__step call-modal__step--cnp-reason';
        step.setAttribute('data-step', 'cnp-reason');
        step.style.display = 'none';
        
        const title = document.createElement('h4');
        title.textContent = 'CNP Reason';
        title.className = 'call-modal__step-title';
        
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = 'Select reason for CNP:';
        label.setAttribute('for', 'cnp-reason');
        
        const select = document.createElement('select');
        select.id = 'cnp-reason';
        select.className = 'call-modal__select';
        select.setAttribute('data-testid', 'cnp-reason-select');
        
        const reasons = [
            'Common',
            'Ringed not picked',
            'Out of service',
            'Invalid number',
            'No incoming',
            'Busy',
            'Wrong number',
            'Language barrier',
            'Number switched off',
            'Network busy'
        ];
        
        reasons.forEach(reason => {
            const option = document.createElement('option');
            option.value = reason;
            option.textContent = reason;
            select.appendChild(option);
        });
        
        formGroup.appendChild(label);
        formGroup.appendChild(select);
        
        step.appendChild(title);
        step.appendChild(formGroup);
        
        return step;
    }

    createPickedStatusStep() {
        const step = document.createElement('div');
        step.className = 'call-modal__step call-modal__step--picked-status';
        step.setAttribute('data-step', 'picked-status');
        step.style.display = 'none';
        
        const title = document.createElement('h4');
        title.textContent = 'Lead Response';
        title.className = 'call-modal__step-title';
        
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = 'How did the lead respond?';
        label.setAttribute('for', 'picked-status');
        
        const select = document.createElement('select');
        select.id = 'picked-status';
        select.className = 'call-modal__select';
        select.setAttribute('data-testid', 'picked-status-select');
        
        const statuses = [
            'Interested',
            'Just checking',
            'Not interested',
            'Unwillingly submitted lead',
            'Junk lead',
            'Already using competitor',
            'Budget constraints',
            'Decision maker not available',
            'Not the right time',
            'Need to discuss with team'
        ];
        
        statuses.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            select.appendChild(option);
        });
        
        formGroup.appendChild(label);
        formGroup.appendChild(select);
        
        step.appendChild(title);
        step.appendChild(formGroup);
        
        return step;
    }

    createInterestStep() {
        const step = document.createElement('div');
        step.className = 'call-modal__step call-modal__step--interest';
        step.setAttribute('data-step', 'interest');
        step.style.display = 'none';
        
        const title = document.createElement('h4');
        title.textContent = 'Interest Level';
        title.className = 'call-modal__step-title';
        
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = 'How interested is the lead?';
        label.setAttribute('for', 'interest-level');
        
        const select = document.createElement('select');
        select.id = 'interest-level';
        select.className = 'call-modal__select';
        select.setAttribute('data-testid', 'interest-level-select');
        
        const levels = [
            { value: 1, text: '1 - Very Low Interest' },
            { value: 2, text: '2 - Low Interest' },
            { value: 3, text: '3 - Medium Interest' },
            { value: 4, text: '4 - High Interest' },
            { value: 5, text: '5 - Very High Interest' }
        ];
        
        levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.value;
            option.textContent = level.text;
            select.appendChild(option);
        });
        
        formGroup.appendChild(label);
        formGroup.appendChild(select);
        
        step.appendChild(title);
        step.appendChild(formGroup);
        
        return step;
    }

    createNextActionStep() {
        const step = document.createElement('div');
        step.className = 'call-modal__step call-modal__step--next-action';
        step.setAttribute('data-step', 'next-action');
        step.style.display = 'none';
        
        const title = document.createElement('h4');
        title.textContent = 'Next Action';
        title.className = 'call-modal__step-title';
        
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = 'What is the next action?';
        label.setAttribute('for', 'next-action');
        
        const select = document.createElement('select');
        select.id = 'next-action';
        select.className = 'call-modal__select';
        select.setAttribute('data-testid', 'next-action-select');
        
        const actions = [
            'Follow-up',
            'Demo',
            'Visit',
            'Will buy'
        ];
        
        actions.forEach(action => {
            const option = document.createElement('option');
            option.value = action;
            option.textContent = action;
            select.appendChild(option);
        });
        
        const dateGroup = document.createElement('div');
        dateGroup.className = 'form-group';
        
        const dateLabel = document.createElement('label');
        dateLabel.textContent = 'Next call date and time:';
        dateLabel.setAttribute('for', 'next-call-date');
        
        const dateInput = document.createElement('input');
        dateInput.type = 'datetime-local';
        dateInput.id = 'next-call-date';
        dateInput.className = 'call-modal__input';
        dateInput.setAttribute('data-testid', 'next-call-date');
        
        // Set default to tomorrow at 10 AM
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);
        dateInput.value = tomorrow.toISOString().slice(0, 16);
        
        dateGroup.appendChild(dateLabel);
        dateGroup.appendChild(dateInput);
        
        formGroup.appendChild(label);
        formGroup.appendChild(select);
        
        step.appendChild(title);
        step.appendChild(formGroup);
        step.appendChild(dateGroup);
        
        return step;
    }

    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'modal__footer';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.className = 'btn btn--secondary';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.setAttribute('data-action', 'cancel');
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'btn btn--primary';
        nextBtn.textContent = 'Next';
        nextBtn.setAttribute('data-action', 'next');
        nextBtn.setAttribute('data-testid', 'call-modal-next');
        
        const submitBtn = document.createElement('button');
        submitBtn.className = 'btn btn--primary';
        submitBtn.textContent = 'Submit';
        submitBtn.setAttribute('data-action', 'submit');
        submitBtn.setAttribute('data-testid', 'call-modal-submit');
        submitBtn.style.display = 'none';
        
        footer.appendChild(cancelBtn);
        footer.appendChild(nextBtn);
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
        
        // Next button
        const nextBtn = this.element.querySelector('[data-action="next"]');
        nextBtn.addEventListener('click', () => this.handleNext());
        
        // Submit button
        const submitBtn = this.element.querySelector('[data-action="submit"]');
        submitBtn.addEventListener('click', () => this.handleSubmit());
        
        // Outcome options
        const outcomeOptions = this.element.querySelectorAll('[data-outcome]');
        outcomeOptions.forEach(option => {
            option.addEventListener('click', (e) => this.handleOutcomeSelect(e));
        });
        
        // Overlay click to close
        const overlay = this.element.querySelector('.modal__overlay');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });
    }

    handleOutcomeSelect(e) {
        const outcome = e.currentTarget.getAttribute('data-outcome');
        
        // Remove active class from all options
        const options = this.element.querySelectorAll('[data-outcome]');
        options.forEach(option => option.classList.remove('active'));
        
        // Add active class to selected option
        e.currentTarget.classList.add('active');
        
        // Store the outcome
        this.selectedOutcome = outcome;
        
        // Enable next button
        const nextBtn = this.element.querySelector('[data-action="next"]');
        nextBtn.disabled = false;
    }

    handleNext() {
        if (this.currentStep === 'outcome') {
            if (this.selectedOutcome === 'cnp') {
                this.showStep('cnp-reason');
            } else if (this.selectedOutcome === 'picked') {
                this.showStep('picked-status');
            }
        } else if (this.currentStep === 'cnp-reason') {
            this.handleSubmit();
        } else if (this.currentStep === 'picked-status') {
            const status = this.element.querySelector('#picked-status').value;
            if (status === 'Interested') {
                this.showStep('interest');
            } else {
                this.handleSubmit();
            }
        } else if (this.currentStep === 'interest') {
            this.showStep('next-action');
        } else if (this.currentStep === 'next-action') {
            this.handleSubmit();
        }
    }

    showStep(stepName) {
        // Hide all steps
        const steps = this.element.querySelectorAll('.call-modal__step');
        steps.forEach(step => step.style.display = 'none');
        
        // Show current step
        const currentStep = this.element.querySelector(`[data-step="${stepName}"]`);
        if (currentStep) {
            currentStep.style.display = 'block';
            this.currentStep = stepName;
        }
        
        // Update button visibility
        const nextBtn = this.element.querySelector('[data-action="next"]');
        const submitBtn = this.element.querySelector('[data-action="submit"]');
        
        if (stepName === 'cnp-reason' || stepName === 'picked-status' || stepName === 'next-action') {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'inline-flex';
        } else {
            nextBtn.style.display = 'inline-flex';
            submitBtn.style.display = 'none';
        }
    }

    handleSubmit() {
        const callData = {
            lead: this.config.lead,
            outcome: this.selectedOutcome,
            date: new Date().toISOString()
        };
        
        if (this.selectedOutcome === 'cnp') {
            const reason = this.element.querySelector('#cnp-reason').value;
            callData.reason = reason;
        } else if (this.selectedOutcome === 'picked') {
            const status = this.element.querySelector('#picked-status').value;
            callData.status_change = status;
            
            if (status === 'Interested') {
                const interestLevel = this.element.querySelector('#interest-level').value;
                const nextAction = this.element.querySelector('#next-action').value;
                const nextCallDate = this.element.querySelector('#next-call-date').value;
                
                callData.interest_level = parseInt(interestLevel);
                callData.next_action = nextAction;
                callData.next_call_date = nextCallDate;
            }
        }
        
        this.config.onCallOutcome(callData);
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
window.CallModal = CallModal;
