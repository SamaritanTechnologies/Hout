import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";

export const getProducts = async () => {
  try {
    const response = await axiosWithCredentials.get(`/products/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const deleteProduct = async (values) => {
  try {
    const { id, parentId } = values;

    await axiosWithCredentials.delete(`/products/${parentId}/delete/${id}/`);

    toast.success("Successfully deleted");
  } catch (error) {
    toast.error("Something went wrong ");
    console.log(error, "nbbb");
  }
};
export const deleteWishList = async (values) => {
  try {
    const { id } = values;

    const response = await axiosWithCredentials.delete(
      `/delete-wishlist/${id}/`
    );
    console.log(response.data, "ressppp");
    toast.success("Successfuly Deleted");
    return response;
  } catch (error) {
    toast.error("Something went wrong ");

    console.log(error, "nbbb");
  }
};

export const getProductCategories = async () => {
  try {
    const response = await axiosWithCredentials.get(`/choice-categories/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const addProduct = async (values, products, images) => {
  const formData = new FormData();
  formData.append("name_nl", values.name);
  formData.append("name_en", values.nameNl);
  formData.append("description_nl", values.productDescriptionNl);
  formData.append("description_en", values.productDescription);
  formData.append("width", values.width);
  formData.append("thickness", values.thickness);
  formData.append("weight_per_m3", values.weight);

  // Append groups, types, materials, etc.

  values.group?.forEach((group, index) =>
    formData.append(`group[${index}]`, group.id)
  );
  values.type?.forEach((type, index) =>
    formData.append(`type[${index}]`, type.id)
  );
  values.material?.forEach((material, index) =>
    formData.append(`material[${index}]`, material.id)
  );
  values.durabilityClass?.forEach((durability, index) =>
    formData.append(`durability_class[${index}]`, durability.id)
  );
  values.quality?.forEach((quality, index) =>
    formData.append(`quality[${index}]`, quality.id)
  );
  values.application?.forEach((application, index) =>
    formData.append(`application[${index}]`, application.id)
  );
  values.profile?.forEach((profile, index) =>
    formData.append(`profile[${index}]`, profile.id)
  );

  // Append images
  images?.forEach((image, index) => {
    formData.append(`images[${index}][product_image]`, image);
  });

  // Append product variations
  products?.forEach((product, index) => {
    formData.append(`products[${index}][length]`, product.length || 0);
    formData.append(
      `products[${index}][full_price_ex_vat]`,
      product.full_price_ex_vat || 0
    );
    formData.append(`products[${index}][discount]`, product.discount || 0);
    formData.append(`products[${index}][stock]`, product.stock || 0);
    formData.append(
      `products[${index}][product_id_prefix]`,
      product.product_id_prefix || ""
    );
  });

  try {
    const response = await axiosWithCredentials.post(
      `/products/create/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    toast.success("Product added successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to add product.");
    console.error("Error adding product:", error);
    throw error;
  }
};
