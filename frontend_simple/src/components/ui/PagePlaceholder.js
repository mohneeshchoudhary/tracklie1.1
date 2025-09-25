/**
 * PagePlaceholder Component
 * Placeholder page with "Coming Soon" message and feature previews
 */
class PagePlaceholder {
  constructor(config = {}) {
    this.config = {
      pageId: 'dashboard',
      title: 'Dashboard',
      description: 'This page is coming soon!',
      icon: 'dashboard',
      features: [],
      ...config
    };
    
    this.element = null;
    this.init();
  }
  
  init() {
    this.createElement();
  }
  
  createElement() {
    this.element = document.createElement('div');
    this.element.className = 'page-placeholder';
    this.element.setAttribute('data-testid', `page-${this.config.pageId}`);
    
    // Icon
    const icon = document.createElement('div');
    icon.className = `page-placeholder__icon page-placeholder__icon--${this.config.icon}`;
    
    // Title
    const title = document.createElement('h1');
    title.className = 'page-placeholder__title';
    title.textContent = this.config.title;
    
    // Description
    const description = document.createElement('p');
    description.className = 'page-placeholder__description';
    description.textContent = this.config.description;
    
    // Features section
    const features = this.createFeaturesSection();
    
    this.element.appendChild(icon);
    this.element.appendChild(title);
    this.element.appendChild(description);
    this.element.appendChild(features);
  }
  
  createFeaturesSection() {
    const featuresSection = document.createElement('div');
    featuresSection.className = 'page-placeholder__features';
    
    this.config.features.forEach(feature => {
      const featureElement = this.createFeatureCard(feature);
      featuresSection.appendChild(featureElement);
    });
    
    return featuresSection;
  }
  
  createFeatureCard(feature) {
    const card = document.createElement('div');
    card.className = 'page-placeholder__feature';
    
    const icon = document.createElement('div');
    icon.className = `page-placeholder__feature-icon page-placeholder__feature-icon--${feature.icon}`;
    
    const title = document.createElement('h3');
    title.className = 'page-placeholder__feature-title';
    title.textContent = feature.title;
    
    const description = document.createElement('p');
    description.className = 'page-placeholder__feature-description';
    description.textContent = feature.description;
    
    card.appendChild(icon);
    card.appendChild(title);
    card.appendChild(description);
    
    return card;
  }
  
  getElement() {
    return this.element;
  }
  
  destroy() {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

// Page configurations
const PAGE_CONFIGS = {
  dashboard: {
    pageId: 'dashboard',
    title: 'Dashboard',
    description: 'Your central command center for lead management, analytics, and team performance.',
    icon: 'dashboard',
    features: [
      {
        icon: 'analytics',
        title: 'Real-time Analytics',
        description: 'Live metrics and performance indicators for your sales team.'
      },
      {
        icon: 'tracking',
        title: 'Lead Tracking',
        description: 'Monitor lead progression through your sales pipeline.'
      },
      {
        icon: 'notifications',
        title: 'Smart Notifications',
        description: 'Stay updated with important alerts and reminders.'
      }
    ]
  },
  leads: {
    pageId: 'leads',
    title: 'Leads Management',
    description: 'Comprehensive lead management system with CRUD operations, status tracking, and source management.',
    icon: 'leads',
    features: [
      {
        icon: 'crud',
        title: 'Full CRUD Operations',
        description: 'Create, read, update, and delete leads with ease.'
      },
      {
        icon: 'tracking',
        title: 'Status Management',
        description: 'Track lead status from new to converted with custom workflows.'
      },
      {
        icon: 'automation',
        title: 'Smart Distribution',
        description: 'Automated lead assignment based on team availability.'
      }
    ]
  },
  followups: {
    pageId: 'followups',
    title: 'Follow-ups',
    description: 'Schedule and manage follow-up activities with automated reminders and tracking.',
    icon: 'followups',
    features: [
      {
        icon: 'tracking',
        title: 'Schedule Management',
        description: 'Plan and schedule follow-up activities with calendar integration.'
      },
      {
        icon: 'notifications',
        title: 'Automated Reminders',
        description: 'Never miss a follow-up with smart notification system.'
      },
      {
        icon: 'analytics',
        title: 'Follow-up Analytics',
        description: 'Track follow-up success rates and team performance.'
      }
    ]
  },
  payments: {
    pageId: 'payments',
    title: 'Payments',
    description: 'Manage payment tracking, installment plans, and revenue monitoring.',
    icon: 'payments',
    features: [
      {
        icon: 'tracking',
        title: 'Payment Tracking',
        description: 'Monitor payment status and installment schedules.'
      },
      {
        icon: 'analytics',
        title: 'Revenue Analytics',
        description: 'Track revenue metrics and payment trends.'
      },
      {
        icon: 'export',
        title: 'Financial Reports',
        description: 'Generate detailed financial reports and exports.'
      }
    ]
  },
  reports: {
    pageId: 'reports',
    title: 'Reports & Analytics',
    description: 'Comprehensive reporting system with filters, exports, and data visualization.',
    icon: 'reports',
    features: [
      {
        icon: 'analytics',
        title: 'Advanced Analytics',
        description: 'Deep insights into lead conversion and team performance.'
      },
      {
        icon: 'export',
        title: 'Data Export',
        description: 'Export data in multiple formats for external analysis.'
      },
      {
        icon: 'tracking',
        title: 'Custom Reports',
        description: 'Create custom reports with flexible filtering options.'
      }
    ]
  }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PagePlaceholder, PAGE_CONFIGS };
} else {
  window.PagePlaceholder = PagePlaceholder;
  window.PAGE_CONFIGS = PAGE_CONFIGS;
}
