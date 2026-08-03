import orderService from './orderService.js';
import { logOrderEvent } from './logger.js';

orderService.on('order:created', (order) => logOrderEvent('created', order));
orderService.on('order:processed', (order) => logOrderEvent('processed', order));

console.log('Hệ thống ESM bắt đầu xử lý...');
orderService.createOrder({ id: 1001, name: 'Bàn phím cơ' });
orderService.createOrder({ id: 1002, name: 'Chuột không dây' });