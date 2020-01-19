var express = require('express');
var router = express.Router();
var connection = require('../config/DAL')

router.get('/', (req, res) => {
    connection.connect();
    connection.query('SELECT * FROM Sessions s INNER JOIN Clients c on c.Client_Id = s.Clients_Client_ID',
    (err, rows, fields) => {
        if (err) console.log(err);
        console.log(rows);
        const data = [];
        rows.forEach(row => {
            data.push({
                "session_id": row.session_id,
                "S_DATE": row.S_DATE,
                "Hours": row.Hours,
                "Client": row.First_Name.concat(' ').concat(row.Last_Name)
            });
        });
        res.status(200).send(data);
    });

    connection.end();

});

router.post('/', (req, res) => {

});

module.exports = router;