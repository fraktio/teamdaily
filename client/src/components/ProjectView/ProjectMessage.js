import React, { Component } from 'react';
import { debounce } from 'lodash';

import styles from './style.pcss';

export default class ProjectMessage extends Component {
  state = {
    message: '',
  };

  componentDidMount = () => {
    this.setState({
      message: this.props.message || '',
    });
  };

  componentWillReceiveProps = nextProps => {
    this.setState({
      message: nextProps.message || '',
    });
  };

  save = value => {
    this.props.saveProjectMessage(this.state.message);
  };

  debouncedSave = debounce(this.save, 2000);

  onChange = event => {
    this.setState({
      message: event.target.value,
    });
    this.debouncedSave();
  };

  render() {
    const { message } = this.props;

    return (
      <div>
        <textarea onChange={this.onChange} value={this.state.message} />
      </div>
    );
  }
}
