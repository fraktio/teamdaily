import React from 'react';
import cx from 'classnames';
import colors from '../../colors';
import styles from './style.pcss';

const calculateWidth = (total, n) => {
  if (total < 1) {
    return 0;
  }

  const unit = 100 / total;
  return n * unit;
};

const filterByColor = (entries, color) => entries.filter(entries => entries.color === color);

export default ({ entries }) =>
  <div className={styles.container}>
    <div className={styles.simpleGraph}>
      {colors.map(color => {
        const filteredEntries = filterByColor(entries, color);

        return (
          <div
            key={color}
            className={cx(styles.bar, color)}
            style={{
              width: calculateWidth(entries.length, filteredEntries.length) + '%',
            }}
          />
        );
      })}
    </div>

    <div className={styles.countsContainer}>
      {colors.map(color => {
        const classes = cx(styles.box, 'box', color);
        const filteredEntries = filterByColor(entries, color);

        return (
          <div key={color} className={classes}>
            <p className={styles.heading}>
              {filteredEntries.length}
            </p>
          </div>
        );
      })}
    </div>
  </div>;
