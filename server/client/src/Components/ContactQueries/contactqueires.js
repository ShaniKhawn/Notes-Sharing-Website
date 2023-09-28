import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../Navbar/adminnavbar';

export default function ContactQueries() {
  const [queries, setQueries] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/contactQuerie') // Update the endpoint URL if needed
      .then((response) => response.json())
      .then((data) => setQueries(data))
      .catch((error) => console.error('Error fetching queries:', error));
  }, []);

  return (
    <>
      <AdminNavbar />

      <div className="cntctqueires m-t">
        <div className="container1">
          <h2 className="content-heading">Contact Queries</h2>
          <table className="table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>E-Mail</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {queries.map((query, index) => (
                <tr key={query._id}>
                  <td>{index + 1}</td>
                  <td>{query.name}</td>
                  <td>{query.email}</td>
                  <td>
                    <Link to={`/viewqueries/${query._id}`}>View Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
