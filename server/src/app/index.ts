import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";

export async function initServer() {
  const app = express();

  //Body parser middleware to parse incoming request bodies
  // To solve this error:- `req.body` is not set; this probably means you forgot to set up the `json` middleware before the Apollo Server middleware.
  app.use(bodyParser.json());

  //Graphql server
  const graphqlServer = new ApolloServer({
    typeDefs: `
    type Query{
      sayHello:String
    }
    `,
    resolvers: {
      Query: {
        sayHello: () => "Hello from Graphql Server",
      },
    },
  });

  await graphqlServer.start();

  app.use("/graphql", expressMiddleware(graphqlServer));

  return app;
}
