const {Rencontres} = require('./rencontres-model')

exports.createRencontre = async (body) => {
    await Rencontres.create({
        user : body.user,
        personne : body.nom,
        personneId : body.personneId,
        date : body.date,
        note : body.note,
        commentaire : body.commentaire
    })
}

exports.updateRencontre = async (body) => {
    await Rencontres.update({
        personne : body.nom,
        personneId : body.personneId,
        date : body.date,
        note : body.note,
        commentaire : body.message},
        { where: {
            id: body.id
          }
    })
}

exports.deleteRencontre = async (id) => {
    await Rencontres.destroy({
        where: {
            id: id
          }
    })
}

exports.getAllById = async (id) => {
    return await Rencontres.findAll({
        where: {
          user: id
        }
      });
}