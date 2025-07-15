import React from "react";

const ContactInputField = (props) => {
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
    color,
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
    className,
  } = props;
  return (
    <section>
      <div className={`${marginTop && "mt-4"} ${marginBottom && "mb-4"} `}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-[#fff] pb-1.5"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {IconComponent && (
            <span className="absolute left-3">
              <IconComponent className="text-gray-400 h-5 w-5" />
            </span>
          )}
          <input
            className={`block w-full  ${IconComponent ? "pl-10" : ""} ${
              color ? `text-[${color}]` : "text-[#000]"
            } py-3 px-3 outline-none bg-[#000000] border-[#FFF] border-b-2  focus:outline-none sm:text-sm ${
              className ? className : ""
            }`}
            id={id}
            label={label}
            type={type}
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
          />
        </div>
      </div>
    </section>
  );
};

export default ContactInputField;
