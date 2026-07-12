// Import module độc lập đã đóng gói
import api from "../../api/apiClient";

export default function ResilientClientDemo() {
  const handleSafeGet = async () => {
    try {
      // Cố tình truyền param rác (undefined)
      const params = {
        _limit: 5,
        search_query: undefined,
        filter_status: null,
      };

      console.log("Params ban đầu truyền từ UI:", params);

      // Gọi qua Module Kháng lỗi
      const data = await api.get("/contacts", params);

      console.log("Dữ liệu nhận về:", data);
      alert(
        'Đã gửi GET. Mở Network (F12) để thấy URL không chứa biến "search_query=undefined". Module đã tự động dọn dẹp!',
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p style={{ marginBottom: "10px" }}>
        Sử dụng Module API độc lập có khả năng dọn rác Query Params.
      </p>
      <button onClick={handleSafeGet} style={{ backgroundColor: "#6f42c1" }}>
        Gửi GET kèm Param rác (Undefined)
      </button>
    </div>
  );
}
