# **✅ Tracklie Project: 20-Stage Master Plan**

| Stage | Title | Description |
| ----- | ----- | ----- |
| **0** | **✅ Prerequisites & Setup** | **Tech stack, folder structure, color theme, modularity** |
| **1** | **✅ Project Layout + Navigation Shell** | **Fixed sidebar, topbar, routing, placeholder pages** |
| **2** | **✅ Authentication & Role-Based Access** | **JWT login/logout, session-based, role guards** |
| **3** | **Lead Management (CRUD, Status, Source, Drop, Restore)** | **End-to-end lead lifecycle including soft delete** |
| **4** | **Follow-Up Scheduling \+ Alerts** | **Schedule follow-ups, missed status, pause reasons** |
| **5** | **Payments Flow (Post-Conversion Only)** | **Manual payments, installment tracking, badges** |
| **6** | **Dashboard Widgets (Role-Based Stats)** | **Personalized metrics for Sales, Admin, Recovery** |
| **7** | **Lead Profile View (Side Drawer)** | **One-click drawer with all lead details, status, logs** |
| **8** | **Notifications Panel \+ Email Alerts (Internal)** | **Bell icon, unread count, internal email triggers** |
| **9** | **Reporting \+ Filters \+ CSV Export** | **Admin/analyst dashboard, lead/payment tab, export** |
| **10** | **Soft Delete \+ Restore \+ Audit Trail** | **Deleted view, timeline log, restore with reason** |
| **11** | **Settings & Config (Sources, Follow-Up Reasons, Timings)** | **Admin-managed dropdowns and system-wide config** |
| **12** | **Roles & Permissions UI (Admin Controls)** | **View/change user roles, static permission matrix** |
| **13** | **Attendance Module (Check-In / Pause Tracking)** | **Check-in/out \+ pause reasons, used in lead routing** |
| **14** | **Final Selenium Test Suite \+ Regression Run** | **Test all core flows: auth, lead, follow-up, dashboard** |
| **15** | **Pre-Deployment QA \+ Build Checklist** | **Secrets, env vars, build/test/deploy verification** |
| **16** | **Access Control & Security Validation** | **Frontend & backend route protection by role** |
| **17** | **UAT \+ Client Readiness Verification** | **Final review of permissions, edge cases, and staging** |
| **18** | **Post-Go-Live Tools (Logs, Flags, Versioning, Cron Prep)** | **Future support tools – admin flags, version info, system logs** |
| **19** | **Performance Optimization (Caching, Lazy Loading)** | **Code splitting, Redis caching, database optimization, monitoring** |
| **20** | **Real-time Features (WebSocket Notifications)** | **Live notifications, dashboard updates, collaborative indicators** |

#  **✅ Stage 0: Prerequisites Setup (Cursor-Compatible)**

## **🧩 Overall Structure**

* Use mono-repo or two-repo structure as preferred

* Maintain modular, testable folder layout

* Enable clean separation of backend, frontend, and Selenium testing logic

---

## **🔧 Backend (FastAPI \+ MySQL)**

* Initialize FastAPI backend project

* Setup `.env` with DB connection string (MySQL)

* Create folders: `models/`, `schemas/`, `api/`, `services/`, `core/`, `utils/`

* Add base `/` health-check route

* Setup SQLAlchemy and DB connection

* Confirm app runs at `http://localhost:8000`

---

## **💻 Frontend (React \+ Custom CSS \+ TS)**

* Create React app using TypeScript template

* Setup Custom CSS architecture with BEM methodology

* Create folders: `components/`, `pages/`, `layouts/`, `services/`, `hooks/`, `constants/`, `context/`, `styles/`

* Configure routing using React Router DOM

* Confirm custom CSS is working with Tracklie theme colors

* App should run at `http://localhost:3000`

---

## **🧪 Testing (Selenium Preparation)**

* Create `/tests/selenium/` folder

* Add placeholder test file (e.g., `test_login.py`)

* Plan expected selectors (CSS/XPath) per screen for later stages

* Optional: setup test data stubs (CSV/JSON format)

---

## **🔐 Dev Standards & Housekeeping**

* `.gitignore` for node\_modules, env, pycache, etc.

* `README.md` with tech stack and setup commands

* `.env` file setup for both frontend & backend

* CORS settings in FastAPI (if ports are different)

---

## **✅ Stage 0 Completion Checklist**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Backend: FastAPI runs on localhost | ✅ | N/A |
| Backend: MySQL connected & ORM ready | ✅ | N/A |
| Frontend: React setup with Custom CSS theme | ✅ | N/A |
| Routing works for sample pages | ✅ | ✅ |
| Custom CSS components render with theme | ✅ | ✅ |
| Folder structure created (both FE & BE) | ✅ | N/A |
| `.env` files created | ✅ | N/A |
| Selenium folder & dummy test file created | ✅ | ✅ |
| Test data stubs created (optional) | ✅ | ✅ |

---

## **🎉 Stage 0 COMPLETED! (December 2024)**

**✅ All systems operational:**
- **Backend**: FastAPI + MySQL running on ports 8000/3306
- **Frontend**: Custom CSS + JavaScript routing on port 3000  
- **Testing**: 6/6 Selenium tests passing
- **Database**: `tracklie_crm` database with fresh MySQL installation
- **Infrastructure**: Grafana removed, clean port management

**🚀 Ready for Stage 1!**

---

# **✅ Stage 1: Project Layout \+ Navigation Shell (with UI Context)**

### **🎯 Goal:**

Lay the foundation for all pages with a **visually consistent**, **CRM-style**, **dark-themed layout**, ready for routing and Selenium testing.

---

## **🧩 UI Structure (Desktop-Only)**

`-----------------------------------------------------`  
`| Sidebar (fixed) |    Topbar (fixed)               |`  
`|                 |---------------------------------|`  
`|                 |                                 |`  
`|                 |   Main Page Content             |`  
`|                 |                                 |`  
`|                 |                                 |`  
`-----------------------------------------------------`

---

## **🖼️ Components & UI Expectations**

| Component | UI Behavior & Appearance |
| ----- | ----- |
| 🔲 `MainLayout` | \- Wraps every protected page \- Renders `Sidebar` (left), `Topbar` (top), and children content \- Fixed layout, full height |
| 📚 `Sidebar` | \- Vertical left nav with icons & labels \- Items: Dashboard, Leads, Follow-ups, Payments, Reports \- Highlight active tab \- Use Tracklie dark color (`#0D0F1C`) \+ active tab color (`#2D2C54`) |
| 🧭 `Topbar` | \- Full-width top header \- Shows: page title, user role (mocked), logout button \- Background: darker (`#0D0F1C` or slightly tinted) \- Right-side: placeholder for API status |
| 🧱 `PagePlaceholder` | \- Show centered “Coming Soon” message \- Used in `/leads`, `/followups`, etc. for now |
| 🔄 `RouteShell` | \- Wrapper for protected routes \- Will later check if user is logged in (used in Stage 2\) |
| 🎨 `ThemeConfig` | \- Custom CSS theme should apply dark colors, white text, hover effects |
| 🔗 `NavItem` (optional) | \- Subcomponent for each nav link (icon \+ label \+ active styling) |

---

## **🧾 Page Routes to Wire (Placeholder Screens)**

| Route | Screen Title | Component | UI Output |
| ----- | ----- | ----- | ----- |
| `/` | Redirect | — | Redirect to `/dashboard` |
| `/dashboard` | Dashboard | `DashboardPage` | Placeholder: "Coming Soon" |
| `/leads` | Leads | `LeadsPage` | Placeholder \+ empty table |
| `/followups` | Follow-ups | `FollowupsPage` | Placeholder |
| `/payments` | Payments | `PaymentsPage` | Placeholder |
| `/reports` | Reports | `ReportsPage` | Placeholder |

---

## **🎨 Theme Color Usage in UI**

| Element | Color HEX | Use |
| ----- | ----- | ----- |
| Sidebar background | `#0D0F1C` | App-wide nav background |
| Sidebar active tab | `#2D2C54` | Highlight for current nav |
| Primary text | `#FFFFFF` | Page text, labels |
| Muted text | `#B5B5B5` | Subtext, nav label on hover |
| Border / Divider | `#1C1C29` | Optional between sidebar and content |
| Hover item bg | `#2D2C54` | Optional hover color for sidebar items |
| Button primary (future) | `#735DFF` | Used in future CTAs |

---

## **🧪 Stage 1 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Sidebar shows all menu items with icons | ✅ | ✅ |
| Sidebar highlights current active page | ✅ | ✅ |
| Topbar shows user role, title, and placeholder logout | ✅ | ✅ |
| Route `/dashboard` renders with placeholder text | ✅ | ✅ |
| Other routes (`/leads`, `/payments`, etc.) reachable | ✅ | ✅ |
| Layout is modular via `MainLayout` wrapper | ✅ | ✅ |
| Dark theme colors render correctly | ✅ | ✅ |
| No responsive/mobile logic is present | ✅ | ✅ (Confirmed skipped) |
| RouteShell prepares protected layout (empty logic ok) | ✅ | ✅ |

---

## **🎉 Stage 1 COMPLETED! (December 2024)**

**✅ Professional Layout System Implemented:**
- **MainLayout**: Modular wrapper with sidebar + topbar + content structure
- **Sidebar**: Fixed navigation with Tracklie logo, nav items, badges, and user info
- **Topbar**: Header with dynamic page titles, welcome message, and action buttons
- **NavItem**: Reusable navigation components with icons, text, and badges
- **PagePlaceholder**: Rich placeholder pages with feature previews and "Coming Soon" content

**🎨 Advanced CSS Architecture:**
- **Component-specific CSS files** with shared global styles
- **CSS Variables system** for consistent theming and design tokens
- **BEM methodology** for maintainable and scalable styles
- **Dark theme** with exact color palette from UI reference
- **Professional animations** and hover effects

**🧪 Complete Testing Coverage:**
- **6/6 Selenium tests passing** with updated selectors
- **Hash-based routing** with active state management
- **Component integration** testing for all layout elements
- **CSS theme validation** for dark theme consistency

**🚀 Ready for Stage 2: Authentication & Role-Based Access**

---

# **✅ Stage 2: Authentication (Login \+ Logout \+ Auth Context \+ Protected Routing)**

🎯 Goal: Implement a **fully working login/logout system** with role-based access. All protected pages (like `/dashboard`, `/leads`) should **redirect to `/login` if unauthenticated**, and reflect **user role** on sidebar/topbar.

---

## **🔐 Core Objectives**

| Objective | Description |
| ----- | ----- |
| **Login Page UI** | Simple, centered form for email/password. No "signup" needed. |
| **Backend Login API** | Accepts email/password, returns JWT token \+ user info \+ role |
| **Auth Context** | Store token \+ user data in global context. Provide `useAuth()` hook. |
| **Protected Routing** | Wrap internal routes to auto-redirect to `/login` if not logged in |
| **Logout Flow** | Clear token and redirect to login |
| **Role Context Display** | Show user role (e.g., "Salesperson") in Topbar |

---

## **🧱 Frontend UI/UX Requirements**

| Component | UI Behavior & Visuals |
| ----- | ----- |
| 🟣 `LoginPage` | Centered form, dark background, floating labels or clean inputs (Tracklie theme) |
| 🟦 `InputField` | Reusable input with label \+ error \+ icon (optional) |
| 🔘 `LoginButton` | Primary CTA button styled with `#735DFF`, hover with `#6A4DFF` |
| ✅ `AuthContext` | Global context for token, user, login/logout functions |
| 🔐 `ProtectedRoute` | Wrapper component to protect `/dashboard`, `/leads`, etc. |
| 🧭 `Topbar` update | Shows `Welcome, {name}` and role, plus Logout button |
| 📁 `localStorage` | Store auth token and user info persistently |

---

## **🖥️ Backend (FastAPI)**

| Endpoint | Method | Purpose |
| ----- | ----- | ----- |
| `/auth/login` | POST | Accept email \+ password, validate, return JWT token \+ user object |
| `/auth/me` | GET | Authenticated route to return user info from token |
| `JWT handling` | — | Use `Authorization: Bearer <token>` in headers |
| `Password` | — | Store as SHA256 or bcrypt hash (minimum) |

📌 Use dummy data or a seed user like:

`{`  
  `"email": "admin@tracklie.com",`  
  `"password": "admin123",`  
  `"name": "Admin User",`  
  `"role": "Admin"`  
`}`

---

## **🧪 Selenium Test Actions (Stage 2\)**

| Action | Selector Targeting Suggestions |
| ----- | ----- |
| Open login page → form is visible | `data-testid="login-form"` |
| Enter wrong credentials → error shown | `data-testid="login-error"` |
| Enter correct credentials → redirect to dashboard | `data-testid="dashboard-page"` |
| Sidebar & topbar reflect correct role | `data-testid="user-role"` |
| Logout → redirect to login | `data-testid="logout-button"` |

---

