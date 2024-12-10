/* Initialize the data in the DB */
import { pool } from './database.js';

// Function to drop the tables (already provided)
const dropTables = async () => {
    try {
        const dropTablesQuery = `
            DROP TABLE IF EXISTS restaurants;
        `;
        await pool.query(dropTablesQuery);
    } catch (error) {
        console.log('Error dropping tables:', error);
    }
}

// Function to create the restaurants table
const createTables = async () => {
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                address TEXT,
                photo VARCHAR(255)
            );
        `;
        await pool.query(createTableQuery);
        console.log('restaurants table created.');
    } catch (error) {
        console.log('Error creating tables:', error);
    }
}

// Function to insert restaurant data
const insertData = async () => {
    try {
        const restaurantData = [
            {
                id: 0,
                name: "My Restaurant",
                phone: "(415) 555-5555",
                address: "1600 Holloway Ave, San Francisco, CA 94132",
                photo: "https://picsum.photos/150/150" 
            },
            {
                id: 1,
                name: "My Restaurant",
                phone: "(415) 555-5555",
                address: "1600 Holloway Ave, San Francisco, CA 94132",
                photo: "https://picsum.photos/150/150" 
            },
            {
                id: 2,
                name: "My Restaurant",
                phone: "(415) 555-5555",
                address: "1600 Holloway Ave, San Francisco, CA 94132",
                photo: "https://picsum.photos/150/150" 
            },
        ];

        for (const restaurant of restaurantData) {
            const insertQuery = `
                INSERT INTO restaurants (name, phone, address, photo)
                VALUES ($1, $2, $3, $4)
                RETURNING id;
            `;
            const { rows } = await pool.query(insertQuery, [
                restaurant.name,
                restaurant.phone,
                restaurant.address,
                restaurant.photo
            ]);
            console.log(`Inserted restaurant with ID: ${rows[0].id}`);
        }
    } catch (error) {
        console.log('Error inserting data:', error);
    }
}

// Set up the database: drop tables, create tables, insert data
const setup = async () => {
    await dropTables();    // Drop tables if they exist
    await createTables();  // Create the restaurants table
    await insertData();    // Insert initial data
}

setup();
