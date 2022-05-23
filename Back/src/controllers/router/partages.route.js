const express = require('express')
const routerPartage = express.Router();
const partageRepository = require('../../models/partages/partages-repository');

routerPartage.get('/all',
    async (req,res) => {
        const listOfPartage= await partageRepository.getAll()
        
        if (!listOfPartage) {
            res.status('204').send('Aucune rencontres trouvées')
        } else {
            res.json({listOfPartage})
            res.status('200').end()
        }
})

exports.initializeRoutesPartage = () => routerPartage;