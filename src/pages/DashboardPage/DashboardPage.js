import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DashboardPage.scss';

const DashboardPage = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState({ title: '', value: '', color: '#000000' });
    const [error, setError] = useState(null); // Add error state

    // Fetch items from the server
    useEffect(() => {
        axios.get('/api/budget')
            .then(response => setItems(response.data))
            .catch(error => setError(error)); // Set error state if request fails
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/budget/${id}`);
            const updatedItems = items.filter(item => item._id !== id);
            setItems(updatedItems);
        } catch (error) {
            setError(error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        setNewItem({ ...newItem, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            // Generate a unique custom_id. Here we use the current timestamp
            // and a random number to reduce the likelihood of collisions.
            const customId = Date.now() + Math.floor(Math.random() * 100);

            // Include the newItem state data in the post request
            const itemToSubmit = {
                custom_id: customId,
                title: newItem.title.toUpperCase(), // The title is sent as uppercase
                value: Number(newItem.value), // Ensure the value is a number
                color: newItem.color, // Include the color
            };

            const response = await axios.post('/api/budget', itemToSubmit, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Update UI with the new item added
            setItems([...items, response.data]);
            setNewItem({ title: '', value: '', color: '#000000' }); // Reset form
            console.log('Item added successfully', response.data);
        } catch (error) {
            console.error('Error adding item', error.response || error);
        }
    };


    return (
        <div>
            {error && <p>Error: {error.message}</p>}
            <div>
                {error && <p>Error fetching data: {error.message}</p>}



            </div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Value</th>
                        <th>Color</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.title}</td>
                            <td>{item.value}</td>
                            <td>
                                <div
                                    style={{
                                        backgroundColor: item.color,
                                        width: '20px',
                                        height: '20px'
                                    }}
                                />
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item._id)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        value={newItem.title}
                        onChange={handleChange}
                        placeholder="Title"
                        required
                    />
                    <input
                        type="number"
                        name="value"
                        value={newItem.value}
                        onChange={handleChange}
                        placeholder="Value"
                        required
                    />
                    <input
                        type="color"
                        name="color"
                        value={newItem.color}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Add Item</button>
                </form>
        </div>
    );
};

export default DashboardPage;
