import React from 'react';
import EmployeeName from 'components/EmployeeName';
import moment from 'moment';
import styles from './style.pcss';

export default ({ message }) =>
  <div className={styles.container}>
    <header className={styles.header}>
      <EmployeeName name={message.name} className={styles.name} />
      <span className={styles.created}>
        {moment(message.created).format('DD.MM')}
      </span>
    </header>
    <p className={styles.message}>
      {message.message}
    </p>
  </div>;
