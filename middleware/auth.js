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
        imei : req.body.imei,
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

//login
exports.login = function(req, res){
    var post = {
        email : req.body.email,
        password : req.body.password,
        imei : req.body.imei
    }

    var query = "SELECT * FROM ?? WHERE ?? = ? AND ?? = ? AND ?? = ?";
    var table = ["user_tbl", "email", post.email, "password", md5(post.password), "imei", post.imei];

    query = mysql.format(query,table);

    connection.query(query, function(error, rows){
        if(error){
            console.log(error)
        }else{
            if (rows.length == 1){
                var token = jwt.sign({rows}, config.secret, {expiresIn: 36000});
                id_user = rows[0].id_user;
                username = rows[0].username;
                email = rows[0].email;
                name = rows[0].name;
                address = rows[0].address;
                division = rows[0].division;
                role = rows[0].role;
                picture = rows[0].picture;

                const user = {
                    id_user : id_user,
                    username : username,
                    email : email,
                    name : name,
                    address: address,
                    division : division,
                    role : role,
                    picture : picture
                }

                res.json({
                    success : true,
                    massage : "Token has been generated",
                    token : token,
                    data_user : user
                });
            }else{
                 res.status(404).json({"Error" : true, "Massage" : "Email atau password anda salah"});
            }
        }
    });
}