## **📋 Stage 2 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Login form renders with email/password fields | ✅ | ✅ |
| Form uses Tracklie theme \+ colors | ✅ | ✅ |
| API call to `/auth/login` sends credentials | ✅ | ✅ |
| Valid login returns token \+ user info | ✅ | ✅ |
| Token \+ user info stored in Auth Context | ✅ | ✅ |
| User role shown in Topbar (`Welcome, Admin`) | ✅ | ✅ |
| Sidebar conditionally rendered post-login | ✅ | ✅ |
| ProtectedRoute blocks access to dashboard if not logged in | ✅ | ✅ |
| Logout clears context and redirects to login | ✅ | ✅ |
| Token persists across refresh via `localStorage` | ✅ | ✅ |
| Login \+ Logout testable via Selenium | ✅ | ✅ |

## **🎉 Stage 2 COMPLETED! (December 2024)**

**✅ Complete Authentication System Implemented:**
- **Backend**: FastAPI with SHA256 password hashing, JWT tokens (1-hour expiry), HttpOnly cookies
- **Frontend**: Login modal overlay with real-time validation, Auth Context, protected routing
- **Security**: Role-based access control, token verification, secure cookie handling
- **UX**: Toast notifications, loading states, demo credentials, responsive design

**🔐 Authentication Features:**
- **Login Modal**: Modern glass-morphism design with gradient effects and animations
- **Real-time Validation**: Email format, password length, required field validation
- **Auth Context**: Global state management with persistence across page refreshes
- **Protected Routes**: Automatic redirect to login modal for unauthenticated users
- **Role-based UI**: Dynamic button visibility based on user authentication state
- **Toast Notifications**: Success/error messages for all authentication events

**🧪 Complete Testing Coverage:**
- **10/10 Selenium tests passing** covering all authentication flows
- **Login/Logout**: Full authentication cycle testing
- **Form Validation**: Real-time validation and error handling
- **Protected Actions**: Access control verification
- **Modal Interactions**: Open/close, demo credentials, error states
- **Toast Notifications**: Success and error message verification

## **🎉 Stage 3 COMPLETED! (December 2024)**

**✅ Complete Role-Based Access Control System:**
- **Role Configuration**: Centralized role-to-permissions mapping with 8 user roles (Super Admin, Admin, Manager, Team Lead, Salesperson, Recovery Agent, Finance Manager, Analyst)
- **Dynamic Navigation**: Sidebar navigation updates in real-time based on user role
- **Role-Specific Dashboards**: Different dashboard widgets for each role type with realistic metrics
- **Route Protection**: UI hiding and URL redirection for unauthorized access

**🔄 Real-Time Role Switching:**
- **Dynamic Updates**: Sidebar navigation updates instantly when roles change
- **User Role Display**: Real-time user role display in sidebar with proper role names
- **Auth Integration**: Seamless integration with authentication system
- **State Management**: Proper state synchronization across all components

**🏠 Separate Home Page:**
- **Beautiful Landing Page**: Hero section with gradient backgrounds and glass-morphism effects
- **Feature Cards**: Interactive feature showcase with hover effects and animations
- **User Welcome**: Role-aware welcome messages and user information display
- **Action Buttons**: Quick navigation to dashboard and leads management

**🧪 Complete Testing Coverage:**
- **Selenium Tests**: Comprehensive role-based UI testing with real-time switching
- **Navigation Testing**: Tests for dynamic navigation updates and role permissions
- **Home Page Testing**: Tests for landing page functionality and user experience
- **Role Permissions**: Tests for proper access control and UI updates

**🚀 Ready for Stage 4: Lead Management System**

# **✅ Stage 3: User Roles \+ Sidebar Control \+ Dashboard Shells**

🎯 **Goal:** Dynamically render sidebar and dashboard based on the logged-in user’s role (e.g., Admin, Salesperson, Recovery Agent, etc.)

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| **Role-based Sidebar Items** | Only show relevant pages in sidebar based on user role (e.g., Recovery Agent shouldn’t see Leads or Follow-ups) |
| **Role-based Route Access (UI level)** | Prevent access to unauthorized pages (UI hides, but backend will also enforce later) |
| **Dashboard Shell per Role** | Render a different dashboard layout/content depending on user type |
| **Role Enum & Constants Setup** | Use clean enum/config-based mapping (not hardcoded strings everywhere) |

---

## **📁 Roles to Handle (From Feature List)**

| Role | Can Access Pages |
| ----- | ----- |
| **Super Admin** | All pages |
| **Admin / Manager** | Dashboard, Leads, Follow-ups, Payments, Reports |
| **Team Lead** | Same as Admin, but limited to their team |
| **Salesperson** | Dashboard, Leads, Follow-ups |
| **Recovery Agent** | Dashboard, Payments |
| **Finance Manager** | Dashboard, Payments |
| **Analyst** | Dashboard, Reports (read-only) |

---

## **🖼️ Frontend Requirements**

| Component | Description |
| ----- | ----- |
| 📦 `role.config.ts` | Enum or constant mapping of roles → routes/pages |
| 📚 `Sidebar` update | Conditionally render nav items based on `user.role` from context |
| 📊 `DashboardPage` | Use role to show different **widgets/cards** (e.g., Recovery Agent → Payment Buckets, Sales → Today’s Leads) |
| 🔒 `ProtectedRoute` | Accept optional `allowedRoles` to restrict page access further |
| 🎭 Dummy Dash Content | Add placeholder metrics for each role (can be random values for now) |

---

## **🧠 Sample Role Handling in Sidebar (Pseudocode)**

`if (user.role === 'Salesperson') {`  
  `show [Dashboard, Leads, Follow-ups]`  
`} else if (user.role === 'Recovery Agent') {`  
  `show [Dashboard, Payments]`  
`}`

✅ You can centralize this logic using a role-to-route mapping config for easy control.

---

## **🧪 Selenium Test Ideas (Stage 3\)**

| Scenario | Selector Suggestions |
| ----- | ----- |
| Login as Sales → only sees Leads & Follow-ups | `data-testid="sidebar-leads"` etc. |
| Login as Recovery Agent → only sees Payments | `data-testid="sidebar-payments"` |
| Dashboard title shows "Recovery Dashboard" or similar | `data-testid="dashboard-role-title"` |
| Unauthorized nav links are not present | Test absence of DOM elements |
| Route protection blocks opening hidden route via URL | Test redirect to `/dashboard` |

---

## **📋 Stage 3 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| `role.config.ts` or similar created with route/role mapping | \[ \] | N/A |
| Sidebar renders only allowed items per role | \[ \] | \[ \] |
| Each dashboard route shows correct title based on user role | \[ \] | \[ \] |
| Dummy metrics/cards shown per role in dashboard | \[ \] | \[ \] |
| Attempt to access restricted page redirects to `/dashboard` | \[ \] | \[ \] |
| Role stored in Auth Context and used across layout | \[ \] | \[ \] |
| Sidebar hover and active color use Tracklie theme | \[ \] | \[ \] |

**✅ Stage 4: Leads Page UI (Structure Only, No Logic Yet)**

🎯 **Goal:** Build the full UI shell for the Leads module — including page layout, filters, table, search, and status color badges — **without connecting backend logic**.  
 This gives us a fully testable front layer for future data, Selenium-ready selectors, and scoped components.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 🧱 **LeadsPage layout** | Dedicated route with Tracklie layout \+ topbar title \+ filter bar |
| 📑 **LeadsTable component** | Table with columns defined but with mock/dummy data (no API yet) |
| 🎛️ **Filter & Search Bar** | Static filter dropdowns (status, source, date) and search box |
| 🎨 **Status Badge component** | Colored tag for lead status (New, In Progress, Interested-3, Converted, etc.) |
| 📂 **LeadCard (optional)** | For future mobile/card view toggles (optional — can defer) |
| 📊 **Pagination & Placeholder Empty State** | Static pagination bar \+ “No leads found” message for testing |

---

## **🖼️ Visual Breakdown of Leads Page UI**

`----------------------------------------------`  
`| Topbar: "Leads"                             |`  
`|--------------------------------------------|`  
`| [ Search Box ] [ Status Filter ] [ Source Filter ] [ Date Range ] |`  
`|-------------------------------------------------------------------|`  
`| LeadsTable:                                                  ▼    |`  
`| +--------------------------------------------------------------+  |`  
`| | Name  | Phone     | Status      | Assigned To | Last Updated |  |`  
`| |-------|-----------|-------------|--------------|---------------|`  
`| | Priya | 987XXXXXX | Interested-4| Rishab       | 2h ago        |  |`  
`| +--------------------------------------------------------------+  |`  
`| Pagination [ Prev 1 2 3 Next ]                                   |`  
`----------------------------------------------`

---

## **🖌️ UI Components to Create**

| Component Name | Description |
| ----- | ----- |
| `LeadsPage.tsx` | Main page container under `/leads` route |
| `LeadsTable.tsx` | Static table with mock data & column headers |
| `StatusBadge.tsx` | Small component for color-coded status pill |
| `SearchInput.tsx` | Styled input box with search icon (left aligned) |
| `DropdownFilter.tsx` | Reusable dropdown for filters (status, source) |
| `DateFilter.tsx` | Two date pickers or a range selector |
| `PaginationBar.tsx` | Fake pagination (no logic yet) |
| `EmptyState.tsx` | “No Leads Found” placeholder message |

---

## **🎨 Status Colors (From UI Theme)**

| Lead Status | Badge Text | Color |
| ----- | ----- | ----- |
| **New** | `New` | `#0000FF` Blue |
| **In Progress** | `In Progress` | `#FFD700` Yellow |
| **CNP** | `CNP` | `#B5B5B5` Muted Grey |
| **Interested \- 3** | `Exploring` | `#FFA500` Orange |
| **Interested \- 4/5** | `Hot Lead` | `#28C76F` Green |
| **Converted** | `Converted` | `#006400` Dark Green |
| **Lost** | `Dropped` | `#FF4D4F` Red |

You can use `StatusBadge` like:

`<StatusBadge type="interested-4" label="Hot Lead" />`

---

## **🔁 Column Structure for LeadsTable**

| Column | Sample Data | Format |
| ----- | ----- | ----- |
| Name | Priya Sharma | Text |
| Phone | 987XXXXXXX | Masked |
| Status | Interested-4 | `StatusBadge` |
| Assigned To | Rishab | Name only |
| Last Updated | 2 hours ago | Relative time |

---

## **🧪 Selenium Testable Elements (Suggestions)**

| UI Element | Suggested `data-testid` |
| ----- | ----- |
| Search Box | `data-testid="lead-search"` |
| Status Filter | `data-testid="filter-status"` |
| Table Row | `data-testid="lead-row"` |
| Status Badge (per row) | `data-testid="status-badge"` |
| Pagination Controls | `data-testid="pagination-bar"` |
| Empty State | `data-testid="no-leads-found"` |

---

## **🧪 Selenium Test Ideas (Stage 4\)**

| Scenario | Test Action |
| ----- | ----- |
| Navigate to `/leads` page | URL test \+ page title check |
| See all column headers in table | Assert header text exists |
| Filter dropdowns and search bar are visible | Check for `data-testid`s |
| Status badges use correct color per status | Classname / style check |
| Empty state shows when table has no rows | Mock empty data \+ assert element |
| Pagination buttons render | Next / Prev button presence |

---

## **📋 Stage 4 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| LeadsPage route is registered (`/leads`) | \[ \] | \[ \] |
| LeadsTable displays mock data | \[ \] | \[ \] |
| Columns: Name, Phone, Status, Assigned, Updated present | \[ \] | \[ \] |
| StatusBadge renders color-coded label | \[ \] | \[ \] |
| Filter bar shows search \+ 2 dropdowns \+ date range filter | \[ \] | \[ \] |
| Placeholder text shown if no leads | \[ \] | \[ \] |
| Pagination bar renders with controls | \[ \] | \[ \] |
| All elements use consistent theme (dark, Tracklie colors) | \[ \] | \[ \] |
| All key components are modular | \[ \] | \[ \] |

# **✅ Stage 5: Lead Ingestion (Manual \+ API)**

🎯 **Goal:** Allow users to **manually add leads** via a form and ingest leads via **API**, store them in MySQL, and **display them in the LeadsTable** built in Stage 4\.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 📄 **Add Lead Form UI** | Modal or inline form to collect lead info (name, phone, email, source, budget, language, etc.) |
| 🧠 **Custom Field Support (v1)** | Use fixed fields for now, not full dynamic field builder |
| 🔗 **Submit to Backend** | Form sends POST request to FastAPI `/leads/` endpoint |
| 📥 **API Ingestion Endpoint** | External systems (FB, website) can POST leads via webhook-style API |
| 🔄 **Fetch Leads API** | Load leads using GET `/leads/` and populate LeadsTable |
| ⚠️ **Duplicate Prevention** | Check duplicate by phone or email (optional in v1) |
| 🔐 **Authentication Required** | Protect lead API with token (Authorization: Bearer \<JWT\>) |

---

