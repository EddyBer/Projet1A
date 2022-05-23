const express = require('express');
const routerRencontre = express.Router();
const rencontresRepository = require('../../models/Rencontres/rencontre-repository');
const { authMiddleware } = require('../../core/middlewares')

routerRencontre.get('/:id',authMiddleware,
    async (req,res) => {
        
        const listOfRencontres = await rencontresRepository.getAllById(req.params.id)
        
        if (!listOfRencontres) {
            res.status('204').send('Aucune rencontres trouvées')
        } else {
            res.json({listOfRencontres})
            res.status('200').end()
        }
})

routerRencontre.post('/create/:params',authMiddleware,
    async (req,res) => {
        const parameters = JSON.parse(req.params['params'])

        const newRencontres = await rencontresRepository.createRencontre(parameters)

        if (newRencontres) {
            res.status(400).send("Erreur lors de la création")
            return;
        } else {
            res.status(201).end()
        }
})

routerRencontre.delete('/delete/:id',authMiddleware,
    async (req,res) => {

        const deleted = await rencontresRepository.deleteRencontre(req.params.id)

        if (!deleted) {
            res.status('200').end()
        } else {
            res.status('400').send('Erreur lors de la suppression')
        }
})

routerRencontre.put('/update/:params',authMiddleware,
    async (req,res) => {
        const parameters = JSON.parse(req.params['params'])

        const updatedRencontre = await rencontresRepository.updateRencontre(parameters)

        if (updatedRencontre) {
            res.status(400).send("Erreur lors de la mise à jour")
            return;
        } else {
            res.status(204).end()
        }
})

exports.initializeRoutesRencontre = () => routerRencontre;