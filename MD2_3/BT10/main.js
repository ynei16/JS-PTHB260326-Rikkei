let target = Math.floor(Math.random() * 100) + 1;
let guess;
let lives = 5;

for (let i = 1; i <= lives; i++) {
  guess = +prompt("Lần " + i + ": Nhập số bạn đoán (1-100):");

  if (guess === target) {
    alert("Chúc mừng! Bạn đã đoán đúng.");
    break;
  } else if (guess > target) {
    alert("Số bạn đoán quá lớn.");
  } else {
    alert("Số bạn đoán quá nhỏ.");
  }

  if (i === lives) {
    alert("Game Over! Đáp án là: " + target);
  }
}
