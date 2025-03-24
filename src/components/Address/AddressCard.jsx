// import React, { useEffect, useState } from "react";
// import profileImg from "../../assets/myAccount/profile.png";
// import editImg from "../../assets/myAccount/edit-icon.svg";
// import profilebtn from "../../assets/myAccount/profileBtn.svg";
// import {
//   getDeliveryAddress,
//   getInvoiceAddress,
//   getProfile,
// } from "../../redux/actions/profileActions";
// import { useNavigate } from "react-router-dom";
// import Account from "./Account";

// const AddressCard = ({ setSelectedComponent }) => {
//   const navigate = useNavigate();
//   const [state, setState] = useState({
//     deliveryAddress: null,
//     invoiceAddress: null,
//     userData: null,
//   });
//   const fetchDeliveryAddress = async () => {
//     try {
//       const res = await getDeliveryAddress();
//       console.log("deliveryAddress:", res);
//       setState((prev) => ({
//         ...prev,
//         deliveryAddress: res?.data,
//       }));
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };
//   const fetchInvoiceAddress = async () => {
//     try {
//       const res = await getInvoiceAddress();
//       console.log("InvoiceAddress:", res);

//       setState((prev) => ({
//         ...prev,
//         invoiceAddress: res?.data,
//       }));
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };

//   const fetchUser = async () => {
//     try {
//       const res = await getProfile();
//       setState((prev) => ({
//         ...prev,
//         userData: res?.data,
//       }));

//       console.log(res, "fetchUser");
//     } catch (error) {
//       console.error("Error fetching user data:", error);
//     }
//   };
//   useEffect(() => {
//     fetchDeliveryAddress();
//     fetchInvoiceAddress();
//     fetchUser();
//   }, []);

//   return (
//     <section className="">
//       {/* <h1 className="text-[48px] xs:text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] text-center text-[#000000] mb-[80px] xs:mb-[25px] sm:mb-[30px] md:mb-[50px] lg:mb-[70px]">
//         My Account
//       </h1> */}
//       <div className="flex xs:flex-col xs:items-center sm:flex-col sm:items-center lg:mb-32 justify-center">
//         <div className="w-full max-w-[707px]">
//           <h1 className="text-[16px] font-semibold text-[#111727] mb-[19px] xs:text-center xs:mt-5 sm:mt-8 sm:text-center">
//             Address
//           </h1>
//           <div className="grid grid-cols-2 gap-[23px] xs:grid-cols-1 ">
//             <div className=" px-[24px] py-[16px] border-solid border-[1px] border-[#6C7275] rounded-[8px] xs:w-[100%]">
//               <div className="mb-[8px] flex justify-between">
//                 <h1 className="text-[16px] font-semibold text-[#111727]">
//                   Billing Address
//                 </h1>
//                 <button onClick={() => setSelectedComponent(<Account />)}>
//                   <span className="text-[16px] font-semibold text-[#6C7275] flex gap-[6px]">
//                     <img src={editImg} />
//                     Edit
//                   </span>
//                 </button>
//               </div>
//               <p className="text-[16px] text-[#535353] mt-[4px]">
//                 {state?.userData?.first_name} {state?.userData?.last_name}
//               </p>
//               <p className="text-[16px] text-[#535353] mt-[4px]">
//                 {state?.userData?.phone}
//               </p>
//               <p className="text-[16px] text-[#535353] mt-[4px]">
//                 {state?.invoiceAddress?.street_and_number},{" "}
//                 {state?.invoiceAddress?.city}, {state?.invoiceAddress?.country}
//               </p>
//             </div>
//             <div className="  px-[24px] py-[16px] border-solid border-[1px] border-[#6C7275] rounded-[8px] xs:w-[100%] ">
//               <div className="mb-[8px] flex justify-between">
//                 <h1 className="text-[16px] font-semibold text-[#111727]">
//                   Shipping Address
//                 </h1>
//                 <button>
//                   <span className="text-[16px] font-semibold text-[#6C7275] flex gap-[6px]">
//                     <img src={editImg} />
//                     Edit
//                   </span>
//                 </button>
//               </div>
//               <p className="text-[16px] text-[#535353] mt-[4px]">
//                 {state?.userData?.first_name} {state?.userData?.last_name}
//               </p>
//               <p className="text-[16px] text-[#535353] mt-[4px]">
//                 {state?.userData?.phone}
//               </p>
//               <p className="text-[16px] text-[#535353] mt-[4px]">
//                 {state?.deliveryAddress?.street_and_number},{" "}
//                 {state?.deliveryAddress?.city},{" "}
//                 {state?.deliveryAddress?.country}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AddressCard;
import React, { useEffect, useState } from "react";
import profileImg from "../../assets/myAccount/profile.png";
import editImg from "../../assets/myAccount/edit-icon.svg";
import profilebtn from "../../assets/myAccount/profileBtn.svg";
import {
  getDeliveryAddress,
  getInvoiceAddress,
  updateDeliverAddress,
  updateDeliveryAddress,
  updateInvoiceAddress,
} from "../../redux/actions/profileActions";
import InputField from "../Common/InputField";
import { useSelector } from "react-redux";

