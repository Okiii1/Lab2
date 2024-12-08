import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Alert } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from "./Footer";


const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [expense, setExpense] = useState({ expenseID: 0, userID: 0, categoryID: 0, amount: 0, expenseDate: '', description: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadExpenses();
    loadUsers();
    loadCategories();
  }, []);

  const loadExpenses = async () => {
    try {
      const response = await API.get('/Expenses/GetAllExpenses');
      setExpenses(response.data);
    } catch (error) {
      console.error("Error loading expenses:", error);
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

  const loadCategories = async () => {
    try {
      const response = await API.get('/Categories/GetAllCategories');
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (expense.expenseID) {
        await API.put('/Expenses/UpdateExpense', expense);
        setMessage('Expense updated successfully.');
      } else {
        await API.post('/Expenses/AddExpense', expense);
        setMessage('Expense added successfully.');
      }

      setExpense({ expenseID: 0, userID: 0, categoryID: 0, amount: 0, expenseDate: '', description: '' });
      loadExpenses();
    } catch (error) {
      console.error("Error saving expense:", error);
      setMessage('Error saving expense.');
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/Expenses/DeleteExpense/${selectedExpense.expenseID}`);
      setMessage('Expense deleted successfully.');
      setShowDeleteModal(false);
      loadExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
      setMessage('Error deleting expense.');
    }
  };

  const openDeleteModal = (expense) => {
    setSelectedExpense(expense);
    setShowDeleteModal(true);
  };


  return (
    <>
    <  Navbar />


    <div className="container mt-4">

      <h2>Expenses</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="userID">
          <Form.Label>User</Form.Label>
          <Form.Control
            as="select"
            value={expense.userID}
            onChange={(e) => setExpense({ ...expense, userID: e.target.value })}
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

        <Form.Group controlId="categoryID">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={expense.categoryID}
            onChange={(e) => setExpense({ ...expense, categoryID: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.categoryID} value={category.categoryID}>
                {category.categoryName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="expenseDate">
          <Form.Label>Expense Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter expense date"
            value={expense.expenseDate}
            onChange={(e) => setExpense({ ...expense, expenseDate: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter description (optional)"
            value={expense.description}
            onChange={(e) => setExpense({ ...expense, description: e.target.value })}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2">
          {expense.expenseID ? 'Update' : 'Add'}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Expense Date</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((exp) => (
            <tr key={exp.expenseID}>
              <td>{exp.expenseID}</td>
              <td>{exp.userID}</td>
              <td>{exp.categoryID}</td>
              <td>{exp.amount}</td>
              <td>{exp.expenseDate}</td>
              <td>{exp.description}</td>
              <td>
                <Button variant="warning" onClick={() => setExpense(exp)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => openDeleteModal(exp)}>
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
        <Modal.Body>Are you sure you want to delete this expense?</Modal.Body>
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
    < Footer/>
    </>
  );
};

export default Expenses;
