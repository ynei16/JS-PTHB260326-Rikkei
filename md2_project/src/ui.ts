// Import các kiểu dữ liệu cần dùng để render giao diện.
import type { Category, DashboardData, SummaryRow, Trade } from "./types";

// Import CategoryManager để lấy tên danh mục và danh mục vượt hạn mức.
import { CategoryManager } from "./category";

// Import TransactionManager để tính số tiền đã chi theo danh mục và sắp xếp giao dịch.
import { TransactionManager } from "./transaction";

// UiManager chỉ chịu trách nhiệm hiển thị dữ liệu ra HTML.
export class UiManager {
  // selectMonthEL là ô chọn tháng/năm.
  private selectMonthEL: HTMLInputElement;

  // formSelectEL là dropdown chọn danh mục trong form giao dịch.
  private formSelectEL: HTMLSelectElement;

  // tableBodyCategoryEL là tbody của bảng danh mục.
  private tableBodyCategoryEL: HTMLTableSectionElement;

  // tableBodyTradeEL là tbody của bảng lịch sử giao dịch.
  private tableBodyTradeEL: HTMLTableSectionElement;

  // balanceTextEL là vị trí hiển thị số dư.
  private balanceTextEL: HTMLElement;

  // incomeTextEL là vị trí hiển thị tổng thu.
  private incomeTextEL: HTMLElement;

  // expenseTextEL là vị trí hiển thị tổng chi.
  private expenseTextEL: HTMLElement;

  // budgetTextEL là vị trí hiển thị tổng ngân sách.
  private budgetTextEL: HTMLElement;

  // budgetStatusEL là vị trí hiển thị trạng thái Đạt/Vượt.
  private budgetStatusEL: HTMLElement;

  // budgetProgressEL là thanh tiến trình ngân sách.
  private budgetProgressEL: HTMLElement;

  // budgetPercentTextEL là dòng chữ hiển thị phần trăm ngân sách đã dùng.
  private budgetPercentTextEL: HTMLElement;

  // alertListEL là vùng hiển thị cảnh báo vượt hạn mức.
  private alertListEL: HTMLElement;

  // summaryBodyEL là tbody của bảng tổng hợp các tháng.
  private summaryBodyEL: HTMLTableSectionElement;

  // categorySubmitBtnEL là nút thêm/lưu chỉnh sửa danh mục.
  private categorySubmitBtnEL: HTMLButtonElement;

  // cancelEditCategoryBtnEL là nút hủy sửa danh mục.
  private cancelEditCategoryBtnEL: HTMLButtonElement;

  // constructor lấy toàn bộ element cần dùng từ HTML.
  public constructor() {
    // Lấy input chọn tháng.
    this.selectMonthEL = this.getElement<HTMLInputElement>("#selectMonth");

    // Lấy select danh mục trong form giao dịch.
    this.formSelectEL = this.getElement<HTMLSelectElement>("#formSelect");

    // Lấy tbody bảng danh mục.
    this.tableBodyCategoryEL = this.getElement<HTMLTableSectionElement>("#tableBodyCategory");

    // Lấy tbody bảng giao dịch.
    this.tableBodyTradeEL = this.getElement<HTMLTableSectionElement>("#tableBodyTrade");

    // Lấy element hiển thị số dư.
    this.balanceTextEL = this.getElement<HTMLElement>("#balanceText");

    // Lấy element hiển thị tổng thu.
    this.incomeTextEL = this.getElement<HTMLElement>("#incomeText");

    // Lấy element hiển thị tổng chi.
    this.expenseTextEL = this.getElement<HTMLElement>("#expenseText");

    // Lấy element hiển thị ngân sách tổng.
    this.budgetTextEL = this.getElement<HTMLElement>("#budgetText");

    // Lấy element hiển thị trạng thái ngân sách.
    this.budgetStatusEL = this.getElement<HTMLElement>("#budgetStatus");

    // Lấy element thanh tiến trình ngân sách.
    this.budgetProgressEL = this.getElement<HTMLElement>("#budgetProgress");

    // Lấy element hiển thị phần trăm ngân sách.
    this.budgetPercentTextEL = this.getElement<HTMLElement>("#budgetPercentText");

    // Lấy vùng cảnh báo.
    this.alertListEL = this.getElement<HTMLElement>("#alertList");

    // Lấy tbody bảng tổng hợp.
    this.summaryBodyEL = this.getElement<HTMLTableSectionElement>("#summaryBody");

    // Lấy nút submit của form danh mục.
    this.categorySubmitBtnEL = this.getElement<HTMLButtonElement>("#categorySubmitBtn");

    // Lấy nút hủy sửa danh mục.
    this.cancelEditCategoryBtnEL = this.getElement<HTMLButtonElement>("#cancelEditCategoryBtn");
  }

