const express = require('express');
const sequelize = require('./db');

const app = express();
const PORT = 5001;

app.use(express.json());

app.get("/",(req,res) => {
    res.json({"hello": "world"})
});

sequelize.authenticate().then(() => {
    console.log('Connection to the database has been established successfully.');
    return sequelize.sync();
}).then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});