/**
 * LeadsPage Component
 * Main page for lead management with filters, table, and pagination
 */

class LeadsPage {
    constructor(config = {}) {
        this.config = {
            user: config.user || null,
            onLeadClick: config.onLeadClick || (() => {}),
            onAddLead: config.onAddLead || (() => {}),
            ...config
        };
        
        this.element = null;
        this.searchInput = null;
        this.statusFilter = null;
        this.sourceFilter = null;
        this.dateFilter = null;
        this.leadsTable = null;
        this.paginationBar = null;
        this.filteredLeads = [];
        this.currentPage = 1;
        this.itemsPerPage = 10;
        
        // Filter states
        this.filters = {
            search: '',
            status: '',
            source: '',
            startDate: '',
            endDate: ''
        };
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'leads-page';
        this.element.setAttribute('data-testid', 'leads-page');
        
        // Page header
        const header = this.createPageHeader();
        this.element.appendChild(header);
        
        // Filters section
        const filtersSection = this.createFiltersSection();
        this.element.appendChild(filtersSection);
        
        // Table section
        const tableSection = this.createTableSection();
        this.element.appendChild(tableSection);
        
        // Pagination section
        const paginationSection = this.createPaginationSection();
        this.element.appendChild(paginationSection);
        
        return this.element;
    }

    createPageHeader() {
        const header = document.createElement('div');
        header.className = 'leads-page__header';
        
        const title = document.createElement('h1');
        title.className = 'leads-page__title';
        title.textContent = 'Leads Management';
        
        const addButton = document.createElement('button');
        addButton.className = 'leads-page__add-btn';
        addButton.innerHTML = '+ Add Lead';
        addButton.setAttribute('data-testid', 'add-lead-btn');
        
        addButton.addEventListener('click', () => {
            this.config.onAddLead();
        });
        
        header.appendChild(title);
        header.appendChild(addButton);
        
        return header;
    }

    createFiltersSection() {
        const filtersSection = document.createElement('div');
        filtersSection.className = 'leads-page__filters';
        
        // Search input
        this.searchInput = new window.SearchInput({
            placeholder: 'Search leads...',
            onSearch: (value) => this.handleSearch(value),
            onClear: () => this.handleSearch('')
        });
        
        // Status filter
        this.statusFilter = new window.DropdownFilter({
            label: 'Status',
            testId: 'filter-status',
            options: [
                { value: 'New', label: 'New' },
                { value: 'In Progress', label: 'In Progress' },
                { value: 'CNP', label: 'CNP' },
                { value: 'Interested-3', label: 'Exploring' },
                { value: 'Interested-4', label: 'Hot Lead' },
                { value: 'Interested-5', label: 'Hot Lead' },
                { value: 'Converted', label: 'Converted' },
                { value: 'Lost', label: 'Dropped' }
            ],
            onChange: (value) => this.handleStatusFilter(value)
        });
        
        // Source filter
        this.sourceFilter = new window.DropdownFilter({
            label: 'Source',
            testId: 'filter-source',
            options: [
                { value: 'Facebook', label: 'Facebook' },
                { value: 'Website', label: 'Website' },
                { value: 'Google', label: 'Google' },
                { value: 'Referral', label: 'Referral' }
            ],
            onChange: (value) => this.handleSourceFilter(value)
        });
        
        // Date filter
        this.dateFilter = new window.DateFilter({
            label: 'Date Range',
            testId: 'date-filter',
            onChange: (dates) => this.handleDateFilter(dates)
        });
        
        filtersSection.appendChild(this.searchInput.render());
        filtersSection.appendChild(this.statusFilter.render());
        filtersSection.appendChild(this.sourceFilter.render());
        filtersSection.appendChild(this.dateFilter.render());
        
        return filtersSection;
    }

    createTableSection() {
        const tableSection = document.createElement('div');
        tableSection.className = 'leads-page__table-section';
        
        // Initialize with all leads
        this.filteredLeads = window.mockLeads || [];
        
        this.leadsTable = new window.LeadsTable({
            leads: this.getPaginatedLeads(),
            onLeadClick: (lead) => this.config.onLeadClick(lead),
            onStatusChange: (lead, newStatus) => this.handleStatusChange(lead, newStatus)
        });
        
        tableSection.appendChild(this.leadsTable.render());
        
        return tableSection;
    }

