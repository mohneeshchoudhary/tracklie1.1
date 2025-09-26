/**
 * DateFilter Component
 * Date range picker for filtering leads by date
 */

class DateFilter {
    constructor(config = {}) {
        this.config = {
            label: config.label || 'Date Range',
            startDate: config.startDate || '',
            endDate: config.endDate || '',
            onChange: config.onChange || (() => {}),
            testId: config.testId || 'date-filter',
            ...config
        };
        
        this.element = null;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'date-filter';
        this.element.setAttribute('data-testid', this.config.testId);
        
        // Label
        const label = document.createElement('label');
        label.className = 'date-filter__label';
        label.textContent = this.config.label;
        
        // Date inputs container
        const inputsContainer = document.createElement('div');
        inputsContainer.className = 'date-filter__inputs';
        
        // Start date input
        const startDateGroup = document.createElement('div');
        startDateGroup.className = 'date-filter__group';
        
        const startLabel = document.createElement('label');
        startLabel.className = 'date-filter__input-label';
        startLabel.textContent = 'From';
        
        const startInput = document.createElement('input');
        startInput.type = 'date';
        startInput.className = 'date-filter__input';
        startInput.value = this.config.startDate;
        startInput.setAttribute('data-testid', 'date-filter-start');
        
        startDateGroup.appendChild(startLabel);
        startDateGroup.appendChild(startInput);
        
        // End date input
        const endDateGroup = document.createElement('div');
        endDateGroup.className = 'date-filter__group';
        
        const endLabel = document.createElement('label');
        endLabel.className = 'date-filter__input-label';
        endLabel.textContent = 'To';
        
        const endInput = document.createElement('input');
        endInput.type = 'date';
        endInput.className = 'date-filter__input';
        endInput.value = this.config.endDate;
        endInput.setAttribute('data-testid', 'date-filter-end');
        
        endDateGroup.appendChild(endLabel);
        endDateGroup.appendChild(endInput);
        
        // Clear button
        const clearBtn = document.createElement('button');
        clearBtn.className = 'date-filter__clear';
        clearBtn.innerHTML = '✕';
        clearBtn.setAttribute('aria-label', 'Clear date filter');
        clearBtn.setAttribute('data-testid', 'date-filter-clear');
        
        inputsContainer.appendChild(startDateGroup);
        inputsContainer.appendChild(endDateGroup);
        inputsContainer.appendChild(clearBtn);
        
        // Assemble
        this.element.appendChild(label);
        this.element.appendChild(inputsContainer);
        
        // Event listeners
        startInput.addEventListener('change', (e) => this.handleDateChange('start', e.target.value));
        endInput.addEventListener('change', (e) => this.handleDateChange('end', e.target.value));
        clearBtn.addEventListener('click', () => this.clearDates());
        
        return this.element;
    }

    handleDateChange(type, value) {
        if (type === 'start') {
            this.config.startDate = value;
            // Update end date min to be after start date
            const endInput = this.element.querySelector('[data-testid="date-filter-end"]');
            if (endInput) {
                endInput.min = value;
            }
        } else {
            this.config.endDate = value;
            // Update start date max to be before end date
            const startInput = this.element.querySelector('[data-testid="date-filter-start"]');
            if (startInput) {
                startInput.max = value;
            }
        }
        
        this.config.onChange({
            startDate: this.config.startDate,
            endDate: this.config.endDate
        });
    }

    clearDates() {
        this.config.startDate = '';
        this.config.endDate = '';
        
        const startInput = this.element.querySelector('[data-testid="date-filter-start"]');
        const endInput = this.element.querySelector('[data-testid="date-filter-end"]');
        
        if (startInput) {
            startInput.value = '';
            startInput.max = '';
        }
        if (endInput) {
            endInput.value = '';
            endInput.min = '';
        }
        
        this.config.onChange({
            startDate: '',
            endDate: ''
        });
    }

    getValue() {
        return {
            startDate: this.config.startDate,
            endDate: this.config.endDate
        };
    }

    setValue(startDate, endDate) {
        this.config.startDate = startDate || '';
        this.config.endDate = endDate || '';
        
        const startInput = this.element.querySelector('[data-testid="date-filter-start"]');
        const endInput = this.element.querySelector('[data-testid="date-filter-end"]');
        
        if (startInput) {
            startInput.value = this.config.startDate;
            if (this.config.endDate) {
                startInput.max = this.config.endDate;
            }
        }
        if (endInput) {
            endInput.value = this.config.endDate;
            if (this.config.startDate) {
                endInput.min = this.config.startDate;
            }
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
window.DateFilter = DateFilter;
