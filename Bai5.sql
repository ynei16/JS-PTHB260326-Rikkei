-- 1. Tạo bảng Customers
CREATE TABLE Customers (
    CustomerID INT AUTO_INCREMENT PRIMARY KEY,
    FullName VARCHAR(255) NOT NULL,
    Email VARCHAR(255)
);

-- 2. Tạo bảng Orders có khóa ngoại liên kết tới Customers
CREATE TABLE Orders (
    OrderID INT AUTO_INCREMENT PRIMARY KEY,
    OrderDate DATETIME,
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customers(CustomerID)
);

-- 3. Thêm 2 khách hàng vào bảng Customers
INSERT INTO Customers (FullName, Email)
VALUES 
    ('Nguyen Van A', 'nguyenvana@gmail.com'),
    ('Tran Thi B', 'tranthib@gmail.com');

-- Thêm 3 đơn hàng vào bảng Orders (2 đơn cùng mã KH số 1)
INSERT INTO Orders (OrderDate, CustomerID)
VALUES 
    ('2023-10-01 08:30:00', 1),
    ('2023-10-02 14:15:00', 1),
    ('2023-10-03 10:00:00', 2);

-- 4. Truy vấn hiển thị danh sách đơn hàng (Mã đơn, Ngày đặt, Tên khách hàng)
SELECT 
    Orders.OrderID, 
    Orders.OrderDate, 
    Customers.FullName
FROM Orders
INNER JOIN Customers ON Orders.CustomerID = Customers.CustomerID;