import axios from "axios";

// Khởi tạo instance riêng cho Bài 7
const axiosInstance7 = axios.create({
  baseURL: "http://localhost:3004",
});

// Gắn Request Interceptor
axiosInstance7.interceptors.request.use(
  (config) => {
    // Giả lập đọc token từ Storage hoặc hằng số
    const DUMMY_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

    if (DUMMY_TOKEN && config.headers) {
      // Tự động chèn Bearer Token vào mọi Request
      config.headers.Authorization = `Bearer ${DUMMY_TOKEN}`;
      console.log("Đã tiêm Token vào Headers:", config.headers.Authorization);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default function RequestInterceptorDemo() {
  const sendRequest = async () => {
    try {
      await axiosInstance7.get("/contacts");
      alert(
        "Đã gửi Request. Hãy mở tab Network (F12) -> Chọn Request -> Xem phần Request Headers để chứng minh có Bearer Token.",
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p style={{ marginBottom: "10px" }}>
        Tự động chèn Access Token vào mọi lời gọi API.
      </p>
      <button onClick={sendRequest} style={{ backgroundColor: "#0d6efd" }}>
        Gửi Request lấy Danh bạ
      </button>
    </div>
  );
}
