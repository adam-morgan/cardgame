import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { useDrag, useDrop } from 'react-dnd';

import { ClickAwayListener, Paper, Popper } from '@mui/material';
import { DeviceUnknownOutlined, SmartToyOutlined } from '@mui/icons-material';

import { Player } from '@cardgame/common';

import PlayerDetails from './PlayerDetails';

import styles from './Board.module.less';

interface PlayerProps {
    allowDrag?: boolean
    onDrop?: (player: Player) => void
    updatePlayer?: (player: Player) => void
    player: Player
    index: number
    size: number
}

const PlayerAvatar = (props: PlayerProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const [{ isDragging }, dragRef] = useDrag(() => ({
        type: 'avatar',
        item: props.player,
        collect: (monitor) => ({
            isDragging: Boolean(monitor.isDragging())
        }),
        canDrag: () => props.allowDrag ?? false
    }));

    const [{ isOver: isDropping }, dropRef] = useDrop(() => ({
        accept: 'avatar',
        drop: (item: Player) => {
            if (props.onDrop && item.id !== props.player.id) {
                props.onDrop(item);
            }
        },
        collect: (monitor) => ({
            isOver: Boolean(monitor.isOver())
        }),
        canDrop: () => props.onDrop != null && !isDragging
    }));

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickAway = (event: MouseEvent | TouchEvent) => {
        setAnchorEl(null);
    };

    const style = {
        width: `${props.size}px`,
        height: `${props.size}px`
    }

    let contents;
    if (props.player.type === 'pending') {
        contents = (
            <div className={styles.pending} style={{ backgroundColor: props.player.color }}>
                <DeviceUnknownOutlined />
            </div>
        );
    } else {
        contents = (
            <Avatar
                name={props.player.username}
                email={props.player.email}
                size={`${props.size}`}
                color={props.player.color}
                round
            />
        );
    }

    let className = styles.player;
    if (isDragging) {
        className = `${className} ${styles.dragging}`;
    }

    return (
        <div
            ref={(node) => {
                dragRef(node);
                dropRef(node);
            }}
            className={className}
            style={style}
            onClick={handleClick}
        >
            {!isDragging ? (
                <>
                    {contents}
                    {props.player.type === 'computer' ? (
                        <div className={styles.computer}>
                            <SmartToyOutlined />
                        </div>
                    ) : null}
                    {anchorEl ? (
                        <ClickAwayListener onClickAway={handleClickAway}>
                            <Popper
                                open={Boolean(anchorEl)}
                                anchorEl={anchorEl}
                                placement="top"
                            >
                                <Paper className={styles.playerDetailsPopup}>
                                    <PlayerDetails player={props.player} updatePlayer={props.updatePlayer} />
                                </Paper>
                            </Popper>
                        </ClickAwayListener>
                    ) : null}
                </>
            ) : null}
            {isDropping && !isDragging ? (
                <div className={styles.dropping} />
             ) : null
            }
        </div>
    );
};

PlayerAvatar.defaultProps = {
    size: 100
}

export default PlayerAvatar;
