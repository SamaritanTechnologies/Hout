import React, { useState } from "react";
import PlusCircle from "../../assets/DashboardImages/plusCricle.svg";
import CrossCircle from "../../assets/DashboardImages/cancelCircle.svg";

const productItem = {
  length: "",
  product_id_prefix: "",
};

const TableBody = () => {
  const [products, setProducts] = useState([{ ...productItem }]);

  const handleAddRow = () => {
    setProducts((prevProducts) => [...prevProducts, { ...productItem }]);
  };

  const handleRemoveRow = (index) => {
    setProducts((prevProducts) =>
      prevProducts.length === 1
        ? [{ ...productItem }]
        : prevProducts.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, field, value) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts[index][field] = value;
      return updatedProducts;
    });
  };

  return (
    <tbody>
      {products.map((product, index) => (
        <tr key={index}>
          <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
            <input
              type="number"
              min={0}
              value={product.length}
              required
              placeholder="300 cm"
              onChange={(e) => handleChange(index, "length", e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </td>
          <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
            <input
              required
              type="text"
              placeholder="HHP123_300"
              value={product.product_id_prefix}
              onChange={(e) =>
                handleChange(index, "product_id_prefix", e.target.value)
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
        <td colSpan={Object.keys(productItem).length}></td>
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

export default TableBody;
