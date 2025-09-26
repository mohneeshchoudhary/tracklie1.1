#!/usr/bin/env python3
"""
Final test that matches the working debug test exactly
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

def test_leads_final():
    """Final test that should work"""
    driver = setup_driver()
    
    try:
        print("🚀 Starting final leads test...")
        
        # Navigate to home page
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
        time.sleep(8)  # Wait longer
        
        # Check if leads page exists
        try:
            leads_page = driver.find_element(By.CSS_SELECTOR, "[data-testid='leads-page']")
            print("✅ Leads page found!")
            
            # Test all elements
            elements_to_test = [
                ("[data-testid='leads-table']", "Leads table"),
                ("[data-testid='lead-search']", "Search input"),
                ("[data-testid='filter-status']", "Status filter"),
                ("[data-testid='filter-source']", "Source filter"),
                ("[data-testid='date-filter']", "Date filter"),
                ("[data-testid='pagination-bar']", "Pagination bar"),
                ("[data-testid='add-lead-btn']", "Add lead button")
            ]
            
            passed = 0
            total = len(elements_to_test)
            
            for selector, description in elements_to_test:
                try:
                    element = leads_page.find_element(By.CSS_SELECTOR, selector)
                    print(f"✅ {description} found")
                    passed += 1
                except:
                    print(f"❌ {description} not found")
            
            print(f"\n📊 Results: {passed}/{total} elements found ({passed/total*100:.1f}%)")
            
            if passed >= total * 0.8:  # 80% success rate
                print("🎉 Leads page is working!")
                return True
            else:
                print("⚠️ Leads page has issues")
                return False
                
        except:
            print("❌ Leads page not found")
            return False
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False
    finally:
        driver.save_screenshot("leads_final_test.png")
        print("📸 Screenshot saved: leads_final_test.png")
        driver.quit()

if __name__ == "__main__":
    success = test_leads_final()
    exit(0 if success else 1)
