var express = require('express');
var router = express.Router();
var mysql = require('mysql2')

router.get('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tin',
        database: 'tin'
    })
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
                    "Client": row.First_Name.concat(' ').concat(row.Last_Name),
                    "CObject": {
                        "Client_Id": row.Clients_Client_ID,
                        "First_Name": row.First_Name,
                        "Last_Name": row.Last_Name,
                        "Last_Visit_Date": row.Last_Visit_Date,
                        "Birthday": row.Birthday,
                        "Favourite_Game": row.Favourite_Game
                    }
                });
            });
            res.status(200).send(data);
        });

    connection.end();

});

router.post('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tin',
        database: 'tin'
    })
    const sessionToCreate = req.body;
    console.log(sessionToCreate)
    connection.connect();
    connection.query(`INSERT INTO Sessions (S_DATE, Hours, Clients_Client_ID)
        VALUES ('${sessionToCreate.S_DATE}', ${sessionToCreate.Hours}, ${sessionToCreate.Clients_Client_ID})`,
        (err, rows, fields) =>{
            if (err) console.log(err);
            console.log(rows);
            res.status(200).send('created');
        })
    connection.end();
});

router.patch('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tin',
        database: 'tin'
    })
    const sessionToUpdate = req.body;
    console.log(sessionToUpdate)
    connection.connect();
    connection.query(
        `UPDATE Sessions SET S_DATE = '${sessionToUpdate.S_DATE}', Hours = ${sessionToUpdate.Hours},
        Clients_Client_ID = ${sessionToUpdate.Clients_Client_ID}
        WHERE session_id = ${sessionToUpdate.session_id}`,
        (err, rows, fields) =>{
            if (err) console.log(err);
            console.log(rows);
            res.status(200).send('updated');
        })
    connection.end();
});

router.delete('/', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tin',
        database: 'tin'
    })
    const sid = req.query.id;
    if (sid == null) {
        res.status(400).send('Please provide valid id')
    } else {
        connection.connect();
        connection.query('DELETE FROM Sessions WHERE session_id = '.concat(sid),
            (err, rows, fields) => {
                if (err) console.log(err);
                console.log(rows);
                res.sendStatus(200);
            });
        connection.end();
    }
});

module.exports = router;