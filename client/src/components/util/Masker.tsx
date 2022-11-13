import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface MaskerProps {
    open: boolean
}

const Masker = (props: MaskerProps) => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1000 }}
            open={props.open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default Masker;
