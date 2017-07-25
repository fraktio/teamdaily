import React, { Component } from 'react';
import { alphabeticalSort } from '../../utils/helpers';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Icon } from 'react-fa';
import { name } from 'services/employee';
import { Link } from 'react-router-dom';
import AddProjectForm from 'components/AddProjectForm';
import Button from 'components/Button';
import styles from './style.pcss';

const emptySelection = '-- Valitse --';

export class StatusForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.initialValues,
    };
  }

  changeEmployee = (evt) => {
    const employee = this.props.employees.find(e => e.name === evt.target.value);

    this.setState({
      name: employee.name || '',
      employeeId: employee.id || null,
      activeProjects: employee.projects || []
    });
  }

  changeDescription = ({ target: { value: description } }) => {
    this.setState({ description });
  }

  changeColor = color => {
    this.setState({ color });
  }

  toggleActiveProject = (id, e) => {
    e.preventDefault();

    const activeProjects = this.state.activeProjects || [];
    const isProjectActive = activeProjects.includes(id);

    if (isProjectActive) {
      activeProjects.splice(activeProjects.indexOf(id), 1);
    } else {
      activeProjects.push(id);
    }

    this.setState({ activeProjects }, () =>
      this.saveProject(id, !isProjectActive)
    );
  }

  submitStatus = (e) => {
    const { name, employeeId } = this.state;

    e.preventDefault();

    if (name && !employeeId) {
      const employee = this.props.employees.find(e => e.name === name);

      this.setState({
        employeeId: employee.id
      }, () =>
        this.doSubmit()
      );

      return;
    }

    this.doSubmit();
  }

  doSubmit = () => {
    this.props.onSubmit({
      ...this.state
    });

    this.setState({
      description: ''
    });
  }

  saveProject = (projectId, newProjectState) => {
    const { employeeProjectActions } = this.props;

    employeeProjectActions.saveProject(this.state, this.state.employeeId, projectId, newProjectState);
  }

  isSubmittable = () => {
    return this.state.name && this.props.enabled && this.state.description;
  }

  setFlagged = () => {
    this.setState({ flagged: !this.state.flagged });
  }

  render() {
    const fields = {
      ...this.state
    }; 

    const { employees, projects, employeeProjectsSavedNotification, intl } = this.props;
    const { messages } = intl;

    return (
      <form className={styles.container} onSubmit={(e) => this.submitStatus(e)}>
        <div className={styles.floatLeft}>
          <select disabled={!this.props.enabled} ref="name" value={fields.name} onChange={this.changeEmployee}>
            <option value="">{emptySelection}</option>
              {employees.map(employee =>
                <option key={employee.name} value={employee.name}>{name(employee.name)}</option>
              )}
          </select>
        </div>
        <div className={styles.control}>
          <div className={styles.label}>
            <FormattedMessage 
              id='statusForm_doing'
              defaultMessage='What are you working on?'
            />
          </div>
          <input disabled={!this.props.enabled} type="text" ref="description" className={styles.input} value={fields.description} onChange={this.changeDescription} placeholder={messages.statusForm_whatAreYouDoingPlaceholder}/>
        </div>
        <div className={styles.control}>
          <div className={styles.label}>
            <FormattedMessage 
              id='statusForm_feeling'
              defaultMessage='How are you?'
            />
          </div>
          <div className={styles.buttonGroup}>
            <Button type="button" disabled={!this.props.enabled} onClick={() => this.changeColor('green')} active={fields.color === 'green'} className="green" title="Sopivasti töitä, hyvä fiilis">
              <FormattedMessage 
                id='statusForm_ok'
                defaultMessage='Doing good'
              />
            </Button>
            <Button type="button" disabled={!this.props.enabled} onClick={() => this.changeColor('yellow')} active={fields.color === 'yellow'} className="yellow" title="Jonkin verran liikaa töitä, ahdistaa hiukan">
              <FormattedMessage 
                id='statusForm_busy'
                defaultMessage='Pretty busy'
              />
            </Button>
            <Button type="button" disabled={!this.props.enabled} onClick={() => this.changeColor('red')} active={fields.color === 'red'} className="red" title="Liian paljon kiirettä ja/tai hommia samaan aikaan">
              <FormattedMessage 
                id='statusForm_tooMuch'
                defaultMessage='Too much to do'
              />
            </Button>
            <Button type="button" disabled={!this.props.enabled} onClick={() => this.changeColor('blue')} active={fields.color === 'blue'} className="blue" title="Liian vähän tekemistä, ei laskutettavaa">
              <FormattedMessage 
                id='statusForm_notEnough'
                defaultMessage='Not enough to do'
              />
            </Button>
          </div>
        </div>
        <div>
          <label>
            <input type="checkbox" className={styles.checkbox} checked={fields.flagged} onChange={this.setFlagged}/>
            <FormattedMessage 
              id='statusForm_attention'
              defaultMessage='My situation requires attention'
            />
          </label>
        </div>
        <div className={styles.control}>
          <div className={styles.label}>
            <FormattedMessage 
              id='statusForm_projects'
              defaultMessage='Which projects will you participate in to?'
            />
            <span className={styles.projectsSaved}>{employeeProjectsSavedNotification ? 'Projektit tallennettu!' : ''}</span>
          </div>
          <div className={styles.smallButtons}>
            {projects.sort((a, b) => alphabeticalSort(a.name,b.name)).map(project =>
              <Button
                key={project.id}
                onClick={this.toggleActiveProject.bind(this, project.id)}
                active={this.state.activeProjects && this.state.activeProjects.indexOf(project.id) != -1}
                title={project.name}
                disabled={project.disabled}
                type="button"
              >
                {project.name}
              </Button>
            )}
            <AddProjectForm onSubmit={this.props.onAddNewProject} />
          </div>
        </div>

        <Button type="submit" disabled={!this.isSubmittable()} id="submitter" className="orange">
            <FormattedMessage 
              id='statusForm_sendButtonText'
              defaultMessage='SUBMIT'
            />
        </Button>
      </form>
    );
  }
}

export default injectIntl(StatusForm);