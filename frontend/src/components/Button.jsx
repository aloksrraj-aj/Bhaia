import colors from "../styles/colors";
import theme from "../styles/theme";

function Button({

    children,

    onClick,

    type = "button",

    fullWidth = false,

    disabled = false

}) {

    return (

        <button

            type={type}

            onClick={onClick}

            disabled={disabled}

            style={{

                width: fullWidth ? "100%" : "auto",

                minWidth: fullWidth ? "100%" : "140px",

                background: disabled
                    ? "#B8C5BD"
                    : colors.primary,

                color: "white",

                border: "none",

                padding: "14px 24px",

                borderRadius: theme.borderRadius,

                cursor: disabled
                    ? "not-allowed"
                    : "pointer",

                fontSize: "16px",

                fontWeight: "600",

                transition: "all 0.25s ease",

                boxShadow: theme.shadow,

                display: "inline-flex",

                justifyContent: "center",

                alignItems: "center",

                whiteSpace: "nowrap",

                lineHeight: "1.4"

            }}

            onMouseEnter={(e) => {

                if (!disabled) {

                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                        "0 12px 25px rgba(0,0,0,0.15)";

                }

            }}

            onMouseLeave={(e) => {

                if (!disabled) {

                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = theme.shadow;

                }

            }}

        >

            {children}

        </button>

    );

}
export default Button;