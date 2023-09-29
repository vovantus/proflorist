import MediaCard from '../../components/MediaCard';
import { Grid } from '@mui/material';

export default function BouquetList({ bouquets }) {
  const bouquetList = bouquets.map((bouq) => (
    <Grid item key={bouq.Name}>
      <MediaCard
        imageUrl={bouq.ImageUrl}
        header={bouq.Name}
        price={bouq.Price}
        date={bouq.$createdAt}
        text={bouq.Description}
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
