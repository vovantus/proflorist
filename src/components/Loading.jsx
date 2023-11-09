import { CircularProgress } from '@mui/material';

const Loading = ({ loading, size, color, style }) => {
  return (
    <>
      {loading && (
        <div className={['loadingIndicatorContainer' + ' ' + style]}>
          <CircularProgress
            disableShrink
            size={size ? size : 30}
            color={color}
          />
        </div>
      )}
    </>
  );
};

export default Loading;
