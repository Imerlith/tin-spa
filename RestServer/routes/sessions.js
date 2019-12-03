var express = require('express');
var router = express.Router();

let idCounter = 1;

const sessions = [
    {id:idCounter++, clientid:1, empid:1, start:'12:30', end:'13:30',station:3},
    {id:idCounter++, clientid:1, empid:2, start:'13:30', end:'13:30',station:2},
    {id:idCounter++, clientid:1, empid:1, start:'12:30', end:'13:30',station:1},
    {id:idCounter++, clientid:2, empid:4, start:'09:30', end:'10:30',station:3},
    {id:idCounter++, clientid:3, empid:3, start:'12:30', end:'13:30',station:5},
    {id:idCounter++, clientid:4, empid:1, start:'12:30', end:'13:30',station:3},
];

router.get('/getAll', (req, res, next) => {
    res.send(sessions);
});

router.get('/getById', (req, res, next) => {
    const qid = req.query.id;
    if(qid == null) {
        res.status(404).send('Please provide valid id');
    } else {
        const session = sessions.find(s => s.id = qid);
        if(session === null) {
            res.send(404).send('No session find with given id');
        } else {
            res.send(session);
        }
    }
});

router.put('/create', (req, res, next) => {
    const empId = req.headers.empid;
    const clientId = req.headers.clientid;
    const start = req.headers.start;
    const end = req.headers.end;
    const station = req.headers.station;

    sessions.push({id:idCounter++,clientid:clientId,empid:empId,start:start,end:end,station:station});
    res.status(201).send('Create a new session');
});

router.delete('/deleteById', (req, res, next) => {
    if(req.query.id == null) {
      res.send('Please provide valid id');
    } else {
      const session = sessions.find(u => u.id === parseInt(req.query.id));
      if(!session) {
        res.status(404).send('No session with this id found');
      } else {
        const index = sessions.indexOf(session);
        sessions.splice(index, 1);
        res.send('session deleted succesfully');
      }
    }
  });

router.patch('/updateById', (req, res, next) => {
    if(req.query.id == null) {
        res.send('Plsease provide valid id');
      } else {
        const session = sessions.find(u => u.id === parseInt(req.query.id));
        if(!session) {
          res.status(404).send('No session with this id found');
        } else {
            const index = sessions.indexOf(session);
            const clientId = req.headers.clientid;
            const empId = req.headers.empid;
            const start = req.headers.start;
            const end = req.headers.end;
            const station = req.headers.station;
            const updatedSession = {id:sessions[index].id, clientid:clientId, empid:empId, start:start, end:end,station:station};
            sessions[index] = updatedSession;
            res.send('session updated succesfully');
        }
      }
});

module.exports = router;