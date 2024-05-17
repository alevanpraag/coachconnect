import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

// shows all FUTURE sessions booked for coach/student 
function BookingPage() {
    const { role,userId } = useParams();
    const [bookings, setBookings] = useState([]);

    //get bookings from server
    useEffect(() => {
        fetch(`/bookings?${role}Id=${userId}`)
            .then(response => response.json())
            .then(data => setBookings(data))
            .catch(error => console.error('Failed to load bookings', error));
    }, [role,userId]);

    return (
        <div>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking,index) => (
                        <li className='name' key={index}>
                            {role === 'coach' ? dayjs(booking.slot.start_time).format('MMMM DD h:mm A') + " with " + booking.student.name + " : " + booking.student.phone_number : dayjs(booking.slot.start_time).format('MMMM DD h:mm A') + " with Coach " + booking.coach.name + " : " + booking.coach.phone_number}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nothing booked.</p>
            )}
        </div>
    );
}

export default BookingPage;
