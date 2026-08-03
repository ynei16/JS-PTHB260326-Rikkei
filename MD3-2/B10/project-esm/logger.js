const config = require('./config');

function logOrderEvent(eventName, order) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Đơn hàng #${order.id} - ${eventName}`);
}

module.exports = { logOrderEvent };