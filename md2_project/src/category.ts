// Import kiểu Category và Trade để TypeScript kiểm tra dữ liệu đúng cấu trúc.
import type { Category, Trade } from "./types";

// Import TransactionManager để dùng hàm tính tiền đã chi theo danh mục.
import { TransactionManager } from "./transaction";

// CategoryManager là lớp chuyên xử lý các việc liên quan đến danh mục.
export class CategoryManager {
  // Hàm createCategory tạo một danh mục mới từ tên và hạn mức người dùng nhập.
  public static createCategory(categories: Category[], title: string, limitMoney: number): Category {
    // Trả về object Category mới.
    return {
      // id được tạo tự động bằng hàm getNextId.
      id: CategoryManager.getNextId(categories),

      // title lấy từ tên danh mục người dùng nhập.
      title,

      // limitMoney lấy từ hạn mức người dùng nhập.
      limitMoney,
    };
  }

  // Hàm updateCategory dùng để sửa tên hoặc hạn mức của một danh mục.
  public static updateCategory(
    // categories là danh sách danh mục hiện tại.
    categories: Category[],

    // categoryId là id của danh mục cần sửa.
    categoryId: number,

    // newTitle là tên mới sau khi sửa.
    newTitle: string,

    // newLimitMoney là hạn mức mới sau khi sửa.
    newLimitMoney: number,
  ): Category[] {
    // map tạo ra mảng danh mục mới sau khi cập nhật.
    return categories.map((category) => {
      // Nếu danh mục hiện tại không phải danh mục cần sửa thì giữ nguyên.
      if (category.id !== categoryId) {
        // Trả lại danh mục cũ.
        return category;
      }

      // Nếu đúng danh mục cần sửa thì tạo object mới dựa trên object cũ.
      return {
        // Sao chép toàn bộ thuộc tính cũ của category.
        ...category,

        // Ghi đè title bằng tên mới.
        title: newTitle,

        // Ghi đè limitMoney bằng hạn mức mới.
        limitMoney: newLimitMoney,
      };
    });
  }

  // Hàm deleteCategory dùng để xóa danh mục.
  public static deleteCategory(categories: Category[], categoryId: number, allTrades: Trade[]): Category[] {
    // Kiểm tra danh mục này đã từng được dùng trong giao dịch nào chưa.
    const isUsed = allTrades.some((trade) => trade.categoryId === categoryId);

    // Nếu danh mục đã có giao dịch thì không cho xóa để tránh mất liên kết dữ liệu.
    if (isUsed) {
      // Ném lỗi để app.ts bắt lỗi và hiện alert cho người dùng.
      throw new Error("Không thể xóa danh mục vì danh mục này đã có giao dịch.");
    }

    // Nếu danh mục chưa có giao dịch thì lọc bỏ danh mục có id cần xóa.
    return categories.filter((category) => category.id !== categoryId);
  }

  // Hàm getTotalBudget tính tổng hạn mức của tất cả danh mục.
  public static getTotalBudget(categories: Category[]): number {
    // result dùng để cộng dồn tổng hạn mức.
    let result = 0;

    // Duyệt qua từng danh mục trong mảng categories.
    for (let i = 0; i < categories.length; i++) {
      // Cộng hạn mức của danh mục hiện tại vào result.
      result += categories[i].limitMoney;
    }

    // Trả về tổng ngân sách sau khi cộng xong.
    return result;
  }

  // Hàm getCategoryTitle tìm tên danh mục dựa vào categoryId.
  public static getCategoryTitle(categories: Category[], categoryId: number): string {
    // find tìm danh mục có id trùng với categoryId.
    const category = categories.find((item) => item.id === categoryId);

    // Nếu tìm thấy thì trả về tên, nếu không thì trả về chữ Không rõ.
    return category ? category.title : "Không rõ";
  }

  // Hàm getOverLimitCategories lấy danh sách các danh mục đã vượt hạn mức.
  public static getOverLimitCategories(categories: Category[], trades: Trade[]): Category[] {
    // result là mảng chứa các danh mục vượt hạn mức.
    const result: Category[] = [];

    // Duyệt qua từng danh mục.
    for (let i = 0; i < categories.length; i++) {
      // Lấy danh mục hiện tại.
      const category = categories[i];

      // Tính số tiền đã chi trong danh mục này.
      const spent = TransactionManager.getCategorySpent(trades, category.id);

      // Nếu hạn mức lớn hơn 0 và đã chi vượt hạn mức thì đưa vào danh sách cảnh báo.
      if (category.limitMoney > 0 && spent > category.limitMoney) {
        // Thêm danh mục vượt hạn mức vào result.
        result.push(category);
      }
    }

    // Trả về danh sách danh mục vượt hạn mức.
    return result;
  }

  // Hàm getNextId tạo id mới cho danh mục.
  private static getNextId(categories: Category[]): number {
    // Nếu chưa có danh mục nào thì dùng Date.now() làm id đầu tiên.
    if (categories.length === 0) {
      // Date.now() trả về số mili-giây hiện tại, thường không bị trùng.
      return Date.now();
    }

    // Gán maxId ban đầu bằng id của danh mục đầu tiên.
    let maxId = categories[0].id;

    // Duyệt từ danh mục thứ hai để tìm id lớn nhất.
    for (let i = 1; i < categories.length; i++) {
      // Nếu id hiện tại lớn hơn maxId thì cập nhật maxId.
      if (categories[i].id > maxId) {
        // Gán maxId bằng id lớn hơn vừa tìm được.
        maxId = categories[i].id;
      }
    }

    // Trả về id mới; lấy số lớn hơn giữa maxId + 1 và Date.now() để tránh trùng id.
    return Math.max(maxId + 1, Date.now());
  }
}
