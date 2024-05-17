import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';

function BookingPage() {
    const { role,userId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetch(`/bookings?page=${page}&limit=20&`+role+"Id="+userId)
            .then(response => response.json())
            .then(({ data, total }) => {
                setBookings(data);
                setHasMore(data.length === 20);
            })
            .catch(error => console.error('Failed to load bookings', error));
    }, [page,role,userId]);

    function handleLoadMore() {
        setPage(prev => prev + 1);
    }

    return (
        <div>
            {bookings.length > 0 ? (
                <ul>
                    {bookings.map((booking) => (
                        <li className='name' key={booking.id}>
                            {role === 'coach' ? dayjs(booking.slot.start_time).format('MMMM DD h:mm A') + " with " + booking.student.name + " : " + booking.student.phone_number : dayjs(booking.slot.start_time).format('MMMM DD h:mm A') + " with Coach " + booking.coach.name + " : " + booking.coach.phone_number}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Nothing booked.</p>
            )}
            {hasMore && <button onClick={handleLoadMore}>Load More</button>}
        </div>
    );
}

export default BookingPage;
