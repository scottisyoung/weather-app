import React, { Component } from 'react';
import './App.css';
import api from './api.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      url: `http://api.wunderground.com/api/${api.key}/conditions/q/newyork,ny.json`,
      inputValue: '',
      unitValue: 'F'
    }

    this.getData = this.getData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick= this.handleClick.bind(this);
  }

    getData() {
      let url = this.state.url;
      fetch(url).then(function(res){
        return res.json();
      }).then(function(data){
        this.setState({
          location: data.current_observation.display_location.full,
          date: data.current_observation.observation_time.substr(16),
          weather: data.current_observation.weather,
          icon: data.current_observation.icon_url,
          tempF: Math.round(data.current_observation.temp_f),
          tempC: Math.round(data.current_observation.temp_c),
          humidity: data.current_observation.relative_humidity,
          windMPH: data.current_observation.wind_mph,
          windDegree: data.current_observation.wind_degrees,
          precipitation: data.current_observation.precip_today_metric,
          uv: data.current_observation.UV,
          errorMsg: '',
        });
      }.bind(this)).catch(function(error) {
          this.setState({
            errorMsg: 'Please, enter a valid city and state, or zip code.' 
          })
      }.bind(this)); 
    }

    componentDidMount() {
      this.getData();
      navigator.geolocation.getCurrentPosition(function(position) {
        this.setState({
          url: `http://api.wunderground.com/api/${api.key}/conditions/q/${position.coords.latitude},${position.coords.longitude}.json`
        }, () => {
          this.getData();
        })
      }.bind(this));
    }

    handleChange(e) {
      this.setState({
        inputValue: e.target.value
      });
    }

    handleSubmit(e) {
      e.preventDefault();
      this.setState({
        url: `http://api.wunderground.com/api/${api.key}/conditions/q/${this.state.inputValue}.json` 
      }, () => {
      this.getData();
      });
    }

    handleClick(e) {
      this.setState({
        unitValue: e.target.id
      });
    }

  render() {
    return (
      <div className="App">
        <div className="container my-5">
          <div className="row">
            <div className="col-6 card-body">
              <div className="d-flex justify-content-between">
                <div className="d-inline-block">
                  <h3>{this.state.location}</h3>
                  <p>{this.state.date}</p>
                  <p>{this.state.weather}</p>
                </div>
                <div className="d-inline-block btn-group btn-group-sm" data-toggle="buttons">
                  <label id="F" onClick={this.handleClick} className="btn btn-primary active">
                    <input type="hidden" name="options"></input>
                    &deg; F
                  </label>
                  <label id="C" onClick={this.handleClick} className="btn btn-primary">
                  <input type="hidden" name="options"></input>
                    &deg; C
                  </label>
                </div>
              </div>
                <div className="row mt-5">
                  <div className="col-md-2 mr-4">
                    <img className="img-fluid" src={this.state.icon} alt="weather icon"/>
                  </div>
                  <div className="col-md-3">
                    {
                      this.state.unitValue === 'F' ?
                      <h1 className="big-font">{this.state.tempF}<span className="units"> &deg; F</span></h1>
                      :
                      <h1 className="big-font">{this.state.tempC}<span className="units"> &deg; C</span></h1>
                    }
                  </div>
                  <div className="col-md-2 ml-3">
                    <div className="small-font">
                      <p>Humidity: {this.state.humidity}</p>
                      <p>Wind:{this.state.windMPH} {this.state.windDegree}</p>
                      <p>Precipitation:{this.state.precipitation}</p>
                      <p>UV:{this.state.uv}</p>
                    </div>
                  </div>
                </div>
                <form onSubmit={this.handleSubmit} className="form-inline mt-5 justify-content-between">
                  <input value={this.state.inputValue} onChange={this.handleChange} className="form-control col-8 mb-4 mb-sm-0" type="text" placeholder="City, State or Zip Code"></input>
                  <button type="submit" className="btn col-3 btn-primary">Submit</button>
                </form>
                <p className="text-danger text-center mt-3">{this.state.errorMsg}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
