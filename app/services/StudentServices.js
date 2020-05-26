import _ from "lodash";
import * as fill from "./format-data/fill";
import redisClient from "../../config/redis";

const Student = require('../../models').default.Student;
const Hobbies = require('../../models').default.Hobbies;
const Student_hobbies = require('../../models').default.Student_hobbies;

export async function getStudentById(studentId) {
    let getStudent = await redisClient.get(studentId);
    if (!_.isEmpty(getStudent)){
        getStudent = JSON.parse(getStudent);
        getStudent.hobbies = fill.studentHobbies(getStudent);
        return getStudent;
    }
    getStudent = await Student.findOne({
        include: [{
            model: Student_hobbies,
            as: "student_hobbies",
            include: [{
                model: Hobbies,
                as: "hobbies_student"
            }]
        }],
        where: {
            id: studentId
        }
    });
    if (_.isEmpty(getStudent)) {
        return null;
    }
    getStudent.hobbies = fill.studentHobbies(getStudent);
    await redisClient.setex(studentId, 3600, JSON.stringify(getStudent));
    return getStudent;
}

export async function getAllStudents() {
    let listStudents = await redisClient.get("listStudents");
    if (!_.isEmpty(listStudents)) {
        return JSON.parse(listStudents);
    }
    listStudents = await Student.findAll({
        include: [{
            model: Student_hobbies,
            as: "student_hobbies",
            include: [{
                model: Hobbies,
                as: "hobbies_student"
            }]
        }]
    });
    if (_.isEmpty(listStudents)) {
        return [];
    }
    const result = fill.studentHobbies(listStudents, true);
    await redisClient.setex("listStudents", 3600, JSON.stringify(result));
    return result;
}

export async function createStudent(data) {
    const student = await Student.create({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email
    });
    const hobbies = data.hobbyList;
    for (let i = 0; i < hobbies.length; i++) {
        const item = hobbies[i];
        await Student_hobbies.create({
            studentId: student.id,
            hobbiesId: item.id
        });
    }
    return getStudentById(student.id);
}