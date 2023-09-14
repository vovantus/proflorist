import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Price({ price }) {
  if (price) {
    return <Button size="small">{price} EUR</Button>;
  }
}

export default function MediaCard({ imageUrl, header, text, price, display }) {
  return (
    <Card
      sx={{ height: 500, width: 300 }}
      className={display ? '' : 'hiddenCard'}
    >
      <CardMedia
        sx={{ height: 300, width: 300 }}
        image={imageUrl}
        title={header}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {header}
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
