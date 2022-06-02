const express = require('express');
const routerTaches = express.Router();
const tachesRepository = require('../../models/taches/taches-repository');
const { authMiddleware } = require('../../core/middlewares')

routerTaches.get('/:datedeb',authMiddleware,
    async (req,res) => {
        const taches = await tachesRepository.getByDate(req.params.datedeb)
        
        if (!taches) {
            res.status(404).send('Aucune taches trouvées')
            console.log(taches)
        } else {
            res.json({taches})
            res.status(200).end()
        }
})

routerTaches.post('/create/:params',authMiddleware,
    async (req,res) => {
        const parameters = JSON.parse(req.params['params'])
console.log(parameters)
        const newRencontres = await tachesRepository.createTaches(parameters)

        if (newRencontres) {
            res.status(400).send("Erreur lors de la création")
            return;
        } else {
            res.status(201).end()
        }
})

routerTaches.delete('/delete/:id',authMiddleware,
    async (req,res) => {

        const deleted = await tachesRepository.deleteTaches(req.params.id)

        if (!deleted) {
            res.status('200').end()
        } else {
            res.status('400').send('Erreur lors de la suppression')
        }
})

routerTaches.put('/update/:params',authMiddleware,
    async (req,res) => {
        const parameters = JSON.parse(req.params['params'])

        const updatedRencontre = await tachesRepository.updateTaches(parameters)

        if (updatedRencontre) {
            res.status(400).send("Erreur lors de la mise à jour")
            return;
        } else {
            res.status(204).end()
        }
})

exports.initializeRoutesTaches = () => routerTaches;