import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CallHistoryPage() {
    const [callHistories, setCallHistories] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const { role,userId } = useParams();  // Get the userId from the URL

    useEffect(() => {
        fetch(`/call-histories?page=${page}&limit=20&`+role+"Id="+userId)
            .then(response => response.json())
            .then(({ data, total }) => {
                setCallHistories(prev => [...prev, ...data]); 
                setHasMore(data.length === 20); // Simplistic check for more data
            })
            .catch(error => console.error('Failed to load call histories', error));
    }, [page,role,userId]);

    function handleLoadMore() {
        setPage(prev => prev + 1);
    }

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
            {hasMore && <button onClick={handleLoadMore}>Load More</button>}
        </div>
    );
}

export default CallHistoryPage;
