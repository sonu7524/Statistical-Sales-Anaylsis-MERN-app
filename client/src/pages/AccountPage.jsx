import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import accountImg from "../assets/account.png";

export default function AccountPage() {
    let[user,setUser] = useState({});

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        const email = sessionStorage.getItem("email");
        const userId = sessionStorage.getItem("user_id");
        setUser({username,email,userId});
    }, []);
    return (
        <div>
            <Header />
            <div className="account">
                <div className="account-card">
                    <div className="account-title">
                        <h1>ACCOUNT</h1>
                        <img style={{width: "10rem", height: "10rem"}} src={accountImg} alt="account" />
                    </div>
                    <div className="account-details">
                        <h4>User-ID: {user.userId}</h4>
                        <p>Name: {user.username}</p>
                        <p>Email: {user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}