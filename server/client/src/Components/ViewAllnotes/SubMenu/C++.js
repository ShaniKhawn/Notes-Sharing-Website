import React, { useEffect, useState } from "react";
import UserNavbar from "../../Navbar/usernavbar";

export default function Programming() {
  const [notes, setNotes] = useState([]);

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
        const viewallnotes = data.filter((note) => note.status === "accept" && note.branch === "Computer Science"
        && note.subject === "C++");
        setNotes(viewallnotes);
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const handleDownload = (downloadLink) => {
    window.location.href = downloadLink;
  };


  return (
    <>
      <UserNavbar />

      <div className="viewall-notes m-t">
        <div className="lrgcontainer">
            <h2 className="content-heading">Computer Science Notes</h2>
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
                {notes.map((note, index) => (
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </>
  );
}
