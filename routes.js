'use strict';

module.exports = function(app){
    var myjson = require('./controller');
    var verifikasi = require ('./middleware/verifikasi')

    app.route('/')
    .get(myjson.index);

    app.route('/trackrecord')
    .get(verifikasi(), myjson.trackrec);
}