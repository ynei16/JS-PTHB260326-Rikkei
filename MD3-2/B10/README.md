## Phân tích so sánh CommonJS và ES Module

**1. Khác biệt cấu hình package.json:**
- **ESM:** Bắt buộc phải thêm `"type": "module"` vào package.json để Node.js hiểu cú pháp import/export.
- **CJS:** Không cần khai báo (Node.js mặc định hiểu là CommonJS) hoặc có thể khai báo tường minh `"type": "commonjs"`.

**2. Lỗi/Khó khăn khi viết ESM so với CJS:**
- **Lỗi 1 - Thiếu đuôi file cục bộ:** Khi dùng CJS, ta chỉ cần `require('./config')`. Với ESM, import file nội bộ bắt buộc phải có phần mở rộng: `import config from './config.js'`. Nếu quên, app sẽ báo lỗi ngay lúc boot. Cách khắc phục: Luôn thêm `.js` vào đường dẫn import.
- **Lỗi 2 - Mất biến toàn cục:** ESM không có sẵn `__dirname` và `__filename` như CJS. Nếu muốn thao tác đường dẫn file, phải import từ các module có sẵn:
  ```javascript
  import { fileURLToPath } from 'url';
  import { dirname } from 'path';
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  
  
**3. So sánh trải nghiệm debug:**
**ESM**: Giai đoạn "Parse" code được thực hiện độc lập và chặt chẽ hơn. Nếu viết sai tên đường dẫn hoặc sai module export, Node.js từ chối chạy ngay từ lúc khởi động app (báo lỗi ERR_MODULE_NOT_FOUND).
**CJS**: Đôi khi việc require() được thực hiện linh động khi code đang chạy (runtime). Chương trình có thể đã chạy được một nửa mới văng lỗi nếu dòng require bị lỗi, việc này gây rủi ro cao hơn trên môi trường production.
**4. Kết luận & Khuyến nghị:**
Khuyến nghị sử dụng chuẩn ES Module (ESM) cho dự án Backend thực tế.
**Lý do 1:** Tạo sự đồng nhất về cú pháp mã nguồn import/export cho lập trình viên khi code cả Backend lẫn Frontend (React/Vue/Angular đều đang dùng ESM).
**Lý do 2** ESM là tiêu chuẩn ECMAScript quốc tế. Rất nhiều thư viện hiện đại trên NPM đã chuyển sang "ESM Only". Sử dụng ESM giúp dễ dàng tích hợp và duy trì dự án về lâu dài mà không cần các công cụ biên dịch phức tạp.