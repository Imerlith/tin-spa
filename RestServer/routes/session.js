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
    const query = `
            SELECT
                Client_Id,
                c.First_Name as 'cFN',
                c.Last_Name as 'cLN',
                c.Last_Visit_Date as 'cLVD',
                c.Birthday as 'cB',
                c.Favourite_Game,
                session_id,
                S_DATE,
                Hours,
                employee_id,
                e.First_Name as 'eFN',
                e.Last_Name as 'eLN',
                e.Bonus,
                e.Birthday as 'eB',
                Contract_type,
                handles_id
            FROM
                Clients c INNER JOIN Sessions s on c.Client_Id = s.Clients_Client_ID
                INNER JOIN Handles h on h.Sessions_session_id = s.session_id
                INNER JOIN Employees e on e.employee_id = h.Employees_employee_id`;

    connection.query(query,
        (err, rows, fields) => {
            if (err) console.log(err);
            console.log(rows);
            const data = [];
            rows.forEach(row => {
                const search = data.find(s => s.session_id == row.session_id);
                if (search) {
                    data[data.indexOf(search)].OEmps.push({
                        "First_Name": row.eFN,
                        "Last_Name": row.eLN,
                        "Bonus": row.Bonus,
                        "Birthday": row.eB,
                        "Contract_type": row.Contract_type
                    });
                    data[data.indexOf(search)].Emps.push(row.eFN.concat(' ').concat(row.eLN));
                }
                else {
                    data.push({
                        "session_id": row.session_id,
                        "S_DATE": row.S_DATE,
                        "Hours": row.Hours,
                        "Client": row.cFN.concat(' ').concat(row.cLN),
                        "CObject": {
                            "Client_Id": row.Clients_Client_ID,
                            "First_Name": row.First_Name,
                            "Last_Name": row.Last_Name,
                            "Last_Visit_Date": row.cLVD,
                            "Birthday": row.cB,
                            "Favourite_Game": row.Favourite_Game
                        },
                        "Emps": [row.eFN.concat(' ').concat(row.eLN)],
                        "OEmps": [{
                            "First_Name": row.eFN,
                            "Last_Name": row.eLN,
                            "Bonus": row.Bonus,
                            "Birthday": row.eB,
                            "Contract_type": row.Contract_type
                        }],
                        handles_id: row.handles_id
                    });
                }
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