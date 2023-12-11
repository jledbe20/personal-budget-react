import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css'; // Import the CSS file

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            // Replace with your server's URL and endpoint as needed
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });

            // Handle the response here
            console.log('Login successful', response.data);
            // You might want to save the token in the local storage or context for future requests
        } catch (error) {
            // Handle error here
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
