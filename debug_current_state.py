#!/usr/bin/env python3
"""
Debug current state of the leads page
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

def debug_current_state():
    """Debug current state"""
    driver = setup_driver()
    
    try:
        print("🔍 Debugging current state...")
        
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
            print("⚠️ Login modal not found")
        
        # Navigate to leads page
        print("🧭 Navigating to leads page...")
        driver.get("http://localhost:3000/#leads")
        time.sleep(8)
        
        # Check current URL
        current_url = driver.current_url
        print(f"🌐 Current URL: {current_url}")
        
        # Check browser console for errors
        logs = driver.get_log('browser')
        if logs:
            print("📝 Browser console logs:")
            for log in logs:
                if log['level'] == 'SEVERE':
                    print(f"  ❌ {log['level']}: {log['message']}")
                else:
                    print(f"  ℹ️ {log['level']}: {log['message']}")
        
        # Check what's in the content area
        try:
            content_area = driver.find_element(By.CSS_SELECTOR, ".main-layout__content")
            content_html = content_area.get_attribute('innerHTML')
            print(f"📄 Content area HTML length: {len(content_html)}")
            print(f"📄 Content area HTML preview: {content_html[:500]}...")
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
        
        # Check if there are any JavaScript errors in the page
        try:
            # Execute JavaScript to check for errors
            js_errors = driver.execute_script("""
                return window.console && window.console.errors ? window.console.errors : [];
            """)
            if js_errors:
                print(f"📝 JavaScript errors: {js_errors}")
            else:
                print("✅ No JavaScript errors detected")
        except:
            print("⚠️ Could not check JavaScript errors")
        
        # Take screenshot
        driver.save_screenshot("debug_current_state.png")
        print("📸 Debug screenshot saved: debug_current_state.png")
        
    except Exception as e:
        print(f"❌ Debug failed: {e}")
        driver.save_screenshot("debug_error.png")
    finally:
        driver.quit()

if __name__ == "__main__":
    debug_current_state()
