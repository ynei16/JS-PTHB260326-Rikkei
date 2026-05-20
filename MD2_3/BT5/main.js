let number;
do {
  number = +prompt("Nhập một số từ 1 đến 10:");
} while (number < 1 || number > 10);

alert("Số hợp lệ bạn đã nhập là: " + number);
