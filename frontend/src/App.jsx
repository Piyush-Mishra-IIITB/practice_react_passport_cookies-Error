import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <h2>Getting started</h2>

      <button
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </button>
      <br />
      <button
        onClick={() => {
          navigate("/signup");
        }}
      >
        Signup
      </button>
    </>
  );
}

export default App;
