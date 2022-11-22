import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { isLoggedIn } from '../data/user/userSlice';
import { createGame } from '../data/game/gameSlice';

import ModalDialog from '../components/dialogs/ModalDialog';
import Select from '../components/forms/Select';
import TextField from '../components/forms/TextField';

import { SmallBannerContext } from './context';

import styles from './Home.module.less';

const CreateGame = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loggedIn = useAppSelector(isLoggedIn);

    const [showDialog, setShowDialog] = useState(false);
    const [numPlayers, setNumPlayers] = useState<number | undefined>();
    const [playerName, setPlayerName] = useState<string | undefined>();

    let formValid = true;
    if (numPlayers == null) {
        formValid = false;
    } else if (!loggedIn && !playerName?.trim()) {
        formValid = false;
    }

    return (
        <SmallBannerContext.Consumer>
            { ({ setSmallBanner }) => (
                <div>
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        onClick={() => {
                            setNumPlayers(undefined);
                            setPlayerName(undefined);
                            setShowDialog(true);
                        }}
                    >
                        Create New Game {!loggedIn ? '(As Guest)' : null}
                    </Button>
                    <ModalDialog
                        open={showDialog}
                        title="Create New Game"
                        onClose={() => setShowDialog(false)}
                        closeOnClickOutside={false}
                        actions={[
                            {
                                title: 'Cancel',
                                onClick: () => setShowDialog(false)
                            },
                            {
                                title: 'Create Game',
                                onClick: async () => {
                                    const gameId = await dispatch(createGame({
                                        numPlayers: numPlayers as number,
                                        playerName: playerName as string
                                    }));

                                    if (gameId != null) {
                                        setShowDialog(false);
                                        setSmallBanner(true);
                                        setTimeout(() => navigate(`/game/${gameId}`), 750);
                                    }
                                },
                                disabled: !formValid
                            }
                        ]}
                    >
                        <div className={styles.createNewGame}>
                            {loggedIn ?
                                null :
                                (
                                    <TextField
                                        label="Your Name"
                                        fullWidth
                                        value={playerName}
                                        onChange={(value) => setPlayerName(value)}
                                    />
                                )}
                            <Select
                                label="# Players"
                                value={numPlayers}
                                onChange={(value) => { setNumPlayers(value)}}
                                items={[2, 3, 4, 5, 6].map((n) => ({ label: `${n}`, value: n }))}
                            />
                        </div>
                    </ModalDialog>
                </div>
            )}
        </SmallBannerContext.Consumer>
    )
};

export default CreateGame;
