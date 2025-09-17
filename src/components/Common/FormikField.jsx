import React, { useState } from "react";
import eyes from "../../assets/authImages/eyes.svg";
import showEye from "../../assets/authImages/showEye.svg";

const FormikField = ({
  field, // Field props from Formik
  form: { touched, errors }, // Formik props to display errors
  label,
  className,
  type = "text",
  placeholder,
  marginTop,
  marginBottom,
  icon: IconComponent,
  postfix,
  flag,
  ...props
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <div
      className={`${marginTop && "mt-4"} ${
        marginBottom && "mb-4"
      } ${className}`}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 pb-1.5">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {IconComponent && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <IconComponent className="text-gray-400 h-5 w-5" />
          </span>
        )}
        <input
          className={`block w-full appearance-none ${
            IconComponent ? "pl-10" : ""
          } ${flag ? "pr-10" : ""} rounded-md xl:py-3 xl:px-3 xl:pr-10 py-2 px-2 outline-none border border-[#D9D9D9] focus:outline-none sm:text-sm input-field ${
            touched[field.name] && errors[field.name] ? "border-red-500" : ""
          } ${className}`}
          placeholder={placeholder}
          type={
            type === "password" ? (hidePassword ? "password" : "text") : type
          }
          {...field}
          {...props}
        />
        {postfix && (
          <span className="absolute right-3 text-sm text-gray2">{postfix}</span>
        )}
        {type === "password" && (
          <img
            src={hidePassword ? eyes : showEye}
            onClick={() => setHidePassword(!hidePassword)}
            className="cursor-pointer h-[24px] w-[24px] absolute right-3 top-1/2 transform -translate-y-1/2"
          />
        )}
        {flag && (
          <img
            src={flag}
            alt="Flag"
            className="cursor-pointer h-5 w-5 absolute right-4 top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>
      {touched[field.name] && errors[field.name] && (
        <div className="text-red text-sm mt-1">{errors[field.name]}</div>
      )}
    </div>
  );
};

export default FormikField;
