import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import api from "../services/api";

function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadProduct();

    }, []);

    const loadProduct = async () => {

    try {

        const response = await api.get(`/products/${id}`);

        console.log("API Response:", response.data);

        setProduct(response.data);

    }

    catch (error) {

        console.log(error);

        toast.error("Unable to load product");

    }

    finally {

        setLoading(false);

    }

};

    const addToCart = () => {

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const exists = cart.find(
            item => item.id === product.id
        );

        if (exists) {

            toast.error("Product already in cart");

            return;

        }

        cart.push(product);

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        toast.success("Added to Cart");

    };

    if (loading) {

        return (

            <>
                <Navbar />

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "100px"
                    }}
                >
                    <h2>Loading...</h2>
                </div>

            </>

        );

    }

    if (!product) {

        return (

            <>
                <Navbar />

                <div
                    style={{
                        textAlign: "center",
                        marginTop: "100px"
                    }}
                >
                    <h2>Product not found</h2>
                </div>

            </>

        );

    }
const getStoreLogo = (store) => {

    const name = store.toLowerCase();

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

    if (name.includes("amazon"))
        return "/store-logos/amazon.png";

    if (name.includes("flipkart"))
        return "/store-logos/flipkart.png";

    if (name.includes("dmart"))
        return "/store-logos/dmart.jpeg";

    return "/store-logos/default.png";
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

                <Button
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </Button>

                <div
                    style={{
                        background: "#fff",
                        borderRadius: "18px",
                        padding: "30px",
                        marginTop: "20px",
                        boxShadow:
                            "0 10px 25px rgba(0,0,0,.08)"
                    }}
                >

                    <div
                        style={{
                            display: "flex",
                            gap: "40px",
                            flexWrap: "wrap",
                            alignItems: "center"
                        }}
                    >

                        <div
                            style={{
                                flex: "0 0 300px",
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >

                            <img
                                src={`/images/${product.name}.jpeg`}
                                alt={product.name}
                                onError={(e) => {

                                    e.currentTarget.src =
                                        "https://placehold.co/250x250?text=No+Image";

                                }}
                                style={{
                                    width: "260px",
                                    height: "260px",
                                    objectFit: "contain"
                                }}
                            />

                        </div>

                        <div
                            style={{
                                flex: 1
                            }}
                        >

                            <h1
                                style={{
                                    color: "#355C4A",
                                    marginBottom: "10px"
                                }}
                            >
                                {product.name}
                            </h1>

                            <p>
                                <strong>Brand:</strong> {product.brand}
                            </p>

                            <p>
                                <strong>Unit:</strong> {product.unit}
                            </p>

                            <div
                                style={{
                                    marginTop: "25px"
                                }}
                            >

                                <Button
                                    onClick={addToCart}
                                >
                                    Add to Cart
                                </Button>

                            </div>

                        </div>

                    </div>

                    <hr
                        style={{
                            margin: "35px 0"
                        }}
                    />

                    <h2
                        style={{
                            color: "#355C4A",
                            marginBottom: "20px"
                        }}
                    >
                        🏪 Available Stores
                    </h2>
                                        {

                        !product.stores || product.stores.length === 0 ?

                            (

                                <div
                                    style={{
                                        textAlign: "center",
                                        color: "#777",
                                        padding: "30px"
                                    }}
                                >
                                    <h3>No stores available</h3>
                                </div>

                            )

                            :

                            (product.stores || []).map((store, index) => (

                                <div
    key={store.store_id}
    style={{
        background: index === 0 ? "#EAF8EC" : "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "12px 18px",
        marginBottom: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
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
            width: "45px",
            height: "45px",
            objectFit: "contain"
        }}
    />

    <div>

        <h4
            style={{
                margin: 0,
                color: "#355C4A"
            }}
        >
            {store.store}
        </h4>

        <p
            style={{
                margin: "6px 0 0",
                color: "#666",
                fontSize: "14px"
            }}
        >
            Stock:
            <strong>
                {" "}
                {store.stock}
            </strong>
        </p>

    </div>

</div>

                                    <div
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >

                                        <h3
    style={{
        color: "#2E7D32",
        margin: 0,
        fontSize: "24px"
    }}
>
                                            ₹ {store.price}
                                        </h3>

                                    </div>

                                </div>

                            ))

                    }

                </div>

            </div>

        </>

    );

}

export default ProductDetails;