import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export default function FilterBar({
  filterRanges,
  filterSelection,
  filterUpdater,
}) {
  const handleChange = (event, newValue) => {
    if (newValue[0] >= newValue[1]) {
      newValue[0] = newValue[1] + 1.0;
    }
    filterUpdater(newValue);
  };

  return (
    <Container fixed>
      <Box sx={{ width: '300px' }}>
        <Slider
          getAriaLabel={() => 'Filter'}
          min={filterRanges[0] - 1}
          max={filterRanges[1] + 1}
          size="small"
          step={1.0}
          value={filterSelection}
          onChange={handleChange}
          valueLabelDisplay="on"
        />
      </Box>
    </Container>
  );
}
