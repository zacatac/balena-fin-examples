#!/bin/env node
{
  let self;

  var fs = require('fs');
  const Gpio = require('onoff').Gpio;

  let rgb = function() {
    'use strict';
    if (!(this instanceof rgb)) return new rgb();
    self = this;

    this.redPath = '/sys/class/leds/pca963x\:red/brightness';
    this.greenPath = '/sys/class/leds/pca963x\:green/brightness';
    this.bluePath = '/sys/class/leds/pca963x\:blue/brightness';

    // First, figure out if we are running on a v1.0 or v1.1 balenaFin
    // The v1.0 has LEDs connected via GPIO, whereas the v1.1 has a PCA9633 LED controller IC
    var filecontent;
    try {
      filecontent = fs.readFileSync('/sys/bus/i2c/devices/3-0062/name', 'utf-8').trim();
    } catch (err) {
      // if the device wasn't present
      console.log('I2C LED driver not found');
    }

    if (filecontent == 'pca9633') {
      // if we found the controller IC
      console.log('Using PCA9633 LED driver')
      this.ledType = 'pca9633';
    } else {
      // If not then use the GPIO library
      console.log('Using direct GPIO-driven LEDs')
      this.ledType = 'gpio';
      this.red = new Gpio(504, 'out');
      this.green = new Gpio(505, 'out');
      this.blue = new Gpio(506, 'out');
    }

    // Define how the requested colors will control each LED
    this.colors = {
      "red": [1, 0, 0],
      "yellow": [1, 1, 0],
      "purple": [1, 0, 1],
      "green": [0, 1, 0],
      "cyan": [0, 1, 1],
      "white": [1, 1, 1],
      "blue": [0, 0, 1],
      "black": [0, 0, 0],
    };

    this.color = function(color) {
      return new Promise((resolve, reject) => {
        if (self.colors.hasOwnProperty(color)) {
          self.reset();

          if (self.ledType == 'pca9633') {
            fs.writeFileSync(self.redPath, self.colors[color][0]*255);
            fs.writeFileSync(self.greenPath, self.colors[color][1]*255);
            fs.writeFileSync(self.bluePath, self.colors[color][2]*255);
          } else {
            self.red.writeSync(self.colors[color][0]);
            self.green.writeSync(self.colors[color][1]);
            self.blue.writeSync(self.colors[color][2]);
          }

          resolve(color);
        } else {
          reject("The requested color:" + color + " is not supported.");
        }
      });
    };


    this.reset = function() {
      if (self.ledType == 'pca9633') {
        fs.writeFileSync(self.redPath, 0);
        fs.writeFileSync(self.greenPath, 0);
        fs.writeFileSync(self.bluePath, 0);
      } else {
        self.red.writeSync(0);
        self.green.writeSync(0);
        self.blue.writeSync(0);
      }
    };

    // Initialise the LEDs off (black)
    this.color('black');
  };

  module.exports = rgb();
}
