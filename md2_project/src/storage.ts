// Import kiểu dữ liệu Category và Trade để các hàm đọc/ghi localStorage có kiểu rõ ràng.
import type { Category, Trade } from "./types";

// CATEGORY_KEY là khóa localStorage dùng để lưu danh sách danh mục.
const CATEGORY_KEY = "beginner_wallet_categories";

// MONTH_KEYS là khóa localStorage dùng để lưu danh sách các tháng đã có dữ liệu.
const MONTH_KEYS = "beginner_wallet_month_keys";

// TRADE_PREFIX là phần đầu của khóa localStorage dùng để lưu giao dịch theo từng tháng.
const TRADE_PREFIX = "beginner_wallet_trades_";

// StorageManager chỉ chịu trách nhiệm làm việc với localStorage.
export class StorageManager {
  // Hàm seedData tạo dữ liệu mẫu nếu người dùng mở app lần đầu.
  public static seedData(): void {
    // Lấy thử danh mục cũ trong localStorage.
    const oldCategories = localStorage.getItem(CATEGORY_KEY);

    // Nếu đã có danh mục rồi thì không tạo dữ liệu mẫu nữa.
    if (oldCategories !== null) {
      // Dừng hàm ngay tại đây.
      return;
    }

    // Lấy tháng hiện tại theo dạng yyyy-mm.
    const currentMonth = StorageManager.getCurrentMonthKey();

    // Lấy tháng trước theo dạng yyyy-mm để có dữ liệu summary ít nhất 2 tháng.
    const previousMonth = StorageManager.getPreviousMonthKey(currentMonth);

    // Tạo danh sách danh mục mẫu.
    const sampleCategories: Category[] = [
      // Danh mục Ăn uống có hạn mức 3.000.000.
      { id: 1, title: "Ăn uống", limitMoney: 3000000 },

      // Danh mục Đi chơi có hạn mức 1.000.000.
      { id: 2, title: "Đi chơi", limitMoney: 1000000 },

      // Danh mục Mua sắm có hạn mức 2.000.000.
      { id: 3, title: "Mua sắm", limitMoney: 2000000 },

      // Danh mục Lương có limit bằng 0 vì đây là khoản thu, không cần hạn mức.
      { id: 4, title: "Lương", limitMoney: 0 },
    ];

    // Tạo danh sách giao dịch mẫu cho tháng hiện tại.
    const sampleTradesCurrent: Trade[] = [
      // Giao dịch thu lương.
      {
        // id của giao dịch.
        id: 1,

        // categoryId = 4 nghĩa là thuộc danh mục Lương.
        categoryId: 4,

        // valueMoney dương nghĩa là khoản thu.
        valueMoney: 12000000,

        // Ngày giao dịch, ghép tháng hiện tại với ngày 02.
        createAt: `${currentMonth}-02`,

        // Ghi chú giao dịch.
        note: "Lương tháng này",
      },

      // Giao dịch chi ăn uống.
      {
        id: 2,
        categoryId: 1,
        valueMoney: -150000,
        createAt: `${currentMonth}-04`,
        note: "Ăn sáng và cà phê",
      },

      // Giao dịch chi đi chơi.
      {
        id: 3,
        categoryId: 2,
        valueMoney: -450000,
        createAt: `${currentMonth}-08`,
        note: "Đi chơi cuối tuần",
      },

      // Giao dịch chi mua sắm.
      {
        id: 4,
        categoryId: 3,
        valueMoney: -800000,
        createAt: `${currentMonth}-12`,
        note: "Mua đồ dùng cá nhân",
      },
    ];

    // Tạo danh sách giao dịch mẫu cho tháng trước.
    const sampleTradesPrevious: Trade[] = [
      // Giao dịch thu lương tháng trước.
      {
        id: 5,
        categoryId: 4,
        valueMoney: 11000000,
        createAt: `${previousMonth}-03`,
        note: "Lương tháng trước",
      },

      // Giao dịch chi ăn uống tháng trước, cố ý cao để có dữ liệu cảnh báo/tổng hợp.
      {
        id: 6,
        categoryId: 1,
        valueMoney: -3200000,
        createAt: `${previousMonth}-10`,
        note: "Ăn uống tháng trước",
      },

      // Giao dịch chi mua sắm tháng trước.
      {
        id: 7,
        categoryId: 3,
        valueMoney: -1200000,
        createAt: `${previousMonth}-15`,
        note: "Mua sắm tháng trước",
      },
    ];

    // Lưu danh mục mẫu vào localStorage.
    StorageManager.saveCategories(sampleCategories);

    // Lưu giao dịch mẫu của tháng hiện tại vào localStorage.
    StorageManager.saveTrades(currentMonth, sampleTradesCurrent);

    // Lưu giao dịch mẫu của tháng trước vào localStorage.
    StorageManager.saveTrades(previousMonth, sampleTradesPrevious);
  }

  // Hàm loadCategories đọc danh sách danh mục từ localStorage.
  public static loadCategories(): Category[] {
    // Lấy chuỗi JSON từ localStorage theo khóa CATEGORY_KEY.
    const json = localStorage.getItem(CATEGORY_KEY);

    // Nếu chưa có dữ liệu thì trả về mảng rỗng.
    if (json === null) {
      // Mảng rỗng nghĩa là chưa có danh mục nào.
      return [];
    }

    // Chuyển chuỗi JSON thành mảng Category.
    const data = JSON.parse(json) as Category[];

    // Trả về danh sách danh mục đã đọc được.
    return data;
  }

