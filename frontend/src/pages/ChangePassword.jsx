import { useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";

function ChangePassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const changePassword = async () => {

        try {

            await api.put(
                "/change-password",
                {
                    old_password: oldPassword,
                    new_password: newPassword
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
                    onChange={(e) => setOldPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px"
                    }}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "20px"
                    }}
                />

                <button
                    onClick={changePassword}
                    style={{
                        padding: "12px 25px",
                        background: "#5F8D7A",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer"
                    }}
                >
                    Change Password
                </button>

            </div>

        </>

    );

}

export default ChangePassword;