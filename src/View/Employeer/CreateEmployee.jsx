import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const CreateEmployee = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [restaurantId, setRestaurantId] = useState('');
    const [position, setPosition] = useState('');
    const [managerId, setManagerId] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const employeeData = {
            restaurant_id: restaurantId,
            name,
            position,
            phone_number: phoneNumber,
            email,
            manager_id: managerId,
        };

        fetch('http://127.0.0.1:5000/employees', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeData),
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error) });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('Employee created successfully!');
            
            setRestaurantId('');
            setName('');
            setPosition('');
            setPhoneNumber('');
            setEmail('');
            setManagerId('');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert(`An error occurred: ${error.message}`);
        });
    };

    return (
        <Container maxWidth="sm">
            <Box 
                component="form" 
                onSubmit={handleSubmit} 
                sx={{ 
                    mt: 3, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    p: 2, 
                    border: '1px solid #ccc', 
                    borderRadius: 1 
                }}
            >
                <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
                    Create Employee
                </Typography>
                <TextField
                    label="Restaurant ID"
                    value={restaurantId}
                    onChange={(e) => setRestaurantId(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Manager ID (optional)"
                    value={managerId}
                    onChange={(e) => setManagerId(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Employee
                </Button>
            </Box>
        </Container>
    );
};

export default CreateEmployee;
