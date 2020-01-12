import React from 'react';


class RegisterComponent extends React.Component {
    render() {
        return(
            <div className="register-form-container">
                <p className="please">Please fill out this form</p>
                <form className="register-form" id="register-form" method="GET">
                    <label htmlFor="login-in" className="label-login center-el">Login</label>
                    <input id="login-in" className="login-box" name="login-box" type="text" />
                    <div id="login-error" className="login-error center-el"></div>
                    <label htmlFor="password-in" className="label-pass center-el">Password</label>
                    <input id="password-in" type="password" className="pass-box" />
                    <div id="password-error" className="password-error center-el"></div>
                    <label htmlFor="password-re" className="label-passre center-el">Reenter Password</label>
                    <input id="password-re" type="password" className="passre-box" />
                    <div id="repassword-error" className="repassword-error center-el"></div>
                    <label htmlFor="email-in" className="label-email center-el">Email</label>
                    <input id="email-in" className="email-box" type="email" />
                    <div id="email-error" className="email-error center-el"></div>
                    <label htmlFor="fname-in" className="label-fname center-el">First Name</label>
                    <input id="fname-in" className="fname-box" type="text" />
                    <div id="fname-error" className="fname-error center-el"></div>
                    <label htmlFor="lname-in" className="label-lname center-el">Last Name</label>
                    <input id="lname-in" className="lname-box" type="text" />
                    <div id="lname-error" className="lname-error center-el"></div>
                    <input type="submit" className="sub-btn" value="Submit" />
                </form>
                <div className="errors-cointainer">
                    <div id="error" className="error-summary"></div>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;