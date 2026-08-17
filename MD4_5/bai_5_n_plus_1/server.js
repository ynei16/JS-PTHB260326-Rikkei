const express = require('express');
const { Category, Product } = require('./models');
const app = express();

const queryMonitor = (req, res, next) => {
  req.queryCount = 0;
  const start = Date.now();
  req.sqlLogger = () => { req.queryCount++; };
  
  const originalJson = res.json;
  res.json = function(data) {
    if (data && typeof data === 'object') {
      data.meta = { queryCount: req.queryCount, durationMs: Date.now() - start };
    }
    originalJson.call(this, data);
  };
  next();
};

app.use(queryMonitor);

app.get('/api/v1/report/slow', async (req, res) => {
  const categories = await Category.findAll({ logging: req.sqlLogger });
  const result = [];
  for (const cat of categories) {
    const products = await cat.getProducts({ logging: req.sqlLogger });
    result.push({ ...cat.toJSON(), products });
  }
  res.json({ success: true, data: result });
});

app.get('/api/v1/report/fast', async (req, res) => {
  const categories = await Category.findAll({
    include: [{ model: Product }], logging: req.sqlLogger
  });
  res.json({ success: true, data: categories });
});

app.listen(3000, () => console.log('App running port 3000'));