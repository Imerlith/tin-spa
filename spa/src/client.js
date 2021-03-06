import React from 'react';
import './styles/record.css';

class ClientComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: ""
        };
        this.onUpdateClick = this.onUpdateClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onCreateClick = this.onCreateClick.bind(this);
    }

    callAPI() {
        fetch('http://localhost:3000/client')
            .then(res => res.text())
            .then(res => {
                const parsedRes = JSON.parse(res);
                this.setState({apiResponse: parsedRes})
            })
            .catch(e=>console.log(e)
            );
    }

    componentDidMount() {
        this.callAPI();
    }

    onUpdateClick(e){
        console.log('update clicked');
        const source = e.target || e.srcElement;
        const id = source.getAttribute('clientid');

        const clientToUpdate = this.state.apiResponse.find(e=>e.Client_Id == id);
        console.log(clientToUpdate);
        
        this.props.handleUpdate('modifyclient');
        this.props.ention(clientToUpdate);
    }

    onDeleteClick(e){
        console.log('delete clicked');
        const source = e.target || e.srcElement;
        const clientToDeletId = source.getAttribute('clientid');
        this.props.handleFromRecord( {
            Client_Id: clientToDeletId
        } ,'client');
        this.props.handleUpdate('confirmation');
    }

    onCreateClick(e) {
        console.log('craete new client clicked');
        this.props.handleUpdate('modifyclient');
        this.props.ention(null);
    }

    createTable() {
        let rows = [];
        const respnse = this.state.apiResponse;
        const size = respnse.length;
        for (let i = 0; i < size; i++) {
            let row = [];
            row.push(<td key={Math.random()}>{respnse[i].First_Name}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Last_Name}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Last_Visit_Date}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Birthday}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Favourite_Game}</td>)
            row.push(
                <td key={Math.random()}>
                <button clientid = {respnse[i].Client_Id} onClick={this.onUpdateClick}>Update</button>
                <button clientid = {respnse[i].Client_Id} onClick={this.onDeleteClick}>Delete</button>
                </td>
            )

            //Create the parent and add the children
            rows.push(<tr key={Math.random()}>{row}</tr>)
          }
          return rows
    }

    render() {
        return (
            <div className="client-records-container">
            <div className="record-nav-buttons">
                <button onClick={this.onCreateClick}>
                    New
                </button>
                <button onClick={e => this.callAPI()}>
                    Refresh
                </button>
                <button onClick={e => this.props.handleUpdate('mainMenu')}>
                    Back
                </button>
            </div>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Last Visit</th>
                            <th>Birthday</th>
                            <th>Favourite Game</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.createTable()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default ClientComponent;