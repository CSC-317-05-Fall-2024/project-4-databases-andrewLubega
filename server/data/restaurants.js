import { pool } from './database.js'; // Import the database connection

// Get all restaurants
const getRestaurants = async () => {
    try {
        const result = await pool.query('SELECT * FROM restaurants');
        return result.rows; // Returns an array of restaurants
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        throw error;
    }
};

// Get a restaurant by ID
const getRestaurant = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM restaurants WHERE id = $1', [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching restaurant:', error);
        throw error;
    }
};

// Create a new restaurant entry
const createRestaurant = async (newRestaurant) => {
    const { name, phone, address, photo } = newRestaurant;
    try {
        const result = await pool.query(
            'INSERT INTO restaurants (name, phone, address, photo) VALUES ($1, $2, $3, $4) RETURNING id',
            [name, phone, address, photo]
        );
        return result.rows[0].id;
    } catch (error) {
        console.error('Error creating restaurant:', error);
        throw error;
    }
};

// Delete a restaurant by ID
const deleteRestaurant = async (id) => {
    try {
        const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            throw new Error('Restaurant not found');
        }
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        throw error;
    }
};

// gets reviews for restaurant
const getReviewsForRestaurant = async (id) => {
    try {
        const result = await pool.query('SELECT * FROM reviews WHERE restaurant_id = $1', [id]);
        return result.rows; // Returns an array of reviews
    } catch (error) {
        console.error('Error fetching reviews:', error);
        throw error;
    }
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant, getReviewsForRestaurant };
