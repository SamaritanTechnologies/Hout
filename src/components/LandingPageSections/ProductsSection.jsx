import React, { useEffect, useState } from "react";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { getFeaturedProducts } from "../../redux/actions/userActions";
import ProductCard from "../Common/ProductCard";
import { useTranslation } from "react-i18next";
import { useVat } from "../../providers";
import { getCheapestVariant } from "../../utils/vat";

const ProductsSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [featureProducts, setFeatureProducts] = useState([]);
  const { includeVAT, rate } = useVat();

  const fetchFeaturedProducts = async () => {
    try {
      const data = await getFeaturedProducts();
      const activeProducts = (data.products || []).filter(
        (product) => product.is_active_webshop !== false
      );
      setFeatureProducts(activeProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <>
      <section
        className="py-12 xl:py-20 xxl:py-28 max-w-[1268px] mx-auto px-4 flex flex-col items-center gap-10 lg:gap xl:gap-[80px]"
        id="products-section"
      >
        <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-center text-[#111727]">
          {t("p_products_heading")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featureProducts?.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              minimumPrice={getCheapestVariant(product.lengths, {
                includeVAT,
                rate,
              })}
              fetchProduct={fetchFeaturedProducts}
            />
          ))}
        </div>
        <Button
          btnText={t("p_viewShop")}
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
