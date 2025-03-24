import React, { useEffect, useState } from "react";
import { getFaqs } from "../redux/actions/userActions";
import { toast } from "react-toastify";

export const Faq = () => {
  const [faqsData, setFaqsData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFaq = async () => {
      try {
        const data = await getFaqs();
        setFaqsData(data);
      } catch (error) {
        toast.error("Error fetching faq", + error.message);
      }
    };

    fetchFaq();
  }, []);

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full min-h-48 max-w-2xl mx-auto px-4 md:px-6 py-24">
      <h1 className="text-3xl font-bold text-slate-900 mb-8 text-center">
        FAQs
      </h1>
      <div className="space-y-4">
        {faqsData.map((subject) => (
          <div key={subject.id} className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800 p-3 border-b border-slate-200">
              {subject.name_en}
            </h3>
            <div className="divide-y divide-slate-200">
              {subject.faqs.map((faq) => (
                <div key={faq.id} className="p-3">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full text-left font-semibold text-slate-800 focus:outline-none"
                    onClick={() => toggleAccordion(faq.id)}
                    aria-expanded={activeIndex === faq.id}
                    aria-controls={`faq-content-${faq.id}`}
                  >
                    <span>{faq.question_en}</span>
                    <svg
                      className={`shrink-0 ml-4 h-6 w-6 transition-transform ${
                        activeIndex === faq.id ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    id={`faq-content-${faq.id}`}
                    role="region"
                    aria-labelledby={`faq-title-${faq.id}`}
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      activeIndex === faq.id
                        ? "max-h-screen opacity-100 mt-4"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-slate-600">{faq.answer_en}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};