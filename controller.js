'use strict';

var response = require('./res');
var connection = require('./connection');
const conn = require('./connection');

exports.index = function (req, res){
    response.ok("Welcome", res);
}