import { graphql, gql, compose } from 'react-apollo';

import {
  addProjectMutation,
  deleteProjectMutation,
  addPerson,
  deletePerson,
} from '../graphql/mutations';

import AdminView from '../components/AdminView/AdminView';

export default compose(
  graphql(addProjectMutation, { name: 'addProjectMutation' }),
  graphql(deleteProjectMutation, { name: 'deleteProjectMutation' }),
  graphql(addPerson, { name: 'addPersonMutation' }),
  graphql(deletePerson, { name: 'deletePersonMutation' }),
  graphql(
    gql`
      query ProjectsAndPeople {
        projects {
          id
          name
        }
        people {
          id
          name
        }
      }
    `,
    {
      props: ({ ownProps, data }) => {
        const {
          addProjectMutation,
          deleteProjectMutation,
          addPersonMutation,
          deletePersonMutation,
        } = ownProps;

        const addProject = name => {
          return addProjectMutation({ variables: { name } }).then(() => data.refetch());
        };

        const deleteProject = id => {
          deleteProjectMutation({ variables: { id } }).then(() => data.refetch());
        };

        const addPerson = name => {
          return addPersonMutation({ variables: { name } }).then(() => data.refetch());
        };

        const deletePerson = id => {
          deletePersonMutation({ variables: { id } }).then(() => data.refetch());
        };

        return { data, addProject, deleteProject, addPerson, deletePerson };
      },
    },
  ),
)(AdminView);
