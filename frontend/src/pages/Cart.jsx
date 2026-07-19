import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import api from "../services/api";

function Cart() {

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    const [comparison, setComparison] = useState([]);
    const [loadingStore, setLoadingStore] = useState(null);

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {

        const items =
            JSON.parse(localStorage.getItem("cart")) || [];

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

            const response = await api.post(
                "/cart/compare",
                {
                    products: cart.map(item => item.id)
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

    const placeOrder = async (store) => {

        try {

            setLoadingStore(store.store_id);

            const items = cart.map(product => ({
                product_id: product.id,
                quantity: 1
            }));

            const response = await api.post(
                "/orders/place",
                {
                    store_id: store.store_id,
                    items
                }
            );

            toast.success(
    `Order placed with ${response.data.store}`
);

localStorage.removeItem("cart");

setCart([]);
setComparison([]);

navigate("/payment", {
    state: {
        totalAmount: store.total,
        store: response.data.store
    }
});

        }

        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data?.detail ||
                "Unable to place order"
            );

        }

        finally {

            setLoadingStore(null);

        }

    };
const getStoreLogo = (storeName) => {

    const name = storeName.toLowerCase();

    if (name.includes("blinkit"))
        return "/store-logos/blinkit.png";

    if (name.includes("zepto"))
        return "/store-logos/zepto.png";

    if (name.includes("jiomart"))
        return "/store-logos/jiomart.jpeg";

    if (name.includes("bigbasket"))
        return "/store-logos/bigbasket.png";

    if (name.includes("swiggy"))
        return "/store-logos/swiggy.jpeg";

    if (name.includes("dmart"))
        return "/store-logos/dmart.jpeg";
    
    if (name.includes("amazon"))
        return "/store-logos/amazon.png";

    if (name.includes("flipkart"))
        return "/store-logos/flipkart.png";

    return "/store-logos/default.png";
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

                            <h1
                                style={{
                                    fontSize: "60px"
                                }}
                            >
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
                                "repeat(auto-fit,minmax(240px,1fr))",
                            gap: "25px"
                        }}
                    >

                        {cart.map((product) => (

    <div
        key={product.id}
        style={{
            background: "#FFFFFF",
            borderRadius: "16px",
            padding: "18px",
            border: "1px solid #E5E7EB",
            boxShadow: "0 6px 15px rgba(0,0,0,0.08)"
        }}
    >

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "18px"
            }}
        >

            <img
                src={`/images/${product.name}.jpeg`}
                alt={product.name}
                onError={(e) => {
                    e.currentTarget.src =
                        "https://placehold.co/100x100?text=No+Image";
                }}
                style={{
                    width: "90px",
                    height: "90px",
                    objectFit: "contain",
                    borderRadius: "10px",
                    background: "#F8F8F8",
                    padding: "5px"
                }}
            />

            <div style={{ flex: 1 }}>

                <h2
                    style={{
                        margin: 0,
                        color: "#355C4A",
                        fontSize: "22px"
                    }}
                >
                    {product.name}
                </h2>

                <p
                    style={{
                        marginTop: "8px",
                        color: "#666"
                    }}
                >
                    <strong>Brand:</strong> {product.brand}
                </p>

                <p
                    style={{
                        marginTop: "5px",
                        color: "#666"
                    }}
                >
                    <strong>Unit:</strong> {product.unit}
                </p>

                <Button
                    style={{
                        marginTop: "15px"
                    }}
                    onClick={() => removeFromCart(product.id)}
                >
                    Remove
                </Button>

            </div>

        </div>

    </div>

))}

                    </div>
                }

                {
                    cart.length > 0 && (

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
                    )
                }
                {
    comparison.length > 0 && (

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
                🏆 Store Comparison
            </h2>

            {

                comparison.map((store, index) => (

    <div
        key={store.store_id}
        style={{
            background: index === 0 ? "#ECFDF5" : "#FFFFFF",
            border: index === 0
                ? "2px solid #22C55E"
                : "1px solid #E5E7EB",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "18px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 5px 12px rgba(0,0,0,0.08)"
        }}
    >

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "15px"
            }}
        >

            <img
                src={getStoreLogo(store.store)}
                alt={store.store}
                style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "contain"
                }}
            />

            <div>

                <h3
                    style={{
                        margin: 0,
                        color: "#355C4A"
                    }}
                >
                    {store.store}
                </h3>

                {index === 0 && (

                    <span
                        style={{
                            color: "#16A34A",
                            fontWeight: "bold",
                            fontSize: "14px"
                        }}
                    >
                        🏆 Best Price
                    </span>

                )}

            </div>

        </div>

        <div
            style={{
                textAlign: "right"
            }}
        >

            <h2
                style={{
                    margin: 0,
                    color: "#16A34A"
                }}
            >
                ₹{store.total}
            </h2>

            <Button
                onClick={() => placeOrder(store)}
                disabled={loadingStore === store.store_id}
            >
                {loadingStore === store.store_id
                    ? "Placing..."
                    : "Place Order"}
            </Button>

        </div>

    </div>

))

            }

        </div>

    )
}

            </div>

        </>

    );

}

export default Cart;