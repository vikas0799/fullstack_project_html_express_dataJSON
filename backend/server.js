const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Read data from JSON file on startup
let data = [];
try {
    const rawData = fs.readFileSync('data.json');
    data = JSON.parse(rawData);
} catch (error) {
    console.error('Error reading data.json:', error);
    data = []; // Initialize to an empty array if there's an error
}

// Root route
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html'); // Serve index.html
});

// API endpoint to read data
app.get('/data', (req, res) => {
    res.json(data);
});

// API endpoint to store data
app.post('/data', (req, res) => {
    console.log(req.body);  // Corrected this line

    const newData = req.body;
    data.push(newData);

    // Write updated data to data.json
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json({ message: 'Data stored successfully' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});
