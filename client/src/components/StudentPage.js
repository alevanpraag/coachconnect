import React, { useEffect, useState, useCallback } from "react";
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Button} from '@mui/material';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function StudentPage(props) {   
    const { userId } = useParams();  // Get the userId from the URL
    const [date, setDate] = React.useState(dayjs());
    const [times, setTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [timeSelected, setTimeSelected] = useState(null);

    const fetchAvailabilities = useCallback(() => {
        setLoading(true);
        fetch(`/availabilities/by-day?date=${date.toISOString()}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setTimes(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching times:', error);
                setError(error.toString());
                setLoading(false);
            });
        }, [date]);

    const handleSubmit = async () => {
        if (!timeSelected) return;
    
        const bookingData = {
            coachId: timeSelected.coachId,
            studentId: userId,
            slotId: timeSelected.id
        };
    
        try {
            // Attempt to create a new booking
            const bookingResponse = await fetch('/bookings', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(bookingData)
            });
    
            if (!bookingResponse.ok) {
                throw new Error(`Booking failed with status: ${bookingResponse.status}`);
            }
    
            alert('Booking successful!');
    
            // Update the availability status
            const availabilityData = { is_booked: true };
            const availabilityResponse = await fetch(`/availabilities/${timeSelected.id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(availabilityData)
            });
    
            if (!availabilityResponse.ok) {
                throw new Error(`Updating availability failed with status: ${availabilityResponse.status}`);
            }
    
        } catch (error) {
            console.error('Error during booking process:', error);
            alert(`Booking process failed: ${error.message}`);
        } finally {
            fetchAvailabilities();
            setTimeSelected(null);
        }
    };
        

    const availabilityView = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>{error}</p>;
        return times.length > 0 ? <AvailabilityList times={times} /> : <p>No times available</p>;
    };

    const AvailabilityList = ({ times }) => (
        <ul className="times-grid">
            {times.map((item) => (
                <Button
                    key={item.id}
                    className="timeSlot"
                    startIcon={<AccessTimeIcon />}
                    onClick={() => setTimeSelected(item)} // Pass the item ID to the handler
                    fullWidth
                    variant={item === timeSelected ? 'contained' : 'outlined'}
                >
                    {`${dayjs(item.start_time).format('h:mm A')}`}
                </Button>
            ))}
        </ul>
    );

    const confirmTimeView = () => {
        return (
            <>
            <h3 className="name"> 1:1 with {timeSelected.coach.name} at {dayjs(timeSelected.start_time).format('h:mm A')}</h3>
            <Button variant='contained' onClick={()=> handleSubmit()}> Book </Button>
            </>
        );
    };

    useEffect(() => {
        fetchAvailabilities();
    }, [fetchAvailabilities,date]);
    
    return (
        <div >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                    value={date}
                    onChange={(newDate) => {setDate(newDate); setTimeSelected(null)}}
                />
            </LocalizationProvider>
            <Stack spacing={2} direction="column" className="middle">
            <h2> {dayjs(date).format('MMMM DD')} Availability: </h2>
                {availabilityView()}
                {timeSelected == null ? null : confirmTimeView()}
            </Stack>
            
        </div>
    );
}
