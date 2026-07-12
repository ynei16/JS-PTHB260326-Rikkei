import axios from "axios";

export default function PutVsPatch() {
  const userId = "1"; // Giả sử thao tác với user có ID = 1 trong db.json

  // Hàm 1: Sử dụng PUT (Ghi đè)
  const handlePut = async () => {
    try {
      // Sai lầm khi dùng PUT: Chỉ gửi mỗi số điện thoại
      // Hậu quả: Mất hết các trường khác (như name) trên server tiêu chuẩn
      const payload = { phone: "0999888777_PUT" };
      const res = await axios.put(
        `http://localhost:3004/contacts/${userId}`,
        payload,
      );
      console.log("Kết quả PUT:", res.data);
      alert('Đã gửi PUT. Hãy check db.json, có thể trường "name" đã bị mất!');
    } catch (error) {
      console.error(error);
    }
  };

  // Hàm 2: Sử dụng PATCH (Cập nhật 1 phần)
  const handlePatch = async () => {
    try {
      // Chuẩn xác: PATCH chỉ đè trường được gửi lên, giữ nguyên các trường khác
      const payload = { phone: "0999888777_PATCH" };
      const res = await axios.patch(
        `http://localhost:3004/contacts/${userId}`,
        payload,
      );
      console.log("Kết quả PATCH:", res.data);
      alert(
        'Đã gửi PATCH. Kiểm tra db.json, trường "name" vẫn được giữ nguyên an toàn.',
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <p style={{ marginBottom: "10px" }}>
        Kiểm tra hành vi ghi đè dữ liệu của 2 phương thức.
      </p>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handlePut} style={{ backgroundColor: "#fd7e14" }}>
          Cập nhật bằng PUT
        </button>
        <button onClick={handlePatch} style={{ backgroundColor: "#20c997" }}>
          Cập nhật bằng PATCH
        </button>
      </div>
    </div>
  );
}
