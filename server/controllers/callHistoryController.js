const CallHistory = require('../models/CallHistory');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Availability = require('../models/Availability');

const callHistoryController = {
    getCallHistories: async (req, res) => {
    const coachId = req.query.coachId;
    const studentId = req.query.studentId;

    const whereConditions = {};

    if (coachId) {
        whereConditions['$booking.coachId$'] = coachId;  // Use dollar signs to denote nested where
    }

    if (studentId) {
        whereConditions['$booking.studentId$'] = studentId;
    }

    try {
        const history = await CallHistory.findAll({
            include: [{
                model: Booking,
                as: 'booking',
                include: [{
                    model: User,
                    as: 'coach'
                }, {
                    model: User,
                    as: 'student'
                }, {
                    model: Availability,
                    as: 'slot'
                }],
                where: whereConditions
            }],
            order: [
                [{ model: Booking, as: 'booking' }, { model: Availability, as: 'slot' }, 'start_time', 'DESC']
            ]
        });

        res.json(history);
    } catch (error) {
        console.error('Failed to fetch call histories', error);
        res.status(500).json({ message: 'Error fetching call histories', error: error.message });
    }
},

    // Create a new booking
    createCallHistory: async (req, res) => {

        try {
            const { rating, comments, bookingId } = req.body;
            const newCallHistory = await CallHistory.create({
                rating,
                comments,
                bookingId
              });
    
            return res.status(201).json({
                message: "Call history created successfully.",
                callHistory: newCallHistory
            });
        } catch (error) {
            console.error('Error creating booking', error);
            return res.status(500).json({ message: 'Error creating booking', error: error.message });
        }
        }
};


module.exports = callHistoryController;