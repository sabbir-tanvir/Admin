import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/AuthForm.css";
import customerIcon from "../../assets/customer-icon.png";
import sellerIcon from "../../assets/seller-icon.png";

export default function SignupChoice() {
    const navigate = useNavigate();

    const handleSignup = (role) => {
        navigate("/signup", { state: { role } });
    };

    return (
        <div className="choice-wrapper">
            <div className="choice-box" onClick={() => handleSignup("customer")}>
                <img src={customerIcon} alt="Customer" className="icon" />
                <div>
                    Sign up as a <strong>Customer</strong>
                </div>
            </div>

            <div className="choice-box" onClick={() => handleSignup("seller")}>
                <img src={sellerIcon} alt="Seller" className="icon" />
                <div>
                    Sign up as a <strong>Seller</strong>
                </div>
            </div>
        </div>
    );
}
