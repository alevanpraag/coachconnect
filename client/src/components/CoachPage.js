import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function CoachPage(props) {   
    const { userId } = useParams();  // Get the userId from the URL
    const [date, setDate] = React.useState(dayjs());
    const [newAdds, setNewAdds] = useState(0);

    const handleSubmit = () => {
        const availabilityData = {
            coachId: userId,
            start_time: date.toISOString(),
            is_booked: false
        };  
  
      fetch('/availabilities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(availabilityData)})
        .then(setNewAdds(newAdds+1))
        .catch(error => {console.error('Error:', error)});
    };

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
            </Stack>
        </div>
    );
}
