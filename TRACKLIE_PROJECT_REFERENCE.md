# 🎯 Tracklie Project - Complete Understanding & Reference

## 📋 Project Overview
**Tracklie** is a comprehensive CRM system designed for sales teams with a focus on lead management, payment tracking, and team performance monitoring. The system uses a desktop-first approach with role-based access control and automated workflows.

## 🏗️ System Architecture
- **Backend**: FastAPI + MySQL
- **Frontend**: React + TypeScript + Custom CSS (No CSS Framework)
- **Testing**: Selenium automation
- **Design**: Desktop-only (no mobile/responsive in v1)
- **Theme**: Dark theme with custom color palette
- **Styling**: Pure CSS/SCSS - built from scratch for full control

## 🎨 Brand Colors & Theme
| Purpose | Color | HEX Code |
|---------|-------|----------|
| Background (base) | Dark Blue | `#0D0F1C` |
| Primary Button/CTA | Purple | `#735DFF` |
| CTA Hover | Darker Purple | `#6A4DFF` |
| Highlight/Charts | Cyan | `#00E4FF` |
| Success | Green | `#28C76F` |
| Error | Red | `#FF4D4F` |
| Warning | Yellow | `#FFC107` |
| Primary Text | White | `#FFFFFF` |
| Secondary Text | Light Gray | `#B5B5B5` |
| Sidebar Active Tab | Purple | `#2D2C54` |
| Dividers/Borders | Dark Gray | `#1C1C29` |

## 👥 User Roles & Permissions

### Core Roles
1. **Super Admin**
   - Full system access
   - Manages other admins
   - Billing & settings control
   - Cannot be deleted

2. **Admin/Manager**
   - Manage users/leads/payments/reports
   - Assign/reassign leads
   - Create rules
   - Cannot access billing

3. **Team Lead**
   - View team leads only
   - Reassign within team
   - Approve follow-ups
   - View team reports

4. **Salesperson**
   - Access only own leads
   - Mark attendance
   - Update status & payments
   - Personal dashboard only

5. **Finance Manager**
   - View/update payments
   - Export reports
   - No lead/follow-up access

6. **Analyst**
   - Read-only dashboards/reports
   - Cannot export contact info

7. **Recovery Agent**
   - Handle post-conversion payments only
   - Cannot edit final price

### Advanced Permission Features
- Custom role builder with drag-drop
- Permission matrix (module, feature, field, data levels)
- Multi-role assignment
- Role inheritance
- Temporary permissions with expiry
- Field-level controls

## 🏢 Core Modules

### 1. 🔐 Authentication & User Management
- Login/logout with JWT tokens
- Role-based access control
- Session management
- Protected routing
- Multi-factor authentication (future)
- SSO integration (future)

### 2. 📊 Attendance System
**Purpose**: Ensure leads only assigned to present salespeople

**Features**:
- Check-in/check-out system
- GPS support (optional)
- Shift management (default 9 AM - 5 PM)
- Timezone & holiday calendar support
- Pause reasons: Training, Client Meeting, Lunch Break, Personal Time
- Admin controls for attendance cutoffs

**Statuses**:
- ✅ Present → eligible for lead assignment
- ❌ Absent → not included in lead routing

### 3. 🎯 Lead Distribution Engine
**Methods**:
- **Round Robin**: Sequential assignment to present salespeople
- **Manager-Allotted**: Manual assignment from pools

**Lead Pools**:
- **Fresh**: Newly arrived, untouched leads
- **Working**: Assigned and currently being worked on
- **Night**: Came in outside working hours
- **Unassigned**: No eligible rep found
- **Recycling**: Old/stale leads reactivated

**Morning Rush Logic**:
- Only 20% of overnight leads distributed in first 1.5 hours
- Remainder pushed out in gradual batches
- Admin configurable percentage and release window

### 4. 📋 Lead Management Module
**Ingestion Methods**:
- Manual entry with validation
- Bulk upload (CSV/Excel) with duplicate detection
- API integration with webhooks
- Popular sources: Facebook, Google, LinkedIn, Website Forms

**Custom Fields Framework**:
- Text, Number, Date, Boolean, Dropdown, Multi-select, File Upload, Lookup
- Validation rules, default values, conditional visibility
- Role-based permissions

