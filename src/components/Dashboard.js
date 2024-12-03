import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import Profile from "./Profile";
import Settings from "./Settings";
import Matches from "./Matches";
import Home from "./Home";
import BottomNav from "./BottomNav"; // Bottom Navigation Component

const Dashboard = ({ setIsAuthenticated }) => {
  const [selectedPage, setSelectedPage] = useState("home"); // Default to Home

  // Function to render content based on selected page
  const renderPageContent = () => {
    switch (selectedPage) {
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings setIsAuthenticated={setIsAuthenticated} />;
      case "matches":
        return <Matches />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Fixed Header */}
      <AppBar position="fixed" color="primary" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Smash Or Pass
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f4f4f9",
          padding: 3,
          overflowY: "auto",
          mt: "64px", // Add margin to account for fixed header height
          mb: "56px", // Add margin to account for fixed bottom nav height
        }}
      >
        {renderPageContent()} {/* Render selected page content */}
      </Box>

      {/* Fixed Bottom Navigation */}
      <BottomNav selectedPage={selectedPage} setSelectedPage={setSelectedPage} />
    </Box>
  );
};

export default Dashboard;
