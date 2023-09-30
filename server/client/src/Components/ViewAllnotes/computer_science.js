import React, { useEffect, useState } from "react";
import UserNavbar from "../Navbar/usernavbar";
import HamburgerMenu from "../Navbar/hamburger-menu";

export default function Computer() {
  const [notes, setNotes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/viewallnotes")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Filter notes with status "accept" and branch "Computer Science"
        const viewallnotes = data.filter((note) => note.status === "accept" && note.branch === "Computer Science");
        setNotes(viewallnotes);
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  // Filter notes based on searchInput
  useEffect(() =>{
    const filtered = notes.filter(
      (note) =>
      note.branch.toLowerCase().includes(searchInput.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchInput, notes]);

  return (
    <>
      <UserNavbar />
      <HamburgerMenu />

      <div className="viewall-notes m-t">
        <div className="lrgcontainer">
            <h2 className="content-heading">Computer Science Notes</h2>
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
            <table className="table" id="view_allNotes">
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
                    <button className="btn-style btn-success">
                      <a
                        href={`http://localhost:5000/viewallnotes/${note._id}/download`}
                        style={{ textDecorationLine: "none", color: "black" }}
                      >
                        Download
                      </a>
                    </button>
                  </td>
                    <td>{note.fileType}</td>
                    <td>{note.description}</td>
                    <td>{note.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}
