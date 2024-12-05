/* eslint-disable react/prop-types */
// import  from "../../assets/landing/landArrowWhite.svg";

const Button = ({
  btnText,
  textColor = "#fff",
  onClick,
  type,
  disabled,
  paddingX = "16",
  paddingY = "4",
  breakpoint,
  widthfull,
  fontbold,
  color,
  border,
}) => {
  return (
    <button
      className={` ${
        disabled ? "bg-gray-500 opacity-80" : "hover:opacity-85"
      } xxl:text-22 xl:text-20 md:text-18 sm:text-16 xs:text-15
 flex-center rounded-md fontbold
       ${widthfull ? "w-full" : null}
       ${breakpoint}
       ${fontbold ? "font-bold" : null}
       text-[${textColor}]
        xl:py-3 py-2 px-2 xl:text-md   ${
         color ? "bg-[#fff]" : " bg-customYellow"
       }   ${border ? "border border-customYellow " : ""} text-16`}
      disabled={disabled}
      onClick={onClick}
      type={type}
      color={color}
      style={{ paddingBlock: paddingY, paddingInline: paddingX }}
    >
      {btnText}
    </button>
  );
};

// breakpoint = "sm:w-[180px] md:w-[190px] lg:w-[350px] xl:w-[460px]";
//
export default Button;
