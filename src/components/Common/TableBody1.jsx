import React, { useState } from "react";
import PlusCircle from "../../assets/DashboardImages/plusCricle.svg";
import CrossCircle from "../../assets/DashboardImages/cancelCircle.svg";
import dltImg from "../../assets/DashboardImages/delete.svg";

const TableBody1 = ({ faqs, onAddFaq, onRemoveFaq, onEditFaq }) => {
  // Add a new FAQ row
  const handleAddRow = () => {
    onAddFaq({
      question_en: "",
      question_nl: "",
      answer_en: "",
      answer_nl: "",
    });
  };

  // Remove a FAQ row
  const handleRemoveRow = (index) => {
    onRemoveFaq(index);
  };

  // Handle changes in FAQ fields
  const handleChange = (index, field, value) => {
    const updatedFaq = { ...faqs[index], [field]: value };
    onEditFaq(index, updatedFaq);
  };

  return (
    <tbody>
      {faqs.map((faq, index) => (
        <tr key={index}>
          <td className="px-[24px] py-[16px] text-left text-16 font-normal border border-[#D9D9D9]">
            <input
              required
              type="text"
              value={faq.question_nl}
              placeholder="Question (NL)"
              onChange={(e) =>
                handleChange(index, "question_nl", e.target.value)
              }
              className="w-full outline-none bg-transparent"
            />
          </td>
          <td className="px-[24px] py-[16px] text-left text-16 font-normal border border-[#D9D9D9]">
            <input
              required
              type="text"
              value={faq.answer_nl}
              placeholder="Answer (NL)"
              onChange={(e) => handleChange(index, "answer_nl", e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </td>
          {/* Remove FAQ Button */}
          <td className="px-[2px] py-[16px] text-end">
            <img
              src={dltImg}
              alt="Remove"
              onClick={() => handleRemoveRow(index)}
              className="cursor-pointer h-5 w-5"
            />
          </td>
        </tr>
      ))}
      {/* Add FAQ Button */}
      <tr>
        <td colSpan={2}></td>
        <td>
          <button
            type="button"
            onClick={handleAddRow}
            className="flex justify-end"
            title="Add Row"
          >
            <img src={PlusCircle} alt="Add" />
          </button>
        </td>
      </tr>
    </tbody>
  );
};

export default TableBody1;
