### **✅ Feature 1: User & Roles Module**

#### **📌 Purpose:**

Manage access control across the platform with **preset roles**, **custom role creation**, and **granular permission matrix**.

---

#### **🔑 Preset Roles:**

| Role | Key Abilities |
| ----- | ----- |
| **Super Admin** | Full system access; manages other admins; billing & settings control; cannot be deleted |
| **Admin/Manager** | Manage users/leads/payments/reports; assign/reassign; create rules; cannot access billing |
| **Team Lead** | View team leads; reassign within team; approve follow-ups; view team reports |
| **Salesperson** | Only access own leads; mark attendance; update status & payments; personal dashboard only |
| **Finance Manager** | View/update payments; export reports; no lead/follow-up access |
| **Analyst** | Read-only dashboards/reports; cannot export contact info |
| **Recovery Agent** | Only handle post-conversion payments; cannot edit final price |

---

#### **⚙️ Advanced Features:**

* **Custom Role Builder**: Visual drag-drop with permissions per module

* **Permission Matrix**: Module-level, feature-level, field-level, and data-level

* **Multi-Role Assignment**: Users can have more than one role

* **Role Inheritance**: Parent-child permission cascading

* **Temporary Permissions**: With expiry time

* **Field-Level Controls**: Restrict access to specific fields like “Final Price”

---

#### **🧪 Implementation Examples:**

* *Regional Manager*: View/edit only region-specific leads; no global rule access.

* *Recovery Agent*: Can update payment but not see discount negotiation.

* *Salesperson*: No visibility into others’ leads or commissions.

## **✅ 2A: Attendance System**

### **📌 Purpose:**

To ensure that leads are only assigned to **present and eligible salespeople**, with real-time availability tracked.

---

### **🧩 Core Components:**

* **Check-In/Check-Out System**: Tracks presence and working hours

* **GPS Support (Optional)**: Especially for field teams

* **Timestamp Logging**: Accurate logging of check-in/out

* **Shift Management**: Default 9 AM – 5 PM, configurable per user/team

* **Timezone & Holiday Calendar Support**

* **Attendance Status**:

  * ✅ Present → eligible for lead assignment

  * ❌ Absent → not included in lead routing

* **Pause Reasons**: Agents can pause for:

  * Training

  * Client Meeting

  * Lunch Break

  * Personal Time

---

### **📋 Admin Controls:**

* Set shift timings per team or user

* View attendance logs across the team

* Force “present” or “pause” status if needed

* Configure attendance cutoff for lead assignment (e.g., must check in before 10 AM)

---

### **📌 Use Case Example:**

Ravi checks in at 9:10 AM → marked present → becomes eligible  
 Priya forgets to check in → system skips her in lead routing  
 Aniket pauses status for 1 hour → no leads assigned during that period

## **✅ 2B: Lead Distribution Engine**

**(Updated as per your instruction)**

### **📌 Purpose:**

To assign leads only to present and eligible salespeople using **simple, effective, and reliable methods** — with fallback control by managers.

---

### **✅ Supported Distribution Methods (for current implementation):**

| Distribution Type | Description |
| ----- | ----- |
| **Round Robin** | Sequential assignment to each present salesperson |
| **Manager-Allotted** | Manual assignment by Admin/Manager from Unassigned or Fresh pool |

---

### **🔁 Round Robin Logic:**

* Equal rotation among available and checked-in salespeople

* Skips absent or paused users

* Resets daily to ensure fair distribution

* Smart skip for users marked “paused” or exceeding load threshold (configurable)

---

### **🛠️ Manager Manual Assignment:**

* Managers/Admins can assign from any lead pool manually

* Filters available for skill tags, region, language, lead value, etc.

* Auto-log of who assigned and why (with optional notes)

---

### **🗂️ Lead Pools (No change):**

| Pool | Description |
| ----- | ----- |
| **Fresh** | Newly arrived, untouched leads |
| **Working** | Assigned and currently being worked on |
| **Night** | Came in outside working hours |
| **Unassigned** | No eligible rep found (rules fail or everyone paused) |
| **Recycling** | Old/stale leads reactivated for re-engagement |

