import React, { Component } from 'react';
import moment from 'moment';

import StatusForm from 'components/StatusForm';
import StatusCounts from 'components/StatusCounts';
import StatusMessages from 'components/StatusMessages';
import localstorage from 'services/localstorage';

import styles from './style.pcss';

const isFormEnabled = (loading, date) => {
  const now = moment();

  return (
    !loading && (now.format('GGGG') == date.format('GGGG') && now.format('WW') == date.format('WW'))
  );
};

export default class Week extends Component {
  constructor(props) {
    super(props);

    const initialValues = localstorage.load();

    this.state = {
      selectedPersonId: initialValues.selectedPersonId,
    };
  }

  handleAddEntry = (message, color, flagged) => {
    const { addEntry, date, data: { people } } = this.props;

    const selectedPerson = people.find(person => person.id === this.state.selectedPersonId);

    addEntry(date.year(), date.week(), selectedPerson.name, message, color, flagged);
  };

  handleAddPersonToProject = projectId => {
    const { addPersonToProject } = this.props;

    addPersonToProject(this.state.selectedPersonId, projectId);
  };

  handleRemovePersonFromProject = projectId => {
    const { removePersonFromProject } = this.props;

    removePersonFromProject(this.state.selectedPersonId, projectId);
  };

  handleChangePerson = personId => {
    const selectedPersonId = personId ? parseInt(personId, 10) : null;

    this.setState({
      selectedPersonId,
    });

    localstorage.save({
      selectedPersonId,
    });
  };

  handleChangeValue = value => {
    localstorage.save(value);
  };

  handleAddProject = name => {
    const { addProject } = this.props;

    addProject(name);
  };

  render() {
    const {
      date,
      data: { loading, people, projects, entries },
      employeeProjectsSavedNotification, // TODO
    } = this.props;

    if (loading) {
      return null;
    }

    const selectedPerson = people.find(person => person.id === this.state.selectedPersonId);

    return (
      <div>
        <StatusForm
          initialValues={localstorage.load()}
          enabled={isFormEnabled(loading, date)}
          date={date}
          people={people}
          projects={projects}
          selectedPerson={selectedPerson}
          onChangePerson={this.handleChangePerson}
          onChangeValue={this.handleChangeValue}
          onAddPersonToProject={this.handleAddPersonToProject}
          onRemovePersonFromProject={this.handleRemovePersonFromProject}
          employeeProjectsSavedNotification={employeeProjectsSavedNotification}
          onAddEntry={this.handleAddEntry}
          onAddProject={this.handleAddProject}
        />

        <StatusCounts entries={entries} />

        <StatusMessages entries={entries.slice().reverse()} />
      </div>
    );
  }
}
