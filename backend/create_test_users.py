"""
Script to create test users for development and testing
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from sqlalchemy.orm import Session
from core.database import SessionLocal, engine, Base
from models.user import User, UserRole
from core.auth import hash_password

# Create tables
Base.metadata.create_all(bind=engine)

def create_test_users():
    """Create test users with different roles"""
    db = SessionLocal()
    
    try:
        # Check if users already exist
        existing_users = db.query(User).count()
        if existing_users > 0:
            print(f"Found {existing_users} existing users. Skipping creation.")
            return
        
        # Test users data
        test_users = [
            {
                "email": "admin@tracklie.com",
                "password": "admin123",
                "name": "Admin User",
                "role": UserRole.ADMIN
            },
            {
                "email": "sales@tracklie.com", 
                "password": "sales123",
                "name": "Sales Person",
                "role": UserRole.SALESPERSON
            },
            {
                "email": "recovery@tracklie.com",
                "password": "recovery123", 
                "name": "Recovery Agent",
                "role": UserRole.RECOVERY_AGENT
            },
            {
                "email": "manager@tracklie.com",
                "password": "manager123",
                "name": "Team Manager", 
                "role": UserRole.MANAGER
            },
            {
                "email": "finance@tracklie.com",
                "password": "finance123",
                "name": "Finance Manager",
                "role": UserRole.FINANCE_MANAGER
            }
        ]
        
        # Create users
        for user_data in test_users:
            user = User(
                email=user_data["email"],
                password_hash=hash_password(user_data["password"]),
                name=user_data["name"],
                role=user_data["role"],
                is_active=True
            )
            db.add(user)
            print(f"Created user: {user_data['email']} ({user_data['role'].value})")
        
        db.commit()
        print(f"\n✅ Successfully created {len(test_users)} test users!")
        print("\nTest credentials:")
        for user_data in test_users:
            print(f"  {user_data['email']} / {user_data['password']} ({user_data['role'].value})")
            
    except Exception as e:
        print(f"Error creating test users: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    create_test_users()
