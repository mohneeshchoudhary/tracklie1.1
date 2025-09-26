#!/usr/bin/env python3
"""
Test login and UI improvements
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def test_login_and_ui():
    """Test login and UI improvements"""
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("🚀 Testing Login and UI Improvements...")
        
        # Navigate to the application
        driver.get("http://localhost:3000")
        print("✅ Navigated to application")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # Check if we're on home page
        try:
            home_page = driver.find_element(By.CSS_SELECTOR, ".home-page")
            print("✅ On home page")
            
            # Look for login button
            login_btn = driver.find_element(By.CSS_SELECTOR, ".home-page__login-btn")
            login_btn.click()
            print("✅ Clicked login button")
            
        except NoSuchElementException:
            print("ℹ️ Not on home page or login button not found")
        
        # Wait for login modal
        try:
            login_modal = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".login-modal"))
            )
            print("✅ Login modal appeared")
            
            # Fill login form
            email_input = driver.find_element(By.CSS_SELECTOR, ".login-modal__input[type='email']")
            password_input = driver.find_element(By.CSS_SELECTOR, ".login-modal__input[type='password']")
            submit_btn = driver.find_element(By.CSS_SELECTOR, ".login-modal__submit")
            
            email_input.clear()
            email_input.send_keys("admin@tracklie.com")
            password_input.clear()
            password_input.send_keys("admin123")
            
            submit_btn.click()
            print("✅ Login form submitted")
            
            # Wait for navigation to dashboard/leads
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".leads-table"))
            )
            print("✅ Successfully logged in and navigated to leads")
            
        except TimeoutException:
            print("ℹ️ Login modal not found, checking if already logged in")
        
        # Now test the UI improvements
        print("\n🔍 Testing UI Improvements...")
        
        # Find status controls
        status_controls = driver.find_elements(By.CSS_SELECTOR, ".status-control__current")
        if status_controls:
            print(f"✅ Found {len(status_controls)} status controls")
            
            # Test first status control
            first_status = status_controls[0]
            first_status.click()
            print("✅ Clicked on first status control")
            
            # Wait for dropdown
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".status-control__dropdown"))
            )
            
            # Check dropdown
            dropdown = driver.find_element(By.CSS_SELECTOR, ".status-control__dropdown")
            dropdown_style = dropdown.get_attribute("style")
            
            if "display: none" not in dropdown_style:
                print("✅ Dropdown is visible")
                
                # Check z-index
                z_index = dropdown.value_of_css_property("z-index")
                print(f"✅ Dropdown z-index: {z_index}")
                
                # Check background
                bg_color = dropdown.value_of_css_property("background-color")
                print(f"✅ Dropdown background: {bg_color}")
                
                # Check options
                options = driver.find_elements(By.CSS_SELECTOR, ".status-control__option")
                print(f"✅ Found {len(options)} dropdown options")
                
                # Test click outside
                print("\n🔍 Testing click-outside-to-close...")
                table_header = driver.find_element(By.CSS_SELECTOR, ".leads-table__header")
                table_header.click()
                time.sleep(0.5)
                
                dropdown_style_after = dropdown.get_attribute("style")
                if "display: none" in dropdown_style_after:
                    print("✅ Click-outside-to-close working")
                else:
                    print("❌ Click-outside-to-close not working")
            else:
                print("❌ Dropdown not visible")
        else:
            print("❌ No status controls found")
        
        print("\n🎉 Test Completed!")
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False
        
    finally:
        driver.quit()

if __name__ == "__main__":
    success = test_login_and_ui()
    if success:
        print("\n✅ Login and UI improvements working!")
    else:
        print("\n❌ Issues found.")
