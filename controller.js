'use strict';

var response = require('./res');
var connection = require('./connection');
const conn = require('./connection');
var mysql = require('mysql');

exports.index = function (req, res){
    response.ok("Welcome", res);
}

exports.trackrec = function (req, res){
    var search = {
        id_user : req.body.id_user,
        date_one : req.body.date_one,
        date_two : req.body.date_two
    };

    var query = "SELECT * FROM trackrec WHERE ?? = ? AND ?? BETWEEN ? AND ?"
    var input = ["id_user", search.id_user, "date", search.date_one, search.date_two];

    query = mysql.format(query,input);
    
    connection.query(query, function(error,rows){
        if(rows.length != 0){
         res.json({success : true, data_track : rows});
        }else{
            res.status(400).json({"Error" : true, "Massage" : "Something went wrong!"});
        }
    })
}