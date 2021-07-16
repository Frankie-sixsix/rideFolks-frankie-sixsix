require('dotenv').config();
const {Pool} = require('pg');
let pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: False 
    }
});

module.exports = pool;