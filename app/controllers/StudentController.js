import * as studentServices from "../services/StudentServices";

export default {
    Query: {
        getStudentById: async(root, args, context) => {
            const getStudent = await studentServices.getStudentById(args.id);
            return getStudent;
        },
        getAllStudents: async (root, args, context) => {
            const listStudents = await studentServices.getAllStudents();
            return listStudents;
        }
    },
    Mutation: {
        createStudent: async (root, args, context) => {
            const data = {
                firstName: args.firstName,
                lastName: args.lastName,
                email: args.email,
                hobbyList: args.hobbyList
            }
            return await studentServices.createStudent(data);
        }
    }
}