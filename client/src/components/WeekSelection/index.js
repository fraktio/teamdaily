import React, { Component } from 'react';
import { Icon } from 'react-fa';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import styles from './style.pcss';

export default class WeekSelection extends Component {
  handlePrevClick = e => {
    const { onPrevWeek } = this.props;

    onPrevWeek();
  };

  handleNextClick = e => {
    const { onNextWeek } = this.props;

    onNextWeek();
  };

  render() {
    const { date } = this.props;

    return (
      <div className={styles.container}>
        <a onClick={this.handlePrevClick}>
          <Icon name="arrow-left" />
        </a>

        <h2 className={styles.week}>
          <FormattedMessage
            id="weekSelector_week"
            defaultMessage="Week {week}"
            values={{ week: date.format('WW-GGGG') }}
          />
        </h2>

        <a onClick={this.handleNextClick}>
          <Icon name="arrow-right" />
        </a>
      </div>
    );
  }
}
