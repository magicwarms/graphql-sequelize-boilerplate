'use strict';
export default (sequelize, DataTypes) => {
    const Student_hobbies = sequelize.define('Student_hobbies', {
        studentId: DataTypes.INTEGER,
        hobbiesId: DataTypes.INTEGER
    }, {});
    Student_hobbies.associate = function (models) {
        Student_hobbies.belongsTo(models.Student, {
            foreignKey: "studentId",
            as: "student_hobbies"
        });
        Student_hobbies.belongsTo(models.Hobbies, {
          foreignKey: "hobbiesId",
          as: "hobbies_student"
        });
    };
    return Student_hobbies;
};
