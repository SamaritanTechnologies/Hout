import React, { useEffect } from "react";
import HoutHandelSection from "../components/LandingPageSections/HoutHandelSection";
import ProductsSection from "../components/ShopComponents/ProductsSection";
import OurValuesSection from "../components/LandingPageSections/OurValuesSection";
import OurAssortmentSection from "../components/LandingPageSections/OurAssortmentSection";
import VideoSection from "../components/LandingPageSections/VideoSection";
import TestimonialSection from "../components/LandingPageSections/TestimonialSection";
import { ContactusSection } from "../components/LandingPageSections/ContactusSection";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Landingpage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);

  const getTokenFromURL = (item) => {
    const params = new URLSearchParams(location.search);
    return params.get(item);
  };

  useEffect(() => {
    const token = getTokenFromURL("token");
    const userId = getTokenFromURL("user_id");
    const cartId = getTokenFromURL("cart_id");
    if (token || userId) {
      let obj = {
        token: localStorage.getItem("token") ? token : "",
        isLoggedIn: localStorage.getItem("isLoggedin") ? true : false,
      };

      localStorage.setItem("cartId", cartId);
      localStorage.setItem("token", token);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userId", userId);
      toast.success("Successfully Logged In");
      navigate("/");
    }
  }, [location]);

  return (
    <>
      <HoutHandelSection />
      <ProductsSection />
      <OurValuesSection />
      <OurAssortmentSection />
      <VideoSection />
      <TestimonialSection />
      <ContactusSection />
    </>
  );
};
