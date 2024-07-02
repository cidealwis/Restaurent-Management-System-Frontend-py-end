import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const RestaurantList = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [editingId, setEditingId] = useState(null); // Track which restaurant is being edited
    const [editedName, setEditedName] = useState('');
    const [editedAddress, setEditedAddress] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/restaurants',{
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setRestaurants(data);
            } else {
                console.error('Failed to fetch restaurants:', response.status);
            }
        } catch (error) {
            console.error('Error fetching restaurants:', error);
        }
    };

    const handleDeleteRestaurant = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/restaurants/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setRestaurants(restaurants.filter(restaurant => restaurant.RestaurantID !== id));
                console.log(`Restaurant with ID ${id} deleted successfully.`);
            } else {
                console.error(`Failed to delete restaurant with ID ${id}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting restaurant:', error);
        }
    };

    const handleEditRestaurant = (id, name, address, phone_number, email) => {
        setEditingId(id);
        setEditedName(name);
        setEditedAddress(address);
        setEditedPhoneNumber(phone_number);
        setEditedEmail(email);
    };

    const handleSaveRestaurant = async () => {
        try {
            const updatedRestaurant = {
                name: editedName,
                address: editedAddress,
                phone_number: editedPhoneNumber,
                email: editedEmail,
            };

            const response = await fetch(`http://127.0.0.1:5000/restaurants/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRestaurant),
            });

            if (response.ok) {
                // Update the restaurant in the local state
                setRestaurants(restaurants.map(restaurant => {
                    if (restaurant.RestaurantID === editingId) {
                        return {
                            ...restaurant,
                            Name: editedName,
                            Address: editedAddress,
                            PhoneNumber: editedPhoneNumber,
                            Email: editedEmail,
                        };
                    }
                    return restaurant;
                }));

                // Reset editing state
                setEditingId(null);
                setEditedName('');
                setEditedAddress('');
                setEditedPhoneNumber('');
                setEditedEmail('');

                console.log(`Restaurant with ID ${editingId} updated successfully.`);
            } else {
                console.error(`Failed to update restaurant with ID ${editingId}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating restaurant:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedName('');
        setEditedAddress('');
        setEditedPhoneNumber('');
        setEditedEmail('');
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Restaurant List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {restaurants.map((restaurant) => (
                            <TableRow key={restaurant.RestaurantID}>
                                <TableCell>{editingId === restaurant.RestaurantID ?
                                    <TextField
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                    : restaurant.Name}
                                </TableCell>
                                <TableCell>{editingId === restaurant.RestaurantID ?
                                    <TextField
                                        value={editedAddress}
                                        onChange={(e) => setEditedAddress(e.target.value)}
                                    />
                                    : restaurant.Address}
                                </TableCell>
                                <TableCell>{editingId === restaurant.RestaurantID ?
                                    <TextField
                                        value={editedPhoneNumber}
                                        onChange={(e) => setEditedPhoneNumber(e.target.value)}
                                    />
                                    : restaurant.PhoneNumber}
                                </TableCell>
                                <TableCell>{editingId === restaurant.RestaurantID ?
                                    <TextField
                                        value={editedEmail}
                                        onChange={(e) => setEditedEmail(e.target.value)}
                                    />
                                    : restaurant.Email}
                                </TableCell>
                                <TableCell>
                                    {editingId === restaurant.RestaurantID ?
                                        <>
                                            <Button onClick={handleSaveRestaurant} variant="outlined" color="primary">
                                                Save
                                            </Button>
                                            <Button onClick={handleCancelEdit} variant="outlined" color="secondary">
                                                Cancel
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <Button onClick={() => handleEditRestaurant(restaurant.RestaurantID, restaurant.Name, restaurant.Address, restaurant.PhoneNumber, restaurant.Email)} variant="outlined" color="primary">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteRestaurant(restaurant.RestaurantID)} variant="outlined" color="secondary">
                                                Delete
                                            </Button>
                                        </>
                                    }
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default RestaurantList;
