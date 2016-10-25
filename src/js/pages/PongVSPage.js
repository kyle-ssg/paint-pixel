import React, {Component, PropTypes} from 'react';
import reactCSS from 'reactcss';
window.log = console.log
var _data = require('../_data');
var _ = require('lodash');
var uints = [];
// var SERVER = 'https://pixelwall.herokuapp.com/';
var SERVER = 'http://192.168.3.172:3001/';

const TheComponent = class extends Component {
  displayName:
  'TheComponent'

  constructor(props, context) {
    super(props, context);
    this.state = {
      ballx: 100,
      bally: 100,
      ballSpeed: 0.5,
      velx: 0,
      vely: 0,
      player2x: 270,
      player2y: 100,
      playerx: 10,
      playery: 100,
      playerScore: 0,
      player2Score: 0
    };
    this._keystate = {};
    this._canvas = undefined;
    this._context =  undefined;
    this._ball= require('./ball-vs.jsx');
    this._player= require('./player.jsx');
    this._player2 = require('./player2.jsx');
    this._loop= null;
    this._canvasStyle= {
      display: 'block',
      position: 'absolute',
      margin: 'auto',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0'
    };
    this.ticks = 0;
    this.ws = null;
  }

  _draw = () => {

    // draw background
    const state = this.state;
    this._context.fillRect(0, 0, this.props.width, this.props.height);
    this._context.save();
    this._context.fillStyle = "#fff";

    // draw scoreboard
    this._context.font = '10px Arial';
    this._context.fillText('Player: ' + state.playerScore , 10, 10 );
    this._context.fillText('Player 2: ' + state.player2Score , 240, 10  );

    //draw ball
    this._ball().draw();

    //draw paddles
    this._context.fillStyle = "#f0f";
    this._player().draw();
    this._context.fillStyle = "#00f";
    this._player2().draw();
    this._context.fillStyle = "#fff";
    // draw the net
    /*const w = 4;
    const x = (this.props.width - w)*0.5;
    let y = 0;
    const step = this.props.height/20; // how many net segments
    while (y < this.props.height) {
      this._context.fillRect(x, y + step * 0.25, w, step * 0.5);
      y += step;
    }*/

    this._context.restore();

    if (this.ticks % 50 == 0) {
      var imgData = this._context.getImageData(0, 0, this.props.width, this.props.height);
      var data = imgData.data;
      uints = [];
      for (var i = 0; i < data.length; i += 4) {
          uints.push(data[i]);
          uints.push(data[i + 1]);
          uints.push(data[i + 2]);
      }

      _data.post(SERVER + 'upload/photo', uints)
          .then(()=> {
              //console.log('POSTED')
          })

      //console.log(uints);
    }
    this.ticks++;
  }

  
  _startGame = () => {

    if(this._loop){
      return;
    }

    const keystate = this._keystate;
    document.addEventListener('keydown', function(evt) {
      keystate[evt.keyCode] = true;
    });
    document.addEventListener('keyup', function(evt) {
      delete keystate[evt.keyCode];
    });
    document.addEventListener('ontouchstart', function(e) {e.preventDefault()}, false);
    document.addEventListener('ontouchmove', function(e) {e.preventDefault()}, false);

    this._loop = setInterval( () => {
      this._update();
      this._draw();
    },1);
    this._ball().serve(1);
  }
  _stopGame= () => {
    clearInterval(this._loop);
    this._loop = null;
    setTimeout(()=>{
      this._context.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }, 0);

  }
  _setupCanvas= () => {
    this._canvas = $('canvas')[0];
    this._context = this._canvas.getContext('2d');
  }
  _score= (name) => {
    const state = this.state;
    const scorer = {player: 'player2', player2: 'player'}[name];
    this.setState({
      [scorer+'Score']: state[scorer+'Score'] + 1
    });
    this._stopGame();
    setTimeout(()=>{
      this._context.font = '30px Arial';
      this._context.fillText(scorer + ' score!',
        this.props.width/2,
        this.props.height/2 );
      this._context.restore();
    }, 0);

    setTimeout(()=>{
      this._setupCanvas();
      this._startGame();
    }, 1000);
  }
  _update= () =>{
    this._player().update();
    this._player2().update();
    this._ball().update();
  }
  _touch= (evt) => {
    console.log( evt );
    var yPos = evt.touches[0].pageY - evt.touches[0].target.offsetTop - this.props.paddleHeight/2;
    this._player().position(yPos);
  }

  onMessage = (data) => {
    const event = JSON.parse(data.data);
    console.log(event);
    if (event.event == 'button') {
      var keyCode;
      switch(event.index) {
        case 1:
          keyCode = this.props.upArrow;
          break;

        case 2:
          keyCode = this.props.downArrow;
          break;

        case 3:
          keyCode = this.props.wKey;
          break;

        case 4:
          keyCode = this.props.sKey;
          break;
      }
      if (!keyCode) {
        return;
      }
      if (event.pressed) {
        this._keystate[keyCode] = true;
      } else {
        delete this._keystate[keyCode];
      }
    }  
  }

  componentDidMount() {

    this._setupCanvas();
    this._context.font = '30px Arial';
    this._context.fillText('Starting Game',
      this.props.width/2,
      this.props.height/2 );

    setTimeout(this._startGame, 1000);

    // Establish websocket connection to API for button events
    this.ws = new WebSocket('ws://192.168.3.172:3001');
    this.ws.onmessage = this.onMessage;
  }
  
  componentWillUnmount() {
    this._stopGame();
  }

  render() {
    return (
        <canvas
          onTouchStart={this._touch}
          onTouchMove={this._touch}
          width={this.props.width} 
          height={this.props.height} style={this._canvasStyle}
        >
        </canvas>  
    );
  }
};

TheComponent.propTypes = {};

TheComponent.defaultProps = {
      width: 300,
      height: 250,
      upArrow: 38,
      downArrow: 40,
      paddleHeight: 40,
      paddleWidth: 20,
      paddleSpeed: 1,
      ballSize: 10,
      wKey: 87,
      sKey: 83
    }

module.exports = TheComponent;
