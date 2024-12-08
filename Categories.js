import React, { useState, useEffect } from 'react';
import API from '../services/api';
import Navbar from './Navbar';
import Footer from "./Footer";


const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ categoryName: '', description: '' });

  useEffect(() => {
    loadCategories();
  }, []);

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
      if (category.categoryID) {
        await API.put('/Categories/UpdateCategory', category);
      } else {
        await API.post('/Categories/AddCategory', category);
      }
      setCategory({ categoryName: '', description: '' });
      loadCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleEdit = (item) => setCategory(item);

  const handleDelete = async (categoryID) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category? "   + "ID: " + categoryID);
    if (!confirmDelete) return;

    try {
      await API.delete(`/Categories/DeleteCategory/${categoryID}`);
      loadCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <>
    < Navbar />
    <div className="container mt-5">
      <h2 className="text-center mb-4">Categories</h2>

      <form onSubmit={handleSubmit} className="mb-4 p-3 border rounded bg-light shadow-sm">
        <div className="form-group mb-3">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            className="form-control"
            placeholder="Enter category name"
            value={category.categoryName}
            onChange={(e) => setCategory({ ...category, categoryName: e.target.value })}
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            className="form-control"
            placeholder="Enter description"
            value={category.description}
            onChange={(e) => setCategory({ ...category, description: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          {category.categoryID ? 'Update' : 'Add'}
        </button>
      </form>

      <table className="table table-striped table-bordered shadow-sm">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.categoryID}>
              <td>{cat.categoryID}</td>
              <td>{cat.categoryName}</td>
              <td>{cat.description}</td>
              <td>
                <div className="d-flex">
                  <button onClick={() => handleEdit(cat)} className="btn btn-sm btn-warning mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(cat.categoryID)} className="btn btn-sm btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    < Footer/>
    </>
  );
};

export default Categories;
