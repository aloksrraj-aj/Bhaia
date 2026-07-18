import Button from "./Button";

function ProductCard({

    product,

    onCompare,

    onAddToCart

}) {

    return (

        <div

            onClick={onCompare}

            style={{

                background: "#FFFFFF",

                borderRadius: "18px",

                padding: "25px",

                boxShadow: "0 10px 25px rgba(0,0,0,0.08)",

                transition: "all 0.25s ease",

                cursor: "pointer",

                border: "1px solid #E8ECEB",

                display: "flex",

                flexDirection: "column",

                justifyContent: "space-between",

                width: "100%",

                minHeight: "290px",

                boxSizing: "border-box"

            }}

            onMouseEnter={(e)=>{

                e.currentTarget.style.transform="translateY(-5px)";
                e.currentTarget.style.boxShadow="0 16px 30px rgba(0,0,0,0.12)";

            }}

            onMouseLeave={(e)=>{

                e.currentTarget.style.transform="translateY(0)";
                e.currentTarget.style.boxShadow="0 10px 25px rgba(0,0,0,0.08)";

            }}

        >

            <div>

                <div
    style={{
        height: "170px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "18px",
        overflow: "hidden",
        borderRadius: "12px",
        background: "#F8F8F8"
    }}
>
    <img
        src={
            product.image ||
            "https://via.placeholder.com/180x180?text=No+Image"
        }
        alt={product.name}
        style={{
            width: "150px",
            height: "150px",
            objectFit: "contain"
        }}
    />
</div>

                <h2

                    style={{

                        color: "#355C4A",

                        marginBottom: "15px",

                        wordBreak: "break-word"

                    }}

                >

                    {product.name}

                </h2>

                <p
    style={{
        color: "#666",
        marginBottom: "8px"
    }}
>
    {product.brand}
</p>

<p
    style={{
        color: "#888"
    }}
>
    {product.unit}
</p>

            </div>

            <div

                style={{

                    marginTop: "25px",

                    display: "flex",

                    flexDirection: "column",

                    gap: "12px"

                }}

            >
<p
    style={{
        color: "#27AE60",
        fontWeight: "600",
        textAlign: "center",
        marginBottom: "10px"
    }}
>
    Compare prices across stores
</p>
                <Button

                    fullWidth

                    onClick={(e)=>{

                        e.stopPropagation();

                        onAddToCart();

                    }}

                >

                    Add to Cart

                </Button>

                <button

                    onClick={(e)=>{

                        e.stopPropagation();

                        onCompare();

                    }}

                    style={{

                        width: "100%",

                        padding: "13px",

                        borderRadius: "10px",

                        border: "2px solid #5F8D7A",

                        background: "#FFFFFF",

                        color: "#5F8D7A",

                        fontWeight: "600",

                        cursor: "pointer",

                        transition: "all 0.25s ease"

                    }}

                    onMouseEnter={(e)=>{

                        e.currentTarget.style.background="#F4F8F5";

                    }}

                    onMouseLeave={(e)=>{

                        e.currentTarget.style.background="#FFFFFF";

                    }}

                >

                    Compare Prices

                </button>

            </div>

        </div>

    );

}

export default ProductCard;