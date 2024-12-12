/* Initialize the data in the DB */
import { pool } from './database.js';

// Function to drop the tables (already provided)
const dropTables = async () => {
    try {
        // Drop reviews table first, then the restaurants table
        const dropReviewsQuery = `DROP TABLE IF EXISTS reviews;`;
        await pool.query(dropReviewsQuery);

        const dropRestaurantsQuery = `DROP TABLE IF EXISTS restaurants;`;
        await pool.query(dropRestaurantsQuery);

        console.log('Tables dropped.');
    } catch (error) {
        console.log('Error dropping tables:', error);
    }
};

// Function to create the restaurants table
const createTables = async () => {
    try {
        // Create the restaurants table
        const createRestaurantsTableQuery = `
            CREATE TABLE IF NOT EXISTS restaurants (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                phone VARCHAR(50),
                address TEXT,
                photo TEXT
            );
        `;
        await pool.query(createRestaurantsTableQuery);
        console.log('restaurants table created.');

        // Create the reviews table
        const createReviewsTableQuery = `
            CREATE TABLE IF NOT EXISTS reviews (
                id SERIAL PRIMARY KEY,
                rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
                content TEXT,
                restaurant_id INTEGER,
                FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
            );
        `;
        await pool.query(createReviewsTableQuery);
        console.log('reviews table created.');
    } catch (error) {
        console.log('Error creating tables:', error);
    }
};


// Function to insert restaurant data
const insertData = async () => {
    try {
        const restaurantData = [
            {
                name: "Restaurant A",
                phone: "(415) 555-5555",
                address: "1234 Market St, San Francisco, CA 94103",
                photo: "https://picsum.photos/150/150"
            },
            {
                name: "Restaurant B",
                phone: "(415) 555-5555",
                address: "5678 Mission St, San Francisco, CA 94110",
                photo: "https://picsum.photos/150/150"
            }
        ];

        // Insert restaurants
        const restaurantIds = [];
        for (const restaurant of restaurantData) {
            const insertRestaurantQuery = `
                INSERT INTO restaurants (name, phone, address, photo)
                VALUES ($1, $2, $3, $4)
                RETURNING id;
            `;
            const { rows } = await pool.query(insertRestaurantQuery, [
                restaurant.name,
                restaurant.phone,
                restaurant.address,
                restaurant.photo
            ]);
            restaurantIds.push(rows[0].id);
            console.log(`Inserted restaurant with ID: ${rows[0].id}`);
        }

        // Insert reviews for Restaurant A and Restaurant B
        const reviewData = [
            { rating: 5, content: "Excellent food!", restaurant_id: restaurantIds[0] },
            { rating: 4, content: "Very good, will return.", restaurant_id: restaurantIds[0] },
            { rating: 3, content: "Average experience.", restaurant_id: restaurantIds[1] },
            { rating: 4, content: "Good service and food.", restaurant_id: restaurantIds[1] }
        ];

        for (const review of reviewData) {
            const insertReviewQuery = `
                INSERT INTO reviews (rating, content, restaurant_id)
                VALUES ($1, $2, $3);
            `;
            await pool.query(insertReviewQuery, [
                review.rating,
                review.content,
                review.restaurant_id
            ]);
            console.log(`Inserted review for restaurant ID: ${review.restaurant_id}`);
        }
    } catch (error) {
        console.log('Error inserting data:', error);
    }
};

// Set up the database: drop tables, create tables, insert data
const setup = async () => {
    await dropTables();    // Drop tables if they exist
    await createTables();  // Create the restaurants table
    await insertData();    // Insert initial data
}

setup();
