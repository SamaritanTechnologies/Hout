import React, { useCallback, useEffect, useRef, useState } from "react";
import cross from "../../assets/addToCart/cross.svg";
import image1 from "../../assets/addToCart/image1.svg";
import image2 from "../../assets/addToCart/image2.svg";
import image3 from "../../assets/addToCart/image3.svg";
import coupon from "../../assets/addToCart/coupon.svg";
import plus from "../../assets/addToCart/plus.svg";
import minus from "../../assets/addToCart/minus.svg";
import { debounce } from "lodash";
import { deleteCartItem, getCart } from "../../redux/actions/orderActions";
import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import { getLoggedInUser } from "../../redux";
import { useDispatch } from "react-redux";
import { setCartItems } from "../../redux/slices/cartSlice";

const ShoppingCart = ({
  cartData,
  fetchCart,
  taxData = 0,
  delivery = 0,
  handleDivClick,
}) => {
  const user = getLoggedInUser();
  const [cartItem, setCartItem] = useState(cartData?.cart_items || []);
  const [updatedItem, setUpdatedItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItem(cartData?.cart_items || []);
  }, [cartData]);

  const updateQuantity = async ({ id, productId, price, newQuantity }) => {
    try {
      const payload = {
        cart: user?.card_id,
        user: user?.user_id,
        product: productId,
        quantity: newQuantity,
        product_price: price,
      };
      await axiosWithCredentials.put(`/change-quantity/${id}/`, payload);

      fetchCart();
      const res = await getCart();
      dispatch(setCartItems(res.cart_items));
    } catch (error) {
      let errorMessage = "Something went wrong!";

      if (error.response?.data?.product?.length) {
        errorMessage = error.response.data.product[0];
      } else if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      fetchCart();
      toast.error(errorMessage);
    }
  };

  const debouncedUpdateQuantity = useCallback(
    debounce((item) => updateQuantity(item), 500),
    []
  );

  useEffect(() => {
    if (updatedItem) {
      debouncedUpdateQuantity(updatedItem);
    }
  }, [updatedItem]);

  const handleIncrement = (id) => {
    const item = cartItem?.find((item) => item.id === id);
    if (item) {
      const newQuantity = item.quantity + 1;
      setCartItem((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      setUpdatedItem({
        id,
        productId: item.product?.id,
        price: item.product_price,
        newQuantity,
      });
    }
  };

  const handleDecrement = (id) => {
    const item = cartItem?.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      setCartItem((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
      setUpdatedItem({
        id,
        productId: item.product?.id,
        price: item.product_price,
        newQuantity,
      });
    }
  };

  const handleRemove = async (id) => {
    try {
      await deleteCartItem(id);
      fetchCart();
      const res = await getCart();
      dispatch(setCartItems(res.cart_items));
    } catch (error) {
      toast.error("Failed to remove item from the cart.");
    }
  };

  const totalPrice = cartItem.reduce(
    (sum, item) => sum + parseFloat(item.product_price),
    0
  );

  const calculateTotal = (totalPrice, delivery, taxData) => {
    const total =
      Number(totalPrice || 0) + Number(delivery || 0) + Number(taxData || 0);
    return total;
  };
  const total = calculateTotal(totalPrice, delivery, taxData);

  return (
    <>
      <section className="w-full flex xl:gap-[40px] lg:gap-[30px] md:gap-[20px] gap-[10px] justify-between xl:px-[135px] lg:px-[80px] px-[20px]  xl:pb-[100px] lg:pb-[70px] md:pb-[80px] pb-[70px] md:flex-col sm:flex-col xs:flex-col  ">
        <section className="flex-1 ">
          <div className="overflow-auto">
            <table className="w-full ">
              <thead>
                <tr className="border-b-[1px] border-[#979797]  ">
                  <th
                    className="text-left xl:text-18 lg:text-16 text-14 xl:pb-[24px] lg:pb-[18px] pb-[10px]
 "
                  >
                    Product
                  </th>
                  <th
                    className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]
  "
                  >
                    Quantity
                  </th>
                  <th
                    className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]
 "
                  >
                    Price
                  </th>
                  <th
                    className="text-left xl:text-18 lg:text-16 text-14 px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]
"
                  >
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItem?.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td className="xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                        <section className="flex items-center gap-x-2 pt-5 xs:min-w-[300px]">
                          <a
                            href="#"
                            className="shrink-0"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemove(item?.id);
                            }}
                          >
                            <img src={cross} alt="remove" />
                          </a>
                          <div>
                            <img
                              src={item?.product_length?.product.image}
                              className="xl:w-[80px] xl:h-[96px] lg:w-[70px] lg:h-[80px] min-w-[60px] min-h-[60px] xs:w-[60px] xs:h-[60px]"
                              alt={item.name}
                            />
                          </div>
                          <div className="flex flex-col xl:min-w-[220px]">
                            <div className="xl:text-18 lg:text-16 text-14">
                              {item?.product_length?.product.name_en}
                            </div>
                            <div className="flex gap-[15px] items-center">
                              <div>
                                <div className="text-12 text-[#24242480] font-medium">
                                  THICKNESS
                                </div>
                                <div className="xl:text-14 text-[13px]">
                                  {item?.product_length?.product.thickness} mm
                                </div>
                              </div>
                              <div>
                                <div className="text-12 text-[#24242480] font-medium">
                                  WIDTH
                                </div>
                                <div className="xl:text-14 text-[13px]">
                                  {item?.product_length?.product.width} mm
                                </div>
                              </div>
                              <div>
                                <div className="text-12 text-[#24242480] font-medium">
                                  LENGTH
                                </div>
                                <div className="xl:text-14 text-[13px]">
                                  {item?.product_length?.product.length} mm
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                      </td>
                      <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                        <div className="flex justify-between border items-center px-[10px] py-[6px] rounded-md xs:min-w-[80px]">
                          <div>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleDecrement(item?.id);
                              }}
                            >
                              <img src={minus} alt="decrement" />
                            </a>
                          </div>
                          <h6>{item?.quantity}</h6>
                          <div>
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handleIncrement(item?.id);
                              }}
                            >
                              <img src={plus} alt="increment" />
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                        €{item?.product_length?.discounted_price_ex_vat}
                      </td>
                      <td className="px-[10px] xl:pb-[24px] lg:pb-[18px] pb-[10px]">
                        €{item?.product_price}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <section className="pt-[30px]">
            <div>
              <h6
                className="xl:text-16 lg:text-14 text-[13px]
