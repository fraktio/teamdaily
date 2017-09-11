import React, { Component } from 'react';
import styles from './style.pcss';

export default class ProjectDescription extends Component {
  save = event => {
    console.log('save desc ' + event.target.value);
    this.props.saveDescription(event.target.value);
  };

  render() {
    const { description } = this.props;

    return (
      <div>
        <input type="textarea" onBlur={this.save} value={description} />
      </div>
    );
  }
}
