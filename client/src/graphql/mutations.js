import { gql } from 'react-apollo';

export const addProjectMutation = gql`
  mutation addProject($name: String!) {
    addProject(name: $name) {
      id
      name
    }
  }
`;
