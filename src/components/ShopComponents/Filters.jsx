import React, { useState } from "react";
import ReactSlider from "react-slider";
import PaymentCard from "../Common/PaymentCard";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
const Filters = ({ filters, filterCheck }) => {
  console.log(filters, "kkjkj");
  const [state, setState] = useState({
    filters: filters,
  });

  const handleChange = (clickedItem) => {
    setState((prev) => ({
      ...prev,
      filters: filters.map((item) => {
        if (item.filter === clickedItem.filter) {
          const updatedItem = { ...item, checked: !item.checked };
          filterCheck(updatedItem);
          return updatedItem;
        }
        return item;
      }),
    }));
  };
  const [price, setPrice] = useState([50, 100]);

  const handlePriceChange = (values) => {
    setPrice(values);
  };
  const [expanded, setExpanded] = useState(["netto", "material", "type"]);
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };

  const [selected, setSelected] = useState({
    netto: [],
    material: false,
    type: [],
  });

  const handleCheck = (category, value) => {
    setSelected((prev) => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value],
    }));
  };

  return (
    // <div className="max-w-[300px] md:max-w-[100%]  sm:max-w-[100%]    xs:max-w-[100%]   xl:min-h-[1050px] shadow-xl md:overflow-auto sm:overflow-auto  xs:overflow-auto   ">
    //   <span className="pt-[50px] md:pt-4 sm:pt-3 xs:pt-3   text-22 lg:text-20  flex px-8   justify-start   font-bold ">
    //     Our assortment
    //   </span>

    //   <section className="md:flex sm:flex xs:flex filterRowMain ">
    //     {state.filters.map((item, index) => {
    //       return (
    //         <div
    //           key={index}
    //           className="filterRowBox flex justify-start px-6 md:pr-1 sm:pr-1 xs:pr-1  items-center py-[2px] md:min-w-[160px] sm:min-w-[163px] xs:min-w-[163px]"
    //         >
    //           <PaymentCard
    //             item={item}
    //             name={item.filter}
    //             isChecked={item.isChecked}
    //             removeBg
    //             onChange={handleChange}
    //           />
    //         </div>
    //       );
    //     })}
    //   </section>
    // </div>
    <>
      <Accordion  expanded={expanded.includes("netto")} onChange={handleAccordionChange("netto")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Netmaat (mm)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["40×40", "44×68", "45×70", "50×50", "60×60"].map((size) => (
              <FormControlLabel
                key={size}
                control={
                  <Checkbox
                    checked={selected.netto.includes(size)}
                    onChange={() => handleCheck("netto", size)}
                  />
                }
                label={size}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded.includes("material")} onChange={handleAccordionChange("material")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Materiaal</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.material}
                onChange={() =>
                  setSelected((prev) => ({ ...prev, material: !prev.material }))
                }
              />
            }
            label="Hardhout"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded.includes("type")} onChange={handleAccordionChange("type")}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Type</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {["geschaafd hardhout", "paal hardhout"].map((type) => (
              <FormControlLabel
                key={type}
                control={
                  <Checkbox
                    checked={selected.type.includes(type)}
                    onChange={() => handleCheck("type", type)}
                  />
                }
                label={type}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
      <div className="w-full max-w-md p-4 ">
        <h4 className="text-base xl:text-[22px] font-semibold text-[#2A353D] font-main mb-2.5">Price</h4>
        <div className="bg-[#F4F5F7] py-4 px-7 rounded-2xl">
          <div className="flex justify-between mb-3 text-sm font-medium font-main text-[#2A353D] max-w-[180px] mx-auto">
            <span>${price[0]}</span>
            <span>${price[1]}</span>
          </div>
          <ReactSlider
            className="horizontal-slider w-full max-w-[180px] mx-auto h-[18px]"
            thumbClassName="example-thumb h-[20px] bg-[#000000]"
            trackClassName="example-track"
            renderThumb={(props, state) => (
              <div
                {...props}
                className="h-4 w-4 bg-[#FBC700] rounded-full cursor-pointer focus:outline-none top-[1px]"
              ></div>
            )}
            min={0}
            max={200}
            defaultValue={price}
            value={price}
            onChange={handlePriceChange}
            ariaLabel={["Lower thumb", "Upper thumb"]}
            ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
            pearling
            minDistance={10}
          />
        </div>
      </div>
    </>
  );
};

export default Filters;
