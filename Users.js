import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Alert } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({ id: 0, firstname: '', lastname: '', email: '', password: '', roleId: 0 });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await API.get('/Account/GetAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
      setMessage('Failed to load users.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...user, roleId: parseInt(user.roleId) };

      if (updatedUser.id) {
        // Update user
        await API.put(`/Account/UpdateUser`, updatedUser);
        setMessage('User updated successfully.');
      } else {
        // Add new user
        await API.post('/Account/Registration', updatedUser);
        setMessage('User added successfully.');
      }
      setUser({ id: 0, firstname: '', lastname: '', email: '', password: '', roleId: 0 });
      loadUsers();
    } catch (error) {
      console.error("Error saving user:", error);
      setMessage('Failed to save user.');
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return; // Check if there's a user to delete
    try {
      await API.delete(`/Account/DeleteUser/${selectedUser.id}`);
      setMessage('User deleted successfully.');
      setShowDeleteModal(false);
      setSelectedUser(null); 
      loadUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      setMessage('Failed to delete user.');
    }
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleEdit = (user) => {
    setUser(user); // Set the user state with selected user's data for editing
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>User Management</h2>
        {message && <Alert variant="info">{message}</Alert>}
        
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Group controlId="firstname">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={user.firstname}
              onChange={(e) => setUser({ ...user, firstname: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastname">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={user.lastname}
              onChange={(e) => setUser({ ...user, lastname: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="roleId">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter role ID (e.g., 2 for admin)"
              value={user.roleId}
              onChange={(e) => setUser({ ...user, roleId: e.target.value })}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            {user.id ? 'Update' : 'Add'}
          </Button>
        </Form>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((usr) => (
              <tr key={usr.id}>
                <td>{usr.id}</td>
                <td>{usr.firstname}</td>
                <td>{usr.lastname}</td>
                <td>{usr.email}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(usr)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => openDeleteModal(usr)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Footer />
    </>
  );
};

export default Users;