    createPaginationSection() {
        const paginationSection = document.createElement('div');
        paginationSection.className = 'leads-page__pagination';
        
        this.paginationBar = new window.PaginationBar({
            currentPage: this.currentPage,
            totalPages: Math.ceil(this.filteredLeads.length / this.itemsPerPage),
            totalItems: this.filteredLeads.length,
            itemsPerPage: this.itemsPerPage,
            onPageChange: (page) => this.handlePageChange(page)
        });
        
        paginationSection.appendChild(this.paginationBar.render());
        
        return paginationSection;
    }

    handleSearch(value) {
        this.filters.search = value.toLowerCase();
        this.applyFilters();
    }

    handleStatusFilter(value) {
        this.filters.status = value;
        this.applyFilters();
    }

    handleSourceFilter(value) {
        this.filters.source = value;
        this.applyFilters();
    }

    handleDateFilter(dates) {
        this.filters.startDate = dates.startDate;
        this.filters.endDate = dates.endDate;
        this.applyFilters();
    }

    handlePageChange(page) {
        this.currentPage = page;
        this.updateTable();
    }

    handleStatusChange(lead, newStatus) {
        // Update lead status in mock data
        const leadIndex = window.mockLeads.findIndex(l => l.id === lead.id);
        if (leadIndex !== -1) {
            window.mockLeads[leadIndex].status = newStatus;
            window.mockLeads[leadIndex].lastUpdated = new Date().toISOString();
        }
        
        // Reapply filters and update table
        this.applyFilters();
        
        // Notify parent component
        this.config.onStatusChange && this.config.onStatusChange(lead, newStatus);
    }

    applyFilters() {
        let filtered = window.mockLeads || [];
        
        // Apply search filter
        if (this.filters.search) {
            filtered = filtered.filter(lead => 
                lead.name.toLowerCase().includes(this.filters.search) ||
                lead.phone.includes(this.filters.search) ||
                (lead.email && lead.email.toLowerCase().includes(this.filters.search)) ||
                (lead.company && lead.company.toLowerCase().includes(this.filters.search))
            );
        }
        
        // Apply status filter
        if (this.filters.status) {
            filtered = filtered.filter(lead => lead.status === this.filters.status);
        }
        
        // Apply source filter
        if (this.filters.source) {
            filtered = filtered.filter(lead => lead.source === this.filters.source);
        }
        
        // Apply date filter
        if (this.filters.startDate || this.filters.endDate) {
            filtered = filtered.filter(lead => {
                const leadDate = new Date(lead.lastUpdated);
                const startDate = this.filters.startDate ? new Date(this.filters.startDate) : null;
                const endDate = this.filters.endDate ? new Date(this.filters.endDate) : null;
                
                if (startDate && leadDate < startDate) return false;
                if (endDate && leadDate > endDate) return false;
                
                return true;
            });
        }
        
        this.filteredLeads = filtered;
        this.currentPage = 1; // Reset to first page when filters change
        this.updateTable();
    }

    getPaginatedLeads() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.filteredLeads.slice(startIndex, endIndex);
    }

    updateTable() {
        if (this.leadsTable) {
            this.leadsTable.updateLeads(this.getPaginatedLeads());
        }
        
        if (this.paginationBar) {
            this.paginationBar.updatePagination(
                this.currentPage,
                Math.ceil(this.filteredLeads.length / this.itemsPerPage),
                this.filteredLeads.length
            );
        }
    }

    updateUserInfo(userInfo) {
        this.config.user = { ...this.config.user, ...userInfo };
        // Re-render if needed
        this.render();
    }

  render() {
    if (!this.element) {
      this.createElement();
    }
    return this.element;
  }

  getElement() {
    if (!this.element) {
      this.createElement();
    }
    return this.element;
  }

    destroy() {
        if (this.searchInput) this.searchInput.destroy();
        if (this.statusFilter) this.statusFilter.destroy();
        if (this.sourceFilter) this.sourceFilter.destroy();
        if (this.dateFilter) this.dateFilter.destroy();
        if (this.leadsTable) this.leadsTable.destroy();
        if (this.paginationBar) this.paginationBar.destroy();
        
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Export for use in other components
window.LeadsPage = LeadsPage;
