"use strict";
exports.__esModule = true;
var express = require("express");
var bodyParser = require("body-parser");
var cors = require('cors');
var app = express();
var mysql = require("mysql");
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'tododb'
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/api/insert", function (req, res) {
    var id = req.body.id;
    var taskName = req.body.taskName;
    var description = req.body.description;
    var createdBy = req.body.createdBy;
    var createdOn = req.body.createdOn;
    var sqlInsert = 'INSERT INTO todoinfo (id, taskName, description, createdBy, createdOn) VALUES (?,?,?,?,?)';
    db.query(sqlInsert, [id, taskName, description, createdBy, createdOn], function (err, result) {
        console.log(result);
    });
});
app.get('/api/get', function (req, res) {
    var sqlSelect = 'SELECT * FROM todoinfo';
    db.query(sqlSelect, function (err, result) {
        res.send(result);
    });
});
app["delete"]("/api/delete/:id", function (req, res) {
    var id = req.params.id;
    var sqlDelete = "DELETE FROM todoinfo WHERE id=?";
    db.query(sqlDelete, id, function (err, result) {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });
});
app.put("/api/update", function (req, res) {
    var id = req.body.id;
    var taskName = req.body.taskName;
    var description = req.body.description;
    var createdBy = req.body.createdBy;
    var createdOn = req.body.createdOn;
    var sqlUpdate = "UPDATE todoinfo SET taskName=?,description=?,createdBy=?,createdOn=? WHERE id=?";
    db.query(sqlUpdate, [taskName, description, createdBy, createdOn, id], function (err, result) {
        if (err)
            console.log(err);
    });
});
app.listen(3001, function () {
    console.log("running on port 3001");
});
