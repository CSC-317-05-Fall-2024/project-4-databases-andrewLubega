// routes/api.js
import express from 'express';
import { createRestaurant, getRestaurants, getRestaurant, deleteRestaurant, getReviewsForRestaurant } from '../data/restaurants.js'; // Import functions

const router = express.Router();

// Get all restaurants
router.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants();
        res.json( restaurants );
    } catch (error) {
        res.status(500).send('Error fetching restaurants');
    }
});

// Get a single restaurant by ID
router.get('/restaurants/:id', async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10);
    try {
        const restaurant = await getRestaurant(restaurantId);
        const reviews = await getReviewsForRestaurant(restaurantId); // Fetch reviews for the restaurant
        
        if (restaurant) {
            res.render('restaurant-details', { 
                restaurant: restaurant, 
                reviews: reviews // Pass reviews to the template
            });
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        res.status(500).send('Error fetching restaurant details');
    }
});

// Create a new restaurant (form submission)
router.post('/restaurants', async (req, res) => {
    console.log('Received form data:', req.body);
    const { name, phone, address, photo } = req.body;

    try {
        const newRestaurantId = await createRestaurant({ name, phone, address, photo });
        console.log('Created new restaurant with ID:', newRestaurantId);
        res.redirect(`/restaurants/${newRestaurantId}`);
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).send('Error creating restaurant');
    }
});


// Delete a restaurant
router.delete('/restaurants/:id', async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10);

    try {
        const deletedRestaurant = await deleteRestaurant(restaurantId);
        res.status(200).json({ message: 'Restaurant deleted successfully', restaurant: deletedRestaurant });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting restaurant' });
    }
});

export { router as backendRouter };

