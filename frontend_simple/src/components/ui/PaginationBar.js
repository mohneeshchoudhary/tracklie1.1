/**
 * PaginationBar Component
 * Pagination controls for table data
 */

class PaginationBar {
    constructor(config = {}) {
        this.config = {
            currentPage: config.currentPage || 1,
            totalPages: config.totalPages || 1,
            totalItems: config.totalItems || 0,
            itemsPerPage: config.itemsPerPage || 10,
            onPageChange: config.onPageChange || (() => {}),
            showInfo: config.showInfo !== false,
            ...config
        };
        
        this.element = null;
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'pagination-bar';
        this.element.setAttribute('data-testid', 'pagination-bar');
        
        // Info section
        if (this.config.showInfo) {
            const info = document.createElement('div');
            info.className = 'pagination-bar__info';
            info.textContent = this.getInfoText();
            this.element.appendChild(info);
        }
        
        // Controls section
        const controls = document.createElement('div');
        controls.className = 'pagination-bar__controls';
        
        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.className = 'pagination-bar__btn pagination-bar__btn--prev';
        prevBtn.innerHTML = '← Previous';
        prevBtn.disabled = this.config.currentPage <= 1;
        prevBtn.setAttribute('data-testid', 'pagination-prev');
        
        // Page numbers
        const pageNumbers = document.createElement('div');
        pageNumbers.className = 'pagination-bar__pages';
        
        const pages = this.getPageNumbers();
        pages.forEach(page => {
            const pageBtn = document.createElement('button');
            pageBtn.className = 'pagination-bar__btn pagination-bar__btn--page';
            pageBtn.textContent = page;
            pageBtn.setAttribute('data-testid', `pagination-page-${page}`);
            
            if (page === this.config.currentPage) {
                pageBtn.classList.add('pagination-bar__btn--active');
            }
            
            if (page === '...') {
                pageBtn.disabled = true;
                pageBtn.classList.add('pagination-bar__btn--disabled');
            }
            
            pageNumbers.appendChild(pageBtn);
        });
        
        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.className = 'pagination-bar__btn pagination-bar__btn--next';
        nextBtn.innerHTML = 'Next →';
        nextBtn.disabled = this.config.currentPage >= this.config.totalPages;
        nextBtn.setAttribute('data-testid', 'pagination-next');
        
        controls.appendChild(prevBtn);
        controls.appendChild(pageNumbers);
        controls.appendChild(nextBtn);
        
        this.element.appendChild(controls);
        
        // Event listeners
        prevBtn.addEventListener('click', () => this.goToPage(this.config.currentPage - 1));
        nextBtn.addEventListener('click', () => this.goToPage(this.config.currentPage + 1));
        
        // Page number clicks
        pageNumbers.addEventListener('click', (e) => {
            const pageBtn = e.target.closest('.pagination-bar__btn--page');
            if (pageBtn && !pageBtn.disabled) {
                const page = parseInt(pageBtn.textContent);
                if (!isNaN(page)) {
                    this.goToPage(page);
                }
            }
        });
        
        return this.element;
    }

    getInfoText() {
        const start = (this.config.currentPage - 1) * this.config.itemsPerPage + 1;
        const end = Math.min(this.config.currentPage * this.config.itemsPerPage, this.config.totalItems);
        return `Showing ${start}-${end} of ${this.config.totalItems} leads`;
    }

    getPageNumbers() {
        const current = this.config.currentPage;
        const total = this.config.totalPages;
        const pages = [];
        
        if (total <= 7) {
            // Show all pages if 7 or fewer
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);
            
            if (current <= 4) {
                // Show first 5 pages + ellipsis + last page
                for (let i = 2; i <= 5; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(total);
            } else if (current >= total - 3) {
                // Show first page + ellipsis + last 5 pages
                pages.push('...');
                for (let i = total - 4; i <= total; i++) {
                    pages.push(i);
                }
            } else {
                // Show first page + ellipsis + current-1, current, current+1 + ellipsis + last page
                pages.push('...');
                for (let i = current - 1; i <= current + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(total);
            }
        }
        
        return pages;
    }

    goToPage(page) {
        if (page >= 1 && page <= this.config.totalPages && page !== this.config.currentPage) {
            this.config.currentPage = page;
            this.config.onPageChange(page);
            this.render();
        }
    }

    updatePagination(currentPage, totalPages, totalItems) {
        this.config.currentPage = currentPage;
        this.config.totalPages = totalPages;
        this.config.totalItems = totalItems;
        this.render();
    }

    render() {
        if (!this.element) {
            this.createElement();
        } else {
            // Update existing element
            this.element.innerHTML = '';
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
window.PaginationBar = PaginationBar;
