import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

export interface ModalDialogAction {
    onClick: () => void,
    disabled?: boolean,
    title: string
}

export interface ModalDialogProps {
    actions?: ModalDialogAction[],
    closeOnClickOutside: boolean,
    children: React.ReactNode,
    onClose?: () => void,
    open: boolean,
    showClose: boolean,
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
    title?: string
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const ModalDialog = (props: ModalDialogProps) => {
    return (
        <StyledDialog
            open={props.open}
            onClose={props.closeOnClickOutside ? props.onClose : undefined}
            maxWidth={props.size}
            fullWidth
        >
            {props.title != null || props.showClose ?
                (
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        {props.title}
                        {props.showClose && props.onClose ?
                            (
                                <IconButton
                                    aria-label="close"
                                    onClick={props.onClose}
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            ) :
                            null}
                    </DialogTitle>
                ) :
                null}
            <DialogContent dividers>
                {props.children}
            </DialogContent>
            {props.actions?.length ?
                (
                    <DialogActions>
                        {props.actions.map((action) => {
                            return (
                                <Button
                                    key={action.title}
                                    onClick={action.onClick}
                                    disabled={action.disabled}
                                >
                                    {action.title}
                                </Button>
                            );
                        })}
                    </DialogActions>
                ) :
                null}
        </StyledDialog>
    )
};

ModalDialog.defaultProps = {
    closeOnClickOutside: true,
    showClose: true,
    size: 'sm'
};

export default ModalDialog;
