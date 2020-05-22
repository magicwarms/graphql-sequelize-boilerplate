import {StudentResolvers} from "../app/controllers/StudentController";
import {HobbiesResolvers} from "../app/controllers/HobbiesController";

import path from 'path';
import fs from 'fs';

//joining path of directory 
const directoryPath = path.join(__dirname, '../app/controllers');
console.log(directoryPath)
const files = fs.readdirSync(directoryPath);
let contents = '';
files.forEach(function (file) {
    contents += fs.readFileSync(`${__dirname}/graphql/${file}`, 'utf8') + ',\n';
});

const resolvers = {
    Query: {
        ...StudentResolvers.Query,
        ...HobbiesResolvers.Query
    },
    Mutation: {
        ...StudentResolvers.Mutation,
        ...HobbiesResolvers.Mutation
    }
};

export default resolvers