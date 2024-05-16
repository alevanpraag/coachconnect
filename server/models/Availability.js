const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');

const Availability = sequelize.define('Availability', {
  start_time: {
    type: DataTypes.DATE,
    allowNull: false
  },
  is_booked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  coachId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
          model: User,
          key: 'id'
      }
  }

}, {
  tableName: 'availabilities'
});

User.hasMany(Availability, { foreignKey: 'coachId', as: 'availabilities' });
Availability.belongsTo(User, { foreignKey: 'coachId', as: 'coach' });

module.exports = Availability;
