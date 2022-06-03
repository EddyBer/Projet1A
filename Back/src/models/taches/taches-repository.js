const {Taches} = require('./taches-model')

exports.createTaches = async (body) => {
    await Taches.create({
        libelle    : body.libelle,
        datedeb    : body.datedeb,
        heuredeb   : body.heuredeb,
        datefin    : body.datefin,
        heurefin   : body.heurefin,
        avancement : body.avancement
    })
}

exports.updateTask = async (body) => {
    console.log(body)
    await Taches.update({
        libelle   : body.libelle,
        datedeb   : body.nom,
        heuredeb  : body.personneId,
        datefin   : body.date,
        heurefin  : body.note},
        { where: {
            id: body.id
          }
    })
}

exports.deleteTaches= async (id) => {
    await Taches.destroy({
        where: {
            id: id
          }
    })
}

exports.getByDate = async (date) => {
    return await Taches.findOne({
        where: {
            datedeb:date
        }
    })
}

exports.getById= async (id) => {
    return await Taches.findByPk(id)
}

exports.getAll = async (id) => {
    return await Taches.findAll()
}