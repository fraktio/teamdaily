import React, { Component } from 'react';
import styles from './style.pcss';

const STATUS_RED = 'project_red';
const STATUS_YELLOW = 'project_yellow';
const STATUS_GREEN = 'project_green';

export default class ProjectStatus extends Component {
  save = value => {
    console.log('save status ' + value);
    this.props.saveStatus(value);
  };

  red = () => this.save(STATUS_RED);
  green = () => this.save(STATUS_GREEN);
  yellow = () => this.save(STATUS_YELLOW);

  render() {
    const { status, entries } = this.props;

    return (
      <div>
        <span onClick={this.red}> red {status === STATUS_RED && '!'}</span> /
        <span onClick={this.green}> green {status === STATUS_GREEN && '!'}</span> /
        <span onClick={this.yellow}> yellow {status === STATUS_YELLOW && '!'}</span>
      </div>
    );
  }
}
