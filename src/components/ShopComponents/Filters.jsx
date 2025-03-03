import React, { useState } from "react";
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
import ReactSlider from "react-slider";
import { json } from "react-router-dom";

const Filters = ({ categories, filterCheck }) => {
  const [expanded, setExpanded] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});
  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };

  const handleCheckboxChange = (category) => (choiceId) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (!updatedFilters[category.name]) {
        updatedFilters[category.name] = {
          name: category.name,
          name_nl: category.name_nl,
          choices: [],
        };
      }

      if (updatedFilters[category.name].choices.includes(choiceId)) {
        updatedFilters[category.name].choices = updatedFilters[
          category.name
        ].choices.filter((id) => id !== choiceId);
      } else {
        updatedFilters[category.name].choices.push(choiceId);
      }

      return updatedFilters;
    });
  };

  const [price, setPrice] = useState([50, 100]);

  const handlePriceChange = (values) => {
    setPrice(values);
  };

  return (
    <>
      {categories?.map((category) => (
        <Accordion
          key={category.name}
          expanded={expanded.includes(category.name)}
          onChange={handleAccordionChange(category.name)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category?.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {category?.choices?.map((choice) => (
                <FormControlLabel
                  key={choice.id}
                  control={
                    <Checkbox
                      checked={
                        selectedFilters[category.name]?.choices.includes(
                          choice.id
                        ) || false
                      }
                      onChange={() => handleCheckboxChange(category)(choice.id)}
                    />
                  }
                  label={choice.name_en}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      ))}

      <div className="w-full max-w-md p-4 ">
        <h4 className="text-base xl:text-[22px] font-semibold text-[#2A353D] font-main mb-2.5">
          Price
        </h4>
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
