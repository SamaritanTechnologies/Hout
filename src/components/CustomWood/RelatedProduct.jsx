import React from "react";
import productHeartFilled from "../../assets/LandingPageImages/products/productHeartFilled.svg";
import productHeart from "../../assets/LandingPageImages/products/productHeart.svg";
import addToCart from "../../assets/LandingPageImages/products/addToCart.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import { deleteWishList } from "../../redux/actions/productActions";

const RelatedProduct = ({ relatedProducts }) => {
  const navigate = useNavigate();
  const getMinimumPriceObject = (lengths) => {
    if (!lengths || lengths.length === 0) return "N/A";

    return lengths.reduce((minObj, currentObj) => {
      const currentPrice = parseFloat(currentObj.full_price_ex_vat);
      const minPrice = parseFloat(minObj.full_price_ex_vat);
      return currentPrice < minPrice ? currentObj : minObj;
    });
  };
  const handleAddToCart = async (product) => {
    try {
      const payload = {
        product_length: product?.lengths[0]?.id,
        quantity: 1,
      };
      const res = await axiosWithCredentials.post(`/add-to-cart/`, payload);
      console.log("add product:", res.data);
      toast.success("Successfully Product add to cart");
    } catch (error) {
      toast.error("Something went wrong!");
    }
    // console.log("product:", product);
    // console.log("id:", product?.lengths[0]?.id);
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
      <section className="px-[30px] md:px-[80px] lg:px-[100px] xl:px-[100px] pt-[55px]">
        <h1 className="text-36 font-medium text-center ">Related Products </h1>
        <section className="pt-[50px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-[1240px] mx-auto">
          {relatedProducts?.map((product) => {
            const minimumPrice = getMinimumPriceObject(product.lengths);
            return (
              // JSX code here
              <div className="relative" key={product.id}>
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
                  <div className="font-semibold  text-24 pt-[15px]">
                    {product.name_en}
                  </div>
                  <div className=" font-medium  text-16  text-gray2 pt-[15px]">
                    {product.description_en}
                  </div>

                  <section className="flex gap-x-3 pt-[15px] pb-[20px] md:gap-x-2">
                    <div>$ {minimumPrice.discounted_price}</div>
                    <div className="text-gray2 line-through">
                      $ {minimumPrice.full_price_ex_vat}
                    </div>
                  </section>
                  <section className="flex gap-x-4 items-center justify-between">
                    <div
                      className="border-2 cursor-pointer border-[#898989] px-2 flex items-center justify-center py-3  gap-x-3  add-cart-btn md:text-[12px] lg:text-[12px]"
                      onClick={() => handleAddToCart(product)}
                    >
                      {/* <img src={item.addToCart} className="bg-red" /> */}
                      <img src={addToCart} />
                      Add to Cart
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        handleAddToWishlist(item.product_id);
                      }}
                    >
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

                      {/* <img src={productHeart} /> */}
                    </div>
                  </section>
                </section>
              </div>
            );
          })}
        </section>
        <div className="pt-[50px] flex justify-center mb-24">
          {/* <Button btnText="Show More" px="100px" py="16px" textColor border /> */}
          <div className="  border-2 border-customYellow">
            <button className="text-customYellow px-10 py-3 font-semibold text-18">
              Show more
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default RelatedProduct;
