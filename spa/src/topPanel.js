import React from 'react';

class TopPanelComponent extends React.Component {
    render() {
        return (
            <div className='top-panel'>
                <h1>XxX_G4m3r$_D3nn_XxX</h1>
                <NavbarComponent />
            </div>
        );
    };
}

class NavbarComponent extends React.Component {
    render(){
        return(
            <div className="nav-links">
                <ul>
                    <li>Prices</li>
                    <li>Avaliable Stations</li>
                    <li>About us</li>
                    <li>Login</li>
                </ul>
            </div>
        );
    };
}

export default TopPanelComponent;