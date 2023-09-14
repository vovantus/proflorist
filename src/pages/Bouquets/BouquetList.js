import MediaCard from '../../UIElments/MediaCard';
import { Grid } from '@mui/material';

export default function BouquetList({ bouquets }) {
  const bouquetList = bouquets
    .filter((b) => b.show)
    .map((bouq) => {
      return (
        <Grid item key={bouq.Name}>
          <MediaCard
            imageUrl={bouq.ImageUrl}
            header={bouq.Name}
            price={bouq.Price}
            date={bouq.$createdAt}
            text={bouq.Description}
            display={true}
          />
        </Grid>
      );
    });

  return bouquetList.length > 0 ? <>{bouquetList}</> : <h5>Нет букетов</h5>;
}
