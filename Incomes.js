import Navbar from './Navbar';
import Footer from './Footer';
import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Alert } from 'react-bootstrap';
import API from '../services/api';
import { useNavigate } from 'react-router-dom'; // për të ridrejtuar nëse s’ka qasje

const Incomes = () => {
  const [incomes, setIncomes] = useState([]);
  const [users, setUsers] = useState([]);
  const [income, setIncome] = useState({ incomeID: 0, userID: 0, amount: 0, incomeDate: '', description: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10); // merrni userRoleId nga localStorage

    if (userRoleId === 0 || userRoleId === 1) {
      navigate('/login'); // Ridrejtoni në faqen kryesore nëse roli është 0 ose 1
    } else {
      loadIncomes();
      loadUsers();
    }
  }, [navigate]);

  const loadIncomes = async () => {
    try {
      const response = await API.get('/Incomes/GetAllIncomes');
      setIncomes(response.data);
    } catch (error) {
      console.error("Error loading incomes:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await API.get('/Account/GetAllUsers');
      setUsers(response.data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (income.incomeID) {
        await API.put('/Incomes/UpdateIncome', income);
        setMessage('Income updated successfully.');
      } else {
        await API.post('/Incomes/AddIncome', income);
        setMessage('Income added successfully.');
      }
      setIncome({ incomeID: 0, userID: 0, amount: 0, incomeDate: '', description: '' });
      loadIncomes();
    } catch (error) {
      console.error("Error saving income:", error);
      setMessage('Error saving income.');
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/Incomes/DeleteIncome/${selectedIncome.incomeID}`);
      setMessage('Income deleted successfully.');
      setShowDeleteModal(false);
      loadIncomes();
    } catch (error) {
      console.error("Error deleting income:", error);
      setMessage('Error deleting income.');
    }
  };

  const openDeleteModal = (income) => {
    setSelectedIncome(income);
    setShowDeleteModal(true);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Incomes</h2>
        <h5>Mirsevini: </h5>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleSubmit} className="mb-4">
          <Form.Group controlId="userID">
            <Form.Label>User</Form.Label>
            <Form.Control
              as="select"
              value={income.userID}
              onChange={(e) => setIncome({ ...income, userID: e.target.value })}
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={income.amount}
              onChange={(e) => setIncome({ ...income, amount: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="incomeDate">
            <Form.Label>Income Date</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter income date"
              value={income.incomeDate}
              onChange={(e) => setIncome({ ...income, incomeDate: e.target.value })}
              required
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter description (optional)"
              value={income.description}
              onChange={(e) => setIncome({ ...income, description: e.target.value })}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-2">
            {income.incomeID ? 'Update' : 'Add'}
          </Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Income Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incomes.map((inc) => (
              <tr key={inc.incomeID}>
                <td>{inc.incomeID}</td>
                <td>{inc.userID}</td>
                <td>{inc.amount}</td>
                <td>{inc.incomeDate}</td>
                <td>{inc.description}</td>
                <td>
                  <Button variant="warning" onClick={() => setIncome(inc)}>
                    Edit
                  </Button>{' '}
                  <Button variant="danger" onClick={() => openDeleteModal(inc)}>
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
          <Modal.Body>Are you sure you want to delete this income?</Modal.Body>
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

export default Incomes;
