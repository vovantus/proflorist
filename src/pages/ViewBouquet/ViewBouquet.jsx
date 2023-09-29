import { useParams } from 'react-router-dom';
import { useBouquetInfo } from '../../hooks';
import MediaCard from '../../components/MediaCard';
import Loading from '../../components/Loading';
import { Grid, Container } from '@mui/material';

export default function ViewBouquet() {
  const { id } = useParams();
  const { bouquet, isLoading } = useBouquetInfo(id);
  console.log(bouquet);
  return (
    <Container maxWidth="lg">
      <Grid container spacing={1}>
        {isLoading !== 'loaded' ? (
          <Loading loaderState={isLoading} />
        ) : (
          <Grid item key={bouquet.Name}>
            <MediaCard
              imageUrl={bouquet.ImageUrl}
              header={bouquet.Name}
              price={bouquet.Price}
              date={bouquet.$createdAt}
              text={bouquet.Description}
              display={true}
              link={''}
            />
          </Grid>
        )}
      </Grid>
    </Container>
  );
}
