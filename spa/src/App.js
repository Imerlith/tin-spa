import React from 'react';
import TopPanel from './topPanel';
import './main_style.css';
import BottomPanel from './bottomPanel';

class AppComponent extends React.Component {

    render(){
        return (
            <div className='app'>
                <TopPanel />
                <BottomPanel />
            </div>
        );
    };
}

export default AppComponent;
