import React from 'react';
import { Link } from 'react-router-dom';
import "./BrowseVehicle.css";

function BrowseVehicle() {
    return (
        <div className="vehicle-container">
            <Link to="/toyota" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/toyota2015.jpg" alt="Vehicle"/>
                <h3>Toyota Camry 2015</h3>
                <p>Description of Vehicle</p>
                <button>Reserve</button>
            </Link>
            <Link to="/BMW" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/BMW2020.jpg" alt="Vehicle"/>
                <h3>BMW i8 2020</h3>
                <p>Description of Vehicle</p>
                <button>Reserve</button>

            </Link>
            <Link to="/honda" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/honda2019.jpg" alt="Vehicle"/>
                <h3>Honda Civic 2019</h3>
                <p>Description of Vehicle</p>
                <button>Reserve</button>

            </Link>
            <Link to="/hyundai" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/hyundai2016.jpg" alt="Vehicle"/>
                <h3>Hyundai Tucson 2016</h3>
                <p>Description of Vehicle</p>
                <button>Reserve</button>

            </Link>
            <Link to="/porsche" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/porsche2024.jpg" alt="Vehicle"/>
                <h3>Porsche Cayenne 2024</h3>
                <p>Description of Vehicle</p>
                <button>Reserve</button>

            </Link>
            <Link to="/nissan" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/nissan2001.jpg" alt="Vehicle"/>
                <h3>Nissan Sentra 2001</h3>
                <p>Description of Vehicle </p>
                <button>Reserve</button>

            </Link>
            <Link to="/hyundai" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/hyundai2016.jpg" alt="Vehicle"/>
                <h3>Hyundai Tucson 2016</h3>
                <p>Description of Vehicle</p>
                <button>Reserve</button>

            </Link>
            <Link to="/porsche" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/porsche2024.jpg" alt="Vehicle"/>
                <h3>Porsche Cayenne 2024</h3>
                <p>Description of Vehicle</p>
                <button>Reserve</button>

            </Link>
            <Link to="/nissan" className="vehicle" style={{textDecoration: 'none'}}>
                <img src="/Images/nissan2001.jpg" alt="Vehicle"/>
                <h3>Nissan Sentra 2001</h3>
                <p>Description of Vehicle </p>
                <button>Reserve</button>

            </Link>

        </div>
    );
}

export default BrowseVehicle;

