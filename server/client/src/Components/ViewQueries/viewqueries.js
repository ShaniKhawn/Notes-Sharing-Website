import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminNavbar from '../Navbar/adminnavbar';

export default function ViewQueries() {
  const { queryId } = useParams();
  const [query, setQuery] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/viewQueries/${queryId}`) // Update the endpoint URL if needed
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setQuery(data))
      .catch((error) => console.error('Error fetching query details:', error));
  }, [queryId]);

  return (
    <>
      <AdminNavbar />

      <div className="view-queries m-t">
        <div className="container1">
          <h2 className="content-heading">View Query Details</h2>
          <table className="table">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{query.name}</td>
                <th>E-Mail</th>
                <td>{query.email}</td>
              </tr>
              <tr>
                <th>Subject</th>
                <td>{query.subject}</td>
                <th>Enquire Message</th>
                <td>{query.description}</td>
              </tr>
              <tr>
                <th>Enquire Date</th>
                <td colSpan={3}>{new Date(query.createdAt).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
