const { Partages } = require('./partages-model');

exports.getAll = async () => {
    return await Partages.findAll();
}