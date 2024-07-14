import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import UpPhoto from "./components/upload/UpPhoto";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UpPhoto />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
