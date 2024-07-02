import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [editingId, setEditingId] = useState(null); // Track which employee is being edited
    const [editedName, setEditedName] = useState('');
    const [editedPhoneNumber, setEditedPhoneNumber] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [editedPosition, setEditedPosition] = useState('');
    const [editedRestaurantId, setEditedRestaurantId] = useState('');
    const [editedManagerId, setEditedManagerId] = useState('');

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/employees', {
                method: 'GET',
            });
            if (response.ok) {
                const data = await response.json();
                setEmployees(data);
            } else {
                console.error('Failed to fetch employees:', response.status);
            }
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleDeleteEmployee = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/employees/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setEmployees(employees.filter(employee => employee.EmployeeID !== id));
                console.log(`Employee with ID ${id} deleted successfully.`);
            } else {
                console.error(`Failed to delete employee with ID ${id}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleEditEmployee = (employee) => {
        setEditingId(employee.EmployeeID);
        setEditedName(employee.Name);
        setEditedPhoneNumber(employee.PhoneNumber);
        setEditedEmail(employee.Email);
        setEditedPosition(employee.Position);
        setEditedRestaurantId(employee.RestaurantID);
        setEditedManagerId(employee.ManagerID);
    };

    const handleSaveEmployee = async () => {
        try {
            const updatedEmployee = {
                restaurant_id: editedRestaurantId,
                name: editedName,
                position: editedPosition,
                phone_number: editedPhoneNumber,
                email: editedEmail,
                manager_id: editedManagerId,
            };

            const response = await fetch(`http://127.0.0.1:5000/employees/${editingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedEmployee),
            });

            if (response.ok) {
                // Update the employee in the local state
                setEmployees(employees.map(employee => {
                    if (employee.EmployeeID === editingId) {
                        return {
                            ...employee,
                            RestaurantID: editedRestaurantId,
                            Name: editedName,
                            Position: editedPosition,
                            PhoneNumber: editedPhoneNumber,
                            Email: editedEmail,
                            ManagerID: editedManagerId,
                        };
                    }
                    return employee;
                }));

                // Reset editing state
                setEditingId(null);
                setEditedName('');
                setEditedPhoneNumber('');
                setEditedEmail('');
                setEditedPosition('');
                setEditedRestaurantId('');
                setEditedManagerId('');

                console.log(`Employee with ID ${editingId} updated successfully.`);
            } else {
                console.error(`Failed to update employee with ID ${editingId}. Status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedName('');
        setEditedPhoneNumber('');
        setEditedEmail('');
        setEditedPosition('');
        setEditedRestaurantId('');
        setEditedManagerId('');
    };

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
                Employee List
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Phone Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Restaurant ID</TableCell>
                            <TableCell>Manager ID</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.EmployeeID}>
                                <TableCell>{editingId === employee.EmployeeID ?
                                    <TextField
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                    : employee.Name}
                                </TableCell>
                                <TableCell>{editingId === employee.EmployeeID ?
                                    <TextField
                                        value={editedPhoneNumber}
                                        onChange={(e) => setEditedPhoneNumber(e.target.value)}
                                    />
                                    : employee.PhoneNumber}
                                </TableCell>
                                <TableCell>{editingId === employee.EmployeeID ?
                                    <TextField
                                        value={editedEmail}
                                        onChange={(e) => setEditedEmail(e.target.value)}
                                    />
                                    : employee.Email}
                                </TableCell>
                                <TableCell>{editingId === employee.EmployeeID ?
                                    <TextField
                                        value={editedPosition}
                                        onChange={(e) => setEditedPosition(e.target.value)}
                                    />
                                    : employee.Position}
                                </TableCell>
                                <TableCell>{editingId === employee.EmployeeID ?
                                    <TextField
                                        value={editedRestaurantId}
                                        onChange={(e) => setEditedRestaurantId(e.target.value)}
                                    />
                                    : employee.RestaurantID}
                                </TableCell>
                                <TableCell>{editingId === employee.EmployeeID ?
                                    <TextField
                                        value={editedManagerId}
                                        onChange={(e) => setEditedManagerId(e.target.value)}
                                    />
                                    : employee.ManagerID}
                                </TableCell>
                                <TableCell>
                                    {editingId === employee.EmployeeID ?
                                        <>
                                            <Button onClick={handleSaveEmployee} variant="outlined" color="primary">
                                                Save
                                            </Button>
                                            <Button onClick={handleCancelEdit} variant="outlined" color="secondary">
                                                Cancel
                                            </Button>
                                        </>
                                        :
                                        <>
                                            <Button onClick={() => handleEditEmployee(employee)} variant="outlined" color="primary">
                                                Edit
                                            </Button>
                                            <Button onClick={() => handleDeleteEmployee(employee.EmployeeID)} variant="outlined" color="secondary">
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

export default EmployeeList;
