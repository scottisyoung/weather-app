import React, {Component} from 'react';

function WeatherHeading (props) {
    return (
        <div>
           <div className="d-inline-block">
                <h3>{props.location}</h3>
                <p>{props.date}</p>
                <p>{props.weather}</p>
            </div> 
        </div>
    );
}

export default WeatherHeading;