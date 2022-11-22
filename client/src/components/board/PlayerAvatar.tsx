import React from 'react';
import Avatar from 'react-avatar';

import { DeviceUnknownOutlined, SmartToyOutlined } from '@mui/icons-material';

import { Player } from '@cardgame/common';

import styles from './Board.module.less';

interface PlayerProps {
    player: Player,
    index: number,
    size: number
}

const colors = [
    '#A62A21',
    '#7e3794',
    '#0B51C1',
    '#3A6024',
    '#A81563',
    '#B3003C'
]

const PlayerAvatar = (props: PlayerProps) => {
    const style = {
        width: `${props.size}px`,
        height: `${props.size}px`
    }

    let contents;
    if (props.player.type === 'pending') {
        contents = (
            <div className={styles.pending} style={{ backgroundColor: colors[props.index] }}>
                <DeviceUnknownOutlined />
            </div>
        );
    } else {
        contents = (
            <Avatar
                name={props.player.username}
                email={props.player.email}
                size={`${props.size}`}
                color={colors[props.index]}
                round
            />
        );
    }

    return (
        <div className={styles.player} style={style}>
            {contents}
            {props.player.type === 'computer' ? (
                <div className={styles.computer}>
                    <SmartToyOutlined />
                </div>
            ) : null}
        </div>
    );
};

PlayerAvatar.defaultProps = {
    size: 100
}

export default PlayerAvatar;
