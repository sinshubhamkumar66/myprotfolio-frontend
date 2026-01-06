import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import { login, signup } from "../services/AuthApi";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = isLogin
        ? await login({ username, password })
        : await signup({ username, password, role: "USER" });

      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);
        navigate("/");
      } else {
        alert("Signup successful. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        <div className="auth-toggle">
          <button className={isLogin ? "active" : ""} onClick={() => setIsLogin(true)}>Login</button>
          <button className={!isLogin ? "active" : ""} onClick={() => setIsLogin(false)}>Signup</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input placeholder="Username" onChange={e => setUsername(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
          <button>{isLogin ? "Login" : "Signup"}</button>
        </form>

      </div>
    </div>
  );
}
