/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'mysql2', 
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',          
      password: '',   
      database: 'md4_5_knex'  
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  }
};