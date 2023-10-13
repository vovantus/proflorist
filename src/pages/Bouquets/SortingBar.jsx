import Chip from '@mui/material/Chip';
import { useDebounce } from '../../hooks/useDebounce';

export default function SortingBar({ updateSorting }) {
  const nameSortingDebounce = useDebounce(() => updateSorting('Name'), 2000);
  return (
    <div
      className="sortingBar"
      style={{ display: 'flex', justifyContent: 'center' }}
    >
      <Chip onClick={nameSortingDebounce} label="Name" variant="outlined" />
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
