const { DataTypes } = require('sequelize');
const {sequelize} = require('../db');
const { Taches } = require('../taches/taches-model');

exports.User = sequelize.define('USER', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey:true,
    defaultValue: DataTypes.UUIDV4
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique : true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    freezeTableName:false
});

// this.User.hasMany(Taches, {
//     foreignKey:'user'
// })
