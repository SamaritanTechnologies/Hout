import React, { useEffect, useState } from "react";
import { getOurValues } from "../../redux/actions/dashboardActions";
import { toast } from "react-toastify";

const OurValuesSection = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchOurValues = async () => {
      try {
        const data = await getOurValues();
        setValues(data);
      } catch (error) {
        toast.error("An error occurred while fetching data: " + error.message);
      }
    };

    fetchOurValues();
  }, []);

  return (
    <section className="flex flex-col gap-10 lg:gap-12 xl:gap-20 bg-[#E9E6D6] py-10 lg:py-20 xl:py-28 px-4">
      <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-center text-[#111727]">
        Our Values
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-[1080px] mx-auto gap-10 lg:gap-x-8 xl:gap-x-44 gap-y-12">
        {values?.map((value, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-6 items-center text-center"
            >
              <div className="flex justify-center">
                <img
                  src={value.image}
                  alt={value.title_en}
                  className="w-[60px] h-[60px] rounded-full"
                />
              </div>
              <h3 className="text-22 text-[#111727]">{value.title_en}</h3>
              <p className="text-base font-normal text-[#838381]">
                {value.description_en}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurValuesSection;
