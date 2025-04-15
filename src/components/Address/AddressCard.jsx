import React, { useEffect, useState } from "react";
import editImg from "../../assets/myAccount/edit-icon.svg";
import InputField from "../Common/InputField";
import { useDispatch, useSelector } from "react-redux";
import { axiosWithCredentials } from "../../providers";
import { toast } from "react-toastify";
import { getUserId, loginUser } from "../../redux";
import { getProfileInfo } from "../../redux/actions/profileActions";

const AddressCard = () => {
  const [state, setState] = useState({
    deliveryAddress: null,
    invoiceAddress: null,
    userData: null,
  });
  const userDetail = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [addressType, setAddressType] = useState(null);
  const [currentAddressData, setCurrentAddressData] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        user: state.userData?.id,
      };

      const userId = userDetail?.id || state.userData?.id;

      if (addressType === "billing") {
        try {
          const response = await axiosWithCredentials.put(
            `/accounts/update-invoice-address/${userId}/`,
            payload
          );
          setShowEditModal(false);
          const userDetail = await getProfileInfo();
          // const  = await fetchUser();

          dispatch(loginUser(userDetail));
          toast.success("Successfully Updated");

          return response.data;
        } catch (error) {
          console.error("Error:", error);
          toast.error("Something went wrong!");
          throw error;
        }
      } else {
        try {
          const response = await axiosWithCredentials.put(
            `/accounts/update-delivery-address/${userId}/`,
            payload
          );
          const userDetail = await getProfileInfo();
          dispatch(loginUser(userDetail));
          toast.success("Successfully Updated");
          setShowEditModal(false);

          return response.data;
        } catch (error) {
          console.error("Error:", error);
          toast.error("Something went wrong!");
          throw error;
        }
      }

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
                    setCurrentAddressData(userDetail.invoice_address);
                    setShowEditModal(true);
                  }}
                >
                  <span className="text-[16px] font-semibold text-[#6C7275] flex gap-[6px]">
                    <img src={editImg} alt="Edit" />
                    Edit
                  </span>
                </button>
              </div>

              <p className="text-[16px] text-[#535353] mt-[4px]">
                {userDetail?.invoice_address
                  ? [
                      userDetail?.invoice_address?.street_and_number,
                      userDetail?.invoice_address?.city,
                      userDetail?.invoice_address?.country,
                    ]
                      .filter(Boolean)
                      .join(", ")
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
                    setCurrentAddressData(userDetail.delivery_address);
                    setShowEditModal(true);
                  }}
                >
                  <span className="text-[16px] font-semibold text-[#6C7275] flex gap-[6px]">
                    <img src={editImg} alt="Edit" />
                    Edit
                  </span>
                </button>
              </div>

              <p className="text-[16px] text-[#535353] mt-[4px]">
                {userDetail?.delivery_address
                  ? [
                      userDetail.delivery_address.street_and_number,
                      userDetail.delivery_address.city,
                      userDetail.delivery_address.country,
                    ]
                      .filter(Boolean)
                      .join(", ")
                  : "Loading..."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
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
                  className="px-4 py-2 text-sm font-medium text-white bg-[#FBC700] rounded-md "
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
