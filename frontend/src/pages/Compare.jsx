import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import api from "../services/api";

function Compare() {

    const { id } = useParams();

    const [prices, setPrices] = useState([]);

    useEffect(() => {

        loadPrices();

    }, []);

    const loadPrices = async () => {

        try {

            const response = await api.get(
                `/compare/${id}`
            );

            setPrices(response.data);

        }

        catch (error) {

            console.log(error);

            toast.error("Unable to load prices");

        }

    };

    return (

        <>

            <Navbar />

            <div
                style={{
                    maxWidth: "1000px",
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
                        💰 Price Comparison
                    </h1>

                    <p
                        style={{
                            color: "#666",
                            fontSize: "17px"
                        }}
                    >
                        Compare prices across all available stores.
                    </p>

                </div>

                {

                    prices.length === 0 ?

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
                                    🔍
                                </h1>

                                <h2>No prices available</h2>

                                <p>

                                    Please try another product.

                                </p>

                            </div>

                        )

                        :

                        prices.map((item, index) => (

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
                                        "0 10px 25px rgba(0,0,0,0.08)",

                                    border:
                                        "1px solid #E8ECEB"

                                }}

                            >

                                <div

                                    style={{

                                        display: "flex",

                                        justifyContent: "space-between",

                                        alignItems: "center",

                                        flexWrap: "wrap",

                                        gap: "15px"

                                    }}

                                >

                                    <div>

                                        <h2
                                            style={{
                                                color: "#355C4A",
                                                marginBottom: "8px"
                                            }}
                                        >

                                            🏪 {item.store}

                                        </h2>

                                        <p>

                                            Available Stock:

                                            <strong>

                                                {" "}

                                                {item.stock}

                                            </strong>

                                        </p>

                                    </div>

                                    <div
                                        style={{
                                            textAlign: "right"
                                        }}
                                    >

                                        <h1
                                            style={{
                                                color: "#355C4A",
                                                margin: 0
                                            }}
                                        >
                                            ₹ {item.price}
                                        </h1>

                                        {

                                            index === 0 &&

                                            <p
                                                style={{
                                                    color: "#2E7D32",
                                                    fontWeight: "bold",
                                                    marginTop: "8px"
                                                }}
                                            >
                                                🏆 Cheapest Store
                                            </p>

                                        }

                                    </div>

                                </div>

                            </div>

                        ))

                }

            </div>

        </>

    );

}

export default Compare;