---

### **🌅 Morning Rush Logic:**

* Default: Only 20% of overnight leads distributed in the first 1.5 hours

* Remainder pushed out in gradual, timed batches

* Admin can adjust both percentage and release window

---

### **🧠 Sample Flow:**

100 leads come in overnight  
 At 9:00 AM → 20 leads auto-assigned in Round Robin  
 10:30 AM onwards → Remaining 80 assigned gradually  
 Leads with missing eligibility criteria → move to **Unassigned Pool**  
 Manager manually assigns or leaves them for later batch

---

### **🚧 Deferred to Future Releases (Not in current scope):**

* Load balancing

* Skill matching (language, region, product)

* Rule-based routing

* Conversion rate-based assignment

* Performance-weighted scoring

* Escalation fallback chains

## **✅ Feature 3: Lead Management Module**

### **📌 Purpose:**

To handle the entire **lead lifecycle** — from ingestion to conversion — with full customization, automation, and tracking at every stage.

---

### **🔄 Lead Ingestion Methods**

| Method | Description |
| ----- | ----- |
| **Manual Entry** | Single-lead form with real-time validation |
| **Bulk Upload** | CSV/Excel with duplicate detection, smart field mapping |
| **API Integration** | RESTful API with webhook support, token auth, rate limits |
| **Popular Sources** | Facebook Lead Ads, Google Forms, LinkedIn Lead Gen, website forms |

---

### **🛠️ Custom Fields Framework**

Supports all types of fields — configurable per organization:

* **Text**: Single-line, multi-line, rich text

* **Number**: Integer, decimal, currency, percentage

* **Selection**: Dropdown, multi-select, radio, checkbox

* **Date**: Date-only, date-time, date range

* **Boolean**: Yes/No, True/False

* **File Upload**: Image, doc, PDF, multiple files

* **Lookup Fields**: Link to other leads, users, lists

💡 **Bonus Features**:

* Conditional field visibility (show/hide logic)

* Default values & validation rules

* Role-based field permissions (view/edit)

---

### **🔁 Lead Lifecycle Stages**

Fully customizable stages, with default flow:

1. **New** – Freshly captured, untouched

2. **In Progress** – Assigned and being contacted

3. **CNP (Could Not Pick)** – Call not answered, auto-retry logic applies

4. **Interested** – Expressed interest with 1–5 scale

   * 1-2: Not serious (Grey)

   * 3: Exploring (Orange)

   * 4-5: Hot prospect (Green)

5. **Qualified** – Next step scheduled (call/demo)

6. **Converted** – Deal closed, moves to payment tracking

7. **Lost** – Marked lost with reason

8. **Recycling Pool** – Dormant lead for future follow-up

---

### **☎️ CNP Automation System**

* **Retry Flow**:

  * Day 1: 3 calls (morning, afternoon, evening)

  * Day 2–5: 2 calls/day (configurable)

* **Auto-drop**: After X attempts → Moves to drop pool

* **Manager Alerts**: If 3+ CNPs from same source

* **WhatsApp Follow-up**: After 2nd failed call

* **CNP Analytics**: Time/source/salesperson breakdowns

---

### **📞 Call, WhatsApp & Email Integration**

* Click-to-call (auto-log duration, call result, upload recording)

* WhatsApp: Template management, auto-fill, delivery tracking

* Email: Send from template, open tracking, reply management

---

### **🤖 Lead Intelligence & Scoring**

* Engagement-based scoring: Calls, replies, demos

* Predictive conversion likelihood

* Suggests best contact times & channels

---

### **🧠 Use Case Example:**

Lead comes from Facebook with budget 50K → Assigned to rep → Called, marked “Interested-4”  
 System **enforces next step within 24 hrs**  
 Rep books demo → System auto-sends reminder  
 Lead converts → Deal moves to Payments Module

## **✅ Feature 3: Lead Management Module (Finalized)**

