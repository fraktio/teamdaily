import React from 'react';
import { FormattedMessage } from 'react-intl';

import WeeklyData from './WeeklyData';
import UserWeeklyData from './UserWeeklyData';
import Button from 'components/Button';

import styles from './style.pcss';

const preventDefault = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export default ({ type, handleClose, ...props }) => {
  if (!type) {
    return false;
  }

  const types = {
    'weekly-data': WeeklyData,
    'user-weekly-data': UserWeeklyData
  };

  const Element = types[type];

  return (
    <section id="modal-container" className={styles.modalContainer} onClick={handleClose}>
      <div className={styles.modalContent} onClick={preventDefault}>
        <Element {...props} />
        <Button className="button-info" onClick={handleClose}>
          <FormattedMessage 
              id='matrix.closeModal'
              defaultMessage='Close'
          />
        </Button>
      </div>
    </section>
  );
};