## **📋 Fields for Manual Lead Entry (v1)**

| Field | Type | Notes |
| ----- | ----- | ----- |
| Name | Text | Required |
| Phone | Text | Required, format check |
| Email | Text | Optional |
| Budget | Number | Optional |
| Lead Source | Dropdown | FB, Website, Google, Referral |
| Language | Dropdown | Hindi, English, Other |
| Notes / Comments | Textarea | Optional |

Future stages will allow full dynamic field management. For now, keep these as form constants.

---

## **⚙️ Backend API Design (FastAPI)**

| Endpoint | Method | Auth? | Description |
| ----- | ----- | ----- | ----- |
| `/leads/` | GET | ✅ | Get all leads (filtered by role later) |
| `/leads/` | POST | ✅ | Add new lead (manual or API) |
| `/leads/{id}` | GET | ✅ | Get details of one lead |
| `/leads/webhook/` | POST | 🔒 (key-based) | Ingest via API (external source) |

*   
  Use SQLAlchemy for models

* Use Pydantic for schema validation

* Add `created_by` or `source` for audit

---

## **🖼️ Frontend UI Components**

| Component Name | Description |
| ----- | ----- |
| `AddLeadModal.tsx` | Modal with all lead form fields \+ submit button |
| `AddLeadButton.tsx` | Floating button or top-right CTA to open modal |
| `useLeadsService.ts` | API calls: fetchLeads(), createLead() |
| `FormInput.tsx` | Reusable input for text, number, select, etc. |
| `FormValidation.tsx` | Show required messages or pattern errors |
| `LoadingOverlay.tsx` | Optional loading spinner for submission |
| `Toast.tsx` (optional) | Show success or error messages after action |

---

## **🔐 Auth-Required API Setup**

* Use JWT Bearer token (`Authorization` header)

* Handle token refresh (optional)

* Prevent unauth access to `/leads` routes

* Validate and sanitize form input before DB insert

---

## **📥 Optional Webhook Ingestion (v1)**

| Source Example | Payload |
| ----- | ----- |
| Facebook Form | `{ name, phone, budget, source: "Facebook" }` |
| Website | `{ name, email, message, phone }` |

*   
  For now: accept via separate endpoint like `/leads/webhook/`

* No auth, or token via URL param (e.g., `?key=1234abc`)

* Server logs origin and inserts safely

---

## **🧪 Selenium Test Ideas (Stage 5\)**

| Scenario | Selector |
| ----- | ----- |
| Add lead button opens modal | `data-testid="add-lead-button"` |
| Submit form with empty fields shows error | `data-testid="form-error"` |
| Submit valid form closes modal | `data-testid="lead-row"` appears |
| New lead appears at top of table | Check for latest data |
| Form resets after submission | Empty input values |
| Page refresh still shows new lead | Confirms DB insert |

---

## **📋 Stage 5 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Add Lead button triggers modal | \[ \] | \[ \] |
| Form captures all required fields | \[ \] | \[ \] |
| Submit sends POST to FastAPI | \[ \] | \[ \] |
| Lead appears in UI table after successful add | \[ \] | \[ \] |
| Lead data stored in MySQL | \[ \] | N/A |
| Fetch API loads leads and populates LeadsTable | \[ \] | \[ \] |
| Auth token used for protected routes | \[ \] | N/A |
| Webhook-style external POST works (optional) | \[ \] | \[ \] |
| UI follows Tracklie theme and spacing | \[ \] | \[ \] |

# **✅ Stage 6: Lead Lifecycle (Status Updates, Interest Score, CNP, Conversion)**

🎯 **Goal**: Enable users to manage a lead’s **lifecycle stages** — change status, tag interest level (1–5), mark as CNP (Could Not Pick), and convert/dismiss leads.  
 This adds meaningful workflow control and improves data quality for follow-ups and reporting.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 🔄 **Status Control** | Allow status changes from: `New` → `In Progress` → `CNP` / `Interested` → `Qualified` → `Converted` / `Lost` |
