import React, { useEffect, useState } from "react";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "../../redux/actions/userActions";
import ProductCard from "../Common/ProductCard";

const ProductsSection = () => {
  const navigate = useNavigate();
  const [featureProducts, setFeatureProducts] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      const data = await getFeaturedProducts();
      setFeatureProducts(data.products);
    };
    fetchFeaturedProducts();
  }, []);

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
      <section className="py-12 xl:py-20 xxl:py-28 max-w-[1268px] mx-auto px-4 flex flex-col items-center gap-10 lg:gap xl:gap-[80px]" id="products-section">
        <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-center text-[#111727]">
          Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featureProducts.map((product) => {
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
        <Button
          btnText="VIEW SHOP"
          paddingX="72px"
          fontbold
          paddingY="22px"
          onClick={() => navigate(`/shop-page`)}
        />
      </section>
    </>
  );
};

export default ProductsSection;
