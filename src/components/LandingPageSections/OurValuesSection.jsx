import React, { useEffect, useState } from "react";
import { getOurValues } from "../../redux/actions/dashboardActions";
import { toast } from "react-toastify";

const OurValuesSection = () => {
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchOurValues = async () => {
      try {
        const data = await getOurValues();
        setValues(data)
      } catch (error) {
        toast.error("An error occurred while fetching data: " + error.message); 
      }
    };

    fetchOurValues();
  }, []);

  return (
    <section
      className="mt-[30px] md:mt-[70px] lg:mt-[92px] xl:mt-[92px] bg-[#E9E6D6] pb-[114px]"
      id="our-values"
    >
      <div className="text-30 md:text-40 lg:text-52 xl:text-52 text-center font-bold pt-[80px] md:pt-[100px] lg:pt-[150px] xl:pt-[150px]">
        Our Values
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2  gap-x-[150px] px-[50px] max-w-[1240px] mx-auto">
        {values?.map((value, index) => {
          return (
            <div key={index} className="">
              <section className="flex flex-col gap-6 items-center text-center pt-[30px] md:pt-[70px] lg:pt-[85px] xl:pt-[85px]">
                <div className="flex justify-center">
                  <img
                    src={value.image}
                    alt={value.title_en}
                    className="w-[60px] h-[60px] rounded-full"
                  />
                </div>
                <div className="text-22 text-[#111727]">{value.title_en}</div>
                <div className="text-base font-normal text-[#838381]">
                  {value.description_en}
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
