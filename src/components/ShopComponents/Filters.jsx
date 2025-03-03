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

const Filters = ({ categories, filterCheck }) => {
  const [expanded, setExpanded] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded((prev) =>
      isExpanded ? [...prev, panel] : prev.filter((p) => p !== panel)
    );
  };

  const handleCheck = (category, choice) => {
    setSelectedFilters((prev) => {
      const updatedCategory = prev[category]?.includes(choice)
        ? prev[category].filter((item) => item !== choice)
        : [...(prev[category] || []), choice];

      return { ...prev, [category]: updatedCategory };
    });

    filterCheck(choice);
  };

  return (
    <>
      {Object.keys(categories).map((category) => (
        <Accordion
          key={category}
          expanded={expanded.includes(category)}
          onChange={handleAccordionChange(category)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{category}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              {categories[category]?.choices?.map((choice) => (
                <FormControlLabel
                  key={choice}
                  control={
                    <Checkbox
                      checked={selectedFilters[category]?.includes(choice)}
                      onChange={() => handleCheck(category, choice)}
                    />
                  }
                  label={choice}
                />
              ))}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default Filters;
