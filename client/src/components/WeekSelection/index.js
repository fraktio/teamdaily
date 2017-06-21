import React, { Component } from 'react';
import { Icon } from 'react-fa';
import styles from './style.pcss';

export default class WeekSelection extends Component {
  changeWeek = change => {
    event.preventDefault();
    this.props.onChange(change);
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
