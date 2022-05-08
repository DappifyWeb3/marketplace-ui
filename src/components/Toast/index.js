import { useEffect, useState } from 'react';
import { Snackbar, Alert, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import * as selectors from 'store/selectors';

const Toast = () => {
    const isError = useSelector(selectors.isError);
    const [isOpen, setOpen] = useState(true);

    useEffect(() => {
        setOpen(isError);        
    }, [isError]);

    return (
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={()=>setOpen(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert severity="error" sx={{ width: '100%' }}>
                We could not process the request, please contact the admin
            </Alert>
        </Snackbar>
    );
}

export default Toast;