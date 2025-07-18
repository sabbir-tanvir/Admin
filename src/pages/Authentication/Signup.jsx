import React, { useState } from "react";
import "../../styles/components/AuthForm.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import FacebookIcon from "../../assets/facebook.png";
import GoogleIcon from "../../assets/google.png";
import { signupUser, socialAuth } from "../../services/api.js";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "customer";

  const handleSignup = async () => {
    if (form.password !== form.confirm) return alert("Passwords do not match");
    try {
      const res = await signupUser({ ...form, role });
      alert("Signup successful");
      navigate("/login", { state: { role } });
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleSocial = async (type) => {
    try {
      const res = await socialAuth(type, role);
      window.location.href = res.data.redirectUrl;
    } catch (err) {
      alert("OAuth failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left" />
      <div className="auth-right">
        <div className="auth-box">
          <h2>{role === "seller" ? "Seller Sign up" : "Customer Sign up"}</h2>
          <input type="text" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input type="password" placeholder="Confirm Password" onChange={(e) => setForm({ ...form, confirm: e.target.value })} />
          <button onClick={handleSignup}>Sign up</button>

          <div className="alt">or Continue with</div>
          <div className="social-btns">
            <img src={FacebookIcon} alt="Facebook" onClick={() => handleSocial("facebook")} />
            <img src={GoogleIcon} alt="Google" onClick={() => handleSocial("google")} />
          </div>
          <div className="link">
            Already have an account? <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
