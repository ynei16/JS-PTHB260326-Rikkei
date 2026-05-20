let sum = 0;
let danhSach = "";

for (let i = 1; i <= 50; i++) {
  if (i % 5 === 0) continue;

  sum += i;

  if (sum > 200) break;

  danhSach += i + " ";
}
console.log("Danh sách số:", danhSach);
console.log("Tổng:", sum);
