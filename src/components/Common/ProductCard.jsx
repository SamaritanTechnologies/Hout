import { useNavigate } from "react-router-dom";
import productHeart from "../../assets/LandingPageImages/products/productHeart.svg";
import productHeartFilled from "../../assets/LandingPageImages/products/productHeartFilled.svg";
import addToCartt from "../../assets/LandingPageImages/products/addToCart.svg";
import { useDispatch, useSelector } from "react-redux";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify";
import { deleteWishList } from "../../redux/actions/productActions";
import { useState } from "react";
import { setCartItems } from "../../redux/slices/cartSlice";
import { getCart } from "../../redux/actions/orderActions";
import { useTranslation } from "react-i18next";
import { formatPrice } from "../../utils/helper";

const ProductCard = ({ product, minimumPrice, fetchProduct, includeVAT }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState.isLoggedIn;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState("");
  const dispatch = useDispatch();

  const addWishlist = async (id) => {
    if (loading) return;
    setLoading(true);
    try {
      await axiosWithCredentials.post("/wishlist/", {
        product_id: id,
      });
      fetchProduct();

      setTimeout(() => {
        toast.success(t("pc_wishlist_add_success"));
      }, 1000);
    } catch (error) {
      toast.error(t("pc_wishlist_add_fail"));
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
        toast.success(t("pc_wishlist_remove_success"));
      }, 1000);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (cartLoading) return;
    setCartLoading(product?.id);

    try {
      const payload = {
        product_length: product?.lengths[0]?.id,
        quantity: 1,
      };
      await axiosWithCredentials.post(`/add-to-cart/`, payload);
      toast.success(t("pc_cart_add_success"));

      const res = await getCart();
      dispatch(setCartItems(res.cart_items));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message === "No more product left in stock.") {
          toast.error(t("pc_cart_out_of_stock"));
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error(t("pc_cart_error"));
      }
    } finally {
      setCartLoading("");
    }
  };

  const handleAddToLocal = async (product) => {
    console.log("Product", product);
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const productIndex = existingCart.findIndex(
      (item) => item.id === product.id
    );

    if (productIndex !== -1) {
      existingCart[productIndex].quantity =
        (existingCart[productIndex].quantity || 1) + 1;
    } else {
      product.quantity = 1;
      existingCart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    // Dispatch custom event
    window.dispatchEvent(new Event("localCartUpdated"));

    toast.success("Product added to cart!");
    toast.success(t("pc_cart_add_success"));
  };

  const handleViewProduct = () => {
    navigate(`/product-detail/${product.id}`);
    window.scrollTo(0, 0); // Scrolls to the top of the window
  };
  return (
    <div className="relative bg-[#F4F5F7] h-auto">
      {minimumPrice?.discount > 0 && (
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E97171] text-white absolute top-6 right-6 text-xs">
          {minimumPrice.discount}%
        </div>
      )}
      <div
        className="cursor-pointer h-[250px] xl:h-[310px]"
        // onClick={() => navigate(`/product-detail/${product.id}`)}
        onClick={handleViewProduct}
      >
        {product.images?.length ? (
          <img
            src={product.images[0].url || product.images[0].image}
            className="w-full h-full object-cover"
          />
        ) : (
          <div />
        )}
      </div>
      <div className="flex flex-col gap-4 px-4 py-5">
        <h3
          // onClick={() => navigate(`/product-detail/${product.id}`)}
          onClick={handleViewProduct}
          className="hover:underline cursor-pointer font-semibold text-[#111727] text-2xl overflow-hidden whitespace-nowrap text-ellipsis"
        >
          {currentLang === "en" ? product.name_en : product.name_nl}
        </h3>
        <p className="font-medium text-[#898989] overflow-hidden whitespace-nowrap text-ellipsis">
          {currentLang === "en"
            ? product.description_en
            : product.description_nl}
        </p>
        <div className="flex gap-4">
          <span className="text-xl font-semibold text-[#111727]">
            €
            {includeVAT
              ? formatPrice(product?.lengths[0]?.discounted_price_in_vat)
              : formatPrice(minimumPrice?.discounted_price_ex_vat)}
          </span>

          <span className="text-[#B0B0B0] line-through self-center">
            €
            {includeVAT
              ? formatPrice(product?.lengths[0]?.full_price_in_vat)
              : formatPrice(product?.lengths[0]?.full_price_ex_vat)}
            {/* {minimumPrice.full_price_ex_vat} */}
          </span>
        </div>
        <div className="flex gap-x-4 items-center justify-between">
          <div
            onClick={handleViewProduct}
            className="border-2 cursor-pointer border-[#898989] px-2 flex items-center justify-center py-3  gap-x-3  add-cart-btn md:text-[12px] lg:text-[12px]"
          >
            {t("pc_view_product")}
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
