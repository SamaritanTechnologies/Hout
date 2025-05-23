import React, { useEffect, useState } from "react";
import ArrowBack from "../assets/DashboardImages/arrowback.svg";
import Button from "../components/Common/Button";
import Select from "react-select";
import { toast } from "react-toastify";
import { getProducts } from "../redux/actions/productActions";
import {
  getHomepageProducts,
  addHomepageProducts,
} from "../redux/actions/dashboardActions";

const pageProductsInitials = {
  product1: null,
  product2: null,
  product3: null,
  product4: null,
  product5: null,
  product6: null,
};

export const HomePageProducts = () => {
  const [homePageProduct, setHomePageProduct] = useState(pageProductsInitials);
  const [productOptions, setProductOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const data = response.results;
        const options = data.map((product) => ({
          label: product.name_en,
          value: product.id,
        }));
        setProductOptions(options);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Fetch already selected homepage products
  useEffect(() => {
    const fetchHomepageProducts = async () => {
      try {
        const response = await getHomepageProducts();
        const homepageProducts = response.find(
          (item) => item.category === "homepage products"
        );
        if (homepageProducts) {
          const selectedProducts = homepageProducts.products;
          const updatedHomePageProduct = { ...pageProductsInitials };
          Object.keys(updatedHomePageProduct).forEach((key, index) => {
            if (selectedProducts[index]) {
              updatedHomePageProduct[key] = selectedProducts[index];
            }
          });
          setHomePageProduct(updatedHomePageProduct);
        }
      } catch (error) {
        console.error("Error fetching homepage products:", error);
      }
    };

    fetchHomepageProducts();
  }, []);

  // Function to get available options for each dropdown
  const getFilteredOptions = (selectedKey) => {
    const selectedValues = Object.values(homePageProduct)
      .filter((selected) => selected !== null)
      .map((item) => item?.value);

    return productOptions.map((option) => ({
      ...option,
      isDisabled:
        selectedValues.includes(option.value) &&
        homePageProduct[selectedKey]?.value !== option.value,
    }));
  };

  // Handle Save Button Click
  const handleSave = async () => {
    const selectedProducts = Object.values(homePageProduct)
      .filter((product) => product !== null)
      .map((product) => product.value);

    if (selectedProducts.length === 0) {
      toast.error("Please select at least one product.");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        products: selectedProducts,
        category: "homepage products",
      };

      await addHomepageProducts(payload);
      toast.success("Products added successfully!");
    } catch (error) {
      toast.error("Failed to add products.");
      console.error("Error adding products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 xl:gap-12">
      <h2 className="xl:text-32 lg:text-28 text-26 font-bold">
        Homepage Products
      </h2>
      <div className="flex flex-col gap-12 w-full max-w-[848px] mx-auto">
        {Object.keys(pageProductsInitials).map((key, index) => (
          <div className="w-full md:mb-0" key={key}>
            <label htmlFor={key} className="text-sm">
              Product {index + 1}
            </label>
            <Select
              classNamePrefix="select"
              isClearable
              isSearchable
              name={key}
              placeholder={`Product ${index + 1}`}
              options={getFilteredOptions(key)}
              value={homePageProduct[key]}
              onChange={(value) => {
                setHomePageProduct((prev) => ({
                  ...prev,
                  [key]: value,
                }));
              }}
            />
          </div>
        ))}
        <Button
          loading={isLoading}
          type="button"
          btnText="Save"
          paddingX="20px"
          textColor="#000000"
          breakpoint="xl:w-[354px] lg:w-[280px] w-[240px]"
          onClick={handleSave}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};