| 📶 **Interest Level Slider** | A slider or select input (1–5) for interest scoring (especially on "Interested" leads) |
| 📌 **CNP Button** | One-click action to mark as CNP (lead didn't answer) with tracking & retry rules (backend or future stage) |
| 🟢 **Convert to Customer** | Mark as "Converted" and redirect lead to Payment module |
| ❌ **Mark as Lost** | Tag as dropped with a reason (from pre-filled list) — to be used in analytics later |

---

## **📄 Status Flow Map (v1)**

`New → In Progress`  
       `↓`  
     `CNP   ← Retry`  
       `↓`  
  `Interested (1–5)`   
       `↓`  
  `Qualified → Converted`  
       `↓`  
     `Lost / Dropped`

---

## **🖼️ UI Components to Build**

| Component Name | Description |
| ----- | ----- |
| `StatusDropdown.tsx` | Status changer dropdown with Tracklie status color badges |
| `InterestSlider.tsx` | Scale input (1–5) for interest tagging (active only if status \= Interested) |
| `CNPButton.tsx` | Button to mark lead as “Could Not Pick” |
| `ConvertLeadButton.tsx` | Action button to mark as “Converted” (triggers payment step) |
| `DropLeadButton.tsx` | Button to mark as “Lost” or “Dropped” |
| `DropReasonModal.tsx` | Modal with pre-filled categories: Financial, Not Interested, Joined Competitor, etc. |
| `StatusBadge.tsx` (update) | Display status visually with consistent color code |
| `useLeadStatusService.ts` | Hook to update status via API |

---

## **⚙️ Backend Additions**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/leads/{id}/status` | PATCH | Update lead’s status |
| `/leads/{id}/interest` | PATCH | Set interest level (1–5) |
| `/leads/{id}/convert` | POST | Mark as converted (assign to Payment module) |
| `/leads/{id}/drop` | POST | Drop with reason and timestamp |
| `/leads/{id}/cnp` | POST | Mark as CNP and trigger retry timer (optional backend logic) |

---

## **🎨 Status Color References (Repeat)**

| Status | Text | Color |
| ----- | ----- | ----- |
| New | `New` | `#0000FF` |
| In Progress | `In Progress` | `#FFD700` |
| CNP | `CNP` | `#808080` |
| Interested | `Hot Lead` | `#28C76F` |
| Qualified | `Qualified` | `#1E90FF` |
| Converted | `Converted` | `#006400` |
| Lost/Dropped | `Dropped` | `#FF4D4F` |

---

## **🧪 Selenium Test Ideas**

| Scenario | Test Action |
| ----- | ----- |
| Change status from New → In Progress | Select \+ Save |
| Set interest level to 4 | Slider interaction |
| CNP button clicked → badge updates | Button click \+ status check |
| Mark as Converted | Confirm backend \+ UI status |
| Drop modal appears → reason selected | Modal test |
| Lead disappears from “Working” pool | Optional behavior |

---

## **📋 Stage 6 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Status dropdown appears and updates correctly | \[ \] | \[ \] |
| Status visually updates on table and lead profile | \[ \] | \[ \] |
| Interest slider shows only when status \= Interested | \[ \] | \[ \] |
| Interest score saved to backend and shown on reload | \[ \] | \[ \] |
| CNP button marks status \+ tracks timestamp | \[ \] | \[ \] |
| Convert button changes lead status to Converted | \[ \] | \[ \] |
| Drop modal opens and saves drop reason | \[ \] | \[ \] |
| Lost leads are tagged and removed from working pool | \[ \] | \[ \] |
| All updates use correct Tracklie UI color \+ style | \[ \] | \[ \] |

# **✅ Stage 7: Attendance Module (Check-In / Check-Out / Pause System)**

🎯 **Goal**: Let sales team members **mark themselves as "Present" or "Paused"** via check-in/out buttons.  
 This system directly affects lead distribution eligibility in future stages.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| ✅ **Check-In / Check-Out UI** | Users can toggle their presence status via a button (or toggle) |
| 🕓 **Pause Statuses** | Users can set short-term pauses (with reason): “In Meeting”, “Lunch Break”, etc. |
| 🟢 **Eligibility Badge** | Show user’s active/present status clearly in the topbar or sidebar |
| 🔄 **Backend Update on Actions** | User attendance status gets stored in DB and affects lead assignment |
| 📅 **Working Hours Logic (optional)** | Later: Enforce only within business hours (configurable) |

---

## **🖼️ UI Design Context**

### **📍 Where Will This Live?**

| Location | Component | UI Behavior |
| ----- | ----- | ----- |
| Topbar (right) | `AttendanceToggle` | Button says `Check In` or `Check Out` based on current status |
| Dropdown modal | `PauseDropdown` | If user clicks “Pause”, show reasons and “Resume” option |
| Sidebar Footer | `AttendanceBadge` | Green/grey dot with "Present" or "Paused" label |

---

### **🖌️ Colors and Icons (Consistent with Tracklie Theme)**

| Status | Text | Icon | Color |
| ----- | ----- | ----- | ----- |
| Present | ✅ Present | Green Checkmark | `#28C76F` |
| Paused | ⏸️ Paused | Pause Icon | `#FFC107` |
| Absent | ❌ Absent | Grey Circle | `#B5B5B5` |

---

## **🧱 Frontend Components to Create**

| Component | Description |
| ----- | ----- |
| `AttendanceToggle.tsx` | Button to check in/out (updates global state) |
| `PauseDropdown.tsx` | Dropdown with reasons (Lunch, Break, Meeting, Personal) |
| `AttendanceBadge.tsx` | Status indicator badge (in topbar/sidebar) |
| `useAttendance.ts` | Custom hook to handle toggle, pause, resume API logic |
| `AttendanceContext.tsx` | Store status locally (present, paused, with reason) |
| `Toast.tsx` | Optional success/error popup after status update |

---

## **⚙️ Backend (FastAPI) Requirements**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/attendance/check-in` | POST | Mark user as "Present" with timestamp |
| `/attendance/check-out` | POST | Mark user as "Absent" or off-shift |
| `/attendance/pause` | POST | Set pause with reason (e.g., "Lunch") |
| `/attendance/resume` | POST | Resume from paused status |
| `/attendance/status` | GET | Fetch current status for user |
| `/attendance/logs` | GET | (Optional) Admin-level: see attendance history |

Each status change should log:

* User ID

* Status (`present`, `paused`, `absent`)

* Timestamp

* Reason (if paused)

---

## **🔐 Access Control**

| Role | Can Use Attendance? |
| ----- | ----- |
| Salesperson | ✅ Yes |
| Recovery Agent | ✅ Yes |
| Admin/Manager | ❌ Not required |
| Analyst/Finance | ❌ Not required |

---

## **📆 Optional Future Enhancements (deferred)**

* **Shift Timings**: Only allow check-in during 9 AM to 5 PM

* **Geo/GPS Tracking**: Capture location for check-in

* **Auto Check-Out**: After inactivity or end of day

* **Admin Panel to View Logs**

---

## **🧪 Selenium Test Plan**

| Scenario | Selector / Element |
| ----- | ----- |
| User logs in and sees "Check In" button | `data-testid="check-in-btn"` |
| User clicks “Check In” → becomes Present | `data-testid="attendance-badge"` \= green |
| User pauses → selects “Lunch Break” | `data-testid="pause-reason"` dropdown |
| User resumes from pause | `data-testid="resume-btn"` |
| Check-out disables lead assignment | Verified in later stage |
| Topbar and sidebar reflect current status | Icon \+ label color test |

---

## **📋 Stage 7 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| AttendanceToggle button renders in Topbar | \[ \] | \[ \] |
| Button updates based on user status | \[ \] | \[ \] |
| Paused status shows reason and yellow badge | \[ \] | \[ \] |
| Resume from pause resets to Present | \[ \] | \[ \] |
| API endpoints update backend attendance table | \[ \] | N/A |
| Badge shown in sidebar/footer with real-time sync | \[ \] | \[ \] |
| Status is stored in local/global context (persisted) | \[ \] | \[ \] |
| Color and icon are consistent with Tracklie theme | \[ \] | \[ \] |
| Role-based access: Only sales/recovery see attendance | \[ \] | \[ \] |

# **✅ Stage 8: Lead Distribution Engine (Round Robin \+ Manual Assignment)**

🎯 **Goal**: Automatically and manually distribute incoming leads based on team attendance and role eligibility — supporting **Round Robin** and **Manual Assign**.  
 This is the **first smart logic layer** that connects attendance, leads, and user roles.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 🔄 **Round Robin Auto-Assign** | Auto-assign new leads to eligible users who are checked-in, in rotating order |
| 👤 **Manual Assign UI** | Manager can assign leads via dropdown/modal from the Leads table |
| 🎯 **Lead Pools Setup** | Leads are grouped in views: `Unassigned`, `Assigned`, `Converted`, `Dropped`, etc. |
| ✅ **Eligibility Check (from Stage 7\)** | Only "Present" users with allowed roles (Sales, Recovery) are eligible to receive leads |
| 🧠 **Avoid double assignment** | Prevent assigning a lead to multiple users accidentally |
| 👥 **Team-wise Distribution (future)** | Stage 8 focuses on flat distribution; later we can add team filters |

---

## **🗂️ Lead Pool Definitions**

| Pool Name | Criteria |
| ----- | ----- |
| **Fresh / New** | Status \= "New", Assigned \= `null` |
| **Working** | Status \= "In Progress", "Interested" |
| **Converted** | Status \= "Converted" |
| **Dropped** | Status \= "Lost", "Dropped", "CNP" |
| **All Leads** | Everything |

---

## **⚙️ Backend Logic & APIs (FastAPI)**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/leads/auto-distribute` | POST | Trigger auto-assign for unassigned leads using round-robin |
| `/leads/{id}/assign` | POST | Assign a lead to a specific user |
| `/leads/eligible-users` | GET | Return list of checked-in users eligible for assignment |
| `/leads/unassigned` | GET | Return all leads with `assigned_to = null` |
| `/leads/assigned-to/{user_id}` | GET | Return all leads assigned to a user (Salesperson's dashboard) |

✅ Backend stores:

* Assignment timestamp

* Assigned user ID

* Distribution type: `auto` or `manual`

* Logs the distributor (if manual)

---

## **🖼️ Frontend UI Components**

| Component | Description |
| ----- | ----- |
| `LeadPoolsTabs.tsx` | Tabs to switch between Fresh, Assigned, Converted, Dropped, etc. |
| `AssignLeadModal.tsx` | Modal with dropdown of eligible users, triggered from Leads table |
| `AssignedToBadge.tsx` | Displays assigned user with initials/avatar |
| `AutoAssignButton.tsx` | (Optional) Button for Admin to trigger auto-assign on demand |
| `useAssignmentService.ts` | Hook for all assign-related API calls |
| `LeadTable` (update) | Add “Assign” column or action button if role is Admin/Manager |

---

## **👥 Round Robin Logic (Simplified)**

Maintain a server-side queue/list:

`eligible_users = [Riya, Mohit, Asha]`  
`next_index = (last_index + 1) % len(eligible_users)`

✅ Only includes users:

* With role \= `Sales` or `Recovery`

* Who are `Present` (checked-in)

* Who haven’t exceeded assignment cap (optional in future)

---

## **👨‍💼 Manual Assignment Rules**

| Who Can Assign? | Who Can Be Assigned? |
| ----- | ----- |
| Admin | Any eligible user |
| Manager | Own team (if teams exist) |
| Team Lead | Own team |
| Salesperson | ❌ Cannot assign |

---

## **🧪 Selenium Test Scenarios**

| Test Case | Selector Suggestions |
| ----- | ----- |
| Lead with no assignment shows “Assign” button | `data-testid="assign-btn"` |
| Manager opens modal → sees list of users | `data-testid="user-dropdown"` |
| Lead gets assigned and updates instantly | `data-testid="assigned-badge"` |
| Round robin assigns to present user | Check user with least leads |
| Assigned lead disappears from “Fresh” tab | Tab test |
| Converted leads don’t show “Assign” | Disabled action |

---

## **📋 Stage 8 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| LeadPoolsTabs component implemented | \[ \] | \[ \] |
| “Fresh” tab shows unassigned leads | \[ \] | \[ \] |
| AssignLeadModal opens from table row | \[ \] | \[ \] |
| Eligible users shown in modal (fetched from API) | \[ \] | \[ \] |
| Assigning lead updates table instantly | \[ \] | \[ \] |
| Auto-assign endpoint works and updates multiple leads | \[ \] | \[ \] |
| Assigned leads appear in “Working” tab | \[ \] | \[ \] |
| Round robin ensures even distribution (optional test) | \[ \] | \[ \] |
| No assign actions visible to unauthorized roles | \[ \] | \[ \] |
| AssignedTo badge uses consistent UI style (color, initials, etc.) | \[ \] | \[ \] |

---

# **✅ Stage 9: Follow-Up Scheduling \+ Alerts**

🎯 **Goal**: Allow users to **schedule follow-ups** (like next call/demo dates), **view upcoming commitments**, and get **visual alerts/reminders** for pending or missed follow-ups.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 📅 **Schedule Follow-Up Date** | Users can set a date/time for next call/demo/follow-up |
| ⏰ **Remind Before / Overdue** | If due date is passed, highlight in red (missed); if today, show badge |
| 🧾 **Follow-Up Log View** | Maintain visible list of all past scheduled follow-ups and outcomes |
| 🔔 **Upcoming Alerts (UI only)** | Show alert badge/icon on Leads page and Topbar for today’s follow-ups |
| 📋 **Call Notes & Outcome Field** | Optional textarea after a follow-up to note result (interested/not interested/etc.) |

---

## **🖼️ Where It Lives in the UI**

| View | Components Affected |
| ----- | ----- |
| **Leads Table** | Add a “Next Follow-Up” column with colored text (green/today, red/overdue) |
| **Lead Profile (popup or sidepane)** | Add full follow-up timeline view |
| **Dashboard (optional)** | “Today’s Follow-Ups” widget |
| **Topbar (alert icon)** | 🔔 icon with red badge if any missed/today follow-ups for current user |

---

## **🧱 Frontend Components to Build**

| Component Name | Description |
| ----- | ----- |
| `FollowUpModal.tsx` | Add/edit follow-up date/time, outcome, and notes |
| `NextFollowUpBadge.tsx` | Colored badge in table row: Red (missed), Yellow (today), Grey (future) |
| `FollowUpList.tsx` | List of scheduled follow-ups inside lead profile |
| `FollowUpAlert.tsx` | Icon or alert in topbar (🔔) showing count of due/missed leads |
| `FollowUpCard.tsx` | Mini card in dashboard or sidebar with name, time, contact button |
| `useFollowUpService.ts` | API calls: create, fetch, update follow-ups |
| `Toast.tsx` | Feedback after scheduling a follow-up |

---

## **📅 Status Coloring (Based on Date)**

| Scenario | Badge Text | Color |
| ----- | ----- | ----- |
| Due today | 🔔 Today | `#FFC107` (Yellow) |
| Missed (date \< today) | ❗ Missed | `#FF4D4F` (Red) |
| In future | 📅 Upcoming | `#B5B5B5` (Muted) |
| No follow-up scheduled | ⏳ Not Set | `#2D2C54` (Neutral) |

---

## **⚙️ Backend APIs (FastAPI)**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/leads/{id}/follow-up` | POST | Add next follow-up for lead |
| `/leads/{id}/follow-ups` | GET | Get all follow-ups for a lead |
| `/user/follow-ups/today` | GET | Get all follow-ups due for today |
| `/user/follow-ups/missed` | GET | Get all follow-ups missed (date \< today) |
| `/follow-up/{id}` | PATCH | Update existing follow-up |
| `/follow-up/{id}` | DELETE | (Optional) Cancel/delete follow-up |

Backend should also store:

* `lead_id`

* `user_id`

* `follow_up_time`

* `notes`

* `outcome` (optional: call made, not reachable, interested, etc.)

* `created_at` timestamp

---

## **🔒 Access Rules**

| Role | Can Schedule Follow-Up? | Can View All? |
| ----- | ----- | ----- |
| Salesperson | ✅ Yes (only own leads) | ❌ No |
| Admin | ✅ Yes | ✅ Yes |
| Team Lead | ✅ Yes | ✅ Team leads |
| Analyst | ❌ No | ✅ View Only |

---

## **🧪 Selenium Test Scenarios**

| Scenario | Test Action |
| ----- | ----- |
| Click “Set Follow-Up” → modal opens | `data-testid="followup-modal"` |
| Date/time picker works | Input and submit |
| Badge in table row changes color correctly | `data-testid="followup-badge"` |
| Topbar alert icon shows missed alert | `data-testid="alert-badge"` |
| Follow-up timeline shows past logs | `data-testid="followup-log"` |
| Notes field saves correctly | Input → Save → Reload check |
| Follow-up not allowed for unassigned leads | Edge case check |

---

## **📋 Stage 9 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| FollowUpModal renders and collects input | \[ \] | \[ \] |
| Follow-up gets stored and shown in table | \[ \] | \[ \] |
| Color-coded badges based on date (missed/today/future) | \[ \] | \[ \] |
| Dashboard/topbar shows today's due follow-ups | \[ \] | \[ \] |
| Lead profile shows full follow-up history | \[ \] | \[ \] |
| Role-based access for follow-up actions | \[ \] | \[ \] |
| Notes and outcomes field persists | \[ \] | \[ \] |
| No follow-up option visible for Converted or Dropped leads | \[ \] | \[ \] |
| Alerts only shown to logged-in user (not system-wide) | \[ \] | \[ \] |

# **✅ Stage 10: Dashboard Widgets (Basic Stats & Role-Based Insights)**

🎯 **Goal:** Show relevant **dashboard widgets** based on user role — counts, summary cards, activity metrics — using real data from the system.  
 This gives users a **daily command center** and managers a **quick health view** of the funnel.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 📊 **Dashboard Widgets (cards)** | Show key metrics: leads assigned, converted, dropped, missed follow-ups, etc. |
| 👤 **Role-Based Dashboards** | Sales see personal stats, Admins see full stats, TLs see team stats |
| 📆 **Today-Specific Insights** | Focus on “today’s” work: fresh leads, follow-ups, conversions |
| 🔁 **Real-Time Stats** | Pull live data from backend, refreshed on route load |
| 🕓 **Optional Last Activity / Trends** | Show last 7-day trends or last login time (v2+) |

---

## **🖼️ Widget Examples by Role**

### **🔹 Salesperson Dashboard**

| Widget Name | Value Source |
| ----- | ----- |
| ✅ Leads Assigned Today | Count where `assigned_to = me AND created_today` |
| 📞 Follow-Ups Due Today | From follow-up module |
| 🔄 In-Progress Leads | Status \= In Progress or Interested |
| 🟢 Converted Leads | Count where status \= Converted |
| ❌ Missed Follow-Ups | Count where follow-up date \< today |

---

### **🔹 Manager / Admin Dashboard**

| Widget Name | Value Source |
| ----- | ----- |
| 🧑 Total Active Salespeople | Checked-in today |
| 💼 Total Leads Today | All leads created today |
| 🎯 Conversions Today | All leads converted today |
| 📉 Dropped Leads Today | Leads marked “Lost” |
| 🕒 Avg Response Time | Future metric (v2+) |

---

### **🔹 Recovery Agent / Finance View**

| Widget Name | Value Source |
| ----- | ----- |
| 💰 Payments Received Today | Manual entry or payment flow |
| 📞 Follow-ups Due | From lead \+ follow-up system |
| 🟡 Soft Follow-ups Missed | Follow-up missed \+ not converted |

---

## **🧱 Frontend Components**

| Component | Description |
| ----- | ----- |
| `DashboardPage.tsx` | Route: `/dashboard`, role-based conditional rendering |
| `DashboardCard.tsx` | Reusable stat card (icon, label, count) |
| `DashboardSection.tsx` | Wraps card groups (e.g., Follow-Up Stats, Lead Stats) |
| `useDashboardStats.ts` | API hook to fetch data for that user’s dashboard |
| `StatCardSkeleton.tsx` | Loading state placeholder for cards |
| `TopbarTitle.tsx` (update) | Optional subtitle: "Welcome back, Mohit. You have 3 follow-ups today." |

---

## **🎨 Stat Card Design (Dark Theme)**

| Element | Style |
| ----- | ----- |
| Background | `#1C1C29` or darker variant |
| Font | Bold white or `#FFFFFF` |
| Subtext | Muted: `#B5B5B5` |
| Icon | Lucide or HeroIcons with role color |
| Border/Shadow | Subtle, rounded corners, glow on hover |
| Color Variant | Green (converted), Yellow (today), Red (missed), Blue (assigned), Grey (dropped) |

---

## **⚙️ Backend APIs (FastAPI)**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/dashboard/sales-summary` | GET | Returns widget counts for current salesperson |
| `/dashboard/admin-summary` | GET | Admin overview (total leads, agents, conversions, etc.) |
| `/dashboard/recovery-summary` | GET | Payments & follow-ups |
| `/user/last-login` | GET | (Optional) Used for topbar greeting |
| `/leads/count?status=x&date=y` | GET | Optional helper endpoint |

Each role-based dashboard calls one dedicated endpoint for performance reasons.

---

## **🧪 Selenium Test Scenarios**

| Scenario | Selector Suggestions |
| ----- | ----- |
| Sales sees 5 cards only | `data-testid="dashboard-card"` |
| Admin sees 8 cards including “Agents Active” | Count test |
| Card shows actual data | Text content check |
| Hover effect or color match check | CSS / class test |
| Topbar title uses name \+ welcome line | `data-testid="dashboard-greeting"` |

---

## **📋 Stage 10 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| DashboardPage route loads by role | \[ \] | \[ \] |
| `DashboardCard` component renders with correct props | \[ \] | \[ \] |
| Salesperson cards show only own stats | \[ \] | \[ \] |
| Admin sees global metrics across system | \[ \] | \[ \] |
| Cards show different colors/icons per metric | \[ \] | \[ \] |
| Greeting message in topbar uses user context | \[ \] | \[ \] |
| Stats update on reload via `useDashboardStats()` | \[ \] | \[ \] |
| Loading state visible before data fetch | \[ \] | \[ \] |

# **✅ Stage 11: Lead Profile View (Side Drawer / Popup)**

🎯 **Goal**: Build a dedicated **lead detail view** that opens from any lead row and displays **all information**, **action controls**, and **interaction history** — without navigating away from the table.  
 This empowers the team to **act quickly**, **track context**, and **update statuses** from one place.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 🧾 **Lead Detail Side Drawer** | Opens from LeadsTable row or dashboard, shows lead info in structured view |
| 🧑 **Contact Info Block** | Top section shows name, phone, email, language, source |
| 🔄 **Live Status Control** | Dropdown to change status (from Stage 6\) |
| 📶 **Interest Score Slider** | Optional if status \= Interested |
| 📞 **Follow-Up Schedule Panel** | Schedule \+ show existing follow-ups (from Stage 9\) |
| 📜 **Timeline of Actions** | Log of all updates made to the lead (status change, follow-up, assignment) |
| ✏️ **Quick Edit Fields** | Allow editing name, phone, etc. inline (optional) |
| 📁 **File Upload (future)** | Attach docs/images (placeholder) |

---

## **🖼️ UI Flow and Design Overview**

`Click on lead row → Opens Side Drawer:`  
`-------------------------------------------------`  
`| ← Close | Lead Name - Status Badge            |`  
`|------------------------------------------------|`  
`| 👤 Contact Info                                |`  
`|     - Phone | Email | Language | Source       |`  
`|------------------------------------------------|`  
`| 🧭 Status & Interest Slider                    |`  
`|------------------------------------------------|`  
`| 📅 Follow-Up Section (view + schedule)         |`  
`|------------------------------------------------|`  
`| 🧾 Timeline / Activity Log                     |`  
`|     - Status changed to X by Y                 |`  
`|     - Lead assigned to Rishab                  |`  
`|     - Call scheduled on 28 Sep                 |`  
`|------------------------------------------------|`  
`| (Optional) Edit Details / Upload Document      |`  
`-------------------------------------------------`

---

## **🧱 Frontend Components**

| Component Name | Description |
| ----- | ----- |
| `LeadProfileDrawer.tsx` | Full side panel, anchored right |
| `LeadContactBlock.tsx` | Name, phone, email, source, avatar |
| `LeadStatusControl.tsx` | Status \+ interest input |
| `FollowUpBlock.tsx` | Existing \+ schedule follow-up button |
| `LeadTimeline.tsx` | Activity stream: who changed what and when |
| `useLeadProfile.ts` | API hook for fetching/updating one lead |
| `DrawerSkeleton.tsx` | Loading state for drawer |
| `EditField.tsx` | Reusable inline text input component |
| `UploadBlock.tsx` (future) | Placeholder for uploads |

---

## **⚙️ Backend APIs (FastAPI)**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/leads/{id}` | GET | Get full details of a single lead |
| `/leads/{id}/activity-log` | GET | All changes made to the lead |
| `/leads/{id}` | PATCH | Update lead info (name, phone, etc.) |
| `/leads/{id}/upload` | POST | (Future) Upload documents/images |

Activity log includes:

* Date

* Actor (user)

* Action: status change, follow-up added, assignment, conversion, drop

---

## **🔐 Access Logic**

| Role | Can Open Drawer? | Can Edit Fields? | Can View Log? |
| ----- | ----- | ----- | ----- |
| Salesperson | ✅ Yes | ✅ Own leads | ✅ Own only |
| Manager/Admin | ✅ Yes | ✅ All leads | ✅ All logs |
| Analyst | ✅ Yes | ❌ No | ✅ View only |

---

## **🎨 Drawer Styling**

| Element | Style Notes |
| ----- | ----- |
| Drawer BG | `#0D0F1C` (main theme) |
| Header | Sticky, lead name \+ status badge |
| Section Blocks | Use card-style white-on-dark backgrounds |
| Timeline Items | Left-line stepper design (date \+ icon \+ action text) |
| Input Fields | Transparent with borders, placeholder text in muted color |
| Status / Score | Styled components from earlier stages reused here |

---

## **🧪 Selenium Test Scenarios**

| Scenario | Suggested Selector |
| ----- | ----- |
| Click on lead row → drawer opens | `data-testid="lead-drawer"` |
| Status updated inside drawer | `data-testid="status-select"` |
| Follow-up panel shows scheduled date | `data-testid="followup-entry"` |
| Add new follow-up from drawer | `data-testid="add-followup-btn"` |
| Timeline entries show actor and timestamp | `data-testid="timeline-entry"` |
| Fields are editable for allowed roles | `data-testid="editable-field"` |

---

## **📋 Stage 11 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Drawer opens from lead table row click | \[ \] | \[ \] |
| Lead contact info block shows name, phone, email, source | \[ \] | \[ \] |
| Status \+ interest controls update live | \[ \] | \[ \] |
| Follow-up list \+ scheduling available inside drawer | \[ \] | \[ \] |
| Timeline stream shows full activity | \[ \] | \[ \] |
| Edit fields inline (name/phone/email) (optional) | \[ \] | \[ \] |
| Access respects role-based control | \[ \] | \[ \] |
| Loading skeleton shown on drawer open | \[ \] | \[ \] |
| UI uses consistent Tracklie styling and spacing | \[ \] | \[ \] |

# **✅ Stage 12: Payments Flow (Post-Conversion Only)**

🎯 **Goal:** Enable the team to **track payments** after a lead is converted — including **amount, method, date**, and **installment status**.  
 This forms the foundation of revenue tracking and helps Recovery/Finance roles manage payment follow-ups.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 💰 **Payment Entry Form** | Once a lead is marked “Converted,” allow adding one or more payments manually |
| 🧾 **View Payment History** | List all past payments for that lead |
| 📊 **Payment Status Summary** | Show: Total Paid, Remaining, Last Payment Date |
| 🧮 **Installment Handling (v1)** | Optional: support partial payments and status tracking |
| 🧠 **Finance Role Dashboard** | Finance or Recovery agents can track all payments by status (e.g., Due, Partial, Cleared) |

---

## **🧠 When Payment Module is Triggered**

| Action/Event | Outcome |
| ----- | ----- |
| Lead marked as `Converted` | `/payments/add` option appears on Lead Profile or via Leads Table |
| Admin/Finance opens Payments tab | Shows a grid of all payment records across all leads |

---

## **🖼️ UI Components to Build**

| Component Name | Description |
| ----- | ----- |
| `AddPaymentModal.tsx` | Form to enter payment details (lead pre-filled) |
| `PaymentHistoryList.tsx` | List of all payments made for the lead |
| `PaymentCard.tsx` | Summary card: Total Paid, Balance, Status |
| `PaymentsPage.tsx` | Dedicated `/payments` page with all converted leads \+ payment summary |
| `PaymentStatusBadge.tsx` | Badge like “Pending”, “Partial”, “Completed” (color-coded) |
| `usePaymentService.ts` | API hook for all payment actions |
| `AddPaymentButton.tsx` | Shows only if lead status \= Converted |

---

## **💸 Payment Fields (Manual Entry)**

| Field Name | Type | Validation |
| ----- | ----- | ----- |
| Lead Name (pre-filled) | Auto | Required |
| Amount Paid | Number | Required, \> 0 |
| Total Package (optional in v1) | Number | Used to calculate remaining |
| Mode of Payment | Dropdown | UPI, Bank Transfer, Cash, Card, Other |
| Payment Date | DatePicker | Default \= Today |
| Notes (optional) | Textarea | Optional remarks |

---

## **📦 Installments Handling (v1: Manual Only)**

* Users can **add multiple payments** per lead

* Total paid \= sum of payments

* Balance \= optional (manual input for now)

* Later stages may add installment plans with due dates

---

## **🎨 Status Badge Color Logic**

| Status | Logic | Color |
| ----- | ----- | ----- |
| Pending | No payment yet | `#FF4D4F` (Red) |
| Partial | Some payment, not full | `#FFC107` (Yellow) |
| Completed | Total paid \= Total package | `#28C76F` (Green) |
| Overdue (future) | Missed installment date | `#FF0000` (Bright Red) |

---

## **⚙️ Backend APIs (FastAPI)**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/payments/` | POST | Add a payment to a lead |
| `/payments/lead/{lead_id}` | GET | List all payments for that lead |
| `/payments/summary/{lead_id}` | GET | Return payment total, status, last payment date |
| `/payments/all` | GET | (For Admin/Finance) View all payments |
| `/payments/{payment_id}` | PATCH | Update payment record |
| `/payments/{payment_id}` | DELETE | Optional: delete payment entry |

---

## **🔐 Access Control**

| Role | Can Add Payment? | Can View All Payments? |
| ----- | ----- | ----- |
| Salesperson | ❌ No | ❌ No |
| Recovery Agent | ✅ Yes | ✅ Own payments |
| Admin/Finance | ✅ Yes | ✅ All payments |

---

## **🧪 Selenium Test Scenarios**

| Scenario | Suggested Test ID |
| ----- | ----- |
| Lead marked as converted → Add Payment button appears | `data-testid="add-payment-btn"` |
| Payment form opens and submits with valid data | `data-testid="submit-payment"` |
| Payment history shows correct values | `data-testid="payment-list"` |
| Status badge updates from Pending → Partial | `data-testid="payment-status"` |
| Total paid value updates correctly | `data-testid="payment-total"` |
| Finance dashboard shows all payment records | `data-testid="finance-payments-table"` |

---

## **📋 Stage 12 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| AddPaymentModal renders with all fields | \[ \] | \[ \] |
| Submitting payment updates lead’s payment status | \[ \] | \[ \] |
| Payment summary visible on Lead Profile | \[ \] | \[ \] |
| PaymentsPage shows all records for finance role | \[ \] | \[ \] |
| PaymentStatusBadge reflects correct status based on total | \[ \] | \[ \] |
| Access is restricted to correct roles | \[ \] | \[ \] |
| Status changes as more payments are added (Pending → Partial → Done) | \[ \] | \[ \] |

# **✅ Stage 13: Reporting Dashboard \+ Filters \+ Export**

🎯 **Goal:** Give Admins and Analysts a way to **filter**, **analyze**, and **export** lead & payment data.  
 This is a **read-only, insight-driven module** with dynamic filters, summary cards, and CSV export capabilities.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 📊 **Reports Page with Role Access** | `/reports` route, only visible to Admin, Analyst |
| 🎛️ **Filter Panel (Leads \+ Payments)** | Filter by status, date, assigned user, source, conversion stage, etc. |
| 📄 **Summary Cards** | High-level metrics: Total Leads, Converted, Dropped, Revenue, etc. |
| 📈 **Table View with Pagination** | Leads/Payments in tabular format, sortable |
| 🧾 **CSV Export Feature** | Download filtered view as Excel/CSV |
| 🔄 **Live Refreshing** | Every filter updates table \+ cards in real time (no reload) |

---

## **🖼️ Page Structure**

`/reports`  
`------------------------------------------------------`  
`| Filters: Date Range | Status | Role | Source       |`  
`------------------------------------------------------`  
`| Summary Cards:`  
`| - Total Leads`  
`| - Leads Converted`  
`| - Revenue Received`  
`| - Conversion Rate (%)`  
`------------------------------------------------------`  
`| Table (Leads or Payments)`  
`| - Toggle: [ Leads ] [ Payments ]`  
`| - Columns change based on tab`  
`------------------------------------------------------`  
`| [Export CSV] Button`  
`------------------------------------------------------`

---

## **🧱 Frontend Components**

| Component | Description |
| ----- | ----- |
| `ReportsPage.tsx` | Main wrapper |
| `FilterPanel.tsx` | Date pickers, dropdowns, multiselect |
| `SummaryCardsRow.tsx` | Cards showing calculated stats |
| `ReportsTable.tsx` | Reusable for Leads or Payments |
| `ExportButton.tsx` | Triggers CSV/Excel export |
| `useReportsService.ts` | Handles fetches based on filters |
| `ToggleTabs.tsx` | Switch between "Leads" and "Payments" views |

---

## **🎛️ Filter Options (Leads Tab)**

| Filter Name | Type |
| ----- | ----- |
| Date Range | Created Date |
| Lead Status | Multi-select |
| Assigned User | Dropdown |
| Lead Source | Dropdown |
| Converted/Dropped | Toggle |

---

## **💸 Filter Options (Payments Tab)**

| Filter Name | Type |
| ----- | ----- |
| Payment Date | Range |
| Payment Status | Multi-select (Pending, Partial, Completed) |
| Lead Source | Dropdown |
| Mode of Payment | Dropdown |
| Assigned User | Dropdown |

---

## **📊 Summary Cards Examples**

| Card Title | Calculation Logic |
| ----- | ----- |
| Total Leads | All leads in filter range |
| Converted Leads | Status \= Converted |
| Dropped Leads | Status \= Lost |
| Conversion Rate | % \= Converted / Total |
| Total Revenue | Sum of payments |
| Avg Revenue/Lead | Revenue ÷ Converted Leads |

Add more cards easily — layout should be grid-flexible.

---

## **⚙️ Backend APIs (FastAPI)**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/reports/leads` | GET | Return filtered leads |
| `/reports/payments` | GET | Return filtered payments |
| `/reports/leads/summary` | GET | Return summary counts (converted, total, etc.) |
| `/reports/payments/summary` | GET | Return revenue summary |
| `/reports/leads/export` | GET | Return filtered leads as downloadable CSV |
| `/reports/payments/export` | GET | Return filtered payments as downloadable CSV |

✅ Query params: `start_date`, `end_date`, `status`, `source`, `assigned_to`, etc.

---

## **🔐 Access Roles**

| Role | Access to Reports? | Can Export? |
| ----- | ----- | ----- |
| Admin | ✅ Yes | ✅ Yes |
| Analyst | ✅ Yes | ✅ Yes |
| Team Lead | ✅ (Own team only) | ✅ |
| Sales | ❌ No | ❌ |

---

## **🔁 Export Logic**

* Uses the current filter state

* Generates downloadable `.csv` with appropriate headers

* Can be initiated from:

  * Leads tab

  * Payments tab

---

## **🧪 Selenium Test Scenarios**

| Scenario | Suggested Test ID |
| ----- | ----- |
| Filters show correct values on selection | `data-testid="filter-panel"` |
| Summary cards update correctly on filter apply | `data-testid="summary-card"` |
| Export CSV downloads valid file | Trigger \+ file name match |
| Table loads only filtered values | Row content matches filters |
| Switch between Leads/Payments tabs | `data-testid="tab-toggle"` |
| Unauthorized roles cannot access reports | Redirect or error |
| Revenue total matches sum of table | Compare via DOM |

---

## **📋 Stage 13 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Reports page layout and routing setup | \[ \] | \[ \] |
| Filters apply and fetch updated results | \[ \] | \[ \] |
| Summary cards render correct stats | \[ \] | \[ \] |
| Table shows leads/payments with pagination | \[ \] | \[ \] |
| Toggle between tabs changes table & columns | \[ \] | \[ \] |
| Export button generates filtered CSV | \[ \] | \[ \] |
| Backend APIs support all filters | \[ \] | \[ \] |
| Role-based access to page | \[ \] | \[ \] |
| Styling is consistent with Tracklie dashboard | \[ \] | \[ \] |

# **✅ Stage 14: Soft Delete \+ Restore \+ Audit Trail**

🎯 **Goal:** Enable users to **soft-delete leads and payments** (without permanently erasing them), allow **restoration**, and maintain a **complete audit trail** of key actions across the system.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 🧹 **Soft Delete for Leads \+ Payments** | Mark as "deleted" but keep in DB |
| ♻️ **Restore Functionality** | Restore accidentally deleted items |
| 🕵️ **Audit Trail Logging** | Record major actions (status changes, assignments, drops, deletes, etc.) |
| 📑 **Deleted Items View (Admin Only)** | Special page to view/manage all deleted items |
| 🚫 **Hide Deleted from Normal Views** | Deleted items won’t show in normal leads/payments tables |

---

## **💡 What is Soft Delete?**

* No data is permanently removed.

* A `is_deleted: bool` field is added to leads & payments.

* Queries must always include `WHERE is_deleted = false` unless admin view.

---

## **⚙️ Backend Updates (FastAPI)**

### **🔧 DB Schema**

| Table | New Columns |
| ----- | ----- |
| Leads | `is_deleted: bool`, `deleted_at`, `deleted_by` |
| Payments | `is_deleted: bool`, `deleted_at`, `deleted_by` |
| AuditLogs | New table (see below) |

### **📡 API Endpoints**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/leads/{id}/delete` | POST | Soft delete a lead |
| `/leads/{id}/restore` | POST | Restore deleted lead |
| `/payments/{id}/delete` | POST | Soft delete payment |
| `/payments/{id}/restore` | POST | Restore deleted payment |
| `/admin/deleted/leads` | GET | View all soft-deleted leads |
| `/admin/deleted/payments` | GET | View all soft-deleted payments |
| `/audit-log/` | GET | Paginated audit logs |
| `/audit-log/{lead_id}` | GET | Audit history for specific lead |

---

## **🔏 Audit Log Table Schema**

| Column | Type |
| ----- | ----- |
| `id` | UUID |
| `entity_type` | Enum (lead, payment, user, etc.) |
| `entity_id` | UUID |
| `action` | Enum (create, update, delete, assign, drop, restore) |
| `performed_by` | User ID |
| `timestamp` | Datetime |
| `details` | JSON / Text |

✅ This table will store **who did what** and **when**, useful for reporting, compliance, and rollback.

---

## **🖼️ Frontend Components**

| Component Name | Description |
| ----- | ----- |
| `DeletedItemsPage.tsx` | Admin-only route showing deleted leads/payments |
| `RestoreButton.tsx` | Action button shown only in deleted items view |
| `DeleteLeadButton.tsx` | Triggers soft delete modal |
| `useSoftDelete.ts` | Hook to delete/restore entities |
| `AuditLogTimeline.tsx` | Show detailed action history for a lead |
| `AuditIcon.tsx` | 🕵️ button inside Lead Profile to view activity |

---

## **🎨 UI / UX Behavior**

| Action | UI Response |
| ----- | ----- |
| Lead is soft-deleted | Disappears from leads table with success toast |
| Admin views deleted leads | Table shows grayed-out rows \+ restore button |
| Restore lead | Lead reappears in Leads pool |
| Audit view opened | Shows full action list in timeline style |
| Hover over audit entries | Show action summary \+ timestamp \+ user avatar |

---

## **🔐 Access Control**

| Role | Can Delete? | Can Restore? | Can View Audit Log? |
| ----- | ----- | ----- | ----- |
| Salesperson | ❌ No | ❌ No | ❌ No |
| Recovery Agent | ✅ Payments only | ❌ No | ❌ No |
| Team Lead | ✅ Own leads | ❌ No | ✅ Own audit |
| Admin | ✅ All | ✅ All | ✅ All audit logs |
| Analyst | ❌ No | ❌ No | ✅ View-only logs |

---

## **🧪 Selenium Test Scenarios**

| Scenario | Selector |
| ----- | ----- |
| Admin deletes a lead → lead disappears | `data-testid="lead-row"` not present |
| Deleted item shows in `/admin/deleted` list | `data-testid="deleted-list"` |
| Restore button reactivates the lead | `data-testid="restore-button"` |
| Audit log shows “Lead Deleted” with timestamp | `data-testid="audit-log-item"` |
| Only Admin sees delete/restore buttons | Role-based access test |
| Deleted payments don’t affect payment totals | Check dashboard revenue after deletion |

---

## **📋 Stage 14 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Soft delete implemented for Leads and Payments | \[ \] | \[ \] |
| Deleted items hidden from normal views | \[ \] | \[ \] |
| Deleted leads/payments available in Admin `/deleted` route | \[ \] | \[ \] |
| Restore button reinstates deleted records | \[ \] | \[ \] |
| Audit log tracks all major actions (assign, drop, convert) | \[ \] | \[ \] |
| Audit log visible per lead profile or system-wide | \[ \] | \[ \] |
| Role-based access rules enforced | \[ \] | \[ \] |
| Deleted payments don’t count in revenue reports | \[ \] | \[ \] |
| Timeline UI is styled consistently with Tracklie brand | \[ \] | \[ \] |

# **✅ Stage 15: Notifications Panel \+ Internal Email Alerts**

🎯 **Goal:** Provide users with a **notification panel** for in-app alerts (UI) and send **internal email alerts** for important actions — like missed follow-ups, lead assignments, conversions, or deletions.  
 This enables **passive awareness**, reduces missed tasks, and supports manager oversight.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 🔔 **In-App Notifications Panel** | Top-right bell icon shows unread alerts for each user |
| 📬 **Email Notifications (Internal)** | Trigger internal email alerts to relevant users (e.g. managers, agents) |
| 🧹 **Mark as Read / Delete** | Users can dismiss or mark notifications as read |
| 📦 **Notification Types (v1)** | Assignment, Missed Follow-Up, Conversion, Deleted Lead, New Comment (future) |
| 🕒 **Timestamps and Read Tracking** | Show time ago (e.g., “3 mins ago”) and read/unread badge |

---

## **🖼️ UI Structure & Behavior**

`Topbar Right → 🔔 Bell Icon`  
`-----------------------------------------------------`  
`| 🔔 You have 3 new alerts                         |`  
`|---------------------------------------------------|`  
`| ✅ Lead Assigned: Riya → “Shyam Gupta”            |`  
`| 📆 Missed Follow-Up: Akash (Yesterday)            |`  
`| 🟢 Lead Converted: “Deepa Kumari”                 |`  
`|---------------------------------------------------|`  
`| [Mark all as read]     [View All Notifications]   |`

✅ Clicking on each notification should either:

* Open the related page (e.g., lead profile), or

* Show more context in a modal

---

## **📬 Email Alert Examples (Internal)**

| Trigger | Recipient(s) | Email Subject Example |
| ----- | ----- | ----- |
| Lead Assigned | Assigned user | "New Lead Assigned: Shyam Gupta" |
| Lead Converted | Manager | "Lead Converted: Deepa Kumari" |
| Missed Follow-Up (end of day) | Assigned user, optionally TL | "Missed Follow-Up: Akash (28 Sep)" |
| Lead Dropped | Manager | "Lead Dropped: Riya \- Price Too High" |
| Lead Deleted | Admin | "Lead Soft Deleted: by Salesperson Akash" |

✅ These emails are internal only — no client contact is made.  
 ✅ Use a standard header/footer (Tracklie branding) for all emails.

---

## **🧱 Frontend Components**

| Component Name | Description |
| ----- | ----- |
| `NotificationsPanel.tsx` | Dropdown panel in topbar |
| `NotificationItem.tsx` | Each alert card with icon, text, time, read flag |
| `ViewAllNotifications.tsx` | Full-page history list with pagination |
| `useNotifications.ts` | Fetch, mark-read, delete logic |
| `BellIcon.tsx` (Topbar) | Shows alert badge with count |
| `EmailService (backend trigger)` | Sends email based on action context |

---

## **⚙️ Backend APIs & Email Logic**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/notifications/` | GET | Get all notifications for logged-in user |
| `/notifications/unread` | GET | Get count of unread |
| `/notifications/mark-read/{id}` | POST | Mark one notification as read |
| `/notifications/mark-all-read` | POST | Mark all as read |
| `/notifications/delete/{id}` | DELETE | Remove permanently |
| `/email/trigger-alert` (internal) | POST | Trigger internal email (sendgrid/smtp) |

✅ Notification DB should track:

* `type`

* `text`

* `linked_entity_id` (e.g. lead id)

* `created_at`, `read_at`

* `sent_to_user_id`

---

## **🎨 Notification Type Icons (Lucide)**

| Type | Icon | Color |
| ----- | ----- | ----- |
| Lead Assigned | `UserPlus` | Blue |
| Follow-Up Missed | `AlarmClock` | Red |
| Lead Converted | `CheckCircle` | Green |
| Lead Dropped | `XCircle` | Orange |
| Soft Deleted | `Trash2` | Grey |

---

## **🔐 Access Logic**

| Role | Gets Notifications | Gets Email Alerts |
| ----- | ----- | ----- |
| Salesperson | ✅ Own leads | ✅ Only own alerts |
| Team Lead | ✅ Own team actions | ✅ Team alerts |
| Admin | ✅ All | ✅ All |
| Analyst | ❌ No | ❌ No |
| Recovery Agent | ✅ Payments, Leads | ✅ Yes |

---

## **🧪 Selenium Test Scenarios**

| Scenario | Suggested Test ID |
| ----- | ----- |
| Bell icon shows unread count | `data-testid="notif-bell-badge"` |
| Clicking bell shows panel | `data-testid="notif-panel"` |
| Notification card opens linked page | `data-testid="notif-card-click"` |
| Mark all as read button clears badge | `data-testid="mark-all-read"` |
| Email sent on conversion → check backend log | Email mock or console |
| Missed follow-up triggers alert next day | Time mock or delay simulation |

---

## **📋 Stage 15 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Notification dropdown \+ bell icon implemented | \[ \] | \[ \] |
| Unread badge appears and updates on new alert | \[ \] | \[ \] |
| Notifications route \+ panel shows relevant actions | \[ \] | \[ \] |
| Mark as read / mark all clear badge | \[ \] | \[ \] |
| Clicking a notification leads to correct page | \[ \] | \[ \] |
| Email alerts sent to appropriate roles | \[ \] | \[ \] |
| Deleted leads / conversions / follow-ups trigger alerts | \[ \] | \[ \] |
| Tracklie-style email formatting used | \[ \] | \[ \] |
| Styling consistent with Tracklie dark UI \+ spacing rules | \[ \] | \[ \] |

# **✅ Stage 16: Roles & Permissions UI (Admin Settings)**

🎯 **Goal:** Build a centralized interface where Admins can **view**, **edit**, and **manage roles, access rights, and module-level permissions** for all users.  
 This ensures only authorized users can view or act on sensitive data.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| 👥 **User List with Roles** | View all registered users and their roles |
| 🔁 **Change Role Action** | Allow admin to modify a user’s role (e.g., Sales → TL) |
| 🛡️ **Permissions Matrix (v1)** | View-only matrix of what each role can access or perform |
| 🔒 **Role-Based Route Guarding** | Ensure backend \+ frontend restrict features accordingly |
| 📤 **Invite New User** | Add user via email & assign role (optional for v1) |
| 🧑‍💼 **Default Roles Predefined** | Salesperson, Team Lead, Admin, Analyst, Recovery Agent |

---

## **🖼️ UI Structure**

`/admin/roles`

`------------------------------------------------------------`  
`| 👥 Users Table:`  
`| Name | Email | Role       | Status | [Change Role] |`  
`------------------------------------------------------------`  
`| ➕ Add User (optional)`  
`| [Invite via Email] [Assign Role Dropdown] [Send]`  
`------------------------------------------------------------`

`/admin/permissions`  
`------------------------------------------------------------`  
`| 📊 Role Permissions Matrix`  
`| Actions ↓     | Sales | TL | Admin | Analyst | Recovery`  
`|----------------------------------------------------------`  
`| View Leads    | ✅     | ✅ | ✅     | ✅      | ✅`  
`| Edit Leads    | ✅     | ✅ | ✅     | ❌      | ✅`  
`| Delete Leads  | ❌     | ❌ | ✅     | ❌      | ❌`  
`| View Payments | ❌     | ❌ | ✅     | ✅      | ✅`  
`| Add Payments  | ❌     | ❌ | ✅     | ❌      | ✅`  
`| Delete Payment| ❌     | ❌ | ✅     | ❌      | ❌`  
`| Access Reports| ❌     | TL Only | ✅ | ✅ | ❌`  
`------------------------------------------------------------`

---

## **🧱 Frontend Components**

| Component Name | Description |
| ----- | ----- |
| `RolesPage.tsx` | Lists users and their roles |
| `RoleChangeModal.tsx` | Admin selects and updates role |
| `InviteUserModal.tsx` | (optional) Add new user by email |
| `PermissionsMatrix.tsx` | Static grid showing access per role |
| `useAdminSettings.ts` | Hook to fetch/update roles & permissions |
| `Toast.tsx` | Success/error messages |

---

## **🔑 Predefined Roles (System-Wide)**

| Role | Description |
| ----- | ----- |
| Admin | Full access \+ user/role management |
| Salesperson | Works on assigned leads |
| Team Lead (TL) | Manages team leads, sees reports, assigns |
| Analyst | Read-only access to reports, logs |
| Recovery Agent | Sees converted leads, updates payments |

---

## **⚙️ Backend APIs (FastAPI)**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/users` | GET | List all users (admin only) |
| `/users/{id}/role` | PATCH | Change user role |
| `/users/invite` | POST | (optional) Invite via email |
| `/permissions/matrix` | GET | Return static permission grid |
| `/auth/current-role` | GET | Used by frontend to restrict views |

✅ All protected API routes use current role to enforce access.

---

## **🔐 Route Guards (Frontend)**

Use a central `AuthContext` or `useRoleAccess()` hook to block routes/components by role.

| Example | Role Required |
| ----- | ----- |
| `/reports` | Admin, Analyst |
| `/payments` | Admin, Recovery |
| `/admin/roles`, `/admin/permissions` | Admin only |
| Assign/Delete buttons | Admin/TL only |

---

## **🔒 Permissions Matrix (v1 Read-Only)**

You don’t need granular toggling in v1. Just display what each role can/cannot do.  
 Later you can upgrade to a drag-toggle matrix per user or group.

---

## **📧 Optional: Invite via Email (v1 or v2)**

* Send user an email with account setup link

* Pre-assign their role

* Auto-activate on first login

---

## **🧪 Selenium Test Scenarios**

| Scenario | Test ID Suggestion |
| ----- | ----- |
| Admin can view all users with roles | `data-testid="users-table"` |
| Role dropdown shows valid roles only | `data-testid="role-dropdown"` |
| Changing role updates immediately | `data-testid="role-change-confirm"` |
| Non-admins cannot access `/admin/roles` | Redirect or forbidden |
| Permissions matrix loads with accurate values | `data-testid="permissions-grid"` |
| Invite modal accepts email and role | `data-testid="invite-user"` |

---

## **📋 Stage 16 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Users table lists all users \+ roles | \[ \] | \[ \] |
| Admin can change role via modal | \[ \] | \[ \] |
| Permission matrix displays clearly | \[ \] | \[ \] |
| Access restricted to role via frontend guards | \[ \] | \[ \] |
| Invite user flow (if implemented) works end-to-end | \[ \] | \[ \] |
| API routes protect against unauthorized access | \[ \] | \[ \] |
| Notifications / feedback shown on success/error | \[ \] | \[ \] |

# **✅ Stage 17: Settings & Config Module**

🎯 **Goal**: Allow Admins to **configure key system-wide values** like Lead Sources, Follow-up Reasons, Working Hours, and other dropdowns — so the CRM stays adaptable without developer involvement.

This is a pure **backend-driven config management UI** with form-based controls — no custom code needed for small changes.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| ⚙️ **Lead Sources Config** | Add/Edit/Delete possible lead sources shown in dropdowns (e.g., Website, WhatsApp, Referral) |
| 🔁 **Follow-Up Reasons Config** | Admin can configure reasons like "Busy", "Need Time", "Reschedule", "Demo Done" |
| 🕒 **Working Hours (System Timing)** | Set allowed Check-In/Check-Out hours (e.g., 9:00 AM – 6:00 PM) |
| 📆 **Follow-Up Limits** | Optional: Define max days between follow-ups or auto-alert thresholds |
| 📌 **Dropdown Manager (v1)** | Generic component to manage any "static list" used in the CRM |
| 👤 **Recovery Reasons (Future)** | For missed or dropped payments (optional – defined for future stage) |

---

## **🧱 Backend Schema & APIs (FastAPI)**

### **🔧 DB Tables (Simple Key-Value Store Pattern)**

| Table Name | Fields |
| ----- | ----- |
| `lead_sources` | `id`, `label`, `is_active`, `created_by`, `created_at` |
| `followup_reasons` | `id`, `label`, `is_active`, `created_by`, `created_at` |
| `system_config` | `key`, `value`, `value_type`, `last_updated` |

✅ `system_config` stores things like:

* `working_hours_start = 09:00`

* `working_hours_end = 18:00`

* `followup_max_gap_days = 4`

* `lead_assignment_enabled = true`

---

### **🧪 API Endpoints**

| Endpoint | Method | Description |
| ----- | ----- | ----- |
| `/config/lead-sources` | GET | Get all sources |
| `/config/lead-sources` | POST | Add new source |
| `/config/lead-sources/{id}` | PATCH | Edit label / deactivate |
| `/config/followup-reasons` | GET | Fetch all reasons |
| `/config/followup-reasons` | POST | Add reason |
| `/config/system` | GET | Get all system config |
| `/config/system/{key}` | PATCH | Update single config item |

---

## **⚠️ Impact on Existing Features**

| Configurable Setting | Affects Where |
| ----- | ----- |
| Lead Sources | Lead creation form dropdowns, filters |
| Follow-Up Reasons | Pause dropdown, Missed follow-up modal, Call outcome |
| Working Hours | Check-In logic, Auto warning or disable outside hours |
| Follow-Up Gap Limit | Warning if next follow-up scheduled \> x days ahead |
| Assignment Enabled/Disabled | Allow/disallow auto-assign feature (switch OFF if team on leave) |

---

## **🔐 Access Control**

| Role | Access to Settings |
| ----- | ----- |
| Admin | ✅ Full |
| Analyst | ❌ No |
| TL | ❌ No |
| Recovery | ❌ No |
| Sales | ❌ No |

---

## **🧪 Selenium Test Scenarios**

| Scenario | Suggested Test ID |
| ----- | ----- |
| Admin opens settings page and sees config tabs | `data-testid="config-tab"` |
| Adds a new lead source | `data-testid="add-lead-source"` |
| Edits an existing source label | `data-testid="edit-source-label"` |
| System config like working\_hours is updated | `data-testid="update-working-hours"` |
| Inactive source no longer shows in dropdowns | Verify visibility via lead creation |
| Follow-up gap logic works after config update | Date picker logic test |

---

## **📋 Stage 17 Checklist (Dev \+ Selenium)**

| Task | Done ✅ | Selenium Tested 🧪 |
| ----- | ----- | ----- |
| Lead Sources can be added, edited, and toggled active/inactive | \[ \] | \[ \] |
| Follow-up Reasons are managed by admin | \[ \] | \[ \] |
| System config table updates reflect in app behavior | \[ \] | \[ \] |
| Working hours setting respected in attendance check-in logic | \[ \] | \[ \] |
| UI fetches current config via `/config/system` on load | \[ \] | \[ \] |
| Admin-only access is enforced via backend & frontend guards | \[ \] | \[ \] |

# **✅ Stage 18: Final Selenium Test Run \+ Deployment Checklists**

🎯 **Goal**: Run end-to-end **Selenium tests** across all user flows, validate system readiness with a **pre-deployment QA checklist**, and prepare for a **safe and structured deployment**.

This stage ensures the Tracklie system is **functionally complete**, **test-validated**, and **ready for production or client handover**.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| ✅ **Selenium Test Suite Completion** | Ensure every module, screen, and action has at least 1 Selenium test |
| 🔁 **Regression Test Run** | Full system test after final integrations |
| ⚙️ **Environment Setup Checks** | Ensure correct variables, keys, and secrets are in place |
| 🚦 **Frontend \+ Backend Deployment Scripts** | Setup CI/CD or manual build \+ launch steps |
| 🔒 **Final Access Control Validation** | Ensure only allowed roles can access sensitive pages |
| 🔍 **QA Review \+ User Acceptance Testing** | Manual checklist (UAT scenarios) by test user/admin |

---

## **🧪 Selenium Test Matrix Summary**

Below is a **module-wise** coverage checklist:

| Module | Tests to Validate |
| ----- | ----- |
| Auth & Access | Login, logout, access restrictions, session handling |
| Sidebar \+ Navigation | Role-based rendering, link clicks, route validation |
| Leads Module | Create, update, assign, convert, drop, restore |
| Follow-Up Module | Schedule, alert badges, missed highlight, notes |
| Payments | Add, edit, delete (soft), view history, status badge |
| Dashboard Widgets | Correct values per role, refresh on load |
| Reports | Filters, export, role guards, summary card accuracy |
| Notifications | Display, read toggle, email trigger (if mocked) |
| Audit Log | Actions logged, visible per lead, correct order |
| Admin Config | Add/edit sources, reasons, system keys |
| Role \+ Permission Guarding | All protected routes tested for unauthorized roles |
| Deleted Views | Restore \+ visibility scoped to Admin only |
| Attendance (if used) | Check-in/out buttons, timing respect, impact on assignment |

✅ All tests should be non-destructive and repeatable.

---

## **🖥️ Environment & Deployment Checks**

### **🔧 `.env` Variables**

| Env Variable | Description |
| ----- | ----- |
| `FRONTEND_BASE_URL` | For routing, CORS |
| `BACKEND_API_URL` | FastAPI endpoint |
| `EMAIL_API_KEY` | Internal email alerting |
| `JWT_SECRET_KEY` | Used for auth & token generation |
| `DB_HOST`, `DB_USER`, etc. | MySQL credentials |
| `ENVIRONMENT` | `development` / `production` switch |

---

### **📦 Build Process**

| Step | Notes |
| ----- | ----- |
| Frontend build (React) | `npm run build` → creates `/dist` or `/build` |
| Backend served via Uvicorn/Gunicorn | With `--reload` in dev |
| Reverse proxy setup (Nginx) | Optional: routes `/api/` to FastAPI, `/` to frontend |
| Dockerization (optional) | Compose file with `frontend`, `backend`, `db`, `nginx` |
| Monitoring tools (v2) | Add health endpoints, uptime pings, etc. |

---

## **🔐 Final Security Checklist**

| Item | Purpose |
| ----- | ----- |
| Admin-only access enforced | For reports, roles, settings, audit |
| JWT Tokens \+ Expiry | Ensure logout or token refresh flows |
| Role-based route blocking (UI) | Protect nav & direct URLs |
| No sensitive data exposed in logs | Avoid emails, phone numbers |
| Passwords not stored in plaintext | Confirm hashed/obfuscated if any |

---

## **👥 UAT & QA Acceptance Flows**

You may assign mock roles (Admin, Sales, TL, Recovery) and verify:

| Test User Flow | Required Outcome |
| ----- | ----- |
| Admin can create, assign, delete leads | ✅ Works |
| Sales can update own leads, schedule follow-up | ✅ Works |
| TL can see team stats, assign leads | ✅ Works |
| Recovery agent sees converted leads only | ✅ Works |
| Analyst sees only reports | ✅ Read-only |
| Unauthorized role denied from Reports | ✅ 403 or redirect |

---

## **📤 Pre-Deployment Cleanups**

| Task | Required |
| ----- | ----- |
| Remove test/demo data from DB | ✅ |
| Reset test user passwords | ✅ |
| Turn off debug logs in production | ✅ |
| Confirm uptime pings / error alerts | ✅ (if used) |
| Final visual QA of dark UI & colors | ✅ |
| Archive previous test reports (Junit) | ✅ |

---

## **📋 Stage 18 Checklist**

| Task | Done ✅ |
| ----- | ----- |
| Selenium test suite is complete and passed | \[ \] |
| Final UAT verified by mentor / admin role | \[ \] |
| Environment variables set for dev/prod | \[ \] |
| Frontend & backend deployable from build scripts | \[ \] |
| Security rules tested (roles, tokens, audit logs) | \[ \] |
| Notifications and emails work in test/live | \[ \] |
| No hardcoded values or leftover debug prints | \[ \] |
| Pre-seed values for lead sources, follow-up reasons | \[ \] |
| Role and permission enforcement verified across pages | \[ \] |
| Client-ready & test-stable release achieved | \[ \] |

---

# **✅ Stage 19: Performance Optimization (Caching, Lazy Loading)**

🎯 **Goal**: Optimize the application for production performance with caching strategies, lazy loading, and performance monitoring.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| **Frontend Performance** | Implement code splitting, lazy loading for routes and components |
| **API Response Caching** | Cache frequently accessed data (user roles, lead counts, dashboard stats) |
| **Database Optimization** | Add proper indexing, query optimization, connection pooling |
| **Asset Optimization** | Optimize images, fonts, and static assets |
| **Performance Monitoring** | Add performance metrics and monitoring tools |

---

## **🚀 Frontend Optimizations**

| Optimization | Implementation |
| ----- | ----- |
| **Route-based Code Splitting** | Lazy load pages using React.lazy() and Suspense |
| **Component Lazy Loading** | Defer heavy components (reports, charts) until needed |
| **Virtual Scrolling** | For large tables (leads, payments) with 1000+ records |
| **Image Optimization** | Compress and lazy load images |
| **Bundle Analysis** | Identify and eliminate unused code |

---

## **🔧 Backend Optimizations**

| Optimization | Implementation |
| ----- | ----- |
| **Redis Caching** | Cache dashboard stats, user sessions, frequent queries |
| **Database Indexing** | Add indexes on frequently queried fields |
| **Query Optimization** | Optimize N+1 queries, use proper joins |
| **Connection Pooling** | Implement database connection pooling |
| **Response Compression** | Enable gzip compression for API responses |

---

## **📊 Performance Monitoring**

| Metric | Tool/Method |
| ----- | ----- |
| **Frontend Performance** | Lighthouse scores, Core Web Vitals |
| **API Response Times** | FastAPI middleware for request timing |
| **Database Query Performance** | Query execution time monitoring |
| **Memory Usage** | Application memory profiling |
| **User Experience Metrics** | Time to first paint, interaction responsiveness |

---

## **📋 Stage 19 Checklist**

| Task | Done ✅ | Performance Impact |
| ----- | ----- | ----- |
| Route-based code splitting implemented | [ ] | 30-50% initial bundle size reduction |
| Component lazy loading for heavy components | [ ] | Faster page load times |
| Redis caching for dashboard and stats | [ ] | 80% faster dashboard loads |
| Database indexes added for critical queries | [ ] | 5-10x faster query performance |
| Virtual scrolling for large tables | [ ] | Smooth scrolling with 10k+ records |
| Bundle size optimized and analyzed | [ ] | Smaller download sizes |
| Performance monitoring dashboard | [ ] | Real-time performance visibility |

---

# **✅ Stage 20: Real-time Features (WebSocket Notifications)**

🎯 **Goal**: Add real-time capabilities for live notifications, dashboard updates, and collaborative features using WebSocket connections.

---

## **🧩 Core Objectives**

| Objective | Description |
| ----- | ----- |
| **Real-time Notifications** | Instant in-app notifications without page refresh |
| **Live Dashboard Updates** | Real-time metrics and counts |
| **Collaborative Indicators** | Show who's working on which lead in real-time |
| **Live Activity Feed** | Real-time activity stream for managers |
| **System Status Updates** | Live system health and connectivity status |

---

## **🔌 WebSocket Implementation**

| Component | Description |
| ----- | ----- |
| **WebSocket Server** | FastAPI WebSocket endpoint for real-time communication |
| **Client Connection Manager** | Handle WebSocket connections, reconnection logic |
| **Message Broadcasting** | Send targeted messages to specific users or roles |
| **Event Subscription System** | Subscribe to specific event types per user role |
| **Connection State Management** | Handle online/offline states, connection drops |

---

## **📡 Real-time Event Types**

| Event Type | Trigger | Recipients |
| ----- | ----- | ----- |
| **Lead Assigned** | When lead is assigned to user | Assigned user |
| **Lead Status Changed** | Status update on any lead | Lead owner, manager |
| **Payment Received** | New payment logged | Finance team, managers |
| **Follow-up Due** | Follow-up becomes due | Lead owner |
| **System Alert** | Critical system events | Admins |
| **User Activity** | Check-in/out, status changes | Managers |

---

## **🖼️ Frontend Real-time Components**

| Component | Description |
| ----- | ----- |
| `WebSocketProvider.tsx` | Context provider for WebSocket connection |
| `useRealTimeNotifications.ts` | Hook for receiving real-time notifications |
| `LiveNotificationBadge.tsx` | Real-time notification counter |
| `ActivityIndicator.tsx` | Show who's currently viewing/editing leads |
| `LiveDashboardWidget.tsx` | Auto-updating dashboard metrics |
| `ConnectionStatus.tsx` | WebSocket connection health indicator |

---

## **⚙️ Backend WebSocket Architecture**

| Component | Description |
| ----- | ----- |
| `/ws/notifications` | WebSocket endpoint for notifications |
| `ConnectionManager` | Manage active WebSocket connections |
| `EventBroadcaster` | Send events to specific users/groups |
| `MessageQueue` | Queue messages for offline users |
| `AuthenticatedWebSocket` | JWT-based WebSocket authentication |

---

## **🔐 Real-time Security**

| Security Layer | Implementation |
| ----- | ----- |
| **WebSocket Authentication** | JWT token validation on connection |
| **Message Authorization** | Ensure users only receive authorized messages |
| **Rate Limiting** | Prevent WebSocket spam/abuse |
| **Connection Limits** | Limit concurrent connections per user |
| **Secure Transport** | WSS (WebSocket Secure) in production |

---

## **📋 Stage 20 Checklist**

| Task | Done ✅ | Real-time Impact |
| ----- | ----- | ----- |
| WebSocket server implementation | [ ] | Foundation for all real-time features |
| Real-time notification system | [ ] | Instant alerts without refresh |
| Live dashboard updates | [ ] | Always current metrics |
| Collaborative lead indicators | [ ] | Prevent conflicting edits |
| Connection state management | [ ] | Reliable real-time experience |
| WebSocket authentication & security | [ ] | Secure real-time communications |
| Offline message queuing | [ ] | No missed notifications |

---

# **📊 Stage Dependencies Matrix**

| Stage | Depends On | Critical Path | Notes |
|-------|------------|---------------|-------|
| 1 (Layout) | 0 (Setup) | Yes | Foundation for all UI |
| 2 (Auth) | 1 (Layout) | Yes | Required for all protected features |
| 3 (Roles) | 2 (Auth) | Yes | Controls access to all features |
| 4 (Leads UI) | 3 (Roles) | Yes | Core business functionality |
| 5 (Lead Ingestion) | 4 (Leads UI) | Yes | Data entry foundation |
| 6 (Lifecycle) | 5 (Lead Ingestion) | Yes | Lead workflow management |
| 7 (Attendance) | 2 (Auth) | No | Can be developed in parallel |
| 8 (Distribution) | 7 (Attendance) | Yes | Requires attendance for eligibility |
| 9 (Follow-ups) | 6 (Lifecycle) | No | Can be parallel with other features |
| 10 (Dashboard) | 6 (Lifecycle) | No | Reporting on existing data |
| 11 (Lead Profile) | 9 (Follow-ups) | No | Enhanced UI for lead management |
| 12 (Payments) | 6 (Lifecycle) | Yes | Requires converted leads |
| 13 (Reports) | 12 (Payments) | No | Analytics on complete data |
| 14 (Soft Delete) | 13 (Reports) | No | Data management feature |
| 15 (Notifications) | 14 (Soft Delete) | No | Can be developed earlier |
| 16 (Roles UI) | 3 (Roles) | No | Administrative interface |
| 17 (Settings) | 16 (Roles UI) | No | Configuration management |
| 18 (Testing) | 17 (Settings) | Yes | Final validation before deployment |
| 19 (Performance) | 18 (Testing) | No | Optimization phase |
| 20 (Real-time) | 19 (Performance) | No | Enhancement features |

---

# **🚀 Implementation Strategy & Timeline**

## **📅 Phase 1 (Stages 0-6): Foundation & Core**
**Timeline: 6-8 weeks**

### **🎯 Focus Areas:**
- Get the basic CRM working end-to-end
- Establish architectural patterns and coding standards
- Build core lead management functionality
- Implement authentication and role-based access

### **🏆 Key Deliverables:**
- Working authentication system
- Role-based dashboard and navigation
- Complete lead lifecycle management
- Manual lead entry and status updates
- Custom CSS component library

### **✅ Success Criteria:**
- Users can log in and see role-appropriate interface
- Leads can be created, assigned, and updated through full lifecycle
- Status changes and interest scoring work correctly
- All components follow consistent design system

---

## **📈 Phase 2 (Stages 7-12): Advanced Features**
**Timeline: 4-6 weeks**

### **🎯 Focus Areas:**
- Add intelligent lead distribution
- Build comprehensive payment tracking
- Implement follow-up scheduling and alerts
- Create detailed lead profiles and dashboards

### **🏆 Key Deliverables:**
- Smart attendance-based lead distribution
- Complete payment management system
- Follow-up scheduling with alerts and escalation
- Role-specific dashboard widgets
- Detailed lead profile views

### **✅ Success Criteria:**
- Leads automatically assigned to present salespeople
- Payment tracking works for converted leads
- Follow-up system prevents missed opportunities
- Dashboards provide actionable insights per role

---

## **📊 Phase 3 (Stages 13-18): Polish & Production**
**Timeline: 3-4 weeks**

### **🎯 Focus Areas:**
- Advanced reporting and analytics
- Data integrity with audit trails
- Administrative controls and configuration
- Comprehensive testing and deployment preparation

### **🏆 Key Deliverables:**
- Advanced filtering and reporting system
- Soft delete and restore functionality
- Complete audit trail system
- Admin configuration panels
- Production-ready deployment

### **✅ Success Criteria:**
- Comprehensive reports with CSV export
- All actions tracked in audit logs
- Admin can configure system settings
- Full test coverage with Selenium automation
- Production deployment completed

---

## **⚡ Phase 4 (Stages 19-20): Optimization & Enhancement**
**Timeline: 2-3 weeks** *(Optional/Future)*

### **🎯 Focus Areas:**
- Performance optimization and monitoring
- Real-time features and collaboration
- Advanced user experience improvements

### **🏆 Key Deliverables:**
- Optimized application performance
- Real-time notifications and updates
- Enhanced collaborative features
- Performance monitoring dashboard

### **✅ Success Criteria:**
- Application loads 50%+ faster
- Real-time notifications work reliably
- Users can collaborate without conflicts
- Performance metrics tracked and monitored

---

## **📋 Development Best Practices**

### **🔄 Daily Workflow:**
1. **Morning standup** - Review progress and blockers
2. **Feature development** - Focus on current stage objectives
3. **Testing** - Write Selenium tests as you build
4. **Code review** - Maintain quality standards
5. **Daily demo** - Show progress to stakeholders

### **🧪 Quality Gates:**
- **Code reviews** required for all features
- **Selenium tests** must pass before stage completion
- **Manual testing** by different role types
- **Performance benchmarks** maintained
- **Security review** for sensitive features

### **📊 Progress Tracking:**
- **Weekly milestone reviews** with stakeholder demos
- **Burn-down charts** to track stage completion
- **Risk assessment** and mitigation strategies
- **Scope adjustment** as needed while maintaining core functionality

---

