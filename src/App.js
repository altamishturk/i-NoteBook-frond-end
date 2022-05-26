import './App.css';
import TopNavBar from './components/TopNavBar/TopNavBar'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Notes from './containers/Notes/Notes';
import Home from './containers/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NotesContext from './Context/note/NoteContext';
import { useContext } from 'react';



function App() {
  const NotesState = useContext(NotesContext);

  return (
   
    <Router>
    <div className="App">
      <TopNavBar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/notes" element={NotesState.isLoggedIn? <Notes />:<Login />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<SignUp />}/>
        </Routes>
    </div>
    </Router>

  );
}

export default App;
