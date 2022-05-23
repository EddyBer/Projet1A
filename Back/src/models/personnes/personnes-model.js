const { DataTypes } = require('sequelize');
const {sequelize} = require('../db')
const {Rencontres} = require('../Rencontres/rencontres-model')

exports.Personnes = sequelize.define('PERSONNES', {
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
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gender: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
    freezeTableName:true
});

this.Personnes.hasMany(Rencontres, {
    foreignKey : 'personneId'
})