import React from 'react';
import './styles/login.css';

class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
    }

    handleRegisterClick(e) {
        console.log('clicked register');
        this.props.handleUpdate('register');
    }

    handleLoginClick(e) {
        console.log('click ok login me');
        this.props.handleUpdate('mainMenu');
    }

    render() {
        return (
            <div className="login-container">
                <div className="spacer"></div>
                <form className="login-form" method="GET">
                    <label htmlFor="login-in" className="label-login">Login</label>
                    <input id="login-in" className="login-box" type="text" />
                    <label htmlFor="password-in" className="label-pass">Password</label>
                    <input id="password-in" type="password" className="pass-box" />
                    <button className="sub-btn" type="submit" value="Ok" onClick={this.handleLoginClick}>OK</button>
                </form>
                <p className="noacc"> Don't have account yet? Register <b onClick={this.handleRegisterClick}>here</b></p>
            </div>
        );
    };
}

export default LoginComponent;