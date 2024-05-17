const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Availability = require('./Availability');

const Booking = sequelize.define('Booking', {
 slotId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'availabilities',
      key: 'id'
    },
    unique: true // Ensures that each slot can only be booked once
  }
}, {
  tableName: 'bookings'
});

Booking.belongsTo(User, { as: 'coach', foreignKey: 'coachId' });
Booking.belongsTo(User, { as: 'student', foreignKey: 'studentId' });
Booking.belongsTo(Availability, { as: 'slot', foreignKey: 'slotId' });

module.exports = Booking;
