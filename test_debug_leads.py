#!/usr/bin/env python3
"""
Debug test to check what's happening with the leads page
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

def debug_leads_page():
    """Debug the leads page loading"""
    driver = setup_driver()
    
    try:
        print("🔍 Debugging leads page...")
        
        # Navigate to home page and login
        driver.get("http://localhost:3000")
        time.sleep(3)
        
        # Check if login modal is open
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
        
        # Check current URL
        current_url = driver.current_url
        print(f"🌐 Current URL: {current_url}")
        
        # Check page source for any error messages
        page_source = driver.page_source
        if "error" in page_source.lower():
            print("❌ Error found in page source")
        
        # Check if any JavaScript errors occurred
        logs = driver.get_log('browser')
        if logs:
            print("📝 Browser console logs:")
            for log in logs:
                print(f"  {log['level']}: {log['message']}")
        else:
            print("✅ No browser console errors")
        
        # Check if main layout is present
        try:
            main_layout = driver.find_element(By.CSS_SELECTOR, "[data-testid='main-layout']")
            print("✅ Main layout found")
        except:
            print("❌ Main layout not found")
        
        # Check if sidebar is present
        try:
            sidebar = driver.find_element(By.CSS_SELECTOR, "[data-testid='sidebar']")
            print("✅ Sidebar found")
        except:
            print("❌ Sidebar not found")
        
        # Check if content area is present
        try:
            content_area = driver.find_element(By.CSS_SELECTOR, ".main-layout__content")
            print("✅ Content area found")
        except:
            print("❌ Content area not found")
        
        # Check what's in the content area
        try:
            content_area = driver.find_element(By.CSS_SELECTOR, ".main-layout__content")
            content_html = content_area.get_attribute('innerHTML')
            print(f"📄 Content area HTML: {content_html[:200]}...")
        except:
            print("❌ Could not get content area HTML")
        
        # Check if leads page component exists
        try:
            leads_page = driver.find_element(By.CSS_SELECTOR, "[data-testid='leads-page']")
            print("✅ Leads page component found")
        except:
            print("❌ Leads page component not found")
        
        # Check if any placeholder is shown
        try:
            placeholder = driver.find_element(By.CSS_SELECTOR, ".page-placeholder")
            print("📋 Page placeholder found")
            placeholder_title = placeholder.find_element(By.CSS_SELECTOR, ".page-placeholder__title")
            print(f"📋 Placeholder title: {placeholder_title.text}")
        except:
            print("ℹ️ No page placeholder found")
        
        # Take screenshot
        driver.save_screenshot("debug_leads_page.png")
        print("📸 Debug screenshot saved: debug_leads_page.png")
        
    except Exception as e:
        print(f"❌ Debug failed: {e}")
        driver.save_screenshot("debug_error.png")
    finally:
        driver.quit()

if __name__ == "__main__":
    debug_leads_page()
