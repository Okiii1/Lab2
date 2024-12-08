import React, { useState, useEffect } from 'react';
import { Table, Form, Button, Modal, Alert } from 'react-bootstrap';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from "./Footer";
import { useNavigate } from 'react-router-dom'; 



const Budgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]); // List for categories
  const [budget, setBudget] = useState({ budgetID:0, userID: 0, categoryID: 0, amount: 0, startDate: '', endDate: '' });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [message, setMessage] = useState(''); // For feedback messages
  const navigate = useNavigate();

  useEffect(() => {
    const userRoleId = parseInt(localStorage.getItem('userRoleId'), 10); 

    if (userRoleId !== 1) { 
        navigate('/login'); 
    } else {
      loadBudgets();
      loadUsers();
      loadCategories();

    }
  }, [navigate]);



  const loadBudgets = async () => {
    try {
      const response = await API.get('/Budgets/GetAllBudgets');
      setBudgets(response.data);
    } catch (error) {
      console.error("Error loading budgets:", error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await API.get('/Account/GetAllUsers');
      setUsers(response.data);
      console.log(response.data); 
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await API.get('/Categories/GetAllCategories'); // Route for categories
      setCategories(response.data);
    } catch (error) {
      console.error("Error loading categories:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
      if (budget.budgetID) {
        await API.put('/Budgets/UpdateBudget', budget);
        setMessage('Budget updated successfully.');
      } else {
        await API.post('/Budgets/AddBudget', budget);
        setMessage('Budget added successfully.');
      }
  
      setBudget({ budgetID: '', userID: '', categoryID: '', amount: '', startDate: '', endDate: '' });
      loadBudgets();
    } catch (error) {
      console.error("Error saving budget:", error);
      setMessage('Error saving budget.');
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/Budgets/DeleteBudget/${selectedBudget.budgetID}`);
      setMessage('Budget deleted successfully.');
      setShowDeleteModal(false);
      loadBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
      setMessage('Error deleting budget.');
    }
  };

  const openDeleteModal = (budget) => {
    setSelectedBudget(budget);
    setShowDeleteModal(true);
  };

  return (
    <> 
    <Navbar /> 
    <div className="container mt-4">
      <h2>Budgets</h2>
      {message && <Alert variant="info">{message}</Alert>}
      <Form onSubmit={handleSubmit} className="mb-4">
        <Form.Group controlId="userID">
          <Form.Label>User</Form.Label>
          <Form.Control
            as="select"
            value={budget.userID}
            onChange={(e) => setBudget({ ...budget, userID: e.target.value })}
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstname}  {user.lastname} 

              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="categoryID">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            value={budget.categoryID}
            onChange={(e) => setBudget({ ...budget, categoryID: e.target.value })}
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
            value={budget.amount}
            onChange={(e) => setBudget({ ...budget, amount: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="startDate">
          <Form.Label>Start Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter start date"
            value={budget.startDate}
            onChange={(e) => setBudget({ ...budget, startDate: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>End Date</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter end date"
            value={budget.endDate}
            onChange={(e) => setBudget({ ...budget, endDate: e.target.value })}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2">
          {budget.budgetID ? 'Update' : 'Add'}
        </Button>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((bud) => (
            <tr key={bud.budgetID}>
              <td>{bud.budgetID}</td>
              <td>{bud.userID}</td>
              <td>{bud.categoryID}</td> 
              <td>{bud.amount}</td>
              <td>{bud.startDate}</td>
              <td>{bud.endDate}</td>
              <td>
                <Button variant="warning" onClick={() => setBudget(bud)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => openDeleteModal(bud)}>
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
        <Modal.Body>Are you sure you want to delete this budget?</Modal.Body>
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

export default Budgets;
