import React from 'react';

import { IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ToastProps {
    message: string,
    open: boolean,
    autoHideDuration?: number,
    onClose: () => void
}

const Toast = (props: ToastProps) => {
    return (
        <Snackbar
            open={props.open}
            message={props.message}
            autoHideDuration={props.autoHideDuration}
            onClose={(e, reason) => {
                if (reason !== 'clickaway') {
                    props.onClose();
                }
            }}
            action={[
                (
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={props.onClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                )
            ]}
        />
    )
};

export default Toast;
