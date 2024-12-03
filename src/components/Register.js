

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./css/Auth.css";

const Register = () => {
  const [e_mail, setEmail] = useState("");
  const [p_assword, setPassword] = useState("");
  const [u_sername, setUsername] = useState("");
  const [n_ame, setName] = useState("");
  const [d_ateob, setDateob] = useState("");
  const [g_ender, setGender] = useState("");
  const [c_password, setCpassword] = useState("");
  const [r_efCode, setRefCode] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validateForm = () => {
    const errors = {};

    // Name validation (at least 3 characters)
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    if (!nameRegex.test(n_ame.trim())) {
      errors.name = "Name must be at least 3 characters long and contain only letters.";
    }

    // Username validation (at least 5 characters)
    if (u_sername.trim().length < 5) {
      errors.username = "Username must be at least 5 characters long.";
    }

    // Email validation
    if (!e_mail.trim()) errors.email = "Email is required.";

    // Password validation
    if (!p_assword.trim()) errors.password = "Password is required.";
    if (p_assword !== c_password) errors.confirmPassword = "Passwords do not match.";

    // Age validation (18 or older)
    const age = calculateAge(d_ateob);
    if (!d_ateob) {
      errors.dateOfBirth = "Date of Birth is required.";
    } else if (age < 18) {
      errors.dateOfBirth = "You must be at least 18 years old.";
    }

    // Gender validation
    if (!g_ender) errors.gender = "Gender is required.";

    // Consent validation
    if (!consent) errors.consent = "You must agree to the terms and conditions.";

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch(`http://${process.env.REACT_APP_VAR_HOSTNAME}/smash.php?action=register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ e_mail, p_assword, u_sername, n_ame, d_ateob, g_ender, r_efCode }),
      });

      const data = await response.json();
      setLoading(false);

      if (data.success) {
        Swal.fire({
          title: "Registration Successful!",
          text: "You can now log in with your credentials.",
          icon: "success",
          confirmButtonText: "Go to Login",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          title: "Registration Failed",
          text: data.message || "An error occurred during registration.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (err) {
      setLoading(false);
      Swal.fire({
        title: "Error",
        text: "Failed to register. Please check your connection and try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <img src={require("./css/logo.png")} alt="Logo" className="auth-logo" />
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={n_ame}
          onChange={(e) => setName(e.target.value)}
        />
        {errors.name && <span className="error">{errors.name}</span>}

        <input
          type="text"
          placeholder="Username"
          value={u_sername}
          onChange={(e) => setUsername(e.target.value)}
        />
        {errors.username && <span className="error">{errors.username}</span>}

        <input
          type="email"
          placeholder="Email"
          value={e_mail}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <input
          type="password"
          placeholder="Password"
          value={p_assword}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <span className="error">{errors.password}</span>}

        <input
          type="password"
          placeholder="Confirm Password"
          value={c_password}
          onChange={(e) => setCpassword(e.target.value)}
        />
        {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

        <label>Date of Birth</label>
        <input
          type="date"
          value={d_ateob}
          onChange={(e) => setDateob(e.target.value)}
        />
        {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}

        <label>Gender</label>
        <select value={g_ender} onChange={(e) => setGender(e.target.value)}>
          <option value="" disabled>
            Select Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        {errors.gender && <span className="error">{errors.gender}</span>}

        <input
          type="text"
          placeholder="Referral Code (Optional)"
          value={r_efCode}
          onChange={(e) => setRefCode(e.target.value)}
        />

        <div className="consent-container">
          <input
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
          />
          <label htmlFor="consent">I agree to the terms and conditions</label>
        </div>
        {errors.consent && <span className="error">{errors.consent}</span>}

        <button type="submit" disabled={loading}>
          {loading ? <div className="loading-spinner"></div> : "Register"}
        </button>
        <p className="switch-auth">
          Already have an account?{" "}
     
     <span onClick={() => navigate("/login")} style={{ cursor: "pointer", color: "#007BFF" }}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;