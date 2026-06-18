# E-Wallet - Quản lý chi tiêu cá nhân

Dự án web quản lý chi tiêu cá nhân theo SRS Module 02.

## Công nghệ

- Vite
- TypeScript
- HTML/CSS thuần
- localStorage

## Chức năng

- Dashboard: số dư, tổng thu, tổng chi, thanh ngân sách
- Quản lý danh mục: thêm, sửa, xóa, đặt hạn mức
- Quản lý giao dịch: thêm, xóa, sắp xếp mới nhất lên đầu
- Lọc theo tháng/năm bằng Month Picker
- Cảnh báo khi chi tiêu vượt hạn mức danh mục
- Bảng tổng hợp chi tiêu các tháng
- Dữ liệu mẫu khởi tạo lần đầu

## Cấu trúc file

```txt
src/
├── main.ts          # Chạy ứng dụng
├── app.ts           # Điều phối toàn bộ app
├── types.ts         # Khai báo interface/type
├── storage.ts       # Đọc/ghi localStorage
├── category.ts      # Xử lý danh mục
├── transaction.ts   # Xử lý giao dịch và tính toán thu/chi
├── ui.ts            # Render giao diện
└── style.css        # Giao diện responsive
```

## Cài đặt

```bash
npm install
```

## Chạy dự án

```bash
npm run dev
```

Sau đó mở đường dẫn mà terminal hiển thị, thường là:

```txt
http://localhost:5173
```

## Cách nhập giao dịch

- Số tiền dương là thu nhập, ví dụ: `12000000`
- Số tiền âm là chi tiêu, ví dụ: `-50000`

## Ghi chú

Dữ liệu được lưu trong localStorage. Nếu muốn khôi phục dữ liệu mẫu, mở DevTools > Application > Local Storage và xóa các key bắt đầu bằng `beginner_wallet_`, sau đó tải lại trang.

## Ghi chú bản comment

Bản này đã được thêm comment chi tiết trong các file TypeScript chính:

- `src/types.ts`
- `src/main.ts`
- `src/app.ts`
- `src/storage.ts`
- `src/category.ts`
- `src/transaction.ts`
- `src/ui.ts`

Các comment dùng để học và giải thích luồng xử lý. Khi nộp bài thật, có thể giữ lại comment vì SRS có tiêu chí code dễ đọc và có comment quan trọng.
