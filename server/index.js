const express = require('express');
const sequelize = require('./db');

const app = express();
const PORT = 5001;

app.use(express.json());

// Import route modules
const userRoutes = require('./routes/userRoutes');
const availabilityRoutes = require('./routes/availabilityRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

// Use route modules
app.use('/users', userRoutes);
app.use('/availabilities', availabilityRoutes);
app.use('/bookings', bookingRoutes);

sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync();
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});