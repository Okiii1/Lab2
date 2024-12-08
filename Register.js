import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termsChecked, setTermsChecked] = useState(false);
  const navigate = useNavigate();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleTermsCheck = (e) => {
    setTermsChecked(e.target.checked);
  };

  const handleSignUp = () => {
    if (!email.includes('@') || !email.includes('.')) {
      setEmailError('Invalid email');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return;
    }

    if (!termsChecked) {
      alert('Please agree to the Terms of Service');
      return;
    }

    const data = {
      Firstname: firstName,
      Lastname: lastName,
      Email: email,
      Password: password
    };

    const url = 'https://localhost:7033/api/Account/Registration';
    axios.post(url, data)
      .then(response => {
        const Id = response.data.id; // Sigurohuni që ID është e pranishme në përgjigje
        alert(`Welcome ${firstName} ${lastName}! Your ID is: ${Id}`);
        navigate('/Login'); // Ridrejtoni në faqen e hyrjes
      })
      .catch(error => {
        if (error.response) {
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      });
  };

  return (
    <div className="container vh-100" style={{ backgroundColor: '#ffff' }}>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-lg-12 col-xl-11">
          <div className="card text-black" style={{ borderRadius: '25px' }}>
            <div className="card-body p-md-5">
              <div className="row justify-content-center">
                <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                  <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                  <form className="mx-1 mx-md-4">
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          className="form-control"
                          value={firstName}
                          onChange={handleFirstNameChange}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          className="form-control"
                          value={lastName}
                          onChange={handleLastNameChange}
                        />
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          className={`form-control ${emailError && 'is-invalid'}`}
                          value={email}
                          onChange={handleEmailChange}
                        />
                        {emailError && <div className="invalid-feedback">{emailError}</div>}
                      </div>
                    </div>
                    <div className="d-flex flex-row align-items-center mb-4">
                      <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                      <div className="form-outline flex-fill mb-0">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                          type="password"
                          id="password"
                          className={`form-control ${passwordError && 'is-invalid'}`}
                          value={password}
                          onChange={handlePasswordChange}
                        />
                        {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                      </div>
                    </div>
                    <div className="form-check d-flex justify-content-center mb-4">
                      <input
                        className=""
                        type="checkbox"
                        value={termsChecked}
                        id="termsCheck"
                        onChange={handleTermsCheck}
                      />
                      <label className="form-check-label" htmlFor="termsCheck">
                        &nbsp;I agree to all statements in <a href="/TermsOfService">Terms of service</a>
                      </label>
                    </div>
                    <div className="form-check d-flex justify-content-center mb-4">
                      <label className="form-check-label" htmlFor="loginLink">
                        Already have an account? <a href="/Login" id="loginLink">Login here</a>
                      </label>
                    </div>
                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                      <button type="button" className="btn btn-primary" onClick={handleSignUp}>
                        Register
                      </button>
                    </div>
                  </form>
                </div>
                <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                  <img
                    src="https://happay.com/blog/wp-content/uploads/sites/12/2022/08/what-is-expense-management.png"
                    className="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
