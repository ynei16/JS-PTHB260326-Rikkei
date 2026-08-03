const EventEmitter = require('events');

class OrderService extends EventEmitter {
    constructor() {
        super();
        
        // Lắng nghe MỖI KHI có sự kiện (in ra email)
        this.on('order:created', (data) => {
            console.log(`[EMAIL] Đã gửi email xác nhận cho đơn hàng #${data.id}`);
        });

        // Lắng nghe CHỈ 1 LẦN DUY NHẤT
        this.once('order:created', () => {
            console.log(`[SYSTEM] Đơn hàng đầu tiên đã được khởi tạo trong hệ thống`);
        });
    }
}

// Test
const service = new OrderService();
service.emit('order:created', { id: 1, total: 100000 });
service.emit('order:created', { id: 2, total: 250000 });
service.emit('order:created', { id: 3, total: 75000 });