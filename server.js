const express = require('express');
const { initDB } = require('./src/config/db');
const recordRoutes = require('./src/routes/recordRoutes');
const dashboardRoutes = require('./src/routes/dashboardRoutes'); // 1. Make sure this is imported!
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static('public'));
initDB();

// Register the routes
app.use('/api/records', recordRoutes);
app.use('/api/dashboard', dashboardRoutes); // 2. Make sure this line exists!

app.get('/', (req, res) => {
    res.send('Finance Backend is running!');
});

app.listen(3000, () => {
    console.log(`Server is sprinting on http://localhost:3000`);
});