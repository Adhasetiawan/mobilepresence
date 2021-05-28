'use strict';

module.exports = function(app){
    var myjson = require('./controller');
    var verifikasi = require ('./middleware/verifikasi')

    app.route('/')
    .get(myjson.index);

    app.route('/trackrecord')
    .get(verifikasi(), myjson.trackrec);

    app.route('/detailrec')
    .get(verifikasi(), myjson.detailrec);

    app.route('/editact')
    .put(verifikasi(), myjson.editact);

    app.route('/presence')
    .post(verifikasi(), myjson.postpresence)

    app.route('/absence')
    .put(verifikasi(), myjson.postabsence);
}