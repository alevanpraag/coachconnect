import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import HomePage from "./components/HomePage"

export default function App(props) {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/:role/:userId" element={<HomePage/>} />
                </Routes>
            </Router>          
        </div>
    );
}
