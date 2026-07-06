import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import toàn bộ 6 bài mới nhất (Đã đổi đường dẫn sang thư mục exercises)
import FilterDashboard from "./Bai5-FilterDashboard/FilterDashboard";
import RevenueDashboard from "./Bai6-CacheLifecycle/RevenueDashboard";
import CustomerTable from "./Bai7-LoadingUX/CustomerTable";
import OrderList from "./Bai8-OptimisticUpdates/OrderList";
import TokenManager from "./Bai9-ZustandVanilla/TokenManager";
import InventoryModule from "./Bai10-InventoryModule/InventoryModule";

// Khởi tạo bộ nhớ đệm Cache toàn cục cho TanStack Query
const queryClient = new QueryClient();

const App = () => {
  return (
    // Bọc toàn bộ ứng dụng để các Component con dùng được TanStack Query
    <QueryClientProvider client={queryClient}>
      <div
        style={{
          padding: "30px",
          fontFamily: "sans-serif",
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#8e44ad" }}>
          MÀN HÌNH TEST 6 BÀI ZUSTAND & TANSTACK QUERY
        </h2>
        <hr style={{ marginBottom: "40px", border: "2px solid #8e44ad" }} />

        {/* --- BÀI 5 --- */}
        <div style={{ marginBottom: "50px" }}>
          <h3 style={{ color: "#2980b9" }}>
            Bài 5: Đồng bộ Client State & Server State
          </h3>
          <FilterDashboard />
        </div>
        <hr />

        {/* --- BÀI 6 --- */}
        <div style={{ marginBottom: "50px", marginTop: "30px" }}>
          <h3 style={{ color: "#2980b9" }}>
            Bài 6: Quản lý Vòng đời Cache (StaleTime)
          </h3>
          <RevenueDashboard />
        </div>
        <hr />

        {/* --- BÀI 7 --- */}
        <div style={{ marginBottom: "50px", marginTop: "30px" }}>
          <h3 style={{ color: "#2980b9" }}>
            Bài 7: Phân tích UX (isLoading vs isFetching)
          </h3>
          <CustomerTable />
        </div>
        <hr />

        {/* --- BÀI 8 --- */}
        <div style={{ marginBottom: "50px", marginTop: "30px" }}>
          <h3 style={{ color: "#2980b9" }}>
            Bài 8: Trải nghiệm Thời gian thực (Optimistic Updates)
          </h3>
          <OrderList />
        </div>
        <hr />

        {/* --- BÀI 9 --- */}
        <div style={{ marginBottom: "50px", marginTop: "30px" }}>
          <h3 style={{ color: "#2980b9" }}>
            Bài 9: Kiến trúc Zustand Slices & Vanilla JS
          </h3>
          <TokenManager />
        </div>
        <hr />

        {/* --- BÀI 10 --- */}
        <div style={{ marginBottom: "50px", marginTop: "30px" }}>
          <h3 style={{ color: "#2980b9" }}>
            Bài 10: Phát triển Module Quản lý Tồn kho
          </h3>
          <InventoryModule />
        </div>
      </div>
    </QueryClientProvider>
  );
};

export default App;
