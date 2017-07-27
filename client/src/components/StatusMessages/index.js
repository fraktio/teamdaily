import React from 'react';
import colors from '../../colors';
import classnames from 'classnames';
import Message from 'components/Message';
import styles from './style.pcss';

export default ({ messages }) =>
  <div className={styles.container}>
    {colors.map(color => {
      const classes = classnames(styles.box, color);
      const filteredMessages = messages.filter(message => message.color === color);

      return (
        <div key={'key-for-' + color} className={classes}>
          {filteredMessages.map((message, i) =>
            <Message key={color + (message.id || i)} message={message} />,
          )}
        </div>
      );
    })}
  </div>;
