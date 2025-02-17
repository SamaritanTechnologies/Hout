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

const VideoSection = () => {
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
        className=" bg-[#E9E6D6] py-[40px] md:py-[80px] lg:pt-[119px] xl:pt-[119px]"
        id="why-hout"
      >
        <div className="max-w-[1180px] mx-auto">
          <div className="font-bold text-30 md:text-40 lg:text-50 xl:text-60 text-center ">
            {content.title_en}
          </div>
          <div className="text-lg text-center text-[#111727]">
            {content.description_en}
          </div>
          <div className="font-bold text-60 max-w-[991px] mx-auto pt-[40px]">
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
