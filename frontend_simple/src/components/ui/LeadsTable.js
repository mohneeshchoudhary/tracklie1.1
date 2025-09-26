/**
 * LeadsTable Component
 * Table displaying leads with sorting and filtering
 */

class LeadsTable {
    constructor(config = {}) {
        this.config = {
            leads: config.leads || [],
            onLeadClick: config.onLeadClick || (() => {}),
            onStatusChange: config.onStatusChange || (() => {}),
            sortBy: config.sortBy || 'lastUpdated',
            sortOrder: config.sortOrder || 'desc',
            ...config
        };
        
        this.element = null;
        this.statusBadges = new Map();
    }

    createElement() {
        this.element = document.createElement('div');
        this.element.className = 'leads-table';
        this.element.setAttribute('data-testid', 'leads-table');
        
        // Table container
        const tableContainer = document.createElement('div');
        tableContainer.className = 'leads-table__container';
        
        // Table
        const table = document.createElement('table');
        table.className = 'leads-table__table';
        
        // Table header
        const thead = this.createTableHeader();
        table.appendChild(thead);
        
        // Table body
        const tbody = this.createTableBody();
        table.appendChild(tbody);
        
        tableContainer.appendChild(table);
        this.element.appendChild(tableContainer);
        
        return this.element;
    }

