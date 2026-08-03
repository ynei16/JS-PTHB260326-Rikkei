import config from './config.js';

export function logOrderEvent(eventName, order) {
    const timestamp = new Date().toISOString();
    // VD: [2024-01-01T12:00:00.000Z] Đơn hàng #1 - created
    console.log(`[${timestamp}] Đơn hàng #${order.id} - ${eventName}`);
}