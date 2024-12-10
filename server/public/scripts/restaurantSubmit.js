document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form'); // Get the form element

    // Prevent multiple event listeners from being attached
    if (form) {
        form.addEventListener('submit', handleSubmit); // Attach the event handler
    }

    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const resName = document.getElementById('resName').value;
        const resPhoneNum = document.getElementById('resPhoneNum').value;
        const resAddy = document.getElementById('resAddy').value;
        const resPhoto = document.getElementById('resPhoto').value;

        // Create the restaurant object (id will be generated on the backend)
        const newRestaurant = {
            name: resName,
            phone: resPhoneNum,
            address: resAddy,
            photo: resPhoto,
        };

        // Log the data to ensure it is being captured correctly
        console.log('New Restaurant Data:', newRestaurant);

        // Make a POST request to the API to create the restaurant
        fetch('/api/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRestaurant),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to create restaurant');
            }
        })
        .then(data => {
            console.log('Restaurant created successfully:', data);
            // Optionally redirect to the restaurants page
            window.location.href = '/restaurants'; // Ensure this is a full page refresh
        })
        .catch(err => {
            console.error('Error creating restaurant:', err);
        });
    }
});
