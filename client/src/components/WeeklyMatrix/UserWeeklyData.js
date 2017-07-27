import React from 'react';
import { FormattedMessage } from 'react-intl';
import userDataExtractor from 'services/userDataExtractor';
import WeeklyGraph from 'components/WeeklyMatrix/WeeklyGraph';
import EmployeeName from 'components/EmployeeName';
import moment from 'moment';

import cx from 'classnames';

export default ({ data, weeklyData }) => {
  const entries = weeklyData
    .filter(date => date.name === data.user)
    .filter(date => date.week === data.week);

  return (
    <div>
      <div className="user-data-modal">
        <h1 className="matrix-title">
          <EmployeeName name={data.user} />
          <span> - </span>
          <FormattedMessage id="userWeeklyData_week" defaultMessage="Week" /> {data.week}
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
