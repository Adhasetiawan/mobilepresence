var mysql = require('mysql');

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mobilepresence'
});

conn.connect((err) => {
    if(err) throw err;
    console.log ('Mysql has connected')
});

module.exports = conn;