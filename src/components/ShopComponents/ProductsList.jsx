import React, { useEffect, useState } from "react";
import { getProducts } from "../../redux/actions/userActions";
import ProductCard from "../Common/ProductCard";

const ProductsList = ({ filters }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const queryParams = new URLSearchParams();

        // Add price range
        queryParams.append("min_price", filters.price[0]);
        queryParams.append("max_price", filters.price[1]);

        // Add selected filters
        Object.entries(filters.selectedFilters).forEach(([category, data]) => {
          data.choices.forEach((choiceId) => {
            queryParams.append(category.toLowerCase(), choiceId);
          });
        });

        const data = await getProducts(queryParams.toString());
        setProducts(data.results);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
  }, [filters]);

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
        {products.map((product) => {
          const minimumPrice = getMinimumPriceObject(product.lengths);
          return (
            <ProductCard
              key={product.id}
              product={product}
              minimumPrice={minimumPrice}
            />
          );
        })}
      </div>
    </>
  );
};

export default ProductsList;
