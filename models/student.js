'use strict';
export default (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    }, {});
  Student.associate = function(models) {
    Student.hasMany(models.Student_hobbies, {
      foreignKey: "studentId",
      as: "student_hobbies"
    });
  };
  return Student;
};
