import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Common/Button";
import { axiosWithCredentials } from "../providers";
import Select from "react-select";
import { toast } from "react-toastify";

const PaymentOptions = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState({
    cash_payment: false,
    credit_card: false,
  });
  const [loading, setLoading] = useState(false);

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosWithCredentials.get(
          `accounts/retrieve-all-users/`
        );
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

  // Convert users to react-select options
  const options = users.map((user) => ({
    value: user.id,
    label: user.first_name + " " + user.last_name || user.email,
    user: user,
  }));

  const handleCheckboxChange = (type) => {
    setPaymentMethod((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSubmit = async () => {
    if (!selectedUser) {
      alert("Please select a user.");
      return;
    }

    const userId = selectedUser.value;

    const payload = {
      cash_payment: paymentMethod.cash_payment,
      credit_card: paymentMethod.credit_card,
    };

    setLoading(true);
    console.log("Payload:", payload);

    try {
      await axiosWithCredentials.patch(
        `/accounts/payment-options/${userId}/`,
        payload
      );
      toast.success("Payment options updated successfully");
    } catch (err) {
      console.error("Error updating payment option", err);
      toast.error("Failed to update payment option.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          Payment Options
        </h1>

        <div className="flex gap-2 items-center">
          <label className="whitespace-nowrap">Select User:</label>
          <div className="min-w-[250px]">
            <Select
              options={options}
              value={selectedUser}
              onChange={(option) => setSelectedUser(option)}
              isSearchable
              className="w-full"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Payment Method:
          </label>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={paymentMethod.cash_payment}
                onChange={() => handleCheckboxChange("cash_payment")}
                className="accent-blue-600"
              />
              <span>Cash</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={paymentMethod.credit_card}
                onChange={() => handleCheckboxChange("credit_card")}
                className="accent-blue-600"
              />
              <span>Credit</span>
            </label>
          </div>
        </div>

        <Button
          btnText={loading ? "Updating..." : "Update Payment Option"}
          paddingX="20px"
          breakpoint="w-full mt-6"
          type="button"
          onClick={handleSubmit}
          disabled={loading}
        />
      </div>
    </div>
  );
};

export default PaymentOptions;
