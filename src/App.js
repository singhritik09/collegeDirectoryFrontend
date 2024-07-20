import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import PageTransition from './Components/PageTransition'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageTransition><Login /></PageTransition>} />
      </Routes>
    </Router>
  );
}

export default App;
