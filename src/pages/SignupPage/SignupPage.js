import React, { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (username && password) {
            try {
                // Replace with your server's URL and endpoint as needed
                const response = await axios.post('http://localhost:5000/signup', {
                    username,
                    password
                });

                // Handle response here
                console.log('Signup successful!', response.data);
            } catch (error) {
                // Handle error here
                console.error('Signup failed', error.response || error);
            }
        } else {
            console.log('Please enter a username and password');
        }
    };

    return (
        <div>
            <h2>Signup Page</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignupPage;
