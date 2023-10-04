import BouquetCard from '../../components/BouquetCard';
import { Box } from '@mui/material';

export default function BouquetList({ bouquets }) {
  const bouquetList = bouquets.map((bouq) => (
    <BouquetCard
      key={bouq.Name}
      imageUrl={bouq.ImageUrl}
      header={bouq.Name}
      price={bouq.Price}
      date={bouq.$createdAt}
      display={true}
      link={'bouquet/' + bouq.$id}
    />
  ));

  return bouquetList.length > 0 ? (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {bouquetList}
    </Box>
  ) : (
    <h5>No bouquets to show</h5>
  );
}
