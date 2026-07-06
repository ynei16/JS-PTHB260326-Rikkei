import React from "react";
import { useQuery } from "@tanstack/react-query";

// Mock API: Trả về số tiền ngẫu nhiên mỗi lần gọi
const fetchRevenue = async (): Promise<number> => {
  await new Promise((res) => setTimeout(res, 1000));
  return Math.floor(Math.random() * 100000000) + 50000000;
};

export default function RevenueDashboard() {
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: ["revenue"],
    queryFn: fetchRevenue,
    staleTime: 1000 * 60 * 5, // Dữ liệu 'Fresh' trong 5 phút
  });

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #bdc3c7",
        borderRadius: "8px",
      }}
    >
      <button
        onClick={() => refetch()}
        disabled={isFetching}
        style={{
          padding: "8px 15px",
          background: "#e67e22",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {isFetching ? "⏳ Đang ép tải lại..." : "🔄 Làm mới dữ liệu ngay"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {isLoading ? (
          <h2>Đang tính toán doanh thu...</h2>
        ) : (
          <h2 style={{ color: "#27ae60" }}>
            Doanh thu: {data?.toLocaleString()} VND
          </h2>
        )}
      </div>
      <p style={{ fontSize: "12px", color: "gray" }}>
        * Chuyển tab đi chỗ khác và quay lại trong 5 phút sẽ không bị tải lại
        (Nhờ Cache).
      </p>
    </div>
  );
}
