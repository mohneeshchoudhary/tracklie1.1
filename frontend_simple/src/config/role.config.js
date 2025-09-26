/**
 * Role Configuration for Tracklie CRM
 * Defines role-based permissions and access control
 */

// Role definitions
const USER_ROLES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    TEAM_LEAD: 'TEAM_LEAD',
    SALESPERSON: 'SALESPERSON',
    RECOVERY_AGENT: 'RECOVERY_AGENT',
    FINANCE_MANAGER: 'FINANCE_MANAGER',
    ANALYST: 'ANALYST'
};

// Role hierarchy (higher roles inherit permissions from lower roles)
const ROLE_HIERARCHY = {
    [USER_ROLES.SUPER_ADMIN]: 8,
    [USER_ROLES.ADMIN]: 7,
    [USER_ROLES.MANAGER]: 6,
    [USER_ROLES.TEAM_LEAD]: 5,
    [USER_ROLES.SALESPERSON]: 4,
    [USER_ROLES.RECOVERY_AGENT]: 3,
    [USER_ROLES.FINANCE_MANAGER]: 2,
    [USER_ROLES.ANALYST]: 1
};

// Available pages/routes
const PAGES = {
    HOME: 'home',
    DASHBOARD: 'dashboard',
    LEADS: 'leads',
    FOLLOWUPS: 'followups',
    PAYMENTS: 'payments',
    REPORTS: 'reports',
    SETTINGS: 'settings',
    USERS: 'users'
};

// Role-based page access permissions
const ROLE_PERMISSIONS = {
    [USER_ROLES.SUPER_ADMIN]: {
        pages: Object.values(PAGES), // All pages
        description: 'Full system access',
        dashboard: 'admin'
    },
    [USER_ROLES.ADMIN]: {
        pages: [PAGES.HOME, PAGES.DASHBOARD, PAGES.LEADS, PAGES.FOLLOWUPS, PAGES.PAYMENTS, PAGES.REPORTS],
        description: 'Administrative access to core features',
        dashboard: 'admin'
    },
    [USER_ROLES.MANAGER]: {
        pages: [PAGES.HOME, PAGES.DASHBOARD, PAGES.LEADS, PAGES.FOLLOWUPS, PAGES.PAYMENTS, PAGES.REPORTS],
        description: 'Team management and oversight',
        dashboard: 'manager'
    },
    [USER_ROLES.TEAM_LEAD]: {
        pages: [PAGES.HOME, PAGES.DASHBOARD, PAGES.LEADS, PAGES.FOLLOWUPS, PAGES.PAYMENTS],
        description: 'Team leadership with limited access',
        dashboard: 'team_lead'
    },
    [USER_ROLES.SALESPERSON]: {
        pages: [PAGES.HOME, PAGES.DASHBOARD, PAGES.LEADS, PAGES.FOLLOWUPS],
        description: 'Sales operations and lead management',
        dashboard: 'sales'
    },
    [USER_ROLES.RECOVERY_AGENT]: {
        pages: [PAGES.HOME, PAGES.DASHBOARD, PAGES.PAYMENTS],
        description: 'Payment recovery and collection',
        dashboard: 'recovery'
    },
    [USER_ROLES.FINANCE_MANAGER]: {
        pages: [PAGES.HOME, PAGES.DASHBOARD, PAGES.PAYMENTS, PAGES.REPORTS],
        description: 'Financial oversight and reporting',
        dashboard: 'finance'
    },
    [USER_ROLES.ANALYST]: {
        pages: [PAGES.HOME, PAGES.DASHBOARD, PAGES.REPORTS],
        description: 'Data analysis and reporting (read-only)',
        dashboard: 'analyst'
    }
};

