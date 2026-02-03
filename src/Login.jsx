import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [siteId, setSiteId] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
        const response = await axios.post(
        "http://localhost:8083/api/v1/auth/login",
        {
          username,
          siteId,
        }
      );

      // localStorage.setItem("token", response.data.token);

      navigate("/home");
    } catch (error) {
      console.error("Login failed", error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="border border-dark rounded w-50 p-5 m-5 text-center mx-auto d-flex flex-column">
      <h1 className="display-1">Login</h1>

      <input
        type="text"
        className="form-control"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        className="form-control mt-3"
        placeholder="Site id"
        value={siteId}
        onChange={(e) => setSiteId(e.target.value)}
      />

      <button
        className="btn btn-outline-dark mt-5 px-5"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};
