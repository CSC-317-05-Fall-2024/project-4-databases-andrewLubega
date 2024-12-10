// Fill this in
let restaurantData = [
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

let lastId = restaurantData.length;

const getNextId = () => {
    lastId += 1;
    return lastId;
}

// Get a list of restaurants
const getRestaurants = () => {
    return restaurantData;
};


// Get a restaurant by id
const getRestaurant = (id) => {
    return restaurantData.find(restaurantData => restaurantData.id === id);
};

// Create a new restaurant entry
const createRestaurant = (data) => {
    const newRestaurant = {
        id: getNextId(),  // Ensure the ID is generated correctly
        ...data,
    };
    restaurantData.push(newRestaurant);
    return newRestaurant;
};


// Delete a restaurant by id
const deleteRestaurant = (id) => {
    const restaurantToDelete = restaurantData.find(restaurantData => restaurantData.id === id);
    if(!restaurantToDelete){
        throw Error(`Restaurant ${id} not found!`);
    }
    restaurantData = restaurantData.filter(restaurant => restaurant.id !== id);
    return restaurantToDelete;
};

export { getRestaurants, getRestaurant, createRestaurant, deleteRestaurant };