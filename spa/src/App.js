import React from 'react';
import TopPanel from './topPanel';
import './main_style.css';
import BottomPanel from './bottomPanel';
import Prices from './prices';
import About from './about';
import Login from './login';
import Register from './register';
import MainMenu from './mainMenu';
import LandingPage from './landingPage';
import Session from './session';
import Client from './client';
import Emp from './emp';

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {compToDisplay:'landingPage'};
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(toDisplay) {
        this.setState({compToDisplay:toDisplay});
    };

    switchComp(compName) {
        switch (compName) {
            case 'landingPage':
                return <LandingPage />
            case 'prices':
                return <Prices />
            case 'about':
               return <About />
            case 'login':
                return <Login handleUpdate = {this.handleUpdate} />
            case 'register':
                return <Register />
            case 'mainMenu':
                return <MainMenu handleUpdate = {this.handleUpdate} />
            case 'session':
                return <Session handleUpdate = {this.handleUpdate} />
            case 'client':
                return <Client handleUpdate = {this.handleUpdate} />
            case 'emp':
                return <Emp handleUpdate = {this.handleUpdate} />
            default:
                return <LandingPage />
        }
    };

    render(){
        return (
            <div className='app'>
                <TopPanel isLoggedIn = {false} handleUpdate = {this.handleUpdate}/>
                <div className="content" id="content">
                {this.switchComp(this.state.compToDisplay)}
                </div>
                <BottomPanel />
            </div>
        );
    };
}

export default AppComponent;