const AddressCard = () => {
  const [state, setState] = useState({
    deliveryAddress: null,
    invoiceAddress: null,
    userData: null,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [addressType, setAddressType] = useState(null);
  const [currentAddressData, setCurrentAddressData] = useState(null);
  const userDetail = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    user: "",
    street_and_number: "",
    zip_code: "",
    city: "",
    country: "Netherland",
  });

  useEffect(() => {
    if (currentAddressData) {
      setFormData({
        user: state.userData?.id,
        street_and_number: currentAddressData.street_and_number || "",
        zip_code: currentAddressData.zip_code || "",
        city: currentAddressData.city || "",
        country: currentAddressData.country || "Netherland",
      });
    }
  }, [currentAddressData, state.userData]);

  const fetchDeliveryAddress = async () => {
    try {
      const res = await getDeliveryAddress();
      setState((prev) => ({ ...prev, deliveryAddress: res?.data }));
    } catch (error) {
      console.error("Error fetching delivery address:", error);
    }
  };

  const fetchInvoiceAddress = async () => {
    try {
      const res = await getInvoiceAddress();
      setState((prev) => ({ ...prev, invoiceAddress: res?.data }));
    } catch (error) {
      console.error("Error fetching invoice address:", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getProfile();
      setState((prev) => ({ ...prev, userData: res?.data }));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchDeliveryAddress();
    fetchInvoiceAddress();
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        user: state.userData?.id,
      };

      if (addressType === "billing") {
        await updateInvoiceAddress(payload);
      } else {
        await updateDeliverAddress(payload);
      }

      await fetchDeliveryAddress();
      await fetchInvoiceAddress();
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  return (
    <section className="">
      <div className="flex xs:flex-col xs:items-center sm:flex-col sm:items-center lg:mb-32 justify-center">
        <div className="w-full max-w-[707px]">
          <h1 className="text-[16px] font-semibold text-[#111727] mb-[19px] xs:text-center xs:mt-5 sm:mt-8 sm:text-center">
            Address
          </h1>
          <div className="grid grid-cols-2 gap-[23px] xs:grid-cols-1 ">
            {/* / Billing Address Card  */}
            <div className="px-[24px] py-[16px] border-solid border-[1px] border-[#6C7275] rounded-[8px] xs:w-[100%]">
              <div className="mb-[8px] flex justify-between">
                <h1 className="text-[16px] font-semibold text-[#111727]">
                  Billing Address
                </h1>
                <button
                  onClick={() => {
                    setAddressType("billing");
                    setCurrentAddressData(state.invoiceAddress);
                    setShowEditModal(true);
                  }}
                >
                  <span className="text-[16px] font-semibold text-[#6C7275] flex gap-[6px]">
                    <img src={editImg} alt="Edit" />
                    Edit
                  </span>
                </button>
              </div>
              {/* <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.userData?.first_name} {state?.userData?.last_name}
              </p>

              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.userData?.phone}{" "}
              </p> */}

              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.invoiceAddress
                  ? `${state.invoiceAddress.street_and_number}, ${state.invoiceAddress.city}, ${state.invoiceAddress.country}`
                  : "Loading..."}
              </p>
            </div>

            {/* Shipping Address Card */}
            <div className="px-[24px] py-[16px] border-solid border-[1px] border-[#6C7275] rounded-[8px] xs:w-[100%]">
              <div className="mb-[8px] flex justify-between">
                <h1 className="text-[16px] font-semibold text-[#111727]">
                  Shipping Address
                </h1>
                <button
                  onClick={() => {
                    setAddressType("shipping");
                    setCurrentAddressData(state.deliveryAddress);
                    setShowEditModal(true);
                  }}
                >
                  <span className="text-[16px] font-semibold text-[#6C7275] flex gap-[6px]">
                    <img src={editImg} alt="Edit" />
                    Edit
                  </span>
                </button>
              </div>
              {/* <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.userData?.first_name} {state?.userData?.last_name}
              </p>

              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.userData?.phone}
              </p> */}

              <p className="text-[16px] text-[#535353] mt-[4px]">
                {state?.deliveryAddress
                  ? `${state.deliveryAddress.street_and_number}, ${state.deliveryAddress.city}, ${state.deliveryAddress.country}`
                  : "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">
              Edit {addressType} Address
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street and Number
                </label>

                <InputField
                  required
                  placeholder="Enter street And Number"
                  type="text"
                  name="streetAndNumber"
                  value={formData.street_and_number}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      street_and_number: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>

                <InputField
                  required
                  placeholder="Enter zip code"
                  name="zipCode"
                  type="text"
                  value={formData.zip_code}
                  onChange={(e) =>
                    setFormData({ ...formData, zip_code: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>

                <InputField
                  required
                  placeholder="Enter city"
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Country
                </label>

                <InputField
                  required
                  placeholder="text"
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Update Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddressCard;
