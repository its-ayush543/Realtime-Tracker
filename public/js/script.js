const socket = io();

// Initialize the map and set its view to the chosen geographical coordinates and zoom level
const map = L.map('map').setView([0, 0], 20);

// Load and display tile layer on the map (these tiles are open-source and free to use)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a marker and add it to the map
const marker = L.marker([51.505, -0.09]).addTo(map);

// Function to handle receiving location updates from the server
socket.on('receive-location', function(data) {
    const { lat, lng } = data;
    // Update marker position
    marker.setLatLng([lat, lng]);
    // Center the map to the marker's new position
    map.setView([lat, lng], 13);
});

// Example of sending location data to the server
function sendLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            socket.emit('send-location', { lat: latitude, lng: longitude });
        });
    } else {
        alert('Geolocation is not supported by your browser');
    }
}

// Call the sendLocation function every 5 seconds to simulate real-time tracking
setInterval(sendLocation, 5000);