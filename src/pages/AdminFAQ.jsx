import React, { useState, useEffect } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import InputField from "../components/Common/InputField";
import TableBody2 from "../components/Common/TableBody2";
import countryflag from "../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../assets/DashboardImages/USA-flag.svg";
import { addFaqs, getFaqs } from "../redux/actions/dashboardActions";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const AdminFAQ = () => {
  const [faqSections, setFaqSections] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const { t } = useTranslation();

  // Fetch FAQs on component mount
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const data = await getFaqs(); // Assuming this returns the payload structure
        setFaqSections(data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        toast.error(t("adminfaq_fetch_fail"));
      }
    };
    fetchFaqs();
  }, [t]);

  // Add a new FAQ section with one default FAQ field
  const handleAddSection = () => {
    if (newSubject.trim() === "") return;
    const newSection = {
      name_en: newSubject,
      name_nl: null,
      faqs: [
        {
          question_en: "",
          question_nl: null,
          answer_en: "",
          answer_nl: null,
        },
      ], // Default FAQ field
    };
    setFaqSections([...faqSections, newSection]);
    setNewSubject("");
  };

  // Remove a FAQ section
  const handleRemoveSection = (index) => {
    const updatedSections = faqSections.filter((_, i) => i !== index);
    setFaqSections(updatedSections);
  };

  // Add a new FAQ to a specific section
  const handleAddFaq = (sectionIndex) => {
    const updatedSections = [...faqSections];
    updatedSections[sectionIndex].faqs.push({
      question_en: "",
      question_nl: null,
      answer_en: "",
      answer_nl: null,
    });
    setFaqSections(updatedSections);
  };

  // Remove a FAQ from a specific section
  const handleRemoveFaq = (sectionIndex, faqIndex) => {
    const updatedSections = [...faqSections];
    updatedSections[sectionIndex].faqs = updatedSections[
      sectionIndex
    ].faqs.filter((_, i) => i !== faqIndex);
    setFaqSections(updatedSections);
  };

  // Edit a FAQ in a specific section
  const handleEditFaq = (sectionIndex, faqIndex, updatedFaq) => {
    const updatedSections = [...faqSections];
    updatedSections[sectionIndex].faqs[faqIndex] = updatedFaq;
    setFaqSections(updatedSections);
  };

  // Save FAQs to the API
  const handleSaveFAQs = async () => {
    try {
      // Prepare the payload
      const payload = faqSections.map((section) => ({
        name_en: section.name_en,
        name_nl: section.name_nl || null, // Ensure name_nl is included, default to empty string
        faqs: section.faqs.map((faq) => ({
          question_en: faq.question_en,
          question_nl: faq.question_nl || null, // Ensure question_nl is included, default to empty string
          answer_en: faq.answer_en,
          answer_nl: faq.answer_nl || null, // Ensure answer_nl is included, default to empty string
        })),
      }));

      // Call the API to save FAQs
      const response = await addFaqs(payload);
      console.log("FAQs saved successfully:", response);
      toast.success(t("adminfaq_save_success"));
    } catch (error) {
      console.error("Error saving FAQs:", error);
      toast.error(t("adminfaq_save_fail"));
    }
  };

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">FAQ</h2>
      {/* Add New FAQ Section */}
      <div className="w-full max-w-[848px] mx-auto">
        <div className="flex gap-3 items-center mb-8">
          <InputField
            placeholder="New Main Subject"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <Button
            loading={false}
            type="submit"
            btnText="Add"
            paddingX="20px"
            textColor="#000000"
            breakpoint="w-auto text-[12px]"
            onClick={handleAddSection}
          />
        </div>

        {/* Display FAQ Sections */}
        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-8">
            <div className="flex gap-3 items-center mb-4">
              <label className="text-black text-xs font-semibold block">
                Main Subject
              </label>
              <InputField
                placeholder="Main Subject"
                value={section.name_en}
                onChange={(e) => {
                  const updatedSections = [...faqSections];
                  updatedSections[sectionIndex].name_en = e.target.value;
                  setFaqSections(updatedSections);
                }}
              />
              <Button
                loading={false}
                type="submit"
                btnText="Remove Group"
                paddingX="20px"
                textColor="#000000"
                breakpoint="w-auto text-[12px] ml-auto"
                onClick={() => handleRemoveSection(sectionIndex)}
              />
            </div>

            {/* Display FAQs in the Section */}
            <div className="inline-block min-w-full rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
                      Question (EN)
                      <img
                        src={countryflag}
                        alt="Flag"
                        className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                      />
                    </th>
                    <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
                      Answer (EN)
                      <img
                        src={countryflag2}
                        alt="Flag"
                        className="cursor-pointer h-5 w-5 absolute right-4 top-5"
                      />
                    </th>
                  </tr>
                </thead>
                <TableBody2
                  faqs={section.faqs}
                  onAddFaq={() => handleAddFaq(sectionIndex)}
                  onRemoveFaq={(faqIndex) =>
                    handleRemoveFaq(sectionIndex, faqIndex)
                  }
                  onEditFaq={(faqIndex, updatedFaq) =>
                    handleEditFaq(sectionIndex, faqIndex, updatedFaq)
                  }
                />
              </table>
            </div>
          </div>
        ))}
        <Button
          loading={false}
          type="submit"
          btnText="Save FAQs"
          textColor="#000000"
          breakpoint="w-full max-w-[280px]"
          onClick={handleSaveFAQs}
        />
      </div>
    </div>
  );
};
