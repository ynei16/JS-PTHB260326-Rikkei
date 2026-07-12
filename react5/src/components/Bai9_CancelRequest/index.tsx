import { useState, useEffect } from "react";
import axios from "axios";

export default function LiveSearch() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (!keyword.trim()) {
      setResults([]);
      return;
    }

    // 1. Khởi tạo AbortController
    const controller = new AbortController();
    setIsSearching(true);

    const searchData = async () => {
      try {
        // Truyền signal vào request
        const data = await axios.get(
          `http://localhost:3004/contacts?q=${keyword}`,
          {
            signal: controller.signal,
          },
        );
        setResults(data.data);
      } catch (error) {
        // 2. Phân biệt lỗi Hủy request và Lỗi mạng thông thường
        if (axios.isCancel(error)) {
          console.log(`Đã hủy request cũ cho từ khóa: "${keyword}"`);
        } else {
          console.error("Lỗi tìm kiếm:", error);
        }
      } finally {
        setIsSearching(false);
      }
    };

    searchData();

    // 3. Cleanup function: Khi gõ ký tự mới, component unmount/re-run sẽ gọi hàm abort()
    return () => {
      controller.abort();
    };
  }, [keyword]);

  return (
    <div>
      <input
        type="text"
        placeholder="Gõ để tìm kiếm Live..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />
      {isSearching && (
        <p style={{ color: "gray", fontSize: "14px" }}>Đang tìm...</p>
      )}

      <ul style={{ paddingLeft: "20px" }}>
        {results.map((item) => (
          <li key={item.id}>
            {item.name} ({item.phone})
          </li>
        ))}
      </ul>
      <p style={{ fontSize: "13px", color: "#666", marginTop: "10px" }}>
        *Mở tab Network trong F12, chọn Slow 3G và gõ nhanh để thấy trạng thái
        "canceled".
      </p>
    </div>
  );
}