    createTableHeader() {
        const thead = document.createElement('thead');
        thead.className = 'leads-table__header';
        
        const headerRow = document.createElement('tr');
        headerRow.className = 'leads-table__header-row';
        
        const headers = [
            { key: 'name', label: 'Name', sortable: true },
            { key: 'phone', label: 'Phone', sortable: true },
            { key: 'status', label: 'Status', sortable: true },
            { key: 'interest', label: 'Interest', sortable: false },
            { key: 'calls', label: 'Calls', sortable: false },
            { key: 'assignedTo', label: 'Assigned To', sortable: true },
            { key: 'lastUpdated', label: 'Last Updated', sortable: true },
            { key: 'actions', label: 'Actions', sortable: false }
        ];
        
        headers.forEach(header => {
            const th = document.createElement('th');
            th.className = 'leads-table__header-cell';
            th.setAttribute('data-testid', `table-header-${header.key}`);
            
            const headerContent = document.createElement('div');
            headerContent.className = 'leads-table__header-content';
            
            const label = document.createElement('span');
            label.className = 'leads-table__header-label';
            label.textContent = header.label;
            
            headerContent.appendChild(label);
            
            if (header.sortable) {
                const sortIcon = document.createElement('span');
                sortIcon.className = 'leads-table__sort-icon';
                sortIcon.innerHTML = this.getSortIcon(header.key);
                headerContent.appendChild(sortIcon);
                
                th.addEventListener('click', () => this.handleSort(header.key));
                th.style.cursor = 'pointer';
            }
            
            th.appendChild(headerContent);
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        return thead;
    }

    createTableBody() {
        const tbody = document.createElement('tbody');
        tbody.className = 'leads-table__body';
        
        if (this.config.leads.length === 0) {
            const emptyRow = document.createElement('tr');
            emptyRow.className = 'leads-table__empty-row';
            
            const emptyCell = document.createElement('td');
            emptyCell.className = 'leads-table__empty-cell';
            emptyCell.colSpan = 8;
            emptyCell.setAttribute('data-testid', 'table-empty');
            
            const emptyState = new window.EmptyState({
                title: 'No leads found',
                message: 'There are no leads matching your current filters.',
                icon: '📋',
                showAction: false
            });
            
            emptyCell.appendChild(emptyState.render());
            emptyRow.appendChild(emptyCell);
            tbody.appendChild(emptyRow);
        } else {
            this.config.leads.forEach((lead, index) => {
                const row = this.createLeadRow(lead, index);
                tbody.appendChild(row);
            });
        }
        
        return tbody;
    }

    createLeadRow(lead, index) {
        const row = document.createElement('tr');
        row.className = 'leads-table__row';
        row.setAttribute('data-testid', 'lead-row');
        row.setAttribute('data-lead-id', lead.id);
        
        // Name cell
        const nameCell = document.createElement('td');
        nameCell.className = 'leads-table__cell leads-table__cell--name';
        nameCell.textContent = lead.name;
        
        // Phone cell
        const phoneCell = document.createElement('td');
        phoneCell.className = 'leads-table__cell leads-table__cell--phone';
        phoneCell.textContent = this.maskPhone(lead.phone);
        
        // Status cell with Stage 6 StatusControl
        const statusCell = document.createElement('td');
        statusCell.className = 'leads-table__cell leads-table__cell--status';
        
        const statusControl = new window.StatusControl({
            lead: lead,
            onStatusChange: (lead, newStatus) => {
                this.config.onStatusChange && this.config.onStatusChange(lead, newStatus);
            },
            onStatusSource: (lead, statusChange, source) => {
                this.config.onStatusSource && this.config.onStatusSource(lead, statusChange, source);
            }
        });
        
        statusCell.appendChild(statusControl.render());
        
        // Interest cell with Stage 6 InterestControl
        const interestCell = document.createElement('td');
        interestCell.className = 'leads-table__cell leads-table__cell--interest';
        
        const interestControl = new window.InterestControl({
            lead: lead,
            onInterestChange: (lead, newLevel) => {
                this.config.onInterestChange && this.config.onInterestChange(lead, newLevel);
            },
            onStatusSource: (lead, statusChange, source) => {
                this.config.onStatusSource && this.config.onStatusSource(lead, statusChange, source);
            }
        });
        
        interestCell.appendChild(interestControl.render());
        
        // Calls cell
        const callsCell = document.createElement('td');
        callsCell.className = 'leads-table__cell leads-table__cell--calls';
        
        const totalCalls = lead.total_calls || 0;
        const successfulCalls = lead.successful_calls || 0;
        const callsText = totalCalls > 0 ? `${totalCalls} (${successfulCalls})` : '0';
        
        const callsButton = document.createElement('button');
        callsButton.className = 'leads-table__calls-btn';
        callsButton.textContent = callsText;
        callsButton.title = 'View call history';
        callsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.config.onViewCallHistory && this.config.onViewCallHistory(lead);
        });
        
        callsCell.appendChild(callsButton);
        
        // Assigned To cell
        const assignedCell = document.createElement('td');
        assignedCell.className = 'leads-table__cell leads-table__cell--assigned';
        assignedCell.textContent = lead.assignedTo || 'Unassigned';
        
        // Last Updated cell
        const updatedCell = document.createElement('td');
        updatedCell.className = 'leads-table__cell leads-table__cell--updated';
        updatedCell.textContent = this.formatRelativeTime(lead.lastUpdated);
        
        // Actions cell with Call button
        const actionsCell = document.createElement('td');
        actionsCell.className = 'leads-table__cell leads-table__cell--actions';
        
        const callButton = document.createElement('button');
        callButton.className = 'leads-table__call-btn';
        callButton.innerHTML = 'Call 📞';
        callButton.title = 'Make a call';
        callButton.setAttribute('data-testid', 'call-btn');
        callButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.config.onCallLead && this.config.onCallLead(lead);
        });
        
        actionsCell.appendChild(callButton);
        
        // Assemble row
        row.appendChild(nameCell);
        row.appendChild(phoneCell);
        row.appendChild(statusCell);
        row.appendChild(interestCell);
        row.appendChild(callsCell);
        row.appendChild(assignedCell);
        row.appendChild(updatedCell);
        row.appendChild(actionsCell);
        
        // Add click handler
        row.addEventListener('click', () => {
            this.config.onLeadClick(lead);
        });
        
        return row;
    }

    getStatusType(status) {
        const statusMap = {
            'New': 'new',
            'In Progress': 'in-progress',
            'CNP': 'cnp',
            'Interested-3': 'interested-3',
            'Interested-4': 'interested-4',
            'Interested-5': 'interested-5',
            'Converted': 'converted',
            'Lost': 'lost'
        };
        return statusMap[status] || 'new';
    }

    getStatusLabel(status) {
        const labelMap = {
            'New': 'New',
            'In Progress': 'In Progress',
            'CNP': 'CNP',
            'Interested-3': 'Exploring',
            'Interested-4': 'Hot Lead',
            'Interested-5': 'Hot Lead',
            'Converted': 'Converted',
            'Lost': 'Dropped'
        };
        return labelMap[status] || 'New';
    }

    maskPhone(phone) {
        if (!phone) return '';
        // Show first 3 and last 3 digits, mask the middle
        if (phone.length >= 6) {
            return phone.substring(0, 3) + 'XXXXXX' + phone.substring(phone.length - 3);
        }
        return phone;
    }

    formatRelativeTime(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        
        return date.toLocaleDateString();
    }

    getSortIcon(column) {
        if (this.config.sortBy === column) {
            return this.config.sortOrder === 'asc' ? '↑' : '↓';
        }
        return '↕';
    }

    handleSort(column) {
        if (this.config.sortBy === column) {
            this.config.sortOrder = this.config.sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            this.config.sortBy = column;
            this.config.sortOrder = 'asc';
        }
        
        // Re-render table with new sort
        this.render();
    }

    updateLeads(leads) {
        this.config.leads = leads;
        this.render();
    }

    render() {
        if (!this.element) {
            this.createElement();
        } else {
            // Update existing table
            const tbody = this.element.querySelector('.leads-table__body');
            if (tbody) {
                tbody.remove();
            }
            
            const table = this.element.querySelector('.leads-table__table');
            const newTbody = this.createTableBody();
            table.appendChild(newTbody);
        }
        return this.element;
    }

    destroy() {
        // Clean up status badges
        this.statusBadges.forEach(badge => badge.destroy());
        this.statusBadges.clear();
        
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        this.element = null;
    }
}

// Export for use in other components
window.LeadsTable = LeadsTable;
