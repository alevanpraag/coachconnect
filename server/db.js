const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('coachconnectdb', 'myuser', 'mypassword', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false
});

module.exports = sequelize;