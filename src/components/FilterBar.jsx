import Slider from '@mui/material/Slider';
import Container from '@mui/material/Container';
//import Box from '@mui/material/Box';

export default function FilterBar({
  filterRanges,
  filterSelection,
  filterUpdater,
}) {
  const handleChange = (event, newValue) => {
    if (newValue[0] >= newValue[1]) {
      return;
    }
    filterUpdater(newValue);
  };

  return (
    <Container
      fixed
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end', // Align items to the right
        marginTop: '20px',
      }}
    >
      <Slider
        getAriaLabel={() => 'Filter'}
        min={filterRanges[0]}
        max={filterRanges[1]}
        size="small"
        step={1.0}
        value={filterSelection}
        onChange={handleChange}
        valueLabelDisplay="on"
        sx={{
          width: '100%',
        }}
      />
    </Container>
  );
}
