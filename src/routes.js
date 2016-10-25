import React from 'react'
import {render} from 'react-dom'
import { Route, IndexRoute } from 'react-router'

import App from './js/App';
import HomePage from './js/pages/HomePage';
import ParticlesPage from './js/pages/ParticlesPage';
import ClientServerPage from './js/pages/examples/ClientServerPage';
import PongPage from './js/pages/PongPage';
import PongVSPage from './js/pages/PongVSPage';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="client-server/:id" name="clientServer" component={ClientServerPage}/>
        <Route path="pong" name="Pong" component={PongPage} />
        <Route path="pong-vs" name="PongVS" component={PongVSPage} />
        <Route path="*" component={ParticlesPage}/>
    </Route>
);
