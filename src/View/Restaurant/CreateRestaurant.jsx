import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const CreateRestaurant = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        const restaurantData = {
            name,
            address,
            phone_number: phoneNumber,
            email,
        };

        console.log('Restaurant Data:', restaurantData);

       await fetch('http://127.0.0.1:5000/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(restaurantData),
        })
        .then(response => {
            console.log('Response:', response);

            if (response.status === 201) {
                alert('Restaurant created successfully!');
                setName('');
                setAddress('');
                setPhoneNumber('');
                setEmail('');
            } else {
                return response.text().then(errorText => {
                    alert(`Failed to create restaurant. Status: ${response.status}, Error: ${errorText}`);
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the restaurant.');
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
                    Create Restaurant
                </Typography>
                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Restaurant
                </Button>
            </Box>
        </Container>
    );
};

export default CreateRestaurant;
