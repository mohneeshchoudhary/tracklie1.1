/**
 * DropdownFilter Component
 * Reusable dropdown for filters (status, source, etc.)
 */

class DropdownFilter {
    constructor(config = {}) {
        this.config = {
            label: config.label || 'Filter',
            options: config.options || [],
            value: config.value || '',
            placeholder: config.placeholder || 'All',
            onChange: config.onChange || (() => {}),
            testId: config.testId || 'dropdown-filter',
            ...config
        };
        
        this.element = null;
        this.isOpen = false;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'dropdown-filter';
        this.element.setAttribute('data-testid', this.config.testId);
        
        // Label
        const label = document.createElement('label');
        label.className = 'dropdown-filter__label';
        label.textContent = this.config.label;
        
        // Dropdown container
        const dropdown = document.createElement('div');
        dropdown.className = 'dropdown-filter__container';
        
        // Selected value display
        const selected = document.createElement('button');
        selected.className = 'dropdown-filter__selected';
        selected.setAttribute('aria-haspopup', 'listbox');
        selected.setAttribute('aria-expanded', 'false');
        
        const selectedText = document.createElement('span');
        selectedText.className = 'dropdown-filter__text';
        selectedText.textContent = this.getSelectedText();
        
        const arrow = document.createElement('span');
        arrow.className = 'dropdown-filter__arrow';
        arrow.innerHTML = '▼';
        
        selected.appendChild(selectedText);
        selected.appendChild(arrow);
        
        // Options list
        const optionsList = document.createElement('ul');
        optionsList.className = 'dropdown-filter__options';
        optionsList.setAttribute('role', 'listbox');
        
        // Add "All" option
        const allOption = this.createOption('', this.config.placeholder);
        optionsList.appendChild(allOption);
        
        // Add other options
        this.config.options.forEach(option => {
            const optionElement = this.createOption(option.value, option.label);
            optionsList.appendChild(optionElement);
        });
        
        dropdown.appendChild(selected);
        dropdown.appendChild(optionsList);
        
        // Assemble
        this.element.appendChild(label);
        this.element.appendChild(dropdown);
        
        // Event listeners
        selected.addEventListener('click', () => this.toggle());
        optionsList.addEventListener('click', (e) => this.handleOptionClick(e));
        
        // Close on outside click
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        return this.element;
    }

    createOption(value, label) {
        const option = document.createElement('li');
        option.className = 'dropdown-filter__option';
        option.setAttribute('data-value', value);
        option.setAttribute('role', 'option');
        option.textContent = label;
        
        if (value === this.config.value) {
            option.classList.add('dropdown-filter__option--selected');
        }
        
        return option;
    }

    getSelectedText() {
        if (!this.config.value) {
            return this.config.placeholder;
        }
        
        const selectedOption = this.config.options.find(opt => opt.value === this.config.value);
        return selectedOption ? selectedOption.label : this.config.placeholder;
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const container = this.element.querySelector('.dropdown-filter__container');
        const selected = this.element.querySelector('.dropdown-filter__selected');
        const arrow = this.element.querySelector('.dropdown-filter__arrow');
        
        if (this.isOpen) {
            container.classList.add('dropdown-filter__container--open');
            selected.setAttribute('aria-expanded', 'true');
            arrow.style.transform = 'rotate(180deg)';
        } else {
            container.classList.remove('dropdown-filter__container--open');
            selected.setAttribute('aria-expanded', 'false');
            arrow.style.transform = 'rotate(0deg)';
        }
    }

    handleOptionClick(e) {
        const option = e.target.closest('.dropdown-filter__option');
        if (!option) return;
        
        const value = option.getAttribute('data-value');
        this.setValue(value);
        this.toggle();
    }

    handleOutsideClick(e) {
        if (!this.element.contains(e.target)) {
            this.close();
        }
    }

    setValue(value) {
        this.config.value = value;
        
        // Update selected text
        const selectedText = this.element.querySelector('.dropdown-filter__text');
        selectedText.textContent = this.getSelectedText();
        
        // Update selected option styling
        const options = this.element.querySelectorAll('.dropdown-filter__option');
        options.forEach(option => {
            option.classList.remove('dropdown-filter__option--selected');
            if (option.getAttribute('data-value') === value) {
                option.classList.add('dropdown-filter__option--selected');
            }
        });
        
        // Trigger onChange
        this.config.onChange(value);
    }

    getValue() {
        return this.config.value;
    }

    close() {
        if (this.isOpen) {
            this.toggle();
        }
    }

    render() {
        if (!this.element) {
            this.createElement();
        }
        return this.element;
    }

    destroy() {
        document.removeEventListener('click', (e) => this.handleOutsideClick(e));
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Export for use in other components
window.DropdownFilter = DropdownFilter;
