import React, { useState, useEffect } from "react";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";
import { addVatRate, getVatRate } from "../redux/actions/productActions";
import { toast } from "react-toastify";

export const VatValue = () => {
  const [vat, setVat] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVatRate = async () => {
      try {
        const data = await getVatRate();
        if (data?.rate) {
          setVat(data.rate);
        }
      } catch (error) {
        toast.error("Failed to fetch VAT rate.");
      }
    };
    fetchVatRate();
  }, []);

  const handleInputChange = (event) => {
    setVat(event.target.value);
  };

  const handleSubmit = async () => {
    if (!vat || isNaN(vat) || vat < 0) {
      toast.error("Please enter a valid VAT rate.");
      return;
    }

    setLoading(true);
    try {
      const payload = { rate: vat };
      await addVatRate(payload);
      toast.success("VAT rate saved successfully!");
    } catch (error) {
      toast.error("Failed to save VAT rate. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md m-auto h-full">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        VAT Value
      </h2>
      <InputField
        type="number"
        label="Enter VAT Percentage:"
        placeholder="Enter VAT %"
        name="vat"
        value={vat}
        onChange={handleInputChange}
      />
      <Button
        btnText={loading ? "Saving..." : "Save VAT"}
        paddingX="20px"
        breakpoint="w-full mt-6"
        type="button"
        onClick={handleSubmit}
        disabled={loading}
      />
      {/* {vat && (
        <p className="mt-4 text-center text-gray-700">
          Current VAT: <span className="font-bold">{vat}%</span>
        </p>
      )} */}
    </div>
  );
};