### **📌 Purpose:**

Manage the entire lifecycle of a lead — from capture to conversion — with full flexibility, custom fields, and smart automation.

---

### **🔄 Lead Ingestion Methods**

| Method | Description |
| ----- | ----- |
| **Manual Entry** | Single-lead form with validation |
| **Bulk Upload** | CSV/Excel with duplicate detection, field mapping |
| **API Integration** | REST API with webhook support & rate limiting |
| **Popular Sources** | Facebook, Google, LinkedIn, Website Forms |

---

### **🛠️ Custom Fields Framework**

* **Field Types**: Text, Number, Date, Boolean, Dropdown, Multi-select, File Upload, Lookup

* **Properties**:

  * Validation rules (min/max, regex)

  * Default values

  * Conditional visibility

  * Role-based permissions (view/edit)

  * Integration mapping

---

### **🔁 Lead Lifecycle Stages**

1. **New** → Just captured

2. **In Progress** → Assigned, being contacted

3. **CNP (Could Not Pick)** → Auto-retry rules kick in

4. **Interested (1–5)** → With interest level tagging:

   * 1-2: Not serious (Grey)

   * 3: Exploring (Orange)

   * 4-5: Hot prospects (Green)

5. **Qualified** → Demo/meeting scheduled

6. **Converted** → Deal closed, handover to Payment

7. **Lost** → Marked with reason

8. **Recycling** → Inactive leads pulled for future campaigns

---

### **☎️ CNP Automation (Keep as-is)**

* Retry flow: Day 1 (3 times), Day 2–5 (2/day)

* WhatsApp auto-template after 2nd failed call

* Auto-drop after 5 attempts

* Manager notified if multiple CNPs from same source

---

### **📤 Lost Lead Notification (Modified as per your input)**

* Sales reps select from **pre-filled, categorized reasons** when marking as “Lost”

  * 📦 Pricing Too High

  * 🏢 Joined Competitor

  * ⛔ Not Interested

  * 🤷 Wrong Number / Junk

  * ⏳ Delayed Decision

* System **clubs all "Lost" leads daily at 7 PM**

  * Sends **summary report** to Manager with:

    * Total leads lost

    * Reason-wise breakdown

    * Lead count per reason

---

### **📞 Integration with Communication Channels**

* Click-to-call with logging

* WhatsApp templates with delivery tracking

* Email templates with open/reply tracking

---

### **🤖 Smart Lead Scoring**

* Based on engagement (calls, WhatsApp, demos)

* Predictive suggestions for next follow-up

* Highlights high-potential leads

## **✅ Feature 4: Payments & Recovery Module**

### **📌 Purpose:**

To manage the **entire post-conversion financial journey** — from recording payments to recovering outstanding amounts — using role-specific flows and flexible installment handling.

---

### **💰 Product & Pricing Management**

| Feature | Details |
| ----- | ----- |
| **Product Catalog** | Add unlimited products with categories, base prices, and tax settings |
| **Multi-Product Deals** | Handle bundles (e.g., Python Course \+ Kit) with line items |
| **Negotiation Flow** | Track Quoted vs Final Price, applied discount |
| **Approval Workflows** | Enforce manager sign-off for heavy discounts |
| **Pricing Rules** | Role-based discount caps and automated final pricing |

---

### **👥 Dual Role-Based Payment Flows**

#### **Salesperson Responsibilities:**

* Log **first payment** after conversion (full or partial)

* Upload payment proof (mandatory)

* Choose payment mode (UPI, Cash, Card, etc.)

* Cannot edit final negotiated price or future installments

#### **Recovery Agent Responsibilities:**

* Handle all **post-conversion collections**

* Manage **installment schedules** (add, edit, reschedule)

* Accept **partial payments** and auto-recalculate balance

* Split/Merge payments if needed

* Upload payment proofs

* Cannot change final price

---

### **🔄 Installment & Partial Payment Features**

* Flexible payment plans (e.g., 30-70, 50-25-25)

* Template-driven schedule creation

