/**
 * SearchInput Component
 * Styled search input with icon
 */

class SearchInput {
    constructor(config = {}) {
        this.config = {
            placeholder: config.placeholder || 'Search leads...',
            value: config.value || '',
            onSearch: config.onSearch || (() => {}),
            onClear: config.onClear || (() => {}),
            debounceMs: config.debounceMs || 300,
            ...config
        };
        
        this.element = null;
        this.searchTimeout = null;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'search-input';
        this.element.setAttribute('data-testid', 'lead-search');
        
        // Search icon
        const searchIcon = document.createElement('div');
        searchIcon.className = 'search-input__icon';
        searchIcon.innerHTML = '🔍';
        
        // Input field
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'search-input__field';
        input.placeholder = this.config.placeholder;
        input.value = this.config.value;
        
        // Clear button
        const clearBtn = document.createElement('button');
        clearBtn.className = 'search-input__clear';
        clearBtn.innerHTML = '✕';
        clearBtn.setAttribute('aria-label', 'Clear search');
        clearBtn.style.display = this.config.value ? 'flex' : 'none';
        
        // Assemble
        this.element.appendChild(searchIcon);
        this.element.appendChild(input);
        this.element.appendChild(clearBtn);
        
        // Event listeners
        input.addEventListener('input', (e) => this.handleInput(e));
        input.addEventListener('keypress', (e) => this.handleKeypress(e));
        clearBtn.addEventListener('click', () => this.handleClear());
        
        return this.element;
    }

    handleInput(e) {
        const value = e.target.value;
        const clearBtn = this.element.querySelector('.search-input__clear');
        
        // Show/hide clear button
        clearBtn.style.display = value ? 'flex' : 'none';
        
        // Debounced search
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.config.onSearch(value);
        }, this.config.debounceMs);
    }

    handleKeypress(e) {
        if (e.key === 'Enter') {
            clearTimeout(this.searchTimeout);
            this.config.onSearch(e.target.value);
        }
    }

    handleClear() {
        const input = this.element.querySelector('.search-input__field');
        const clearBtn = this.element.querySelector('.search-input__clear');
        
        input.value = '';
        clearBtn.style.display = 'none';
        this.config.onClear();
        this.config.onSearch('');
    }

    getValue() {
        const input = this.element.querySelector('.search-input__field');
        return input ? input.value : '';
    }

    setValue(value) {
        const input = this.element.querySelector('.search-input__field');
        const clearBtn = this.element.querySelector('.search-input__clear');
        
        if (input) {
            input.value = value;
            clearBtn.style.display = value ? 'flex' : 'none';
        }
    }

    focus() {
        const input = this.element.querySelector('.search-input__field');
        if (input) {
            input.focus();
        }
    }

    render() {
        if (!this.element) {
            this.createElement();
        }
        return this.element;
    }

    destroy() {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Export for use in other components
window.SearchInput = SearchInput;
