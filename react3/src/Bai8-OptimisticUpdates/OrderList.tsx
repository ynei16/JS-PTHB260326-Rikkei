import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface OrderItem {
  id: number;
  title: string;
  status: string;
}

// --- MOCK API ---
let mockOrders: OrderItem[] = [
  { id: 1, title: "Đơn vi phạm #001", status: "Chưa xử lý" },
];

const fetchOrders = async () => mockOrders;
const processOrderAPI = async (id: number) => {
  await new Promise((res) => setTimeout(res, 2000)); // Server chậm 2 giây
  // Bẫy lỗi: Giả lập 30% tỷ lệ API sẽ bị lỗi để test Rollback
  if (Math.random() < 0.3) throw new Error("Server mất kết nối!");
  mockOrders = mockOrders.map((o) =>
    o.id === id ? { ...o, status: "Đã xử lý" } : o,
  );
  return "OK";
};

export default function OrderList() {
  const queryClient = useQueryClient();
  const { data: orders } = useQuery({
    queryKey: ["bad-orders"],
    queryFn: fetchOrders,
  });

  const mutation = useMutation({
    mutationFn: processOrderAPI,

    // 1. OPTIMISTIC UPDATE: Đổi UI ngay lập tức
    onMutate: async (orderId) => {
      await queryClient.cancelQueries({ queryKey: ["bad-orders"] });
      const prevData = queryClient.getQueryData(["bad-orders"]);

      queryClient.setQueryData(["bad-orders"], (old: any) =>
        old.map((o: OrderItem) =>
          o.id === orderId ? { ...o, status: "Đã xử lý" } : o,
        ),
      );
      return { prevData }; // Lưu lại bản backup
    },
    // 2. NẾU LỖI: Rollback lại như cũ
    onError: (err, variables, context) => {
      alert("Lỗi: " + err.message + " -> Hoàn tác UI!");
      queryClient.setQueryData(["bad-orders"], context?.prevData);
    },
    // 3. CUỐI CÙNG: Đồng bộ lại cho chắc
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bad-orders"] });
    },
  });

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #bdc3c7",
        borderRadius: "8px",
      }}
    >
      {orders?.map((order) => (
        <div
          key={order.id}
          style={{ display: "flex", gap: "20px", alignItems: "center" }}
        >
          <h4
            style={{
              color: order.status === "Đã xử lý" ? "#27ae60" : "#c0392b",
            }}
          >
            {order.title} - {order.status}
          </h4>
          <button
            onClick={() => mutation.mutate(order.id)}
            disabled={order.status === "Đã xử lý"}
            style={{ padding: "5px 10px" }}
          >
            Đánh dấu Xử lý (Click để xem UI đổi lập tức)
          </button>
        </div>
      ))}
    </div>
  );
}
