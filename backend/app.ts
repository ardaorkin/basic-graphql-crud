import express from "express";
import { graphqlHTTP } from "express-graphql";
import schema from "./schemas";
import cors from "cors";
import * as queries from "./queries";
const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      ...queries,
    },
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
