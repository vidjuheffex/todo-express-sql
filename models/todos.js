'use strict';
module.exports = function(sequelize, DataTypes) {
  var todos = sequelize.define('todos', {
      item: {
	  type: DataTypes.STRING,
	  allowNull: false
      },
      details: {
	  type: DataTypes.TEXT
      },
      completed_on: {
	  type: DataTypes.DATE
      }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return todos;
};
