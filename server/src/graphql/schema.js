import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Person {
  id: Int
  name: String
  projects: [Project]!
  entries(startYear: Int!, startWeek: Int!, endYear: Int!, endWeek: Int!): [Entry]!
}

type Project {
  id: Int
  name: String
  people: [Person]!
}

type Entry {
  id: Int
  year: Int
  week: Int
  name: String
  message: String
  created: String
  color: String
  flagged: Boolean
}

type Query {
  people: [Person]!

  projects: [Project]!

  entries(startYear: Int!, startWeek: Int!, endYear: Int!, endWeek: Int!): [Entry]!
}

type Mutation {
  addProject(name: String!): Project
  deleteProject(id: Int!): Int

  addPerson(name: String!): Person
  deletePerson(id: Int!): Int

  addEntry(
    year: Int!
    week: Int!
    name: String!
    message: String!
    color: String!
    flagged: Boolean!
  ): Entry

  addPersonToProject(personId: Int!, projectId: Int!): AddPersonToProjectOutput
  removePersonFromProject(personId: Int!, projectId: Int!): RemovePersonFromProjectOutput
}

type AddPersonToProjectOutput {
  person: Person
  project: Project
}

type RemovePersonFromProjectOutput {
  person: Person
  project: Project
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
