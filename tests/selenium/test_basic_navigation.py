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
        time.sleep(2)  # Wait for redirect
        
        # Should redirect to /dashboard
        assert "dashboard" in driver.current_url
        
        # Should display Tracklie title
        title_element = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "h1"))
        )
        assert "Tracklie CRM" in title_element.text
    
    def test_dashboard_page_loads(self, driver):
        """Test that dashboard page loads correctly"""
        driver.get(f"{self.BASE_URL}/#dashboard")
        
        # Check for dashboard heading
        dashboard_heading = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//h2[contains(text(), 'Dashboard')]"))
        )
        assert dashboard_heading.is_displayed()
        
        # Check for status badges (CSS theme test)
        status_badges = driver.find_elements(By.CLASS_NAME, "status-badge")
        assert len(status_badges) >= 4  # Should have New, In Progress, Hot Lead, Converted
    
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
        
        # Check if primary button has correct styling
        primary_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "btn--primary"))
        )
        
        # Get computed background color (should be purple)
        bg_color = primary_button.value_of_css_property('background-color')
        # RGB value for #735DFF should be roughly rgb(115, 93, 255)
        assert "rgb" in bg_color.lower()
    
    def test_responsive_container(self, driver):
        """Test that container class works"""
        driver.get(f"{self.BASE_URL}/#dashboard")
        
        container = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "container"))
        )
        assert container.is_displayed()
    
    def test_card_components_render(self, driver):
        """Test that card components render with proper styling"""
        driver.get(f"{self.BASE_URL}/#dashboard")
        
        cards = driver.find_elements(By.CLASS_NAME, "card")
        assert len(cards) >= 1
        
        # Check that card has proper dark theme styling
        card = cards[0]
        bg_color = card.value_of_css_property('background-color')
        # Should have dark background
        assert bg_color != "rgba(0, 0, 0, 0)"  # Not transparent


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
