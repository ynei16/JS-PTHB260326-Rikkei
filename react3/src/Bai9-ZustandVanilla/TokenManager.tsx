import React from "react";
import { create } from "zustand";

// --- TẠO STORE GỒM 2 SLICES ---
interface AuthSlice {
  token: string | null;
  setToken: (t: string | null) => void;
}
interface UiSlice {
  isToastOpen: boolean;
  toggleToast: () => void;
}

const createAuthSlice = (set: any, get: any, api: any): AuthSlice => ({
  token: null,
  setToken: (token) => set({ token }),
});

const createUiSlice = (set: any, get: any, api: any): UiSlice => ({
  isToastOpen: false,
  toggleToast: () =>
    set((state: UiSlice) => ({ isToastOpen: !state.isToastOpen })),
});

export const useBoundStore = create<AuthSlice & UiSlice>()((...a) => ({
  ...createAuthSlice(...a),
  ...createUiSlice(...a),
}));

const mockAxiosInterceptor = () => {
  // Lấy state trực tiếp không cần dùng Hook
  const token = useBoundStore.getState().token;
  if (token) alert(`[Axios] Đã đính kèm Token vào Header: ${token}`);
  else alert(`[Axios] Không có Token, gửi Request rỗng.`);
};

// --- COMPONENT KIỂM THỬ ---
export default function TokenManager() {
  const { token, setToken } = useBoundStore();

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #bdc3c7",
        borderRadius: "8px",
      }}
    >
      <p>
        Trạng thái Token trong Zustand:{" "}
        <b>{token ? "Đã đăng nhập" : "Chưa đăng nhập"}</b>
      </p>

      <button
        onClick={() => setToken("JWT_123456")}
        style={{ marginRight: "10px" }}
      >
        Giả lập Đăng nhập
      </button>
      <button onClick={() => setToken(null)} style={{ marginRight: "10px" }}>
        Đăng xuất
      </button>
      <br />
      <br />
      <button
        onClick={mockAxiosInterceptor}
        style={{ background: "#8e44ad", color: "white", padding: "8px" }}
      >
        Gọi API bằng Axios (Kích hoạt Interceptor)
      </button>
    </div>
  );
}
