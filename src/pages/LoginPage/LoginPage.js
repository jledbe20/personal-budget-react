import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.scss'; // Import the CSS file as a module
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleLogin = async () => {
        try {
            const response = await axios.post('/login', {
                username,
                password
            });
            
            // Save the token in localStorage
            localStorage.setItem('auth-token', response.data);
            
            // Update the isLoggedIn state if you have it

            // Redirect to the dashboard
            navigate('/dashboard');
        } catch (error) {
            console.error('Login failed', error.response || error);
        }
    };

    return (
        <div className="login-container"> {/* Add a container class */}
            <h1>Login</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="button" onClick={handleLogin}>Login</button>
            </form>
        </div>
    );
}

export default LoginPage;
