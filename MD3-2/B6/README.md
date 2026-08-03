### Dự đoán
Thứ tự output sẽ là:
1. A: Bắt đầu
2. B: Kết thúc đồng bộ
3. nextTick
4. Promise
5. setTimeout 0
6. setImmediate

### Kết quả thực tế
A: Bắt đầu
B: Kết thúc đồng bộ
nextTick
Promise
setTimeout 0
setImmediate

### Giải thích cơ chế Event Loop
1. Code đồng bộ chạy trước tiên trong Call Stack (`A` và `B`).
2. Sau khi Call Stack trống, Node.js ưu tiên chạy **Microtask Queue**. Trong đó, hàng đợi của `process.nextTick` có độ ưu tiên cao nhất, sau đó mới đến `.then()` của `Promise`. Do đó `nextTick` in ra trước `Promise`.
3. Cuối cùng, Node.js chuyển sang **Macrotask Queue** (Timer phase và Check phase). `setTimeout` chạy trong Timer phase trước khi đến `setImmediate` ở Check phase.