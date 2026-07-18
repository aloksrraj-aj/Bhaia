import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Input from "../components/Input";
import api from "../services/api";

function Home() {

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {

        try {

            const response = await api.get("/products");

            setProducts(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load products");

        }

    };

    const addToCart = (product) => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        const alreadyExists = cart.find(
            item => item.id === product.id
        );

        if (alreadyExists) {

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

    const searchProducts = async (text) => {

        setQuery(text);

        if (text.trim() === "") {

            loadProducts();

            return;

        }

        try {

            const response = await api.get(
                "/search",
                {
                    params: {
                        query: text
                    }
                }
            );

            setProducts(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to search products");

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
                        marginBottom: "40px"
                    }}
                >

                    <h1
                        style={{
                            color: "#355C4A",
                            fontSize: "42px",
                            marginBottom: "15px"
                        }}
                    >
                        🛒 Bhaia Grocery Comparison
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            fontSize: "18px",
                            maxWidth: "700px",
                            margin: "0 auto"
                        }}
                    >
                        Compare prices from multiple grocery stores and save money on every purchase.
                    </p>

                </div>

                <Input
                    type="text"
                    placeholder="🔍 Search Products..."
                    value={query}
                    onChange={(e) => searchProducts(e.target.value)}
                />

                <p
                    style={{
                        color: "#666",
                        marginTop: "15px",
                        marginBottom: "30px",
                        textAlign: "center"
                    }}
                >
                    {products.length} product(s) available
                </p>

                {
                    products.length === 0 &&

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "80px",
                            color: "#777"
                        }}
                    >

                        <h1>📦</h1>

                        <h2>No products available</h2>

                    </div>
                }

                {
                    products.length > 0 &&

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
                            gap: "25px"
                        }}
                    >

                        {

                            products.map((product) => (

                                <ProductCard

                                    key={product.id}

                                    product={product}

                                    onCompare={() =>
                                        navigate(`/compare/${product.id}`)
                                    }

                                    onAddToCart={() =>
                                        addToCart(product)
                                    }

                                />

                            ))

                        }

                    </div>

                }

            </div>

        </>

    );

}

export default Home;