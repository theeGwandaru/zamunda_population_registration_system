var express = require('express');
var router = express.Router();
var naturalPersonsService = require('../services/naturalPersonsService');

module.exports = (config) => {

    naturalPersonsService = naturalPersonsService(config.mysql.client);

    router.get('/', async (req, res, next) => {
        let dataTableParams = req.query;
        let response = await naturalPersonsService.getAllPersonsDataTable(dataTableParams);
        
        res.status(200).json(response);
    })

    router.post('/', async function (req, res, next) {
        let socketConnection = req.app.get('socketConnection');
        let generatePersonsFormData = req.body;
        let numberOfPersonsToBeCreated = 0;
        if (generatePersonsFormData && generatePersonsFormData.numberOfPersonsToBeCreated && !isNaN(generatePersonsFormData.numberOfPersonsToBeCreated)) {
            numberOfPersonsToBeCreated = generatePersonsFormData.numberOfPersonsToBeCreated;

            for (let i = 0; i < numberOfPersonsToBeCreated; i++) {
                let person = await naturalPersonsService.generatMockNaturalPerson();
                socketConnection.emit('progressUpdateMsg', JSON.stringify({ progress: ((i + 1) / numberOfPersonsToBeCreated) * 100 }));
            }
        }
        res.json({ status: 'success' });
    });

    router.get('/search/id', async (req, res, next) => {
        let params = req.query;
        let results = await naturalPersonsService.findNaturalContactByIdentifier(params);
        res.status(200).json(results);
    });

    router.get('/search/', async (req, res, next) => {
        let params = req.query;
        try {
            let results = await naturalPersonsService.findNaturalContactByNonIdParams(params);
            res.status(200).json(results);
        }
        catch (err) {
            console.log(err);
            res.status(500).send(err);
        }

    });

    return router;
}