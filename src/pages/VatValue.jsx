import React, { useState } from "react";
import InputField from "../components/Common/InputField";
import Button from "../components/Common/Button";

export const VatValue = () => {
  const [vat, setVat] = useState("");

  const handleInputChange = (event) => {
    setVat(event.target.value);
  };

  const handleSubmit = () => {
    alert(`VAT Value Set: ${vat}%`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md m-auto h-full">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
        Add VAT Value
      </h2>
      <InputField
        type="number"
        label="Enter VAT Percentage:"
        placeholder="Enter VAT %"
        name="lastName"
        value={vat}
        onChange={handleInputChange}
      />
      <Button
        btnText="Save VAT"
        paddingX="20px"
        breakpoint="w-full mt-6"
        type="submit"
      />
      {vat && (
        <p className="mt-4 text-center text-gray-700">
          Current VAT: <span className="font-bold">{vat}%</span>
        </p>
      )}
    </div>
  );
};
