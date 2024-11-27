import React, { useEffect, useState } from "react";
import profileImg from "../../assets/myAccount/profile.png";
import editImg from "../../assets/myAccount/edit-icon.svg";
import profilebtn from "../../assets/myAccount/profileBtn.svg";
import {
  getDeliveryAddress,
  getInvoiceAddress,
  getProfile,
} from "../../redux/actions/profileActions";
import { useNavigate } from "react-router-dom";
import Account from "./Account";

const AddressCard = ({ setSelectedComponent }) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    deliveryAddress: null,
    invoiceAddress: null,
    userData: null,
  });
  const fetchDeliveryAddress = async () => {
    try {
      const res = await getDeliveryAddress();
      setState((prev) => ({
        ...prev,
        deliveryAddress: res?.data,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const fetchInvoiceAddress = async () => {
    try {
      const res = await getInvoiceAddress();
      setState((prev) => ({
        ...prev,
        invoiceAddress: res?.data,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getProfile();
      setState((prev) => ({
        ...prev,
        userData: res?.data,
      }));

      console.log(res, "fetchUser");
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    fetchDeliveryAddress();
    fetchInvoiceAddress();
    fetchUser();
  }, []);

  return (
    <section className="">
      {/* <h1 className="text-[48px] xs:text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] text-center text-[#000000] mb-[80px] xs:mb-[25px] sm:mb-[30px] md:mb-[50px] lg:mb-[70px]">
        My Account
      </h1> */}
      <div className="flex xs:flex-col xs:items-center sm:flex-col sm:items-center lg:mb-32 justify-center">
        <div className="w-full max-w-[707px]">
          <h1 className="text-[16px] font-semibold text-[#111727] mb-[19px] xs:text-center xs:mt-5 sm:mt-8 sm:text-center">
            Address
          </h1>
          <div className="grid grid-cols-2 gap-[23px] xs:grid-cols-1 ">
            <div className=" px-[24px] py-[16px] border-solid border-[1px] border-[#6C7275] rounded-[8px] xs:w-[100%]">
              <div className="mb-[8px] flex justify-between">
                <h1 className="text-[16px] font-semibold text-[#111727]">
                  Billing Address
                </h1>
                <button onClick={() => setSelectedComponent(<Account />)}>
                  <span className="text-[16px] font-semibold text-[#6C7275] flex gap-[6px]">
                    <img src={editImg} />
                    Edit
                  </span>
                </button>
              </div>
              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.userData?.first_name} {state?.userData?.last_name}
              </p>
              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.userData?.phone}
              </p>
              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.invoiceAddress?.street_and_number},{" "}
                {state?.invoiceAddress?.city}, {state?.invoiceAddress?.country}
              </p>
            </div>
            <div className="  px-[24px] py-[16px] border-solid border-[1px] border-[#6C7275] rounded-[8px] xs:w-[100%] ">
              <div className="mb-[8px] flex justify-between">
                <h1 className="text-[16px] font-semibold text-[#111727]">
                  Shipping Address
                </h1>
                <button>
                  <span className="text-[16px] font-semibold text-[#6C7275] flex gap-[6px]">
                    <img src={editImg} />
                    Edit
                  </span>
                </button>
              </div>
              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.userData?.first_name} {state?.userData?.last_name}
              </p>
              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.userData?.phone}
              </p>
              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.deliveryAddress?.street_and_number},{" "}
                {state?.deliveryAddress?.city},{" "}
                {state?.deliveryAddress?.country}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddressCard;
