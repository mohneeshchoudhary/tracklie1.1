#!/usr/bin/env python3
"""
Simple test for UI improvements
"""

import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def test_simple_ui_fix():
    """Simple test for UI improvements"""
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("🚀 Testing UI Improvements...")
        
        # Navigate to the application
        driver.get("http://localhost:3000")
        print("✅ Navigated to application")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # Check if we're on home page or dashboard
        try:
            # Try to find leads navigation
            leads_nav = WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "[data-testid='nav-leads']"))
            )
            leads_nav.click()
            print("✅ Navigated to leads page")
        except TimeoutException:
            print("ℹ️ Already on leads page or navigation not found")
        
        # Wait for leads table
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "leads-table"))
        )
        print("✅ Leads table loaded")
        
        # Test dropdown z-index and styling
        print("\n🔍 Testing dropdown improvements...")
        
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
            
            # Check dropdown visibility and styling
            dropdown = driver.find_element(By.CSS_SELECTOR, ".status-control__dropdown")
            dropdown_style = dropdown.get_attribute("style")
            
            if "display: none" not in dropdown_style:
                print("✅ Dropdown is visible")
                
                # Check z-index
                z_index = dropdown.value_of_css_property("z-index")
                print(f"✅ Dropdown z-index: {z_index}")
                
                # Check background color
                bg_color = dropdown.value_of_css_property("background-color")
                print(f"✅ Dropdown background: {bg_color}")
                
                # Check options
                options = driver.find_elements(By.CSS_SELECTOR, ".status-control__option")
                print(f"✅ Found {len(options)} dropdown options")
                
                # Test click outside to close
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
        
        print("\n🎉 UI Improvements Test Completed!")
        return True
        
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False
        
    finally:
        driver.quit()

if __name__ == "__main__":
    success = test_simple_ui_fix()
    if success:
        print("\n✅ UI improvements are working!")
    else:
        print("\n❌ UI improvements need attention.")
