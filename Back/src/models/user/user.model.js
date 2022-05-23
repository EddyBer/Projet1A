const { DataTypes } = require('sequelize');
const {sequelize} = require('../db')
const {Rencontres} = require('../Rencontres/rencontres-model')
const {Personnes} = require('../personnes/personnes-model')

exports.User = sequelize.define('USER', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey:true,
    defaultValue: DataTypes.UUIDV4
  },
  pseudo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique : true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  gender: {
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
  },
  roles: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue : "MEMBER"
  }
}, {
    freezeTableName:true
});

this.User.hasMany(Personnes, {
    foreignKey: 'user'
})
this.User.hasMany(Rencontres, {
    foreignKey: 'user'
})
