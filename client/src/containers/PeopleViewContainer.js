import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import PeopleView from '../components/PeopleView/PeopleView';
import { prevWeek, nextWeek, setWeek } from 'ducks/entry';

export const query = gql`
  query PeopleWithProjectsAndEntries($year: Int!, $week: Int!) {
    people {
      id
      name
      projects {
        id
        name
      }
      entries(startYear: $year, startWeek: $week, endYear: $year, endWeek: $week) {
        id
        name
        message
        created
        color
        flagged
      }
    }
  }
`;

export default compose(
  connect(
    state => ({
      date: state.entry.date,
    }),
    {
      prevWeek,
      nextWeek,
      setWeek,
    },
  ),
  graphql(query, {
    options: props => {
      const { date } = props;

      const year = date.year();
      const week = date.week();

      return {
        variables: { year, week },
      };
    },
  }),
)(PeopleView);
