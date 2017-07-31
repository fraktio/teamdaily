import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import ProjectView from '../components/ProjectView/ProjectView';

export default compose(
  connect(
    state => ({
      date: state.entry.date,
    }),
    {},
  ),
  graphql(
    gql`
      query ProjectsWithPeopleAndEntries($year: Int!, $week: Int!) {
        projects {
          id
          name
          people {
            id
            name
            entries(startYear: $year, startWeek: $week, endYear: $year, endWeek: $week) {
              color
            }
          }
        }
      }
    `,
    {
      options: props => {
        const { date } = props;

        const year = date.year();
        const week = date.week();

        return { variables: { year, week } };
      },
    },
  ),
)(ProjectView);
