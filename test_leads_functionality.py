#!/usr/bin/env python3
"""
Selenium Test for Leads Page Functionality
Tests the leads page UI components, filters, table, and pagination
"""

import time
import sys
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import TimeoutException, NoSuchElementException

def setup_driver():
    """Setup Chrome driver with options"""
    chrome_options = Options()
    # chrome_options.add_argument("--headless")  # Run in visible mode for debugging
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    driver = webdriver.Chrome(options=chrome_options)
    return driver

def login_user(driver):
    """Login as admin user"""
    try:
        print("🔐 Starting login process...")
        
        # Navigate to home page
        driver.get("http://localhost:3000?t=" + str(int(time.time())))
        time.sleep(3)
        
        # Check if login modal is already open
        try:
            login_modal = driver.find_element(By.CSS_SELECTOR, ".login-modal")
            if login_modal.is_displayed():
                print("📋 Login modal is already open")
                # Fill login form directly
                email_input = driver.find_element(By.CSS_SELECTOR, "input[type='email'], input[name='email']")
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
                return True
        except NoSuchElementException:
            pass
        
        # If modal is not open, try to open it
        try:
            login_btn = driver.find_element(By.CSS_SELECTOR, ".home-page__cta-btn, .btn--primary")
            print(f"📋 Found button with text: '{login_btn.text}'")
            
            if login_btn and ("login" in login_btn.text.lower() or "trial" in login_btn.text.lower() or "start" in login_btn.text.lower()):
                print("🖱️ Clicking login button...")
                # Use JavaScript click to avoid interception
                driver.execute_script("arguments[0].click();", login_btn)
                time.sleep(3)
                
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
                return True
        except (TimeoutException, NoSuchElementException) as e:
            print(f"⚠️ Login button click failed: {e}")
            
    except Exception as e:
        print(f"⚠️ Login process failed: {e}")
        return False
    
    return False

def test_leads_page_navigation(driver):
    """Test navigation to leads page"""
    print("\n🧭 Testing leads page navigation...")
    
    try:
        # Navigate to leads page
        driver.get("http://localhost:3000/#leads")
        time.sleep(5)  # Increased wait time
        
        # Check if leads page loaded
        leads_page = driver.find_element(By.CSS_SELECTOR, "[data-testid='leads-page']")
        assert leads_page.is_displayed(), "Leads page not displayed"
        print("✅ Leads page loaded successfully")
        
        # Check page title
        page_title = driver.find_element(By.CSS_SELECTOR, ".leads-page__title")
        assert page_title.text == "Leads Management", f"Expected 'Leads Management', got '{page_title.text}'"
        print("✅ Page title is correct")
        
        return True
        
    except Exception as e:
        print(f"❌ Navigation test failed: {e}")
        return False

def test_leads_table_structure(driver):
    """Test leads table structure and data"""
    print("\n📊 Testing leads table structure...")
    
    try:
        # Check if table exists
        table = driver.find_element(By.CSS_SELECTOR, "[data-testid='leads-table']")
        assert table.is_displayed(), "Leads table not displayed"
        print("✅ Leads table is displayed")
        
        # Check table headers
        headers = driver.find_elements(By.CSS_SELECTOR, ".leads-table__header-cell")
        expected_headers = ['Name', 'Phone', 'Status', 'Assigned To', 'Last Updated']
        
        for i, expected_header in enumerate(expected_headers):
            if i < len(headers):
                header_text = headers[i].text.strip()
                assert expected_header in header_text, f"Expected header '{expected_header}', got '{header_text}'"
        
        print("✅ Table headers are correct")
        
        # Check if table has data rows
        rows = driver.find_elements(By.CSS_SELECTOR, "[data-testid='lead-row']")
        assert len(rows) > 0, "No lead rows found in table"
        print(f"✅ Found {len(rows)} lead rows")
        
        # Check first row data
        first_row = rows[0]
        cells = first_row.find_elements(By.CSS_SELECTOR, ".leads-table__cell")
        assert len(cells) >= 5, f"Expected at least 5 cells, got {len(cells)}"
        
        # Check if name cell has content
        name_cell = cells[0]
        assert name_cell.text.strip() != "", "Name cell is empty"
        print(f"✅ First lead name: {name_cell.text}")
        
        return True
        
    except Exception as e:
        print(f"❌ Table structure test failed: {e}")
        return False

def test_status_badges(driver):
    """Test status badges display and colors"""
    print("\n🏷️ Testing status badges...")
    
    try:
        # Find status badges
        badges = driver.find_elements(By.CSS_SELECTOR, "[data-testid='status-badge']")
        assert len(badges) > 0, "No status badges found"
        print(f"✅ Found {len(badges)} status badges")
        
        # Check badge content and styling
        for i, badge in enumerate(badges[:5]):  # Check first 5 badges
            badge_text = badge.text.strip()
            assert badge_text != "", f"Badge {i+1} text is empty"
            
            # Check if badge has proper styling
            badge_classes = badge.get_attribute("class")
            assert "status-badge" in badge_classes, f"Badge {i+1} missing status-badge class"
            
            print(f"✅ Badge {i+1}: {badge_text}")
        
        return True
        
    except Exception as e:
        print(f"❌ Status badges test failed: {e}")
        return False

