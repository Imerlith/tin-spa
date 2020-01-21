import React from 'react';
import './styles/register.css';

class RegisterComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: document.getElementById('login-in'),
            password: document.getElementById('password-in'),
            repassword: document.getElementById('password-re'),
            email: document.getElementById('email-in'),
            fname: document.getElementById('fname-in'),
            lname: document.getElementById('lname-in'),
            form: document.getElementById('register-form'),
            error: document.getElementById('error'),
            messages: []
        }
        this.handleSubmittClick = this.handleSubmittClick.bind(this);
    }

    handleSubmittClick(e) {
        this.resetStyles();
        this.checkForNullOrEmpty();
        this.checkForNotEqualPasswords();
        this.checkForWeakPassword();
        this.checkIfLoginIsReserved();
        if(this.state.messages.length > 0) {
            e.preventDefault();
            this.createDisplayedErrors(this.state.messages);
        } else {
            this.props.handleUpdate('mainMenu');
        }

    }

    resetStyles() {
        this.state.error.innerText = "";
        document.getElementById('login-in').innerText = ""
        this.resetErrorLabels()
        this.setState({messages: []});
        document.getElementById('login-in').style.border = "1px solid "
        document.getElementById('password-in').style.border = "1px solid black"
        document.getElementById('password-re').style.border = "1px solid black"
        document.getElementById('email-in').style.border = "1px solid black"
        document.getElementById('fname-in').style.border = "1px solid black"
        document.getElementById('lname-in').style.border = "1px solid black"

    }

    resetErrorLabels() {
        document.getElementById('login-error').innerHTML = ''
        document.getElementById('password-error').innerHTML = ''
        document.getElementById('repassword-error').innerHTML = ''
        document.getElementById('email-error').innerHTML = ''
        document.getElementById('fname-error').innerHTML = ''
        document.getElementById('lname-error').innerHTML = ''
    }

    checkForNullOrEmpty() {
        if (this.state.login.value === '' || this.state.login.value == null) {
            let message = "Login can't be empty"
            this.addErrorMessageToField(message,'login-error')
            this.state.messages.push(message)
            this.state.login.style.border = "solid 1px red"
        }
        if (this.state.password.value === '' || this.state.password.value == null) {
            let message = "Please provide password"
            this.addErrorMessageToField(message,'password-error')
            this.state.messages.push(message)
            this.state.password.style.border = "solid 1px red"
        }
        if (this.state.repassword.value === '' || this.state.repassword.value == null) {
            let message = "Please repeat password"
            this.addErrorMessageToField(message,'repassword-error')
            this.state.messages.push(message)
            this.state.repassword.style.border = "solid 1px red"
        }
        if (this.state.email.value === '' || this.state.email.value == null) {
            let message = "Email can't be empty"
            this.addErrorMessageToField(message, 'email-error')
            this.state.messages.push(message)
            this.state.email.style.border = "solid 1px red"
        }
        if (this.state.fname.value === '' || this.state.fname.value == null) {
            let message = "First name can't be empty"
            this.addErrorMessageToField(message, 'fname-error')
            this.state.messages.push(message)
            this.state.fname.style.border = "solid 1px red"
        }
        if (this.state.lname.value === '' || this.state.lname.value == null) {
            let message = "Last name can't be empty"
            this.addErrorMessageToField(message, 'lname-error')
            this.state.messages.push(message)
            this.state.lname.style.border = "solid 1px red"
        }
    }

    addErrorMessageToField(message, fieldId) {
        let boldText = document.createElement('b')
        boldText.appendChild(document.createTextNode(message))
        document.getElementById(fieldId).appendChild(boldText)
    }

    checkForNotEqualPasswords() {
        if (this.state.password.value != this.state.repassword.value ) {
            let message = 'Passwords missmatch'
            this.addErrorMessageToField(message, 'password-error')
            this.addErrorMessageToField(message, 'repassword-error')
            this.state.messages.push(message)
            this.state.password.style.border = "solid 1px red"
            this.state.repassword.style.border = "solid 1px red"
        }
    }

    checkForWeakPassword() {
        if (this.state.password.value.length <= 6 && this.state.password.value != '') {
            let message = 'Please provide a stronger password'
            this.addErrorMessageToField(message, 'password-error')
            this.addErrorMessageToField(message, 'repassword-error')
            this.state.messages.push(message)
            this.state.password.style.border = "solid 1px red"
            this.state.repassword.style.border = "solid 1px red"
        }
    }

    checkIfLoginIsReserved() {
        let loginsMockup = ['login1', 'login2']
        if (loginsMockup.includes(this.state.login.value)) {
            this.state.messages.push('Login already in use. Please choose different a login')
            this.state.login.style.border = "solid 1px red"
        }
    }

    createDisplayedErrors(errors) {
        let header = document.createElement('p');
        header.appendChild(document.createTextNode('Please resolve following errors: '))
        this.state.error.appendChild(header)
        this.state.error.appendChild(this.createListOfErrors(errors))
    }

    createListOfErrors(errors) {
        let list = document.createElement('ul')
        for (let i=0; i<this.state.messages.length; i++) {
            let item = document.createElement('li')
            item.appendChild(document.createTextNode(errors[i]))
            list.appendChild(item)
        }
        return list;
    }

    componentDidMount() {
        this.setState({
            login: document.getElementById('login-in'),
            password: document.getElementById('password-in'),
            repassword: document.getElementById('password-re'),
            email: document.getElementById('email-in'),
            fname: document.getElementById('fname-in'),
            lname: document.getElementById('lname-in'),
            form: document.getElementById('register-form'),
            error: document.getElementById('error'),
            messages: []
        });
    }

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
                    <div className="button-container">
                        <input type="submit" className="sub-btn" value="Submit" onClick={this.handleSubmittClick} />
                    </div>
                </form>
                <div className="errors-cointainer">
                    <div id="error" className="error-summary"></div>
                </div>
            </div>
        );
    }
}

export default RegisterComponent;