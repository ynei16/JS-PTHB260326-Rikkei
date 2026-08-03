import 'dotenv/config';

export default {
    PROCESSING_DELAY_MS: parseInt(process.env.PROCESSING_DELAY_MS || 2000),
    LOG_TIMEZONE: process.env.LOG_TIMEZONE || 'UTC'
};