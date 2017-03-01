#!/bin/env node

{
    const Blinkt = require('node-blinkt');
    const leds = new Blinkt();
    let self;

    let strip = function() {
        'use strict';
        if (!(this instanceof strip)) return new strip();
        this.brightness = parseFloat(process.env.LED_BRIGHTNESS) || 0.1;
        this.blinkToggle = 0;
        self = this;
    };

    strip.prototype.init = function() {
        'use strict';
        leds.setup();
        self.clear();
    };

    strip.prototype.clear = function() {
        'use strict';
        if (self.blinking) {
            clearInterval(self.blinking);
        }
        leds.clearAll();
        leds.setAllPixels(0, 0, 0, 0);
        leds.sendUpdate();
    };

    strip.prototype.blinkAll = function(red, green, blue, interval) {
        'use strict';
        leds.clearAll();
        leds.setAllPixels(0, 0, 0, 0);
        leds.sendUpdate();
        self.blinking = setInterval(() => {
            self.blinkToggle = !self.blinkToggle;
            if (self.blinkToggle) {
                leds.setAllPixels(red, green, blue, self.brightness);
                leds.sendUpdate();
            } else {
                leds.clearAll();
                leds.setAllPixels(0, 0, 0, 0);
                leds.sendUpdate();
            }
        }, interval);
    };

    strip.prototype.ready = function() {
        'use strict';
        self.clear();
        self.blinkAll(0, 80, 209, 500);
    };

    strip.prototype.progress = function() {
        'use strict';
        self.clear();
        self.blinkAll(209, 0, 205, 500);
    };

    strip.prototype.complete = function() {
        'use strict';
        self.clear();
        self.blinkAll(43, 127, 50, 500);
    };

    strip.prototype.error = function() {
        'use strict';
        self.clear();
        leds.setAllPixels(168, 0, 0, self.brightness);
        leds.sendUpdate();
    };

    module.exports = strip();
}
