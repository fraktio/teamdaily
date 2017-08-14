import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import {
  addProjectMutation,
  addPersonToProjectMutation,
  removePersonFromProjectMutation,
  addEntryMutation,
} from '../graphql/mutations';
import { displayProjectsSavedNotification } from '../ducks/employeeProjects';

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

export default compose(
  connect(
    state => ({
      date: state.entry.date,
      projectsSavedNotification: state.employeeProjects.get('projectsSavedNotification'),
    }),
    {
      displayProjectsSavedNotification,
    },
  ),
  graphql(addEntryMutation, {
    name: 'addEntryMutation',
    options: props => {
      const { date } = props;

      const year = date.year();
      const week = date.week();

      const variables = { year, week };

      const { startTime, endTime } = getStartAndEndTimes();

      return {
        refetchQueries: [
          {
            query: peopleViewQuery,
            variables,
          },
          {
            query: projectViewQuery,
            variables,
          },
          {
            query: weeklyMatrixQuery,
            variables: {
              startYear: startTime.year(),
              startWeek: startTime.week(),
              endYear: endTime.year(),
              endWeek: endTime.week(),
            },
          },
        ],

        update: (proxy, { data: { addEntry } }) => {
          const data = proxy.readQuery({ query, variables });

          data.entries.unshift(addEntry);

          proxy.writeQuery({ query, variables, data });
        },
      };
    },
  }),
  graphql(addPersonToProjectMutation, { name: 'addPersonToProjectMutation' }),
  graphql(removePersonFromProjectMutation, { name: 'removePersonFromProjectMutation' }),
  graphql(addProjectMutation, { name: 'addProjectMutation' }),
  graphql(query, {
    props: ({ ownProps, data }) => {
      const {
        addEntryMutation,
        addPersonToProjectMutation,
        removePersonFromProjectMutation,
        addProjectMutation,
        displayProjectsSavedNotification,
      } = ownProps;

      const addEntry = (year, week, name, message, color, flagged) => {
        addEntryMutation({ variables: { year, week, name, message, color, flagged } });
      };

      const addPersonToProject = (personId, projectId) => {
        addPersonToProjectMutation({
          variables: { personId, projectId },
        })
          .then(() => data.refetch())
          .then(displayProjectsSavedNotification);
      };

      const removePersonFromProject = (personId, projectId) => {
        removePersonFromProjectMutation({
          variables: { personId, projectId },
        })
          .then(() => data.refetch())
          .then(displayProjectsSavedNotification);
      };

      const addProject = name => {
        return addProjectMutation({ variables: { name } }).then(() => data.refetch());
      };

      return { data, addEntry, addPersonToProject, removePersonFromProject, addProject };
    },
    options: props => {
      const { date } = props;

      const year = date.year();
      const week = date.week();

      return { variables: { year, week } };
    },
  }),
)(Week);
