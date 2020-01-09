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
    const fname = req.headers.fname;
    const lname = req.headers.lname;
    const lvisit = req.headers.lvisit;
    const bdate = req.headers.bdate;
    const favgame = req.headers.favgame;

    db.sync()
        .then(() => Client.create({
            First_Name: fname,
            Last_Name: lname,
            Last_Visit_Date: lvisit,
            Birthday: bdate,
            Favourite_Game: favgame
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
    const id = req.headers.id;
    const fname = req.headers.fname;
    const lname = req.headers.lname;
    const lvisit = req.headers.lvisit;
    const bdate = req.headers.bdate;
    const favgame = req.headers.favgame;

    Client.update({
        First_Name: fname,
        Last_Name: lname,
        Last_Visit_Date: lvisit,
        Birthday: bdate,
        Favourite_Game: favgame
    },
    {
        where: {
            Client_Id: id
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
