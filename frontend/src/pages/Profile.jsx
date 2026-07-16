import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Input from "../components/Input";
import api from "../services/api";

function Profile() {

    const [user, setUser] = useState({

        full_name: "",
        email: "",
        phone: ""

    });

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {

        loadProfile();

    }, []);

    const loadProfile = async () => {

        try {

            const response = await api.get("/me");

            setUser(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load profile");

        }

    };

    const updateProfile = async () => {

        try {

            await api.put(

                "/me",

                {

                    full_name: user.full_name,
                    email: user.email,
                    phone: user.phone

                }

            );

            toast.success("Profile Updated Successfully");

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to update profile");

        }

    };

    const changePassword = async () => {

        if (

            oldPassword.trim() === "" ||
            newPassword.trim() === ""

        ) {

            toast.error("Please fill both password fields");

            return;

        }

        try {

            await api.put(

                "/change-password",

                {

                    old_password: oldPassword,
                    new_password: newPassword

                }

            );

            toast.success("Password Changed Successfully");

            setOldPassword("");
            setNewPassword("");

        }

        catch (error) {

            console.log(error);

            if (error.response?.data?.message) {

                toast.error(error.response.data.message);

            }

            else {

                toast.error("Unable to change password");

            }

        }

    };

    return (

        <>

            <Navbar />

            <div

                style={{

                    maxWidth: "1100px",
                    width: "92%",
                    margin: "40px auto"

                }}

            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "35px"
                    }}
                >

                    <h1
                        style={{
                            color: "#355C4A",
                            fontSize: "40px",
                            marginBottom: "10px"
                        }}
                    >

                        👤 My Profile

                    </h1>

                    <p
                        style={{
                            color: "#666",
                            fontSize: "17px"
                        }}
                    >

                        Manage your account information and security.

                    </p>

                </div>

                <div

                    style={{

                        display: "grid",

                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(320px, 1fr))",

                        gap: "30px",

                        alignItems: "start"

                    }}

                >

                    <div

                        style={{

                            background: "#FFFFFF",

                            padding: "30px",

                            borderRadius: "18px",

                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.08)",

                            border: "1px solid #E8ECEB"

                        }}

                    >

                        <h2
                            style={{
                                color: "#355C4A",
                                marginBottom: "20px"
                            }}
                        >

                            👤 Personal Information

                        </h2>

                        <Input

                            placeholder="Full Name"

                            value={user.full_name}

                            onChange={(e)=>

                                setUser({

                                    ...user,

                                    full_name:e.target.value

                                })

                            }

                        />

                        <Input

                            type="email"

                            placeholder="Email"

                            value={user.email}

                            disabled

                        />

                        <Input

                            placeholder="Phone"

                            value={user.phone}

                            disabled

                        />

                        <Button

                            fullWidth

                            onClick={updateProfile}

                        >

                            Save Changes

                        </Button>

                    </div>

                    <div

                        style={{

                            background:"#FFFFFF",

                            padding:"30px",

                            borderRadius:"18px",

                            boxShadow:
                                "0 10px 25px rgba(0,0,0,0.08)",

                            border:"1px solid #E8ECEB"

                        }}

                    >

                        <h2
                            style={{
                                color:"#355C4A",
                                marginBottom:"20px"
                            }}
                        >

                            🔒 Security

                        </h2>

                        <Input

                            type="password"

                            placeholder="Current Password"

                            value={oldPassword}

                            onChange={(e)=>

                                setOldPassword(e.target.value)

                            }

                        />

                        <Input

                            type="password"

                            placeholder="New Password"

                            value={newPassword}

                            onChange={(e)=>

                                setNewPassword(e.target.value)

                            }

                        />

                        <Button

                            fullWidth

                            onClick={changePassword}

                        >

                            Change Password

                        </Button>

                    </div>

                </div>

            </div>

        </>

    );

}
export default Profile;