import React from 'react';
import cx from 'classnames';
import colors from '../../colors';
import styles from './style.pcss';

const calculateWidth = (total, n) => {
  if (total < 1) {
    return 0;
  }

  const unit =  100 / total;
  return n * unit;
};

const filterByColor = (messages, color) =>
  messages.filter(message => message.color === color);

export default ({ messages }) => (
  <div className={styles.container}>
    <div className={styles.simpleGraph}>
      {colors.map(color => {
        const filteredMessages = filterByColor(messages, color);

        return (
          <div
            key={color}
            className={cx(styles.bar, color)}
            style={{
              width: calculateWidth(messages.count(), filteredMessages.count()) + '%'
            }}
          />
        );
      })}
    </div>

    <div className={styles.countsContainer}>
      {colors.map(color => {
        const classes = cx(styles.box, 'box', color);
        const filteredMessages = filterByColor(messages, color);

        return (
          <div key={color} className={classes}>
            <p className={styles.heading}>{filteredMessages.count()}</p>
          </div>
        );
      })}
    </div>
  </div>
);
