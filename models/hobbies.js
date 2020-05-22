'use strict';
export default (sequelize, DataTypes) => {
  const Hobbies = sequelize.define('Hobbies', {
    title: DataTypes.STRING
  }, {});
  Hobbies.associate = function(models) {
    Hobbies.hasMany(models.Student_hobbies, {
      foreignKey: 'hobbiesId',
      as: 'hobbies_student'
    });
  };
  return Hobbies;
};
