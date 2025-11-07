import React from "react";
import productHeartFilled from "../../assets/LandingPageImages/products/productHeartFilled.svg";
import productHeart from "../../assets/LandingPageImages/products/productHeart.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import { deleteWishList } from "../../redux/actions/productActions";
import { useTranslation } from "react-i18next";
import { formatPrice, parsePrice } from "../../utils/helper";

const RelatedProduct = ({ relatedProducts, vat = false }) => {
  console.log("relatedProducts", relatedProducts);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const getMinimumPriceObject = (lengths) => {
    if (!lengths || lengths.length === 0) return "N/A";

    return lengths.reduce((minObj, currentObj) => {
      const currentPrice = parsePrice(currentObj.full_price_ex_vat);
      const minPrice = parsePrice(minObj.full_price_ex_vat);
      return currentPrice < minPrice ? currentObj : minObj;
    });
  };

  const handleViewProduct = (product) => {
    navigate(`/product-detail/${product.id}`);
  };

  const addWishlist = async (id) => {
    try {
      await axiosWithCredentials.post("/wishlist/", {
        product_id: id,
      });

      toast.success("Product added to wishlist!");
    } catch (error) {
      toast.error("Failed to add product to wishlist!");
    } finally {
    }
  };

  const handleDeleteWishlist = async (id) => {
    if (loading) return;
    setLoading(true);

    try {
      await deleteWishList({ id });
      fetchProduct();

      setTimeout(() => {
        toast.success("Product removed from wishlist!");
      }, 1000);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="px-[30px] md:px-[80px] lg:px-[100px] xl:px-[100px] pt-[55px] pb-[50px]">
        <h1 className="text-36 font-medium text-center mb-[50px]">{t("p_relatedProducts")}</h1>
        
        {!relatedProducts?.length ? (
          <div className="text-center">
            <p className="text-lg text-gray-600">{t("p_noRelatedProducts")}</p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1240px] mx-auto">
          {relatedProducts?.map((product) => {
            const minimumPrice = getMinimumPriceObject(product.lengths);
            return (
              // JSX code here
              <div className="relative mb-6" key={product.id}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E97171] text-white absolute top-6 right-6 text-xs">
                  -{minimumPrice.discount}%
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(`/product-detail/${product.id}`)}
                >
                  <img
                    src={product.images[0].image}
                    className="w-full object-cover h-full sm:h-[310px] lg:h-[310px] xl:h-[310px]"
                  />
                </div>
                <section className="bg-[#F4F5F7] pb-4 px-4">
                  <div className="font-semibold text-24 pt-[15px] mb-[15px]">
                    {(() => {
                      const productName = currentLang === "en" ? product.name_en : product.name_nl;
                      return productName && productName.length > 18 
                        ? productName.substring(0, 18) + "..."
                        : productName;
                    })()}
                  </div>
                  <div className="font-medium text-16 text-gray2 mb-[15px] overflow-hidden" style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    lineHeight: '1.4',
                    maxHeight: '1.4em'
                  }}>
                    {currentLang === "en" ? product.description_en : product.description_nl}
                  </div>

                  <section className="flex gap-x-3 mb-[20px] md:gap-x-2">
                    <div>
                      € {formatPrice(
                        vat 
                          ? minimumPrice.discounted_price_in_vat 
                          : minimumPrice.discounted_price_ex_vat
                      )}
                    </div>
                    <div className="text-gray2 line-through">
                      € {formatPrice(
                        vat 
                          ? minimumPrice.full_price_in_vat 
                          : minimumPrice.full_price_ex_vat
                      )}
                    </div>
                  </section>
                  <section className="flex gap-x-4 items-center justify-between mt-4">
                    <div
                      className="border-2 cursor-pointer border-[#898989] px-2 flex items-center justify-center py-3  gap-x-3  add-cart-btn md:text-[12px] lg:text-[12px]"
                      onClick={() => handleViewProduct(product)}
                    >
{t("p_viewProduct")}
                    </div>
                    <div className="cursor-pointer">
                      <div
                        className="cursor-pointer"
                        onClick={() => {
                          product.is_wishlist
                            ? handleDeleteWishlist(product.id)
                            : addWishlist(product.id);
                        }}
                      >
                        <img
                          src={
                            product.is_wishlist
                              ? productHeartFilled
                              : productHeart
                          }
                          alt="Wishlist Icon"
                        />
                      </div>
                    </div>
                  </section>
                </section>
              </div>
            );
          })}
          </section>
        )}
      </section>
    </>
  );
};

export default RelatedProduct;
