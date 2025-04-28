import React, { useEffect, useState } from "react";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { getHomepageImage } from "../../redux/actions/userActions";

const HoutHandelSection = () => {
  const navigate = useNavigate("/shop-page");
  const [homepageImage, setHomepageImage] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchExistingImage = async () => {
      try {
        const response = await getHomepageImage();
        if (response && response.length > 0) {
          const firstItem = response[0];
          setHomepageImage(firstItem.image || "");
          setData(firstItem);
        }
      } catch (error) {
        console.error("Error fetching homepage image:", error);
      }
    };

    fetchExistingImage();
  }, []);

  return (
    <div
      className="landing flex justify-center items-center"
      style={{ backgroundImage: `url(${homepageImage})` }}
    >
      <section className="flex-col text-center    ">
        <div className="text-[#fff] text-30 md:text-40 lg:text-50 xl:text-60">
          {data?.heading_nl || "HoutHandel"}
        </div>
        <div className="text-[#fff]  text-16 md:text-20 lg:text-28 xl:text-28  ">
          {data?.text_nl ||
            "Eiken - Thermisch gemodificeerd Fraké - Hardhout - Terrasplanken - Steigerhout - Suar"}
        </div>
        <div className="flex justify-center pt-[50px] view-assortment-btn">
          <Button
            btnText={data?.button_text_nl || "Bekijk assortiment"}
            paddingY="25px"
            paddingX="72px"
            fontbold
            onClick={() => {
              navigate("/");
              setTimeout(() => {
                document.getElementById("assortments-section")?.scrollIntoView({
                  behavior: "smooth",
                });
              }, 100);
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default HoutHandelSection;
