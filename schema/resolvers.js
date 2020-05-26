import {StudentResolvers} from "../app/controllers/StudentController";
import {HobbiesResolvers} from "../app/controllers/HobbiesController";

// import path from 'path';
// import fs from 'fs';

//joining path of directory 
// const directoryPath = path.join(__dirname, '../app/controllers');
// const files = fs.readdirSync(directoryPath);

// let resolvers = '';
// files.forEach(function (file) {
//     resolvers = fs.readFileSync(`${process.cwd()}/app/controllers/HobbiesController.js`, 'utf8');
// });

// let module_holder = {};
// function LoadModules(path) {
//     fs.lstat(path, function (err, stat) {
//         if (stat.isDirectory()) {
//             // we have a directory: do a tree walk
//             fs.readdir(path, function (err, files) {
//                 var f, l = files.length;
//                 for (var i = 0; i < l; i++) {
//                     f = path_module.join(path, files[i]);
//                     LoadModules(f);
//                 }
//             });
//         } else {
//             // we have a file: load it
//             require(path)(module_holder);
//         }
//     });
// }

// let DIR = path_module.join(__dirname, 'lib', 'api');
// console.log(LoadModules(DIR))

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