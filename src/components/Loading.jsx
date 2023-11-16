import { CircularProgress } from '@mui/material';
import cn from 'classnames';

const Loading = ({ loading, size, color, style }) => {
  return (
    <>
      {loading && (
        <div className={cn('loadingIndicatorContainer', style)}>
          <CircularProgress disableShrink size={size || 30} color={color} />
        </div>
      )}
    </>
  );
};

export default Loading;
