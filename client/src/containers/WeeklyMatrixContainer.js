import { graphql, gql, compose } from 'react-apollo';
import moment from 'moment';

import WeeklyMatrix from 'components/WeeklyMatrix';

export function getStartAndEndTimes() {
  const startTime = moment();
  const endTime = startTime.clone().subtract(25, 'weeks');

  return { startTime, endTime };
}

export const query = gql`
  query PeopleWithEntries($startYear: Int!, $startWeek: Int!, $endYear: Int!, $endWeek: Int!) {
    people {
      id
      name
      entries(startYear: $startYear, startWeek: $startWeek, endYear: $endYear, endWeek: $endWeek) {
        id
        year
        week
        message
        color
        created
      }
    }
  }
`;

export default compose(
  graphql(query, {
    options: props => {
      const { startTime, endTime } = getStartAndEndTimes();

      return {
        variables: {
          startYear: startTime.year(),
          startWeek: startTime.week(),
          endYear: endTime.year(),
          endWeek: endTime.week(),
        },
      };
    },
  }),
)(WeeklyMatrix);
