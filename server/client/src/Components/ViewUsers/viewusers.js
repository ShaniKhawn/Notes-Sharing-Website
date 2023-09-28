import React, { useEffect, useState } from "react";
import AdminNavbar from "../Navbar/adminnavbar";
import DataTable from "react-data-table-component";
import { MdDeleteOutline } from "react-icons/md";

export default function ViewUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    // Fetch users from the backend API
    fetch("http://localhost:5000/viewUsers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    // Filter users based on search
    const filtered = users.filter((user) => {
      const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
      const userEmail = user.email.toLowerCase();
      const searchTerm = search.toLowerCase();
      return fullName.includes(searchTerm) || userEmail.includes(searchTerm);
    });
    setFilteredUsers(filtered);
  }, [search, users]);

  // Define columns for the DataTable
  const columns = [
    {
      name: "S.No",
      selector: (row, index) => index + 1,
      sortable: true,
      center: true,
    },
    {
      name: "Full Name",
      selector: "name",
      sortable: true,
      center: true,
    },
    {
      name: "Email ID",
      selector: "email",
      sortable: true,
      center: true,
    },
    {
      name: "Role",
      selector: "role",
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      center: true,
      cell: (row) => (
        <MdDeleteOutline
          onClick={() => handleDeleteUser(row._id)}
          className="delete-icon"
          style={{ cursor: "pointer" }}
        />
      ),
    },
  ];

  // Delete User
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure to delete this user?")) {
      try {
        // delete the user by ID
        const response = await fetch(
          `http://localhost:5000/viewUsers/${userId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          // Refetch the user data from the server or remove the user from the local state.
        } else {
          // If the user deletion fails
          const data = await response.json();
          alert(data.message);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const costumStyle = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "bold",
        border: "1px solid #ccc",
      
      },
    },
    cells: {
      style: {
        border: "1px solid #ddd",
      },
    },
  };

  return (
    <>
      <AdminNavbar />

      <main className="view-users m-t">
        <div className="container1">
          <h2 className="content-heading">View Users</h2>
          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            fixedHeader
            highlightOnHover
            customStyles={costumStyle}
            subHeader
            subHeaderComponent={
              <input
                type="text"
                placeholder=" Search"
                style={{ width: '30%', height: '30px' }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            }
          />
        </div>
      </main>
    </>
  );
}
