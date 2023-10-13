import React, { useState, useEffect } from "react";
import axios from "axios";
import "./upload.css";
import UserNavbar from "../../Navbar/usernavbar";
import {FaUpload}from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    branch: '',
    subject: '',
    fileType: '',
    description: '',
    user: '',
  });

  useEffect(() => {
    const userId = localStorage.getItem('user');
    setFormData((prevFormData) => ({ ...prevFormData, user: userId }));
  }, []);
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.branch && formData.subject && formData.fileType && formData.description && file) {
      const data = new FormData();
      data.append('notes-file', file);
      data.append('branch', formData.branch);
      data.append('subject', formData.subject);
      data.append('fileType', formData.fileType);
      data.append('description', formData.description);
      data.append('user', formData.user);

      try {
        const response = await axios.post('http://localhost:5000/upload', data);
        console.log(response.data);
        
        // Show success alert
        alert('File uploaded successfully!');
        navigate("/user/mynotes")
        // Clear form fields or perform other actions as needed
        setFormData({
          branch: '',
          subject: '',
          fileType: '',
          description: '',
        });
        setFile(null);
      } catch (error) {
        console.error('Error uploading file:', error);
        
        // Show error alert
        alert('Error uploading file. Please try again.');
      }
    } else {
      alert('Please fill in all the fields before submitting.');
    }
  };



  return (
    <>
      <UserNavbar />

      <div className="m-t">
        <div className="container1">
          <h2 className="upload-heading">Upload Notes</h2>
          <div className="form-wrapper">

            {/* ____________________________ upload notes image ___________________________ */}

            <div className="upload-image">
              <img src={require('../../images/upload-notes.jpg')} alt="upload" className="upload-photo upload-image" />
            </div>

            {/* ___________________________ upload notes form section ___________________________ */}

            <form method="post" className="form" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div className="form-grp">
                <label htmlFor="branch">Branch</label>
                <select name="branch" className="select-grp" onChange={(e) => setFormData({ ...formData, branch: e.target.value })}>
                  <option value="select">Select Branch</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Botany">Botany</option>
                  <option value="Zoology">Zoology</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div className="form-grp">
                <label htmlFor="subject">Subject</label>
                <input type="text" placeholder="Enter Subject" name="subject" onChange={(e) => setFormData({ ...formData, subject: e.target.value })}/>
              </div>

              <div className="form-grp">
                <label htmlFor="notes-file">Notes File</label>
                <input type="file" name="notes-file" onChange={handleFileChange}/>
              </div>

              <div className="form-grp">
                <label htmlFor="file-type">File Type</label>
                <select name="file-type" className="select-grp"  onChange={(e) => setFormData({ ...formData, fileType: e.target.value })}>
                  <option value="select">Select File</option>
                  <option value="doc/docx">DOC/DOCX</option>
                  <option value="pdf">PDF</option>
                  <option value="ppt">PPT</option>
                  <option value="txt">TXT</option>
                  <option value="image">Image</option>
                  <option value="zip/rar">ZIP/RAR</option>
                </select>
              </div>

              <div className="form-grp">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
              </div>

              <button type="submit" className="form-btn" value="upload"><FaUpload /> Upload</button>

            </form>
          </div>
        </div>
      </div>
    </>
  )
}