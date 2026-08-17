# Kết quả thực hành Bài 5

### 1. Bảng đo lường

| Endpoint | Chế độ Loading | Query Count | Duration (Thời gian xử lý) |
| :--- | :--- | :--- | :--- |
| `/api/v1/report/slow` | Vòng lặp (Lazy) | 51 | 44 ms |
| `/api/v1/report/fast` | Include (Eager) | 1 | 23 ms |


### 2. Giải thích về vấn đề bộ nhớ và separate: true
- Tại sao endpoint nhanh (include) vẫn có thể tốn bộ nhớ? Khi dùng `include` (Sequelize tự dùng JOIN), DB trả về một bảng khổng lồ có rất nhiều dữ liệu trùng lặp (vd: thông tin Category bị lặp lại 10 lần cho 10 Product). Việc Node.js phải dùng CPU và RAM để bóc tách (parse) cái bảng khổng lồ này thành Object lồng nhau sẽ rất tốn kém tài nguyên nếu dữ liệu quá lớn.
- Khi nào nên dùng `separate: true`? Khi quan hệ là 1-N hoặc N-N và bảng chính chứa lượng dữ liệu cực lớn (nhiều text dài). `separate: true` sẽ tách truy vấn ra làm 2 câu lệnh chạy độc lập (1 câu lấy Category, 1 câu lấy Product có IN list Category IDs), giúp giảm thiểu dữ liệu trùng lặp truyền qua mạng và tối ưu RAM cho server Node.js.