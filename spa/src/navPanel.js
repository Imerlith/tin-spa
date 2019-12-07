import React from 'react';
import './App.css';

class NavPanelComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="top-panel">
                <div className="main-title">
                    <h1>Gamers denn</h1>
                </div>
                <div className="nav-menu">
                    <ul>
                        <li>Avaliable sections</li>
                        <li>Prices</li>
                        <li>About us</li>
                        <li>Login</li>
                    </ul>
                </div>
            </div>
             );
    }
}

export default NavPanelComponent;