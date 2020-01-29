var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Handle = require('../models/Handle');
var mysql = require('mysql2')

function validate(handle) {
    return handle.Sessions_session_id == null ||
    handle.Employees_employee_id == null
            ;
}

router.get('/', (req, res) => {
    Handle.findAll()
        .then(handles => {
            console.log(handles);
            res.status(200).send(handles);
        })
        .catch(err => console.log('err: ' + err));
});

router.post('/', (req, res) => {
    const handleToCreate = req.body;
    if (validate(handleToCreate)) {
        res.sendStatus(400);
        return;
    }
    db.sync()
        .then(() => Handle.create({
            Employees_employee_id: handleToCreate.Employees_employee_id,
            Sessions_session_id: handleToCreate.Sessions_session_id
        }))
        .then(hand => {
            console.log(JSON.stringify(hand));
            res.sendStatus(201);
        })
        .catch(err => console.log(err));
});

router.delete('/', (req, res) => {
    const hid = req.query.id;
    if (hid == null) {
        res.status(400).send('Please provide valid id')
    } else {
        Handle.destroy({
            where: {
                handles_id: hid
            }
        })
            .then(() => {
                console.log('delted handles');
                res.sendStatus(204);
            }
            )
            .catch(err => {
                console.log(err);
                res.sendStatus(404);
            })
    }
})

router.patch('/', (req, res) => {
    const handleToUpdate = req.body;
    if (validate(handleToUpdate)) {
        res.sendStatus(400);
        return;
    }
    Handle.update({
        Employees_employee_id: handleToUpdate.Employees_employee_id,
        Sessions_session_id: handleToUpdate.Sessions_session_id
    },
    {
        where: {
            handles_id: handleToUpdate.handles_id
        }
    })
    .then(() => {
        console.log('updated handle');
        res.sendStatus(200);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(404);
    })

})

module.exports = router;