import Button from "./Button";

function ProductCard({ product, onCompare, onAddToCart }) {
    return (
        <div
            onClick={onCompare}
            style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "16px",
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                cursor: "pointer",
                transition: "0.25s",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "360px"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow =
                    "0 10px 22px rgba(0,0,0,0.12)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)";
            }}
        >
            <div>
                <div
                    style={{
                        height: "170px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#F8F8F8",
                        borderRadius: "12px",
                        marginBottom: "15px"
                    }}
                >
                    <img
                        src={`/images/${product.name}.jpeg`}
                        alt={product.name}
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://placehold.co/150x150?text=No+Image";
                        }}
                        style={{
                            width: "140px",
                            height: "140px",
                            objectFit: "contain"
                        }}
                    />
                </div>

                <h3
                    style={{
                        color: "#355C4A",
                        margin: "0 0 8px",
                        fontSize: "18px",
                        minHeight: "48px"
                    }}
                >
                    {product.name}
                </h3>

                <p
                    style={{
                        color: "#777",
                        margin: "0"
                    }}
                >
                    {product.brand}
                </p>

                <p
                    style={{
                        color: "#999",
                        marginTop: "6px",
                        fontSize: "14px"
                    }}
                >
                    {product.unit}
                </p>

                <div
                    style={{
                        marginTop: "12px",
                        display: "inline-block",
                        background: "#E9F8EE",
                        color: "#2E7D32",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: 600
                    }}
                >
                    Compare prices
                </div>
            </div>

            <div
                style={{
                    marginTop: "18px"
                }}
            >
                <Button
                    fullWidth
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart();
                    }}
                >
                    Add to Cart
                </Button>
            </div>
        </div>
    );
}

export default ProductCard;