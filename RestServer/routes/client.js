var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Client = require('../models/Client');

router.get('/', (req, res) => {
    Client.findAll()
        .then(clients => {
            console.log(clients);
            res.status(200).send(clients);
        })
        .catch(err => console.log('err: ' + err))
});


router.post('/', (req, res) => {
    const newClient = req.body;
    db.sync()
        .then(() => Client.create({
            First_Name: newClient.First_Name,
            Last_Name: newClient.Last_Name,
            Last_Visit_Date: newClient.Last_Visit_Date,
            Birthday: newClient.Birthday,
            Favourite_Game: newClient.Favourite_Game
        }))
        .then(client => {
            console.log(JSON.stringify(client));
            res.sendStatus(201);
        })
        .catch(err => console.log(err));
});

router.delete('/', (req, res) => {
    const eid = req.query.id;
    if (eid == null) {
        res.status(400).send('Please provide valid id')
    } else {
        Client.destroy({
            where: {
                Client_Id: eid
            }
        })
            .then(() => {
                console.log('deleted client');
                res.sendStatus(204);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            })
    }
});

router.patch('/', (req, res) => {
    const updatedClient = req.body;
    Client.update({
        First_Name: updatedClient.First_Name,
        Last_Name: updatedClient.Last_Name,
        Last_Visit_Date: updatedClient.Last_Visit_Date,
        Birthday: updatedClient.Birthday,
        Favourite_Game: updatedClient.Favourite_Game
    },
    {
        where: {
            Client_Id: updatedClient.Client_Id
        }
    })
    .then(() => {
        console.log('updated client');
        res.sendStatus(200);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(404);
    })

    
});

module.exports = router;
