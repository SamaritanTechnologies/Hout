import React, { useEffect, useState } from "react";
import { getOurAssortment } from "../../redux/actions/userActions";
import { toast } from "react-toastify";

const OurAssortmentSection = () => {
  const [assortments, setAssortments] = useState([]);

  useEffect(() => {
    const fetchOurValues = async () => {
      try {
        const data = await getOurAssortment();
        setAssortments(data);
      } catch (error) {
        toast.error("An error occurred while fetching data: " + error.message);
      }
    };
    fetchOurValues();
  }, [])
  
  
  return (
    <section className="bg-[#000000] pb-[60px] pt-[40px] md:pt-[90px] lg:pt-[119px] xl:pt-[119px]" id="assortments-section">
      <div className="text-30 md:text-40 lg:text-50 xl:text-52 font-bold text-[#fff]  text-center">
        {" "}
        Our assortment
      </div>
      <div className="  text-[#fff] text-center text-lg">
        {" "}
        Discover the world of wood through our extensive range.{" "}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 px-[30px] md:px-[80px] lg:px-[100px] xl:px-[100px]s gap-x-6 pt-[30px] md:pt-[70px] lg:pt-[88px] xl:pt-[88px] max-w-[1240px] mx-auto">
        {assortments.map((assortment, index) => {
          return (
            <div key={index} className="flex-col">
              <div>
                <img
                  src={assortment.image}
                  className="w-full object-cover max-w-[100%] h-full sm:h-[310px] lg:h-[350px] xl:h-[350px]"
                />
              </div>
              <div className="text-[#fff] text-center font-bold text-18 md:text-20 lg:text-24 xl:text-24 pt-[20px] ">
                {" "}
                {assortment.name_en}
              </div>
              <div className="text-[#fff] text-center text-16 md:text-18 lg:text-18 xl:text-18  pb-[40px] md:pb-[40px] lg:pb-[70px] xl:pb-[70px] pt-[20px] ">
                {assortment.description_en}
              </div>
            </div>
          );
        })}
      </section>
    </section>
  );
};

export default OurAssortmentSection;
