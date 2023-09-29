import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

function Price({ price }) {
  if (price) {
    return <Button size="small">{price} EUR</Button>;
  }
}

export default function MediaCard({
  imageUrl,
  header,
  text,
  price,
  display,
  link,
}) {
  return (
    <Card
      sx={{ height: 500, width: 280 }}
      className={display ? '' : 'hiddenCard'}
    >
      <CardMedia
        sx={{ height: 300, width: 280 }}
        image={imageUrl}
        title={header}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {link != '' ? (
            <Link
              component={RouterLink}
              to={link}
              color="black"
              underline="hover"
            >
              {header}
            </Link>
          ) : (
            header
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {text ? text : 'No description provided'}
        </Typography>
      </CardContent>
      <CardActions>
        <Price price={price} />
      </CardActions>
    </Card>
  );
}
