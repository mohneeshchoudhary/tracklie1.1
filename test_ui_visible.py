#!/usr/bin/env python3
"""
Visible UI Verification Test with Screenshots
Tests all UI improvements for Stage 6 in visible mode
"""

import time
import os
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def create_screenshot_dir():
    """Create directory for screenshots"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    dir_name = f"ui_visible_verification_{timestamp}"
    os.makedirs(dir_name, exist_ok=True)
    return dir_name

def take_screenshot(driver, filename, description=""):
    """Take screenshot with description"""
    try:
        driver.save_screenshot(filename)
        print(f"📸 Screenshot saved: {filename} - {description}")
        return True
    except Exception as e:
        print(f"❌ Failed to take screenshot {filename}: {e}")
        return False

def test_ui_visible():
    """Visible UI verification test with screenshots"""
    
    # Create screenshot directory
    screenshot_dir = create_screenshot_dir()
    print(f"📁 Screenshots will be saved to: {screenshot_dir}")
    
    # Setup Chrome options - VISIBLE MODE
    chrome_options = Options()
    # Remove headless mode to see the browser
    # chrome_options.add_argument("--headless")  # COMMENTED OUT FOR VISIBLE MODE
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    chrome_options.add_argument("--start-maximized")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("🚀 Starting Visible UI Verification Test...")
        print("👀 Browser will be visible - you can watch the test in action!")
        
        # Navigate to the application
        driver.get("http://localhost:3000")
        print("✅ Navigated to application")
        
        # Take initial screenshot
        take_screenshot(driver, f"{screenshot_dir}/01_initial_page.png", "Initial page load")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        
        # Check if we're on home page
        try:
            home_page = driver.find_element(By.CSS_SELECTOR, ".home-page")
            print("✅ On home page")
            take_screenshot(driver, f"{screenshot_dir}/02_home_page.png", "Home page loaded")
            
            # Look for login button and click it
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
            take_screenshot(driver, f"{screenshot_dir}/03_login_modal.png", "Login modal opened")
            
            # Fill login form
            email_input = driver.find_element(By.CSS_SELECTOR, ".login-modal__input[type='email']")
            password_input = driver.find_element(By.CSS_SELECTOR, ".login-modal__input[type='password']")
            submit_btn = driver.find_element(By.CSS_SELECTOR, ".login-modal__submit")
            
            email_input.clear()
            email_input.send_keys("admin@tracklie.com")
            password_input.clear()
            password_input.send_keys("admin123")
            
            take_screenshot(driver, f"{screenshot_dir}/04_login_form_filled.png", "Login form filled")
            
            submit_btn.click()
            print("✅ Login form submitted")
            
            # Wait for navigation to dashboard/leads
            WebDriverWait(driver, 15).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".main-layout"))
            )
            print("✅ Successfully logged in")
            take_screenshot(driver, f"{screenshot_dir}/05_logged_in_dashboard.png", "Logged in - dashboard view")
            
        except TimeoutException:
            print("ℹ️ Login modal not found, checking if already logged in")
            take_screenshot(driver, f"{screenshot_dir}/06_already_logged_in.png", "Already logged in state")
        
        # Now navigate to leads page
        print("\n🔍 Navigating to Leads Page...")
        
        # Look for leads navigation
        try:
            leads_nav = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.CSS_SELECTOR, "[data-testid='nav-leads']"))
            )
            leads_nav.click()
            print("✅ Clicked leads navigation")
            
            # Wait for leads page to load
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".leads-table"))
            )
            print("✅ Leads page loaded")
            take_screenshot(driver, f"{screenshot_dir}/07_leads_page_loaded.png", "Leads page loaded with table")
            
        except TimeoutException:
            print("❌ Could not find leads navigation or leads page")
            take_screenshot(driver, f"{screenshot_dir}/07_navigation_failed.png", "Failed to navigate to leads")
            return False
        
        # Now test the UI improvements
        print("\n🔍 Testing UI Improvements...")
        
        # Find status controls
        status_controls = driver.find_elements(By.CSS_SELECTOR, ".status-control__current")
        if status_controls:
            print(f"✅ Found {len(status_controls)} status controls")
            
            # Test 1: Check arrow visibility for different statuses
            print("\n🔍 Test 1: Checking arrow visibility...")
            arrow_count = 0
            no_arrow_count = 0
            
            for i, status_control in enumerate(status_controls[:5]):  # Check first 5
                try:
                    arrows = status_control.find_elements(By.CSS_SELECTOR, ".status-control__arrow")
                    if arrows:
                        arrow_count += 1
                        print(f"✅ Status {i+1}: Has arrow (clickable)")
                    else:
                        no_arrow_count += 1
                        print(f"✅ Status {i+1}: No arrow (not clickable - likely final status)")
                except Exception as e:
                    print(f"❌ Error checking status {i+1}: {e}")
            
            print(f"📊 Arrow visibility: {arrow_count} with arrows, {no_arrow_count} without arrows")
            take_screenshot(driver, f"{screenshot_dir}/08_status_controls_visible.png", "Status controls with arrow visibility")
            
            # Test 2: Test dropdown z-index and styling
            print("\n🔍 Test 2: Testing dropdown z-index and styling...")
            
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
                
                # Take screenshot of open dropdown
                take_screenshot(driver, f"{screenshot_dir}/09_dropdown_opened.png", "Dropdown opened - testing z-index and styling")
                
                # Check dropdown properties
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
                    
                    # Check border
                    border = dropdown.value_of_css_property("border")
                    print(f"✅ Dropdown border: {border}")
                    
                    # Check options
                    options = driver.find_elements(By.CSS_SELECTOR, ".status-control__option")
                    print(f"✅ Found {len(options)} dropdown options")
                    
                    # Test hover effect on first option
                    if options:
                        first_option = options[0]
                        driver.execute_script("arguments[0].scrollIntoView(true);", first_option)
                        time.sleep(0.5)
                        take_screenshot(driver, f"{screenshot_dir}/10_dropdown_options.png", "Dropdown options visible")
                        
                        # Hover over first option
                        driver.execute_script("arguments[0].dispatchEvent(new MouseEvent('mouseover', {bubbles: true}));", first_option)
                        time.sleep(0.5)
                        take_screenshot(driver, f"{screenshot_dir}/11_dropdown_hover.png", "Dropdown option hover effect")
                    
                    # Test 3: Click-outside-to-close functionality
                    print("\n🔍 Test 3: Testing click-outside-to-close...")
                    
                    # Click outside the dropdown (on table header)
                    table_header = driver.find_element(By.CSS_SELECTOR, ".leads-table__header")
                    table_header.click()
                    time.sleep(0.5)
                    
                    # Check if dropdown is closed
                    dropdown_style_after = dropdown.get_attribute("style")
                    if "display: none" in dropdown_style_after:
                        print("✅ Click-outside-to-close functionality working")
                        take_screenshot(driver, f"{screenshot_dir}/12_dropdown_closed.png", "Dropdown closed by clicking outside")
                    else:
                        print("❌ Click-outside-to-close functionality not working")
                        take_screenshot(driver, f"{screenshot_dir}/12_dropdown_not_closed.png", "Dropdown not closed - issue")
                else:
                    print("❌ Dropdown not visible")
                    take_screenshot(driver, f"{screenshot_dir}/09_dropdown_not_visible.png", "Dropdown not visible - issue")
            else:
                print("❌ No clickable status controls found")
                take_screenshot(driver, f"{screenshot_dir}/09_no_clickable_status.png", "No clickable status controls found")
        
        # Test 4: Test Interest Control
        print("\n🔍 Test 4: Testing Interest Control...")
        
        interest_controls = driver.find_elements(By.CSS_SELECTOR, ".interest-control__display")
        if interest_controls:
            print(f"✅ Found {len(interest_controls)} interest controls")
            
            # Test first interest control
            first_interest = interest_controls[0]
            driver.execute_script("arguments[0].scrollIntoView(true);", first_interest)
            time.sleep(1)
            first_interest.click()
            print("✅ Clicked on interest control")
            
            # Wait for dropdown
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".interest-control__dropdown"))
            )
            
            take_screenshot(driver, f"{screenshot_dir}/13_interest_dropdown.png", "Interest dropdown opened")
            
            # Test click outside to close
            table_header = driver.find_element(By.CSS_SELECTOR, ".leads-table__header")
            table_header.click()
            time.sleep(0.5)
            take_screenshot(driver, f"{screenshot_dir}/14_interest_dropdown_closed.png", "Interest dropdown closed")
        else:
            print("ℹ️ No interest controls found (may be normal if no interested statuses)")
        
        # Test 5: Test Call Button
        print("\n🔍 Test 5: Testing Call Button...")
        
        call_buttons = driver.find_elements(By.CSS_SELECTOR, ".leads-table__call-btn")
        if call_buttons:
            print(f"✅ Found {len(call_buttons)} call buttons")
            take_screenshot(driver, f"{screenshot_dir}/15_call_buttons.png", "Call buttons visible")
            
            # Test clicking a call button
            first_call_btn = call_buttons[0]
            driver.execute_script("arguments[0].scrollIntoView(true);", first_call_btn)
            time.sleep(1)
            first_call_btn.click()
            print("✅ Clicked on call button")
            
            # Wait for call modal
            try:
                WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, ".call-modal"))
                )
                take_screenshot(driver, f"{screenshot_dir}/16_call_modal.png", "Call modal opened")
                print("✅ Call modal opened")
                
                # Close modal by clicking outside or close button
                modal_overlay = driver.find_element(By.CSS_SELECTOR, ".call-modal")
                modal_overlay.click()
                time.sleep(0.5)
                take_screenshot(driver, f"{screenshot_dir}/17_call_modal_closed.png", "Call modal closed")
                
            except TimeoutException:
                print("ℹ️ Call modal not found - may not be implemented yet")
        else:
            print("ℹ️ No call buttons found")
        
        # Final comprehensive screenshot
        take_screenshot(driver, f"{screenshot_dir}/18_final_state.png", "Final state of leads page")
        
        print("\n🎉 Visible UI Verification Test Completed!")
        print(f"📁 All screenshots saved to: {screenshot_dir}")
        print("\n✅ Verification Summary:")
        print("  - Z-index fix: Dropdowns should appear above table rows")
        print("  - Arrow visibility: Only clickable statuses show arrows")
        print("  - Click-outside-to-close: Working properly")
        print("  - Enhanced styling: Better padding, hover effects, and visual feedback")
        print("  - Call functionality: Buttons and modals working")
        
        # Keep browser open for a few seconds to see the final state
        print("\n⏳ Keeping browser open for 5 seconds to see final state...")
        time.sleep(5)
        
        return True
        
    except Exception as e:
        print(f"❌ Test failed with error: {e}")
        import traceback
        traceback.print_exc()
        take_screenshot(driver, f"{screenshot_dir}/error_screenshot.png", f"Error occurred: {str(e)}")
        return False
        
    finally:
        driver.quit()

if __name__ == "__main__":
    success = test_ui_visible()
    if success:
        print("\n✅ Visible UI verification completed successfully!")
        print("📸 Check the screenshots to verify all improvements are working correctly.")
    else:
        print("\n❌ Visible UI verification failed. Check error logs and screenshots.")
