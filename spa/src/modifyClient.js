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
                    <input id='cFirstName' defaultValue={this.state.client.First_Name}  type='text'/>
                    <input id='cLastName' defaultValue={this.state.client.Last_Name} type="text"/>
                    <input id='cLV' defaultValue={this.state.client.Last_Visit_Date} type="date"/>
                    <input id='cBirthday' defaultValue={this.state.client.Birthday} type="date"/>
                    <input id='cFG' defaultValue={this.state.client.Favourite_Game} type="text"/>
                    <button>Accept</button>
                    <button>Reject</button>
                </form>
            </div>
        );
    }
}

export default ModifyClientComponent;