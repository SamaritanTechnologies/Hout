import React, { useState } from "react";
import PlusCircle from "../../assets/DashboardImages/plusCricle.svg";
import CrossCircle from "../../assets/DashboardImages/cancelCircle.svg";

const productItem = {
  Bezorgen: "",
  full_price_ex_vat: "",
};

const TableBody2 = () => {
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
              type="text"
              min={0}
              value={product.length}
              required
              placeholder="Bezorgen"
              onChange={(e) => handleChange(index, "length", e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </td>
          <td className="px-[24px] py-[16px] text-left text-16 font-normal text-[#6C7275] border border-[#D9D9D9]">
            <input
              required
              type="text"
              min={0}
              value={product.full_price_ex_vat}
              placeholder="Blalalsabdssbckjsadfcbevckbskjdbvkbdsak lksdn cldsan lfnds csdn sand,jvc dsmvc "
              onChange={(e) =>
                handleChange(index, "full_price_ex_vat", e.target.value)
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

export default TableBody2;
