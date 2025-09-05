import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import LearnMore from './components/LearnMore';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn-more" element={<LearnMore />} />
      </Routes>
    </Router>
  );
}

export default App;