import React, { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Chặn tải lại trang

    // Xử lý bẫy lỗi
    if (!username || !password) {
      setErrorMessage("Vui lòng kiểm tra lại thông tin");
      return;
    }
    if (username.includes(" ")) {
      setErrorMessage("Vui lòng kiểm tra lại thông tin");
      return;
    }

    // Nếu hợp lệ
    setErrorMessage("");
    console.log("Đăng nhập thành công:", { username, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", width: "300px" }}
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/* Hiển thị lỗi màu đỏ nếu có */}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
