var connection = require('../connection');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
const conn = require('../connection');

//registrasi
exports.registrasi = function(req, res){
    var post = {
        id_user : req.body.id_user,
        username : req.body.username,
        email : req.body.email,
        password: md5(req.body.password),
        name : req.body.password,
        address : req.body.address,
        division : req.body.division,
        role : req.body.role,
        picture : req.file.filename
    }

    var query = "SELECT email FROM ?? WHERE ?? = ?";
    var table = ["user_tbl", "email", post.email];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows){
        if (error){
            console.log(error);
        }else{
            if(rows.length == 0){
                var query = "INSERT INTO ?? SET ?";
                var table = ["user_tbl"];

                query = mysql.format(query,table);
                connection.query(query, post, function(error, rows){
                    if(error){
                        console.log(error);
                    }else{
                        response.ok("Registration is successful", res);
                    }
                });
            }else{
                response.ok("Email already exist", res);
            }
        }
    });
};