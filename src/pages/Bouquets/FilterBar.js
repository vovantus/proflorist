import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function FilterBar({ filterRanges, filterUpdater }) {
  const handleChange = (event, newValue) => {
    filterUpdater(newValue);
  };

  return (
    <Container fixed>
      <Box sx={{ width: '300px' }}>
        <Slider
          getAriaLabel={() => 'Filter'}
          min={filterRanges.minValue - 1}
          max={filterRanges.maxValue + 1}
          size="small"
          step={1.0}
          value={[filterRanges.minSelectedValue, filterRanges.maxSelectedValue]}
          onChange={handleChange}
          valueLabelDisplay="on"
        />
      </Box>
    </Container>
  );
}
