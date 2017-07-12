import React, { Component } from 'react';
import { Icon } from 'react-fa';
import moment from 'moment';

import styles from './style.pcss';
import { push } from '../ReduxRouter';

export default class WeekSelection extends Component {
  changeWeek = change => {
    this.props.onChange(change);
  }

  componentWillReceiveProps(nextProps) {
    const { d } = this.props;
    const weekNumber = nextProps.d.week();
    const weekNumberNow = moment().week();
    
    if (d === nextProps.d) {
      return;
    }
    
    if (weekNumber !== weekNumberNow) {
      push('/people/'+weekNumber);
      return;
    }
    
    push('/people');
  }

  render() {
    return (
      <div className={styles.container}>
        <a onClick={event => this.changeWeek(-1)}>
          <Icon name="arrow-left" />
        </a>
        <h2 className={styles.week}>
          {'Viikko ' + this.props.weekNumberAndYear}
        </h2>
        <a onClick={event => this.changeWeek(1)}>
          <Icon name="arrow-right" />
        </a>
      </div>
    );
  }
}
