import React from "react";
import { useQuery } from "@tanstack/react-query";

interface Customer {
  id: number;
  name: string;
  type: string;
}
const fetchCustomers = async (): Promise<Customer[]> => {
  await new Promise((res) => setTimeout(res, 1500));
  return [
    { id: 1, name: "Nguyễn Văn A", type: "VIP" },
    { id: 2, name: "Trần Thị B", type: "Thường" },
  ];
};

export default function CustomerTable() {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["customers"],
    queryFn: fetchCustomers,
    refetchInterval: 10000, // Tự động refetch mỗi 10 giây để test
  });

  // 1. HARD LOADING: Chỉ chạy 1 lần duy nhất lúc trang vừa bật
  if (isLoading) {
    return (
      <div style={{ padding: "20px", background: "#ecf0f1", height: "100px" }}>
        <h3 style={{ color: "#7f8c8d" }}>
          ⬛ Đang tải khung giao diện bảng... (Skeleton)
        </h3>
      </div>
    );
  }

  // 2. SOFT LOADING: Hiển thị mỗi khi refetch ngầm (Không làm mất bảng)
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #bdc3c7",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      {isFetching && (
        <span
          style={{
            position: "absolute",
            top: 5,
            right: 10,
            color: "#2980b9",
            fontWeight: "bold",
          }}
        >
          🔄 Đang cập nhật ngầm...
        </span>
      )}

      <table
        border={1}
        cellPadding={10}
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "15px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>TÊN KHÁCH HÀNG</th>
            <th>LOẠI</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
