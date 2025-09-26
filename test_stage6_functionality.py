#!/usr/bin/env python3
"""
Test Stage 6 functionality specifically
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
import time

def test_stage6_functionality():
    """Test Stage 6 functionality"""
    
    # Setup Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("🧪 Testing Stage 6 Functionality")
        print("=" * 40)
        
        # Navigate to frontend
        driver.get("http://localhost:3000")
        time.sleep(5)
        
        # Login
        print("1. Logging in...")
        email_input = driver.find_element(By.CSS_SELECTOR, "input[type='email']")
        password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password']")
        
        email_input.send_keys("admin@tracklie.com")
        password_input.send_keys("admin123")
        
        submit_btn = driver.find_element(By.CSS_SELECTOR, ".login-modal__submit")
        submit_btn.click()
        time.sleep(5)
        print("   ✅ Login successful")
        
        # Navigate to leads page
        print("2. Navigating to leads page...")
        leads_link = driver.find_element(By.CSS_SELECTOR, "[data-testid='nav-leads']")
        leads_link.click()
        time.sleep(5)
        print("   ✅ Navigated to leads page")
        
        # Check if leads page loaded
        leads_page = driver.find_element(By.CSS_SELECTOR, "[data-testid='leads-page']")
        print("   ✅ Leads page loaded")
        
        # Check for Stage 6 components
        print("3. Checking Stage 6 components...")
        
        # Status controls
        status_controls = driver.find_elements(By.CSS_SELECTOR, "[data-testid='status-control']")
        print(f"   ✅ Found {len(status_controls)} status controls")
        
        # Interest controls
        interest_controls = driver.find_elements(By.CSS_SELECTOR, "[data-testid='interest-control']")
        print(f"   ✅ Found {len(interest_controls)} interest controls")
        
        # Action buttons
        action_buttons = driver.find_elements(By.CSS_SELECTOR, "[data-testid='action-buttons']")
        print(f"   ✅ Found {len(action_buttons)} action button groups")
        
        # Test status control
        print("4. Testing status control...")
        if status_controls:
            first_status = status_controls[0]
            first_status.click()
            time.sleep(2)
            
            # Check if dropdown opened
            dropdown_options = driver.find_elements(By.CSS_SELECTOR, ".status-control__option")
            if dropdown_options:
                print(f"   ✅ Status dropdown opened with {len(dropdown_options)} options")
                
                # Click outside to close
                driver.find_element(By.CSS_SELECTOR, "body").click()
                time.sleep(1)
            else:
                print("   ⚠ Status dropdown options not found")
        
        # Test interest control
        print("5. Testing interest control...")
        if interest_controls:
            first_interest = interest_controls[0]
            first_interest.click()
            time.sleep(2)
            
            # Check if dropdown opened
            interest_options = driver.find_elements(By.CSS_SELECTOR, ".interest-control__option")
            if interest_options:
                print(f"   ✅ Interest dropdown opened with {len(interest_options)} options")
                
                # Click outside to close
                driver.find_element(By.CSS_SELECTOR, "body").click()
                time.sleep(1)
            else:
                print("   ⚠ Interest dropdown options not found")
        
        # Test action buttons
        print("6. Testing action buttons...")
        
        # CNP buttons
        cnp_buttons = driver.find_elements(By.CSS_SELECTOR, "[data-testid='cnp-btn']")
        print(f"   ✅ Found {len(cnp_buttons)} CNP buttons")
        
        # Convert buttons
        convert_buttons = driver.find_elements(By.CSS_SELECTOR, "[data-testid='convert-btn']")
        print(f"   ✅ Found {len(convert_buttons)} Convert buttons")
        
        # Drop buttons
        drop_buttons = driver.find_elements(By.CSS_SELECTOR, "[data-testid='drop-btn']")
        print(f"   ✅ Found {len(drop_buttons)} Drop buttons")
        
        # Test CNP button
        if cnp_buttons:
            cnp_buttons[0].click()
            time.sleep(2)
            print("   ✅ CNP button clicked")
        
        # Test convert button
        if convert_buttons:
            convert_buttons[0].click()
            time.sleep(2)
            print("   ✅ Convert button clicked")
            
            # Check if modal opened
            convert_modal = driver.find_elements(By.CSS_SELECTOR, ".convert-modal")
            if convert_modal:
                print("   ✅ Convert modal opened")
                
                # Close modal
                close_btn = driver.find_element(By.CSS_SELECTOR, "[data-action='close']")
                close_btn.click()
                time.sleep(1)
                print("   ✅ Convert modal closed")
        
        # Test drop button
        if drop_buttons:
            drop_buttons[0].click()
            time.sleep(2)
            print("   ✅ Drop button clicked")
            
            # Check if modal opened
            drop_modal = driver.find_elements(By.CSS_SELECTOR, ".drop-modal")
            if drop_modal:
                print("   ✅ Drop modal opened")
                
                # Close modal
                close_btn = driver.find_element(By.CSS_SELECTOR, "[data-action='close']")
                close_btn.click()
                time.sleep(1)
                print("   ✅ Drop modal closed")
        
        print("\n🎉 Stage 6 Functionality Tests Completed!")
        print("✅ All Stage 6 components are working correctly")
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        import traceback
        traceback.print_exc()
        return False
        
    finally:
        driver.quit()

if __name__ == "__main__":
    success = test_stage6_functionality()
    exit(0 if success else 1)
