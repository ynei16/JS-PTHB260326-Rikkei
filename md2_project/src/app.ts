// Import các kiểu dữ liệu dùng trong file app.ts.
import type { Category, SummaryRow, Trade } from "./types";

// Import CategoryManager để xử lý thêm/sửa/xóa danh mục.
import { CategoryManager } from "./category";

// Import StorageManager để đọc/ghi dữ liệu localStorage.
import { StorageManager } from "./storage";

// Import TransactionManager để xử lý giao dịch và tính toán thu/chi.
import { TransactionManager } from "./transaction";

// Import UiManager để render dữ liệu ra giao diện HTML.
import { UiManager } from "./ui";

// FinanceManager là lớp chính, có nhiệm vụ điều phối toàn bộ ứng dụng.
export class FinanceManager {
  // categories lưu danh sách danh mục hiện tại.
  private categories: Category[] = [];

  // trades lưu danh sách giao dịch của tháng đang chọn.
  private trades: Trade[] = [];

  // currentMonthKey lưu tháng đang xem, dạng yyyy-mm.
  private currentMonthKey = "";

  // editingCategoryId lưu id danh mục đang sửa; null nghĩa là không sửa danh mục nào.
  private editingCategoryId: number | null = null;

  // ui là đối tượng chuyên xử lý giao diện.
  private ui: UiManager;

  // constructor tự chạy khi tạo new FinanceManager().
  public constructor() {
    // Tạo dữ liệu mẫu nếu localStorage đang trống.
    StorageManager.seedData();

    // Khởi tạo đối tượng UiManager để dùng các hàm render.
    this.ui = new UiManager();

    // Lấy tháng hiện tại làm tháng mặc định khi mở app.
    this.currentMonthKey = StorageManager.getCurrentMonthKey();

    // Đọc danh sách danh mục từ localStorage.
    this.categories = StorageManager.loadCategories();

    // Đọc danh sách giao dịch của tháng hiện tại.
    this.trades = StorageManager.loadTrades(this.currentMonthKey);

    // Gán giá trị cho ô chọn tháng trên giao diện.
    this.ui.setMonthValue(this.currentMonthKey);

    // Gắn sự kiện cho form, nút bấm và bộ chọn tháng.
    this.bindEvents();

    // Render giao diện lần đầu.
    this.renderUi();
  }

  // bindEvents gắn các sự kiện người dùng vào các hàm xử lý.
  private bindEvents(): void {
    // Lấy form thêm giao dịch từ HTML.
    const tradeForm = this.getElement<HTMLFormElement>("#tradeForm");

    // Lấy form thêm/sửa danh mục từ HTML.
    const categoryForm = this.getElement<HTMLFormElement>("#categoryForm");

    // Lấy input chọn tháng từ HTML.
    const selectMonth = this.getElement<HTMLInputElement>("#selectMonth");

    // Lấy nút hủy sửa danh mục từ HTML.
    const cancelEditCategoryBtn = this.getElement<HTMLButtonElement>("#cancelEditCategoryBtn");

    // Khi submit form giao dịch thì gọi hàm addTrade.
    tradeForm.addEventListener("submit", (event) => this.addTrade(event));

    // Khi submit form danh mục thì gọi hàm saveCategory.
    categoryForm.addEventListener("submit", (event) => this.saveCategory(event));

    // Khi đổi tháng thì gọi hàm changeMonth với giá trị tháng đang chọn.
    selectMonth.addEventListener("change", () => this.changeMonth(selectMonth.value));

    // Khi bấm hủy sửa danh mục thì gọi hàm cancelEditCategory.
    cancelEditCategoryBtn.addEventListener("click", () => this.cancelEditCategory());

    // Lắng nghe click toàn trang để bắt các nút sửa/xóa được render động trong bảng.
    document.addEventListener("click", (event) => this.handleButtonClick(event));
  }

  // renderUi gọi toàn bộ hàm render để cập nhật giao diện.
  private renderUi(): void {
    // Tính tổng hạn mức của tất cả danh mục.
    const totalBudget = CategoryManager.getTotalBudget(this.categories);

    // Tính dữ liệu dashboard từ danh sách giao dịch và tổng ngân sách.
    const dashboardData = TransactionManager.getDashboardData(this.trades, totalBudget);

    // Tạo dữ liệu cho bảng tổng hợp các tháng.
    const summaryRows = this.getSummaryRows();

    // Render dropdown danh mục trong form giao dịch.
    this.ui.renderCategoryOptions(this.categories);

    // Render các thẻ số dư, tổng thu, tổng chi và ngân sách.
    this.ui.renderDashboard(dashboardData);

    // Render bảng danh mục.
    this.ui.renderCategoryTable(this.categories, this.trades);

    // Render bảng lịch sử giao dịch.
    this.ui.renderTradeTable(this.trades, this.categories);

    // Render cảnh báo vượt hạn mức.
    this.ui.renderAlerts(this.categories, this.trades);

    // Render bảng tổng hợp chi tiêu các tháng.
    this.ui.renderSummary(summaryRows);
  }

