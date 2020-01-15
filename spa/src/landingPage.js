import React from 'react';
import arrowLeft from './images/arrowleft.svg';
import arrowRight from './images/arrowright.svg';
import lastEvent from './images/memep3.jpg';
import './styles/landing.css';

class LandingPageComponent extends React.Component {
    render() {
        return (
            <div className='landingPage-container'>
                <h2 className="last-event">
                    <p>Last Event</p>
                </h2>
                <div className="index-photo-galery">
                    <img className="arrow-left" src={arrowLeft} alt="arrow left" />
                    <img className="mphoto" src={lastEvent} alt="last-event" />
                    <img className="arrow-rigth" src={arrowRight} alt="arrow rigth" />
                </div>
            </div>
        )
    }
}

export default LandingPageComponent;