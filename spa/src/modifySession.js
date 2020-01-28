import React from 'react';
import Select from 'react-select';
import './styles/mSession.css';

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
                    CObject: null,
                    Employees: []
                },
                isInsert: true,
                AClients: [],
                AEmps: [],
                sClient: null,
                sEmps: [],
                sIndex: 1
            }
        }
        else {
            this.state = {
                session: this.props.toUpdate,
                isInsert: false,
                AClients: [],
                AEmps: [],
                sClient: {
                    label: this.props.toUpdate.Client,
                    value: this.props.toUpdate.CObject
                },
                sEmps: this.props.toUpdate.selectedEmps,
                sIndex: 1
            };
        }
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onRejectClick = this.onRejectClick.bind(this);
        this.handleFormDate = this.handleFormDate.bind(this);
        this.handleFormHours = this.handleFormHours.bind(this);
    }

    async getAvaliableLookupValues() {
        fetch('http://localhost:3000/client')
            .then(res => res.text())
            .then(res => {
                const parsedRes = JSON.parse(res);
                this.setState({AClients: parsedRes});
                this.createClientComboBox();
            })
            .catch(e=>console.log(e)
            );

        fetch('http://localhost:3000/emp')
        .then(res => res.text())
        .then(res => {
            const parsedRes = JSON.parse(res);
            this.setState({AEmps: parsedRes})
            this.createEmpComboBox();
        })
        .catch(e=>console.log(e)
        );

        fetch('http://localhost:3000/session')
            .then(res => res.text())
            .then(res => {
                const parsedRes = JSON.parse(res);
                let max = 1;
                for (var i = 0; i < parsedRes.length; i++) {
                    max = parsedRes[i].session_id > max ? parsedRes[i].session_id : max;
                }
                max++;
                this.setState({sIndex: max});
            })
            .catch(e => console.log(e));
    }

    componentDidMount() {
        this.getAvaliableLookupValues();
    }

    createClientComboBox() {
        const respnse = this.state.AClients;
        const size = respnse.length;
        const options = [];
        for (let i = 0; i < size; i++) {
            options.push({
                value: respnse[i],
                label: respnse[i].First_Name.concat(' ').concat(respnse[i].Last_Name)
            })
        }
        this.setState({
            AClients: options
        });
    }

    createEmpComboBox() {
        const respnse = this.state.AEmps;
        const size = respnse.length;
        const options = [];
        for (let i = 0; i < size; i++) {
            options.push({
                value: respnse[i],
                label: respnse[i].First_Name.concat(' ').concat(respnse[i].Last_Name)
            })
        }
        this.setState({
            AEmps: options
        });
    }

    onAcceptClick(e) {
        console.log('Accept session clicked');
        const session = this.state.session;
        console.log(session);
        if (this.isValid(session)) {
            if (this.state.isInsert) {
                const sesToIns = {
                    S_DATE: session.S_DATE,
                    Hours: session.Hours,
                    Clients_Client_ID: this.state.sClient.value.Clients_Client_ID
                }
                console.log(sesToIns);
                
                this.insertSession(sesToIns)
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
        // return !(
        //     this.isEmptyOrNull(session)
        // );
        return true;
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

    async insertSession(session) {
        await fetch('http://localhost:3000/session', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(session)
        })
        for(let i =0; i<this.state.sEmps.length; i++ ) {
            await fetch('http://localhost:3000/handles', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    Employees_employee_id: this.state.sEmps[i].value.employee_id,
                    Sessions_session_id: this.state.sIndex
                })
            })
        }
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

    handleClientChange = (sClient) => {
        this.setState({sClient});
        console.log(`Option selected:`, sClient);
    }

    handleEmpsChange = (sEmps) => {
        this.setState({sEmps});
        console.log('Emps selected: '+sEmps);
    }

    render() {
        console.log(this.state.sClient);

        return (
            <div className="modify-session-container">
                <form id="session-form">
                    <label htmlFor='sDate' className='label-date'>Date</label>
                    <label htmlFor='noh' className='label-noh'>Number of hours</label>
                    <label htmlFor='client' className='label-client'>Client</label>
                    <label htmlFor='emps' className='label-emps'>Employees</label>
                    <input id='sDate' value={this.state.session.S_DATE} type='date' className='in-date' onChange={this.handleFormDate}/>
                    <input id='noh' value={this.state.session.Hours} type="number" className='in-noh' onChange={this.handleFormHours}/>
                    <Select id='client' onChange={this.handleClientChange} value={this.state.sClient} className='in-client'
                    options={this.state.AClients}
                    isSearchable ={true}
                    />
                    <Select id='emps' className='in-emps' value={this.state.sEmps} onChange={this.handleEmpsChange}
                    options={this.state.AEmps}
                    isMulti={true}
                    isSearchable ={true}
                    />
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

export default ModifySessionComponent;