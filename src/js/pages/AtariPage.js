import React, {Component, PropTypes} from 'react';

import resizeImage from '../utils/resize-image-data';
const sendFrame = require('./send-frame');
var uints = [];
require('./javatari/logo.png');
require('./javatari/screenborder.png');
require('./javatari/sprites.png');

const AtariPage = class extends Component {
  componentWillMount() {
    if (!window.Javatari) {
      require('./javatari/javatari');
    } else {
      this.reload = true;
    }
  }
  componentDidMount() {
    if (this.reload) {
      Javatari.screenElement = document.getElementById(Javatari.SCREEN_ELEMENT_ID);
      Javatari.consolePanelElement = document.getElementById(Javatari.CONSOLE_PANEL_ELEMENT_ID);
      // Build and start emulator
      Javatari.room = new jt.Room(Javatari.screenElement, Javatari.consolePanelElement);
      Javatari.room.powerOn();

      if (Javatari.ROM_AUTO_LOAD_URL)
          Javatari.room.romLoader.loadFromURL(Javatari.ROM_AUTO_LOAD_URL);
    }
    setInterval(() => {
      var canvas = $('canvas').length && $('canvas')[0];
      if (canvas) {
        var ctx = canvas.getContext("2d");
        var imgData = resizeImage(canvas, canvas.clientWidth, canvas.clientHeight);

        var data = imgData.data;
        uints = [];
        for (var i = 0; i < data.length; i += 4) {
            uints.push(data[i]);
            uints.push(data[i + 1]);
            uints.push(data[i + 2]);
        }

        sendFrame(uints);
      }
    }, 10);
  }
  render() {
    return (
      <div style={{margin: '30px auto 0', minHeight: 594}}>
            <div id="javatari-screen" style={{margin: '0 auto', boxShadow: '2px 2px 10px rgb(60, 60, 60)'}}></div>
            <div id="javatari-console-panel" style={{margin: '0 auto', boxShadow: '2px 2px 10px rgb(60, 60, 60)'}}></div>
      </div>
    )
  }
}

AtariPage.propTypes = {};

AtariPage.defaultProps = {};

module.exports = AtariPage;
