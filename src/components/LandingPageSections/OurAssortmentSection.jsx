import React, { useEffect, useState } from "react";
import { getOurAssortment } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const OurAssortmentSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [assortments, setAssortments] = useState([]);

  useEffect(() => {
    const fetchOurValues = async () => {
      try {
        const data = await getOurAssortment();
        setAssortments(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Your session is no longer valid. Please sign in again for authorization " + error.message);
      }
    };
    fetchOurValues();
  }, []);

  return (
    <section
      id="assortments-section"
      className="flex flex-col gap-10 lg:gap-14 xl:gap-20 bg-[#131516] py-12 xl:py-20 xxl:py-28 px-4"
    >
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-center text-white">
          {t("o_our_assortment_heading")}
        </h2>
        <p className="text-white text-center text-lg">
          {t("o_our_assortment_subheading")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-[1150px] mx-auto gap-x-8 xl:gap-x-[50px] gap-y-10 lg:gap-y-12 xl:gap-y-16">
        {assortments?.map((assortment, index) => {
          return (
            <div key={index} className="flex flex-col gap-5">
              <div className="h-[250px] lg:h-[320px] xl:h-[350px]">
                <img
                  src={assortment.image}
                  className="w-full object-cover h-full"
                />
              </div>
              <h3 className="text-white text-center font-bold text-lg lg:text-xl xl:text-2xl">
                {currentLang === "en" ? assortment.name_en : assortment.name_nl}
              </h3>
              <p className="text-white text-center text-base xl:text-lg">
                {currentLang === "en"
                  ? assortment.description_en
                  : assortment.description_nl}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurAssortmentSection;
