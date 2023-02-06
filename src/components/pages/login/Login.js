import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { axiosClient } from "../../../utils/axiosClient";
import { KEY_ACCESS_TOKEN, setItem } from "../../../utils/localStorageManager";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClient.post("/auth/login", {
        email,
        password,
      });
      setItem(KEY_ACCESS_TOKEN, `${response.result.accessToken}`)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
    <h1 className="site-title">SocioPost</h1>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Log In</button>
        </form>
        <small>
          Don't have account? <Link to="/signup">Sign Up</Link>
        </small>
      </div>
    </div>
  );
}
