import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = async () => {

        try {

            const token = localStorage.getItem("token");

            await axios.put(
                "http://127.0.0.1:8000/change-password",
                {
                    old_password: oldPassword,
                    new_password: newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert("Password Changed Successfully");

            setOldPassword("");
            setNewPassword("");

        }

        catch (error) {

            console.log(error);

            alert("Unable to change password");

        }

    };

    return (

        <>
            <Navbar />

            <div
                style={{
                    width: "500px",
                    margin: "40px auto",
                    background: "white",
                    padding: "30px",
                    borderRadius: "12px",
                    border: "1px solid #ddd"
                }}
            >

                <h1>🔒 Change Password</h1>

                <br />

                <input
                    type="password"
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                    style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"15px"
                    }}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                    style={{
                        width:"100%",
                        padding:"12px",
                        marginBottom:"20px"
                    }}
                />

                <button
                    onClick={changePassword}
                    style={{
                        padding:"12px 25px",
                        background:"#5F8D7A",
                        color:"white",
                        border:"none",
                        borderRadius:"10px",
                        cursor:"pointer"
                    }}
                >
                    Change Password
                </button>

            </div>

        </>

    );

}

export default ChangePassword;