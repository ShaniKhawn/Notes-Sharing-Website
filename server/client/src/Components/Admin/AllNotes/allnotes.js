import React, { useEffect, useState } from "react";
import AdminNavbar from "../../Navbar/adminnavbar";

export default function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allNotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching all notes:", error));
  }, []);

  // Filter notes based on searchInput
  useEffect(() => {
    const filtered = notes.filter(
      (note) =>
        note.branch.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchInput, notes]);

  //Delete the notes
  const handleDelete = (noteId) => {
    const confirmed = window.confirm("Are you sure to delete this note?");

    if (!confirmed) {
      return;
    }

    fetch(`http://localhost:5000/allNotes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
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

      <main className="all-notes m-t">
        <div className="lrgcontainer">
          <h2 className="content-heading">All Notes</h2>
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
          <table className="table" id="allNotes">
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
                    <button className="btn-style btn-success">
                      <a
                        href={`http://localhost:5000/allNotes/${note._id}/download`}
                        style={{textDecorationLine: "none", color: "black"}}
                      >
                        Download
                      </a>
                    </button>
                  </td>
                  <td>{note.fileType}</td>
                  <td>{note.description}</td>
                  <td>{note.status}</td>
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