  // addTrade xử lý khi người dùng thêm giao dịch mới.
  private addTrade(event: SubmitEvent): void {
    // Ngăn form reload lại trang sau khi submit.
    event.preventDefault();

    // Lấy form đang được submit.
    const form = event.currentTarget;

    // Kiểm tra form có đúng là HTMLFormElement không.
    if (!(form instanceof HTMLFormElement)) {
      // Báo lỗi nếu form không hợp lệ.
      alert("Form giao dịch không hợp lệ.");

      // Dừng hàm.
      return;
    }

    // FormData giúp lấy dữ liệu trong form theo thuộc tính name.
    const formData = new FormData(form);

    // Lấy categoryId từ select và đổi sang number.
    const categoryId = Number(formData.get("categoryId"));

    // Lấy số tiền từ input và đổi sang number.
    const valueMoney = Number(formData.get("valueMoney"));

    // Lấy ngày giao dịch; nếu không có thì dùng chuỗi rỗng.
    const createAt = String(formData.get("createAt") || "");

    // Lấy ghi chú; nếu không nhập thì dùng chuỗi rỗng.
    const note = String(formData.get("note") || "");

    // Nếu chưa chọn danh mục thì báo lỗi.
    if (!categoryId) {
      // Hiện thông báo cho người dùng.
      alert("Vui lòng chọn danh mục.");

      // Dừng hàm để không lưu giao dịch sai.
      return;
    }

    // Nếu số tiền bằng 0 hoặc không phải số thì báo lỗi.
    if (valueMoney === 0 || Number.isNaN(valueMoney)) {
      // Hiện thông báo cho người dùng.
      alert("Số tiền phải khác 0.");

      // Dừng hàm.
      return;
    }

    // Nếu chưa chọn ngày thì báo lỗi.
    if (createAt.length === 0) {
      // Hiện thông báo cho người dùng.
      alert("Vui lòng chọn ngày giao dịch.");

      // Dừng hàm.
      return;
    }

    // Lấy tháng của giao dịch từ ngày người dùng nhập.
    const tradeMonthKey = StorageManager.getMonthKeyFromDate(createAt);

    // Đọc danh sách giao dịch của đúng tháng đó.
    const tradesOfTradeMonth = StorageManager.loadTrades(tradeMonthKey);

    // Tạo object giao dịch mới.
    const newTrade = TransactionManager.createTrade(
      // Truyền danh sách giao dịch hiện tại để tạo id mới.
      tradesOfTradeMonth,

      // Truyền id danh mục.
      categoryId,

      // Truyền số tiền.
      valueMoney,

      // Truyền ngày giao dịch.
      createAt,

      // Truyền ghi chú.
      note,
    );

    // Thêm giao dịch mới vào mảng giao dịch của tháng đó.
    tradesOfTradeMonth.push(newTrade);

    // Lưu lại giao dịch vào localStorage.
    StorageManager.saveTrades(tradeMonthKey, tradesOfTradeMonth);

    // Gán tháng hiện tại của app bằng tháng của giao dịch vừa nhập.
    this.currentMonthKey = tradeMonthKey;

    // Đọc lại giao dịch của tháng đang xem.
    this.trades = StorageManager.loadTrades(this.currentMonthKey);

    // Cập nhật ô chọn tháng trên giao diện.
    this.ui.setMonthValue(this.currentMonthKey);

    // Xóa dữ liệu vừa nhập trong form.
    form.reset();

    // Render lại giao diện để dashboard/bảng cập nhật realtime.
    this.renderUi();
  }

