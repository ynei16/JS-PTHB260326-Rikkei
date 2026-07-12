import axios from "axios";

const axiosInstance8 = axios.create({
  baseURL: "http://localhost:3004",
});

// Gắn Response Interceptor bắt lỗi toàn cục
axiosInstance8.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      // Trạm kiểm soát tập trung
      if (status === 401) {
        alert(
          "[Interceptor Catch] Lỗi 401: Phiên đăng nhập hết hạn. Đang chuyển hướng về trang Login...",
        );
      } else if (status === 404) {
        alert(
          "[Interceptor Catch] Lỗi 404: Endpoint không tồn tại trên hệ thống.",
        );
      }
    }
    return Promise.reject(error); // Vẫn trả về lỗi để UI xử lý thêm nếu cần
  },
);

export default function GlobalErrorHandling() {
  // Nút này gọi đến 1 API không có thật để ép server mock trả về 404
  const trigger404Error = async () => {
    try {
      await axiosInstance8.get("/api-khong-ton-tai");
    } catch (error) {
      console.log("Log tại UI:", error);
    }
  };

  return (
    <div>
      <p style={{ marginBottom: "10px" }}>
        So sánh xử lý lỗi 401/404 tập trung thay vì viết catch lẻ tẻ.
      </p>
      <button onClick={trigger404Error} style={{ backgroundColor: "#dc3545" }}>
        Gửi Request sinh lỗi 404
      </button>
      <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
        *Vì json-server khó giả lập lỗi 401, ta test bằng lỗi 404. Interceptor
        sẽ tự động chặn và hiển thị Alert.
      </p>
    </div>
  );
}
