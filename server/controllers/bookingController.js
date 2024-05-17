const Booking = require('../models/Booking');
const User = require('../models/User');
const Availability = require('../models/Availability');
const { Op } = require('sequelize');

const bookingController = {
    //get future
    getFutureBookings: async (req, res) => {
    const coachId = req.query.coachId;
    const studentId = req.query.studentId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const whereConditions = {};

    if (coachId) {
        whereConditions['$coach.id$'] = coachId; 
    }

    if (studentId) {
        whereConditions['$student.id$'] = studentId;
    }

    whereConditions['$slot.start_time$'] = { [Op.gte]: today };

    try {
        const bookings = await Booking.findAll({
            include: [{
                model: User,
                as: 'coach',
                required: coachId ? true : false,
                attributes: ['name', 'phone_number'],
            }, {
                model: User,
                as: 'student',
                required: studentId ? true : false,
                attributes: ['name', 'phone_number'],
            }, {
                model: Availability,
                as: 'slot',
                required: true,
                attributes: ['start_time']
            }],
            where: whereConditions,
            order: [
                [ { model: Availability, as: 'slot' }, 'start_time', 'ASC']
            ]
        });

        res.json(bookings);
    } catch (error) {
        console.error('Failed to fetch call histories', error);
        res.status(500).json({ message: 'Error fetching call histories', error: error.message });
    }
    },
      
    // Create a new booking
    createBooking: async (req, res) => {

    try {
        const { coachId, studentId, slotId } = req.body;
        const booking = await Booking.create({
            coachId: coachId,
            studentId: studentId,
            slotId: slotId
        });

        return res.status(201).json({
            message: 'Booking successfully created',
            booking: booking
        });
    } catch (error) {
        console.error('Error creating booking', error);
        return res.status(500).json({ message: 'Error creating booking', error: error.message });
    }
    }
}

module.exports = bookingController;

