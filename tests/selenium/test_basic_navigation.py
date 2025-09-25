"""
Basic navigation tests for Tracklie CRM - Stage 0
Tests the basic routing and page rendering functionality
"""

import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time


@pytest.fixture
def driver():
    """Setup Chrome driver for testing"""
    options = Options()
    options.add_argument('--headless')  # Run in headless mode for CI/CD
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    driver = webdriver.Chrome(options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()


class TestBasicNavigation:
    """Test basic navigation and routing functionality"""
    
    BASE_URL = "http://localhost:3000"
    
    def test_homepage_redirects_to_dashboard(self, driver):
        """Test that homepage redirects to dashboard"""
        driver.get(self.BASE_URL)
        time.sleep(3)  # Wait for JavaScript to load and redirect
        
        # Should redirect to /dashboard
        assert "dashboard" in driver.current_url
        
        # Check for main layout structure
        main_layout = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='main-layout']"))
        )
        assert main_layout.is_displayed()
        
        # Check for sidebar
        sidebar = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='sidebar']"))
        )
        assert sidebar.is_displayed()
    
    def test_dashboard_page_loads(self, driver):
        """Test that dashboard page loads correctly"""
        driver.get(f"{self.BASE_URL}/#dashboard")
        time.sleep(2)  # Wait for JavaScript routing
        
        # Check for dashboard page placeholder
        dashboard_page = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='page-dashboard']"))
        )
        assert dashboard_page.is_displayed()
        
        # Check for dashboard title
        dashboard_title = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Dashboard')]"))
        )
        assert dashboard_title.is_displayed()
    
    def test_navigation_links_work(self, driver):
        """Test that all navigation links work"""
        pages_to_test = [
            ("/#leads", "Leads"),
            ("/#followups", "Follow-ups"),
            ("/#payments", "Payments"),
            ("/#reports", "Reports")
        ]
        
        for url, expected_heading in pages_to_test:
            driver.get(f"{self.BASE_URL}{url}")
            time.sleep(2)  # Wait for JavaScript routing
            
            # Wait for the page to become visible and check heading
            heading = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, f"//h1[contains(text(), '{expected_heading}')]"))
            )
            assert expected_heading in heading.text
    
    def test_css_theme_loads(self, driver):
        """Test that custom CSS theme is loaded correctly"""
        driver.get(f"{self.BASE_URL}/#dashboard")
        time.sleep(2)  # Wait for JavaScript routing
        
        # Check if sidebar has correct styling
        sidebar = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='sidebar']"))
        )
        
        # Get computed background color (should be dark)
        bg_color = sidebar.value_of_css_property('background-color')
        assert "rgb" in bg_color.lower()
        
        # Check if topbar is present
        topbar = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='topbar']"))
        )
        assert topbar.is_displayed()
    
    def test_responsive_container(self, driver):
        """Test that main layout container works"""
        driver.get(f"{self.BASE_URL}/#dashboard")
        time.sleep(2)  # Wait for JavaScript routing
        
        # Check for main layout container
        main_layout = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='main-layout']"))
        )
        assert main_layout.is_displayed()
        
        # Check for page container
        page_container = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='page-container']"))
        )
        assert page_container.is_displayed()
    
    def test_card_components_render(self, driver):
        """Test that page placeholder components render with proper styling"""
        driver.get(f"{self.BASE_URL}/#dashboard")
        time.sleep(2)  # Wait for JavaScript routing
        
        # Check for page placeholder
        page_placeholder = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='page-dashboard']"))
        )
        assert page_placeholder.is_displayed()
        
        # Check for feature cards
        feature_cards = driver.find_elements(By.CLASS_NAME, "page-placeholder__feature")
        assert len(feature_cards) >= 1
        
        # Check that feature card has proper dark theme styling
        if feature_cards:
            card = feature_cards[0]
            bg_color = card.value_of_css_property('background-color')
            # Should have dark background
            assert bg_color != "rgba(0, 0, 0, 0)"  # Not transparent


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