**Lead Lifecycle Stages**:
1. **New** → Just captured
2. **In Progress** → Assigned, being contacted
3. **CNP (Could Not Pick)** → Auto-retry rules
4. **Interested (1-5)** → With interest level tagging:
   - 1-2: Not serious (Grey)
   - 3: Exploring (Orange) 
   - 4-5: Hot prospects (Green)
5. **Qualified** → Demo/meeting scheduled
6. **Converted** → Deal closed, handover to Payment
7. **Lost** → Marked with reason
8. **Recycling** → Inactive leads for future campaigns

**CNP Automation**:
- Day 1: 3 calls (morning, afternoon, evening)
- Day 2-5: 2 calls/day
- WhatsApp follow-up after 2nd failed call
- Auto-drop after 5 attempts
- Manager alerts for multiple CNPs from same source

### 5. 💰 Payments & Recovery Module
**Dual Role-Based Flows**:

**Salesperson Responsibilities**:
- Log first payment after conversion
- Upload payment proof (mandatory)
- Choose payment mode (UPI, Cash, Card, etc.)
- Cannot edit final price or future installments

**Recovery Agent Responsibilities**:
- Handle all post-conversion collections
- Manage installment schedules
- Accept partial payments with auto-recalculation
- Upload payment proofs
- Cannot change final price

**Recovery Dashboard Buckets**:
- **Today's Due** → Normal (Blue)
- **Upcoming** (Next 7 days) → Grey
- **Overdue (0-7 days)** → Yellow
- **Overdue (8-30 days)** → Orange
- **Overdue (30+ days)** → Red
- **Critical** (60+ days + high value) → Dark Red/Black

**Quick Actions**:
- Call customer with payment info
- Upload payment proof
- Send WhatsApp reminder
- Reschedule payment with reason
- Mark as dropped with reason

### 6. 📅 Follow-ups & Scheduling Module
**Follow-up Types**:
- **Next Call** → Date + Time + Reminder interval
- **Demo** → Date + Time + Platform (Zoom, Google Meet)
- **Meeting** → Date + Time + Venue
- **Custom** → Admin-defined types

**Smart Scheduling Rules**:
- Interest 4-5 leads: Must schedule within 24 hrs
- Hot leads w/o follow-up in 24 hrs → auto-alert
- No action in 48 hrs → escalates to Team Lead/Manager
- Prevents overlapping tasks for same lead

**Reminder & Escalation System**:
- Multi-channel: In-app, WhatsApp, Email, SMS
- Customizable timing: 30 min / 2 hr / 1 day before
- Batch reminders to reduce noise
- Escalation chain for missed follow-ups

### 7. 📊 Dashboard & Reporting Module
**Role-Specific Dashboards**:

**Salesperson Dashboard**:
- Today's Focus: Leads to call, follow-ups, payment reminders
- Performance Snapshot: Calls made, conversions, revenue closed
- Quick Actions: Add lead, call next lead, log payment, send WhatsApp

**Manager Dashboard**:
- Team Overview: Leads assigned vs worked, conversion rates
- Performance Tracking: Rep-wise metrics, team goals progress
- Management Actions: Bulk assign leads, pause users, export reports

**Recovery Agent Dashboard**:
- Payment Buckets: Due today, Overdue aging buckets
- Quick Actions: Call, log payment, upload proof, send reminder
- Performance Metrics: Collection efficiency, monthly totals

**Admin Dashboard**:
- System Metrics: Total leads ingested, conversion trends
- Source Performance: ROI by source, campaign tracking
- System Admin Tools: User controls, audit logs

**Advanced Reporting Engine**:
- Custom report builder (drag-drop fields)
- Scheduled reports (auto-email daily/weekly/monthly)
- Comparative reports (month vs month, person vs person)
- Drill-down capabilities
- Export formats: CSV, Excel, PDF

### 8. 🔔 Notifications & Escalations Module
**Multi-Channel System**:
- **In-app**: Real-time dashboard alerts
- **Email**: Formal notifications and digests
- **WhatsApp**: Transactional alerts
- **SMS**: Urgent alerts
- ❌ **Push Notifications**: Excluded from v1

**Escalation Logic**:

**Lead Escalations**:
- Lead untouched for 2 days → Team Lead → 4 days → Manager → 7 days → Admin
- Hot Lead no follow-up → Alert at 12 hrs → Manager at 24 hrs
- Multiple CNPs from same source → Manager flagged

