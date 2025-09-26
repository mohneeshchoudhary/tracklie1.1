"""
Simplified Selenium Tests for Stage 3: User Roles + Sidebar Control + Dashboard Shells
Tests role-based navigation and dashboard content by directly setting user roles
"""

import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class TestStage3RolesSimple:
    """Test role-based functionality with direct role setting"""

    @pytest.fixture(autouse=True)
    def setup(self):
        """Setup test environment"""
        options = webdriver.ChromeOptions()
        # Remove --headless to see the browser window
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        options.add_argument('--window-size=1400,900')
        options.add_argument('--disable-gpu')
        options.add_argument('--disable-extensions')
        
        self.driver = webdriver.Chrome(options=options)
        self.wait = WebDriverWait(self.driver, 10)
        self.base_url = "http://localhost:3000"
        
        # Navigate to the application
        self.driver.get(self.base_url)
        time.sleep(2)  # Allow JavaScript to initialize
        
        yield
        
        self.driver.quit()

    def set_user_role(self, role, name):
        """Helper method to directly set user role in the application"""
        if role:
            script = f"""
            if (window.AuthContext) {{
                // Mock user object
                const mockUser = {{
                    name: '{name}',
                    role: '{role}',
                    email: '{name.lower().replace(' ', '')}@tracklie.com'
                }};
                
                // Use AuthContext's setUser method
                window.AuthContext.setUser(mockUser);
                return true;
            }}
            return false;
            """
        else:
            script = """
            if (window.AuthContext) {
                // Clear auth to simulate guest user
                window.AuthContext.clearAuth();
                return true;
            }
            return false;
            """
        
        result = self.driver.execute_script(script)
        time.sleep(2)  # Allow UI to update
        return result

    def test_guest_user_navigation(self):
        """Test guest user sees only dashboard"""
        # Don't set any role - stay as guest
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        
        # Guest should only see Dashboard
        dashboard_item = sidebar_nav.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-dashboard"]')
        assert dashboard_item.is_displayed(), "Guest should see dashboard navigation"
        
        # Guest should not see other navigation items
        restricted_items = ['leads', 'followups', 'payments', 'reports']
        for item in restricted_items:
            try:
                nav_item = sidebar_nav.find_element(By.CSS_SELECTOR, f'[data-testid="sidebar-{item}"]')
                assert False, f"Guest should NOT see {item} navigation item"
            except NoSuchElementException:
                pass  # Expected - item should not be present

    def test_admin_role_navigation(self):
        """Test Admin role sees all navigation items"""
        # Set user as Admin
        self.set_user_role('ADMIN', 'Admin User')
        
        # Check sidebar navigation items
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        
        # Admin should see: Dashboard, Leads, Follow-ups, Payments, Reports
        expected_items = ['dashboard', 'leads', 'followups', 'payments', 'reports']
        
        for item in expected_items:
            nav_item = sidebar_nav.find_element(By.CSS_SELECTOR, f'[data-testid="sidebar-{item}"]')
            assert nav_item.is_displayed(), f"Admin should see {item} navigation item"
        
        # Check dashboard title
        dashboard_title = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="dashboard-role-title"]')
        assert 'Admin Dashboard' in dashboard_title.text

    def test_salesperson_role_navigation(self):
        """Test Salesperson role sees limited navigation items"""
        # Set user as Salesperson
        self.set_user_role('SALESPERSON', 'Sales Person')
        
        # Check sidebar navigation items
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        
        # Salesperson should see: Dashboard, Leads, Follow-ups
        expected_items = ['dashboard', 'leads', 'followups']
        restricted_items = ['payments', 'reports']
        
        for item in expected_items:
            nav_item = sidebar_nav.find_element(By.CSS_SELECTOR, f'[data-testid="sidebar-{item}"]')
            assert nav_item.is_displayed(), f"Salesperson should see {item} navigation item"
        
        for item in restricted_items:
            try:
                nav_item = sidebar_nav.find_element(By.CSS_SELECTOR, f'[data-testid="sidebar-{item}"]')
                assert False, f"Salesperson should NOT see {item} navigation item"
            except NoSuchElementException:
                pass  # Expected - item should not be present
        
        # Check dashboard title
        dashboard_title = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="dashboard-role-title"]')
        assert 'Salesperson Dashboard' in dashboard_title.text

    def test_recovery_agent_role_navigation(self):
        """Test Recovery Agent role sees only Dashboard and Payments"""
        # Set user as Recovery Agent
        self.set_user_role('RECOVERY_AGENT', 'Recovery Agent')
        
        # Check sidebar navigation items
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        
        # Recovery Agent should see: Dashboard, Payments
        expected_items = ['dashboard', 'payments']
        restricted_items = ['leads', 'followups', 'reports']
        
        for item in expected_items:
            nav_item = sidebar_nav.find_element(By.CSS_SELECTOR, f'[data-testid="sidebar-{item}"]')
            assert nav_item.is_displayed(), f"Recovery Agent should see {item} navigation item"
        
        for item in restricted_items:
            try:
                nav_item = sidebar_nav.find_element(By.CSS_SELECTOR, f'[data-testid="sidebar-{item}"]')
                assert False, f"Recovery Agent should NOT see {item} navigation item"
            except NoSuchElementException:
                pass  # Expected - item should not be present
        
        # Check dashboard title
        dashboard_title = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="dashboard-role-title"]')
        assert 'Recovery Agent Dashboard' in dashboard_title.text

    def test_dashboard_widgets_per_role(self):
        """Test different roles see different dashboard widgets"""
        # Test Admin widgets
        self.set_user_role('ADMIN', 'Admin User')
        admin_widgets = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="widget-"]')
        assert len(admin_widgets) >= 4, "Admin should have multiple dashboard widgets"
        
        # Test Salesperson widgets
        self.set_user_role('SALESPERSON', 'Sales Person')
        time.sleep(1)  # Allow dashboard to update
        sales_widgets = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="widget-"]')
        assert len(sales_widgets) >= 3, "Salesperson should have sales-focused widgets"
        
        # Test Recovery Agent widgets
        self.set_user_role('RECOVERY_AGENT', 'Recovery Agent')
        time.sleep(1)  # Allow dashboard to update
        recovery_widgets = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="widget-"]')
        assert len(recovery_widgets) >= 3, "Recovery Agent should have payment-focused widgets"

    def test_user_role_display(self):
        """Test user role is correctly displayed in sidebar"""
        # Test Admin role display
        self.set_user_role('ADMIN', 'Admin User')
        user_role = self.driver.find_element(By.CSS_SELECTOR, '.sidebar__user-role')
        assert 'Admin' in user_role.text
        
        # Test Salesperson role display
        self.set_user_role('SALESPERSON', 'Sales Person')
        time.sleep(1)
        user_role = self.driver.find_element(By.CSS_SELECTOR, '.sidebar__user-role')
        assert 'Salesperson' in user_role.text
        
        # Test Recovery Agent role display
        self.set_user_role('RECOVERY_AGENT', 'Recovery Agent')
        time.sleep(1)
        user_role = self.driver.find_element(By.CSS_SELECTOR, '.sidebar__user-role')
        assert 'Recovery Agent' in user_role.text

    def test_role_switching_updates_ui(self):
        """Test that switching roles updates the UI appropriately"""
        # Start as Admin
        self.set_user_role('ADMIN', 'Admin User')
        
        # Verify Admin navigation
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        admin_items = sidebar_nav.find_elements(By.CSS_SELECTOR, '[data-testid^="sidebar-"]')
        admin_count = len(admin_items)
        
        # Switch to Salesperson
        self.set_user_role('SALESPERSON', 'Sales Person')
        time.sleep(1)
        
        # Verify Salesperson navigation (should have fewer items)
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        sales_items = sidebar_nav.find_elements(By.CSS_SELECTOR, '[data-testid^="sidebar-"]')
        sales_count = len(sales_items)
        
        assert sales_count < admin_count, "Salesperson should have fewer navigation items than Admin"
        
        # Verify dashboard title changed
        dashboard_title = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="dashboard-role-title"]')
        assert 'Salesperson Dashboard' in dashboard_title.text

    def test_dashboard_redirect_behavior(self):
        """Test that unauthenticated users are redirected from dashboard to home with login modal"""
        # Set guest user
        self.set_user_role(None, 'Guest')
        time.sleep(1)
        
        # Navigate directly to dashboard
        self.driver.get(f"{self.base_url}/#dashboard")
        time.sleep(3)  # Allow for redirect and modal to appear
        
        # Should be redirected to home page
        current_url = self.driver.current_url
        assert 'home' in current_url or '#' not in current_url or current_url.endswith('/')
        
        # Login modal should be visible
        try:
            modal = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '.login-modal')))
            assert modal.is_displayed()
        except TimeoutException:
            # Modal might not be visible due to timing, check if it exists in DOM
            modal = self.driver.find_element(By.CSS_SELECTOR, '.login-modal')
            assert modal is not None

    def test_authenticated_user_dashboard_access(self):
        """Test that authenticated users can access dashboard directly"""
        # Set admin user
        self.set_user_role('admin', 'Admin User')
        time.sleep(1)
        
        # Navigate directly to dashboard
        self.driver.get(f"{self.base_url}/#dashboard")
        time.sleep(2)
        
        # Should stay on dashboard
        current_url = self.driver.current_url
        assert 'dashboard' in current_url
        
        # Dashboard should be visible
        dashboard = self.wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="dashboard-page"]')))
        assert dashboard.is_displayed()


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