def test_filters_functionality(driver):
    """Test filter components"""
    print("\n🔍 Testing filter functionality...")
    
    try:
        # Test search input
        search_input = driver.find_element(By.CSS_SELECTOR, "[data-testid='lead-search']")
        assert search_input.is_displayed(), "Search input not displayed"
        print("✅ Search input is displayed")
        
        # Test search functionality
        search_field = search_input.find_element(By.CSS_SELECTOR, ".search-input__field")
        search_field.clear()
        search_field.send_keys("Priya")
        time.sleep(2)  # Wait for debounced search
        
        # Check if results are filtered
        rows = driver.find_elements(By.CSS_SELECTOR, "[data-testid='lead-row']")
        print(f"✅ Search results: {len(rows)} rows after searching for 'Priya'")
        
        # Clear search
        clear_btn = search_input.find_element(By.CSS_SELECTOR, ".search-input__clear")
        clear_btn.click()
        time.sleep(1)
        
        # Test status filter
        status_filter = driver.find_element(By.CSS_SELECTOR, "[data-testid='filter-status']")
        assert status_filter.is_displayed(), "Status filter not displayed"
        print("✅ Status filter is displayed")
        
        # Test source filter
        source_filter = driver.find_element(By.CSS_SELECTOR, "[data-testid='filter-source']")
        assert source_filter.is_displayed(), "Source filter not displayed"
        print("✅ Source filter is displayed")
        
        # Test date filter
        date_filter = driver.find_element(By.CSS_SELECTOR, "[data-testid='date-filter']")
        assert date_filter.is_displayed(), "Date filter not displayed"
        print("✅ Date filter is displayed")
        
        return True
        
    except Exception as e:
        print(f"❌ Filters test failed: {e}")
        return False

def test_pagination(driver):
    """Test pagination functionality"""
    print("\n📄 Testing pagination...")
    
    try:
        # Check if pagination exists
        pagination = driver.find_element(By.CSS_SELECTOR, "[data-testid='pagination-bar']")
        assert pagination.is_displayed(), "Pagination not displayed"
        print("✅ Pagination is displayed")
        
        # Check pagination info
        pagination_info = pagination.find_element(By.CSS_SELECTOR, ".pagination-bar__info")
        info_text = pagination_info.text
        assert "Showing" in info_text and "leads" in info_text, f"Pagination info incorrect: {info_text}"
        print(f"✅ Pagination info: {info_text}")
        
        # Check pagination controls
        prev_btn = pagination.find_element(By.CSS_SELECTOR, "[data-testid='pagination-prev']")
        next_btn = pagination.find_element(By.CSS_SELECTOR, "[data-testid='pagination-next']")
        
        assert prev_btn.is_displayed(), "Previous button not displayed"
        assert next_btn.is_displayed(), "Next button not displayed"
        print("✅ Pagination controls are displayed")
        
        # Check if there are multiple pages (if items > 10)
        page_buttons = pagination.find_elements(By.CSS_SELECTOR, "[data-testid^='pagination-page-']")
        if len(page_buttons) > 1:
            print(f"✅ Multiple pages available: {len(page_buttons)} page buttons")
        else:
            print("ℹ️ Only one page of results (expected with 10 items per page)")
        
        return True
        
    except Exception as e:
        print(f"❌ Pagination test failed: {e}")
        return False

def test_add_lead_button(driver):
    """Test add lead button"""
    print("\n➕ Testing add lead button...")
    
    try:
        # Check if add lead button exists
        add_btn = driver.find_element(By.CSS_SELECTOR, "[data-testid='add-lead-btn']")
        assert add_btn.is_displayed(), "Add lead button not displayed"
        print("✅ Add lead button is displayed")
        
        # Check button text
        button_text = add_btn.text.strip()
        assert "Add Lead" in button_text, f"Expected 'Add Lead' in button text, got '{button_text}'"
        print(f"✅ Add lead button text: {button_text}")
        
        # Test button click (should not cause errors)
        add_btn.click()
        time.sleep(1)
        print("✅ Add lead button click handled without errors")
        
        return True
        
    except Exception as e:
        print(f"❌ Add lead button test failed: {e}")
        return False

def test_leads_functionality():
    """Main test function for leads page functionality"""
    driver = setup_driver()
    
    try:
        print("🚀 Starting leads functionality test...")
        
        # Login first
        if not login_user(driver):
            print("⚠️ Login failed, trying direct navigation...")
            driver.get("http://localhost:3000/#leads")
            time.sleep(3)
        
        # Take initial screenshot
        driver.save_screenshot("leads_initial_state.png")
        print("📸 Initial screenshot saved: leads_initial_state.png")
        
        # Run all tests
        tests = [
            test_leads_page_navigation,
            test_leads_table_structure,
            test_status_badges,
            test_filters_functionality,
            test_pagination,
            test_add_lead_button
        ]
        
        passed_tests = 0
        total_tests = len(tests)
        
        for test in tests:
            try:
                if test(driver):
                    passed_tests += 1
                time.sleep(1)  # Brief pause between tests
            except Exception as e:
                print(f"❌ Test {test.__name__} failed: {e}")
        
        # Take final screenshot
        driver.save_screenshot("leads_final_state.png")
        print("📸 Final screenshot saved: leads_final_state.png")
        
        # Print results
        print(f"\n📊 Test Results: {passed_tests}/{total_tests} tests passed")
        
        if passed_tests == total_tests:
            print("🎉 All tests passed! Leads page is working correctly.")
            return True
        else:
            print(f"⚠️ {total_tests - passed_tests} tests failed. Check the logs above.")
            return False
            
    except Exception as e:
        print(f"❌ An error occurred during test: {e}")
        driver.save_screenshot("leads_error_screenshot.png")
        print("📸 Error screenshot saved: leads_error_screenshot.png")
        return False
    finally:
        print("\n✅ Leads functionality test completed!")
        driver.quit()
        print("🔚 Browser closed")

if __name__ == "__main__":
    success = test_leads_functionality()
    sys.exit(0 if success else 1)
