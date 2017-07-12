import React, { Component } from 'react';
import { Icon } from 'react-fa';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import styles from './style.pcss';


export default class WeekSelection extends Component {
  changeWeek = change => {
    this.props.onChange(change);
  }
  render() {
    return (
      <div className={styles.container}>
        <a onClick={event => this.changeWeek(-1)}>
          <Icon name="arrow-left" />
        </a>
        <h2 className={styles.week}>
          <FormattedMessage 
              id='weekSelector_week'
              defaultMessage='Week {week}'
              values={{week: this.props.weekNumberAndYear}}
          />
        </h2>
        <a onClick={event => this.changeWeek(1)}>
          <Icon name="arrow-right" />
        </a>
      </div>
    );
  }
}
