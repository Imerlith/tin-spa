import React from 'react';

class TopPanelComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn : props.isLoggedIn,
        }
    }
    render() {
        return (
            <div className='top-panel'>
                <h1>XxX_G4m3r$_D3nn_XxX</h1>
                <NavbarComponent isLoggedIn = {this.state.isLoggedIn}/>
            </div>
        );
    };
}

class NavbarComponent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
        }
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        const logButton = isLoggedIn ? 'Logout' : 'Login';
        return(
            <div className="nav-links">
                <ul>
                    <li>Prices</li>
                    <li>Avaliable Stations</li>
                    <li>About us</li>
                    <li>{logButton}</li>
                </ul>
            </div>
        );
    };
}

export default TopPanelComponent;