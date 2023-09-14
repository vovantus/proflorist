import Chip from '@mui/material/Chip';

export default function SortingBar({ updateSorting }) {
  return (
    <div className="sortingBar">
      <Chip
        onClick={() => updateSorting('Name')}
        label="Name"
        variant="outlined"
      />
      <Chip
        onClick={() => updateSorting('Price')}
        label="Price"
        variant="outlined"
      />
      <Chip
        onClick={() => updateSorting('$createdAt')}
        label="Date"
        variant="outlined"
      />
    </div>
  );
}
