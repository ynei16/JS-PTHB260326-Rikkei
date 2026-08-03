import config from './config.js';

export function logOrderEvent(eventName, order) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Đơn hàng #${order.id} - ${eventName}`);
}