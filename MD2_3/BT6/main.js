let w = +prompt("Nhập chiều rộng (w):");
let h = +prompt("Nhập chiều cao (h):");
let result = "";

for (let i = 0; i < h; i++) {
  for (let j = 0; j < w; j++) {
    result += "* ";
  }
  result += "\n";
}
console.log(result);
