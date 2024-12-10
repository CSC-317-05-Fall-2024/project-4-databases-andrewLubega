import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {getRestaurants} from "./data/restaurants.js";
import {backendRouter} from "./routes/api.js"
import { pool } from './config/database.js';
import { getRestaurant, getReviewsForRestaurant } from './data/restaurants.js';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//set view engine
//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Mount the API router at the /api prefix
app.use('/api', backendRouter);

//middleware to handle errors centrall
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Centralized error handler
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err);
    res.status(err.status || 500).send(err.message || 'Server Error');
});


//index.html route 
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//attractions route 
app.get('/attractions', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'attractions.html'));
});

// restaurant form route
app.get('/form', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'restaurant_form.html'));
});

// Delete restaurant data
app.delete('/api/restaurants/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        const result = await pool.query('DELETE FROM restaurants WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length > 0) {
            res.status(200).json({ message: 'Restaurant deleted successfully' });
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).send('Server Error');
    }
});


//restaurants route rendering ejs template with restaurantData
app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await getRestaurants(); // Fetch restaurants data
        res.json(restaurants); // Respond with JSON data
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).send('Server Error'); // Return a 500 error
    }
});



// Get a restaurant by ID and render the details page
app.get('/restaurants/:id', async (req, res) => {
    const restaurantId = parseInt(req.params.id, 10);
    try {
        const restaurant = await getRestaurant(restaurantId);
        const reviews = await getReviewsForRestaurant(restaurantId);

        if (restaurant) {
            res.render('restaurant-details', { restaurant, reviews });
        } else {
            res.status(404).send('Restaurant not found');
        }
    } catch (error) {
        console.error('Error fetching restaurant details:', error);
        res.status(500).send('Server Error'); // Logs the error in the console and sends a 500 response
    }
});





// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
