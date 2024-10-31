let projectData = {};
const cors = require('cors');
const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/api/weather', async (req, res) => {
    try {
        const zipcode = req.query.zipcode;
        const API_KEY = 'cac7a62561e373f9dc4b5910d40e70ef';
        const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

app.post('/add', (req, res) => {
    const { date, temp, feel } = req.body;
    projectData.date = date;
    projectData.temp = temp;
    projectData.feel = feel;
    res.send(projectData);
});

app.get('/all', (req, res) => {
    res.send(projectData);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
