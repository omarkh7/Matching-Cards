import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Background from "./Components/Background/Background";
import Login from "./Components/Login/Login";
import Board from "./Components/Matching/Board";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <div>
      <Background />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={isLoggedIn === true ? <Board /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
