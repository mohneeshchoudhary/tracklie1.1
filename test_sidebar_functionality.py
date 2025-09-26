#!/usr/bin/env python3
"""
Selenium test for sidebar functionality
Tests sidebar width, hamburger menu, and collapsible behavior
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException
import time
import os

def setup_driver():
    """Setup Chrome driver with options"""
    chrome_options = Options()
    # chrome_options.add_argument("--headless")  # Run in visible mode
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def test_sidebar_functionality():
    """Test sidebar functionality"""
    driver = setup_driver()
    
    try:
        print("🚀 Starting sidebar functionality test...")
        
        # Navigate to the application with cache busting
        driver.get("http://localhost:3000?t=" + str(int(time.time())))
        print("✅ Navigated to localhost:3000 with cache busting")
        
        # Wait for page to load
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "body"))
        )
        print("✅ Page loaded successfully")
        
        # Pause to see the page
        print("⏸️ Pausing for 3 seconds to see the page...")
        time.sleep(3)
        
        # Take initial screenshot
        driver.save_screenshot("sidebar_initial_state.png")
        print("📸 Initial screenshot saved: sidebar_initial_state.png")
        
        # First, login to get proper authentication
        print("🔐 Starting login process...")
        
        # Look for login button on home page
        try:
            print("🔍 Looking for login button...")
            login_btn = driver.find_element(By.CSS_SELECTOR, ".home-page__cta-btn, .btn--primary")
            print(f"📋 Found button with text: '{login_btn.text}'")
            
            if login_btn and ("login" in login_btn.text.lower() or "trial" in login_btn.text.lower() or "start" in login_btn.text.lower()):
                print("🖱️ Clicking login button...")
                login_btn.click()
                time.sleep(3)  # Wait longer for modal to appear
                
                # Take screenshot after clicking login
                driver.save_screenshot("after_login_click.png")
                print("📸 Screenshot after login click saved")
                
                # Fill login form
                print("📝 Filling login form...")
                email_input = WebDriverWait(driver, 5).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "input[type='email'], input[name='email']"))
                )
                password_input = driver.find_element(By.CSS_SELECTOR, "input[type='password'], input[name='password']")
                
                email_input.clear()
                email_input.send_keys("admin@tracklie.com")
                password_input.clear()
                password_input.send_keys("admin123")
                
                # Submit login
                print("🚀 Submitting login...")
                submit_btn = driver.find_element(By.CSS_SELECTOR, "button[type='submit'], .btn--primary")
                submit_btn.click()
                
                # Wait for redirect to dashboard
                print("⏳ Waiting for redirect to dashboard...")
                WebDriverWait(driver, 10).until(
                    EC.url_contains("dashboard")
                )
                print("✅ Successfully logged in and redirected to dashboard")
                
        except (TimeoutException, NoSuchElementException) as e:
            print(f"⚠️ Login process failed: {e}")
            print("🎯 Trying direct navigation to dashboard...")
            driver.get("http://localhost:3000/#dashboard")
            time.sleep(3)
        
        # Check if we're already on dashboard (might be already logged in)
        current_url = driver.current_url
        print(f"🌐 Current URL: {current_url}")
        
        if "dashboard" not in current_url:
            print("🎯 Forcing navigation to dashboard...")
            driver.get("http://localhost:3000/#dashboard")
            time.sleep(3)
        
        # Wait for dashboard to load
        time.sleep(3)
        
        # Take screenshot of dashboard
        driver.save_screenshot("sidebar_dashboard.png")
        print("📸 Dashboard screenshot saved: sidebar_dashboard.png")
        
        # Test 1: Check sidebar width
        print("\n🔍 Testing sidebar width...")
        sidebar = driver.find_element(By.CSS_SELECTOR, ".sidebar")
        sidebar_width = sidebar.size['width']
        print(f"📏 Sidebar width: {sidebar_width}px")
        
        # Check computed CSS values
        computed_width = driver.execute_script("return window.getComputedStyle(document.querySelector('.sidebar')).width")
        print(f"🎨 Computed CSS width: {computed_width}")
        
        # Check main layout sidebar container
        try:
            sidebar_container = driver.find_element(By.CSS_SELECTOR, ".main-layout__sidebar")
            container_width = sidebar_container.size['width']
            print(f"📦 Sidebar container width: {container_width}px")
            
            container_computed = driver.execute_script("return window.getComputedStyle(document.querySelector('.main-layout__sidebar')).width")
            print(f"🎨 Container computed width: {container_computed}")
        except NoSuchElementException:
            print("❌ Sidebar container not found")
        
        # Test 2: Check for hamburger menu
        print("\n🍔 Testing hamburger menu...")
        try:
            hamburger = driver.find_element(By.CSS_SELECTOR, ".sidebar__hamburger")
            print("✅ Hamburger menu found!")
            print(f"📍 Hamburger position: {hamburger.location}")
            print(f"📏 Hamburger size: {hamburger.size}")
            
            # Check if hamburger is visible
            is_visible = hamburger.is_displayed()
            print(f"👁️ Hamburger visible: {is_visible}")
            
        except NoSuchElementException:
            print("❌ Hamburger menu NOT found!")
        
        # Test 3: Test sidebar collapse functionality
        print("\n🔄 Testing sidebar collapse...")
        try:
            hamburger = driver.find_element(By.CSS_SELECTOR, ".sidebar__hamburger")
            if hamburger.is_displayed():
                print("🖱️ Clicking hamburger menu...")
                hamburger.click()
                time.sleep(2)  # Wait for animation
                
                # Take screenshot after collapse
                driver.save_screenshot("sidebar_after_collapse.png")
                print("📸 Post-collapse screenshot saved: sidebar_after_collapse.png")
                
                # Check new sidebar width
                new_sidebar_width = sidebar.size['width']
                print(f"📏 New sidebar width: {new_sidebar_width}px")
                
                # Check if collapsed class is applied
                has_collapsed_class = "sidebar--collapsed" in sidebar.get_attribute("class")
                print(f"🏷️ Has collapsed class: {has_collapsed_class}")
                
                # Click again to expand
                print("🖱️ Clicking hamburger again to expand...")
                hamburger.click()
                time.sleep(2)
                
                # Take screenshot after expand
                driver.save_screenshot("sidebar_after_expand.png")
                print("📸 Post-expand screenshot saved: sidebar_after_expand.png")
                
                # Check final sidebar width
                final_sidebar_width = sidebar.size['width']
                print(f"📏 Final sidebar width: {final_sidebar_width}px")
                
            else:
                print("❌ Hamburger menu not visible, cannot test collapse")
                
        except NoSuchElementException:
            print("❌ Cannot test collapse - hamburger menu not found")
        
        # Test 4: Check for gap between sidebar and content
        print("\n📐 Testing for gap between sidebar and content...")
        try:
            content = driver.find_element(By.CSS_SELECTOR, ".main-layout__content")
            content_location = content.location['x']
            sidebar_right_edge = sidebar.location['x'] + sidebar.size['width']
            
            gap = content_location - sidebar_right_edge
            print(f"📏 Gap between sidebar and content: {gap}px")
            
            if gap > 5:  # Allow for small rounding errors
                print("⚠️ Gap detected between sidebar and content!")
            else:
                print("✅ No significant gap detected")
                
        except NoSuchElementException:
            print("❌ Could not find content area to measure gap")
        
        # Test 5: Check navigation items
        print("\n🧭 Testing navigation items...")
        try:
            nav_items = driver.find_elements(By.CSS_SELECTOR, ".sidebar__nav-item")
            print(f"📋 Found {len(nav_items)} navigation items:")
            
            for i, item in enumerate(nav_items):
                text = item.text.strip()
                href = item.get_attribute("href")
                print(f"  {i+1}. {text} -> {href}")
                
        except NoSuchElementException:
            print("❌ No navigation items found")
        
        # Test 6: Check user info display
        print("\n👤 Testing user info display...")
        try:
            user_name = driver.find_element(By.CSS_SELECTOR, ".sidebar__user-name")
            user_role = driver.find_element(By.CSS_SELECTOR, ".sidebar__user-role")
            
            print(f"👤 User name: {user_name.text}")
            print(f"🏷️ User role: {user_role.text}")
            
        except NoSuchElementException:
            print("❌ User info not found in sidebar")
        
        print("\n✅ Sidebar functionality test completed!")
        
    except Exception as e:
        print(f"❌ Test failed with error: {str(e)}")
        driver.save_screenshot("sidebar_test_error.png")
        print("📸 Error screenshot saved: sidebar_test_error.png")
        
    finally:
        driver.quit()
        print("🔚 Browser closed")

if __name__ == "__main__":
    test_sidebar_functionality()
