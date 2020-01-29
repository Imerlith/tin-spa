var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Client = require('../models/Client');
var mysql = require('mysql2')

function validate(client) {
    return client.First_Name == '' ||
            client.Last_Name == '' ||
            client.Birthday == null ||
            client.Last_Visit_Date == null ||
            client.Favourite_Game == '';
}

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
    if (validate(newClient)) {
        res.sendStatus(400);
        return;
    }
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
        deleteClientsFromSession(eid);
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

function deleteClientsFromSession(clientID) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tin',
        database: 'tin'
    })
    connection.connect();
    connection.query(`DELETE FROM Sessions WHERE Clients_Client_ID = ${clientID}`,
    (err, rows, fields) => {
        if (err) console.log(err);
        console.log(rows);
    })
    connection.end();
}

router.patch('/', (req, res) => {
    const updatedClient = req.body;
    if (validate(updatedClient)) {
        res.sendStatus(400);
        return;
    }
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