  // Hàm saveCategories lưu danh sách danh mục vào localStorage.
  public static saveCategories(categories: Category[]): void {
    // JSON.stringify chuyển mảng object thành chuỗi để localStorage lưu được.
    localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
  }

  // Hàm loadTrades đọc danh sách giao dịch theo tháng.
  public static loadTrades(monthKey: string): Trade[] {
    // Lấy chuỗi JSON của tháng cần đọc.
    const json = localStorage.getItem(TRADE_PREFIX + monthKey);

    // Nếu tháng này chưa có giao dịch thì trả về mảng rỗng.
    if (json === null) {
      // Không có dữ liệu nghĩa là chưa có giao dịch trong tháng đó.
      return [];
    }

    // Chuyển chuỗi JSON thành mảng Trade.
    const data = JSON.parse(json) as Trade[];

    // Trả về danh sách giao dịch đã đọc được.
    return data;
  }

  // Hàm saveTrades lưu danh sách giao dịch theo từng tháng.
  public static saveTrades(monthKey: string, trades: Trade[]): void {
    // Lưu mảng giao dịch vào localStorage với khóa riêng của tháng.
    localStorage.setItem(TRADE_PREFIX + monthKey, JSON.stringify(trades));

    // Sau khi lưu giao dịch, thêm tháng này vào danh sách tháng đã có dữ liệu.
    StorageManager.addMonthKey(monthKey);
  }

  // Hàm loadMonthKeys đọc danh sách tháng đã có dữ liệu.
  public static loadMonthKeys(): string[] {
    // Lấy chuỗi JSON chứa danh sách tháng.
    const json = localStorage.getItem(MONTH_KEYS);

    // Nếu chưa có danh sách tháng thì trả về mảng rỗng.
    if (json === null) {
      // Không có tháng nào được lưu.
      return [];
    }

    // Chuyển chuỗi JSON thành mảng string.
    const data = JSON.parse(json) as string[];

    // Sắp xếp giảm dần để tháng mới hiển thị trước.
    return data.sort().reverse();
  }

  // Hàm loadAllTrades lấy tất cả giao dịch của mọi tháng.
  public static loadAllTrades(): Trade[] {
    // Đọc danh sách các tháng đã có dữ liệu.
    const monthKeys = StorageManager.loadMonthKeys();

    // result là mảng dùng để gom tất cả giao dịch.
    const result: Trade[] = [];

    // Duyệt từng tháng trong monthKeys.
    for (let i = 0; i < monthKeys.length; i++) {
      // Đọc giao dịch của tháng hiện tại trong vòng lặp.
      const trades = StorageManager.loadTrades(monthKeys[i]);

      // Thêm toàn bộ giao dịch của tháng đó vào result.
      result.push(...trades);
    }

    // Trả về tất cả giao dịch của mọi tháng.
    return result;
  }

  // Hàm getCurrentMonthKey lấy tháng hiện tại theo dạng yyyy-mm.
  public static getCurrentMonthKey(): string {
    // Tạo đối tượng Date đại diện cho thời điểm hiện tại.
    const now = new Date();

    // Lấy năm hiện tại.
    const year = now.getFullYear();

    // Lấy tháng hiện tại; getMonth bắt đầu từ 0 nên phải cộng 1.
    const month = String(now.getMonth() + 1).padStart(2, "0");

    // Trả về chuỗi dạng yyyy-mm.
    return `${year}-${month}`;
  }

  // Hàm getMonthKeyFromDate lấy phần yyyy-mm từ ngày yyyy-mm-dd.
  public static getMonthKeyFromDate(dateText: string): string {
    // slice(0, 7) lấy 7 ký tự đầu: yyyy-mm.
    return dateText.slice(0, 7);
  }

  // Hàm addMonthKey thêm một tháng vào danh sách tháng đã lưu.
  private static addMonthKey(monthKey: string): void {
    // Đọc danh sách tháng hiện có.
    const monthKeys = StorageManager.loadMonthKeys();

    // Chỉ thêm nếu tháng này chưa có trong danh sách.
    if (!monthKeys.includes(monthKey)) {
      // Thêm tháng mới vào mảng.
      monthKeys.push(monthKey);

      // Sắp xếp tháng mới lên trước.
      monthKeys.sort().reverse();

      // Lưu lại danh sách tháng vào localStorage.
      localStorage.setItem(MONTH_KEYS, JSON.stringify(monthKeys));
    }
  }

  // Hàm getPreviousMonthKey lấy tháng đứng ngay trước tháng đang truyền vào.
  private static getPreviousMonthKey(monthKey: string): string {
    // Tách chuỗi yyyy-mm thành yearText và monthText.
    const [yearText, monthText] = monthKey.split("-");

    // Chuyển yearText từ string sang number.
    const year = Number(yearText);

    // Chuyển monthText từ string sang number.
    const month = Number(monthText);

    // Tạo ngày thuộc tháng trước; month - 2 vì Date dùng tháng bắt đầu từ 0.
    const date = new Date(year, month - 2, 1);

    // Lấy năm của tháng trước.
    const resultYear = date.getFullYear();

    // Lấy tháng của tháng trước và thêm số 0 nếu cần.
    const resultMonth = String(date.getMonth() + 1).padStart(2, "0");

    // Trả về chuỗi yyyy-mm của tháng trước.
    return `${resultYear}-${resultMonth}`;
  }
}
