import React from 'react';

class ConfirmationComponent extends React.Component {
    constructor(props){
        super(props);
        this.onYesClick = this.onYesClick.bind(this);
        this.onNoClick = this.onNoClick.bind(this);
    }

    onYesClick(e) {
        this.deleteRecord(this.props.fromRecord, this.props.recordId)
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
        this.props.handleUpdate(this.props.fromRecord);
    }

    async deleteRecord(objectName, id) {
        const response = await fetch('http://localhost:3000/'+objectName+'/?id='+id, {
            method: 'DELETE',
            mode: 'cors'
        });

        return response;
    }

    onNoClick(e) {
        this.props.handleUpdate(this.props.fromRecord);
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