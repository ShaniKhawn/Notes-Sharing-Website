import React from "react";
import UserNavbar from "../Navbar/usernavbar";
import "../ViewAllnotes/css.css"

export default function Mynotes() {
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

                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}