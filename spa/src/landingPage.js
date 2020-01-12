import React from 'react';
import arrowLeft from './images/arrowleft.svg';
import arrowRight from './images/arrowright.svg';
import lastEvent from './images/memep3.jpg';
import './styles/landing.css';

class LandingPageComponent extends React.Component {
    render() {
        return (
            <div className='landingPage-container'>
                <h2 class="last-event">
                    <p>Last Event</p>
                </h2>
                <div class="index-photo-galery">
                    <img class="arrow-left" src={arrowLeft} alt="arrow left" />
                    <img class="mphoto" src={lastEvent} alt="last-event" />
                    <img class="arrow-rigth" src={arrowRight} alt="arrow rigth" />
                </div>
            </div>
        )
    }
}

export default LandingPageComponent;