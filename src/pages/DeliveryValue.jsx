import React, { useState, useEffect } from "react";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";
import { toast } from "react-toastify";
import {
  AddDeliveryFee,
  getDeliveryFee,
} from "../redux/actions/productActions";

const DeliveryValue = () => {
  const [data, setData] = useState({
    upto_750: "",
    from_750_to_1500: "",
    above_1500: "",
    time_estimate: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDelivery = async () => {
      try {
        const response = await getDeliveryFee();
        if (response) {
          setData({
            upto_750: response.upto_750 || "",
            from_750_to_1500: response.from_750_to_1500 || "",
            above_1500: response.above_1500 || "",
            time_estimate: response.time_estimate || "",
          });
        }
      } catch (error) {
        toast.error("Failed to fetch delivery settings.");
      }
    };
    fetchDelivery();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate numeric fields
    if (
      isNaN(parseFloat(data.upto_750)) ||
      parseFloat(data.upto_750) < 0 ||
      isNaN(parseFloat(data.from_750_to_1500)) ||
      parseFloat(data.from_750_to_1500) < 0 ||
      isNaN(parseFloat(data.above_1500)) ||
      parseFloat(data.above_1500) < 0
    ) {
      toast.error("Please enter valid values for all delivery fees.");
      return;
    }

    // Validate time estimate (non-empty string)
    if (!data.time_estimate.trim()) {
      toast.error("Please enter a delivery time estimate.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        upto_750: parseFloat(data.upto_750),
        from_750_to_1500: parseFloat(data.from_750_to_1500),
        above_1500: parseFloat(data.above_1500),
        time_estimate: data.time_estimate.trim(),
      };
      await AddDeliveryFee(payload);
      toast.success("Delivery settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save delivery settings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10 bg-white shadow-lg rounded-lg p-6 w-full max-w-md m-auto h-full">
      <div>
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Delivery Settings
        </h2>
        <div className="flex flex-col gap-4">
          <InputField
            type="number"
            label="Enter Delivery Fee for Order Amount Upto €750:"
            placeholder="Enter delivery fee"
            name="upto_750"
            value={data.upto_750}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
          <InputField
            type="number"
            label="Enter Delivery Fee for Order Amount €750 – €1500:"
            placeholder="Enter delivery fee"
            name="from_750_to_1500"
            value={data.from_750_to_1500}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
          <InputField
            type="number"
            label="Enter Delivery Fee for Order Amount Above €1500:"
            placeholder="Enter delivery fee"
            name="above_1500"
            value={data.above_1500}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
          <InputField
            type="text"
            label="Enter Estimated Delivery Time:"
            placeholder="e.g. 2-3 business days"
            name="time_estimate"
            value={data.time_estimate}
            onChange={handleInputChange}
          />
        </div>
        <Button
          btnText={loading ? "Saving..." : "Save"}
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

export default DeliveryValue;