// Navigation items configuration
const NAVIGATION_ITEMS = [
    {
        id: PAGES.HOME,
        label: 'Home',
        icon: 'home',
        path: '#home',
        badge: null
    },
    {
        id: PAGES.DASHBOARD,
        label: 'Dashboard',
        icon: 'dashboard',
        path: '#dashboard',
        badge: null
    },
    {
        id: PAGES.LEADS,
        label: 'Leads',
        icon: 'leads',
        path: '#leads',
        badge: '12' // Mock badge count
    },
    {
        id: PAGES.FOLLOWUPS,
        label: 'Follow-ups',
        icon: 'followups',
        path: '#followups',
        badge: '5'
    },
    {
        id: PAGES.PAYMENTS,
        label: 'Payments',
        icon: 'payments',
        path: '#payments',
        badge: '8'
    },
    {
        id: PAGES.REPORTS,
        label: 'Reports',
        icon: 'reports',
        path: '#reports',
        badge: null
    }
];

// Dashboard widget configurations for each role
const DASHBOARD_WIDGETS = {
    admin: [
        { id: 'total_leads', title: 'Total Leads', value: '1,247', trend: '+12%', color: 'primary' },
        { id: 'conversion_rate', title: 'Conversion Rate', value: '23.4%', trend: '+2.1%', color: 'success' },
        { id: 'team_performance', title: 'Team Performance', value: '94%', trend: '+5%', color: 'info' },
        { id: 'revenue', title: 'Monthly Revenue', value: '₹2.4M', trend: '+18%', color: 'warning' },
        { id: 'active_users', title: 'Active Users', value: '24', trend: '+3', color: 'secondary' },
        { id: 'system_health', title: 'System Health', value: '99.9%', trend: 'stable', color: 'success' }
    ],
    manager: [
        { id: 'team_leads', title: 'Team Leads', value: '456', trend: '+8%', color: 'primary' },
        { id: 'team_conversion', title: 'Team Conversion', value: '26.1%', trend: '+1.8%', color: 'success' },
        { id: 'team_performance', title: 'Team Performance', value: '91%', trend: '+3%', color: 'info' },
        { id: 'team_revenue', title: 'Team Revenue', value: '₹1.2M', trend: '+15%', color: 'warning' },
        { id: 'pending_followups', title: 'Pending Follow-ups', value: '23', trend: '-5', color: 'secondary' },
        { id: 'team_attendance', title: 'Team Attendance', value: '96%', trend: '+2%', color: 'success' }
    ],
    team_lead: [
        { id: 'team_leads', title: 'Team Leads', value: '234', trend: '+6%', color: 'primary' },
        { id: 'team_conversion', title: 'Team Conversion', value: '28.3%', trend: '+2.2%', color: 'success' },
        { id: 'pending_followups', title: 'Pending Follow-ups', value: '12', trend: '-3', color: 'secondary' },
        { id: 'team_revenue', title: 'Team Revenue', value: '₹680K', trend: '+12%', color: 'warning' },
        { id: 'team_attendance', title: 'Team Attendance', value: '98%', trend: '+1%', color: 'success' }
    ],
    sales: [
        { id: 'my_leads', title: 'My Leads', value: '89', trend: '+15%', color: 'primary' },
        { id: 'conversion_rate', title: 'My Conversion', value: '31.2%', trend: '+3.1%', color: 'success' },
        { id: 'followups_due', title: 'Follow-ups Due', value: '7', trend: '-2', color: 'warning' },
        { id: 'monthly_target', title: 'Monthly Target', value: '85%', trend: '+8%', color: 'info' },
        { id: 'revenue_generated', title: 'Revenue Generated', value: '₹340K', trend: '+22%', color: 'success' }
    ],
    recovery: [
        { id: 'total_payments', title: 'Total Payments', value: '156', trend: '+8%', color: 'primary' },
        { id: 'overdue_amount', title: 'Overdue Amount', value: '₹2.1M', trend: '-12%', color: 'warning' },
        { id: 'recovery_rate', title: 'Recovery Rate', value: '78.4%', trend: '+5.2%', color: 'success' },
        { id: 'pending_collections', title: 'Pending Collections', value: '23', trend: '-4', color: 'secondary' },
        { id: 'monthly_target', title: 'Monthly Target', value: '92%', trend: '+6%', color: 'info' }
    ],
    finance: [
        { id: 'total_revenue', title: 'Total Revenue', value: '₹4.2M', trend: '+18%', color: 'success' },
        { id: 'pending_payments', title: 'Pending Payments', value: '67', trend: '-8', color: 'warning' },
        { id: 'collection_rate', title: 'Collection Rate', value: '89.3%', trend: '+2.1%', color: 'info' },
        { id: 'monthly_target', title: 'Monthly Target', value: '105%', trend: '+12%', color: 'success' },
        { id: 'outstanding_amount', title: 'Outstanding Amount', value: '₹1.8M', trend: '-15%', color: 'secondary' }
    ],
    analyst: [
        { id: 'data_accuracy', title: 'Data Accuracy', value: '99.2%', trend: '+0.3%', color: 'success' },
        { id: 'reports_generated', title: 'Reports Generated', value: '45', trend: '+12', color: 'info' },
        { id: 'trend_analysis', title: 'Trend Analysis', value: 'Positive', trend: 'stable', color: 'success' },
        { id: 'data_quality', title: 'Data Quality Score', value: '94.7%', trend: '+1.2%', color: 'primary' }
    ]
};

