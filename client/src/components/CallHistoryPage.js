import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// shows all call histories of student/coach
function CallHistoryPage() {
    const { role,userId } = useParams();  // Get the userId from the URL
    const [callHistories, setCallHistories] = useState([]);

    useEffect(() => {
        fetch(`/call-histories?${role}Id=${userId}`)
            .then(response => response.json())
            .then(data => setCallHistories(data))
            .catch(error => console.error('Failed to load call histories', error));
    }, [role,userId]);

    return (
        <div>
            {callHistories.length > 0 ? (
                <ul>
                    {callHistories.map((history, index) => (
                        <li key={index}>
                            Rating: {history.rating}, Comments: {history.comments || 'No comments'}, Coach: {history.booking.coach.name}, Student: {history.booking.student.name}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No call histories.</p>
            )}
        </div>
    );
}

export default CallHistoryPage;
