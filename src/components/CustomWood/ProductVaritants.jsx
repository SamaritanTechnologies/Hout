// import React from "react";
// import Button from "../Common/Button";
// import cartIcon from "../../assets/customWoodPage/cart-icon.svg";
// import InputField from "../Common/InputField";
// import { axiosWithCredentials } from "../../providers";
// const ProductVaritants = ({ variants }) => {
//   const handleaddToCart = async ({ id, productId, price, newQuantity }) => {
//     try {
//       const payload = {
//         product_length: user?.card_id,
//         quantity: user?.user_id,
//       };
//       // const res = await axiosWithCredentials.put(`/add-to-cart/`, payload);

//       toast.success("Successfully updated the cart");
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <>
//       <section className="wood-stock-table px-[30px] pt-[61px] max-w-[1240px] mx-auto reso">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="bg-[#F8F8F8]">
//                 <th className="font-bold text-15 p-[10px] text-start">
//                   Variant
//                 </th>
//                 <th className="font-bold text-15 p-[10px] text-start ">
//                   Articlenumber
//                 </th>
//                 <th className="font-bold text-15 p-[10px] text-start">Price</th>
//                 <th className="font-bold text-15 p-[10px] text-start">Stock</th>
//                 <th className="font-bold text-15 p-[10px] text-start">
//                   Number
//                 </th>
//                 <th className="font-bold text-15 p-[10px] text-start">
//                   Winkelwagen
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {variants?.map((variant) => (
//                 <tr key={variant.id}>
//                   <td className="p-[10px]">
//                     <div className="flex flex-col gap-[2px]">
//                       <div className="font-bold text-14 text-[#111727]">
//                         Variant
//                       </div>
//                       <div className="text-14 text-[#111727]">
//                         {variant.length}cm
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-[10px]">
//                     <div className="flex flex-col gap-[2px]">
//                       <div className="font-bold text-14 text-[#111727]">
//                         Article number
//                       </div>
//                       <div className="text-14 text-[#111727]">{variant.id}</div>
//                     </div>
//                   </td>
//                   <td className="p-[10px]">
//                     <div className="flex flex-col gap-[3px]">
//                       <div className="font-bold text-14 text-[#111727]">
//                         Price
//                         <span className="text-[#888888] text-[11px] font-normal">
//                           Inc BTW
//                         </span>
//                       </div>
//                       <div className="text-14 text-[#111727] font-medium">
//                         ${variant.discounted_price_in_vat}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-[10px]">
//                     <div className="text-14 text-[#111727]">
//                       {variant.stock == 0 ? (
//                         <span className="text-14 text-[#111727]">
//                           If you are interested, please contact us
//                         </span>
//                       ) : (
//                         <div className="flex flex-col gap-3">
//                           <span className="text-sm font-semibold text-[#888888]">
//                             Inventory quantity
//                           </span>
//                           <span className="text-sm">{variant.stock}</span>
//                         </div>
//                       )}
//                     </div>
//                   </td>
//                   <td className="p-[10px]">
//                     {variant.stock != 0 && (
//                       <div className="flex items-center gap-2">
//                         <button
//                           className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
//                           onClick={() => {
//                             const input = document.getElementById(
//                               `quantity-${variant.id}`
//                             );
//                             let value = parseInt(input.value, 10);
//                             if (value > 0) {
//                               input.value = value - 1;
//                             }
//                           }}
//                         >
//                           -
//                         </button>
//                         <input
//                           id={`quantity-${variant.id}`}
//                           type="number"
//                           min={0}
//                           max={variant.stock}
//                           defaultValue={0}
//                           className="w-[60px] text-center border border-gray-300 rounded-md p-1"
//                           onChange={(e) => {
//                             const value = parseInt(e.target.value, 10);
//                             if (value < 0) e.target.value = 0;
//                             if (value > variant.stock)
//                               e.target.value = variant.stock;
//                           }}
//                         />
//                         <button
//                           className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
//                           onClick={() => {
//                             const input = document.getElementById(
//                               `quantity-${variant.id}`
//                             );
//                             let value = parseInt(input.value, 10);
//                             if (value < variant.stock) {
//                               input.value = value + 1;
//                             }
//                           }}
//                         >
//                           +
//                         </button>
//                       </div>
//                     )}
//                   </td>
//                   <td className="p-[10px]">
//                     {variant.stock == 0 ? (
//                       <span className="text-14 text-[#111727]">
//                         Out of stock
//                       </span>
//                     ) : (
//                       <button
//                         className="cart-button flex items-center justify-center"
//                         onClick={handleaddToCart}
//                       >
//                         <img src={cartIcon} alt="" srcset="" />
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ProductVaritants;
import React, { useState } from "react";
import Button from "../Common/Button";
import cartIcon from "../../assets/customWoodPage/cart-icon.svg";
import InputField from "../Common/InputField";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify"; // Assuming you are using react-toastify for toasts

const ProductVaritants = ({ variants }) => {
  const handleaddToCart = async (variantId) => {
    try {
      const input = document.getElementById(`quantity-${variantId}`);
      const quantity = parseInt(input.value, 10);

      if (quantity > 0) {
        const payload = {
          product_length: variantId,
          quantity,
        };
        console.log("payload", payload);
        await axiosWithCredentials.post(`/add-to-cart/`, payload);
        toast.success("Successfully updated the cart");
      } else {
        toast.warning("Please enter a valid quantity");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message === "No more product left in stock.") {
          toast.error("This product is out of stock.");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="wood-stock-table px-[30px] pt-[61px] max-w-[1240px] mx-auto reso">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8F8F8]">
              <th className="font-bold text-15 p-[10px] text-start">Variant</th>
              <th className="font-bold text-15 p-[10px] text-start">
                Articlenumber
              </th>
              <th className="font-bold text-15 p-[10px] text-start">Price</th>
              <th className="font-bold text-15 p-[10px] text-start">Stock</th>
              <th className="font-bold text-15 p-[10px] text-start">Number</th>
              <th className="font-bold text-15 p-[10px] text-start">
                Winkelwagen
              </th>
            </tr>
          </thead>
          <tbody>
            {variants?.map((variant) => (
              <tr key={variant.id}>
                <td className="p-[10px]">
                  <div className="flex flex-col gap-[2px]">
                    <div className="font-bold text-14 text-[#111727]">
                      Variant
                    </div>
                    <div className="text-14 text-[#111727]">
                      {variant.length}cm
                    </div>
                  </div>
                </td>
                <td className="p-[10px]">
                  <div className="flex flex-col gap-[2px]">
                    <div className="font-bold text-14 text-[#111727]">
                      Article number
                    </div>
                    <div className="text-14 text-[#111727]">{variant.id}</div>
                  </div>
                </td>
                <td className="p-[10px]">
                  <div className="flex flex-col gap-[3px]">
                    <div className="font-bold text-14 text-[#111727]">
                      Price{" "}
                      <span className="text-[#888888] text-[11px] font-normal">
                        Inc BTW
                      </span>
                    </div>
                    <div className="text-14 text-[#111727] font-medium">
                      ${variant.discounted_price_in_vat}
                    </div>
                  </div>
                </td>
                <td className="p-[10px]">
                  <div className="text-14 text-[#111727]">
                    {variant.stock === 0 ? (
                      <span className="text-14 text-[#111727]">
                        If you are interested, please contact us
                      </span>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold text-[#888888]">
                          Inventory quantity
                        </span>
                        <span className="text-sm">{variant.stock}</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="p-[10px]">
                  {variant.stock !== 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => {
                          const input = document.getElementById(
                            `quantity-${variant.id}`
                          );
                          let value = parseInt(input.value, 10);
                          if (value > 0) input.value = value - 1;
                        }}
                      >
                        -
                      </button>
                      <input
                        id={`quantity-${variant.id}`}
                        type="number"
                        min={0}
                        max={variant.stock}
                        defaultValue={0}
                        className="w-[60px] text-center border border-gray-300 rounded-md p-1"
                        onChange={(e) => {
                          const value = parseInt(e.target.value, 10);
                          if (value < 0) e.target.value = 0;
                          if (value > variant.stock)
                            e.target.value = variant.stock;
                        }}
                      />
                      <button
                        className="px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => {
                          const input = document.getElementById(
                            `quantity-${variant.id}`
                          );
                          let value = parseInt(input.value, 10);
                          if (value < variant.stock) input.value = value + 1;
                        }}
                      >
                        +
                      </button>
                    </div>
                  )}
                </td>
                <td className="p-[10px]">
                  {variant.stock === 0 ? (
                    <span className="text-14 text-[#111727]">Out of stock</span>
                  ) : (
                    <button
                      className="cart-button flex items-center justify-center"
                      onClick={() => handleaddToCart(variant.id)}
                    >
                      <img src={cartIcon} alt="Cart" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ProductVaritants;
