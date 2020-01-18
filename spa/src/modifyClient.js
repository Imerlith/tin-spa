import React from 'react';

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
                }
            }
        }
        else {
            this.state = {client: this.props.toUpdate};
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
        // this.validateForm(client);
        this.updateClient(client)
            .then(data => console.log(data))
            .catch(err => console.log(err));
        this.props.handleUpdate('client');
    }

    validateForm() {
        console.log('validation start');

    }

    async updateClient(client) {
        const response = await fetch('http://localhost:3000/client', {
            method: 'PATCH',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                credentials: 'same-origin',
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body:JSON.stringify(client)
        });

        return await response.json();
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
                    <label htmlFor='cFG'>Favourite_Game</label>
                    <input id='cFirstName' value={this.state.client.First_Name} type='text' onChange={this.handleFormFName}/>
                    <input id='cLastName' value={this.state.client.Last_Name} type="text" onChange={this.handleFormLName}/>
                    <input id='cLV' value={this.state.client.Last_Visit_Date} type="date" onChange={this.handleFormLv}/>
                    <input id='cBirthday' value={this.state.client.Birthday} type="date" onChange={this.handleFormBirthday}/>
                    <input id='cFG' value={this.state.client.Favourite_Game} type="text" onChange={this.handleFormFg}/>
                    <button onClick={this.onAcceptClick}>Accept</button>
                    <button onClick={this.onRejectClick}>Reject</button>
                </form>
            </div>
        );
    }
}

export default ModifyClientComponent;