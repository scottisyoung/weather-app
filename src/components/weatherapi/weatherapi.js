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
            userInput: '',
            favorites: []
        }

        this.getData = this.getData.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick= this.handleClick.bind(this);
        this.addToList = this.addToList.bind(this);
        this.deleteFavorite = this.deleteFavorite.bind(this);
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

    
      changeUserInput(input) {
        this.setState({
            userInput: input
        }); 
     }
  
     addToList(item) {
          const newFavorite = this.state.favorites;
      if(newFavorite) {
          const newFavoriteList = [...this.state.favorites, newFavorite]
          this.setState({
              favorites: newFavoriteList,
          })
      }; console.log(item)
  }
     
  deleteFavorite(fav, i) {
      const newFavoriteState = [...this.state.favorites]
      newFavoriteState.splice(i,1)
      this.setState({
          favorites: newFavoriteState
      })
  }

      render() {

        const displayFavs = this.state.favorites.map((favs, i) => {
          return(
              <div className="favslist" key={i}>
                  <div className="newFav">{favs}</div>
                  <div className="deleteFav" onClick={() => {this.deleteFavorite(favs,i)}}> X </div>
              </div>
          );
      })

          return(
              <div>
                <div className="container ml-5">
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

                    <div>
                    <div className="submit-fav">
                        <form className="form-inline mt-1 justify-content-between">
                            <input className="form-control col-7" type="text" placeholder="City, State or Zip Code" onChange={(e) => this.changeUserInput(e.target.value)} value={this.state.userInput}/>
                            <button className="btn col-4 btn-primary" type="submit" onClick={() => this.addToList(this.state.userInput)}>Add To Favorites</button>
                        </form>
                    </div>
                </div>

                <div className="list">
                    {displayFavs}
                </div>
              </div>
          );
      }
}

export default Weatherapi;
