import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile"; // New Profile Component
import Settings from "./components/Settings"; // New Settings Component
import Matches from "./components/Matches"; // New Matches Component
import Home from "./components/Home"; // New Home Component
import "./App.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null while loading
  const [showLogin, setShowLogin] = useState(true);

  const toggleAuth = (showLogin = true) => {
    setShowLogin(showLogin);
  };
 
  // Check session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch(`http://${process.env.REACT_APP_VAR_HOSTNAME}/smash.php?action=checkSession`, {
          credentials: "include", // Include credentials for session handling
        });
        const data = await response.json();
        setIsAuthenticated(data.authenticated);
        console.log("Session check response:", data); // Debugging session status
      } catch (error) {
        setIsAuthenticated(false); // Assume unauthenticated on error
        console.error("Error fetching session:", error);
      }
    };
    checkSession();
  }, []);

  // While loading session status, show a loader or placeholder
  if (isAuthenticated === null) {
    return (
      <div className="lds-container">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Redirect based on authentication status */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace /> // Redirect to dashboard if authenticated
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <Dashboard setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login 
                onSuccessfulLogin={() => setIsAuthenticated(true)} 
                setIsAuthenticated={setIsAuthenticated} 
              />
            )
          }
        />
        
        <Route
          path="/register"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register />
            )
          }
        />
        
        {/* New Routes for Profile, Settings, Matches, Home */}
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/settings"
          element={
            isAuthenticated ? (
              <Settings />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/matches"
          element={
            isAuthenticated ? (
              <Matches />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
