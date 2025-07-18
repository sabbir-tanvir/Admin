import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/components/AuthForm.css";
import { forgotPassword } from "../../services/api.js";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const location = useLocation();
  const role = location.state?.role || "customer";

  const handleReset = async () => {
    try {
      await forgotPassword({ email, role });
      alert("Password reset link sent to your email.");
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left" />
      <div className="auth-right">
        <div className="auth-box">
          <h2>{role === "seller" ? "Seller" : "Customer"} Reset Password</h2>
          <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleReset}>Send</button>
        </div>
      </div>
    </div>
  );
}
