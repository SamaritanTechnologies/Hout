import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange, label, style, name }) => {
  return (
    <div className="w-full">
      <h5 className="text-[16px] font-bold py-[12px]">{label}</h5>
      <div
        className="bg-white border border-[#CBCBCB] rounded-[10px]">
        <ReactQuill
          theme="snow"
          name={name}
          value={value}
          onChange={onChange}
          className="border-none"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
