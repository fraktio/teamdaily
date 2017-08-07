import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

import { name } from 'services/employee';

import AddProjectForm from 'components/AddProjectForm';
import Button from 'components/Button';

import styles from './style.pcss';

class StatusForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: props.initialValues.message,
      color: props.initialValues.color,
      flagged: props.initialValues.flagged,
    };
  }

  handleChangeEmployee = event => {
    const { onChangePerson } = this.props;

    onChangePerson(event.target.value);
  };

  handleChangeMessage = ({ target: { value: message } }) => {
    const { onChangeValue } = this.props;

    onChangeValue({ message });

    this.setState({ message });
  };

  handleChangeColor = color => () => {
    const { onChangeValue } = this.props;

    onChangeValue({ color });

    this.setState({ color });
  };

  handleChangeFlagged = () => {
    const { onChangeValue } = this.props;

    onChangeValue({ flagged: !this.state.flagged });

    this.setState({ flagged: !this.state.flagged });
  };

  handleToggleProject = projectId => event => {
    event.preventDefault();

    const { onAddPersonToProject, onRemovePersonFromProject } = this.props;

    if (this.getActiveProjectIds().includes(projectId)) {
      onRemovePersonFromProject(projectId);
    } else {
      onAddPersonToProject(projectId);
    }
  };

  handleSubmitStatus = event => {
    event.preventDefault();

    const { onAddEntry } = this.props;

    onAddEntry(this.state.message, this.state.color, this.state.flagged);

    this.setState({ message: '' });
  };

  isSubmittable = () => {
    const { selectedPerson, enabled } = this.props;
    const { message, color } = this.state;

    return enabled && selectedPerson && message && color;
  };

  getActiveProjectIds() {
    const { selectedPerson } = this.props;

    let activeProjectIds = [];

    if (selectedPerson) {
      activeProjectIds = selectedPerson.projects.map(p => p.id);
    }

    return activeProjectIds;
  }

  render() {
    const {
      enabled,
      people,
      projects,
      selectedPerson,
      projectsSavedNotification,
      onAddProject,
      intl,
    } = this.props;

    const { message, color, flagged } = this.state;

    return (
      <form className={styles.container} onSubmit={this.handleSubmitStatus}>
        <div className={styles.floatLeft}>
          <select
            disabled={!enabled}
            value={selectedPerson ? selectedPerson.id : ''}
            onChange={this.handleChangeEmployee}
          >
            <option value="">
              {intl.messages.statusForm_emptySelection}
            </option>

            {people.map(person =>
              <option key={person.id} value={person.id}>
                {name(person.name)}
              </option>,
            )}
          </select>
        </div>

        <div className={styles.control}>
          <div className={styles.label}>
            <FormattedMessage id="statusForm_doing" defaultMessage="What are you working on?" />
          </div>

          <input
            disabled={!enabled}
            type="text"
            ref="message"
            className={styles.input}
            value={message}
            onChange={this.handleChangeMessage}
            placeholder={intl.messages.statusForm_whatAreYouDoingPlaceholder}
          />
        </div>

        <div className={styles.control}>
          <div className={styles.label}>
            <FormattedMessage id="statusForm_feeling" defaultMessage="How are you?" />
          </div>

          <div className={styles.buttonGroup}>
            <Button
              type="button"
              disabled={!enabled}
              onClick={this.handleChangeColor('green')}
              active={color === 'green'}
              className="green"
              title={intl.messages.statusForm_ok}
            >
              <FormattedMessage id="statusForm_ok" defaultMessage="Doing good" />
            </Button>

            <Button
              type="button"
              disabled={!enabled}
              onClick={this.handleChangeColor('yellow')}
              active={color === 'yellow'}
              className="yellow"
              title={intl.messages.statusForm_busy}
            >
              <FormattedMessage id="statusForm_busy" defaultMessage="Pretty busy" />
            </Button>

            <Button
              type="button"
              disabled={!enabled}
              onClick={this.handleChangeColor('red')}
              active={color === 'red'}
              className="red"
              title={intl.messages.statusForm_tooMuch}
            >
              <FormattedMessage id="statusForm_tooMuch" defaultMessage="Too much to do" />
            </Button>

            <Button
              type="button"
              disabled={!enabled}
              onClick={this.handleChangeColor('blue')}
              active={color === 'blue'}
              className="blue"
              title={intl.messages.statusForm_notEnough}
            >
              <FormattedMessage id="statusForm_notEnough" defaultMessage="Not enough to do" />
            </Button>

            <Button
              type="button"
              disabled={!enabled}
              onClick={this.handleChangeColor('pink')}
              active={color === 'pink'}
              className="pink"
              title={intl.messages.statusForm_onVacation}
            >
              <FormattedMessage id="statusForm_onVacation" defaultMessage="On vacation" />
            </Button>
          </div>
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              className={styles.checkbox}
              checked={flagged}
              onChange={this.handleChangeFlagged}
              disabled={!enabled}
            />

            <FormattedMessage
              id="statusForm_attention"
              defaultMessage="My situation requires attention"
            />
          </label>
        </div>

        <div className={styles.control}>
          <div className={styles.label}>
            <FormattedMessage
              id="statusForm_projects"
              defaultMessage="Which projects are you participating in?"
            />

            {projectsSavedNotification &&
              <span className={styles.projectsSaved}>
                <FormattedMessage id="statusForm_projectsSaved" defaultMessage="Projects saved!" />
              </span>}
          </div>

          <div className={styles.smallButtons}>
            {projects.map(project =>
              <Button
                key={project.id}
                onClick={this.handleToggleProject(project.id)}
                active={this.getActiveProjectIds().includes(project.id)}
                title={project.name}
                disabled={!enabled || !selectedPerson}
                type="button"
              >
                {project.name}
              </Button>,
            )}

            <AddProjectForm onSubmit={onAddProject} />
          </div>
        </div>

        <Button type="submit" disabled={!this.isSubmittable()} id="submitter" className="orange">
          <FormattedMessage id="statusForm_sendButtonText" defaultMessage="SUBMIT" />
        </Button>
      </form>
    );
  }
}

export default injectIntl(StatusForm);
