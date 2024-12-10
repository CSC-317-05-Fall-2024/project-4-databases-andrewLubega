// /* Establish the DB connection pool here. */

import pg from 'pg';

const config = {
    user: 'your_user',
    host: 'your_host',
    database: 'your_database',
    password: 'your_password',
    port: 5432, // Default port for PostgreSQL
};

export const pool = new pg.Pool(config);
