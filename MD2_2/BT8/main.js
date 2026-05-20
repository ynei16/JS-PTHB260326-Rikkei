console.log("Giá trị của message trước khi khai báo:", message);

var message = "Hello";
console.log("Giá trị của message sau khi khai báo:", message);

function testScope() {
  var localVariable = "Tôi ở trong hàm";
  console.log("Truy cập TRONG hàm:", localVariable);
}

testScope();

console.log("Truy cập NGOÀI hàm:", localVariable);
