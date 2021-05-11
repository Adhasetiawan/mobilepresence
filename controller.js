'use strict';

var response = require('./res');
var connection = require('./connection');
const conn = require('./connection');
var mysql = require('mysql');

exports.index = function (req, res){
    response.ok("Welcome", res);
}

//get post all track
exports.trackrec = function (req, res){
    var search = {
        id_user : req.body.id_user,
        date_one : req.body.date_one,
        date_two : req.body.date_two,
        page : req.body.page
    };

    var query = "SELECT * FROM trackrec WHERE ?? = ? AND ?? BETWEEN ? AND ? limit 2 OFFSET ?"
    var input = ["id_user", search.id_user, "date", search.date_one, search.date_two, parseInt(search.page)];

    query = mysql.format(query,input);
    
    connection.query(query, function(error,rows){
        if(error){
         console.log(error)
         res.status(400).json({"Error" : true, "Massage" : "Something went wrong!"});
        }else{
            res.json({success : true, data_track : rows});
        }
    })
}

//get single track
exports.detailrec = function(req,res){
    var date = req.body.date;

    var query = "SELECT * FROM trackrec WHERE ?? = ?";
    var input = ["date", date];

    query = mysql.format(query,input);
    
    connection.query(query, function(error, rows){
        if(rows.length > 0){
             res.json({Success : "true", detail : rows[0]});
        }else{
            res.status(400).json({"Error" : true, "Massage" : "Something went wrong!"});
        }
    })
}