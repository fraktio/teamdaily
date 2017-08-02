import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Person {
  id: Int
  name: String
  projects: [Project]
  entries(startYear: Int!, startWeek: Int!, endYear: Int!, endWeek: Int!): [Entry]
}

type Project {
  id: Int
  name: String
  people: [Person]
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
  people: [Person]
  person(name: String): Person

  projects: [Project]
  project(name: String): Project

  entries(startYear: Int!, startWeek: Int!, endYear: Int!, endWeek: Int!): [Entry]
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

  addPersonToProject(personId: Int!, projectId: Int!): Int
  removePersonFromProject(personId: Int!, projectId: Int!): Int
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
