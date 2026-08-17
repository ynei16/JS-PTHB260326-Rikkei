const knex = require('knex')(require('./knexfile').development);

async function run() {
  const query = knex('users')
    .select('users.name')
    .select(knex.raw('COUNT(orders.id) as total_orders'))
    .select(knex.raw('SUM(orders.total) as total_spent'))
    .leftJoin('orders', 'users.id', 'orders.user_id')
    .groupBy('users.id')
    .havingRaw('COUNT(orders.id) >= 2')
    .orderBy('total_spent', 'desc')
    .limit(3);

  console.log('SQL Query:', query.toString());
  const results = await query;
  console.table(results);
  process.exit(0);
}
run();