import React, { useState } from "react";
import Swal from "sweetalert2";
import { Button, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Settings = ({ setIsAuthenticated }) => {
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();
  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://${process.env.REACT_APP_VAR_HOSTNAME}/smash.php?action=logout`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (data.message === "Logged out successfully") {
        Swal.fire({
          title: "Success",
          text: data.message,
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          setIsAuthenticated(false); // Update global state
          //window.location.href = "/login"; // Redirect to login page
          navigate("/login", {replace: true});
        });
      } else {
        Swal.fire({
          title: "Error",
          text: data.message || "Logout failed. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while logging out. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error("Error logging out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Logout"}
      </Button>
    </div>
  );
};

export default Settings;
