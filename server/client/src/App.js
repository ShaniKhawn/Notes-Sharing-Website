import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import Main from './Components/MainPage/mainpage';
import About from './Components/About/about';
import Contact from './Components/Contact/contact';
import Admin from './Components/AdminHome/admin';
import User from './Components/UserHome/user';
import Upload from './Components/UploadNotes/upload';
import ViewAllnotes from './Components/ViewAllnotes/viewallnotes';
import Mynotes from './Components/MyNotes/mynotes';
import AcceptNotes from './Components/AcceptNotes/acceptnotes';
import RejectNotes from './Components/RejectNotes/rejectnotes';
import PendingNotes from './Components/PendingNotes/pendingnotes';
import AllNotes from './Components/AllNotes/allnotes';
import ViewUsers from './Components/ViewUsers/viewusers';
import Status from './Components/AssignStatus/status';
import ContactQueries from './Components/ContactQueries/contactqueires';
import ViewQueries from './Components/ViewQueries/viewqueries';
import Computer from './Components/ViewAllnotes/computer_science';
import Physics from './Components/ViewAllnotes/physics';
import Chemistry from './Components/ViewAllnotes/chemistry';
import Botony from './Components/ViewAllnotes/botony';
import Zoology from './Components/ViewAllnotes/zoology';
import English from './Components/ViewAllnotes/english';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/admin" element={<Admin />} />
          <Route exact path="/user" element={<User />} />
          <Route exact path="/upload" element={<Upload />} />
          <Route exact path="/viewallnotes" element={<ViewAllnotes />} />
          <Route exact path="/mynotes" element={<Mynotes />} />
          <Route exact path="/acceptnotes" element={<AcceptNotes />} />
          <Route exact path="/rejectnotes" element={<RejectNotes />} />
          <Route exact path="/pendingnotes" element={<PendingNotes />} />
          <Route exact path="/allnotes" element={<AllNotes />} />
          <Route exact path="/viewusers" element={<ViewUsers />} />
          <Route exact path="/status/:noteId" element={<Status />} />
          <Route exact path='/contactqueries' element={<ContactQueries />} />
          <Route exact path='/viewqueries/:queryId' element={<ViewQueries />} />
          <Route exact path="/computer_science" element={<Computer />} />
          <Route exact path='/physics' element={<Physics />} />
          <Route exact path='/chemistry' element={<Chemistry />} />
          <Route exact path='/botony' element={<Botony />} />
          <Route exact path='/zoology' element={<Zoology />} />
          <Route exact path='/english' element={<English />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
