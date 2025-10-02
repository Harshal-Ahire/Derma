import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// CSS import
import './index.css';

import Home from "./pages/Home";
import Analyse from "./pages/Analyse";
import History from "./pages/History";
import Evaluation from "./pages/Evaluation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analyse" element={<Analyse />} />
        <Route path="/history" element={<History />} />
        <Route path="/evaluation" element={<Evaluation />} />
      </Routes>
    </Router>
  );
}

export default App;
