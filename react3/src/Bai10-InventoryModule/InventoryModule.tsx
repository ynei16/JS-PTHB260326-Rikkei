import React, { useState } from "react";
import { create } from "zustand";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// --- 1. CLIENT STATE (ZUSTAND) ---
interface InventoryItem {
  id: number;
  name: string;
  qty: number;
}
interface StoreState {
  selectedItem: InventoryItem | null;
  setSelectedItem: (item: InventoryItem | null) => void;
}
const useInventoryStore = create<StoreState>((set) => ({
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),
}));

// --- 2. SERVER STATE (API MOCK) ---
let mockDB: InventoryItem[] = [
  { id: 1, name: "Iphone 15 Pro Max", qty: 10 },
  { id: 2, name: "MacBook M3", qty: 5 },
];
const fetchInventory = async () => {
  await new Promise((res) => setTimeout(res, 500));
  return mockDB;
};
const updateQtyAPI = async ({ id, qty }: { id: number; qty: number }) => {
  await new Promise((res) => setTimeout(res, 500));
  if (qty < 0) throw new Error("Số lượng không được phép âm!");
  mockDB = mockDB.map((i) => (i.id === id ? { ...i, qty } : i));
};

// --- 3. UI COMPONENT ---
export default function InventoryModule() {
  const queryClient = useQueryClient();
  const { selectedItem, setSelectedItem } = useInventoryStore();
  const [inputQty, setInputQty] = useState<number>(0);

  const { data: inventory } = useQuery({
    queryKey: ["inventory"],
    queryFn: fetchInventory,
  });

  const mutation = useMutation({
    mutationFn: updateQtyAPI,
    onSuccess: () => {
      setSelectedItem(null); // Thành công -> Đóng Sidebar (Zustand)
      queryClient.invalidateQueries({ queryKey: ["inventory"] }); // Refresh list (TanStack)
    },
    onError: (err: Error) => alert("Lỗi: " + err.message),
  });

  return (
    <div style={{ display: "flex", gap: "30px" }}>
      {/* CỘT TRÁI: Bảng danh sách */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          border: "1px solid #bdc3c7",
          borderRadius: "8px",
        }}
      >
        <h4>Danh sách Kho</h4>
        <ul>
          {inventory?.map((item) => (
            <li key={item.id} style={{ marginBottom: "10px" }}>
              {item.name} - Tồn: <b>{item.qty}</b>
              <button
                onClick={() => {
                  setSelectedItem(item);
                  setInputQty(item.qty);
                }}
                style={{ marginLeft: "10px" }}
              >
                Chọn
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* CỘT PHẢI: Sidebar chỉnh sửa */}
      {selectedItem && (
        <div
          style={{
            flex: 1,
            padding: "20px",
            background: "#ecf0f1",
            borderRadius: "8px",
          }}
        >
          <h4>Kiểm kê: {selectedItem.name}</h4>
          <label>Nhập số lượng thực tế: </label>
          <input
            type="number"
            value={inputQty}
            onChange={(e) => setInputQty(Number(e.target.value))}
            style={{ padding: "5px", width: "100px" }}
          />
          <br />
          <br />
          <button
            onClick={() =>
              mutation.mutate({ id: selectedItem.id, qty: inputQty })
            }
            disabled={mutation.isPending}
            style={{
              padding: "8px 20px",
              background: "#2980b9",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {mutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
          <button
            onClick={() => setSelectedItem(null)}
            style={{ marginLeft: "10px", padding: "8px 20px" }}
          >
            Hủy
          </button>
        </div>
      )}
    </div>
  );
}
