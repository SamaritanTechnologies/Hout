import { useNavigate } from "react-router-dom";
import productHeart from "../../assets/LandingPageImages/products/productHeart.svg";
import productHeartFilled from "../../assets/LandingPageImages/products/productHeartFilled.svg";
import addToCartt from "../../assets/LandingPageImages/products/addToCart.svg";
import { useSelector } from "react-redux";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify";
import { deleteWishList } from "../../redux/actions/productActions";
import { useState } from "react";

const ProductCard = ({ product, minimumPrice, fetchProduct }) => {
  const authState = useSelector((state) => state.auth);

  const isAuthenticated = authState.isLoggedIn;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const addWishlist = async (id) => {
    if (loading) return;
    setLoading(true);

    try {
      await axiosWithCredentials.post("/wishlist/", {
        product_id: id,
      });
      fetchProduct();

      setTimeout(() => {
        toast.success("Product added to wishlist!");
      }, 1000);
    } catch (error) {
      toast.error("Failed to add product to wishlist!");
    } finally {
      setLoading(false);
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
    <div className="relative bg-[#F4F5F7] h-auto">
      {minimumPrice.discount > 0 && (
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E97171] text-white absolute top-6 right-6 text-xs">
          -{minimumPrice.discount}%
        </div>
      )}
      <div
        className="cursor-pointer h-[250px] xl:h-[310px]"
        onClick={() => navigate(`/product-detail/${product.id}`)}
      >
        <img
          src={product.images[0].image}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-4 px-4 py-5">
        <h3 className="font-semibold text-[#111727] text-2xl overflow-hidden whitespace-nowrap text-ellipsis">
          {product.name_en}
        </h3>
        <p className="font-medium text-[#898989] overflow-hidden whitespace-nowrap text-ellipsis">
          {product.description_en}
        </p>
        <div className="flex gap-4">
          <span className="text-xl font-semibold text-[#111727]">
            $ {minimumPrice.discounted_price_ex_vat}
          </span>
          {minimumPrice.discount > 0 && (
            <span className="text-[#B0B0B0] line-through self-center">
              $ {minimumPrice.full_price_ex_vat}
            </span>
          )}
        </div>
        <div className="flex gap-x-4 items-center justify-between">
          <div
            onClick={() => {
              !isAuthenticated && navigate("/cart");
            }}
            className="border-2 cursor-pointer border-[#898989] px-2 flex items-center justify-center py-3  gap-x-3  add-cart-btn md:text-[12px] lg:text-[12px]"
          >
            {/* <img src={item.addToCart} className="bg-red" /> */}
            <img src={addToCartt} />
            Add to Cart
          </div>
          <div className="cursor-pointer">
            {!isAuthenticated ? (
              <img
                src={productHeart}
                onClick={() => {
                  navigate("/wishlist");
                }}
              />
            ) : product.is_wishlist ? (
              <img
                src={productHeartFilled}
                onClick={() => {
                  handleDeleteWishlist(product.id);
                }}
              />
            ) : (
              <img
                src={productHeart}
                onClick={() => {
                  addWishlist(product.id);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
