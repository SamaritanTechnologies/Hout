import React, { useEffect, useState } from "react";
// import crossImg from "../../assets/myAccount/Shape.svg";
import crossImg from "../../assets/addToCart/cross.svg";

import { addToCart, getWishList } from "../../redux/actions/orderActions";
import DeleteModal from "../Modals/DeleteModal";
import { deleteWishList } from "../../redux/actions/productActions";
import { getLoggedInUser } from "../../redux";
import { useSelector } from "react-redux";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosWithCredentials } from "../../providers";
import { useTranslation } from "react-i18next";

const Wishlist = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
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
        toast.success(t("w_wishlist_toast_removed"));
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
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
            actionText={t("d_action_text")}
            description={t("d_description_text")}
          />

          <div className="flex xs:flex-col xs:items-center sm:flex-col sm:items-center mb-32 justify-center">
            <div className="w-[100%]">
              <h1 className="text-20 font-semibold mb-[18px] sm:mt-12 text-center xs:mt-10 xs:text-center">
                {t("w_wishlist_heading")}
              </h1>
              <div className="xs:overflow-auto">
                <table className="w-[100%] xs:w-[574px]">
                  <thead>
                    <tr className=" border-solid border-b-[1px] border-[#E8ECEF] flex w-[100%] justify-between py-[22px]">
                      <th className="text-[14px] text-[#6C7275] w-[40%] text-left">
                        {t("w_wishlist_table_product")}
                      </th>
                      <th className="text-[14px] text-[#6C7275] w-[30%] text-left">
                        {t("w_wishlist_table_description")}
                      </th>
                      <th className="text-[14px] text-[#6C7275] w-[20%] text-left">
                        {t("w_wishlist_table_price")}
                      </th>
                      <th className="text-[14px] text-[#6C7275] w-[30%] text-left flex justify-center items-center">
                        {t("w_wishlist_table_action")}
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
                                <h1
                                  onClick={() =>
                                    navigate(`/product-detail/${item.id}`)
                                  }
                                  className="text-[14px] cursor-pointer"
                                >
                                  {currentLang === "en"
                                    ? item.name_en
                                    : item.name_nl}
                                </h1>
                              </div>
                            </div>
                          </td>
                          <td className="w-[30%] text-left truncate">
                            {currentLang === "en"
                              ? item?.description_en
                              : item?.description_nl}
                          </td>
                          <td className="w-[20%] text-left">
                            €{item.lengths[0].discounted_price_ex_vat}
                          </td>
                          <td className="w-[30%] flex justify-center items-center">
                            <button
                              className="px-[24px] py-[6px] bg-[#FBC700] rounded-[8px]"
                              onClick={() =>
                                navigate(`/product-detail/${item?.id}`)
                              }
                            >
                              <span className="text-[#fff]">View Product</span>
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
