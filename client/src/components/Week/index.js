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

    props.changeSelectedPerson(initialValues.selectedPersonId);
  }

  handleAddEntry = (message, color, flagged) => {
    const { addEntry, date, selectedPersonId, data: { people } } = this.props;

    const selectedPerson = people.find(person => person.id === selectedPersonId);

    addEntry(date.year(), date.week(), selectedPerson.name, message, color, flagged);
  };

  handleAddPersonToProject = projectId => {
    const { addPersonToProject } = this.props;

    addPersonToProject(projectId);
  };

  handleRemovePersonFromProject = projectId => {
    const { removePersonFromProject } = this.props;

    removePersonFromProject(projectId);
  };

  handleChangePerson = personId => {
    const { changeSelectedPerson } = this.props;

    const selectedPersonId = personId ? parseInt(personId, 10) : null;

    localstorage.save({
      selectedPersonId,
    });

    changeSelectedPerson(selectedPersonId);
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
      selectedPersonId,
      data: { loading, people, projects, entries },
      projectsSavedNotification,
    } = this.props;

    if (loading) {
      return null;
    }

    const selectedPerson = people.find(person => person.id === selectedPersonId);

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
          projectsSavedNotification={projectsSavedNotification}
          onAddEntry={this.handleAddEntry}
          onAddProject={this.handleAddProject}
        />

        <StatusCounts entries={entries} />

        <StatusMessages entries={entries.slice().reverse()} />
      </div>
    );
  }
}
