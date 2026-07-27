-- 1. Bổ sung thêm cột Price (kiểu DECIMAL) vào bảng Books
ALTER TABLE Books 
ADD COLUMN Price DECIMAL(10, 2);

-- 2. Nâng cấp chiều dài dữ liệu của cột Author từ VARCHAR(100) lên VARCHAR(255)
ALTER TABLE Books 
MODIFY COLUMN Author VARCHAR(255);

-- 3. Làm sạch toàn bộ dữ liệu, đưa bộ đếm tự tăng về ban đầu nhưng giữ lại khung cấu trúc
TRUNCATE TABLE Books;