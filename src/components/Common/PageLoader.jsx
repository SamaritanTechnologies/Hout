import React from "react";
import { Circles } from "react-loader-spinner";

export default function PageLoader() {
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <Circles
        height="80"
        width="80"
        color="#FFDD00"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
