import React, { Component } from 'react';
import { Icon } from 'react-fa';
import cx from 'classnames';
import Button from 'components/Button';
import styles from './style.pcss';

export default class AddProjectForm extends Component {
  state = {
    showForm: false,
    newProjectName: '',
    submitButtonDisabled: true,
  }

  toggleShowProjectForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  }

  addProject = () => {
    const newProjectName = this.state.newProjectName.trim();

    if (!newProjectName || !newProjectName.length) {
      return;
    }

    this.setState({
      newProjectName: '',
      submitButtonDisabled: true
    });

    this.props.onSubmit(this.state.newProjectName);
  }

  handleNewProjectName = ({ target: { value: newProjectName } }) => {
    const projectName = newProjectName.trim();
    const submitButtonDisabled = !projectName.length;

    this.setState({ newProjectName, submitButtonDisabled });
  }

  renderForm = () => {
    return (
      <div className={styles.form}>
        <input
          className={styles.input}
          onChange={this.handleNewProjectName}
          value={this.state.newProjectName}
          placeholder="Lisää projekti"
        />
        <Button
          onClick={this.addProject}
          className={cx(styles.submitButton, styles.buttonGreen)}
          disabled={this.state.submitButtonDisabled}
          type="button"
        >
          <Icon name="plus" /> Lisää
        </Button>
      </div>
    );
  }

  render() {
    const { showForm } = this.state;
    const icon = showForm ? 'times' : 'plus';

    const classes = cx(styles.toggleButton, {
      [styles.buttonGreen]: !showForm,
      [styles.active]: showForm,
    });

    return (
      <div className={styles.container}>
        {showForm && this.renderForm() }
        <Button
          onClick={this.toggleShowProjectForm}
          className={classes}
          active={showForm}
          type="button"
        >
          <Icon name={icon} />
        </Button>
      </div>
    );
  }
}
