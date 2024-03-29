import React from 'react';

import styles from './Board.module.less';

interface MessageAreaProps {
    messages?: (string | React.ReactNode)[]
}

const MessageArea = (props: MessageAreaProps) => {
    return (
        <div className={styles.messageArea}>
            {props.messages?.map((m, idx) => (<span key={`msg${idx}`}>{m}</span>))}
        </div>
    )
};

export default MessageArea;
