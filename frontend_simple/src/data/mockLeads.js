/**
 * Mock Leads Data
 * 50 leads with different sources, statuses, and details
 */

const mockLeads = [
    // Full details leads
    {
        id: 1,
        name: 'Priya Sharma',
        phone: '9876543210',
        email: 'priya.sharma@email.com',
        company: 'Tech Solutions Pvt Ltd',
        status: 'Interested-4',
        source: 'Facebook',
        assignedTo: 'Rishab Kumar',
        budget: 50000,
        language: 'Hindi',
        notes: 'Very interested in premium package. Follow up next week.',
        lastUpdated: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
        id: 2,
        name: 'Amit Patel',
        phone: '9123456789',
        email: 'amit.patel@company.com',
        company: 'Patel Industries',
        status: 'New',
        source: 'Website',
        assignedTo: 'Sneha Singh',
        budget: 25000,
        language: 'English',
        notes: 'Looking for basic package. Budget conscious.',
        lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 3,
        name: 'Rajesh Kumar',
        phone: '9988776655',
        email: 'rajesh.kumar@business.com',
        company: 'Kumar Enterprises',
        status: 'In Progress',
        source: 'Google',
        assignedTo: 'Vikram Singh',
        budget: 75000,
        language: 'Hindi',
        notes: 'Enterprise client. Needs custom solution.',
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    },
    {
        id: 4,
        name: 'Sunita Gupta',
        phone: '9871234567',
        email: 'sunita.gupta@email.com',
        company: 'Gupta & Associates',
        status: 'Converted',
        source: 'Referral',
        assignedTo: 'Rishab Kumar',
        budget: 40000,
        language: 'Hindi',
        notes: 'Converted to premium package. Very satisfied.',
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
    },
    {
        id: 5,
        name: 'Vikram Singh',
        phone: '9123456780',
        email: 'vikram.singh@tech.com',
        company: 'Singh Technologies',
        status: 'Interested-3',
        source: 'Facebook',
        assignedTo: 'Sneha Singh',
        budget: 30000,
        language: 'English',
        notes: 'Considering multiple options. Needs comparison.',
        lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    
    // Partial details leads
    {
        id: 6,
        name: 'Anita Mehta',
        phone: '9876543211',
        status: 'New',
        source: 'Website',
        assignedTo: 'Vikram Singh',
        lastUpdated: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 7,
        name: 'Rohit Agarwal',
        phone: '9123456782',
        email: 'rohit.agarwal@email.com',
        status: 'In Progress',
        source: 'Google',
        assignedTo: 'Rishab Kumar',
        budget: 20000,
        lastUpdated: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
    },
    {
        id: 8,
        name: 'Kavita Joshi',
        phone: '9988776656',
        status: 'CNP',
        source: 'Facebook',
        assignedTo: 'Sneha Singh',
        language: 'Hindi',
        lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
    },
    {
        id: 9,
        name: 'Manish Tiwari',
        phone: '9871234568',
        email: 'manish.tiwari@business.com',
        company: 'Tiwari Group',
        status: 'Interested-5',
        source: 'Referral',
        assignedTo: 'Vikram Singh',
        budget: 60000,
        lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
        id: 10,
        name: 'Pooja Reddy',
        phone: '9123456783',
        status: 'Lost',
        source: 'Website',
        assignedTo: 'Rishab Kumar',
        lastUpdated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString() // 8 days ago
    },
    
    // More leads with various combinations
    {
        id: 11,
        name: 'Arjun Malhotra',
        phone: '9988776657',
        email: 'arjun.malhotra@email.com',
        status: 'New',
        source: 'Google',
        assignedTo: 'Sneha Singh',
        budget: 35000,
        language: 'English',
        lastUpdated: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 12,
        name: 'Deepika Nair',
        phone: '9871234569',
        status: 'In Progress',
        source: 'Facebook',
        assignedTo: 'Vikram Singh',
        language: 'Hindi',
        notes: 'Interested in mobile app development.',
        lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    },
    {
        id: 13,
        name: 'Suresh Iyer',
        phone: '9123456784',
        email: 'suresh.iyer@company.com',
        company: 'Iyer Solutions',
        status: 'Interested-4',
        source: 'Referral',
        assignedTo: 'Rishab Kumar',
        budget: 45000,
        lastUpdated: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
        id: 14,
        name: 'Meera Shah',
        phone: '9988776658',
        status: 'CNP',
        source: 'Website',
        assignedTo: 'Sneha Singh',
        lastUpdated: new Date(Date.now() - 9 * 60 * 60 * 1000).toISOString(), // 9 hours ago
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
    },
    {
        id: 15,
        name: 'Kiran Desai',
        phone: '9871234570',
        email: 'kiran.desai@email.com',
        status: 'Converted',
        source: 'Google',
        assignedTo: 'Vikram Singh',
        budget: 55000,
        language: 'English',
        notes: 'Converted to enterprise package.',
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() // 12 days ago
    },
    
    // Continue with more leads...
    {
        id: 16,
        name: 'Ravi Verma',
        phone: '9123456785',
        status: 'New',
        source: 'Facebook',
        assignedTo: 'Rishab Kumar',
        lastUpdated: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 17,
        name: 'Shilpa Jain',
        phone: '9988776659',
        email: 'shilpa.jain@business.com',
        status: 'Interested-3',
        source: 'Website',
        assignedTo: 'Sneha Singh',
        budget: 28000,
        language: 'Hindi',
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
        id: 18,
        name: 'Gaurav Khanna',
        phone: '9871234571',
        status: 'In Progress',
        source: 'Referral',
        assignedTo: 'Vikram Singh',
        lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
    },
    {
        id: 19,
        name: 'Neha Agarwal',
        phone: '9123456786',
        email: 'neha.agarwal@email.com',
        company: 'Agarwal Industries',
        status: 'Interested-5',
        source: 'Google',
        assignedTo: 'Rishab Kumar',
        budget: 65000,
        language: 'English',
        notes: 'High priority client. Enterprise solution needed.',
        lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
        id: 20,
        name: 'Vikash Kumar',
        phone: '9988776660',
        status: 'Lost',
        source: 'Facebook',
        assignedTo: 'Sneha Singh',
        lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
        createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString() // 9 days ago
    },
    
    // Additional leads to reach 50
    {
        id: 21,
        name: 'Priyanka Singh',
        phone: '9871234572',
        status: 'New',
        source: 'Website',
        assignedTo: 'Vikram Singh',
        lastUpdated: new Date(Date.now() - 20 * 60 * 1000).toISOString(), // 20 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 22,
        name: 'Ajay Sharma',
        phone: '9123456787',
        email: 'ajay.sharma@company.com',
        status: 'In Progress',
        source: 'Referral',
        assignedTo: 'Rishab Kumar',
        budget: 32000,
        language: 'Hindi',
        lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    },
    {
        id: 23,
        name: 'Ritu Patel',
        phone: '9988776661',
        status: 'CNP',
        source: 'Google',
        assignedTo: 'Sneha Singh',
        lastUpdated: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(), // 10 hours ago
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
    },
    {
        id: 24,
        name: 'Sandeep Gupta',
        phone: '9871234573',
        email: 'sandeep.gupta@email.com',
        company: 'Gupta Enterprises',
        status: 'Interested-4',
        source: 'Facebook',
        assignedTo: 'Vikram Singh',
        budget: 48000,
        language: 'English',
        notes: 'Looking for e-commerce solution.',
        lastUpdated: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
        id: 25,
        name: 'Anjali Mehta',
        phone: '9123456788',
        status: 'Converted',
        source: 'Website',
        assignedTo: 'Rishab Kumar',
        budget: 38000,
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() // 11 days ago
    },
    
    // Continue with remaining leads...
    {
        id: 26,
        name: 'Rohit Verma',
        phone: '9988776662',
        status: 'New',
        source: 'Referral',
        assignedTo: 'Sneha Singh',
        lastUpdated: new Date(Date.now() - 25 * 60 * 1000).toISOString(), // 25 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 27,
        name: 'Kavita Nair',
        phone: '9871234574',
        email: 'kavita.nair@business.com',
        status: 'Interested-3',
        source: 'Google',
        assignedTo: 'Vikram Singh',
        budget: 26000,
        language: 'Hindi',
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
        id: 28,
        name: 'Manish Joshi',
        phone: '9123456789',
        status: 'In Progress',
        source: 'Facebook',
        assignedTo: 'Rishab Kumar',
        lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
    },
    {
        id: 29,
        name: 'Pooja Tiwari',
        phone: '9988776663',
        email: 'pooja.tiwari@email.com',
        company: 'Tiwari Solutions',
        status: 'Interested-5',
        source: 'Website',
        assignedTo: 'Sneha Singh',
        budget: 70000,
        language: 'English',
        notes: 'Enterprise client with complex requirements.',
        lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
        id: 30,
        name: 'Arjun Reddy',
        phone: '9871234575',
        status: 'Lost',
        source: 'Referral',
        assignedTo: 'Vikram Singh',
        lastUpdated: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString() // 10 days ago
    },
    
    // Final batch of leads
    {
        id: 31,
        name: 'Deepika Malhotra',
        phone: '9123456790',
        status: 'New',
        source: 'Google',
        assignedTo: 'Rishab Kumar',
        lastUpdated: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 32,
        name: 'Suresh Iyer',
        phone: '9988776664',
        email: 'suresh.iyer@company.com',
        status: 'In Progress',
        source: 'Facebook',
        assignedTo: 'Sneha Singh',
        budget: 29000,
        language: 'Hindi',
        lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    },
    {
        id: 33,
        name: 'Meera Shah',
        phone: '9871234576',
        status: 'CNP',
        source: 'Website',
        assignedTo: 'Vikram Singh',
        lastUpdated: new Date(Date.now() - 11 * 60 * 60 * 1000).toISOString(), // 11 hours ago
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
    },
    {
        id: 34,
        name: 'Kiran Desai',
        phone: '9123456791',
        email: 'kiran.desai@business.com',
        company: 'Desai Group',
        status: 'Interested-4',
        source: 'Referral',
        assignedTo: 'Rishab Kumar',
        budget: 52000,
        language: 'English',
        notes: 'Interested in mobile app development.',
        lastUpdated: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
        id: 35,
        name: 'Ravi Verma',
        phone: '9988776665',
        status: 'Converted',
        source: 'Google',
        assignedTo: 'Sneha Singh',
        budget: 42000,
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        createdAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000).toISOString() // 13 days ago
    },
    
    // Last 15 leads
    {
        id: 36,
        name: 'Shilpa Jain',
        phone: '9871234577',
        status: 'New',
        source: 'Facebook',
        assignedTo: 'Vikram Singh',
        lastUpdated: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 37,
        name: 'Gaurav Khanna',
        phone: '9123456792',
        email: 'gaurav.khanna@email.com',
        status: 'Interested-3',
        source: 'Website',
        assignedTo: 'Rishab Kumar',
        budget: 27000,
        language: 'Hindi',
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
        id: 38,
        name: 'Neha Agarwal',
        phone: '9988776666',
        status: 'In Progress',
        source: 'Referral',
        assignedTo: 'Sneha Singh',
        lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
    },
    {
        id: 39,
        name: 'Vikash Kumar',
        phone: '9871234578',
        email: 'vikash.kumar@company.com',
        company: 'Kumar Technologies',
        status: 'Interested-5',
        source: 'Google',
        assignedTo: 'Vikram Singh',
        budget: 68000,
        language: 'English',
        notes: 'High-value enterprise client.',
        lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
        id: 40,
        name: 'Priyanka Singh',
        phone: '9123456793',
        status: 'Lost',
        source: 'Facebook',
        assignedTo: 'Rishab Kumar',
        lastUpdated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
        createdAt: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString() // 11 days ago
    },
    {
        id: 41,
        name: 'Ajay Sharma',
        phone: '9988776667',
        status: 'New',
        source: 'Website',
        assignedTo: 'Sneha Singh',
        lastUpdated: new Date(Date.now() - 40 * 60 * 1000).toISOString(), // 40 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 42,
        name: 'Ritu Patel',
        phone: '9871234579',
        email: 'ritu.patel@business.com',
        status: 'In Progress',
        source: 'Referral',
        assignedTo: 'Vikram Singh',
        budget: 31000,
        language: 'Hindi',
        lastUpdated: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
    },
    {
        id: 43,
        name: 'Sandeep Gupta',
        phone: '9123456794',
        status: 'CNP',
        source: 'Google',
        assignedTo: 'Rishab Kumar',
        lastUpdated: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString() // 6 days ago
    },
    {
        id: 44,
        name: 'Anjali Mehta',
        phone: '9988776668',
        email: 'anjali.mehta@email.com',
        company: 'Mehta Solutions',
        status: 'Interested-4',
        source: 'Facebook',
        assignedTo: 'Sneha Singh',
        budget: 49000,
        language: 'English',
        notes: 'Looking for e-commerce platform.',
        lastUpdated: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(), // 7 hours ago
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days ago
    },
    {
        id: 45,
        name: 'Rohit Verma',
        phone: '9871234580',
        status: 'Converted',
        source: 'Website',
        assignedTo: 'Vikram Singh',
        budget: 39000,
        lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString() // 14 days ago
    },
    {
        id: 46,
        name: 'Kavita Nair',
        phone: '9123456795',
        status: 'New',
        source: 'Referral',
        assignedTo: 'Rishab Kumar',
        lastUpdated: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // 45 minutes ago
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
    },
    {
        id: 47,
        name: 'Manish Joshi',
        phone: '9988776669',
        email: 'manish.joshi@company.com',
        status: 'Interested-3',
        source: 'Google',
        assignedTo: 'Sneha Singh',
        budget: 28000,
        language: 'Hindi',
        lastUpdated: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
    },
    {
        id: 48,
        name: 'Pooja Tiwari',
        phone: '9871234581',
        status: 'In Progress',
        source: 'Facebook',
        assignedTo: 'Vikram Singh',
        lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() // 4 days ago
    },
    {
        id: 49,
        name: 'Arjun Reddy',
        phone: '9123456796',
        email: 'arjun.reddy@business.com',
        company: 'Reddy Enterprises',
        status: 'Interested-5',
        source: 'Website',
        assignedTo: 'Rishab Kumar',
        budget: 72000,
        language: 'English',
        notes: 'Enterprise client with complex requirements.',
        lastUpdated: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), // 8 hours ago
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days ago
    },
    {
        id: 50,
        name: 'Deepika Malhotra',
        phone: '9988776670',
        status: 'Lost',
        source: 'Referral',
        assignedTo: 'Sneha Singh',
        lastUpdated: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(), // 6 days ago
        createdAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString() // 12 days ago
    }
];

// Export the mock data
window.mockLeads = mockLeads;
