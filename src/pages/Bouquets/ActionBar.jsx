import Chip from '@mui/material/Chip';
import api from '../../api/api';
import { Server } from '../../utils/config';

export default function ActionBar() {
  return (
    <div className="sortingBar">
      <Chip
        onClick={() =>
          api.updateEmptyFields(
            Server.databaseID,
            Server.collectionID,
            'Description',
          )
        }
        label="Test"
        variant="outlined"
      />
    </div>
  );
}
