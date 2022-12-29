import React, { useState } from 'react';

import { Button } from '@mui/material';
import { DeviceUnknownOutlined, Person, SmartToyOutlined } from '@mui/icons-material';

import { Player } from '@cardgame/common';

import ModalDialog from '../dialogs/ModalDialog';
import TextField from '../forms/TextField';

import styles from './Board.module.less';

interface PlayerDetailsProps {
    player: Player
    updatePlayer?: (player: Player) => void
};

const PlayerDetails = (props: PlayerDetailsProps) => {
    const [showComputerDlg, setShowComputerDlg] = useState(false);
    const [compPlayerName, setCompPlayerName] = useState('');

    let icon;
    let playerIdentifier;

    if (props.player.type === 'pending') {
        icon = <DeviceUnknownOutlined />;
        playerIdentifier = 'Awaiting Player...'
    } else if (props.player.type === 'computer') {
        icon = <SmartToyOutlined />;
        playerIdentifier = `${props.player.username} (Computer)`;
    } else {
        icon = <Person />;

        if (props.player.type === 'guest') {
            playerIdentifier = `${props.player.username} (Guest)`;
        } else {
            playerIdentifier = props.player.username;
        }
    }

    let modificationLink;
    if (props.updatePlayer) {
        if (props.player.type !== 'pending') {
            modificationLink = (
                <Button
                    onClick={() => {
                        if (props.updatePlayer) {
                            props.updatePlayer({
                                ...props.player,
                                type: 'pending',
                                username: ''
                            });
                        }
                    }}
                >
                    Remove
                </Button>
            );
        } else {
            modificationLink = (
                <Button
                    onClick={() => {
                        setCompPlayerName('');
                        setShowComputerDlg(true);
                    }}
                >
                    Add Computer
                </Button>
            );
        }
    }

    return (
        <div className={styles.playerDetails}>
            {icon}
            <span>{playerIdentifier}</span>
            {props.updatePlayer ?
                (
                    <div className={styles.playerDetailsLinks}>
                        {modificationLink}
                    </div>
                ) :
                null}
            <ModalDialog
                open={showComputerDlg}
                title="Add Computer Player"
                actions={[
                    {
                        title: 'Cancel',
                        onClick: () => setShowComputerDlg(false)
                    },
                    {
                        title: 'OK',
                        disabled: !Boolean(compPlayerName),
                        onClick: () => {
                            if (props.updatePlayer) {
                                props.updatePlayer({
                                    ...props.player,
                                    type: 'computer',
                                    username: compPlayerName
                                });
                            }

                            setShowComputerDlg(false);
                        }
                    }
                ]}
            >
                <TextField
                    label="Computer Player Name"
                    value={compPlayerName}
                    fullWidth
                    onChange={(val) => {
                        setCompPlayerName(val);
                    }}
                />
            </ModalDialog>
        </div>
    );
};

export default PlayerDetails;
