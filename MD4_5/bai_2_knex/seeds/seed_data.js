exports.seed = async function(knex) {
  await knex('orders').del();
  await knex('users').del();
  
  await knex('users').insert([
    { id: 1, name: 'Alice', email: 'alice@abc.com' },
    { id: 2, name: 'Bob', email: 'bob@abc.com' },
    { id: 3, name: 'Charlie', email: 'char@abc.com' },
    { id: 4, name: 'Dave', email: 'dave@abc.com' },
    { id: 5, name: 'Eve', email: 'eve@abc.com' }
  ]);

  const orders = [];
  for (let i = 1; i <= 15; i++) {
    orders.push({ user_id: (i % 5) + 1, total: Math.floor(Math.random() * 1000) });
  }
  await knex('orders').insert(orders);
};