#!/usr/bin/env python3
"""
Basic page test
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time

def test_basic_page():
    """Basic page test"""
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        print("🚀 Basic page test...")
        
        driver.get("http://localhost:3000")
        print("✅ Page loaded")
        
        # Wait a bit
        time.sleep(3)
        
        # Check page title
        title = driver.title
        print(f"✅ Page title: {title}")
        
        # Check if body exists
        body = driver.find_element(By.TAG_NAME, "body")
        print("✅ Body element found")
        
        # Check for any status controls
        status_controls = driver.find_elements(By.CSS_SELECTOR, ".status-control")
        print(f"✅ Found {len(status_controls)} status controls")
        
        # Check for leads table
        leads_table = driver.find_elements(By.CSS_SELECTOR, ".leads-table")
        print(f"✅ Found {len(leads_table)} leads tables")
        
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        return False
        
    finally:
        driver.quit()

if __name__ == "__main__":
    test_basic_page()
