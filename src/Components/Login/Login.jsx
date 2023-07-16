import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUsername, setLoggedIn } from "../../Features/loginSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const [username, setUsernameLocal] = useState("");
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username.length >= 3) {
      dispatch(setUsername(username));
      dispatch(setLoggedIn(true));
      sessionStorage.setItem("loggedIn", "true");
      sessionStorage.setItem("username", username);
      window.location.href = "/";
    } else {
      toast.error("Username must contain at least three characters.");
    }
  };

  return (
    <div >
      <div className="form-container">
        <div className="form-group">
          <label>Matching Cards</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsernameLocal(e.target.value)}
          />
        
        <button className="login-button" onClick={handleLogin}>
          <span>
          Login
          </span>
        </button>
      </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Login;
