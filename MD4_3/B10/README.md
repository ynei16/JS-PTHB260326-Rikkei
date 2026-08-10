# Tài liệu API - Hệ thống Blog

## 1. Danh sách Endpoints

| Endpoint | Method | Middleware áp dụng | Mô tả |
|----------|--------|---------------------|-------|
| `/api/posts` | GET | Không | Lấy danh sách toàn bộ bài viết |
| `/api/posts` | POST | Không | Tạo bài viết mới |
| `/api/posts/:id` | DELETE | `authenticate`, `authorize('admin')` | Xóa bài viết (cascade xóa cả comment) |
| `/api/posts/:id/thumbnail` | POST | `multer (upload.single)` | Upload ảnh thumbnail cho bài viết |
| `/api/comments` | POST | `authenticate` | Đăng bình luận cho một bài viết (cần truyền `postId`) |

## 2. Kịch bản test (Testing Scenarios)

1. **Test không có quyền (Thiếu header `Authorization`):**
   - **Gửi request:** `POST /api/comments`
   - **Mong đợi:** Status Code `401`. Response: `{ "success": false, "message": "Chưa đăng nhập" }`

2. **Test quyền User xóa bài viết (Cố tình vi phạm quyền hạn):**
   - **Header:** `Authorization: user`
   - **Gửi request:** `DELETE /api/posts/1`
   - **Mong đợi:** Status Code `403`. Response: `{ "success": false, "message": "Không đủ quyền truy cập" }`

3. **Test quyền Admin xóa bài viết thành công (Cascade Delete):**
   - Tạo Post 1 thành công.
   - User tạo Comment thuộc Post 1 thành công.
   - **Header:** `Authorization: admin`
   - **Gửi request:** `DELETE /api/posts/1`
   - **Mong đợi:** Status Code `200`. Bài viết ID 1 và tất cả Comment có `postId = 1` sẽ bị xóa khỏi in-memory array.

4. **Test bình luận vào bài viết không tồn tại:**
   - **Header:** `Authorization: user`
   - **Gửi request:** `POST /api/comments` với body `{ "postId": 999, "content": "Hay quá" }`
   - **Mong đợi:** Status Code `404`. Response `{ "success": false, "message": "Bài viết không tồn tại để bình luận" }`

5. **Test upload file không phải là ảnh cho thumbnail:**
   - **Gửi request:** `POST /api/posts/1/thumbnail` đính kèm file `.pdf`
   - **Mong đợi:** Status Code `400`. Response `{ "success": false, "message": "Chỉ chấp nhận file ảnh" }`