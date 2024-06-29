import './App.css';
import Navbar from './Components/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Login from './Pages/Login.jsx';
import Register from './Pages/Register.jsx';
import Problems from './Pages/Problems.jsx';
import ProbEditor from './Pages/Problemeditor.jsx'; // Assuming this is renamed ProbEditor.jsx
import CreateProb from './Pages/CreateProblem.jsx';
import EditProb from './Pages/EditProblem.jsx'; // Import EditProb.jsx

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/logout' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/problems' element={<Problems />} />
          <Route path='/editor/:id' element={<ProbEditor />} /> {/* Assuming ProbEditor.jsx is used */}
          <Route path='/createProb' element={<CreateProb />} />
          <Route path='/editProb/:id' element={<EditProb />} /> {/* Route for EditProb.jsx */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
