import React from 'react'
import {render} from 'react-dom'
import { Route, IndexRoute } from 'react-router'

import App from './js/App';
import HomePage from './js/pages/HomePage';
import NotFoundPage from './js/pages/NotFoundPage';
import ClientServerPage from './js/pages/examples/ClientServerPage';
import PongPage from './js/pages/PongPage';

module.exports = (
    <Route path="/" component={App}>
        <IndexRoute component={HomePage}/>
        <Route path="client-server/:id" name="clientServer" component={ClientServerPage}/>
        <Route path="pong" name="Pong" component={PongPage} />
        <Route path="*" component={NotFoundPage}/>
    </Route>
);