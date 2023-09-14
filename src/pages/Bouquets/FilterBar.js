import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';

export default function FilterBar({ priceFilter, priceFilterUpdate }) {
  const [filterValue, setFilterValue] = useState([
    priceFilter.minPrice,
    priceFilter.maxPrice,
  ]);

  useEffect(() => {
    setFilterValue([priceFilter.minPrice, priceFilter.maxPrice]);
  }, [priceFilter]);

  const handleChange = (event, newValue) => {
    console.log(newValue);
    setFilterValue(newValue);
    priceFilterUpdate(newValue);
  };

  return (
    <Container fixed>
      <Box sx={{ width: '300px' }}>
        <Slider
          getAriaLabel={() => 'Price range'}
          min={priceFilter.minPrice - 1}
          max={priceFilter.maxPrice + 1}
          size="small"
          step={1.0}
          value={filterValue}
          onChange={handleChange}
          valueLabelDisplay="on"
        />
      </Box>
    </Container>
  );
}
