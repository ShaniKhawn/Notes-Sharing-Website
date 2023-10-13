import React, { useState } from 'react';
import Navbar from '../Navbar/navbar';
import './contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: '',
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Form submission successful
        console.log('Form submitted successfully');
        alert('Form submitted successfully')
        window.location.reload();
      } else {
        // Form submission failed
        console.error('Form submission failed');
        alert('Form submission failed')
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <Navbar />

      <div className="contact">
        <div className="contact-container">
          <div className="contact-image">
            <img src={require('../images/contact.jpg')} alt="contact" className="contact-photo" />
          </div>

          <div className="contact-content">
            <h2 className="contact-heading">Contact Us</h2>
            <form className="form" onSubmit={handleFormSubmit}>
              <div className="input-grp">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="input-fld"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-grp">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  className="input-fld"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-grp">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  className="input-fld"
                  value={formData.subject}
                  onChange={handleInputChange}
                />
              </div>

              <div className="input-grp">
                <textarea
                  name="description"
                  placeholder="Enter Your Message"
                  className="input-fld textarea"
                  value={formData.description}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <button type="submit" className="contact-form-btn" value="send">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
