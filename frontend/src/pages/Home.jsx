import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Input from "../components/Input";
import api from "../services/api";

function Home() {

    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All");

    const categories = [
        "All",
        "Dairy",
        "Bakery",
        "Beverages",
        "Snacks",
        "Groceries"
    ];

    const categoryMap = {
        Dairy: 1,
        Bakery: 2,
        Beverages: 3,
        Snacks: 4,
        Groceries: 5
    };

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

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];

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

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter(
                product =>
                    product.category_id ===
                    categoryMap[selectedCategory]
            );

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
                    onChange={(e) =>
                        searchProducts(e.target.value)
                    }
                />

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: "20px",
                        marginBottom: "25px"
                    }}
                >

                    {categories.map(category => (

                        <button
                            key={category}
                            onClick={() =>
                                setSelectedCategory(category)
                            }
                            style={{
                                padding: "10px 18px",
                                border: "none",
                                borderRadius: "20px",
                                cursor: "pointer",
                                background:
                                    selectedCategory === category
                                        ? "#355C4A"
                                        : "#E5E7EB",
                                color:
                                    selectedCategory === category
                                        ? "#FFF"
                                        : "#333",
                                fontWeight: "600"
                            }}
                        >
                            {category}
                        </button>

                    ))}

                </div>

                <p
                    style={{
                        color: "#666",
                        textAlign: "center",
                        marginBottom: "30px"
                    }}
                >
                    {filteredProducts.length} product(s) available
                </p>

                {

                    filteredProducts.length === 0 ?

                        (

                            <div
                                style={{
                                    textAlign: "center",
                                    marginTop: "80px",
                                    color: "#777"
                                }}
                            >

                                <h1>📦</h1>

                                <h2>No products found</h2>

                            </div>

                        )

                        :

                        (

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "repeat(auto-fit,minmax(280px,1fr))",
                                    gap: "25px"
                                }}
                            >

                                {

                                    filteredProducts.map(product => (

                                        <ProductCard

                                            key={product.id}

                                            product={product}

                                            onCompare={() =>
                                                navigate(`/product/${product.id}`)
                                            }

                                            onAddToCart={() =>
                                                addToCart(product)
                                            }

                                        />

                                    ))

                                }

                            </div>

                        )

                }

            </div>

        </>

    );

}

export default Home;