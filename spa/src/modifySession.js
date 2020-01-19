import React from 'react';

class ModifySessionComponent extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.toUpdate === null) {
            this.state = {
                session: {
                    session_id: '',
                    S_DATE: '',
                    Hours: '',
                    Client: '',
                    Employees: []
                },
                isInsert: true,
                AClients: [],
                AEmps: []
            }
        }
        else {
            this.state = {
                session: this.props.toUpdate,
                isInsert: false,
                AClients: [],
                AEmps: []
            };
        }
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onRejectClick = this.onRejectClick.bind(this);
        this.handleFormDate = this.handleFormDate.bind(this);
        this.handleFormHours = this.handleFormHours.bind(this);
    }

    getAvaliableLookupValues() {
        fetch('http://localhost:3000/client')
            .then(res => res.text())
            .then(res => {
                const parsedRes = JSON.parse(res);
                this.setState({AClients: parsedRes})
            })
            .catch(e=>console.log(e)
            );

        fetch('http://localhost:3000/emp')
        .then(res => res.text())
        .then(res => {
            const parsedRes = JSON.parse(res);
            this.setState({AEmps: parsedRes})
        })
        .catch(e=>console.log(e)
        );
    }

    componentDidMount() {
        this.getAvaliableLookupValues();
    }

    onAcceptClick(e) {
        console.log('Accept session clicked');
        const session = this.state.session;
        console.log(session);
        if (this.isValid(session)) {
            if (this.state.isInsert) {
                this.updateOrInsertSession(session, 'POST')
                .then(data => console.log(data))
                .catch(err => console.log(err));
            }
            else {
                this.updateOrInsertSession(session, 'PATCH')
                .then(data => console.log(data))
                .catch(err => console.log(err));
            }

            this.props.handleUpdate('session');
        } else {
            console.log('not valid');
            e.preventDefault();
        }
    }

    isValid(session) {
        console.log('validation start');
        return !(
            this.isEmptyOrNull(session)
        );
    }

    isEmptyOrNull(session) {
        return this.isBlank(session.S_DATE) || this.isBlank(session.Hours)
            || session.Client == null || (session.Employees.length < 1)
    }

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    async updateOrInsertSession(session, method) {
        const response = await fetch('http://localhost:3000/session', {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(session)
        });

        return response;
    }

    onRejectClick(e) {
        console.log('Reject session clicked');
        this.props.handleUpdate('session');
    }

    handleFormDate(e) {
        e.persist();
        this.setState(prevState => {
            let session = Object.assign(this.state.session, prevState.session);
            session.S_DATE = e.target.value;
            return {session};
        });

        console.log(this.state.session);
    }

    handleFormHours(e) {
        e.persist();
        this.setState(prevState => {
            let session = Object.assign(this.state.session, prevState.session);
            session.Hours = e.target.value;
            return {session};
        });

        console.log(this.state.session);
    }

    createClientComboBox() {
        const respnse = this.state.AClients;
        const size = respnse.length;
        const options = [];
        for (let i = 0; i < size; i++) {
            options.push(<option key={Math.random()}>{respnse[i].First_Name.concat(' ').concat(respnse[i].Last_Name)}</option>)
        }

        return options;
    }

    createEmpComboBox() {
        const respnse = this.state.AEmps;
        const size = respnse.length;
        const options = [];
        for (let i = 0; i < size; i++) {
            options.push(<option key={Math.random()}>{respnse[i].First_Name.concat(' ').concat(respnse[i].Last_Name)}</option>)
        }

        return options;
    }

    render() {
        return (
            <div className="modify-session-container">
                <form id="session-form">
                    <label htmlFor='sDate'>Date</label>
                    <label htmlFor='noh'>Number of hours</label>
                    <label htmlFor='client'>Client</label>
                    <label htmlFor='emps'>Employees</label>
                    <input id='sDate' value={this.state.session.S_DATE} type='date' onChange={this.handleFormDate}/>
                    <input id='noh' value={this.state.session.Hours} type="number" onChange={this.handleFormHours}/>
                    <select id='client'>
                        {this.createClientComboBox()}
                    </select>
                    <select id='emps' multiple>
                        {this.createEmpComboBox()}
                    </select>
                    <button onClick={this.onAcceptClick}>Accept</button>
                    <button onClick={this.onRejectClick}>Reject</button>
                </form>
            </div>
        );
    }
}

export default ModifySessionComponent;