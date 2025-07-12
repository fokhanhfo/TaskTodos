const knex = require('knex') ({
    client: 'mysql2',
    // debug: true,
    connection: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'Lev_test_db'
    }
})

module.exports = knex
