// Import file CSS để Vite nạp giao diện cho trang web.
import "./style.css";

// Import lớp FinanceManager từ file app.ts để khởi động ứng dụng.
import { FinanceManager } from "./app";

// Tạo một đối tượng FinanceManager mới; constructor sẽ tự load dữ liệu và render giao diện.
new FinanceManager();
