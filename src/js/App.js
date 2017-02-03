import React, {Component, PropTypes} from 'react';
import Header from './Header';
import config from './config';
import { withRouter } from 'react-router';

const App = class extends Component {
    displayName: 'App';

    constructor (props, context) {
        super(props, context);
        this.state = {};
    }

    onMessage = (data) => {
      const event = JSON.parse(data.data);
      if (event.event == 'load') {
        switch (event.catridge.toUpperCase()) {
          case 'P1P': // Pong
            this.props.router.replace('/pong');
            break;

          case 'PVS': // 2-Player Pong
            this.props.router.replace('/pong-vs');
            break;

          case 'SNK': // Snake
            this.props.router.replace('/snake');
            break;

          case 'BKT': // Breakout
            this.props.router.replace('/breakout');
            break;
        }
      }
    }

    componentDidMount() {
      // Establish websocket connection to API for various events (i.e. button or RFID)
      this.ws = new WebSocket(config.dev ? config.devWS : config.ws);
      this.ws.onmessage = this.onMessage;
    }

    render () {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
};

module.exports = withRouter(App);
