import React from "react";
import HoutHandelSection from "../components/LandingPageSections/HoutHandelSection";
import ProductsSection from "../components/LandingPageSections/ProductsSection";
import OurValuesSection from "../components/LandingPageSections/OurValuesSection";
import OurAssortmentSection from "../components/LandingPageSections/OurAssortmentSection";
import VideoSection from "../components/LandingPageSections/VideoSection";
import TestimonialSection from "../components/LandingPageSections/TestimonialSection";
import { ContactusSection } from "../components/LandingPageSections/ContactusSection";

export const Landingpage = () => {

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
