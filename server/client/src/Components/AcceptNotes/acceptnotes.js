import React, { useEffect, useState } from "react";
import AdminNavbar from "../Navbar/adminnavbar";

export default function AcceptNotes() {
  const [acceptedNotes, setAcceptedNotes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/acceptNotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Filter notes with "accept" status
        const acceptNotes = data.filter((note) => note.status === "accept");
        setAcceptedNotes(acceptNotes);
      })
      .catch((error) => console.error("Error fetching accepted notes:", error));
  }, []);

  // Filter notes based on searchInput
  useEffect(() => {
    const filtered = acceptedNotes.filter(
      (note) =>
        // note.user.name.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.branch.toLowerCase().includes(searchInput.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchInput, acceptedNotes]);

  //Download notes

  const handleDownload = (downloadLink) => {
    window.location.href = downloadLink;
  };

  //Delete the notes
  const handleDelete = (noteId) => {
    const confirmed = window.confirm("Are you sure to delete this note?");

    if (!confirmed) {
      return; // Do nothing if the user cancels the deletion
    }

    fetch(`http://localhost:5000/acceptNotes/${noteId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Remove the deleted note from the state in which it is present
        setAcceptedNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== noteId)
        );
      })
      .catch((error) => console.error("Error deleting note:", error));
  };

  return (
    <>
      <AdminNavbar />

      <main className="accepted-notes m-t">
        <div className="lrgcontainer">
          <h2 className="content-heading">Accepted Notes</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Branch or Subject"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{ float: "right", padding: "10px", width: "30%", marginBlockEnd:'20px', font:'icon' }}
            />
          </div>
          <table className="table" id="acceptedNotes">
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
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{note.user.name}</td>
                  <td>{new Date(note.uploadingDate).toLocaleDateString()}</td>
                  <td>{note.branch}</td>
                  <td>{note.subject}</td>
                  <td>
                    {" "}
                    <button
                      className="btn-style btn-success"
                      onClick={() => handleDownload(note.downloadLink)}
                    >
                      Download
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
