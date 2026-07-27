-- 1. Sử dụng lệnh INSERT để thêm cùng lúc 3 dòng dữ liệu mới
INSERT INTO Books (Title, Author, PublishedYear)
VALUES 
    ('Lập trình căn bản', 'Nguyen Van A', 2019),
    ('Cơ sở dữ liệu', 'Tran Van B', 2021),
    ('Lập trình Web', 'Le Thi C', 2018);

-- 2. Sử dụng lệnh UPDATE để cập nhật lại năm xuất bản của một cuốn sách (Ví dụ: BookID = 1)
UPDATE Books
SET PublishedYear = 2022
WHERE BookID = 1;

-- 3. Sử dụng lệnh DELETE để xóa một cuốn sách khỏi bảng (Ví dụ: BookID = 3)
DELETE FROM Books
WHERE BookID = 3;

-- 4. Sử dụng lệnh SELECT để kiểm tra dữ liệu sau các thao tác
SELECT * FROM Books;