import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const CustomerLogin = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const customerData = {
            name,
            phone_number: phoneNumber, // Ensure these field names match your backend expectations.
            email,
        };

        // Make sure the URL matches your actual backend endpoint.
        fetch('http://127.0.0.1:5000/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify(customerData),
        })
        .then(response => 
            {
                console.log(response.json())
                response.json()
            }
           ) 
        
        .then(data => {
            console.log('Success:', data);
            alert('Customer created successfully!');
            
            setName('');
            setPhoneNumber('');
            setEmail('');
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('An error occurred while creating the customer.');
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
                    Create Customer
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
                    Create Customer
                </Button>
            </Box>
        </Container>
    );
};

export default CustomerLogin;