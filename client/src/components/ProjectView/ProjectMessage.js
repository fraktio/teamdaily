import React, { Component } from 'react';
import { debounce } from 'lodash';
import classnames from 'classnames';

import styles from './style.pcss';

export default class ProjectMessage extends Component {
  state = {
    message: '',
    focused: false,
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

  onBlur = event => {
    this.setState(
      {
        message: event.target.value,
        focused: false,
      },
      () => {
        this.save();
      },
    );
  };

  focus = () => {
    this.setState(
      {
        focused: true,
      },
      () => {
        this.textarea.focus();
      },
    );
  };

  render() {
    const { message } = this.props;

    return (
      <div>
        {this.state.focused &&
          <textarea
            ref={textarea => {
              this.textarea = textarea;
            }}
            className={classnames([styles.message, styles.messageInput])}
            onChange={this.onChange}
            onBlur={this.onBlur}
            value={this.state.message}
          />}

        {!this.state.focused &&
          this.state.message.length > 0 &&
          <pre className={styles.message} onClick={this.focus}>
            {this.state.message}
          </pre>}

        {!this.state.focused &&
          this.state.message.length === 0 &&
          <button className={classnames([styles.message, styles.setMessage])} onClick={this.focus}>
            +
          </button>}
      </div>
    );
  }
}
