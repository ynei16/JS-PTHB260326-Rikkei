const prices = [100, 200, 300, 400];

const totalPrice = prices.reduce((sum, current) => sum + current, 0);
const finalPrice = totalPrice * 1.1; // VAT 10%

console.log("Tổng:", totalPrice);
console.log("Tổng thanh toán (VAT 10%):", finalPrice);
