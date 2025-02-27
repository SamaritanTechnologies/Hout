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
    <section className="flex flex-col gap-24 bg-black pt-12 pb-28 xl:pt-20 xxl:py-28 px-4">
      <div className="flex flex-col gap-7 text-center">
        <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white">
          Contact US
        </h2>
        <p className="text-base xl:text-lg text-[#fff]">
          We invite you to contact us with any questions or concerns. Our
          dedicated team is ready to guide and support you.
        </p>
      </div>
      <form
        onSubmit={handleSendQuery}
        className="flex flex-col gap-10 xl:gap-14 w-full max-w-[1180px] mx-auto"
        id="contact-us"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-7">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-7">
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
        <div className="flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className="text-18 px-16 py-2 text-white border-[#fff] border-2 "
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
};
