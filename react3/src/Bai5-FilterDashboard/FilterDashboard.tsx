import React from "react";
import { create } from "zustand";
import { useQuery } from "@tanstack/react-query";

// --- TẦNG CLIENT STATE (ZUSTAND) ---
interface FilterState {
  status: string;
  setStatus: (status: string) => void;
}
const useFilterStore = create<FilterState>((set) => ({
  status: "",
  setStatus: (status) => set({ status: status.trim() }),
}));

// --- TẦNG SERVER STATE (API MOCK) ---
interface Order {
  id: number;
  name: string;
  status: string;
}
const fetchOrders = async (status: string): Promise<Order[]> => {
  await new Promise((res) => setTimeout(res, 800)); // Giả lập độ trễ
  const data = [
    { id: 1, name: "Đơn hàng Laptop", status: "Pending" },
    { id: 2, name: "Đơn hàng Bàn phím", status: "Shipped" },
    { id: 3, name: "Đơn hàng Chuột", status: "Delivered" },
  ];
  return data.filter((o) =>
    o.status.toLowerCase().includes(status.toLowerCase()),
  );
};

// --- COMPONENT CHÍNH ---
export default function FilterDashboard() {
  const { status, setStatus } = useFilterStore();
  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", status], // Tự động gọi lại API khi status đổi
    queryFn: () => fetchOrders(status),
  });

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #bdc3c7",
        borderRadius: "8px",
      }}
    >
      <input
        type="text"
        placeholder="Lọc trạng thái (Pending, Shipped...)"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: "8px", width: "300px", marginBottom: "15px" }}
      />

      {isLoading ? (
        <p>⏳ Đang tải dữ liệu...</p>
      ) : (
        <ul>
          {orders?.map((o) => (
            <li key={o.id}>
              {o.name} - <b>{o.status}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
