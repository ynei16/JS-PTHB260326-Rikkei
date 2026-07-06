import React from "react";

// 1. Import toàn bộ 6 component của 6 bài tập
import PricingCard from "./exercises/Bai5-PricingTable/PricingCard";
import LoginForm from "./exercises/Bai6-ControlledForm/LoginForm";
import WelcomeBanner from "./exercises/Bai7-ConditionalRendering/WelcomeBanner";
import ScoreBoard from "./exercises/Bai8-Lifecycle/ScoreBoard"; // Đảm bảo bạn đã export default Component của Bài 8
import Pomodoro from "./exercises/Bai9-Pomodoro/Pomodoro";
import FaqList from "./exercises/Bai10-LiftingStateUp/FaqList";

const App = () => {
  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "sans-serif",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>
        🚀 MÀN HÌNH TEST 6 BÀI TẬP REACT ĐỒNG THỜI
      </h2>
      <hr style={{ marginBottom: "40px", border: "2px solid #2c3e50" }} />

      {/* --- BÀI 5 --- */}
      <div style={{ marginBottom: "50px" }}>
        <h3 style={{ color: "#e74c3c" }}>Bài 5: Pricing Table</h3>
        <PricingCard />
      </div>
      <hr />

      {/* --- BÀI 6 --- */}
      <div style={{ marginBottom: "50px", marginTop: "30px" }}>
        <h3 style={{ color: "#e74c3c" }}>Bài 6: Form Đăng Nhập</h3>
        <LoginForm />
      </div>
      <hr />

      {/* --- BÀI 7 --- */}
      <div style={{ marginBottom: "50px", marginTop: "30px" }}>
        <h3 style={{ color: "#e74c3c" }}>Bài 7: Welcome Banner</h3>
        <WelcomeBanner />
      </div>
      <hr />

      {/* --- BÀI 8 --- */}
      <div style={{ marginBottom: "50px", marginTop: "30px" }}>
        <h3 style={{ color: "#e74c3c" }}>Bài 8: Lifecycle ScoreBoard</h3>
        <ScoreBoard />
      </div>
      <hr />

      {/* --- BÀI 9 --- */}
      <div style={{ marginBottom: "50px", marginTop: "30px" }}>
        <h3 style={{ color: "#e74c3c" }}>Bài 9: Pomodoro Timer</h3>
        <Pomodoro />
      </div>
      <hr />

      {/* --- BÀI 10 --- */}
      <div style={{ marginBottom: "50px", marginTop: "30px" }}>
        <h3 style={{ color: "#e74c3c" }}>Bài 10: FAQ Accordion</h3>
        <FaqList />
      </div>
    </div>
  );
};

export default App;
