var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Emp = require('../models/Employee');


router.get('/', (req, res) => {
    Emp.findAll()
        .then(emps => {
            console.log(emps);
            res.status(200).send(emps);
        })
        .catch(err => console.log('err: ' + err))
});

router.post('/', (req, res) => {
    const fname = req.headers.fname;
    const lname = req.headers.lname;
    const bonus = req.headers.bonus;
    const bdate = req.headers.bdate;
    const contractType = req.headers.contract;

    db.sync()
        .then(() => Emp.create({
            First_Name: fname,
            Last_Name: lname,
            Bonus: bonus,
            Birthday: bdate,
            Contract_type: contractType
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
    const id = req.headers.id;
    const fname = req.headers.fname;
    const lname = req.headers.lname;
    const bonus = req.headers.bonus;
    const bdate = req.headers.bdate;
    const contractType = req.headers.contract;

    Emp.update({
        First_Name: fname,
        Last_Name: lname,
        Bonus: bonus,
        Birthday: bdate,
        Contract_type: contractType
    },
    {
        where: {
            employee_id: id
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