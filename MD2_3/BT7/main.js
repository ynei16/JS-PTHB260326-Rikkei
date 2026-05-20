let luong = +prompt("Nhập mức lương (triệu):");
let tuoi = +prompt("Nhập số tuổi:");
let noXau = prompt("Có nợ xấu không? (Yes/No)");


if (luong > 15 && tuoi >= 18 && tuoi <= 60 && noXau.toLowerCase() === "no") {
  alert("Chúc mừng! Bạn đủ điều kiện vay vốn.");
} else {
  alert("Rất tiếc, bạn không đủ điều kiện.");
}
