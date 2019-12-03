var express = require('express');
var router = express.Router();

let idCounter = 1;

const emps = [
    {id:idCounter++, fname:'Filip', lname:'Jatelnicki'}
];

router.get('/getAll', (req, res, next) => {
    res.send(emps);
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
    
});
module.exports = router;