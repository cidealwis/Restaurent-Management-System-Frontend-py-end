import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [editingId, setEditingId] = useState(null); // Track which customer is being edited
    const [editedName, setEditedName] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmail, setEditedEmail] = useState('');

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/customers',{
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
            } else {
                console.error('Failed to fetch customers:', response.status);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const handleDeleteCustomer = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/customers/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setCustomers(customers.filter(customer => customer.CustomerID !== id));
                console.log(`Customer with ID ${id} deleted successfully.`);
            } else {
                console.error(`Failed to delete customer with ID ${id}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleEditCustomer = (id, name, phone_number, email) => {
        setEditingId(id);
        setEditedName(name);
        setEditedPhoneNumber(phone_number);
        setEditedEmail(email);
    };

    const handleSaveCustomer = async () => {
        try {
            const updatedCustomer = {
                name: editedName,
                phone_number: editedPhoneNumber,
                email: editedEmail,
            };

            const response = await fetch(`http://127.0.0.1:5000/customers/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCustomer),
            });

            if (response.ok) {
                // Update the customer in the local state
                setCustomers(customers.map(customer => {
                    if (customer.CustomerID === editingId) {
                        return {
                            ...customer,
                            Name: editedName,
                            PhoneNumber: editedPhoneNumber,
                            Email: editedEmail,
                        };
                    }
                    return customer;
                }));

                // Reset editing state
                setEditingId(null);
                setEditedName('');
                setEditedPhoneNumber('');
                setEditedEmail('');

                console.log(`Customer with ID ${editingId} updated successfully.`);
            } else {
                console.error(`Failed to update customer with ID ${editingId}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedName('');
        setEditedPhoneNumber('');
        setEditedEmail('');
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Customer List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((customer) => (
                            <TableRow key={customer.CustomerID}>
                                <TableCell>{editingId === customer.CustomerID ?
                                    <TextField
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                    : customer.Name}
                                </TableCell>
                                <TableCell>{editingId === customer.CustomerID ?
                                    <TextField
                                        value={editedPhoneNumber}
                                        onChange={(e) => setEditedPhoneNumber(e.target.value)}
                                    />
                                    : customer.PhoneNumber}
                                </TableCell>
                                <TableCell>{editingId === customer.CustomerID ?
                                    <TextField
                                        value={editedEmail}
                                        onChange={(e) => setEditedEmail(e.target.value)}
                                    />
                                    : customer.Email}
                                </TableCell>
                                <TableCell>
                                    {editingId === customer.CustomerID ?
                                        <>
                                            <Button onClick={handleSaveCustomer} variant="outlined" color="primary">
                                                Save
                                            </Button>
                                            <Button onClick={handleCancelEdit} variant="outlined" color="secondary">
                                                Cancel
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <Button onClick={() => handleEditCustomer(customer.CustomerID, customer.Name, customer.PhoneNumber, customer.Email)} variant="outlined" color="primary">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteCustomer(customer.CustomerID)} variant="outlined" color="secondary">
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

export default CustomerList;
