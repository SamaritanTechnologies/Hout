import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import { axiosWithCredentials } from "../../providers";
import { getWhyHoutTotal } from "../../redux/actions/userActions";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const VideoSection = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchWhyHoutTotal = async () => {
      try {
        const data = await getWhyHoutTotal();
        setContent(data);
      } catch (error) {
        toast.error("An error occurred while fetching data: " + error.message);
      }
    };

    fetchWhyHoutTotal();
  }, []);

  return (
    <>
      <section
        className="bg-[#E9E6D6] py-12 xl:py-20 xxl:py-28 px-4"
        id="why-hout"
      >
        <div className="flex flex-col gap-10 max-w-[1180px] mx-auto">
          <div className="flex flex-col gap-10 text-center">
            <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-center text-[#111727]">
              {currentLang === "en" ? content.title_en : content.title_nl}
            </h2>
            <p className="text-lg text-[#111727]">
              {currentLang === "en"
                ? content.description_en
                : content.description_nl}
            </p>
          </div>
          <div className="max-w-full xl:max-w-[991px] mx-auto">
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="mySwiper"
            >
              {content.videos?.map((videoItem) => (
                <SwiperSlide key={videoItem?.id}>
                  <video width="100%" controls>
                    <source src={videoItem.video} type="video/mp4" />
                  </video>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoSection;
