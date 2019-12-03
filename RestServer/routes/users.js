var express = require('express');
var router = express.Router();

let idCounter = 1;

const users = [
  {id:idCounter++ ,fname:'Adam', lname:'Gnatowski', password:'haslo123', email:'gnato@gmail.com', login:'agnato'},
  {id:idCounter++ ,fname:'Adam', lname:'Gnatowski', password:'haslo123', email:'gnato@gmail.com', login:'agnato'},
  {id:idCounter++ ,fname:'Adam', lname:'Gnatowski', password:'haslo123', email:'gnato@gmail.com', login:'agnato'},
  {id:idCounter++ ,fname:'Adam', lname:'Gnatowski', password:'haslo123', email:'gnato@gmail.com', login:'agnato'},
  {id:idCounter++ ,fname:'Adam', lname:'Gnatowski', password:'haslo123', email:'gnato@gmail.com', login:'agnato'},
];
/* GET users listing. */
router.get('/getAll', function(req, res, next) {
  res.send(users);
});

router.get('/getById', function(req, res, next){
  if(req.query.id == null) {
    res.send('Plsease provide valid id');
  } else {
    const user = users.find(u => u.id === parseInt(req.query.id));
    if(!user) {
      res.status(404).send('No user with this id found');
    } else {
      res.send(user);
    }
  }
});

router.put('/createUser', function(req, res, next){
  const fname = req.headers.fname;
  const lname = req.headers.lname;
  const password = req.headers.password;
  const email = req.headers.email;
  const login = req.headers.login;

  //todo: sprawdzic czy null

  users.push({id:idCounter++,fname: fname,lname: lname,password: password,email: email,login: login});

  res.sendStatus(201).send('Utworzono');

});

module.exports = router;
