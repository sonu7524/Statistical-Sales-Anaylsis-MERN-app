import React from "react";
import Signup from "../components/Auth/Signup";
import Header from "../components/common/Header";

export default function SignupPage() {
    return (
        <div className="signup-page">
            <Header />
            <Signup />
        </div>
    )
}