import { Link as RouterLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function BouquetCard({
  imageUrl,
  header,
  price,
  display,
  link,
}) {
  return (
    <Card
      sx={{
        position: 'relative',
        width: '260px',
        height: '260px', // Square aspect ratio
        overflow: 'hidden', // Ensure the image stays within the card
      }}
      className={display ? '' : 'hiddenCard'}
    >
      {/* Background Image */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover', // Cover the entire card
          backgroundPosition: 'center', // Center the image
        }}
      />

      <CardContent
        sx={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Semi-transparent background
          maxHeight: '10%', // Maximum height of 10% of the card
          minHeight: '26px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '15px', // Add some padding to the content
          paddingBottom: '0',
        }}
      >
        <Typography variant="h7">
          {link ? (
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
        {price && (
          <Typography variant="h7" color="primary" sx={{ minWidth: '60px' }}>
            {price} &euro; {/* Euro sign */}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
