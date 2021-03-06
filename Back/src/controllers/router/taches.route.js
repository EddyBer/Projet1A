const express = require('express');
const routerTaches = express.Router();
const tachesRepository = require('../../models/taches/taches-repository');
const { authMiddleware } = require('../../core/middlewares');
const { param } = require('express-validator');

routerTaches.get('/:params',authMiddleware,
    async (req,res) => {
        const parameters = JSON.parse(req.params['params'])

        const taches = await tachesRepository.getByDate(parameters)
        
        if (!taches) {
            res.status(404).send('Aucune taches trouvées')
        } else {
            res.json({taches})
            res.status(200).end()
        }
})

routerTaches.get('/infos/:id',authMiddleware,
    async (req,res) => {
        const taches = await tachesRepository.getById(req.params.id)
        
        if (!taches) {
            res.status(404).send('Aucune taches trouvées')
        } else {
            res.json({taches})
            res.status(200).end()
        }
})

routerTaches.get('/list/all',authMiddleware,
    async (req,res) => {
        const taches = await tachesRepository.getAll()
        
        if (!taches) {
            res.status(404).send('Aucune taches trouvées')
        } else {
            res.json({taches})
            res.status(200).end()
        }
})

routerTaches.get('/list/coming',authMiddleware,
    async (req,res) => {
        const taches = await tachesRepository.getComing()
        
        if (!taches) {
            res.status(404).send('Aucune taches trouvées')
        } else {
            res.json({taches})
            res.status(200).end()
        }
})

routerTaches.get('/list/current',authMiddleware,
    async (req,res) => {
        const taches = await tachesRepository.getCurrent()

        if (!taches) {
            res.status(404).send('Aucune taches trouvées')
        } else {
            res.json({taches})
            res.status(200).end()
        }
})

routerTaches.get('/list/past',authMiddleware,
    async (req,res) => {
        const taches = await tachesRepository.getPast()
        
        if (!taches) {
            res.status(404).send('Aucune taches trouvées')
        } else {
            res.json({taches})
            res.status(200).end()
        }
})

routerTaches.post('/create/:params',authMiddleware,
    async (req,res) => {
        const parameters = JSON.parse(req.params['params'])

        if (parameters.id == undefined) {
            parameters.id = ""
        }

        const [results, metadata] = await tachesRepository.getConflict(parameters)

        if (results.length > 0) {
            res.status(400).send("Une tâche existe déjà sur cette période")
            return
        } else {
            const newRencontres = await tachesRepository.createTaches(parameters)

            if (newRencontres) {
                res.status(400).send("Erreur lors de la création")
                return;
            } else {
                res.status(201).end()
            }
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


        const [results, metadata] = await tachesRepository.getConflict(parameters)

        if (results.length > 0) {
            res.status(400).send("Une tâche existe déjà sur cette période")
            return
        } else {
            const updatedTask = await tachesRepository.updateTask(parameters)

            if (updatedTask) {
                res.status(400).send("Erreur lors de la mise à jour")
                return;
            } else {
                res.status(204).end()
            }
        }
})

exports.initializeRoutesTaches = () => routerTaches;