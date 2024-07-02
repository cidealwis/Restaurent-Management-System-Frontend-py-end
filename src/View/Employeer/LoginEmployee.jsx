import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const EmployeeLogin = () => {
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [managerId, setManagerId] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        const loginData = {
            email,
            phone_number: phoneNumber,
            restaurant_id: restaurantId,
            manager_id: managerId,
        };

        try {
            const response = await fetch('http://127.0.0.1:5000/employees/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                setMessage(`Login successful! Welcome, ${data.employee.Name}`);
                // Perform any additional actions on successful login
            } else {
                const errorData = await response.json();
                setMessage(`Login failed: ${errorData.error}`);
            }
        } catch (error) {
            setMessage(`Login failed: ${error.message}`);
        }
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Employee Login
            </Typography>
            <TextField
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Restaurant ID"
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Manager ID"
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
            </Button>
            {message && (
                <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default EmployeeLogin;
