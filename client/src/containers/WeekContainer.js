import { graphql, gql, compose } from 'react-apollo';
import { connect } from 'react-redux';

import { addProjectMutation } from '../graphql/mutations';

import Week from 'components/Week';

export default compose(
  connect(
    state => ({
      date: state.entry.date,
    }),
    {},
  ),
  graphql(
    gql`
      mutation addEntry(
        $year: Int!
        $week: Int!
        $name: String!
        $message: String!
        $color: String!
        $flagged: Boolean!
      ) {
        addEntry(
          year: $year
          week: $week
          name: $name
          message: $message
          color: $color
          flagged: $flagged
        ) {
          id
          name
        }
      }
    `,
    { name: 'addEntryMutation' },
  ),
  graphql(
    gql`
      mutation addPersonToProject($personId: Int!, $projectId: Int!) {
        addPersonToProject(personId: $personId, projectId: $projectId)
      }
    `,
    { name: 'addPersonToProjectMutation' },
  ),
  graphql(
    gql`
      mutation removePersonFromProject($personId: Int!, $projectId: Int!) {
        removePersonFromProject(personId: $personId, projectId: $projectId)
      }
    `,
    { name: 'removePersonFromProjectMutation' },
  ),
  graphql(addProjectMutation, { name: 'addProjectMutation' }),
  graphql(
    gql`
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
    `,
    {
      props: ({ ownProps, data }) => {
        const {
          addEntryMutation,
          addPersonToProjectMutation,
          removePersonFromProjectMutation,
          addProjectMutation,
        } = ownProps;

        const addEntry = (year, week, name, message, color, flagged) => {
          addEntryMutation({ variables: { year, week, name, message, color, flagged } }).then(() =>
            data.refetch(),
          );
        };

        const addPersonToProject = (personId, projectId) => {
          addPersonToProjectMutation({
            variables: { personId, projectId },
          }).then(() => data.refetch());
        };

        const removePersonFromProject = (personId, projectId) => {
          removePersonFromProjectMutation({
            variables: { personId, projectId },
          }).then(() => data.refetch());
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
    },
  ),
)(Week);
