import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from './SignIn';
import { Location } from './Location';
import { Food } from './Food';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/location" element={<Location />} />
        <Route path="/food" element={<Food />} />
      </Routes>
    </Router>
  );
}

export default App;