"
              >
                Have a coupon?
              </h6>
            </div>
            <div className="pt-2">
              <p className="xl:text-16 lg:text-14 text-[13px] text-[#6C7275]">
                Add your code for an instant cart discount
              </p>
            </div>
            <div className="flex border border-[#6C727580] justify-between items-center rounded-[10px] flex-1 xl:w-[442px] w-[100%] pl-3 mt-3">
              <div className="flex gap-x-2 xl:py-[14px] lg:py-[12px] py-[8px] items-center">
                <img src={coupon} />
                <span className="pt-[4px] text-[#6C7275]">Coupon Code</span>
              </div>
              <div className="cursor-pointer p-4  rounded-md rounded-l-none">
                Apply
              </div>
            </div>
          </section>
        </section>

        {/* Right side of grid  */}
        <section className="xl:w-[38.2%] lg:w-[38.2%] bg-[#F8F8F8] xl:px-[32px] lg:px-[25px] md:px-[20px] px-[12px] xl:pt-[44px] lg:pt-[30px] pt-[15px] rounded-lg">
          <section>
            <section className="flex justify-between">
              <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                Subtotal
              </div>
              <div>
                €{cartItem?.length ? Number(totalPrice || 0).toFixed(2) : 0}
              </div>
            </section>
            <section className="flex justify-between pt-[25px]">
              <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                Delivery Fee
              </div>
              <div>
                €{cartItem?.length ? Number(delivery || 0).toFixed(2) : 0}
              </div>
            </section>
            <section className="flex justify-between pt-[25px] border-b border-[#D9D9D9] pb-3">
              <div className="text-[#696C74] xl:text-16 lg:text-15 md:text-14 text-[13px]">
                Tax
              </div>
              <div>
                €{cartItem?.length ? Number(taxData || 0).toFixed(2) : 0}
              </div>
            </section>
            <section className="flex justify-between pt-[25px] pb-5">
              <div className="xl:text-16 lg:text-15 md:text-14 text-[13px] font-medium">
                Total
              </div>
              <div className="text-customYellow font-medium xl:text-18 lg:text-16 text-14">
                USD €{cartItem?.length ? total?.toFixed(2) : 0}
              </div>
            </section>
          </section>

          <div className="xl:py-[30px] py-[15px] flex justify-center">
            <button
              onClick={() => handleDivClick("secondTab")}
              className="xl:w-[93.5%] lg:w-[93.5%] w-[100%] bg-[#FBC700] text-white py-2 rounded-lg"
            >
              Checkout
            </button>
          </div>
        </section>
      </section>
    </>
  );
};

export default ShoppingCart;
