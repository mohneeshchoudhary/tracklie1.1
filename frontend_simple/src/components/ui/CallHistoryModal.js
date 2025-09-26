/**
 * CallHistoryModal Component
 * Modal for displaying call history for a lead
 */

class CallHistoryModal {
    constructor(config = {}) {
        this.config = {
            lead: config.lead || null,
            onClose: config.onClose || (() => {}),
            ...config
        };
        
        this.element = null;
    }

    render() {
        this.element = document.createElement('div');
        this.element.className = 'modal call-history-modal';
        this.element.setAttribute('data-testid', 'call-history-modal');
        
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
        title.textContent = `Call History: ${this.config.lead?.name || 'Unknown'}`;
        
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
        body.setAttribute('data-testid', 'call-history-body');
        
        // Call summary
        const summary = this.createCallSummary();
        body.appendChild(summary);
        
        // Call history list
        const historyList = this.createCallHistoryList();
        body.appendChild(historyList);
        
        return body;
    }

    createCallSummary() {
        const summary = document.createElement('div');
        summary.className = 'call-history__summary';
        
        const totalCalls = this.config.lead?.total_calls || 0;
        const successfulCalls = this.config.lead?.successful_calls || 0;
        
        summary.innerHTML = `
            <div class="call-history__stat">
                <div class="call-history__stat-value">${totalCalls}</div>
                <div class="call-history__stat-label">Total Calls</div>
            </div>
            <div class="call-history__stat">
                <div class="call-history__stat-value">${successfulCalls}</div>
                <div class="call-history__stat-label">Successful</div>
            </div>
            <div class="call-history__stat">
                <div class="call-history__stat-value">${totalCalls - successfulCalls}</div>
                <div class="call-history__stat-label">CNP</div>
            </div>
        `;
        
        return summary;
    }

    createCallHistoryList() {
        const container = document.createElement('div');
        container.className = 'call-history__list';
        
        const title = document.createElement('h4');
        title.textContent = 'Call History';
        title.className = 'call-history__list-title';
        
        const list = document.createElement('div');
        list.className = 'call-history__items';
        list.setAttribute('data-testid', 'call-history-items');
        
        const callHistory = this.config.lead?.call_history || [];
        
        if (callHistory.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'call-history__empty';
            emptyState.innerHTML = `
                <div class="call-history__empty-icon">📞</div>
                <div class="call-history__empty-text">No call history available</div>
            `;
            list.appendChild(emptyState);
        } else {
            // Sort by date (newest first)
            const sortedHistory = [...callHistory].sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            );
            
            sortedHistory.forEach(call => {
                const callItem = this.createCallHistoryItem(call);
                list.appendChild(callItem);
            });
        }
        
        container.appendChild(title);
        container.appendChild(list);
        
        return container;
    }

    createCallHistoryItem(call) {
        const item = document.createElement('div');
        item.className = 'call-history__item';
        item.setAttribute('data-testid', 'call-history-item');
        
        const date = new Date(call.date);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        
        let outcomeIcon = '📞';
        let outcomeClass = '';
        let outcomeText = '';
        
        if (call.outcome === 'CNP') {
            outcomeIcon = '❌';
            outcomeClass = 'call-history__outcome--cnp';
            outcomeText = `CNP - ${call.reason}`;
        } else if (call.outcome === 'Picked') {
            outcomeIcon = '✅';
            outcomeClass = 'call-history__outcome--picked';
            outcomeText = `Picked - ${call.status_change}`;
        }
        
        item.innerHTML = `
            <div class="call-history__item-header">
                <div class="call-history__item-date">
                    <div class="call-history__date">${formattedDate}</div>
                    <div class="call-history__time">${formattedTime}</div>
                </div>
                <div class="call-history__item-outcome ${outcomeClass}">
                    <span class="call-history__outcome-icon">${outcomeIcon}</span>
                    <span class="call-history__outcome-text">${outcomeText}</span>
                </div>
            </div>
            <div class="call-history__item-details">
                <div class="call-history__detail">
                    <strong>Made by:</strong> ${call.made_by}
                </div>
                ${call.interest_level ? `
                    <div class="call-history__detail">
                        <strong>Interest Level:</strong> ${call.interest_level}/5
                    </div>
                ` : ''}
                ${call.next_action ? `
                    <div class="call-history__detail">
                        <strong>Next Action:</strong> ${call.next_action}
                    </div>
                ` : ''}
                ${call.next_call_date ? `
                    <div class="call-history__detail">
                        <strong>Next Call:</strong> ${new Date(call.next_call_date).toLocaleString()}
                    </div>
                ` : ''}
            </div>
        `;
        
        return item;
    }

    createFooter() {
        const footer = document.createElement('div');
        footer.className = 'modal__footer';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn btn--primary';
        closeBtn.textContent = 'Close';
        closeBtn.setAttribute('data-action', 'close');
        
        footer.appendChild(closeBtn);
        
        return footer;
    }

    addEventListeners() {
        // Close button
        const closeBtn = this.element.querySelector('[data-action="close"]');
        closeBtn.addEventListener('click', () => this.close());
        
        // Overlay click to close
        const overlay = this.element.querySelector('.modal__overlay');
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                this.close();
            }
        });
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
window.CallHistoryModal = CallHistoryModal;
