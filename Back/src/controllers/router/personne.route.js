const express = require('express')
const routerPersonne = express.Router();
const personneRepository = require('../../models/personnes/personnes-repository');
const { authMiddleware } = require('../../core/middlewares')

routerPersonne.get('/:id',authMiddleware,
    async (req,res) => {
        const listOfPersonnes = await personneRepository.getAllById(req.params.id)
        
        if (!listOfPersonnes) {
            res.status('204').send('Aucune rencontres trouvées')
        } else {
            res.json({listOfPersonnes})
            res.status('200').end()
        }
})

routerPersonne.post('/create/:params',authMiddleware,
    async (req,res) => {
        const parameters = JSON.parse(req.params['params'])

        const newPersonne = await personneRepository.createPersonne(parameters)

        if (newPersonne) {
            res.status(400).send("Erreur lors de la création")
            return;
        } else {
            res.status(201).end()
        }
})

routerPersonne.delete('/delete/:id',authMiddleware,
    async (req,res) => {

        const deleted = await personneRepository.deletePersonne(req.params.id)

        if (!deleted) {
            res.status('200').end()
        } else {
            res.status('400').send('Erreur lors de la suppression')
        }
})

routerPersonne.put('/update/:params',authMiddleware,
    async (req,res) => {
        const parameters = JSON.parse(req.params['params'])

        const updatedewPersonne = await personneRepository.updatePersonne(parameters)

        if (updatedewPersonne) {
            res.status(400).send("Erreur lors de la mise à jour")
            return;
        } else {
            res.status(204).end()
        }
})

exports.initializeRoutesPersonne = () => routerPersonne;