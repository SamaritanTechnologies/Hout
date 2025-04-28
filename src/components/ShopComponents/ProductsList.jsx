import React, { useEffect, useState } from "react";
import { getProducts } from "../../redux/actions/userActions";
import ProductCard from "../Common/ProductCard";

const ProductsList = ({ filters, currentPage, pageSize, setTotalItems }) => {
  const [products, setProducts] = useState([]);

  const fetchProduct = async () => {
    try {
      const queryParams = new URLSearchParams();

      // Add price range
      queryParams.append("min_price", filters.price[0]);
      queryParams.append("max_price", filters.price[1]);

      // Add selected filters
      Object.entries(filters.selectedFilters).forEach(([category, data]) => {
        let paramName =
          category.toLowerCase() === "type"
            ? "product_type"
            : category.toLowerCase() === "durability"
            ? "durability_class"
            : category.toLowerCase();

        data.choices?.forEach((choiceId) => {
          queryParams.append(paramName, choiceId);
        });
      });

      // Add VAT selection
      queryParams.append("use_inclusive_prices", filters.includeVAT || false);

      // Add pagination parameters
      queryParams.append("page", currentPage + 1); // API uses 1-based indexing
      queryParams.append("page_size", pageSize);

      const data = await getProducts(queryParams.toString());

      setProducts(data.results);
      setTotalItems(data.count); // Update total items from API
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [filters, currentPage, pageSize, setTotalItems]);

  const getMinimumPriceObject = (lengths) => {
    if (!lengths || lengths.length === 0) return "N/A";

    return lengths.reduce((minObj, currentObj) => {
      const currentPrice = parseFloat(currentObj.full_price_ex_vat);
      const minPrice = parseFloat(minObj.full_price_ex_vat);
      return currentPrice < minPrice ? currentObj : minObj;
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7 w-full pt-24 max-w-[915px] mx-auto px-4">
        {products?.map((product) => {
          const minimumPrice = getMinimumPriceObject(product.lengths);
          return (
            <ProductCard
              key={product.id}
              product={product}
              minimumPrice={minimumPrice}
              fetchProduct={fetchProduct}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProductsList;
