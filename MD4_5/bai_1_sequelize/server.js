const express = require('express');
const app = express();
const { sequelize } = require('./models');
const apiRoutes = require('./routes/api');

app.use(express.json());
app.use('/api/v1', apiRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
});