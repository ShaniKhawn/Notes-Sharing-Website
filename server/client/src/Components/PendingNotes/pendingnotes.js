import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminNavbar from "../Navbar/adminnavbar";

export default function PendingNotes() {
  const [notes, setNotes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/pendingnotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Filter notes with "pending" status
        const pendingNotes = data.filter((note) => note.status === "pending");
        setNotes(pendingNotes);
        setFilteredNotes(pendingNotes); // Initialize filteredNotes with all notes
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // Filter notes based on searchInput
  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        // note.user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.branch.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchInput, notes]);

  //Download notes
const handleDownload = async (downloadLink, fileName) => {
  try {
    const response = await fetch(downloadLink);
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    a.click();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error downloading note:', error);
  }
};


  // Delete the notes
  const handleDelete = (noteId) => {
    const confirmed = window.confirm("Are you sure to delete this note?");

    if (!confirmed) {
      return; // Do nothing if the user cancels the deletion
    }

    fetch(`http://localhost:5000/pendingnotes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Remove the deleted note from the state in which it is present
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
        setFilteredNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <>
      <AdminNavbar />

      <main className="pending-notes m-t">
        <div className="lrgcontainer">
          <h2 className="content-heading">Pending Notes</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Branch or Subject"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                float: "right",
                padding: "10px",
                width: "30%",
                marginBlockEnd: "20px",
                font: "icon",
              }}
            />
          </div>
          <table className="table" id="pendingNotes">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Uploaded By</th>
                <th>Uploading Date</th>
                <th>Branch</th>
                <th>Subject</th>
                <th>Download Notes</th>
                <th>File Type</th>
                <th>Description</th>
                <th>Status</th>
                <th>Assign Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredNotes.map((note, index) => (
                <tr key={note._id}>
                  <td>{index + 1}</td>
                  <td>{note.user.name}</td>
                  <td>{new Date(note.uploadingDate).toLocaleDateString()}</td>
                  <td>{note.branch}</td>
                  <td>{note.subject}</td>
                  <td>
                    <button
                      className="btn-style btn-success"
                      onClick={() => handleDownload(note.download)}
                    >
                      Download
                    </button>
                  </td>
                  <td>{note.fileType}</td>
                  <td>{note.description}</td>
                  <td>{note.status}</td>
                  <td>
                    <Link to={`/status/${note._id}`}>Accept / Reject</Link>
                  </td>
                  <td>
                    <button
                      className="btn-style btn-danger"
                      onClick={() => handleDelete(note._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
