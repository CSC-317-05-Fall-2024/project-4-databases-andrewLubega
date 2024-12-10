// routes/api.js
import express from 'express';
import { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant } from '../data/restaurants.js'; // Import the functions

const router = express.Router();

// Get a list of all restaurants
router.get('/restaurants', (req, res) => {
    res.json(getRestaurants()); // Serve all restaurants as JSON
});

// Get a specific restaurant by ID
router.get('/restaurants/:id', (req, res) => {
    const restaurantId = parseInt(req.params.id, 10);
    const restaurant = getRestaurant(restaurantId); // Fetch the restaurant by ID

    if (restaurant) {
        res.json(restaurant); // Return the restaurant details as JSON
    } else {
        res.status(404).json({ message: 'Restaurant not found' }); // Return an error if not found
    }
});

// POST endpoint to create a new restaurant
router.post('/restaurants', express.json(), (req, res) => {
    const newRestaurant = req.body; // Assuming the body is JSON
    if (newRestaurant && newRestaurant.name && newRestaurant.phone && newRestaurant.address && newRestaurant.photo) {
        const createdRestaurant = createRestaurant(newRestaurant); // Backend assigns ID
        res.status(201).json(createdRestaurant);
    } else {
        res.status(400).json({ message: 'Invalid restaurant data' });
    }
});


// Delete a restaurant by ID
router.delete('/restaurants/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const deletedRestaurant = deleteRestaurant(id); // Delete the restaurant
        res.status(200).json({ message: 'Restaurant deleted successfully', deletedRestaurant });
    } catch (err) {
        res.status(404).json({ message: err.message }); // Handle the case where the restaurant is not found
    }
});

export { router as backendRouter };
