import React from 'react';

class ClientComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch('http://localhost:3000/client')
            .then(res => res.text())
            .then(res => {
                const parsedRes = JSON.parse(res);
                this.setState({apiResponse: parsedRes})
            });
    }

    componentDidMount() {
        this.callAPI();
    }

    onUpdateClick(e){
        console.log('update clicked');

    }

    onDeleteClick(e){
        console.log('delete clicked');
        
    }

    createTable() {
        let rows = [];
        const respnse = this.state.apiResponse;
        const size = respnse.length;
        for (let i = 0; i < size; i++) {
            let row = [];
            row.push(<td>{respnse[i].First_Name}</td>)
            row.push(<td>{respnse[i].Last_Name}</td>)
            row.push(<td>{respnse[i].Last_Visit_Date}</td>)
            row.push(<td>{respnse[i].Birthday}</td>)
            row.push(<td>{respnse[i].Favourite_Game}</td>)
            row.push(
                <td>
                <button onClick={this.onUpdateClick}>Update</button>
                <button onClick={this.onDeleteClick}>Delete</button>
                </td>)

            //Create the parent and add the children
            rows.push(<tr>{row}</tr>)
          }
          return rows
    }

    render() {
        return (
            <div className="client-records-container">
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