* Auto-balance adjustment on partial payment

* Payment mode tagging (configurable list: UPI, Card, Cash, Cheque)

* Mandatory proof upload per payment

---

### **📊 Recovery Dashboard Buckets**

| Bucket Name | Criteria | Alert Level |
| ----- | ----- | ----- |
| **Today’s Due** | Payments due today | Normal (Blue) |
| **Upcoming** | Next 7 days’ payments | Grey |
| **Overdue (0-7)** | Overdue by up to 7 days | Yellow |
| **Overdue (8–30)** | 8–30 days overdue | Orange |
| **Overdue (30+)** | Overdue by more than 30 days | Red |
| **Critical** | 60+ days \+ high value → notify Admin | Dark Red/Black |

---

### **🛠️ Quick Actions in Recovery View**

* Call customer with payment info

* Upload payment proof

* Send WhatsApp reminder (choose template)

* Reschedule payment with reason

* Mark as dropped with categorized reason

---

### **❌ Drop & Denial Workflow**

* Pre-filled drop reasons:

  * Financial issue

  * Switched to competitor

  * Changed mind

  * Personal/emergency

  * Other

* Dropped installments closed

* Auto-moved to “Drop Pool”

* Stats included in recovery analytics

---

### **📈 Analytics & Reporting**

* Revenue vs Collection metrics

* Discounts given per deal

* Product-wise performance

* Agent-wise recovery rates

* Conversion-to-collection tracking

---

### **🧠 Examples:**

**Deal**: Python Course (₹30K) \+ Data Science Kit (₹15K) → Final ₹45K

* ₹20K paid at conversion (logged by Salesperson)

* ₹25K scheduled in 2 installments

* First installment partially paid (₹15K)

* Remaining ₹10K rescheduled → assigned to Recovery Agent

## **✅ Feature 5: Follow-ups & Scheduling Module**

### **📌 Purpose:**

To ensure **no lead interaction is missed** by enabling smart scheduling, reminders, and escalation for follow-ups like calls, demos, meetings, and custom actions.

---

### **🗓️ Follow-up Types & Categories**

| Type | Fields Captured |
| ----- | ----- |
| **Next Call** | Date \+ Time \+ Reminder interval |
| **Demo** | Date \+ Time \+ Platform (Zoom, Google Meet, etc.) |
| **Meeting** | Date \+ Time \+ Venue (Office, Online, Client Location) |
| **Custom** | Admin-defined types (e.g., Pricing Discussion, Document Pickup, etc.) |

---

### **⚙️ Smart Scheduling Rules**

* **Interest 4–5** leads: Must schedule a next step within 24 hrs

* **Hot leads w/o follow-up in 24 hrs** → auto-alert to rep

* **No action in 48 hrs** → escalates to Team Lead / Manager

* Prevent **overlapping tasks** for same lead

* Suggests best follow-up time based on pickup history

---

### **🔔 Reminder & Escalation System**

| Feature | Description |
| ----- | ----- |
| **Multi-channel Reminders** | In-app, WhatsApp, Email, SMS (configurable) |
| **Customizable Timing** | 30 min / 2 hr / 1 day before (admin configurable) |
| **Batch Reminders** | Groups multiple reminders to reduce noise |
| **Escalation Chain** | Missed follow-up → escalate to Manager → escalate to Admin (if repeated) |

---

### **📑 Timeline & Activity Log**

* Every interaction logged chronologically

* Outcome tracking for completed/missed follow-ups

* Auto-linkage to:

  * Calls

  * WhatsApp

  * Emails

  * Lead status changes

* Collaboration with `@mention` support to tag team members

---

### **📊 Manager Oversight Tools**

| Dashboard Insights | Purpose |
| ----- | ----- |
| **Scheduled vs Completed** | Track follow-up discipline by rep |
| **Hot Leads Without Follow-up** | Flagged in red |
| **Bulk Rescheduling** | Manager can move multiple follow-ups at once |
| **Team Effectiveness** | Reports on response rates, missed actions |

---

### **🧠 Examples:**

