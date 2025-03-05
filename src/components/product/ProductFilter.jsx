import React, { useState } from "react";
import {
  Box,
  Typography,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Divider,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

const ProductFilter = ({ filters, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(filters.priceRange || [0, 5000]);
  const [selectedConditions, setSelectedConditions] = useState(
    filters.condition || []
  );
  const [selectedBrands, setSelectedBrands] = useState(filters.brand || []);
  const [sortBy, setSortBy] = useState(filters.sortBy || "newest");

  const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
  const brands = [
    "Apple",
    "Samsung",
    "Sony",
    "Dell",
    "HP",
    "Lenovo",
    "Asus",
    "Acer",
    "Microsoft",
    "LG",
  ];

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handlePriceChangeCommitted = (event, newValue) => {
    onFilterChange({ priceRange: newValue });
  };

  const handleConditionChange = (condition) => {
    const newConditions = selectedConditions.includes(condition)
      ? selectedConditions.filter((c) => c !== condition)
      : [...selectedConditions, condition];

    setSelectedConditions(newConditions);
    onFilterChange({ condition: newConditions });
  };

  const handleBrandChange = (brand) => {
    const newBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];

    setSelectedBrands(newBrands);
    onFilterChange({ brand: newBrands });
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    onFilterChange({ sortBy: event.target.value });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedConditions([]);
    setSelectedBrands([]);
    setSortBy("newest");
    onFilterChange({
      priceRange: [0, 5000],
      condition: [],
      brand: [],
      sortBy: "newest",
    });
  };

  return (
    <Box
      sx={{ bgcolor: "background.paper", p: 2, borderRadius: 1, boxShadow: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Filters
        </Typography>
        <Button size="small" onClick={handleClearFilters}>
          Clear All
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Sort By</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadioGroup value={sortBy} onChange={handleSortChange}>
            <FormControlLabel
              value="newest"
              control={<Radio />}
              label="Newest"
            />
            <FormControlLabel
              value="price_low_high"
              control={<Radio />}
              label="Price: Low to High"
            />
            <FormControlLabel
              value="price_high_low"
              control={<Radio />}
              label="Price: High to Low"
            />
            <FormControlLabel
              value="rating"
              control={<Radio />}
              label="Highest Rated"
            />
          </RadioGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Price Range</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 1 }}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              onChangeCommitted={handlePriceChangeCommitted}
              valueLabelDisplay="auto"
              min={0}
              max={5000}
              step={50}
            />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}
            >
              <Typography variant="body2">${priceRange[0]}</Typography>
              <Typography variant="body2">${priceRange[1]}</Typography>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Condition</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {conditions.map((condition) => (
              <FormControlLabel
                key={condition}
                control={
                  <Checkbox
                    checked={selectedConditions.includes(condition)}
                    onChange={() => handleConditionChange(condition)}
                  />
                }
                label={condition}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Brand</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            {brands.map((brand) => (
              <FormControlLabel
                key={brand}
                control={
                  <Checkbox
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                  />
                }
                label={brand}
              />
            ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductFilter;
