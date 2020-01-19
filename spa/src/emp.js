import React from 'react';

class EmpComponent extends React.Component {
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
        fetch('http://localhost:3000/emp')
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
        const id = source.getAttribute('empid');

        const empToUpdate = this.state.apiResponse.find(e=>e.employee_id == id);
        console.log(empToUpdate);

        this.props.handleUpdate('modifyemp');
        this.props.ention(empToUpdate);
    }

    onDeleteClick(e){
        console.log('delete clicked');
        const source = e.target || e.srcElement;
        const empToDeleteId = source.getAttribute('empid');
        this.props.handleFromRecord('emp', empToDeleteId);
        this.props.handleUpdate('confirmation');
    }

    onCreateClick(e) {
        console.log('craete new emp clicked');
        this.props.handleUpdate('modifyemp');
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
            row.push(<td key={Math.random()}>{respnse[i].Bonus}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Birthday}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Contract_type}</td>)
            row.push(
                <td key={Math.random()}>
                <button empid = {respnse[i].employee_id} onClick={this.onUpdateClick}>Update</button>
                <button empid = {respnse[i].employee_id} onClick={this.onDeleteClick}>Delete</button>
                </td>
            )

            //Create the parent and add the children
            rows.push(<tr key={Math.random()}>{row}</tr>)
          }
          return rows
    }

    render() {
        return (
            <div className="emp-records-container">
                <button onClick={this.onCreateClick}>
                    New
                </button>
                <button onClick={e => this.callAPI()}>
                    Refresh
                </button>
                <button onClick={e => this.props.handleUpdate('mainMenu')}>
                    Back
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Bonus</th>
                            <th>Birthday</th>
                            <th>Contract Type</th>
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

export default EmpComponent;