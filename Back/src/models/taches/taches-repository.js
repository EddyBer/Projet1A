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

exports.updateTaches = async (body) => {
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
    let newDate = new Date(date)
    newDate.setHours(00)
    console.log(newDate)
    return await Taches.findOne({
        where: {
            datedeb:newDate
        }
    })
}

exports.getAll = async (id) => {
    return await Taches.findAll()
}