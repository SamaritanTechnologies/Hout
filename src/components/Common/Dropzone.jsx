import React from "react";
import { useDropzone } from "react-dropzone";
import ImgUpload from "../../assets/DashboardImages/imgUpload.svg";

const Dropzone = ({width, height, onDrop}) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (files) => onDrop(files),
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <>
      <section
        className="container"
        style={{
          width: width,
          height: height ? height : "215px",
          border: "0.93px dashed #4C5B66",
          borderRadius: "7.8px",
          padding: "12px",
        }}
      >
        <div
          {...getRootProps({ className: "dropzone" })}
          style={{
            height: "93%",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          <img src={ImgUpload} alt="" />
          <input {...getInputProps()} />
          <p
            style={{
              fontSize: "13.1px",
              color: "#4C5B66",
              textAlign: "center",
            }}
          >
             Drop your image here, or select
            <span className="text-yellow"> click to browse </span>
          </p>
        </div>
        <aside>
          <ul className="text-12 text-gray2 text-center">{files}</ul>
        </aside>
      </section>
    </>
  );
};

export default Dropzone;
