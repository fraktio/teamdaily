import React, { Component } from 'react';
import { Icon } from 'react-fa';
import { FormattedMessage, injectIntl } from 'react-intl';
import cx from 'classnames';
import Button from 'components/Button';
import styles from './style.pcss';

class AddProjectForm extends Component {
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

  render() {
    const { showForm } = this.state;
    const { intl } = this.props;
    const icon = showForm ? 'times' : 'plus';

    const classes = cx(styles.toggleButton, {
      [styles.buttonGreen]: !showForm,
      [styles.active]: showForm,
    });

    return (
      <div className={styles.container}>
      {showForm && 
        <div className={styles.form}>
          <input
            className={styles.input}
            onChange={this.handleNewProjectName}
            value={this.state.newProjectName}
            placeholder={intl.messages.addProjectForm_addProject}
          />
          <Button
            onClick={this.addProject}
            className={cx(styles.submitButton, styles.buttonGreen)}
            disabled={this.state.submitButtonDisabled}
            type="button"
          >
            <Icon name="plus" />             
            <FormattedMessage 
                id='addProjectForm_addProjectButton'
                defaultMessage='Add'
            />
          </Button>
        </div> 
      }
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

export default injectIntl(AddProjectForm);