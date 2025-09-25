# 🎯 Tracklie - Advanced CRM System

> A comprehensive Customer Relationship Management system built with modern web technologies, featuring role-based access control, intelligent lead distribution, and real-time collaboration.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Status](https://img.shields.io/badge/status-in%20development-orange.svg)

## 🌟 Features

### 🔐 **Authentication & Access Control**
- JWT-based authentication with role-based access control
- 7 predefined roles: Super Admin, Admin/Manager, Team Lead, Salesperson, Recovery Agent, Finance Manager, Analyst
- Granular permissions at module, feature, field, and data levels

### 📊 **Lead Management**
- Complete lead lifecycle management from capture to conversion
- Multiple ingestion methods: Manual entry, bulk upload, API integration
- Smart lead distribution with round-robin and manual assignment
- Attendance-based eligibility for lead assignment
- CNP (Could Not Pick) automation with retry logic

### 💰 **Payment & Recovery System**
- Post-conversion payment tracking
- Dual-role payment system (Salesperson + Recovery Agent)
- Installment management with aging buckets
- Payment status tracking and recovery workflows

### 📅 **Follow-up Management**
- Smart scheduling with automatic alerts and escalation
- Interest-based follow-up requirements
- Timeline tracking and outcome logging
- Manager oversight and bulk rescheduling

### 📈 **Analytics & Reporting**
- Role-specific dashboards with real-time metrics
- Advanced filtering and custom report builder
- CSV export functionality
- Performance tracking and conversion analytics

### 🔔 **Notifications & Alerts**
- Multi-channel notification system (in-app, email, WhatsApp, SMS)
- Real-time notifications via WebSocket
- Smart escalation chains
- Batch notifications to reduce noise

### 🛡️ **Security & Compliance**
- Enterprise-grade security with audit trails
- Soft delete with restore functionality
- GDPR compliance tools
- Data encryption and access logging

## 🏗️ **Technology Stack**

### **Frontend**
- **React 18** with TypeScript
- **Custom CSS** with BEM methodology
- **React Router DOM** for navigation
- **WebSocket** for real-time features

### **Backend**
- **FastAPI** with Python 3.9+
- **MySQL** database with SQLAlchemy ORM
- **JWT** authentication
- **Redis** for caching (Stage 19)
- **WebSocket** support

### **Testing**
- **Selenium** for end-to-end testing
- **Pytest** for backend testing
- **React Testing Library** for frontend testing

### **DevOps**
- **Docker** containerization
- **GitHub Actions** for CI/CD
- **Nginx** reverse proxy

## 🚀 **Quick Start**

### Prerequisites
- Node.js 18+
- Python 3.9+
- MySQL 8.0+
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/tracklie.git
cd tracklie

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Frontend setup
cd ../frontend
npm install

# Database setup
# Configure your MySQL connection in backend/.env
# Run migrations (coming in Stage 0)

# Start development servers
# Backend: uvicorn main:app --reload
# Frontend: npm start
```

## 📋 **Development Roadmap**

Our development follows a structured 20-stage approach organized into 4 phases:

### **Phase 1: Foundation & Core (Stages 0-6)** - *6-8 weeks*
- [x] Stage 0: Prerequisites & Setup
- [ ] Stage 1: Authentication & Role-Based Access
- [ ] Stage 2: Lead Distribution Engine
- [ ] Stage 3: Lead Management (CRUD)
- [ ] Stage 4: Follow-Up Scheduling
- [ ] Stage 5: Payments Flow
- [ ] Stage 6: Dashboard Widgets

### **Phase 2: Advanced Features (Stages 7-12)** - *4-6 weeks*
- [ ] Stage 7: Lead Profile View
- [ ] Stage 8: Notifications Panel
- [ ] Stage 9: Reporting & Analytics
- [ ] Stage 10: Soft Delete & Audit Trail
- [ ] Stage 11: Settings & Configuration
- [ ] Stage 12: Roles & Permissions UI

### **Phase 3: Polish & Production (Stages 13-18)** - *3-4 weeks*
- [ ] Stage 13: Attendance Module
- [ ] Stage 14: Selenium Test Suite
- [ ] Stage 15: Pre-Deployment QA
- [ ] Stage 16: Security Validation
- [ ] Stage 17: UAT & Client Readiness
- [ ] Stage 18: Post-Go-Live Tools

### **Phase 4: Optimization & Enhancement (Stages 19-20)** - *2-3 weeks*
- [ ] Stage 19: Performance Optimization
- [ ] Stage 20: Real-time Features

## 🎨 **Design System**

### **Color Palette**
- **Background**: `#0D0F1C` (Dark Blue)
- **Primary**: `#735DFF` (Purple)
- **Success**: `#28C76F` (Green)
- **Warning**: `#FFC107` (Yellow)
- **Error**: `#FF4D4F` (Red)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `#B5B5B5` (Light Gray)

### **Component Architecture**
- Desktop-first responsive design
- Modular component system with BEM methodology
- Consistent spacing and typography
- Color-coded status indicators

## 🧪 **Testing Strategy**

- **Selenium Tests**: End-to-end testing for all user flows
- **Unit Tests**: Comprehensive backend and frontend coverage
- **Integration Tests**: API and database interaction testing
- **Manual QA**: Role-based testing and edge case validation

## 📚 **Documentation**

- [Development Plan](./trackly_development_plan.md) - Detailed 20-stage implementation plan
- [Project Reference](./TRACKLIE_PROJECT_REFERENCE.md) - Complete project understanding
- [Additional Suggestions](./ADDITIONAL_SUGGESTIONS.md) - Future enhancement ideas
- [API Documentation](./docs/api.md) - Coming in Stage 0
- [Component Library](./docs/components.md) - Coming in Stage 1

## 🤝 **Contributing**

We follow a structured development approach:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/stage-X-feature-name`)
3. **Commit** your changes (`git commit -m 'Add Stage X: Feature description'`)
4. **Push** to the branch (`git push origin feature/stage-X-feature-name`)
5. **Create** a Pull Request

### **Development Guidelines**
- Follow the stage-by-stage development plan
- Write Selenium tests for all features
- Maintain consistent code style
- Update documentation as you build

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 **Team**

- **Project Lead**: Mohneesh
- **Architecture**: Custom CRM with modern web standards
- **Testing**: Comprehensive Selenium automation

## 🎯 **Project Goals**

Tracklie aims to be:
- **Production-ready**: Enterprise-grade security and performance
- **User-friendly**: Intuitive interface with role-specific experiences
- **Scalable**: Modular architecture supporting future enhancements
- **Testable**: Comprehensive test coverage for reliability
- **Modern**: Built with current best practices and technologies

---

**Status**: Currently in development - Stage 0 (Prerequisites & Setup)

For questions, suggestions, or contributions, please open an issue or reach out to the development team.
