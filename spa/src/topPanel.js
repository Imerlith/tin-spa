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
                <HamburgerMenuComponent isLoggedIn = {this.state.isLoggedIn} />
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
        this.handlePricesClick = this.handlePricesClick.bind(this);
        this.handleAStationsClick = this.handleAStationsClick.bind(this);
        this.handleAboutClick = this.handleAboutClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handlePricesClick(e) {
        console.log('prices');
    }

    handleAStationsClick(e) {
        console.log('aprices');
    }

    handleAboutClick(e) {
        console.log('about');
    }

    handleLoginClick(e) {
        console.log('login');
        this.setState(state => ({
            isLoggedIn: !state.isLoggedIn
        }));
    }

    render(){
        const isLoggedIn = this.state.isLoggedIn;
        const logButton = isLoggedIn ? 'Logout' : 'Login';
        return(
            <div className="nav-links">
                <ul>
                    <li onClick={this.handlePricesClick}>Prices</li>
                    <li onClick={this.handleAStationsClick}>Avaliable Stations</li>
                    <li onClick={this.handleAboutClick}>About us</li>
                    <li onClick={this.handleLoginClick}>{logButton}</li>
                </ul>
            </div>
        );
    };
}


class HamburgerMenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: props.isLoggedIn,
        }
    }

    render() {
        const isLoggedIn = this.state.isLoggedIn;
        const logButton = isLoggedIn ? 'Logout' : 'Login';
        return(
            <div className="menu-wrap">
            <input type="checkbox" className="toggler" />
                <div className="hamburger"><div></div></div>
                    <div className="menu">
                        <div>
                            <div>
                                <ul>
                                    <li>Prices</li>
                                    <li>Avaliable Stations</li>
                                    <li>About us</li>
                                    <li>{logButton}</li>
                                </ul>
                            </div>
                        </div>
                </div>
            </div>
        );
    };
}

export default TopPanelComponent;