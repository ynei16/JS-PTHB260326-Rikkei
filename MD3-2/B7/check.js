require('./app1');
require('./app2');
require('./app3');
const logger = require('./logger');

console.log(`Số lần module logger.js được khởi tạo (initCount): ${logger.getInitCount()}`);
