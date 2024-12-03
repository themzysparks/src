import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./css/Profile.css";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await fetch(
        `http://${process.env.REACT_APP_VAR_HOSTNAME}/smash.php?action=getUserProfile`,
        {
          credentials: "include", // Handle authentication/session
        }
      );

      if (!response.ok) {
        throw new Error("Error fetching profile data.");
      }

      const result = await response.json();

      if (result.success) {
        setUserData(result.data);
      } else {
        throw new Error("No profile data found.");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load profile data. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!userData) {
    return <p>Error loading profile data.</p>;
  }

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-picture">
          <img
            src={`http://${process.env.REACT_APP_VAR_HOSTNAME}/uploads/${userData.profile_pics}`}
            alt="User Profile"
          />
        </div>
        <h1>{userData.u_sername}</h1>
        <p>{userData.e_mail}</p>
        <button className="edit-profile-btn" onClick={() => Swal.fire("Edit functionality coming soon!")}>
          Edit Profile
        </button>
      </div>

      {/* About Section */}
      <div className="about">
        <h2>About Me</h2>
        <p>
          <strong>Name:</strong> {userData.n_ame}
        </p>
        <p>
          <strong>Date of Birth:</strong> {userData.d_ateob}
        </p>
        <p>
          <strong>Gender:</strong> {userData.g_ender}
        </p>
      </div>
    </div>
  );
};

export default Profile;
