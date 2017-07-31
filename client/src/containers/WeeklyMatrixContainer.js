import { graphql, gql, compose } from 'react-apollo';
import moment from 'moment';

import WeeklyMatrix from 'components/WeeklyMatrix';

export default compose(
  graphql(
    gql`
      query PeopleWithEntries($startYear: Int!, $startWeek: Int!, $endYear: Int!, $endWeek: Int!) {
        people {
          id
          name
          entries(
            startYear: $startYear
            startWeek: $startWeek
            endYear: $endYear
            endWeek: $endWeek
          ) {
            id
            year
            week
            message
            color
            created
          }
        }
      }
    `,
    {
      options: props => {
        const now = moment();
        const end = now.clone().subtract(25, 'weeks');

        return {
          variables: {
            startYear: now.year(),
            startWeek: now.week(),
            endYear: end.year(),
            endWeek: end.week(),
          },
        };
      },
    },
  ),
)(WeeklyMatrix);
