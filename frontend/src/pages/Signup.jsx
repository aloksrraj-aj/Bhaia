import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";

import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/login.css";

function Signup() {

    const navigate = useNavigate();

    const [user, setUser] = useState({

        full_name: "",

        email: "",

        phone: "",

        password: ""

    });

    const signupUser = async () => {

        try {

            const response = await api.post(

                "/signup",

                user

            );

            toast.success(response.data.message);

            navigate("/login");

        }

        catch (error) {

            console.log(error);

            if (error.response) {

                if (error.response.data.detail) {

                    toast.error(error.response.data.detail);

                }

                else if (error.response.data.message) {

                    toast.error(error.response.data.message);

                }

                else {

                    toast.error("Signup Failed");

                }

            }

            else {

                toast.error("Unable to connect to server");

            }

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="logo">

                    🛒

                </div>

                <h1>Create Account</h1>

                <p>

                    Join Bhaia and compare grocery prices easily.

                </p>

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

                    onChange={(e)=>

                        setUser({

                            ...user,

                            email:e.target.value

                        })

                    }

                />

                <Input

                    placeholder="Phone Number"

                    value={user.phone}

                    onChange={(e)=>

                        setUser({

                            ...user,

                            phone:e.target.value

                        })

                    }

                />

                <Input

                    type="password"

                    placeholder="Password"

                    value={user.password}

                    onChange={(e)=>

                        setUser({

                            ...user,

                            password:e.target.value

                        })

                    }

                />

                <Button

                    onClick={signupUser}

                    fullWidth

                >

                    Create Account

                </Button>

                <br />
                <br />

                <p>

                    Already have an account?

                </p>

                <button

                    onClick={()=>navigate("/login")}

                    style={{

                        background:"transparent",

                        border:"none",

                        color:"#5F8D7A",

                        cursor:"pointer",

                        fontWeight:"600",

                        fontSize:"15px"

                    }}

                >

                    Login

                </button>

            </div>

        </div>

    );

}

export default Signup;