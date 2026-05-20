let n = +prompt("Nhập một số nguyên:");
let isPrime = true;

if (n < 2) {
  isPrime = false;
} else {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      isPrime = false;
      break;
    }
  }
}

if (isPrime) alert(n + " là số nguyên tố");
else alert(n + " không phải số nguyên tố");
