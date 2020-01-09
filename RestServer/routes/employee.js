var express = require('express');
var router = express.Router();
const db = require('../config/database');
const Emp = require('../models/Employee');

let idCounter = 1;

// const emps = [
//     {id:idCounter++, fname:'Filip', lname:'Jatelnicki',bonus:3,contract:'service' },
//     {id:idCounter++, fname:'Jakub', lname:'Dzieciatko',bonus:4,contract:'normal' },
//     {id:idCounter++, fname:'Pawel', lname:'Kalbarczyk',bonus:5,contract:'B2B' },
//     {id:idCounter++, fname:'Wojciech', lname:'Szadurski',bonus:0,contract:'trash' },
//     {id:idCounter++, fname:'Wiktor', lname:'Androsiuk',bonus:6,contract:'service' }
// ];

router.get('/getAll', (req, res) => {
    Emp.findAll()
        .then(emps => {
            console.log(emps);
            res.status(200).send(emps);
        })
        .catch(err => console.log('err: ' + err))
});

router.get('/getById', (req, res, next) => {
    const qid = req.query.id;
    if (qid == null) {
        res.status(404).send('Please provide valid id');
    } else {
        const emp = emps.find(e => e.id = qid);
        if (emp === null) {
            res.send(404).send('No emp find with given id');
        } else {
            res.send(emp);
        }
    }
});

router.post('/create', (req, res) => {
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

router.delete('/deleteById', (req, res) => {
    const eid = req.query.id;
    if (eid == null) {
        res.status(400).send('Please provide valid id')
    } else {
        Emp.destroy({
            where: {
                employee_id: eid
            }
        })
        .then(()=> {
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

router.patch('/updateById', (req, res, next) => {
    if (req.query.id == null) {
        res.send('Plsease provide valid id');
    } else {
        const emp = emps.find(u => u.id === parseInt(req.query.id));
        if (!emp) {
            res.status(404).send('No emp with this id found');
        } else {
            const index = emps.indexOf(emp);
            const fname = req.headers.fname;
            const lname = req.headers.lname;
            const bonus = req.headers.bonus;
            const contractType = req.headers.contract;
            const updatedEmp = { id: emps[index].id, fname: fname, lname: lname, bonus: bonus, contract: contractType };
            emps[index] = updatedEmp;
            res.send('emp updated succesfully');
        }
    }
});

module.exports = router;