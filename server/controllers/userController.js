const User = require('../models/User');

const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving users', error: error.message });
    }
  },

  // Get a single user by id
  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error finding user', error: error.message });
    }
  },

  // Create a new user
  createUser: async (req, res) => {
    try {
      const { name, phone_number, is_coach } = req.body;
      const newUser = await User.create({ name, phone_number, is_coach });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
  }

};

module.exports = userController;