Lead marked “Interested-5” → Demo scheduled for 3 PM tomorrow → Auto-reminder at 2:30 PM → Rep logs outcome

Rep forgets to follow up → Escalated to manager after 24 hrs → Manager can reschedule or reassign

## **✅ Feature 6: Dashboard & Reporting Module**

### **📌 Purpose:**

To provide **role-specific dashboards** and **custom reporting** that offer real-time visibility, actionable insights, and performance tracking for all users.

---

### **🧩 Role-Specific Dashboards**

---

#### **🧑‍💼 Salesperson Dashboard**

| Section | Functionality |
| ----- | ----- |
| **Today's Focus** | List of leads to call, follow-ups, and payment reminders |
| **Performance Snapshot** | Calls made, conversions, revenue closed, leaderboard position |
| **Quick Actions** | Add lead, call next lead, log payment, send WhatsApp, mark attendance |

---

#### **👨‍👩‍👧‍👦 Manager Dashboard**

| Section | Functionality |
| ----- | ----- |
| **Team Overview** | Leads assigned vs worked, conversion rates, CNP analytics |
| **Performance Tracking** | Rep-wise metrics, team goals progress, escalations needing attention |
| **Management Actions** | Bulk assign leads, pause users, override distribution, export team reports |

---

#### **💰 Recovery Agent Dashboard**

| Section | Functionality |
| ----- | ----- |
| **Payment Buckets** | Today's due, Overdue aging buckets, Drop cases |
| **Quick Actions** | Call, log payment, upload proof, send reminder, reschedule, mark dropped |
| **Performance Metrics** | Collection efficiency, monthly totals, pending vs collected ratio |

---

#### **🛠️ Admin Dashboard**

| Section | Functionality |
| ----- | ----- |
| **System Metrics** | Total leads ingested, conversion trends, revenue analysis |
| **Source Performance** | ROI by source, campaign tracking, API integration health |
| **System Admin Tools** | User controls, audit logs, system performance, shortcut configs |

---

### **📊 Advanced Reporting Engine**

* **Custom Report Builder**: Drag-drop fields to build your own reports

* **Scheduled Reports**: Auto-email daily/weekly/monthly to specific users

* **Comparative Reports**:

  * This month vs last month

  * Salesperson A vs Salesperson B

  * Source A vs Source B

* **Drill-Down**: Click any metric to see underlying data

* **Export Formats**: CSV, Excel, PDF — with custom branding

---

### **🎯 Goal Setting & Progress Tracking**

| Feature | Use Case |
| ----- | ----- |
| **Target Setting** | Set monthly/quarterly goals for leads, revenue |
| **Visual Progress Bars** | Track team vs target in real time |
| **Alerts on Shortfall** | Notify if pacing is off-track |

---

### **🧩 Dashboard Customization Features**

* Enable/disable widgets per role

* Rearrange layout via drag-drop

* Real-time or scheduled auto-refresh

* Role-based default layouts

* Color-coded thresholds (e.g., red if \<50% goal)

## **✅ Feature 7: Notifications & Escalations Module (Finalized)**

### **📌 Purpose:**

To make sure no critical task is missed — using smart, multi-channel notifications and automatic escalation paths across leads, payments, and follow-ups.

---

### **📲 Multi-Channel Notification System**

| Channel | Use Cases |
| ----- | ----- |
| **In-app** | Real-time dashboard alerts with priority badges |
| **Email** | Formal notifications and summary digests |
| **WhatsApp** | Transactional alerts: demos, follow-ups, payments |
| **SMS** | Urgent alerts: missed actions, critical follow-ups |

❌ **Push Notifications** have been **excluded from current implementation.**  
 (Future mobile app version may revisit this.)

---

### **⚙️ Channel Preferences & Priority Control**

* Users can choose preferred channels per notification type

* Critical alerts (e.g. hot lead ignored) override preferences

* Channel logic adapts based on business hours (e.g., no SMS after 9 PM)

---

### **⏰ Escalation Logic**

