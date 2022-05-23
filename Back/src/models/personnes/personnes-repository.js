const { Personnes } = require('./personnes-model');

exports.createPersonne = async (body) => {
    await Personnes.create({
        user : body.user,
        firstName : body.prenom,
        lastName : body.nom,
        birthdate : body.date,
        gender : body.gender
    })
}

exports.deletePersonne = async (id) => {
    await Personnes.destroy({
        where: {
            id: id
          }
    })
}

exports.updatePersonne = async (body) => {
    await Personnes.update({
        firstName : body.prenom,
        lastName : body.nom,
        birthdate : body.date,
        gender : body.gender},
        { where: {
            id: body.id
          }
    })
}

exports.getAllById = async (id) => {
    return await Personnes.findAll({
        where: {
          user: id
        }
      });
}