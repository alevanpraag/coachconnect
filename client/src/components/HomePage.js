import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import CoachPage from './CoachPage';
import StudentPage from './StudentPage';
import BookingPage from './BookingPage';
import CallHistoryPage from './CallHistoryPage';

//main page for all users with tabs for Bookings, Call History, and to add/reserve slots
export default function HomePage() {
  const {role, userId } = useParams();
  const [value, setValue] = React.useState(0);
  const [name, setName] = useState("");

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <h1 className="name">Hi, {name}</h1>
          {children}
        </Box>
      )}
    </div>
  );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetch(`/users/${userId}`)
    .then(response => response.json())
    .then(data => {setName(data.name)});
  },[userId]);

  return (
      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Home" />
          <Tab label="Availability" />
          <Tab label="Call History" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BookingPage/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      {role === 'coach' ? <CoachPage/>: <StudentPage/>}
      </TabPanel>
      <TabPanel value={value} index={2}>
       <CallHistoryPage/>
      </TabPanel>
    </Box>
  );
}