import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg("");
    setSuccessMsg("");

    try {
      const res = await axios.post("http://localhost:8080/login", {
        email: username,
        password: password},{
          withCredentials:true,
        }
      );

      setSuccessMsg(res.data.message);
      localStorage.setItem("loggedIn", "true");

       navigate("/dashboard");

      setUsername("");
      setPassword("");

    } catch (error) {
      setErrorMsg(error.response?.data?.error || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}

      <input
        type="text"
        placeholder="Email"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <button type="submit">Login</button>

    </form>
  );
}

export default Login;
