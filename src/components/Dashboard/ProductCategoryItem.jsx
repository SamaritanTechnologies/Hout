import React, { useState } from "react";
import PlusCircle from "../../assets/DashboardImages/plusCricle.svg";
import CrossCircle from "../../assets/DashboardImages/cancelCircle.svg";
import countryflag from "../../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../../assets/DashboardImages/USA-flag.svg";

const productItem = {
  length: "",
  product_id_prefix: "",
};

export const ProductCategoryItem = ({ groupCategory }) => {
  const [choices, setChoices] = useState(groupCategory.choices || []);

  const handleAddRow = () => {
    setChoices((prevChoices) => [...prevChoices, { ...productItem }]);
  };

  const handleRemoveRow = (index) => {
    setChoices((prevChoices) =>
      prevChoices.length === 1
        ? [{ ...productItem }]
        : prevChoices.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, field, value) => {
    setChoices((prevChoices) => {
      const updatedChoices = [...prevChoices];
      updatedChoices[index][field] = value;
      return updatedChoices;
    });
  };

  return (
    <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
              {groupCategory.name_nl}
              <img
                src={countryflag}
                alt="Flag"
                className="cursor-pointer h-5 w-5 absolute right-4 top-5"
              />
            </th>
            <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
              {groupCategory.name}
              <img
                src={countryflag2}
                alt="Flag"
                className="cursor-pointer h-5 w-5 absolute right-4 top-5"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {choices.map((choice, index) => (
            <tr key={index}>
              <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
                <input
                  required
                  type="text"
                  placeholder="300 cm"
                  value={choice.name_nl}
                  onChange={(e) =>
                    handleChange(index, "length", e.target.value)
                  }
                  className="w-full outline-none bg-transparent"
                />
              </td>
              <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
                <input
                  required
                  type="text"
                  placeholder="HHP123_300"
                  value={choice.name_en}
                  onChange={(e) =>
                    handleChange(index, "length", e.target.value)
                  }
                  className="w-full outline-none bg-transparent"
                />
              </td>
              <td className="px-[2px] py-[16px] text-end">
                <img
                  src={CrossCircle}
                  alt="Remove"
                  onClick={() => handleRemoveRow(index)}
                  className="cursor-pointer h-5 w-5"
                />
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="2"></td>
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
      </table>
    </div>
  );
};
