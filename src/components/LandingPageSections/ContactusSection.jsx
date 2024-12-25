import React, { useState } from "react";
import ContactInputField from "../Common/ContactInputField";
import { axiosApi } from "../../providers";
import { toast } from "react-toastify";

export const ContactusSection = () => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone_number: "",
    message: "",
  });

  const handleSendQuery = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosApi.post("/contact-form/", state);
      if (response.status === 201 || response.status === 200) {
        toast.success(
          "Your message has been sent! We will get back to you as soon as possible "
        );
        setState((prevState) => ({
          ...prevState,
          first_name: "",
          last_name: "",
          email: "",
          company: "",
          phone_number: "",
          message: "",
        }));
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#000000] py-[60px] md:pt-[80px] lg:pt-[119px] xl:pt-[119px] pb-[119px]">
      <form
        onSubmit={handleSendQuery}
        className="max-w-[1240px] mx-auto"
        id="contact-us"
      >
        <div className="text-[#fff] font-bold text-30 md:text-40 lg:text-50 xl:text-60 text-center ">
          Contact US
        </div>

        <div className="text-16 md:text-17 lg:text-18 xl:text-18 text-[#fff] pt-[40px] text-center">
          We invite you to contact us with any questions or concerns. Our
          dedicated team is ready to guide and support you.
        </div>

        <div className="px-[30px] md:px-[80px] lg:px-[100px] xl:px-[100px] pt-[30px] md:pt-[70px] lg:pt-[100px] xl:pt-[100px]">
          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row gap-6 lg:gap-[4.5%] xl:gap-[4.5%]">
            <div className="w-[100%] md:w-[30%] lg:w-[30%] xl:w-[30%]">
              <ContactInputField
                value={state.first_name}
                type="text"
                required={true}
                color={"#fff"}
                placeholder="FirstName*"
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-[100%] md:w-[30%] lg:w-[30%] xl:w-[30%]">
              <ContactInputField
                value={state.last_name}
                color={"#fff"}
                type="text"
                required={true}
                placeholder="LastName*"
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-[100%] md:w-[30%] lg:w-[30%] xl:w-[30%]">
              <ContactInputField
                value={state.email}
                color={"#fff"}
                type="email"
                required={true}
                placeholder="E-mail Address"
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="pt-[24px] md:pt-[24px] lg:pt-[60px] xl:pt-[60px] flex flex-col md:flex-row lg:flex-row xl:flex-row gap-6 md:gap-6 lg:gap-[10%] xl:gap-[10%]">
            <div className="w-[100%] md:w-[45%] lg:w-[45%] xl:w-[45%]">
              <ContactInputField
                value={state.company}
                color={"#fff"}
                type="text"
                required={true}
                placeholder="Company"
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    company: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="w-[100%] md:w-[45%] lg:w-[45%] xl:w-[45%]">
              <ContactInputField
                value={state.phone_number}
                color={"#fff"}
                type="tel"
                required={true}
                placeholder="Phone Number"
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    phone_number: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="pt-[24px] md:pt-[24px] lg:pt-[60px] xl:pt-[60px]">
            <div>
              <ContactInputField
                value={state.message}
                color={"#fff"}
                type="text"
                required={true}
                placeholder="Message*"
                onChange={(e) => {
                  setState((prev) => ({
                    ...prev,
                    message: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end px-[100px]">
          <div className="border-[#fff] border-2  mt-[40px]">
            <button
              disabled={loading}
              type="submit"
              className="text-18 px-16 py-2 text-[#fff]"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};
