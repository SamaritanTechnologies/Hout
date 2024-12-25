import React, { useEffect, useState } from "react";
import { axiosApi } from "../providers";

export const Faq = () => {
  const [data, setData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    getFaq();
  }, []);

  const getFaq = async () => {
    try {
      const response = await axiosApi.get("/faqs/");
      setData(response.data || []);
    } catch (error) {
      console.error("Error fetching faq", error);
    }
  };

  const toggleAccordion = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <>
      <div className="w-full min-h-48 max-w-2xl mx-auto px-4 md:px-6 py-24">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">FAQs</h1>
        <div className="divide-y divide-slate-200">
          {data.map((item, index) => (
            <div key={item.id} className="py-2">
              <h2>
                <button
                  type="button"
                  className="flex items-center justify-between w-full text-left font-semibold py-2"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-content-${item.id}`}
                >
                  <span>{item.question}</span>
                  <svg
                    className={`shrink-0 ml-8 transition-transform ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect y="7" width="16" height="2" rx="1" />
                    <rect
                      y="7"
                      width="16"
                      height="2"
                      rx="1"
                      transform="rotate(90 8 8)"
                    />
                  </svg>
                </button>
              </h2>
              <div
                id={`faq-content-${item.id}`}
                role="region"
                aria-labelledby={`faq-title-${item.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index
                    ? "max-h-screen opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-sm text-slate-600 pb-3">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <h1 className="text-center text-22 font-semibold">
          Frequently Asked Questions
        </h1>
        <div className="max-w-3xl mx-auto space-y-4">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <div
                onClick={() => toggleAccordion(index)}
                className="flex justify-between items-center p-5 cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <h2 className="text-lg font-medium text-gray-800">
                  {item.question}
                </h2>
                <span className="text-gray-500 text-2xl">
                  {activeIndex === index ? "-" : "+"}
                </span>
              </div>
              {activeIndex === index && (
                <div className="p-5 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 text-base">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div> */}
    </>
  );
};
