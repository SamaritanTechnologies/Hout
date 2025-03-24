import React from "react";

const Switch = ({ optional, checked, onChange }) => {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="checkbox"
        id="switch"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor="switch"
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

      {optional ? null : (
        <span className="block text-12 font-footer1 text-[#1A1A1A]">Remember me</span>
      )}
    </div>
  );
};

export default Switch;