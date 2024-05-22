import React, { useEffect, useState } from "react";
import eyes from "../../assets/authImages/eyes.svg";
import showEye from '../../assets/authImages/showEye.svg'

const InputField = (props) => {
  const {
    id,
    label,
    type,
    autoComplete,
    required,
    value,
    defaultValue,
    onBlur,
    onKeyUp,
    onKeyDown,
    autoFocus,
    disabled,
    placeholder,
    onChange,
    minLength,
    maxLength,
    max,
    pattern,
    title,
    marginTop,
    marginBottom,
    name,
    icon: IconComponent,
    endicon,
  } = props;

  const [hidePassword, setHidePassword] = useState(true);


  return (
    <div className={`${marginTop && "mt-4"} ${marginBottom && "mb-4"}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 pb-1.5"
        >
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
          } rounded-md xl:py-3 xl:px-3 py-2 px-2 outline-none border border-[#D9D9D9] focus:outline-none sm:text-sm input-field`}
          id={id}
          label={label}
          max={max}
          name={name}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={placeholder}
          pattern={pattern}
          title={title}
          value={value}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onKeyUp={onKeyUp}
          autoFocus={autoFocus}
          disabled={disabled}
          defaultValue={defaultValue}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          type={
            type == "password" ? (hidePassword ? "password" : "text") : type
          }
        />
        {type == "password" && (
          <img
            src={hidePassword ? eyes : showEye}
            onClick={() => setHidePassword(!hidePassword)}
            className="cursor-pointer h-[24px] w-[24px] xs:size-4 ms:size-5 4xll:size-12 4xl:size-11 3xll:size-10 3xl:size-8 2xll:size-6 2xl:size-6 absolute right-3 top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
