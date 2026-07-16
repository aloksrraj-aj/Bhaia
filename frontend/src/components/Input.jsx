import colors from "../styles/colors";
import theme from "../styles/theme";

function Input({

    type = "text",

    placeholder,

    value,

    onChange,

    disabled = false

}) {

    return (

        <input

            type={type}

            placeholder={placeholder}

            value={value}

            onChange={onChange}

            disabled={disabled}

            style={{

                width: "100%",

                minHeight: theme.inputHeight,

                padding: "14px 16px",

                marginBottom: "18px",

                border: `1px solid ${colors.border}`,

                borderRadius: theme.borderRadius,

                outline: "none",

                fontSize: "16px",

                background: disabled
                    ? "#F3F4F6"
                    : "#FFFFFF",

                color: colors.text,

                transition: "all 0.25s ease",

                boxSizing: "border-box",

                boxShadow: disabled

                    ? "none"

                    : "0 2px 6px rgba(0,0,0,0.03)"

            }}

            onFocus={(e) => {

                if (!disabled) {

                    e.currentTarget.style.border =
                        `2px solid ${colors.primary}`;

                    e.currentTarget.style.boxShadow =
                        "0 0 0 4px rgba(95,141,122,0.15)";

                }

            }}

            onBlur={(e) => {

                if (!disabled) {

                    e.currentTarget.style.border =
                        `1px solid ${colors.border}`;

                    e.currentTarget.style.boxShadow =
                        "0 2px 6px rgba(0,0,0,0.03)";

                }

            }}

        />

    );

}

export default Input;