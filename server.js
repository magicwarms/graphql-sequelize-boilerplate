import express from 'express';
import dotenv from 'dotenv';
import { graphql } from "body-parser-graphql";
import {
    ApolloServer,
    AuthenticationError
} from 'apollo-server-express';

dotenv.config();

import typeDefs from './schema/typeDefs';
import resolvers from './schema/resolvers';
const server = new ApolloServer({
    typeDefs,
    resolvers,
    cacheControl: {
        defaultMaxAge: 10,
    },
    introspection: process.env.APP_ENV == "production" ? false : true,
    playground: process.env.APP_ENV == "production" ? false : true,
    context:({req}) => {
        const apiKey = req.headers.apikey || '';
        if (process.env.APP_ENV == "production"){
            if (apiKey !== process.env.API_KEY) throw new AuthenticationError('Invalid API Key');
        }
        return req;
    },
    tracing: process.env.APP_ENV == "production" ? false : true
});

const app = express();
app.use(graphql());
server.applyMiddleware({
    app,
    path: "/graph-private"
});

const port = parseInt(process.env.PORT);

app.listen({ port: port }, () =>
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);