import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const RichTextEditor = ({ value, onChange, label, style }) => {
  return (
    <div className="w-full">
      <h5 className="text-[16px] font-bold py-[12px]">{label}</h5>
      <div
        className="bg-white border border-[#CBCBCB] rounded-[10px]"
        style={{ ...style, height: "300px" }}
      >
        <ReactQuill
          theme="snow"
          value={value}
          onChange={onChange}
          className="h-full border-none"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
