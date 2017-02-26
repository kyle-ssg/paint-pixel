import React from 'react'
import {render} from 'react-dom'
import { Route, IndexRoute } from 'react-router'

import App from './js/App';
import HomePage from './js/pages/HomePage';
import ParticlesPage from './js/pages/ParticlesPage';
import ClientServerPage from './js/pages/examples/ClientServerPage';
import PongPage from './js/pages/PongPage';
import PongVSPage from './js/pages/PongVSPage';
import SnakePage from './js/pages/SnakePage';
import BreakoutPage from './js/pages/BreakoutPage';
import AtariPage from './js/pages/AtariPage';
import PreviewPage from './js/pages/PreviewPage';
import NesboxPage from './js/pages/NesboxPage';
import JSNESPage from './js/pages/JSNESPage';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="client-server/:id" name="clientServer" component={ClientServerPage}/>
        <Route path="pong" name="Pong" component={PongPage} />
        <Route path="pong-vs" name="PongVS" component={PongVSPage} />
        <Route path="snake" name="Snake" component={SnakePage} />
        <Route path="particles" component={ParticlesPage}/>
        <Route path="breakout" name="Breakout" component={BreakoutPage}/>
        <Route path="atari" name="Atari 2600" component={AtariPage}/>
        <Route path="nesbox" name="NESBox" component={NesboxPage}/>
        <Route path="jsnes" name="JSNES" component={JSNESPage}/>
        <Route path="preview" name="Wall Preview" component={PreviewPage}/>
    </Route>
);
