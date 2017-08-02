import React from 'react';
import EmployeeName from 'components/EmployeeName';
import moment from 'moment';
import styles from './style.pcss';

export default ({ entry }) =>
  <div className={styles.container}>
    <header className={styles.header}>
      <EmployeeName name={entry.name} className={styles.name} />
      <span className={styles.created}>
        {moment(entry.created).format('DD.MM')}
      </span>
    </header>
    <p className={styles.message}>
      {entry.message}
    </p>
  </div>;
