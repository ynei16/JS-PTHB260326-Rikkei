USE LibraryDB;

-- 1. Xóa dữ liệu cũ trong bảng Books 
TRUNCATE TABLE Books;

-- 2. Thêm 5 dữ liệu mẫu vào bảng Books
INSERT INTO Books (Title, Author, PublishedYear)
VALUES 
    ('Lập trình hệ thống PetHub', 'Nguyen Van A', 2022),
    ('Thiết kế Web Pet Cafe', 'Tran Thi B', 2023),
    ('Lập trình quản lý thú cưng', 'Le Van C', 2019),
    ('Cẩm nang chăm sóc chó mèo', 'Nguyen Van A', 2018),
    ('Kinh doanh Pet Shop', 'Pham Thi D', 2023);

-- Yêu cầu 1: Tìm sách xuất bản sau năm 2020 (> 2020)
SELECT * 
FROM Books 
WHERE PublishedYear > 2020;

-- Yêu cầu 2: Sách có tác giả 'Nguyen Van A' HOẶC tiêu đề bắt đầu bằng 'Lập trình'
SELECT * 
FROM Books 
WHERE Author = 'Nguyen Van A' OR Title LIKE 'Lập trình%';

-- Yêu cầu 3: Sắp xếp giảm dần theo năm, nếu trùng năm thì tăng dần theo tiêu đề, lấy 2 bản ghi đầu
SELECT * 
FROM Books 
ORDER BY PublishedYear DESC, Title ASC 
LIMIT 2;