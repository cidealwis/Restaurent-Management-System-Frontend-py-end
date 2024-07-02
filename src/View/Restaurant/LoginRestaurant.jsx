import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid } from '@mui/material';

const LoginRestaurant = () => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [restaurantData, setRestaurantData] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const formData = { email, phone };

    try {
      const response = await fetch('http://127.0.0.1:5000/restaurants/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials. Please check your email and phone number.');
      }

      const data = await response.json();
      setRestaurantData(data.restaurant); // Store restaurant data in state
      setError('');
    } catch (err) {
      setError(err.message);
      setRestaurantData(null);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom align="center">
        Restaurant Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Typography variant="body1" color="error" align="center">
                {error}
              </Typography>
            </Grid>
          )}
        </Grid>
      </form>

      {restaurantData && (
        <div>
          <Typography variant="h6" gutterBottom align="center">
            Welcome, {restaurantData.name} (ID: {restaurantData.id})
          </Typography>
          <Typography variant="body1" align="center">
            Email: {restaurantData.email}<br />
            Phone Number: {restaurantData.phone_number}
          </Typography>
        </div>
      )}
    </Container>
  );
};

export default LoginRestaurant;
