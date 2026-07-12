import { useState, useEffect } from "react";
import api from "../../api/apiClient";

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const fetchContacts = async () => {
    try {
      const data = await api.get<Contact[]>("/contacts");
      setContacts(data); // Nhờ Interceptor, ta nhận thẳng data thay vì res.data
    } catch (error) {
      console.error("Lỗi khi lấy danh bạ", error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleAdd = async () => {
    try {
      const newContact = { name: "Người Mới", phone: "0123999888" };
      await api.post("/contacts", newContact);
      fetchContacts();
      alert("Thêm thành công!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteError = async () => {
    try {
      // Bẫy dữ liệu: Xóa ID không tồn tại
      await api.remove("/contacts/99999");
    } catch (error: any) {
      alert("Đã bắt được lỗi: " + error.message);
    }
  };

  return (
    <div>
      <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
        {contacts.map((c) => (
          <li key={c.id}>
            {c.name} - {c.phone}
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleAdd}>Thêm liên hệ (POST)</button>
        <button
          onClick={handleDeleteError}
          style={{ backgroundColor: "#dc3545" }}
        >
          Test Xóa ID ảo (Bắt lỗi 404)
        </button>
      </div>
    </div>
  );
}
