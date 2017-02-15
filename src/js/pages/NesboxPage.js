import React, {Component, PropTypes} from 'react';

import resizeImage from '../utils/resize-image-data';
const sendFrame = require('./send-frame');
var uints = [];

const NesboxPage = class extends Component {
  componentDidMount() {
    var canvas = document.getElementById("nesbox-canvas");
    var context = canvas.getContext("2d");
    context.rect(0,0,300,150);
    context.fillStyle = "black";
    context.fill();
    context.fillStyle = "white";
    context.fillText("Loading emulator, please wait...", 10, 20);

    window.Module =
    {
      canvas: document.getElementById('nesbox-canvas'),
      rom: require('./nesbox/super-mario-bros.gbc')
    };

    var script = document.createElement("script");

    script.src = require('./nesbox/nesbox');
    script.async = true;

    document.body.appendChild(script);

    setInterval(() => {
      if (this.canvas) {
        var ctx = canvas.getContext("2d");
        var imgData = resizeImage(canvas, canvas.width, canvas.height);
        // @TODO cropping
        //var imgData = resizeImage(canvas, canvas.width / 4, canvas.height / 4, 0, canvas.height * 3 / 4);

        var data = imgData.data;
        uints = [];
        for (var i = 0; i < data.length; i += 4) {
            uints.push(data[i]);
            uints.push(data[i + 1]);
            uints.push(data[i + 2]);
        }
        sendFrame(uints);
      } else {
        this.canvas = $('#nesbox-canvas').length && $('#nesbox-canvas')[0];
      }
    }, 10);
  }
  render() {
    return (
      <canvas id="nesbox-canvas"></canvas>
    )
  }
}

module.exports = NesboxPage;
