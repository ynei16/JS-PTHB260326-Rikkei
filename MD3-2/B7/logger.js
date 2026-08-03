require('dotenv').config();

let initCount = 0;
initCount++; 

const levels = { info: 1, warn: 2, error: 3 };
const currentLevel = process.env.LOG_LEVEL || 'info';
const currentPriority = levels[currentLevel];

function info(msg) {
    if (levels.info >= currentPriority) console.log(`[INFO] ${msg}`);
}

function warn(msg) {
    if (levels.warn >= currentPriority) console.log(`[WARN] ${msg}`);
}

function error(msg) {
    if (levels.error >= currentPriority) console.log(`[ERROR] ${msg}`);
}

module.exports = { info, warn, error, getInitCount: () => initCount };