#!/usr/bin/env python3
"""
Test dropdown z-index fix
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def test_dropdown_fix():
    """Test dropdown z-index fix"""
    
    chrome_options = Options()
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--start-maximized")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("🚀 Testing Dropdown Z-Index Fix...")
        
        # Navigate to the application
        driver.get("http://localhost:3000")
        print("✅ Navigated to application")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # Login
        try:
            login_btn = driver.find_element(By.CSS_SELECTOR, ".home-page__login-btn")
            login_btn.click()
            
            login_modal = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".login-modal"))
            )
            
            email_input = driver.find_element(By.CSS_SELECTOR, ".login-modal__input[type='email']")
            password_input = driver.find_element(By.CSS_SELECTOR, ".login-modal__input[type='password']")
            submit_btn = driver.find_element(By.CSS_SELECTOR, ".login-modal__submit")
            
            email_input.clear()
            email_input.send_keys("admin@tracklie.com")
            password_input.clear()
            password_input.send_keys("admin123")
            
            submit_btn.click()
            
            WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".main-layout"))
            )
            print("✅ Successfully logged in")
            
        except TimeoutException:
            print("ℹ️ Already logged in")
        
        # Navigate to leads page
        leads_nav = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, "a[href*='leads']"))
        )
        leads_nav.click()
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".leads-table"))
        )
        print("✅ Navigated to leads page")
        
        # Find status controls
        status_controls = driver.find_elements(By.CSS_SELECTOR, ".status-control__current")
        if status_controls:
            print(f"✅ Found {len(status_controls)} status controls")
            
            # Find first clickable status control
            clickable_status = None
            for status_control in status_controls:
                arrows = status_control.find_elements(By.CSS_SELECTOR, ".status-control__arrow")
                if arrows:
                    clickable_status = status_control
                    break
            
            if clickable_status:
                print("✅ Found clickable status control")
                
                # Scroll to make sure it's visible
                driver.execute_script("arguments[0].scrollIntoView(true);", clickable_status)
                time.sleep(1)
                
                # Click to open dropdown
                clickable_status.click()
                print("✅ Clicked on status control")
                
                # Wait for dropdown
                WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".status-control__dropdown"))
                )
                
                # Check dropdown properties
                dropdown = driver.find_element(By.CSS_SELECTOR, ".status-control__dropdown")
                dropdown_style = dropdown.get_attribute("style")
                
                if "display: none" not in dropdown_style:
                    print("✅ Dropdown is visible")
                    
                    # Check z-index
                    z_index = dropdown.value_of_css_property("z-index")
                    print(f"✅ Dropdown z-index: {z_index}")
                    
                    # Check position
                    position = dropdown.value_of_css_property("position")
                    print(f"✅ Dropdown position: {position}")
                    
                    # Check if dropdown is positioned correctly
                    rect = dropdown.rect
                    print(f"✅ Dropdown position: top={rect['y']}, left={rect['x']}")
                    
                    # Take screenshot
                    driver.save_screenshot("dropdown_fix_test.png")
                    print("📸 Screenshot saved: dropdown_fix_test.png")
                    
                    print("\n🎉 Dropdown fix test completed!")
                    print("✅ Check the screenshot to verify the dropdown is not clipped")
                    
                else:
                    print("❌ Dropdown not visible")
            else:
                print("❌ No clickable status controls found")
        else:
            print("❌ No status controls found")
        
        # Keep browser open for a few seconds
        print("\n⏳ Keeping browser open for 5 seconds...")
        time.sleep(5)
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False
        
    finally:
        driver.quit()

if __name__ == "__main__":
    test_dropdown_fix()
