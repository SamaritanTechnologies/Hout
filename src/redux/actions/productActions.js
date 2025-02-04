import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";

export const getProducts = async (filters = {}) => {
  try {
    // Construct query string from filters
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length > 0) {
        values.forEach((value) => {
          params.append(key, value);
        });
      }
    });

    const queryString = params.toString();
    const url = queryString ? `/product?${queryString}` : `/product`;

    const response = await axiosWithCredentials.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    await axiosWithCredentials.delete(`/product/${id}/delete/`);

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
    const response = await axiosWithCredentials.get(
      `/product/category-choices/`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching cetegories details:", error);
    throw error;
  }
};

export const getProductStaticValuesByName = async (field) => {
  try {
    const response = await axiosWithCredentials.get(
      `/product/field-values/?field=${field}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching static details:", error);
    throw error;
  }
};

export const getProductDetailsById = async (id) => {
  try {
    const response = await axiosWithCredentials.get(
      `/product/?product_id=${id}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    throw error;
  }
};

const extractIds = (items) => items?.map((item) => item.id) || [];
const extractValues = (obj) =>
  Object.values(obj)
    .filter((item) => item !== null)
    .map((item) => item.value) || [];
const extractImages = (images) =>
  images?.map((img) => ({ image: img.file })) || [];

export const addProduct = async (values, lengths, images, relatedProducts) => {
  const formData = new FormData();

  // Append basic product details
  formData.append("name_nl", values.name_nl);
  formData.append("name_en", values.name_en);
  formData.append("description_nl", values.description_nl);
  formData.append("description_en", values.description_en);

  // Ensure `width`, `thickness`, `weight_per_m3` are valid numbers
  formData.append("width", values.width);
  formData.append("thickness", values.thickness);
  formData.append("weight_per_m3", values.weight_per_m3);

  // Append groups, types, materials, etc.
  values.group?.forEach((group, index) => formData.append(`group`, group.id));
  values.product_type?.forEach((type, index) =>
    formData.append(`product_type`, type.id)
  );
  values.material?.forEach((material, index) =>
    formData.append(`material`, material.id)
  );
  values.durability_class?.forEach((durability, index) =>
    formData.append(`durability_class`, durability.id)
  );
  values.quality?.forEach((quality, index) =>
    formData.append(`quality`, quality.id)
  );
  values.application?.forEach((application, index) =>
    formData.append(`application`, application.id)
  );
  values.profile?.forEach((profile, index) =>
    formData.append(`profile`, profile.id)
  );

  // Append related products variations
  Object.entries(relatedProducts).forEach(([key, related]) => {
    if (related) {
      formData.append(`related_products`, related.value); // Use related.value as the ID
    }
  });

  // Append lengths variations
  images?.forEach((image, index) => {
    if (image.id) {
      formData.append(`images`, image.file);
    }
    formData.append(`images`, image.file);
  });

  // Append lengths variations
  lengths?.forEach((length, index) => {
    if (length.id) {
      formData.append(`lengths[${index}][id]`, length.id);
    }
    formData.append(`lengths[${index}][length]`, length.length || 0);
    formData.append(`lengths[${index}][discount]`, length.discount || 0);
    formData.append(`lengths[${index}][stock]`, length.stock || 0);
    formData.append(
      `lengths[${index}][full_price_ex_vat]`,
      length.full_price_ex_vat || 0
    );
  });

  // Send the request to the backend
  try {
    const response = await axiosWithCredentials.post(
      `/product/create/`,
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

export const updateProduct = async (id, values, lengths, images, relatedProducts) => {
  const formData = new FormData();

  // Append basic product details
  formData.append("name_nl", values.name_nl || "");
  formData.append("name_en", values.name_en || "");
  formData.append("description_nl", values.description_nl || "");
  formData.append("description_en", values.description_en || "");

  // Append numeric fields (ensure they are valid numbers)
  formData.append("width", values.width || 0);
  formData.append("thickness", values.thickness || 0);
  formData.append("weight_per_m3", values.weight_per_m3 || 0);

  // Append arrays (groups, types, materials, etc.)
  if (values.group?.length) {
    values.group.forEach((group) => formData.append("group[]", group.id));
  }
  if (values.product_type?.length) {
    values.product_type.forEach((type) => formData.append("product_type[]", type.id));
  }
  if (values.material?.length) {
    values.material.forEach((material) => formData.append("material[]", material.id));
  }
  if (values.durability_class?.length) {
    values.durability_class.forEach((durability) => formData.append("durability_class[]", durability.id));
  }
  if (values.quality?.length) {
    values.quality.forEach((quality) => formData.append("quality[]", quality.id));
  }
  if (values.application?.length) {
    values.application.forEach((application) => formData.append("application[]", application.id));
  }
  if (values.profile?.length) {
    values.profile.forEach((profile) => formData.append("profile[]", profile.id));
  }

  // Append related products (only if they exist)
  const relatedProductIds = Object.values(relatedProducts)
    .filter((related) => related?.value)
    .map((related) => related.value);

  relatedProductIds.forEach((id) => {
    formData.append("related_products[]", id);
  });

  // Append images (handle existing and new images)
  if (images?.length) {
    images.forEach((image, index) => {
      if (image.id) {
        // For existing images, append the ID
        formData.append(`images[${index}][id]`, image.id);
      } else if (image.file) {
        // For new images, append the file
        formData.append(`images[${index}][product_image]`, image.file);
      }
    });
  }

  // Append lengths (handle existing and new lengths)
  if (lengths?.length) {
    lengths.forEach((length, index) => {
      if (length.id) {
        // For existing lengths, append the ID
        formData.append(`lengths[${index}][id]`, length.id);
      }
      formData.append(`lengths[${index}][length]`, length.length || 0);
      formData.append(`lengths[${index}][discount]`, length.discount || 0);
      formData.append(`lengths[${index}][stock]`, length.stock || 0);
      formData.append(`lengths[${index}][full_price_ex_vat]`, length.full_price_ex_vat || 0);
    });
  }

  // Debug formData (optional)
  for (let [key, value] of formData.entries()) {
    console.log(key, value);
  }

  try {
    const response = await axiosWithCredentials.put(
      `/product/${id}/update/`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    toast.success("Product updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update product.");
    console.error("Error updating product:", error);
    throw error;
  }
};
