let inputA = +prompt("Nhập số thứ nhất [A]:");
let phepTinh = +prompt("Nhập phép tính (+, -, *, /):");
let inputB = +prompt("Nhập số thứ hai [B]:");

let ketQua;

if (phepTinh === "+") {
  ketQua = inputA + inputB;
} else if (phepTinh === "-") {
  ketQua = inputA - inputB;
} else if (phepTinh === "*") {
  ketQua = inputA * inputB;
} else if (phepTinh === "/") {
  if (inputB === 0) {
    ketQua = "Không thể chia cho số 0";
  } else {
    ketQua = inputA / inputB;
  }
} else {
  ketQua = "Phép tính không hợp lệ";
}

console.log(
  `Kết quả của [${inputA}] [${phepTinh}] [${inputB}] là: [${ketQua}]`,
);
