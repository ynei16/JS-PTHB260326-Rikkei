// Import DashboardData và Trade để các hàm giao dịch có kiểu dữ liệu rõ ràng.
import type { DashboardData, Trade } from "./types";

// TransactionManager là lớp chuyên xử lý giao dịch và tính toán thu/chi.
export class TransactionManager {
  // Hàm createTrade tạo một giao dịch mới từ dữ liệu người dùng nhập.
  public static createTrade(
    // trades là danh sách giao dịch hiện tại của tháng đang lưu.
    trades: Trade[],

    // categoryId là id danh mục được chọn trong select.
    categoryId: number,

    // valueMoney là số tiền: dương là thu, âm là chi.
    valueMoney: number,

    // createAt là ngày giao dịch dạng yyyy-mm-dd.
    createAt: string,

    // note là ghi chú giao dịch.
    note: string,
  ): Trade {
    // Trả về object Trade mới.
    return {
      // id được tạo tự động bằng getNextId.
      id: TransactionManager.getNextId(trades),

      // Lưu id danh mục của giao dịch.
      categoryId,

      // Lưu số tiền giao dịch.
      valueMoney,

      // Lưu ngày giao dịch.
      createAt,

      // Lưu ghi chú giao dịch.
      note,
    };
  }

  // Hàm deleteTrade xóa một giao dịch theo id.
  public static deleteTrade(trades: Trade[], tradeId: number): Trade[] {
    // filter giữ lại các giao dịch có id khác tradeId.
    return trades.filter((trade) => trade.id !== tradeId);
  }

  // Hàm sortTradesByDateDesc sắp xếp giao dịch theo ngày giảm dần.
  public static sortTradesByDateDesc(trades: Trade[]): Trade[] {
    // [...trades] tạo bản sao để không làm thay đổi mảng gốc.
    return [...trades].sort((a, b) => {
      // Chuyển ngày của giao dịch a thành số mili-giây.
      const timeA = new Date(a.createAt).getTime();

      // Chuyển ngày của giao dịch b thành số mili-giây.
      const timeB = new Date(b.createAt).getTime();

      // timeB - timeA giúp giao dịch mới hơn nằm trước.
      return timeB - timeA;
    });
  }

  // Hàm getCategorySpent tính tổng tiền đã chi trong một danh mục.
  public static getCategorySpent(trades: Trade[], categoryId: number): number {
    // result dùng để cộng dồn tiền chi.
    let result = 0;

    // Duyệt qua từng giao dịch.
    for (let i = 0; i < trades.length; i++) {
      // Lấy giao dịch hiện tại.
      const trade = trades[i];

      // Chỉ tính giao dịch thuộc danh mục cần tìm và có số tiền âm.
      if (trade.categoryId === categoryId && trade.valueMoney < 0) {
        // Math.abs đổi số âm thành số dương để hiển thị tiền đã chi.
        result += Math.abs(trade.valueMoney);
      }
    }

    // Trả về tổng chi của danh mục.
    return result;
  }

  // Hàm getTotalIncome tính tổng thu của tháng đang chọn.
  public static getTotalIncome(trades: Trade[]): number {
    // result dùng để cộng dồn tổng thu.
    let result = 0;

    // Duyệt qua từng giao dịch.
    for (let i = 0; i < trades.length; i++) {
      // Giao dịch có valueMoney > 0 là khoản thu.
      if (trades[i].valueMoney > 0) {
        // Cộng khoản thu vào result.
        result += trades[i].valueMoney;
      }
    }

    // Trả về tổng thu.
    return result;
  }

  // Hàm getTotalExpense tính tổng chi của tháng đang chọn.
  public static getTotalExpense(trades: Trade[]): number {
    // result dùng để cộng dồn tổng chi.
    let result = 0;

    // Duyệt qua từng giao dịch.
    for (let i = 0; i < trades.length; i++) {
      // Giao dịch có valueMoney < 0 là khoản chi.
      if (trades[i].valueMoney < 0) {
        // Cộng giá trị tuyệt đối của khoản chi vào result.
        result += Math.abs(trades[i].valueMoney);
      }
    }

    // Trả về tổng chi.
    return result;
  }

  // Hàm getBalance tính số dư hiện tại của tháng đang chọn.
  public static getBalance(trades: Trade[]): number {
    // result dùng để cộng dồn số dư.
    let result = 0;

    // Duyệt qua từng giao dịch.
    for (let i = 0; i < trades.length; i++) {
      // Thu là số dương, chi là số âm nên cộng trực tiếp sẽ ra số dư.
      result += trades[i].valueMoney;
    }

    // Trả về số dư.
    return result;
  }

  // Hàm getDashboardData gom các số liệu cần hiện trên Dashboard.
  public static getDashboardData(trades: Trade[], totalBudget: number): DashboardData {
    // Tính tổng thu bằng hàm getTotalIncome.
    const totalIncome = TransactionManager.getTotalIncome(trades);

    // Tính tổng chi bằng hàm getTotalExpense.
    const totalExpense = TransactionManager.getTotalExpense(trades);

    // Tính số dư bằng hàm getBalance.
    const balance = TransactionManager.getBalance(trades);

    // Tính phần trăm ngân sách đã dùng; nếu totalBudget = 0 thì phần trăm bằng 0 để tránh chia cho 0.
    const budgetPercent = totalBudget > 0 ? (totalExpense / totalBudget) * 100 : 0;

    // Trả về object DashboardData cho ui.ts render.
    return {
      // Số dư tháng đang chọn.
      balance,

      // Tổng thu tháng đang chọn.
      totalIncome,

      // Tổng chi tháng đang chọn.
      totalExpense,

      // Tổng ngân sách của tất cả danh mục.
      totalBudget,

      // Phần trăm ngân sách đã dùng.
      budgetPercent,

      // Nếu phần trăm lớn hơn 100 nghĩa là vượt ngân sách.
      isOverBudget: budgetPercent > 100,
    };
  }

  // Hàm getNextId tạo id mới cho giao dịch.
  private static getNextId(trades: Trade[]): number {
    // Nếu tháng này chưa có giao dịch thì dùng Date.now() làm id.
    if (trades.length === 0) {
      // Date.now() thường là số rất lớn và ít bị trùng.
      return Date.now();
    }

    // Gán maxId ban đầu bằng id của giao dịch đầu tiên.
    let maxId = trades[0].id;

    // Duyệt từ giao dịch thứ hai để tìm id lớn nhất.
    for (let i = 1; i < trades.length; i++) {
      // Nếu id hiện tại lớn hơn maxId thì cập nhật maxId.
      if (trades[i].id > maxId) {
        // Cập nhật id lớn nhất.
        maxId = trades[i].id;
      }
    }

    // Trả về id mới; dùng số lớn hơn giữa maxId + 1 và Date.now() để tránh trùng.
    return Math.max(maxId + 1, Date.now());
  }
}
