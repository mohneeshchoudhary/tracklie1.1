/**
 * Leads service for API communication
 */
class LeadsService {
    constructor() {
        this.baseURL = 'http://localhost:8000';
        this.authService = window.AuthService;
    }

    /**
     * Get all leads with pagination and filtering
     */
    async getLeads(params = {}) {
        try {
            const queryParams = new URLSearchParams();
            
            // Add pagination
            if (params.page) queryParams.append('page', params.page);
            if (params.per_page) queryParams.append('per_page', params.per_page);
            
            // Add filters
            if (params.status) queryParams.append('status', params.status);
            if (params.source) queryParams.append('source', params.source);
            if (params.search) queryParams.append('search', params.search);
            if (params.start_date) queryParams.append('start_date', params.start_date);
            if (params.end_date) queryParams.append('end_date', params.end_date);

            const url = `${this.baseURL}/leads/?${queryParams.toString()}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching leads:', error);
            // Fallback to mock data for demo purposes
            return this.getMockLeads(params);
        }
    }

    /**
     * Get a specific lead by ID
     */
    async getLead(leadId) {
        try {
            const response = await fetch(`${this.baseURL}/leads/${leadId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching lead:', error);
            // Fallback to mock data
            return this.getMockLeadById(leadId);
        }
    }

    /**
     * Create a new lead
     */
    async createLead(leadData) {
        try {
            const response = await fetch(`${this.baseURL}/leads/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include',
                body: JSON.stringify(leadData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to create lead');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating lead:', error);
            // Fallback to mock creation
            return this.createMockLead(leadData);
        }
    }

    /**
     * Update an existing lead
     */
    async updateLead(leadId, leadData) {
        try {
            const response = await fetch(`${this.baseURL}/leads/${leadId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include',
                body: JSON.stringify(leadData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to update lead');
            }

            return await response.json();
        } catch (error) {
            console.error('Error updating lead:', error);
            // Fallback to mock update
            return this.updateMockLead(leadId, leadData);
        }
    }

    /**
     * Delete a lead
     */
    async deleteLead(leadId) {
        try {
            const response = await fetch(`${this.baseURL}/leads/${leadId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to delete lead');
            }

            return await response.json();
        } catch (error) {
            console.error('Error deleting lead:', error);
            // Fallback to mock deletion
            return this.deleteMockLead(leadId);
        }
    }

    /**
     * Get lead statistics
     */
    async getLeadStats() {
        try {
            const response = await fetch(`${this.baseURL}/leads/stats/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Error fetching lead stats:', error);
            // Fallback to mock stats
            return this.getMockLeadStats();
        }
    }

    /**
     * Create lead via webhook (external API)
     */
    async createWebhookLead(leadData, apiKey) {
        try {
            const response = await fetch(`${this.baseURL}/leads/webhook/?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(leadData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to create webhook lead');
            }

            return await response.json();
        } catch (error) {
            console.error('Error creating webhook lead:', error);
            throw error;
        }
    }

    // Mock data fallback methods
    getMockLeads(params = {}) {
        const mockLeads = window.tempLeads || window.mockLeads || [];
        let filteredLeads = [...mockLeads];

        // Apply search filter
        if (params.search) {
            const search = params.search.toLowerCase();
            filteredLeads = filteredLeads.filter(lead => 
                lead.name.toLowerCase().includes(search) ||
                lead.phone.includes(search) ||
                (lead.email && lead.email.toLowerCase().includes(search)) ||
                (lead.company && lead.company.toLowerCase().includes(search))
            );
        }

        // Apply status filter
        if (params.status) {
            filteredLeads = filteredLeads.filter(lead => lead.status === params.status);
        }

        // Apply source filter
        if (params.source) {
            filteredLeads = filteredLeads.filter(lead => lead.source === params.source);
        }

        // Apply date filters
        if (params.start_date || params.end_date) {
            filteredLeads = filteredLeads.filter(lead => {
                const leadDate = new Date(lead.created_at);
                const startDate = params.start_date ? new Date(params.start_date) : null;
                const endDate = params.end_date ? new Date(params.end_date) : null;
                
                if (startDate && leadDate < startDate) return false;
                if (endDate && leadDate > endDate) return false;
                
                return true;
            });
        }

        // Apply pagination
        const page = params.page || 1;
        const perPage = params.per_page || 10;
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;
        const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

        return {
            leads: paginatedLeads,
            total: filteredLeads.length,
            page: page,
            per_page: perPage,
            total_pages: Math.ceil(filteredLeads.length / perPage)
        };
    }

    getMockLeadById(leadId) {
        const mockLeads = window.tempLeads || window.mockLeads || [];
        return mockLeads.find(lead => lead.id == leadId);
    }

    createMockLead(leadData) {
        const newLead = {
            id: Date.now().toString(),
            ...leadData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_by: 1,
            assigned_to: null
        };

        // Add to mock data
        if (window.tempLeads) {
            window.tempLeads.unshift(newLead);
        } else if (window.mockLeads) {
            window.mockLeads.unshift(newLead);
        }

        return newLead;
    }

    updateMockLead(leadId, leadData) {
        const mockLeads = window.tempLeads || window.mockLeads || [];
        const index = mockLeads.findIndex(lead => lead.id == leadId);
        
        if (index !== -1) {
            mockLeads[index] = {
                ...mockLeads[index],
                ...leadData,
                updated_at: new Date().toISOString()
            };
            return mockLeads[index];
        }
        
        throw new Error('Lead not found');
    }

    deleteMockLead(leadId) {
        const mockLeads = window.tempLeads || window.mockLeads || [];
        const index = mockLeads.findIndex(lead => lead.id == leadId);
        
        if (index !== -1) {
            mockLeads.splice(index, 1);
            return { message: 'Lead deleted successfully' };
        }
        
        throw new Error('Lead not found');
    }

    getMockLeadStats() {
        const mockLeads = window.tempLeads || window.mockLeads || [];
        
        const stats = {
            total_leads: mockLeads.length,
            new_leads: mockLeads.filter(lead => lead.status === 'New').length,
            in_progress_leads: mockLeads.filter(lead => lead.status === 'In Progress').length,
            interested_leads: mockLeads.filter(lead => lead.status.startsWith('Interested')).length,
            converted_leads: mockLeads.filter(lead => lead.status === 'Converted').length,
            dropped_leads: mockLeads.filter(lead => lead.status === 'Dropped').length,
            leads_by_source: {},
            leads_by_priority: {}
        };

        // Calculate leads by source
        mockLeads.forEach(lead => {
            stats.leads_by_source[lead.source] = (stats.leads_by_source[lead.source] || 0) + 1;
        });

        // Calculate leads by priority
        mockLeads.forEach(lead => {
            stats.leads_by_priority[lead.priority] = (stats.leads_by_priority[lead.priority] || 0) + 1;
        });

        return stats;
    }
}

// Export singleton instance
window.LeadsService = new LeadsService();
