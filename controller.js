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
        id_user : req.body.id_user
    };

    var query = "SELECT * FROM trackrec WHERE ?? = ?"
    var input = ["id_user", search.id_user];

    query = mysql.format(query,input);
    
    connection.query(query, function(error,rows){
        if(rows.length != 0){
         res.json({success : true, data_track : rows});
        }else{
            console.log(error)
        }
    })
}