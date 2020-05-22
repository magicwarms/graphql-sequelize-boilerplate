import {
    gql
} from 'apollo-server-express';
import path from 'path';
import fs from 'fs';

// import Student from './graphql/student.graphql';
// import Hobbies from './graphql/hobbies.graphql';

// module.exports = gql `
//   type Query
//   type Mutation
//   ${Student},
//   ${Hobbies}
// `;

//joining path of directory 
const directoryPath = path.join(__dirname, 'graphql');
const files = fs.readdirSync(directoryPath);
let contents = '';
files.forEach(function (file) {
    contents += fs.readFileSync(`${__dirname}/graphql/${file}`, 'utf8') + ',\n';
});

module.exports = gql `
    type Query
    type Mutation
    ${contents}
`;