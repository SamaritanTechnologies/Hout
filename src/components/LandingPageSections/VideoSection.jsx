import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper/modules";

import { axiosWithCredentials } from "../../providers";

const VideoSection = () => {
  const [content, setContent] = useState([]);

  const getData = async () => {
    try {
      const response = await axiosWithCredentials.get("/why-hout-total/");
      setContent(response.data);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <section
        className=" bg-[#E9E6D6] py-[40px] md:py-[80px] lg:pt-[119px] xl:pt-[119px]"
        id="why-hout"
      >
        <div className="max-w-[1240px] mx-auto">
          <div className="font-bold text-30 md:text-40 lg:text-50 xl:text-60 text-center ">
            Why Hout Total{" "}
          </div>

          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {content?.map?.((item) => (
              <SwiperSlide key={item?.id}>
                <div className="text-16 md:text-18 lg:text-18 xl:text-18 text-center px-[30px] md:px-[60px] lg:px-[100px] xl:px-[100px] pt-[20px] md:pt-[25px] lg:pt-[30px] xl:pt-[30px]">
                  {item?.content}
                </div>
                <div className="font-bold text-60 px-[50px] md:px-[120px] lg:px-[200px] xl:px-[225px]  pt-[40px]">
                  <video width="750" height="500" controls>
                    <source src={item?.video} type="video/mp4" />
                  </video>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default VideoSection;
