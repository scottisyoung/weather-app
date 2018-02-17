import React, {Component} from 'react';

function WeatherDetails (props) {
    return (
        <div>
            <div className="row mt-5">
                <div className="col-md-2 mr-4">
                    <img className="img-fluid" src={props.icon} alt="weather icon"/>
                </div>
                <div className="col-md-3">
                    {
                      props.unitValue === 'F' ?
                      <h1 className="big-font">{props.tempF}<span className="units"> &deg; F</span></h1>
                      :
                      <h1 className="big-font">{props.tempC}<span className="units"> &deg; C</span></h1>
                    }
                </div>
                <div className="col-md-2 ml-3">
                    <div className="small-font">
                      <p>Humidity: {props.humidity}</p>
                      <p>Wind:{props.windMPH} {props.windDegree}</p>
                      <p>Precipitation:{props.precipitation}</p>
                      <p>UV:{props.uv}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherDetails;