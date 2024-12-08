import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import Footer from './Footer';
import './Contact.css';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false); // gjendje për kontrollin e dërgimit

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true); // vendos gjendjen `submitted` në `true`
  };

  return (
    <>
      <Navbar />
      <div className="contact-form-container container my-5 py-4">
        <h2 className="text-center mb-4">Na Kontaktoni</h2>
        
        {submitted ? (
          <div className="text-center">
            <h3>Faleminderit që na kontaktuat!</h3>
            <p>Ne do t'ju kontaktojmë së shpejti.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Emri Juaj</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Emri Juaj"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email-i Juaj"
                required
              />
            </div>
            <div className="form-group">
              <label>Subjekti</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="form-control"
                placeholder="Subjekti"
                required
              />
            </div>
            <div className="form-group">
              <label>Mesazhi</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                rows="5"
                placeholder="Mesazhi juaj"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Dërgo Mesazhin
            </button>
          </form>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ContactForm;
