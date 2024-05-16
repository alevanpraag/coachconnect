const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Booking = require('./Booking');

const CallHistory = sequelize.define('CallHistory', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  },
  comments: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'call_histories'
});

CallHistory.belongsTo(Booking, { as: 'booking', foreignKey: 'bookingId' });

module.exports = CallHistory;
