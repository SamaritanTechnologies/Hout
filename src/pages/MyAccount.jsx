import React, { useEffect, useState } from "react";
import dummyPic from "../assets/no-user.webp";
import Account from "../components/Address/Account";
import AddressCard from "../components/Address/AddressCard";
import OrderHistory from "../components/Address/OrderHistory";
import Wishlist from "../components/Address/Wishlist";
import { useLocation, useNavigate } from "react-router-dom";
import { setAccessToken, setRefreshToken } from "../providers";
import { uploadProfilePic } from "../redux/actions/profileActions";
import { toast } from "react-toastify";
import { CameraIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedInUser, logoutUser } from "../redux";
import { BASE_URL } from "../providers/AxiosInstance";
import { setCartItems } from "../redux/slices/cartSlice";

export const MyAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;
  const dispatch = useDispatch();
  const userData = getLoggedInUser();

  const [selectedPic, setSelectedPic] = useState(null);
  const [userrName, setUserName] = useState("");
  const userDetail = useSelector((state) => state.auth.user);

  const [selectedComponent, setSelectedComponent] = useState(
    state?.key === "wish" ? (
      <Wishlist />
    ) : (
      <Account
        userData={userData}
        setSelectedPic={setSelectedPic}
        setUserName={setUserName}
      />
    )
  );

  const data = [
    { id: 1, name: "Account", component: <Account userData={userData} /> },
    {
      id: 2,
      name: "Address",
      component: <AddressCard setSelectedComponent={setSelectedComponent} />,
    },
    { id: 3, name: "Orders", component: <OrderHistory /> },
    { id: 4, name: "Wishlist", component: <Wishlist /> },
    { id: 5, name: "LogOut", component: null },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    setAccessToken("");
    setRefreshToken("");
    dispatch(setCartItems(null));

    toast.success("Logged Out!");

    setTimeout(() => {
      navigate("/");
    }, 700);
  };

  const getImageSrc = () => {
    if (selectedPic instanceof File) {
      return URL.createObjectURL(selectedPic);
    } else if (typeof selectedPic === "string") {
      return selectedPic;
    } else {
      return dummyPic;
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedPic(file);
      const formData = new FormData();
      formData.append("profile_pic", file);
      await uploadProfilePic(formData);
    } else {
      toast.error("No file selected");
    }
  };

  useEffect(() => {
    if (userData) {
      setSelectedPic(userData?.profile_pic);
    }
  }, [userData]);
  return (
    <>
      <section className="max-w-[1120px] mx-auto my-8 lg:my-16 xl:my-20 px-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-center text-[#000000] font-semibold mb-8 md:mb-12 lg:mb-16 xl:mb-20">
          My Account
        </h1>
        <div className="flex flex-col lg:flex-row xl:flex-row items-start mb-32 justify-center">
          <div className="px-4 py-10 bg-[#F3F5F7] w-full max-w-[500px] lg:max-w-[262px] xl:max-w-[262px] flex flex-col gap-10 items-center rounded-lg">
            <div className="flex flex-col gap-2">
              <div className="relative">
                <img
                  src={
                    userData?.profile_pic
                      ? `${BASE_URL}${userData.profile_pic}`
                      : getImageSrc()
                  }
                  className="w-20 h-20 rounded-full border border-[#F3F5F7]"
                  alt="Profile"
                />

                <input
                  type="file"
                  id="profileImageInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label
                  htmlFor="profileImageInput"
                  className="flex items-center justify-center w-[30px] h-[30px] bg-[#111727] border border-white rounded-full absolute bottom-0  left-16 cursor-pointer"
                >
                  <CameraIcon class="h-4 w-4 text-white" />
                </label>
              </div>
              <h1 className="text-[#111727] font-semibold">
                {userDetail?.firstName} {userDetail?.lastName}
              </h1>
            </div>
            <div className="flex flex-col gap-3 w-full">
              {data.map((item) => {
                const isSelected =
                  selectedComponent?.type?.name === item.component?.type?.name;
                return (
                  <div
                    key={item.id}
                    className={`py-2 cursor-pointer ${
                      isSelected ? "border-b border-[#111727]" : ""
                    }`}
                    onClick={() => {
                      if (item.name === "LogOut") {
                        handleLogout();
                      } else {
                        setSelectedComponent(item.component);
                      }
                    }}
                  >
                    <h1
                      className={`font-semibold  ${
                        isSelected ? "text-[#111727]" : "text-[#7b7b7b]"
                      }`}
                    >
                      {item.name}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex-grow w-full lg:max-w-[740px] xl:max-w-[740px] px-4 mx-auto">
            {selectedComponent}
          </div>
        </div>
      </section>
    </>
  );
};

export default MyAccount;
