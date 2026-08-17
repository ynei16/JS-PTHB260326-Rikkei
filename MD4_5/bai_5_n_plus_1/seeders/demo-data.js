const { sequelize, Category, Product } = require('../models');

async function seed() {
  await sequelize.sync({ force: true });
  for (let i = 1; i <= 50; i++) {
    const cat = await Category.create({ name: `Category ${i}` });
    const products = Array.from({ length: 10 }).map((_, j) => ({ name: `Prod ${i}-${j}`, categoryId: cat.id }));
    await Product.bulkCreate(products);
  }
  console.log('Seed done');
  process.exit();
}
seed();