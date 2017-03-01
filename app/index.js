#!/bin/env node

{
    const blinkt = require(__dirname + '/libs/blinkt.js');
    const server = require(__dirname + '/libs/server/index.js');
    const ftdi = require(__dirname + '/libs/ftdi.js');
    const usb = require('usb');
    const chalk = require('chalk');
    let connected = 0;
    let usbDevice = {};
    blinkt.init();
    server.start();
    server.on('getUsb', (msg) => {
        'use strict';
        msg.res.status(200).send(usbDevice);
    });
    server.on('provision', (msg) => {
        'use strict';
        if (usbDevice.serial) {
            blinkt.progress();
            console.log(chalk.cyan('flashing #' + usbDevice.serial + ' with dtype: ' + msg.dtype), chalk.yellow(' DO NOT UNPLUG THE AUTOHAT DEVICE!!!'));
            ftdi.flash(msg.dtype, (result) => {
                console.log(chalk.cyan(result));
                msg.res.status(200).send(usbDevice);
                blinkt.complete();
                console.log(chalk.cyan('successfully flashed #' + usbDevice.serial + ' with dtype: ' + msg.dtype), chalk.inverse(' YOU CAN NOW UNPLUG THE AUTOHAT DEVICE.'));
            });
        } else {
            msg.res.status(404).send(usbDevice);
        }
    });
    usb.on('attach', (d) => {
        'use strict';
        if (d.deviceDescriptor.idVendor == 1105) {
            if (!connected) {
                connected = 1;
                ftdi.readSerial((serial) => {
                    usbDevice = d;
                    usbDevice.serial = serial;
                    console.log(chalk.cyan('new autoHAT connected: ', JSON.stringify(usbDevice)));
                    blinkt.ready();
                });
            } else {
                console.log(chalk.red('you cannot connect more than one autoHAT at a time'));
            }
        }
    });

    usb.on('detach', (d) => {
        'use strict';
        if (d.deviceDescriptor.idVendor == 1105) {
            console.log(chalk.yellow('autoHAT disconnected'));
            usbDevice = {};
            connected = 0;
            blinkt.clear();
        }
    });

    process.on('SIGINT', () => {
        'use strict';
        blinkt.clear();
        process.exit(1);
    });
}
