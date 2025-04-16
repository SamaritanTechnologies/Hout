import React from "react";

const Switch = ({ id = "switch", name, label, checked, onChange }) => {
  const handleOnChange = (e) => {
    const value = e.target.checked;
    onChange &&
      onChange({
        target: {
          name,
          value,
        },
      });
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={handleOnChange}
        className="hidden"
      />
      <label
        htmlFor={id}
        className={`relative w-10 h-6 rounded-full cursor-pointer transition-colors duration-200 ${
          checked ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        ></span>
      </label>

      {label ? (
        <span className="block text-12 font-footer1 text-[#1A1A1A]">
          {label}
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default Switch;
