# CoachConnect

CoachConnect is a web application designed to manage and schedule 1-on-1 coaching sessions between students and coaches. This application allows coaches to set their available time slots, students to book these slots, and coaches to provide feedback on each session.

## Features

- **Coach Availability Management:** Coaches can add and view their available time slots. Each slot is two hours long.
- **Booking System:** Students can book available time slots with any coach.
- **Feedback System:** Post-session, coaches can rate the session and leave notes about the student's performance and their experience.
- **Viewing Past Sessions:** Coaches can view details and feedback for past sessions.
- **Role Flexibility:** Users can switch between coach and student roles for testing purposes without creating new accounts.

## Technologies Used

- **Frontend:** React (with TypeScript)
- **Backend:** Node.js with Express
- **Database:** PostgreSQL
- **Additional Libraries and Middleware:** Sequelize, dayjs, and MUI

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- PostgreSQL
- npm or yarn

### Installing

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/coachconnect.git
    cd coachconnect
    ```
2.  **Set up the database:**

    Ensure PostgreSQL is running.
    Create a database named coachconnectdb.
    Configure your database credentials in a db.js

3.  **Install backend dependencies and run the backend server:**

    ```
    cd server
    npm install
    npm run dev
    ```

4.  **Install frontend dependencies and run the frontend application:**
        ```
        cd ../client
        npm install
        npm start
    The application should now be running and accessible at http://localhost:3000.

### API Endpoints

The backend supports several endpoints:

POST /users: Register a new user.
GET /users: Retrieve all users.
GET /users/:id: Retrieve given user by id. (to get user info)
POST /availabilities: Create a new availability slot.
PUT /availabilities: Update a new availability slot (to change state from available to booked).
GET /availabilities/all: Get all availability slots.
GET /availabilities/by-day: Get all availability slots on a given day (and coach if needed for displaying to coach which availabilites they added and show student all availbilites to choose from)
POST /bookings: Create a new booking.
GET /bookings: Get all future bookings of given user
POST /call-histories: Create a new booking.
GET /call-histories: Get all bookings of given user

### Database

- **Users:** Have an associated name, phone number, and boolean to determine if user is a coach or not
- **Availabilities:** Have a coach, start time, and boolean to determine if slot is booked. These act as our "time slots", that can be booked.
- **Bookings:** Have a coach, student, and availability (time slot). These act as our reservations, so they are either to be done or already done.
- **Call History:** Have a rating, comments, and booking (a reservation). These act as our hisotry to record session information

### Frontend

- **Student Page:** for students to reserve available time slots with coaches. Calendar view for ease of picking dates to find sessions for.
- **Coach Page:** for coaches to add available time slots for students to reserve. Calendar view for ease of adding dates coach is free.
- **Bookings Page:** lists all future bookings of a given user in order most soon to latest
- **Call History Page:** shows full call hisotry with comments and rating for given user
