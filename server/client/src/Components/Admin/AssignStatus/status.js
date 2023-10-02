import React, { useState } from "react";
import "./status.css";
import { useParams, useNavigate } from "react-router-dom";

export default function Status() {
  const { noteId } = useParams();
  const [status, setStatus] = useState("accept"); // Default status
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/status/${noteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (response.status === 200) {
        // Handle success, e.g., show a success message
        console.log("Status updated successfully");
        alert("Status updated successfully")
        navigate("/admin/pendingnotes")
      } else {
        // Handle error, e.g., show an error message
        console.error("Status update failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <main className="assigncontainer">
        <h2 className="text-center">Assign Status</h2>
        <hr />
        <form id="status-form" onSubmit={handleSubmit}>
          <label className="label">Notes ID</label>
          <input
            type="text"
            name="noteid"
            id="noteid"
            value={noteId}
            className="form-control"
            readOnly
          />

          <label className="label">Status</label>
          <select
            name="status"
            id="status"
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="accept">Accept</option>
            <option value="reject">Reject</option>
          </select>

          <input type="submit" value="Submit" className="btn btn-primary" />
        </form>
      </main>
    </>
  );
}
