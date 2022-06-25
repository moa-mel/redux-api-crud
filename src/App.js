import React from 'react'
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Task from './pages/Task';

function App() {
  return (
    <div className="App">
     <Router>
     <div className="container">
     <Sidebar/>
     <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/save" element={<Task/>} />
     </Routes>
     </div>
     </Router>
    </div>
  );
}

export default App;
