import React, { Component } from 'react';
import styles from './style.pcss';

const COLOR_RED = 'red';
const COLOR_YELLOW = 'yellow';
const COLOR_GREEN = 'green';
const COLOR_BLUE = 'blue';

export default class ProjectColor extends Component {
  save = value => {
    this.props.saveProjectColor(value);
  };

  red = () => this.save(COLOR_RED);
  green = () => this.save(COLOR_GREEN);
  yellow = () => this.save(COLOR_YELLOW);
  blue = () => this.save(COLOR_BLUE);

  render() {
    const { color, entries } = this.props;

    return (
      <div>
        <span onClick={this.blue}> blue {color === COLOR_BLUE && '!'}</span> /
        <span onClick={this.green}> green {color === COLOR_GREEN && '!'}</span> /
        <span onClick={this.yellow}> yellow {color === COLOR_YELLOW && '!'}</span> /
        <span onClick={this.red}> red {color === COLOR_RED && '!'}</span> /
      </div>
    );
  }
}
