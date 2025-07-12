module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'Lev_test_db',
      port: 3306
    },
    migrations: {
      directory: './migrations'
    }
  }
};
