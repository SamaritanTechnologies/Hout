import React, { useState } from "react";

import ReactFlagsSelect from "react-flags-select";
const CountrySelector = () => {
  const [selected, setSelected] = useState("US");
  return (
    <>
      <ReactFlagsSelect
        selected={selected}
        onSelect={(code) => setSelected(code)}
        countries={["US", "GB", "FR", "DE", "IT"]}
        customLabels={{
          US: "EN-US",
          GB: "EN-GB",
          FR: "FR",
          DE: "DE",
          IT: "IT",
        }}
        id="flags-select"
      />
    </>
  );
};

export default CountrySelector;
