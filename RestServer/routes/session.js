var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Session = require('../models/Session');
const Client = require('../models/Client');

router.get('/', (req, res) => {
    Session.findAll({
        include: [{
            model: Client
        }]
    })
        .then(sessions => {
            console.log(sessions);
            res.status(200).send(sessions);
        })
        .catch(err => console.log('err: ' + err))
});

router.post('/', (req, res) => {
    const newSession = req.body;
    db.sync()
        .then(() => Session.create({
            S_DATE: newSession.S_Date,
            Hours: newSession.Hours,
            Clients_Client_ID: newSession.Clients_Client_ID
        }))
        .then(session => {
            console.log(JSON.stringify(session));
            res.sendStatus(201);
        })
        .catch(err => console.log(err));
});

module.exports = router;