import React, {Component} from 'react';
import WeatherHeading from '../weatherheading/weatherheading.js';
import UnitSwitch from '../unitswitch/unitswitch.js';
import SubmitForm from '../submitform/submitform.js';
import WeatherDetails from '../weatherdetails/weatherdetails.js';
import api from '../../api.json';


class Weatherapi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: `http://api.wunderground.com/api/${api.key}/conditions/q/phoenix,az.json`,
            inputValue: '',
            unitValue: 'F',
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

          return(
              <div className="container-parent">
                <div className="container">
                    <div className="row">
                        <div className="col-6 card-body mb-5">
                            <div className="d-flex justify-content-between">
                                <WeatherHeading {...this.state} />
                                <UnitSwitch handleClick={this.handleClick} />
                            </div>
                                <WeatherDetails {...this.state} />
                                <SubmitForm {...this.state}
                                                change={this.handleChange}
                                                submit={this.handleSubmit}
                                />
                                <p className="text-danger text-center mt-3">{this.state.errorMsg}</p>
                            </div>
                        </div>
                    </div>
              </div>
          );
      }
}

export default Weatherapi;
