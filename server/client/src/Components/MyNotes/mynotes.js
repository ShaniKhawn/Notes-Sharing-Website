import React, { useState, useEffect } from "react";
import UserNavbar from "../Navbar/usernavbar";
import "../ViewAllnotes/css.css";

export default function Mynotes() {
  const [notes, setNotes] = useState([]);
  const currentUserID = localStorage.getItem("user");

  useEffect(() => {
    fetch("http://localhost:5000/myNotes")
      .then((response) => response.json())
      .then((data) => setNotes(data))
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // Delete the notes
  const handleDelete = (noteId) => {
    const confirmed = window.confirm("Are you sure to delete this note?");

    if (!confirmed) {
      return;
    }

    fetch(`http://localhost:5000/pendingnotes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  const filteredNotes = notes.filter((note) => note.user._id === currentUserID);

  return (
    <>
      <UserNavbar />

      <main className="my-notes m-t">
        <div className="lrgcontainer">
          <h2 className="content-heading">View My Notes</h2>
          <table className="table" id="myNotes">
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
                        href={`http://localhost:5000/acceptNotes/${note._id}/download`}
                        style={{ textDecorationLine: "none", color: "black" }}
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
