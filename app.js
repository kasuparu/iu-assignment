const express = require('express');
const http = require('http');
const path = require('path');
const mysql = require('mysql');
const async = require('async');

// routes
const timestamp = require('./routes/timestamp');
// const routes = require('./routes');
// const user = require('./routes/user');
// const hike = require('./routes/hike');

const app = express();

app.configure(function() {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
});

app.configure('development', function() {
    console.log('Using development settings.');
    const config = require('./config.test.json');
    app.set('connection', mysql.createConnection(config));
    app.use(express.errorHandler());
});

app.configure('production', function() {
    console.log('Using production settings.');
    app.set('connection', mysql.createConnection({
        host: process.env.RDS_HOSTNAME,
        user: process.env.RDS_USERNAME,
        password: process.env.RDS_PASSWORD,
        port: process.env.RDS_PORT
    }));
});

function init() {
    // app.get('/', routes.index);
    // app.get('/users', user.list);
    // app.get('/hikes', hike.index);
    // app.post('/add_hike', hike.add_hike);
    app.get('/Timestamp', timestamp.route);

    http.createServer(app).listen(app.get('port'), function() {
        console.log("Express server listening on port " + app.get('port'));
    });
}

const client = app.get('connection');
async.series([
    function connect(callback) {
        client.connect(callback);
    },
    // function clear(callback) {
    //     client.query('DROP DATABASE IF EXISTS mynode_db', callback);
    // },
    // function create_db(callback) {
    //     client.query('CREATE DATABASE mynode_db', callback);
    // },
    function use_db(callback) {
        client.query('USE iugo_assignment', callback);
    },
    // function create_table(callback) {
    //     client.query('CREATE TABLE HIKES (' +
    //         'ID VARCHAR(40), ' +
    //         'HIKE_DATE DATE, ' +
    //         'NAME VARCHAR(40), ' +
    //         'DISTANCE VARCHAR(40), ' +
    //         'LOCATION VARCHAR(40), ' +
    //         'WEATHER VARCHAR(40), ' +
    //         'PRIMARY KEY(ID))', callback);
    // },
    // function insert_default(callback) {
    //     const hike = {
    //         HIKE_DATE: new Date(),
    //         NAME: 'Hazard Stevens',
    //         LOCATION: 'Mt Rainier',
    //         DISTANCE: '4,027m vertical',
    //         WEATHER: 'Bad'
    //     };
    //     client.query('INSERT INTO HIKES set ?', hike, callback);
    // }
], function(err, results) {
    if (err) {
        console.log('Exception initializing database.', process.env);
        throw err;
    } else {
        console.log('Database initialization complete.');
        init();
    }
});
