import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = ({ toggleAuth, setIsAuthenticated }) => {
  const [e_mail, setEmail] = useState("");
  const [p_assword, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true); // Start loading

    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_VAR_HOSTNAME}/smash.php?action=login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Include credentials for session handling
          body: JSON.stringify({ e_mail, p_assword }), // Send login data
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error: ${errorText || response.statusText}`);
      }

      const data = await response.json();

      if (data?.authenticated) {
        setIsAuthenticated(true); // Update authentication state
        Swal.fire({
          title: "Success!",
          text: "Login successful!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard", { replace: true }); // Redirect to dashboard
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: data.message || "Invalid login credentials.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      setError(`An error occurred: ${err.message}`);
      Swal.fire({
        title: "Error!",
        text: `An error occurred: ${err.message}`,
        icon: "error",
        confirmButtonText: "Try Again",
      });
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleLogin}>
        <img src={require("./css/logo.png")} alt="Logo" className="auth-logo" />
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={e_mail}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={p_assword}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error">{error}</p>} {/* Display error if exists */}
        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="loading-spinner"></div> // Spinner inside button
          ) : (
            "Login"
          )}
        </button>
        <p className="switch-auth">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register", { replace: true })}
            style={{ cursor: "pointer", color: "#007BFF" }}
          >
            Register Here
          </span>
        </p>
      </form>
    </div>
  );
  
};

export default Login;
