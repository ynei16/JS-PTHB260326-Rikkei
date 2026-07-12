import ContactsManager from "./components/Bai5_CRUD";
import LiveSearch from "./components/Bai9_CancelRequest";
import PutVsPatch from "./components/Bai6_PutVsPatch";
import RequestInterceptorDemo from "./components/Bai7_RequestInterceptor";
import GlobalErrorHandling from "./components/Bai8_GlobalError";
import ResilientClientDemo from "./components/Bai10_ResilientClient";

export default function App() {
  const sectionStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "30px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  };

  const titleStyle = {
    color: "#0056b3",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
    marginBottom: "15px",
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <header style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2>Thực Hành Giao Tiếp RESTful API với Axios (Bài 5 - 10)</h2>
      </header>

      {/* Đã bổ sung Bài 5 */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>
          [Bài 5] Tích hợp Mock Server và thao tác CRUD
        </h3>
        <ContactsManager />
      </section>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>[Bài 6] Phân tích hành vi: PUT vs PATCH</h3>
        <PutVsPatch />
      </section>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>
          [Bài 7] Tự động hóa định danh với Request Interceptor
        </h3>
        <RequestInterceptorDemo />
      </section>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>
          [Bài 8] Phân tích Đa giải pháp: Global Error Handling
        </h3>
        <GlobalErrorHandling />
      </section>

      {/* Đã bổ sung Bài 9 */}
      <section style={sectionStyle}>
        <h3 style={titleStyle}>
          [Bài 9] Tối ưu hiệu suất với Kỹ thuật Hủy Request (Cancellation)
        </h3>
        <LiveSearch />
      </section>

      <section style={sectionStyle}>
        <h3 style={titleStyle}>
          [Bài 10] Mini Module: Bộ giao tiếp API Kháng lỗi
        </h3>
        <ResilientClientDemo />
      </section>
    </div>
  );
}
