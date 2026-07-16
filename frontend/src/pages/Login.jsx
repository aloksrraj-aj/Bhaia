import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import "../styles/login.css";
import Button from "../components/Button";
import Input from "../components/Input";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const loginUser = async () => {

        try {

            const response = await axios.post(
                "http://127.0.0.1:8000/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            toast.success("Login Successful");

            navigate("/");

        }

        catch (error) {

            console.log(error);

            if (error.response) {

                toast.error(
                    error.response.data.detail
                );

            }

            else {

                toast.error(
                    "Unable to connect to server"
                );

            }

        }

    };

    return (

        <div className="login-container">

            <div className="login-card">

                <div className="logo">
                    🛒
                </div>

                <h1>Bhaia</h1>

                <p>

                    Compare Grocery Prices
                    Across Every Store

                </p>

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />

                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />

                <Button
                    onClick={loginUser}
                    fullWidth
                >
                    Login
                </Button>

                <br />
                <br />

                <p>

                    New here?

                </p>

                <button

                    onClick={() => navigate("/signup")}

                    style={{

                        background: "transparent",

                        border: "none",

                        color: "#5F8D7A",

                        cursor: "pointer",

                        fontWeight: "600",

                        fontSize: "15px"

                    }}

                >

                    Create Account

                </button>

            </div>

        </div>

    );

}

export default Login;