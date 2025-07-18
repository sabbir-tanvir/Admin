import React, { useState } from "react";
import "../../styles/components/AuthForm.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import FacebookIcon from "../../assets/facebook.png";
import GoogleIcon from "../../assets/google.png";
import { loginUser, socialAuth } from "../../services/api.js";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const location = useLocation();
    const role = location.state?.role || "customer";

    const handleLogin = async () => {
        try {
            const res = await loginUser({ ...form, role });
            alert("Login successful");
            navigate("/dashboard");
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
                    <h2>{role === "seller" ? "Seller Login" : "Customer Login"}</h2>
                    <input type="email" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                    <div className="forgot" onClick={() => navigate("/forgot-password", { state: { role } })}>
                        Forgot Password?
                    </div>

                    <button onClick={handleLogin}>Login</button>

                    <div className="alt">or Continue with</div>
                    <div className="social-btns">
                        <img src={FacebookIcon} alt="Facebook" onClick={() => handleSocial("facebook")} />
                        <img src={GoogleIcon} alt="Google" onClick={() => handleSocial("google")} />
                    </div>
                    <div className="link">
                        Don’t have an account? <Link to="/signup-select">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
