import React, { useEffect, useState } from "react";
import { axiosApi } from "../../providers";

const OurValuesSection = () => {
  const [state, setState] = useState({
    values: [],
  });

  useEffect(() => {
    getOurValues();
  }, []);

  const getOurValues = async () => {
    try {
      const response = await axiosApi.get("/our-value/");
      setState((prev) => ({
        ...prev,
        values: response.data,
      }));
    } catch (error) {}
  };

  return (
    <section
      className="mt-[30px] md:mt-[70px] lg:mt-[92px] xl:mt-[92px]  bg-[#E9E6D6] pb-[114px]"
      id="our-values"
    >
      <div className=" text-30 md:text-40 lg:text-52 xl:text-52 text-center font-bold  pt-[80px] md:pt-[100px] lg:pt-[150px] xl:pt-[150px]">
        Our Values
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-x-[150px] px-[50px] max-w-[1240px] mx-auto">
        {state.values?.map((item, index) => {
          return (
            <div key={index} className="">
              <section className="pt-[30px] md:pt-[70px] lg:pt-[85px] xl:pt-[85px]">
                <div className="flex justify-center">
                  <img src={item.image} alt={item.title} className="w-16 h-auto" />
                </div>
                <div className="text-center  text-22  pt-[25px]">
                  {item.title}
                </div>
                <div className="text-center  text-16  pt-4 text-[#838381]">
                  {item.description}
                </div>
              </section>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default OurValuesSection;
