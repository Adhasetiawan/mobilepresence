'use strict';

var response = require('./res');
var connection = require('./connection');
const conn = require('./connection');
var mysql = require('mysql');
const { query, format } = require('./connection');

//indexing
exports.index = function (req, res){
    response.ok("Welcome", res);
}

//get all track
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

//post presence
exports.postpresence = function(req, res){
    var presence={
        post : req.body.post,
        date : req.body.date,
        arrivetime : req.body.arrivetime,
        leavingtime : req.body.leavingtime,
        latitude : req.body.latitude,
        longitude : req.body.longitude,
        id_user : req.body.id_user
    };

    var query = "INSERT INTO ?? SET ?";
    var table = ["trackrec"];

    query = mysql.format(query, table);

    connection.query(query, presence, function(error, rows){
        if(error){
            console.log(error);
            res.status(400).json({Error : "Yes", "Message" : "something is wrong"});
        }else{
            response.ok("Your presence has been saved",res);
        }
    })
}

//post absence
exports.postabsence = function(req, res){
    var update = {
        leavingtime : req.body.leavingtime,
        id_post : req.body.id_post
    };

    var query = "UPDATE ?? SET ?? = ? where ?? = ?";
    var table = ["trackrec", "leavingtime", update.leavingtime, "id_post", parseInt(update.id_post)];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error);
            res.status(400).json({Error : "Yes", "Message" : "something is wrong"});
        }else{
            res.status(200).json({Success : "true", "Message" : "Your absence has been saved."});
        }
    })
}