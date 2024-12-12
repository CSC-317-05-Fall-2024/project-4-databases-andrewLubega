// /* Establish the DB connection pool here. */

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
