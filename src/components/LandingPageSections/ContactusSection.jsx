import React, { useState } from "react";
import ContactInputField from "../Common/ContactInputField";
import { toast } from "react-toastify";
import { submitContactForm } from "../../redux/actions/userActions";
import { useTranslation } from "react-i18next";

export const ContactusSection = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    company: "",
    phone_number: "",
    message: "",
  });

  const validateForm = () => {
    if (!formData.first_name?.trim()) {
      toast.error("First Name is required.");
      return false;
    }
    if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!formData.message?.trim() || formData.message.length < 10) {
      toast.error("Message must be at least 10 characters long.");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      company: "",
      phone_number: "",
      message: "",
    });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await submitContactForm(formData);
      if (response?.status === 201 || response?.status === 200) {
        toast.success(
          "Your message has been sent! We will get back to you as soon as possible."
        );
        resetForm();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact-us"
      className="flex flex-col gap-24 bg-black pt-12 pb-28 xl:pt-20 xxl:py-28 px-4"
    >
      <div className="flex flex-col gap-7 text-center">
        <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-white">
          Contact Us
        </h2>
        <p className="text-base xl:text-lg text-[#fff]">
          We invite you to contact us with any questions or concerns. Our
          dedicated team is ready to guide and support you.
        </p>
      </div>
      <form
        onSubmit={handleSubmitForm}
        className="flex flex-col gap-10 xl:gap-14 w-full max-w-[1180px] mx-auto"
        id="contact-us"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
          <ContactInputField
            value={formData.first_name}
            type="text"
            required={true}
            color="#fff"
            placeholder="First Name*"
            onChange={(e) =>
              setFormData({ ...formData, first_name: e.target.value })
            }
            aria-label="First Name"
          />
          <ContactInputField
            value={formData.last_name}
            color="#fff"
            type="text"
            placeholder="Last Name"
            onChange={(e) =>
              setFormData({ ...formData, last_name: e.target.value })
            }
            aria-label="Last Name"
          />
          <ContactInputField
            value={formData.email}
            color="#fff"
            type="email"
            required={true}
            placeholder="E-mail Address*"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            aria-label="Email Address"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-7">
          <ContactInputField
            value={formData.company}
            color="#fff"
            type="text"
            placeholder="Company"
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            aria-label="Company"
          />
          <ContactInputField
            value={formData.phone_number}
            color="#fff"
            type="tel"
            placeholder="Phone Number"
            onChange={(e) =>
              setFormData({ ...formData, phone_number: e.target.value })
            }
            aria-label="Phone Number"
          />
        </div>
        <ContactInputField
          value={formData.message}
          color="#fff"
          type="text"
          required={true}
          placeholder="Message*"
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          aria-label="Message"
        />
        <div className="flex justify-end">
          <button
            disabled={loading}
            type="submit"
            className={`text-18 px-16 py-2 text-white border-[#fff] border-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </section>
  );
};
