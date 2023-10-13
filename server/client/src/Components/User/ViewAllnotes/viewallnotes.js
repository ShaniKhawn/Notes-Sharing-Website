import React, { useEffect, useState } from "react";
import UserNavbar from "../../Navbar/usernavbar";
import "./css.css";

export default function ViewAllnotes() {
  const [notes, setNotes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("All");
  const [selectedSubject, setSelectedSubject] = useState("All");
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [branchSubjects, setBranchSubjects] = useState([]);
  const [uniqueBranches, setUniqueBranches] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);

  useEffect(() => {
    // Fetch notes
    fetch("http://localhost:5000/viewallnotes")
      .then((response) => response.json())
      .then((data) => {
        const viewAllNotes = data.filter((note) => note.status === "accept");
        setNotes(viewAllNotes);
        setUniqueBranches(Array.from(new Set(viewAllNotes.map((note) => note.branch))));
        setUniqueSubjects(Array.from(new Set(viewAllNotes.map((note) => note.subject))));
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  useEffect(() => {
    // Calculate branchSubjects based on selectedBranch
    if (selectedBranch !== "All") {
      const subjectsForBranch = uniqueSubjects.filter((subject) =>
        notes.some(
          (note) =>
            note.branch.toLowerCase() === selectedBranch.toLowerCase() &&
            note.subject.toLowerCase() === subject.toLowerCase()
        )
      );
      setBranchSubjects(subjectsForBranch);
    } else {
      setBranchSubjects([]);
    }
  }, [selectedBranch, uniqueSubjects, notes]);

  useEffect(() => {
    // Filter notes based on searchInput, selectedBranch, and selectedSubject
    const filtered = notes.filter(
      (note) =>
        (selectedBranch === "All" ||
          note.branch.toLowerCase() === selectedBranch.toLowerCase()) &&
        (selectedSubject === "All" ||
          note.subject.toLowerCase() === selectedSubject.toLowerCase()) &&
        note.subject.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredNotes(filtered);
  }, [searchInput, selectedBranch, selectedSubject, notes]);

  return (
    <>
      <UserNavbar />

      <div className="viewall-notes m-t">
        <div className="lrgcontainer">
          <h2 className="content-heading">{selectedBranch} Notes</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Subject"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              style={{
                float: "right",
                padding: "10px",
                width: "20%",
                marginBlockEnd: "20px",
                font: "icon",
              }}
            />
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              style={{
                float: "left",
                padding: "10px",
                width: "20%",
                marginBlockEnd: "20px",
                font: "icon",
              }}
            >
              <option value="All">All Branches</option>
              {uniqueBranches.map((branch) => (
                <option key={branch} value={branch}>
                  {branch}
                </option>
              ))}
            </select>
            {selectedBranch !== "All" && (
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={{
                  float: "left",
                  padding: "10px",
                  width: "15%",
                  marginBlockEnd: "20px",
                  font: "icon",
                }}
              >
                <option value="All">All Subjects</option>
                {branchSubjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            )}
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
