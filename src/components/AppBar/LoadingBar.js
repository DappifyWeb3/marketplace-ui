import { LinearProgress, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import * as selectors from 'store/selectors';

const LoadingBar = () => {
    const isLoading = useSelector(selectors.isLoading);
    return (
        <Box className="loading__bar">
        { isLoading && (<LinearProgress />) }
      </Box>
    );
}

export default LoadingBar;