#### **📞 Lead Escalations**

| Scenario | Escalation Path |
| ----- | ----- |
| Lead untouched for 2 days | → Team Lead → 4 days → Manager → 7 days → Admin |
| Hot Lead (Interest 4–5) no follow-up | → Alert at 12 hrs → Manager at 24 hrs |
| Multiple CNPs from same source | → Manager gets flagged for source quality review |

---

#### **💰 Payment Escalations**

| Scenario | Escalation Path |
| ----- | ----- |
| 2 days before due | → WhatsApp Reminder to customer |
| 1 day overdue | → Recovery Agent alert \+ auto-call |
| 3 days overdue | → Escalate to Manager |
| 7+ days overdue | → Admin alert (immediate if amount \> ₹50K) |

---

#### **📅 Follow-up Escalations**

| Scenario | Escalation Path |
| ----- | ----- |
| Missed Follow-up | → Auto-alert to Salesperson |
| 3+ Missed for same lead | → Notify Manager \+ Admin |

---

### **🧠 Smart Features**

* **Batch Notifications**: Combine related alerts to reduce spam

* **One-Click Actions**: Complete follow-up, send WhatsApp, call — directly from alert

* **Context-Aware**: Each alert carries lead/payment info for instant action

* **Snooze Options**: Delay with auto-resume

* **Complete Log**: All alerts stored with status (sent/read/clicked)

---

### **🔧 Admin Controls**

| Tool | Functionality |
| ----- | ----- |
| **Template Manager** | Customize email/SMS/WhatsApp formats |
| **Escalation Matrix** | Visual builder to define all escalation chains |
| **Timing Settings** | Control frequency, hours, and retries |
| **Emergency Alerts** | Bypass user preferences in urgent cases |
| **Compliance Flags** | Alert on bulk deletes, exports, etc. |

## **✅ Feature 8: Integrations Module**

### **📌 Purpose:**

Enable seamless **data flow between Tracklie and external systems** — including lead sources, communication tools, CRMs, and finance platforms — using APIs, webhooks, and import/export options.

---

### **🔌 Lead Ingestion Integrations**

| Type | Description |
| ----- | ----- |
| **Bulk Upload** | CSV/Excel import with smart mapping, validation, and duplicate checks |
| **API Integration** | RESTful API endpoints with token-based auth, validation, and rate limits |
| **Webhooks** | Real-time lead push from third-party forms |
| **Popular Sources** | Facebook Lead Ads, Google Forms, LinkedIn Lead Gen, website forms |

#### **🔖 Supporting Features:**

* **Auto-tagging**: Source tag auto-applied to incoming leads

* **Visual Field Mapping**: Map external fields to Tracklie custom fields

* **Duplicate Detection**: Phone/email match → flag or merge option

* **Error Logs**: Track failed imports or API requests

* **Rate Limiting**: Prevent misuse or overload

---

### **📞 Communication Integrations**

| Tool | Description |
| ----- | ----- |
| **Click-to-Call** | Dial via mobile apps or integrated dialers; call logged in timeline |
| **WhatsApp Business API** | Send templated messages with dynamic fields (e.g., name, demo time) |
| **Email (SMTP)** | Send follow-ups via template; track opens & replies |
| **SMS Gateway** | Connect to one or more vendors for alerts |

---

### **🔁 Advanced Integration Features**

| Feature | Description |
| ----- | ----- |
| **API Key Management** | Generate, revoke, and monitor API tokens |
| **Webhook Config Panel** | Configure retry logic, payload preview, and response logging |
| **Auto-Transform Logic** | Convert external format into Tracklie structure (e.g., lead language) |
| **Conditional Routing** | Apply routing rules based on source or content |
| **Smart De-duplication** | Check across phone, email, or custom fields before inserting |

---

### **🔄 Data Automation Workflows**

* Webhook → Lead Auto-ingested → Auto-tag → Auto-assigned (if eligible)

* Facebook Form → Auto-send WhatsApp welcome

* CRM Push → Auto-sync contact/payment data