  // saveCategory xử lý thêm mới hoặc chỉnh sửa danh mục.
  private saveCategory(event: SubmitEvent): void {
    // Ngăn form reload trang.
    event.preventDefault();

    // Lấy form đang submit.
    const form = event.currentTarget;

    // Kiểm tra form có hợp lệ không.
    if (!(form instanceof HTMLFormElement)) {
      // Báo lỗi nếu form sai.
      alert("Form danh mục không hợp lệ.");

      // Dừng hàm.
      return;
    }

    // Lấy dữ liệu từ form.
    const formData = new FormData(form);

    // Lấy tên danh mục và xóa khoảng trắng thừa hai đầu.
    const title = String(formData.get("categoryTitle") || "").trim();

    // Lấy hạn mức và đổi sang number.
    const limitMoney = Number(formData.get("categoryLimit"));

    // Nếu tên rỗng thì báo lỗi.
    if (title.length === 0) {
      // Hiện thông báo.
      alert("Tên danh mục không được để trống.");

      // Dừng hàm.
      return;
    }

    // Nếu hạn mức âm hoặc không phải số thì báo lỗi.
    if (limitMoney < 0 || Number.isNaN(limitMoney)) {
      // Hiện thông báo.
      alert("Hạn mức phải lớn hơn hoặc bằng 0.");

      // Dừng hàm.
      return;
    }

    // Nếu editingCategoryId là null nghĩa là đang thêm mới.
    if (this.editingCategoryId === null) {
      // Tạo danh mục mới.
      const newCategory = CategoryManager.createCategory(this.categories, title, limitMoney);

      // Thêm danh mục mới vào mảng categories.
      this.categories.push(newCategory);
    } else {
      // Nếu editingCategoryId khác null nghĩa là đang sửa danh mục cũ.
      this.categories = CategoryManager.updateCategory(
        // Truyền danh sách danh mục hiện tại.
        this.categories,

        // Truyền id danh mục đang sửa.
        this.editingCategoryId,

        // Truyền tên mới.
        title,

        // Truyền hạn mức mới.
        limitMoney,
      );

      // Sửa xong thì đưa trạng thái về không sửa danh mục nào.
      this.editingCategoryId = null;

      // Đổi nút về chế độ thêm danh mục.
      this.ui.setCategoryEditMode(false);
    }

    // Lưu danh mục sau khi thêm/sửa vào localStorage.
    StorageManager.saveCategories(this.categories);

    // Xóa dữ liệu trong form.
    form.reset();

    // Render lại giao diện.
    this.renderUi();
  }

  // changeMonth xử lý khi người dùng chọn tháng khác.
  private changeMonth(monthKey: string): void {
    // Nếu giá trị tháng rỗng thì không làm gì.
    if (monthKey.length === 0) {
      // Dừng hàm.
      return;
    }

    // Cập nhật tháng đang xem.
    this.currentMonthKey = monthKey;

    // Load giao dịch của tháng vừa chọn.
    this.trades = StorageManager.loadTrades(this.currentMonthKey);

    // Render lại giao diện theo tháng mới.
    this.renderUi();
  }

  // handleButtonClick xử lý các nút được render động như Sửa/Xóa.
  private handleButtonClick(event: MouseEvent): void {
    // Lấy phần tử người dùng vừa click.
    const target = event.target;

    // Nếu phần tử click không phải button thì bỏ qua.
    if (!(target instanceof HTMLButtonElement)) {
      // Dừng hàm.
      return;
    }

    // Lấy loại hành động từ data-action của button.
    const action = target.dataset.action;

    // Lấy id từ data-id của button.
    const idText = target.dataset.id;

    // Nếu thiếu action hoặc id thì bỏ qua.
    if (action === undefined || idText === undefined) {
      // Dừng hàm.
      return;
    }

    // Đổi id từ string sang number.
    const id = Number(idText);

    // Nếu action là delete-trade thì xóa giao dịch.
    if (action === "delete-trade") {
      // Gọi hàm xóa giao dịch.
      this.deleteTrade(id);
    }

    // Nếu action là edit-category thì sửa danh mục.
    if (action === "edit-category") {
      // Gọi hàm đưa danh mục vào form sửa.
      this.editCategory(id);
    }

    // Nếu action là delete-category thì xóa danh mục.
    if (action === "delete-category") {
      // Gọi hàm xóa danh mục.
      this.deleteCategory(id);
    }
  }

  // deleteTrade xóa một giao dịch trong tháng đang xem.
  private deleteTrade(tradeId: number): void {
    // Hỏi người dùng có chắc muốn xóa không.
    const confirmDelete = confirm("Em có chắc muốn xóa giao dịch này không?");

    // Nếu người dùng bấm Hủy thì không xóa.
    if (!confirmDelete) {
      // Dừng hàm.
      return;
    }

    // Cập nhật mảng trades sau khi xóa giao dịch.
    this.trades = TransactionManager.deleteTrade(this.trades, tradeId);

    // Lưu lại giao dịch của tháng hiện tại vào localStorage.
    StorageManager.saveTrades(this.currentMonthKey, this.trades);

    // Render lại giao diện.
    this.renderUi();
  }

