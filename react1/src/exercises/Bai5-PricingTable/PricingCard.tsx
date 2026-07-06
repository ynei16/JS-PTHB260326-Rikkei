import React from "react";

interface PricingCardProps {
  name: string;
  price: number;
  color: string;
}
// Component Con: Nhận Props và render giao diện
const PricingCard = ({ name, price, color }: PricingCardProps) => {
  // Xử lý bẫy dữ liệu ngay trong JSX hoặc gán biến
  const displayPrice =
    price === 0 || price === null ? "Liên hệ" : `${price.toLocaleString()} VND`;

  return (
    <div
      style={{
        border: `2px solid ${color}`,
        padding: "20px",
        margin: "10px",
        width: "200px",
      }}
    >
      <h3>{name}</h3>
      <p style={{ fontSize: "20px", fontWeight: "bold" }}>{displayPrice}</p>
      <button>Chọn gói này</button>
    </div>
  );
};

// Component Cha: Tái sử dụng PricingCard 3 lần
export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <PricingCard name="Basic" price={500000} color="gray" />
      <PricingCard name="Pro" price={1500000} color="blue" />
      <PricingCard name="Enterprise" price={0} color="red" />
    </div>
  );
}
