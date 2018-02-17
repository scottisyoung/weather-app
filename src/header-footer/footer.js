import React, {Component} from 'react';

class Footer extends Component {
        render() {
        return(
            <div>

            <footer className="page-footer mt-1">
               <div className="container-fluid ml-5 mt-4">
                    <div className="row d-flex justify-content-between">
                        <div className="col-md-6 col-md-6">
                            <h5 className="title-footer">My Weather App</h5>
                                <p className="subtitle">Those who fail to plan, plan to fail. Keeping track of the weather daily puts you at an advantage. <br/> 
                                                        We bring you a daily update to make sure that you are aware at all times and in all places.</p>
                        </div>
           
                         <div className="col-md-6">
                            <h5 className="title-footer2">Learn More</h5>
                                <ul><div className="links-parent">
                                    <div className="links"><li><a href="#">About Us</a></li></div>
                                    <div className="links"><li><a href="#">Support</a></li></div>
                                    <div className="links"><li><a href="#">Legal</a></li></div>
                                    <div className="links"><li><a href="#">Contact</a></li></div>
                                    </div>
                                </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-copyright footer-inverse bg-inverse text-center pt-3">
                    <div className="container-fluid">
                        <p className="copyright1">© 2015 Copyright: Scott Young</p>
                    </div>
                </div>
            </footer>
            </div>
        );
    }
}

export default Footer;