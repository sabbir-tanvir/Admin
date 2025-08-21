import React, { useState } from "react";
import "../styles/components/AuthForm.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { toast } from 'react-toastify';

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try {
            const role = await login(form);
            // Navigate based on role
            if (role === 'owner') navigate('/dashboard', { replace: true });
            else if (role === 'seller') navigate('/seller-panel', { replace: true });
            else if (role === 'marketer') navigate('/marketor-panel', { replace: true });
            else if (role === 'customer') navigate('/customer', { replace: true });
            else navigate('/unauthorized', { replace: true });
        } catch (err) {
            toast.error(err.response?.data?.message || err.message || 'Login failed');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-left" />
            <div className="auth-right">
                <form className="auth-box" onSubmit={handleLogin}>
                    <h2>Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={form.username}
                        onChange={(e) => setForm({ ...form, username: e.target.value })}
                        required
                    />
                        <input
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />
                    <button type="submit" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</button>
                </form>
            </div>
        </div>
    );
}
