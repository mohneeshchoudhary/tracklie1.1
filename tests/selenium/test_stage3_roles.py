"""
Selenium Tests for Stage 3: User Roles + Sidebar Control + Dashboard Shells
Tests role-based navigation, dashboard content, and access control
"""

import time
import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import TimeoutException, NoSuchElementException


class TestStage3Roles:
    """Test role-based functionality"""

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

    def login_as_user(self, email, password):
        """Helper method to login as a specific user"""
        # Click login button
        login_btn = self.wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="action-login"]'))
        )
        self.driver.execute_script('arguments[0].click();', login_btn)
        
        # Wait for modal to appear
        time.sleep(1)
        
        # Fill login form
        email_input = self.wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '[data-testid="login-email"]'))
        )
        password_input = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="login-password"]')
        
        email_input.clear()
        email_input.send_keys(email)
        password_input.clear()
        password_input.send_keys(password)
        
        # Submit form
        submit_btn = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="login-submit"]')
        self.driver.execute_script('arguments[0].click();', submit_btn)
        
        # Wait for login to complete
        time.sleep(2)

    def logout_user(self):
        """Helper method to logout current user"""
        logout_btn = self.wait.until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '[data-testid="action-logout"]'))
        )
        self.driver.execute_script('arguments[0].click();', logout_btn)
        time.sleep(1)

    def test_admin_role_navigation(self):
        """Test Admin role sees all navigation items"""
        self.login_as_user('admin@tracklie.com', 'admin123')
        
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
        self.login_as_user('sales@tracklie.com', 'sales123')
        
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
        self.login_as_user('recovery@tracklie.com', 'recovery123')
        
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

    def test_analyst_role_navigation(self):
        """Test Analyst role sees only Dashboard and Reports"""
        self.login_as_user('analyst@tracklie.com', 'analyst123')
        
        # Check sidebar navigation items
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        
        # Analyst should see: Dashboard, Reports
        expected_items = ['dashboard', 'reports']
        restricted_items = ['leads', 'followups', 'payments']
        
        for item in expected_items:
            nav_item = sidebar_nav.find_element(By.CSS_SELECTOR, f'[data-testid="sidebar-{item}"]')
            assert nav_item.is_displayed(), f"Analyst should see {item} navigation item"
        
        for item in restricted_items:
            try:
                nav_item = sidebar_nav.find_element(By.CSS_SELECTOR, f'[data-testid="sidebar-{item}"]')
                assert False, f"Analyst should NOT see {item} navigation item"
            except NoSuchElementException:
                pass  # Expected - item should not be present
        
        # Check dashboard title
        dashboard_title = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="dashboard-role-title"]')
        assert 'Analyst Dashboard' in dashboard_title.text

    def test_dashboard_widgets_per_role(self):
        """Test different roles see different dashboard widgets"""
        # Test Admin widgets
        self.login_as_user('admin@tracklie.com', 'admin123')
        admin_widgets = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="widget-"]')
        assert len(admin_widgets) >= 4, "Admin should have multiple dashboard widgets"
        
        # Test Salesperson widgets
        self.logout_user()
        self.login_as_user('sales@tracklie.com', 'sales123')
        sales_widgets = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="widget-"]')
        assert len(sales_widgets) >= 3, "Salesperson should have sales-focused widgets"
        
        # Test Recovery Agent widgets
        self.logout_user()
        self.login_as_user('recovery@tracklie.com', 'recovery123')
        recovery_widgets = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="widget-"]')
        assert len(recovery_widgets) >= 3, "Recovery Agent should have payment-focused widgets"

    def test_role_based_quick_actions(self):
        """Test quick actions are role-appropriate"""
        # Test Admin quick actions
        self.login_as_user('admin@tracklie.com', 'admin123')
        quick_actions = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="quick-action-"]')
        assert len(quick_actions) >= 3, "Admin should have multiple quick actions"
        
        # Test Salesperson quick actions
        self.logout_user()
        self.login_as_user('sales@tracklie.com', 'sales123')
        sales_actions = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="quick-action-"]')
        assert len(sales_actions) >= 2, "Salesperson should have sales-focused quick actions"
        
        # Verify no payments quick action for salesperson
        try:
            payments_action = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="quick-action-payments"]')
            assert False, "Salesperson should not have payments quick action"
        except NoSuchElementException:
            pass  # Expected

    def test_user_role_display_in_sidebar(self):
        """Test user role is correctly displayed in sidebar"""
        # Test Admin role display
        self.login_as_user('admin@tracklie.com', 'admin123')
        user_role = self.driver.find_element(By.CSS_SELECTOR, '.sidebar__user-role')
        assert 'Admin' in user_role.text
        
        # Test Salesperson role display
        self.logout_user()
        self.login_as_user('sales@tracklie.com', 'sales123')
        user_role = self.driver.find_element(By.CSS_SELECTOR, '.sidebar__user-role')
        assert 'Salesperson' in user_role.text
        
        # Test Recovery Agent role display
        self.logout_user()
        self.login_as_user('recovery@tracklie.com', 'recovery123')
        user_role = self.driver.find_element(By.CSS_SELECTOR, '.sidebar__user-role')
        assert 'Recovery Agent' in user_role.text

    def test_guest_user_limited_access(self):
        """Test guest user has limited access"""
        # Don't login - stay as guest
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
                pass  # Expected
        
        # Check guest role display
        user_role = self.driver.find_element(By.CSS_SELECTOR, '.sidebar__user-role')
        assert user_role.text in ['Guest', 'GUEST'], f"Expected 'Guest' or 'GUEST', got '{user_role.text}'"

    def test_navigation_badges_visibility(self):
        """Test navigation badges are visible for appropriate roles"""
        self.login_as_user('admin@tracklie.com', 'admin123')
        
        # Check that badges are present for items that should have them
        leads_item = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-leads"]')
        leads_badge = leads_item.find_element(By.CSS_SELECTOR, '.sidebar__nav-badge')
        assert leads_badge.is_displayed(), "Leads should have a badge"
        assert leads_badge.text.isdigit(), "Leads badge should contain a number"
        
        followups_item = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-followups"]')
        followups_badge = followups_item.find_element(By.CSS_SELECTOR, '.sidebar__nav-badge')
        assert followups_badge.is_displayed(), "Follow-ups should have a badge"
        assert followups_badge.text.isdigit(), "Follow-ups badge should contain a number"

    def test_dashboard_role_specific_content(self):
        """Test dashboard shows role-specific content and metrics"""
        # Test Admin dashboard content
        self.login_as_user('admin@tracklie.com', 'admin123')
        dashboard_widgets = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="widget-"]')
        
        # Admin should have system-wide metrics
        widget_titles = [widget.find_element(By.CSS_SELECTOR, '.widget-title').text for widget in dashboard_widgets]
        assert any('Total' in title for title in widget_titles), "Admin should have total metrics"
        assert any('Team' in title for title in widget_titles), "Admin should have team metrics"
        
        # Test Salesperson dashboard content
        self.logout_user()
        self.login_as_user('sales@tracklie.com', 'sales123')
        sales_widgets = self.driver.find_elements(By.CSS_SELECTOR, '[data-testid^="widget-"]')
        
        # Salesperson should have personal metrics
        sales_titles = [widget.find_element(By.CSS_SELECTOR, '.widget-title').text for widget in sales_widgets]
        assert any('My' in title for title in sales_titles), "Salesperson should have personal metrics"
        assert any('Target' in title for title in sales_titles), "Salesperson should have target metrics"

    def test_role_switching_updates_ui(self):
        """Test that switching roles updates the UI appropriately"""
        # Login as Admin
        self.login_as_user('admin@tracklie.com', 'admin123')
        
        # Verify Admin navigation
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        admin_items = sidebar_nav.find_elements(By.CSS_SELECTOR, '[data-testid^="sidebar-"]')
        admin_count = len(admin_items)
        
        # Logout and login as Salesperson
        self.logout_user()
        self.login_as_user('sales@tracklie.com', 'sales123')
        
        # Verify Salesperson navigation (should have fewer items)
        sidebar_nav = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="sidebar-navigation"]')
        sales_items = sidebar_nav.find_elements(By.CSS_SELECTOR, '[data-testid^="sidebar-"]')
        sales_count = len(sales_items)
        
        assert sales_count < admin_count, "Salesperson should have fewer navigation items than Admin"
        
        # Verify dashboard title changed
        dashboard_title = self.driver.find_element(By.CSS_SELECTOR, '[data-testid="dashboard-role-title"]')
        assert 'Salesperson Dashboard' in dashboard_title.text


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
