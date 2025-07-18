import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/components/AuthForm.css";
import customerIcon from "../../assets/customer-icon.png";
import sellerIcon from "../../assets/seller-icon.png";


export default function LoginChoice() {
    const navigate = useNavigate();


    const handleLogin = (role) => {
        navigate("/login", { state: { role } });
    };

    return (
        <div className="choice-wrapper">
            <div className="choice-box" onClick={() => handleLogin("customer")}>
                <img src={customerIcon} alt="Customer" className="icon" />
                <div>
                    Login as a <strong>Customer</strong>
                </div>
            </div>

            <div className="choice-box" onClick={() => handleLogin("seller")}>
                <img src={sellerIcon} alt="Seller" className="icon" />
                <div>
                    Login as a <strong>Seller</strong>
                </div>
            </div>
        </div>
    );
}
