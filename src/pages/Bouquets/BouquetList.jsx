import BouquetCard from '../../components/BouquetCard';
import { Grid } from '@mui/material';

export default function BouquetList({ bouquets }) {
  const bouquetList = bouquets.map((bouq) => (
    <Grid item key={bouq.Name}>
      <BouquetCard
        imageUrl={bouq.ImageUrl}
        header={bouq.Name}
        price={bouq.Price}
        date={bouq.$createdAt}
        display={true}
        link={'/proflorist/bouquet/' + bouq.$id}
      />
    </Grid>
  ));

  return bouquetList.length > 0 ? (
    <>{bouquetList}</>
  ) : (
    <h5>No bouquets to show</h5>
  );
}
