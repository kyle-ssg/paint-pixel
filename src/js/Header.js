import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = class extends Component {
    displayName: 'Header';

    render () {
        return (
            <div>
                <nav className="navbar navbar-light bg-faded">
                    <IndexLink to="/" className="navbar-brand" href="#">Brand</IndexLink>
                    <ul className="nav navbar-nav">
                        <li className="nav-item">
                            <IndexLink activeClassName="active" to="/" className="nav-link" href="#">Home</IndexLink>
                        </li>
                        <li className="nav-item">
                            <Link activeClassName="active" to="/pong" className="nav-link" href="#">Play Pong</Link>
                        </li>
                        <li className="nav-item">
                            <Link activeClassName="active" to="/page2" className="nav-link" href="#">404</Link>
                        </li>
                        <li className="nav-item">
                            <Link activeClassName="active" to="/client-server/1" className="nav-link" href="#">Client/Server</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
};

module.exports = Header;