import { graphql, gql, compose } from 'react-apollo';
import Week from 'components/Week';

export default compose(
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
  {
    props: ({ ownProps, data }) => {
      const { addEntryMutation } = ownProps;

      const addEntry = (year, week, name, message, color, flagged) => {
        addEntryMutation({ variables: { year, week, name, message, color, flagged } }).then(() =>
          data.refetch(),
        );
      };

      return { data, addEntry };
    },
  },
)(Week);
