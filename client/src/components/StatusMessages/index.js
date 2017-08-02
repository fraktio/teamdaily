import React from 'react';
import colors from '../../colors';
import classnames from 'classnames';
import Entry from 'components/Entry';
import styles from './style.pcss';

export default ({ entries }) =>
  <div className={styles.container}>
    {colors.map(color => {
      const filteredEntries = entries.filter(entry => entry.color === color);

      return (
        <div key={'key-for-' + color} className={classnames(styles.box, color)}>
          {filteredEntries.map((entry, i) => <Entry key={color + (entry.id || i)} entry={entry} />)}
        </div>
      );
    })}
  </div>;
