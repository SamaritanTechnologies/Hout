import React, { useState, useEffect } from "react";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";
import { toast } from "react-toastify";
import {
  AddDeliveryFee,
  getDeliveryFee,
} from "../redux/actions/productActions";

const DeliveryValue = () => {
  const [delivery, setDelivery] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const data = await getDeliveryFee();

        setDelivery(data?.delivery_fee);
      } catch (error) {
        toast.error("Failed to fetch delivery fee.");
      }
    };
    fetchDelivery();
  }, []);

  const handleInputChange = (event) => {
    setDelivery(event.target.value);
  };

  const handleSubmit = async () => {
    const delivery_fee = parseFloat(delivery);
    if (isNaN(delivery_fee) || delivery_fee < 0) {
      toast.error("Please enter a valid delivery fee.");
      return;
    }

    setLoading(true);
    try {
      const payload = { delivery_fee };
      await AddDeliveryFee(payload);
      toast.success("Delivery fee saved successfully!");
    } catch (error) {
      toast.error("Failed to save delivery fee. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md m-auto h-full">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Delivery Fee
      </h2>
      <InputField
        type="number"
        label="Enter Delivery Fee:"
        placeholder="Enter delivery fee"
        name="delivery"
        value={delivery}
        onChange={handleInputChange}
        min="0"
        step="0.01"
      />
      <Button
        btnText={loading ? "Saving..." : "Save"}
        paddingX="20px"
        breakpoint="w-full mt-6"
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      />
    </div>
  );
};

export default DeliveryValue;
