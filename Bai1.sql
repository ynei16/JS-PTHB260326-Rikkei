-- 1. Tạo Database
CREATE DATABASE LibraryDB;

-- 2. Chỉ định sử dụng Database vừa tạo
USE LibraryDB;

-- 3. Tạo bảng Books với các ràng buộc theo yêu cầu
CREATE TABLE Books (
    BookID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Author VARCHAR(100),
    PublishedYear INT
);