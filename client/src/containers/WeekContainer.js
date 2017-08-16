import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';

import {
  addProjectMutation,
  addPersonToProjectMutation,
  removePersonFromProjectMutation,
  addEntryMutation,
} from '../graphql/mutations';
import { displayProjectsSavedNotification, changeSelectedPerson } from '../ducks/employeeProjects';

import Week from 'components/Week';

import { query as peopleViewQuery } from './PeopleViewContainer';
import { query as projectViewQuery } from './ProjectViewContainer';
import { query as weeklyMatrixQuery, getStartAndEndTimes } from './WeeklyMatrixContainer';

const query = gql`
  query PeopleWithProjectsAndProjectsAndEntries($year: Int!, $week: Int!) {
    people {
      id
      name
      projects {
        id
      }
    }
    projects {
      id
      name
    }
    entries(startYear: $year, startWeek: $week, endYear: $year, endWeek: $week) {
      name
      message
      color
      created
    }
  }
`;

function updateStore(proxy, query, variables, callback) {
  try {
    const data = proxy.readQuery({ query, variables });

    callback(data);

    proxy.writeQuery({ query, variables, data });
  } catch (e) {
    // This is pretty bad. `proxy.readQuery` throws an exception if the query has not been
    // exececuted previously. This can potentially hide some bugs.
  }
}

function getYearAndWeek(props) {
  const { date } = props;

  const year = date.year();
  const week = date.week();

  return { year, week };
}

export default compose(
  connect(
    state => ({
      date: state.entry.date,
      projectsSavedNotification: state.employeeProjects.get('projectsSavedNotification'),
      selectedPersonId: state.employeeProjects.get('selectedPersonId'),
    }),
    {
      displayProjectsSavedNotification,
      changeSelectedPerson,
    },
  ),
  graphql(addEntryMutation, {
    name: 'addEntryMutation',
    options: props => {
      const { selectedPersonId } = props;

      const variables = getYearAndWeek(props);
      const { startTime, endTime } = getStartAndEndTimes();

      return {
        update: (proxy, { data: { addEntry } }) => {
          updateStore(proxy, query, variables, data => {
            data.entries.unshift(addEntry);
          });

          updateStore(proxy, peopleViewQuery, variables, data => {
            data.people.forEach(person => {
              if (person.id === selectedPersonId) {
                person.entries.unshift(addEntry);
              }
            });
          });

          updateStore(proxy, projectViewQuery, variables, data => {
            data.projects.forEach(project => {
              project.people.forEach(person => {
                if (person.id === selectedPersonId) {
                  person.entries.unshift(addEntry);
                }
              });
            });
          });

          updateStore(
            proxy,
            weeklyMatrixQuery,
            {
              startYear: startTime.year(),
              startWeek: startTime.week(),
              endYear: endTime.year(),
              endWeek: endTime.week(),
            },
            data => {
              data.people.forEach(person => {
                if (person.id === selectedPersonId) {
                  person.entries.unshift(addEntry);
                }
              });
            },
          );
        },
      };
    },
  }),
  graphql(addPersonToProjectMutation, {
    name: 'addPersonToProjectMutation',
    options: props => {
      const variables = getYearAndWeek(props);

      return {
        update: (proxy, { data: { addPersonToProject } }) => {
          updateStore(proxy, projectViewQuery, variables, data => {
            data.projects
              .find(project => project.id === addPersonToProject.project.id)
              .people.push(addPersonToProject.person);
          });

          updateStore(proxy, query, variables, data => {
            data.people
              .find(person => person.id === addPersonToProject.person.id)
              .projects.push(addPersonToProject.project);
          });
        },
      };
    },
  }),
  graphql(removePersonFromProjectMutation, {
    name: 'removePersonFromProjectMutation',
    options: props => {
      const variables = getYearAndWeek(props);

      return {
        update: (proxy, { data: { removePersonFromProject } }) => {
          updateStore(proxy, projectViewQuery, variables, data => {
            const project = data.projects.find(
              project => project.id === removePersonFromProject.project.id,
            );

            project.people = project.people.filter(
              person => person.id !== removePersonFromProject.person.id,
            );
          });

          updateStore(proxy, query, variables, data => {
            const person = data.people.find(
              person => person.id === removePersonFromProject.person.id,
            );

            person.projects = person.projects.filter(
              project => project.id !== removePersonFromProject.project.id,
            );
          });
        },
      };
    },
  }),
  graphql(addProjectMutation, {
    name: 'addProjectMutation',
    options: props => {
      const variables = getYearAndWeek(props);

      return {
        update: (proxy, { data: { addProject } }) => {
          updateStore(proxy, query, variables, data => {
            data.projects.push(addProject);

            data.projects = sortBy(data.projects, project => project.name.toLowerCase());
          });
        },
      };
    },
  }),
  graphql(query, {
    props: ({ ownProps, data }) => {
      const {
        selectedPersonId,
        addEntryMutation,
        addPersonToProjectMutation,
        removePersonFromProjectMutation,
        addProjectMutation,
        displayProjectsSavedNotification,
      } = ownProps;

      const addEntry = (year, week, name, message, color, flagged) => {
        addEntryMutation({ variables: { year, week, name, message, color, flagged } });
      };

      const addPersonToProject = projectId => {
        addPersonToProjectMutation({
          variables: { personId: selectedPersonId, projectId },
        }).then(displayProjectsSavedNotification);
      };

      const removePersonFromProject = projectId => {
        removePersonFromProjectMutation({
          variables: { personId: selectedPersonId, projectId },
        }).then(displayProjectsSavedNotification);
      };

      const addProject = name => {
        return addProjectMutation({ variables: { name } });
      };

      return { data, addEntry, addPersonToProject, removePersonFromProject, addProject };
    },
    options: props => {
      return { variables: getYearAndWeek(props) };
    },
  }),
)(Week);