  // setMonthValue gán tháng đang xem vào input type month.
  public setMonthValue(monthKey: string): void {
    // Gán value của input bằng chuỗi yyyy-mm.
    this.selectMonthEL.value = monthKey;
  }

  // renderCategoryOptions render danh mục vào dropdown của form giao dịch.
  public renderCategoryOptions(categories: Category[]): void {
    // html là chuỗi chứa các thẻ option.
    let html = "";

    // Duyệt qua từng danh mục.
    for (let i = 0; i < categories.length; i++) {
      // Thêm một option vào chuỗi html.
      html += `<option value="${categories[i].id}">${categories[i].title}</option>`;
    }

    // Đưa chuỗi option vào select.
    this.formSelectEL.innerHTML = html;
  }

  // renderDashboard render số dư, tổng thu, tổng chi và ngân sách.
  public renderDashboard(data: DashboardData): void {
    // Hiển thị số dư sau khi format tiền Việt Nam.
    this.balanceTextEL.textContent = this.formatMoney(data.balance);

    // Hiển thị tổng thu.
    this.incomeTextEL.textContent = this.formatMoney(data.totalIncome);

    // Hiển thị tổng chi.
    this.expenseTextEL.textContent = this.formatMoney(data.totalExpense);

    // Hiển thị tổng ngân sách.
    this.budgetTextEL.textContent = this.formatMoney(data.totalBudget);

    // Nếu số dư âm thì thêm class red.
    this.balanceTextEL.classList.toggle("red", data.balance < 0);

    // Nếu số dư không âm thì thêm class green.
    this.balanceTextEL.classList.toggle("green", data.balance >= 0);

    // Giới hạn phần trăm thanh progress tối đa 100 để không tràn giao diện.
    const percent = Math.min(data.budgetPercent, 100);

    // Gán chiều rộng thanh progress theo phần trăm đã dùng.
    this.budgetProgressEL.style.width = `${percent}%`;

    // Nếu vượt ngân sách thì thêm class danger cho thanh progress.
    this.budgetProgressEL.classList.toggle("danger", data.isOverBudget);

    // Hiển thị chữ Vượt hoặc Đạt.
    this.budgetStatusEL.textContent = data.isOverBudget ? "Vượt" : "Đạt";

    // Nếu vượt ngân sách thì thêm class danger.
    this.budgetStatusEL.classList.toggle("danger", data.isOverBudget);

    // Nếu chưa vượt ngân sách thì thêm class good.
    this.budgetStatusEL.classList.toggle("good", !data.isOverBudget);

    // Hiển thị dòng mô tả phần trăm ngân sách đã dùng.
    this.budgetPercentTextEL.textContent = `Đã dùng ${data.budgetPercent.toFixed(1)}% ngân sách tháng.`;
  }

