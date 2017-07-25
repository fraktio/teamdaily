import React, { Component } from 'react';
import cx from 'classnames';
import { injectIntl } from 'react-intl'; 
import { name } from 'services/employee.js';
import colors from '../../colors';

import styles from './style.pcss';


export class CompactStatusForm extends Component {
  constructor(props) {
    super(props);

    this.state = props.initialValues;
  }

  changeName = ({ target: { value: name } }) => {
    this.setState({ name });
  }

  changeDescription = ({ target: { value: description } }) => {
    this.setState({ description });
  }

  changeColor = ({ target: { value: color } }) => {
    this.setState({ color });
  }

  submitStatus = event => {
    event.preventDefault();

    this.props.onSubmit({
      ...this.state
    });

    this.setState({
      description: ''
    });
  }

  isSubmittable() {
    return this.state.name && this.props.enabled && this.state.description && this.state.color;
  }

  render() {
    const { employees, intl } = this.props;

    const placeholder = intl.messages.compactStatusForm_whatAreYouDoing;

    const labelTexts = [
      intl.messages.statusForm_ok,
      intl.messages.statusForm_busy,
      intl.messages.statusForm_tooMuch,
      intl.messages.statusForm_notEnough
    ];

    return (
      <div className={styles.container}>
        <div className={styles.userSelection}>
          <h3 className={styles.heading}>New post</h3>
          <select disabled={!this.props.enabled} ref="name" value={this.state.name} onChange={this.changeName}>
            <option key="empty-selection" value="">-- Valitse --</option>
            {employees.map((employee) =>
              <option key={employee.name} value={employee.name}>
                {name(employee.name)}
              </option>
            )}
          </select>
        </div>

        <form className={styles.status} onSubmit={this.submitStatus}>
          <textarea
            className={styles.textarea}
            placeholder={placeholder}
            defaultValue={this.props.initialValues.description}
            name="description"
            ref="description"
            onChange={this.changeDescription}
          />

          <div className={styles.statusCodes}>
            {colors.map((color, i)=>
              <label key={color} className={cx(styles.label, color)}>
                <input type="radio" name="status-code" className={styles.input} checked={this.state.color === color} value={color} onChange={this.changeColor} />
                <span className={styles.labelText}>{labelTexts[i]}</span>
              </label>
            )}
          </div>

          <button className={styles.submitButton} type="submit" disabled={!this.isSubmittable()}>
            Post status
          </button>
        </form>
      </div>
    );
  }
}

export default injectIntl(CompactStatusForm);
