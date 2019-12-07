import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavPanel from './navPanel';

class AppComponent extends React.Component {
  render() {
    return (
        <NavPanel name='dupa' />
    );
  };
}

export default AppComponent;
