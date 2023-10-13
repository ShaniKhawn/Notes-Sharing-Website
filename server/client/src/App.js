import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/signup";
import Login from "./Components/Login/login";
import Main from "./Components/HomePage/homepage";
import About from "./Components/About/about";
import Contact from "./Components/Contact/contact";
import User from "./Components/User/UserHome/user";
import Upload from "./Components/User/UploadNotes/upload";
import ViewAllnotes from "./Components/User/ViewAllnotes/viewallnotes";
import Mynotes from "./Components/User/MyNotes/mynotes";
import Admin from "./Components/Admin/AdminHome/admin";
import AcceptNotes from "./Components/Admin/AcceptNotes/acceptnotes";
import RejectNotes from "./Components/Admin/RejectNotes/rejectnotes";
import PendingNotes from "./Components/Admin/PendingNotes/pendingnotes";
import AllNotes from "./Components/Admin/AllNotes/allnotes";
import ViewUsers from "./Components/Admin/ViewUsers/viewusers";
import Status from "./Components/Admin/AssignStatus/status";
import ContactQueries from "./Components/Admin/ContactQueries/contactqueires";
import ViewQueries from "./Components/Admin/ViewQueries/viewqueries";
import Profile from "./Components/Profile/profile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/user/upload" element={<Upload />} />
          <Route exact path="/user/viewallnotes" element={<ViewAllnotes />} />
          <Route exact path="/user/mynotes" element={<Mynotes />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/admin/acceptnotes" element={<AcceptNotes />} />
          <Route exact path="/admin/rejectnotes" element={<RejectNotes />} />
          <Route exact path="/admin/pendingnotes" element={<PendingNotes />} />
          <Route exact path="/admin/allnotes" element={<AllNotes />} />
          <Route exact path="/admin/viewusers" element={<ViewUsers />} />
          <Route
            exact
            path="/admin/pendingnotes/status/:noteId"
            element={<Status />}
          />
          <Route
            exact
            path="/admin/contactqueries"
            element={<ContactQueries />}
          />
          <Route
            exact
            path="/admin/contactqueries/viewqueries/:queryId"
            element={<ViewQueries />}
          />
          <Route exact path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