* Recovery collection complete → Push to external finance system

---

### **🛠️ Future-Ready Integrations (Planned but not in current release)**

| Platform | Integration Type |
| ----- | ----- |
| **Razorpay, Stripe** | Direct payment link generation, auto-log |
| **Google Calendar** | Sync demos and meetings |
| **Salesforce / HubSpot** | Bi-directional CRM sync |
| **Tally / QuickBooks** | Accounting data sync for financial teams |
| **Mailchimp / ActiveCampaign** | Auto-enroll in nurturing journeys |

---

### **🧠 Example Flow:**

Facebook Ad → Form Filled → Webhook sends data → Lead enters “Fresh Pool” → Auto-tag \= “Facebook”  
 → Assigned to Hindi-speaking rep → Welcome WhatsApp auto-sent → Timeline updated

## **✅ Feature 9: Security & Permissions Module**

### **📌 Purpose:**

Ensure **enterprise-grade data protection**, **granular access control**, and **compliance readiness** across all user roles and system modules.

---

### **🔐 Authentication & Access Control**

| Method | Description |
| ----- | ----- |
| **Username/Password** | With configurable password strength policies |
| **Multi-Factor Authentication** | Via Email, SMS, or Authenticator App (optional) |
| **Single Sign-On (SSO)** | Google, Microsoft, SAML for enterprise clients |
| **Session Control** | Device tracking, concurrent login limits, inactivity timeouts |
| **API Auth** | JWT tokens \+ API key management |

---

### **🧱 Granular Permissions Model**

| Level | Description |
| ----- | ----- |
| **Module Level** | Enable/disable entire modules per role |
| **Feature Level** | Control specific actions within modules (e.g., edit vs view only) |
| **Field Level** | Lock sensitive fields (e.g., Final Price, Lead Source) per role |
| **Data Level** | Control scope (Own Leads / Team Leads / All Leads) |
| **Export Level** | Define who can export, what format, and which data |

---

### **📁 File & Data Security**

* All uploaded files stored in secure directories

* Role-based access to attachments and proof documents

* File download audit logs maintained

* Sensitive data masking for low-trust roles (e.g., phone → \*\*\*1234)

---

### **🔍 Activity Logs & Audit Trail**

| Feature | Description |
| ----- | ----- |
| **Immutable Logs** | Every action (view, edit, delete, export) logged with user ID |
| **Permission Changes** | Track who changed which role or permission and when |
| **Bulk Actions Monitoring** | Flags for mass edits, deletions, exports |
| **Security Alerts** | Suspicious logins, failed attempts, off-hours activity |

---

### **📜 Compliance & Data Retention**

| Policy Area | Details |
| ----- | ----- |
| **GDPR Compliance** | Data deletion rights, consent tracking, data portability tools |
| **Retention Settings** | Define how long to keep inactive leads, drop pool data, audit logs |
| **Anonymization Engine** | Auto-mask data after X days for compliance |
| **Backup Policy** | Daily encrypted backups with access logs |

---

### **🧠 Advanced Controls**

| Feature | Purpose |
| ----- | ----- |
| **Device Whitelisting** | Allow login only from registered devices or IPs (optional) |
| **Time-Based Access** | Restrict logins to business hours (optional per role) |
| **Emergency Access Mode** | Temporary elevated access with auto-revoke timer |
| **Security Dashboard** | Real-time alerts, suspicious actions, and audit health status summary |

## **✅ Feature 10: User Experience / UI Module (Final)**

---

### **📌 Purpose**

Deliver a **fast**, **intuitive**, and **CRM-focused interface** for desktop users, built with a **modular design system**, **consistent color theme**, and optimized for internal team usage.

🔒 *Mobile support is deferred — v1 is desktop-only for internal users using company laptops.*

---

### **🧩 Design Philosophy**

