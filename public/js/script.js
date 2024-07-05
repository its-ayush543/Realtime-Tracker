const socket = io();


const map = L.map('map').setView([0, 0], 20);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


const marker = L.marker([51.505, -0.09]).addTo(map);


socket.on('receive-location', function(data) {
    const { lat, lng } = data;
    
    marker.setLatLng([lat, lng]);
    
    map.setView([lat, lng], 13);
});


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


setInterval(sendLocation, 5000);
