import { gql } from 'react-apollo';

export const addProjectMutation = gql`
  mutation addProject($name: String!) {
    addProject(name: $name) {
      id
      name
    }
  }
`;

export const deleteProjectMutation = gql`
  mutation deleteProject($id: Int!) {
    deleteProject(id: $id)
  }
`;

export const addPerson = gql`
  mutation addPerson($name: String!) {
    addPerson(name: $name) {
      id
      name
    }
  }
`;

export const deletePerson = gql`
  mutation deletePerson($id: Int!) {
    deletePerson(id: $id)
  }
`;

export const addPersonToProjectMutation = gql`
  mutation addPersonToProject($personId: Int!, $projectId: Int!) {
    addPersonToProject(personId: $personId, projectId: $projectId) {
      person {
        id
        name
      }
      project {
        id
        name
      }
    }
  }
`;

export const removePersonFromProjectMutation = gql`
  mutation removePersonFromProject($personId: Int!, $projectId: Int!) {
    removePersonFromProject(personId: $personId, projectId: $projectId) {
      person {
        id
        name
      }
      project {
        id
        name
      }
    }
  }
`;

export const addEntryMutation = gql`
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
      year
      week
      name
      message
      created
      color
      flagged
    }
  }
`;
