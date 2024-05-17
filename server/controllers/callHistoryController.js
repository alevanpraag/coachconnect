const CallHistory = require('../models/CallHistory');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Availability = require('../models/Availability');

const callHistoryController = {
    getPaginatedCallHistories: async (req, res) => {
    const limit = parseInt(req.query.limit, 10) || 20;
    const page = parseInt(req.query.page, 10) || 0;
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
        const { count, rows } = await CallHistory.findAndCountAll({
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
                where: whereConditions // Apply the constructed where conditions
            }],
            limit: limit,
            offset: page * limit,
            order: [
                [{ model: Booking, as: 'booking' }, { model: Availability, as: 'slot' }, 'start_time', 'DESC']
            ]
        });

        res.json({ data: rows, total: count });
    } catch (error) {
        console.error('Failed to fetch call histories', error);
        res.status(500).json({ message: 'Error fetching call histories', error: error.message });
    }
},

    // Create a new booking
    createCallHistory: async (req, res) => {

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
};


module.exports = callHistoryController;