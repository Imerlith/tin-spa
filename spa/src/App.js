import React from 'react';
import TopPanel from './topPanel';
import './main_style.css';
import BottomPanel from './bottomPanel';
import Prices from './prices';

class AppComponent extends React.Component {

    render(){
        return (
            <div className='app'>
                <TopPanel isLoggedIn = {false}/>
                <div className="content">
                    <Prices />
                </div>
                <BottomPanel />
            </div>
        );
    };
}

export default AppComponent;
