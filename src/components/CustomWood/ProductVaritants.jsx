import React, { useState } from "react";
import Button from "../Common/Button";
import cartIcon from "../../assets/customWoodPage/cart-icon.svg";
import InputField from "../Common/InputField";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify";
import { getCart } from "../../redux/actions/orderActions";
import { setCartItems } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ProductVaritants = ({ variants, vat }) => {
  const { t } = useTranslation();
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState.isLoggedIn;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleaddToCart = async (variantId) => {
    try {
      const input = document.getElementById(`quantity-${variantId}`);
      const quantity = parseInt(input.value, 10);

      if (quantity > 0) {
        const payload = {
          product_length: variantId,
          quantity,
        };

        setLoading(true);
        await axiosWithCredentials.post(`/add-to-cart/`, payload);
        input.value = 0;
        const res = await getCart();
        dispatch(setCartItems(res.cart_items));
        toast.success("Product added to cart!");
        // navigate("/cart");
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
    } finally {
      setLoading(false);
    }
  };

  const handleAddToLocal = (product, variantId) => {
    console.log("Product", product);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get the quantity value from the input field
    const input = document.getElementById(`quantity-${variantId}`);
    const quantity = parseInt(input?.value, 10);

    if (quantity > 0) {
      const productIndex = existingCart.findIndex(
        (item) => item.id === product.id
      );

      if (productIndex !== -1) {
        // Update the quantity
        existingCart[productIndex].quantity += quantity;
      } else {
        // Set the quantity and add to cart
        product.quantity = quantity;
        existingCart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));

      // Reset input value
      input.value = 0;

      // Dispatch custom event
      window.dispatchEvent(new Event("localCartUpdated"));

      toast.success("Product added to cart!");
    } else {
      toast.warning("Please enter a valid quantity");
    }
  };

  return (
    <section className="wood-stock-table px-[30px] pt-[61px] max-w-[1240px] mx-auto reso">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#F8F8F8]">
              <th className="font-bold text-15 p-[10px] text-start">
                {t("p_variant")}
              </th>
              <th className="font-bold text-15 p-[10px] text-start">
                {t("p_articleNumber")}
              </th>
              <th className="font-bold text-15 p-[10px] text-start">
                {t("p_price")}
              </th>
              <th className="font-bold text-15 p-[10px] text-start">
                {t("p_stock")}
              </th>
              <th className="font-bold text-15 p-[10px] text-start">
                {t("p_number")}
              </th>
              <th className="font-bold text-15 p-[10px] text-start">
                {t("p_winkelwagen")}
              </th>
            </tr>
          </thead>
          <tbody>
            {variants?.map((variant) => (
              <tr key={variant.id}>
                <td className="p-[10px]">
                  <div className="flex flex-col gap-[2px]">
                    <div className="font-bold text-14 text-[#111727]">
                      {t("p_variant")}
                    </div>
                    <div className="text-14 text-[#111727]">
                      {variant.length}cm
                    </div>
                  </div>
                </td>
                <td className="p-[10px]">
                  <div className="flex flex-col gap-[2px]">
                    <div className="font-bold text-14 text-[#111727]">
                      {t("p_articleNumber")}
                    </div>
                    <div className="text-14 text-[#111727]">{variant.id}</div>
                  </div>
                </td>
                <td className="p-[10px]">
                  <div className="flex flex-col gap-[3px]">
                    <div className="font-bold text-14 text-[#111727]">
                      {t("p_price")}
                      <span className="text-[#888888] text-[11px] font-normal">
                        {t("p_IncBTW")}
                      </span>
                    </div>
                    <div className="text-14 text-[#111727] font-medium">
                      {/* discounted_price_in_vat */}€
                      {vat
                        ? variant.discounted_price_in_vat
                        : variant.discounted_price_ex_vat}
                    </div>
                  </div>
                </td>
                <td className="p-[10px]">
                  <div className="text-14 text-[#111727]">
                    {variant.stock === 0 ? (
                      <span className="text-14 text-[#111727]">
                        {t("p_contactUs")}
                      </span>
                    ) : (
                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold text-[#888888]">
                          {t("p_inventoryQuantity")}
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
                    <span className="text-14 text-[#111727]">
                      {t("p_outOfStock")}
                    </span>
                  ) : (
                    <button
                      className="cart-button flex items-center justify-center"
                      onClick={() => {
                        !isAuthenticated
                          ? handleAddToLocal(variant, variant.id)
                          : handleaddToCart(variant.id);
                      }}
                      // onClick={() => handleaddToCart(variant.id)}
                      disabled={loading}
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
