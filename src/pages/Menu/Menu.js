import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Menu.scss';

import { useNavigate } from 'react-router-dom';

function Menu() {
    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('auth-token') !== null);

    const handleLogout = async () => {
        // Clear any authentication tokens or user data
        localStorage.removeItem('auth-token');
        setIsLoggedIn(false);

        // Send a POST request to the server to handle logout
        try {
            await axios.post('/api/logout');
            localStorage.removeItem('auth-token');
            localStorage.removeItem('user-data');

            navigate('/login');


            // Redirect to home or login page upon successful logout
            window.location.href = '/';
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

    return (
        <nav id="masthead">
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/chart">Budget Chart</Link></li>
                <li><Link to="/d3_chart">D3 Chart</Link></li>
                <li><Link to="/bar_chart">Bar Chart</Link></li>

                <li className="dropdown">
                    <button className="dropbtn">Account</button>
                    <div className="dropdown-content">
                        <Link to="/login">Login</Link>
                        <Link to="/login">Logout</Link>
                        <Link to="/signup">Signup</Link>
                    </div>
                </li>

                <li className="dropdown">
                    <button className="dropbtn">More</button>
                    <div className="dropdown-content">
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>
                        <a href="https://jtledbet.github.io/portfolio.html" target="_blank" rel="noopener noreferrer">Other Projects</a>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Menu;
