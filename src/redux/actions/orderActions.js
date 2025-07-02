import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import i18n from "i18next";

export const getOrderDetails = async (month, day, page = 1, page_size) => {
  try {
    // const response = await axiosWithCredentials.get(
    //   `/order-filter/?month=${month ?? null}&payment_method=${
    //     payment ?? null
    //   }&day=${day ?? null}`
    // );
    const response = await axiosWithCredentials.get(
      `/order/?month=${month ?? null}&day=${day ?? null}&page=${
        page ?? null
      }&page_size=${page_size ?? null}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
export const getCart = async () => {
  try {
    const response = await axiosWithCredentials.get(`/cart/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const getWishList = async () => {
  try {
    const response = await axiosWithCredentials.get(`/wishlist/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const addToCart = async (values) => {
  const { id, price, card_id, user_id } = values;

  const payload = {
    cart: card_id,
    user: user_id,
    product: id,
    quantity: 1,
    product_price: price,
  };

  try {
    const response = await axiosWithCredentials.post(`/add-to-cart/`, payload);

    toast.success(i18n.t("oa_cart_add_success"));
    return response.data;
  } catch (error) {
    if (error.response.data.product?.length) {
      toast.error(error.response.data.product[0]);
    } else {
      toast.error(i18n.t("oa_cart_add_error"));
    }
    throw error;
  }
};

// export const changeQuantity = async (values) => {
//   const { id, price, productId, quantity, card_id, user_id } = values;

//   const payload = {
//     product: productId,
//     quantity,
//     product_price: price,
//   };

//   try {
//     const response = await axiosWithCredentials.put(
//       `/change-quantity/${id}/`,
//       payload
//     );

//     // toast.success("Successfully added to cart");
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const deleteCartItem = async (id) => {
  try {
    const response = await axiosWithCredentials.delete(
      `/delete/add-to-cart/${id}/`
    );
    toast.success(i18n.t("oa_cart_remove_success"));

    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const getInvoice = async (id, options = {}) => {
  try {
    return axiosWithCredentials.get(`/download-invoice/${id}/`, {
      ...options,
      responseType: "arraybuffer",
    });
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};
