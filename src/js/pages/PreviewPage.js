import React, {Component, PropTypes} from 'react';
const config = require('../config');

const PreviewPage = class extends Component {
  componentDidMount() {
    this.ws = new WebSocket("ws://" + (config.dev ? 'localhost' : config.api) + ":3001/");
    this.ws.binaryType = 'arraybuffer';
    this.ws.onmessage = (e) => {
      var canvas = document.createElement('canvas');
      canvas.width = 60;
      canvas.height = 34;
      var imageData = new ImageData(new Uint8ClampedArray(e.data), 60, 34);
      canvas.getContext('2d').putImageData(imageData, 0, 0);
      $('canvas')[0].getContext('2d').drawImage(canvas, 0, 0, 300, 170);
    };
  }
  componentWillUnmount() {
    this.ws.close();
  }
  render() {
    return (
      <canvas width={300} height={170} />
    )
  }
}

PreviewPage.propTypes = {}

PreviewPage.defaultProps = {}

export default PreviewPage;
