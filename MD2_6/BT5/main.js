function sumAllNumbers(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumAllNumbers(1, 2, 3)); // 6
console.log(sumAllNumbers(10, 20, 30, 40)); // 100
