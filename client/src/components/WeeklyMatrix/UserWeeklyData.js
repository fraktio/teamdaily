import React from 'react';
import { FormattedMessage } from 'react-intl';
import EmployeeName from 'components/EmployeeName';
import moment from 'moment';

import cx from 'classnames';

export default ({ person, entries, week }) => {
  return (
    <div>
      <div className="user-data-modal">
        <h1 className="matrix-title">
          <EmployeeName name={person.name} />
          <span> - </span>
          <FormattedMessage id="userWeeklyData_week" defaultMessage="Week" /> {week}
        </h1>

        {entries.map(entry =>
          <div className={cx(entry.color, 'message')} key={'entry-' + entry.id}>
            <p>
              {moment(entry.created).locale('fi').format('dddd D.M.YYYY HH:mm:ss')}
            </p>
            <p>
              {entry.message}
            </p>
          </div>,
        )}
      </div>
    </div>
  );
};
