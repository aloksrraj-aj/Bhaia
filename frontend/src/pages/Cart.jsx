import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import api from "../services/api";

function Cart() {

    const [cart, setCart] = useState([]);
    const [comparison, setComparison] = useState([]);

    useEffect(() => {

        loadCart();

    }, []);

    const loadCart = () => {

        const items = JSON.parse(
            localStorage.getItem("cart")
        ) || [];

        setCart(items);

    };

    const removeFromCart = (id) => {

        const updatedCart = cart.filter(
            item => item.id !== id
        );

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        setCart(updatedCart);

        setComparison([]);

        toast.success("Product removed");

    };

    const compareCart = async () => {

        if (cart.length === 0) {

            toast.error("Your cart is empty");

            return;

        }

        try {

            const products = cart.map(
                item => item.id
            );

            const response = await api.post(
                "/cart/compare",
                {
                    products
                }
            );

            setComparison(response.data.all_stores);

            toast.success("Comparison completed");

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to compare cart");

        }

    };

    return (

        <>

            <Navbar />

            <div
                style={{
                    maxWidth: "1200px",
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
                            marginBottom: "10px",
                            fontSize: "40px"
                        }}
                    >
                        🛒 My Cart
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            fontSize: "17px"
                        }}
                    >
                        {cart.length} Product(s) in your cart
                    </p>

                </div>

                {

                    cart.length === 0 ?

                        (

                            <div
                                style={{
                                    textAlign: "center",
                                    marginTop: "90px",
                                    color: "#777"
                                }}
                            >

                                <h1 style={{ fontSize: "60px" }}>
                                    🛒
                                </h1>

                                <h2>Your cart is empty</h2>

                                <p>

                                    Add products from the Home page to begin comparing prices.

                                </p>

                            </div>

                        )

                        :

                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns:
                                    "repeat(auto-fit, minmax(280px, 1fr))",
                                gap: "25px"
                            }}
                        >

                            {

                                cart.map(product => (

                                    <div

                                        key={product.id}

                                        style={{

                                            background: "#FFFFFF",

                                            padding: "25px",

                                            borderRadius: "18px",

                                            boxShadow:
                                                "0 10px 25px rgba(0,0,0,0.08)",

                                            border:
                                                "1px solid #E8ECEB",

                                            display: "flex",

                                            flexDirection: "column",

                                            justifyContent: "space-between"

                                        }}

                                    >

                                        <div>

                                            <div
                                                style={{
                                                    fontSize: "50px",
                                                    textAlign: "center",
                                                    marginBottom: "15px"
                                                }}
                                            >
                                                🛒
                                            </div>

                                            <h2
                                                style={{
                                                    color: "#355C4A",
                                                    wordBreak: "break-word"
                                                }}
                                            >
                                                {product.name}
                                            </h2>

                                            <p>

                                                <strong>Brand:</strong> {product.brand}

                                            </p>

                                            <p>

                                                <strong>Quantity:</strong> {product.unit}

                                            </p>

                                        </div>

                                        <div
                                            style={{
                                                marginTop: "25px"
                                            }}
                                        >

                                            <Button

                                                fullWidth

                                                onClick={() =>
                                                    removeFromCart(product.id)
                                                }

                                            >

                                                Remove

                                            </Button>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                }

                {

                    cart.length > 0 &&

                    <div
                        style={{
                            marginTop: "40px"
                        }}
                    >

                        <Button

                            fullWidth

                            onClick={compareCart}

                        >

                            Compare My Cart

                        </Button>

                    </div>

                }

                {

                    comparison.length > 0 &&

                    <>

                        <div
                            style={{
                                marginTop: "50px"
                            }}
                        >

                            <h2
                                style={{
                                    color: "#355C4A",
                                    textAlign: "center",
                                    marginBottom: "25px"
                                }}
                            >
                                🏆 Best Store Comparison
                            </h2>

                            {

                                comparison.map((store, index) => (

                                    <div

                                        key={index}

                                        style={{

                                            background:

                                                index === 0

                                                    ? "#D7E8D9"

                                                    : "#FFFFFF",

                                            padding: "25px",

                                            borderRadius: "18px",

                                            marginBottom: "20px",

                                            boxShadow:
                                                "0 8px 18px rgba(0,0,0,0.08)",

                                            display: "flex",

                                            justifyContent: "space-between",

                                            alignItems: "center",

                                            flexWrap: "wrap",

                                            gap: "15px"

                                        }}

                                    >

                                        <div>

                                            <h2>

                                                🏪 {store.store}

                                            </h2>

                                            {

                                                index === 0 &&

                                                <p>

                                                    🏆 Recommended Store

                                                </p>

                                            }

                                        </div>

                                        <h1
                                            style={{
                                                color: "#355C4A",
                                                margin: 0
                                            }}
                                        >
                                            ₹ {store.total}
                                        </h1>

                                    </div>

                                ))

                            }

                        </div>

                    </>

                }

            </div>

        </>

    );

}

export default Cart;