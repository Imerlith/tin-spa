import React from 'react';
import './styles/mEmp.css';

class ModifyEmpComponent extends React.Component {
    constructor(props) {
        super(props);
        if(this.props.toUpdate === null) {
            this.state = {
                emp: {
                    employee_id: '',
                    First_Name: '',
                    Last_Name: '',
                    Bonus: '',
                    Birthday: '',
                    Contract_type: ''
                },
                isInsert: true
            }
        }
        else {
            this.state = {
                emp: this.props.toUpdate,
                isInsert: false
            };
        }
        this.onAcceptClick = this.onAcceptClick.bind(this);
        this.onRejectClick = this.onRejectClick.bind(this);
        this.handleFormFName = this.handleFormFName.bind(this);
        this.handleFormLName = this.handleFormLName.bind(this);
        this.handleFormBonus = this.handleFormBonus.bind(this);
        this.handleFormBirthday = this.handleFormBirthday.bind(this);
        this.handleFormCT = this.handleFormCT.bind(this);
    }

    onAcceptClick(e) {
        console.log('Accept emp clicked');
        const emp = this.state.emp;
        console.log(emp);
        if (this.isValid(emp)) {
            if (this.state.isInsert) {
                this.updateOrInsertEmp(emp, 'POST')
                .then(data => console.log(data))
                .catch(err => console.log(err));
            }
            else {
                this.updateOrInsertEmp(emp, 'PATCH')
                .then(data => console.log(data))
                .catch(err => console.log(err));
            }

            this.props.handleUpdate('emp');
        } else {
            console.log('not valid');
            e.preventDefault();
        }
    }

    isValid(emp) {
        console.log('validation start');
        this.resetErrors();
        return !(
            this.isEmptyOrNull(emp)
            || emp.bonus < 0
        );
    }

    resetErrors() {
        document.getElementById('fname-error').innerHTML = '';
        document.getElementById('lname-error').innerHTML = '';
        document.getElementById('bonus-error').innerHTML = '';
        document.getElementById('birthday-error').innerHTML = '';
        document.getElementById('ct-error').innerHTML = '';
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
        if (this.isBlank(client.Bonus)) {
            errCount++;
            document.getElementById('bonus-error').innerHTML = 'Bonus cant be blank or lower than 0';
        }
        if (this.isBlank(client.Birthday)) {
            errCount++;
            document.getElementById('birthday-error').innerHTML = 'Birthday cant be blank';
        }
        if (this.isBlank(client.Contract_type)) {
            errCount++;
            document.getElementById('ct-error').innerHTML = 'Contract type game cant be blank';
        }
        return errCount > 0;

    }

    isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    async updateOrInsertEmp(emp, method) {
        const response = await fetch('http://localhost:3000/emp/', {
            method: method,
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(emp)
        });

        return response;
    }

    onRejectClick(e) {
        console.log('Reject emp clicked');
        this.props.handleUpdate('emp');
    }

    handleFormFName(e) {
        e.persist();
        this.setState(prevState => {
            let emp = Object.assign(this.state.emp, prevState.emp);
            emp.First_Name = e.target.value;
            return {emp};
        });

        console.log(this.state.emp);
    }

    handleFormLName(e) {
        e.persist();
        this.setState(prevState => {
            let emp = Object.assign(this.state.emp, prevState.emp);
            emp.Last_Name = e.target.value;
            return {emp};
        });

        console.log(this.state.emp);
    }

    handleFormBonus(e) {
        e.persist();
        this.setState(prevState => {
            let emp = Object.assign(this.state.emp, prevState.emp);
            emp.Bonus = e.target.value;
            return {emp};
        });

        console.log(this.state.emp);
    }

    handleFormBirthday(e) {
        e.persist();
        this.setState(prevState => {
            let emp = Object.assign(this.state.emp, prevState.emp);
            emp.Birthday = e.target.value;
            return {emp};
        });

        console.log(this.state.emp);
    }

    handleFormCT(e) {
        e.persist();
        this.setState(prevState => {
            let emp = Object.assign(this.state.emp, prevState.emp);
            emp.Contract_type = e.target.value;
            return {emp};
        });

        console.log(this.state.emp);
    }

    render() {
        return (
            <div className="modify-emp-container">
                <form id="emp-form">
                    <label htmlFor='empFirstName'>First Name</label>
                    <label htmlFor='empLastName' > Last Name</label>
                    <label htmlFor='empBonus'>Bonus</label>
                    <label htmlFor='empBirthday'>Birthday</label>
                    <label htmlFor='empCT'>Contract Type</label>
                    <input id='empFirstName' value={this.state.emp.First_Name} type='text' onChange={this.handleFormFName}/>
                    <input id='empLastName' value={this.state.emp.Last_Name} type="text" onChange={this.handleFormLName}/>
                    <input id='empBonus' value={this.state.emp.Bonus} type="number" onChange={this.handleFormBonus}/>
                    <input id='empBirthday' value={this.state.emp.Birthday} type="date" onChange={this.handleFormBirthday}/>
                    <input id='empCT' value={this.state.emp.Contract_type} type="text" onChange={this.handleFormCT}/>
                    <div className='merror' id='fname-error'></div>
                    <div className='merror' id='lname-error'></div>
                    <div className='merror' id='bonus-error'></div>
                    <div className='merror' id='birthday-error'></div>
                    <div className='merror' id='ct-error'></div>
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

export default ModifyEmpComponent;