#!/bin/env node

{
    const EventEmitter = require('events').EventEmitter;
    const util = require('util');
    const serveStatic = require('serve-static');
    const compression = require('compression');
    const path = require('path');
    const mime = require('mime');
    const bodyParser = require("body-parser");
    const app = require('express')();

    let errorHandler = (err, req, res, next) => {
        'use strict';
        res.status(500);
        res.render('error', {
            error: err
        });
    };

    app.use(compression());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(function(req, res, next) {
        'use strict';
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
    app.use(errorHandler);

    // declaring server
    let httpServer = function() {
        'use strict';
        if (!(this instanceof httpServer)) return new httpServer();
        this.port = parseInt(process.env.WEB_SERVER_PORT) || 80;
    };
    util.inherits(httpServer, EventEmitter);

    httpServer.prototype.start = function() {
        'use strict';
        let self = this;

        app.use(serveStatic(__dirname + '/public', {
            'index': ['index.html']
        }));

        app.get('/usb', (req, res) => {
            self.emit("getUsb", {
                res: res
            });
        });

        app.post('/usb/:dtype', (req, res) => {

            if (!req.params.dtype) {
                return res.status(400).send('Bad Request');
            }
            self.emit("provision", {
                dtype: req.params.dtype,
                res: res
            });
        });

        app.listen(self.port);


    };

    module.exports = httpServer();
}
