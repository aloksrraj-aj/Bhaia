import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../components/Navbar";
import Button from "../components/Button";
import colors from "../styles/colors";
import theme from "../styles/theme";

function Payment() {
    const navigate = useNavigate();
    const location = useLocation();

    const totalAmount = location.state?.totalAmount || 0;
    const store = location.state?.store || "";

    const [paymentMethod, setPaymentMethod] = useState("");

    const handlePayment = () => {

        if (!paymentMethod) {
            toast.error("Please select a payment method");
            return;
        }

        toast.success("Payment Successful!");

        setTimeout(() => {
            navigate("/");
        }, 1200);
    };

    return (
        <>
            <Navbar />

            <div
                style={{
                    maxWidth: "600px",
                    width: "92%",
                    margin: "40px auto"
                }}
            >
                <div
                    style={{
                        background: "#FFFFFF",
                        padding: "35px",
                        borderRadius: theme.borderRadius,
                        boxShadow: theme.shadow,
                        border: "1px solid #E8ECEB"
                    }}
                >
                    <h1
                        style={{
                            color: colors.primary,
                            textAlign: "center",
                            marginBottom: "15px"
                        }}
                    >
                        💳 Payment
                    </h1>

                    <p
                        style={{
                            textAlign: "center",
                            color: "#666",
                            marginBottom: "30px"
                        }}
                    >
                        Complete your order payment
                    </p>

                    <div
                        style={{
                            background: "#F6F8F7",
                            padding: "18px",
                            borderRadius: "12px",
                            marginBottom: "25px"
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                color: colors.primary
                            }}
                        >
                            ₹ {totalAmount}
                        </h2>

                        <p
                            style={{
                                marginTop: "8px",
                                color: "#666"
                            }}
                        >
                            Store: <strong>{store}</strong>
                        </p>
                    </div>

                    <label
                        style={{
                            display: "block",
                            marginBottom: "10px",
                            fontWeight: "600"
                        }}
                    >
                        Payment Method
                    </label>

                    <select
                        value={paymentMethod}
                        onChange={(e) =>
                            setPaymentMethod(e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "14px",
                            borderRadius: "10px",
                            border: "1px solid #CCC",
                            fontSize: "16px",
                            marginBottom: "30px"
                        }}
                    >
                        <option value="">Select Payment Method</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Debit / Credit Card</option>
                        <option value="COD">Cash on Delivery</option>
                    </select>

                    <Button
                        fullWidth
                        onClick={handlePayment}
                    >
                        Pay ₹ {totalAmount}
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Payment;