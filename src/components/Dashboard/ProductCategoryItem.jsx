import React from "react";
import PlusCircle from "../../assets/DashboardImages/plusCricle.svg";
import CrossCircle from "../../assets/DashboardImages/cancelCircle.svg";
import countryflag from "../../assets/DashboardImages/UK-Flag.svg";
import countryflag2 from "../../assets/DashboardImages/USA-flag.svg";

const productItem = {
  name_en: "",
  name_nl: "",
};

export const ProductCategoryItem = ({
  name,
  loading,
  categoryData,
  setCategoryData,
}) => {
  const groupCategory = categoryData[name];

  const handleAddRow = () => {
    if (loading) return;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        choices: [...(prevData[name].choices || []), { ...productItem }],
      },
    }));
  };

  const handleRemoveRow = (index) => {
    if (loading) return;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        choices:
          prevData[name].choices?.length === 1
            ? [{ ...productItem }]
            : prevData[name].choices?.filter((_, i) => i !== index),
      },
    }));
  };

  const handleChange = (index, field, value) => {
    if (loading) return;
    setCategoryData((prevData) => {
      const updatedChoices = prevData[name]?.choices?.map((choice, i) =>
        i === index ? { ...choice, [field]: value } : choice
      );
      return {
        ...prevData,
        [name]: { ...prevData[name], choices: updatedChoices },
      };
    });
  };

  return (
    <div className="inline-block min-w-full rounded-lg overflow-hidden mb-[50px]">
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-[24px] py-[16px] text-left text-14 font-bold rounded-ss-2xl bg-[#cbcbcb] relative">
              {groupCategory?.name_nl || name}
              <img
                src={countryflag}
                alt="Flag"
                className="cursor-pointer h-5 w-5 absolute right-4 top-5"
              />
            </th>
            <th className="bg-[#cbcbcb] px-[24px] py-[16px] text-left text-16 font-semibold rounded-se-2xl relative">
              {groupCategory?.name || name}
              <img
                src={countryflag2}
                alt="Flag"
                className="cursor-pointer h-5 w-5 absolute right-4 top-5"
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {groupCategory?.choices?.map((choice, index) => (
            <tr key={index}>
              <td className="px-[24px] py-[16px] text-left text-16 font-normal border border-[#D9D9D9]">
                <input
                  required
                  type="text"
                  value={choice.name_nl}
                  placeholder="Choice (nl)"
                  onChange={(e) =>
                    handleChange(index, "name_nl", e.target.value)
                  }
                  className="w-full outline-none bg-transparent"
                />
              </td>
              <td className="px-[24px] py-[16px] text-left text-16 font-normal border border-[#D9D9D9]">
                <input
                  required
                  type="text"
                  value={choice.name_en}
                  placeholder="Choice (en)"
                  onChange={(e) =>
                    handleChange(index, "name_en", e.target.value)
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
