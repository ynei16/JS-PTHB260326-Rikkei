const express = require('express');
const { sequelize } = require('./models');
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.json());
app.use('/api/v1', apiRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('App running port 3000'));
});