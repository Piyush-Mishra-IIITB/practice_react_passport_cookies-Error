import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form");
      const res = await axios.post(
        "http://localhost:8080/addnewUser",
        {
          name: username,
          email: email,
          password: password
        },{
          withCredentials:true
        }
      );

      console.log(res.data);
      alert("Signup successful");

      setUsername("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />

      <button type="submit">Signup</button>

    </form>
  );
}

export default Signup;
