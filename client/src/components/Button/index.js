import React from 'react';
import cx from 'classnames';

import styles from './style.pcss';

const Button = ({ className, children, active, inactive, ...props }) => {
  const classes = cx(styles.container, className, {
    [styles.active]: active,
    [styles.inactive]: inactive,
  });

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
