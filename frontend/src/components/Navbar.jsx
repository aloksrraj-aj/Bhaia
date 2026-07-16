import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <nav

            style={{

                background: "#5F8D7A",

                padding: "18px 5%",

                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                flexWrap: "wrap",

                gap: "15px",

                boxShadow: "0 6px 20px rgba(0,0,0,0.08)",

                position: "sticky",

                top: 0,

                zIndex: 1000

            }}

        >

            <div

                style={{

                    display: "flex",

                    alignItems: "center",

                    gap: "12px"

                }}

            >

                <span

                    style={{

                        fontSize: "32px"

                    }}

                >

                    🛒

                </span>

                <div>

                    <h2

                        style={{

                            margin: 0,

                            color: "white"

                        }}

                    >

                        Bhaia

                    </h2>

                    <small

                        style={{

                            color: "#EAF4EF"

                        }}

                    >

                        Grocery Price Comparison

                    </small>

                </div>

            </div>

            <div

                style={{

                    display: "flex",

                    flexWrap: "wrap",

                    justifyContent: "center",

                    gap: "15px",

                    alignItems: "center"

                }}

            >

                <Link

                    to="/"

                    style={{

                        color: "white",

                        textDecoration: "none",

                        fontWeight: "600",

                        padding: "6px 10px",

                        borderRadius: "8px",

                        transition: "0.25s"

                    }}

                >

                    Home

                </Link>

                <Link

                    to="/cart"

                    style={{

                        color: "white",

                        textDecoration: "none",

                        fontWeight: "600",

                        padding: "6px 10px",

                        borderRadius: "8px",

                        transition: "0.25s"

                    }}

                >

                    Cart

                </Link>

                <Link

                    to="/profile"

                    style={{

                        color: "white",

                        textDecoration: "none",

                        fontWeight: "600",

                        padding: "6px 10px",

                        borderRadius: "8px",

                        transition: "0.25s"

                    }}

                >

                    Profile

                </Link>

                <button

                    onClick={logout}

                    style={{

                        background: "white",

                        color: "#5F8D7A",

                        border: "none",

                        padding: "10px 18px",

                        borderRadius: "10px",

                        fontWeight: "600",

                        cursor: "pointer",

                        transition: "all 0.25s ease"

                    }}

                    onMouseEnter={(e)=>{

                        e.currentTarget.style.transform="translateY(-2px)";

                        e.currentTarget.style.boxShadow="0 8px 18px rgba(0,0,0,0.15)";

                    }}

                    onMouseLeave={(e)=>{

                        e.currentTarget.style.transform="translateY(0)";

                        e.currentTarget.style.boxShadow="none";

                    }}

                >

                    Logout

                </button>

            </div>

        </nav>

    );

}

export default Navbar;