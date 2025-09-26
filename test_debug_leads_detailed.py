#!/usr/bin/env python3
"""
Detailed debug test to check leads page content
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

def setup_driver():
    """Setup Chrome driver with options"""
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def debug_leads_page_detailed():
    """Detailed debug of the leads page"""
    driver = setup_driver()
    
    try:
        print("🔍 Detailed debugging of leads page...")
        
        # Navigate to home page and login
        driver.get("http://localhost:3000")
        time.sleep(3)
        
        # Login
        try:
            login_modal = driver.find_element(By.CSS_SELECTOR, ".login-modal")
            if login_modal.is_displayed():
                print("📋 Login modal is open, logging in...")
                
                email_input = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
                password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
                
                email_input.clear()
                email_input.send_keys("admin@tracklie.com")
                password_input.clear()
                password_input.send_keys("admin123")
                
                submit_btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
                submit_btn.click()
                time.sleep(3)
        except:
            print("⚠️ Login modal not found or not open")
        
        # Navigate to leads page
        print("🧭 Navigating to leads page...")
        driver.get("http://localhost:3000/#leads")
        time.sleep(5)
        
        # Check if leads page component exists
        try:
            leads_page = driver.find_element(By.CSS_SELECTOR, "[data-testid='leads-page']")
            print("✅ Leads page component found")
            
            # Get the HTML content of the leads page
            leads_html = leads_page.get_attribute('innerHTML')
            print(f"📄 Leads page HTML length: {len(leads_html)}")
            print(f"📄 Leads page HTML preview: {leads_html[:500]}...")
            
            # Check for specific elements
            elements_to_check = [
                ("[data-testid='leads-table']", "Leads table"),
                ("[data-testid='lead-search']", "Search input"),
                ("[data-testid='filter-status']", "Status filter"),
                ("[data-testid='filter-source']", "Source filter"),
                ("[data-testid='date-filter']", "Date filter"),
                ("[data-testid='pagination-bar']", "Pagination bar"),
                ("[data-testid='add-lead-btn']", "Add lead button"),
                (".leads-page__title", "Page title"),
                (".leads-page__filters", "Filters section"),
                (".leads-page__table-section", "Table section")
            ]
            
            for selector, description in elements_to_check:
                try:
                    element = leads_page.find_element(By.CSS_SELECTOR, selector)
                    print(f"✅ {description} found")
                except:
                    print(f"❌ {description} not found")
            
        except:
            print("❌ Leads page component not found")
        
        # Check if there are any JavaScript errors
        logs = driver.get_log('browser')
        if logs:
            print("📝 Browser console logs:")
            for log in logs:
                if log['level'] == 'SEVERE':
                    print(f"  ❌ {log['level']}: {log['message']}")
                else:
                    print(f"  ℹ️ {log['level']}: {log['message']}")
        
        # Take screenshot
        driver.save_screenshot("debug_leads_detailed.png")
        print("📸 Detailed debug screenshot saved: debug_leads_detailed.png")
        
    except Exception as e:
        print(f"❌ Debug failed: {e}")
        driver.save_screenshot("debug_error_detailed.png")
    finally:
        driver.quit()

if __name__ == "__main__":
    debug_leads_page_detailed()
