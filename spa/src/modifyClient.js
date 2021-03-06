import React from 'react';
import './styles/mClient.css';

class ModifyClientComponent extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.toUpdate === null) {
            this.state = {
                client: {
                    Client_Id: '',
                    First_Name: '',
                    Last_Name: '',
                    Last_Visit_Date: '',
                    Birthday: '',
                    Favourite_Game: ''
                },
                isInsert: true
            }
        }
        else {
            this.state = {
                client: this.props.toUpdate,
                isInsert: false
            };
        }
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onRejectClick = this.onRejectClick.bind(this);
        this.handleFormFName = this.handleFormFName.bind(this);
        this.handleFormLName = this.handleFormLName.bind(this);
        this.handleFormLv = this.handleFormLv.bind(this);
        this.handleFormBirthday = this.handleFormBirthday.bind(this);
        this.handleFormFg = this.handleFormFg.bind(this);
    }

    onAcceptClick(e) {
        console.log('Accept client clicked');
        const client = this.state.client;
        console.log(client);
        if (this.isValid(client)) {
            if (this.state.isInsert) {
                this.updateOrInsertClient(client, 'POST')
                .then(data => console.log(data))
                .catch(err => console.log(err));
            }
            else {
                this.updateOrInsertClient(client, 'PATCH')
                .then(data => console.log(data))
                .catch(err => console.log(err));
            }
    
            this.props.handleUpdate('client');
        } else {
            console.log('not valid');
            e.preventDefault();
        }
    }

    isValid(client) {
        console.log('validation start');
        this.resetErrors();
        return !(
            this.isEmptyOrNull(client)
            // || client.Birthday > new Date().format('d-m-Y')
        );
    }

    resetErrors() {
        document.getElementById('fname-error').innerHTML = '';
        document.getElementById('lname-error').innerHTML = '';
        document.getElementById('lvisit-error').innerHTML = '';
        document.getElementById('birthday-error').innerHTML = '';
        document.getElementById('fgame-error').innerHTML = '';
    }

    isEmptyOrNull(client) {
        let errCount = 0;
        if (this.isBlank(client.First_Name)) {
            errCount++;
            document.getElementById('fname-error').innerHTML = 'First Name cant be blank';
        }
        if (this.isBlank(client.Last_Name)) {
            errCount++;
            document.getElementById('lname-error').innerHTML = 'Last Name cant be blank';
        }
        if (this.isBlank(client.Last_Visit_Date)) {
            errCount++;
            document.getElementById('lvisit-error').innerHTML = 'Last Visit cant be blank';
        }
        if (this.isBlank(client.Birthday)) {
            errCount++;
            document.getElementById('birthday-error').innerHTML = 'Birthday cant be blank';
        }
        if (this.isBlank(client.Favourite_Game)) {
            errCount++;
            document.getElementById('fgame-error').innerHTML = 'Favourite game cant be blank';
        }
        return errCount > 0;

    }

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    async updateOrInsertClient(client, method) {
        const response = await fetch('http://localhost:3000/client', {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(client)
        });

        return response;
    }

    onRejectClick(e) {
        console.log('Reject client clicked');
        this.props.handleUpdate('client');
    }

    handleFormFName(e) {
        e.persist();
        this.setState(prevState => {
            let client = Object.assign(this.state.client, prevState.client);
            client.First_Name = e.target.value;
            return {client};
        });

        console.log(this.state.client);
    }

    handleFormLName(e) {
        e.persist();
        this.setState(prevState => {
            let client = Object.assign(this.state.client, prevState.client);
            client.Last_Name = e.target.value;
            return {client};
        });

        console.log(this.state.client);
    }

    handleFormLv(e) {
        e.persist();
        this.setState(prevState => {
            let client = Object.assign(this.state.client, prevState.client);
            client.Last_Visit_Date = e.target.value;
            return {client};
        });

        console.log(this.state.client);
    }

    handleFormBirthday(e) {
        e.persist();
        this.setState(prevState => {
            let client = Object.assign(this.state.client, prevState.client);
            client.Birthday = e.target.value;
            return {client};
        });

        console.log(this.state.client);
    }

    handleFormFg(e) {
        e.persist();
        this.setState(prevState => {
            let client = Object.assign(this.state.client, prevState.client);
            client.Favourite_Game = e.target.value;
            return {client};
        });

        console.log(this.state.client);
    }

    render() {
        return (
            <div className="modify-client-container">
                <form id="client-form">
                    <label htmlFor='cFirstName'>First Name</label>
                    <label htmlFor='cLastName' > Last Name</label>
                    <label htmlFor='cLV'>Last Visit</label>
                    <label htmlFor='cBirthday'>Birthday</label>
                    <label htmlFor='cFG'>Favourite Game</label>
                    <input id='cFirstName' value={this.state.client.First_Name} type='text' onChange={this.handleFormFName}/>
                    <input id='cLastName' value={this.state.client.Last_Name} type="text" onChange={this.handleFormLName}/>
                    <input id='cLV' value={this.state.client.Last_Visit_Date} type="date" onChange={this.handleFormLv}/>
                    <input id='cBirthday' value={this.state.client.Birthday} type="date" onChange={this.handleFormBirthday}/>
                    <input id='cFG' value={this.state.client.Favourite_Game} type="text" onChange={this.handleFormFg}/>
                    <div className='merror' id='fname-error'></div>
                    <div className='merror' id='lname-error'></div>
                    <div className='merror' id='lvisit-error'></div>
                    <div className='merror' id='birthday-error'></div>
                    <div className='merror' id='fgame-error'></div>
                    <div className='a-button-container'>
                        <button className='a-button' onClick={this.onAcceptClick}>Accept</button>
                    </div>
                    <div className='r-button-container'>
                        <button className='r-button' onClick={this.onRejectClick}>Reject</button>
                    </div>
                </form>

            </div>
        );
    }
}

export default ModifyClientComponent;