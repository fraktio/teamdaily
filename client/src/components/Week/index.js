import React from 'react';
import moment from 'moment';
import WeekSelection from 'components/WeekSelection';
import StatusForm from 'components/StatusForm';
import StatusCounts from 'components/StatusCounts';
import StatusMessages from 'components/StatusMessages';
import localstorage from 'services/localstorage';
import styles from './style.pcss';

const isFormEnabled = (loading, date) => {
  const now = moment();

  return !loading && (
    now.format('GGGG') == date.format('GGGG') &&
    now.format('WW') == date.format('WW')
  );
};

export default ({
  date,
  now,
  entries,
  entryActions,
  employeeProjectActions,
  employees,
  projects,
  projectActions,
  employeeProjectsSavedNotification,
  loading
}) => (
  <div>

    <StatusForm
      initialValues={localstorage.load()}
      enabled={isFormEnabled(loading, date)}
      now={now}
      d={date}
      employees={employees}
      projects={projects}
      employeeProjectActions={employeeProjectActions}
      employeeProjectsSavedNotification={employeeProjectsSavedNotification}
      onSubmit={entryActions.addEntry}
      onAddNewProject={projectActions.addProject}
    />
    <StatusCounts messages={entries} />
    <StatusMessages messages={entries} />
  </div>
);
