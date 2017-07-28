import { graphql, gql, compose } from 'react-apollo';

import AdminView from '../components/AdminView/AdminView';

export default compose(
  graphql(
    gql`
      mutation addProject($name: String!) {
        addProject(name: $name) {
          id
          name
        }
      }
    `,
    { name: 'addProjectMutation' },
  ),
  graphql(
    gql`
      mutation deleteProject($id: Int!) {
        deleteProject(id: $id)
      }
    `,
    { name: 'deleteProjectMutation' },
  ),
  graphql(
    gql`
      mutation addPerson($name: String!) {
        addPerson(name: $name) {
          id
          name
        }
      }
    `,
    { name: 'addPersonMutation' },
  ),
  graphql(
    gql`
      mutation deletePerson($id: Int!) {
        deletePerson(id: $id)
      }
    `,
    { name: 'deletePersonMutation' },
  ),
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