  // renderCategoryTable render bảng danh sách danh mục.
  public renderCategoryTable(categories: Category[], trades: Trade[]): void {
    // Nếu chưa có danh mục nào thì hiện dòng trống.
    if (categories.length === 0) {
      // Gán HTML thông báo chưa có danh mục.
      this.tableBodyCategoryEL.innerHTML = `
        <tr>
          <td colspan="5" class="empty">Chưa có danh mục nào.</td>
        </tr>
      `;

      // Dừng hàm.
      return;
    }

    // html là chuỗi chứa các dòng tr của bảng.
    let html = "";

    // Duyệt từng danh mục.
    for (let i = 0; i < categories.length; i++) {
      // Lấy danh mục hiện tại.
      const category = categories[i];

      // Tính số tiền đã chi của danh mục trong tháng đang chọn.
      const spent = TransactionManager.getCategorySpent(trades, category.id);

      // Kiểm tra danh mục có vượt hạn mức hay không.
      const overLimit = category.limitMoney > 0 && spent > category.limitMoney;

      // Tạo chữ trạng thái cho danh mục.
      const statusText = overLimit ? "Vượt hạn mức" : "Ổn";

      // Cộng thêm một dòng bảng vào chuỗi html.
      html += `
        <tr class="${overLimit ? "row-danger" : ""}">
          <td>${category.title}</td>
          <td>${category.limitMoney > 0 ? this.formatMoney(category.limitMoney) : "Không giới hạn"}</td>
          <td class="red">${this.formatMoney(spent)}</td>
          <td>${statusText}</td>
          <td class="action-cell">
            <button class="small-btn" data-action="edit-category" data-id="${category.id}">Sửa</button>
            <button class="small-btn danger-text" data-action="delete-category" data-id="${category.id}">Xóa</button>
          </td>
        </tr>
      `;
    }

    // Đưa toàn bộ dòng bảng vào tbody danh mục.
    this.tableBodyCategoryEL.innerHTML = html;
  }

  // renderTradeTable render bảng lịch sử giao dịch.
  public renderTradeTable(trades: Trade[], categories: Category[]): void {
    // Sắp xếp giao dịch mới nhất lên đầu.
    const sortedTrades = TransactionManager.sortTradesByDateDesc(trades);

    // Nếu tháng này chưa có giao dịch thì hiện dòng trống.
    if (sortedTrades.length === 0) {
      // Gán HTML thông báo chưa có giao dịch.
      this.tableBodyTradeEL.innerHTML = `
        <tr>
          <td colspan="5" class="empty">Tháng này chưa có giao dịch.</td>
        </tr>
      `;

      // Dừng hàm.
      return;
    }

    // html là chuỗi chứa các dòng giao dịch.
    let html = "";

    // Duyệt qua từng giao dịch đã sắp xếp.
    for (let i = 0; i < sortedTrades.length; i++) {
      // Lấy giao dịch hiện tại.
      const trade = sortedTrades[i];

      // Lấy tên danh mục từ categoryId.
      const categoryTitle = CategoryManager.getCategoryTitle(categories, trade.categoryId);

      // Nếu số tiền dương thì màu xanh, âm thì màu đỏ.
      const moneyClass = trade.valueMoney >= 0 ? "green" : "red";

      // Cộng thêm một dòng giao dịch vào chuỗi html.
      html += `
        <tr>
          <td>${this.formatDate(trade.createAt)}</td>
          <td>${categoryTitle}</td>
          <td>${trade.note || "Không có ghi chú"}</td>
          <td class="${moneyClass}">${this.formatMoney(trade.valueMoney)}</td>
          <td>
            <button class="small-btn danger-text" data-action="delete-trade" data-id="${trade.id}">Xóa</button>
          </td>
        </tr>
      `;
    }

    // Đưa toàn bộ dòng giao dịch vào tbody giao dịch.
    this.tableBodyTradeEL.innerHTML = html;
  }

