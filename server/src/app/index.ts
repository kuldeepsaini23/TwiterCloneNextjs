import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import bodyParser from "body-parser";
import { User } from "./user";
import { Tweet } from "./tweet";
import cors from "cors";
import { GraphqlContext } from "./interfaces";
import JWTService from "./services/jwt";

export async function initServer() {
  const app = express();

  //Body parser middleware to parse incoming request bodies
  // To solve this error:- `req.body` is not set; this probably means you forgot to set up the `json` middleware before the Apollo Server middleware.
  app.use(bodyParser.json());
  app.use(cors());
  //Graphql server
  const graphqlServer = new ApolloServer<GraphqlContext>({
    typeDefs: `
    ${User.types}
    ${Tweet.types}

    type Query{
      ${User.queries}
      ${Tweet.queries}
    }

    type Mutation{
      ${Tweet.mutations}
      ${User.mutations}
    }
    `,
    resolvers: {
      Query: {
        ...User.resolver.queries,
        ...Tweet.resolvers.queries,
      },

      Mutation:{
        ...Tweet.resolvers.mutations,
        ...User.resolver.mutations
      },
      ...Tweet.resolvers.extraResolvers,
      ...User.resolver.extraResolvers
    },
  });

  await graphqlServer.start();

  app.use(
    "/graphql",
    expressMiddleware(graphqlServer, {
      context: async ({ req, res }) => {
        return {
          user: req.headers.authorization
            ? JWTService.decodeToken(req.headers.authorization.split(" ")[1])
            : undefined,
        };
      },
    })
  );

  return app;
}
