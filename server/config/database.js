// /* Establish the DB connection pool here. */

// import pg from 'pg';

// const config = {
//     user: 'your_user',
//     host: 'your_host',
//     database: 'your_database',
//     password: 'your_password',
//     port: 5432, // Default port for PostgreSQL
// };

// export const pool = new pg.Pool(config);

// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// // Load environment variables from the .env file
// dotenv.config();

// const connectionString = process.env.CONNECTION_STRING;

// if (!connectionString) {
//     throw new Error('CONNECTION_STRING is not defined in the environment variables');
// }

// // Create a new pool using the connection string
// export const pool = new Pool({
//     connectionString,
//     ssl: {
//         rejectUnauthorized: false, // Enable SSL for secure connections (required by most hosted DBs)
//     },
// });

import pkg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

const { Pool } = pkg; // Extract the Pool class from the default import

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
    throw new Error('CONNECTION_STRING is not defined in the environment variables');
}

// Create a new pool using the connection string
export const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false, // Enable SSL for secure connections (required by most hosted DBs)
    },
});
