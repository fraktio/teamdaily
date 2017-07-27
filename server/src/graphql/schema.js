import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = `
type Person {
  id: Int
  name: String
  projects: [Project]
}

type Project {
  id: Int
  name: String
}

type Query {
  people: [Person]
  person(name: String): Person
  projects: [Project]
  project(name: String): Project
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