  // editCategory đưa dữ liệu danh mục cần sửa lên form.
  private editCategory(categoryId: number): void {
    // Tìm danh mục có id trùng với categoryId.
    const category = this.categories.find((item) => item.id === categoryId);

    // Nếu không tìm thấy danh mục thì báo lỗi.
    if (category === undefined) {
      // Hiện thông báo lỗi.
      alert("Không tìm thấy danh mục cần sửa.");

      // Dừng hàm.
      return;
    }

    // Lấy form danh mục từ HTML.
    const categoryForm = this.getElement<HTMLFormElement>("#categoryForm");

    // Lấy input tên danh mục trong form bằng name.
    const titleInput = categoryForm.elements.namedItem("categoryTitle");

    // Lấy input hạn mức trong form bằng name.
    const limitInput = categoryForm.elements.namedItem("categoryLimit");

    // Kiểm tra titleInput có đúng là input không.
    if (!(titleInput instanceof HTMLInputElement)) {
      // Nếu không đúng thì dừng hàm.
      return;
    }

    // Kiểm tra limitInput có đúng là input không.
    if (!(limitInput instanceof HTMLInputElement)) {
      // Nếu không đúng thì dừng hàm.
      return;
    }

    // Đưa tên danh mục cũ lên input.
    titleInput.value = category.title;

    // Đưa hạn mức cũ lên input.
    limitInput.value = String(category.limitMoney);

    // Lưu id danh mục đang sửa.
    this.editingCategoryId = category.id;

    // Đổi giao diện form sang chế độ chỉnh sửa.
    this.ui.setCategoryEditMode(true);
  }

  // cancelEditCategory hủy chế độ sửa danh mục.
  private cancelEditCategory(): void {
    // Lấy form danh mục.
    const categoryForm = this.getElement<HTMLFormElement>("#categoryForm");

    // Xóa dữ liệu trong form.
    categoryForm.reset();

    // Đặt trạng thái về không sửa danh mục nào.
    this.editingCategoryId = null;

    // Đổi giao diện form về chế độ thêm danh mục.
    this.ui.setCategoryEditMode(false);
  }

  // deleteCategory xử lý xóa danh mục.
  private deleteCategory(categoryId: number): void {
    // Hỏi người dùng có chắc muốn xóa không.
    const confirmDelete = confirm("Em có chắc muốn xóa danh mục này không?");

    // Nếu người dùng bấm Hủy thì không xóa.
    if (!confirmDelete) {
      // Dừng hàm.
      return;
    }

    // try/catch dùng để bắt lỗi khi danh mục đã có giao dịch.
    try {
      // Đọc tất cả giao dịch của mọi tháng để kiểm tra ràng buộc.
      const allTrades = StorageManager.loadAllTrades();

      // Gọi CategoryManager để xóa danh mục nếu hợp lệ.
      this.categories = CategoryManager.deleteCategory(this.categories, categoryId, allTrades);

      // Lưu lại danh sách danh mục sau khi xóa.
      StorageManager.saveCategories(this.categories);

      // Render lại giao diện.
      this.renderUi();
    } catch (error) {
      // Nếu lỗi là Error chuẩn của JavaScript thì lấy message để alert.
      if (error instanceof Error) {
        // Hiện nội dung lỗi.
        alert(error.message);
      } else {
        // Nếu lỗi không rõ loại thì hiện thông báo chung.
        alert("Không thể xóa danh mục.");
      }
    }
  }

  // getSummaryRows tạo dữ liệu cho bảng tổng hợp chi tiêu các tháng.
  private getSummaryRows(): SummaryRow[] {
    // Đọc danh sách tháng đã lưu.
    const monthKeys = StorageManager.loadMonthKeys();

    // result là mảng chứa các dòng summary.
    const result: SummaryRow[] = [];

    // Duyệt từng tháng.
    for (let i = 0; i < monthKeys.length; i++) {
      // Lấy tháng hiện tại trong vòng lặp.
      const monthKey = monthKeys[i];

      // Đọc giao dịch của tháng đó.
      const trades = StorageManager.loadTrades(monthKey);

      // Thêm một dòng summary vào result.
      result.push({
        // Lưu tháng đang thống kê.
        monthKey,

        // Tính tổng chi của tháng đó.
        totalExpense: TransactionManager.getTotalExpense(trades),

        // Đếm số giao dịch của tháng đó.
        tradeCount: trades.length,
      });
    }

    // Trả về danh sách summary.
    return result;
  }

  // getElement là hàm lấy element từ HTML, có kiểm tra lỗi null.
  private getElement<T extends Element>(selector: string): T {
    // document.querySelector tìm phần tử theo selector như #tradeForm.
    const element = document.querySelector<T>(selector);

    // Nếu không tìm thấy element thì báo lỗi để mình biết sai id trong HTML.
    if (element === null) {
      // Ném lỗi với tên selector bị thiếu.
      throw new Error(`Không tìm thấy element: ${selector}`);
    }

    // Trả về element đã tìm thấy.
    return element;
  }
}
