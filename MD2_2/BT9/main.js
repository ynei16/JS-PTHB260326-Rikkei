const ADMIN_USER = "admin";
const ADMIN_PASS = "123456";

let inputUser = prompt("Nhập Username:");
let inputPass = prompt("Nhập Password:");

if (inputUser === ADMIN_USER && inputPass === ADMIN_PASS) {
  alert("Đăng nhập thành công!");
  console.log("Kết quả đăng nhập: Đúng");
} else {
  alert("Đăng nhập thất bại! Sai tài khoản hoặc mật khẩu.");
  console.log("Kết quả đăng nhập: Sai");
}
