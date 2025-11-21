import React, { useEffect, useState } from "react";
import { getProducts } from "../../redux/actions/userActions";
import ProductCard from "../Common/ProductCard";
import { parsePrice } from "../../utils/helper";

const ProductsList = ({
  filters,
  currentPage,
  pageSize,
  setTotalItems,
  includeVAT,
  searchQuery,
}) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
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

      // Filter only active webshop products
      queryParams.append("is_active_webshop", "true");

      // Add pagination parameters
      queryParams.append("page", currentPage + 1); // API uses 1-based indexing
      queryParams.append("page_size", pageSize);
      if (searchQuery && searchQuery.trim() !== "") {
        queryParams.append("search", searchQuery.trim());
      }
      const data = await getProducts(queryParams.toString());

      // Client-side filtering for active webshop products (until backend supports it)
      const activeProducts = (data.results || []).filter(product => 
        product.is_active_webshop !== false
      );

      setProducts(activeProducts);
      setTotalItems(data.count || 0); // Use total count from API for pagination
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, [filters, currentPage, pageSize, setTotalItems, searchQuery]);

  const getMinimumPriceObject = (lengths) => {
    if (!lengths || lengths.length === 0) return "N/A";
    return lengths.reduce((minObj, currentObj) => {
      const currentPrice = parsePrice(currentObj.full_price_ex_vat);
      const minPrice = parsePrice(minObj.full_price_ex_vat);
      return currentPrice < minPrice ? currentObj : minObj;
    });
  };

  return (
    <>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7 w-full pt-24 max-w-[915px] mx-auto px-4">
        {products?.map((product) => {
          const minimumPrice = getMinimumPriceObject(product.lengths);
          return (
            <ProductCard
              key={product.id}
              product={product}
              minimumPrice={minimumPrice}
              fetchProduct={fetchProduct}
              includeVAT={includeVAT}
            />
          );
        })}
      </div> */}
      <div className="w-full pt-24 max-w-[915px] mx-auto px-4">
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 py-20 text-gray-700">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            <span>Loading products...</span>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7">
            {products.map((product) => {
              const minimumPrice = getMinimumPriceObject(product.lengths);
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  minimumPrice={minimumPrice}
                  fetchProduct={fetchProduct}
                  includeVAT={includeVAT}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg font-medium">
            🚫 No products found.
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
