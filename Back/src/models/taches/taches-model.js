
const { DataTypes } = require('sequelize');
const {sequelize} = require('../db')

exports.Taches = sequelize.define('TACHES', {
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    primaryKey:true,
    defaultValue: DataTypes.UUIDV4
  },
  libelle : {
    type: DataTypes.STRING,
    allowNull: false
  },
  datedeb: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  heuredeb: {
    type: DataTypes.TIME,
    allowNull: true
  },
  datefin: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  heurefin: {
    type: DataTypes.TIME,
    allowNull: true
  },
  avancement:{
    type: DataTypes.INTEGER,
    allowNull:true
  }
}, {
    freezeTableName:true
});