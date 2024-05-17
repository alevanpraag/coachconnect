import React, { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// Coach view for adding availability to calendar for students to book
export default function CoachPage(props) {   
    const { userId } = useParams();  // Get the userId from the URL
    const [date, setDate] = React.useState(dayjs());
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchAvailabilities = useCallback(() => {
        fetch("/availabilities/by-day?coachId=" + userId + "&date=" +date.toISOString())
            .then(response => response.json())
            .then(data => {
                setTimes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching times:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [date,userId]);

    //adds availability to database
    const handleSubmit = () => {
        const availabilityData = {
            coachId: userId,
            start_time: date.toISOString(),
            is_booked: false
        };
    
        fetch('/availabilities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(availabilityData)
        })
        .then(response => response.json())
        .then(data => fetchAvailabilities())
        .catch(error => console.error('Error:', error));
    };

    const availabilityView = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        return times.length > 0 ? <AvailabilityList times={times} /> : <p>No times available</p>;
    };

    const AvailabilityList = ({ times }) => (
        <ul className="times-grid">
            {times.map((item) => (
                <li className="timeSlot" key={item.id}>
                    {dayjs(item.start_time).format('h:mm A')} - {item.is_booked ? 'Booked' : 'Available'}
                </li>
            ))}
        </ul>
    );

    useEffect(() => {
        fetchAvailabilities();
    }, [fetchAvailabilities,date,userId]); 

    return (
        <div className="center">
            <Stack spacing={2} direction="column">
                <Stack spacing={2} direction="row" className="middle">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={date}
                            onChange={(newDate) => setDate(newDate)}
                        />
                        <TimePicker
                            label="Choose a time"
                            value={date}
                            onChange={(newTime) => setDate(newTime)}
                        />
                    </LocalizationProvider>
                </Stack>
                <Button variant="contained" onClick={handleSubmit}> Add Availability </Button>
                <h2> {dayjs(date).format('MMMM DD')} Availability: </h2>
                {availabilityView()}
            </Stack>
        </div>
    );
}
