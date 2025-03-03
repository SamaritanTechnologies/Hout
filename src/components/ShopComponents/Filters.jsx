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
                      checked=""
                      onChange=""
                    />
                  }
                  label={choice.name_en}
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