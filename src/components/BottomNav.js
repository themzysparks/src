import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";

const BottomNav = ({ selectedPage, setSelectedPage }) => {
  return (
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', bottom: 0 }}
      showLabels
      value={selectedPage} // Bind the selected page to BottomNavigation's value
      onChange={(event, newValue) => setSelectedPage(newValue)} // Update the selected page
    >
      <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} />
      <BottomNavigationAction label="Matches" value="matches" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Settings" value="settings" icon={<SettingsIcon />} />
    </BottomNavigation>
  );
};

export default BottomNav;
