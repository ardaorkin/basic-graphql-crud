import { buildSchema } from "graphql";

const schemas = buildSchema(`
input PersonInput {
  name: String
  age: String
}

type Person {
  id: String
  name: String
  age: String
}

type Query {
    getAllPersons: [Person]
}

type Mutation {
  createPerson(input: PersonInput): [Person]
  updatePerson(id: String!, input: PersonInput): [Person]
  deletePerson(id: String!): [Person]
}
`);
export default schemas;
