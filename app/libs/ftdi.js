#!/bin/env node

{
    const exec = require('child_process').exec;
    const fs = require('fs');
    const ftdiConfig = '/tmp/autohat_ftdi_provision.config';
    let self;

    let ftdi = function() {
        'use strict';
        if (!(this instanceof ftdi)) return new ftdi();
        self = this;
    };

    ftdi.prototype.readSerial = function(callback) {
        'use strict';
        exec('lsusb -d 0451:8142 -v  | grep iSerial | awk \'{print $3}\'', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            let serial = stdout.trim();
            callback(serial);
        });
    };

    ftdi.prototype.flash = function(dtype, callback) {
        'use strict';
        self.readSerial((serial) => {
            fs.writeFile(ftdiConfig, 'vendor_id=0x0403\nproduct_id=0x6001\nuse_serial=true\nmax_power=0\nmanufacturer="Resin.io"\nserial=' + serial + '\nproduct=dtype:' + dtype + '\n', function(err) {
                if (err) {
                    return console.log(err);
                }
                exec('ftdi_eeprom --flash-eeprom ' + ftdiConfig, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return;
                    }
                    callback(stdout);
                });
            });
        });
    };

    module.exports = ftdi();
}
