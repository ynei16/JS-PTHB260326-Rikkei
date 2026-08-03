const EventEmitter = require('events');

class NotificationCenter extends EventEmitter {
    constructor() {
        super();
        
        // Xử lý sự kiện lỗi đặc biệt của EventEmitter để tránh crash
        this.on('error', (err) => {
            console.error(`[CRITICAL ERROR BẮT ĐƯỢC] ${err.message}`);
        });

        // --- SỰ KIỆN 1: user:registered ---
        this.on('user:registered', (user) => {
            console.log(`[WELCOME] Gửi email chào mừng tới ${user.email}`);
        });
        this.on('user:registered', (user) => {
            console.log(`[DB] Đã lưu thông tin user ${user.name} vào database`);
        });

        // --- SỰ KIỆN 2: order:created ---
        this.on('order:created', (data) => {
            console.log(`[EMAIL] Gửi xác nhận đơn #${data.id}`);
        });
        this.on('order:created', (data) => {
            console.log(`[STATS] Cập nhật doanh thu: +${data.total}`);
        });

        // --- SỰ KIỆN 3: order:cancelled ---
        this.on('order:cancelled', (data) => {
            try {
                if (data.total > 1000000) {
                    throw new Error(`Cảnh báo: Đơn hàng #${data.id} huỷ có giá trị quá lớn (${data.total})!`);
                }
                console.log(`[REFUND] Đang xử lý hoàn tiền cho đơn #${data.id}`);
            } catch (err) {
                // Ném lỗi vào luồng error của EventEmitter
                this.emit('error', err);
            }
        });
        this.on('order:cancelled', (data) => {
            console.log(`[WAREHOUSE] Đã cộng lại số lượng hàng vào kho cho đơn #${data.id}`);
        });
    }
}

// === KỊCH BẢN TEST ===
const center = new NotificationCenter();

console.log("1. Emit user:registered");
center.emit('user:registered', { name: 'Alice', email: 'alice@abc.com' });

console.log("\n2. Emit order:created");
center.emit('order:created', { id: 101, total: 500000 });

console.log("\n3. Emit order:cancelled (Bình thường)");
center.emit('order:cancelled', { id: 101, total: 500000 });

console.log("\n4. Emit order:cancelled (Gây lỗi > 1 triệu)");
center.emit('order:cancelled', { id: 102, total: 2500000 });

console.log("\n5. Emit order:created (Chứng minh app chưa bị crash)");
center.emit('order:created', { id: 103, total: 300000 });