import React from "react";

const Switch = ({ optional }) => {
  return (
    <div className="flex gap-2  items-center">
      <input type="checkbox" id="switch" />
      <label for="switch"></label>

      {optional ? null : <span className="block text-12 font-footer1 text-[#1A1A1A]">Remember me</span>}
    </div>
  );
};

export default Switch;
