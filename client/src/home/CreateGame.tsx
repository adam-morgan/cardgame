import React, { useState } from 'react';

import { Button } from '@mui/material';

import { GameSetup, validation } from '@cardgame/common';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import { isLoggedIn } from '../data/user/userSlice';
import { sendCreateGameRequest } from '../data/game/api';

import { showMasker } from '../containers/masker/maskerSlice';
import { showAlert } from '../containers/alert/alertSlice';

import ModalDialog from '../components/dialogs/ModalDialog';
import Select from '../components/forms/Select';

import styles from './Home.module.less';

const CreateGame = () => {
    const dispatch = useAppDispatch();

    const loggedIn = useAppSelector(isLoggedIn);

    const [showDialog, setShowDialog] = useState(false);
    const [gameSetup, setGameSetup] = useState<GameSetup>({})

    return (
        <div>
            <Button
                variant="contained"
                color="success"
                fullWidth
                onClick={() => {
                    setGameSetup({})
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
                            const masker = dispatch(showMasker());

                            try {
                                const response = await sendCreateGameRequest({
                                    gameSetup
                                });

                                if (!response.created) {
                                    dispatch(showAlert({
                                        type: 'error',
                                        title: 'Creating Game Failed',
                                        text: response.failureReason ?? 'Create game request failed for an unknown reason.'
                                    }));
                                } else {
                                    setShowDialog(false);
                                }
                            } catch (e) {
                                console.error(e);

                                dispatch(showAlert({
                                    type: 'error',
                                    title: 'Creating Game Failed',
                                    text: 'Create game request failed for an unknown reason.'
                                }));
                            } finally {
                                masker.close();
                            }
                        },
                        disabled: !validation.isGameSetupValid(gameSetup)
                    }
                ]}
            >
                <div className={styles.createNewGame}>
                    <Select
                        label="# Players"
                        value={gameSetup.numPlayers}
                        onChange={(value) => { setGameSetup({ ...gameSetup, numPlayers: value })}}
                        items={[2, 3, 4, 5, 6].map((n) => ({ label: `${n}`, value: n }))}
                    />
                </div>
            </ModalDialog>
        </div>
    )
};

export default CreateGame;
