# Báo cáo Thực hành: Giao tiếp RESTful API với Axios

## [Bài 6 - Khá] Phân tích hành vi: PUT vs PATCH

**Bối cảnh:** Cập nhật 1 trường "Số điện thoại" trong tổng số 10 trường dữ liệu của User.

- **Sử dụng `axios.put` (Ghi đè toàn bộ):**
  - **Payload yêu cầu:** Phải gửi lên TOÀN BỘ 10 trường dữ liệu (bao gồm 9 trường cũ và 1 trường mới).
  - **Bẫy nghiệp vụ (Rủi ro):** Nếu Frontend chỉ gửi payload là `{ "phone": "0123" }` qua PUT, máy chủ RESTful tiêu chuẩn sẽ hiểu là "Thay thế User này bằng object mới chỉ có số điện thoại". Hậu quả: **9 trường dữ liệu còn lại bị xóa trắng (Data loss)**.
  - **Tính Idempotency:** Có (Gọi 100 lần kết quả vẫn là object đó).
- **Sử dụng `axios.patch` (Cập nhật một phần):**
  - **Payload yêu cầu:** Chỉ cần gửi `{ "phone": "0123" }`.
  - **Bản chất:** An toàn hơn, tiết kiệm băng thông. Backend sẽ giữ nguyên 9 trường kia và chỉ đè số điện thoại mới vào.

---

## [Bài 7 - Giỏi] Tự động hóa định danh (Request Interceptor)

**Logic can thiệp:**
Sử dụng `axios.interceptors.request.use`. Mã nguồn sẽ kiểm tra `localStorage`, nếu có token sẽ tự động nối chuỗi `Bearer ` và gán vào `config.headers.Authorization`. Nếu không có, bỏ qua.

---

## [Bài 8 - Giỏi] Phân tích Đa giải pháp: Global Error Handling

Bảng so sánh 2 phương pháp tiếp cận khi xử lý lỗi 401 (Hết hạn phiên):

| Tiêu chí                  | Xử lý Cục bộ (try/catch tại từng hàm gọi API)                                                     | Xử lý Toàn cục (Response Interceptor)                     |
| :------------------------ | :------------------------------------------------------------------------------------------------ | :-------------------------------------------------------- |
| **Độ lặp lại mã (DRY)**   | Rất cao. Phải viết đoạn code `if (err.status === 401) redirect()` ở hàng chục màn hình khác nhau. | Không lặp lại. Viết duy nhất 1 lần ở file cấu hình Axios. |
| **Bảo trì & Mở rộng**     | Cực kỳ khó. Nếu đổi route chuyển hướng, phải sửa ở mọi file.                                      | Rất dễ. Chỉnh sửa logic tập trung tại một trạm kiểm soát. |
| **Độ bao phủ (Coverage)** | Dễ bị sót nếu lập trình viên quên viết khối catch.                                                | Chặn đứng 100% mọi request bị lỗi trước khi đẩy về UI.    |

---

## [Bài 9 - Xuất sắc] Lưu đồ luồng dữ liệu (Sequence Diagram) - Hủy Request

**Sơ đồ luồng (Hủy chặn Race Condition):**

1. User gõ chữ "A" -> Gọi Request 1 (Chậm, tốn 2 giây).
2. Chưa kịp nhận kết quả, User gõ thêm chữ "B" (thành "AB").
3. `useEffect` chạy lại -> Hàm `cleanup` (return) của chữ "A" được kích hoạt.
4. Kích hoạt `controller.abort()`.
5. Request 1 bị hủy ngang (Trạng thái Canceled). Khối catch bắt được lỗi.
6. Hàm `axios.isCancel(error)` trả về `true` -> Dập tắt thông báo lỗi rác, không cho re-render UI cũ.
7. Gọi Request 2 (Cho "AB") -> Thành công -> Update UI chính xác.

---

## [Bài 10 - Xuất sắc] Kịch bản ngoại lệ của Module API Kháng lỗi

Module `apiClient.ts` đã được thiết kế để bao phủ các kịch bản sau:

1. **Dọn rác Query Params:** Tự động loop qua object params, xóa các key có giá trị `undefined` hoặc `null` trước khi đưa vào URL để tránh tạo ra link rác như `?search=undefined`.
2. **Che giấu Metadata Axios:** Response Interceptor tự động bóc vỏ trả về `response.data`, giúp UI component không phải gọi `res.data.data` rườm rà.
3. **Bảo vệ Timeout:** Chặn đứt các request treo quá 5000ms.
4. **Phân loại lỗi tập trung:** Bắt các mã 401 (chuyển hướng), 404 (cảnh báo tài nguyên), và 500+ (lỗi hệ thống) thống nhất toàn ứng dụng.
