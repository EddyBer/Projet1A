
const { DataTypes } = require('sequelize');
const {sequelize} = require('../db')
const {User} = require('../user/user.model')

exports.Rencontres = sequelize.define('RENCONTRES', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey:true,
    defaultValue: DataTypes.UUIDV4
  },
  user : {
    type: DataTypes.UUID,
    allowNull: false
  },
  personne : {
    type: DataTypes.STRING,
    allowNull: false
  },
  personneId : {
    type: DataTypes.UUID,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue : 0
  },
  commentaire : {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
    freezeTableName:true
});