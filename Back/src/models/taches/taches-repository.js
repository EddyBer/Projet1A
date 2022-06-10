const { sequelize } = require('../db')
const {Taches} = require('./taches-model')

exports.createTaches = async (body) => {
    await Taches.create({
        user       : body.user,
        libelle    : body.libelle,
        datedeb    : body.datedeb,
        heuredeb   : body.heuredeb,
        datefin    : body.datefin,
        heurefin   : body.heurefin,
        avancement : body.avancement
    })
}

exports.updateTask = async (body) => {
    await Taches.update({
        user       : body.user,
        libelle    : body.libelle,
        datedeb    : body.datedeb,
        heuredeb   : body.heuredeb,
        datefin    : body.datefin,
        heurefin   : body.heurefin,
        avancement : body.avancement},
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
    
    return await sequelize.query(`SELECT * FROM "TACHES" WHERE (DATEDEB <= '${date}' AND DATEFIN >= '${date}') OR (DATEDEB = '${date}' AND DATEFIN = '${date}')`)

}

exports.getConflict = async (body) => {
    return await sequelize.query(`SELECT * FROM "TACHES" WHERE (DATEDEB BETWEEN '${body.datedeb}' AND '${body.datefin}' OR DATEFIN BETWEEN '${body.datedeb}' AND '${body.datefin}') AND (HEUREDEB BETWEEN '${body.heuredeb}' AND '${body.heurefin}' OR HEUREFIN BETWEEN '${body.heuredeb}' AND '${body.heurefin}')`)
}

exports.getById= async (id) => {
    return await Taches.findByPk(id)
}

exports.getAll = async () => {
    return await Taches.findAll()
}

exports.getComing = async () => {
    let now = new Date()
    now = now.toISOString()
    return await sequelize.query(`SELECT * FROM "TACHES" WHERE DATEDEB > '${now}'`)
}

exports.getCurrent = async () => {
    let now = new Date()
    now = now.toISOString()
    return await sequelize.query(`SELECT * FROM "TACHES" WHERE DATEDEB < '${now}' AND AVANCEMENT BETWEEN 1 AND 99`)
}

exports.getPast = async () => {
    let now = new Date()
    now = now.toISOString()
    return await sequelize.query(`SELECT * FROM "TACHES" WHERE DATEDEB < '${now}' AND AVANCEMENT = 0`)
}