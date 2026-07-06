import React, { useState } from "react";
interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}
const faqData = [
  { id: 1, question: "React là gì?", answer: "Là thư viện UI của Facebook." },
  { id: 2, question: "State là gì?", answer: "Dữ liệu nội bộ của component." },
  {
    id: 3,
    question: "Props là gì?",
    answer: "Dữ liệu truyền từ cha xuống con.",
  },
];

// Component Con: Chỉ nhận lệnh từ Cha, không tự có State
const FaqItem = ({ question, answer, isOpen, onClick }: FaqItemProps) => {
  return (
    <div style={{ border: "1px solid #ccc", margin: "5px 0" }}>
      <div
        onClick={onClick}
        style={{
          padding: "10px",
          background: "#eee",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        {question} {isOpen ? "▲" : "▼"}
      </div>
      {isOpen && <div style={{ padding: "10px" }}>{answer}</div>}
    </div>
  );
};

// Component Cha: Nắm quyền sinh sát (Quản lý State toàn cục của cụm)
export default function FaqList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    // Nếu click vào chính câu đang mở -> đóng lại. Nếu không -> mở câu mới.
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <h2>Câu hỏi thường gặp</h2>
      {faqData.map((item, index) => (
        <FaqItem
          key={item.id}
          question={item.question}
          answer={item.answer}
          isOpen={activeIndex === index}
          onClick={() => handleItemClick(index)}
        />
      ))}
    </div>
  );
}
