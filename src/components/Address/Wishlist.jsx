import React, { useEffect, useState } from "react";
import crossImg from "../../assets/myAccount/Shape.svg";
import { addToCart, getWishList } from "../../redux/actions/orderActions";
import DeleteModal from "../Modals/DeleteModal";
import { deleteWishList } from "../../redux/actions/productActions";
import { getLoggedInUser } from "../../redux";
import { useSelector } from "react-redux";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";

const Wishlist = () => {
  const navigate = useNavigate();
  const userData = getLoggedInUser();
  const authState = useSelector((state) => state.auth);
  const isAuthenticated = authState.isLoggedIn;
  const [state, setState] = useState({
    wishlistData: null,
  });
  const [loadingStates, setLoadingStates] = useState({});

  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchWishlist = async () => {
    try {
      const res = await getWishList();
      setState((prev) => ({
        ...prev,
        wishlistData: res,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [isDeleted]);

  const handleDelete = async () => {
    try {
      if (selectedItem) {
        await deleteWishList({ id: selectedItem });
        setIsDeleted(!isDeleted);
        toast.success("Product removed from wishlist!");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAddToCart = async (product) => {
    setLoadingStates((prev) => ({ ...prev, [product.id]: true }));
    try {
      const payload = {
        product_length: product?.lengths[0]?.id,
        quantity: 1,
      };

      await axiosWithCredentials.post(`/add-to-cart/`, payload);
      toast.success("Product added to cart!");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        if (error.response.data.message === "No more product left in stock.") {
          toast.error("This product is out of stock.");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoadingStates((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  return (
    <>
      {isAuthenticated ? (
        <section className="px-8 xs:px-8 sm:px-10 md:px-10 lg:px-12 my-20 xs:my-8 sm:my-10 md:my-13 lg:my-14">
          <DeleteModal
            isOpen={showModal}
            closeModal={() => setShowModal(!showModal)}
            handleDelete={handleDelete}
            actionText="Remove"
            description="Are you sure you want to remove product from wishlist?"
          />

          <div className="flex xs:flex-col xs:items-center sm:flex-col sm:items-center mb-32 justify-center">
            <div className="w-[100%]">
              <h1 className="text-20 font-semibold mb-[18px] sm:mt-12 text-center xs:mt-10 xs:text-center">
                Your Wishlist
              </h1>
              <div className="xs:overflow-auto">
                <table className="w-[100%] xs:w-[574px]">
                  <thead>
                    <tr className=" border-solid border-b-[1px] border-[#E8ECEF] flex w-[100%] justify-between py-[22px]">
                      <th className="text-[14px] text-[#6C7275] w-[40%] text-left">
                        Product
                      </th>
                      <th className="text-[14px] text-[#6C7275] w-[30%] text-left">
                        Description
                      </th>
                      <th className="text-[14px] text-[#6C7275] w-[20%] text-left">
                        Price
                      </th>
                      <th className="text-[14px] text-[#6C7275] w-[30%] text-left flex justify-center items-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {state?.wishlistData?.[0]?.product?.length > 0 ? (
                      state.wishlistData?.[0]?.product?.map((item, index) => (
                        <tr
                          key={index}
                          className="border-solid border-b-[1px] border-[#E8ECEF] flex w-[100%] justify-between py-[22px] items-center"
                        >
                          <td className="text-[14px] text-[#141718] w-[40%] text-left">
                            <div className="flex items-center ">
                              <button
                                className="mr-[29px] md:mr-[15px] sm:mr-[10px]"
                                onClick={() => {
                                  setShowModal(true);
                                  setSelectedItem(item?.id);
                                }}
                              >
                                <span>
                                  <img src={crossImg} alt="Cross" />
                                </span>
                              </button>

                              <div className="flex items-center w-[60px] h-[72px] mr-[16px] md:w-[50px] md:h-[60px] md:mr-[12px] sm:w-[40px] sm:h-[50px] sm:mr-[10px]">
                                <img
                                  src={item.images[0]?.image}
                                  className="w-[100%] rounded-2xl szie-20"
                                  alt="Product"
                                />
                              </div>
                              <div className="flex flex-col  gap-[8px]">
                                <h1 className="text-[14px]">{item.name_en}</h1>
                              </div>
                            </div>
                          </td>
                          <td className="w-[30%] text-left truncate">
                            {item?.description_en}
                          </td>
                          <td className="w-[20%] text-left">
                            $ {item.lengths[0].discounted_price_ex_vat}
                          </td>
                          <td className="w-[30%] flex justify-center items-center">
                            <button
                              className="px-[24px] py-[6px] bg-[#FBC700] rounded-[8px]"
                              onClick={() => {
                                handleAddToCart(item);
                                disabled = { cartLoading };
                              }}
                            >
                              <span className="text-[#fff]">
                                {loadingStates[item.id]
                                  ? "Adding..."
                                  : "Add to cart"}
                              </span>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="3"
                          className="text-[14px] text-bold text-[#141718] text-center py-[22px]"
                        >
                          No products in wishlist
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex justify-center items-center h-60 w-full">
          <div className=" flex gap-1 items-center">
            <span> Please sign-in to view the Wishlist.</span>
            <button
              className="bg-[#FBC700] text-[#161922] p-2 rounded-md "
              onClick={() => {
                navigate("/sign-in");
              }}
            >
              Sign-in
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
