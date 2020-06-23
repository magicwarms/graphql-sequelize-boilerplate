import path from "path";
import {
    mergeTypeDefs,
    mergeResolvers,
    loadFilesSync
} from "graphql-tools";

// buat graphql
const typeDefsArray = loadFilesSync(
    path.join(__dirname, `./graphql/*.graphql`)
);

export const typeDefs = mergeTypeDefs(typeDefsArray, {
    all: true
});

// buat resolvers
const resolversArray = loadFilesSync(
    path.join(__dirname, `../app/controllers/*.js`)
);

export const resolvers = mergeResolvers(resolversArray);