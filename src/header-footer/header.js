import React, {Component} from 'react';

class Header extends Component {
    render () {
        return (
            <div>
                <div className="navbar navbar-fixed-top">
                    <div className="my-2">
                        <div>
                            <h1 className="title">My Weather App</h1>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <div>
                        <h1 className="pb-4 pt-5 app-title">Current Weather</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;