const Availability = require('../models/Availability');
const User = require('../models/User');

const availabilityController = {
  // Get all availabilities
  getAllAvailabilities: async (req, res) => {
    try {
      const availabilities = await Availability.findAll();
      res.status(200).json(availabilities);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  // Create a new availability
  createAvailability: async (req, res) => {
    try {
      const { coachId, start_time, is_booked } = req.body;
      const newAvailability = await Availability.create({ coachId, start_time, is_booked });
      res.status(201).json(newAvailability);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  //update availability
  updateAvailability: async (req, res) => {
    try {
      const { is_booked } = req.body;
      const [updated] = await Availability.update({ is_booked }, { where: { id: req.params.id } });
      if (updated) {
        res.status(200).json({ message: "Availability updated" });
      } else {
        res.status(404).send('Availability not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};

module.exports = availabilityController;
