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

router.get('/getAll', (req, res, next) => {
   Emp.findAll()
        .then(emps => {
            console.log(emps);
            res.status(200).send(emps);
        })
        .catch(err => console.log('err: '+ err))
});

router.get('/getById', (req, res, next) => {
    const qid = req.query.id;
    if(qid == null) {
        res.status(404).send('Please provide valid id');
    } else {
        const emp = emps.find(e => e.id = qid);
        if(emp === null) {
            res.send(404).send('No emp find with given id');
        } else {
            res.send(emp);
        }
    }
});

router.put('/create', (req, res, next) => {
    const fname = req.headers.fname;
    const lname = req.headers.lname;
    const bonus = req.headers.bonus;
    const contractType = req.headers.contract;

    emps.push({id:idCounter++,fname:fname,lname:lname,bonus:bonus,contract:contractType});
    res.status(201).send('Create a new employee');
});

router.delete('/deleteById', (req, res, next) => {
    if(req.query.id == null) {
      res.send('Plsease provide valid id');
    } else {
      const emp = emps.find(u => u.id === parseInt(req.query.id));
      if(!emp) {
        res.status(404).send('No emp with this id found');
      } else {
        const index = emps.indexOf(emp);
        emps.splice(index, 1);
        res.send('emp deleted succesfully');
      }
    }
  });

router.patch('/updateById', (req, res, next) => {
    if(req.query.id == null) {
        res.send('Plsease provide valid id');
      } else {
        const emp = emps.find(u => u.id === parseInt(req.query.id));
        if(!emp) {
          res.status(404).send('No emp with this id found');
        } else {
            const index = emps.indexOf(emp);
            const fname = req.headers.fname;
            const lname = req.headers.lname;
            const bonus = req.headers.bonus;
            const contractType = req.headers.contract;
            const updatedEmp = {id:emps[index].id, fname:fname, lname:lname, bonus:bonus, contract:contractType};
            emps[index] = updatedEmp;
            res.send('emp updated succesfully');
        }
      }
});

module.exports = router;