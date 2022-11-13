import React from 'react';

import Alert from '@mui/material/Alert';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

import ModalDialog from '../../components/dialogs/ModalDialog';
import { getAlert, removeAlertInstance } from './alertSlice';

const PopupAlertContainer = () => {
    const dispatch = useAppDispatch();
    const alert = useAppSelector(getAlert);

    if (alert) {
        let dialogBody;
        if (alert.type != null) {
            dialogBody = (
                <Alert severity={alert.type}>
                    {alert.text}
                </Alert>
            );
        } else {
            dialogBody = (
                <div>
                    {alert.text}
                </div>
            );
        }

        return (
            <ModalDialog
                open
                actions={[{
                    title: alert.buttonText,
                    onClick: () => dispatch(removeAlertInstance(alert.id)),
                }]}
                closeOnClickOutside={false}
                showClose={false}
                size="xs"
                title={alert.title}
            >
                {dialogBody}
            </ModalDialog>
        );
    }

    return null;
};

export default PopupAlertContainer;