**Payment Escalations**:
- 2 days before due → WhatsApp Reminder
- 1 day overdue → Recovery Agent alert + auto-call
- 3 days overdue → Escalate to Manager
- 7+ days overdue → Admin alert

**Follow-up Escalations**:
- Missed Follow-up → Auto-alert to Salesperson
- 3+ Missed for same lead → Notify Manager + Admin

### 9. 🔌 Integrations Module
**Lead Ingestion Integrations**:
- Bulk upload with smart mapping
- RESTful API with token auth and rate limits
- Webhooks for real-time lead push
- Facebook Lead Ads, Google Forms, LinkedIn Lead Gen

**Communication Integrations**:
- Click-to-call with logging
- WhatsApp Business API with templates
- Email (SMTP) with tracking
- SMS Gateway integration

**Advanced Features**:
- API key management
- Webhook configuration panel
- Auto-transform logic
- Conditional routing
- Smart de-duplication

### 10. 🔒 Security & Permissions Module
**Authentication & Access Control**:
- Username/password with strength policies
- Multi-Factor Authentication (Email, SMS, Authenticator)
- Single Sign-On (Google, Microsoft, SAML)
- Session control with device tracking
- API authentication with JWT tokens

**Granular Permissions**:
- Module level: Enable/disable entire modules
- Feature level: Control specific actions
- Field level: Lock sensitive fields
- Data level: Control scope (Own/Team/All leads)
- Export level: Define export permissions

**Security Features**:
- Immutable audit logs
- Permission change tracking
- Bulk action monitoring
- Security alerts for suspicious activity
- GDPR compliance tools
- Data retention policies

### 11. 🎨 User Experience / UI Module
**Design Philosophy**:
- Desktop-first (no mobile in v1)
- Role-optimized interfaces
- Modular components
- Minimalist layout
- Color-coded status indicators
- **Custom CSS Architecture**: Pure CSS/SCSS with BEM methodology for maintainable, scalable styling
- **No CSS Frameworks**: Complete control over styling, optimized for Tracklie's specific needs

**Global Layout**:
- Top Bar: API health, user avatar, "Get Started" CTA
- Left Sidebar: Dashboard, Leads, Follow-ups, Payments, Analytics
- Main Content Area: Role-specific widgets, filters, tables/graphs

**Component System**:
- Lead Card: For list views and search results
- Payment Widget: Inside lead view and recovery dashboard
- Follow-up Tile: Daily agenda, upcoming follow-ups
- Analytics Tile: KPIs for leads, conversion, revenue
- Status Badge: Universal status indicator

## 🚀 Development Approach
**20-Stage Implementation Plan**:
1. Project Setup + Layout Shell
2. Authentication (Login/Logout)
3. User Roles + Dashboard Shells
4. Leads Page UI (no logic)
5. Lead Ingestion (Manual + API)
6. Lead Status & Lifecycle
7. Attendance Check-In System
8. Lead Distribution (Round Robin)
9. Follow-Up Scheduling
10. Dashboard Widgets (Phase 1)
11. Payments UI + Logging
12. Recovery Dashboard Buckets
13. In-App Notifications (UI Only)
14. WhatsApp & Email Templates (UI)
15. Reports & Analytics Shells
16. Permissions Matrix UI
17. Admin Config Panels
18. Security Logs & Audit Trail
19. Final Dashboard Polish
20. Testing, Seeds, QA Scripts

**Each Stage Includes**:
- 🟩 Manual UI Validation
- 🤖 Selenium Automation Script
- 🧪 Seed file for mock data
- 📋 Basic regression checklist

## 🧪 Testing Strategy
- Cursor-based development with step-by-step implementation
- Each stage is testable, UI-complete, and Selenium-ready
- Comprehensive seed data for realistic testing
- Automated regression testing throughout development

## 🎯 Key Success Metrics
- Lead response time reduction
- Conversion rate improvement
- Payment collection efficiency
- Team productivity metrics
- System uptime and performance
- User adoption and satisfaction

This reference document captures the complete understanding of the Tracklie project as a comprehensive CRM system focused on lead management, payment tracking, and team performance optimization with role-based access control and automated workflows.
