import React from 'react';

class AboutComponent extends React.Component {
    render() {
        return (
            <div className="about-info">
                <div className="about-container">
                <p className="au-hours info-label">Operating hours</p>
                <p className="au-street info-label">Street</p>
                <p className="au-street-value info-value">Mom get the camera</p>
                <p className="au-city info-label ">City</p>
                <p className="au-city-value info-value">Nju jork</p>
                <p className="au-zip info-label">Zip code</p>
                <p className="au-zip-value info-value">04-420</p>
                <p className="au-mon info-value">mon-fri  10-24</p>
                <p className="au-sat info-value">sat-sun  12-24</p>
                <p className="au-phone info-label">phone</p>
                <p className="au-email info-label">email</p>
                <p className="au-phone-value info-value">6969696</p>
                <p className="au-email-value info-value">smokeweed@everyday.com</p>
        </div>
            </div>
        );
    };
}

export default AboutComponent;