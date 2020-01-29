var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Emp = require('../models/Employee');

function validate(client) {
    return client.First_Name == '' ||
            client.Last_Name == '' ||
            client.Birthday == null ||
            client.Bonus <=0 ||
            client.Contract_type == '';
}

router.get('/', (req, res) => {
    Emp.findAll()
        .then(emps => {
            console.log(emps);
            res.status(200).send(emps);
        })
        .catch(err => console.log('err: ' + err))
});

router.post('/', (req, res) => {
    const empToCreate = req.body;
    if (validate(empToCreate)) {
        res.sendStatus(400);
        return;
    }
    db.sync()
        .then(() => Emp.create({
            First_Name: empToCreate.First_Name,
            Last_Name: empToCreate.Last_Name,
            Bonus: empToCreate.Bonus,
            Birthday: empToCreate.Birthday,
            Contract_type: empToCreate.Contract_type
        }))
        .then(emp => {
            console.log(JSON.stringify(emp));
            res.sendStatus(201);
        })
        .catch(err => console.log(err));
});

router.delete('/', (req, res) => {
    const eid = req.query.id;
    if (eid == null) {
        res.status(400).send('Please provide valid id')
    } else {
        Emp.destroy({
            where: {
                employee_id: eid
            }
        })
            .then(() => {
                console.log('delted emp');
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
    const empToUpdate = req.body;
    Emp.update({
        First_Name: empToUpdate.First_Name,
        Last_Name: empToUpdate.Last_Name,
        Bonus: empToUpdate.Bonus,
        Birthday: empToUpdate.Birthday,
        Contract_type: empToUpdate.Contract_type
    },
    {
        where: {
            employee_id: empToUpdate.employee_id
        }
    })
    .then(() => {
        console.log('updated emp');
        res.sendStatus(200);
    })
    .catch(err => {
        console.log(err);
        res.sendStatus(404);
    })

    
});

module.exports = router;