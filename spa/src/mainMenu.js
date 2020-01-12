import React from 'react';

class MainMenuComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSessionClick = this.handleSessionClick.bind(this);
        this.handleClientClick = this.handleClientClick.bind(this);
        this.handleEmpClick = this.handleEmpClick.bind(this);
    }

    handleSessionClick(e) {
        console.log('sessions clicked');
        this.props.handleUpdate('session');
    }

    handleClientClick(e) {
        console.log('client clicked');
        this.props.handleUpdate('client');
    }

    handleEmpClick(e) {
        console.log('emp clicked');
        this.props.handleUpdate('emp');
    }

    render() {
        return (
            <div className="main-container">
                <p className="please">Please select an option</p>
                <div className="main-buttons">
                    <button className="sessionsbutton" onClick={this.handleSessionClick} >
                        Sessions
                    </button>
                    <button className="empsbutton" onClick={this.handleEmpClick}>
                        Employees
                    </button>
                    <button className="clientsbutton" onClick={this.handleClientClick}>
                        Clients
                    </button>
                </div>
            </div>
        )
    }
}

export default MainMenuComponent;