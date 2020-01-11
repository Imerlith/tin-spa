import React from 'react';
import './styles/login.css';

class LoginComponent extends React.Component {
    render() {
        return (
            <div className="login-container">
                <div className="spacer"></div>
                <form className="login-form" method="GET">
                    <label for="login-in" className="label-login">Login</label>
                    <input id="login-in" className="login-box" type="text" />
                    <label for="password-in" className="label-pass">Password</label>
                    <input id="password-in" type="password" className="pass-box" />
                    <a className="sub-btn" type="submit" value="Ok" href="main.html">OK</a>
                </form>
                <p className="noacc"> Don't have account yet? Register <a href="register.html">here</a></p>
            </div>
        );
    };
}

export default LoginComponent;