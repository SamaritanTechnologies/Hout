import React, { useEffect, useState } from "react";
import productHeart from "../../assets/LandingPageImages/products/productHeart.svg";
import addToCartt from "../../assets/LandingPageImages/products/addToCart.svg";
import { getProducts } from "../../redux/actions/userActions";

const ProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProducts();
        setProducts(data.results); // Assuming the API response has a 'results' field
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProduct();
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-7 w-full pt-24 max-w-[915px] mx-auto">
        {products.map((product) => {
          const minimumPrice = getMinimumPriceObject(product.lengths);
          return (
            <div className="relative" key={product.id}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E97171] text-white absolute top-6 right-6 text-xs">
                -{minimumPrice.discount}%
              </div>
              <div className="cursor-pointer">
                <img
                  src={product.images[0]?.image || ""}
                  alt={product.name_en}
                  className="w-full object-cover h-full sm:h-[310px] lg:h-[310px] xl:h-[310px]"
                />
              </div>
              <section className="bg-[#F4F5F7] pb-4 px-4">
                <div className="font-semibold text-24 pt-[15px]">
                  {product.name_en}
                </div>
                <div className="font-medium text-16 text-gray2 pt-[15px]">
                  {product.description_en}
                </div>

                <section className="flex gap-x-3 pt-[15px] pb-[20px] md:gap-x-2">
                  <div>$ {minimumPrice.discounted_price}</div>
                  <div className="text-gray2 line-through">
                    $ {minimumPrice.full_price_ex_vat}
                  </div>
                </section>
                <section className="flex gap-x-4 items-center justify-between">
                  <div className="border-2 cursor-pointer border-[#898989] px-2 flex items-center justify-center py-3 gap-x-3 add-cart-btn md:text-[12px] lg:text-[12px]">
                    <img src={addToCartt} alt="Add to Cart" />
                    Add to Cart
                  </div>
                  <div className="cursor-pointer">
                    <img src={productHeart} alt="Add to Wishlist" />
                  </div>
                </section>
              </section>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ProductsSection;