| Principle | Description |
| ----- | ----- |
| **Desktop-First** | No mobile or responsive view needed in v1 |
| **Role-Optimized** | Show only what matters to the logged-in role (Sales, Manager, Finance) |
| **Modular Components** | Reusable UI blocks: Lead Card, Follow-up Tile, Payment Bucket, etc. |
| **Minimalist Layout** | Focus on today’s tasks, no distractions |
| **Color as Status** | Use color coding to convey urgency, status, and completion visually |

---

### **🎨 Tracklie v1 Color Theme**

| Purpose | Color Preview | HEX Code |
| ----- | ----- | ----- |
| **Background (base)** |  | `#0D0F1C` |
| **Primary Button / CTA** |  | `#735DFF` |
| **CTA Hover** |  | `#6A4DFF` |
| **Highlight (Charts)** |  | `#00E4FF` |
| **Success** |  | `#28C76F` |
| **Error** |  | `#FF4D4F` |
| **Warning** |  | `#FFC107` |
| **Text (Primary)** |  | `#FFFFFF` |
| **Text (Secondary)** |  | `#B5B5B5` |
| **Sidebar Active Tab** |  | `#2D2C54` |
| **Dividers/Borders** |  | `#1C1C29` |

---

### **🧠 UI Modules & Layouts**

#### **🧭 Global Layout**

* **Top Bar**: API health, user avatar, "Get Started" CTA

* **Left Sidebar (Sticky)**:

  * Dashboard

  * Leads

  * Follow-ups

  * Payments

  * Analytics

* **Main Content Area**:

  * Role-specific widgets

  * Filters, search bar

  * Table/list views \+ graph views

---

#### **📋 Lead Profile Screen**

| Section | Description |
| ----- | ----- |
| **Header** | Lead name, status badge, interest level (color-coded) |
| **Action Bar** | Call, WhatsApp, Schedule Demo, Convert |
| **Tabs** | Timeline, Payments, Comments, Attachments |
| **Quick View Sidebar** | Lead Source, Campaign, Assigned To, Budget, Rating |

---

### **📈 Dashboards (Role-Based)**

#### **Salesperson View:**

* **Today’s Focus**: Leads to call, follow-ups, payment reminders

* **Personal Metrics**: Calls made, demos booked, conversions

* **Shortcuts**: Mark attendance, Add Lead, Send WhatsApp

#### **Manager View:**

* **Team Stats**: Leads worked, conversion %, hot leads without follow-up

* **Leaderboard**: Rep performance comparison

* **Actions**: Bulk assign, override rules, export reports

#### **Recovery Agent View:**

* **Buckets**: Due Today, Overdue 0–7, Overdue 30+, Dropped

* **Quick Actions**: Call, log payment, reschedule

* **Metrics**: Collected vs Outstanding, Recovery Rate

---

### **🧩 Component System (Modular Design)**

| Component Name | Usage Areas |
| ----- | ----- |
| **Lead Card** | Lead list views, assigned pool, search results |
| **Payment Widget** | Inside Lead view and Recovery dashboard |
| **Follow-up Tile** | Daily agenda, upcoming follow-ups |
| **Analytics Tile** | KPIs: Leads, Conversion, Revenue |
| **Status Badge** | Every lead/payment/follow-up status indicator |

---

### **🧭 Color-Coded Status Indicators**

#### **Leads:**

* **New**: `#0000FF` (Blue)

* **In Progress**: `#FFD700` (Light Yellow)

* **Interested-1/2**: `#808080` (Grey)

* **Interested-3**: `#FFA500` (Orange)

* **Interested-4/5**: `#28C76F` (Green)

* **Converted**: `#006400` (Dark Green)

* **Dropped**: `#FF4D4F` (Red)

#### **Payments:**

* **Full**: `#28C76F` (Green)

* **Partial**: `#FFA500` (Orange)

* **Due**: `#FFC107` (Yellow)

* **Overdue**: `#FF4D4F` (Red)

* **Dropped**: `#808080` \+ strikethrough

---

### **♿ Accessibility Considerations**

* Sufficient contrast for dark mode

* Keyboard accessibility across buttons, forms, navigation

* Tooltip hints on icons

* Consistent focus states for inputs and buttons

