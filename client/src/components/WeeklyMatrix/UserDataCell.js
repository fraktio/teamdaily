import React from 'react';
import last from 'lodash/last';
import cx from 'classnames';

import EmployeeName from '../EmployeeName';

export default ({ label, weeklyData, weekNumber, year, userName, onClick, className }) => {
  const color = last(weeklyData).color;
  const classes = cx(className, color, 'clickabe');

  return (
    <td
      onClick={() => onClick(weekNumber, year, userName)}
      className={classes}
    >
      {label}
    </td>
  );
};
