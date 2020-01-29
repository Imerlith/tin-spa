import React from 'react';

class ConfirmationComponent extends React.Component {
    constructor(props){
        super(props);
        this.onYesClick = this.onYesClick.bind(this);
        this.onNoClick = this.onNoClick.bind(this);
    }

    onYesClick(e) {
        const reqArray = this.props.reqArray;
        console.log(reqArray);
        switch (this.props.reqName) {
            case 'client' :
            this.deleteClient(reqArray);
            this.props.handleUpdate('client');
             break;
            case 'emp' :
                this.deleteEmp(reqArray);
                this.props.handleUpdate('emp');
                 break;
            case 'session' :
                this.deleteSession(reqArray);
                this.props.handleUpdate('session');
                break;
        }
    }

    deleteClient(req) {
        this.deleteRecord('client', req.Client_Id)
            // .then(
            //     this.deleteRecord('session', req.session_id)
            //         .then(
            //             this.deleteRecord('handles', req.handles_id)
            //         )
            // );
    }

    deleteEmp(req) {
        this.deleteRecord('emp', req.employee_id)
            // .then(
            //     this.deleteRecord('session', req.session_id)
            //         .then(
            //             this.deleteRecord('handles', req.handles_id)
            //         )
            // );
    }

    deleteSession(req) {
        this.deleteRecord('session', req.session_id)
            .then(
                this.deleteRecord('handles', req.handles_id)
            );
    }

    async deleteRecord(recordName, recordId) {
        const response = await fetch('http://localhost:3000/'+recordName+'/?id='+recordId, {
            method: 'DELETE',
            mode: 'cors'
        });

        return response;
    }

    onNoClick(e) {
        this.props.handleUpdate(this.props.reqName);
    }

    render() {
        return(
            <div className="confirmation-container">
            <h1>Are you sure you want to delete this record ?</h1>
                <div className="con-button">
                    <button onClick={this.onYesClick}>
                        Yes
                    </button>
                    <button onClick={this.onNoClick}>
                        No
                    </button>
                </div>
            </div>
        )
    }
}

export default ConfirmationComponent;