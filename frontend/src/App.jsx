import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Clubs from "./components/Clubs";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clubs" element={<Clubs />} />
      </Routes>
    </Router>
  );
}

export default App;
