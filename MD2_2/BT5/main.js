let numberA = 5;
let stringB = "5";

let compareNormal = numberA == stringB;
console.log("Kết quả so sánh bằng == :", compareNormal); // Kết quả: true

let compareStrict = numberA === stringB;
console.log("Kết quả so sánh bằng === :", compareStrict); // Kết quả: false

let userConfirm = confirm("Bạn đã hiểu bài chưa?");
console.log("Câu trả lời của người dùng:", userConfirm);
