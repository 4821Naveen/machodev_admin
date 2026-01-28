const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL;

console.log('--- Database Connection Probe ---');
console.log('Attempting to connect to:', connectionString ? connectionString.replace(/:[^:@]+@/, ':****@') : 'UNDEFINED');

const pool = new Pool({
    connectionString: connectionString,
});

pool.query('SELECT 1', (err, res) => {
    if (err) {
        console.error('\n[FAILURE] Connection failed!');
        console.error('Error Code:', err.code);
        console.error('Message:', err.message);

        if (err.code === 'ECONNREFUSED') {
            console.log('\nPossible causes:');
            console.log('1. PostgreSQL is not running on this machine.');
            console.log('2. PostgreSQL is running on a different port (not 5432).');
            console.log('3. Your .env file is not being read or DATABASE_URL is incorrect.');
        } else if (err.code === '28P01') {
            console.log('\nPossible cause: Invalid password in DATABASE_URL.');
        } else if (err.code === '3D000') {
            console.log('\nPossible cause: The database specified in DATABASE_URL does not exist.');
        }
    } else {
        console.log('\n[SUCCESS] Connected to database!');
        console.log('Result:', res.rows[0]);
    }
    pool.end();
    process.exit();
});
