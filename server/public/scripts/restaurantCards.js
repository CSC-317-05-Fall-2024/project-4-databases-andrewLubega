/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/
document.addEventListener('DOMContentLoaded', function () {
    const grid = document.querySelector('.restaurant-flex-grid');

    // Fetch restaurant data from the server (via API)
    fetch('/api/restaurants')  // This is the new endpoint for the restaurant data
        .then(response => response.json())
        .then(restaurantData => {
            // Clear any existing content to avoid duplicates
            grid.innerHTML = '';

            // Render the restaurants dynamically
            restaurantData.forEach(restaurant => {
                const restaurantDiv = document.createElement('div');
                restaurantDiv.classList.add('restaurant');
                restaurantDiv.innerHTML = `
                    <img src="${restaurant.photo}" alt="${restaurant.name}">
                    <h4>${restaurant.name}</h4>
                    <p>${restaurant.address}</p>
                    <p>${restaurant.phone}</p>
                    <button class="delete" id="delete-${restaurant.id}">delete</button>
                `;
                grid.appendChild(restaurantDiv);
            });

            // Attach delete handlers
            grid.addEventListener('click', function (event) {
                if (event.target && event.target.classList.contains('delete')) {
                    const button = event.target;
                    const restaurantId = button.id.split('-')[1];
                    console.log(`Deleting restaurant with ID: ${restaurantId}`);
                    
                    fetch(`/api/restaurants/${restaurantId}`, { method: 'DELETE' })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data.message);
                            button.closest('.restaurant').remove(); // Remove card from DOM
                        })
                        .catch(err => console.error('Error:', err));
                }
            });
        })
        .catch(err => console.error('Error fetching restaurant data:', err));
});
