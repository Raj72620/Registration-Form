import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/users" element={<UserList />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;