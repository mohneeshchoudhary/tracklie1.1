-- Setup MySQL for Tracklie CRM
-- Password: Rashmi

-- Set root password and create database
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Rashmi';
FLUSH PRIVILEGES;

-- Create the Tracklie database
CREATE DATABASE IF NOT EXISTS tracklie_crm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create dedicated user for Tracklie
CREATE USER IF NOT EXISTS 'tracklie_user'@'localhost' IDENTIFIED BY 'Rashmi';
GRANT ALL PRIVILEGES ON tracklie_crm.* TO 'tracklie_user'@'localhost';
FLUSH PRIVILEGES;

-- Show databases to confirm
SHOW DATABASES;

-- Exit
SELECT 'MySQL setup complete for Tracklie CRM!' AS message;
