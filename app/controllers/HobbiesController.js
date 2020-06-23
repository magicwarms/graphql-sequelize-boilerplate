import _ from "lodash";

const Hobbies = require('../../models').default.Hobbies;

export default {
    Query: {
        getAllHobbies: async (root, args, context) => {
            const hobbies = await Hobbies.findAll();
            if (_.isEmpty(hobbies)) {
                return [];
            }
            return hobbies;
        }
    },
    Mutation: {
        createHobbies: async (root, args, context) => {
            const hobby = await Hobbies.create({
                title: args.title
            });
            return hobby;
        }
    }
}