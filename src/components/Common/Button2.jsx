/* eslint-disable react/prop-types */

const ButtonSmall = ({
  btnText,
  textColor = "#000",
  backgroundColor = "#FBC700",
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  width = "90px",
  height = "35px",
  fontSize = "14px",
  rounded = "6px",
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`flex items-center justify-center
                  transition-all duration-200
                  ${disabled || loading ? "opacity-70 cursor-not-allowed" : "hover:opacity-85"}
                  shadow-sm`}
      style={{
        width,
        height,
        fontSize,
        borderRadius: rounded,
        color: textColor,
        backgroundColor,
        lineHeight: 1.1,
        paddingInline: "6px",
        paddingBlock: "0px",
        fontWeight: 500,
      }}
    >
      {loading ? loadingText : btnText}
    </button>
  );
};

export default ButtonSmall;
