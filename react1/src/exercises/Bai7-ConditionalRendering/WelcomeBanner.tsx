import React, { useState } from "react";

export default function WelcomeBanner() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {/* Render có điều kiện dùng toán tử ba ngôi */}
      <h2>{isLoggedIn ? "Chào mừng trở lại" : "Khách chưa đăng nhập"}</h2>

      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Đăng xuất" : "Đăng nhập ngay"}
      </button>
    </div>
  );
}
