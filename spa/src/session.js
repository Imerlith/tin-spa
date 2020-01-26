import React from 'react';
import './styles/record.css';

class SessionComponent extends React.Component {
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
        fetch('http://localhost:3000/session')
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
        const id = source.getAttribute('sessionid');

        const sessionToUpdate = this.state.apiResponse.find(s=>s.session_id == id);
        console.log(sessionToUpdate);
        sessionToUpdate.selectedEmps = this.generateSelectedEmps(sessionToUpdate);

        this.props.handleUpdate('modifysession');
        this.props.ention(sessionToUpdate);
    }

    generateSelectedEmps(session) {
        const selectedEmps = [];
        console.log(session);
        
        for (let i=0; i < session.Emps.length; i++) {
            selectedEmps.push({
                label: session.Emps[i],
                value: session.OEmps[i]
            });
        }
        console.log(selectedEmps);

        return selectedEmps;
    }

    onDeleteClick(e){
        console.log('delete clicked');
        const source = e.target || e.srcElement;
        const sessionToDeleteId = source.getAttribute('sessionid');
        this.props.handleFromRecord('session', sessionToDeleteId);
        this.props.handleUpdate('confirmation');
    }

    onCreateClick(e) {
        console.log('craete new session clicked');
        this.props.handleUpdate('modifysession');
        this.props.ention(null);
    }

    createTable() {
        let rows = [];
        const respnse = this.state.apiResponse;
        const size = respnse.length;
        for (let i = 0; i < size; i++) {
            let row = [];
            row.push(<td key={Math.random()}>{respnse[i].S_DATE}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Hours}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Client}</td>)
            row.push(<td key={Math.random()}>{respnse[i].Emps.join(', ')}</td>)
            row.push(
                <td key={Math.random()}>
                <button sessionid = {respnse[i].session_id} onClick={this.onUpdateClick}>Update</button>
                <button sessionid = {respnse[i].session_id} onClick={this.onDeleteClick}>Delete</button>
                </td>
            )

            //Create the parent and add the children
            rows.push(<tr key={Math.random()}>{row}</tr>)
          }
          return rows
    }

    render() {
        return (
            <div className="sessions-records-container">
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
                            <th>Date</th>
                            <th>Number of hours</th>
                            <th>Client</th>
                            <th>Employees</th>
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

export default SessionComponent;