  // renderAlerts render cảnh báo vượt hạn mức.
  public renderAlerts(categories: Category[], trades: Trade[]): void {
    // Lấy danh sách danh mục đang vượt hạn mức.
    const overLimitCategories = CategoryManager.getOverLimitCategories(categories, trades);

    // Nếu không có danh mục vượt hạn mức thì hiện thông báo an toàn.
    if (overLimitCategories.length === 0) {
      // Gán nội dung thông báo không vượt hạn mức.
      this.alertListEL.innerHTML = `<p class="success-alert">Không có danh mục nào vượt hạn mức.</p>`;

      // Dừng hàm.
      return;
    }

    // html là chuỗi chứa các cảnh báo.
    let html = "";

    // Duyệt từng danh mục vượt hạn mức.
    for (let i = 0; i < overLimitCategories.length; i++) {
      // Lấy danh mục hiện tại.
      const category = overLimitCategories[i];

      // Tính số tiền đã chi của danh mục đó.
      const spent = TransactionManager.getCategorySpent(trades, category.id);

      // Thêm một khối cảnh báo vào chuỗi html.
      html += `
        <div class="danger-alert">
          ⚠ Danh mục <strong>${category.title}</strong> đã chi
          <strong>${this.formatMoney(spent)}</strong> / ${this.formatMoney(category.limitMoney)}.
        </div>
      `;
    }

    // Đưa cảnh báo vào giao diện.
    this.alertListEL.innerHTML = html;
  }

  // renderSummary render bảng tổng hợp chi tiêu các tháng.
  public renderSummary(summaryRows: SummaryRow[]): void {
    // Nếu chưa có dữ liệu tháng nào thì hiện dòng trống.
    if (summaryRows.length === 0) {
      // Gán HTML thông báo chưa có dữ liệu tổng hợp.
      this.summaryBodyEL.innerHTML = `
        <tr>
          <td colspan="3" class="empty">Chưa có dữ liệu tổng hợp.</td>
        </tr>
      `;

      // Dừng hàm.
      return;
    }

    // html là chuỗi chứa các dòng summary.
    let html = "";

    // Duyệt từng dòng summary.
    for (let i = 0; i < summaryRows.length; i++) {
      // Lấy dòng summary hiện tại.
      const row = summaryRows[i];

      // Cộng thêm một dòng bảng vào chuỗi html.
      html += `
        <tr>
          <td>${row.monthKey}</td>
          <td class="red">${this.formatMoney(row.totalExpense)}</td>
          <td>${row.tradeCount}</td>
        </tr>
      `;
    }

    // Đưa các dòng summary vào tbody.
    this.summaryBodyEL.innerHTML = html;
  }

  // setCategoryEditMode đổi giao diện form danh mục giữa chế độ thêm và sửa.
  public setCategoryEditMode(isEditMode: boolean): void {
    // Nếu đang sửa thì nút ghi Lưu chỉnh sửa, ngược lại ghi Thêm danh mục.
    this.categorySubmitBtnEL.textContent = isEditMode ? "Lưu chỉnh sửa" : "Thêm danh mục";

    // Ẩn hoặc hiện nút Hủy sửa tùy theo trạng thái sửa.
    this.cancelEditCategoryBtnEL.classList.toggle("hidden", !isEditMode);
  }

  // formatMoney đổi số tiền thành định dạng tiền Việt Nam.
  public formatMoney(value: number): string {
    // Intl.NumberFormat là API có sẵn của JavaScript để format tiền tệ.
    return new Intl.NumberFormat("vi-VN", {
      // style currency nghĩa là định dạng tiền tệ.
      style: "currency",

      // currency VND nghĩa là tiền Việt Nam đồng.
      currency: "VND",

      // maximumFractionDigits = 0 để không hiện số lẻ sau dấu phẩy.
      maximumFractionDigits: 0,
    }).format(value);
  }

  // formatDate đổi ngày từ yyyy-mm-dd sang dd/mm/yyyy.
  private formatDate(dateText: string): string {
    // Tách chuỗi ngày thành year, month, day.
    const [year, month, day] = dateText.split("-");

    // Ghép lại theo định dạng ngày/tháng/năm của Việt Nam.
    return `${day}/${month}/${year}`;
  }

  // getElement lấy element theo selector và kiểm tra null.
  private getElement<T extends Element>(selector: string): T {
    // Tìm element trong HTML bằng document.querySelector.
    const element = document.querySelector<T>(selector);

    // Nếu không tìm thấy element thì ném lỗi.
    if (element === null) {
      // Lỗi này giúp phát hiện sai id hoặc thiếu element trong index.html.
      throw new Error(`Không tìm thấy element: ${selector}`);
    }

    // Trả về element đã tìm thấy.
    return element;
  }
}
