import React from 'react';
import TopPanel from './topPanel';
import './main_style.css';
import BottomPanel from './bottomPanel';
import Prices from './prices';
import About from './about';
import Login from './login';
import Register from './register';
import MainMenu from './mainMenu';

class AppComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {compToDisplay:'prices'};
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(toDisplay) {
        this.setState({compToDisplay:toDisplay});
    };

    switchComp(compName) {
        switch (compName) {
            case 'prices':
                return <Prices />
            case 'about':
               return <About />
            case 'login':
                return <Login handleUpdate = {this.handleUpdate} />
            case 'register':
                return <Register />
            case 'mainMenu':
                return <MainMenu />
            default:
                return <Prices />
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