// Helper functions
const RoleUtils = {
    /**
     * Check if user has access to a specific page
     */
    hasPageAccess(userRole, pageId) {
        const permissions = ROLE_PERMISSIONS[userRole];
        return permissions && permissions.pages.includes(pageId);
    },

    /**
     * Get allowed pages for a role
     */
    getAllowedPages(userRole) {
        if (!userRole) {
            // For unauthenticated users, only allow Home and Dashboard
            return [PAGES.HOME, PAGES.DASHBOARD];
        }
        const permissions = ROLE_PERMISSIONS[userRole];
        if (permissions) {
            // For authenticated users, exclude Home page
            return permissions.pages.filter(page => page !== PAGES.HOME);
        }
        return [];
    },

    /**
     * Get navigation items for a role
     */
    getNavigationItems(userRole) {
        const allowedPages = this.getAllowedPages(userRole);
        return NAVIGATION_ITEMS.filter(item => allowedPages.includes(item.id));
    },

    /**
     * Get dashboard widgets for a role
     */
    getDashboardWidgets(userRole) {
        const permissions = ROLE_PERMISSIONS[userRole];
        const dashboardType = permissions ? permissions.dashboard : 'analyst';
        return DASHBOARD_WIDGETS[dashboardType] || DASHBOARD_WIDGETS.analyst;
    },

    /**
     * Get role description
     */
    getRoleDescription(userRole) {
        const permissions = ROLE_PERMISSIONS[userRole];
        return permissions ? permissions.description : 'Limited access';
    },

    /**
     * Check if role has higher hierarchy than another
     */
    hasHigherRole(role1, role2) {
        return ROLE_HIERARCHY[role1] > ROLE_HIERARCHY[role2];
    },

    /**
     * Get role display name
     */
    getRoleDisplayName(userRole) {
        const roleNames = {
            [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
            [USER_ROLES.ADMIN]: 'Admin',
            [USER_ROLES.MANAGER]: 'Manager',
            [USER_ROLES.TEAM_LEAD]: 'Team Lead',
            [USER_ROLES.SALESPERSON]: 'Salesperson',
            [USER_ROLES.RECOVERY_AGENT]: 'Recovery Agent',
            [USER_ROLES.FINANCE_MANAGER]: 'Finance Manager',
            [USER_ROLES.ANALYST]: 'Analyst'
        };
        return roleNames[userRole] || userRole;
    }
};

// Make configuration available globally
window.USER_ROLES = USER_ROLES;
window.ROLE_HIERARCHY = ROLE_HIERARCHY;
window.PAGES = PAGES;
window.ROLE_PERMISSIONS = ROLE_PERMISSIONS;
window.NAVIGATION_ITEMS = NAVIGATION_ITEMS;
window.DASHBOARD_WIDGETS = DASHBOARD_WIDGETS;
window.RoleUtils = RoleUtils;
