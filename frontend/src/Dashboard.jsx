import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/dashboard", {
        withCredentials: true
      })
      .then((res) => {
        console.log("Dashboard data:", res.data);
      })
      .catch(() => {
        navigate("/login");
      });
  }, []);

  return <h1>Dashboard</h1>;
}

export default Dashboard;
