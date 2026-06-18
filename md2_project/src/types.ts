// File types.ts dùng để khai báo toàn bộ kiểu dữ liệu dùng chung trong dự án.
// Khi tách module, các interface/type cần export để file khác import được.

// Category là kiểu dữ liệu đại diện cho một danh mục chi tiêu.
export interface Category {
  // id là mã số riêng của danh mục, dùng để phân biệt các danh mục với nhau.
  id: number;

  // title là tên danh mục hiển thị trên giao diện, ví dụ: Ăn uống, Đi chơi.
  title: string;

  // limitMoney là hạn mức chi tiêu của danh mục; nếu bằng 0 nghĩa là không giới hạn.
  limitMoney: number;
}

// Trade là kiểu dữ liệu đại diện cho một giao dịch thu hoặc chi.
export interface Trade {
  // id là mã số riêng của giao dịch, dùng khi xóa hoặc quản lý giao dịch.
  id: number;

  // categoryId là id của danh mục mà giao dịch này thuộc về.
  categoryId: number;

  // valueMoney là số tiền giao dịch: số dương là thu, số âm là chi.
  valueMoney: number;

  // createAt là ngày giao dịch, lưu dạng yyyy-mm-dd để dễ lưu vào localStorage.
  createAt: string;

  // note là ghi chú giao dịch, ví dụ: Ăn sáng, Lương tháng này.
  note: string;
}

// FinanceManagerData là tên gọi ngắn cho mảng giao dịch.
export type FinanceManagerData = Trade[];

// CategoryData là tên gọi ngắn cho mảng danh mục.
export type CategoryData = Category[];

// DashboardData là dữ liệu đã tính toán để hiển thị lên phần Dashboard.
export interface DashboardData {
  // balance là số dư hiện tại của tháng đang chọn.
  balance: number;

  // totalIncome là tổng thu trong tháng đang chọn.
  totalIncome: number;

  // totalExpense là tổng chi trong tháng đang chọn.
  totalExpense: number;

  // totalBudget là tổng hạn mức của tất cả danh mục.
  totalBudget: number;

  // budgetPercent là phần trăm ngân sách đã dùng.
  budgetPercent: number;

  // isOverBudget cho biết tổng chi đã vượt tổng ngân sách hay chưa.
  isOverBudget: boolean;
}

// SummaryRow là một dòng dữ liệu trong bảng tổng hợp chi tiêu theo tháng.
export interface SummaryRow {
  // monthKey là tháng đang thống kê, dạng yyyy-mm.
  monthKey: string;

  // totalExpense là tổng chi của tháng đó.
  totalExpense: number;

  // tradeCount là số lượng giao dịch trong tháng đó.
  tradeCount: number;
}
